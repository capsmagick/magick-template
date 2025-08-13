---
inclusion: fileMatch
fileMatchPattern: "**/*.svelte"
---

# Svelte 5 + TanStack Query Patterns

## Component Structure
```svelte
<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import { api } from '$lib/api';

  let { userId } = $props<{ userId: string }>();
  
  let selectedId = $state<string | null>(null);
  
  const userQuery = createQuery({
    queryKey: ['user', userId],
    queryFn: () => api.users.get({ id: userId })
  });
  
  let isLoading = $derived($userQuery.isLoading);
  let user = $derived($userQuery.data);
</script>

{#if isLoading}
  <div>Loading...</div>
{:else if user}
  <h1>{user.name}</h1>
{/if}
```

## TanStack Query Patterns

### Query with oRPC
```svelte
<script lang="ts">
  import { createQuery, createMutation } from '@tanstack/svelte-query';
  import { api } from '$lib/api';

  const usersQuery = createQuery({
    queryKey: ['users'],
    queryFn: () => api.users.list()
  });

  const createUserMutation = createMutation({
    mutationFn: api.users.create,
    onSuccess: () => {
      $usersQuery.refetch();
    }
  });
</script>
```

### Form with Mutation
```svelte
<script lang="ts">
  import { enhance } from '$app/forms';
  import { createMutation } from '@tanstack/svelte-query';
  
  const mutation = createMutation({
    mutationFn: api.auth.login,
    onSuccess: (data) => {
      goto('/dashboard');
    }
  });

  function handleSubmit(event: SubmitEvent) {
    const formData = new FormData(event.target as HTMLFormElement);
    $mutation.mutate({
      email: formData.get('email') as string,
      password: formData.get('password') as string
    });
  }
</script>

<form onsubmit|preventDefault={handleSubmit}>
  <input name="email" type="email" required />
  <button type="submit" disabled={$mutation.isPending}>
    {$mutation.isPending ? 'Logging in...' : 'Login'}
  </button>
</form>
```

## Svelte 5 Runes
- Use `$state()` for reactive state
- Use `$derived()` for computed values  
- Use `$props()` for component props
- Use `$bindable()` for two-way binding
- Use `$effect()` for side effects