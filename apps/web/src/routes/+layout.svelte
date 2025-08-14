<script lang="ts">
    import { QueryClientProvider } from '@tanstack/svelte-query';
    import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
    import '../app.css';
    import { queryClient } from '$lib/orpc';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { authClient } from '$lib/auth-client';
    
    let { children } = $props();
    
    const sessionQuery = authClient.useSession();
    
    // Only redirect to login if we're not already on the login page
    $effect(() => {
		const { data: session, isPending } = $sessionQuery;
		if (!session && !isPending && !$page.url.pathname.startsWith('/login')) {
			goto('/login');
		}
	});

	onMount(() => {
		const { data: session, isPending } = get(sessionQuery);
		if (!session && !isPending && !$page.url.pathname.startsWith('/login')) {
			goto('/login');
		}
	});
    
</script>

<QueryClientProvider client={queryClient}>
    <div class="grid h-svh grid-rows-[auto_1fr]">
		<main class="overflow-y-auto">
			{@render children()}
		</main>
    </div>
    <SvelteQueryDevtools />
</QueryClientProvider>
