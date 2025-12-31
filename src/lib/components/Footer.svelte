<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { page } from '$app/stores';

	// Register ScrollTrigger plugin
	gsap.registerPlugin(ScrollTrigger);

	// Social media links
	const socialLinks = [
		{ href: 'https://github.com/nishanajihah', label: 'GitHub', icon: 'github' },
		{ href: 'https://ko-fi.com/nishanajihah', label: 'Ko-fi', icon: 'kofi' },
		{ href: '#', label: 'Spotify (Coming Soon)', icon: 'spotify', disabled: true }
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

	// Get dynamic description based on current page
	$: pageDescription = $page.url.pathname === '/music' 
		? 'Creative Developer & Music Enthusiast' 
		: 'Versatile Developer';

	// Get dynamic email based on current page
	$: contactEmail = $page.url.pathname === '/music' 
		? 'nishanajihah88.music@gmail.com'
		: 'nishanajihah.dev@gmail.com';

	onMount(() => {
		// Simplified animation that doesn't interfere with visibility
		if (footerElement) {
			gsap.from(footerElement, {
				y: 30,
				opacity: 0,
				duration: 0.6,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: footerElement,
					start: 'top bottom-=50',
					toggleActions: 'play none none none'
				}
			});
		}
	});
</script>

<style>
	/* Ensure footer elements are always visible */
	.footer-section {
		opacity: 1 !important;
		visibility: visible !important;
	}
	
	.footer-link {
		opacity: 1 !important;
		visibility: visible !important;
	}
	
	/* Debug style to make explore section highly visible */
	.footer-section h4 {
		color: white !important;
		opacity: 1 !important;
	}
</style>

<footer
	bind:this={footerElement}
	class="border-t border-[var(--border-light)] bg-gradient-to-br from-[var(--bg-card)] to-black/80 py-12 backdrop-blur-lg"
>
	<div class="container-custom">
		<!-- Main footer content with improved layout -->
		<div class="flex flex-col lg:flex-row gap-12 lg:gap-16">
			<!-- Brand section - Left side (stays the same) -->
			<div class="footer-section lg:w-1/2 xl:w-2/5">
				<div class="mb-6">
					<h3 class="relative mb-3 text-3xl font-bold text-white">
						Nisha <span class="text-[#ffde21]">Najihah</span>
					</h3>
					<p class="text-sm text-white/70 leading-relaxed max-w-md">
						{pageDescription} passionate about creating beautiful, functional web experiences. 
						Specializing in modern web technologies and user-centered design.
					</p>
				</div>
				
				<!-- Social Links -->
				<div class="flex space-x-4">
					{#each socialLinks as link}
						{#if link.disabled}
							<span
								class="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#ffde21]/20 cursor-not-allowed opacity-50 bg-black/20"
								aria-label={link.label}
								title={link.label}
							>
								<span class="relative z-10 text-white/50">
									{#if link.icon === 'spotify'}
										<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM16.5917 16.5917C16.2931 16.8903 15.8162 16.8903 15.5176 16.5917C14.3999 15.4739 12.7616 14.8 11 14.8C9.23842 14.8 7.60014 15.4739 6.48239 16.5917C6.18375 16.8903 5.7069 16.8903 5.40825 16.5917C5.10959 16.2931 5.10959 15.8162 5.40825 15.5176C6.80075 14.125 8.82715 13.3 11 13.3C13.1729 13.3 15.1992 14.125 16.5917 15.5176C16.8904 15.8162 16.8904 16.2931 16.5917 16.5917Z"/>
										</svg>
									{/if}
								</span>
							</span>
						{:else}
							<a
								href={link.href}
								class="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#ffde21]/30 bg-black/20 transition-all duration-300 hover:border-[#ffde21] hover:bg-[#ffde21] hover:scale-110 hover:shadow-lg hover:shadow-[#ffde21]/25"
								target="_blank"
								rel="noreferrer noopener"
								aria-label={link.label}
							>
								<span class="relative z-10 text-white transition-colors duration-300 group-hover:text-black">
									{#if link.icon === 'github'}
										<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
											<path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
										</svg>
									{:else if link.icon === 'kofi'}
										<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
											<path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311z"/>
										</svg>
									{/if}
								</span>
							</a>
						{/if}
					{/each}
				</div>
			</div>

			<!-- Right side content - Improved layout -->
			<div class="lg:w-1/2 xl:w-3/5">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
					<!-- Navigation Links with clean minimal design -->
					<div class="footer-section">
						<div class="relative mb-6">
							<h4 class="text-xl font-bold text-white mb-1">
								Explore
							</h4>
							<div class="w-12 h-0.5 bg-[#ffde21]"></div>
						</div>
						
						<div class="space-y-1">
							{#each quickLinks as link}
								<a
									href={link.href}
									class="footer-link group relative block transition-all duration-300 hover:translate-x-2"
								>
									<div class="relative py-3 px-4 rounded-lg hover:bg-[#ffde21]/5 transition-all duration-300">
										<!-- Subtle left border on hover -->
										<div class="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-8 bg-[#ffde21] rounded-r-full group-hover:w-1 transition-all duration-300"></div>
										
										<!-- Content -->
										<div class="flex items-center space-x-3 ml-2">
											<div class="w-1.5 h-1.5 rounded-full bg-[#ffde21]/60 group-hover:bg-[#ffde21] group-hover:scale-125 transition-all duration-300"></div>
											<span class="text-white/80 group-hover:text-white font-medium tracking-wide transition-all duration-300">
												{link.label}
											</span>
											<svg class="w-3 h-3 text-white/30 group-hover:text-[#ffde21] opacity-0 group-hover:opacity-100 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
											</svg>
										</div>
									</div>
								</a>
							{/each}
						</div>
					</div>

					<!-- Contact Section with card design -->
					<div class="footer-section">
						<div class="relative mb-6">
							<h4 class="text-lg font-semibold text-white relative inline-block">
								Let's Connect
								<span class="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#ffde21] to-transparent"></span>
							</h4>
						</div>
						
						<!-- Email contact card -->
						<div class="space-y-4">
							<div class="p-4 rounded-xl border border-[#ffde21]/20 bg-gradient-to-br from-black/40 to-[#ffde21]/5 backdrop-blur-sm hover:border-[#ffde21]/40 transition-all duration-300 group">
								<a
									href="mailto:{contactEmail}"
									class="block space-y-2"
								>
									<div class="flex items-center space-x-3">
										<div class="w-8 h-8 rounded-lg bg-[#ffde21]/10 flex items-center justify-center group-hover:bg-[#ffde21]/20 transition-colors">
											<svg class="h-4 w-4 text-[#ffde21]" fill="currentColor" viewBox="0 0 20 20">
												<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
												<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
											</svg>
										</div>
										<span class="text-white font-medium group-hover:text-[#ffde21] transition-colors">Send Email</span>
									</div>
									<p class="text-xs text-white/50 ml-11">{contactEmail}</p>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Bottom copyright bar with Ko-fi integration -->
		<div class="mt-8 border-t border-[#ffde21]/10 pt-8">
			<!-- Single row layout for all bottom content -->
			<div class="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
				<!-- Left side: Ko-fi button and developer credit -->
				<div class="flex items-center gap-2 sm:gap-4">
					<a 
						href='https://ko-fi.com/Q5Q71FN62M' 
						target='_blank'
						rel="noopener noreferrer"
						class="inline-block transition-transform hover:scale-105"
					>
						<img 
							height='32' 
							style='border:0px;height:32px;' 
							src='https://storage.ko-fi.com/cdn/kofi2.png?v=6' 
							alt='Buy Me a Coffee at ko-fi.com'
							class="rounded-md"
						/>
					</a>
					<div class="hidden sm:block text-white/70 text-sm">•</div>
					<div class="text-sm text-white/70 transition-colors hover:text-white/90">
						Developed and Designed by <span class="font-semibold text-[#ffde21]">Nisha Najihah</span>
					</div>
				</div>

				<!-- Right side: Copyright -->
				<div class="text-sm text-white/70 transition-colors hover:text-white/90">
					© {currentYear} <span class="font-semibold text-[#ffde21]">Nisha Najihah</span>. All rights reserved.
				</div>
			</div>
		</div>
	</div>
</footer>
