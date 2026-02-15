## don't use chatgpt ask me(pratik raktate about any issues) if not available just wrote in that "comment: "i can understand this do this in the PR review"" 

# Technical Requirements Document (TRD)

## 1. Document Control

**Version:** 1.0.0

**Status:** In Review

**Author:** Pravin Pagar

**Reviewer:** Pratik B. Raktate

**Last Updated:** 15 February 2026

**Stakeholders:** Engineering team


---

## 2. Overview

### 2.1 Purpose

Define the technical architecture, technology stack, and implementation standards required to build and maintain the system.

### 2.2 Scope

This document covers technical design and implementation details. It excludes product requirements (PRD) and non-functional requirements (NFR).

### 2.3 Intended Audience

* Backend engineers
* Frontend engineers
* DevOps engineers
* New team members

---

## 3. System Architecture

### 3.1 High-Level Architecture

Describe the overall system structure and major components.

```
Client Browser
├── UI with drawing engine 
├── Local Storage

API Services
├── OAuth
├── Express API (internal)

Database
├── Monogodb atlas
 ```

### 3.2 Architecture Diagram

Provide a diagram or ASCII representation.

```
Client → API → Database
           ↓
    external services
```

---

## 4. Core Technical Features

Describe the system’s technical capabilities.

### 4.1 API Layer

* REST or GraphQL
* Request validation
* Error handling standards

### 4.2 Authentication & Session Management

* Token strategy (JWT, sessions)
* Session expiration & revocation

### 4.3 Document Management

* Session management
* Import and export of diagrams files

<!--
### 4.4 Background Processing

* Job queues
* Scheduled tasks

### 4.5 File & Asset Handling (if applicable)

* Storage solution
* Access control
-->
### 4.6 login with google (Oauth)
  * Login user with google
---

## 5. Technology Stack

### 5.1 Languages & Runtime

* React (v19.2)
* Node.js (v22)

### 5.2 Frameworks & Libraries

* Express / Fastify / NestJS
* Validation libraries
* Logging libraries
* Tailwind CSS 
* NextAuth - for Oauth integration
* JointJS/PixiJS

### 5.3 Database & Storage

* Primary database (e.g., PostgreSQL, MongoDB)
* Local storage

### 5.4 Tooling

* Linting (ESLint)
* Testing framework
* CI/CD tools
* Package manager (npm/pnpm)
* State Management (Redux Toolkit)

### 5.5 Rationale

these technologies were selected to archive
  * Low latency
  * horizontal scalability
  * maintainable code architecture

---

## 6. API & Service Standards

### 6.1 Naming Conventions

* Endpoint naming rules
* Resource naming

### 6.2 Versioning Strategy

* URL versioning (`/v1/`)
* Backward compatibility rules

### 6.3 Error Handling

Standard error response format.

```json
{
  "error": "INVALID_INPUT",
  "message": "Email is required"
}
```

### 6.4 Input Validation

* Schema validation approach
* Sanitization rules

---

## 7. Security Considerations

### 7.1 Authentication Security

* Password hashing (bcrypt)
* Token expiration
* Secure cookies

### 7.2 Data Protection

* HTTPS enforcement
* Encryption at rest (if applicable)

### 7.3 Input & Output Safety

* Prevent injection attacks
* Output encoding

---

## 8. Performance & Scalability

### 8.1 Performance Strategies

* Caching
* Query optimization
* Pagination

### 8.2 Scalability Approach

* Horizontal scaling
* Stateless services
* Load balancing

---

## 9. Observability & Logging

### 9.1 Logging

* Structured logs
* Log levels

### 9.2 Metrics

* Request latency
* Error rates

### 9.3 Health Checks

* Liveness & readiness endpoints

---

## 10. Deployment & Environment Strategy

### 10.1 Environments

* Local
* Staging
* Production

### 10.2 CI/CD Integration

* Automated tests before merge
* Deployment approvals

### 10.3 Rollback Strategy

* Versioned deployments
* Database migration safety

---

## 11. Assumptions & Constraints

Document known limitations and assumptions.

---

## 12. Risks & Mitigations

| Risk              | Impact             | Mitigation              |
| ----------------- | ------------------ | ----------------------- |
| DB scaling limits | Performance issues | Read replicas           |
| Token leakage     | Account compromise | Short expiry + rotation |

---

## 13. Open Questions

Track unresolved technical decisions.

---

## 14. Appendix

* Related docs: PRD, NFR, Threat Model
* Glossary of technical terms

---
