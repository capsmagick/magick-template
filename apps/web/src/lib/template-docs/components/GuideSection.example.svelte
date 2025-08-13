<!--
  Example usage of GuideSection component
  
  This file demonstrates how to use the GuideSection component with various configurations.
  When removing template documentation for production, delete this file.
-->

<script lang="ts">
	import GuideSection from './GuideSection.svelte';
	import type { GuideSection as GuideSectionType } from '../types';

	// Example section with all features
	const completeSection: GuideSectionType = {
		title: 'Setting Up Your Development Environment',
		content: `
			<p>This guide will walk you through setting up a complete development environment for the template.</p>
			<p>Follow each step carefully to ensure everything works correctly.</p>
		`,
		prerequisites: [
			'Node.js 18 or higher installed',
			'Git installed and configured',
			'A code editor (VS Code recommended)',
			'Basic knowledge of TypeScript and Svelte'
		],
		codeSnippets: [
			{
				language: 'bash',
				code: 'git clone https://github.com/your-repo/template.git\ncd template',
				description: 'Clone the repository and navigate to the project directory'
			},
			{
				language: 'bash',
				code: 'bun install',
				description: 'Install all dependencies using Bun'
			},
			{
				language: 'bash',
				code: 'cp .env.example .env',
				description: 'Copy the environment variables template'
			},
			{
				language: 'typescript',
				code: `// src/app.d.ts
declare global {
  namespace App {
    interface Locals {
      user?: User;
    }
  }
}`,
				description: 'Example TypeScript configuration'
			}
		],
		nextSteps: [
			'Configure your environment variables in the .env file',
			'Start the development server with bun run dev',
			'Open your browser to http://localhost:5173',
			'Begin customizing the template for your needs'
		]
	};

	// Example minimal section
	const minimalSection: GuideSectionType = {
		title: 'Quick Start',
		content: '<p>Get up and running in just a few minutes with these simple steps.</p>'
	};

	// Example section with only code
	const codeOnlySection: GuideSectionType = {
		title: 'Configuration Examples',
		content: '<p>Here are some common configuration patterns:</p>',
		codeSnippets: [
			{
				language: 'json',
				code: `{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build"
  }
}`
			},
			{
				language: 'typescript',
				code: `export const config = {
  apiUrl: process.env.PUBLIC_API_URL,
  debug: process.env.NODE_ENV === 'development'
};`
			}
		]
	};
</script>

<div class="space-y-6 max-w-4xl mx-auto p-6">
	<h1 class="text-3xl font-bold mb-8">GuideSection Component Examples</h1>
	
	<!-- Complete section example -->
	<GuideSection 
		section={completeSection} 
		level={2}
		defaultOpen={true}
		class="mb-6"
	/>
	
	<!-- Minimal section example -->
	<GuideSection 
		section={minimalSection} 
		level={2}
		class="mb-6"
	/>
	
	<!-- Code-only section example -->
	<GuideSection 
		section={codeOnlySection} 
		level={2}
		class="mb-6"
	/>
	
	<!-- Different heading levels -->
	<div class="space-y-4">
		<h2 class="text-2xl font-semibold">Different Heading Levels</h2>
		
		<GuideSection 
			section={{ title: 'Level 3 Heading', content: '<p>This uses an h3 heading.</p>' }}
			level={3}
		/>
		
		<GuideSection 
			section={{ title: 'Level 4 Heading', content: '<p>This uses an h4 heading.</p>' }}
			level={4}
		/>
	</div>
</div>