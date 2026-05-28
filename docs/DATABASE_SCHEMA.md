# WORKOS — Database Schema v1

## Overview

WorkOS uses a lightweight operational database structure.

Core principles:
- Minimal fields
- Fast interaction
- Low friction
- Personal operational tracking
- No enterprise complexity

Main tables:
- projects
- tasks

No:
- Team systems
- Permission layers
- Collaboration tables
- Activity logs
- Notification systems

---

# TABLE — projects

Purpose:
Track operational projects, statuses, revenue, and outstanding exposure.

---

## Schema

| Field | Type | Required | Notes |
|---|---|---|---|
| id | uuid | yes | Primary key |
| name | text | yes | Project name |
| client | text | yes | Client name |
| status | text | yes | Workflow status |
| revenue | numeric | no | excl.VAT |
| paid | numeric | no | Total paid amount |
| note | text | no | Short operational note |
| created_at | timestamptz | yes | Auto generated |
| updated_at | timestamptz | yes | Auto updated |

---

## Workflow Status Values

Allowed values:
- Lead/Brief
- Planning
- In progress
- Nghiệm thu
- Chờ thanh toán
- Done

---

## Finance Logic

Revenue:
- Stored as excl.VAT by default

Paid:
- Stores total received amount only
- Supports advance payments / partial payments

Outstanding:
Calculated in application layer.

Formula:

Outstanding = Revenue - Paid

---

## UI Behavior

Done status should:
- Have lower visual priority
- Appear faded
- Feel archived

Operational focus should remain on:
- In progress
- Nghiệm thu
- Chờ thanh toán

---

# TABLE — tasks

Purpose:
Track lightweight operational tasks and reminders.

Tasks are:
- Fast
- Disposable
- Operational
- Independent from projects

---

## Schema

| Field | Type | Required | Notes |
|---|---|---|---|
| id | uuid | yes | Primary key |
| title | text | yes | Task content |
| due_date | date | no | Used for grouping |
| status | text | yes | To-do / Done |
| created_at | timestamptz | yes | Auto generated |
| updated_at | timestamptz | yes | Auto updated |

---

## Status Values

Allowed values:
- To-do
- Done

---

## Task Input Structure

Input format:

DD/MM — Task content

Examples:
- 29/5 — Follow payment Coca
- 30/5 — Send proposal Nutifood
- 05/10 — Check client payment

If no date:
- Auto assign current day

---

## Task Grouping Logic

Tasks grouped by:
- OVERDUE
- TODAY
- Monthly sections
- DONE

Example groups:
- MAY 2026
- JUN 2026
- OCT 2026

Done tasks:
- Lower opacity
- Lowest visual priority

---

# RELATIONSHIPS

No direct relationships in v1.

Tasks remain independent from projects.

Reason:
Avoid complexity and maintain operational speed.

---

# APPLICATION CALCULATIONS

Calculated in frontend layer.

---

## Outstanding Exposure

Definition:
Total outstanding amount from:
- Nghiệm thu
- Chờ thanh toán

Formula:

(revenue - paid)

---

## Active Pipeline

Definition:
Projects excluding:
- Done

---

## Today Load

Definition:
- Overdue tasks
- Tasks due today

---

## Project Progress

Weighted operational progress.

Status weights:
- Lead/Brief → 10%
- Planning → 25%
- In progress → 60%
- Nghiệm thu → 85%
- Chờ thanh toán → 95%
- Done → 100%

---

# DATABASE PHILOSOPHY

WorkOS database should remain:
- Lightweight
- Operational
- Fast
- Minimal

Avoid:
- Over-normalization
- Enterprise architecture
- Feature-heavy schemas
- Premature scalability complexity