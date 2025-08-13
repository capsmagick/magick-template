<!--
  GuideSection Component - Template Documentation
  
  This component provides expandable/collapsible sections for the template guide
  with syntax highlighting and copy-to-clipboard functionality.
  
  When removing template documentation for production, delete this file.
-->

<script lang="ts">
	import { cn } from '$lib/utils/utils';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import { Root as Code } from '$lib/components/ui/code';
	import { CopyButton } from '$lib/components/ui/copy-button';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import CheckCircleIcon from '@lucide/svelte/icons/check-circle';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	
	import type { GuideSection as GuideSectionType } from '../types';

	interface Props {
		section: GuideSectionType;
		defaultOpen?: boolean;
		level?: 1 | 2 | 3 | 4 | 5 | 6;
		class?: string;
	}

	let {
		section,
		defaultOpen = false,
		level = 2,
		class: className
	}: Props = $props();

	let open = $state(defaultOpen);

	// Generate proper heading tag based on level
	const headingTag = `h${level}` as const;
	
	// Generate heading classes based on level
	const headingClasses = {
		1: 'text-3xl font-bold',
		2: 'text-2xl font-semibold',
		3: 'text-xl font-semibold',
		4: 'text-lg font-medium',
		5: 'text-base font-medium',
		6: 'text-sm font-medium'
	};
</script>

<section class={cn('border rounded-lg bg-card', className)} aria-labelledby="section-{section.title.toLowerCase().replace(/\s+/g, '-')}">
	<Collapsible.Root bind:open>
		<Collapsible.Trigger 
			class="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-t-lg"
			aria-expanded={open}
			aria-controls="section-content-{section.title.toLowerCase().replace(/\s+/g, '-')}"
		>
			<svelte:element 
				this={headingTag}
				id="section-{section.title.toLowerCase().replace(/\s+/g, '-')}"
				class={cn(headingClasses[level], 'text-foreground')}
			>
				{section.title}
			</svelte:element>
			
			<ChevronDownIcon 
				class={cn(
					'h-5 w-5 text-muted-foreground transition-transform duration-200',
					open && 'rotate-180'
				)}
				aria-hidden="true"
			/>
		</Collapsible.Trigger>

		<Collapsible.Content 
			id="section-content-{section.title.toLowerCase().replace(/\s+/g, '-')}"
			class="border-t"
		>
			<div class="p-4 space-y-4">
				<!-- Prerequisites Section -->
				{#if section.prerequisites && section.prerequisites.length > 0}
					<div class="space-y-2">
						<div class="text-sm font-medium text-muted-foreground uppercase tracking-wide">
							Prerequisites
						</div>
						<ul class="space-y-1" role="list">
							{#each section.prerequisites as prerequisite}
								<li class="flex items-center gap-2 text-sm">
									<CheckCircleIcon class="h-4 w-4 text-green-600 flex-shrink-0" aria-hidden="true" />
									<span>{prerequisite}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				<!-- Main Content -->
				<div class="prose prose-sm max-w-none dark:prose-invert">
					{@html section.content}
				</div>

				<!-- Code Snippets Section -->
				{#if section.codeSnippets && section.codeSnippets.length > 0}
					<div class="space-y-4">
						<div class="text-sm font-medium text-muted-foreground uppercase tracking-wide">
							Code Examples
						</div>
						
						{#each section.codeSnippets as snippet, index}
							<div class="space-y-2">
								{#if snippet.description}
									<p class="text-sm text-muted-foreground">{snippet.description}</p>
								{/if}
								
								<div class="relative group">
									<Code 
										code={snippet.code} 
										lang={snippet.language}
										class="relative"
									>
										<CopyButton
											text={snippet.code}
											class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
											size="sm"
											variant="ghost"
										/>
									</Code>
								</div>
							</div>
						{/each}
					</div>
				{/if}

				<!-- Next Steps Section -->
				{#if section.nextSteps && section.nextSteps.length > 0}
					<div class="space-y-2">
						<div class="text-sm font-medium text-muted-foreground uppercase tracking-wide">
							Next Steps
						</div>
						<ul class="space-y-2" role="list">
							{#each section.nextSteps as step}
								<li class="flex items-start gap-2 text-sm">
									<ArrowRightIcon class="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
									<span>{step}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>
		</Collapsible.Content>
	</Collapsible.Root>
</section>