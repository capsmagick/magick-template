import { createBetterAuthClient } from "@repo/shared-core/deps/auth";
import { getPublicServerUrl } from "@repo/shared-core/config";

// Simple, direct configuration using shared factory
const baseURL = getPublicServerUrl();
export const authClient = createBetterAuthClient(baseURL);
