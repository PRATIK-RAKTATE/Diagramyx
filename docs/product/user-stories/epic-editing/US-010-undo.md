# Undo Action System

## Epic
History & State Management

## Persona
Designer

## User Story
As a user,
I want to undo my last actions,
So that I can safely experiment without losing work.

## Acceptance Criteria
- User can undo the most recent action.
- Multiple undo steps are supported.
- Undo restores object position, style, and content.
- Undo works for creation, deletion, and edits.
- Undo history persists during the session.
- Visual feedback confirms undo action.

## Performance Expectations
- Undo executes instantly (<100 ms).
- History operations do not freeze the canvas.
- Memory usage remains stable with deep history stacks.