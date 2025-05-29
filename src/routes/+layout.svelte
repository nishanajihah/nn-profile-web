<script lang="ts">
	// Import necessary components and styles
	import '../app.css';
	import { onMount, afterUpdate } from 'svelte';
	import { browser } from '$app/environment';
	import { gsap } from 'gsap';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	// Components
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import MusicPlayer from '$lib/components/MusicPlayer.svelte';
	
	// Add page transition animations with TypeScript type annotation
	let mainContent: HTMLElement;
	let currentPath = '';
	let isTransitioning = false;
		// Handle route changes for page transitions
	$: if ($page.url.pathname !== currentPath) {
		currentPath = $page.url.pathname;
		isTransitioning = true;
		setTimeout(() => {
			isTransitioning = false;
			// Scroll to top on page change
			if (typeof window !== 'undefined') {
				window.scrollTo(0, 0);
			}
		}, 400);
	}
	
	onMount(() => {
		// Animate content on initial load
		if (mainContent) {
			gsap.from(mainContent, { 
				opacity: 0, 
				y: 20, 
				duration: 0.7,
				ease: "power2.out",
				delay: 0.3
			});
		}
		
		// Set initial path
		currentPath = $page.url.pathname;
	});
</script>

<!-- Apply global styles -->
<svelte:head>
	<title>Nisha Najihah | Music Producer & Developer</title>
	<meta name="description" content="Creative developer and music producer crafting digital experiences and atmospheric sounds." />
</svelte:head>

<div class="flex min-h-screen flex-col bg-[#050505]">
	<!-- Header is fixed position -->
	<Header />
	
	{#key currentPath}
		<main 
			bind:this={mainContent} 
			class="flex-grow"
			in:fade={{ duration: 400, delay: 200, easing: quintOut }}
			out:fade={{ duration: 300 }}
		>
			<slot />
		</main>
	{/key}

	<!-- Music Player (conditionally rendered based on state) -->
	<MusicPlayer />
	
	<!-- Footer positioned absolutely on homepage and normally on other pages -->
	<div class={currentPath === '/' ? 'absolute bottom-0 left-0 right-0 z-10' : ''}>
		<Footer />
	</div>
</div>
