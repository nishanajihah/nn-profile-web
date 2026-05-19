<script lang="ts">
  import { page } from '$app/stores';
  import { siteConfig } from '$lib/config/site-config';
  import '$lib/styles/navigation.scss';

  // When true, the HOME link is hidden (used on the homepage itself)
  export let hideHome = false;

  // 'home'  → transparent floating nav (original homepage-design.scss style, position: absolute top: 15vh)
  // 'inner' → glassmorphism pill bar (position: fixed top: 40px), used on Music, About, Code pages
  export let variant: 'home' | 'inner' = 'home';

  const isPathDisabled = (path: string) =>
    siteConfig.isBuildingMode && siteConfig.underConstructionPaths.includes(path);
</script>

<nav class="top-cinematic-nav {variant === 'inner' ? 'nav--inner' : ''}">
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
</nav>
