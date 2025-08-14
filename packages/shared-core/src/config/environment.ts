// Unified environment configuration for all apps
import { DEFAULT_PORTS, DEFAULT_URLS } from "./constants.js";

// Get environment variable with fallback
const getEnvVar = (key: string, fallback: string = ""): string => {
    return process.env[key] || fallback;
};

// Get current environment
export const getEnvironment = (): "development" | "production" | "test" => {
    const env = getEnvVar("NODE_ENV", "development");
    return env as "development" | "production" | "test";
};

// Get all environment variables for the monorepo
export const getAllEnvironmentConfig = () => {
    const environment = getEnvironment();
    const isDevelopment = environment === "development";

    return {
        // Environment info
        NODE_ENV: environment,
        IS_DEVELOPMENT: isDevelopment,
        IS_PRODUCTION: environment === "production",

        // Server configuration
        PORT: Number(getEnvVar("PORT", DEFAULT_PORTS.SERVER.toString())),
        SERVER_URL: getEnvVar("SERVER_URL", isDevelopment ? DEFAULT_URLS.DEVELOPMENT.SERVER : DEFAULT_URLS.PRODUCTION.SERVER),

        // Database configuration
        DATABASE_URL: getEnvVar("DATABASE_URL", "mongodb://localhost:27017/myDB"),

        // Authentication configuration
        BETTER_AUTH_SECRET: getEnvVar("BETTER_AUTH_SECRET"),
        BETTER_AUTH_URL: getEnvVar("BETTER_AUTH_URL", isDevelopment ? DEFAULT_URLS.DEVELOPMENT.AUTH : DEFAULT_URLS.PRODUCTION.AUTH),

        // CORS configuration
        CORS_ORIGIN: getEnvVar("CORS_ORIGIN"),

        // Client configuration (for SvelteKit apps)
        PUBLIC_SERVER_URL: getEnvVar("PUBLIC_SERVER_URL", isDevelopment ? DEFAULT_URLS.DEVELOPMENT.SERVER : DEFAULT_URLS.PRODUCTION.SERVER),

        // Development configuration
        SHOW_TEMPLATE_DOCS: getEnvVar("SHOW_TEMPLATE_DOCS", "true") === "true",
    };
};

// Get client-specific environment variables (for SvelteKit)
export const getClientEnvironmentConfig = () => {
    const config = getAllEnvironmentConfig();

    return {
        PUBLIC_SERVER_URL: config.PUBLIC_SERVER_URL,
        SHOW_TEMPLATE_DOCS: config.SHOW_TEMPLATE_DOCS,
    };
};

// Get server-specific environment variables
export const getServerEnvironmentConfig = () => {
    const config = getAllEnvironmentConfig();

    return {
        NODE_ENV: config.NODE_ENV,
        PORT: config.PORT,
        DATABASE_URL: config.DATABASE_URL,
        BETTER_AUTH_SECRET: config.BETTER_AUTH_SECRET,
        BETTER_AUTH_URL: config.BETTER_AUTH_URL,
        CORS_ORIGIN: config.CORS_ORIGIN,
    };
};

// Export individual getters for convenience
export const getPort = () => getAllEnvironmentConfig().PORT;
export const getDatabaseUrl = () => getAllEnvironmentConfig().DATABASE_URL;
export const getServerUrl = () => getAllEnvironmentConfig().SERVER_URL;
export const getPublicServerUrl = () => getAllEnvironmentConfig().PUBLIC_SERVER_URL;
export const getBetterAuthSecret = () => getAllEnvironmentConfig().BETTER_AUTH_SECRET;
export const getBetterAuthUrl = () => getAllEnvironmentConfig().BETTER_AUTH_URL;
export const getCorsOrigin = () => getAllEnvironmentConfig().CORS_ORIGIN;