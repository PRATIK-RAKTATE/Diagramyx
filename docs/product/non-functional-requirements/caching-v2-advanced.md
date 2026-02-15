<!-- # Caching Requirements (Excalidraw-like, Single User, No Lag)

## Purpose

Deliver **instant UI interactions**  drag, draw with **no perceived lag** by caching:

1. **static symbol/icon assets**,
2. **symbol metadata**,
3. **computed geometry + hit-test acceleration**,
4. **local-first scene state**,


---

## Caching Principles (Updated)

1. **Cache for Responsiveness** - To redude main thread work and mininmun network waits.
2. **Main Thread is Sacred** - Anything heavy should be cached or move to woker.
3. **Local-First by Default** - user edits should local no network call.
4. **Deterministic Rebuild** - if cache is dropped rebuilding step is quick.
5. **Version Everything** - cache keys include app version + schema version + asset hash. --version 2

---

# 1. Caching Layers

## 1.1 Edge/CDN Caching (Netlify)

### Use Cases

* JS/CSS bundles
* icon
* fonts
* immutable symbol packs (our 250+ symbols)

### Requirements

* Use **content-hashed filenames** (e.g., `icons.4f3a9c.svg`, `app.91c2.js`).
* Set **Cache-Control: public, max-age=31536000, immutable** for hashed assets.
* For HTML entry (`/index.html`): **no-cache** or very short TTL to allow deploy updates.
* Enable **Brotli/Gzip** for text assets.

### Why this matters

This eliminates cold-start stalls on free tier and makes repeat loads near-instant.

---

## 1.2 Client Storage Caching (Browser)

### Use Cases (High Value)

* **Symbol library index** (metadata, categories, tags)
* **Rasterized previews/thumbnails** (optional)
* **Scene snapshots** (autosave)
* **User preferences** (grid, snapping, last tool)

### Storage Choice Policy

* **Memory (L0)**: fastest, cleared on refresh.
* **IndexedDB (L1)**: large, structured, best for icons + scene history.
* **LocalStorage**: only tiny preferences; avoid large writes (sync + can jank).
* **Cache Storage (Service Worker)**: immutable assets + offline.

### Requirements

* Cache writes must be **batched + throttled** (avoid writing on every pointer move).
* Scene persistence uses **debounced commits** (e.g., 300–1000ms) and **on idle** where possible.

---

## 1.3 Runtime Computation Cache (In-Memory)

### Use Cases

* **Path2D** objects for shapes
* **Text measurement** results (font+string key)
* **Bounding boxes** and **transformed bounds**
* **Spatial index** (grid/R-tree) for hit testing and selection
* **Rendered bitmaps** (for complex groups at current zoom)

### Requirements

* Cache must be **invalidated on element mutation** (position/rotation/points/style).
* Cache must be **zoom-aware** for raster caches (key includes zoom bucket).
* Must enforce **memory ceiling** with LRU eviction to prevent tab crashes.

---

## 1.4 Backend/API Caching (Render)

*(Lower priority for your current single-user, non-collab mode)*

### Use Cases

* Symbol pack manifests (if served dynamically)
* User account settings (if any)
* Analytics configs / feature flags (if any)

### Requirements

* Prefer **CDN caching** over backend caching for static stuff.
* Keep backend responses cacheable with **ETag** / `If-None-Match`.

---

# 2. What to Cache (Excalidraw-like)

## 2.1 MUST Cache (Big UX wins)

| Data/Computation                         | Where                  | Why                             |
| ---------------------------------------- | ---------------------- | ------------------------------- |
| Icon/symbol packs (SVG/PNG)              | CDN + SW Cache Storage | eliminates network + parse cost |
| Symbol metadata index (tags, categories) | IndexedDB              | fast palette/search             |
| Geometry: bounds/Path2D                  | memory                 | reduces per-frame recompute     |
| Text measure results                     | memory                 | text is a hidden perf killer    |
| Hit-test acceleration (spatial index)    | memory                 | selection/hover becomes instant |
| Scene autosave snapshot                  | IndexedDB              | crash recovery, instant reload  |

## 2.2 SHOULD Cache (Conditional)

| Data                                   | Where        | Notes                       |
| -------------------------------------- | ------------ | --------------------------- |
| Rasterized previews for complex groups | memory (LRU) | key by zoom bucket          |
| Search results within symbol palette   | memory       | TTL short; depends on query |

## 2.3 Must NOT Cache

| Data                                   | Reason                       |
| -------------------------------------- | ---------------------------- |
| Anything decrypted-sensitive           | security (future-proof rule) |
| High-frequency pointer-move event logs | huge + useless               |
| Full render frames                     | explodes memory              |

---

# 3. Cache Key Design (Versioned + Content-Aware)

## Requirements

* Keys MUST include:

  * `appVersion`
  * `schemaVersion`
  * `assetHash` (for symbol packs)
  * `workspaceId/userId` if you add multi-user later

### Examples

```
assets:symbolPack:{packId}:{packHash}:v3
meta:symbolIndex:{locale}:{packHash}:v2
scene:snapshot:{docId}:v5
geom:bounds:{elementId}:{elementRev}:v1
text:measure:{fontKey}:{textHash}:v1
raster:group:{groupId}:{rev}:{zoomBucket}:v1
```

**Important**: include a monotonically increasing `elementRev` (revision) so invalidation is trivial.

---

# 4. TTL & Eviction Guidelines (UI-first)

## Memory caches

* Prefer **LRU eviction** over TTL for geometry/text/hit-test.
* Define hard limits:

  * `textMeasureCache`: e.g., 5k entries
  * `Path2DCache`: e.g., 10k entries
  * `rasterCache`: memory-based cap (e.g., 64–128MB)

## IndexedDB

* Scene snapshots: keep last **N versions** (e.g., 20) + last stable.
* Symbol metadata: no TTL, invalidate by `packHash` change.

## Service Worker Cache Storage

* Immutable assets: no TTL; evict by cache name versioning (`assets-v7`).

---

# 5. Invalidation Strategy (No-Stale UX)

## Requirements

* Any element mutation increments `elementRev`.
* Invalidate derived caches by rev mismatch:

  * bounds cache
  * Path2D cache
  * spatial index entries
  * raster cache

## Scene-level invalidation

* On load, if `schemaVersion` differs → migrate or wipe scene caches safely.

---

# 6. Consistency Strategy (Local-First)

## Recommended: Cache-Aside + Local Source of Truth

* **In-memory scene state** is primary during interaction.
* Persist to IndexedDB on debounce/idle.
* Backend sync (if any) is asynchronous and never blocks UI.

---

# 7. Service Worker Caching Policy (Netlify-friendly)

## Requirements

* Precache:

  * app shell (hashed bundles)
  * fonts
  * symbol packs
* Runtime cache:

  * symbol pack downloads
* Offline:

  * app opens and symbol palette works offline

**Guardrail**: don’t cache API POST responses.

---

# 8. Performance-First “Caching” Beyond Network (Critical)

Caching alone won’t save you if your rendering pipeline is naive. These are *mandatory* for “no lag”:

## 8.1 Render Pipeline Rules

* **requestAnimationFrame** loop for drawing; never draw on every event synchronously.
* Maintain a **dirty-rect / dirty-layer** strategy:

  * static layer (background/grid)
  * scene layer
  * UI overlay layer (selection box, cursor)
* When dragging a single element, avoid re-rendering everything if possible.

## 8.2 Spatial Index for Hit Testing

* Keep a **uniform grid** (simpler than R-tree, usually enough).
* Update index incrementally on element move/resize.
* Hit-test queries become O(k) for nearby cells instead of O(n).

## 8.3 Off-main-thread Work

* Move heavy tasks to a **Web Worker**:

  * symbol search indexing
  * exporting (PNG/SVG/PDF)
  * complex boolean geometry (if any)
* Main thread stays responsive.

## 8.4 Data Model (Avoid React Re-render Storms)

* Use a centralized store with **fine-grained subscriptions** (avoid rerendering whole app on every pointer move).
* During pointer move, update a **mutable interaction state** (ref) + commit state on pointer up.

---

# 9. Observability & Monitoring (You need this early)

## Metrics

* Input latency (pointermove → frame) p95/p99
* FPS during drag/zoom
* Render time per frame
* Hit-test duration
* Cache hit ratio (geom/text/raster)
* Long tasks count (>50ms)

## Requirements

* Add a dev overlay for:

  * current FPS
  * elements rendered
  * time in render/hit-test/layout

---

# 10. Failure Handling

* If IndexedDB fails (quota/private mode):

  * app still works (memory only)
  * show non-blocking warning
* If Service Worker fails:

  * app still loads normally
* If backend is down:

  * editing continues; sync later

---

# 11. Security Considerations (Pragmatic)

* Don’t store auth tokens in localStorage if you add auth; prefer httpOnly cookies.
* If you store documents locally, consider optional client-side encryption later.

---

# 12. Targets (UX-centric)

* Pointer interaction p95 < **16ms** (1 frame)
* Hit-test p95 < **2ms**
* Palette open < **50ms**
* Cold load < **2–3s** on mid devices (free tier + CDN)
* No main-thread long tasks during draw/drag

---

# 13. Future Enhancements

* Progressive symbol pack loading (only load categories on demand)
* Bitmap caching per zoom bucket
* WASM for heavy geometry
* Multi-doc local database + sync engine (when collaboration starts)

---

## What you should cache “where” (straight answer)

* **Icons/symbol assets**: CDN + **Service Worker Cache Storage** (best ROI).
* **Symbol index (tags/categories)**: **IndexedDB** (fast palette + search).
* **Scene autosaves**: **IndexedDB** (debounced).
* **Bounds/Path2D/text metrics/spatial index**: **memory** (LRU + rev invalidation).
* **Backend caching**: minimal for now; use **ETag** for manifests if needed.

## What NOT to do (common naive choices that cause lag)

* Updating React state on every pointermove → rerender storm.
* Recomputing bounds/hit-test from scratch over all elements every frame.
* Storing large scenes in localStorage repeatedly (sync writes = jank).
* Shipping 200 SVGs as individual files without hashing/sprites (request overhead).


1. Build a **perf budget** (ms per interaction) and fail PRs that regress it.
2. Add an automated **interaction benchmark** (playwright) that drags/zooms and records p95 frame times.
3. Implement **incremental spatial indexing** + validate with property-based tests.
4. Use **rev-based derived caches** everywhere (geometry, Path2D, raster) so invalidation is O(1).
5. Add a **Worker-based export pipeline** to keep UI thread pristine.
6. Implement **layered rendering** (static grid/UI overlay/scene) + minimal redraw.
7. Adopt **idle-time persistence** (requestIdleCallback fallback) so saves never hitch drawing.
8. Add a **memory governor** (LRU + hard caps) with telemetry for cache evictions.
9. Ship a **dev perf HUD** and require screenshots in perf-sensitive PRs.
10. Add a **“low-end device mode”** toggle (reduced shadows, simplified stroke rendering, lower fidelity at high zoom) triggered automatically when frame drops.

If you tell me your current stack (React/canvas/SVG/WebGL?) and how you render (single canvas vs multiple layers), I can map this into a concrete architecture (store shape model, render pipeline, and exact caches) without guessing. -->
