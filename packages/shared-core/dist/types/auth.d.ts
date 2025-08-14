import { z } from "zod";
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    emailVerified: z.ZodBoolean;
    image: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
export declare const SessionSchema: z.ZodObject<{
    id: z.ZodString;
    expiresAt: z.ZodDate;
    token: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    ipAddress: z.ZodOptional<z.ZodString>;
    userAgent: z.ZodOptional<z.ZodString>;
    userId: z.ZodString;
}, z.core.$strip>;
export declare const AuthContextSchema: z.ZodObject<{
    user: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        emailVerified: z.ZodBoolean;
        image: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, z.core.$strip>>;
    session: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        expiresAt: z.ZodDate;
        token: z.ZodString;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        ipAddress: z.ZodOptional<z.ZodString>;
        userAgent: z.ZodOptional<z.ZodString>;
        userId: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type User = z.infer<typeof UserSchema>;
export type Session = z.infer<typeof SessionSchema>;
export type AuthContext = z.infer<typeof AuthContextSchema>;
export declare const SignInSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const SignUpSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type SignInInput = z.infer<typeof SignInSchema>;
export type SignUpInput = z.infer<typeof SignUpSchema>;
export declare const AdminRoles: readonly ["superadmin", "admin"];
export type AdminRole = typeof AdminRoles[number];
export interface AppRouterClient {
    healthCheck(): Promise<import("./api.js").HealthCheck>;
    privateData(): Promise<{
        message: string;
        user?: User;
    }>;
    auth: {
        signIn(input: SignInInput): Promise<{
            success: boolean;
            data: any;
        }>;
        signUp(input: SignUpInput): Promise<{
            success: boolean;
            data: any;
        }>;
        signOut(): Promise<{
            success: boolean;
            data: any;
        }>;
        getSession(): Promise<{
            success: boolean;
            data: any;
        }>;
    };
}
//# sourceMappingURL=auth.d.ts.map