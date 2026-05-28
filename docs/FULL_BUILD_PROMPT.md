# WORKOS — Current Build Direction

You are building and maintaining:

```text
PERSONAL WORK OPERATING SYSTEM
WorkOS
```

WorkOS is a personal operational management web app for projects, tasks, workflow tracking, and operational queue management.

WorkOS is now the primary UI architecture reference for the personal operating system ecosystem. DebtOS has been aligned to WorkOS UI architecture.

## Product Identity

The app should feel like:

- Industrial operating system
- Dense operational workflow UI
- Tactical execution console
- Personal operational control system
- Retro terminal-influenced workflow machine

The app should not feel like:

- Startup SaaS dashboard
- Consumer productivity app
- Enterprise PM software
- Notion/Trello clone
- Soft rounded colorful app
- Glassmorphism interface

## Priorities

1. Operational clarity
2. Fast workflow interaction
3. Stability
4. Mobile usability
5. Real-world daily usage refinement
6. Small UI polish only when useful

Rule:

```text
Stability > feature expansion
Operational clarity > decoration
```

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Supabase
- Lucide icons

## Routes

- `/` Dashboard
- `/projects` Projects
- `/tasks` Tasks
- `/system` System

App opens directly to Dashboard.

No auth/login gate exists yet.

## Shared Ecosystem UI Architecture

Shared patterns across WorkOS and aligned ecosystem apps:

- Desktop sidebar
- Mobile bottom navigation
- Sticky app header
- Square module panels
- Subtle module shadows
- Monochrome icons
- Compact button/icon button system
- Modal/sheet rhythm
- Dense registry rows
- Compact status chips
- Strong borders
- Consistent spacing and typography rhythm

Do not redesign these primitives without a specific reason.

## Visual Rules

Use:

- Square panels
- Strong borders
- Subtle operational shadows
- Monochrome shell
- Muted tactical status colors
- Compact layout hierarchy
- Scan-first typography

Avoid:

- Glassmorphism
- Soft UI
- Big rounded SaaS cards
- Decorative gradients
- Glossy UI
- Excessive whitespace
- Heavy shadows
- Colorful dashboards
- Hero/landing-page treatment

## Dashboard

Purpose:

```text
What requires action today?
```

Current structure:

1. Robot speech panel
2. Project Status counts
3. Overdue + Today action queue
4. Running projects
5. Monday Report copy button

Dashboard should not become:

- Analytics overview
- Reporting dashboard
- Chart surface
- Duplicate metrics page

Rules:

- Keep the approved DebtOS PixelRobot.
- Do not resize/redesign the robot.
- No weighted project progress.
- No progress bar.
- Project Status uses simple counts only.
- Action Queue shows overdue and today tasks only.
- Running Projects shows active projects only.

## Projects

Purpose:

Operational project registry and execution tracking.

Statuses:

- Planning
- In Progress
- Review
- Payment
- Done

Required capabilities:

- Add project
- Edit project
- Delete project
- Inline status update
- Update revenue
- Update paid
- Outstanding auto-calculates

Current metrics:

- Active Pipeline
- Pipeline Value
- Outstanding
- Paid Received

Finance rules:

- Outstanding project amount = `max(revenue - paid, 0)`.
- Outstanding Exposure only counts `Payment` projects.
- Paid Received is sum of paid amounts.

Avoid:

- Kanban
- Comments
- Assignees
- Attachments
- Team features
- Analytics
- Enterprise PM behavior

## Tasks

Purpose:

Micro execution queue for fast operational work.

Current structure:

- Quick input
- Compact counters
- One filtered registry list
- Tabs:
  - Overdue
  - Today
  - Upcoming
  - Done

Required capabilities:

- Add task
- Edit task
- Complete task
- Undo task
- Delete task

Quick input:

```text
25/05 - Follow payment Vinamilk
```

Rules:

- No date assigns today.
- Done tab must support Undo.
- Keep checklist rows compact.
- Avoid Kanban/calendar/recurring logic for now.

## System

Purpose:

Lightweight maintenance layer.

Keep only:

- Backup Snapshot
- Version

Current version:

```text
v1.0-workos
```

Do not add:

- Logout
- Auth controls
- Export UI
- Analytics
- Profile settings
- Integration settings
- Placeholder filler

## Supabase

Supabase persistence is active.

`WorkOSProvider` is the single source of truth for UI state.

Current mapping:

- Projects read/write `projects`.
- Tasks read/write `tasks`.
- UI task `Done` maps to database `completed=true`.
- UI task `To-do` maps to database `completed=false`.

Do not add auth yet.

Do not change schema mapping without a deliberate migration.

## Current Technical State

- Build passes.
- Lint passes.
- Desktop QA passed.
- Mobile responsive QA passed.
- No horizontal overflow detected.
- Local QA completed before commit.

Recent ecosystem/UI polish:

- Removed nav abbreviations.
- Added subtle module shadow system matching DebtOS alignment.
- Preserved square/industrial panel language.
- Aligned visual hierarchy.

## Known Risk Areas

- Dirty files should be reviewed before deployment and staged by phase.
- Supabase schema differs from earlier docs: tasks use `completed`, not `status`.
- No auth or per-user partitioning exists yet.
- Heavy UI redesign risks breaking the ecosystem reference pattern.
- Deployment requires Vercel env vars.

## Safe Workflow

Before commit/deployment:

1. Work in a small phase.
2. Avoid broad refactors.
3. Run `npm run build`.
4. Run `npm run lint`.
5. Start local dev server.
6. QA desktop.
7. QA mobile.
8. Confirm no horizontal overflow.
9. Verify Supabase flows if persistence is touched.
10. Commit only the intended files.

## Deployment

Vercel:

- Build command: `npm run build`
- Output directory: `dist`
- Required env vars:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- GitHub `main` is connected to Vercel for automatic production deployment.

No login route or logout control should be present in the deployed v1 app.
