import { writable } from 'svelte/store';

// This store will increment every time a carousel arrow is clicked.
// We can subscribe to it in Scene.svelte to trigger 3D burst animations.
export const carouselClickPulse = writable(0);
