import { z } from "zod";
// Environment configuration
export const EnvironmentSchema = z.enum(["development", "production", "test"]);
// Common constants
export const DEFAULT_PORTS = {
    SERVER: 3000,
    WEB: 5173,
    CLIENT: 5175,
    DOCS: 3001,
};
export const DEFAULT_URLS = {
    DEVELOPMENT: {
        SERVER: "http://localhost:3000",
        WEB: "http://localhost:5173",
        CLIENT: "http://localhost:5175",
        AUTH: "http://localhost:3000",
    },
    PRODUCTION: {
        SERVER: "https://api.example.com",
        WEB: "https://app.example.com",
        CLIENT: "https://client.example.com",
        AUTH: "https://api.example.com",
    },
};
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
];
// Helper function to get environment-specific config
export function getEnvironmentConfig(env) {
    return env === "production" ? DEFAULT_URLS.PRODUCTION : DEFAULT_URLS.DEVELOPMENT;
}
//# sourceMappingURL=constants.js.map