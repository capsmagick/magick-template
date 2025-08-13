<!--
  Template Roadmap Page - Template Documentation
  
  This page shows the development roadmap and planned features for the template.
  When removing template documentation for production, delete this entire file and directory.
  
  TEMPLATE DOCS: This entire page should be removed for production use.
-->

<script lang="ts">
  import { page } from '$app/stores';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import MapIcon from '@lucide/svelte/icons/map';
  import CalendarIcon from '@lucide/svelte/icons/calendar';
  import TrendingUpIcon from '@lucide/svelte/icons/trending-up';
  import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
  import { roadmapItems } from '$lib/template-docs/data/roadmap.js';
  import { Breadcrumb } from '$lib/template-docs/components/index.js';

  // Group roadmap items by status
  const groupedItems = $derived(() => {
    const groups = {
      completed: roadmapItems.filter(item => item.status === 'completed'),
      'in-progress': roadmapItems.filter(item => item.status === 'in-progress'),
      planned: roadmapItems.filter(item => item.status === 'planned')
    };
    return groups;
  });

  // Get status color
  function getStatusColor(status: string) {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planned': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  // Get priority color
  function getPriorityColor(priority: string) {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  // Format status for display
  function formatStatus(status: string) {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  // Calculate completion percentage
  const completionPercentage = $derived(() => {
    const total = roadmapItems.length;
    const completed = groupedItems().completed.length;
    return Math.round((completed / total) * 100);
  });
</script>

<svelte:head>
  <title>Template Roadmap - Template Documentation</title>
  <meta name="description" content="Development roadmap and planned features for this SvelteKit template including timelines and priorities." />
  <meta name="robots" content="noindex, nofollow" />
  
  <!-- Open Graph tags for template documentation -->
  <meta property="og:title" content="Template Development Roadmap" />
  <meta property="og:description" content="Development roadmap and planned features for this SvelteKit template" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="{$page.url.href}" />
  
  <!-- Template documentation indicator -->
  <meta name="template-docs" content="true" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Header -->
  <header class="bg-white border-b border-gray-200">
    <div class="container mx-auto max-w-7xl px-4 py-6">
      <!-- TEMPLATE DOCS: Breadcrumb Navigation -->
      <!-- Remove this breadcrumb when removing template docs -->
      <Breadcrumb className="mb-6" />
      
      <!-- Template Documentation Notice -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div class="flex items-start gap-3">
          <div class="text-blue-600 text-lg">🗺️</div>
          <div>
            <h3 class="text-blue-900 font-semibold text-sm mb-1">Template Documentation</h3>
            <p class="text-blue-700 text-sm">
              This roadmap shows planned template improvements and features. 
              <a href="/guide" class="underline hover:no-underline">View setup guide</a> or 
              <a href="/" class="underline hover:no-underline">back to home</a>.
              Remove this entire page for production use.
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3 mb-4">
        <MapIcon class="h-8 w-8 text-blue-600" />
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Template Roadmap</h1>
          <p class="text-gray-600">Planned features and development timeline</p>
        </div>
      </div>

      <!-- Progress Overview -->
      <div class="flex flex-wrap gap-4 text-sm">
        <div class="flex items-center gap-2">
          <Badge variant="secondary" class="bg-green-100 text-green-800">
            {groupedItems().completed.length} Completed
          </Badge>
        </div>
        <div class="flex items-center gap-2">
          <Badge variant="secondary" class="bg-blue-100 text-blue-800">
            {groupedItems()['in-progress'].length} In Progress
          </Badge>
        </div>
        <div class="flex items-center gap-2">
          <Badge variant="secondary" class="bg-gray-100 text-gray-800">
            {groupedItems().planned.length} Planned
          </Badge>
        </div>
        <div class="flex items-center gap-2">
          <Badge variant="secondary" class="bg-purple-100 text-purple-800">
            {completionPercentage}% Complete
          </Badge>
        </div>
      </div>
    </div>
  </header>

  <div class="container mx-auto max-w-7xl px-4 py-8">
    <!-- Progress Bar -->
    <div class="mb-8">
      <Card>
        <CardHeader>
          <div class="flex items-center gap-3">
            <TrendingUpIcon class="h-6 w-6 text-blue-600" />
            <div>
              <CardTitle>Overall Progress</CardTitle>
              <CardDescription>Template development completion status</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{completionPercentage}% Complete</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div 
                class="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style="width: {completionPercentage}%"
              ></div>
            </div>
            <div class="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div class="text-2xl font-bold text-green-600">{groupedItems().completed.length}</div>
                <div class="text-gray-600">Completed</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-blue-600">{groupedItems()['in-progress'].length}</div>
                <div class="text-gray-600">In Progress</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-600">{groupedItems().planned.length}</div>
                <div class="text-gray-600">Planned</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Roadmap Timeline -->
    <div class="space-y-8">
      <!-- Completed Items -->
      {#if groupedItems().completed.length > 0}
        <section>
          <div class="flex items-center gap-3 mb-6">
            <div class="w-3 h-3 bg-green-600 rounded-full"></div>
            <h2 class="text-2xl font-bold text-gray-900">Completed Features</h2>
            <Badge class="bg-green-100 text-green-800">{groupedItems().completed.length}</Badge>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each groupedItems().completed as item}
              <Card class="border-l-4 border-l-green-500">
                <CardHeader>
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <CardTitle class="text-lg">{item.title}</CardTitle>
                      <CardDescription class="mt-1">{item.description}</CardDescription>
                    </div>
                    <Badge class={getStatusColor(item.status)}>
                      ✓ {formatStatus(item.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div class="space-y-3">
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-gray-600">Priority:</span>
                      <Badge variant="outline" class={getPriorityColor(item.priority)}>
                        {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                      </Badge>
                    </div>
                    
                    {#if item.completedDate}
                      <div class="flex items-center gap-2 text-sm text-gray-600">
                        <CalendarIcon class="h-4 w-4" />
                        <span>Completed: {item.completedDate}</span>
                      </div>
                    {/if}

                    {#if item.discussionUrl || item.issueUrl}
                      <div class="flex gap-2 pt-2">
                        {#if item.discussionUrl}
                          <Button variant="outline" size="sm" class="h-8 text-xs" asChild>
                            <a href={item.discussionUrl} target="_blank" rel="noopener noreferrer">
                              Discussion
                              <ExternalLinkIcon class="h-3 w-3 ml-1" />
                            </a>
                          </Button>
                        {/if}
                        {#if item.issueUrl}
                          <Button variant="outline" size="sm" class="h-8 text-xs" asChild>
                            <a href={item.issueUrl} target="_blank" rel="noopener noreferrer">
                              Issue
                              <ExternalLinkIcon class="h-3 w-3 ml-1" />
                            </a>
                          </Button>
                        {/if}
                      </div>
                    {/if}
                  </div>
                </CardContent>
              </Card>
            {/each}
          </div>
        </section>
      {/if}

      <!-- In Progress Items -->
      {#if groupedItems()['in-progress'].length > 0}
        <section>
          <div class="flex items-center gap-3 mb-6">
            <div class="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
            <h2 class="text-2xl font-bold text-gray-900">In Progress</h2>
            <Badge class="bg-blue-100 text-blue-800">{groupedItems()['in-progress'].length}</Badge>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each groupedItems()['in-progress'] as item}
              <Card class="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <CardTitle class="text-lg">{item.title}</CardTitle>
                      <CardDescription class="mt-1">{item.description}</CardDescription>
                    </div>
                    <Badge class={getStatusColor(item.status)}>
                      🔄 {formatStatus(item.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div class="space-y-3">
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-gray-600">Priority:</span>
                      <Badge variant="outline" class={getPriorityColor(item.priority)}>
                        {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                      </Badge>
                    </div>
                    
                    {#if item.estimatedCompletion}
                      <div class="flex items-center gap-2 text-sm text-gray-600">
                        <CalendarIcon class="h-4 w-4" />
                        <span>Est. completion: {item.estimatedCompletion}</span>
                      </div>
                    {/if}

                    {#if item.discussionUrl || item.issueUrl}
                      <div class="flex gap-2 pt-2">
                        {#if item.discussionUrl}
                          <Button variant="outline" size="sm" class="h-8 text-xs" asChild>
                            <a href={item.discussionUrl} target="_blank" rel="noopener noreferrer">
                              Discussion
                              <ExternalLinkIcon class="h-3 w-3 ml-1" />
                            </a>
                          </Button>
                        {/if}
                        {#if item.issueUrl}
                          <Button variant="outline" size="sm" class="h-8 text-xs" asChild>
                            <a href={item.issueUrl} target="_blank" rel="noopener noreferrer">
                              Issue
                              <ExternalLinkIcon class="h-3 w-3 ml-1" />
                            </a>
                          </Button>
                        {/if}
                      </div>
                    {/if}
                  </div>
                </CardContent>
              </Card>
            {/each}
          </div>
        </section>
      {/if}

      <!-- Planned Items -->
      {#if groupedItems().planned.length > 0}
        <section>
          <div class="flex items-center gap-3 mb-6">
            <div class="w-3 h-3 bg-gray-400 rounded-full"></div>
            <h2 class="text-2xl font-bold text-gray-900">Planned Features</h2>
            <Badge class="bg-gray-100 text-gray-800">{groupedItems().planned.length}</Badge>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each groupedItems().planned as item}
              <Card class="border-l-4 border-l-gray-400">
                <CardHeader>
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <CardTitle class="text-lg">{item.title}</CardTitle>
                      <CardDescription class="mt-1">{item.description}</CardDescription>
                    </div>
                    <Badge class={getStatusColor(item.status)}>
                      📋 {formatStatus(item.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div class="space-y-3">
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-gray-600">Priority:</span>
                      <Badge variant="outline" class={getPriorityColor(item.priority)}>
                        {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                      </Badge>
                    </div>
                    
                    {#if item.estimatedCompletion}
                      <div class="flex items-center gap-2 text-sm text-gray-600">
                        <CalendarIcon class="h-4 w-4" />
                        <span>Est. completion: {item.estimatedCompletion}</span>
                      </div>
                    {/if}

                    {#if item.discussionUrl || item.issueUrl}
                      <div class="flex gap-2 pt-2">
                        {#if item.discussionUrl}
                          <Button variant="outline" size="sm" class="h-8 text-xs" asChild>
                            <a href={item.discussionUrl} target="_blank" rel="noopener noreferrer">
                              Discussion
                              <ExternalLinkIcon class="h-3 w-3 ml-1" />
                            </a>
                          </Button>
                        {/if}
                        {#if item.issueUrl}
                          <Button variant="outline" size="sm" class="h-8 text-xs" asChild>
                            <a href={item.issueUrl} target="_blank" rel="noopener noreferrer">
                              Issue
                              <ExternalLinkIcon class="h-3 w-3 ml-1" />
                            </a>
                          </Button>
                        {/if}
                      </div>
                    {/if}
                  </div>
                </CardContent>
              </Card>
            {/each}
          </div>
        </section>
      {/if}
    </div>

    <!-- Community Section -->
    <div class="mt-12">
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-3">
            <span class="text-2xl">🤝</span>
            Community & Contributions
          </CardTitle>
          <CardDescription>
            Help shape the future of this template
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="font-semibold mb-3">How to Contribute</h3>
              <ul class="space-y-2 text-sm text-gray-600">
                <li class="flex items-start gap-2">
                  <span class="text-blue-600 mt-1">•</span>
                  <span>Submit feature requests and bug reports via GitHub issues</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-600 mt-1">•</span>
                  <span>Join discussions about planned features and improvements</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-600 mt-1">•</span>
                  <span>Contribute code via pull requests</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-600 mt-1">•</span>
                  <span>Share your use cases and feedback</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="font-semibold mb-3">Priority Areas</h3>
              <ul class="space-y-2 text-sm text-gray-600">
                <li class="flex items-start gap-2">
                  <span class="text-red-600 mt-1">🔥</span>
                  <span>Docker configuration and deployment automation</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-orange-600 mt-1">⚡</span>
                  <span>Performance optimizations and best practices</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-600 mt-1">📚</span>
                  <span>Documentation improvements and examples</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-purple-600 mt-1">🧪</span>
                  <span>Testing utilities and example test suites</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</div>