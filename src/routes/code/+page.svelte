<script lang="ts">
	/*
	 * ===== CODE & PROJECTS PAGE =====
	 *
	 * This component displays:
	 * - Featured/pinned projects from GitHub
	 * - All projects with search functionality
	 * - Skills section with tech stack
	 * - GitHub activity and contribution calendar
	 */

	// ===== IMPORTS =====
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import PageLayout from '$lib/components/PageLayout.svelte';
	import SkillsSection from '$lib/components/code/SkillsSection.svelte';
	import GitHubActivitySection from '$lib/components/code/GitHubActivitySection.svelte';
	import ProjectsSection from '$lib/components/code/ProjectsSection.svelte';

	// Receive data from the load function automatically
	let { data } = $props();

	// Register GSAP plugins
	gsap.registerPlugin(ScrollTrigger);

	// ===== STATE MANAGEMENT =====
	let isLoading = $state(true);
	let contentReady = $state(false);

	// DOM references
	let skillsSection: HTMLElement | undefined = $state();

	// Projects data (derived from data prop)
	let projects = $derived(data.repos || []);
	let pinnedProjects = $derived(data.pinnedRepos || []);
	let githubEvents = $derived(data.events || []);
	let contributionsData = $derived(data.contributions || { total: 0, lastYear: 0, streak: 0 });
	let contributionActivity = $derived(data.contributionActivity || []);

	// ===== COMPONENT LIFECYCLE =====
	onMount(() => {
		// Small delay to ensure smooth transition
		setTimeout(() => {
			isLoading = false;
			contentReady = true;
		}, 500);
	});
</script>

<PageLayout
	title=""
	subtitle="Exploring the intersection of code and creativity through web development, audio applications, and innovative digital experiences"
>
	<!-- Main Container with Proper Scroll Design -->
	<div class="w-full">
		{#if contentReady}
			<!-- Mobile: Only CODE title at top for page identification -->
			<div class="fixed top-40 left-1/2 z-60 -translate-x-1/2 transform md:hidden">
				<h1 class="skill-title perspective-1000 text-[18rem] font-bold text-white sm:text-[22rem]">
					<span
						class="inline-block transform cursor-default text-transparent transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce"
						style="-webkit-text-stroke: 2px #fbbf24; text-stroke: 2px #fbbf24;">C</span
					>
					<span
						class="inline-block transform cursor-default text-transparent transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce"
						style="animation-delay: 0.1s; -webkit-text-stroke: 2px #fbbf24; text-stroke: 2px #fbbf24;"
						>O</span
					>
					<span
						class="inline-block transform cursor-default text-transparent transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce"
						style="animation-delay: 0.2s; -webkit-text-stroke: 2px #fbbf24; text-stroke: 2px #fbbf24;"
						>D</span
					>
					<span
						class="inline-block transform cursor-default text-transparent transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce"
						style="animation-delay: 0.3s; -webkit-text-stroke: 2px #fbbf24; text-stroke: 2px #fbbf24;"
						>E</span
					>
				</h1>
			</div>

			<!-- Desktop: All three vertical titles with proper positioning -->
			<div class="hidden md:block">
				<!-- Left Sidebar - Vertical CODE Title (positioned further left) -->
				<div
					class="absolute z-60 flex flex-col items-center"
					style="left: calc(4px - 8rem); top: 40vh;"
				>
					<div class="flex flex-col space-y-2">
						<span
							class="block text-[15vh] leading-none font-black text-transparent transition-transform duration-300 hover:scale-110 lg:text-[20vh]"
							style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">C</span
						>
						<span
							class="block text-[15vh] leading-none font-black text-transparent transition-transform duration-300 hover:scale-110 lg:text-[20vh]"
							style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">O</span
						>
						<span
							class="block text-[15vh] leading-none font-black text-transparent transition-transform duration-300 hover:scale-110 lg:text-[20vh]"
							style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">D</span
						>
						<span
							class="block text-[15vh] leading-none font-black text-transparent transition-transform duration-300 hover:scale-110 lg:text-[20vh]"
							style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">E</span
						>
					</div>
				</div>

				<!-- Right Sidebar - Vertical LANGUAGE Title (positioned further right) -->
				<div
					class="absolute z-40 flex flex-col items-center"
					style="right: calc(4px - 8rem); top: 220vh;"
				>
					<div class="flex flex-col space-y-4 lg:space-y-6">
						<span
							class="block text-[12vh] leading-none font-black text-transparent transition-transform duration-300 hover:scale-110 lg:text-[15vh]"
							style="-webkit-text-stroke: 4px #fbbf24; text-stroke: 4px #fbbf24;">L</span
						>
						<span
							class="block text-[12vh] leading-none font-black text-transparent transition-transform duration-300 hover:scale-110 lg:text-[15vh]"
							style="-webkit-text-stroke: 4px #fbbf24; text-stroke: 4px #fbbf24;">A</span
						>
						<span
							class="block text-[12vh] leading-none font-black text-transparent transition-transform duration-300 hover:scale-110 lg:text-[15vh]"
							style="-webkit-text-stroke: 4px #fbbf24; text-stroke: 4px #fbbf24;">N</span
						>
						<span
							class="block text-[12vh] leading-none font-black text-transparent transition-transform duration-300 hover:scale-110 lg:text-[15vh]"
							style="-webkit-text-stroke: 4px #fbbf24; text-stroke: 4px #fbbf24;">G</span
						>
						<span
							class="block text-[12vh] leading-none font-black text-transparent transition-transform duration-300 hover:scale-110 lg:text-[15vh]"
							style="-webkit-text-stroke: 4px #fbbf24; text-stroke: 4px #fbbf24;">U</span
						>
						<span
							class="block text-[12vh] leading-none font-black text-transparent transition-transform duration-300 hover:scale-110 lg:text-[15vh]"
							style="-webkit-text-stroke: 4px #fbbf24; text-stroke: 4px #fbbf24;">A</span
						>
						<span
							class="block text-[12vh] leading-none font-black text-transparent transition-transform duration-300 hover:scale-110 lg:text-[15vh]"
							style="-webkit-text-stroke: 4px #fbbf24; text-stroke: 4px #fbbf24;">G</span
						>
						<span
							class="block text-[12vh] leading-none font-black text-transparent transition-transform duration-300 hover:scale-110 lg:text-[15vh]"
							style="-webkit-text-stroke: 4px #fbbf24; text-stroke: 4px #fbbf24;">E</span
						>
					</div>
				</div>

				<!-- Left Sidebar - Vertical PROGRESS Title (positioned further left) -->
				<div
					class="absolute z-40 flex flex-col items-center"
					style="left: calc(4px - 8rem); top: 360vh;"
				>
					<div class="flex flex-col space-y-3 lg:space-y-4">
						<span
							class="block text-[15vh] leading-none font-black text-transparent transition-transform duration-300 hover:scale-110 lg:text-[20vh]"
							style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">P</span
						>
						<span
							class="block text-[15vh] leading-none font-black text-transparent transition-transform duration-300 hover:scale-110 lg:text-[20vh]"
							style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">R</span
						>
						<span
							class="block text-[15vh] leading-none font-black text-transparent transition-transform duration-300 hover:scale-110 lg:text-[20vh]"
							style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">O</span
						>
						<span
							class="block text-[15vh] leading-none font-black text-transparent transition-transform duration-300 hover:scale-110 lg:text-[20vh]"
							style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">G</span
						>
						<span
							class="block text-[15vh] leading-none font-black text-transparent transition-transform duration-300 hover:scale-110 lg:text-[20vh]"
							style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">R</span
						>
						<span
							class="block text-[15vh] leading-none font-black text-transparent transition-transform duration-300 hover:scale-110 lg:text-[20vh]"
							style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">E</span
						>
						<span
							class="block text-[15vh] leading-none font-black text-transparent transition-transform duration-300 hover:scale-110 lg:text-[20vh]"
							style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">S</span
						>
						<span
							class="block text-[15vh] leading-none font-black text-transparent transition-transform duration-300 hover:scale-110 lg:text-[20vh]"
							style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">S</span
						>
					</div>
				</div>
			</div>
		{/if}
		<!-- Close contentReady conditional -->

		<!-- Main Content Area with Wider Layout and Proper Spacing -->
		<div class="w-full px-4 md:px-8 lg:px-12 xl:px-16">
			<div class="mx-auto w-full max-w-none py-4 md:py-6 lg:py-8">
				{#if isLoading}
					<!-- Tailwind CSS Loading State -->
					<div class="flex min-h-screen items-center justify-center">
						<div class="text-center">
							<!-- Spinning loader -->
							<div
								class="mb-4 inline-block h-16 w-16 animate-spin rounded-full border-4 border-amber-400 border-t-transparent"
							></div>
							<!-- Loading text -->
							<div class="space-y-2">
								<h3 class="text-xl font-semibold text-white">Loading Portfolio</h3>
								<p class="text-gray-300">Fetching projects and data...</p>
								<!-- Animated dots -->
								<div class="flex justify-center space-x-1">
									<div class="h-2 w-2 animate-bounce rounded-full bg-amber-400"></div>
									<div
										class="h-2 w-2 animate-bounce rounded-full bg-amber-400"
										style="animation-delay: 0.1s"
									></div>
									<div
										class="h-2 w-2 animate-bounce rounded-full bg-amber-400"
										style="animation-delay: 0.2s"
									></div>
								</div>
							</div>
						</div>
					</div>
				{:else}
					<!-- Main Content with Proper Padding and Spacing -->
					<div class="space-y-24 pt-28 pb-0 md:space-y-32 md:pt-20 lg:space-y-40">
						<!-- Main Projects Title -->
						<section class="px-2 pt-2 text-center md:px-4 md:pt-8">
							<div class="mb-2 md:mb-4">
								<div class="skill-title-container mb-4 w-full">
									<h1
										class="skill-title perspective-1000 px-2 text-4xl font-bold text-white sm:text-5xl md:px-4 md:text-6xl lg:text-7xl"
									>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-300"
											>P</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-400"
											style="animation-delay: 0.1s;">r</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-300"
											style="animation-delay: 0.2s;">o</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-400"
											style="animation-delay: 0.3s;">j</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-300"
											style="animation-delay: 0.4s;">e</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-400"
											style="animation-delay: 0.5s;">c</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-300"
											style="animation-delay: 0.6s;">t</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-400"
											style="animation-delay: 0.7s;">s</span
										>
										<span class="text-primary animate-spin-slow mx-6 hidden text-7xl md:inline"
											>🚀</span
										>
									</h1>
									<div class="modern-subtitle w-full px-4 md:px-8">
										<div
											class="subtitle-row flex w-full flex-col flex-wrap items-center justify-center gap-2 md:flex-row md:gap-4"
										>
											<span class="subtitle-text text-sm sm:text-base md:text-lg lg:text-xl"
												>From Concept To Deployment</span
											>
											<div class="subtitle-accent flex hidden gap-1 sm:gap-2 md:flex">
												<span class="accent-dot"></span>
												<span class="accent-line"></span>
												<span class="accent-dot"></span>
											</div>
											<span class="subtitle-text text-sm sm:text-base md:text-lg lg:text-xl"
												>Bringing Ideas To Life</span
											>
										</div>
									</div>
								</div>
							</div>
						</section>

						<!-- Projects Section Component -->
						<ProjectsSection {projects} {pinnedProjects} />

						<!-- Skills Section -->
						<section
							bind:this={skillsSection}
							class="relative w-full overflow-hidden px-6 py-8 md:px-12 md:py-12 lg:px-16"
						>
							<!-- Tech Laboratory Background -->
							<div class="pointer-events-none absolute inset-0">
								<!-- Circuit Board Pattern -->
								<div class="absolute inset-0 opacity-10">
									<svg class="h-full w-full" viewBox="0 0 800 600">
										<defs>
											<pattern
												id="circuit"
												x="0"
												y="0"
												width="100"
												height="100"
												patternUnits="userSpaceOnUse"
											>
												<path
													d="M10,10 L90,10 L90,90 L10,90 Z"
													fill="none"
													stroke="currentColor"
													stroke-width="1"
												/>
												<circle cx="50" cy="50" r="3" fill="currentColor" />
											</pattern>
										</defs>
										<rect width="100%" height="100%" fill="url(#circuit)" class="text-primary" />
									</svg>
								</div>

								<!-- Floating Particles -->
								<div
									class="particle bg-primary/60 absolute top-1/4 left-10 h-2 w-2 animate-pulse rounded-full"
								></div>
								<div
									class="particle absolute top-3/4 right-20 h-3 w-3 animate-bounce rounded-full bg-green-400/60"
								></div>
								<div
									class="particle absolute top-1/2 left-1/3 h-1 w-1 animate-ping rounded-full bg-yellow-400/60"
								></div>
								<div
									class="particle absolute right-1/3 bottom-1/4 h-2 w-2 animate-pulse rounded-full bg-blue-400/60"
								></div>

								<!-- Energy Streams -->
								<div
									class="via-primary/30 absolute top-20 left-0 h-px w-full animate-pulse bg-gradient-to-r from-transparent to-transparent"
								></div>
								<div
									class="absolute bottom-20 left-0 h-px w-full animate-pulse bg-gradient-to-r from-transparent via-green-400/30 to-transparent"
									style="animation-delay: 1s;"
								></div>
							</div>

							<div class="relative z-10 mb-12 w-full px-4 text-center md:px-8">
								<div class="skill-title-container mb-8 w-full">
									<h2
										class="skill-title perspective-1000 px-2 text-4xl font-bold text-white sm:text-5xl md:px-4 md:text-6xl lg:text-7xl"
									>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-300"
											>S</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-400"
											style="animation-delay: 0.1s;">k</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-300"
											style="animation-delay: 0.2s;">i</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-400"
											style="animation-delay: 0.3s;">l</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-300"
											style="animation-delay: 0.4s;">l</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-400"
											style="animation-delay: 0.5s;">s</span
										>
										<span class="text-primary animate-spin-slow mx-6 hidden text-7xl md:inline"
											>⚡</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-300"
											style="animation-delay: 0.6s;">T</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-400"
											style="animation-delay: 0.7s;">e</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-300"
											style="animation-delay: 0.8s;">c</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-400"
											style="animation-delay: 0.9s;">h</span
										>
									</h2>
									<div class="modern-subtitle w-full">
										<div
											class="subtitle-row flex w-full flex-col flex-wrap items-center justify-center gap-2 md:flex-row md:gap-4"
										>
											<span class="subtitle-text text-sm sm:text-base md:text-lg lg:text-xl"
												>Learning New skills</span
											>
											<div class="subtitle-accent flex hidden gap-1 sm:gap-2 md:flex">
												<span class="accent-dot"></span>
												<span class="accent-line"></span>
												<span class="accent-dot"></span>
											</div>
											<span class="subtitle-text text-sm sm:text-base md:text-lg lg:text-xl"
												>Leveling Up Border Horizon</span
											>
										</div>
									</div>
								</div>
							</div>

							<!-- Skills Section - All Skills Mixed Together -->
							<SkillsSection />
						</section>

						<!-- GitHub Activity -->
						<section class="px-6 py-8 md:px-12 md:py-12 lg:px-2">
							<div class="mb-12 px-4 text-center md:px-8">
								<div class="skill-title-container mb-8 w-full">
									<h2
										class="skill-title perspective-1000 px-6 text-center text-4xl font-bold text-white sm:text-5xl md:px-12 md:text-6xl lg:px-2 lg:text-7xl"
									>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-300"
											>G</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-400"
											style="animation-delay: 0.1s;">i</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-300"
											style="animation-delay: 0.2s;">t</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-400"
											style="animation-delay: 0.3s;">H</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-300"
											style="animation-delay: 0.4s;">u</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-400"
											style="animation-delay: 0.5s;">b</span
										>
										<span class="text-primary animate-spin-slow mx-6 hidden text-7xl md:inline"
											>💻</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-300"
											style="animation-delay: 0.6s;">A</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-400"
											style="animation-delay: 0.7s;">c</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-300"
											style="animation-delay: 0.8s;">t</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-400"
											style="animation-delay: 0.9s;">i</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-300"
											style="animation-delay: 1.0s;">v</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-400"
											style="animation-delay: 1.1s;">i</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-300"
											style="animation-delay: 1.2s;">t</span
										>
										<span
											class="inline-block transform cursor-default transition-all duration-300 hover:scale-110 hover:rotate-12 hover:animate-bounce hover:text-yellow-400"
											style="animation-delay: 1.3s;">y</span
										>
									</h2>
									<div class="modern-subtitle w-full px-4 md:px-8">
										<div
											class="subtitle-row flex w-full flex-col flex-wrap items-center justify-center gap-2 md:flex-row md:gap-4"
										>
											<span class="subtitle-text text-sm sm:text-base md:text-lg lg:text-xl"
												>Code Contributions</span
											>
											<div class="subtitle-accent flex hidden gap-1 sm:gap-2 md:flex">
												<span class="accent-dot"></span>
												<span class="accent-line"></span>
												<span class="accent-dot"></span>
											</div>
											<span class="subtitle-text text-sm sm:text-base md:text-lg lg:text-xl"
												>Code Journey</span
											>
										</div>
									</div>
								</div>
							</div>

							<!-- GitHub Activity Component -->
							<GitHubActivitySection
								{githubEvents}
								{contributionsData}
								projectsCount={projects.length}
							/>
						</section>
					</div>
				{/if}
			</div>
		</div>
	</div></PageLayout
>

<style>
	/* ===== MODERN SUBTITLE STYLES ===== */
	.modern-subtitle {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 1.5rem;
	}

	.subtitle-row {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.subtitle-text {
		font-size: 1.2rem;
		font-weight: 700;
		color: white;
		background: linear-gradient(135deg, #ffffff 0%, #ffde21 50%, #ffd700 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-shadow: 0 2px 10px rgba(255, 222, 33, 0.3);
		letter-spacing: 1px;
		animation: subtitleGlow 3s ease-in-out infinite;
		white-space: nowrap;
	}

	.subtitle-accent {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		animation: accentPulse 2s ease-in-out infinite;
		flex-shrink: 0;
	}

	.accent-dot {
		width: 8px;
		height: 8px;
		background: linear-gradient(135deg, #ffde21, #ffd700);
		border-radius: 50%;
		box-shadow:
			0 0 10px rgba(255, 222, 33, 0.6),
			0 0 20px rgba(255, 222, 33, 0.3);
		animation: dotFloat 2s ease-in-out infinite;
	}

	.accent-dot:nth-child(3) {
		animation-delay: 1s;
	}

	.accent-line {
		width: 40px;
		height: 2px;
		background: linear-gradient(90deg, transparent, #ffde21, #ffd700, #ffde21, transparent);
		border-radius: 1px;
		animation: lineExtend 3s ease-in-out infinite;
	}

	.animate-spin-slow {
		animation: spin-slow 10s linear infinite;
	}

	/* ===== RESPONSIVE STYLES ===== */
	@media (max-width: 640px) {
		.skill-title {
			font-size: 2rem !important;
		}
		.modern-subtitle .subtitle-text {
			font-size: 1rem !important;
		}
		.subtitle-row {
			gap: 0.5rem !important;
		}
	}

	@media (max-width: 480px) {
		.skill-title {
			font-size: 1.3rem !important;
		}
		.modern-subtitle .subtitle-text {
			font-size: 0.9rem !important;
		}
	}

	/* ===== ANIMATIONS (Keep essential ones for other components) ===== */
	@keyframes subtitleGlow {
		0%,
		100% {
			text-shadow: 0 2px 10px rgba(255, 222, 33, 0.3);
			transform: scale(1);
		}
		50% {
			text-shadow: 0 4px 20px rgba(255, 222, 33, 0.6);
			transform: scale(1.02);
		}
	}

	@keyframes accentPulse {
		0%,
		100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.7;
			transform: scale(1.1);
		}
	}

	/* ===== CUSTOM SCROLLBAR DESIGN ===== */
	/* Webkit browsers (Chrome, Safari, Edge) */
	:global(::-webkit-scrollbar) {
		width: 8px;
	}

	:global(::-webkit-scrollbar-track) {
		background: #1f2937; /* gray-800 */
		border-radius: 4px;
	}

	:global(::-webkit-scrollbar-thumb) {
		background: linear-gradient(180deg, #f59e0b, #d97706); /* amber-500 to amber-600 */
		border-radius: 4px;
		transition: background 0.3s ease;
	}

	:global(::-webkit-scrollbar-thumb:hover) {
		background: linear-gradient(180deg, #fbbf24, #f59e0b); /* amber-400 to amber-500 */
	}

	/* Firefox */
	:global(html) {
		scrollbar-width: thin;
		scrollbar-color: #f59e0b #1f2937; /* thumb track */
	}

	/* Ensure main page container handles all scrolling */
	:global(body) {
		overflow-x: hidden;
	}

	/* Fix potential double scrolling by ensuring page content flows naturally */
	:global(.min-h-screen) {
		min-height: 100vh !important;
	}

	/* Prevent any nested scrolling containers */
	:global(.overflow-x-hidden) {
		overflow-x: hidden !important;
	}
</style>
