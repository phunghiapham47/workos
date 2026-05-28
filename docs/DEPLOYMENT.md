# WorkOS Setup and Deployment

## Local Setup

Install dependencies:

```bash
npm install
```

Create `.env.local`:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Start local development:

```bash
npm run dev
```

## Build and Lint

Required before commit/deployment:

```bash
npm run build
npm run lint
```

## Vercel Deployment

Settings:

- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`

Environment variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

The Vercel project is connected to GitHub. Future pushes to `main` should trigger production deployment automatically.

The deployed app opens directly to Dashboard.

There is currently:

- No login route.
- No auth gate.
- No logout control.

## Deployment QA Flow

Before deploying:

1. Run `npm run build`.
2. Run `npm run lint`.
3. Start local dev server.
4. Check Dashboard desktop.
5. Check Projects desktop.
6. Check Tasks desktop.
7. Check System desktop.
8. Check mobile bottom navigation.
9. Check mobile sheets/modals.
10. Confirm no horizontal overflow.
11. Confirm Supabase reads on app reload.

If persistence code changed, also verify:

1. Add project, refresh, project remains.
2. Edit project, refresh, edit remains.
3. Delete project, refresh, deleted project stays deleted.
4. Add task, refresh, task remains.
5. Complete task, refresh, completed state remains.
6. Undo task, refresh, restored state remains.
7. Delete task, refresh, deleted task stays deleted.

## Current Deployment Risks

- Dirty files should be reviewed before deployment and staged by phase.
- No auth or row-level user separation exists yet.
- Supabase schema must preserve `tasks.completed`.
- Vercel environment variables must be configured before production deploy.
