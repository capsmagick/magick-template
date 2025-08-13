/**
 * Technology stack configuration for template documentation
 * 
 * This file contains the complete list of technologies included in this template
 * with their descriptions, links, and reasoning for inclusion.
 * 
 * When removing template documentation for production, delete this entire file.
 */

import type { Technology } from '../types.js';

export const technologies: Technology[] = [
  {
    name: 'SvelteKit 2',
    description: 'Latest version of the full-stack web framework',
    logo: '/template-docs/logos/sveltekit.svg',
    officialUrl: 'https://kit.svelte.dev',
    docsUrl: 'https://kit.svelte.dev/docs',
    category: 'frontend',
    reasoning: 'Latest version with improved performance and developer experience'
  },
  {
    name: 'Svelte 5',
    description: 'Modern reactive framework with runes',
    logo: '/template-docs/logos/svelte.svg',
    officialUrl: 'https://svelte.dev',
    docsUrl: 'https://svelte.dev/docs',
    category: 'frontend',
    reasoning: 'New runes system provides better reactivity and performance'
  },
  {
    name: 'TypeScript',
    description: 'Typed superset of JavaScript',
    logo: '/template-docs/logos/typescript.svg',
    officialUrl: 'https://www.typescriptlang.org',
    docsUrl: 'https://www.typescriptlang.org/docs',
    category: 'frontend',
    reasoning: 'Essential for large applications and better developer experience'
  },
  {
    name: 'Tailwind CSS 4',
    description: 'Latest version of utility-first CSS framework',
    logo: '/template-docs/logos/tailwind.svg',
    officialUrl: 'https://tailwindcss.com',
    docsUrl: 'https://tailwindcss.com/docs',
    category: 'frontend',
    reasoning: 'Rapid UI development with utility classes and improved performance'
  },
  {
    name: 'Bun',
    description: 'Fast JavaScript runtime and package manager',
    logo: '/template-docs/logos/bun.svg',
    officialUrl: 'https://bun.sh',
    docsUrl: 'https://bun.sh/docs',
    category: 'tools',
    reasoning: 'Significantly faster than npm/yarn for package management and development'
  },
  {
    name: 'ElysiaJS',
    description: 'Fast and friendly Bun web framework',
    logo: '/template-docs/logos/elysia.svg',
    officialUrl: 'https://elysiajs.com',
    docsUrl: 'https://elysiajs.com/introduction.html',
    category: 'backend',
    reasoning: 'Optimized for Bun runtime with excellent TypeScript support'
  },
  {
    name: 'oRPC',
    description: 'Type-safe RPC framework',
    logo: '/template-docs/logos/orpc.svg',
    officialUrl: 'https://orpc.unnoq.com',
    docsUrl: 'https://orpc.unnoq.com/docs',
    category: 'backend',
    reasoning: 'End-to-end type safety between frontend and backend'
  },
  {
    name: 'shadcn-svelte',
    description: 'Beautiful UI components for Svelte',
    logo: '/template-docs/logos/shadcn.svg',
    officialUrl: 'https://www.shadcn-svelte.com',
    docsUrl: 'https://www.shadcn-svelte.com/docs',
    category: 'frontend',
    reasoning: 'High-quality, accessible components with great design system'
  },
  {
    name: 'shadcn-svelte-extras',
    description: 'Additional components for shadcn-svelte',
    logo: '/template-docs/logos/shadcn.svg',
    officialUrl: 'https://shadcn-svelte-extras.com',
    docsUrl: 'https://shadcn-svelte-extras.com/docs',
    category: 'frontend',
    reasoning: 'Extended component library for more complex UI patterns'
  },
  {
    name: 'Edra',
    description: 'Rich text editor for Svelte',
    logo: '/template-docs/logos/edra.svg',
    officialUrl: 'https://github.com/edra-org/edra',
    docsUrl: 'https://github.com/edra-org/edra#readme',
    category: 'frontend',
    reasoning: 'Modern WYSIWYG editor with excellent Svelte integration'
  },
  {
    name: 'Coolify',
    description: 'Self-hosted deployment platform',
    logo: '/template-docs/logos/coolify.svg',
    officialUrl: 'https://coolify.io',
    docsUrl: 'https://coolify.io/docs',
    category: 'tools',
    reasoning: 'Easy self-hosted alternative to Vercel/Netlify'
  },
  {
    name: 'Turborepo',
    description: 'High-performance build system for monorepos',
    logo: '/template-docs/logos/turborepo.svg',
    officialUrl: 'https://turbo.build',
    docsUrl: 'https://turbo.build/repo/docs',
    category: 'tools',
    reasoning: 'Efficient monorepo management with intelligent caching'
  },
  {
    name: 'Docker',
    description: 'Containerization platform',
    logo: '/template-docs/logos/docker.svg',
    officialUrl: 'https://www.docker.com',
    docsUrl: 'https://docs.docker.com',
    category: 'tools',
    reasoning: 'Consistent development and deployment environments'
  },
  {
    name: 'TanStack Query',
    description: 'Powerful data synchronization for Svelte',
    logo: '/template-docs/logos/tanstack.svg',
    officialUrl: 'https://tanstack.com/query',
    docsUrl: 'https://tanstack.com/query/latest/docs/svelte/overview',
    category: 'frontend',
    reasoning: 'Advanced caching and synchronization for server state'
  },
  {
    name: 'Ultracite',
    description: 'Database toolkit',
    logo: '/template-docs/logos/ultracite.svg',
    officialUrl: 'https://github.com/ultracite/ultracite',
    docsUrl: 'https://github.com/ultracite/ultracite#readme',
    category: 'database',
    reasoning: 'Modern database abstraction with excellent TypeScript support'
  },
  {
    name: 'Better Auth',
    description: 'Modern authentication library',
    logo: '/template-docs/logos/better-auth.svg',
    officialUrl: 'https://www.better-auth.com',
    docsUrl: 'https://www.better-auth.com/docs',
    category: 'backend',
    reasoning: 'Comprehensive auth solution with modern security practices'
  }
];

/**
 * Helper function to group technologies by category
 */
export function getTechnologiesByCategory(): Record<string, Technology[]> {
  return technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, Technology[]>);
}

/**
 * Helper function to get technologies for a specific category
 */
export function getTechnologiesForCategory(category: Technology['category']): Technology[] {
  return technologies.filter(tech => tech.category === category);
}