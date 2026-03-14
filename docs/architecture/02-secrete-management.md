# secrete management - Digramyx

## Purpose

Diagramyx MVP is a secure, web-based diagram system designed with strong encryption architecture and centralized secret management. It enables users to create, store, share, and export diagrams while ensuring data confidentiality, integrity, and controlled access through secure authentication and cloud-backed encrypted storage.

The platform implements end-to-end encryption principles, secure key handling, and environment-based secret management to protect user data across all layers of the system.

### encryption, secrete management Diagram (C4 Level 1)
 ![System Context Diagram](../assets/images/secrete-management%20.png)

 Shows:

 * Your **security mechanism flow** 
* **User data security**
* **External packages added to make system secure** 
* **High-level data storage and enscyption**

#
---

## 2. System Boundary

### Inside the Boundary

* Data input
* Data enscyption
* Token generation 
* Role based authorization 
* Secure data decription for authentication


---

## 3. Actors


### Guest User

* Access the limited features without login 

### Authenticated User

* Create account using required data.
* Data enscyption for security
* Secured data storage 


### Admin

* Monitor system data flow
* Audit user login and logout log
* Handle abuse & support

## 4. External Integrations

### Google OAuth

In systems where authentication is handled exclusively through Google OAuth, user identity is directly tied to their Google account email address.

If a user permanently loses access to their registered email account (e.g., account deletion, hacking, forgotten credentials without recovery options), they may also permanently lose access to their application profile.

### Stripe

In systems where payment processing is handled exclusively through Stripe, all financial transactions, subscription management, and billing workflows are directly dependent on Stripe’s infrastructure and account status.

If the Stripe account is suspended, restricted, misconfigured, or temporarily unavailable (e.g., compliance review, API key compromise, policy violation, service outage), the application may lose the ability to process payments, manage subscriptions, or receive payouts.

