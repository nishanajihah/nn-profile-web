<script lang="ts">
	import { onMount } from 'svelte';
	import { Application } from '@splinetool/runtime';
	import { gsap } from 'gsap';

	export let title = 'Nisha Najihah';
	export let subtitle = 'Music Producer & Developer';
	export let showButtons = true;

	// Define proper TypeScript typings for DOM elements and Spline
	let canvas: HTMLCanvasElement;
	let container: HTMLDivElement;
	let spline: any; // Using any for Spline Application as it's an external library
	let isLoading = true;
	let progressValue = 0;
	let titleElement: HTMLHeadingElement;
	let subtitleElement: HTMLHeadingElement;
	let buttonsElement: HTMLDivElement;
	// Mouse tracking for 3D interaction with improved object targeting
	function handleMouseMove(event: MouseEvent) {
		if (!spline) return;

		// Get mouse position relative to screen center
		const mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
		const mouseY = (event.clientY / window.innerHeight - 0.5) * 2;

		// Update spline scene based on mouse position
		try {
			// Try to find main scene objects - these names depend on your Spline scene
			// You might need to adjust these based on your actual scene structure
			const mainObject =
				spline.findObjectByName('MainScene') ||
				spline.findObjectByName('Scene') ||
				spline.findObjectByName('3DObject');

			if (mainObject) {
				// Smooth rotation effect
				gsap.to(mainObject.rotation, {
					x: -mouseY * 0.05, // Reduced intensity for subtler effect
					y: mouseX * 0.08,
					duration: 1.2,
					ease: 'power2.out'
				});

				// Optional: Add subtle position change too
				gsap.to(mainObject.position, {
					x: mouseX * 0.5,
					y: -mouseY * 0.5,
					duration: 1.5,
					ease: 'power2.out'
				});
			}

			// Optional: Target camera or specific objects like lights
			const camera = spline.findObjectByName('Camera') || spline.findObjectByName('MainCamera');
			if (camera) {
				gsap.to(camera.position, {
					x: mouseX * 0.3,
					y: -mouseY * 0.3,
					duration: 1.8,
					ease: 'power3.out'
				});
			}
		} catch (error) {
			// Silently fail if spline objects aren't accessible this way
			console.log('Mouse tracking fallback: Scene structure might be different');
		}
	} // We need to use the standard onMount without async for TypeScript compatibility
	onMount(() => {
		// Create the Spline app and load the scene
		spline = new Application(canvas);

		// Listen to progress updates using proper typing for the custom event
		spline.addEventListener('progress', (e: any) => {
			progressValue = Math.floor(e.progress * 100);
		});

		// Load the 3D scene using promise instead of async/await
		spline
			.load('https://prod.spline.design/VHkhNo0aRqtSJBSS/scene.splinecode')
			.then(() => {
				// Scene loaded successfully
				isLoading = false;

				// Add text animation for Hero elements
				const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

				tl.fromTo(titleElement, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.5);
				tl.fromTo(subtitleElement, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.7);

				if (buttonsElement) {
					tl.fromTo(buttonsElement, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.9);
				}

				// Set up mouse move listener for 3D interaction
				window.addEventListener('mousemove', handleMouseMove);
			})
			.catch((error: any) => {
				console.error('Error loading Spline scene:', error);
				isLoading = false;
			});
		// Return cleanup function
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			if (spline) {
				// Clean up Spline instance if needed
			}
		};
	});
</script>

<div bind:this={container} class="relative h-screen w-full overflow-hidden">
	<!-- Canvas for Spline 3D -->
	<canvas bind:this={canvas} class="absolute inset-0 h-full w-full"></canvas>

	<!-- Loading Indicator -->
	{#if isLoading}
		<div
			class="bg-dark-900/90 absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm"
		>
			<div
				class="border-primary mb-4 h-24 w-24 animate-spin rounded-full border-t-2 border-b-2"
			></div>
			<p class="mb-2 text-xl font-bold text-white">{progressValue}%</p>
			<p class="text-gray-400">Loading 3D Experience</p>
		</div>
	{/if}
	<!-- Hero Content -->
	<div class="absolute inset-0 flex items-center justify-center">
		<div class="bg-dark-900/10 rounded-xl px-8 py-6 text-center backdrop-blur-sm">
			<h1
				bind:this={titleElement}
				class="to-primary-200 mb-4 bg-gradient-to-b from-white bg-clip-text text-5xl font-bold text-transparent md:text-6xl lg:text-7xl"
			>
				{title}
			</h1>

			<h2 bind:this={subtitleElement} class="text-primary mb-8 text-xl font-medium md:text-2xl">
				{subtitle}
			</h2>

			{#if showButtons}
				<div bind:this={buttonsElement} class="flex flex-wrap justify-center gap-4">
					<a
						href="/music"
						class="bg-primary shadow-primary/20 hover:shadow-primary/40 rounded-full px-6 py-3 font-medium text-white shadow-lg transition-all hover:scale-105 active:scale-95"
					>
						Explore Music
					</a>
					<a
						href="/code"
						class="rounded-full border border-white/20 bg-white/10 px-6 py-3 font-medium text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20 active:scale-95"
					>
						See My Code
					</a>
				</div>
			{/if}
		</div>
	</div>

	<!-- Scroll Indicator with enhanced animation -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2">
		<div class="flex flex-col items-center space-y-2">
			<span class="text-sm font-medium tracking-wide text-white/70">Scroll Down</span>
			<div class="animate-bounce">
				<svg class="text-primary h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
					/>
				</svg>
			</div>
		</div>
	</div>

	<!-- Floating particles for extra depth (optional) -->
	<div class="pointer-events-none absolute inset-0 overflow-hidden">
		{#each Array(12) as _, i}
			<div
				class="bg-primary/20 absolute rounded-full backdrop-blur-sm"
				style="
          width: {Math.random() * 20 + 5}px;
          height: {Math.random() * 20 + 5}px;
          left: {Math.random() * 100}%;
          top: {Math.random() * 100}%;
          animation: float-particle {Math.random() * 10 + 15}s ease-in-out infinite;
          animation-delay: -{Math.random() * 10}s;
        "
			></div>
		{/each}
	</div>
</div>
