<!--
  RoadmapItem Component - Template Documentation
  
  This component displays information about a roadmap item for the template.
  When removing template documentation for production, delete this entire file.
-->

<script lang="ts">
  import type { RoadmapItem } from '../types.js';
  import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
  import CheckCircleIcon from '@lucide/svelte/icons/check-circle';
  import ClockIcon from '@lucide/svelte/icons/clock';
  import CalendarIcon from '@lucide/svelte/icons/calendar';
  import MessageCircleIcon from '@lucide/svelte/icons/message-circle';
  import BugIcon from '@lucide/svelte/icons/bug';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';

  interface Props {
    item: RoadmapItem;
    compact?: boolean;
    showTimeline?: boolean;
  }

  let { item, compact = false, showTimeline = true }: Props = $props();

  // Status configurations
  const statusConfig = {
    completed: {
      icon: CheckCircleIcon,
      color: 'bg-green-100 text-green-800 border-green-200',
      borderColor: 'border-l-green-500',
      label: 'Completed',
      emoji: '✓'
    },
    'in-progress': {
      icon: ClockIcon,
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      borderColor: 'border-l-blue-500',
      label: 'In Progress',
      emoji: '🔄'
    },
    planned: {
      icon: CalendarIcon,
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      borderColor: 'border-l-gray-400',
      label: 'Planned',
      emoji: '📋'
    }
  };

  // Priority configurations
  const priorityConfig = {
    high: {
      color: 'bg-red-100 text-red-800 border-red-200',
      label: 'High Priority',
      emoji: '🔥'
    },
    medium: {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      label: 'Medium Priority',
      emoji: '⚡'
    },
    low: {
      color: 'bg-green-100 text-green-800 border-green-200',
      label: 'Low Priority',
      emoji: '📝'
    }
  };

  const StatusIcon = statusConfig[item.status].icon;

  function openLink(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // Format status for display
  function formatStatus(status: string) {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
</script>

<Card class="group h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 {statusConfig[item.status].borderColor} border-l-4">
  <CardHeader class={compact ? 'pb-2' : 'pb-3'}>
    <div class="flex items-start justify-between">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-2">
          <!-- Status badge -->
          <Badge variant="secondary" class="{statusConfig[item.status].color} text-xs flex items-center gap-1">
            <StatusIcon class="h-3 w-3" />
            {statusConfig[item.status].emoji} {formatStatus(item.status)}
          </Badge>
          
          <!-- Priority badge -->
          <Badge variant="outline" class="{priorityConfig[item.priority].color} text-xs">
            {priorityConfig[item.priority].emoji} {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
          </Badge>
        </div>
        
        <CardTitle class="{compact ? 'text-base' : 'text-lg'} font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {item.title}
        </CardTitle>
      </div>
    </div>
  </CardHeader>

  <CardContent class="pt-0">
    <CardDescription class="text-gray-600 {compact ? 'mb-3' : 'mb-4'} {compact ? 'line-clamp-2' : 'line-clamp-3'}">
      {item.description}
    </CardDescription>

    <!-- Timeline information -->
    {#if showTimeline}
      <div class="space-y-2 mb-4">
        {#if item.completedDate}
          <div class="flex items-center gap-2 text-sm text-green-700">
            <CheckCircleIcon class="h-4 w-4" />
            <span>Completed: {item.completedDate}</span>
          </div>
        {:else if item.estimatedCompletion}
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <CalendarIcon class="h-4 w-4" />
            <span>Est. completion: {item.estimatedCompletion}</span>
          </div>
        {/if}
      </div>
    {/if}

    <!-- Action buttons -->
    <div class="flex gap-2">
      {#if item.discussionUrl}
        <Button 
          variant="outline" 
          size="sm" 
          class="flex-1 text-xs"
          onclick={() => openLink(item.discussionUrl!)}
        >
          <MessageCircleIcon class="h-3 w-3 mr-1" />
          Discussion
        </Button>
      {/if}
      
      {#if item.issueUrl}
        <Button 
          variant="outline" 
          size="sm" 
          class="flex-1 text-xs"
          onclick={() => openLink(item.issueUrl!)}
        >
          <BugIcon class="h-3 w-3 mr-1" />
          Issue
        </Button>
      {/if}

      <!-- If no action buttons, show status-appropriate message -->
      {#if !item.discussionUrl && !item.issueUrl}
        <div class="flex-1 text-xs text-gray-400 text-center py-2">
          {#if item.status === 'completed'}
            Completed
          {:else if item.status === 'in-progress'}
            In Development
          {:else}
            Coming Soon
          {/if}
        </div>
      {/if}
    </div>
  </CardContent>
</Card>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>