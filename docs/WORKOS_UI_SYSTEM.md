# WorkOS UI System

## Role

WorkOS is the primary UI architecture reference for the personal operating system ecosystem.

This document defines the current UI system used by WorkOS and aligned ecosystem apps such as DebtOS.

## Visual Identity

WorkOS should feel like:

- Industrial operating system
- Tactical workflow terminal
- Dense operational control system
- Personal execution console

WorkOS should not feel like:

- Startup SaaS dashboard
- Consumer productivity app
- Enterprise PM suite
- Glassmorphism UI
- Soft rounded colorful dashboard

## Core Primitives

### App Shell

- Desktop sidebar.
- Mobile bottom navigation.
- Sticky app header.
- Route content in module panels.
- No landing-page treatment.

### Module Panels

- Square panel language.
- Strong borders.
- White or near-white surfaces.
- Subtle module shadow.
- Compact internal padding.
- No decorative glass/blur.

### Navigation

- Use full module names.
- Do not use abbreviations like DASH, PROJ, TASK, SYS.
- Desktop and mobile navigation should share the same hierarchy.
- Active state should be clear, restrained, and system-like.

### Buttons

- Buttons are compact.
- Icon buttons use monochrome Lucide icons.
- Primary action uses black fill.
- Secondary actions use bordered white buttons.
- Avoid large pill buttons.

### Status Chips

Status color is for scanning only.

Allowed behavior:

- Muted colors.
- Thin borders.
- Small chip sizing.
- Applied to statuses, filters, and tactical labels.

Avoid:

- Colorful full cards.
- Gradients.
- Neon/glow.
- Saturated dashboard palettes.

### Modal and Sheet Rhythm

Desktop:

- Modal or side panel depending on workflow.
- Detail inspection can live in right-side panel.

Mobile:

- Full-screen sheet when detail/edit surface needs room.
- Compact header and close button.
- Keep controls reachable and dense.

### Typography

- Strong black headings.
- Uppercase mono labels.
- Compact row text.
- Large numbers only when they carry operational value.
- Avoid oversized mobile typography.

### Spacing

- Dense but readable.
- Preserve scanability.
- Avoid luxury SaaS whitespace.
- More visible rows above fold is preferred.

## Current Ecosystem Alignment

DebtOS has been aligned to WorkOS UI architecture.

Shared patterns:

- Desktop sidebar structure.
- Mobile bottom navigation.
- Sticky app header.
- Module panel rhythm.
- Button/icon button system.
- Modal/sheet rhythm.
- Spacing/typography system.
- Operational density.

## Recent UI Polish

- Removed navigation abbreviations.
- Improved module shadow system.
- Aligned visual hierarchy.
- Preserved square panel system.
- Preserved industrial visual language.

## Guardrails

Do:

- Keep UI operational.
- Keep panels square.
- Keep layout dense.
- Keep hierarchy scan-first.
- Use color sparingly.
- Preserve Supabase-backed workflow behavior.

Do not:

- Redesign the app without explicit scope.
- Soften the UI.
- Introduce glassmorphism.
- Add decorative cards.
- Add feature bloat.
- Replace operational rows with marketing-style sections.
