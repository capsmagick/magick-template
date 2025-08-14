// Type-safe API wrapper using shared types
import { client } from "./orpc";
import type { User, Session, SignInInput, SignUpInput, ApiResponse, HealthCheck } from "@repo/shared-core/types";

// Type-safe API wrapper with shared types
export const api = {
    // Health check
    async healthCheck(): Promise<HealthCheck> {
        return await (client as any).healthCheck();
    },

    // Auth operations
    auth: {
        async signIn(input: SignInInput): Promise<ApiResponse<{ user: User; session: Session }>> {
            return await (client as any).auth.signIn(input);
        },

        async signUp(input: SignUpInput): Promise<ApiResponse<{ user: User; session: Session }>> {
            return await (client as any).auth.signUp(input);
        },

        async getSession(): Promise<ApiResponse<{ user: User; session: Session } | null>> {
            return await (client as any).auth.getSession();
        },

        async signOut(): Promise<ApiResponse<void>> {
            return await (client as any).auth.signOut();
        },
    },

    // Protected operations
    async getPrivateData(): Promise<{ message: string; user?: User }> {
        return await (client as any).privateData();
    },
};

// Export the client for direct use if needed
export { client };