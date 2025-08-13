<!--
TEMPLATE DOCS: Breadcrumb Navigation Component

This component provides breadcrumb navigation specifically for template documentation pages.
Remove this entire file when removing template documentation for production.

REMOVAL INSTRUCTIONS:
1. Delete this entire file: src/lib/template-docs/components/Breadcrumb.svelte
2. Remove any imports of this component from template documentation pages
3. Remove breadcrumb usage from guide and roadmap pages
4. Test that navigation still works without breadcrumbs
-->

<script lang="ts">
  import { page } from '$app/stores';
  import { ChevronRight, Home } from '@lucide/svelte/icons';
  import { Button } from '$lib/components/ui/button/index.js';
  
  // TEMPLATE DOCS: Import template documentation configuration
  // Remove this import when removing template docs
  import { getTemplateInfo } from '../config.js';

  interface BreadcrumbItem {
    label: string;
    href?: string;
    current?: boolean;
    templateContext?: boolean; // Mark template-specific items
  }

  // Props
  let { 
    items = [],
    showHome = true,
    showSkipLink = true,
    className = ''
  }: {
    items?: BreadcrumbItem[];
    showHome?: boolean;
    showSkipLink?: boolean;
    className?: string;
  } = $props();

  // Get template information for context
  const templateInfo = getTemplateInfo();
  
  // Build breadcrumb items based on current page
  const breadcrumbItems = $derived(() => {
    const currentPath = $page.url.pathname;
    const baseItems: BreadcrumbItem[] = [];
    
    // Add home if requested
    if (showHome) {
      baseItems.push({
        label: 'Home',
        href: '/',
        templateContext: false
      });
    }
    
    // Add template documentation context
    if (currentPath.startsWith('/guide') || currentPath.startsWith('/roadmap')) {
      baseItems.push({
        label: 'Template Docs',
        href: undefined, // No direct link, just context
        templateContext: true
      });
    }
    
    // Add page-specific items
    if (currentPath === '/guide') {
      baseItems.push({
        label: 'Setup Guide',
        current: true,
        templateContext: true
      });
    } else if (currentPath === '/roadmap') {
      baseItems.push({
        label: 'Development Roadmap',
        current: true,
        templateContext: true
      });
    }
    
    // Merge with custom items
    return [...baseItems, ...items];
  });

  // Generate structured data for SEO
  const structuredData = $derived(() => {
    const itemListElement = breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      ...(item.href && { "item": `${$page.url.origin}${item.href}` })
    }));

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "name": `${templateInfo.name} Template Documentation Breadcrumb`,
      "description": "Navigation breadcrumb for template documentation",
      "itemListElement": itemListElement
    };
  });
</script>

<!-- Skip link for accessibility -->
{#if showSkipLink}
  <a 
    href="#main-content" 
    class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
    data-template-skip-link="true"
  >
    Skip to main content
  </a>
{/if}

<!-- Structured data for SEO -->
<svelte:head>
  <script type="application/ld+json">
    {JSON.stringify(structuredData)}
  </script>
</svelte:head>

<!-- Breadcrumb navigation -->
<nav 
  aria-label="Template documentation breadcrumb" 
  class={`flex items-center space-x-1 text-sm text-muted-foreground ${className}`}
  data-template-breadcrumb="true"
>
  <ol class="flex items-center space-x-1" role="list">
    {#each breadcrumbItems as item, index (item.label)}
      <li class="flex items-center space-x-1" role="listitem">
        <!-- Separator (not for first item) -->
        {#if index > 0}
          <ChevronRight class="h-4 w-4 text-muted-foreground/50" aria-hidden="true" />
        {/if}
        
        <!-- Breadcrumb item -->
        {#if item.current}
          <span 
            class="font-medium text-foreground"
            aria-current="page"
            data-template-breadcrumb-current={item.templateContext ? "true" : undefined}
          >
            {item.label}
          </span>
        {:else if item.href}
          <Button
            variant="ghost"
            size="sm"
            class="h-auto p-0 text-muted-foreground hover:text-foreground"
            data-template-breadcrumb-link={item.templateContext ? "true" : undefined}
          >
            <a 
              href={item.href}
              class="flex items-center gap-1 px-1 py-0.5"
            >
              {#if item.label === 'Home'}
                <Home class="h-3 w-3" aria-hidden="true" />
              {/if}
              {item.label}
            </a>
          </Button>
        {:else}
          <span 
            class="text-muted-foreground"
            data-template-breadcrumb-context={item.templateContext ? "true" : undefined}
          >
            {item.label}
          </span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style>
  /* Ensure proper focus styles for accessibility */
  :global([data-template-skip-link]:focus) {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
  
  /* Template-specific breadcrumb styling */
  :global([data-template-breadcrumb]) {
    /* Add subtle template context styling */
    border-left: 2px solid hsl(var(--muted));
    padding-left: 0.75rem;
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    :global([data-template-breadcrumb]) {
      border-left-color: currentColor;
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    :global([data-template-breadcrumb] *) {
      transition: none !important;
    }
  }
</style>