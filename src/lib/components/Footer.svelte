<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { fade } from "svelte/transition";
  import { page } from "$app/stores";
  import "$lib/styles/components/footer.scss";
  import { setupFooterNodeAnimations } from "$lib/logic/home/animations";

  // "home", "code", "music", or "about"
  export let variant: "home" | "code" | "music" | "about" = "home";
  let isSocialOpen = false;
  let isNavOpen = false;
  let navContainer: HTMLElement;

  function toggleNavMenu(e: Event) {
    e.stopPropagation();
    isNavOpen = !isNavOpen;
  }

  function handleWindowClick(e: MouseEvent) {
    if (isNavOpen && navContainer && !navContainer.contains(e.target as Node)) {
      isNavOpen = false;
    }
  }

  // Per-variant email address in the social set
  $: emailHref =
    variant === "code"
      ? "https://mail.google.com/mail/?view=cm&fs=1&to=nishanajihah.dev@gmail.com"
      : variant === "music"
        ? "https://mail.google.com/mail/?view=cm&fs=1&to=nishanajihah.music@gmail.com"
        : "https://mail.google.com/mail/?view=cm&fs=1&to=nishanajihah.info@gmail.com";
  $: emailLabel =
    variant === "code"
      ? "DEV EMAIL"
      : variant === "music"
        ? "MUSIC EMAIL"
        : "GENERAL EMAIL";

  onMount(() => {
    if (browser) {
      // Small delay so the DOM is fully painted before querying icons
      const t = setTimeout(() => setupFooterNodeAnimations(), 300);
      return () => clearTimeout(t);
    }
  });
</script>

<svelte:window on:click={handleWindowClick} />

<footer class="home-footer has-text-centered variant-{variant}">
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
            <span class="is-hidden-mobile">Terms of Use</span>
            <span class="is-hidden-tablet">ToU</span>
          </a>
        </div>

        <!-- Social Toggle (ONLY visible on mobile) -->
        <div class="footer-social-mobile-container is-hidden-tablet">
          <button
            class="social-mobile-toggle"
            on:click={() => (isSocialOpen = !isSocialOpen)}
            aria-label="Toggle social links"
          >
            <span class="toggle-text">Social</span>
            <div class="toggle-dots">
              <span></span><span></span><span></span>
            </div>
          </button>
        </div>

        <!-- Navigation Dropup Toggle -->
        <div class="footer-nav-container" bind:this={navContainer}>
          <button
            class="nav-menu-toggle"
            on:click={toggleNavMenu}
            aria-label="Toggle navigation menu"
            class:is-active={isNavOpen}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <span>Explore</span>
          </button>

          {#if isNavOpen}
            <div class="nav-dropup-menu" transition:fade={{ duration: 150 }}>
              <div class="menu-top-row">
                <!-- Mobile Close Button -->
                <button
                  class="menu-close-btn"
                  on:click|stopPropagation={() => (isNavOpen = false)}
                  aria-label="Close menu"
                >
                  ✕
                </button>

                <!-- Support Me Link -->
                <a
                  href="https://ko-fi.com/nishanajihah/tip"
                  target="_blank"
                  class="menu-item support-menu-item"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="support-heart"
                  >
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                  <span class="menu-label">SUPPORT ME</span>
                </a>
              </div>
              <div class="menu-divider"></div>
              {#if String($page.url.pathname) !== "/"}
                <a
                  href="/"
                  class="menu-item {String($page.url.pathname) === '/'
                    ? 'is-active'
                    : ''}"
                >
                  <span class="menu-label">HOME</span>
                  <span class="menu-sub">Origin</span>
                </a>
                <div class="menu-divider"></div>
              {/if}
              <a
                href="/about"
                class="menu-item {$page.url.pathname.includes('/about')
                  ? 'is-active'
                  : ''}"
              >
                <span class="menu-label">ABOUT</span>
                <span class="menu-sub">The Identity</span>
              </a>
              <div class="menu-divider"></div>
              <a
                href="/music"
                class="menu-item {$page.url.pathname.includes('/music')
                  ? 'is-active'
                  : ''}"
              >
                <span class="menu-label">AUDITORY</span>
                <span class="menu-sub">Music Production</span>
              </a>
              <div class="menu-divider"></div>
              <a
                href="/code"
                class="menu-item {$page.url.pathname.includes('/code')
                  ? 'is-active'
                  : ''}"
              >
                <span class="menu-label">VISUAL</span>
                <span class="menu-sub">Code Development</span>
              </a>
            </div>
          {/if}
        </div>
      </div>

      <!-- Social Icons (CENTER on desktop) -->
      <div class="footer-social-wrapper is-hidden-mobile">
        <div class="footer-social">
          {#if variant === "home"}
            <!-- HOMEPAGE SOCIAL SET -->
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
              href="https://devpost.com/nishanajihah"
              target="_blank"
              class="footer-link devpost-link"
              title="Devpost"
            >
              <span class="social-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853Z"
                  />
                </svg>
              </span>
              <span class="footer-label">Devpost</span>
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
              href={emailHref}
              target="_blank"
              rel="noopener noreferrer"
              class="footer-link contact-link"
              title="Email"
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
              <span class="footer-label">{emailLabel}</span>
            </a>
          {:else if variant === "about"}
            <!-- ABOUT PAGE SOCIAL SET (ALL LINKS) -->
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
              href="https://devpost.com/nishanajihah"
              target="_blank"
              class="footer-link devpost-link"
              title="Devpost"
            >
              <span class="social-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853Z"
                  />
                </svg>
              </span>
              <span class="footer-label">Devpost</span>
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
              href="https://www.deezer.com/us/artist/153054282"
              target="_blank"
              class="footer-link deezer-link"
              title="Deezer"
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
                  ><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"
                  ></circle><circle cx="18" cy="16" r="3"></circle></svg
                >
              </span>
              <span class="footer-label">Deezer</span>
            </a>
            <a
              href="https://audiomack.com/nisha-najihah"
              target="_blank"
              class="footer-link audiomack-link"
              title="Audiomack"
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
                  ><circle cx="12" cy="12" r="10"></circle><polygon
                    points="10 8 16 12 10 16 10 8"
                  ></polygon></svg
                >
              </span>
              <span class="footer-label">Audiomack</span>
            </a>
            <a
              href="https://soundcloud.com/nishanajihah"
              target="_blank"
              class="footer-link soundcloud-link"
              title="SoundCloud"
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
                  ><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
                  ></path></svg
                >
              </span>
              <span class="footer-label">SoundCloud</span>
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
              href={emailHref}
              target="_blank"
              rel="noopener noreferrer"
              class="footer-link contact-link"
              title="Email"
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
              <span class="footer-label">{emailLabel}</span>
            </a>
          {:else if variant === "code"}
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
              href="https://devpost.com/nishanajihah"
              target="_blank"
              class="footer-link devpost-link"
              title="Devpost"
            >
              <span class="social-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853Z"
                  />
                </svg>
              </span>
              <span class="footer-label">Devpost</span>
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
              href={emailHref}
              target="_blank"
              rel="noopener noreferrer"
              class="footer-link contact-link"
              title="Email"
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
              <span class="footer-label">{emailLabel}</span>
            </a>
          {:else if variant === "music"}
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
              href="https://www.deezer.com/us/artist/153054282"
              target="_blank"
              class="footer-link deezer-link"
              title="Deezer"
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
                  ><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"
                  ></circle><circle cx="18" cy="16" r="3"></circle></svg
                >
              </span>
              <span class="footer-label">Deezer</span>
            </a>
            <a
              href="https://audiomack.com/nisha-najihah"
              target="_blank"
              class="footer-link audiomack-link"
              title="Audiomack"
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
                  ><circle cx="12" cy="12" r="10"></circle><polygon
                    points="10 8 16 12 10 16 10 8"
                  ></polygon></svg
                >
              </span>
              <span class="footer-label">Audiomack</span>
            </a>
            <a
              href="https://soundcloud.com/nishanajihah"
              target="_blank"
              class="footer-link soundcloud-link"
              title="SoundCloud"
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
                  ><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
                  ></path></svg
                >
              </span>
              <span class="footer-label">SoundCloud</span>
            </a>
            <a
              href="https://ko-fi.com/nishanajihah"
              target="_blank"
              class="footer-link kofi-link"
              title="Ko-fi"
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
              href={emailHref}
              target="_blank"
              rel="noopener noreferrer"
              class="footer-link contact-link"
              title="Email"
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
              <span class="footer-label">{emailLabel}</span>
            </a>
          {/if}
        </div>
      </div>

      <!-- COPYRIGHT (RIGHT on desktop) -->
      <div class="footer-copyright">
        <div class="copyright-link">
          <span class="copyright-line"
            >© {new Date().getFullYear()} Nisha Najihah</span
          >
          <span class="copyright-credit">|&nbsp;Developed By Nisha Najihah</span
          >
        </div>
      </div>
    </div>
  </div>

  <!-- Social Popup overlay when clicking "Social" on mobile -->
  {#if isSocialOpen}
    <div
      class="social-popup-overlay"
      transition:fade={{ duration: 200 }}
      on:click|self={() => (isSocialOpen = false)}
      role="button"
      tabindex="0"
      on:keydown={(e) => e.key === "Escape" && (isSocialOpen = false)}
    >
      <div class="social-popup-content">
        <div class="popup-header">
          <h3>DIGITAL PRESENCE</h3>
          <button
            class="close-popup"
            on:click={() => (isSocialOpen = false)}
            aria-label="Close social links">✕</button
          >
        </div>

        <div class="popup-social-grid">
          {#if variant === "home"}
            <a
              href="https://github.com/nishanajihah"
              target="_blank"
              class="popup-link github-link"
              title="GitHub"
            >
              <span class="popup-icon"
                ><svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                  ></path></svg
                ></span
              >
              <span class="link-label">GITHUB</span>
            </a>
            <a
              href="https://devpost.com/nishanajihah"
              target="_blank"
              class="popup-link devpost-link"
              title="Devpost"
            >
              <span class="popup-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853Z"
                  />
                </svg>
              </span>
              <span class="link-label">DEVPOST</span>
            </a>
            <a
              href="https://www.instagram.com/nisha.najihah"
              target="_blank"
              class="popup-link instagram-link"
              title="Instagram"
            >
              <span class="popup-icon"
                ><svg
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
                ></span
              >
              <span class="link-label">INSTAGRAM</span>
            </a>
            <a
              href="https://open.spotify.com/artist/2rI5YRwSaBF0IEwiCN7SEa?si=UCYBvh9dRIyUolcoTZPb9w"
              target="_blank"
              class="popup-link spotify-link"
              title="Spotify"
            >
              <span class="popup-icon"
                ><svg
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
                ></span
              >
              <span class="link-label">SPOTIFY</span>
            </a>
            <a
              href="https://music.apple.com/us/artist/nisha-najihah/1598242580"
              target="_blank"
              class="popup-link apple-link"
              title="Apple Music"
            >
              <span class="popup-icon"
                ><svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"
                  ></path><path d="M16 8v8a2 2 0 1 1-2-2V6l4-2v4h-2z"
                  ></path></svg
                ></span
              >
              <span class="link-label">APPLE MUSIC</span>
            </a>
            <a
              href="https://ko-fi.com/nishanajihah"
              target="_blank"
              class="popup-link kofi-link"
              title="Ko-fi"
            >
              <span class="popup-icon"
                ><svg
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
                ></span
              >
              <span class="link-label">KO-FI</span>
            </a>
            <a
              href="https://www.linkedin.com/in/nisha-najihah"
              target="_blank"
              class="popup-link linkedin-link"
              title="LinkedIn"
            >
              <span class="popup-icon"
                ><svg
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
                ></span
              >
              <span class="link-label">LINKEDIN</span>
            </a>
            <a
              href="https://www.youtube.com/@nisha.najihah"
              target="_blank"
              class="popup-link youtube-link"
              title="YouTube"
            >
              <span class="popup-icon"
                ><svg
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
                ></span
              >
              <span class="link-label">YOUTUBE</span>
            </a>
            <a
              href="https://www.threads.com/@nisha.najihah"
              target="_blank"
              class="popup-link threads-link"
              title="Threads"
            >
              <span class="popup-icon"
                ><svg
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
                ></span
              >
              <span class="link-label">THREADS</span>
            </a>
            <a
              href={emailHref}
              target="_blank"
              rel="noopener noreferrer"
              class="popup-link contact-link"
              title="Contact"
            >
              <span class="popup-icon"
                ><svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  ></path><polyline points="22,6 12,13 2,6"></polyline></svg
                ></span
              >
              <span class="link-label">{emailLabel}</span>
            </a>
          {:else if variant === "code"}
            <!-- CODE VARIANT POPUP -->
            <a
              href="https://www.youtube.com/@nisha.najihah"
              target="_blank"
              class="popup-link youtube-link"
              title="YouTube"
            >
              <span class="popup-icon"
                ><svg
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
                ></span
              >
              <span class="link-label">YOUTUBE</span>
            </a>
            <a
              href="https://ko-fi.com/nishanajihah"
              target="_blank"
              class="popup-link kofi-link"
              title="Ko-fi"
            >
              <span class="popup-icon"
                ><svg
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
                ></span
              >
              <span class="link-label">KO-FI</span>
            </a>
            <a
              href="https://github.com/nishanajihah"
              target="_blank"
              class="popup-link github-link"
              title="GitHub"
            >
              <span class="popup-icon"
                ><svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                  ></path></svg
                ></span
              >
              <span class="link-label">GITHUB</span>
            </a>
            <a
              href="https://devpost.com/nishanajihah"
              target="_blank"
              class="popup-link devpost-link"
              title="Devpost"
            >
              <span class="popup-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853Z"
                  />
                </svg>
              </span>
              <span class="link-label">DEVPOST</span>
            </a>
            <a
              href="https://www.threads.com/@nisha.najihah"
              target="_blank"
              class="popup-link threads-link"
              title="Threads"
            >
              <span class="popup-icon"
                ><svg
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
                ></span
              >
              <span class="link-label">THREADS</span>
            </a>
            <a
              href="https://www.instagram.com/nisha.najihah"
              target="_blank"
              class="popup-link instagram-link"
              title="Instagram"
            >
              <span class="popup-icon"
                ><svg
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
                ></span
              >
              <span class="link-label">INSTAGRAM</span>
            </a>
            <a
              href="https://www.linkedin.com/in/nisha-najihah"
              target="_blank"
              class="popup-link linkedin-link"
              title="LinkedIn"
            >
              <span class="popup-icon"
                ><svg
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
                ></span
              >
              <span class="link-label">LINKEDIN</span>
            </a>
            <a
              href={emailHref}
              target="_blank"
              rel="noopener noreferrer"
              class="popup-link contact-link"
              title="Email"
            >
              <span class="popup-icon"
                ><svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  ></path><polyline points="22,6 12,13 2,6"></polyline></svg
                ></span
              >
              <span class="link-label">{emailLabel}</span>
            </a>
          {:else if variant === "music"}
            <!-- MUSIC VARIANT POPUP -->
            <a
              href="https://open.spotify.com/artist/2rI5YRwSaBF0IEwiCN7SEa?si=UCYBvh9dRIyUolcoTZPb9w"
              target="_blank"
              class="popup-link spotify-link"
              title="Spotify"
            >
              <span class="popup-icon"
                ><svg
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
                ></span
              >
              <span class="link-label">SPOTIFY</span>
            </a>
            <a
              href="https://music.apple.com/us/artist/nisha-najihah/1598242580"
              target="_blank"
              class="popup-link apple-link"
              title="Apple Music"
            >
              <span class="popup-icon"
                ><svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"
                  ></path><path d="M16 8v8a2 2 0 1 1-2-2V6l4-2v4h-2z"
                  ></path></svg
                ></span
              >
              <span class="link-label">APPLE MUSIC</span>
            </a>
            <a
              href="https://www.deezer.com/us/artist/153054282"
              target="_blank"
              class="popup-link deezer-link"
              title="Deezer"
            >
              <span class="popup-icon"
                ><svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"
                  ></circle><circle cx="18" cy="16" r="3"></circle></svg
                ></span
              >
              <span class="link-label">DEEZER</span>
            </a>
            <a
              href="https://audiomack.com/nisha-najihah"
              target="_blank"
              class="popup-link audiomack-link"
              title="Audiomack"
            >
              <span class="popup-icon"
                ><svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><circle cx="12" cy="12" r="10"></circle><polygon
                    points="10 8 16 12 10 16 10 8"
                  ></polygon></svg
                ></span
              >
              <span class="link-label">AUDIOMACK</span>
            </a>
            <a
              href="https://soundcloud.com/nishanajihah"
              target="_blank"
              class="popup-link soundcloud-link"
              title="SoundCloud"
            >
              <span class="popup-icon"
                ><svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
                  ></path></svg
                ></span
              >
              <span class="link-label">SOUNDCLOUD</span>
            </a>
            <a
              href="https://ko-fi.com/nishanajihah"
              target="_blank"
              class="popup-link kofi-link"
              title="Ko-fi"
            >
              <span class="popup-icon"
                ><svg
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
                ></span
              >
              <span class="link-label">KO-FI</span>
            </a>
            <a
              href={emailHref}
              target="_blank"
              rel="noopener noreferrer"
              class="popup-link contact-link"
              title="Email"
            >
              <span class="popup-icon"
                ><svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  ></path><polyline points="22,6 12,13 2,6"></polyline></svg
                ></span
              >
              <span class="link-label">{emailLabel}</span>
            </a>
          {:else if variant === "about"}
            <!-- ABOUT VARIANT POPUP (ALL 12 LINKS) -->
            <a
              href="https://github.com/nishanajihah"
              target="_blank"
              class="popup-link github-link"
              title="GitHub"
            >
              <span class="popup-icon"
                ><svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                  ></path></svg
                ></span
              >
              <span class="link-label">GITHUB</span>
            </a>
            <a
              href="https://devpost.com/nishanajihah"
              target="_blank"
              class="popup-link devpost-link"
              title="Devpost"
            >
              <span class="popup-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853Z"
                  />
                </svg>
              </span>
              <span class="link-label">DEVPOST</span>
            </a>
            <a
              href="https://www.instagram.com/nisha.najihah"
              target="_blank"
              class="popup-link instagram-link"
              title="Instagram"
            >
              <span class="popup-icon"
                ><svg
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
                ></span
              >
              <span class="link-label">INSTAGRAM</span>
            </a>
            <a
              href="https://open.spotify.com/artist/2rI5YRwSaBF0IEwiCN7SEa?si=UCYBvh9dRIyUolcoTZPb9w"
              target="_blank"
              class="popup-link spotify-link"
              title="Spotify"
            >
              <span class="popup-icon"
                ><svg
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
                ></span
              >
              <span class="link-label">SPOTIFY</span>
            </a>
            <a
              href="https://music.apple.com/us/artist/nisha-najihah/1598242580"
              target="_blank"
              class="popup-link apple-link"
              title="Apple Music"
            >
              <span class="popup-icon"
                ><svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"
                  ></path><path d="M16 8v8a2 2 0 1 1-2-2V6l4-2v4h-2z"
                  ></path></svg
                ></span
              >
              <span class="link-label">APPLE MUSIC</span>
            </a>
            <a
              href="https://www.deezer.com/us/artist/153054282"
              target="_blank"
              class="popup-link deezer-link"
              title="Deezer"
            >
              <span class="popup-icon"
                ><svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"
                  ></circle><circle cx="18" cy="16" r="3"></circle></svg
                ></span
              >
              <span class="link-label">DEEZER</span>
            </a>
            <a
              href="https://audiomack.com/nisha-najihah"
              target="_blank"
              class="popup-link audiomack-link"
              title="Audiomack"
            >
              <span class="popup-icon"
                ><svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><circle cx="12" cy="12" r="10"></circle><polygon
                    points="10 8 16 12 10 16 10 8"
                  ></polygon></svg
                ></span
              >
              <span class="link-label">AUDIOMACK</span>
            </a>
            <a
              href="https://soundcloud.com/nishanajihah"
              target="_blank"
              class="popup-link soundcloud-link"
              title="SoundCloud"
            >
              <span class="popup-icon"
                ><svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
                  ></path></svg
                ></span
              >
              <span class="link-label">SOUNDCLOUD</span>
            </a>
            <a
              href="https://ko-fi.com/nishanajihah"
              target="_blank"
              class="popup-link kofi-link"
              title="Ko-fi"
            >
              <span class="popup-icon"
                ><svg
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
                ></span
              >
              <span class="link-label">KO-FI</span>
            </a>
            <a
              href="https://www.linkedin.com/in/nisha-najihah"
              target="_blank"
              class="popup-link linkedin-link"
              title="LinkedIn"
            >
              <span class="popup-icon"
                ><svg
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
                ></span
              >
              <span class="link-label">LINKEDIN</span>
            </a>
            <a
              href="https://www.youtube.com/@nisha.najihah"
              target="_blank"
              class="popup-link youtube-link"
              title="YouTube"
            >
              <span class="popup-icon"
                ><svg
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
                ></span
              >
              <span class="link-label">YOUTUBE</span>
            </a>
            <a
              href="https://www.threads.com/@nisha.najihah"
              target="_blank"
              class="popup-link threads-link"
              title="Threads"
            >
              <span class="popup-icon"
                ><svg
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
                ></span
              >
              <span class="link-label">THREADS</span>
            </a>
            <a
              href={emailHref}
              target="_blank"
              rel="noopener noreferrer"
              class="popup-link contact-link"
              title="Email"
            >
              <span class="popup-icon"
                ><svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  ></path><polyline points="22,6 12,13 2,6"></polyline></svg
                ></span
              >
              <span class="link-label">{emailLabel}</span>
            </a>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</footer>
