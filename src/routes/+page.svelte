<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { gsap } from 'gsap';
	import { playerStore } from '$lib/stores/musicStore';

	// Define proper typings for DOM elements
	let homepageContent: HTMLElement;
	let cardsContainer: HTMLElement;
	let titleElement: HTMLHeadingElement;
	let subtitleElement: HTMLHeadingElement;
	let glowEffect: HTMLDivElement;
	let actionsContainer: HTMLDivElement;
	let featuredCards: HTMLElement[] = [];
	let mouseMoveTimeout: ReturnType<typeof setTimeout> | null = null;
	let isInteracting = false;
	let particleContainer: HTMLDivElement;
	let particlesGenerated = false;

	// Demo function to activate music player (for testing)
	function activatePlayer() {
		playerStore.update((state: any) => ({
			...state,
			isActive: true,
			isPlaying: true,
			track: {
				id: 'demo-track',
				title: 'Cosmic Waves',
				artist: 'Nisha Najihah',
				cover: '/images/logos/spotify-icon.png',
				duration: 180,
				progress: 0,
				spotify_url: 'https://open.spotify.com/'
			}
		}));
	}

	// Function to handle mouse interaction for glow effect with improved dynamics
	function handleMouseMove(event: MouseEvent) {
		if (!glowEffect) return;

		// Update glow effect position with smoother animation
		const containerRect = homepageContent.getBoundingClientRect();
		const x = event.clientX - containerRect.left;
		const y = event.clientY - containerRect.top;

		gsap.to(glowEffect, {
			x: x,
			y: y,
			opacity: 0.8,
			scale: 1.5,
			duration: 0.3,
			ease: 'power1.out'
		});

		isInteracting = true;

		// Reset interaction state after delay
		if (mouseMoveTimeout !== null) {
			clearTimeout(mouseMoveTimeout);
		}
		mouseMoveTimeout = setTimeout(() => {
			isInteracting = false;
			gsap.to(glowEffect, {
				opacity: 0.4,
				scale: 1,
				duration: 1.5,
				ease: 'power2.out'
			});
		}, 300);
	}

	// Generate floating particles for background ambiance
	function generateParticles(count: number = 15) {
		if (!browser || particlesGenerated || !particleContainer) return;

		for (let i = 0; i < count; i++) {
			const particle = document.createElement('div');
			particle.className = 'absolute rounded-full bg-[#ffde21]/10';

			// Randomize size
			const size = Math.random() * 60 + 10;
			particle.style.width = `${size}px`;
			particle.style.height = `${size}px`;

			// Randomize position
			particle.style.left = `${Math.random() * 100}%`;
			particle.style.top = `${Math.random() * 100}%`;

			// Add blur effect
			particle.style.filter = `blur(${Math.random() * 8 + 5}px)`;

			// Add to container
			particleContainer.appendChild(particle);

			// Animate with GSAP
			gsap.set(particle, { opacity: Math.random() * 0.2 + 0.1 });

			// Create floating animation
			gsap.to(particle, {
				x: `${Math.random() * 100 - 50}px`,
				y: `${Math.random() * 100 - 50}px`,
				duration: Math.random() * 30 + 20,
				repeat: -1,
				yoyo: true,
				ease: 'sine.inOut',
				delay: Math.random() * 5
			});

			// Pulsate opacity
			gsap.to(particle, {
				opacity: `+=${Math.random() * 0.2}`,
				duration: Math.random() * 4 + 2,
				repeat: -1,
				yoyo: true,
				ease: 'sine.inOut',
				delay: Math.random() * 2
			});
		}

		particlesGenerated = true;
	}

	// Card data with enhanced descriptions
	const cardData = [
		{
			title: 'Music Production',
			description:
				'Immersive soundscapes and rhythmic journeys that transport listeners to new dimensions.',
			icon: 'music',
			link: '/music',
			linkText: 'Listen Now',
			accent: 'linear-gradient(135deg, rgba(255,222,33,0.2), rgba(255,150,33,0.05))'
		},
		{
			title: 'Development',
			description:
				'Creative coding projects that blend technology and art into interactive experiences.',
			icon: 'code',
			link: '/code',
			linkText: 'View Projects',
			accent: 'linear-gradient(135deg, rgba(255,222,33,0.2), rgba(33,222,255,0.05))'
		},
		{
			title: 'About Me',
			description:
				'Exploring the intersection where music production meets technological innovation.',
			icon: 'person',
			link: '/about',
			linkText: 'Read More',
			accent: 'linear-gradient(135deg, rgba(255,222,33,0.2), rgba(255,33,222,0.05))'
		}
	];

	// Audio technology features
	const techFeatures = [
		{ icon: 'wave', label: 'Sound Design' },
		{ icon: 'code', label: 'Audio Code' },
		{ icon: 'visual', label: 'Visualizers' },
		{ icon: 'interact', label: 'Interactive' }
	];

	onMount(() => {
		if (!browser) return;

		// Add mouse movement listener for glow effect
		homepageContent?.addEventListener('mousemove', handleMouseMove);

		// Generate ambient particles
		generateParticles();

		// Initialize animations with more dynamic timeline
		const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

		// Main title animation with enhanced staggered entrance
		tl.fromTo(
			titleElement,
			{ y: 30, opacity: 0, scale: 0.95 },
			{ y: 0, opacity: 1, scale: 1, duration: 1.2 },
			0.3
		);

		// Subtitle animation with text reveal effect
		tl.fromTo(subtitleElement, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.7);

		// Action buttons animation with stagger
		tl.fromTo(
			actionsContainer.querySelectorAll('.action-btn'),
			{ y: 20, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.6,
				stagger: 0.15
			},
			1.0
		);

		// Cards staggered animation with improved dynamics
		tl.fromTo(
			featuredCards,
			{ y: 15, opacity: 0, scale: 0.95 },
			{
				y: 0,
				opacity: 1,
				scale: 1,
				stagger: 0.12,
				duration: 0.7,
				ease: 'back.out(1.2)'
			},
			1.2
		);

		// Glow effect entrance
		tl.fromTo(
			glowEffect,
			{ opacity: 0, scale: 0.5 },
			{ opacity: 0.4, scale: 1, duration: 1.2 },
			0.5
		);

		// Set up ambient animation for glow when not interacting
		gsap.to(glowEffect, {
			opacity: 0.5,
			scale: 1.2,
			duration: 4,
			repeat: -1,
			yoyo: true,
			ease: 'sine.inOut'
		});

		// Tech features fade in
		tl.fromTo(
			'.tech-feature',
			{ y: 10, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				stagger: 0.08,
				duration: 0.5
			},
			1.5
		);

		// Disable scrolling only if on homepage for single-screen design
		if (browser && document.body && window.location.pathname === '/') {
			document.body.style.overflow = 'hidden';
		}

		// Cleanup on destroy
		return () => {
			homepageContent?.removeEventListener('mousemove', handleMouseMove);
			if (mouseMoveTimeout !== null) {
				clearTimeout(mouseMoveTimeout);
				mouseMoveTimeout = null;
			}
			// Re-enable scrolling only if leaving homepage
			if (browser && document.body && window.location.pathname !== '/') {
				document.body.style.overflow = '';
			}
		};
	});
</script>

<!-- Full height, single-screen homepage with no scrolling -->
<div
	bind:this={homepageContent}
	class="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
>
	<!-- Ambient Floating Particles -->
	<div
		bind:this={particleContainer}
		class="pointer-events-none absolute inset-0 z-0 overflow-hidden"
	></div>

	<!-- Glow Effect Layer with enhanced visual -->
	<div
		bind:this={glowEffect}
		class="pointer-events-none absolute z-5 h-[45vmin] w-[45vmin] rounded-full bg-[#ffde21]/25 blur-[120px]"
	></div>

	<!-- Content Container with vertical centering -->
	<div
		class="container-custom relative z-10 flex h-full w-full flex-col items-center justify-center pt-20 pb-24"
	>
		<!-- Main Content Area -->
		<div class="mx-auto grid w-full max-w-none grid-cols-1 items-center gap-8 sm:max-w-3xl md:max-w-5xl lg:max-w-7xl lg:grid-cols-5">
			<!-- Left Side: Hero Content -->
			<div class="text-center lg:col-span-2 lg:text-left">
				<!-- Title with enhanced gradient effect -->
				<div class="relative inline-block">
					<h1
						bind:this={titleElement}
						class="mb-4 bg-gradient-to-br from-[#ffde21] via-[#ffe970] to-[#ffde21] bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl"
					>
						Nisha Najihah
					</h1>
					<!-- Decorative element under title -->
					<div
						class="absolute -bottom-1 left-0 h-[6px] w-full bg-gradient-to-r from-[#ffde21]/0 via-[#ffde21] to-[#ffde21]/0"
					></div>
				</div>

				<!-- Subtitle with modern design -->
				<h2
					bind:this={subtitleElement}
					class="mb-8 text-xl font-medium tracking-wide text-white/90 md:text-2xl"
				>
					<span class="font-semibold text-[#ffde21]/90">Music</span> Producer &
					<span class="font-semibold text-[#ffde21]/90">Developer</span>
				</h2>

				<!-- Tech features -->
				<div
					class="mb-8 hidden flex-wrap items-center justify-start gap-3 sm:flex lg:justify-start"
				>
					{#each techFeatures as feature}
						<div
							class="tech-feature flex items-center gap-2 rounded-full border border-[#ffde21]/20 bg-black/30 px-3 py-1.5 backdrop-blur-sm"
						>
							{#if feature.icon === 'wave'}
								<svg
									class="h-4 w-4 text-[#ffde21]"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										d="M2 12h2a7 7 0 0 1 7-7h1a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-1a7 7 0 0 1-7-7h8a7 7 0 0 0 7 7h1a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3h-1a7 7 0 0 0-7 7"
									/>
								</svg>
							{:else if feature.icon === 'code'}
								<svg
									class="h-4 w-4 text-[#ffde21]"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<polyline points="16 18 22 12 16 6"></polyline>
									<polyline points="8 6 2 12 8 18"></polyline>
								</svg>
							{:else if feature.icon === 'visual'}
								<svg
									class="h-4 w-4 text-[#ffde21]"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<circle cx="12" cy="12" r="10"></circle>
									<circle cx="12" cy="12" r="4"></circle>
									<line x1="21.17" y1="8" x2="12" y2="8"></line>
									<line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
									<line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
								</svg>
							{:else if feature.icon === 'interact'}
								<svg
									class="h-4 w-4 text-[#ffde21]"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
									></path>
								</svg>
							{/if}
							<span class="text-xs font-medium text-white/80">{feature.label}</span>
						</div>
					{/each}
				</div>

				<!-- Action Buttons with enhanced hover effects -->
				<div
					bind:this={actionsContainer}
					class="flex flex-wrap justify-center gap-4 lg:justify-start"
				>
					<!-- Music Button -->
					<a
						href="/music"
						class="action-btn group relative overflow-hidden rounded-full px-6 py-3 font-medium text-black shadow-lg transition-all hover:shadow-[0_0_25px_rgba(255,222,33,0.4)]"
					>
						<span class="absolute inset-0 bg-[#ffde21] transition-all group-hover:bg-[#ffde21]"
						></span>
						<span
							class="absolute inset-0 bg-gradient-to-r from-[#ffde21]/0 via-[#ffde21]/30 to-[#ffde21]/0 opacity-0 transition-opacity duration-500 group-hover:animate-pulse group-hover:opacity-100"
						></span>
						<span
							class="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transform bg-black/30 transition-transform duration-300 group-hover:scale-x-100"
						></span>
						<span class="relative z-10 flex items-center">
							<svg class="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
								<path d="M9 18V6l12-3v13"></path>
								<path d="M9 18c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"></path>
								<path d="M21 15c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"></path>
							</svg>
							Explore Music
						</span>
					</a>

					<!-- Code Button -->
					<a
						href="/code"
						class="action-btn group relative overflow-hidden rounded-full px-6 py-3 font-medium text-white transition-all"
					>
						<span
							class="absolute inset-0 border border-[#ffde21]/30 bg-black/40 backdrop-blur-sm transition-all group-hover:border-[#ffde21] group-hover:bg-black/60"
						></span>
						<span
							class="absolute inset-0 bg-[#ffde21]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						></span>
						<span
							class="absolute bottom-0 left-0 h-1 w-full origin-right scale-x-0 transform bg-[#ffde21] transition-transform duration-300 group-hover:scale-x-100"
						></span>
						<span class="relative z-10 flex items-center">
							<svg class="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
							View Projects
						</span>
					</a>

					<!-- Demo Button -->
					<button
						class="action-btn group relative overflow-hidden rounded-full px-6 py-3 font-medium text-[#ffde21] transition-all"
						on:click={activatePlayer}
					>
						<span
							class="absolute inset-0 border border-[#ffde21]/40 bg-[#ffde21]/5 backdrop-blur-sm transition-all group-hover:border-[#ffde21]/60 group-hover:bg-[#ffde21]/10"
						></span>
						<span
							class="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
						>
							<span
								class="absolute inset-0 animate-pulse bg-gradient-to-r from-[#ffde21]/0 via-[#ffde21]/10 to-[#ffde21]/0"
							></span>
						</span>
						<span class="relative z-10 flex items-center">
							<svg class="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"
								></path>
							</svg>
							Play Demo
						</span>
					</button>
				</div>
			</div>

			<!-- Right Side: Featured Cards with improved layout -->
			<div
				bind:this={cardsContainer}
				class="grid h-full w-full grid-cols-1 gap-4 md:grid-cols-3 lg:col-span-3"
			>
				{#each cardData as card, i}
					<div
						bind:this={featuredCards[i]}
						class="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[#ffde21]/10 bg-black/20 p-5 backdrop-blur-md transition-all duration-300 hover:border-[#ffde21]/30 hover:bg-black/30 hover:shadow-[0_5px_20px_rgba(255,222,33,0.15)]"
						style="background: radial-gradient(circle at bottom right, {card.accent}, transparent 70%);"
					>
						<!-- Card accent decorations -->
						<div
							class="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-gradient-to-bl from-[#ffde21]/5 to-transparent"
						></div>
						<div
							class="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-[#ffde21]/5 opacity-0 transition-opacity group-hover:opacity-100"
						></div>

						<!-- Card icon with improved visual -->
						<div
							class="relative mb-4 inline-block rounded-lg border border-[#ffde21]/10 bg-black/30 p-3 text-[#ffde21] backdrop-blur-md transition-all group-hover:border-[#ffde21]/30"
						>
							{#if card.icon === 'music'}
								<svg class="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
									<path d="M9 18V6l12-3v13"></path>
									<path d="M9 18c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"></path>
									<path d="M21 15c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"></path>
								</svg>
							{:else if card.icon === 'code'}
								<svg class="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
									<path
										d="M16 18l6-6-6-6-1.4 1.4 4.6 4.6-4.6 4.6L16 18zm-8 0l-4.6-4.6L8 8.8 6.6 7.4 0 14l6.6 6.6L8 18z"
									></path>
								</svg>
							{:else if card.icon === 'person'}
								<svg class="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
									<path
										d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z"
									></path>
								</svg>
							{/if}

							<!-- Subtle glow effect -->
							<div
								class="absolute inset-0 -z-10 bg-[#ffde21]/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
							></div>
						</div>

						<!-- Card content with enhanced text -->
						<h3
							class="mb-2 text-lg font-bold text-white transition-colors group-hover:text-[#ffde21]"
						>
							{card.title}
						</h3>
						<p class="mb-4 flex-grow text-sm text-gray-300">{card.description}</p>

						<!-- Card link with enhanced animated arrow -->
						<a
							href={card.link}
							class="mt-auto inline-flex items-center text-sm text-[#ffde21] transition-colors group-hover:text-white"
						>
							<span
								class="mr-2 border-b border-transparent transition-all group-hover:border-white/50"
								>{card.linkText}</span
							>
							<svg
								class="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path
									d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"
								/>
							</svg>
						</a>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
