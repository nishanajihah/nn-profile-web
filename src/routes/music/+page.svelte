<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { getArtistAlbums, getMockAlbums } from '$lib/utils/spotify-api.js';
  import { playTrack } from '$lib/stores/audioPlayer.js';
  import MusicPlayer from '$lib/components/MusicPlayer.svelte';
  import { fadeInOnScroll } from '$lib/animations';
  
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);
  
  // Album data
  let albums = [];
  let isLoading = true;
  let error = null;
  
  // Selected album for expanded view
  let selectedAlbum = null;
  
  // Toggle expanded album view
  function toggleAlbumDetails(album) {
    selectedAlbum = selectedAlbum === album ? null : album;
  }
  
  // Play track function
  function handlePlayTrack(album) {
    // In a real implementation, this would use the actual preview URL from Spotify
    const trackInfo = {
      id: album.id,
      title: album.name,
      artist: album.artists[0].name,
      artwork: album.images[0]?.url || '/static/images/logos/spotify-icon.png',
      // Mock preview URL - in real app would be album.preview_url
      previewUrl: 'https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb5a3f1bbd30c09bb8c9',
    };
    
    playTrack(trackInfo);
  }

  async function loadAlbums() {
    try {
      // Try to fetch real album data
      const realAlbums = await getArtistAlbums();
      
      if (realAlbums && !realAlbums.error && realAlbums.length > 0) {
        albums = realAlbums;
      } else {
        // Fall back to mock data if API call fails
        console.warn('Falling back to mock Spotify data');
        albums = getMockAlbums();
      }
    } catch (err) {
      console.error('Error loading albums:', err);
      error = 'Failed to load music. Please try again later.';
      
      // Fall back to mock data on error
      albums = getMockAlbums();
    } finally {
      isLoading = false;
    }
  }

  onMount(async () => {
    // Load album data
    await loadAlbums();
    
    // Initialize animations using our animation utility
    fadeInOnScroll('.music-title', {
      y: 50,
      duration: 1,
    });
    
    fadeInOnScroll('.music-grid-item', {
      y: 30,
      stagger: 0.1,
      duration: 0.8,
    });
  });
</script>

<svelte:head>
  <title>Music | Nisha Najihah</title>
  <meta name="description" content="Music portfolio of Nisha Najihah - singer-songwriter and producer" />
</svelte:head>

<section class="music-container">
  <h1 class="music-title">My Music</h1>
    <div class="music-grid">
    {#if albums.length > 0}
      {#each albums as album}
        <div 
          class="music-grid-item" 
          onclick={() => toggleAlbumDetails(album)}
          class:active={selectedAlbum === album}
        >
          <div class="album-artwork">
            {#if album.images && album.images[0]}
              <img src={album.images[0].url} alt={album.name} />
            {:else}
              <div class="artwork-placeholder"></div>
            {/if}
            
            <button 
              class="play-button" 
              onclick|stopPropagation={() => handlePlayTrack(album)}
              aria-label="Play"
            >
              <span>▶</span>
            </button>
          </div>
          
          <div class="music-info">
            <h3>{album.name}</h3>
            <p>{album.type} • {new Date(album.release_date).getFullYear()}</p>
            <button class="like-button">
              <img src="/images/icons/like-icon.svg" alt="Like" />
            </button>
          </div>
        </div>
      {/each}
    {:else}
      <div class="loading-message">Loading music catalog...</div>
    {/if}
  </div>
  
  {#if selectedAlbum}
    <div class="album-detail-overlay" on:click={() => selectedAlbum = null}>
      <div class="album-details" on:click|stopPropagation>
        <button class="close-button" on:click={() => selectedAlbum = null}>×</button>
        
        <div class="detail-container">
          <div class="detail-artwork">
            {#if selectedAlbum.images && selectedAlbum.images[0]}
              <img src={selectedAlbum.images[0].url} alt={selectedAlbum.name} />
            {:else}
              <div class="artwork-placeholder large"></div>
            {/if}
          </div>
          
          <div class="detail-info">
            <h2>{selectedAlbum.name}</h2>
            <p class="album-type">{selectedAlbum.type}</p>
            <p class="album-artist">{selectedAlbum.artists[0].name}</p>
            <p class="album-date">Released: {new Date(selectedAlbum.release_date).toLocaleDateString()}</p>
            
            <div class="album-actions">
              <button 
                class="action-button play"
                on:click={() => handlePlayTrack(selectedAlbum)}
              >
                Play
              </button>
              <a 
                href={selectedAlbum.external_urls.spotify} 
                target="_blank" 
                rel="noopener noreferrer"
                class="action-button spotify"
              >
                Open in Spotify
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <div class="music-process">
    <h2>My Creative Process</h2>
    <p>This is where I'll share insights into how I create my music...</p>
    <!-- More content about music process will be added later -->
  </div>

  <div class="collaboration">
    <h2>Let's Collaborate</h2>
    <p>Interested in collaborating? Get in touch!</p>
    <form class="collab-form">
      <input type="text" placeholder="Your Name" />
      <input type="email" placeholder="Your Email" />
      <textarea placeholder="Tell me about your project idea"></textarea>
      <button type="submit">Send</button>
    </form>
  </div>
  <!-- Music Player Component -->
  <MusicPlayer />
</section>

<style>
  .music-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem 7rem 1rem;
  }

  .music-title {
    font-size: 3rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .music-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .music-grid-item {
    border-radius: 8px;
    overflow: hidden;
    background: #f8f8f8;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    position: relative;
  }

  .music-grid-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
  
  .music-grid-item.active {
    transform: scale(0.97);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .album-artwork {
    aspect-ratio: 1 / 1;
    position: relative;
    overflow: hidden;
  }
  
  .album-artwork img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .music-grid-item:hover .album-artwork img {
    transform: scale(1.05);
  }

  .artwork-placeholder {
    aspect-ratio: 1 / 1;
    background: linear-gradient(45deg, #e3e3e3, #f5f5f5);
  }
  
  .artwork-placeholder.large {
    width: 100%;
    height: 300px;
  }
  
  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.8);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  .music-grid-item:hover .play-button {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  
  .play-button:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: translate(-50%, -50%) scale(1.1);
  }

  .music-info {
    padding: 1rem;
  }
  
  .music-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .music-info p {
    margin: 0 0 0.5rem 0;
    color: #666;
    font-size: 0.9rem;
  }

  .like-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }
  
  .like-button:hover {
    opacity: 1;
  }
  
  .like-button img {
    width: 20px;
    height: 20px;
  }

  .music-process, .collaboration {
    margin-bottom: 4rem;
  }

  .collab-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 600px;
  }

  .collab-form input, .collab-form textarea, .collab-form button {
    padding: 0.75rem 1rem;
    border-radius: 4px;
    border: 1px solid #ddd;
  }

  .collab-form textarea {
    min-height: 150px;
  }

  .collab-form button {
    background: #000;
    color: white;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s ease;
  }

  .collab-form button:hover {
    background: #333;
  }
  
  /* Album detail overlay */
  .album-detail-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
  }
  
  .album-details {
    background: white;
    border-radius: 8px;
    max-width: 900px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.3s ease;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 2rem;
    line-height: 1;
    cursor: pointer;
    z-index: 10;
  }
  
  .detail-container {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2rem;
    padding: 2rem;
  }
  
  .detail-artwork {
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .detail-artwork img {
    width: 100%;
    display: block;
  }
  
  .detail-info h2 {
    margin-top: 0;
    font-size: 2rem;
  }
  
  .album-type {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    background: #f0f0f0;
    border-radius: 4px;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  .album-artist {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  .album-date {
    color: #666;
    margin-bottom: 2rem;
  }
  
  .album-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .action-button {
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: bold;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    transition: background 0.3s ease;
    text-align: center;
  }
  
  .action-button.play {
    background: #000;
    color: white;
    border: none;
  }
  
  .action-button.play:hover {
    background: #333;
  }
  
  .action-button.spotify {
    background: #1DB954;
    color: white;
  }
  
  .action-button.spotify:hover {
    background: #1aa34a;
  }
  
  .loading-message {
    grid-column: 1 / -1;
    text-align: center;
    padding: 2rem;
    color: #666;
  }

  @media (max-width: 768px) {
    .music-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
    
    .detail-container {
      grid-template-columns: 1fr;
    }
    
    .detail-artwork {
      max-width: 300px;
      margin: 0 auto;
    }
  }
</style>
