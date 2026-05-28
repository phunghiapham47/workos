# WorkOS Architecture Notes

## Architecture Role

WorkOS is the primary UI architecture reference for the personal operating system ecosystem.

DebtOS is now aligned to WorkOS shell and UI primitives. Future ecosystem apps should treat WorkOS as the reference for operational layout density, panel rhythm, navigation, modal/sheet behavior, and typography.

## App Structure

Framework:

- React
- Vite
- Tailwind CSS
- Supabase

Main routes:

- `/`
- `/projects`
- `/tasks`
- `/system`

App shell:

- Desktop sidebar.
- Sticky app header.
- Mobile bottom navigation.
- Route content inside dense operational module layout.

Do not rewrite App Shell unless the shell itself is the requested scope.

## State Architecture

`WorkOSProvider` is the single source of truth.

Responsibilities:

- Load projects from Supabase.
- Load tasks from Supabase.
- Expose shared project/task state to Dashboard, Projects, and Tasks.
- Perform optimistic writes.
- Roll back affected state when Supabase mutation fails.

Dashboard must continue to derive data from provider state, not from static mock data.

## Supabase Mapping

Projects:

- Table: `projects`
- App fields: `id`, `name`, `client`, `status`, `revenue`, `paid`, `note`
- App calculates outstanding.

Tasks:

- Table: `tasks`
- DB done source: `completed`
- UI mapping:
  - `completed=false` -> `To-do`
  - `completed=true` -> `Done`

No auth is implemented yet.

## UI Architecture

Current primitives:

- Module panels
- Status chips
- Registry rows
- Icon buttons
- Dense metrics
- Right-side desktop detail panels
- Mobile full-screen sheets
- Sticky header
- Sidebar/bottom nav

Visual rules:

- Square panels.
- Strong borders.
- Subtle module shadows.
- Monochrome icons.
- Muted tactical colors only for state scanning.
- Compact spacing.
- No glassmorphism.
- No soft rounded SaaS redesign.

## Known Risk Areas

- Dirty files should be reviewed before deployment and staged by phase.
- Supabase schema and provider mapping must stay aligned.
- No auth or user partitioning exists.
- Large UI refactors can break ecosystem consistency.
- Mobile density should be protected when adding features.

## Change Discipline

Safe phases:

1. Read affected files.
2. Make scoped change.
3. Run build/lint.
4. Start local dev server.
5. QA desktop and mobile.
6. Check no horizontal overflow.
7. Commit only intended files.
