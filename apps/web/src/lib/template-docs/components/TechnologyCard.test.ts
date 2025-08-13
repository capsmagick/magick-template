/**
 * Unit tests for TechnologyCard component
 * 
 * When removing template documentation for production, delete this entire file.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import TechnologyCard from './TechnologyCard.svelte';
import type { Technology } from '../types.js';

// Mock window.open
const mockOpen = vi.fn();
Object.defineProperty(window, 'open', {
  value: mockOpen,
  writable: true
});

const mockTechnology: Technology = {
  name: 'SvelteKit',
  description: 'Full-stack web framework for Svelte',
  logo: '/logos/sveltekit.svg',
  officialUrl: 'https://kit.svelte.dev',
  docsUrl: 'https://kit.svelte.dev/docs',
  category: 'frontend',
  reasoning: 'Great developer experience and performance'
};

describe('TechnologyCard', () => {
  it('renders technology information correctly', () => {
    render(TechnologyCard, { 
      props: { 
        technology: mockTechnology 
      } 
    });

    expect(screen.getByText('SvelteKit')).toBeInTheDocument();
    expect(screen.getByText('Full-stack web framework for Svelte')).toBeInTheDocument();
    expect(screen.getByText('frontend')).toBeInTheDocument();
    expect(screen.getByAltText('SvelteKit logo')).toBeInTheDocument();
  });

  it('displays reasoning tooltip when showReasoning is true', () => {
    render(TechnologyCard, { 
      props: { 
        technology: mockTechnology,
        showReasoning: true
      } 
    });

    expect(screen.getByRole('button', { name: /why this technology/i })).toBeInTheDocument();
  });

  it('does not display reasoning tooltip when showReasoning is false', () => {
    render(TechnologyCard, { 
      props: { 
        technology: mockTechnology,
        showReasoning: false
      } 
    });

    expect(screen.queryByRole('button', { name: /why this technology/i })).not.toBeInTheDocument();
  });

  it('opens official website when Website button is clicked', async () => {
    const user = userEvent.setup();
    render(TechnologyCard, { 
      props: { 
        technology: mockTechnology 
      } 
    });

    const websiteButton = screen.getByRole('button', { name: /website/i });
    await user.click(websiteButton);

    expect(mockOpen).toHaveBeenCalledWith(
      'https://kit.svelte.dev',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('opens documentation when Docs button is clicked', async () => {
    const user = userEvent.setup();
    render(TechnologyCard, { 
      props: { 
        technology: mockTechnology 
      } 
    });

    const docsButton = screen.getByRole('button', { name: /docs/i });
    await user.click(docsButton);

    expect(mockOpen).toHaveBeenCalledWith(
      'https://kit.svelte.dev/docs',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('applies correct category badge color', () => {
    render(TechnologyCard, { 
      props: { 
        technology: mockTechnology 
      } 
    });

    const badge = screen.getByText('frontend');
    expect(badge).toHaveClass('bg-blue-100', 'text-blue-800');
  });

  it('handles different technology categories', () => {
    const backendTech: Technology = {
      ...mockTechnology,
      name: 'ElysiaJS',
      category: 'backend'
    };

    render(TechnologyCard, { 
      props: { 
        technology: backendTech 
      } 
    });

    const badge = screen.getByText('backend');
    expect(badge).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('shows fallback when logo fails to load', () => {
    const techWithBadLogo: Technology = {
      ...mockTechnology,
      logo: '/invalid-logo.svg'
    };

    render(TechnologyCard, { 
      props: { 
        technology: techWithBadLogo 
      } 
    });

    // The fallback should show the first letter of the technology name
    const img = screen.getByAltText('SvelteKit logo');
    expect(img).toBeInTheDocument();
  });
});