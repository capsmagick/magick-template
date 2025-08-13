/**
 * Unit tests for FeatureCard component
 * 
 * When removing template documentation for production, delete this entire file.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import FeatureCard from './FeatureCard.svelte';
import type { Feature } from '../types.js';

// Mock window.open
const mockOpen = vi.fn();
Object.defineProperty(window, 'open', {
  value: mockOpen,
  writable: true
});

const mockCompleteFeature: Feature = {
  title: 'Authentication System',
  description: 'Complete auth flow with Better Auth integration',
  icon: 'shield-check',
  status: 'complete',
  demoUrl: '/auth/signin',
  setupRequired: false
};

const mockPartialFeature: Feature = {
  title: 'Database Integration',
  description: 'Ultracite for modern database operations',
  icon: 'database',
  status: 'partial',
  setupRequired: true,
  setupGuideUrl: '/guide#database-setup'
};

const mockPlannedFeature: Feature = {
  title: 'Docker Configuration',
  description: 'Containerized development and deployment',
  icon: 'container',
  status: 'planned',
  setupRequired: true,
  setupGuideUrl: '/guide#docker-setup'
};

describe('FeatureCard', () => {
  it('renders feature information correctly', () => {
    render(FeatureCard, { 
      props: { 
        feature: mockCompleteFeature 
      } 
    });

    expect(screen.getByText('Authentication System')).toBeInTheDocument();
    expect(screen.getByText('Complete auth flow with Better Auth integration')).toBeInTheDocument();
    expect(screen.getByText('Complete')).toBeInTheDocument();
  });

  it('displays correct status badge for complete feature', () => {
    render(FeatureCard, { 
      props: { 
        feature: mockCompleteFeature 
      } 
    });

    const badge = screen.getByText('Complete');
    expect(badge).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('displays correct status badge for partial feature', () => {
    render(FeatureCard, { 
      props: { 
        feature: mockPartialFeature 
      } 
    });

    const badge = screen.getByText('Partial');
    expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800');
  });

  it('displays correct status badge for planned feature', () => {
    render(FeatureCard, { 
      props: { 
        feature: mockPlannedFeature 
      } 
    });

    const badge = screen.getByText('Planned');
    expect(badge).toHaveClass('bg-gray-100', 'text-gray-800');
  });

  it('shows setup required badge when setupRequired is true', () => {
    render(FeatureCard, { 
      props: { 
        feature: mockPartialFeature 
      } 
    });

    expect(screen.getByText('Setup Required')).toBeInTheDocument();
  });

  it('does not show setup required badge when setupRequired is false', () => {
    render(FeatureCard, { 
      props: { 
        feature: mockCompleteFeature 
      } 
    });

    expect(screen.queryByText('Setup Required')).not.toBeInTheDocument();
  });

  it('shows demo button when demoUrl is provided', () => {
    render(FeatureCard, { 
      props: { 
        feature: mockCompleteFeature 
      } 
    });

    expect(screen.getByRole('button', { name: /demo/i })).toBeInTheDocument();
  });

  it('shows setup button when setupGuideUrl is provided', () => {
    render(FeatureCard, { 
      props: { 
        feature: mockPartialFeature 
      } 
    });

    expect(screen.getByRole('button', { name: /setup/i })).toBeInTheDocument();
  });

  it('opens demo URL when demo button is clicked', async () => {
    const user = userEvent.setup();
    render(FeatureCard, { 
      props: { 
        feature: mockCompleteFeature 
      } 
    });

    const demoButton = screen.getByRole('button', { name: /demo/i });
    await user.click(demoButton);

    expect(mockOpen).toHaveBeenCalledWith(
      '/auth/signin',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('opens setup guide URL when setup button is clicked', async () => {
    const user = userEvent.setup();
    render(FeatureCard, { 
      props: { 
        feature: mockPartialFeature 
      } 
    });

    const setupButton = screen.getByRole('button', { name: /setup/i });
    await user.click(setupButton);

    expect(mockOpen).toHaveBeenCalledWith(
      '/guide#database-setup',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('shows "Coming Soon" for planned features with no actions', () => {
    const plannedFeatureNoActions: Feature = {
      ...mockPlannedFeature,
      setupGuideUrl: undefined
    };

    render(FeatureCard, { 
      props: { 
        feature: plannedFeatureNoActions 
      } 
    });

    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
  });

  it('applies compact styling when compact prop is true', () => {
    render(FeatureCard, { 
      props: { 
        feature: mockCompleteFeature,
        compact: true 
      } 
    });

    // In compact mode, the title should have smaller text
    const title = screen.getByText('Authentication System');
    expect(title).toHaveClass('text-base');
  });

  it('applies normal styling when compact prop is false', () => {
    render(FeatureCard, { 
      props: { 
        feature: mockCompleteFeature,
        compact: false 
      } 
    });

    // In normal mode, the title should have larger text
    const title = screen.getByText('Authentication System');
    expect(title).toHaveClass('text-lg');
  });
});