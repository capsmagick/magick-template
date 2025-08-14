# magick-template

Production-ready SvelteKit + Elysia starter with type-safe RPC, modern UI, desktop packaging, and strict code quality. Built with Bun and Turborepo.

### Who is this for?

- **Product teams/startups**: ship web + desktop apps quickly with one codebase
- **Full‑stack TS/Svelte devs**: type-safe APIs and queries out of the box
- **A11y/quality focused teams**: Biome + Ultracite rules preconfigured

## Tech Stack

- **Frontend**: SvelteKit 2, Svelte 5, Tailwind CSS 4 (`apps/admin/src/app.css`)
- **UI**: shadcn-svelte component suite + extras (`apps/admin/components.json`, `apps/admin/jsrepo.json`, `apps/admin/src/lib/components/ui/**`)
- **Rich text**: Tiptap-based Edra editor (`apps/admin/src/lib/components/edra/**`)
- **Data layer**: oRPC client + TanStack Query (`apps/admin/src/lib/orpc.ts`)
- **Auth**: Better Auth (email/password) with MongoDB adapter (`apps/server/src/lib/auth.ts`, client: `apps/admin/src/lib/auth-client.ts`)
- **Backend**: Elysia + oRPC server (`apps/server/src/index.ts`, `apps/server/src/routers/index.ts`)
- **Database**: MongoDB via Mongoose (`apps/server/src/db/**`)
- **Desktop**: Tauri 2 in `apps/admin/src-tauri`
- **Repo tooling**: Bun, Turborepo, Biome linter/formatter with Ultracite rules

## Features

- **Type-safe RPC** end-to-end with oRPC and generated query utils
- **Auth sessions**: secure cookies, email/password flows, `auth.api.getSession` on server context
- **Comprehensive UI kit**: dialogs, forms, tables, menus, sidebar, etc. preinstalled under `ui/`
- **Tiptap editor**: media (audio/video/image/iframe), tables, slash commands, drag handle, highlight, code, markdown helpers
- **DX**: Svelte Query Devtools in layout, strict lint/format via Biome + Ultracite
- **Desktop packaging**: run/build the same app as a native window via Tauri

## Monorepo Layout

```
magick-template/
├── apps/
│   ├── admin/       # Admin Frontend (SvelteKit + Tauri)
│   ├── client/      # Client Frontend (SvelteKit + Tauri)
│   └── server/      # Backend (Elysia + oRPC + Better Auth + Mongoose)
├── turbo.json       # Turborepo pipelines
├── biome.json       # Biome + Ultracite config
├── bun.lock         # Bun lockfile
```

## Getting Started

### Prerequisites

- Bun 1.2+
- Node 18+ (for tooling that expects Node)
- MongoDB running locally or in the cloud

### 1) Install dependencies

```bash
bun install
```

### 2) Configure environment

- Create a single `.env` file in the root directory (copy from `.env.example`):

```bash
# Server Configuration
PORT=3000
CORS_ORIGIN=http://localhost:5173,http://localhost:5174,http://localhost:5175
DATABASE_URL=mongodb://localhost:27017/myDB

# Authentication
BETTER_AUTH_SECRET=your-secret-here
BETTER_AUTH_URL=http://localhost:3000

# Client Configuration
PUBLIC_SERVER_URL=http://localhost:3000

# Development
SHOW_TEMPLATE_DOCS=true
NODE_ENV=development
```

Notes:

- All apps use the unified environment configuration from `@repo/shared-core`
- No need for separate `.env` files in each app - everything is centralized!
- The client app runs on port 5175 (added to CORS_ORIGIN)

### 3) Run in development

```bash
bun dev
```

- Admin: `http://localhost:5173`
- API: `http://localhost:3000`

### 4) Build

```bash
bun build
```

### 5) Desktop (Tauri)

From `apps/admin`:

```bash
bun desktop:dev     # run desktop app
bun desktop:build   # build installers/bundles
```

## Using the Template

### Server: add routes

Edit `apps/server/src/routers/index.ts` and export handlers using `publicProcedure`/`protectedProcedure` from `apps/server/src/lib/orpc.ts`.

Example:

```ts
export const appRouter = {
  hello: publicProcedure.handler(() => ({ message: "world" })),
};
```

### Client: call RPCs

Use `orpc` helpers from `apps/admin/src/lib/orpc.ts` with TanStack Query.

```ts
import { orpc } from "$lib/orpc";
import { createQuery } from "@tanstack/svelte-query";

const helloQuery = createQuery(orpc.hello.queryOptions());
```

### Auth

- Server session in ctx: `apps/server/src/lib/context.ts` uses `auth.api.getSession`.
- Client: `apps/admin/src/lib/auth-client.ts` exposes `authClient` (e.g., `authClient.useSession()`), see `apps/admin/src/routes/dashboard/+page.svelte` and `apps/admin/src/routes/login/+page.svelte`.

### UI components

- Components live under `apps/admin/src/lib/components/ui/**`.
- Config: `apps/admin/components.json` (shadcn-svelte) and `apps/admin/jsrepo.json` (extras registry + paths).
- Global styles/theme: `apps/admin/src/app.css` (Tailwind 4 + CSS variables).

### Edra (Tiptap) editor

- Source in `apps/admin/src/lib/components/edra/**` with rich extensions, toolbar, bubble menu, placeholders, and styles.

## Code Quality & Conventions

- Biome + Ultracite presets enforce accessibility, TS best practices, and consistency (`biome.json`).
- Run checks:

```bash
bun run check
```

## Scripts

Root (`package.json`):

- `bun dev` – run all apps (Turborepo)
- `bun build` – build all apps
- `bun dev:admin` – run only admin
- `bun dev:server` – run only server
- `bun run check` – Biome check/fix

Admin (`apps/admin/package.json`): `dev`, `build`, `preview`, `check`, `desktop:*`

Server (`apps/server/package.json`): `dev`, `build`, `check-types`, `start`

## Helpful File References

- Admin layout: `apps/admin/src/routes/+layout.svelte`
- Health check example: `apps/admin/src/routes/+page.svelte`
- Dashboard with protected data: `apps/admin/src/routes/dashboard/+page.svelte`
- Auth client: `apps/admin/src/lib/auth-client.ts`
- RPC client + Query: `apps/admin/src/lib/orpc.ts`
- Server entry: `apps/server/src/index.ts`
- Server context/auth: `apps/server/src/lib/context.ts`, `apps/server/src/lib/auth.ts`
- DB client/models: `apps/server/src/db/**`

## Notes

- This template does not include database migrations; schemas are created by Mongoose on demand.
- Ensure `CORS_ORIGIN` and `PUBLIC_SERVER_URL` are kept in sync for local/dev.
