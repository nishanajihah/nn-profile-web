<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { playerStore, type Track } from '$lib/stores/musicStore';

	// Register GSAP plugins
	gsap.registerPlugin(ScrollTrigger);
	// Reference elements for animations
	let headerSection: HTMLElement;
	let featuredSection: HTMLElement;
	let projectsSection: HTMLElement;

	// Placeholder music data (will be replaced with Spotify API data)
	let musicProjects: MusicTrack[] = [];
	let featuredProject: MusicTrack | null = null;
	let isLoading = true;
	let error: string | null = null; // Define interface for track data
	interface MusicTrack {
		id: string;
		title: string;
		artist: string;
		description: string;
		coverImage: string;
		spotifyLink: string; // Renamed from spotifyUrl to match usage
		releaseDate: string;
		duration: number;
		tracks?: number; // Optional field for album/EP track count
	}	// Function to play a track in the music player
	function playTrack(track: MusicTrack | null) {
		if (!track) return;
		
		playerStore.update((state) => ({
			...state,
			isActive: true,
			isPlaying: true,
			track: {
				id: track.id,
				title: track.title,
				artist: track.artist,
				cover: track.coverImage,
				duration: track.duration || 180,
				progress: 0,
				spotify_url: track.spotifyLink
			}
		}));
	}

	// Mock function for fetching Spotify data (to be replaced with actual API call)
	async function fetchSpotifyData() {
		try {
			// This would be replaced with actual Spotify API calls
			// const spotifyApi = new SpotifyWebApi({
			//   clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
			//   clientSecret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
			// });

			// await spotifyApi.clientCredentialsGrant();
			// const data = await spotifyApi.getArtistAlbums('YOUR_ARTIST_ID');

			// Simulated API response
			await new Promise((resolve) => setTimeout(resolve, 1000));

			return {
				featured: {
					id: 'featured1',
					title: 'Midnight Chronicles',
					artist: 'Nisha Najihah',
					description:
						'An immersive journey through atmospheric soundscapes and emotional electronic compositions.',
					coverImage: '/images/logos/spotify-icon.png',
					spotifyLink: 'https://open.spotify.com/',
					releaseDate: '2024-04-15',
					duration: 245,
					tracks: 8
				},
				projects: [
					{
						id: 'album1',
						title: 'Ethereal Waves',
						artist: 'Nisha Najihah',
						description:
							'A fusion of electronic elements and orchestral instruments creating atmospheric depth.',
						coverImage: '/images/logos/spotify-icon.png',
						spotifyLink: 'https://open.spotify.com/',
						releaseDate: '2024-02-10',
						duration: 180
					},
					{
						id: 'album2',
						title: 'Digital Dreams',
						artist: 'Nisha Najihah',
						description:
							'Ambient soundscapes with subtle rhythmic elements that evolve throughout the piece.',
						coverImage: '/images/logos/spotify-icon.png',
						spotifyLink: 'https://open.spotify.com/',
						releaseDate: '2023-11-22',
						duration: 210
					},
					{
						id: 'album3',
						title: 'Neon Nights',
						artist: 'Nisha Najihah',
						description: 'Experimental beats with glitchy textures and futuristic synth work.',
						coverImage: '/images/logos/spotify-icon.png',
						spotifyLink: 'https://open.spotify.com/',
						releaseDate: '2023-08-15',
						duration: 195
					},
					{
						id: 'album4',
						title: 'Quantum Echoes',
						artist: 'Nisha Najihah',
						description:
							'A collection of deep, spacious sounds with evolving textures and emotional progression.',
						coverImage: '/images/logos/spotify-icon.png',
						spotifyLink: 'https://open.spotify.com/',
						releaseDate: '2023-05-20',
						duration: 225
					},
					{
						id: 'album5',
						title: 'Parallel Worlds',
						artist: 'Nisha Najihah',
						description:
							'An exploration of contrasting musical elements creating tension and harmony.',
						coverImage: '/images/logos/spotify-icon.png',
						spotifyLink: 'https://open.spotify.com/',
						releaseDate: '2023-03-01',
						duration: 190
					}
				]
			};		} catch (err: unknown) {
			console.error('Error fetching Spotify data:', err);
			throw new Error('Failed to load music data. Please try again later.');
		}
	}	onMount(async () => {
		try {
			const data = await fetchSpotifyData();
			featuredProject = data.featured as MusicTrack;
			musicProjects = data.projects as MusicTrack[];
			isLoading = false;

			// Animate elements when they come into view
			if (headerSection) {
				gsap.from(headerSection.querySelectorAll('.animate-item'), {
					y: 30,
					opacity: 0,
					stagger: 0.2,
					duration: 0.8,
					ease: 'power2.out',
					delay: 0.2
				});
			}

			if (featuredSection) {
				gsap.from(featuredSection, {
					y: 50,
					opacity: 0,
					duration: 0.8,
					scrollTrigger: {
						trigger: featuredSection,
						start: 'top bottom-=100'
					}
				});
			}

			if (projectsSection) {
				gsap.from(projectsSection.querySelectorAll('.project-card'), {
					y: 40,
					opacity: 0,
					stagger: 0.1,
					duration: 0.6,
					scrollTrigger: {
						trigger: projectsSection,
						start: 'top bottom-=50'
					}
				});
			}		} catch (err: unknown) {
			if (err instanceof Error) {
				error = err.message;
			} else {
				error = 'An unknown error occurred';
			}
			isLoading = false;
		}
	});
</script>

<div class="min-h-screen py-16 md:py-20">
	<div class="container-custom">
		<!-- Header Section -->
		<header bind:this={headerSection} class="mb-16 text-center">
			<h1 class="animate-item mb-4 text-4xl font-bold text-white md:text-5xl">Musical Journey</h1>
			<p class="animate-item mx-auto max-w-2xl text-lg text-gray-300">
				Explore my music projects and releases - a blend of electronic, ambient, and experimental
				sounds crafted to create immersive sonic experiences.
			</p>
		</header>

		{#if isLoading}
			<!-- Loading State -->
			<div class="flex flex-col items-center justify-center py-20">
				<div
					class="border-primary mb-6 h-16 w-16 animate-spin rounded-full border-t-2 border-b-2"
				></div>
				<p class="text-lg text-gray-400">Loading music collection...</p>
			</div>
		{:else if error}
			<!-- Error State -->
			<div
				class="mx-auto max-w-2xl rounded-lg border border-red-600/50 bg-red-900/20 p-6 text-center"
			>
				<svg
					class="mx-auto mb-4 h-12 w-12 text-red-500"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/>
				</svg>
				<h2 class="mb-2 text-xl font-semibold text-white">Unable to Load Music</h2>
				<p class="text-gray-300">{error}</p>
				<button
					class="bg-primary hover:bg-primary-600 mt-4 rounded-md px-4 py-2 font-medium text-white"
					on:click={() => window.location.reload()}
				>
					Try Again
				</button>
			</div>
		{:else}
			<!-- Featured Project -->
			{#if featuredProject}
				<section bind:this={featuredSection} class="mb-16">
					<h2 class="mb-8 text-2xl font-semibold text-white">Featured Release</h2>
					<div
						class="bg-dark-800/80 border-dark-700 grid overflow-hidden rounded-xl border shadow-xl backdrop-blur-sm md:grid-cols-2"
					>
						<div class="relative aspect-square w-full overflow-hidden">
							<img
								src={featuredProject.coverImage}
								alt={featuredProject.title}
								class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
							/>
							<button
								class="bg-dark-900/60 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100"
								on:click={() => playTrack(featuredProject)}
								aria-label="Play {featuredProject.title}"
							>
								<div
									class="bg-primary rounded-full p-5 text-white shadow-lg transition-transform hover:scale-110"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-8 w-8"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fill-rule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
											clip-rule="evenodd"
										/>
									</svg>
								</div>
							</button>
						</div>

						<div class="flex flex-col justify-center p-6 md:p-8">
							<span class="text-primary mb-1 text-sm font-medium">Featured Album</span>
							<h3 class="mb-2 text-2xl font-bold text-white md:text-3xl">
								{featuredProject.title}
							</h3>
							<p class="mb-6 text-gray-400">{featuredProject.description}</p>

							<div class="mb-6 grid grid-cols-2 gap-4">
								<div>
									<span class="text-sm text-gray-500">Release Date</span>
									<p class="text-white">
										{new Date(featuredProject.releaseDate).toLocaleDateString()}
									</p>
								</div>
								<div>
									<span class="text-sm text-gray-500">Tracks</span>
									<p class="text-white">{featuredProject.tracks} songs</p>
								</div>
							</div>

							<div class="flex gap-3">
								<button
									class="bg-primary hover:bg-primary-600 flex items-center rounded-full px-5 py-2 text-sm font-medium text-white transition-colors"
									on:click={() => playTrack(featuredProject)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="mr-2 h-4 w-4"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fill-rule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
											clip-rule="evenodd"
										/>
									</svg>
									Play Now
								</button>

								<a
									href={featuredProject.spotifyLink}
									class="flex items-center rounded-full bg-green-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
									target="_blank"
									rel="noreferrer noopener"
								>
									<svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
										<path
											d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
										/>
										<path
											d="M16.5917 16.5917C16.2931 16.8903 15.8162 16.8903 15.5176 16.5917C14.3999 15.4739 12.7616 14.8 11 14.8C9.23842 14.8 7.60014 15.4739 6.48239 16.5917C6.18375 16.8903 5.7069 16.8903 5.40825 16.5917C5.10959 16.2931 5.10959 15.8162 5.40825 15.5176C6.80075 14.125 8.82715 13.3 11 13.3C13.1729 13.3 15.1992 14.125 16.5917 15.5176C16.8904 15.8162 16.8904 16.2931 16.5917 16.5917Z"
											fill="black"
										/>
										<path
											d="M18.0242 13.5133C17.7256 13.8119 17.2487 13.8119 16.9501 13.5133C15.2183 11.7815 12.7003 10.8 10 10.8C7.2997 10.8 4.78167 11.7815 3.04991 13.5133C2.75126 13.8119 2.27441 13.8119 1.97576 13.5133C1.67711 13.2146 1.67711 12.7378 1.97576 12.4391C3.98798 10.4269 6.88364 9.3 10 9.3C13.1164 9.3 16.012 10.4269 18.0242 12.4391C18.3229 12.7378 18.3229 13.2146 18.0242 13.5133Z"
											fill="black"
										/>
									</svg>
									Spotify
								</a>
							</div>
						</div>
					</div>
				</section>
			{/if}

			<!-- Music Projects Grid -->
			<section bind:this={projectsSection}>
				<h2 class="mb-8 text-2xl font-semibold text-white">All Releases</h2>
				<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each musicProjects as project (project.id)}
						<div
							class="project-card bg-dark-800 border-dark-700 group hover:border-primary/40 hover:shadow-primary/5 overflow-hidden rounded-lg border transition-all hover:-translate-y-1 hover:shadow-lg"
						>
							<div class="relative">
								<img
									src={project.coverImage}
									alt={project.title}
									class="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
									loading="lazy"
								/>

								<button
									class="bg-dark-900/60 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
									on:click={() => playTrack(project)}
									aria-label="Play {project.title}"
								>
									<div
										class="bg-primary rounded-full p-4 text-white shadow-lg transition-transform hover:scale-110"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fill-rule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
												clip-rule="evenodd"
											/>
										</svg>
									</div>
								</button>
							</div>

							<div class="p-6">
								<h3 class="mb-2 text-xl font-semibold text-white">{project.title}</h3>
								<p class="mb-4 text-sm text-gray-400">{project.description}</p>

								<div class="mt-auto flex items-center justify-between">
									<span class="text-xs text-gray-500">
										{new Date(project.releaseDate).toLocaleDateString()}
									</span>

									<a
										href={project.spotifyLink}
										class="text-primary hover:text-primary-300 flex items-center text-sm transition-colors"
										target="_blank"
										rel="noreferrer noopener"
									>
										<span>Spotify</span>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="ml-1 h-4 w-4"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fill-rule="evenodd"
												d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
												clip-rule="evenodd"
											/>
										</svg>
									</a>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</section>

			<!-- Streaming Links -->
			<section class="mt-16 text-center">
				<h2 class="mb-6 text-2xl font-semibold">Listen on Your Favorite Platform</h2>
				<div class="flex flex-wrap items-center justify-center gap-4">
					<a
						href="https://open.spotify.com/"
						class="bg-dark-800 hover:bg-dark-700 flex items-center rounded-full px-6 py-3 transition-colors"
						target="_blank"
						rel="noreferrer noopener"
					>
						<svg class="mr-2 h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
							/>
							<path
								d="M16.5917 16.5917C16.2931 16.8903 15.8162 16.8903 15.5176 16.5917C14.3999 15.4739 12.7616 14.8 11 14.8C9.23842 14.8 7.60014 15.4739 6.48239 16.5917C6.18375 16.8903 5.7069 16.8903 5.40825 16.5917C5.10959 16.2931 5.10959 15.8162 5.40825 15.5176C6.80075 14.125 8.82715 13.3 11 13.3C13.1729 13.3 15.1992 14.125 16.5917 15.5176C16.8904 15.8162 16.8904 16.2931 16.5917 16.5917Z"
								fill="black"
							/>
							<path
								d="M18.0242 13.5133C17.7256 13.8119 17.2487 13.8119 16.9501 13.5133C15.2183 11.7815 12.7003 10.8 10 10.8C7.2997 10.8 4.78167 11.7815 3.04991 13.5133C2.75126 13.8119 2.27441 13.8119 1.97576 13.5133C1.67711 13.2146 1.67711 12.7378 1.97576 12.4391C3.98798 10.4269 6.88364 9.3 10 9.3C13.1164 9.3 16.012 10.4269 18.0242 12.4391C18.3229 12.7378 18.3229 13.2146 18.0242 13.5133Z"
								fill="black"
							/>
						</svg>
						<span>Spotify</span>
					</a>

					<a
						href="https://soundcloud.com/"
						class="bg-dark-800 hover:bg-dark-700 flex items-center rounded-full px-6 py-3 transition-colors"
						target="_blank"
						rel="noreferrer noopener"
					>
						<svg class="mr-2 h-6 w-6 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M2.75,18.3V9.05c-0.41,0.19-0.7,0.59-0.7,1.07v8.18c0,0.48,0.29,0.88,0.7,1.07V18.3z M5.67,20.73V6.72 c-0.43,0.14-0.74,0.54-0.74,1.01v11.99c0,0.47,0.31,0.87,0.74,1.01H5.67z M8.59,20.73V4.24C8.16,4.38,7.85,4.78,7.85,5.25v15.23 c0,0.47,0.31,0.87,0.74,1.01V20.73z M11.51,20.73V4.24c-0.43,0.14-0.74,0.54-0.74,1.01v15.23c0,0.47,0.31,0.87,0.74,1.01V20.73z M12.25,4.24v16.49v0.76h0.74c0.43-0.14,0.74-0.54,0.74-1.01V5.25c0-0.47-0.31-0.87-0.74-1.01H12.25z M15.17,20.73h0v-5.34 c0.1-0.05,0.16-0.14,0.16-0.26c0-0.16-0.13-0.29-0.29-0.29c-0.16,0-0.29,0.13-0.29,0.29c0,0.11,0.07,0.21,0.16,0.26v5.34 c-0.43-0.14-0.74-0.54-0.74-1.01V9.7c0.01-0.55,0.1-1.08,0.27-1.58c0.17-0.49,0.4-0.94,0.7-1.35c0.29-0.4,0.65-0.75,1.05-1.03 c0.4-0.28,0.85-0.47,1.32-0.59c0.02,0,0.04,0,0.06-0.01c0.03-0.01,0.05-0.01,0.08-0.02c0.02,0,0.03-0.01,0.05-0.01 c0.05-0.01,0.09-0.01,0.14-0.02c0.12-0.01,0.23-0.02,0.35-0.03c0.02,0,0.04,0,0.07,0c0.59,0,1.14,0.12,1.65,0.33 c0.49,0.2,0.93,0.5,1.31,0.87c0.12,0.12,0.24,0.24,0.35,0.38c0.39,0.47,0.69,1,0.89,1.6s0.31,1.23,0.31,1.89v9.3 c0,0.63-0.51,1.14-1.14,1.14H17.3h-0.17c-0.14-0.04-0.28-0.12-0.39-0.22c-0.14-0.13-0.24-0.32-0.24-0.52c0-0.04,0-0.07,0.01-0.1 c0,0,0-0.01,0-0.01c0.01-0.03,0.01-0.06,0.02-0.09c0.01-0.02,0.01-0.03,0.02-0.05c0,0,0-0.01,0.01-0.01 c0.02-0.05,0.05-0.09,0.08-0.13c0.04-0.04,0.08-0.08,0.13-0.11c0.03-0.02,0.05-0.03,0.08-0.04c0,0,0.01,0,0.01,0 c0.05-0.02,0.09-0.03,0.14-0.03c0.01,0,0.03,0,0.04,0c0.01,0,0.02,0,0.03,0c0.03,0,0.05,0,0.08,0.01c0.01,0,0.03,0.01,0.04,0.01 c0.03,0.01,0.06,0.03,0.09,0.04c0,0,0.01,0.01,0.01,0.01c0.03,0.02,0.05,0.04,0.07,0.07c0,0,0.01,0.01,0.01,0.01 c0.03,0.03,0.05,0.07,0.06,0.11c0,0.01,0,0.01,0.01,0.02c0.01,0.05,0.02,0.1,0.01,0.16c-0.01,0.06-0.03,0.11-0.07,0.16 c-0.01,0.02-0.02,0.04-0.04,0.05c-0.02,0.02-0.04,0.04-0.07,0.06c-0.01,0-0.01,0.01-0.02,0.01c-0.05,0.02-0.09,0.04-0.14,0.05 c-0.01,0-0.03,0-0.04,0c-0.03,0-0.06,0-0.08-0.01c-0.01,0-0.02,0-0.03-0.01c-0.03-0.01-0.06-0.02-0.09-0.04 c-0.01-0.01-0.02-0.01-0.03-0.02c-0.02-0.02-0.04-0.03-0.05-0.05c-0.01-0.01-0.01-0.02-0.02-0.02c-0.01-0.02-0.03-0.04-0.04-0.06 c-0.01-0.02-0.01-0.03-0.02-0.05c-0.01-0.04-0.01-0.07-0.01-0.11c0-0.08,0.03-0.15,0.07-0.21c0.01-0.01,0.01-0.02,0.02-0.03 c0.04-0.05,0.09-0.09,0.15-0.12c0.02-0.01,0.05-0.02,0.07-0.03c0.24-0.07,0.5-0.12,0.76-0.16c0.03,0,0.06-0.01,0.09-0.01 c0.72-0.1,1.45-0.1,2.15,0.03c0.77,0.14,1.51,0.42,2.13,0.85V9.75c-0.63-0.55-1.38-0.95-2.2-1.16c-0.13-0.03-0.26-0.06-0.39-0.08 c-0.48-0.08-0.97-0.12-1.47-0.1c-0.05,0-0.1,0.01-0.15,0.01C19.46,8.45,19.38,8.47,19.3,8.48c-0.05,0.01-0.11,0.01-0.16,0.02 c-0.07,0.01-0.14,0.03-0.21,0.04c-0.06,0.01-0.11,0.03-0.17,0.04c-0.07,0.02-0.14,0.04-0.2,0.05c-0.06,0.02-0.12,0.04-0.18,0.07 c-0.06,0.02-0.13,0.05-0.19,0.08c-0.06,0.03-0.12,0.06-0.18,0.09c-0.06,0.03-0.12,0.07-0.17,0.1c-0.06,0.04-0.12,0.08-0.17,0.12 c-0.05,0.04-0.11,0.08-0.16,0.13c-0.05,0.05-0.1,0.09-0.15,0.14c-0.05,0.05-0.09,0.1-0.14,0.16c-0.04,0.06-0.09,0.11-0.13,0.17 c-0.04,0.06-0.08,0.12-0.11,0.18c-0.04,0.06-0.07,0.12-0.1,0.18c-0.03,0.06-0.06,0.13-0.09,0.19c-0.02,0.06-0.05,0.13-0.07,0.2 c-0.01,0.04-0.02,0.09-0.04,0.13V19.72C15.91,20.19,15.6,20.59,15.17,20.73z"
							/>
						</svg>
						<span>SoundCloud</span>
					</a>

					<a
						href="https://music.apple.com/"
						class="bg-dark-800 hover:bg-dark-700 flex items-center rounded-full px-6 py-3 transition-colors"
						target="_blank"
						rel="noreferrer noopener"
					>
						<svg class="mr-2 h-6 w-6 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M23.9947 18.19C23.4907 19.44 23.1047 20.1 22.4797 20.84C21.5097 22.01 20.5097 22.01 19.6047 22.01C18.7047 22.01 17.5497 21.44 16.2797 21.44C14.9497 21.44 14.0097 22.01 13.1647 22.01C11.9997 22.01 11.2047 21.17 10.1147 20.02C8.0847 17.85 7.3997 14.18 8.6697 11.73C9.5697 9.96 11.2697 8.83 13.1147 8.83C14.1047 8.83 14.9097 9.45 15.5147 9.45C16.0597 9.45 16.9697 8.78 18.1147 8.78C19.7897 8.78 21.3647 9.79 22.2697 11.4C22.2697 11.4 19.5547 12.97 19.5697 16.08C19.5797 19.74 22.9997 20.69 23.0147 20.69L23.9947 18.19ZM16.7597 3C16.9247 4.92 15.7997 6.92 14.6147 8.14C13.5747 9.26 12.0347 10.06 10.7147 9.95C10.5047 8.15 11.5597 6.05 12.8647 4.8C13.9997 3.68 15.6347 2.93 16.7597 3Z"
							/>
						</svg>
						<span>Apple Music</span>
					</a>

					<a
						href="https://www.bandcamp.com/"
						class="bg-dark-800 hover:bg-dark-700 flex items-center rounded-full px-6 py-3 transition-colors"
						target="_blank"
						rel="noreferrer noopener"
					>
						<svg class="mr-2 h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M14.186,15.724H7.042l2.35-9.448h7.143 L14.186,15.724z"
							/>
						</svg>
						<span>Bandcamp</span>
					</a>
				</div>
			</section>
		{/if}
	</div>
</div>
