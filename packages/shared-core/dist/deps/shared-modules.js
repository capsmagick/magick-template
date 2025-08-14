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
// Async utilities
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};
export const throttle = (func, limit) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};
//# sourceMappingURL=shared-modules.js.map