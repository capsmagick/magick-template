import { getEnvironmentConfig } from "./constants.js";

// Query Client configuration
export const getQueryClientConfig = () => {
    return {
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
    };
};

// RPC Link configuration
export const getRPCLinkConfig = (environment: "development" | "production" = "development") => {
    const envConfig = getEnvironmentConfig(environment);

    return {
        url: `${envConfig.SERVER}/rpc`,
        credentials: "include" as const,
        fetch: (url: string | URL | Request, options?: RequestInit) => {
            return fetch(url, {
                ...options,
                credentials: "include",
            });
        },
    };
};

// Client URLs based on environment
export const getClientURLs = (environment: "development" | "production" = "development") => {
    const envConfig = getEnvironmentConfig(environment);

    return {
        server: envConfig.SERVER,
        auth: envConfig.AUTH,
        rpc: `${envConfig.SERVER}/rpc`,
        api: `${envConfig.SERVER}/api`,
    };
};

// Common fetch configuration
export const getCommonFetchConfig = () => {
    return {
        credentials: "include" as const,
        headers: {
            "Content-Type": "application/json",
        },
    };
};