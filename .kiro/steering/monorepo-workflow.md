---
inclusion: always
---

# Monorepo Workflow

## Turborepo Tasks
```bash
turbo run build     # Build all packages
turbo run dev       # Start development
turbo run lint      # Lint all packages
turbo run test      # Run tests
```

## Package Management
```bash
# Add to specific workspace
bun add package --filter=web
bun add package --filter=server

# Workspace dependencies
"@repo/shared-types": "workspace:*"
```

## Shared Packages
```
packages/
├── shared-types/    # Common interfaces
├── ui-components/   # Reusable components
└── utils/          # Cross-platform utilities
```

## Environment Variables
```bash
# Root .env
DATABASE_URL=mongodb://localhost:27017/app
JWT_SECRET=your-secret

# apps/server/.env
PORT=3000

# apps/web/.env
PUBLIC_API_URL=http://localhost:3000
```