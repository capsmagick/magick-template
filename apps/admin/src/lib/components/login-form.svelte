<script lang="ts">
	import { Label } from "$lib/components/ui/label/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLFormAttributes } from "svelte/elements";
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import { createForm } from '@tanstack/svelte-form';
	import z from 'zod';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithElementRef<HTMLFormAttributes> = $props();

	const id = $props.id();

	// Use the session store to monitor authentication state
	const sessionQuery = authClient.useSession();

	// Watch for session changes and redirect when available
	$effect(() => {
		if ($sessionQuery.data?.user) {
			goto('/dashboard');
		}
	});

	const validationSchema = z.object({
		email: z.string().email('Invalid email address'),
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

<form 
	class={cn("flex flex-col gap-6", className)} 
	bind:this={ref} 
	{...restProps}
	onsubmit={(e) => {
		e.preventDefault();
		e.stopPropagation();
		form.handleSubmit();
	}}
>
	<div class="flex flex-col items-center gap-2 text-center">
		<h1 class="text-2xl font-bold">Login to your account</h1>
		<p class="text-muted-foreground text-balance text-sm">
			Enter your email below to login to your account
		</p>
	</div>
	
	<div class="grid gap-6">
		<form.Field name="email">
			{#snippet children(field)}
				<div class="grid gap-3">
					<Label for="email-{id}">Email</Label>
					<Input 
						id="email-{id}" 
						type="email" 
						placeholder="m@example.com" 
						required
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
				<div class="grid gap-3">
					<div class="flex items-center">
						<Label for="password-{id}">Password</Label>
						<a href="##" class="ml-auto text-sm underline-offset-4 hover:underline">
							Forgot your password?
						</a>
					</div>
					<Input 
						id="password-{id}" 
						type="password" 
						required
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

		<form.Subscribe selector={(state) => ({ canSubmit: state.canSubmit, isSubmitting: state.isSubmitting })}>
			{#snippet children(state)}
				<Button type="submit" class="w-full" disabled={!state.canSubmit || state.isSubmitting}>
					{state.isSubmitting ? 'Signing in…' : 'Login'}
				</Button>
			{/snippet}
		</form.Subscribe>
	</div>
</form>
