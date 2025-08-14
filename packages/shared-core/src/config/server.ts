import { DEV_TRUSTED_ORIGINS, DEFAULT_PORTS } from "./constants.js";

// Get environment variable with fallback
const getEnvVar = (key: string, fallback: string = ""): string => {
    return process.env[key] || fallback;
};

// Get CORS configuration
export const getCORSConfig = (environment: "development" | "production" = "development") => {
    const corsOrigin = getEnvVar("CORS_ORIGIN");
    const envTrusted = corsOrigin
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

    const origins = environment === "development"
        ? envTrusted.length > 0 ? envTrusted : [...DEV_TRUSTED_ORIGINS]
        : envTrusted.length > 0 ? envTrusted : ["https://app.example.com"];

    return {
        origin: origins,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    };
};

// Get trusted origins for auth
export const getTrustedOrigins = (environment: "development" | "production" = "development") => {
    const corsOrigin = getEnvVar("CORS_ORIGIN");
    const envTrusted = corsOrigin
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

    return [
        ...new Set([
            ...envTrusted,
            ...(environment === "development" ? DEV_TRUSTED_ORIGINS : []),
        ]),
    ];
};

// Database configuration
export const getDatabaseConfig = () => {
    return {
        url: getEnvVar("DATABASE_URL", "mongodb://localhost:27017/myDB"),
        name: "myDB",
    };
};

// Better Auth configuration
export const getAuthConfig = () => {
    return {
        secret: getEnvVar("BETTER_AUTH_SECRET"),
        url: getEnvVar("BETTER_AUTH_URL", "http://localhost:3000"),
        database: getDatabaseConfig(),
        trustedOrigins: getTrustedOrigins(),
    };
};

// Server configuration
export const getServerConfig = (environment: "development" | "production" = "development") => {
    return {
        port: Number(getEnvVar("PORT", DEFAULT_PORTS.SERVER.toString())),
        environment,
        cors: getCORSConfig(environment),
        database: getDatabaseConfig(),
        auth: getAuthConfig(),
        trustedOrigins: getTrustedOrigins(environment),
    };
};