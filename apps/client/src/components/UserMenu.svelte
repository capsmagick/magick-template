<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';
    import { Button } from '$lib/components/ui/button/index.js';
	
	const sessionQuery = authClient.useSession();

	async function handleSignOut() {
		try {
			// First, navigate to login page to ensure UI updates
			goto('/login', { replaceState: true });
			
			// Then perform the actual sign out
			await authClient.signOut();
		} catch (error) {
			console.error('Sign out error:', error);
		}
	}

	function goToLogin() {
		goto('/login');
	}

</script>

<div class="relative">
	{#if $sessionQuery.isPending}
		<div class="h-8 w-24 animate-pulse rounded bg-neutral-700"></div>
	{:else if $sessionQuery.data?.user}
		{@const user = $sessionQuery.data.user}
		<div class="flex items-center gap-3">
			<span class="text-sm text-neutral-300 hidden sm:inline" title={user.email}>
				{user.name || user.email?.split('@')[0] || 'User'}
			</span>
			<Button
				onclick={handleSignOut}
			
			>
				Sign Out
			</Button>
		</div>
	{:else}
		<div class="flex items-center gap-2">
			<Button onclick={goToLogin}>
				Sign In
			</Button>
		</div>
	{/if}
</div>
