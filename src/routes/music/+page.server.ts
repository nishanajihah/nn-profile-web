import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getArtistData } from '$lib/logic/music/spotify';

export const load: PageServerLoad = async ({ fetch, platform }) => {
    let tracks: any[] = [];
    let collabTracks: any[] = [];
    let artist: any = null;

    try {
        const data = await getArtistData('Nisha Najihah', fetch, platform?.env);
        tracks = data.tracks;
        collabTracks = data.collabTracks || [];
        artist = data.artist;
        
        if (!artist || tracks.length === 0) {
            throw error(503, 'Spotify Web API returned no artist data.');
        }
    } catch (err: any) {
        console.error('Failed to load Spotify data:', err.message);
        if (err.status && err.body) {
            throw err;
        }
        const rawMessage = err.message || String(err);
        let friendlyPrefix = '';
        if (rawMessage.includes('Active premium subscription') || rawMessage.includes('403')) {
            friendlyPrefix = 'Artist Premium is paused, data unable to collect. Restoration may take a few hours once reactivated. ';
        }
        throw error(503, `${friendlyPrefix}(Detail: ${rawMessage})`);
    }

    return {
        artist,
        tracks,
        collabTracks,
        isMockData: false,
        errorMessage: null
    };
};
