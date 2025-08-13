<!--
  TechStack Component - Template Documentation
  
  This component displays technologies grouped by category with responsive layout.
  When removing template documentation for production, delete this entire file.
-->

<script lang="ts">
  import type { Technology } from '../types.js';
  import { TechnologyCard } from './index.js';
  import { getTechnologiesByCategory } from '../data/technologies.js';

  interface Props {
    technologies?: Technology[];
    showReasoning?: boolean;
    title?: string;
    description?: string;
  }

  let { 
    technologies, 
    showReasoning = false,
    title = "Technology Stack",
    description = "The modern technologies powering this template"
  }: Props = $props();

  // Group technologies by category
  const technologiesByCategory = technologies 
    ? technologies.reduce((acc, tech) => {
        if (!acc[tech.category]) {
          acc[tech.category] = [];
        }
        acc[tech.category].push(tech);
        return acc;
      }, {} as Record<string, Technology[]>)
    : getTechnologiesByCategory();

  // Category display configuration
  const categoryConfig = {
    frontend: {
      title: 'Frontend Stack',
      description: 'User interface and client-side technologies',
      icon: '🎨'
    },
    backend: {
      title: 'Backend Stack', 
      description: 'Server-side and API technologies',
      icon: '⚙️'
    },
    database: {
      title: 'Database',
      description: 'Data storage and management',
      icon: '🗄️'
    },
    tools: {
      title: 'Development Tools',
      description: 'Build tools, deployment, and development utilities',
      icon: '🛠️'
    }
  };

  // Order categories for consistent display
  const categoryOrder: (keyof typeof categoryConfig)[] = ['frontend', 'backend', 'database', 'tools'];
  
  // Filter and order categories that have technologies
  const orderedCategories = categoryOrder.filter(category => 
    technologiesByCategory[category] && technologiesByCategory[category].length > 0
  );
</script>

<section class="w-full">
  <!-- Section Header -->
  <div class="text-center mb-12">
    <h2 class="text-3xl font-bold text-gray-900 mb-4">
      {title}
    </h2>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
      {description}
    </p>
  </div>

  <!-- Technology Categories -->
  <div class="space-y-16">
    {#each orderedCategories as category}
      {@const config = categoryConfig[category]}
      {@const categoryTechs = technologiesByCategory[category]}
      
      <div class="category-section">
        <!-- Category Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center gap-3 mb-3">
            <span class="text-2xl" role="img" aria-label={config.title}>
              {config.icon}
            </span>
            <h3 class="text-2xl font-semibold text-gray-900">
              {config.title}
            </h3>
          </div>
          <p class="text-gray-600 max-w-lg mx-auto">
            {config.description}
          </p>
        </div>

        <!-- Technology Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {#each categoryTechs as technology}
            <TechnologyCard 
              {technology} 
              {showReasoning}
            />
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <!-- Summary Stats -->
  {#if !technologies}
    <div class="mt-16 text-center">
      <div class="inline-flex items-center gap-8 p-6 bg-gray-50 rounded-lg">
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-600">
            {Object.values(technologiesByCategory).flat().length}
          </div>
          <div class="text-sm text-gray-600">Technologies</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-green-600">
            {orderedCategories.length}
          </div>
          <div class="text-sm text-gray-600">Categories</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-purple-600">
            {Object.values(technologiesByCategory).flat().filter(t => t.reasoning).length}
          </div>
          <div class="text-sm text-gray-600">With Reasoning</div>
        </div>
      </div>
    </div>
  {/if}
</section>

<style>
  .category-section {
    scroll-margin-top: 2rem;
  }

  /* Responsive grid adjustments */
  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) and (max-width: 1280px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1280px) {
    .grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>