<script>
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
  </svg>
  