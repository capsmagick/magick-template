/**
 * TypeScript interfaces for template documentation data structures
 * 
 * These types define the shape of data used throughout the template documentation system.
 * When removing template documentation for production, this entire file can be deleted.
 */

export interface Technology {
  name: string;
  description: string;
  logo: string;
  officialUrl: string;
  docsUrl: string;
  category: 'frontend' | 'backend' | 'tools' | 'database';
  reasoning?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
  status: 'complete' | 'partial' | 'planned';
  demoUrl?: string;
  setupRequired?: boolean;
  setupGuideUrl?: string;
}

export interface RoadmapItem {
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  priority: 'high' | 'medium' | 'low';
  estimatedCompletion?: string;
  completedDate?: string;
  discussionUrl?: string;
  issueUrl?: string;
}

export interface CodeSnippet {
  language: 'bash' | 'diff' | 'javascript' | 'json' | 'svelte' | 'typescript';
  code: string;
  description?: string;
}

export interface GuideSection {
  title: string;
  content: string;
  codeSnippets?: CodeSnippet[];
  prerequisites?: string[];
  nextSteps?: string[];
}