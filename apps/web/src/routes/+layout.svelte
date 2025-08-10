<script lang="ts">
    import { QueryClientProvider } from '@tanstack/svelte-query';
    import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
    import '../app.css';
    import { queryClient } from '$lib/orpc';
    import Header from '../components/Header.svelte';
    import { page } from '$app/stores';
    import { authClient } from '$lib/auth-client';
    
    let { children } = $props();
    
    const sessionQuery = authClient.useSession();
    
    // Show header only when not in (app) routes or admin routes, or when not logged in
    const showHeader = $derived((!$page.url.pathname.startsWith('/dashboard') && !$page.url.pathname.startsWith('/admin')) || !$sessionQuery.data);
</script>

<QueryClientProvider client={queryClient}>
    <div class="grid h-svh grid-rows-[auto_1fr]">
		{#if showHeader}
			<Header />
		{/if}
		<main class="overflow-y-auto">
			{@render children()}
		</main>
    </div>
    <SvelteQueryDevtools />
</QueryClientProvider>
