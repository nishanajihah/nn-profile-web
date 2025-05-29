<script lang="ts">
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';
	import { playerStore } from '$lib/stores/musicStore';
	// Local variables with proper type definitions
	let isPlaying = false;
	let isActive = false; // Controls visibility of player
	let currentTrack: {
		title: string;
		artist: string;
		cover: string | null;
		spotify_url: string;
	} = {
		title: 'Not Playing',
		artist: 'No Artist',
		cover: null,
		spotify_url: 'https://open.spotify.com/'
	};
	let playerHeight = 0;
	let playerElement: HTMLDivElement;
	let progressPercent = 0;

	// Subscribe to store updates
	const unsubscribe = playerStore.subscribe((state) => {
		isPlaying = state.isPlaying;
		isActive = state.isActive;

		if (state.track && state.track.id) {
			currentTrack = {
				title: state.track.title,
				artist: state.track.artist,
				cover: state.track.cover,
				spotify_url: state.track.spotify_url || 'https://open.spotify.com/'
			};

			// Calculate progress percentage
			if (state.track.duration > 0) {
				progressPercent = (state.track.progress / state.track.duration) * 100;
			}
		}
	});

	// Clean up subscription on component destroy
	onMount(() => {
		// Measure player height for animations
		if (playerElement) {
			playerHeight = playerElement.offsetHeight;
		}

		return unsubscribe;
	});
	// Toggle play/pause
	function togglePlay() {
		playerStore.update((state) => ({
			...state,
			isPlaying: !state.isPlaying
		}));
	}

	// For demo purposes, toggle player visibility
	function togglePlayer() {
		playerStore.update((state) => ({
			...state,
			isActive: !state.isActive
		}));
	}

	// Animation when player appears/disappears
	$: if (playerElement) {
		if (isActive) {
			gsap.to(playerElement, {
				y: 0,
				opacity: 1,
				duration: 0.3,
				ease: 'power2.out'
			});
		} else {
			gsap.to(playerElement, {
				y: playerHeight,
				opacity: 0,
				duration: 0.3,
				ease: 'power2.in'
			});
		}
	}
</script>

<!-- Only show toggle button when player is loaded with a track -->
{#if currentTrack.title !== 'Not Playing'}
	<button
		class="bg-primary/80 hover:bg-primary fixed right-4 bottom-20 z-40 rounded-full p-3 text-white shadow-lg backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
		on:click={togglePlayer}
		aria-label={isActive ? 'Hide music player' : 'Show music player'}
	>
		{#if isActive}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
					clip-rule="evenodd"
				/>
			</svg>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
				/>
			</svg>
		{/if}
	</button>
{/if}

<div
	bind:this={playerElement}
	class="border-dark-700 bg-dark-900/90 fixed right-0 bottom-0 left-0 z-40 border-t backdrop-blur-md transition-all duration-300"
	class:hidden={!isActive}
>
	<div class="container-custom flex h-16 items-center justify-between">
		<!-- Track Info -->
		<div class="flex items-center">
			<div class="bg-dark-700 relative mr-3 h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
				{#if currentTrack.cover}
					<img
						src={currentTrack.cover}
						alt="{currentTrack.title} cover"
						class="h-full w-full rounded object-cover"
					/>
				{:else}
					<!-- Placeholder when no cover -->
					<div class="text-dark-400 flex h-full w-full items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
							/>
						</svg>
					</div>
				{/if}

				{#if isPlaying}
					<div class="bg-dark-900/60 absolute inset-0 flex items-center justify-center">
						<div class="bg-primary h-2 w-2 animate-pulse rounded-full"></div>
					</div>
				{/if}
			</div>
			<div>
				<div class="text-sm font-medium text-white">{currentTrack.title}</div>
				<div class="text-xs text-gray-400">{currentTrack.artist}</div>
			</div>
		</div>

		<!-- Progress Bar -->
		<div class="mx-6 hidden w-full max-w-md md:block">
			<div class="bg-dark-700 h-1 w-full overflow-hidden rounded-full">
				<div class="bg-primary h-full" style="width: {progressPercent}%"></div>
			</div>
		</div>
		<!-- Controls -->
		<div class="flex items-center space-x-2">
			<!-- Previous Track Button -->
			<button 
				class="hover:text-primary p-2 text-white/70 transition-colors"
				aria-label="Previous track"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"
					/>
				</svg>
			</button>

			<!-- Play/Pause Button -->
			<button
				class="bg-primary hover:bg-primary-600 rounded-full p-2 text-white transition-transform active:scale-95"
				aria-label={isPlaying ? 'Pause' : 'Play'}
				on:click={togglePlay}
			>
				{#if isPlaying}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
							clip-rule="evenodd"
						/>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
							clip-rule="evenodd"
						/>
					</svg>
				{/if}
			</button>			<!-- Next Track Button -->
			<button 
				class="hover:text-primary p-2 text-white/70 transition-colors"
				aria-label="Next track"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z"
					/>
				</svg>
			</button>
		</div>

		<!-- Spotify link -->
		<a
			href={currentTrack.spotify_url}
			target="_blank"
			rel="noreferrer noopener"
			class="bg-dark-800/80 flex items-center space-x-1 rounded-full px-3 py-1 text-xs text-green-400 transition-colors hover:bg-green-900/30"
		>
			<svg class="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
				<path
					d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM16.5917 16.5917C16.2931 16.8903 15.8162 16.8903 15.5176 16.5917C14.3999 15.4739 12.7616 14.8 11 14.8C9.23842 14.8 7.60014 15.4739 6.48239 16.5917C6.18375 16.8903 5.7069 16.8903 5.40825 16.5917C5.10959 16.2931 5.10959 15.8162 5.40825 15.5176C6.80075 14.125 8.82715 13.3 11 13.3C13.1729 13.3 15.1992 14.125 16.5917 15.5176C16.8904 15.8162 16.8904 16.2931 16.5917 16.5917ZM18.0242 13.5133C17.7256 13.8119 17.2487 13.8119 16.9501 13.5133C15.2183 11.7815 12.7003 10.8 10 10.8C7.2997 10.8 4.78167 11.7815 3.04991 13.5133C2.75126 13.8119 2.27441 13.8119 1.97576 13.5133C1.67711 13.2146 1.67711 12.7378 1.97576 12.4391C3.98798 10.4269 6.88364 9.3 10 9.3C13.1164 9.3 16.012 10.4269 18.0242 12.4391C18.3229 12.7378 18.3229 13.2146 18.0242 13.5133Z"
				/>
			</svg>
			<span>Spotify</span>
		</a>
	</div>

	<!-- Mobile Progress Bar -->
	<div class="bg-dark-800 h-1 w-full md:hidden">
		<div class="bg-primary h-full" style="width: {progressPercent}%"></div>
	</div>
</div>
