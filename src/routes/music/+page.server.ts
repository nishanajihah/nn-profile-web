import type { PageServerLoad } from './$types';
import { getArtistData } from '$lib/server/spotify';

export const load: PageServerLoad = async () => {
    let tracks: any[] = [];
    let collabTracks: any[] = [];
    let artist: any = null;
    let isMockData = false;
    let errorMessage = null;

    try {
        const data = await getArtistData('Nisha Najihah');
        tracks = data.tracks;
        collabTracks = data.collabTracks || [];
        artist = data.artist;
        
        // If the API call worked but returned no tracks/artist, use mock data
        if (!artist || tracks.length === 0) {
            isMockData = true;
            tracks = getMockTracks();
            artist = getMockArtist();
        }
    } catch (error: any) {
        console.error('Failed to load Spotify data:', error.message);
        // Fallback to mock data so the UI doesn't break
        isMockData = true;
        errorMessage = error.message;
        tracks = getMockTracks();
        artist = getMockArtist();
    }

    return {
        artist,
        tracks,
        collabTracks,
        isMockData,
        errorMessage
    };
};

function getMockArtist() {
    return {
        id: 'mock_artist',
        name: 'Nisha Najihah',
        images: [
            { url: 'https://images.unsplash.com/photo-1516280440502-86927d2c0b78?auto=format&fit=crop&q=80&w=1200', width: 1200, height: 800 }
        ],
        followers: 1245000,
        genres: ['electronic', 'synth-pop', 'alternative'],
        spotifyUrl: '#'
    };
}

function getMockTracks() {
    return [
        {
            id: 'mock_1',
            name: 'Neon Dreams',
            album: 'Midnight Resonance',
            albumImageUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400',
            previewUrl: null, // intentionally null to show fallback logic
            spotifyUrl: '#',
            durationMs: 214000,
            artists: 'Nisha Najihah'
        },
        {
            id: 'mock_2',
            name: 'Cybernetic Heartbeat',
            album: 'Future Sounds',
            albumImageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=400',
            previewUrl: 'https://p.scdn.co/mp3-preview/dummy-preview-url',
            spotifyUrl: '#',
            durationMs: 185000,
            artists: 'Nisha Najihah'
        },
        {
            id: 'mock_3',
            name: 'Yellow Horizons',
            album: 'Acoustic Soul',
            albumImageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400',
            previewUrl: null,
            spotifyUrl: '#',
            durationMs: 240000,
            artists: 'Nisha Najihah'
        }
    ];
}
