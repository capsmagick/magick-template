import { createORPCClient, createRPCLink, createTanstackQueryUtils } from "@repo/shared-core/deps/orpc";
import { createQueryClient } from "@repo/shared-core/deps/query";
import { getPublicServerUrl } from "@repo/shared-core/config";

// Simple, direct configuration using shared environment
const isDevelopment = import.meta.env.MODE === "development";

export const queryClient = createQueryClient();

// Simple RPC link configuration using shared config
const serverUrl = getPublicServerUrl();
const rpcUrl = serverUrl ? `${serverUrl}/rpc` : "/rpc";

export const link = createRPCLink(rpcUrl);

// Create the oRPC client
export const client = createORPCClient(link);

export const orpc = createTanstackQueryUtils(client);