<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	export let title: string = '';
	export let subtitle: string = '';
	export let withParticles: boolean = true;

	// Define proper typings for DOM elements
	let pageContent: HTMLElement;
	let particleContainer: HTMLDivElement;
	let glowEffect: HTMLDivElement;
	let particlesGenerated = false;
	let mouseMoveTimeout: ReturnType<typeof setTimeout> | null = null;
	let isInteracting = false;

	// Function to handle mouse interaction for glow effect with improved dynamics
	function handleMouseMove(event: MouseEvent) {
		if (!glowEffect) return;

		// Update glow effect position with smoother animation
		const containerRect = pageContent.getBoundingClientRect();
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
		if (!particleContainer || particlesGenerated) return;

		for (let i = 0; i < count; i++) {
			const particle = document.createElement('div');
			particle.className = 'ambient-particle';

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

	onMount(() => {
		// Add mouse movement listener for glow effect
		pageContent?.addEventListener('mousemove', handleMouseMove);

		// Generate ambient particles
		if (withParticles) {
			generateParticles();
		}

		// Set up ambient animation for glow when not interacting
		gsap.to(glowEffect, {
			opacity: 0.5,
			scale: 1.2,
			duration: 4,
			repeat: -1,
			yoyo: true,
			ease: 'sine.inOut'
		});

		// Animate page title and content entrance
		const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

		if (title) {
			const titleElement = document.querySelector('.page-title');
			if (titleElement) {
				tl.fromTo(
					titleElement,
					{ y: 30, opacity: 0, scale: 0.95 },
					{ y: 0, opacity: 1, scale: 1, duration: 1.2 },
					0.3
				);
			}
		}

		if (subtitle) {
			const subtitleElement = document.querySelector('.page-subtitle');
			if (subtitleElement) {
				tl.fromTo(subtitleElement, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.7);
			}
		}

		// Cleanup on destroy
		return () => {
			pageContent?.removeEventListener('mousemove', handleMouseMove);
			if (mouseMoveTimeout !== null) {
				clearTimeout(mouseMoveTimeout);
				mouseMoveTimeout = null;
			}
		};
	});
</script>

<div bind:this={pageContent} class="relative min-h-screen w-full overflow-x-hidden">
	{#if withParticles}
		<!-- Ambient Floating Particles -->
		<div
			bind:this={particleContainer}
			class="pointer-events-none absolute inset-0 z-0 overflow-hidden"
		></div>
	{/if}

	<!-- Glow Effect Layer -->
	<div bind:this={glowEffect} class="glow-effect"></div>

	<!-- Page Header -->
	{#if title}
		<div class="container-custom relative z-10 pt-32 pb-12 text-center">
			<!-- Title with enhanced gradient effect -->
			<div class="relative inline-block">
				<h1 class="page-title gradient-text mb-4 text-5xl font-bold tracking-tight sm:text-6xl">
					{title}
				</h1>
				<!-- Decorative element under title -->
				<div
					class="absolute -bottom-1 left-0 h-[6px] w-full bg-gradient-to-r from-[rgba(var(--primary),0)] via-[var(--primary)] to-[rgba(var(--primary),0)]"
				></div>
			</div>

			{#if subtitle}
				<p class="page-subtitle mx-auto max-w-3xl text-xl text-[var(--text-secondary)]">
					{subtitle}
				</p>
			{/if}
		</div>
	{/if}

	<!-- Main Content -->
	<main class="container-custom relative z-10 pb-24">
		<slot></slot>
	</main>
</div>
