<script lang="ts">
  import { page } from '$app/stores';
  import { siteConfig } from '$lib/config/site-config';
  import '$lib/styles/components/navigation.scss';

  // When true, the HOME link is hidden (used on the homepage itself)
  export let hideHome = false;

  // 'home'    → transparent floating nav (original homepage-design.scss style, position: absolute top: 15vh)
  // 'inner'   → music page glassy nav
  // 'compact' → transparent squeezed nav, used on About, Code pages
  export let variant: 'home' | 'inner' | 'compact' = 'home';

  const isPathDisabled = (path: string) =>
    siteConfig.isBuildingMode && siteConfig.underConstructionPaths.includes(path);
</script>

<nav class="top-cinematic-nav {variant === 'inner' ? 'nav--inner' : ''} {variant === 'compact' ? 'nav--compact' : ''}">
  {#if !hideHome}
    <a
      href="/"
      class="nav-portal {$page.url.pathname === '/' ? 'is-active' : ''}"
    >
      <span class="nav-label">HOME</span>
      <span class="nav-sub">Origin</span>
    </a>

    <div class="nav-divider"></div>
  {/if}

  <a
    href="/about"
    class="nav-portal {isPathDisabled('/about') ? 'is-disabled' : ''} {$page.url.pathname.includes('/about') ? 'is-active' : ''}"
  >
    <span class="nav-label">ABOUT</span>
    <span class="nav-sub">The Identity</span>
  </a>

  <div class="nav-divider"></div>

  <a
    href="/music"
    class="nav-portal {isPathDisabled('/music') ? 'is-disabled' : ''} {$page.url.pathname.includes('/music') ? 'is-active' : ''}"
  >
    <span class="nav-label">AUDITORY</span>
    <span class="nav-sub">Music Production</span>
  </a>

  <div class="nav-divider"></div>

  <a
    href="/code"
    class="nav-portal {isPathDisabled('/code') ? 'is-disabled' : ''} {$page.url.pathname.includes('/code') ? 'is-active' : ''}"
  >
    <span class="nav-label">VISUAL</span>
    <span class="nav-sub">Code Development</span>
  </a>
  <a
    href="https://ko-fi.com/nishanajihah/tip"
    target="_blank"
    rel="noopener noreferrer"
    class="nav-support-btn {variant === 'inner' ? 'nav-support-btn--inner' : ''} {variant === 'compact' ? 'nav-support-btn--compact' : ''}"
    title="Support Me"
  >
    <svg class="nav-heart-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
    <span class="btn-text">SUPPORT ME</span>
  </a>
</nav>
