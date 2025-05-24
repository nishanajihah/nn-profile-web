/**
 * Environment variables utility
 */

// Function to safely access environment variables in both server and client
export function getEnv(key, fallback = '') {
  // Check if we're in the browser
  if (typeof window !== 'undefined' && window.__env && window.__env[key]) {
    return window.__env[key];
  }
  
  // Check for Vite environment variables
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  
  // Check for Node.js environment variables
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  
  // Return fallback if not found
  return fallback;
}

// Specific environment variables
export const SPOTIFY_CONFIG = {
  clientId: getEnv('VITE_SPOTIFY_CLIENT_ID', ''),
  clientSecret: getEnv('VITE_SPOTIFY_CLIENT_SECRET', ''),
  artistId: getEnv('VITE_SPOTIFY_ARTIST_ID', '')
};

export const GITHUB_CONFIG = {
  username: getEnv('VITE_GITHUB_USERNAME', 'nishanajihah')
};
