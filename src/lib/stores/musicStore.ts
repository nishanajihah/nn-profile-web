import { writable } from 'svelte/store';

// Define types for our music store
export interface Track {
	id: string | null;
	title: string;
	artist: string;
	cover: string | null;
	duration: number;
	progress: number;
	spotify_url: string | null;
}

export interface PlayerState {
	isActive: boolean;
	isPlaying: boolean;
	track: Track;
}

// Create a store for player state that can be imported elsewhere
export const playerStore = writable<PlayerState>({
	isActive: false,
	isPlaying: false,
	track: {
		id: null,
		title: 'Not Playing',
		artist: 'No Artist',
		cover: null,
		duration: 0,
		progress: 0,
		spotify_url: null
	}
});
