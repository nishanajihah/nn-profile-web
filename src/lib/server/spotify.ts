import { env } from '$env/dynamic/private';

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

let cachedToken: string | null = null;
let tokenExpiresAt: number = 0;

/**
 * Retrieves a Spotify Access Token using the Client Credentials Flow.
 * Implements token caching to avoid requesting a new token for every API call.
 */
async function getAccessToken(customFetch?: typeof fetch): Promise<string> {
    const clientId = env.SPOTIFY_CLIENT_ID;
    const clientSecret = env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error('Spotify credentials not found. Please set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET.');
    }

    // Return cached token if valid
    if (cachedToken && Date.now() < tokenExpiresAt) {
        return cachedToken;
    }

    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    
    const fetchFn = customFetch || globalThis.fetch;
    const response = await fetchFn(SPOTIFY_TOKEN_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${basicAuth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ grant_type: 'client_credentials' })
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch Spotify token: ${response.statusText}`);
    }

    const data = await response.json();
    cachedToken = data.access_token;
    // Expires in gives seconds. Set expiry to 5 minutes before actual expiry for safety.
    tokenExpiresAt = Date.now() + (data.expires_in - 300) * 1000;
    
    return cachedToken as string;
}

/**
 * Helper to fetch data from Spotify Web API with error handling and retry logic.
 */
async function fetchSpotifyApi(endpoint: string, customFetch?: typeof fetch) {
    const fetchFn = customFetch || globalThis.fetch;
    const token = await getAccessToken(fetchFn);
    const url = `${SPOTIFY_API_BASE}${endpoint}`;

    let response = await fetchFn(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    // Handle rate limits (429)
    if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : 5000;
        console.warn(`Spotify API rate limit hit. Retrying after ${waitTime}ms...`);
        
        await new Promise(resolve => setTimeout(resolve, waitTime));
        
        // Retry once
        response = await fetchFn(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    if (!response.ok) {
        let errMsg = `Spotify API error: ${response.status} ${response.statusText}`;
        try {
            const errData = await response.json();
            if (errData.error?.message) {
                errMsg += ` - ${errData.error.message}`;
            }
        } catch {
            // Fallback if not JSON
            try {
                const txt = await response.text();
                if (txt) errMsg += ` - ${txt}`;
            } catch {}
        }
        throw new Error(errMsg);
    }

    return response.json();
}

/**
 * Fetch artist details and top tracks for an artist.
 */
export async function getArtistData(artistName: string = 'Nisha Najihah', customFetch?: typeof fetch) {
    try {
        // Step 1: Search for the artist
        const searchResult = await fetchSpotifyApi(`/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`, customFetch);
        
        const artist = searchResult?.artists?.items?.[0];
        if (!artist) {
            console.warn(`Artist '${artistName}' not found on Spotify. Returning empty data.`);
            return { artist: null, tracks: [] };
        }

        // Step 2: Get artist's top tracks
        const topTracksResult = await fetchSpotifyApi(`/artists/${artist.id}/top-tracks?market=US`, customFetch);
        let rawOwnTracks = topTracksResult.tracks || [];
        let rawCollabTracks = [];

        // Step 3: Search for tracks featuring the artist
        try {
            const featureSearchResult = await fetchSpotifyApi(`/search?q=${encodeURIComponent(artist.name)}&type=track&limit=15`, customFetch);
            rawCollabTracks = featureSearchResult?.tracks?.items?.filter((t: any) => 
                t.artists.some((a: any) => a.id === artist.id) && !rawOwnTracks.some((existing: any) => existing.id === t.id)
            ) || [];
        } catch (e) {
            console.warn("Failed to fetch featured tracks.");
        }
        
        const mapTrack = (track: any) => ({
            id: track.id,
            name: track.name,
            album: track.album.name,
            albumImageUrl: track.album.images?.[0]?.url,
            previewUrl: track.preview_url,
            spotifyUrl: track.external_urls.spotify,
            durationMs: track.duration_ms,
            artists: track.artists.map((a: any) => a.name).join(', ')
        });

        const ownTracks = rawOwnTracks.slice(0, 15).map(mapTrack);
        const collabTracks = rawCollabTracks.slice(0, 15).map(mapTrack);

        const artistInfo = {
            id: artist.id,
            name: artist.name,
            images: artist.images,
            followers: artist.followers?.total,
            genres: artist.genres,
            spotifyUrl: artist.external_urls.spotify
        };

        return { artist: artistInfo, tracks: ownTracks, collabTracks };
    } catch (error) {
        console.error('Error in getArtistData:', error);
        throw error;
    }
}
