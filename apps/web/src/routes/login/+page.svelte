<script lang="ts">
	import SignInForm from '../../components/SignInForm.svelte';
	import SignUpForm from '../../components/SignUpForm.svelte';
    import { Button } from '$lib/components/ui/button/index.js';
    import { PUBLIC_SERVER_URL } from '$env/static/public';

	let showSignIn = $state(true);

    let adminCreating = $state(false);
    let adminMessage: string | null = $state(null);

    async function createSuperAdmin() {
        adminMessage = null;
        adminCreating = true;
        try {
            const res = await fetch(`${PUBLIC_SERVER_URL}/api/dev/ensure-superadmin`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!res.ok) {
                const text = await res.text().catch(() => '');
                adminMessage = `Failed (${res.status}): ${text || 'Unable to create admin'}`;
                return;
            }
            adminMessage = 'Super admin ensured. You can now sign in.';
        } catch (err) {
            adminMessage = err instanceof Error ? err.message : 'Request failed';
        } finally {
            adminCreating = false;
        }
    }
</script>

<div class="mx-auto mt-6 w-full max-w-md px-6">
    <div class="mb-4 flex items-center justify-between gap-2">
        <h2 class="text-sm text-muted-foreground">Admin setup</h2>
        <Button type="button" size="sm" variant="outline" onclick={createSuperAdmin} disabled={adminCreating} aria-busy={adminCreating} aria-live="polite">
            {adminCreating ? 'Creating…' : 'Create Super Admin'}
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
