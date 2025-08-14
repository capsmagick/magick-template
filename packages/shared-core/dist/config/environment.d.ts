export declare const getEnvironment: () => "development" | "production" | "test";
export declare const getAllEnvironmentConfig: () => {
    NODE_ENV: "development" | "production" | "test";
    IS_DEVELOPMENT: boolean;
    IS_PRODUCTION: boolean;
    PORT: number;
    SERVER_URL: string;
    DATABASE_URL: string;
    BETTER_AUTH_SECRET: string;
    BETTER_AUTH_URL: string;
    CORS_ORIGIN: string;
    PUBLIC_SERVER_URL: string;
    SHOW_TEMPLATE_DOCS: boolean;
};
export declare const getClientEnvironmentConfig: () => {
    PUBLIC_SERVER_URL: string;
    SHOW_TEMPLATE_DOCS: boolean;
};
export declare const getServerEnvironmentConfig: () => {
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    DATABASE_URL: string;
    BETTER_AUTH_SECRET: string;
    BETTER_AUTH_URL: string;
    CORS_ORIGIN: string;
};
export declare const getPort: () => number;
export declare const getDatabaseUrl: () => string;
export declare const getServerUrl: () => string;
export declare const getPublicServerUrl: () => string;
export declare const getBetterAuthSecret: () => string;
export declare const getBetterAuthUrl: () => string;
export declare const getCorsOrigin: () => string;
//# sourceMappingURL=environment.d.ts.map