# Caching Requirements  Excalidraw-like, Single User, No Lag

_Last reviewed: 15 february 2026 

_Owner: Pratik B. Raktate_  
_Status: In Review


## Purpose

Guarantee **smooth draw/drag/pan/zoom** by caching only what moves the needle:

1. **static assets (app + 250+ symbols)**
2. **symbol metadata/index**
3. **scene autosave**
4. **derived runtime caches (bounds/text/hit-test)**

---

## Principles

1. **Immutable assets**: if filename is hashed, cache it “forever”.
2. **Local-first edits**: UI never waits on network.
3. **Rev-based invalidation**: derived caches must be invalidated in O(1).
4. **Hard limits**: memory caches must have caps (LRU) to avoid tab crashes.
5. **Versioned keys**: app/schema/pack hash included to avoid stale mixing.

---
| Item                   | Best storage                                   | Backup/secondary             |
| ---------------------- | ---------------------------------------------- | ---------------------------- |
| Static assets          | Netlify CDN (from repo build output)           | Service Worker Cache Storage |
| Symbol metadata/index  | Repo JSON (source) + IndexedDB (runtime index) | none needed                  |
| Scene autosave         | IndexedDB                                      | Backend DB (optional later)  |
| Derived runtime caches | In-memory only                                 | none                         |


    Storage

    1. static assets => public/symbol or if used imports src/assets/symbol

    2. symbol metadata => assets/symblols/manifest.json

    3. scene autosave=>  IndexDB (browser DB) later on render backend due to slow free tier

    4. derived runtime caches => In memory only (JS memory) pertab

# 1) Layers (Only the ones that matter)

## 1. Edge/CDN (Netlify) — MUST

### Scope

* JS/CSS bundles, fonts
* symbol packs (SVG/PNG), sprite sheets

### Policy

* Hashed assets:
  `Cache-Control: public, max-age=31536000, immutable`
* HTML entry:
  `Cache-Control: no-cache` (or very short TTL)

**Goal:** repeat visits load instantly; free-tier cold starts don’t matter for assets.

---

## 2. Service Worker Cache Storage — MUST

### Scope

* Precache app shell (hashed bundles)
* Precache symbol packs (or lazy-cache on first use)

### Guardrails

* Never cache POST/PUT responses
* Cache names are versioned (`assets-v2`)

**Goal:** instant palette open + offline-ready assets.

---

## 3. IndexedDB — MUST

### Store

* `symbolIndex` (tags/categories/paths) keyed by `packHash`
* `sceneSnapshots` (autosave) keyed by `docId`

### Write rules

* Autosave is **debounced** (300–1000ms) and **on pointerup** for heavy operations.
* Keep last **N=20** snapshots per doc; evict older.

**Goal:** no lag on save + instant reload + crash recovery.

---

## 4. In-Memory Runtime Caches — MUST

### Cache

* bounds (AABB/rotated bounds)
* Path2D (if Canvas 2D)
* text measurements
* spatial index (uniform grid)

### Invalidation (non-negotiable)

* Each element has `rev` incremented on mutation.
* Cache keys include `{elementId}:{rev}`.

### Hard limits (LRU)

* textMeasureCache: max 5k entries
* path2DCache: max 10k entries
* rasterCache (optional): max 64–128MB (only if you do bitmap caching)

**Goal:** selection/hover/draw stays O(1)/near O(1), not O(n).

---

# 2) What to Cache 

## MUST cache

| Item                            | Where     | Why                                |
| ------------------------------- | --------- | ---------------------------------- |
| Hashed bundles + symbol packs   | CDN + SW  | eliminates network + repeat parse  |
| Symbol metadata index           | IndexedDB | instant palette search             |
| Scene autosave snapshot         | IndexedDB | crash recovery, instant reload     |
| Bounds + text measures + Path2D | Memory    | removes per-frame recompute        |
| Spatial index                   | Memory    | hit-test doesn’t scan all elements |

## Must NOT cache


* full render frames
* pointermove logs

---

# 3) Cache Keys (Minimum)

All keys include: `schemaVersion`, plus `packHash` where relevant.

Examples:

```
assets:symbolPack:{packId}:{packHash}:v2
idb:symbolIndex:{packHash}:v2
idb:sceneSnapshot:{docId}:v2
mem:bounds:{elementId}:{rev}:v1
mem:text:{fontKey}:{textHash}:v1
mem:gridCell:{cellId}:v1
```

---

# 4) Observability (Minimum viable)

Track only:

* p95 frame time during drag/zoom
* hit-test duration
* long tasks count (>50ms)
* cache hit rate (bounds/text) in dev mode

**Goal:** detect regressions early without building a full platform.

---

# 5) Failure Behavior (Minimum)

* If IndexedDB unavailable: keep working in memory + show non-blocking warning.
* If Service Worker fails: app still loads normally via CDN.

---

# Ownership (Single Person)

As caching owner, you must enforce:

* hashed assets + headers
* SW precache strategy + versioning
* IndexedDB schema + snapshot eviction
* rev-based invalidation + LRU caps
* a perf regression checklist in PRs

---

## Further improvements

1. Add CI perf test that simulates drag/zoom and fails on p95 regression.
2. Add a “perf budget” file and enforce it in PR checks.
3. Implement cross-tab scene lock + last-write-wins to avoid IDB corruption.
4. Add automatic cache wipe on schema mismatch with safe migration hooks.
5. Introduce “low-end mode” auto-trigger when FPS drops (adaptive quality).
6. Log cache evictions + memory usage to spot leaks early.
7. Use Worker for symbol indexing + export so main thread never spikes.
8. Adopt “commit-on-pointerup” for heavy state, keep pointermove mutable.
9. Build a dev HUD: FPS + hit-test ms + rendered elements count.
10. Add synthetic “worst-case scene” fixtures (5k elements) and benchmark routinely.
