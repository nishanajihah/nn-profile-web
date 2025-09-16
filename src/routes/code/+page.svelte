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
	import type { Project } from '../../ts/code/projectsSection';

	// Register GSAP plugins
	gsap.registerPlugin(ScrollTrigger);

	// ===== STATE MANAGEMENT =====
	// Loading and error states
	let isLoading = true;
	let error: string | null = null;
	let contentReady = false;

	// DOM references
	let skillsSection: HTMLElement;

	// Projects data
	let projects: Project[] = [];
	let pinnedProjects: Project[] = [];

	// GitHub activity data (passed to component)
	let githubEvents: any[] = [];
	let contributionsData = { total: 0, lastYear: 0, streak: 0, publicRepos: 0 };
	let contributionActivity: Array<{
		month: string;
		monthKey: string;
		count: number;
		level: number;
		isCurrentMonth: boolean;
		days: Array<{ date: string; day: number; count: number; level: number; isToday: boolean }>;
	}> = [];

	// ===== API FUNCTIONS =====
	async function fetchGithubData() {
		try {
			console.log('Making request to /api/github-data');
			const response = await fetch('/api/github-data');
			console.log('Response status:', response.status, response.statusText);

			if (!response.ok) {
				const errorData = await response.json();
				console.error('API Error response:', errorData);
				throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
			}

			const data = await response.json();
			console.log('Raw API response:', data);

			return {
				repos: data.repos || [],
				pinnedRepos: data.pinnedRepos || [],
				events: data.events || [],
				contributions: data.contributions || { total: 0, lastYear: 0, streak: 0 },
				contributionActivity: data.contributionActivity || []
			};
		} catch (err) {
			console.error('Error fetching GitHub data:', err);
			throw new Error(
				err instanceof Error
					? `Failed to load GitHub data: ${err.message}`
					: 'Failed to load GitHub data. Please try again later.'
			);
		}
	}

	// ===== COMPONENT LIFECYCLE =====
	onMount(async () => {
		try {
			console.log('Fetching GitHub data...');
			const data = await fetchGithubData();
			console.log('GitHub data received:', data);

			projects = data.repos;
			pinnedProjects = data.pinnedRepos;
			githubEvents = data.events;
			contributionsData = data.contributions;
			contributionActivity = data.contributionActivity || [];

			console.log('Final data assignments:');
			console.log('- projects:', projects.length);
			console.log('- pinnedProjects:', pinnedProjects.length);
			console.log('- githubEvents:', githubEvents.length);
			console.log('- contributionsData:', contributionsData);

			// Small delay to ensure smooth transition
			setTimeout(() => {
				isLoading = false;
				contentReady = true;
			}, 500);
		} catch (err: unknown) {
			console.error('Error in onMount:', err);
			if (err instanceof Error) {
				error = err.message;
			} else {
				error = 'An unknown error occurred';
			}
			isLoading = false;
		}
	});
</script>

<PageLayout
	title=""
	subtitle="Exploring the intersection of code and creativity through web development, audio applications, and innovative digital experiences"
>
	<!-- Main Container with Responsive Sidebar Layout -->
	<div class="flex">
		{#if contentReady}
			<!-- Mobile: Only CODE title at top for page identification -->
			<div class="md:hidden fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
				<h1 class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 tracking-wider" 
					style="-webkit-text-stroke: 2px #fbbf24; text-stroke: 2px #fbbf24;">
					CODE
				</h1>
			</div>

			<!-- Desktop: All three vertical titles -->
			<div class="hidden md:block">
				<!-- Left Sidebar - Vertical CODE Title (always visible on scroll) -->
				<div class="fixed left-4 top-20 z-50 flex flex-col items-center">
					<div class="flex flex-col space-y-2">
						<span class="block leading-none text-transparent font-black text-[15vh] lg:text-[20vh] hover:scale-110 transition-transform duration-300" style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">C</span>
						<span class="block leading-none text-transparent font-black text-[15vh] lg:text-[20vh] hover:scale-110 transition-transform duration-300" style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">O</span>
						<span class="block leading-none text-transparent font-black text-[15vh] lg:text-[20vh] hover:scale-110 transition-transform duration-300" style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">D</span>
						<span class="block leading-none text-transparent font-black text-[15vh] lg:text-[20vh] hover:scale-110 transition-transform duration-300" style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">E</span>
					</div>
				</div>

				<!-- Right Sidebar - Vertical LANGUAGE Title (positioned relative to skills section) -->
				<div class="absolute z-40 flex flex-col items-center" style="right: 2rem; top: 180vh;">
					<div class="flex flex-col space-y-4 lg:space-y-6">
						<span class="block leading-none text-transparent font-black text-[12vh] lg:text-[15vh] hover:scale-110 transition-transform duration-300" style="-webkit-text-stroke: 4px #fbbf24; text-stroke: 4px #fbbf24;">L</span>
						<span class="block leading-none text-transparent font-black text-[12vh] lg:text-[15vh] hover:scale-110 transition-transform duration-300" style="-webkit-text-stroke: 4px #fbbf24; text-stroke: 4px #fbbf24;">A</span>
						<span class="block leading-none text-transparent font-black text-[12vh] lg:text-[15vh] hover:scale-110 transition-transform duration-300" style="-webkit-text-stroke: 4px #fbbf24; text-stroke: 4px #fbbf24;">N</span>
						<span class="block leading-none text-transparent font-black text-[12vh] lg:text-[15vh] hover:scale-110 transition-transform duration-300" style="-webkit-text-stroke: 4px #fbbf24; text-stroke: 4px #fbbf24;">G</span>
						<span class="block leading-none text-transparent font-black text-[12vh] lg:text-[15vh] hover:scale-110 transition-transform duration-300" style="-webkit-text-stroke: 4px #fbbf24; text-stroke: 4px #fbbf24;">U</span>
						<span class="block leading-none text-transparent font-black text-[12vh] lg:text-[15vh] hover:scale-110 transition-transform duration-300" style="-webkit-text-stroke: 4px #fbbf24; text-stroke: 4px #fbbf24;">A</span>
						<span class="block leading-none text-transparent font-black text-[12vh] lg:text-[15vh] hover:scale-110 transition-transform duration-300" style="-webkit-text-stroke: 4px #fbbf24; text-stroke: 4px #fbbf24;">G</span>
						<span class="block leading-none text-transparent font-black text-[12vh] lg:text-[15vh] hover:scale-110 transition-transform duration-300" style="-webkit-text-stroke: 4px #fbbf24; text-stroke: 4px #fbbf24;">E</span>
					</div>
				</div>

				<!-- Left Sidebar - Vertical PROGRESS Title (positioned relative to GitHub section) -->
				<div class="absolute left-4 z-40 flex flex-col items-center" style="top: 300vh;">
					<div class="flex flex-col space-y-3 lg:space-y-4">
						<span class="block leading-none text-transparent font-black text-[15vh] lg:text-[20vh] hover:scale-110 transition-transform duration-300" style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">P</span>
						<span class="block leading-none text-transparent font-black text-[15vh] lg:text-[20vh] hover:scale-110 transition-transform duration-300" style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">R</span>
						<span class="block leading-none text-transparent font-black text-[15vh] lg:text-[20vh] hover:scale-110 transition-transform duration-300" style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">O</span>
						<span class="block leading-none text-transparent font-black text-[15vh] lg:text-[20vh] hover:scale-110 transition-transform duration-300" style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">G</span>
						<span class="block leading-none text-transparent font-black text-[15vh] lg:text-[20vh] hover:scale-110 transition-transform duration-300" style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">R</span>
						<span class="block leading-none text-transparent font-black text-[15vh] lg:text-[20vh] hover:scale-110 transition-transform duration-300" style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">E</span>
						<span class="block leading-none text-transparent font-black text-[15vh] lg:text-[20vh] hover:scale-110 transition-transform duration-300" style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">S</span>
						<span class="block leading-none text-transparent font-black text-[15vh] lg:text-[20vh] hover:scale-110 transition-transform duration-300" style="-webkit-text-stroke: 6px #fbbf24; text-stroke: 6px #fbbf24;">S</span>
					</div>
				</div>
			</div>
		{/if} <!-- Close contentReady conditional -->
		
		<!-- Main Content Area with Responsive Margins -->
		<div class="w-full ml-4 md:ml-40 lg:ml-48 mr-4 md:mr-16 lg:mr-20">
			<div class="w-full max-w-[var(--container-width)] mx-auto px-4">
		{#if isLoading}
			<!-- Tailwind CSS Loading State -->
			<div class="flex items-center justify-center min-h-screen">
				<div class="text-center">
					<!-- Spinning loader -->
					<div class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-amber-400 border-t-transparent mb-4"></div>
					<!-- Loading text -->
					<div class="space-y-2">
						<h3 class="text-xl font-semibold text-white">Loading Portfolio</h3>
						<p class="text-gray-300">Fetching projects and data...</p>
						<!-- Animated dots -->
						<div class="flex justify-center space-x-1">
							<div class="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
							<div class="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
							<div class="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
						</div>
					</div>
				</div>
			</div>
		{:else if error}
			<!-- Error State -->
			<div
				class="mx-auto max-w-2xl rounded-lg border border-red-600/50 bg-red-900/20 p-6 text-center"
			>
				<h2 class="mb-2 text-xl font-semibold text-white">Unable to Load Projects</h2>
				<p class="text-gray-300">{error}</p>
				<button
					class="bg-primary hover:bg-primary-600 mt-4 rounded-md px-4 py-2 font-medium text-white"
					on:click={() => window.location.reload()}
				>
					Try Again
				</button>
			</div>
		{:else}
			<!-- Main Content -->
			<div class="space-y-24">
				<!-- Main Projects Title -->
				<section class="text-center">
					<div class="mb-8">
						<div class="skill-title-container mb-8 w-full">
							<h1 class="skill-title perspective-1000 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
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
								<span class="text-primary animate-spin-slow mx-6 text-7xl">🚀</span>
							</h1>
							<div class="modern-subtitle w-full">
								<div class="subtitle-row flex flex-wrap gap-2 sm:gap-4 justify-center items-center w-full">
									<span class="subtitle-text text-sm sm:text-base md:text-lg lg:text-xl">From Concept To Deployment</span>
									<div class="subtitle-accent flex gap-1 sm:gap-2">
										<span class="accent-dot"></span>
										<span class="accent-line"></span>
										<span class="accent-dot"></span>
									</div>
									<span class="subtitle-text text-sm sm:text-base md:text-lg lg:text-xl">Bringing Ideas To Life</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				<!-- Projects Section Component -->
				<ProjectsSection {projects} {pinnedProjects} />

				<!-- Skills Section -->
				<section bind:this={skillsSection} class="relative overflow-hidden px-4 w-full">
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

					<div class="relative z-10 mb-12 text-center w-full">
						<div class="skill-title-container mb-8 w-full">
							<h2 class="skill-title perspective-1000 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
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
								<span class="text-primary animate-spin-slow mx-6 text-7xl">⚡</span>
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
								<div class="subtitle-row flex flex-wrap gap-2 sm:gap-4 justify-center items-center w-full">
									<span class="subtitle-text text-sm sm:text-base md:text-lg lg:text-xl">Learning New skills</span>
									<div class="subtitle-accent flex gap-1 sm:gap-2">
										<span class="accent-dot"></span>
										<span class="accent-line"></span>
										<span class="accent-dot"></span>
									</div>
									<span class="subtitle-text text-sm sm:text-base md:text-lg lg:text-xl">Leveling Up Border Horizon</span>
								</div>
							</div>
						</div>
					</div>

					<!-- Skills Section - All Skills Mixed Together -->
					<SkillsSection />
				</section>

				<!-- GitHub Activity -->
				<section>
					<div class="mb-12 text-center">
						<div class="skill-title-container mb-8 w-full">
							<h2 class="skill-title perspective-1000 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
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
								<span class="text-primary animate-spin-slow mx-6 text-7xl">💻</span>
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
							<div class="modern-subtitle w-full">
								<div class="subtitle-row flex flex-wrap gap-2 sm:gap-4 justify-center items-center w-full">
									<span class="subtitle-text text-sm sm:text-base md:text-lg lg:text-xl">Code Contributions</span>
									<div class="subtitle-accent flex gap-1 sm:gap-2">
										<span class="accent-dot"></span>
										<span class="accent-line"></span>
										<span class="accent-dot"></span>
									</div>
									<span class="subtitle-text text-sm sm:text-base md:text-lg lg:text-xl">Code Journey</span>
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
		</div> <!-- Close max-w container -->
	</div> <!-- Close main content area -->
</div> <!-- Close flex container -->
</PageLayout>

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
	box-shadow: 0 0 10px rgba(255, 222, 33, 0.6), 0 0 20px rgba(255, 222, 33, 0.3);
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
	0%, 100% {
		text-shadow: 0 2px 10px rgba(255, 222, 33, 0.3);
		transform: scale(1);
	}
	50% {
		text-shadow: 0 4px 20px rgba(255, 222, 33, 0.6);
		transform: scale(1.02);
	}
}

@keyframes accentPulse {
	0%, 100% {
		opacity: 1;
		transform: scale(1);
	}
	50% {
		opacity: 0.7;
		transform: scale(1.1);
	}
}
</style>
