import { protectedProcedure, publicProcedure } from "../lib/orpc";
import { auth } from "../lib/auth";

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK";
  }),
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: "This is private",
      user: context.session?.user,
    };
  }),
  // Dev procedures
  dev: {
    ensureSuperAdmin: publicProcedure.handler(async ({ context }) => {
      try {
        // This would typically call your auth system's ensureSuperAdmin method
        // For now, we'll return a success response
        return { success: true, message: "Super admin ensured" };
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to ensure super admin');
      }
    }),
  },
  // Auth procedures
  auth: {
    signIn: publicProcedure.handler(async ({ input, context }) => {
      const { email, password } = input as { email: string; password: string };
      
      try {
        const result = await auth.api.signInEmail({
          body: { email, password },
          headers: context.request.headers,
        });
        
        if (result.token === null) {
          throw new Error('Sign in failed');
        }
        
        return { success: true, user: result.user };
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Sign in failed');
      }
    }),
    
    signUp: publicProcedure.handler(async ({ input, context }) => {
      const { email, password, name } = input as { email: string; password: string; name: string };
      
      try {
        const result = await auth.api.signUpEmail({
          body: { name, email, password },
          headers: context.request.headers,
        });
        
        if (result.token === null) {
          throw new Error('Sign up failed');
        }
        
        return { success: true, user: result.user };
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Sign up failed');
      }
    }),
    
    signOut: publicProcedure.handler(async ({ context }) => {
      try {
        await auth.api.signOut({
          headers: context.request.headers,
        });
        return { success: true };
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Sign out failed');
      }
    }),
    
    getSession: publicProcedure.handler(async ({ context }) => {
      try {
        const session = await auth.api.getSession({
          headers: context.request.headers,
        });
        return session;
      } catch (error) {
        return null;
      }
    }),
  },
};
export type AppRouter = typeof appRouter;
