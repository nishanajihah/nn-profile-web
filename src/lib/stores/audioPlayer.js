import { writable } from 'svelte/store';
import * as Tone from 'tone';

// Create audio player
let player;

// Create stores for player state
export const currentTrack = writable(null);
export const isPlaying = writable(false);
export const duration = writable(0);
export const currentTime = writable(0);

// Initialize Tone player
export function initializePlayer() {
  if (!player) {
    player = new Tone.Player({
      url: '',
      autostart: false,
      onload: () => {
        duration.set(player.buffer.duration);
      }
    }).toDestination();
    
    // Update current time while playing
    Tone.Transport.scheduleRepeat(() => {
      if (player && player.state === 'started') {
        currentTime.set(player.now() - player.state.offset);
      }
    }, 0.1);
  }
  
  return player;
}

/**
 * Load and play a track
 * @param {Object} track - Track object with url, title, artist, artwork
 */
export async function playTrack(track) {
  try {
    // Ensure Tone.js is initialized (needed due to autoplay restrictions)
    await Tone.start();
    
    if (!player) {
      player = initializePlayer();
    }
    
    // If we're already playing this track, just toggle play/pause
    let currentTrackValue;
    currentTrack.subscribe(value => {
      currentTrackValue = value;
    })();
    
    if (currentTrackValue && currentTrackValue.id === track.id) {
      togglePlayPause();
      return;
    }
    
    // Otherwise, load and play the new track
    currentTrack.set(track);
    
    // Stop current playback
    if (player.state === 'started') {
      player.stop();
    }
    
    // Load new track
    player.load(track.previewUrl || track.url).then(() => {
      duration.set(player.buffer.duration);
      player.start();
      isPlaying.set(true);
    });
  } catch (error) {
    console.error('Error playing track:', error);
  }
}

/**
 * Toggle between play and pause
 */
export function togglePlayPause() {
  if (!player) return;
  
  if (player.state === 'started') {
    player.pause();
    isPlaying.set(false);
  } else {
    player.start();
    isPlaying.set(true);
  }
}

/**
 * Stop playback
 */
export function stopPlayback() {
  if (!player) return;
  
  player.stop();
  isPlaying.set(false);
  currentTime.set(0);
}

/**
 * Seek to a specific time in the track
 * @param {number} time - Time in seconds
 */
export function seekTo(time) {
  if (!player || !player.buffer) return;
  
  const seekTime = Math.min(Math.max(time, 0), player.buffer.duration);
  
  if (player.state === 'started') {
    player.stop();
    player.start("+0.1", seekTime);
  } else {
    currentTime.set(seekTime);
    player.position = seekTime;
  }
}
