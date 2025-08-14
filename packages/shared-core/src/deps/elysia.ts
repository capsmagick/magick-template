// Shared Elysia utilities and factory functions
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

// Factory function for creating CORS configuration
export const createCORSConfig = (origins: string[]) => ({
    origin: origins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
});

// Factory function for creating Swagger configuration
export const createSwaggerConfig = (title: string, version: string = "1.0.0") => ({
    documentation: {
        info: {
            title,
            version,
            description: `API documentation for ${title}`,
        },
        tags: [
            { name: "Health", description: "Health check endpoints" },
            { name: "Auth", description: "Authentication endpoints" },
            { name: "API", description: "API endpoints" },
        ],
    },
});

// Factory function for creating Elysia app with common configuration
export const createElysiaApp = (config?: {
    cors?: any;
    swagger?: any;
}) => {
    const app = new Elysia();

    if (config?.cors) {
        app.use(cors(config.cors));
    }

    if (config?.swagger) {
        app.use(swagger(config.swagger));
    }

    return app;
};

// Don't re-export Elysia, cors, swagger - apps should import directly