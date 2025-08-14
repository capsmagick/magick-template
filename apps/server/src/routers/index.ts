import { protectedProcedure, publicProcedure } from "../lib/orpc";
import { authRouter } from "./auth";
import { HealthCheckSchema } from "@repo/shared-core/types/api";

export const appRouter = {
  healthCheck: publicProcedure
    .output(HealthCheckSchema)
    .handler(() => {
      return {
        status: "healthy" as const,
        timestamp: new Date(),
        services: {
          database: {
            status: "up" as const,
            responseTime: 50,
          },
          auth: {
            status: "up" as const,
            responseTime: 25,
          },
        },
      };
    }),

  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: "This is private",
      user: context.session?.user,
    };
  }),

  auth: authRouter,
};

export type AppRouter = typeof appRouter;
