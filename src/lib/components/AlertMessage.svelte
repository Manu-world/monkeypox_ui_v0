<script>
  import { fly } from 'svelte/transition';
  import { AlertCircle, CheckCircle2 } from 'lucide-svelte';

  export let type = 'error'; // 'error' | 'success'
  export let message = '';
  
  // Tailwind color classes and configurations
  $: bgColor = type === 'error' 
    ? 'bg-red-50 border-red-300 text-red-800' 
    : 'bg-green-50 border-green-300 text-green-800';
  
  $: iconComponent = type === 'error' 
    ? AlertCircle 
    : CheckCircle2;
  
  $: iconColor = type === 'error' 
    ? 'text-red-500' 
    : 'text-green-500';
</script>

{#if message}
  <div 
    transition:fly={{ y: 20, duration: 300 }}
    class={`
      flex items-center space-x-3 
      p-4 rounded-lg 
      border 
      ${bgColor} 
      shadow-md 
      mb-4 
      animate-pulse-subtle
    `}
    role="alert"
  >
    <div class={`w-6 h-6 ${iconColor}`}>
      <svelte:component this={iconComponent} class="w-full h-full" />
    </div>
    
    <div class="flex-1">
      <p class="text-sm font-medium">
        {message}
      </p>
    </div>
    
    <button 
      class="text-gray-500 hover:text-gray-700 transition-colors"
      aria-label="Close alert"
      on:click={() => message = ''}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-5 w-5" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M6 18L18 6M6 6l12 12" 
        />
      </svg>
    </button>
  </div>
{/if}

<style>
  @keyframes pulse-subtle {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }
  
  .animate-pulse-subtle {
    animation: pulse-subtle 2s ease-in-out infinite;
  }
</style>