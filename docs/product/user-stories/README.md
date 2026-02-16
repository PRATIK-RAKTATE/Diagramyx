# MVP Stories 

## Core features to keep

### Canvas & Navigation

1. Infinite canvas (bounded implementation)
2. Pan & zoom

### Basic drawing

3. Rectangle
4. Circle
5. Arrow/line connections
6. Text labels

### Editing

7. Drag & move
8. Resize
9. Undo/redo

### Layout assistance

10. Snap to grid
11. Alignment guides

### Export

12. Export to PNG (requires login)

---

# Auth Stories

### Authentication

13. User can sign up with email/password
14. User can log in securely
15. User session persists across refresh
16. User can log out

### Authorization 

17. Only authenticated users can export diagrams

### Security basics

18. Passwords stored hashed (bcrypt)
19. Basic rate limiting on auth endpoints
20. Input validation for auth forms

**Deferred auth scope**

* OAuth providers
* email verification
* password reset
* RBAC
* multi-device sync

---

# MVP Epics 

## Epic 1 — Canvas Engine

* Render canvas
* Pan/zoom
* Coordinate system

## Epic 2 — Shapes

* Create shapes
* Select & move
* Resize

## Epic 3 — Connections

* Draw arrows
* Attach to shapes

## Epic 4 — Editing System

* Undo/redo
* Object selection

## Epic 5 — Export

* PNG export
* Auth gate for export

## Epic 6 — Authentication (NEW)

* Signup/login
* Session management
* Export authorization


---


## Dirctory structure

```
user-stories/
├── README.md
├── epic-canvas/
│   ├── US-001-infinite-canvas.md
│   ├── US-002-pan-zoom.md
│   └── US-003-grid-alignment.md
│
├── epic-shapes/
│   ├── US-004-basic-tools.md
│   ├── US-005-custom-icons.md
│   ├── US-006-text.md
│   └── US-007-drag-resize.md
│
├── epic-connections/
│   ├── US-008-arrow-connections.md
│   └── US-009-attach-to-shapes.md
│
├── epic-editing/
│   ├── US-010-undo.md
│   └── US-011-redo.md
│
├── epic-export/
│   └── US-012-export-png.md
│
├── epic-auth/
│   ├── US-013-signup.md
│   ├── US-014-login.md
│   ├── US-015-session-management.md
│   ├── US-016-logout.md
│
└── archive/


```

