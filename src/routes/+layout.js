import { fly } from 'svelte/transition';

/** @type {import('@sveltejs/kit').LayoutLoad} */
export function load({ data }) {
  return {
    ...data,
    transition: {
      in: { x: '100%', duration: 500 },
      out: { x: '-100%', duration: 500 }
    }
  };
}
