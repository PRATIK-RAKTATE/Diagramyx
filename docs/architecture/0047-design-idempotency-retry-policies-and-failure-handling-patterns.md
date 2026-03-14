# ADR-XXXX: Idempotency, Retry & Failure Handling Strategy

## Status

Proposed | Accepted

## Context
The diagram app autosaves documents to the backend via REST API.
Users may trigger rapid consecutive saves, refresh the page, or
experience unstable network connections.

We must tolerate:

- duplicate save requests
- network timeouts
- partial writes
- browser retries
- server restarts

Constraints:
- single-user MVP
- no collaboration conflicts
- low infrastructure complexity
- acceptable minor data loss during crashes

## Decision

### Idempotency Model

Document saves are idempotent by document version.

- each save includes a client-generated version ID
- server overwrites document only if version is newer
- duplicate versions are ignored safely
- no global idempotency key store required

### Retry Policy
Retries are client-owned.

- browser retries failed saves automatically
- max 3 retries
- exponential backoff (500ms → 2s)
- only retry network/timeout errors
- validation errors are never retried

### Failure Handling
Failure classification:

- retryable: timeout, connection drop, 5xx
- fatal: validation error, corrupted payload

Partial write protection:

- saves are atomic database transactions
- failed writes roll back completely

Timeout rules:

- server request timeout: 5 seconds
- client stops retrying after limit reached

## Rationale
Version-based idempotency is simpler than a global key system
and sufficient for a single-user app.

Client-managed retries reduce backend complexity.
Atomic DB writes prevent corrupted documents.
This balances reliability with MVP simplicity.

## Consequences

### Positive
- duplicate saves are harmless
- autosave remains stable under bad networks
- minimal backend state tracking
- simple operational model

### Negative
- version conflicts resolved by overwrite
- no cross-device conflict protection
- retry storms possible under extreme failure

### Risks
- lost saves if browser closes mid-retry
- rapid autosave loops under flaky networks

## MVP Impact
- reliability optimized for single device use
- no offline recovery guarantees
- no multi-session conflict handling
- acceptable minor data loss edge cases

## Alternatives Considered
Global idempotency key storage → rejected as overengineering  
Server-managed retries → rejected for added backend complexity

## Follow-up
- [ ] add structured error codes
- [ ] implement autosave queue in client
- [ ] monitor save failure rates
- [ ] stress test retry behavior