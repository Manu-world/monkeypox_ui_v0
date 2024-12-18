<!-- // src/routes/+layout.svelte -->
<script>
  import '../app.css';
</script>

<slot />



<!-- // src/lib/icons/LoginIcon.svelte
<script>
  export let className = '';
</script>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class={className}>
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
</svg>

// src/lib/icons/RegisterIcon.svelte
<script>
  export let className = '';
</script>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class={className}>
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
</svg> -->

<!-- // src/lib/animations/WaveBackground.svelte -->
<!-- <script>
  import { onMount } from 'svelte';

  let svgRef;
  
  onMount(() => {
    const animateWaves = () => {
      const wave1 = svgRef.querySelector('#wave1');
      const wave2 = svgRef.querySelector('#wave2');
      
      wave1.setAttribute('transform', `translate(${Math.sin(Date.now() * 0.001) * 20}, 0)`);
      wave2.setAttribute('transform', `translate(${Math.cos(Date.now() * 0.0015) * -15}, 0)`);
      
      requestAnimationFrame(animateWaves);
    };
    
    animateWaves();
  });
</script>

<svg bind:this={svgRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="absolute bottom-0 left-0 w-full opacity-30 z-0">
  <path id="wave1" fill="#3B82F6" fill-opacity="0.4" d="M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,192C672,171,768,149,864,160C960,171,1056,213,1152,229.3C1248,245,1344,235,1392,229.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320L192,320L96,320L0,320Z"></path>
  <path id="wave2" fill="#60A5FA" fill-opacity="0.6" d="M0,192L48,208C96,224,192,256,288,261.3C384,267,480,245,576,224C672,203,768,181,864,192C960,203,1056,245,1152,261.3C1248,277,1344,267,1392,261.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320L192,320L96,320L0,320Z"></path>
</svg> -->

<!-- // src/routes/auth/+page.svelte -->
<!-- <script>
  import { fade, fly } from 'svelte/transition';
  import LoginIcon from '$lib/icons/LoginIcon.svelte';
  import RegisterIcon from '$lib/icons/RegisterIcon.svelte';
  import WaveBackground from '$lib/animations/WaveBackground.svelte';

  let isLogin = true;
  let email = '';
  let password = '';
  let username = '';

  async function handleSubmit() {
    try {
      const endpoint = isLogin 
        ? 'http://localhost:800/api/v1/login' 
        : 'http://localhost:800/api/v1/register';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          isLogin 
            ? { email, password } 
            : { email, password, username }
        )
      });

      if (response.ok) {
        // Handle successful login/registration
        console.log(isLogin ? 'Login successful' : 'Registration successful');
      } else {
        // Handle errors
        console.error(isLogin ? 'Login failed' : 'Registration failed');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center relative overflow-hidden">
  <WaveBackground />
  
  <div 
    class="bg-white shadow-2xl rounded-2xl p-8 w-96 z-10 relative overflow-hidden"
    transition:fly={{ y: 200, duration: 500 }}
  >
    {#if isLogin}
      <div 
        in:fade={{ duration: 300 }} 
        out:fade={{ duration: 300 }}
        class="text-center"
      >
        <LoginIcon className="mx-auto w-16 h-16 text-blue-500 mb-4" />
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Login to Your Account</h2>
        
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
          <input 
            type="email" 
            bind:value={email}
            placeholder="Email Address" 
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="password" 
            bind:value={password}
            placeholder="Password" 
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <button 
            type="submit" 
            class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
        </form>
        
        <p class="mt-4 text-sm text-gray-600">
          Don't have an account? 
          <button 
            on:click={() => isLogin = false}
            class="text-blue-500 hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    {:else}
      <div 
        in:fade={{ duration: 300 }} 
        out:fade={{ duration: 300 }}
        class="text-center"
      >
        <RegisterIcon className="mx-auto w-16 h-16 text-green-500 mb-4" />
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Create an Account</h2>
        
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
          <input 
            type="text" 
            bind:value={username}
            placeholder="Username" 
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input 
            type="email" 
            bind:value={email}
            placeholder="Email Address" 
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input 
            type="password" 
            bind:value={password}
            placeholder="Password" 
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          
          <button 
            type="submit" 
            class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        
        <p class="mt-4 text-sm text-gray-600">
          Already have an account? 
          <button 
            on:click={() => isLogin = true}
            class="text-green-500 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    {/if}
  </div>
</div> -->

<!-- // svelte.config.js -->


<!-- // tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      animation: {
        'wave-slow': 'wave 10s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' },
        }
      }
    },
  },
  plugins: [],
} -->

