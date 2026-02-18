# User Story: US-014

**Title:** User Login

**Module:** Authentication

**Actor:** Guest User

## Epic
Multi-Tenancy & Access Control

## Persona
Individual User

## User Story
As a registered user

I want to log in using my credentials (email/password or OAuth)

So that I can securely access my workspace and saved data.

## Acceptance Criteria
- Credentials must be validated.

- JWT access token issued upon success.

- Failed login attempts are logged.

- Rate limiting enforced after repeated failures.