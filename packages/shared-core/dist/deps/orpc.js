// Shared oRPC utilities and re-exports
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { RPCHandler } from "@orpc/server/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
// Common oRPC configuration
export const createRPCLink = (url) => {
    return new RPCLink({
        url,
        fetch(request, init) {
            return fetch(request, {
                ...init,
                credentials: "include",
            });
        },
    });
};
// Common oRPC client factory
export const createTypedORPCClient = (url) => {
    const link = createRPCLink(url);
    return createORPCClient(link);
};
// Re-export all utilities
export { createORPCClient, RPCLink, RPCHandler, createTanstackQueryUtils };
//# sourceMappingURL=orpc.js.map