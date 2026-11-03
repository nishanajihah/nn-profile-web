<script lang="ts">
  import { page } from '$app/stores';
  import { siteConfig } from '$lib/config/site-config';
  import { fade } from 'svelte/transition';
  import '$lib/styles/components/navigation.scss';

  // When true, the HOME link is hidden (used on the homepage itself)
  export let hideHome = false;

  // 'home'    → transparent floating nav (original homepage-design.scss style, position: absolute top: 15vh)
  // 'inner'   → music page glassy nav
  // 'compact' → transparent squeezed nav, used on About, Code pages
  export let variant: 'home' | 'inner' | 'compact' = 'home';

  const isPathDisabled = (path: string) =>
    siteConfig.isBuildingMode && siteConfig.underConstructionPaths.includes(path);

  let isMobileMenuOpen = false;
  let navMobileRef: HTMLElement;

  const toggleMobileMenu = () => {
    isMobileMenuOpen = !isMobileMenuOpen;
  };

  const closeMobileMenu = () => {
    isMobileMenuOpen = false;
  };

  const handleWindowClick = (e: MouseEvent) => {
    if (isMobileMenuOpen && navMobileRef && !navMobileRef.contains(e.target as Node)) {
      isMobileMenuOpen = false;
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isMobileMenuOpen) {
      isMobileMenuOpen = false;
    }
  };
</script>

<svelte:window on:click={handleWindowClick} on:keydown={handleKeydown} />

<nav class="top-cinematic-nav {variant === 'inner' ? 'nav--inner' : ''} {variant === 'compact' ? 'nav--compact' : ''}">
  <!-- ══════════════════════════════════════════════════════════════
       DESKTOP VIEW: Untouched original floating horizontal portals
       ══════════════════════════════════════════════════════════════ -->
  <div class="nav-desktop-row">
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
      id="about-portal"
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
  </div>

  <!-- ══════════════════════════════════════════════════════════════
       MOBILE & LESSER VIEW: Full-Width EXPLORE pill with left & right lines
       ══════════════════════════════════════════════════════════════ -->
  <div class="nav-mobile-container" bind:this={navMobileRef}>
    <button
      type="button"
      class="mobile-explore-pill-btn"
      class:is-active={isMobileMenuOpen}
      on:click|stopPropagation={toggleMobileMenu}
      aria-label="Toggle navigation menu"
      aria-expanded={isMobileMenuOpen}
    >
      <!-- Left 3 Lines -->
      <span class="pill-lines-icon lines-left" aria-hidden="true">
        <span class="hamburger-bar bar-top"></span>
        <span class="hamburger-bar bar-mid"></span>
        <span class="hamburger-bar bar-bot"></span>
      </span>

      <!-- In between: EXPLORE text -->
      <span class="pill-word-center">EXPLORE</span>

      <!-- Right 3 Lines -->
      <span class="pill-lines-icon lines-right" aria-hidden="true">
        <span class="hamburger-bar bar-top"></span>
        <span class="hamburger-bar bar-mid"></span>
        <span class="hamburger-bar bar-bot"></span>
      </span>
    </button>

    {#if isMobileMenuOpen}
      <div
        class="mobile-nav-dropdown-menu"
        transition:fade={{ duration: 150 }}
      >
        <div class="dropdown-top-meta">
          <span class="dropdown-header-tag">// EXPLORE PORTALS</span>
          <button
            type="button"
            class="dropdown-close-btn"
            on:click|stopPropagation={closeMobileMenu}
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>

        <div class="dropdown-items-list">
          {#if !hideHome || $page.url.pathname !== '/'}
            <a
              href="/"
              class="mobile-dropdown-item {$page.url.pathname === '/' ? 'is-active' : ''}"
              on:click={closeMobileMenu}
            >
              <div class="item-left-block">
                <span class="item-status-dot"></span>
                <div class="item-text-group">
                  <span class="item-main-title">HOME</span>
                  <span class="item-sub-title">Origin</span>
                </div>
              </div>
              {#if $page.url.pathname === '/'}
                <span class="item-active-chip">ACTIVE</span>
              {/if}
            </a>
            <div class="dropdown-inner-divider"></div>
          {/if}

          <a
            href="/about"
            class="mobile-dropdown-item {isPathDisabled('/about') ? 'is-disabled' : ''} {$page.url.pathname.includes('/about') ? 'is-active' : ''}"
            on:click={closeMobileMenu}
          >
            <div class="item-left-block">
              <span class="item-status-dot"></span>
              <div class="item-text-group">
                <span class="item-main-title">ABOUT</span>
                <span class="item-sub-title">The Identity</span>
              </div>
            </div>
            {#if $page.url.pathname.includes('/about')}
              <span class="item-active-chip">ACTIVE</span>
            {/if}
          </a>

          <div class="dropdown-inner-divider"></div>

          <a
            href="/music"
            class="mobile-dropdown-item {isPathDisabled('/music') ? 'is-disabled' : ''} {$page.url.pathname.includes('/music') ? 'is-active' : ''}"
            on:click={closeMobileMenu}
          >
            <div class="item-left-block">
              <span class="item-status-dot"></span>
              <div class="item-text-group">
                <span class="item-main-title">AUDITORY</span>
                <span class="item-sub-title">Music Production</span>
              </div>
            </div>
            {#if $page.url.pathname.includes('/music')}
              <span class="item-active-chip">ACTIVE</span>
            {/if}
          </a>

          <div class="dropdown-inner-divider"></div>

          <a
            href="/code"
            class="mobile-dropdown-item {isPathDisabled('/code') ? 'is-disabled' : ''} {$page.url.pathname.includes('/code') ? 'is-active' : ''}"
            on:click={closeMobileMenu}
          >
            <div class="item-left-block">
              <span class="item-status-dot"></span>
              <div class="item-text-group">
                <span class="item-main-title">VISUAL</span>
                <span class="item-sub-title">Code Development</span>
              </div>
            </div>
            {#if $page.url.pathname.includes('/code')}
              <span class="item-active-chip">ACTIVE</span>
            {/if}
          </a>
        </div>

        <div class="dropdown-bottom-support">
          <a
            href="https://ko-fi.com/nishanajihah/tip"
            target="_blank"
            rel="noopener noreferrer"
            class="mobile-dropdown-support-btn"
            on:click={closeMobileMenu}
          >
            <svg class="support-heart-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>SUPPORT ME</span>
          </a>
        </div>
      </div>
    {/if}
  </div>
</nav>
