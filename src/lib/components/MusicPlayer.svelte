<script>
  import { onMount, onDestroy } from 'svelte';
  import { currentTrack, isPlaying, duration, currentTime, playTrack, togglePlayPause, seekTo, stopPlayback } from '$lib/stores/audioPlayer.js';
  
  // Format time in seconds to mm:ss format
  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }
  
  // Track progress as percentage
  $: progress = $duration > 0 ? ($currentTime / $duration) * 100 : 0;
  
  // Handle progress bar click
  function handleProgressClick(event) {
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const percentage = clickPosition / rect.width;
    const newTime = percentage * $duration;
    seekTo(newTime);
  }
  
  // Component unmount cleanup
  onDestroy(() => {
    stopPlayback();
  });
</script>

<div class="music-player" class:visible={$currentTrack !== null}>
  <div class="player-artwork">
    {#if $currentTrack?.artwork}
      <img src={$currentTrack.artwork} alt={$currentTrack?.title || 'Album artwork'} />
    {:else}
      <div class="artwork-placeholder"></div>
    {/if}
  </div>
  
  <div class="player-info">
    <p class="track-title">{$currentTrack?.title || 'No track selected'}</p>
    <p class="artist-name">{$currentTrack?.artist || 'Artist'}</p>
  </div>
  
  <div class="player-controls">
    <button class="control-button prev" aria-label="Previous track" disabled>◄◄</button>
    
    <button 
      class="control-button play-pause" 
      on:click={togglePlayPause} 
      aria-label={$isPlaying ? 'Pause' : 'Play'}
      disabled={!$currentTrack}
    >
      {#if $isPlaying}
        <span>❚❚</span>
      {:else}
        <span>▶</span>
      {/if}
    </button>
    
    <button class="control-button next" aria-label="Next track" disabled>►►</button>
  </div>
  
  <div class="time-display">
    <span class="current-time">{formatTime($currentTime)}</span>
    <span class="duration">{formatTime($duration)}</span>
  </div>
  
  <div class="progress-container" onclick={handleProgressClick}>
    <div class="progress-bar">
      <div class="progress" style="width: {progress}%"></div>
    </div>
  </div>
</div>

<style>
  .music-player {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(5px);
    border-top: 1px solid #eee;
    padding: 0.75rem 2rem;
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    grid-template-areas: 
      "artwork info controls time"
      "progress progress progress progress";
    align-items: center;
    gap: 1rem;
    z-index: 100;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }
  
  .music-player.visible {
    transform: translateY(0);
  }

  .player-artwork {
    grid-area: artwork;
    width: 60px;
    height: 60px;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .player-artwork img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .artwork-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #e3e3e3, #f5f5f5);
  }

  .player-info {
    grid-area: info;
    flex: 1;
    overflow: hidden;
  }

  .track-title {
    font-weight: bold;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .artist-name {
    font-size: 0.9rem;
    color: #666;
    margin: 0;
  }

  .player-controls {
    grid-area: controls;
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .control-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    opacity: 0.8;
    transition: opacity 0.2s ease;
  }
  
  .control-button:hover:not(:disabled) {
    opacity: 1;
  }
  
  .control-button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .control-button.play-pause {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #000;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .time-display {
    grid-area: time;
    font-size: 0.8rem;
    color: #666;
    display: flex;
    gap: 0.5rem;
  }

  .progress-container {
    grid-area: progress;
    cursor: pointer;
    padding: 0.5rem 0;
  }

  .progress-bar {
    height: 4px;
    background: #eee;
    width: 100%;
    overflow: hidden;
    border-radius: 2px;
  }

  .progress {
    height: 100%;
    background: #000;
    transition: width 0.1s linear;
  }
  
  @media (max-width: 768px) {
    .music-player {
      grid-template-columns: auto 1fr auto;
      grid-template-areas: 
        "artwork info controls"
        "progress progress progress"
        "time time time";
      padding: 0.75rem 1rem;
    }
    
    .time-display {
      justify-content: space-between;
      width: 100%;
      padding-top: 0.25rem;
    }
  }

  @media (max-width: 480px) {
    .player-artwork {
      width: 50px;
      height: 50px;
    }
    
    .control-button.play-pause {
      width: 36px;
      height: 36px;
      font-size: 0.8rem;
    }
  }
</style>
