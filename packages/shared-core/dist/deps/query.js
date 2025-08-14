// Shared TanStack Query utilities and re-exports
import { QueryClient, QueryCache } from "@tanstack/svelte-query";
import { createQuery, createMutation } from "@tanstack/svelte-query";
// Common query client factory
export const createQueryClient = () => {
    return new QueryClient({
        queryCache: new QueryCache({
            onError: (error) => {
                console.error(`Query Error: ${error.message}`);
            },
        }),
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000, // 5 minutes
                gcTime: 10 * 60 * 1000, // 10 minutes
                retry: 3,
                refetchOnWindowFocus: false,
            },
            mutations: {
                retry: 1,
            },
        },
    });
};
// Re-export all utilities
export { QueryClient, QueryCache, createQuery, createMutation };
//# sourceMappingURL=query.js.map