import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				quietDeps: true, // Suppress deprecation warnings from node_modules (Bulma)
			}
		}
	}
});
