<script lang="ts">
	import { QueryClientProvider } from "@tanstack/svelte-query";
	import { queryClient } from "$lib/orpc";
	import "../app.css";
</script>

<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>