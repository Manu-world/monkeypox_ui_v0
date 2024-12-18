<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    export let history: any[] = [];
    export let isOpen = false;
  
    const dispatch = createEventDispatcher();
  </script>
  
  <div 
    class={`
      fixed inset-y-0 right-0 w-80 bg-white shadow-xl transform transition-transform duration-300 
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      md:static md:translate-x-0 md:w-1/2 md:block
      overflow-y-auto z-50
    `}
  >
    <div class="sticky top-0 bg-white z-10 p-4 flex justify-between items-center border-b">
      <h2 class="text-lg font-semibold text-gray-700">History</h2>
      <button 
        aria-label="Close sidebar"
        on:click={() => dispatch('close')} 
        class="md:hidden text-gray-500 hover:text-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  
    <div class="p-4">
      {#if history.length === 0}
        <p class="text-center text-gray-500">No history</p>
      {:else}
        {#each history as file (file.date)}
          <div class="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-between">
            <div>
              <div class="flex items-center space-x-2">
                <span class="text-blue-500 font-semibold text-lg">
                  {file.prediction.confidence.toFixed(2)}%
                </span>
                <span 
                  class={`
                    font-semibold 
                    ${file.prediction.label === 'Negative' ? 'text-green-500' : 'text-red-500'}
                  `}
                >
                  {file.prediction.label}
                </span>
              </div>
              <p class="text-gray-500 text-sm">
                {new Date(file.date).toLocaleString()}
              </p>
            </div>
            <img 
              src={`data:${file.image.contentType};base64,${file.image.buffer}`}
              alt="Prediction" 
              class="h-16 w-16 object-cover rounded-lg"
            />
          </div>
        {/each}
      {/if}
    </div>
  </div>