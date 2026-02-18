# User Story: US-015

**Title:** Session Storage

**Module:** Authentication

**Actor:** Guest User

## Epic
Secured storage of JWT tokens

## Persona
Individual User

## User Story
As an authenticated user,

I want my session to be securely maintained after login,

So that I can continue using the platform without logging in repeatedly.

## Acceptance Criteria

- JWT tokens must be saved securely.

- Token must be transmitted only over HTTPS.

- Access token must have an expiration time.

- Refresh token mechanism must be implemented.

- User must be automatically logged out when token expires.

- Logout must clear all authentication tokens from client storage.