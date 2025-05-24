<script>
  import '../lib/styles/global.css';
  import Header from '../lib/components/Header.svelte';
  import Footer from '../lib/components/Footer.svelte';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  // Fade in content when page loads
  onMount(() => {
    gsap.from('main', { 
      opacity: 0, 
      y: 20, 
      duration: 0.8,
      clearProps: 'all'
    });
  });
</script>

<svelte:head>
  <!-- Default meta tags -->
  <meta name="description" content="Nisha Najihah - Developer, musician, and creative portfolio website" />
  <meta name="keywords" content="developer, musician, creative, portfolio, web development, music production" />
  <meta name="author" content="Nisha Najihah" />
</svelte:head>

<div class="site-wrapper">
  <Header />
  
  <main class="main-content">
    <slot />
  </main>
  
  <Footer />
</div>

<style>
  .site-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main-content {
    flex: 1;
    padding-top: 70px; /* Adjust based on your header height */
  }
</style>
