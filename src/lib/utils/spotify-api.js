/**
 * Spotify API utilities
 */

import { SPOTIFY_CONFIG } from './env.js';

// Spotify API endpoints
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/api/token';

// Spotify credentials from environment variables
const CLIENT_ID = SPOTIFY_CONFIG.clientId;
const CLIENT_SECRET = SPOTIFY_CONFIG.clientSecret;
const ARTIST_ID = SPOTIFY_CONFIG.artistId;

/**
 * Fetch an access token from Spotify
 * @returns {Promise<string>} Access token
 */
async function getAccessToken() {
  try {
    const authString = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    const response = await fetch(SPOTIFY_AUTH_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error fetching Spotify token:', error);
    return null;
  }
}

/**
 * Get artist data by artist ID
 * @param {string} artistId - Spotify artist ID (defaults to configured artist)
 * @returns {Promise<Object|null>} Artist data or null on error
 */
export async function getArtist(artistId = ARTIST_ID) {
  try {
    const token = await getAccessToken();
    if (!token) return null;

    const response = await fetch(`${SPOTIFY_API_BASE}/artists/${artistId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching artist data:', error);
    return null;
  }
}

/**
 * Get artist's albums
 * @param {string} artistId - Spotify artist ID (defaults to configured artist)
 * @returns {Promise<Array|null>} Albums array or null on error
 */
export async function getArtistAlbums(artistId = ARTIST_ID) {
  try {
    const token = await getAccessToken();
    if (!token) return null;

    const response = await fetch(`${SPOTIFY_API_BASE}/artists/${artistId}/albums?include_groups=album,single,appears_on&limit=50`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching artist albums:', error);
    return null;
  }
}

/**
 * Get album details including tracks
 * @param {string} albumId - Spotify album ID
 * @returns {Promise<Object|null>} Album data or null on error
 */
export async function getAlbum(albumId) {
  try {
    const token = await getAccessToken();
    if (!token) return null;

    const response = await fetch(`${SPOTIFY_API_BASE}/albums/${albumId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching album data:', error);
    return null;
  }
}

/**
 * Get track preview
 * @param {string} trackId - Spotify track ID
 * @returns {Promise<Object|null>} Track data with preview URL or null on error
 */
export async function getTrackPreview(trackId) {
  try {
    const token = await getAccessToken();
    if (!token) return null;

    const response = await fetch(`${SPOTIFY_API_BASE}/tracks/${trackId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching track preview:', error);
    return null;
  }
}

/**
 * For development: Use mock data when real API isn't available
 * @returns {Array} Mock album data
 */
export function getMockAlbums() {
  return [
    {
      id: 'album1',
      name: 'Moonlight Sonata',
      type: 'single',
      release_date: '2025-01-15',
      images: [{ url: '/static/images/albums/album1.jpg' }],
      artists: [{ name: 'Nisha Najihah' }],
      external_urls: {
        spotify: 'https://open.spotify.com'
      }
    },
    {
      id: 'album2',
      name: 'Urban Dreams',
      type: 'album',
      release_date: '2024-08-30',
      images: [{ url: '/static/images/albums/album2.jpg' }],
      artists: [{ name: 'Nisha Najihah' }],
      external_urls: {
        spotify: 'https://open.spotify.com'
      }
    },
    {
      id: 'album3',
      name: 'Digital Echo',
      type: 'single',
      release_date: '2024-05-12',
      images: [{ url: '/static/images/albums/album3.jpg' }],
      artists: [{ name: 'Nisha Najihah' }],
      external_urls: {
        spotify: 'https://open.spotify.com'
      }
    },
    {
      id: 'album4',
      name: 'Neon Nights',
      type: 'EP',
      release_date: '2023-11-05',
      images: [{ url: '/static/images/albums/album4.jpg' }],
      artists: [{ name: 'Nisha Najihah' }],
      external_urls: {
        spotify: 'https://open.spotify.com'
      }
    }
  ];
}
