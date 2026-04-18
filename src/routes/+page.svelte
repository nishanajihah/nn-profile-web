<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { fade } from "svelte/transition";
  import {
    runHomepageEntranceAnimation,
    setupHomepageGlowInteraction,
    setupAboutPointerInteraction,
    generateAmbientParticles,
    animateDeckEntrance,
    type HomepageElements,
  } from "$lib/logic/homepage-animations";

  import { siteConfig } from "$lib/config/site-config";

  const isPathDisabled = (path: string) =>
    siteConfig.isBuildingMode &&
    siteConfig.underConstructionPaths.includes(path);

  // Svelte 5 syntax for reactive DOM references
  let homepageContent = $state<HTMLElement | null>(null);
  let titleElement = $state<HTMLHeadingElement | null>(null);
  let glowEffect = $state<HTMLDivElement | null>(null);
  let particleContainer = $state<HTMLDivElement | null>(null);

  let isContactOpen = $state(false); // State for Connect Button morph
  let isSocialOpen = $state(false); // State for Mobile Social Popup

  onMount(() => {
    if (!browser) return;

    // 1. Setup Data/Particles
    generateAmbientParticles(particleContainer);

    // 2. Setup Interactions (e.g. Glow follow)
    const cleanupGlow = setupHomepageGlowInteraction({
      glow: glowEffect,
      container: homepageContent,
    });

    // 3. Setup About -> Title Pointer Interaction
    const cleanupAbout = setupAboutPointerInteraction(titleElement);

    // Run Entrance Animations
    const elements: HomepageElements = {
      title: titleElement,
      glow: glowEffect,
    };
    runHomepageEntranceAnimation(elements);

    return () => {
      cleanupGlow();
      cleanupAbout();
    };
  });
</script>

<svelte:head>
  <title>Nisha Najihah | Home</title>
</svelte:head>

<div class="homepage-wrapper">
  <div
    bind:this={homepageContent}
    class="hero is-flex-grow-1 is-black is-relative is-overflow-hidden"
  >
    <!-- Background Effects -->
    <div bind:this={particleContainer} class="ambient-container"></div>
    <div bind:this={glowEffect} class="home-glow"></div>

    <div
      class="hero-body is-z-10 is-flex is-align-items-center is-justify-content-center"
      style="min-height: 100vh; position: relative;"
    >
      <!-- Top Cinematic Nav (Text + Subtext Reveal) -->
      <nav class="top-cinematic-nav">
        <!-- Added ID for specific targeting in animation script -->
        <a
          href="/about"
          class="nav-portal {isPathDisabled('/about') ? 'is-disabled' : ''}"
          id="about-portal"
        >
          <span class="nav-label">ABOUT</span>
          <span class="nav-sub">The Identity</span>
        </a>

        <div class="nav-divider"></div>

        <a
          href="/music"
          class="nav-portal {isPathDisabled('/music') ? 'is-disabled' : ''}"
        >
          <span class="nav-label">AUDITORY</span>
          <span class="nav-sub">Music Production</span>
        </a>

        <div class="nav-divider"></div>

        <a
          href="/code"
          class="nav-portal {isPathDisabled('/code') ? 'is-disabled' : ''}"
        >
          <span class="nav-label">VISUAL</span>
          <span class="nav-sub">Code Development</span>
        </a>
      </nav>

      <div class="container has-text-centered cinematic-wrapper">
        <!-- MASSIVE 3D Identity Anchor (Single Line) -->
        <div class="title-3d-wrapper">
          <h1 class="cinematic-title" bind:this={titleElement}>
            NISHA NAJIHAH
          </h1>
        </div>

        <!-- Scramble Identity -->
        <div class="identity-decoder mb-6">
          <span class="decoder-text"
            >INDEPENDENT ARTIST & VERSATILE DEVELOPER</span
          >
        </div>
      </div>

      <!-- Connect Trigger (Bottom Center) - redesigned as Morphing Deck -->
      <div class="cinematic-controls bottom-center">
        {#if !isContactOpen}
          <button
            class="connect-prism"
            aria-label="Work with me"
            onclick={() => (isContactOpen = true)}
          >
            <span class="prism-glow"></span>
            <span class="prism-content">
              <span class="prism-text">WORK WITH ME</span>
            </span>
          </button>
        {:else}
          <!-- Expanded "Contact Control Panel" -->
          <div class="contact-deck" use:animateDeckEntrance>
            <button
              class="deck-close"
              onclick={() => (isContactOpen = false)}
              aria-label="Close"
            >
              ✕
            </button>
            <span class="deck-prompt">CHOOSE A PROJECT:</span>
            <div class="deck-options">
              <a
                href="mailto:nishanajihah88@gmail.com"
                class="deck-btn split-btn"
                aria-label="Music Inquiries"
              >
                <span class="deck-label">MUSIC</span>
              </a>
              <div class="deck-separator"></div>
              <a
                href="mailto:nishanajihah.dev@gmail.com"
                class="deck-btn split-btn"
                aria-label="Code Inquiries"
              >
                <span class="deck-label">CODE</span>
              </a>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <footer class="home-footer has-text-centered">
    <div class="container">
      <div class="footer-single-row">
        <!-- Links Group (LEFT on desktop) -->
        <div class="footer-links-group">
          <!-- Privacy Link -->
          <div class="footer-privacy">
            <a href="/privacy" class="privacy-link">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span class="is-hidden-mobile">Privacy Policy</span>
              <span class="is-hidden-tablet">Privacy</span>
            </a>
          </div>

          <!-- Social Toggle (ONLY visible on mobile, positioned between Privacy and T&C) -->
          <div class="footer-social-mobile-container is-hidden-tablet">
            <button
              class="social-mobile-toggle"
              onclick={() => (isSocialOpen = !isSocialOpen)}
              aria-label="Toggle social links"
            >
              <span class="toggle-text">Social</span>
              <div class="toggle-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>

          <!-- Terms Link -->
          <div class="footer-terms">
            <a href="/terms" class="terms-link">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                ></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
              <span class="is-hidden-mobile">Terms & Conditions</span>
              <span class="is-hidden-tablet">T&C</span>
            </a>
          </div>
        </div>

        <!-- Social Icons (CENTER on desktop) -->
        <div class="footer-social-wrapper is-hidden-mobile">
          <div class="footer-social">
            <a
              href="https://github.com/nishanajihah"
              target="_blank"
              class="footer-link github-link"
              title="GitHub"
            >
              <span class="social-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                  ></path></svg
                >
              </span>
              <span class="footer-label">GitHub</span>
            </a>
            <a
              href="https://www.instagram.com/nisha.najihah"
              target="_blank"
              class="footer-link instagram-link"
              title="Instagram"
            >
              <span class="social-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><rect x="2" y="2" width="20" height="20" rx="5" ry="5"
                  ></rect><path
                    d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                  ></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"
                  ></line></svg
                >
              </span>
              <span class="footer-label">Instagram</span>
            </a>
            <a
              href="https://open.spotify.com/artist/2rI5YRwSaBF0IEwiCN7SEa?si=UCYBvh9dRIyUolcoTZPb9w"
              target="_blank"
              class="footer-link spotify-link"
              title="Spotify"
            >
              <span class="social-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><circle cx="12" cy="12" r="10"></circle><path
                    d="M8 11.5c4-1 8 0 8 0"
                  ></path><path d="M7 14.5c5-1.5 10 0 10 0"></path><path
                    d="M9 8.5c3-1 6 0 6 0"
                  ></path></svg
                >
              </span>
              <span class="footer-label">Spotify</span>
            </a>
            <a
              href="https://music.apple.com/us/artist/nisha-najihah/1598242580"
              target="_blank"
              class="footer-link apple-link"
              title="Apple Music"
            >
              <span class="social-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"
                  ></path><path d="M16 8v8a2 2 0 1 1-2-2V6l4-2v4h-2z"
                  ></path></svg
                >
              </span>
              <span class="footer-label">Apple Music</span>
            </a>
            <a
              href="https://ko-fi.com/nishanajihah"
              target="_blank"
              class="footer-link kofi-link"
              title="Support on Ko-fi"
            >
              <span class="social-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path
                    d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"
                  ></path><line x1="6" y1="1" x2="6" y2="4"></line><line
                    x1="10"
                    y1="1"
                    x2="10"
                    y2="4"
                  ></line><line x1="14" y1="1" x2="14" y2="4"></line></svg
                >
              </span>
              <span class="footer-label">Ko-fi</span>
            </a>
            <a
              href="https://www.linkedin.com/in/nisha-najihah"
              target="_blank"
              class="footer-link linkedin-link"
              title="LinkedIn"
            >
              <span class="social-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path
                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                  ></path><rect x="2" y="9" width="4" height="12"></rect><circle
                    cx="4"
                    cy="4"
                    r="2"
                  ></circle></svg
                >
              </span>
              <span class="footer-label">LinkedIn</span>
            </a>
            <a
              href="https://www.youtube.com/@nisha.najihah"
              target="_blank"
              class="footer-link youtube-link"
              title="YouTube"
            >
              <span class="social-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path
                    d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
                  ></path><polygon
                    points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
                  ></polygon></svg
                >
              </span>
              <span class="footer-label">YouTube</span>
            </a>
            <a
              href="https://www.threads.com/@nisha.najihah"
              target="_blank"
              class="footer-link threads-link"
              title="Threads"
            >
              <span class="social-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path
                    d="M19.25 8.5c-.2-2.5-1.8-4.5-4.5-5.5-1.5-.5-3-.5-4.5 0-2.7 1-4.3 3-4.5 5.5-.1 1.5.2 3 1 4.3.8 1.3 2 2.2 3.5 2.7 1.5.5 3 .5 4.5 0 1.5-.5 2.7-1.4 3.5-2.7.8-1.3 1.1-2.8 1-4.3z"
                  ></path><path d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4"
                  ></path><circle cx="18" cy="6" r="1"></circle></svg
                >
              </span>
              <span class="footer-label">Threads</span>
            </a>
            <a
              href="mailto:nishanajihah@gmail.com"
              class="footer-link contact-link"
              title="Contact"
            >
              <span class="social-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  ></path><polyline points="22,6 12,13 2,6"></polyline></svg
                >
              </span>
              <span class="footer-label">Email Contact</span>
            </a>
          </div>
        </div>

        <!-- Copyright Text (RIGHT on desktop) -->
        <div class="footer-copyright">
          <div class="copyright-link">
            <span class="copyright-line"
              >© {new Date().getFullYear()} Nisha Najihah</span
            >
            <span class="copyright-credit">&nbsp;|&nbsp; Designed & Built</span>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- Social Popup Overlay (Mobile) -->
  {#if isSocialOpen}
    <div
      class="social-popup-overlay"
      role="button"
      tabindex="0"
      onclick={() => (isSocialOpen = false)}
      onkeydown={(e) => e.key === "Escape" && (isSocialOpen = false)}
      transition:fade={{ duration: 300 }}
    >
      <div
        class="social-popup-content"
        role="dialog"
        tabindex="-1"
        aria-modal="true"
        aria-labelledby="social-popup-title"
        onclick={(e) => e.stopPropagation()}
        onkeydown={(e) => e.key === "Escape" && (isSocialOpen = false)}
      >
        <div class="popup-header">
          <h3 id="social-popup-title">Social Connect</h3>
          <button class="close-popup" onclick={() => (isSocialOpen = false)}
            >&times;</button
          >
        </div>
        <div class="popup-social-grid">
          <!-- Reuse the same social icons logic or copy them here -->
          <a
            href="https://github.com/nishanajihah"
            target="_blank"
            class="popup-link github-link"
          >
            <span class="popup-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                ></path></svg
              >
            </span>
            <span class="link-label">GitHub</span>
          </a>
          <a
            href="https://www.instagram.com/nisha.najihah"
            target="_blank"
            class="popup-link instagram-link"
          >
            <span class="popup-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><rect x="2" y="2" width="20" height="20" rx="5" ry="5"
                ></rect><path
                  d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                ></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"
                ></line></svg
              >
            </span>
            <span class="link-label">Instagram</span>
          </a>
          <a
            href="https://open.spotify.com/artist/2rI5YRwSaBF0IEwiCN7SEa"
            target="_blank"
            class="popup-link spotify-link"
          >
            <span class="popup-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><circle cx="12" cy="12" r="10"></circle><path
                  d="M8 11.5c4-1 8 0 8 0"
                ></path><path d="M7 14.5c5-1.5 10 0 10 0"></path><path
                  d="M9 8.5c3-1 6 0 6 0"
                ></path></svg
              >
            </span>
            <span class="link-label">Spotify</span>
          </a>
          <a
            href="https://music.apple.com/us/artist/nisha-najihah/1598242580"
            target="_blank"
            class="popup-link apple-link"
          >
            <span class="popup-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"
                ></path><path d="M16 8v8a2 2 0 1 1-2-2V6l4-2v4h-2z"></path></svg
              >
            </span>
            <span class="link-label">Apple Music</span>
          </a>
          <a
            href="https://ko-fi.com/nishanajihah"
            target="_blank"
            class="popup-link kofi-link"
          >
            <span class="popup-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path
                  d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"
                ></path><line x1="6" y1="1" x2="6" y2="4"></line><line
                  x1="10"
                  y1="1"
                  x2="10"
                  y2="4"
                ></line><line x1="14" y1="1" x2="14" y2="4"></line></svg
              >
            </span>
            <span class="link-label">Ko-fi</span>
          </a>
          <a
            href="https://www.linkedin.com/in/nisha-najihah"
            target="_blank"
            class="popup-link linkedin-link"
          >
            <span class="popup-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path
                  d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                ></path><rect x="2" y="9" width="4" height="12"></rect><circle
                  cx="4"
                  cy="4"
                  r="2"
                ></circle></svg
              >
            </span>
            <span class="link-label">LinkedIn</span>
          </a>
          <a
            href="https://www.youtube.com/@nisha.najihah"
            target="_blank"
            class="popup-link youtube-link"
          >
            <span class="popup-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path
                  d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
                ></path><polygon
                  points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
                ></polygon></svg
              >
            </span>
            <span class="link-label">YouTube</span>
          </a>
          <a
            href="https://www.threads.com/@nisha.najihah"
            target="_blank"
            class="popup-link threads-link"
          >
            <span class="popup-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path
                  d="M19.25 8.5c-.2-2.5-1.8-4.5-4.5-5.5-1.5-.5-3-.5-4.5 0-2.7 1-4.3 3-4.5 5.5-.1 1.5.2 3 1 4.3.8 1.3 2 2.2 3.5 2.7 1.5.5 3 .5 4.5 0 1.5-.5 2.7-1.4 3.5-2.7.8-1.3 1.1-2.8 1-4.3z"
                ></path><path d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4"
                ></path><circle cx="18" cy="6" r="1"></circle></svg
              >
            </span>
            <span class="link-label">Threads</span>
          </a>
          <a
            href="mailto:nishanajihah@gmail.com"
            class="popup-link contact-link"
          >
            <span class="popup-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                ></path><polyline points="22,6 12,13 2,6"></polyline></svg
              >
            </span>
            <span class="link-label">Email Contact</span>
          </a>
        </div>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  @use "$lib/styles/homepage-design.scss";

  // Lock scrolling globally ONLY for this route
  :global(html),
  :global(body) {
    overflow: hidden !important;
    height: 100vh !important;
    height: 100dvh !important;
  }
</style>
