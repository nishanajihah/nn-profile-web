<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Kofi from '$lib/components/Kofi.svelte';
	import PageLayout from '$lib/components/PageLayout.svelte';

	// Register ScrollTrigger plugin
	gsap.registerPlugin(ScrollTrigger);

	// Timeline data for the journey section
	const timelineEvents = [
		{
			year: '2022',
			title: 'Senior Developer',
			description: 'Advanced to a senior role focusing on architecture and mentorship.'
		},
		{
			year: '2020',
			title: 'Full Stack Developer',
			description: 'Worked on various web applications using modern technologies.'
		},
		{
			year: '2018',
			title: 'Music Producer',
			description: 'Released first EP on major streaming platforms.'
		},
		{
			year: '2016',
			title: 'Frontend Developer',
			description: 'Started career in web development.'
		}
	];
	import { submitContactForm } from '$lib/services/contact';
	
	// Bio section items
	const bioItems = [
		{ label: 'Location', value: 'Kuala Lumpur, Malaysia' },
		{ label: 'Experience', value: '6+ Years' },
		{ label: 'Specialties', value: 'Web Development, Music Production' }
	];
	
	// Reference elements for animations
	let pageContainer: HTMLElement;
	let bioSection: HTMLElement;
	let timelineSection: HTMLElement;
	let contactSection: HTMLElement;
	let bioImage: HTMLElement;
	let bioContent: HTMLElement;
	let timelineElements: HTMLElement[] = [];
	
	// Contact form data
	let name: string = '';
	let email: string = '';
	let message: string = '';
	let submitting: boolean = false;
	let submitted: boolean = false;
	let error: string = '';

	// Handle form submission
	async function handleSubmit() {
		submitting = true;
		error = '';

		try {
			// Submit the form using our contact service
			await submitContactForm({
				name,
				email,
				message
			});

			// Reset form and show success message
			name = '';
			email = '';
			message = '';
			submitted = true;

			// Hide success message after 5 seconds
			setTimeout(() => {
				submitted = false;
			}, 5000);
		} catch (err) {
			console.error('Contact form error:', err);
			error = 'There was a problem submitting your message. Please try again.';
		} finally {
			submitting = false;
		}
	}

	// Initialize animations
	onMount(() => {
		// Staggered entrance animation for bio section
		const bioTl = gsap.timeline({
			scrollTrigger: {
				trigger: bioSection,
				start: 'top bottom-=100',
				end: 'top center',
				toggleActions: 'play none none none'
			}
		});

		bioTl
			.from(bioImage, {
				x: -50,
				opacity: 0,
				duration: 0.8,
				ease: 'power2.out'
			})
			.from(
				bioContent.querySelectorAll('h2, p, .btn'),
				{
					y: 30,
					opacity: 0,
					stagger: 0.15,
					duration: 0.6,
					ease: 'power2.out'
				},
				'-=0.4'
			);

		// Timeline section animations
		const timelineTl = gsap.timeline({
			scrollTrigger: {
				trigger: timelineSection,
				start: 'top bottom-=100',
				end: 'bottom top',
				toggleActions: 'play none none none'
			}
		});

		timelineTl
			.from(timelineSection.querySelector('h2'), {
				y: 30,
				opacity: 0,
				duration: 0.6,
				ease: 'power2.out'
			})
			.from(
				timelineElements,
				{
					y: 40,
					opacity: 0,
					stagger: 0.2,
					duration: 0.7,
					ease: 'power2.out'
				},
				'-=0.3'
			);		// Contact section animations
		const contactTl = gsap.timeline({
			scrollTrigger: {
				trigger: contactSection,
				start: 'top bottom-=100',
				end: 'center center',
				toggleActions: 'play none none none'
			}
		});

		contactTl
			.from(contactSection.querySelector('h2'), {
				y: 30,
				opacity: 0,
				duration: 0.6,
				ease: 'power2.out'
			})
			.from(
				contactSection.querySelector('div.glassmorphic-card'),
				{
					y: 40,
					opacity: 0,
					duration: 0.8,
					ease: 'power2.out'
				},
				'-=0.3'
			);
			
		// Set initial opacity to 1 in case animation has issues
		if (contactSection && contactSection.querySelector('.glassmorphic-card')) {
			contactSection.querySelector('.glassmorphic-card').style.opacity = '1';
		}
	});
</script>

<PageLayout title="About Me" subtitle="Developer, music producer, and creative technologist">
	<div class="container-custom" bind:this={pageContainer}>
		<!-- Bio Section -->
		<section class="mb-24" bind:this={bioSection}>
			<div class="flex flex-col items-start gap-12 md:flex-row">
				<div class="md:w-2/5" bind:this={bioImage}>
					<div class="relative">
						<!-- Profile image with parallax effect -->
						<div
							class="from-dark-800 to-dark-900 aspect-square w-full max-w-sm overflow-hidden rounded-xl bg-gradient-to-br p-1"
						>
							<div class="bg-dark-800 relative h-full w-full overflow-hidden rounded-lg">
								<!-- Replace with actual image path when available -->
								<div
									class="from-primary/20 to-dark-900/30 absolute inset-0 z-10 bg-gradient-to-tr"
								></div>
								<img
									src="https://source.unsplash.com/LPEHwlaOmdo"
									alt="Profile"
									class="h-full w-full object-cover"
								/>
							</div>
						</div>

						<!-- Floating particles for decorative effect -->
						<div
							class="bg-primary/30 animate-float-slow absolute -top-4 -left-4 h-8 w-8 rounded-full"
						></div>
						<div
							class="animate-float-medium absolute -right-4 -bottom-4 h-10 w-10 rounded-full bg-blue-500/30"
						></div>

						<!-- Bio details card -->
						<div
							class="bg-dark-800/90 border-dark-700 absolute -right-8 -bottom-8 rounded-lg border p-4 shadow-xl backdrop-blur"
						>
							{#each bioItems as item}
								<div class="mb-2 last:mb-0">
									<span class="text-xs font-semibold text-gray-400">{item.label}</span>
									<p class="text-sm">{item.value}</p>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<div class="md:w-3/5" bind:this={bioContent}>
					<h2
						class="from-primary mb-6 bg-gradient-to-r to-blue-500 bg-clip-text text-3xl font-bold text-transparent"
					>
						Hi, I'm Nisha Najihah
					</h2>

					<p class="mb-4 text-gray-300">
						I'm a creative developer and music producer based in Kuala Lumpur, Malaysia. I combine
						technical skills with artistic vision to create immersive digital experiences and
						atmospheric music compositions.
					</p>

					<p class="mb-4 text-gray-300">
						With over 6 years of experience spanning both software development and music production,
						I bring a unique perspective to my work. I'm passionate about the intersection of
						technology and creativity, always exploring new ways to push boundaries in both fields.
					</p>

					<p class="mb-6 text-gray-300">
						When I'm not coding or producing music, you can find me exploring new technologies,
						collecting vintage synthesizers, or hiking in nature to find inspiration for my next
						project.
					</p>
					<!-- Ko-fi support section -->
					<div class="bg-dark-800/50 border-dark-700 mb-8 rounded-lg border p-6 backdrop-blur">
						<h3 class="mb-3 text-xl font-semibold">Support My Work</h3>
						<p class="mb-4 text-gray-400">
							If you enjoy my music or find my code useful, consider supporting my work. Your
							support helps me continue creating and sharing.
						</p>
						<div class="flex items-center">
							<Kofi
								username={import.meta.env.PUBLIC_KOFI_USERNAME || 'yourkofiname'}
								text="Support My Work"
								wide={true}
								color="#1E88E5"
							/>
						</div>
					</div>

					<div class="mt-8 flex flex-wrap gap-4">
						<a href="/code" class="btn btn-primary">View Projects</a>
						<a href="/music" class="btn btn-secondary">Listen to Music</a>
						<a href="#contact" class="btn btn-outline">Contact Me</a>
					</div>
				</div>
			</div>
		</section>

		<!-- Journey/Timeline Section -->
		<section class="mb-24" bind:this={timelineSection}>
			<h2
				class="from-primary mb-12 bg-gradient-to-r to-blue-500 bg-clip-text text-center text-3xl font-bold text-transparent"
			>
				My Journey
			</h2>
			<div class="bg-primary mx-auto mb-12 h-1 w-20 rounded-full"></div>

			<div class="mx-auto max-w-4xl">
				{#each timelineEvents as event, i}
					<div class="mb-12 flex last:mb-0" bind:this={timelineElements[i]}>
						<div class="mt-1 mr-6">
							<div class="flex flex-col items-center">
								<div
									class="bg-dark-800 border-primary/40 shadow-glow-sm flex h-16 w-16 items-center justify-center rounded-full border-2 font-mono text-lg"
								>
									{event.year}
								</div>
								{#if i < timelineEvents.length - 1}
									<div class="from-primary/50 to-dark-700/50 mt-2 h-24 w-1 bg-gradient-to-b"></div>
								{/if}
							</div>
						</div>
						<div
							class="bg-dark-800/50 border-dark-700 flex-1 transform rounded-lg border p-6 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
						>
							<h3 class="text-primary mb-2 text-2xl font-bold">{event.title}</h3>
							<p class="text-gray-300">{event.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</section>
		<!-- Contact Section -->
		<section id="contact" class="mx-auto max-w-3xl pb-8" bind:this={contactSection}>
			<h2
				class="from-primary mb-8 bg-gradient-to-r to-blue-500 bg-clip-text text-center text-3xl font-bold text-transparent"
			>
				Get in Touch
			</h2>
			<div class="bg-primary mx-auto mb-12 h-1 w-20 rounded-full"></div>

			<div class="glassmorphic-card p-8">
				<div class="mb-8 text-center">
					<svg
						class="text-primary mx-auto mb-4 h-16 w-16"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						></path>
					</svg>
					<h3 class="mb-2 text-2xl font-bold">Let's Connect</h3>
					<p class="mb-6 text-gray-300">
						I'd love to hear from you! Feel free to reach out with any questions, collaboration
						ideas, or just to say hello.
					</p>
				</div>

				<!-- Contact form with Mailgun integration -->
				<form on:submit|preventDefault={handleSubmit} class="mb-8 space-y-6">
					<div>
						<label for="name" class="mb-1 block text-sm font-medium text-gray-300">Name</label>
						<input
							id="name"
							bind:value={name}
							type="text"
							required
							class="bg-dark-800/50 border-dark-700 focus:ring-primary/50 focus:border-primary w-full rounded-lg border px-4 py-3 focus:ring-2"
						/>
					</div>

					<div>
						<label for="email" class="mb-1 block text-sm font-medium text-gray-300">Email</label>
						<input
							id="email"
							bind:value={email}
							type="email"
							required
							class="bg-dark-800/50 border-dark-700 focus:ring-primary/50 focus:border-primary w-full rounded-lg border px-4 py-3 focus:ring-2"
						/>
					</div>

					<div>
						<label for="message" class="mb-1 block text-sm font-medium text-gray-300">Message</label
						>
						<textarea
							id="message"
							bind:value={message}
							rows="4"
							required
							class="bg-dark-800/50 border-dark-700 focus:ring-primary/50 focus:border-primary w-full resize-none rounded-lg border px-4 py-3 focus:ring-2"
						></textarea>
					</div>

					<div class="flex justify-end">
						<button type="submit" class="btn btn-primary px-8 py-3" disabled={submitting}>
							{#if submitting}
								<span class="mr-2 inline-block animate-spin">⟳</span> Sending...
							{:else}
								Send Message
							{/if}
						</button>
					</div>

					{#if submitted}
						<div
							class="mt-4 rounded-lg border border-green-500/30 bg-green-500/20 p-4 text-green-300"
						>
							Your message has been sent successfully! I'll get back to you soon.
						</div>
					{/if}

					{#if error}
						<div class="mt-4 rounded-lg border border-red-500/30 bg-red-500/20 p-4 text-red-300">
							{error}
						</div>
					{/if}
				</form>

				<!-- Alternative contact methods -->
				<div class="mt-10 border-t border-[var(--border-light)] pt-6 text-center">
					<p class="mb-4 text-sm text-gray-400">You can also reach me through these platforms:</p>

					<div class="flex flex-wrap justify-center gap-4">
						<a
							href="https://twitter.com/yourtwitterhandle"
							target="_blank"
							rel="noopener noreferrer"
							class="btn btn-outline inline-flex items-center px-5 py-2"
						>
							<svg
								class="mr-2 h-5 w-5"
								fill="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
								/>
							</svg>
							Twitter
						</a>

						<a
							href="https://linkedin.com/in/yourlinkedinprofile"
							target="_blank"
							rel="noopener noreferrer"
							class="btn btn-outline inline-flex items-center px-5 py-2"
						>
							<svg
								class="mr-2 h-5 w-5"
								fill="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
								/>
							</svg>
							LinkedIn
						</a>

						<a
							href="https://calendly.com/yourname"
							target="_blank"
							rel="noopener noreferrer"
							class="btn btn-outline inline-flex items-center px-5 py-2"
						>
							<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								></path>
							</svg>
							Schedule a Call
						</a>
					</div>
				</div>
			</div>
		</section>
	</div>
</PageLayout>

<style>
	/* Add custom animations */
	@keyframes pulse-slow {
		0%,
		100% {
			opacity: 0.9;
		}
		50% {
			opacity: 1;
		}
	}

	:global(.animate-pulse-slow) {
		animation: pulse-slow 3s infinite ease-in-out;
	}

	@keyframes float-slow {
		0%,
		100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(-5px, -10px);
		}
	}

	:global(.animate-float-slow) {
		animation: float-slow 8s infinite ease-in-out;
	}

	@keyframes float-medium {
		0%,
		100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(10px, -8px);
		}
	}

	:global(.animate-float-medium) {
		animation: float-medium 6s infinite ease-in-out;
	}
	:global(.shadow-glow-sm) {
		box-shadow: 0 0 10px var(--glow-color);
	}
	
	/* Ensure the glassmorphic card is always visible */
	.glassmorphic-card {
		opacity: 1 !important;
		visibility: visible !important;
		min-height: 100px;
	}
</style>
