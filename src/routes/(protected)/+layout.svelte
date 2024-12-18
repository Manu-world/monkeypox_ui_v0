<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { authStore } from '$lib/stores/auth';
    import { page } from '$app/stores';

    onMount(() => {
        authStore.init();

        const unsubscribe = authStore.subscribe(({ user, token }) => {
            const publicRoutes = ['/', '/login', '/register'];
            
            if (!token && !publicRoutes.includes($page.url.pathname)) {
                goto('/login');
            }
        });

        return () => unsubscribe();
    });
</script>

<slot /> 