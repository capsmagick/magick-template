import { createORPCClient } from "@orpc/client";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { createQueryClient, createRPCLink } from "@repo/shared-core/deps";
import { getPublicServerUrl } from "@repo/shared-core/config";

// Simple, direct configuration using shared utilities
export const queryClient = createQueryClient();

// Create RPC link using shared factory
const serverUrl = getPublicServerUrl();
const rpcUrl = serverUrl ? `${serverUrl}/rpc` : "/rpc";
export const link = createRPCLink(rpcUrl);

// Create the oRPC client
export const client = createORPCClient(link);

export const orpc = createTanstackQueryUtils(client);