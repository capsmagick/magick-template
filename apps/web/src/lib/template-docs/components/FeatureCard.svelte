<!--
  FeatureCard Component - Template Documentation
  
  This component displays information about a feature implemented in the template.
  When removing template documentation for production, delete this entire file.
-->

<script lang="ts">
  import type { Feature } from '../types.js';
  import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
  import SettingsIcon from '@lucide/svelte/icons/settings';
  import CheckCircleIcon from '@lucide/svelte/icons/check-circle';
  import ClockIcon from '@lucide/svelte/icons/clock';
  import CalendarIcon from '@lucide/svelte/icons/calendar';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';

  interface Props {
    feature: Feature;
    compact?: boolean;
  }

  let { feature, compact = false }: Props = $props();

  // Status configurations
  const statusConfig = {
    complete: {
      icon: CheckCircleIcon,
      color: 'bg-green-100 text-green-800 hover:bg-green-200',
      label: 'Complete'
    },
    partial: {
      icon: ClockIcon,
      color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      label: 'Partial'
    },
    planned: {
      icon: CalendarIcon,
      color: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
      label: 'Planned'
    }
  };

  // Get icon component based on icon name
  function getIconComponent(iconName: string) {
    const iconMap: Record<string, any> = {
      'shield-check': CheckCircleIcon,
      'edit': SettingsIcon,
      'code': SettingsIcon,
      'palette': SettingsIcon,
      'folder-tree': SettingsIcon,
      'database': SettingsIcon,
      'container': SettingsIcon,
      'refresh-cw': SettingsIcon,
      'wrench': SettingsIcon,
      'rocket': SettingsIcon
    };
    return iconMap[iconName] || SettingsIcon;
  }

  const IconComponent = getIconComponent(feature.icon);
  const StatusIcon = statusConfig[feature.status].icon;

  function openLink(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
</script>

<Card class="group h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
  <CardHeader class="{compact ? 'pb-2' : 'pb-3'}">
    <div class="flex items-start justify-between">
      <div class="flex items-center gap-3">
        <!-- Feature Icon -->
        <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
          <IconComponent class="h-5 w-5 text-gray-600" />
        </div>
        
        <div class="min-w-0 flex-1">
          <CardTitle class="{compact ? 'text-base' : 'text-lg'} font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {feature.title}
          </CardTitle>
          
          <!-- Status badge -->
          <div class="flex items-center gap-2 mt-1">
            <Badge variant="secondary" class="{statusConfig[feature.status].color} text-xs flex items-center gap-1">
              <StatusIcon class="h-3 w-3" />
              {statusConfig[feature.status].label}
            </Badge>
            
            <!-- Setup required indicator -->
            {#if feature.setupRequired}
              <Badge variant="outline" class="text-xs text-orange-600 border-orange-200">
                Setup Required
              </Badge>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </CardHeader>

  <CardContent class="pt-0">
    <CardDescription class="text-gray-600 {compact ? 'mb-3' : 'mb-4'} {compact ? 'line-clamp-1' : 'line-clamp-2'}">
      {feature.description}
    </CardDescription>

    <!-- Action buttons -->
    <div class="flex gap-2">
      {#if feature.demoUrl}
        <Button 
          variant="outline" 
          size="sm" 
          class="flex-1 text-xs"
          onclick={() => openLink(feature.demoUrl!)}
        >
          <ExternalLinkIcon class="h-3 w-3 mr-1" />
          Demo
        </Button>
      {/if}
      
      {#if feature.setupGuideUrl}
        <Button 
          variant="outline" 
          size="sm" 
          class="flex-1 text-xs"
          onclick={() => openLink(feature.setupGuideUrl!)}
        >
          <SettingsIcon class="h-3 w-3 mr-1" />
          Setup
        </Button>
      {/if}

      <!-- If no action buttons, show a disabled placeholder to maintain layout -->
      {#if !feature.demoUrl && !feature.setupGuideUrl}
        <div class="flex-1 text-xs text-gray-400 text-center py-2">
          {feature.status === 'planned' ? 'Coming Soon' : 'No Actions'}
        </div>
      {/if}
    </div>
  </CardContent>
</Card>

<style>
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>