<script>
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  
  export let icon;
  let Icon;

  onMount(async () => {
    if (browser) {
      Icon = icon;
    }
  });
</script>

{#if Icon}
  <svelte:component this={Icon} />
{/if} 