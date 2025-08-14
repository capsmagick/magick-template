import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { RPCHandler } from "@orpc/server/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
export declare const createRPCLink: (url: string) => RPCLink<import("@orpc/client").ClientContext>;
export declare const createTypedORPCClient: (url: string) => import("@orpc/client").NestedClient<any>;
export { createORPCClient, RPCLink, RPCHandler, createTanstackQueryUtils };
//# sourceMappingURL=orpc.d.ts.map