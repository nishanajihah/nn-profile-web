<script lang="ts">
  import { page } from '$app/stores';
  import { siteConfig } from '$lib/config/site-config';

  const isPathDisabled = (path: string) =>
    siteConfig.isBuildingMode && siteConfig.underConstructionPaths.includes(path);
</script>

<nav class="top-cinematic-nav">
  <!-- HOMEPAGE LINK (optional, but good for navigation) -->
  <a
    href="/"
    class="nav-portal {$page.url.pathname === '/' ? 'is-active' : ''}"
  >
    <span class="nav-label">HOME</span>
    <span class="nav-sub">Origin</span>
  </a>

  <div class="nav-divider"></div>

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

<style lang="scss">
  /* Inherit top-cinematic-nav styles from homepage-design.scss globally */
  .nav-portal {
    &.is-active {
      .nav-label {
        color: #ffde21 !important;
        text-shadow: 0 0 10px rgba(255, 222, 33, 0.5) !important;
      }
      .nav-sub {
        color: rgba(255, 255, 255, 0.8) !important;
      }
    }
  }
</style>
