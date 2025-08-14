import { z } from "zod";
// MongoDB ObjectId Schema
export const ObjectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");
// Base Entity Schema (common fields for all entities)
export const BaseEntitySchema = z.object({
    _id: ObjectIdSchema,
    createdAt: z.date(),
    updatedAt: z.date(),
});
// User Entity Schema (extends Better Auth user)
export const UserEntitySchema = BaseEntitySchema.extend({
    name: z.string(),
    email: z.string().email(),
    emailVerified: z.boolean(),
    image: z.string().optional(),
});
// Session Entity Schema
export const SessionEntitySchema = BaseEntitySchema.extend({
    expiresAt: z.date(),
    token: z.string(),
    ipAddress: z.string().optional(),
    userAgent: z.string().optional(),
    userId: ObjectIdSchema,
});
// Account Entity Schema
export const AccountEntitySchema = BaseEntitySchema.extend({
    accountId: z.string(),
    providerId: z.string(),
    userId: ObjectIdSchema,
    accessToken: z.string().optional(),
    refreshToken: z.string().optional(),
    idToken: z.string().optional(),
    accessTokenExpiresAt: z.date().optional(),
    refreshTokenExpiresAt: z.date().optional(),
    scope: z.string().optional(),
    password: z.string().optional(),
});
// Verification Entity Schema
export const VerificationEntitySchema = BaseEntitySchema.extend({
    identifier: z.string(),
    value: z.string(),
    expiresAt: z.date(),
});
// Database Connection Schema
export const DatabaseConfigSchema = z.object({
    url: z.string().url(),
    name: z.string(),
    options: z.record(z.string(), z.unknown()).optional(),
});
//# sourceMappingURL=database.js.map