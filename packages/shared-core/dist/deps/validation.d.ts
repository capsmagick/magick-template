import { z } from "zod";
export declare const createEmailSchema: () => z.ZodString;
export declare const createPasswordSchema: (minLength?: number) => z.ZodString;
export declare const createRequiredStringSchema: (fieldName: string) => z.ZodString;
export declare const createSignInSchema: () => z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const createSignUpSchema: () => z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export { z };
//# sourceMappingURL=validation.d.ts.map