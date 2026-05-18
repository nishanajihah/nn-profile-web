<script lang="ts">
  import { onMount, tick } from "svelte";
  import type { PageData } from "./$types";
  import TrackCard from "$lib/components/music/TrackCard.svelte";
  import VinylRecord from "$lib/components/music/VinylRecord.svelte";
  import Navigation from "$lib/components/Navigation.svelte";

  export let data: PageData;

  let tracks = data.tracks || [];
  let collabTracks = data.collabTracks || [];
  let artist = data.artist;
  let isMockData = data.isMockData;
  let errorMessage = data.errorMessage;

  let currentTrack: any = null;
  let isPlaying = false;
  let showSpotifyEmbed = false;
  let spotifyEmbedUrl = "";
  let isSocialOpen = false;

  // Fallback audio for local/mock preview URLs
  let audio: HTMLAudioElement;

  async function handlePlay(event: CustomEvent) {
    const track = event.detail;

    if (currentTrack?.id === track.id) {
      isPlaying = !isPlaying;
      if (
        audio &&
        track.previewUrl &&
        !track.spotifyUrl?.includes("spotify.com/track/")
      ) {
        if (isPlaying) audio.play();
        else audio.pause();
      }
    } else {
      currentTrack = track;
      isPlaying = true;

      // Check if it's a real Spotify track
      if (!isMockData && track.id) {
        // Generate embed URL
        spotifyEmbedUrl = `https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0&autoplay=1`;
        showSpotifyEmbed = true;
        if (audio) audio.pause();
      } else if (track.previewUrl) {
        // Mock data with a preview URL
        showSpotifyEmbed = false;
        await tick();
        if (audio) {
          audio.src = track.previewUrl;
          audio.play().catch((e) => console.error("Audio play failed", e));
        }
      } else {
        // Pure mock without audio
        showSpotifyEmbed = false;
        if (audio) audio.pause();
      }
    }
  }

  function togglePlayState() {
    isPlaying = !isPlaying;
    if (audio && currentTrack?.previewUrl) {
      if (isPlaying) audio.play();
      else audio.pause();
    }
  }

  function closePlayer() {
    isPlaying = false;
    currentTrack = null;
    showSpotifyEmbed = false;
    if (audio) audio.pause();
  }

  // Artist images fallback
  const heroImage =
    artist?.images?.[0]?.url ||
    "https://images.unsplash.com/photo-1516280440502-86927d2c0b78?auto=format&fit=crop&q=80&w=1920";

  onMount(() => {
    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const heroBg = document.querySelector(".hero-bg") as HTMLElement;
      if (heroBg) {
        heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<svelte:head>
  <title>{artist?.name || "Music"} | Profile</title>
  <meta
    name="description"
    content="Official artist page for {artist?.name || 'Nisha Najihah'}"
  />
</svelte:head>

<div class="artist-page">
  <!-- Global Navigation -->
  <Navigation />

  <!-- Hero Section -->
  <section class="artist-hero">
    <div class="hero-bg-container">
      <img src={heroImage} alt={artist?.name} class="hero-bg" />
    </div>

    <div class="hero-content">
      <div class="marquee-container">
        <div class="marquee">
          <span>{artist?.name || "NISHA NAJIHAH"}</span>
          <span>{artist?.name || "NISHA NAJIHAH"}</span>
          <span>{artist?.name || "NISHA NAJIHAH"}</span>
        </div>
      </div>
      <h1 class="hero-title-overlay">{artist?.name || "NISHA NAJIHAH"}</h1>
    </div>
  </section>

  <!-- Stream Banner -->
  <section class="stream-banner">
    <div class="stream-container">
      <span class="stream-label">LISTEN ON</span>
      <div class="stream-links">
        <a
          href="https://open.spotify.com/artist/2rI5YRwSaBF0IEwiCN7SEa"
          target="_blank"
          class="stream-btn"
          title="Spotify"
        >
          <svg
            width="24"
            height="24"
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
          <span class="stream-name">Spotify</span>
        </a>
        <a
          href="https://music.apple.com/us/artist/nisha-najihah/1598242580"
          target="_blank"
          class="stream-btn"
          title="Apple Music"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path><path
              d="M16 8v8a2 2 0 1 1-2-2V6l4-2v4h-2z"
            ></path></svg
          >
          <span class="stream-name">Apple Music</span>
        </a>
        <a
          href="https://www.youtube.com/@nisha.najihah"
          target="_blank"
          class="stream-btn"
          title="YouTube"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path
              d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
            ></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
            ></polygon></svg
          >
          <span class="stream-name">YouTube</span>
        </a>
        <a
          href="https://www.deezer.com/us/artist/153054282"
          target="_blank"
          class="stream-btn"
          title="Deezer"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"
            ></circle><circle cx="18" cy="16" r="3"></circle></svg
          >
          <span class="stream-name">Deezer</span>
        </a>
        <a
          href="https://audiomack.com/nisha-najihah"
          target="_blank"
          class="stream-btn"
          title="Audiomack"
        >
          <svg
            width="24"
            height="24"
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
          <span class="stream-name">Audiomack</span>
        </a>
        <a
          href="https://soundcloud.com/nishanajihah"
          target="_blank"
          class="stream-btn"
          title="SoundCloud"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
            ></path></svg
          >
          <span class="stream-name">SoundCloud</span>
        </a>
      </div>
    </div>
  </section>

  <!-- Error notice -->
  {#if errorMessage}
    <div class="container" style="margin-top: 2rem;">
      <div
        class="notification is-danger is-light"
        style="max-width: 600px; margin: 0 auto; border-radius: 8px; text-align: center;"
      >
        <p>
          <strong>Note:</strong> Currently in demo mode. Connect Spotify API for
          real data. ({errorMessage})
        </p>
      </div>
    </div>
  {/if}

  <!-- Discography Sticky Layout -->
  <div class="discography-layout">
    <!-- Vertical Sidebar Title -->
    <aside class="disco-sidebar">
      <div class="vertical-wrapper">
        <h2 class="creative-title" data-text="DISCOGRAPHY">DISCOGRAPHY</h2>
        <p class="creative-subtitle">Nisha Najihah Music</p>
      </div>
    </aside>

    <!-- Main Tracks Content -->
    <div class="disco-content">
      <!-- Discography Section (Signature Tracks) -->
      <section class="discography-section">
        <h3 class="section-subtitle">Signature <span>Tracks</span></h3>

        {#if tracks.length > 0}
          <div class="album-grid">
            {#each tracks as track}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-interactive-supports-focus -->
              <div
                class="album-card {currentTrack?.id === track.id && isPlaying
                  ? 'is-playing'
                  : ''}"
                role="button"
                on:click={() =>
                  handlePlay(new CustomEvent("play", { detail: track }))}
              >
                <div class="album-art-wrapper">
                  <img
                    src={track.albumImageUrl}
                    alt={track.album}
                    loading="lazy"
                  />
                </div>
                <div class="album-info">
                  <h3 title={track.name}>{track.name}</h3>
                  <p title={track.album}>{track.album}</p>
                </div>
              </div>
            {/each}
          </div>
        {:else}
          <div style="text-align: center; color: rgba(255,255,255,0.5);">
            <p>No tracks found for this artist.</p>
          </div>
        {/if}
      </section>

      <!-- Collaborations Section -->
      {#if collabTracks.length > 0}
        <section class="discography-section" style="padding-top: 0;">
          <h3 class="section-subtitle">Featured <span>Collaborations</span></h3>

          <div class="album-grid">
            {#each collabTracks as track}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-interactive-supports-focus -->
              <div
                class="album-card {currentTrack?.id === track.id && isPlaying
                  ? 'is-playing'
                  : ''}"
                role="button"
                on:click={() =>
                  handlePlay(new CustomEvent("play", { detail: track }))}
              >
                <div class="album-art-wrapper">
                  <img
                    src={track.albumImageUrl}
                    alt={track.album}
                    loading="lazy"
                  />
                </div>
                <div class="album-info">
                  <h3 title={track.name}>{track.name}</h3>
                  <p title={track.artists} style="color: #ffde21;">
                    {track.artists}
                  </p>
                </div>
              </div>
            {/each}
          </div>
        </section>
      {/if}
    </div>
  </div>

  <!-- Real Spotify Embed Player -->
  <div class="spotify-embed-container {showSpotifyEmbed ? 'visible' : ''}">
    {#if showSpotifyEmbed}
      <button
        class="close-embed"
        aria-label="Close embed"
        on:click={closePlayer}>&times;</button
      >
      <iframe
        title="Spotify Music Player"
        src={spotifyEmbedUrl}
        width="100%"
        height="152"
        frameBorder="0"
        allowfullscreen={false}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      >
      </iframe>
    {/if}
  </div>

  <!-- Fallback Global Player for Mock/Local Audio -->
  {#if currentTrack && !showSpotifyEmbed}
    <div class="global-player visible">
      <img
        src={currentTrack.albumImageUrl}
        alt="Cover"
        class="player-cover {!isPlaying ? 'paused' : ''}"
      />

      <div class="player-info">
        <h4>{currentTrack.name}</h4>
        <p>{currentTrack.artists}</p>
      </div>

      <div class="player-controls">
        <button aria-label="Toggle Play" on:click={togglePlayState}>
          {#if isPlaying}
            <svg viewBox="0 0 24 24" fill="currentColor"
              ><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg
            >
          {:else}
            <svg viewBox="0 0 24 24" fill="currentColor"
              ><path d="M8 5v14l11-7z" /></svg
            >
          {/if}
        </button>
      </div>

      <button
        class="close-player"
        aria-label="Close player"
        on:click={closePlayer}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"
          ><path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          /></svg
        >
      </button>
    </div>
  {/if}

  <audio bind:this={audio} on:ended={() => (isPlaying = false)}></audio>

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
              on:click={() => (isSocialOpen = !isSocialOpen)}
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
            <a href="/terms-and-conditions" class="terms-link">
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
              href="https://open.spotify.com/artist/2rI5YRwSaBF0IEwiCN7SEa"
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
              href="mailto:nishanajihah88@gmail.com"
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
              <span class="footer-label">Email</span>
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
          </div>
        </div>

        <!-- Copyright Text (RIGHT on desktop) -->
        <div class="footer-copyright">
          <div class="copyright-link">
            <span class="copyright-line"
              >© {new Date().getFullYear()} Nisha Najihah</span
            >
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- Mobile Social Popup (Mirrored from Homepage) -->
  {#if isSocialOpen}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="social-popup-overlay" on:click={() => (isSocialOpen = false)}>
      <div
        class="social-popup-content"
        role="dialog"
        tabindex="-1"
        aria-modal="true"
        aria-labelledby="social-popup-title"
        on:click={(e) => e.stopPropagation()}
      >
        <div class="popup-header">
          <h3 id="social-popup-title">Social Connect</h3>
          <button
            class="close-popup"
            aria-label="Close"
            on:click={() => (isSocialOpen = false)}>&times;</button
          >
        </div>
        <div class="popup-social-grid">
          <a
            href="https://open.spotify.com/artist/2rI5YRwSaBF0IEwiCN7SEa"
            target="_blank"
            class="popup-link spotify-link"
            title="Spotify"
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
            href="https://www.youtube.com/@nisha.najihah"
            target="_blank"
            class="popup-link youtube-link"
            title="YouTube"
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
            href="mailto:nishanajihah88@gmail.com"
            class="popup-link contact-link"
            title="Email"
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
            <span class="link-label">Email</span>
          </a>
          <a
            href="https://www.instagram.com/nisha.najihah"
            target="_blank"
            class="popup-link instagram-link"
            title="Instagram"
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
            href="https://www.threads.com/@nisha.najihah"
            target="_blank"
            class="popup-link threads-link"
            title="Threads"
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
            href="https://music.apple.com/us/artist/nisha-najihah/1598242580"
            target="_blank"
            class="popup-link apple-link"
            title="Apple Music"
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
            href="https://www.deezer.com/us/artist/153054282"
            target="_blank"
            class="popup-link deezer-link"
            title="Deezer"
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
                ><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"
                ></circle><circle cx="18" cy="16" r="3"></circle></svg
              >
            </span>
            <span class="link-label">Deezer</span>
          </a>
          <a
            href="https://audiomack.com/nisha-najihah"
            target="_blank"
            class="popup-link audiomack-link"
            title="Audiomack"
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
                ><circle cx="12" cy="12" r="10"></circle><polygon
                  points="10 8 16 12 10 16 10 8"
                ></polygon></svg
              >
            </span>
            <span class="link-label">Audiomack</span>
          </a>
          <a
            href="https://soundcloud.com/nishanajihah"
            target="_blank"
            class="popup-link soundcloud-link"
            title="SoundCloud"
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
                ><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
                ></path></svg
              >
            </span>
            <span class="link-label">SoundCloud</span>
          </a>
          <a
            href="https://ko-fi.com/nishanajihah"
            target="_blank"
            class="popup-link kofi-link"
            title="Ko-fi"
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
        </div>
      </div>
    </div>
  {/if}
</div>

<style lang="scss" global>
  @use "../../lib/styles/music.scss";
</style>
