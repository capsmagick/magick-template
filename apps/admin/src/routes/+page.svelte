<script lang="ts">
    import { orpc } from "$lib/orpc";
    import { createQuery } from "@tanstack/svelte-query";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Activity, Layers, Rocket, Shield, Server } from "@lucide/svelte";

    const healthCheck = createQuery(orpc.healthCheck.queryOptions());

    const getStatus = () => {
        if ($healthCheck.isLoading) return { label: "Checking...", color: "bg-amber-500" } as const;
        if ($healthCheck.data) return { label: "Connected", color: "bg-emerald-500" } as const;
        return { label: "Disconnected", color: "bg-rose-500" } as const;
    };
</script>

<section class="relative overflow-hidden">
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-background/0"></div>

    <div class="container mx-auto max-w-6xl px-4 py-16">
        <!-- Hero -->
        <div class="mx-auto max-w-3xl text-center">
            <h1 class="text-foreground mb-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Build modern apps faster with this SvelteKit template
            </h1>
            <p class="text-muted-foreground mx-auto mb-8 max-w-2xl text-balance text-base sm:text-lg">
                Production-ready foundations: typed APIs with ORPC, TanStack Query, rich UI, and Tauri desktop support.
            </p>
            <div class="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/login" size="lg" aria-label="Get started by signing in">
                    Get started
                </Button>
                <Button href="/dashboard" size="lg" variant="outline" aria-label="Open dashboard">
                    Open dashboard
                </Button>
            </div>
        </div>

        <!-- Status + Highlights -->
        <div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card.Card class="sm:col-span-1">
                <Card.CardHeader class="px-6 pt-0">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <Server aria-hidden="true" class="text-muted-foreground" />
                            <Card.CardTitle class="text-base">API Status</Card.CardTitle>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class={`h-2 w-2 rounded-full ${getStatus().color}`}></span>
                            <span class="text-muted-foreground text-sm">{getStatus().label}</span>
                        </div>
                    </div>
                </Card.CardHeader>
                <Card.CardContent class="px-6 pt-0">
                    <p class="text-muted-foreground text-sm">
                        {#if $healthCheck.isLoading}
                            Verifying connection to the server...
                        {:else if $healthCheck.data}
                            The server is reachable and responding.
                        {:else}
                            Unable to reach the server. Please check your API configuration.
                        {/if}
                    </p>
                </Card.CardContent>
            </Card.Card>

            <Card.Card class="sm:col-span-1">
                <Card.CardHeader class="px-6 pt-0">
                    <div class="flex items-center gap-2">
                        <Activity aria-hidden="true" class="text-muted-foreground" />
                        <Card.CardTitle class="text-base">Reactive data</Card.CardTitle>
                    </div>
                </Card.CardHeader>
                <Card.CardContent class="px-6 pt-0">
                    <p class="text-muted-foreground text-sm">
                        Powered by TanStack Query for caching, mutations, and stale-while-revalidate UX.
                    </p>
                </Card.CardContent>
            </Card.Card>

            <Card.Card class="sm:col-span-1">
                <Card.CardHeader class="px-6 pt-0">
                    <div class="flex items-center gap-2">
                        <Shield aria-hidden="true" class="text-muted-foreground" />
                        <Card.CardTitle class="text-base">Type-safe APIs</Card.CardTitle>
                    </div>
                </Card.CardHeader>
                <Card.CardContent class="px-6 pt-0">
                    <p class="text-muted-foreground text-sm">
                        End-to-end types via ORPC and Zod ensure confident, refactor-friendly development.
                    </p>
                </Card.CardContent>
            </Card.Card>
        </div>

        <!-- Features -->
        <div class="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card.Card>
                <Card.CardHeader class="px-6 pt-0">
                    <div class="flex items-center gap-2">
                        <Layers aria-hidden="true" class="text-muted-foreground" />
                        <Card.CardTitle class="text-base">UI Building Blocks</Card.CardTitle>
                    </div>
                </Card.CardHeader>
                <Card.CardContent class="px-6 pt-0">
                    <p class="text-muted-foreground text-sm">
                        A rich component kit with sensible defaults and Tailwind styling.
                    </p>
                </Card.CardContent>
            </Card.Card>

            <Card.Card>
                <Card.CardHeader class="px-6 pt-0">
                    <div class="flex items-center gap-2">
                        <Rocket aria-hidden="true" class="text-muted-foreground" />
                        <Card.CardTitle class="text-base">Desktop Ready</Card.CardTitle>
                    </div>
                </Card.CardHeader>
                <Card.CardContent class="px-6 pt-0">
                    <p class="text-muted-foreground text-sm">
                        Tauri integration for building lightweight, secure desktop apps.
                    </p>
                </Card.CardContent>
            </Card.Card>

            <Card.Card>
                <Card.CardHeader class="px-6 pt-0">
                    <div class="flex items-center gap-2">
                        <Server aria-hidden="true" class="text-muted-foreground" />
                        <Card.CardTitle class="text-base">ORPC Backend</Card.CardTitle>
                    </div>
                </Card.CardHeader>
                <Card.CardContent class="px-6 pt-0">
                    <p class="text-muted-foreground text-sm">
                        Typed server procedures with an ergonomic client and first-class DX.
                    </p>
                </Card.CardContent>
            </Card.Card>

            <Card.Card>
                <Card.CardHeader class="px-6 pt-0">
                    <div class="flex items-center gap-2">
                        <Activity aria-hidden="true" class="text-muted-foreground" />
                        <Card.CardTitle class="text-base">Best Practices</Card.CardTitle>
                    </div>
                </Card.CardHeader>
                <Card.CardContent class="px-6 pt-0">
                    <p class="text-muted-foreground text-sm">
                        Strict typing, accessibility standards, and consistent code quality baked in.
                    </p>
                </Card.CardContent>
            </Card.Card>
        </div>
    </div>
</section>


