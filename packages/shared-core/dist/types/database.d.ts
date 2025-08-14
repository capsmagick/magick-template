import { z } from "zod";
export declare const ObjectIdSchema: z.ZodString;
export declare const BaseEntitySchema: z.ZodObject<{
    _id: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
export declare const UserEntitySchema: z.ZodObject<{
    _id: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    name: z.ZodString;
    email: z.ZodString;
    emailVerified: z.ZodBoolean;
    image: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const SessionEntitySchema: z.ZodObject<{
    _id: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    expiresAt: z.ZodDate;
    token: z.ZodString;
    ipAddress: z.ZodOptional<z.ZodString>;
    userAgent: z.ZodOptional<z.ZodString>;
    userId: z.ZodString;
}, z.core.$strip>;
export declare const AccountEntitySchema: z.ZodObject<{
    _id: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    accountId: z.ZodString;
    providerId: z.ZodString;
    userId: z.ZodString;
    accessToken: z.ZodOptional<z.ZodString>;
    refreshToken: z.ZodOptional<z.ZodString>;
    idToken: z.ZodOptional<z.ZodString>;
    accessTokenExpiresAt: z.ZodOptional<z.ZodDate>;
    refreshTokenExpiresAt: z.ZodOptional<z.ZodDate>;
    scope: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const VerificationEntitySchema: z.ZodObject<{
    _id: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    identifier: z.ZodString;
    value: z.ZodString;
    expiresAt: z.ZodDate;
}, z.core.$strip>;
export type ObjectId = z.infer<typeof ObjectIdSchema>;
export type BaseEntity = z.infer<typeof BaseEntitySchema>;
export type UserEntity = z.infer<typeof UserEntitySchema>;
export type SessionEntity = z.infer<typeof SessionEntitySchema>;
export type AccountEntity = z.infer<typeof AccountEntitySchema>;
export type VerificationEntity = z.infer<typeof VerificationEntitySchema>;
export declare const DatabaseConfigSchema: z.ZodObject<{
    url: z.ZodString;
    name: z.ZodString;
    options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strip>;
export type DatabaseConfig = z.infer<typeof DatabaseConfigSchema>;
//# sourceMappingURL=database.d.ts.map