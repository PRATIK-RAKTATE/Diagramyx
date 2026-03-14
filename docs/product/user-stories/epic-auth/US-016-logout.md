# User Story: US-016

**Title:** User Logout

**Module:** Authentication

**Actor:** Guest User

## Epic

User Authentication & Session Termination

## Persona

Individual User

As an authenticated user,

I want to log out of my account securely,
So that my session is terminated and 
unauthorized users cannot access my workspace.

## Acceptance Criteria

- User must be able to initiate logout via a visible logout button.

- All active authentication tokens (access and refresh tokens) must be invalidated upon logout.

- User must be redirected to the login page after successful logout.

- Access to protected routes must be denied after logout.