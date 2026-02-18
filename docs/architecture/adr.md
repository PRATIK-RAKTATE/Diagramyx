# ADR-0001: Core Architecture for Diagram App

## Status

Accepted

## Context

We are building an MVP browser-based diagram/whiteboard app
focused on fast drawing, shapes, and local document editing.

Constraints:

- rapid MVP delivery
- web-first product
- minimal infrastructure

## Decision

We will use:

- client-heavy architecture
- React frontend with canvas renderer
- Node.js API for file storage only
- PostgreSQL for document persistence
- local autosave in browser storage
- REST API

## Rationale

# ADR 0001 — Core architecture for Diagramyx

**Status:** Accepted

**Date:** 2026-02-18

**Deciders:** Diagramyx Engineering Team

**Context**

Diagramyx is an MVP browser-based diagram/whiteboard application focused on fast drawing, intuitive shape tools, and reliable local document editing. Key constraints for the project are:

- Rapid delivery for an MVP
- Web-first product optimized for desktop browsers
- Minimal initial infrastructure and hosting costs

**Decision**

Adopt a client-heavy architecture for the MVP:

- Frontend: React + Vite application rendering to an HTML Canvas (or layered canvases) for interactive drawing and shape tooling.
- State & Persistence: Document model kept in-memory on the client with local autosave to browser storage (IndexedDB). Periodic and explicit saves persisted to server storage.
- API: Lightweight Node.js service exposing REST endpoints for document storage and retrieval. No real-time collaboration in MVP.
- Database: PostgreSQL to store documents, metadata and user records (simple schema for versioned documents).
- Authentication: Minimal token-based authentication (JWT) for authenticated saves/loads; anonymous local editing allowed.

**Rationale**

- Client-heavy design minimizes backend complexity and hosting costs, enabling faster iteration on the drawing UX and rendering performance.
- Canvas rendering gives the fine-grained control needed for performant drawing, hit-testing and custom shape rendering.
- REST + periodic saves meets MVP needs; building a real-time sync layer now would add significant complexity and delay the product.

**Consequences**

Positive:

- Fast UI and rendering optimization focused on client.
- Lower infrastructure and operating cost.
- Simpler backend reduces development time to first release.

Negative / Trade-offs:

- No multi-device live collaboration at launch.
- Future migration to real-time sync (CRDTs/OT) will require careful design of the document model and migration paths.

**Implications for MVP scope**

- Prioritize robust single-user editing, undo/redo, autosave, export/import, and a small set of high-quality shape tools.
- Defer presence, multi-user editing, and low-latency real-time collaboration.

**Alternatives considered**

- Full real-time architecture (WebSockets + OT/CRDT): rejected for MVP due to scope and engineering cost.
- Serverless-only approach (pure cloud functions + object store): rejected in favor of a simple Node + Postgres service for predictable persistence and easier schema evolution.

**Related documents & links**

- PRD: [product/PRD.md](../product/PRD.md)
- Technical Requirements: [technical/TRD.md](../technical/TRD.md)
- Tech stack notes: [technical/tech-stack.md](../technical/tech-stack.md)
- System context and diagrams: [architecture/01-system-context.md](01-system-context.md)

**Implementation notes / Next steps**

1. Define the document JSON schema and versioning strategy (see follow-up item).
2. Implement local autosave using IndexedDB with background throttled writes.
3. Provide import/export (JSON + PNG) and one-click persistent save to server.
4. Create tests for undo/redo and document recovery after crashes.

**Follow-up checklist**

- [ ] Define document JSON schema and stable migration plan
- [ ] Implement autosave + recovery tests
- [ ] Add save/load API endpoints and DB migrations
- [ ] Add ADR for real-time sync approach if/when needed
