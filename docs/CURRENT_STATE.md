# WorkOS Current State

## Project State

WorkOS is a personal operational management web app built with React, Vite, Tailwind CSS, and Supabase.

Core purpose:

- Projects
- Tasks
- Workflow tracking
- Operational queue management

## Ecosystem State

WorkOS is now the primary UI architecture reference for the personal operating system ecosystem.

DebtOS has been aligned to WorkOS UI architecture.

Shared ecosystem patterns:

- Desktop sidebar structure
- Mobile bottom navigation
- Sticky app header
- Module panel system
- Button/icon button system
- Modal/sheet rhythm
- Spacing system
- Typography rhythm
- Operational layout density

## Current Visual Language

- Industrial operating system
- Square panels
- Dense operational layout
- Strong borders
- Subtle module shadows
- Monochrome icons
- Compact workflow-focused hierarchy
- Muted tactical status colors

Avoid:

- Glassmorphism
- Soft rounded startup dashboard aesthetic
- Decorative gradients
- Glossy UI
- Excessive whitespace

## Recent UI Polish

- Removed nav abbreviations.
- Improved module shadow system.
- Aligned visual hierarchy.
- Preserved square panel system.
- Preserved dense operational hierarchy.

## Technical State

- Build passes.
- Lint passes.
- Desktop QA passed.
- Mobile responsive QA passed.
- No horizontal overflow detected.
- Supabase persistence is active.
- App opens directly to Dashboard.
- No auth is implemented.

## Current Modules

Dashboard:

- Action-focused daily command view.
- Robot speech panel.
- Project Status counts.
- Overdue + Today action queue.
- Running projects.
- Monday Report copy action.

Projects:

- Supabase-backed project registry.
- Add/edit/delete.
- Inline status update.
- Revenue/paid/outstanding tracking.

Tasks:

- Supabase-backed task registry.
- Quick input.
- Filter tabs.
- Add/edit/complete/undo/delete.

System:

- Backup Snapshot.
- Version `v1.0-workos`.

## Known Risk Areas

- Dirty files should be reviewed before deployment and staged by phase.
- Supabase schema must preserve current provider mapping.
- Tasks use `completed: boolean`, not a `status` text column.
- No auth or per-user partitioning exists.
- Heavy redesigns risk breaking ecosystem alignment.

## Constraints Going Forward

- Do not redesign the app.
- Do not soften the UI.
- Do not introduce glassmorphism.
- Keep dense operational layout.
- Preserve workflow speed and scanability.
- Preserve current Supabase mapping and persistence behavior.
- Make small, phased changes.

## Required Workflow Before Commit

1. Read affected files.
2. Make scoped changes.
3. Run `npm run build`.
4. Run `npm run lint`.
5. Start local dev server.
6. QA desktop.
7. QA mobile.
8. Confirm no horizontal overflow.
9. Verify Supabase flows if persistence changed.
10. Commit only intended files.
