import { z } from "zod";
export declare const EnvironmentSchema: z.ZodEnum<{
    development: "development";
    production: "production";
    test: "test";
}>;
export type Environment = z.infer<typeof EnvironmentSchema>;
export declare const DEFAULT_PORTS: {
    readonly SERVER: 3000;
    readonly WEB: 5173;
    readonly CLIENT: 5175;
    readonly DOCS: 3001;
};
export declare const DEFAULT_URLS: {
    readonly DEVELOPMENT: {
        readonly SERVER: "http://localhost:3000";
        readonly WEB: "http://localhost:5173";
        readonly CLIENT: "http://localhost:5175";
        readonly AUTH: "http://localhost:3000";
    };
    readonly PRODUCTION: {
        readonly SERVER: "https://api.example.com";
        readonly WEB: "https://app.example.com";
        readonly CLIENT: "https://client.example.com";
        readonly AUTH: "https://api.example.com";
    };
};
export declare const DEV_TRUSTED_ORIGINS: readonly ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174", "http://localhost:5175", "http://127.0.0.1:5175", "http://localhost:1420", "http://127.0.0.1:1420"];
export declare function getEnvironmentConfig(env: Environment): {
    readonly SERVER: "http://localhost:3000";
    readonly WEB: "http://localhost:5173";
    readonly CLIENT: "http://localhost:5175";
    readonly AUTH: "http://localhost:3000";
} | {
    readonly SERVER: "https://api.example.com";
    readonly WEB: "https://app.example.com";
    readonly CLIENT: "https://client.example.com";
    readonly AUTH: "https://api.example.com";
};
//# sourceMappingURL=constants.d.ts.map