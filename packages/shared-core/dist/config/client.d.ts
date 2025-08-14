export declare const getQueryClientConfig: () => {
    defaultOptions: {
        queries: {
            staleTime: number;
            gcTime: number;
            retry: number;
            refetchOnWindowFocus: boolean;
        };
        mutations: {
            retry: number;
        };
    };
};
export declare const getRPCLinkConfig: (environment?: "development" | "production") => {
    url: string;
    credentials: "include";
    fetch: (url: string | URL | Request, options?: RequestInit) => Promise<Response>;
};
export declare const getClientURLs: (environment?: "development" | "production") => {
    server: "http://localhost:3000" | "https://api.example.com";
    auth: "http://localhost:3000" | "https://api.example.com";
    rpc: string;
    api: string;
};
export declare const getCommonFetchConfig: () => {
    credentials: "include";
    headers: {
        "Content-Type": string;
    };
};
//# sourceMappingURL=client.d.ts.map