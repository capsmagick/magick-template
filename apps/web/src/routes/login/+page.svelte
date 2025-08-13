<script lang="ts">
	import SignInForm from '../../components/SignInForm.svelte';
	import SignUpForm from '../../components/SignUpForm.svelte';
    import { Button } from '$lib/components/ui/button/index.js';
    import { orpc } from '$lib/orpc';
    import { createMutation } from '@tanstack/svelte-query';

	let showSignIn = $state(true);

    const createSuperAdminMutation = createMutation({
        mutationFn: () => orpc.dev.ensureSuperAdmin.call(),
        onSuccess: () => {
            adminMessage = 'Super admin ensured. You can now sign in.';
        },
        onError: (error: any) => {
            adminMessage = error instanceof Error ? error.message : 'Request failed';
        }
    });

    let adminMessage: string | null = $state(null);

    function createSuperAdmin() {
        adminMessage = null;
        $createSuperAdminMutation.mutate();
    }

    // Access mutation state properties from the store
    let isPending = $derived($createSuperAdminMutation.isPending);
</script>

<div class="mx-auto mt-6 w-full max-w-md px-6">
    <div class="mb-4 flex items-center justify-between gap-2">
        <h2 class="text-sm text-muted-foreground">Admin setup</h2>
        <Button type="button" size="sm" variant="outline" onclick={createSuperAdmin} disabled={isPending} aria-busy={isPending} aria-live="polite">
            {isPending ? 'Creating…' : 'Create Super Admin'}
        </Button>
    </div>
    {#if adminMessage}
        <p class="mb-2 text-sm" role="status">{adminMessage}</p>
    {/if}
</div>

{#if showSignIn}
	<SignInForm switchToSignUp={() => showSignIn = false} />
{:else}
	<SignUpForm switchToSignIn={() => showSignIn = true} />
{/if}
