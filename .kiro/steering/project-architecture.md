---
inclusion: always
---

# Better-T-Stack Architecture

## Stack
- **Frontend**: SvelteKit + Svelte 5 runes + TanStack Query
- **Backend**: ElysiaJS + oRPC + TypeScript
- **Database**: MongoDB + Mongoose
- **Runtime**: Bun
- **Monorepo**: Turborepo

## Structure
```
apps/
├── server/          # ElysiaJS + oRPC backend
│   ├── src/api/     # oRPC routers
│   ├── src/db/      # Mongoose models
│   └── src/lib/     # Auth & utilities
└── web/             # SvelteKit frontend
    ├── src/lib/     # Components & API client
    └── src/routes/  # File-based routing
```

## Development
```bash
bun run dev          # Start all apps
bun run dev:server   # Backend only
bun run dev:web      # Frontend only
```

## Database Commands (from apps/server/)
```bash
bun run db:push      # Push schema
bun run db:studio    # Open studio
bun run db:migrate   # Run migrations
```

## State Management
- **Local**: Svelte 5 `$state()` runes
- **Server**: TanStack Query + oRPC
- **Global**: Svelte stores when needed