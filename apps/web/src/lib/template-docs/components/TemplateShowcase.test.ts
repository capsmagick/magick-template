/**
 * Unit tests for TemplateShowcase component
 * 
 * When removing template documentation for production, delete this entire file.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import TemplateShowcase from './TemplateShowcase.svelte';

// Mock the config module
vi.mock('../config.js', () => ({
  getTemplateDocsConfig: () => ({
    enabled: true,
    showTechnologies: true,
    showFeatures: true,
    showRoadmap: true,
    showGuide: true
  })
}));

// Mock the data modules
vi.mock('../data/features.js', () => ({
  features: [
    {
      title: 'Test Feature',
      description: 'A test feature',
      icon: 'test',
      status: 'complete',
      setupRequired: false
    }
  ]
}));

// Mock the TechStack component
vi.mock('./TechStack.svelte', () => ({
  default: vi.fn(() => ({
    render: () => '<div data-testid="tech-stack">TechStack Component</div>'
  }))
}));

// Mock the FeatureCard component
vi.mock('./FeatureCard.svelte', () => ({
  default: vi.fn(() => ({
    render: () => '<div data-testid="feature-card">FeatureCard Component</div>'
  }))
}));

describe('TemplateShowcase', () => {
  it('renders template documentation notice', () => {
    render(TemplateShowcase);

    expect(screen.getByText('Template Documentation')).toBeInTheDocument();
    expect(screen.getByText(/The sections below showcase this template's capabilities/)).toBeInTheDocument();
  });

  it('renders guide and roadmap links', () => {
    render(TemplateShowcase);

    expect(screen.getByRole('link', { name: /view setup guide/i })).toHaveAttribute('href', '/guide');
    expect(screen.getByRole('link', { name: /see roadmap/i })).toHaveAttribute('href', '/roadmap');
  });

  it('shows technologies section by default', () => {
    render(TemplateShowcase);

    expect(screen.getByText('Template Technology Stack')).toBeInTheDocument();
  });

  it('shows features section by default', () => {
    render(TemplateShowcase);

    expect(screen.getByText('Template Features')).toBeInTheDocument();
    expect(screen.getByText('Pre-built functionality and integrations included in this template')).toBeInTheDocument();
  });

  it('shows feature summary statistics', () => {
    render(TemplateShowcase);

    expect(screen.getByText('Complete')).toBeInTheDocument();
    expect(screen.getByText('Partial')).toBeInTheDocument();
    expect(screen.getByText('Planned')).toBeInTheDocument();
  });

  it('can hide technologies section when prop is false', () => {
    render(TemplateShowcase, {
      props: {
        showTechnologies: false
      }
    });

    expect(screen.queryByText('Template Technology Stack')).not.toBeInTheDocument();
  });

  it('can hide features section when prop is false', () => {
    render(TemplateShowcase, {
      props: {
        showFeatures: false
      }
    });

    expect(screen.queryByText('Template Features')).not.toBeInTheDocument();
  });
});

// Test with disabled config
describe('TemplateShowcase - Disabled Config', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.doMock('../config.js', () => ({
      getTemplateDocsConfig: () => ({
        enabled: false,
        showTechnologies: false,
        showFeatures: false,
        showRoadmap: false,
        showGuide: false
      })
    }));
  });

  it('does not render when config is disabled', async () => {
    const { default: TemplateShowcase } = await import('./TemplateShowcase.svelte');
    render(TemplateShowcase);

    expect(screen.queryByText('Template Documentation')).not.toBeInTheDocument();
  });
});