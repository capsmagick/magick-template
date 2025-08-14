import { publicProcedure } from "../lib/orpc";
import { auth } from "../lib/auth";
import { SignInSchema, SignUpSchema } from "@repo/shared-core/types/auth";

export const authRouter = {
  signIn: publicProcedure
    .input(SignInSchema)
    .handler(async ({ input }) => {
      const result = await auth.api.signInEmail({
        email: input.email,
        password: input.password,
      });

      return {
        success: true,
        data: result,
      };
    }),

  signUp: publicProcedure
    .input(SignUpSchema)
    .handler(async ({ input }) => {
      const result = await auth.api.signUpEmail({
        name: input.name,
        email: input.email,
        password: input.password,
      });

      return {
        success: true,
        data: result,
      };
    }),

  getSession: publicProcedure
    .handler(async ({ context }) => {
      // Access session from context if available
      const session = await auth.api.getSession({
        headers: context.request.headers || {},
      });

      return {
        success: true,
        data: session,
      };
    }),

  signOut: publicProcedure
    .handler(async ({ context }) => {
      const result = await auth.api.signOut({
        headers: context.request.headers || {},
      });

      return {
        success: true,
        data: result,
      };
    }),
};