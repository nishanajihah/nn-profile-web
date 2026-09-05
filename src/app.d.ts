// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env?: {
				SPOTIFY_CLIENT_ID?: string;
				SPOTIFY_CLIENT_SECRET?: string;
				GITHUB_TOKEN?: string;
				[key: string]: any;
			};
			context?: {
				waitUntil(promise: Promise<any>): void;
			};
			caches?: CacheStorage & { default: Cache };
		}
	}
}

export {};
