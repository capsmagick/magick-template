

import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "../db";
import { getTrustedOrigins } from "@repo/shared-core/config/server";

const trustedOrigins = getTrustedOrigins(process.env.NODE_ENV as "development" | "production");

export const auth = betterAuth({
  database: mongodbAdapter(client),
  trustedOrigins,
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    admin({
      adminRoles: ["superadmin", "admin"],
    }),
  ],
}) as any;
