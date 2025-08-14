// Shared TanStack Query utilities and factory functions
import { QueryClient, QueryCache } from "@tanstack/svelte-query";

// Factory function for creating query client with shared configuration
export const createQueryClient = () => {
    return new QueryClient({
        queryCache: new QueryCache({
            onError: (error: Error) => {
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

// Query configuration helpers
export const getQueryDefaults = () => ({
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
});

// Don't re-export QueryClient, QueryCache - apps should import directly