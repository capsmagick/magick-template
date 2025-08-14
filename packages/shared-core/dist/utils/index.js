// Shared utility functions
export const cn = (...classes) => {
    return classes.filter(Boolean).join(" ");
};
export const formatDate = (date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString();
};
export const formatDateTime = (date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleString();
};
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
// Re-export SvelteKit utilities
export * from "./sveltekit-env.js";
//# sourceMappingURL=index.js.map