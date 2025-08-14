// Shared development tools and utilities
export { SvelteQueryDevtools } from "@tanstack/svelte-query-devtools";

// Development utilities
export const isDevelopment = () => {
    return process.env.NODE_ENV === "development";
};

export const isProduction = () => {
    return process.env.NODE_ENV === "production";
};

// Development-only conditional export
export const conditionalDevtools = () => {
    if (isDevelopment()) {
        return import("@tanstack/svelte-query-devtools");
    }
    return null;
};