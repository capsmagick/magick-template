import { z } from "zod";
// Better Auth User Schema
export const UserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    emailVerified: z.boolean(),
    image: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
// Better Auth Session Schema
export const SessionSchema = z.object({
    id: z.string(),
    expiresAt: z.date(),
    token: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    ipAddress: z.string().optional(),
    userAgent: z.string().optional(),
    userId: z.string(),
});
// Auth Context Schema
export const AuthContextSchema = z.object({
    user: UserSchema.optional(),
    session: SessionSchema.optional(),
});
// Auth-related API schemas
export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});
export const SignUpSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
});
// Admin roles
export const AdminRoles = ["superadmin", "admin"];
//# sourceMappingURL=auth.js.map