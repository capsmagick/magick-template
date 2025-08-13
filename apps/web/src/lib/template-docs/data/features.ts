/**
 * Features configuration for template documentation
 * 
 * This file contains the current features implemented in the template,
 * their status, and any setup requirements.
 * 
 * When removing template documentation for production, delete this entire file.
 */

import type { Feature } from '../types.js';

export const features: Feature[] = [
  {
    title: 'Authentication System',
    description: 'Complete auth flow with Better Auth integration',
    icon: 'shield-check',
    status: 'complete',
    demoUrl: '/auth/signin',
    setupRequired: false
  },
  {
    title: 'Rich Text Editor',
    description: 'Edra-powered WYSIWYG editor with advanced features',
    icon: 'edit',
    status: 'complete',
    setupRequired: false
  },
  {
    title: 'Type-Safe API',
    description: 'End-to-end type safety with oRPC',
    icon: 'code',
    status: 'complete',
    setupRequired: false
  },
  {
    title: 'Modern UI Components',
    description: 'shadcn-svelte with additional extras components',
    icon: 'palette',
    status: 'complete',
    setupRequired: false
  },
  {
    title: 'Monorepo Setup',
    description: 'Turborepo configuration for scalable development',
    icon: 'folder-tree',
    status: 'complete',
    setupRequired: false
  },
  {
    title: 'Database Integration',
    description: 'Ultracite for modern database operations',
    icon: 'database',
    status: 'partial',
    setupRequired: true,
    setupGuideUrl: '/guide#database-setup'
  },
  {
    title: 'Docker Configuration',
    description: 'Containerized development and deployment',
    icon: 'container',
    status: 'planned',
    setupRequired: true,
    setupGuideUrl: '/guide#docker-setup'
  },
  {
    title: 'Data Fetching',
    description: 'TanStack Query for advanced state management',
    icon: 'refresh-cw',
    status: 'partial',
    setupRequired: false
  },
  {
    title: 'Development Tools',
    description: 'Cursor rules and configurations included',
    icon: 'wrench',
    status: 'complete',
    setupRequired: false
  },
  {
    title: 'Deployment Ready',
    description: 'Coolify configuration for easy self-hosting',
    icon: 'rocket',
    status: 'planned',
    setupRequired: true,
    setupGuideUrl: '/guide#deployment'
  }
];

/**
 * Helper function to get features by status
 */
export function getFeaturesByStatus(status: Feature['status']): Feature[] {
  return features.filter(feature => feature.status === status);
}

/**
 * Helper function to get completed features count
 */
export function getCompletedFeaturesCount(): number {
  return features.filter(feature => feature.status === 'complete').length;
}

/**
 * Helper function to get features that require setup
 */
export function getFeaturesRequiringSetup(): Feature[] {
  return features.filter(feature => feature.setupRequired);
}