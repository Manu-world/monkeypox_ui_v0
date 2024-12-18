<script>
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
  </div>
  