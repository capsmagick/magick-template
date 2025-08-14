import { z } from "zod";

// Common API Response Schema
export const ApiResponseSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
    data: z.unknown().optional(),
    error: z.string().optional(),
});

export type ApiResponse<T = unknown> = {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
};

// Pagination Schema
export const PaginationSchema = z.object({
    page: z.number().min(1).default(1),
    limit: z.number().min(1).max(100).default(10),
    total: z.number().optional(),
    totalPages: z.number().optional(),
});

export type Pagination = z.infer<typeof PaginationSchema>;

// Common Query Parameters
export const QueryParamsSchema = z.object({
    search: z.string().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).default("asc"),
    ...PaginationSchema.shape,
});

export type QueryParams = z.infer<typeof QueryParamsSchema>;

// Error Response Schema
export const ErrorResponseSchema = z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.string(), z.unknown()).optional(),
    timestamp: z.date().default(() => new Date()),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

// Health Check Schema
export const HealthCheckSchema = z.object({
    status: z.enum(["healthy", "unhealthy"]),
    timestamp: z.date(),
    services: z.record(z.string(), z.object({
        status: z.enum(["up", "down"]),
        responseTime: z.number().optional(),
    })).optional(),
});

export type HealthCheck = z.infer<typeof HealthCheckSchema>;