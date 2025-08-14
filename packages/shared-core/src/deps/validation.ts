// Shared Zod utilities and re-exports
import { z } from "zod";

// Common validation utilities
export const createEmailSchema = () => z.string().email("Invalid email address");
export const createPasswordSchema = (minLength = 8) =>
    z.string().min(minLength, `Password must be at least ${minLength} characters`);

export const createRequiredStringSchema = (fieldName: string) =>
    z.string().min(1, `${fieldName} is required`);

// Common form validation schemas
export const createSignInSchema = () => z.object({
    email: createEmailSchema(),
    password: createRequiredStringSchema("Password"),
});

export const createSignUpSchema = () => z.object({
    name: createRequiredStringSchema("Name"),
    email: createEmailSchema(),
    password: createPasswordSchema(),
});

// Re-export zod
export { z };