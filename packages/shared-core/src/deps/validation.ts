// Shared validation utilities and schema factories
import { z } from "zod";

// Common validation schema factories using Zod
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

// Schema configuration helpers
export const getValidationDefaults = () => ({
    passwordMinLength: 8,
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    requiredMessage: "This field is required",
    emailMessage: "Invalid email address",
});

// Common validation patterns
export const VALIDATION_PATTERNS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
    phone: /^\+?[\d\s\-\(\)]+$/,
} as const;

// Don't re-export z - apps should import zod directly