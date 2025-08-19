<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Kofi from '$lib/components/Kofi.svelte';
	import PageLayout from '$lib/components/PageLayout.svelte';
	import './about.css';

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
	
	// Skills data for skill showcase
	const skills = [
		{
			category: 'Development',
			items: ['JavaScript', 'TypeScript', 'React', 'Svelte', 'Node.js', 'Express', 'MongoDB', 'SQL']
		},
		{
			category: 'Music Production',
			items: ['Ableton Live', 'Logic Pro', 'Sound Design', 'Mixing', 'Mastering', 'MIDI Composition']
		},
		{
			category: 'Tools & Design',
			items: ['Figma', 'Adobe XD', 'Git', 'Docker', 'AWS', 'UI/UX Design']
		}
	];
	
	// Bio section items
	const bioItems = [
		{ label: 'Location', value: 'Kuala Lumpur, Malaysia' },
		{ label: 'Experience', value: '6+ Years' },
		{ label: 'Specialties', value: 'Web Development, Music Production' }
	];
	
	// Personal achievements and highlights
	const achievements = [
		{
			title: 'Featured Developer',
			description: 'Selected as a featured developer on the React community showcase',
			icon: 'trophy'
		},
		{
			title: '10K+ Monthly Streams',
			description: 'Music tracks reaching more than 10,000 monthly listeners on Spotify',
			icon: 'music'
		},
		{
			title: 'Open Source Contributor',
			description: 'Regular contributor to key open source projects with 50+ PRs merged',
			icon: 'code'
		},
		{
			title: 'Speaker & Mentor',
			description: 'Presented at tech conferences and mentored junior developers',
			icon: 'mic'
		}
	];
	
	// Reference elements for animations
	let heroSection: HTMLElement;
	let bioSection: HTMLElement;
	let timelineSection: HTMLElement;
	let skillsSection: HTMLElement;
	let achievementsSection: HTMLElement;
	let donationSection: HTMLElement;
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
	
	// Social links
	const socialLinks = [
		{ name: 'Twitter', url: 'https://twitter.com/yourtwitterhandle', icon: 'twitter' },
		{ name: 'LinkedIn', url: 'https://linkedin.com/in/yourlinkedinprofile', icon: 'linkedin' },
		{ name: 'GitHub', url: 'https://github.com/yourgithubname', icon: 'github' },
		{ name: 'Schedule a Call', url: 'https://calendly.com/yourname', icon: 'calendar' }
	];
	
	// Testimonials/recommendations
	const testimonials = [
		{
			quote: "Nisha's attention to detail and creativity make her stand out in both development and music production.",
			author: "Jane Smith, Creative Director",
			company: "Digital Studios"
		},
		{
			quote: "Working with Nisha was a game-changer for our project. Her technical skills and artistic vision are exceptional.",
			author: "Alex Johnson, CEO",
			company: "TechWave Solutions"
		}
	];

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
	}	// Initialize animations
	onMount(() => {		// Ensure badges are visible immediately
		const badges = heroSection.querySelectorAll('.hero-badge');
		badges.forEach(badge => {
			(badge as HTMLElement).style.opacity = '1';
			(badge as HTMLElement).style.visibility = 'visible';
			(badge as HTMLElement).style.transform = 'scale(1)';
		});
		
		// Hero section animations with improved persistence
		const heroTl = gsap.timeline({
			onComplete: () => {
				// After initial animation, ensure elements are fully visible
				badges.forEach(badge => {
					// Force these styles to be applied with !important via class
					badge.classList.add('badge-visible');
				});
			}
		});
		
		heroTl
			.from(heroSection.querySelector('.hero-content'), {
				y: 30,
				opacity: 0,
				duration: 0.8,
				ease: 'power2.out'
			})
			.from(
				heroSection.querySelectorAll('.hero-badge'),
				{
					scale: 0.8,
					opacity: 0,
					stagger: 0.15,
					duration: 0.6,
					ease: 'back.out(1.7)'
				},
				'-=0.4'
			);
		
		// Bio section animations with scroll trigger
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
			);
			
		// Skills section animations
		const skillsTl = gsap.timeline({
			scrollTrigger: {
				trigger: skillsSection,
				start: 'top bottom-=100',
				end: 'center center',
				toggleActions: 'play none none none'
			}
		});

		skillsTl
			.from(skillsSection.querySelector('h2'), {
				y: 30,
				opacity: 0,
				duration: 0.6,
				ease: 'power2.out'
			})
			.from(
				skillsSection.querySelectorAll('.skill-category'),
				{
					y: 40,
					opacity: 0,
					stagger: 0.2,
					duration: 0.7,
					ease: 'power2.out'
				},
				'-=0.3'
			);
			
		// Achievements section animations
		const achievementsTl = gsap.timeline({
			scrollTrigger: {
				trigger: achievementsSection,
				start: 'top bottom-=100',
				end: 'center center',
				toggleActions: 'play none none none'
			}
		});

		achievementsTl
			.from(achievementsSection.querySelector('h2'), {
				y: 30,
				opacity: 0,
				duration: 0.6,
				ease: 'power2.out'
			})
			.from(
				achievementsSection.querySelectorAll('.achievement-card'),
				{
					scale: 0.9,
					y: 30,
					opacity: 0,
					stagger: 0.15,
					duration: 0.7,
					ease: 'power2.out'
				},
				'-=0.3'
			);
			
		// Donation section animations
		const donationTl = gsap.timeline({
			scrollTrigger: {
				trigger: donationSection,
				start: 'top bottom-=100',
				end: 'center center',
				toggleActions: 'play none none none'
			}
		});

		donationTl
			.from(donationSection.querySelector('h2'), {
				y: 30,
				opacity: 0,
				duration: 0.6,
				ease: 'power2.out'
			})
			.from(
				donationSection.querySelector('.donation-card'),
				{
					y: 40,
					opacity: 0,
					duration: 0.8,
					ease: 'power2.out'
				},
				'-=0.3'
			);
			
		// Contact section animations
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
				contactSection.querySelector('.glassmorphic-card'),
				{
					y: 40,
					opacity: 0,
					duration: 0.8,
					ease: 'power2.out'
				},
				'-=0.3'
			);
			
		// Testimonials animation
		const testimonialElements = contactSection.querySelectorAll('.testimonial-card');
		if (testimonialElements.length > 0) {
			gsap.from(testimonialElements, {
				scrollTrigger: {
					trigger: testimonialElements[0],
					start: 'top bottom-=50',
					toggleActions: 'play none none none'
				},
				x: 100,
				opacity: 0,
				stagger: 0.3,
				duration: 0.8,
				ease: 'power2.out'
			});
		}
			
		// Ensure elements are visible in case animations have issues
		if (contactSection) {
			const card = contactSection.querySelector('.glassmorphic-card');
			if (card) {
				(card as HTMLElement).style.opacity = '1';
			}
		}
	});
</script>

<PageLayout title="About Me" subtitle="Developer, music producer, and creative technologist">
	<div class="container-custom">
		<!-- Hero Section with Navigation -->
		<section bind:this={heroSection} class="py-16 md:py-24 relative overflow-hidden">
			<div class="hero-content relative z-10 max-w-5xl mx-auto text-center">
				<h1 class="text-5xl md:text-6xl font-bold mb-6 from-primary to-blue-500 bg-gradient-to-r bg-clip-text text-transparent">
					Nisha Najihah
				</h1>
				<p class="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
					Creating digital experiences at the intersection of technology and creativity
				</p>
						<!-- Navigation badges with glow effect -->
				<div class="flex flex-wrap justify-center gap-4 md:gap-6">
					<a href="#about" class="hero-badge badge-visible glow-effect bg-dark-800/80 border border-primary/20 hover:border-primary/60 px-6 py-4 rounded-xl flex items-center transition-all duration-300">
						<span class="text-primary mr-3">
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
							</svg>
						</span>
						<span class="font-medium">About Me</span>
					</a>					<a href="#journey" class="hero-badge badge-visible bg-dark-800/80 border border-blue-500/20 hover:border-blue-500/60 px-6 py-4 rounded-xl flex items-center transition-all duration-300">
						<span class="text-blue-500 mr-3">
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
						</span>
						<span class="font-medium">My Journey</span>
					</a>					<a href="#skills" class="hero-badge badge-visible bg-dark-800/80 border border-purple-500/20 hover:border-purple-500/60 px-6 py-4 rounded-xl flex items-center transition-all duration-300">
						<span class="text-purple-500 mr-3">
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
							</svg>
						</span>
						<span class="font-medium">Skills</span>
					</a>					<a href="#achievements" class="hero-badge badge-visible bg-dark-800/80 border border-teal-500/20 hover:border-teal-500/60 px-6 py-4 rounded-xl flex items-center transition-all duration-300">
						<span class="text-teal-500 mr-3">
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
							</svg>
						</span>
						<span class="font-medium">Achievements</span>
					</a>					<a href="#support" class="hero-badge badge-visible bg-dark-800/80 border border-amber-500/20 hover:border-amber-500/60 px-6 py-4 rounded-xl flex items-center transition-all duration-300">
						<span class="text-amber-500 mr-3">
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
						</span>
						<span class="font-medium">Support</span>
					</a>					<a href="#contact" class="hero-badge badge-visible bg-dark-800/80 border border-rose-500/20 hover:border-rose-500/60 px-6 py-4 rounded-xl flex items-center transition-all duration-300">
						<span class="text-rose-500 mr-3">
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
							</svg>
						</span>
						<span class="font-medium">Contact</span>
					</a>
				</div>
			</div>
			
			<!-- Animated background particles -->
			<div class="absolute inset-0 -z-10">
				<div class="absolute top-10 left-1/4 w-20 h-20 rounded-full bg-primary/10 animate-float-slow"></div>
				<div class="absolute bottom-10 right-1/3 w-32 h-32 rounded-full bg-blue-500/5 animate-float-medium"></div>
				<div class="absolute top-1/2 left-10 w-16 h-16 rounded-full bg-purple-500/10 animate-pulse-slow"></div>
			</div>
		</section>
		
		<!-- Bio Section with enhanced layout -->
		<section id="about" class="mb-24 pt-10" bind:this={bioSection}>
			<div class="flex flex-col items-start gap-12 md:flex-row">				<div class="md:w-2/5 sticky top-32 bio-image-container" bind:this={bioImage}>
					<div class="relative">
						<!-- Profile image with enhanced layering -->
						<div class="aspect-square w-full max-w-sm overflow-hidden rounded-xl bg-gradient-to-br from-dark-800 to-dark-900 p-1.5 shadow-2xl">
							<div class="relative h-full w-full overflow-hidden rounded-lg bg-dark-800">
								<div class="absolute inset-0 z-10 bg-gradient-to-tr from-primary/20 to-dark-900/30"></div>								<img
									src="/images/profile-nisha.png"
									alt="Profile"
									class="h-full w-full object-cover"
								/>
								
								<!-- Interactive overlay -->
								<div class="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent flex items-end p-6">
									<div class="space-y-2">
										<div class="inline-flex items-center space-x-2 bg-dark-800/80 px-3 py-1 rounded-full backdrop-blur-sm">
											<span class="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
											<span class="text-xs text-green-400">Available for projects</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- Floating particles with enhanced animation -->
						<div class="absolute -top-4 -left-4 h-8 w-8 rounded-full bg-primary/30 animate-float-slow"></div>
						<div class="absolute -right-4 -bottom-4 h-10 w-10 rounded-full bg-blue-500/30 animate-float-medium"></div>
						<div class="absolute top-1/2 -right-8 h-16 w-16 rounded-full bg-purple-500/10 animate-pulse-slow"></div>

						<!-- Bio details card with improved styling -->
						<div class="absolute -right-8 -bottom-8 rounded-lg border border-dark-700 bg-dark-800/90 p-5 shadow-xl backdrop-blur">
							{#each bioItems as item}
								<div class="mb-3 last:mb-0">
									<span class="text-xs font-semibold text-gray-400">{item.label}</span>
									<p class="text-sm font-medium">{item.value}</p>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<div class="md:w-3/5" bind:this={bioContent}>
					<div class="border-l-4 border-primary pl-4 mb-6">
						<h2 class="text-3xl font-bold mb-2 from-primary to-blue-500 bg-gradient-to-r bg-clip-text text-transparent">
							Hi, I'm Nisha Najihah
						</h2>
						<p class="text-gray-400 italic">Developer • Music Producer • Creative Technologist</p>
					</div>

					<p class="mb-5 text-gray-300 text-lg leading-relaxed">
						I'm a creative developer and music producer based in Kuala Lumpur, Malaysia. I combine
						technical skills with artistic vision to create immersive digital experiences and
						atmospheric music compositions.
					</p>

					<p class="mb-5 text-gray-300 text-lg leading-relaxed">
						With over 6 years of experience spanning both software development and music production,
						I bring a unique perspective to my work. I'm passionate about the intersection of
						technology and creativity, always exploring new ways to push boundaries in both fields.
					</p>

					<p class="mb-6 text-gray-300 text-lg leading-relaxed">
						When I'm not coding or producing music, you can find me exploring new technologies,
						collecting vintage synthesizers, or hiking in nature to find inspiration for my next
						project.
					</p>
					
					<!-- Quote card -->
					<blockquote class="border-l-4 border-blue-500 pl-6 my-8 italic text-gray-300">
						"The most exciting creations happen at the intersection of technology and art. 
						That's where I love to exist - in that beautiful, challenging space between logic and emotion."
					</blockquote>

					<div class="mt-10 flex flex-wrap gap-4">
						<a href="/code" class="btn btn-primary">View Projects</a>
						<a href="/music" class="btn btn-secondary">Listen to Music</a>
						<a href="#contact" class="btn btn-outline">Contact Me</a>
					</div>
				</div>
			</div>
		</section>

		<!-- Skills Showcase Section -->
		<section id="skills" class="mb-24 pt-10" bind:this={skillsSection}>
			<h2 class="text-3xl font-bold mb-6 text-center from-primary to-blue-500 bg-gradient-to-r bg-clip-text text-transparent">
				Skills & Expertise
			</h2>
			<div class="bg-primary mx-auto mb-12 h-1 w-20 rounded-full"></div>
			
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				{#each skills as skillCategory}
					<div class="skill-category bg-dark-800/40 border border-dark-700 rounded-xl p-6 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
						<h3 class="text-xl font-bold mb-4 text-primary">{skillCategory.category}</h3>
						<div class="flex flex-wrap gap-2">
							{#each skillCategory.items as skill}
								<span class="bg-dark-800/80 border border-dark-700 px-3 py-1 rounded-full text-sm">
									{skill}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Journey/Timeline Section with refined styling -->
		<section id="journey" class="mb-24 pt-10" bind:this={timelineSection}>
			<h2 class="text-3xl font-bold mb-6 text-center from-primary to-blue-500 bg-gradient-to-r bg-clip-text text-transparent">
				My Journey
			</h2>
			<div class="bg-primary mx-auto mb-12 h-1 w-20 rounded-full"></div>

			<div class="mx-auto max-w-4xl">
				{#each timelineEvents as event, i}
					<div class="mb-12 flex last:mb-0 relative" bind:this={timelineElements[i]}>
						<div class="mt-1 mr-6">
							<div class="flex flex-col items-center">
								<div class="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/40 bg-dark-800 font-mono text-lg shadow-glow-sm">
									{event.year}
								</div>
								{#if i < timelineEvents.length - 1}
									<div class="mt-2 h-24 w-1 bg-gradient-to-b from-primary/50 to-dark-700/50"></div>
								{/if}
							</div>
						</div>
						<div class="flex-1 transform rounded-lg border border-dark-700 bg-dark-800/50 p-6 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
							<h3 class="mb-2 text-2xl font-bold text-primary">{event.title}</h3>
							<p class="text-gray-300">{event.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</section>
		
		<!-- Achievements Section -->
		<section id="achievements" class="mb-24 pt-10" bind:this={achievementsSection}>
			<h2 class="text-3xl font-bold mb-6 text-center from-primary to-blue-500 bg-gradient-to-r bg-clip-text text-transparent">
				Achievements
			</h2>
			<div class="bg-primary mx-auto mb-12 h-1 w-20 rounded-full"></div>
			
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				{#each achievements as achievement}
					<div class="achievement-card bg-dark-800/40 border border-dark-700 rounded-xl p-6 backdrop-blur-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300">
						<div class="flex items-start">
							<div class="mr-5">
								{#if achievement.icon === 'trophy'}
									<div class="bg-amber-500/20 text-amber-500 p-3 rounded-lg">
										<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
										</svg>
									</div>
								{:else if achievement.icon === 'music'}
									<div class="bg-green-500/20 text-green-500 p-3 rounded-lg">
										<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
										</svg>
									</div>
								{:else if achievement.icon === 'code'}
									<div class="bg-blue-500/20 text-blue-500 p-3 rounded-lg">
										<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
										</svg>
									</div>
								{:else if achievement.icon === 'mic'}
									<div class="bg-purple-500/20 text-purple-500 p-3 rounded-lg">
										<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
										</svg>
									</div>
								{/if}
							</div>
							<div>
								<h3 class="text-xl font-bold mb-2">{achievement.title}</h3>
								<p class="text-gray-300">{achievement.description}</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>
		
		<!-- Support/Donation Section -->
		<section id="support" class="mb-24 pt-10" bind:this={donationSection}>
			<h2 class="text-3xl font-bold mb-6 text-center from-primary to-blue-500 bg-gradient-to-r bg-clip-text text-transparent">
				Support My Work
			</h2>
			<div class="bg-primary mx-auto mb-12 h-1 w-20 rounded-full"></div>
			
			<div class="donation-card max-w-3xl mx-auto bg-dark-800/50 border border-dark-700 rounded-xl p-8 backdrop-blur-md">
				<div class="flex flex-col md:flex-row gap-8 items-center">
					<div class="md:w-1/2">
						<h3 class="text-2xl font-bold mb-4">Help Me Create More</h3>
						<p class="text-gray-300 mb-6">
							Your support enables me to continue creating quality content, develop open-source projects, and produce music that resonates with people worldwide. Every contribution makes a difference!
						</p>
						<div class="flex flex-col space-y-4">
							<div class="flex items-center space-x-3">
								<svg class="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
								</svg>
								<span>Access to exclusive behind-the-scenes content</span>
							</div>
							<div class="flex items-center space-x-3">
								<svg class="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
								</svg>
								<span>Early access to new music releases</span>
							</div>
							<div class="flex items-center space-x-3">
								<svg class="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
								</svg>
								<span>Support development of open-source tools</span>
							</div>
						</div>
					</div>
					
					<div class="md:w-1/2 flex flex-col items-center">
						<div class="bg-dark-900/50 border border-dark-700 p-6 rounded-lg shadow-lg mb-6 w-full">
							<h4 class="text-center text-xl font-medium mb-6">Choose a Support Option</h4>
							<Kofi
								username={import.meta.env.PUBLIC_KOFI_USERNAME || 'nishanajihah'}
								text="Support My Work"
								wide={true}
								color="#1E88E5"
							/>
							<div class="mt-6 text-center">
								<p class="text-gray-400 text-sm">One-time or monthly support options available</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		
		<!-- Testimonials section -->
		<section class="mb-24 pt-10">
			<h2 class="text-3xl font-bold mb-6 text-center from-primary to-blue-500 bg-gradient-to-r bg-clip-text text-transparent">
				What People Say
			</h2>
			<div class="bg-primary mx-auto mb-12 h-1 w-20 rounded-full"></div>
			
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
				{#each testimonials as testimonial}
					<div class="testimonial-card bg-dark-800/30 border border-dark-700 rounded-xl p-6 backdrop-blur-sm">
						<div class="text-primary mb-4">
							<svg class="w-8 h-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
								<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
							</svg>
						</div>
						<p class="text-gray-300 italic mb-4">{testimonial.quote}</p>
						<div class="flex items-center mt-4">
							<div>
								<p class="font-medium">{testimonial.author}</p>
								<p class="text-gray-400 text-sm">{testimonial.company}</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Contact Section with enhanced design -->
		<section id="contact" class="mx-auto max-w-4xl pb-16 pt-10" bind:this={contactSection}>
			<h2 class="text-3xl font-bold mb-6 text-center from-primary to-blue-500 bg-gradient-to-r bg-clip-text text-transparent">
				Get in Touch
			</h2>
			<div class="bg-primary mx-auto mb-12 h-1 w-20 rounded-full"></div>

			<div class="glassmorphic-card bg-dark-800/70 border border-dark-700 rounded-xl shadow-xl backdrop-blur-md overflow-hidden p-8">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-10">
					<div>
						<div class="mb-8">
							<svg class="text-primary mx-auto mb-4 h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
							</svg>
							<h3 class="mb-2 text-2xl font-bold text-center">Let's Connect</h3>
							<p class="text-gray-300 text-center">
								I'd love to hear from you! Feel free to reach out with any questions, collaboration
								ideas, or just to say hello.
							</p>
						</div>

						<!-- Social links with enhanced design -->
						<div class="space-y-4">
							<h4 class="font-medium text-gray-300 mb-3">Find me on:</h4>
							{#each socialLinks as link}
								<a href={link.url} target="_blank" rel="noopener noreferrer" 
									class="flex items-center space-x-3 p-3 rounded-lg bg-dark-900/50 border border-dark-700 hover:border-primary/30 transition-all duration-300">
									{#if link.icon === 'twitter'}
										<svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
											<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
										</svg>
									{:else if link.icon === 'linkedin'}
										<svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
											<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
										</svg>
									{:else if link.icon === 'github'}
										<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
										</svg>
									{:else if link.icon === 'calendar'}
										<svg class="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
										</svg>
									{/if}
									<span>{link.name}</span>
								</a>
							{/each}
						</div>
					</div>
					
					<div>
						<!-- Contact form with Mailgun integration -->
						<form on:submit|preventDefault={handleSubmit} class="space-y-6">
							<div>
								<label for="name" class="mb-1 block text-sm font-medium text-gray-300">Name</label>
								<input
									id="name"
									bind:value={name}
									type="text"
									required
									class="w-full rounded-lg border border-dark-700 bg-dark-800/50 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/50"
								/>
							</div>

							<div>
								<label for="email" class="mb-1 block text-sm font-medium text-gray-300">Email</label>
								<input
									id="email"
									bind:value={email}
									type="email"
									required
									class="w-full rounded-lg border border-dark-700 bg-dark-800/50 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/50"
								/>
							</div>

							<div>
								<label for="message" class="mb-1 block text-sm font-medium text-gray-300">Message</label>
								<textarea
									id="message"
									bind:value={message}
									rows="4"
									required
									class="w-full resize-none rounded-lg border border-dark-700 bg-dark-800/50 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/50"
								></textarea>
							</div>

							<div class="pt-2">
								<button type="submit" class="btn btn-primary w-full px-8 py-3" disabled={submitting}>
									{#if submitting}
										<span class="mr-2 inline-block animate-spin">⟳</span> Sending...
									{:else}
										Send Message
									{/if}
								</button>
							</div>

							{#if submitted}
								<div class="mt-4 rounded-lg border border-green-500/30 bg-green-500/20 p-4 text-green-300">
									Your message has been sent successfully! I'll get back to you soon.
								</div>
							{/if}

							{#if error}
								<div class="mt-4 rounded-lg border border-red-500/30 bg-red-500/20 p-4 text-red-300">
									{error}
								</div>
							{/if}
						</form>
					</div>
				</div>
			</div>
		</section>
	</div>
</PageLayout>

<!-- Styles moved to about.css -->
