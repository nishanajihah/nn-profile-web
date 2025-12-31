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

  // Svelte 5 syntax for reactive DOM references
  let homepageContent = $state<HTMLElement | null>(null);
  let titleElement = $state<HTMLHeadingElement | null>(null);
  let glowEffect = $state<HTMLDivElement | null>(null);
  let particleContainer = $state<HTMLDivElement | null>(null);

  let isContactOpen = $state(false); // State for Connect Button morph

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
        <a href="/about" class="nav-portal" id="about-portal">
          <span class="nav-label">ABOUT</span>
          <span class="nav-sub">The Identity</span>
        </a>

        <div class="nav-divider"></div>

        <a href="/music" class="nav-portal">
          <span class="nav-label">AUDITORY</span>
          <span class="nav-sub">Music Production</span>
        </a>

        <div class="nav-divider"></div>

        <a href="/code" class="nav-portal">
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
          <span class="decoder-prefix">EST. 2024 // </span>
          <span class="decoder-text">INDEPENDENT ARTIST & DEVELOPER</span>
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
      <div class="columns is-centered is-vcentered is-mobile is-multiline">
        <div class="column is-12">
          <div class="buttons is-centered footer-links">
            <a
              href="https://github.com/nishanajihah"
              target="_blank"
              class="footer-link mx-3"
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
            </a>
            <a
              href="https://www.instagram.com/nisha.najihah"
              target="_blank"
              class="footer-link mx-3"
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
            </a>
            <a
              href="https://open.spotify.com/artist/2rI5YRwSaBF0IEwiCN7SEa?si=UCYBvh9dRIyUolcoTZPb9w"
              target="_blank"
              class="footer-link mx-3"
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
            </a>
            <a
              href="https://ko-fi.com/nishanajihah"
              target="_blank"
              class="footer-link mx-3"
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
            </a>
            <a
              href="https://www.linkedin.com/in/nisha-najihah"
              target="_blank"
              class="footer-link mx-3"
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
            </a>
            <a
              href="mailto:nishanajihah@gmail.com"
              class="footer-link mx-3"
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
            </a>
          </div>
        </div>
        <div class="column is-12">
          <p class="is-size-7 has-text-grey">
            &copy; {new Date().getFullYear()} Nisha Najihah | Created and designed
            by Nisha Najihah
          </p>
        </div>
      </div>
    </div>
  </footer>
</div>

<style lang="scss">
  @use "$lib/styles/homepage-design.scss";
</style>
