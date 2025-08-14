// Shared Better Auth utilities and re-exports
import { createAuthClient } from "better-auth/svelte";
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// Common auth client factory
export const createBetterAuthClient = (baseURL: string) => {
    return createAuthClient({
        baseURL,
    });
};

// Common auth configuration
export const createAuthConfig = (database: any, trustedOrigins: string[]): any => {
    return {
        database,
        trustedOrigins,
        emailAndPassword: {
            enabled: true,
        },
        plugins: [
            admin({
                adminRoles: ["superadmin", "admin"],
            }),
        ],
    };
};

// Re-export all utilities
export { createAuthClient, betterAuth, admin, mongodbAdapter };