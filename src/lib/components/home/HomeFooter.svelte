<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	// Social media links with updated style for homepage
	const socialLinks = [
		{ href: 'https://github.com/nishanajihah', label: 'GitHub', icon: 'github' },
		{ href: 'https://ko-fi.com/nishanajihah', label: 'Ko-fi', icon: 'kofi' },
		{ href: 'https://open.spotify.com/', label: 'Spotify', icon: 'spotify' }
	];

	// Year for copyright
	const currentYear = new Date().getFullYear();

	// Define proper typings for DOM elements
	let footerElement: HTMLElement;

	onMount(() => {
		// Subtle animations for footer elements
		const icons = footerElement.querySelectorAll('.footer-icon');
		const copyright = footerElement.querySelector('.footer-copyright');
		
		// Subtle fade in
		gsap.from(footerElement, {
			opacity: 0,
			y: 20,
			duration: 1.2,
			delay: 0.5,
			ease: 'power2.out'
		});
		
		// Icon subtle animations
		gsap.from(icons, {
			opacity: 0,
			scale: 0.8,
			stagger: 0.1,
			duration: 0.6,
			delay: 0.8,
			ease: 'back.out'
		});
		
		// Setup floating animation for icons
		icons.forEach((icon, index) => {
			gsap.to(icon, {
				y: '-5px',
				duration: 2 + (index * 0.2),
				repeat: -1,
				yoyo: true,
				ease: 'sine.inOut',
				delay: index * 0.3
			});
		});
	});
</script>

<footer bind:this={footerElement} class="w-full py-6 z-20 backdrop-blur-md bg-[var(--bg-card)]/50">
	<div class="container-custom">
		<!-- Minimalist footer design for homepage -->
		<div class="flex flex-col items-center justify-center">
			<!-- Social Icons with futuristic glowing effect -->
			<div class="flex space-x-6 mb-5">
				{#each socialLinks as link}
					<a
						href={link.href}
						class="footer-icon group relative"
						target="_blank"
						rel="noreferrer noopener"
						aria-label={link.label}
					>
						<div class="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#ffde21]/20 backdrop-blur-md bg-black/20 transition-all duration-300 group-hover:border-[#ffde21]/60 group-hover:bg-black/30">
							<!-- Icon glow effect -->
							<div class="absolute inset-0 rounded-full bg-[#0066ff]/10 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"></div>
							
							<!-- Icon container -->
							<span class="relative z-10 text-white/80 group-hover:text-[#ffde21] transition-colors duration-300">
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
						</div>
						
						<!-- Floating particle effect on hover -->
						<div class="absolute -inset-2 opacity-0 group-hover:opacity-100">
							{#each Array(3) as _, i}
							<div class="absolute rounded-full h-1 w-1 bg-[#ffde21]/40"
								style="top: {Math.random() * 100}%; left: {Math.random() * 100}%; 
								animation: float-particle-{i} {2 + Math.random() * 3}s ease-in-out infinite;">
							</div>
							{/each}
						</div>
					</a>
				{/each}
			</div>
			
			<!-- Minimalist copyright with gradient accent -->
			<div class="footer-copyright flex items-center text-xs text-white/40 hover:text-white/60 transition-colors">
				<span class="bg-gradient-to-r from-[#0066ff]/80 via-[#ffde21]/80 to-[#fff]/80 h-px w-6 mx-2 opacity-40"></span>
				© {currentYear} Nisha Najihah
				<span class="bg-gradient-to-r from-[#fff]/80 via-[#ffde21]/80 to-[#0066ff]/80 h-px w-6 mx-2 opacity-40"></span>
			</div>
		</div>
	</div>
</footer>

<style>
	@keyframes float-particle-0 {
		0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
		50% { transform: translateY(-10px) translateX(5px); opacity: 0.8; }
	}
	
	@keyframes float-particle-1 {
		0%, 100% { transform: translateY(0) translateX(0); opacity: 0.6; }
		50% { transform: translateY(-8px) translateX(-7px); opacity: 0.9; }
	}
	
	@keyframes float-particle-2 {
		0%, 100% { transform: translateY(0) translateX(0); opacity: 0.5; }
		50% { transform: translateY(-12px) translateX(3px); opacity: 0.7; }
	}
</style>
