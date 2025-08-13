import { orpc } from './orpc';
import { createQuery } from '@tanstack/svelte-query';

// Create a session store using TanStack Query
export const useSession = () => {
  return createQuery(orpc.auth.getSession.queryOptions());
};

// Auth client using ORPC
export const authClient = {
  // Sign in with email and password
  signIn: {
    email: async ({ email, password }: { email: string; password: string }) => {
      try {
        const result = await orpc.auth.signIn.call({ email, password });
        return result;
      } catch (error) {
        return { error: { message: error instanceof Error ? error.message : 'Sign in failed' } };
      }
    }
  },
  
  // Sign up with email and password
  signUp: {
    email: async ({ email, password, name }: { email: string; password: string; name: string }) => {
      try {
        const result = await orpc.auth.signUp.call({ email, password, name });
        return result;
      } catch (error) {
        return { error: { message: error instanceof Error ? error.message : 'Sign up failed' } };
      }
    }
  },
  
  // Sign out
  signOut: async () => {
    try {
      await orpc.auth.signOut.call();
      return { success: true };
    } catch (error) {
      return { error: { message: error instanceof Error ? error.message : 'Sign out failed' } };
    }
  },
  
  // Get session
  getSession: async () => {
    try {
      const result = await orpc.auth.getSession.call();
      return result;
    } catch (error) {
      return null;
    }
  },
  
  // Use session hook (for compatibility with better-auth)
  useSession: () => {
    return createQuery(orpc.auth.getSession.queryOptions());
  }
};
