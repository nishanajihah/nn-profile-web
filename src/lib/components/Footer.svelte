<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	// Register ScrollTrigger plugin
	gsap.registerPlugin(ScrollTrigger);

	// Social media links
	const socialLinks = [
		{ href: 'https://github.com/', label: 'GitHub', icon: 'github' },
		{ href: 'https://ko-fi.com/', label: 'Ko-fi', icon: 'kofi' },
		{ href: 'https://open.spotify.com/', label: 'Spotify', icon: 'spotify' }
	];

	// Navigation links
	const quickLinks = [
		{ href: '/music', label: 'Music' },
		{ href: '/code', label: 'Code' },
		{ href: '/about', label: 'About' }
	];

	// Year for copyright
	const currentYear = new Date().getFullYear();

	// Define proper typings for DOM elements
	let footerElement: HTMLElement;

	onMount(() => {
		// Enhanced animation for footer elements with staggered effect
		const sections = footerElement.querySelectorAll('.footer-section');
		const links = footerElement.querySelectorAll('.footer-link');
		const copyright = footerElement.querySelector('.footer-copyright');
		const kofiButton = footerElement.querySelector('.footer-kofi');

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: footerElement,
				start: 'top bottom-=100',
				end: 'top center',
				toggleActions: 'play none none none'
			}
		});

		// Main footer animation
		tl.from(footerElement, {
			y: 50,
			opacity: 0,
			duration: 0.8,
			ease: 'power2.out'
		});

		// Stagger sections
		tl.from(
			sections,
			{
				y: 30,
				opacity: 0,
				stagger: 0.15,
				duration: 0.6,
				ease: 'power2.out'
			},
			'-=0.4'
		);

		// Stagger links
		tl.from(
			links,
			{
				y: 10,
				opacity: 0,
				stagger: 0.08,
				duration: 0.4,
				ease: 'power2.out'
			},
			'-=0.3'
		);

		// Bottom elements
		if (copyright && kofiButton) {
			tl.from(
				[copyright, kofiButton],
				{
					opacity: 0,
					duration: 0.5,
					ease: 'power2.out'
				},
				'-=0.2'
			);
		}
	});
</script>

<footer bind:this={footerElement} class="backdrop-blur-lg bg-black/40 border-t border-[#ffde21]/10 py-8">
	<div class="container-custom">
		<!-- Modern compact footer layout -->
		<div class="flex flex-col md:flex-row justify-between items-center gap-8">
			<!-- Brand section with logo -->
			<div class="footer-section text-center md:text-left">
				<div class="inline-block relative">
					<h3 class="text-2xl font-bold text-white mb-2 relative">
						Nisha <span class="text-[#ffde21]">Najihah</span>
						<!-- Yellow underline accent -->
						<span class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ffde21] to-transparent"></span>
					</h3>
				</div>
				
				<!-- Social Links with hover effects -->
				<div class="flex space-x-3 mt-4">
					{#each socialLinks as link}
						<a
							href={link.href}
							class="group relative flex h-10 w-10 items-center justify-center rounded-full border border-[#ffde21]/20 transition-all hover:border-[#ffde21]"
							target="_blank"
							rel="noreferrer noopener"
							aria-label={link.label}
						>
							<!-- Hover background effect -->
							<span class="absolute inset-0 rounded-full bg-[#ffde21] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
							
							<!-- Icon container -->
							<span class="relative z-10 text-white group-hover:text-black transition-colors duration-300">
								{#if link.icon === 'github'}
									<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
										<path
											fill-rule="evenodd"
											d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
											clip-rule="evenodd"
										/>
									</svg>
								{:else if link.icon === 'kofi'}
									<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
										<path
											d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311z"
										/>
									</svg>
								{:else if link.icon === 'spotify'}
									<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
										<path
											d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM16.5917 16.5917C16.2931 16.8903 15.8162 16.8903 15.5176 16.5917C14.3999 15.4739 12.7616 14.8 11 14.8C9.23842 14.8 7.60014 15.4739 6.48239 16.5917C6.18375 16.8903 5.7069 16.8903 5.40825 16.5917C5.10959 16.2931 5.10959 15.8162 5.40825 15.5176C6.80075 14.125 8.82715 13.3 11 13.3C13.1729 13.3 15.1992 14.125 16.5917 15.5176C16.8904 15.8162 16.8904 16.2931 16.5917 16.5917Z"
										/>
									</svg>
								{/if}
							</span>
						</a>
					{/each}
				</div>
			</div>

			<!-- Center section - Quick Links with modern hover effects -->
			<div class="footer-section">
				<div class="flex space-x-6 flex-wrap justify-center">
					{#each quickLinks as link}
						<a 
							href={link.href} 
							class="footer-link relative text-white transition-all hover:text-[#ffde21] px-2 py-1"
						>
							{link.label}
							<!-- Animated underline on hover -->
							<span class="absolute bottom-0 left-0 w-0 h-px bg-[#ffde21] group-hover:w-full transition-all duration-300 hover:w-full"></span>
						</a>
					{/each}
				</div>
			</div>

			<!-- Contact section with modern button -->
			<div class="footer-section">
				<a
					href="/about#contact"
					class="footer-link group relative overflow-hidden rounded-full border border-[#ffde21]/30 px-6 py-2 text-sm font-medium text-white transition-all hover:border-[#ffde21] hover:shadow-[0_0_15px_rgba(255,222,33,0.2)]"
				>
					<!-- Button background with hover effect -->
					<span class="absolute inset-0 bg-[#ffde21]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
					
					<!-- Button content -->
					<span class="relative z-10 flex items-center">
						Get in Touch
						<svg class="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</span>
				</a>
			</div>
		</div>

		<!-- Bottom copyright bar -->
		<div class="mt-6 pt-6 border-t border-[#ffde21]/5">
			<div class="flex flex-col md:flex-row items-center justify-between">
				<!-- Copyright text with subtle glow -->
				<div class="footer-copyright mb-4 md:mb-0 text-sm text-white/40 hover:text-white/70 transition-colors">
					© {currentYear} <span class="text-[#ffde21]/70">Nisha Najihah</span>. All rights reserved.
				</div>
				
				<!-- Ko-fi button with animated border effect -->
				<a
					href={`https://ko-fi.com/${import.meta.env.VITE_KOFI_USERNAME || 'nishanajihah'}`}
					class="footer-kofi group relative overflow-hidden rounded-full px-5 py-2 text-sm transition-all"
					target="_blank"
					rel="noreferrer noopener"
				>
					<!-- Animated border effect -->
					<span class="absolute inset-0 rounded-full border border-[#ffde21]/30 transition-all group-hover:border-[#ffde21] group-hover:shadow-[0_0_10px_rgba(255,222,33,0.3)]"></span>
					
					<!-- Background gradient -->
					<span class="absolute inset-0 bg-gradient-to-r from-black/40 to-[#ffde21]/10 opacity-0 transition-opacity group-hover:opacity-100"></span>
					
					<!-- Button content -->
					<span class="relative z-10 flex items-center text-white/70 group-hover:text-white transition-colors">
						<svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311z"
							/>
						</svg>
						Support on Ko-fi
					</span>
				</a>
			</div>
		</div>
	</div>
</footer>
