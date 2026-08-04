<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { fade } from "svelte/transition";
  import {
    runHomepageEntranceAnimation,
    setupTitleMouseTilt,
    setupMouseParticleTrail,
    setupHomepageGlowInteraction,
    setupAboutPointerInteraction,
    generateAmbientParticles,
    animateDeckEntrance,
    type HomepageElements,
  } from "$lib/logic/home/animations";

  import { siteConfig } from "$lib/config/site-config";
  import Navigation from "$lib/components/Navigation.svelte";
  import Footer from "$lib/components/Footer.svelte";

  const isPathDisabled = (path: string) =>
    siteConfig.isBuildingMode &&
    siteConfig.underConstructionPaths.includes(path);

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

    document.documentElement.classList.add("home-page-active");
    document.body.classList.add("home-page-active");

    return () => {
      cleanupGlow();
      cleanupAbout();
      document.documentElement.classList.remove("home-page-active");
      document.body.classList.remove("home-page-active");
    };
  });
</script>

<svelte:head>
  <title>Nisha Najihah | Home</title>
</svelte:head>

<div class="homepage-wrapper">
  <div
    bind:this={homepageContent}
    class="hero is-flex-grow-1 is-relative is-overflow-hidden"
  >
    <!-- Background Effects -->
    <div bind:this={particleContainer} class="ambient-container"></div>
    <div bind:this={glowEffect} class="home-glow"></div>

    <div
      class="hero-body is-z-10 is-flex is-align-items-center is-justify-content-center"
      style="min-height: 100vh; position: relative;"
    >
      <!-- Top Cinematic Nav -->
      <Navigation hideHome />

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
                href="https://mail.google.com/mail/?view=cm&fs=1&to=nishanajihah.music@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                class="deck-btn split-btn"
                aria-label="Music Inquiries"
              >
                <span class="deck-label">MUSIC</span>
              </a>
              <div class="deck-separator"></div>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=nishanajihah.dev@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
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

  <Footer variant="home" />
</div>

<style lang="scss">
  @use "$lib/styles/pages/home.scss";

  // Lock scrolling globally ONLY for this route
  :global(html.home-page-active),
  :global(body.home-page-active) {
    overflow: hidden !important;
    height: 100vh !important;
    height: 100dvh !important;
  }
</style>
