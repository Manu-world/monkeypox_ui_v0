<script >
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Navbar from '$lib/components/Navbar.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { predictImage, getUserHistory, downloadUserHistoryPDF } from '$lib/api/image';
  import { getToken, authStore } from '$lib/stores/auth';

  let file = null;
  let error = null;
  let result = null;
  let loading = false;
  let history = [];
  let isSidebarOpen = false;

  onMount(async () => {
    const token = getToken();
    if (!token) {
      goto('/login');
      return;
    }

    try {
      if (token) {
        history = await getUserHistory();
      }
    } catch (err) {
      console.error('Failed to fetch history', err);
    }
  });

  async function handleSubmit() {
    if (!file) return;

    loading = true;
    error = null;

    try {
      const token = getToken();
      result = await predictImage(file, token);
      history = await getUserHistory();
    } catch (err) {
      console.error(err);
      error = 'Failed to predict the image. Please try again.';
    } finally {
      loading = false;
    }
  }

  function handleFileChange(e) {
    const input = e.target;
    const selectedFile = input.files?.[0] || null;
    file = selectedFile;
  }

  async function handleDownloadPDF() {
    try {
      const token = getToken();
      await downloadUserHistoryPDF(token);
    } catch (err) {
      console.error('Failed to download PDF', err);
    }
  }

  async function handleLogout() {
    try {
      await authStore.logout();
      goto('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }
</script>

<div class="flex flex-col h-screen bg-gray-50">
  <Navbar on:menu={toggleSidebar} on:logout={handleLogout} />
  
  <div class="flex justify-center items-center flex-grow p-4">
    <div class="w-full max-w-4xl bg-white rounded-xl shadow-lg flex flex-col md:flex-row">
      <div class="w-full md:w-1/2 p-6 flex flex-col justify-center">
        <div class="space-y-4">
          <div class="border-4 border-dashed border-blue-500 p-6 rounded-lg text-center">
            <h3 class="text-lg font-semibold mb-4 text-gray-500">
              Prediction Result
            </h3>
            
            {#if result}
              <div>
                {#if loading}
                  <p class="text-gray-500">Predicting...</p>
                {:else}
                  <p class="text-gray-500">
                    Label: 
                    <span class={result.label === 'Negative' ? 'text-green-500' : 'text-red-500'}>
                      {result.label}
                    </span>
                  </p>
                  <p class="text-gray-500">
                    Confidence: {result.confidence.toFixed(2)}%
                  </p>
                {/if}
              </div>
            {:else}
              <div class="my-3">
                <p class="text-gray-500">Select a file and hit Check</p>
              </div>
            {/if}
          </div>

          {#if error}
            <p class="text-red-500 text-center">{error}</p>
          {/if}

          <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <input
              type="file"
              accept="image/*"
              on:change={handleFileChange}
              class="w-full text-gray-500 px-4 py-2 rounded-lg border-2 border-blue-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
            />
            
            <div class="flex justify-center">
              <button
                type="submit"
                disabled={!file || loading}
                class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Predicting...' : 'Check'}
              </button>
            </div>
          </form>

          <hr class="border-gray-300" />

          <div class="flex gap-2 items-center justify-center">
            <p class="text-gray-500">Download history as a PDF</p>
            <button 
              on:click={handleDownloadPDF}
              aria-label="Download PDF"
              class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {#if isSidebarOpen}
        <button
          class="fixed inset-0 bg-black/50 z-40 md:hidden"
          on:click={toggleSidebar}
          aria-label="Close sidebar overlay"
        ></button>
      {/if}

      <Sidebar 
        {history} 
        isOpen={isSidebarOpen} 
        on:close={toggleSidebar}
      />
    </div>
  </div>
</div>