import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [tailwindcss(), sveltekit()],
    test: {
        environment: 'jsdom',
        setupFiles: ['./src/test-setup.ts'],
        globals: true
    },
    ssr: {
        noExternal: [
            '@tanstack/svelte-query',
            '@tanstack/svelte-form',
            '@tanstack/svelte-query-devtools'
        ]
    },
    optimizeDeps: {
        include: [
            '@tanstack/svelte-query',
            '@tanstack/svelte-form',
            '@tanstack/svelte-query-devtools'
        ]
    }
});
