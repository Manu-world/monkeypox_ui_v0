<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { goto } from '$app/navigation';

  const dispatch = createEventDispatcher();
  let isAvatarOpen = false;
  let dropdownRef;
  let avatarRef;
  let isClosing = false;

  // Click outside directive
  function clickOutside(node) {
    const handleClick = (event) => {
      if (
        isAvatarOpen && 
        !node.contains(event.target) && 
        !avatarRef.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleClick, true);

    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }

  function handleAvatarClick() {
    if (isAvatarOpen) {
      closeDropdown();
    } else {
      isAvatarOpen = true;
      isClosing = false;
    }
  }

  function closeDropdown() {
    isClosing = true;
    setTimeout(() => {
      isAvatarOpen = false;
      isClosing = false;
    }, 100);
  }

  function handleLogout() {
    closeDropdown();
    dispatch('logout');
  }
</script>

<nav class="bg-white shadow-md">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <button 
        aria-label="Toggle menu"
        on:click={() => dispatch('menu')} 
        class="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div class="flex items-center space-x-3">
        <!-- Animated Medical Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14" viewBox="0 0 100 100">
          <!-- Hospital Building -->
          <rect x="35" y="30" width="30" height="40" fill="#4A90E2" class="hospital">
            <animate 
              attributeName="height"
              values="40;38;40"
              dur="2s"
              repeatCount="indefinite"
            />
          </rect>
          
          <!-- Cross Symbol -->
          <g class="cross">
            <rect x="45" y="40" width="10" height="20" fill="#FFFFFF">
              <animate
                attributeName="opacity"
                values="1;0.7;1"
                dur="2s"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="40" y="45" width="20" height="10" fill="#FFFFFF">
              <animate
                attributeName="opacity"
                values="1;0.7;1"
                dur="2s"
                repeatCount="indefinite"
              />
            </rect>
          </g>

          <!-- Pulse Line -->
          <path 
            d="M20,70 L35,70 L40,50 L45,85 L50,70 L80,70" 
            stroke="#E74C3C" 
            fill="none" 
            stroke-width="2"
            stroke-dasharray="100"
            stroke-dashoffset="100"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="100"
              to="-100"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
        <!-- <h1 class="text-xl font-bold text-gray-500">Monkeypox Prediction</h1> -->
      </div>

      <div class="relative">
        <button 
          bind:this={avatarRef}
          aria-label="User menu"
          aria-expanded={isAvatarOpen}
          on:click={handleAvatarClick} 
          class="relative text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1 transition-all duration-200 ease-in-out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </button>

        {#if isAvatarOpen}
          <div
            bind:this={dropdownRef}
            use:clickOutside
            class="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg z-50"
            class:animate-in={!isClosing}
            class:animate-out={isClosing}
            style="z-index: 1000;"
          >
            <div class="py-2 divide-y divide-gray-100">
              <!-- <div class="px-4 py-3">
                <p class="text-sm font-medium text-gray-900">Signed in as</p>
                <p class="text-sm text-gray-500 truncate">user@example.com</p>
              </div> -->
              
              <div class="py-1">
                <button 
                  on:click={() => goto('/')} 
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center space-x-2 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Home</span>
                </button>
                
                <button 
                  on:click={handleLogout} 
                  class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center space-x-2 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</nav>

<style>
  @keyframes dropdownIn {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(-10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .animate-out {
    animation: dropdownOut 0.1s ease-in forwards;
  }

  @keyframes dropdownOut {
    from {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
    to {
      opacity: 0;
      transform: scale(0.95) translateY(-10px);
    }
  }
</style>