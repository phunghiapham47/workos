# WORKOS — Module Architecture

## System Identity

PERSONAL WORK OPERATING SYSTEM

WorkOS

WorkOS is the primary UI architecture reference for the personal operating system ecosystem.

DebtOS has been aligned to WorkOS UI architecture. Shared ecosystem patterns now include navigation, module panels, button/icon controls, modal/sheet rhythm, spacing, typography, and operational density.

## Core Philosophy

WorkOS is:

- Personal operational system
- Tactical execution interface
- Lightweight workflow cockpit
- Daily operational command system

WorkOS is not:

- Startup SaaS dashboard
- Enterprise PM tool
- Consumer productivity app
- Collaboration workspace
- Notion/Trello clone

Priority order:

1. Operational clarity
2. Fast workflow interaction
3. Stability
4. Mobile usability
5. Real-world daily usage refinement
6. Small UI polish only when useful

## UI Direction

Visual language:

- Industrial operating system
- Dense operational workflow UI
- Square panels
- Strong borders
- Subtle module shadows
- Monochrome icons
- Compact layout hierarchy
- Tactical spacing rhythm
- Grid-system aesthetic

Avoid:

- Glassmorphism
- Soft rounded startup dashboard style
- Decorative gradients
- Glossy UI
- Excessive whitespace
- Heavy redesigns
- Feature bloat

## Application Structure

Primary modules:

- Dashboard
- Projects
- Tasks
- System

Routes:

- `/`
- `/projects`
- `/tasks`
- `/system`

Default route:

- Dashboard

Desktop behavior:

- Sidebar + content layout
- Sticky app header
- Right-side detail panel where useful

Mobile behavior:

- Bottom navigation
- Sticky app header
- Full-screen sheet/detail view where useful
- Compact rows and reduced vertical waste

## Shared UI Primitives

Shared across WorkOS and aligned ecosystem apps:

- Desktop sidebar structure
- Mobile bottom navigation
- Sticky app header
- Module panel system
- Subtle module shadows
- Button and icon button system
- Status chips
- Registry rows
- Detail panels
- Modal/sheet rhythm
- Compact form controls
- Spacing and typography rhythm

Rules:

- Panels stay square and industrial.
- Borders provide structure before color.
- Shadows are subtle, not decorative.
- Icons stay monochrome.
- Color is reserved for tactical status scanning.

## Dashboard

Purpose:

Dashboard answers:

```text
What requires action today?
```

It is not a high-level analytics overview.

Current structure:

1. Robot speech panel
2. Project Status count panel
3. Overdue + Today action queue
4. Running projects
5. Monday Report copy action

Robot:

- Uses the approved DebtOS PixelRobot geometry.
- Stays compact.
- Speaks through a speech-card layout.
- Should not be redesigned or turned into a mascot.

Project Status:

- Count-based only.
- No weighted progress.
- No ambiguous progress ratios.
- Status order:
  - Planning
  - In Progress
  - Review
  - Payment
  - Done

Action Queue:

- Shows only overdue and today tasks.
- Supports quick Done action.
- Supports undo through shared state.
- Does not mix project rows into the task queue.

Running Projects:

- Shows active projects only.
- Displays project name, client, status, and short note.
- Avoid fake counters or analytics.

Monday Report:

- Copies formatted operational lines to clipboard.
- No export/download modal.
- No reporting dashboard.

## Projects

Purpose:

Projects is the operational execution registry.

Workflow statuses:

- Planning
- In Progress
- Review
- Payment
- Done

Done state:

- Visually muted.
- Lower priority.
- Operationally archived.

Top metrics:

- Active Pipeline
- Pipeline Value
- Outstanding
- Paid Received

Finance logic:

- Revenue is stored as excl.VAT by default.
- Paid stores total received amount.
- Outstanding for a project is `revenue - paid`.
- Outstanding Exposure metric only counts projects in `Payment`.
- Paid Received is the sum of paid amounts.

Project queue:

- Compact operational registry.
- Active projects prioritized.
- Mobile cards stay dense.
- Revenue and Outstanding sit side by side on mobile.
- Status, Edit, and Delete actions share one row on mobile.

Detail panel:

- Desktop: right-side inspection panel.
- Mobile: full-screen sheet.
- Prioritize status, outstanding, revenue, paid, and note.

Do not add:

- Assignees
- Priority
- Comments
- Attachments
- Kanban
- Analytics
- Team features

## Tasks

Purpose:

Tasks is the micro execution queue.

Tasks are:

- Fast
- Disposable
- Operational
- Independent from projects

Current structure:

- Quick input
- Compact counters
- One filtered task registry
- Tabs:
  - Overdue
  - Today
  - Upcoming
  - Done

Supported actions:

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

- If no date is provided, assign today.
- Done tasks can be restored.
- Restore uses previous task state where available.
- If previous status is not available, grouping derives from due date.

Avoid:

- Kanban
- Calendar view
- Recurring logic
- Automation
- AI parsing
- Heavy task management behavior

## System

Purpose:

System is a lightweight maintenance layer.

Current contents only:

- Backup Snapshot
- Version

Current version label:

```text
v1.0-workos
```

Removed because there is no login/auth:

- Logout

Removed to keep System minimal:

- Export Data
- Route/state placeholder blocks
- Settings complexity
- Sync toggles
- Profile systems

## Current Technical State

- Build passes.
- Lint passes.
- Desktop QA passed.
- Mobile responsive QA passed.
- No horizontal overflow detected.
- Supabase persistence is active.
- Dashboard, Projects, and Tasks read from `WorkOSProvider`.
- App opens directly to Dashboard.
- No auth is implemented.

## Known Risk Areas

- Dirty files should be reviewed before deployment and staged by phase.
- Supabase schema must stay aligned with current app mapping.
- `tasks.completed` is the database source for UI task done state.
- No auth or user-level data partitioning exists yet.
- Large UI refactors risk breaking the stabilized ecosystem pattern.

## Safe Work Process

For future changes:

1. Work in small phases.
2. Avoid large one-shot refactors.
3. Preserve current Supabase mapping unless intentionally migrating schema.
4. Run `npm run build`.
5. Run `npm run lint`.
6. Start local dev server before commit.
7. QA desktop.
8. QA mobile.
9. Check no horizontal overflow.
10. Verify Supabase flows if persistence is touched.
