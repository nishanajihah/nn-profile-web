// @ts-nocheck
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = async ({ fetch }: Parameters<PageLoad>[0]) => {
    try {
        const response = await fetch('/api/github-data');

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Data Load Error:', response.status, errorData);
            // Throwing this error automatically triggers +error.svelte
            throw error(response.status, errorData.error || 'Failed to fetch GitHub data');
        }

        return await response.json();
    } catch (err: any) {
        // Log for debugging
        console.error('Catch-all Load Error:', err);

        // If it's already a SvelteKit error, rethrow it
        if (err.status && err.body) throw err;

        // Otherwise catch unexpected crashes and show a 500
        throw error(500, 'Server connection failed. Please try again later.');
    }
};
