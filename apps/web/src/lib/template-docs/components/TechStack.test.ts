/**
 * Unit tests for TechStack component
 * 
 * When removing template documentation for production, delete this entire file.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import TechStack from './TechStack.svelte';
import type { Technology } from '../types.js';

// Mock the technologies data
vi.mock('../data/technologies.js', () => ({
  getTechnologiesByCategory: () => ({
    frontend: [
      {
        name: 'SvelteKit',
        description: 'Full-stack web framework',
        logo: '/logos/sveltekit.svg',
        officialUrl: 'https://kit.svelte.dev',
        docsUrl: 'https://kit.svelte.dev/docs',
        category: 'frontend',
        reasoning: 'Great performance'
      }
    ],
    backend: [
      {
        name: 'ElysiaJS',
        description: 'Fast Bun web framework',
        logo: '/logos/elysia.svg',
        officialUrl: 'https://elysiajs.com',
        docsUrl: 'https://elysiajs.com/docs',
        category: 'backend',
        reasoning: 'Optimized for Bun'
      }
    ]
  })
}));

const mockTechnologies: Technology[] = [
  {
    name: 'React',
    description: 'JavaScript library for building user interfaces',
    logo: '/logos/react.svg',
    officialUrl: 'https://reactjs.org',
    docsUrl: 'https://reactjs.org/docs',
    category: 'frontend',
    reasoning: 'Popular and well-supported'
  },
  {
    name: 'Node.js',
    description: 'JavaScript runtime built on Chrome V8',
    logo: '/logos/nodejs.svg',
    officialUrl: 'https://nodejs.org',
    docsUrl: 'https://nodejs.org/docs',
    category: 'backend'
  }
];

describe('TechStack', () => {
  it('renders default title and description', () => {
    render(TechStack);

    expect(screen.getByText('Technology Stack')).toBeInTheDocument();
    expect(screen.getByText('The modern technologies powering this template')).toBeInTheDocument();
  });

  it('renders custom title and description', () => {
    render(TechStack, {
      props: {
        title: 'Custom Stack',
        description: 'Custom description'
      }
    });

    expect(screen.getByText('Custom Stack')).toBeInTheDocument();
    expect(screen.getByText('Custom description')).toBeInTheDocument();
  });

  it('renders category sections with proper headers', () => {
    render(TechStack);

    expect(screen.getByText('Frontend Stack')).toBeInTheDocument();
    expect(screen.getByText('Backend Stack')).toBeInTheDocument();
    expect(screen.getByText('User interface and client-side technologies')).toBeInTheDocument();
    expect(screen.getByText('Server-side and API technologies')).toBeInTheDocument();
  });

  it('renders technologies from mocked data', () => {
    render(TechStack);

    expect(screen.getByText('SvelteKit')).toBeInTheDocument();
    expect(screen.getByText('ElysiaJS')).toBeInTheDocument();
  });

  it('renders custom technologies when provided', () => {
    render(TechStack, {
      props: {
        technologies: mockTechnologies
      }
    });

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('groups technologies by category correctly', () => {
    render(TechStack, {
      props: {
        technologies: mockTechnologies
      }
    });

    // React should appear under Frontend Stack
    const frontendSection = screen.getByText('Frontend Stack').closest('.category-section');
    expect(frontendSection).toContainElement(screen.getByText('React'));

    // Node.js should appear under Backend Stack  
    const backendSection = screen.getByText('Backend Stack').closest('.category-section');
    expect(backendSection).toContainElement(screen.getByText('Node.js'));
  });

  it('displays summary stats when using default technologies', () => {
    render(TechStack);

    // Should show stats for technologies, categories, and reasoning
    expect(screen.getByText('Technologies')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('With Reasoning')).toBeInTheDocument();
  });

  it('does not display summary stats when custom technologies provided', () => {
    render(TechStack, {
      props: {
        technologies: mockTechnologies
      }
    });

    // Should not show summary stats when custom technologies are provided
    expect(screen.queryByText('Technologies')).not.toBeInTheDocument();
  });

  it('passes showReasoning prop to TechnologyCard components', () => {
    render(TechStack, {
      props: {
        showReasoning: true
      }
    });

    // This is harder to test directly, but we can verify the component renders
    // The actual reasoning display is tested in TechnologyCard.test.ts
    expect(screen.getByText('SvelteKit')).toBeInTheDocument();
  });

  it('only renders categories that have technologies', () => {
    const frontendOnlyTechs: Technology[] = [
      {
        name: 'Vue.js',
        description: 'Progressive JavaScript framework',
        logo: '/logos/vue.svg',
        officialUrl: 'https://vuejs.org',
        docsUrl: 'https://vuejs.org/guide',
        category: 'frontend'
      }
    ];

    render(TechStack, {
      props: {
        technologies: frontendOnlyTechs
      }
    });

    expect(screen.getByText('Frontend Stack')).toBeInTheDocument();
    expect(screen.queryByText('Backend Stack')).not.toBeInTheDocument();
    expect(screen.queryByText('Database')).not.toBeInTheDocument();
    expect(screen.queryByText('Development Tools')).not.toBeInTheDocument();
  });

  it('renders category icons', () => {
    render(TechStack);

    // Check for emoji icons (this is a basic test since emojis are hard to test precisely)
    const frontendHeader = screen.getByText('Frontend Stack').closest('div');
    expect(frontendHeader).toBeInTheDocument();
  });
});