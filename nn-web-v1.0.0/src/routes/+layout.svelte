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
	import HomeFooter from '$lib/components/home/HomeFooter.svelte';
	import MusicPlayer from '$lib/components/MusicPlayer.svelte';

	// Add page transition animations with TypeScript type annotation
	let mainContent: HTMLElement;

	onMount(() => {
		// Animate content on initial load
		if (mainContent) {
			gsap.from(mainContent, {
				opacity: 0,
				y: 20,
				duration: 0.7,
				ease: 'power2.out',
				delay: 0.3
			});
		}
	});

	// Scroll to top on page change
	$: if (browser && $page.url.pathname) {
		window.scrollTo(0, 0);
	}
</script>

<!-- Apply global styles -->
<svelte:head>
	<title>Nisha Najihah | Music Producer & Developer</title>
	<meta
		name="description"
		content="Creative developer and music producer crafting digital experiences and atmospheric sounds."
	/>
</svelte:head>

<div class="flex min-h-screen flex-col" style="background-color: var(--bg-main);">
	<!-- Header conditionally rendered - hidden on homepage and error pages -->
	{#if $page.url.pathname !== '/' && !$page.error}
		<div class="header-container z-50">
			<Header />
		</div>
	{/if}
	{#key $page.url.pathname}
		<main
			bind:this={mainContent}
			class="w-full flex-grow {$page.url.pathname !== '/' && !$page.error ? 'pt-24' : ''}"
			in:fade={{ duration: 400, delay: 200, easing: quintOut }}
			out:fade={{ duration: 300 }}
		>
			<slot />
		</main>
	{/key}
	<!-- Music Player (conditionally rendered based on state) -->
	{#if !$page.error}
		<MusicPlayer />
	{/if}

	<!-- Conditional Footer: HomeFooter for homepage, standard Footer for other pages, hidden on error -->
	{#if !$page.error}
		{#if $page.url.pathname === '/'}
			<div class="absolute right-0 bottom-0 left-0 z-10">
				<HomeFooter />
			</div>
		{:else}
			<Footer />
		{/if}
	{/if}
</div>

<style>
	/* Ensure header container is always visible */
	:global(.header-container) {
		opacity: 1 !important;
		visibility: visible !important;
		z-index: 50;
	}
</style>
