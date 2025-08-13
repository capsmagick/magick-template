<!--
  TechnologyCard Component - Template Documentation
  
  This component displays information about a technology used in the template.
  When removing template documentation for production, delete this entire file.
-->

<script lang="ts">
  import type { Technology } from '../types.js';
  import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
  import InfoIcon from '@lucide/svelte/icons/info';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '$lib/components/ui/tooltip/index.js';

  interface Props {
    technology: Technology;
    showReasoning?: boolean;
  }

  let { technology, showReasoning = false }: Props = $props();

  // Category colors for badges
  const categoryColors = {
    frontend: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    backend: 'bg-green-100 text-green-800 hover:bg-green-200',
    tools: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    database: 'bg-orange-100 text-orange-800 hover:bg-orange-200'
  };

  // Handle image loading errors
  let imageError = $state(false);
  
  function handleImageError() {
    imageError = true;
  }

  function openLink(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
</script>

<Card class="group h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
  <CardHeader class="pb-3">
    <div class="flex items-start justify-between">
      <div class="flex items-center gap-3">
        <!-- Technology Logo -->
        <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden">
          {#if !imageError}
            <img 
              src={technology.logo} 
              alt="{technology.name} logo"
              class="w-8 h-8 object-contain"
              onerror={handleImageError}
            />
          {:else}
            <!-- Fallback icon when image fails to load -->
            <div class="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-semibold">
              {technology.name.charAt(0)}
            </div>
          {/if}
        </div>
        
        <div class="min-w-0 flex-1">
          <CardTitle class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {technology.name}
          </CardTitle>
          <Badge variant="secondary" class="{categoryColors[technology.category]} text-xs mt-1">
            {technology.category}
          </Badge>
        </div>
      </div>

      <!-- Reasoning tooltip -->
      {#if showReasoning && technology.reasoning}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" class="h-8 w-8 p-0 text-gray-400 hover:text-gray-600">
                <InfoIcon class="h-4 w-4" />
                <span class="sr-only">Why this technology?</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent class="max-w-xs">
              <p class="text-sm">{technology.reasoning}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      {/if}
    </div>
  </CardHeader>

  <CardContent class="pt-0">
    <CardDescription class="text-gray-600 mb-4 line-clamp-2">
      {technology.description}
    </CardDescription>

    <!-- Action buttons -->
    <div class="flex gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        class="flex-1 text-xs"
        onclick={() => openLink(technology.officialUrl)}
      >
        <ExternalLinkIcon class="h-3 w-3 mr-1" />
        Website
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        class="flex-1 text-xs"
        onclick={() => openLink(technology.docsUrl)}
      >
        <ExternalLinkIcon class="h-3 w-3 mr-1" />
        Docs
      </Button>
    </div>
  </CardContent>
</Card>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>