# WorkOS

Personal Work Operating System.

WorkOS is a personal operational management web app for projects, tasks, workflow tracking, and daily operational queue management.

It is now the primary UI architecture reference for the personal operating system ecosystem. DebtOS has been aligned to the WorkOS shell, panel, navigation, spacing, typography, modal, and button rhythms.

## Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Supabase
- Lucide icons

## Product Direction

WorkOS should feel like:

- Industrial operating system
- Dense operational workflow UI
- Personal operational control system
- Tactical workflow terminal
- Square, scan-first execution console

WorkOS should not feel like:

- Startup SaaS dashboard
- Consumer productivity app
- Enterprise PM suite
- Glassmorphism UI
- Soft rounded colorful dashboard

## UI Architecture

Current UI architecture:

- Desktop sidebar
- Mobile bottom navigation
- Sticky app header
- Square module panels
- Strong borders
- Subtle module shadows
- Monochrome icons
- Compact layout hierarchy
- Dense registry rows
- Modal and mobile sheet rhythm

Shared ecosystem patterns now used across WorkOS and DebtOS:

- Navigation structure
- Module panel system
- Button and icon button system
- Modal/sheet rhythm
- Spacing scale
- Typography rhythm
- Operational density

Recent UI polish:

- Removed nav abbreviations
- Improved module shadow system
- Aligned visual hierarchy
- Preserved square industrial panel language

## Modules

- Dashboard: action-focused command view for today's queue and running projects.
- Projects: operational project registry with status, revenue, paid, and outstanding tracking.
- Tasks: fast execution queue with quick input, complete, undo, edit, and delete.
- System: lightweight maintenance page with Backup Snapshot and Version only.

## Supabase Persistence

WorkOS uses Supabase as persistence behind `WorkOSProvider`, which remains the single source of truth for the UI.

Current table mapping:

- `projects`: `id`, `created_at`, `name`, `client`, `status`, `revenue`, `paid`, `outstanding`, `note`
- `tasks`: `id`, `created_at`, `title`, `due_date`, `completed`

Important mapping:

- UI task status `To-do` maps to `completed=false`.
- UI task status `Done` maps to `completed=true`.
- Outstanding is calculated in the app from project revenue and paid values.
- Current project outstanding exposure only treats `Payment` projects as receivable.

Auth is intentionally not implemented yet.

## Setup

Create `.env.local`:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Install and run:

```bash
npm install
npm run dev
```

Build and lint:

```bash
npm run build
npm run lint
```

## Deployment

Vercel deployment settings:

- Build command: `npm run build`
- Output directory: `dist`
- Required environment variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

The GitHub `main` branch is connected to Vercel. Future pushes to `main` should trigger production deployment automatically.

The app opens directly to Dashboard. There is no login or logout flow.

## Required QA Before Deployment

Before deployment or commit:

1. Run `npm run build`.
2. Run `npm run lint`.
3. Start local dev server with `npm run dev`.
4. Check desktop layout.
5. Check mobile layout.
6. Verify no horizontal overflow.
7. Verify Supabase persistence for add/edit/delete project and add/complete/undo/delete task when persistence is touched.

## Current State

- Build passes.
- Lint passes.
- Desktop QA passed.
- Mobile responsive QA passed.
- No horizontal overflow detected.
- Supabase persistence is active.
- App opens directly to Dashboard.

Known risk areas:

- Dirty files should be reviewed before deployment and staged by phase.
- Supabase schema must stay aligned with the current app mapping, especially `tasks.completed`.
- No auth or row-level user separation exists yet.
- Browser form automation can be blocked by the in-app browser clipboard layer; use direct Supabase verification scripts when needed.

## Constraints

- Stability over feature expansion.
- Operational clarity over decoration.
- UI polish must remain system-like.
- Avoid heavy redesigns.
- Avoid glassmorphism and soft UI.
- Preserve current Supabase schema and persistence behavior.
