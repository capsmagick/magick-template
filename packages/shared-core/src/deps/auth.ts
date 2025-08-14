// Shared authentication utilities and factory functions
import { createAuthClient } from "better-auth/svelte";

// Factory function for creating Better Auth client
export const createBetterAuthClient = (baseURL: string): any => {
    return createAuthClient({
        baseURL,
    });
};

// Factory function for creating Better Auth server configuration
export const createBetterAuthServerConfig = (options: {
    database: any;
    trustedOrigins: string[];
    secret?: string;
}) => ({
    database: options.database,
    trustedOrigins: options.trustedOrigins,
    secret: options.secret,
    emailAndPassword: {
        enabled: true,
    },
});

// Common auth configuration helpers
export const getAuthDefaults = () => ({
    sessionDuration: 60 * 60 * 24 * 7, // 7 days
    impersonationSessionDuration: 60 * 60 * 24 * 7, // 7 days
});

// Don't re-export betterAuth, admin, etc. - apps should import directly