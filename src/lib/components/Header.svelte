<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	// Navigation links
	const navLinks = [
		{ path: '/', label: 'Home' },
		{ path: '/music', label: 'Music' },
		{ path: '/code', label: 'Code' },
		{ path: '/about', label: 'About' }
	];

	// State variables
	let isMenuOpen = false;
	let headerElement: HTMLElement;
	let isScrolled = false;

	// Toggle mobile menu
	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
	
	// Handle scroll for header background
	function handleScroll() {
		isScrolled = window.scrollY > 10;
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		handleScroll();

		// Simple header animation
		if (headerElement) {
			gsap.from(headerElement, { y: -20, opacity: 0, duration: 0.5 });
		}

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<style>
	/* Clean navigation styles */
	.nav-link {
		transition: all 0.3s ease;
	}
	
	.nav-link.active {
		background-color: #ffde21;
		color: #000;
		transform: scale(1.05);
	}
	
	.nav-link:hover:not(.active) {
		background-color: rgba(255, 222, 33, 0.9);
		color: #000;
		transform: scale(1.02);
	}
</style>

<header
	bind:this={headerElement}
	class="fixed top-0 right-0 left-0 z-50 transition-all duration-300 {isScrolled 
		? 'bg-black/80 backdrop-blur-md border-b border-[#ffde21]/20' 
		: 'bg-black/40 backdrop-blur-sm border-b border-white/5'}"
>
	<div class="container-custom flex h-20 items-center justify-between">
		<!-- Logo -->
		<a href="/" class="group relative">
			<span class="text-2xl font-bold text-white transition-all duration-300 md:text-3xl">
				Nisha <span class="text-[#ffde21]">Najihah</span>
			</span>
			<!-- Animated underline -->
			<span class="absolute bottom-0 left-0 h-[2px] w-0 bg-[#ffde21] transition-all duration-500 group-hover:w-full"></span>
		</a>

		<!-- Desktop Navigation -->
		<nav class="hidden md:flex items-center space-x-1">
			{#each navLinks as link}
				{@const isActive = $page.url.pathname === link.path || ($page.url.pathname.startsWith(link.path) && link.path !== '/')}
				<a
					href={link.path}
					class="nav-link relative px-4 py-2 text-sm font-medium rounded-lg
						{isActive 
							? 'active bg-[#ffde21] text-black' 
							: 'text-white/90'}"
				>
					{link.label}
					{#if isActive}
						<span class="absolute top-1 right-1 w-1.5 h-1.5 bg-black/60 rounded-full"></span>
					{/if}
				</a>
			{/each}
		</nav>

		<!-- Mobile Menu Button -->
		<button
			class="p-2 text-white transition-all duration-300 hover:text-[#ffde21] md:hidden"
			on:click={toggleMenu}
			aria-label="Toggle menu"
		>
			<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				{#if isMenuOpen}
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				{:else}
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				{/if}
			</svg>
		</button>
	</div>

	<!-- Mobile Navigation -->
	{#if isMenuOpen}
		<div class="md:hidden">
			<div class="bg-black/95 backdrop-blur-xl border-t border-[#ffde21]/20 px-4 py-6 space-y-2">
				{#each navLinks as link}
					{@const isActive = $page.url.pathname === link.path || ($page.url.pathname.startsWith(link.path) && link.path !== '/')}
					<a
						href={link.path}
						class="block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300
							{isActive 
								? 'bg-[#ffde21] text-black' 
								: 'text-white hover:bg-[#ffde21] hover:text-black'}"
						on:click={() => (isMenuOpen = false)}
					>
						{link.label}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</header>
