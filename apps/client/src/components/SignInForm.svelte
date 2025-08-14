<script lang="ts">
	import { createForm } from '@tanstack/svelte-form';
	import z from 'zod';
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';
    import { Button } from '$lib/components/ui/button/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import * as Password from '$lib/components/ui/password/index.js';
    const ADMIN_EMAIL = 'admin@magick.template';
    const ADMIN_PASSWORD = 'Pass@Magick';

	let { switchToSignUp } = $props<{ switchToSignUp: () => void }>();

	// Use the session store to monitor authentication state
	const sessionQuery = authClient.useSession();

	// Watch for session changes and redirect when available
	$effect(() => {
		if ($sessionQuery.data?.user) {
			goto('/dashboard');
		}
	});

	const validationSchema = z.object({
		email: z.email('Invalid email address'),
		password: z.string().min(1, 'Password is required'),
	});

	const form = createForm(() => ({
		defaultValues: { email: '', password: '' },
		onSubmit: async ({ value }) => {
			try {
				const result = await authClient.signIn.email(
					{ email: value.email, password: value.password }
				);
				
				// Check if sign-in was successful
				if (result && !result.error) {
					// The session store will automatically update and trigger the redirect
					// No need to manually redirect here
					console.log('Sign in successful, waiting for session update...');
				} else {
					console.error('Sign in failed:', result?.error?.message || 'Unknown error');
				}
			} catch (error) {
				console.error('Sign in error:', error);
			}
		},
		validators: {
			onSubmit: validationSchema,
		},
	}));
</script>

<div class="mx-auto mt-10 w-full max-w-md p-6">
	<h1 class="mb-6 text-center font-bold text-3xl">Welcome Back</h1>

	<form
		class="space-y-4"
		onsubmit={(e) => {
			e.preventDefault();
			e.stopPropagation();
			form.handleSubmit();
		}}
	>
		<form.Field name="email">
			{#snippet children(field)}
				<div class="space-y-1">
					<label for={field.name}>Email</label>
					<Input
						id={field.name}
						name={field.name}
						type="email"
						class="w-full"
						onblur={field.handleBlur}
						value={field.state.value}
						oninput={(e: Event) => {
							const target = e.target as HTMLInputElement;
							field.handleChange(target.value);
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
					<Password.Root>
						<Password.Input
							id={field.name}
							name={field.name}
							placeholder="Enter your password"
							onblur={field.handleBlur}
							bind:value={field.state.value}
						/>
					</Password.Root>
					{#if field.state.meta.isTouched}
						{#each field.state.meta.errors as error}
							<p class="text-sm text-red-500" role="alert">{error}</p>
						{/each}
					{/if}
				</div>
			{/snippet}
		</form.Field>

		<form.Subscribe selector={(state) => ({ canSubmit: state.canSubmit, isSubmitting: state.isSubmitting })}>
			{#snippet children(state)}
				<div class="flex items-center gap-2">
					<Button type="submit" class="w-full" disabled={!state.canSubmit || state.isSubmitting}>
						{state.isSubmitting ? 'Signing in…' : 'Sign In'}
					</Button>
					<Button type="button" variant="outline" size="sm" onclick={() => {
						form.setFieldValue('email', ADMIN_EMAIL);
						form.setFieldValue('password', ADMIN_PASSWORD);
					}}>
						Fill admin creds
					</Button>
				</div>
			{/snippet}
		</form.Subscribe>
	</form>

	<div class="mt-4 text-center">
		<Button type="button" variant="link" onclick={switchToSignUp}>
			Need an account? Sign Up
		</Button>
	</div>
</div>
