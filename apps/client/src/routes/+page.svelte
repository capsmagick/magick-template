<script lang="ts">
	import { authClient } from "$lib/auth-client";
	import type { User } from "@repo/shared-core/types/auth";

	const session = authClient.useSession();
</script>

<div class="container mx-auto p-8">
	<h1 class="text-4xl font-bold mb-8">Client App</h1>
	
	{#if $session.data?.user}
		<div class="bg-green-100 p-4 rounded-lg">
			<h2 class="text-xl font-semibold mb-2">Welcome, {$session.data.user.name}!</h2>
			<p class="text-gray-600">Email: {$session.data.user.email}</p>
			<button 
				class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
				onclick={() => authClient.signOut()}
			>
				Sign Out
			</button>
		</div>
	{:else}
		<div class="bg-blue-100 p-4 rounded-lg">
			<h2 class="text-xl font-semibold mb-2">Not Authenticated</h2>
			<p class="text-gray-600">Please sign in to access the client app.</p>
			<a 
				href="/login" 
				class="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
			>
				Go to Login
			</a>
		</div>
	{/if}
</div>