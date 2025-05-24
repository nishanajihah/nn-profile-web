<script>
  import { page } from '$app/stores';
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';

  // Track active page for navigation highlighting
  $: activePage = $page.url.pathname;

  // Animation for menu items
  onMount(() => {
    gsap.from('.nav-item', {
      opacity: 0,
      y: -20,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out'
    });
  });

  // Mobile menu state
  let mobileMenuOpen = false;
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<header class="header">
  <div class="header-container">
    <div class="logo">
      <a href="/">Nisha Najihah</a>
    </div>
    
    <nav class="desktop-nav">
      <ul class="nav-list">
        <li class="nav-item">
          <a href="/" class:active={activePage === '/'}>Home</a>
        </li>
        <li class="nav-item">
          <a href="/music" class:active={activePage.startsWith('/music')}>Music</a>
        </li>
        <li class="nav-item">
          <a href="/code" class:active={activePage.startsWith('/code')}>Code</a>
        </li>
        <li class="nav-item">
          <a href="/about" class:active={activePage.startsWith('/about')}>About</a>
        </li>
      </ul>
    </nav>

    <button class="mobile-menu-button" on:click={toggleMobileMenu} aria-label="Toggle menu">
      <div class="hamburger {mobileMenuOpen ? 'open' : ''}">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
  </div>

  {#if mobileMenuOpen}
    <div class="mobile-nav" transition:slide={{ duration: 300 }}>
      <ul class="mobile-nav-list">
        <li>
          <a href="/" on:click={toggleMobileMenu} class:active={activePage === '/'}>Home</a>
        </li>
        <li>
          <a href="/music" on:click={toggleMobileMenu} class:active={activePage.startsWith('/music')}>Music</a>
        </li>
        <li>
          <a href="/code" on:click={toggleMobileMenu} class:active={activePage.startsWith('/code')}>Code</a>
        </li>
        <li>
          <a href="/about" on:click={toggleMobileMenu} class:active={activePage.startsWith('/about')}>About</a>
        </li>
      </ul>
    </div>
  {/if}
</header>

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    z-index: 1000;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05);
  }

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  .logo a {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    color: #000;
    transition: opacity 0.3s ease;
  }

  .logo a:hover {
    opacity: 0.8;
  }

  .nav-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
  }

  .nav-item a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    padding: 0.5rem 0;
    position: relative;
    transition: color 0.3s ease;
  }

  .nav-item a:hover, .nav-item a.active {
    color: #000;
  }

  .nav-item a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #000;
    transition: width 0.3s ease;
  }

  .nav-item a:hover::after, .nav-item a.active::after {
    width: 100%;
  }

  .mobile-menu-button {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 20px;
  }

  .hamburger span {
    display: block;
    height: 2px;
    width: 100%;
    background: #000;
    transition: all 0.3s ease;
  }

  .hamburger.open span:first-child {
    transform: translateY(9px) rotate(45deg);
  }

  .hamburger.open span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.open span:last-child {
    transform: translateY(-9px) rotate(-45deg);
  }

  .mobile-nav {
    background: white;
    padding: 1rem;
    border-top: 1px solid #eee;
  }

  .mobile-nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .mobile-nav-list li {
    margin: 1rem 0;
  }

  .mobile-nav-list a {
    text-decoration: none;
    color: #000;
    font-size: 1.2rem;
    display: block;
    padding: 0.5rem 0;
  }

  @media (max-width: 768px) {
    .desktop-nav {
      display: none;
    }

    .mobile-menu-button {
      display: block;
    }
  }
</style>
