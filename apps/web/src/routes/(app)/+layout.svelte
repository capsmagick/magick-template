<script lang="ts">
	import { goto } from "$app/navigation";
	import { authClient } from "$lib/auth-client";
	import { createQuery } from "@tanstack/svelte-query";
	import { QueryClientProvider } from "@tanstack/svelte-query";
	import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import { queryClient } from "$lib/orpc";
	import { orpc } from "$lib/orpc";
	import AppSidebar from "$lib/components/app-sidebar.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { dev } from "$app/environment";

	let { children } = $props();

	const sessionQuery = authClient.useSession();

	const privateDataQuery = createQuery(orpc.privateData.queryOptions());

	// Reactively watch for session changes
	$effect(() => {
		const { data: session, isPending } = $sessionQuery;
		if (!session && !isPending) {
			goto("/login");
		}
	});
</script>

<QueryClientProvider client={queryClient}>
	<Sidebar.Provider>
		<AppSidebar />
		<Sidebar.Inset>
			<header
				class="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear"
			>
				<div class="flex items-center gap-2 px-4">
					<Sidebar.Trigger class="-ml-1" />
					<Separator
						orientation="vertical"
						class="mr-2 data-[orientation=vertical]:h-4"
					/>
					<Breadcrumb.Root>
						<Breadcrumb.List>
							<Breadcrumb.Item class="hidden md:block">
								<Breadcrumb.Link href="#"
									>Building Your Application</Breadcrumb.Link
								>
							</Breadcrumb.Item>
							<Breadcrumb.Separator class="hidden md:block" />
							<Breadcrumb.Item>
								<Breadcrumb.Page>Data Fetching</Breadcrumb.Page>
							</Breadcrumb.Item>
						</Breadcrumb.List>
					</Breadcrumb.Root>
				</div>
			</header>
			<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
				<main class="overflow-y-auto">
					{@render children()}
				</main>
				{#if dev}
					{#await import("@tanstack/svelte-query-devtools") then { SvelteQueryDevtools }}
						<SvelteQueryDevtools />
					{/await}
				{/if}
			</div>
		</Sidebar.Inset>
	</Sidebar.Provider>
</QueryClientProvider>
