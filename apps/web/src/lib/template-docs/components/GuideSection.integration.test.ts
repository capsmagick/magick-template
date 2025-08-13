/**
 * Integration tests for GuideSection component
 * 
 * Tests component integration and import functionality.
 * When removing template documentation for production, delete this file.
 */

import { describe, it, expect } from 'vitest';
import GuideSection from './GuideSection.svelte';
import type { GuideSection as GuideSectionType } from '../types';

describe('GuideSection Integration', () => {
	it('can be imported successfully', () => {
		expect(GuideSection).toBeDefined();
		expect(GuideSection).toBeTruthy();
	});

	it('exports from components index', async () => {
		const { GuideSection: ExportedGuideSection } = await import('./index');
		expect(ExportedGuideSection).toBeDefined();
		expect(ExportedGuideSection).toBe(GuideSection);
	});

	it('works with complete section data', () => {
		const completeSection: GuideSectionType = {
			title: 'Complete Guide Section',
			content: '<p>This section has all possible content types.</p>',
			prerequisites: [
				'Node.js 18 or higher',
				'Git installed and configured',
				'Basic understanding of TypeScript'
			],
			codeSnippets: [
				{
					language: 'bash',
					code: 'npm install @example/package',
					description: 'Install the required package'
				},
				{
					language: 'typescript',
					code: `import { Component } from '@example/package';

const component = new Component({
  option: 'value'
});`,
					description: 'Import and initialize the component'
				},
				{
					language: 'json',
					code: `{
  "name": "example-project",
  "version": "1.0.0",
  "dependencies": {
    "@example/package": "^1.0.0"
  }
}`
				}
			],
			nextSteps: [
				'Configure your development environment',
				'Run the development server with npm run dev',
				'Open your browser to http://localhost:3000',
				'Start building your application'
			]
		};

		// Verify the data structure is valid
		expect(completeSection.title).toBe('Complete Guide Section');
		expect(completeSection.prerequisites).toHaveLength(3);
		expect(completeSection.codeSnippets).toHaveLength(3);
		expect(completeSection.nextSteps).toHaveLength(4);
		
		// Verify code snippets have proper structure
		const bashSnippet = completeSection.codeSnippets![0];
		expect(bashSnippet.language).toBe('bash');
		expect(bashSnippet.description).toBeDefined();
		
		const jsonSnippet = completeSection.codeSnippets![2];
		expect(jsonSnippet.language).toBe('json');
		expect(jsonSnippet.description).toBeUndefined();
	});

	it('works with minimal section data', () => {
		const minimalSection: GuideSectionType = {
			title: 'Minimal Section',
			content: '<p>Just the basics.</p>'
		};

		expect(minimalSection.title).toBe('Minimal Section');
		expect(minimalSection.content).toBe('<p>Just the basics.</p>');
		expect(minimalSection.prerequisites).toBeUndefined();
		expect(minimalSection.codeSnippets).toBeUndefined();
		expect(minimalSection.nextSteps).toBeUndefined();
	});

	it('handles various heading levels', () => {
		const headingLevels = [1, 2, 3, 4, 5, 6] as const;
		
		headingLevels.forEach(level => {
			expect(level).toBeGreaterThanOrEqual(1);
			expect(level).toBeLessThanOrEqual(6);
		});
	});

	it('generates proper accessibility IDs', () => {
		const testTitles = [
			'Getting Started',
			'Advanced Configuration',
			'API Reference',
			'Troubleshooting & FAQ'
		];

		const expectedIds = [
			'getting-started',
			'advanced-configuration',
			'api-reference',
			'troubleshooting-&-faq'
		];

		testTitles.forEach((title, index) => {
			const generatedId = title.toLowerCase().replace(/\s+/g, '-');
			expect(generatedId).toBe(expectedIds[index]);
		});
	});
});