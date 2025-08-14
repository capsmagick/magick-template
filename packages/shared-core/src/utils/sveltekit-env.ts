// SvelteKit environment variable injection utility
import { getClientEnvironmentConfig } from "../config/environment.js";

// Generate environment variables for SvelteKit
export const generateSvelteKitEnv = () => {
    const clientConfig = getClientEnvironmentConfig();

    // Convert to the format SvelteKit expects
    const env: Record<string, string> = {};

    Object.entries(clientConfig).forEach(([key, value]) => {
        env[key] = String(value);
    });

    return env;
};

// Create a Vite plugin to inject environment variables
export const createSvelteKitEnvPlugin = () => {
    return {
        name: 'sveltekit-env-injection',
        config(config: any) {
            const envVars = generateSvelteKitEnv();

            // Inject into Vite's define
            config.define = config.define || {};
            Object.entries(envVars).forEach(([key, value]) => {
                config.define[`import.meta.env.${key}`] = JSON.stringify(value);
            });

            return config;
        }
    };
};