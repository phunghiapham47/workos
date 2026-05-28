# WORKOS — Full Build Prompt v1

You are building a production-ready web application called:

PERSONAL WORK OPERATING SYSTEM

WorkOS

This application is a personal operational system for an Account Executive.

The app should feel like:
- A tactical execution console
- A mission control interface
- A lightweight operational cockpit

The app should NOT feel like:
- A startup SaaS dashboard
- A productivity collaboration app
- A Notion/Trello clone
- An enterprise PM system

Reference UI language:
DebtOS UI Design Language.md

Reference architecture:
WORKOS_MODULES.md

Reference database:
DATABASE_SCHEMA.md

---

# CORE PHILOSOPHY

Prioritize:
- Minimalism
- Operational clarity
- Fast interaction
- Low friction
- Tactical UI feeling

Avoid:
- Feature bloat
- Fancy SaaS patterns
- Over-configuration
- Unnecessary abstractions

Rule:
Remove > Add

---

# TECH STACK

Build using:
- React
- TypeScript
- Vite
- TailwindCSS
- Supabase

Requirements:
- Responsive
- Desktop-first
- Mobile supported
- Fast rendering
- Minimal dependencies

---

# APPLICATION STRUCTURE

Main modules:
- Dashboard
- Projects
- Tasks
- System

Main routes:
- /
- /projects
- /tasks
- /system

Desktop layout:
- Left navigation
- Main content area
- Right-side detail panel

Mobile layout:
- Bottom navigation
- Full-screen detail view

---

# DESIGN LANGUAGE

Follow DebtOS visual direction.

Use:
- Monochrome UI
- Thin borders
- Strong typography
- Grid layouts
- Large whitespace
- Tactical visual hierarchy

Avoid:
- Gradients
- Glassmorphism
- Heavy shadows
- Bright SaaS colors
- Over-animation

Animation:
- Minimal
- Fast
- Utility-focused

Border radius:
- Small
- Tactical
- Sharp feeling

---

# TYPOGRAPHY

Style direction:
- Strong hierarchy
- Uppercase system labels
- Large operational numbers
- Compact tactical labels

Suggested:
- Inter
- IBM Plex Mono
- Geist Mono

Use mono fonts selectively for:
- Labels
- Statuses
- Operational metrics

---

# COLOR SYSTEM

Base:
- Black
- White
- Gray

Accent colors:
- Muted operational colors only

Suggested:
- Blue → In progress
- Orange → Chờ thanh toán
- Purple → Nghiệm thu
- Gray → Done

Avoid:
- Saturated UI palettes
- Rainbow dashboards

---

# DATABASE

Use Supabase.

Tables:
- projects
- tasks

Follow DATABASE_SCHEMA.md exactly.

Do not invent extra tables unless necessary.

Avoid:
- Team systems
- Permission layers
- Notification systems
- Activity feeds

---

# MODULE 1 — DASHBOARD

Purpose:
Operational command center.

Dashboard must instantly show:
- Current operational load
- Active projects
- Outstanding exposure
- Today tasks

---

## Mission Panel

Left side:
- Pixel/terminal robot
- Operational system message

Messages:
- WORKLOAD OVERFLOW DETECTED.
- EXECUTION PIPELINE ACTIVE.
- OPERATIONAL FLOW STABLE.
- FREE TODAY.
- OUTSTANDING COLLECTION REQUIRED.

Right side:
- Weighted project progress
- Operational state label

States:
- STABLE
- ACTIVE
- WARNING
- OVERLOAD

---

## Operational Cards

Three cards only:
- Active Pipeline
- Outstanding Exposure
- Today Load

No analytics dashboard behavior.

---

## Today Queue

Priority order:
1. Overdue tasks
2. Today tasks
3. Nghiệm thu projects
4. Chờ thanh toán projects

Max:
- 3–5 items

---

## Monday Report

Button:
COPY MONDAY REPORT

Behavior:
- Copies formatted text
- Lightweight utility only

Do not build:
- Reporting systems
- Charts
- Analytics

---

# MODULE 2 — PROJECTS

Purpose:
Operational execution tracking.

The module must remain:
- Minimal
- Fast
- Lightweight

Avoid:
- Enterprise PM complexity
- Collaboration systems
- Heavy workflows

---

## Workflow Statuses

Statuses:
- Lead/Brief
- Planning
- In progress
- Nghiệm thu
- Chờ thanh toán
- Done

Done:
- Lower visual priority
- Archived feeling

---

## Projects Page Structure

Top:
- Active Pipeline
- Pipeline Value
- Outstanding Exposure

Middle:
- Status chips

Bottom:
- Project queue

---

## Project Queue

Each row should display:
- Project Name
- Client
- Small note
- Revenue
- Status
- Outstanding amount

---

## Project Detail Panel

Minimal fields only:
- Project Name
- Client
- Status
- Revenue
- Paid
- Outstanding
- Note

Do NOT add:
- Next Action
- Finance Summary
- Quick Actions
- Comments
- Team systems

---

# FINANCE LOGIC

Revenue:
- excl.VAT by default

Paid:
- Total paid amount only

Formula:
Outstanding = Revenue - Paid

Dashboard should calculate:
- Outstanding exposure
- Active pipeline value
- Pending collection

---

# MODULE 3 — TASKS

Purpose:
Micro execution queue.

Tasks should feel:
- Fast
- Disposable
- Operational

Avoid:
- Heavy task systems
- Calendar apps
- Kanban systems
- Productivity SaaS behavior

---

## Task Input

Use command-style input:

DD/MM — Task content

Examples:
- 29/5 — Follow payment Coca
- 05/10 — Check client payment

Behavior:
- Press Enter to add
- Auto parse dates
- No date = current day

---

## Task Structure

Fields:
- Due Date
- Title
- Status
- Delete action

Statuses:
- To-do
- Done

---

## Task Grouping

Group by:
- OVERDUE
- TODAY
- Monthly sections
- DONE

Examples:
- MAY 2026
- JUN 2026
- OCT 2026

Done tasks:
- Lower opacity
- Lower visual priority

---

## FREE TODAY State

If:
- No overdue tasks
- No today tasks

Display:
FREE TODAY.

Subtext:
No active operational queue.

Use:
- Large whitespace
- Calm layout
- Minimal operational UI

---

# MODULE 4 — SYSTEM

Purpose:
Lightweight maintenance layer.

Inspired directly by:
DebtOS System philosophy.

---

## Keep Only

### Backup Snapshot

Display:

[ Backup Snapshot ]
Create local recovery snapshot

---

### Logout

Display:

[ Logout ]
End current session

---

### Version Label

Example:
v1.0-workos

---

## Remove Completely

Do NOT build:
- Notification systems
- Theme settings
- Sync toggles
- Integrations
- Export systems
- Profile systems

Supabase sync is infrastructure, not a user setting.

---

# UX RULES

Required:
- Fast interactions
- Minimal clicks
- Clear hierarchy
- Strong operational feeling

Avoid:
- Deep nested menus
- Over-complicated modals
- Empty widgets
- Placeholder features

---

# PERFORMANCE RULES

Prioritize:
- Fast initial load
- Minimal rerenders
- Stable state management
- Responsive interaction

Avoid:
- Heavy animation
- Large dependencies
- Complex architecture

---

# FINAL PRODUCT GOAL

The final product should feel like:
- A private operational cockpit
- A tactical workflow console
- A personalized execution system

NOT:
- A generic productivity dashboard
- A startup SaaS template
- A modern colorful PM tool