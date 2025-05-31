<script lang="ts">
	// Active route tracking for navigation highlighting
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	// Navigation links with their paths and labels
	const navLinks = [
		{ path: '/', label: 'Home' },
		{ path: '/music', label: 'Music' },
		{ path: '/code', label: 'Code' },
		{ path: '/about', label: 'About' }
	];

	// Mobile menu state
	let isMenuOpen = false;
	let headerElement: HTMLElement;
	let isScrolled = false;
	let logoElement: HTMLElement;
	let navContainer: HTMLElement;
	// Expose header background state - default to semi-transparent
	export let headerBg = 'bg-[var(--bg-card)] backdrop-blur-sm';

	// Toggle mobile menu
	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
	// Track scroll position for header transparency with improved animation
	function handleScroll() {
		const prevScrolled = isScrolled;
		isScrolled = window.scrollY > 10;
		const isHomepage = $page.url.pathname === '/';

		// Update header background based on scroll position
		headerBg = isScrolled
			? 'bg-[var(--bg-card-hover)] backdrop-blur-md'
			: 'bg-[var(--bg-card)] backdrop-blur-sm';

		// Animate header background when scrolling
		if (isScrolled !== prevScrolled && headerElement) {
			if (isScrolled) {
				gsap.to(headerElement, {
					backgroundColor: 'rgba(5, 5, 5, 0.75)',
					backdropFilter: 'blur(12px)',
					boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
					borderBottom: '1px solid rgba(255, 222, 33, 0.2)',
					duration: 0.3,
					ease: 'power2.out'
				});

				// Special animation for logo on homepage
				if (isHomepage && logoElement) {
					gsap.to(logoElement, {
						color: '#ffde21',
						textShadow: '0 0 15px rgba(255, 222, 33, 0.4)',
						duration: 0.3
					});
				}
			} else {
				gsap.to(headerElement, {
					backgroundColor: 'rgba(5, 5, 5, 0.4)',
					backdropFilter: 'blur(8px)',
					boxShadow: 'none',
					borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
					duration: 0.3,
					ease: 'power2.in'
				});

				// Reset logo on homepage when at top
				if (isHomepage && logoElement) {
					gsap.to(logoElement, {
						color: '#ffffff',
						textShadow: '0 0 0 rgba(255, 222, 33, 0)',
						duration: 0.3
					});
				}
			}
		}
	}

	onMount(() => {
		// Add scroll event listener
		window.addEventListener('scroll', handleScroll);

		// Initial animation for header elements
		const navItems = document.querySelectorAll('.nav-item');
		const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

		tl.from(headerElement, { y: -20, opacity: 0, duration: 0.5 });
		tl.from(navItems, { y: -10, opacity: 0, stagger: 0.1, duration: 0.3 });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<header
	bind:this={headerElement}
	class="fixed top-0 right-0 left-0 z-50 transition-all duration-300 {headerBg}"
>
	<div class="container-custom flex h-24 items-center justify-between">
		<!-- Logo with glow effect -->
		<a href="/" class="group relative">
			<span
				bind:this={logoElement}
				class="text-2xl font-bold transition-all duration-300 md:text-3xl"
			>
				Nisha Najihah
			</span>
			<!-- Animated underline effect -->
			<span
				class="absolute bottom-0 left-0 h-[2px] w-0 bg-[#ffde21] transition-all duration-500 ease-in-out group-hover:w-full"
			></span>
			<!-- Subtle glow effect on hover -->
			<span
				class="absolute inset-0 -z-10 bg-[#ffde21]/20 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"
			></span>
		</a>

		<!-- Desktop Navigation with modern hover effects -->
		<nav bind:this={navContainer} class="hidden space-x-2 md:flex">
			{#each navLinks as link}
				<a
					href={link.path}
					class="nav-item relative overflow-hidden rounded-md px-4 py-2 text-sm font-medium transition-all
						{$page.url.pathname === link.path ? 'text-black' : 'text-white hover:text-black'}"
					aria-current={$page.url.pathname === link.path ? 'page' : undefined}
				>
					<!-- Background layer with transition -->
					<span
						class="absolute inset-0 bg-[#ffde21] opacity-0 transition-opacity duration-300
						{$page.url.pathname === link.path ? 'opacity-100' : 'group-hover:opacity-100'}"
					></span>

					<!-- Active indicator dot -->
					{#if $page.url.pathname === link.path}
						<span class="absolute top-1 right-1 h-1 w-1 rounded-full bg-black"></span>
					{/if}

					<!-- Text with relative z-index -->
					<span class="relative z-10">{link.label}</span>
				</a>
			{/each}
		</nav>

		<!-- Mobile Menu Button with glowing effect -->
		<button
			class="relative overflow-hidden rounded-full border border-[#ffde21]/20 p-3 text-white transition-all duration-300 md:hidden"
			aria-controls="mobile-menu"
			aria-expanded={isMenuOpen}
			on:click={toggleMenu}
		>
			<span class="absolute inset-0 bg-black/30 backdrop-blur-md"></span>
			<span
				class="absolute inset-0 bg-[#ffde21]/10 opacity-0 transition-opacity duration-300 {isMenuOpen
					? 'opacity-100'
					: ''}"
			></span>
			<span class="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
			<svg class="relative z-10 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				{#if isMenuOpen}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				{:else}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				{/if}
			</svg>
		</button>
	</div>
	<!-- Mobile Navigation with modern glass effect -->
	{#if isMenuOpen}
		<button
			class="fixed inset-x-0 top-24 bottom-0 z-40 bg-black/60 backdrop-blur-xl md:hidden"
			on:click={() => (isMenuOpen = false)}
			on:keydown={(e) => e.key === 'Escape' && (isMenuOpen = false)}
			aria-label="Close mobile menu"
		></button>
		<nav
			class="fixed top-24 right-0 z-50 h-auto w-64 max-w-full transform rounded-l-2xl border-l border-[#ffde21]/20 bg-gradient-to-br from-black/90 to-black/70 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-300 md:hidden"
			id="mobile-menu"
			style="box-shadow: 0 0 30px rgba(255, 222, 33, 0.1);"
		>
			<div class="space-y-2">
				<!-- Decorative accent -->
				<div
					class="absolute top-0 right-0 h-24 w-1 bg-gradient-to-b from-[#ffde21]/80 to-transparent"
				></div>

				{#each navLinks as link}
					<a
						href={link.path}
						class="group relative block overflow-hidden rounded-lg px-4 py-3 text-base font-medium transition-all"
						aria-current={$page.url.pathname === link.path ? 'page' : undefined}
						on:click={() => (isMenuOpen = false)}
					>
						<!-- Background element -->
						<span
							class="absolute inset-0 {$page.url.pathname === link.path
								? 'bg-[#ffde21]'
								: 'bg-black/40 group-hover:bg-[#ffde21]/20'} transition-colors duration-300"
						></span>

						<!-- Link content -->
						<span
							class="relative z-10 flex items-center justify-between {$page.url.pathname ===
							link.path
								? 'text-black'
								: 'text-white'}"
						>
							{link.label}

							<!-- Active indicator -->
							{#if $page.url.pathname === link.path}
								<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
									<path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									/>
								</svg>
							{/if}
						</span>
					</a>
				{/each}

				<!-- Social media links in mobile menu -->
				<div class="mt-6 border-t border-white/10 pt-6">
					<p class="mb-3 text-xs text-white/60">Connect with me</p>
					<div class="flex space-x-3">
						<a
							href="https://github.com/"
							class="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-[#ffde21] hover:text-black"
							aria-label="GitHub"
						>
							<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
								/>
							</svg>
						</a>
						<a
							href="https://open.spotify.com/"
							class="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-[#ffde21] hover:text-black"
							aria-label="Spotify"
						>
							<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM16.5917 16.5917C16.2931 16.8903 15.8162 16.8903 15.5176 16.5917C14.3999 15.4739 12.7616 14.8 11 14.8C9.23842 14.8 7.60014 15.4739 6.48239 16.5917C6.18375 16.8903 5.7069 16.8903 5.40825 16.5917C5.10959 16.2931 5.10959 15.8162 5.40825 15.5176C6.80075 14.125 8.82715 13.3 11 13.3C13.1729 13.3 15.1992 14.125 16.5917 15.5176C16.8904 15.8162 16.8904 16.2931 16.5917 16.5917Z"
								/>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</nav>
	{/if}
</header>
