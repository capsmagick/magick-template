// Shared utility functions using external dependencies
import clsx from "clsx";

// CSS class utility function
export const cn = (...classes: (string | undefined | null | boolean)[]) => {
    return clsx(classes);
};

// Development utilities
export const getNodeEnv = () => process.env.NODE_ENV || "development";
export const isDev = () => getNodeEnv() === "development";
export const isProd = () => getNodeEnv() === "production";

// Common type utilities
export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Result Type for Error Handling
export type Result<T, E = Error> =
    | { success: true; data: T }
    | { success: false; error: E };

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type NonEmptyArray<T> = [T, ...T[]];

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

// String utilities
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
export const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

// Array utilities
export const unique = <T>(arr: T[]): T[] => [...new Set(arr)];
export const chunk = <T>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
};

// Don't re-export clsx directly - provide the cn utility instead