<script lang="ts">
    import { ModeWatcher, toggleMode } from "mode-watcher";
    import SunIcon from "@lucide/svelte/icons/sun";
    import MoonIcon from "@lucide/svelte/icons/moon";
    import MenuIcon from "@lucide/svelte/icons/menu";
    import XIcon from "@lucide/svelte/icons/x";
    import { page } from "$app/stores";
    import { Button } from "$lib/components/ui/button/index.js";
    import UserMenu from "./UserMenu.svelte";

    type NavLink = { to: string; label: string };
    const links: NavLink[] = [
        { to: "/", label: "Home" },
        { to: "/dashboard", label: "Dashboard" }
    ];

    let mobileOpen = false;
    const isActive = (to: string) => $page.url.pathname === to;
</script>

<ModeWatcher />
<header class="border-b">
    <div class="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        <!-- Brand -->
        <a href="/" class="flex items-center gap-2" aria-label="Go to home">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" role="img">
                <title>Magick Template</title>
                <path d="M4 12L10 4L14 10L20 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 22L12 12L22 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="font-semibold">Magick Template</span>
        </a>

        <!-- Desktop nav -->
        <nav class="hidden items-center gap-6 md:flex" aria-label="Main">
            {#each links as link (link.to)}
                <a
                    href={link.to}
                    aria-current={isActive(link.to) ? "page" : undefined}
                    class={`text-sm transition-colors hover:text-foreground ${isActive(link.to) ? "text-foreground" : "text-muted-foreground"}`}
                >
                    {link.label}
                </a>
            {/each}
        </nav>

        <!-- Right controls -->
        <div class="flex items-center gap-2">
            <Button type="button" onclick={toggleMode} variant="outline" size="icon" aria-label="Toggle theme">
                <SunIcon class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 !transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 !transition-all dark:rotate-0 dark:scale-100" />
                <span class="sr-only">Toggle theme</span>
            </Button>
            <div class="hidden md:block">
                <UserMenu />
            </div>
            <Button
                type="button"
                variant="ghost"
                size="icon"
                class="md:hidden"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                onclick={() => (mobileOpen = !mobileOpen)}
            >
                {#if mobileOpen}
                    <XIcon class="size-5" />
                {:else}
                    <MenuIcon class="size-5" />
                {/if}
            </Button>
        </div>
    </div>

    <!-- Mobile nav -->
    {#if mobileOpen}
        <div id="mobile-nav" class="md:hidden">
            <nav class="container mx-auto flex flex-col gap-2 px-4 pb-4" aria-label="Mobile">
                {#each links as link (link.to)}
                    <a
                        href={link.to}
                        aria-current={isActive(link.to) ? "page" : undefined}
                        class={`rounded px-2 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${isActive(link.to) ? "text-foreground" : "text-muted-foreground"}`}
                        onclick={() => (mobileOpen = false)}
                    >
                        {link.label}
                    </a>
                {/each}
                <div class="pt-2">
                    <UserMenu />
                </div>
            </nav>
        </div>
    {/if}
</header>
