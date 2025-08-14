export { default as clsx } from "clsx";
export { default as dayjs } from "dayjs";
export { z } from "zod";
export declare const getNodeEnv: () => string;
export declare const isDev: () => boolean;
export declare const isProd: () => boolean;
export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export declare const sleep: (ms: number) => Promise<unknown>;
export declare const debounce: <T extends (...args: any[]) => any>(func: T, wait: number) => ((...args: Parameters<T>) => void);
export declare const throttle: <T extends (...args: any[]) => any>(func: T, limit: number) => ((...args: Parameters<T>) => void);
//# sourceMappingURL=shared-modules.d.ts.map