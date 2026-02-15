# Product Requirements Document (PRD)

## 1. Document Control

**Version:** 1.0.0

**Status:** In Review

**Author:** Your name here

**Reviewer:** Pratik B. Raktate

**Last Updated:** 15 februay 2026

**Stakeholders:** Engineering team

---

## 2. Product Overview

### 2.1 Purpose

Diagramyx is the tool which helps user to create system architecture, mindmap, diagram design seamlessly.

### 2.2 Vision

To make the real world project that real user can use and major part of vision is learning.

### 2.3 Background

Tools like erazer is very good but they charge 1900 per month for the using software in paid tier so as a developer we can also build same system and provide cheap service of designing.


---

## 3. Problem Statement

There is no software which gives the 1$ plan and very limited in free tier.


## 4. Goals & Success Metrics
    1. Build responssive user friedly system design tool
    2. Learning from real world project building

### 4.1 Business Goals

* N/A


### 4.2 User Success Metrics

* If we got 10 monthly active users.
* If this is usable in our team (internal)

### 4.3 Non-Goals

Buissness or selling software 1$ plan is just for testing

---

## 5. Target Users & Personas


Developers, Engineers, software engineering students.


## 6. User Stories & Use Cases

### 6.1 Core User Stories

Format:

```
As a user i want free tier system disign tool 
I want capability to add colourfull images of
compnents liker server, client and more so that 
benefits me to visualize my application architecture.
```

### 6.2 Key Use Cases

* Desing system architecture
* Mindmap
* Learning things

---

## 7. Functional Requirements

### 7.1 Feature List

    1. Infinite visual canvas
    2. Add and arrage basic diagram elements
        a. circle
        b. rectangle
        c. arrow
        d. line 
        e. text
    3. add 250+ symbols like
        a. server
        b. client
        c. code
    4. arrow connection to the objects 
    5. arrow smooth turns and navigation
    6. grid system for the alignment guides
    7. export in formats like png.  
    8. undo redo history
    9. keyboard shortcuts for every object
        a. /icon-name
        b. /circle
        c. /line
    10. smooth zooming overall smooth UX


### 7.2 Acceptance Criteria

User can go on website with the good latency and lagging (latency < 500m0) user can create diagrams and design architecture seamlessly 

0 lags and bugs

---

## 8. User Flows

User came to system and and can directly draw diagrams

for the export user needs login then they can export

### Example: Login Flow

1. User enters credentials
2. System validates input
3. System authenticates user
4. Session created
5. User redirected to dashboard

Include diagrams if available.

---

## 9. Assumptions & Constraints

* User is developer or student.

---

## 10. Dependencies

* Canvas libraries, OAuth, payment gateway
* Internal systems
* Third-party APIs

---

## 11. Risks & Mitigations

| Risk                | Impact                  | Mitigation             |
| ------------------- | ----------------------- | ---------------------- |
| OAuth downtime      | Users cannot login      | Provide fallback login |
| High traffic spikes | Performance degradation | Manual deploy          |

---

## 12. Analytics & Tracking

Define what to measure.

* Total visits to site
* scrolls what they does everything
* join site to google analytics, google search console
* Metrics dashboards
* 10 monthly active users

---

## 13. Release Plan

Releasing at first stable version at 15 march v1.0.0

### 13.1 Milestones

* N/A

### 13.2 Rollout Strategy

* N/A in mvp
* Feature flags


---

## 14. Open Questions

Track unresolved decisions.

---
