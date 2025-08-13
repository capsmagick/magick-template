<!--
  TemplateShowcase Component - Template Documentation
  
  This component displays template documentation sections on the main page.
  It can be easily removed by deleting this component and its usage.
  
  TEMPLATE DOCS: This entire component should be removed for production use.
-->

<script lang="ts">
  import { TechStack, FeatureCard } from './index.js';
  import { features } from '../data/features.js';
  import { templateDocsConfig } from '../config.js';

  interface Props {
    showTechnologies?: boolean;
    showFeatures?: boolean;
  }

  let { showTechnologies, showFeatures }: Props = $props();

  // Get configuration for template docs
  const config = templateDocsConfig;
  
  // Use props if provided, otherwise fall back to config
  const shouldShowTechnologies = showTechnologies ?? config.features.showTechnologies;
  const shouldShowFeatures = showFeatures ?? config.features.showFeatures;
  const shouldShowTemplateContent = config.enabled;
</script>

<!-- TEMPLATE DOCS: Remove this entire section for production -->
{#if shouldShowTemplateContent}
  <div class="template-showcase-wrapper">
    <!-- Template Documentation Notice -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
      <div class="flex items-start gap-3">
        <div class="text-blue-600 text-lg">📚</div>
        <div>
          <h3 class="text-blue-900 font-semibold text-sm mb-1">Template Documentation</h3>
          <p class="text-blue-700 text-sm">
            The sections below showcase this template's capabilities. 
            <a href="/guide" class="underline hover:no-underline">View setup guide</a> or 
            <a href="/roadmap" class="underline hover:no-underline">see roadmap</a>.
            Remove this component for production use.
          </p>
        </div>
      </div>
    </div>

    <!-- Technologies Section -->
    {#if shouldShowTechnologies}
      <section class="mb-16">
        <!-- TEMPLATE DOCS: Remove this section for production -->
        <TechStack 
          title="Template Technology Stack"
          description="Modern technologies included in this template for rapid development"
          showReasoning={true}
        />
      </section>
    {/if}

    <!-- Features Section -->
    {#if shouldShowFeatures}
      <section class="mb-16">
        <!-- TEMPLATE DOCS: Remove this section for production -->
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Template Features
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Pre-built functionality and integrations included in this template
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each features as feature}
            <FeatureCard {feature} />
          {/each}
        </div>

        <!-- Feature Summary -->
        <div class="mt-8 text-center">
          <div class="inline-flex items-center gap-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <div>
              <span class="font-semibold text-green-600">
                {features.filter(f => f.status === 'complete').length}
              </span> Complete
            </div>
            <div>
              <span class="font-semibold text-yellow-600">
                {features.filter(f => f.status === 'partial').length}
              </span> Partial
            </div>
            <div>
              <span class="font-semibold text-gray-600">
                {features.filter(f => f.status === 'planned').length}
              </span> Planned
            </div>
          </div>
        </div>
      </section>
    {/if}
  </div>
{/if}

<style>
  /* TEMPLATE DOCS: Remove these styles for production */
  .template-showcase-wrapper {
    /* Add some visual separation from main content */
    border-top: 1px solid #e5e7eb;
    padding-top: 4rem;
    margin-top: 4rem;
  }

  /* Ensure proper spacing and responsive behavior */
  @media (max-width: 768px) {
    .template-showcase-wrapper {
      padding-top: 2rem;
      margin-top: 2rem;
    }
  }
</style>