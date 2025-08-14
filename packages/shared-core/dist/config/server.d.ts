export declare const getCORSConfig: (environment?: "development" | "production") => {
    origin: string[];
    credentials: boolean;
    methods: string[];
    allowedHeaders: string[];
};
export declare const getTrustedOrigins: (environment?: "development" | "production") => string[];
export declare const getDatabaseConfig: () => {
    url: string;
    name: string;
};
export declare const getAuthConfig: () => {
    secret: string;
    url: string;
    database: {
        url: string;
        name: string;
    };
    trustedOrigins: string[];
};
export declare const getServerConfig: (environment?: "development" | "production") => {
    port: number;
    environment: "development" | "production";
    cors: {
        origin: string[];
        credentials: boolean;
        methods: string[];
        allowedHeaders: string[];
    };
    database: {
        url: string;
        name: string;
    };
    auth: {
        secret: string;
        url: string;
        database: {
            url: string;
            name: string;
        };
        trustedOrigins: string[];
    };
    trustedOrigins: string[];
};
//# sourceMappingURL=server.d.ts.map