# Technology Stack & Dependencies

## 1. Purpose

This document defines the technologies, libraries, and tools used.

---

## 2. High-Level Stack

| Layer              | Technology               | Purpose                                                                 |
| ------------------ | ------------------------ | ----------------------------------------------------------------------- |
| Frontend Framework | React                    | UI shell (toolbar, panels, dialogs)               |
| Language           | JavaScript (ES2022)      | Application logic                                                       |
| Rendering Engine   | PixiJS                   | Real-time 2D rendering  scene graph             |
| Input & Gestures   | Pointer Events API       | High-frequency input sampling (draw/erase), pointer capture, touch      |
| State Management   | Redux                  | Lightweight global state (tools, selection, history, viewport)          |
| Styling            | Tailwind CSS             | Utility-first styling                                                   |
| Icons              | lucide-react             | Icon system                                                             |
| Export             | PNG (raster) + SVG (opt) | Export artwork; raster default, vector optional depending on data model |
| Sanitization       | DOMPurify                | Secure HTML rendering (only if rich text/HTML is supported)             |
| Build Tool         | Vite                     | Fast builds and dev server                                              |
| Validation         | Zod                      | Schema validation for imports/exports                                   |

---

## 3. Detailed Technology Decisions

### 3.1 React + JavaScript

**Why**

* React for UI shell: menus, toolbars, settings, inspector panels, dialogs.
* Rich ecosystem and tooling (Vite, DevTools, testing).
* Clear separation: React handles UI, Pixi handles real-time rendering  
---

### 3.2 PixiJS (Rendering Engine)

**Why**

* Built for real-time 2D rendering with WebGL acceleration.
* Scene graph model fits drawings: layers, strokes, selection outlines, overlays.
* Stable 60fps target is realistic for large scenes compared to DOM/SVG.

**Alternatives**

* JoinJs 
* Canvas2D only → simpler, but can hit CPU limits on large/complex scenes.
* Konva → solid Canvas2D scene graph; generally less GPU leverage than Pixi.
* React Flow → optimized for node/edge diagrams, not stroke-level erasing.


---

### 3.3 Redux (State Management)

**Why**

* Minimal boilerplate and predictable mental model.
* Fine-grained subscriptions prevent global rerenders.
* Works well for editor concepts: current tool, selection, viewport, history.

**Alternatives**

* zustand → heavier mental model and boilerplate.
* Recoil → stability concerns.


### 3.4 Tailwind CSS

**Why**

* Rapid UI development.
* Consistent design tokens.
* Eliminates unused CSS via purge.

**Risks**

* Overuse can reduce readability.
* Inline utility sprawl without component abstractions.

**Mitigations**

* Component extraction for repeated patterns.
* Enforced design tokens.

---
