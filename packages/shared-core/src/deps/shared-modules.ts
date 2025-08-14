// Comprehensive shared node modules
// This file re-exports commonly used modules to reduce duplication

// Core utilities that all apps might need
export { default as clsx } from "clsx";

// Date utilities
export { default as dayjs } from "dayjs";

// Validation
export { z } from "zod";

// Development utilities
export const getNodeEnv = () => process.env.NODE_ENV || "development";
export const isDev = () => getNodeEnv() === "development";
export const isProd = () => getNodeEnv() === "production";

// Common type utilities
export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Async utilities
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

export const throttle = <T extends (...args: any[]) => any>(
    func: T,
    limit: number
): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};