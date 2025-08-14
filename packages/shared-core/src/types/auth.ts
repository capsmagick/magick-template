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

// Inferred Types
export type User = z.infer<typeof UserSchema>;
export type Session = z.infer<typeof SessionSchema>;
export type AuthContext = z.infer<typeof AuthContextSchema>;

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

export type SignInInput = z.infer<typeof SignInSchema>;
export type SignUpInput = z.infer<typeof SignUpSchema>;

// Admin roles
export const AdminRoles = ["superadmin", "admin"] as const;
export type AdminRole = typeof AdminRoles[number];

// Client-side router interface that matches the server's AppRouter structure
export interface AppRouterClient {
    healthCheck(): Promise<import("./api.js").HealthCheck>;
    privateData(): Promise<{ message: string; user?: User }>;
    auth: {
        signIn(input: SignInInput): Promise<{ success: boolean; data: any }>;
        signUp(input: SignUpInput): Promise<{ success: boolean; data: any }>;
        signOut(): Promise<{ success: boolean; data: any }>;
        getSession(): Promise<{ success: boolean; data: any }>;
    };
}