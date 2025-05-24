<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  onMount(() => {
    // Initialize animations
    gsap.from('.music-title', {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: '.music-title',
        start: 'top bottom',
        end: 'top center',
        scrub: 1
      }
    });

    gsap.from('.music-grid-item', {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.music-grid',
        start: 'top bottom',
        end: 'center center',
        scrub: 1
      }
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
    <!-- Placeholder for Spotify Albums Grid -->
    {#each Array(6) as _, i}
      <div class="music-grid-item">
        <div class="album-artwork">
          <div class="artwork-placeholder"></div>
        </div>
        <div class="music-info">
          <h3>Album Title {i + 1}</h3>
          <p>Single • 2025</p>
          <button class="like-button">
            <img src="/like-icon-like.svg" alt="Like" />
          </button>
        </div>
      </div>
    {/each}
  </div>

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

  <!-- Music Player (fixed at bottom) -->
  <div class="music-player">
    <div class="player-artwork">
      <div class="artwork-placeholder mini"></div>
    </div>
    <div class="player-info">
      <p class="track-title">Track Name</p>
      <p class="artist-name">Nisha Najihah</p>
    </div>
    <div class="player-controls">
      <button class="control-button">◄◄</button>
      <button class="control-button play">▶</button>
      <button class="control-button">►►</button>
    </div>
    <div class="progress-bar">
      <div class="progress"></div>
    </div>
  </div>
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
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .music-grid-item {
    border-radius: 8px;
    overflow: hidden;
    background: #f8f8f8;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .music-grid-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  .artwork-placeholder {
    aspect-ratio: 1 / 1;
    background: linear-gradient(45deg, #e3e3e3, #f5f5f5);
  }

  .artwork-placeholder.mini {
    width: 60px;
    height: 60px;
  }

  .music-info {
    padding: 1rem;
  }

  .like-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
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

  .music-player {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    border-top: 1px solid #eee;
    padding: 0.5rem 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 100;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }

  .player-info {
    flex: 1;
  }

  .track-title {
    font-weight: bold;
    margin: 0;
  }

  .artist-name {
    font-size: 0.9rem;
    color: #666;
    margin: 0;
  }

  .player-controls {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .control-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
  }

  .control-button.play {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #000;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .progress-bar {
    height: 4px;
    background: #eee;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .progress {
    height: 100%;
    width: 30%;
    background: #000;
  }

  @media (max-width: 768px) {
    .music-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
    
    .music-player {
      padding: 0.5rem 1rem;
    }
  }
</style>
