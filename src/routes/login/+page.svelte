<script>
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import { browser } from '$app/environment';
  import AlertMessage from '$lib/components/AlertMessage.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import LoginIcon from '$lib/icons/LoginIcon.svelte';
  import RegisterIcon from '$lib/icons/RegisterIcon.svelte';

    
  let formData = {
    email: '',
    password: ''
  };
  let error = null;
  let success = null;
  let loading = false;
  let showPassword = false;
  let focusedField = null;

  import FaEye from 'svelte-icons/fa/FaEye.svelte';
  import FaEyeSlash from 'svelte-icons/fa/FaEyeSlash.svelte';

  const handleSubmit = async () => {
    error = null;
    success = null;
    loading = true;

    try {
      if (!formData.email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }
      
      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      await authStore.login(formData);
      success = 'Login successful! Redirecting...';
      
      setTimeout(() => {
        goto('/file_upload');
      }, 2000);
    } catch (err) {
      const errorMessage = {
        'Invalid credentials': 'Email or password is incorrect',
        'User not found': 'No account found with this email',
        'Network Error': 'Unable to connect to server. Please check your internet connection'
      }[err.message] || err.message;

      error = errorMessage;
    } finally {
      loading = false;
    }
  };
</script>

<!-- Background SVG Animation -->
<div class="fixed inset-0 z-0 overflow-hidden">
  <svg 
    class="absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 1440 810" 
    preserveAspectRatio="xMinYMin slice"
  >
    <defs>
      <linearGradient id="background-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#EBF5FB;" />
        <stop offset="100%" style="stop-color:#D6EAF8;" />
      </linearGradient>
      
      <filter id="medical-blur">
        <feGaussianBlur stdDeviation="10" />
      </filter>
    </defs>
    
    <!-- Background Gradient -->
    <rect width="100%" height="100%" fill="url(#background-gradient)" />
    
    <!-- Animated Medical Shapes -->
    <g class="animate-pulse-slow">
      <path 
        d="M200 100 Q300 200, 200 300 Q100 400, 200 500" 
        fill="none" 
        stroke="#2980B9" 
        stroke-width="5" 
        stroke-opacity="0.5" 
        filter="url(#medical-blur)"
      />
      <circle 
        cx="800" 
        cy="600" 
        r="80" 
        fill="#3498DB" 
        fill-opacity="0.4" 
        filter="url(#medical-blur)"
      />
      <path 
        d="M1200 200 L1300 100 L1400 200 L1300 300 Z" 
        fill="#2980B9" 
        fill-opacity="0.3" 
        filter="url(#medical-blur)"
      />
    </g>
  </svg>
</div>

<!-- Login Container -->
<div class="relative z-10 flex items-center justify-center min-h-screen">
  <div class="w-full max-w-md p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-100/50 transform transition-all">
    <div class="text-center mb-8">
      <!-- <LoginIcon className="mx-auto w-16 h-16 text-blue-500 mb-4" /> -->
       <RegisterIcon className="mx-auto w-14 h-14 text-blue-500 mb-4" />
      <h2 class="text-3xl font-extrabold text-blue-800 mb-2">Medical Portal</h2>
      <p class="text-gray-500 text-sm">Secure Access to skin Disease Detection System</p>
    </div>
    
    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
      {#if error}
        <AlertMessage type="error" message={error} />
      {/if}
      {#if success}
        <AlertMessage type="success" message={success} />
      {/if}
      
      <div class="relative group">
        <input
          type="email"
          id="email"
          bind:value={formData.email}
          on:focus={() => focusedField = 'email'}
          on:blur={() => focusedField = null}
          class="block w-full px-4 py-3 text-gray-700 bg-blue-50/50 
                 border border-blue-200 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-blue-400 
                 transition-all duration-300 
                 peer placeholder-transparent"
          placeholder="Email"
          autocomplete="email"
          required
        />
        <label 
          for="email"
          class="absolute left-4 -top-3 text-xs text-blue-600 
                 bg-white px-1 
                 transition-all duration-300 
                 peer-focus:-top-3 peer-focus:text-xs 
                 {formData.email ? '-top-3 text-xs' : 'top-3 text-gray-400'}"
        >
          Email Address
        </label>
      </div>
      
      <div class="relative group">
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          bind:value={formData.password}
          on:focus={() => focusedField = 'password'}
          on:blur={() => focusedField = null}
          class="block w-full px-4 py-3 text-gray-700 
                 bg-blue-50/50 border border-blue-200 
                 rounded-lg pr-12 
                 focus:outline-none focus:ring-2 focus:ring-blue-400 
                 transition-all duration-300 
                 peer placeholder-transparent"
          placeholder="Password"
          required
        />
        <label 
          for="password"
          class="absolute left-4 -top-3 text-xs text-blue-600 
                 bg-white px-1 
                 transition-all duration-300 
                 peer-focus:-top-3 peer-focus:text-xs 
                 {formData.password ? '-top-3 text-xs' : 'top-3 text-gray-400'}"
        >
          Password
        </label>
        <button
          type="button"
          class="absolute top-1/2 right-4 -translate-y-1/2 
                 text-blue-400 hover:text-blue-600 
                 transition-colors duration-300
                 flex items-center justify-center 
                 w-6 h-6"
          on:click={() => showPassword = !showPassword}
        >
          <svelte:component this={showPassword ? FaEyeSlash : FaEye} />
        </button>
      </div>
      
      <button
        type="submit"
        class="w-full py-3 bg-blue-600 text-white 
               rounded-lg hover:bg-blue-700 
               transition-colors duration-300 
               focus:outline-none focus:ring-2 
               focus:ring-blue-400 focus:ring-opacity-50
               disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
    
    <div class="mt-6 text-center">
      <p class="text-sm text-gray-600">
        Don't have an account? 
        <a 
          href="/register" 
          class="text-blue-600 hover:text-blue-800 
                 transition-colors duration-300 
                 font-semibold"
        >
          Sign up
        </a>
      </p>
    </div>
  </div>
</div>

<style>
  /* Custom animations */
  @keyframes pulse-slow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  .animate-pulse-slow {
    animation: pulse-slow 8s ease-in-out infinite;
  }
</style>