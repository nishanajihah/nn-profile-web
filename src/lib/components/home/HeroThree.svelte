<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import ThreeBackground from './ThreeBackground.svelte';

	export let title = 'Nisha Najihah';
	export let subtitle = 'Music Producer & Developer';
	export let showButtons = true;
	// Define proper TypeScript typings for DOM elements
	let container: HTMLDivElement;
	let titleElement: HTMLHeadingElement;
	let subtitleElement: HTMLHeadingElement;
	let buttonsElement: HTMLDivElement;
	let scrollIndicator: HTMLDivElement;
	let glowEffect: HTMLDivElement;
	let mouseMoveTimeout: ReturnType<typeof setTimeout> | null = null;
	let isInteracting = false;

	// Function to handle mouse interaction
	function handleMouseMove(event: MouseEvent) {
		if (!glowEffect) return;

		// Update glow effect position
		const containerRect = container.getBoundingClientRect();
		const x = event.clientX - containerRect.left;
		const y = event.clientY - containerRect.top;

		gsap.to(glowEffect, {
			x: x,
			y: y,
			opacity: 0.8,
			scale: 1.1,
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
				opacity: 0.3,
				scale: 1,
				duration: 1.5,
				ease: 'power2.out'
			});
		}, 300);
	}

	// Animation function
	onMount(() => {
		// Create timeline for entrance animations
		const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

		// Animate hero elements with staggered entrance
		tl.fromTo(titleElement, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, 0.5);
		tl.fromTo(subtitleElement, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.8);

		if (buttonsElement) {
			tl.fromTo(buttonsElement, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 1.1);
		}

		// Animate scroll indicator and glow
		tl.fromTo(scrollIndicator, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 1.4);
		tl.fromTo(glowEffect, { opacity: 0, scale: 0.8 }, { opacity: 0.3, scale: 1, duration: 2 }, 0.2);

		// Set up ambient animation for glow when not interacting
		gsap.to(glowEffect, {
			opacity: 0.5,
			scale: 1.1,
			duration: 3,
			repeat: -1,
			yoyo: true,
			ease: 'sine.inOut'
		});

		// Add mouse interaction handler
		container.addEventListener('mousemove', handleMouseMove);
		// Cleanup on destroy
		return () => {
			container.removeEventListener('mousemove', handleMouseMove);
			if (mouseMoveTimeout !== null) {
				clearTimeout(mouseMoveTimeout);
				mouseMoveTimeout = null;
			}
		};
	});
</script>

<div bind:this={container} class="relative min-h-screen w-full overflow-hidden">
	<!-- Three.js Background -->
	<ThreeBackground />
	<!-- Glow Effect Layer -->
	<div
		bind:this={glowEffect}
		class="pointer-events-none absolute z-5 h-[30vw] w-[30vw] rounded-full bg-[#ffde21]/30 blur-[120px]"
	></div>

	<!-- Hero Content -->
	<div class="absolute inset-0 z-10 flex items-center justify-center">
		<div
			class="max-w-3xl rounded-2xl border border-[#ffde21]/10 bg-black/10 px-8 py-12 text-center shadow-[0_0_30px_rgba(255,222,33,0.07)] backdrop-blur-md transition-all hover:shadow-[0_0_40px_rgba(255,222,33,0.1)]"
		>
			<h1
				bind:this={titleElement}
				class="mb-6 bg-gradient-to-br from-[#ffde21] via-[#fff8cc] to-[#ffde21] bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl lg:text-7xl"
			>
				{title}
			</h1>

			<h2
				bind:this={subtitleElement}
				class="mb-10 text-xl leading-relaxed font-medium text-white/90 md:text-2xl"
			>
				{subtitle}
			</h2>

			{#if showButtons}
				<div bind:this={buttonsElement} class="flex flex-wrap justify-center gap-6">
					<a
						href="/music"
						class="group relative overflow-hidden rounded-full px-10 py-4 font-medium text-black shadow-lg transition-all hover:shadow-[0_0_25px_rgba(255,222,33,0.4)]"
					>
						<span class="absolute inset-0 bg-[#ffde21] transition-all group-hover:bg-[#ffde21]"
						></span>
						<span
							class="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transform bg-white transition-transform duration-300 group-hover:scale-x-100"
						></span>
						<span class="relative z-10 flex items-center">
							<svg class="mr-2 -ml-1 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
								<path d="M9 18V6l12-3v13"></path>
								<path d="M9 18c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"></path>
								<path d="M21 15c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"></path>
							</svg>
							<span>Explore Music</span>
						</span>
					</a>
					<a
						href="/code"
						class="group relative overflow-hidden rounded-full px-10 py-4 font-medium text-white backdrop-blur-sm transition-all"
					>
						<span
							class="absolute inset-0 border border-[#ffde21]/20 bg-white/10 transition-all group-hover:border-[#ffde21]/40 group-hover:bg-white/20"
						></span>
						<span
							class="absolute bottom-0 left-0 h-1 w-full origin-right scale-x-0 transform bg-[#ffde21] transition-transform duration-300 group-hover:scale-x-100"
						></span>
						<span class="relative z-10 flex items-center">
							<svg class="mr-2 -ml-1 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M16 18L22 12L16 6"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									fill="none"
								></path>
								<path
									d="M8 6L2 12L8 18"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									fill="none"
								></path>
								<path
									d="M14.5 4L9.5 20"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
							</svg>
							<span>See My Code</span>
						</span>
					</a>
				</div>
			{/if}
		</div>
	</div>
	<!-- Modern scroll indicator with enhanced animation -->
	<div bind:this={scrollIndicator} class="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
		<div class="flex flex-col items-center space-y-3">
			<span class="text-sm font-medium tracking-wide text-white/80 drop-shadow-md">
				Scroll to discover
			</span>

			<!-- Animated arrow with pulsing effect -->
			<div class="relative h-12">
				<!-- Animated glow behind arrow -->
				<div
					class="absolute inset-0 mx-auto h-6 w-6 animate-ping rounded-full bg-[#ffde21]/20 blur-md"
				></div>

				<!-- Arrow icon with bounce animation -->
				<div class="animate-bounce">
					<svg
						class="mx-auto h-6 w-6 text-[#ffde21]"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 14l-7 7m0 0l-7-7m7 7V3"
						/>
					</svg>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Add any component-specific styles here */
</style>
