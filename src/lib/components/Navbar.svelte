<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { goto } from '$app/navigation';
  
    const dispatch = createEventDispatcher();
    let isAvatarOpen = false;
  
    function handleAvatarClick() {
      isAvatarOpen = !isAvatarOpen;
    }
  
    function handleLogout() {
      dispatch('logout');
    }
  </script>
  
  <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <button 
          aria-label="Toggle menu"
          on:click={() => dispatch('menu')} 
          class="md:hidden text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
  
        <div class="flex items-center">
          <h1 class="text-xl font-bold text-gray-500">Prediction</h1>
        </div>
  
        <div class="relative">
          <button 
            aria-label="User menu"
            on:click={handleAvatarClick} 
            class="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </button>
  
          {#if isAvatarOpen}
            <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
              <button 
                on:click={() => goto('/')} 
                class="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Home
              </button>
              <button 
                on:click={handleLogout} 
                class="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
              >
                Logout
              </button>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </nav>