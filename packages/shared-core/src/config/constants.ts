import { z } from "zod";

// Environment configuration
export const EnvironmentSchema = z.enum(["development", "production", "test"]);
export type Environment = z.infer<typeof EnvironmentSchema>;

// Common constants
export const DEFAULT_PORTS = {
    SERVER: 3000,
    ADMIN: 5173,
    CLIENT: 5175,
    DOCS: 3001,
} as const;

export const DEFAULT_URLS = {
    DEVELOPMENT: {
        SERVER: "http://localhost:3000",
        ADMIN: "http://localhost:5173",
        CLIENT: "http://localhost:5175",
        AUTH: "http://localhost:3000",
    },
    PRODUCTION: {
        SERVER: "https://api.example.com",
        ADMIN: "https://admin.example.com",
        CLIENT: "https://client.example.com",
        AUTH: "https://api.example.com",
    },
} as const;

// Trusted origins for development
export const DEV_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:5175",
    "http://127.0.0.1:5175",
    "http://localhost:1420",
    "http://127.0.0.1:1420",
] as const;

// Helper function to get environment-specific config
export function getEnvironmentConfig(env: Environment) {
    return env === "production" ? DEFAULT_URLS.PRODUCTION : DEFAULT_URLS.DEVELOPMENT;
}