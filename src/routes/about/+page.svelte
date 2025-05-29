<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Kofi from '$lib/components/Kofi.svelte';

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
	
	// Bio section items
	const bioItems = [
		{ label: 'Location', value: 'Kuala Lumpur, Malaysia' },
		{ label: 'Experience', value: '6+ Years' },
		{ label: 'Specialties', value: 'Web Development, Music Production' }
	];
	
	// Reference elements for animations
	let pageContainer;
	let bioSection;
	let timelineSection;
	let contactSection;
	let bioImage;
	let bioContent;
	let timelineElements = [];
	
	import { submitContactForm } from '$lib/services/contact.js';

	// Contact form data
	let name = '';
	let email = '';
	let message = '';
	let submitting = false;
	let submitted = false;
	let error = '';
	
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
				start: "top bottom-=100",
				end: "top center",
				toggleActions: "play none none none"
			}
		});
		
		bioTl.from(bioImage, {
			x: -50,
			opacity: 0,
			duration: 0.8,
			ease: "power2.out"
		}).from(bioContent.querySelectorAll('h2, p, .btn'), {
			y: 30,
			opacity: 0,
			stagger: 0.15,
			duration: 0.6,
			ease: "power2.out"
		}, "-=0.4");
		
		// Timeline section animations
		const timelineTl = gsap.timeline({
			scrollTrigger: {
				trigger: timelineSection,
				start: "top bottom-=100",
				end: "bottom top",
				toggleActions: "play none none none"
			}
		});
		
		timelineTl.from(timelineSection.querySelector('h2'), {
			y: 30,
			opacity: 0,
			duration: 0.6,
			ease: "power2.out"
		}).from(timelineElements, {
			y: 40,
			opacity: 0,
			stagger: 0.2,
			duration: 0.7,
			ease: "power2.out"
		}, "-=0.3");
		
		// Contact section animations
		const contactTl = gsap.timeline({
			scrollTrigger: {
				trigger: contactSection,
				start: "top bottom-=100",
				end: "center center",
				toggleActions: "play none none none"
			}
		});
		
		contactTl.from(contactSection.querySelector('h2'), {
			y: 30,
			opacity: 0,
			duration: 0.6,
			ease: "power2.out"
		}).from(contactSection.querySelector('form'), {
			y: 40,
			opacity: 0,
			duration: 0.8,
			ease: "power2.out"
		}, "-=0.3");
	});
</script>

<div class="py-12" bind:this={pageContainer}>
	<div class="container-custom">
		<header class="mb-12 text-center">
			<h1 class="mb-6 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 animate-pulse-slow">About Me</h1>
			<div class="w-20 h-1 mx-auto bg-primary rounded-full"></div>
		</header>

		<!-- Bio Section -->
		<section class="mb-24" bind:this={bioSection}>
			<div class="flex flex-col items-start gap-12 md:flex-row">
				<div class="md:w-2/5" bind:this={bioImage}>
					<div class="relative">
						<!-- Profile image with parallax effect -->
						<div class="aspect-square w-full max-w-sm overflow-hidden rounded-xl bg-gradient-to-br from-dark-800 to-dark-900 p-1">
							<div class="bg-dark-800 h-full w-full rounded-lg overflow-hidden relative">
								<!-- Replace with actual image path when available -->
								<div class="absolute inset-0 bg-gradient-to-tr from-primary/20 to-dark-900/30 z-10"></div>
								<img 
									src="https://source.unsplash.com/LPEHwlaOmdo" 
									alt="Profile" 
									class="w-full h-full object-cover"
								/>
							</div>
						</div>
						
						<!-- Floating particles for decorative effect -->
						<div class="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary/30 animate-float-slow"></div>
						<div class="absolute -bottom-4 -right-4 w-10 h-10 rounded-full bg-blue-500/30 animate-float-medium"></div>
						
						<!-- Bio details card -->
						<div class="bg-dark-800/90 backdrop-blur rounded-lg p-4 absolute -bottom-8 -right-8 shadow-xl border border-dark-700">
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
					<h2 class="mb-6 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">Hi, I'm Nisha Najihah</h2>

					<p class="mb-4 text-gray-300">
						I'm a creative developer and music producer based in Kuala Lumpur, Malaysia. I combine
						technical skills with artistic vision to create immersive digital experiences and
						atmospheric music compositions.
					</p>

					<p class="mb-4 text-gray-300">
						With over 6 years of experience spanning both software development and music production, I bring a unique
						perspective to my work. I'm passionate about the intersection of technology and
						creativity, always exploring new ways to push boundaries in both fields.
					</p>

					<p class="mb-6 text-gray-300">
						When I'm not coding or producing music, you can find me exploring new technologies,
						collecting vintage synthesizers, or hiking in nature to find inspiration for my next project.
					</p>
							<!-- Ko-fi support section -->
					<div class="mb-8 p-6 bg-dark-800/50 backdrop-blur rounded-lg border border-dark-700">
						<h3 class="text-xl font-semibold mb-3">Support My Work</h3>
						<p class="text-gray-400 mb-4">
							If you enjoy my music or find my code useful, consider supporting my work. Your support helps me continue creating and sharing.
						</p>
						<div class="flex items-center">
							<Kofi 
								username={import.meta.env.VITE_KOFI_USERNAME || 'yourkofiname'} 
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
			<h2 class="mb-12 text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">My Journey</h2>
			<div class="w-20 h-1 mx-auto bg-primary rounded-full mb-12"></div>

			<div class="mx-auto max-w-4xl">
				{#each timelineEvents as event, i}
					<div class="mb-12 flex last:mb-0" bind:this={timelineElements[i]}>
						<div class="mt-1 mr-6">
							<div class="flex flex-col items-center">
								<div
									class="bg-dark-800 border-primary/40 flex h-16 w-16 items-center justify-center rounded-full border-2 font-mono text-lg shadow-glow-sm"
								>
									{event.year}
								</div>
								{#if i < timelineEvents.length - 1}
									<div class="bg-gradient-to-b from-primary/50 to-dark-700/50 mt-2 h-24 w-1"></div>
								{/if}
							</div>
						</div>
						<div class="bg-dark-800/50 backdrop-blur-sm border border-dark-700 p-6 rounded-lg flex-1 transform hover:-translate-y-1 transition-transform duration-300">
							<h3 class="text-2xl font-bold mb-2 text-primary">{event.title}</h3>
							<p class="text-gray-300">{event.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Contact Section -->
		<section id="contact" class="mx-auto max-w-3xl pb-8" bind:this={contactSection}>
			<h2 class="mb-8 text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">Get in Touch</h2>
			<div class="w-20 h-1 mx-auto bg-primary rounded-full mb-12"></div>

			<form 
				class="bg-dark-800/70 border-dark-700 rounded-lg border p-8 shadow-xl backdrop-blur-sm"
				on:submit|preventDefault={handleSubmit}
			>
				{#if submitted}
					<div class="bg-green-800/30 border border-green-600 text-green-200 p-4 rounded mb-6 animate-pulse">
						Thank you for your message! I'll get back to you soon.
					</div>
				{/if}
				
				{#if error}
					<div class="bg-red-800/30 border border-red-600 text-red-200 p-4 rounded mb-6">
						{error}
					</div>
				{/if}
				
				<div class="mb-6">
					<label for="name" class="mb-2 block text-sm font-medium text-gray-300">Name</label>
					<input
						type="text"
						id="name"
						bind:value={name}
						class="bg-dark-700 border-dark-600 focus:ring-primary w-full rounded-md border px-4 py-3 text-white focus:border-transparent focus:ring-2 focus:outline-none"
						placeholder="Your name"
						required
					/>
				</div>

				<div class="mb-6">
					<label for="email" class="mb-2 block text-sm font-medium text-gray-300">Email</label>
					<input
						type="email"
						id="email"
						bind:value={email}
						class="bg-dark-700 border-dark-600 focus:ring-primary w-full rounded-md border px-4 py-3 text-white focus:border-transparent focus:ring-2 focus:outline-none"
						placeholder="your.email@example.com"
						required
					/>
				</div>

				<div class="mb-6">
					<label for="message" class="mb-2 block text-sm font-medium text-gray-300">Message</label>
					<textarea
						id="message"
						bind:value={message}
						rows="5"
						class="bg-dark-700 border-dark-600 focus:ring-primary w-full rounded-md border px-4 py-3 text-white focus:border-transparent focus:ring-2 focus:outline-none"
						placeholder="How can I help you? Let me know what you're thinking..."
						required
					></textarea>
				</div>

				<div class="flex flex-wrap gap-4 items-center justify-between">
					<p class="text-sm text-gray-400">
						Or reach out directly via <a
							href="mailto:nisha@example.com"
							class="text-primary hover:underline">nisha@example.com</a
						>
					</p>
					
					<button 
						type="submit" 
						class="btn btn-primary px-8 py-3" 
						disabled={submitting}
					>
						{#if submitting}
							<span class="inline-block animate-spin mr-2">⟳</span> Sending...
						{:else}
							Send Message
						{/if}
					</button>
				</div>
			</form>
		</section>
	</div>
</div>

<style>
	/* Add custom animations */
	@keyframes pulse-slow {
		0%, 100% { opacity: 0.9; }
		50% { opacity: 1; }
	}
	
	:global(.animate-pulse-slow) {
		animation: pulse-slow 3s infinite ease-in-out;
	}
	
	@keyframes float-slow {
		0%, 100% { transform: translate(0, 0); }
		50% { transform: translate(-5px, -10px); }
	}
	
	:global(.animate-float-slow) {
		animation: float-slow 8s infinite ease-in-out;
	}
	
	@keyframes float-medium {
		0%, 100% { transform: translate(0, 0); }
		50% { transform: translate(10px, -8px); }
	}
	
	:global(.animate-float-medium) {
		animation: float-medium 6s infinite ease-in-out;
	}
	
	:global(.shadow-glow-sm) {
		box-shadow: 0 0 10px rgba(30, 136, 229, 0.3);
	}
</style>
