---
inclusion: fileMatch
fileMatchPattern: "apps/server/**/*.ts"
---

# ElysiaJS + oRPC API Patterns

## oRPC Router Setup
```typescript
// apps/server/src/api/index.ts
import { or } from 'orpc';
import { userRouter } from './users';
import { authRouter } from './auth';

export const appRouter = or.router({
  auth: authRouter,
  users: userRouter
});

export type AppRouter = typeof appRouter;
```

## Route Handler
```typescript
// apps/server/src/api/users.ts
import { or } from 'orpc';
import { z } from 'zod';
import { User } from '../db/models/User';
import { authMiddleware } from '../lib/auth';

export const userRouter = or.router({
  list: or
    .use(authMiddleware)
    .output(z.array(z.object({ id: z.string(), name: z.string() })))
    .handler(async () => {
      return User.find().select('id name');
    }),
    
  get: or
    .input(z.object({ id: z.string() }))
    .output(z.object({ id: z.string(), name: z.string(), email: z.string() }))
    .handler(async ({ input }) => {
      const user = await User.findById(input.id);
      if (!user) throw new Error('User not found');
      return user;
    })
});
```

## ElysiaJS Integration
```typescript
// apps/server/src/index.ts
import { Elysia } from 'elysia';
import { orpcHandler } from 'orpc/elysia';
import { appRouter } from './api';

const app = new Elysia()
  .use(orpcHandler({ router: appRouter, prefix: '/api' }))
  .listen(3000);
```

## Client Setup
```typescript
// apps/web/src/lib/api.ts
import { createORPCClient } from 'orpc/client';
import type { AppRouter } from '../../../server/src/api';

export const api = createORPCClient<AppRouter>({
  baseURL: 'http://localhost:3000/api'
});
```