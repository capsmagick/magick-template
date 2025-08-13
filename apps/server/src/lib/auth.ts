

import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "../db";
import type { Db } from "mongodb";

const DEV_TRUSTED = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:1420",
  "http://127.0.0.1:1420",
];

const envTrusted = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export const auth = betterAuth({
  database: mongodbAdapter(client),
  trustedOrigins: [
    ...new Set([...envTrusted, ...DEV_TRUSTED]),
  ],
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    admin({
      adminRoles: ["superadmin", "admin"],
    }),
  ],
}) as any;
