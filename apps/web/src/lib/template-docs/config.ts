/**
 * Template Documentation Configuration
 * 
 * This file centralizes all template documentation settings.
 * Remove this entire file when removing template documentation for production.
 * 
 * TEMPLATE DOCS: This entire file should be removed for production use.
 */

// Environment-based configuration
export const templateDocsConfig = {
  // Show template documentation (can be controlled via environment variable)
  enabled: process.env.SHOW_TEMPLATE_DOCS !== 'false',
  
  // Template information
  template: {
    name: 'Better-T-Stack',
    version: '1.0.0',
    description: 'Modern SvelteKit template with TypeScript, Tailwind, and more',
    repository: 'https://github.com/your-username/better-t-stack',
    documentation: 'https://github.com/your-username/better-t-stack#readme'
  },
  
  // Feature flags for different sections
  features: {
    showTechnologies: true,
    showFeatures: true,
    showRoadmap: true,
    showGuide: true,
    showRemovalInstructions: true
  },
  
  // UI configuration
  ui: {
    showTemplateNotices: true,
    showRemovalWarnings: true,
    enableSectionNavigation: true,
    enableCodeCopying: true
  },
  
  // SEO configuration for template docs
  seo: {
    noIndex: true, // Prevent indexing of template documentation
    noFollow: true,
    robotsContent: 'noindex, nofollow'
  },
  
  // Analytics (disable for template docs)
  analytics: {
    enabled: false,
    trackTemplateUsage: false
  }
} as const;

// Helper functions
export function isTemplateDocsEnabled(): boolean {
  return templateDocsConfig.enabled;
}

export function shouldShowSection(section: keyof typeof templateDocsConfig.features): boolean {
  return templateDocsConfig.enabled && templateDocsConfig.features[section];
}

export function getTemplateInfo() {
  return templateDocsConfig.template;
}

// Build-time optimization helper
export function getProductionConfig() {
  return {
    ...templateDocsConfig,
    enabled: false,
    features: Object.fromEntries(
      Object.keys(templateDocsConfig.features).map(key => [key, false])
    )
  };
}

// Development helpers
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

// Template removal helper
export function logRemovalInstructions() {
  if (isDevelopment && templateDocsConfig.enabled) {
    console.log(`
🚀 Template Documentation Active

To remove template documentation for production:
1. Set SHOW_TEMPLATE_DOCS=false in your environment
2. Run the removal script: see TEMPLATE_REMOVAL.md
3. Or manually remove template-docs directories

See /guide for complete setup instructions.
    `);
  }
}

// Call on module load in development
if (isDevelopment) {
  logRemovalInstructions();
}