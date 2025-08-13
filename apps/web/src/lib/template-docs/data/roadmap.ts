/**
 * Roadmap configuration for template documentation
 * 
 * This file contains the planned features and development timeline for the template.
 * 
 * When removing template documentation for production, delete this entire file.
 */

import type { RoadmapItem } from '../types.js';

export const roadmapItems: RoadmapItem[] = [
  // Completed items
  {
    title: 'Core Template Structure',
    description: 'Basic monorepo setup with SvelteKit, ElysiaJS, and TypeScript configuration',
    status: 'completed',
    priority: 'high',
    completedDate: '2024-12-01',
    discussionUrl: 'https://github.com/user/repo/discussions/completed-1'
  },
  {
    title: 'Authentication System',
    description: 'Better Auth integration with sign-in, sign-up, and session management',
    status: 'completed',
    priority: 'high',
    completedDate: '2024-12-05',
    issueUrl: 'https://github.com/user/repo/issues/completed-2'
  },
  {
    title: 'UI Component Library',
    description: 'shadcn-svelte integration with additional components from shadcn-svelte-extras',
    status: 'completed',
    priority: 'high',
    completedDate: '2024-12-10',
    discussionUrl: 'https://github.com/user/repo/discussions/completed-3'
  },
  {
    title: 'Rich Text Editor',
    description: 'Edra integration for WYSIWYG editing capabilities',
    status: 'completed',
    priority: 'medium',
    completedDate: '2024-12-12',
    issueUrl: 'https://github.com/user/repo/issues/completed-4'
  },
  {
    title: 'Template Documentation System',
    description: 'Comprehensive documentation with guide, roadmap, and feature showcase',
    status: 'completed',
    priority: 'medium',
    completedDate: '2024-12-15',
    discussionUrl: 'https://github.com/user/repo/discussions/completed-5'
  },
  
  // In Progress items
  {
    title: 'Complete Docker Integration',
    description: 'Full Docker setup with development and production configurations, including multi-stage builds and optimized images',
    status: 'in-progress',
    priority: 'high',
    estimatedCompletion: 'Q1 2025',
    discussionUrl: 'https://github.com/user/repo/discussions/1'
  },
  {
    title: 'Database Schema Management',
    description: 'Complete Ultracite integration with migrations, seeding, and schema validation',
    status: 'in-progress',
    priority: 'high',
    estimatedCompletion: 'Q1 2025',
    issueUrl: 'https://github.com/user/repo/issues/2'
  },
  {
    title: 'TanStack Query Integration',
    description: 'Complete setup of TanStack Query for advanced server state management and caching',
    status: 'in-progress',
    priority: 'medium',
    estimatedCompletion: 'Q1 2025',
    discussionUrl: 'https://github.com/user/repo/discussions/tanstack'
  },
  
  // Planned items
  {
    title: 'Automated Testing Suite',
    description: 'Comprehensive testing setup with unit, integration, and E2E tests using Vitest and Playwright',
    status: 'planned',
    priority: 'high',
    estimatedCompletion: 'Q1 2025',
    issueUrl: 'https://github.com/user/repo/issues/4'
  },
  {
    title: 'Deployment Automation',
    description: 'Coolify integration with automated deployment pipelines and environment management',
    status: 'planned',
    priority: 'high',
    estimatedCompletion: 'Q1 2025',
    discussionUrl: 'https://github.com/user/repo/discussions/deployment'
  },
  {
    title: 'Advanced Analytics Dashboard',
    description: 'Real-time analytics with customizable widgets and data visualization components',
    status: 'planned',
    priority: 'high',
    estimatedCompletion: 'Q2 2025',
    discussionUrl: 'https://github.com/user/repo/discussions/3'
  },
  {
    title: 'CI/CD Pipeline',
    description: 'GitHub Actions workflows for automated testing, building, and deployment',
    status: 'planned',
    priority: 'medium',
    estimatedCompletion: 'Q2 2025',
    discussionUrl: 'https://github.com/user/repo/discussions/5'
  },
  {
    title: 'Email System Integration',
    description: 'Email templates, sending capabilities, and notification system',
    status: 'planned',
    priority: 'medium',
    estimatedCompletion: 'Q2 2025',
    issueUrl: 'https://github.com/user/repo/issues/6'
  },
  {
    title: 'File Upload & Storage',
    description: 'File upload components with cloud storage integration and image optimization',
    status: 'planned',
    priority: 'medium',
    estimatedCompletion: 'Q2 2025',
    discussionUrl: 'https://github.com/user/repo/discussions/7'
  },
  {
    title: 'Internationalization (i18n)',
    description: 'Multi-language support with translation management and locale switching',
    status: 'planned',
    priority: 'low',
    estimatedCompletion: 'Q3 2025',
    issueUrl: 'https://github.com/user/repo/issues/8'
  },
  {
    title: 'Advanced Search & Filtering',
    description: 'Full-text search capabilities with advanced filtering and sorting options',
    status: 'planned',
    priority: 'medium',
    estimatedCompletion: 'Q3 2025',
    discussionUrl: 'https://github.com/user/repo/discussions/9'
  },
  {
    title: 'Performance Monitoring',
    description: 'Application performance monitoring with metrics dashboard and alerting',
    status: 'planned',
    priority: 'low',
    estimatedCompletion: 'Q3 2025',
    issueUrl: 'https://github.com/user/repo/issues/10'
  },
  {
    title: 'Template Customization CLI',
    description: 'Command-line tool for customizing template features and removing unused components',
    status: 'planned',
    priority: 'medium',
    estimatedCompletion: 'Q3 2025',
    discussionUrl: 'https://github.com/user/repo/discussions/cli-tool'
  },
  {
    title: 'Community Templates',
    description: 'Collection of specialized templates for different use cases (e-commerce, blog, dashboard)',
    status: 'planned',
    priority: 'low',
    estimatedCompletion: 'Q4 2025',
    discussionUrl: 'https://github.com/user/repo/discussions/community'
  },
  {
    title: 'Mobile App Template',
    description: 'Tauri mobile app template with shared API integration and native capabilities',
    status: 'planned',
    priority: 'low',
    estimatedCompletion: 'Q4 2025',
    discussionUrl: 'https://github.com/user/repo/discussions/11'
  }
];

/**
 * Helper function to get roadmap items by status
 */
export function getRoadmapItemsByStatus(status: RoadmapItem['status']): RoadmapItem[] {
  return roadmapItems.filter(item => item.status === status);
}

/**
 * Helper function to get roadmap items by priority
 */
export function getRoadmapItemsByPriority(priority: RoadmapItem['priority']): RoadmapItem[] {
  return roadmapItems.filter(item => item.priority === priority);
}

/**
 * Helper function to get roadmap items grouped by status
 */
export function getRoadmapItemsGroupedByStatus(): Record<RoadmapItem['status'], RoadmapItem[]> {
  return roadmapItems.reduce((acc, item) => {
    if (!acc[item.status]) {
      acc[item.status] = [];
    }
    acc[item.status].push(item);
    return acc;
  }, {} as Record<RoadmapItem['status'], RoadmapItem[]>);
}

/**
 * Helper function to get completion percentage
 */
export function getRoadmapCompletionPercentage(): number {
  const completed = roadmapItems.filter(item => item.status === 'completed').length;
  return Math.round((completed / roadmapItems.length) * 100);
}