<script lang="ts">
	import { createForm } from '@tanstack/svelte-form';
	import z from 'zod';
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';

	let { switchToSignIn } = $props<{ switchToSignIn: () => void }>();

	let errorMessage = $state<string | null>(null);

	const validationSchema = z.object({
		name: z.string().min(2, 'Name must be at least 2 characters'),
		email: z.email('Invalid email address'),
		password: z.string().min(8, 'Password must be at least 8 characters'),
	});

	const form = createForm(() => ({
		defaultValues: { name: '', email: '', password: '' },
		onSubmit: async ({ value }) => {
			errorMessage = null;
			try {
				await authClient.signUp.email(
					{
						email: value.email,
						password: value.password,
						name: value.name,
					},
					{
						onSuccess: () => {
							goto('/dashboard');
						},
						onError: (error) => {
							console.log('Sign up error:', error);
							
							// Handle specific error cases
							if (error.error?.code === 'USER_ALREADY_EXISTS') {
								errorMessage = 'An account with this email already exists. Please sign in instead.';
							} else {
								errorMessage = error.error?.message || 'Sign up failed. Please try again.';
							}
						},
					}
				);
			} catch (err) {
				console.error('Unexpected error during sign up:', err);
				errorMessage = 'An unexpected error occurred. Please try again.';
			}
		},
		validators: {
			onSubmit: validationSchema,
		},
	}));
</script>

<div class="mx-auto mt-10 w-full max-w-md p-6">
	<h1 class="mb-6 text-center font-bold text-3xl">Create Account</h1>

	{#if errorMessage}
		<div class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
			<p class="text-sm text-red-600">{errorMessage}</p>
			{#if errorMessage.includes('already exists')}
				<button 
					type="button" 
					class="mt-2 text-sm text-red-700 underline hover:no-underline"
					onclick={switchToSignIn}
				>
					Switch to Sign In
				</button>
			{/if}
		</div>
	{/if}

	<form
		id="form"
		class="space-y-4"
		onsubmit={(e) => {
			e.preventDefault();
			e.stopPropagation();
			form.handleSubmit();
		}}
	>
		<form.Field name="name">
			{#snippet children(field)}
				<div class="space-y-1">
					<label for={field.name}>Name</label>
					<input
						id={field.name}
						name={field.name}
						class="w-full border"
						onblur={field.handleBlur}
						value={field.state.value}
      oninput={(e: Event) => {
            const target = e.target as HTMLInputElement
            field.handleChange(target.value)
          }}
					/>
					{#if field.state.meta.isTouched}
						{#each field.state.meta.errors as error}
							<p class="text-sm text-red-500" role="alert">{error}</p>
						{/each}
					{/if}
				</div>
			{/snippet}
		</form.Field>

		<form.Field name="email">
			{#snippet children(field)}
				<div class="space-y-1">
					<label for={field.name}>Email</label>
					<input
						id={field.name}
						name={field.name}
						type="email"
						class="w-full border"
						onblur={field.handleBlur}
      value={field.state.value}
      oninput={(e: Event) => {
            const target = e.target as HTMLInputElement
            field.handleChange(target.value)
          }}
					/>
					{#if field.state.meta.isTouched}
						{#each field.state.meta.errors as error}
							<p class="text-sm text-red-500" role="alert">{error}</p>
						{/each}
					{/if}
				</div>
			{/snippet}
		</form.Field>

		<form.Field name="password">
			{#snippet children(field)}
				<div class="space-y-1">
					<label for={field.name}>Password</label>
					<input
						id={field.name}
						name={field.name}
						type="password"
						class="w-full border"
						onblur={field.handleBlur}
						value={field.state.value}
      oninput={(e: Event) => {
            const target = e.target as HTMLInputElement
            field.handleChange(target.value)
          }}
					/>
					{#if field.state.meta.errors}
						{#each field.state.meta.errors as error}
							<p class="text-sm text-red-500" role="alert">{error}</p>
						{/each}
					{/if}
				</div>
			{/snippet}
		</form.Field>

		<form.Subscribe selector={(state) => ({ canSubmit: state.canSubmit, isSubmitting: state.isSubmitting })}>
			{#snippet children(state)}
				<Button type="submit" class="w-full" disabled={!state.canSubmit || state.isSubmitting}>
					{state.isSubmitting ? 'Creating…' : 'Sign Up'}
				</Button>
			{/snippet}
		</form.Subscribe>
	</form>

	<div class="mt-4 text-center">
		<Button type="button" variant="link" onclick={switchToSignIn}>
			Already have an account? Sign In
		</Button>
	</div>
</div>
