// Shared oRPC utilities and factory functions
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { RPCHandler } from "@orpc/server/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";

// Factory function for creating RPC link with shared configuration
export const createRPCLink = (url: string) => {
    return new RPCLink({
        url,
        fetch(request: Request, init: any) {
            return fetch(request, {
                ...init,
                credentials: "include",
            });
        },
    });
};

// Factory function for creating oRPC client
export const createTypedORPCClient = (url: string) => {
    const link = createRPCLink(url);
    return createORPCClient(link);
};

// oRPC configuration helpers
export const getORPCDefaults = () => ({
    credentials: "include" as const,
    timeout: 30000,
    retries: 3,
});

// Don't re-export the entire modules, just provide utilities
// Apps should import these directly: createORPCClient, RPCLink, etc.