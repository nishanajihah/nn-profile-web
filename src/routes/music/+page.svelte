<script lang="ts">
  import { onMount, tick } from "svelte";
  import type { PageData } from "./$types";
  import Navigation from "$lib/components/Navigation.svelte";
  import Footer from "$lib/components/Footer.svelte";

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
  <title>{artist?.name || "Music"} | Official Artist Profile</title>
  <meta
    name="description"
    content="Official artist page for {artist?.name || 'Nisha Najihah'}"
  />
</svelte:head>

<div class="artist-page">
  <!-- Global Navigation -->
  <Navigation variant="home" />

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

  <Footer variant="music" />
</div>

<style lang="scss" global>
  @use "../../lib/styles/music.scss";
</style>
