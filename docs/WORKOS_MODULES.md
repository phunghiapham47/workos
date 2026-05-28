# WORKOS — Module Planning v1

# SYSTEM IDENTITY

PERSONAL WORK OPERATING SYSTEM

WorkOS

---

# CORE PHILOSOPHY

WorkOS is:
- A personal operational system
- A tactical execution interface
- A lightweight workflow cockpit
- A command center for Account Executive work

WorkOS is NOT:
- A SaaS productivity platform
- A collaboration workspace
- A Notion/Trello clone
- An enterprise PM tool

Core direction:
- Minimal
- Operational
- Fast
- Mechanical
- Personalized
- Low-friction

---

# UI DIRECTION

Inspired by:
- DebtOS
- Tactical dashboards
- Retro terminal systems
- Mission control interfaces

Rules:
- Monochrome UI
- Strong typography
- Thin borders
- Grid layout
- No feature bloat
- No fake toggles
- No modern SaaS feeling

---

# APPLICATION STRUCTURE

Primary modules:
- Dashboard
- Projects
- Tasks
- System

Default route:
- Dashboard

Desktop behavior:
- Sidebar + content layout
- Right-side detail panel

Mobile behavior:
- Bottom navigation
- Full-screen detail view

No:
- Command bar
- Complex routing
- Multi-page editing flows

---

# MODULE 1 — DASHBOARD

## Purpose

Dashboard is the operational command center of WorkOS.

Opening the app should instantly answer:
- What needs attention today?
- How many projects are active?
- How much outstanding exposure exists?
- Is operational flow stable?

---

# DASHBOARD STRUCTURE

## Row 1 — Mission Panel

### Left Side
Robot + operational message.

Robot:
- Same personalized style direction as DebtOS
- Pixel / terminal mascot
- Operational companion

Mission message examples:
- WORKLOAD OVERFLOW DETECTED.
- EXECUTION PIPELINE ACTIVE.
- OPERATIONAL FLOW STABLE.
- FREE TODAY.
- OUTSTANDING COLLECTION REQUIRED.

Subtext examples:
- Clear overdue queue before escalation.
- Stabilize active pipeline.
- No active obligations detected.

---

## Right Side — Project Progress

Purpose:
Show weighted operational progress of active projects.

This is NOT real completion percentage.

Status weights:
- Lead/Brief → 10%
- Planning → 25%
- In progress → 60%
- Nghiệm thu → 85%
- Chờ thanh toán → 95%
- Done → 100%

Operational states:
- STABLE
- ACTIVE
- WARNING
- OVERLOAD

---

# Row 2 — Operational Cards

Only 3 primary cards.

---

## Card 1 — Active Pipeline

Displays:
- Total active projects
- Excludes Done

Suggested labels:
- ACTIVE PIPELINE
- CURRENT OPERATIONS

---

## Card 2 — Outstanding Exposure

Displays:
- Total outstanding amount
- Projects in:
  - Nghiệm thu
  - Chờ thanh toán

Suggested labels:
- OUTSTANDING EXPOSURE
- PENDING COLLECTION
- OPEN AMOUNT

Currency:
- excl.VAT

---

## Card 3 — Today Load

Displays:
- Tasks due today
- Overdue tasks

If empty:
Display:
FREE TODAY.

Visual direction:
- Large typography
- Spacious layout
- Calm operational state

---

# Row 3 — Today Queue

Priority logic:
1. Overdue tasks
2. Tasks due today
3. Nghiệm thu projects
4. Chờ thanh toán projects

Display:
- Compact operational list
- Maximum 3–5 items

Fields:
- Date
- Title
- Status

---

# Row 4 — Active Project Queue

Displays:
- Active projects only
- Compact operational visibility

Fields:
- Project name
- Client
- Status
- Outstanding amount
- Small operational note

---

# MONDAY REPORT

Purpose:
Generate formatted Monday operational report.

Action:
COPY MONDAY REPORT

Behavior:
- Copy preformatted text to clipboard
- Designed for sending quick weekly updates

Avoid:
- Analytics systems
- Reporting dashboards
- Charts

---

# MODULE 2 — PROJECTS

## Purpose

Projects module is the operational execution engine of WorkOS.

Dashboard provides visibility.
Projects provide execution tracking.

The module must remain:
- Lightweight
- Fast
- Minimal
- AE-focused

Avoid:
- Enterprise PM complexity
- Team collaboration systems
- Heavy workflows

---

# PROJECT WORKFLOW

Statuses:
- Lead/Brief
- Planning
- In progress
- Nghiệm thu
- Chờ thanh toán
- Done

Done state should:
- Be visually de-emphasized
- Use lower visual priority
- Feel archived

WorkOS should focus on:
current operations.

---

# PROJECT DATA STRUCTURE

Required fields:
- Project Name
- Client
- Status

Optional fields:
- Revenue
- Paid Amount
- Note

System fields:
- Created Date
- Updated Date

Avoid:
- PIC
- Assignee
- Priority
- Tags
- Team roles
- Attachments
- Comment threads
- Complex deadlines

---

# FINANCE LOGIC

Finance exists directly inside Projects.

Fields:
- Revenue
- Paid
- Outstanding

Formula:

Outstanding = Revenue - Paid

Dashboard pulls:
- Outstanding exposure
- Active pipeline value
- Pending collection amount

Revenue:
- excl.VAT by default

Paid:
- Stores total paid amount only
- Supports advance payment logic

---

# PROJECTS PAGE STRUCTURE

## Header
Operational overview cards:
- Active Pipeline
- Pipeline Value
- Outstanding Exposure

---

## Status Chips

Compact operational filters:
- ALL
- LEAD/BRIEF
- PLANNING
- IN PROGRESS
- NGHIỆM THU
- CHỜ THANH TOÁN
- DONE

Style:
- Tactical
- Minimal
- Monochrome
- Count-based

---

## Project Queue

Main operational list.

Suggested row structure:

Left:
- Project name
- Client
- Small operational note

Right:
- Revenue
- Status
- Outstanding amount

---

## Project Detail Panel

Minimal operational detail only.

Fields:
- Project Name
- Client
- Status
- Revenue
- Paid
- Outstanding
- Note

Removed:
- Next Action
- Finance Summary
- Quick Actions

Reason:
Avoid enterprise SaaS feeling.
Keep WorkOS lean and system-focused.

---

# MODULE 3 — TASKS

## Purpose

Tasks module is the micro execution queue of WorkOS.

Projects manage long-term operations.
Tasks manage short-term execution.

Tasks should feel:
- Fast
- Disposable
- Lightweight
- Operational

Avoid:
- Heavy task management systems
- Productivity SaaS complexity
- Multi-layer workflows

---

# TASK PHILOSOPHY

Tasks are used for:
- Quick reminders
- Daily execution
- Follow-ups
- Small operational actions
- Mental unload

Tasks are NOT:
- Project management
- Planning systems
- Workflow engines

---

# TASK INPUT SYSTEM

Input structure:

DD/MM — Task content

Examples:
- 29/5 — Follow payment Coca
- 30/5 — Send proposal Nutifood
- 05/10 — Check client payment

Behavior:
- Press Enter to add
- Auto parse due date
- No due date = current day

Purpose:
Fast operational capture.

---

# TASK PAGE STRUCTURE

## Header Cards

Displays:
- TO-DO
- DONE
- OVERDUE

No additional metrics needed.

---

## Input Bar

Single large command-style input.

Example:

+ DD/MM — Công việc cần làm...

Design direction:
- Command line feeling
- Fast entry
- Minimal friction

---

## Task Queue

Simple operational list.

Structure:
- Due Date
- Task Title
- Status
- Delete action

Sort priority:
1. Overdue
2. Today
3. Upcoming
4. Done

Done tasks:
- Lower opacity
- Lower visual priority

---

# TASK GROUPING

Tasks grouped by:
- OVERDUE
- TODAY
- Monthly sections
- DONE

Examples:
- MAY 2026
- JUN 2026
- OCT 2026

Purpose:
Support long-term operational reminders.

---

# FREE TODAY STATE

If:
- No overdue tasks
- No today tasks

Display:

FREE TODAY.

Subtext:
No active operational queue.

Visual direction:
- Large whitespace
- Calm operational state
- Minimal UI

Purpose:
The system should feel “clean”.

---

# TASK UX RULES

Required:
- Fast add
- Fast complete
- Fast delete
- Minimal interaction cost

Avoid:
- Modals
- Task detail pages
- Kanban systems
- Calendar views
- Multi-view complexity

Tasks should feel like:
instant operational logging.

---

# MODULE 4 — SYSTEM

## Purpose

System module is a lightweight maintenance layer.

Inspired directly by:
DebtOS Settings/System philosophy.

The module should remain:
- Extremely minimal
- Utility-focused
- Operational

---

# SYSTEM STRUCTURE

## Backup Snapshot

Purpose:
Create local recovery snapshot.

Display:

[ Backup Snapshot ]
Create local recovery snapshot

---

## Logout

Purpose:
End current session.

Display:

[ Logout ]
End current session

---

## Version Label

Purpose:
Show current build version.

Example:

v1.0-workos

---

# SYSTEM RULES

Do NOT include:
- Notification systems
- Theme settings
- Sync toggles
- Integrations
- Profile systems
- Export systems
- User preferences

Supabase sync:
- Is infrastructure
- NOT a user setting

---

# SYSTEM FEELING

System page should feel like:
- A maintenance utility panel
- A tactical system layer
- A lightweight operational backend

NOT:
- A settings-heavy SaaS page
- A customization center
- A profile dashboard

---

# OVERALL SYSTEM FEELING

WorkOS should feel like:
- A mission control interface
- A tactical execution console
- A personal workflow operating system

NOT:
- A startup SaaS dashboard
- A collaboration workspace
- A colorful productivity tool