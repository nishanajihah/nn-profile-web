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

			isLoading = false;
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
	title="Code & Projects"
	subtitle="Exploring the intersection of code and creativity through web development, audio applications, and innovative digital experiences"
>
	<div class="w-full max-w-[var(--container-width)] mx-auto px-4">
		{#if isLoading}
			<!-- Loading State -->
			<div class="flex flex-col items-center justify-center py-20">
				<div
					class="border-primary mb-6 h-16 w-16 animate-spin rounded-full border-t-2 border-b-2"
				></div>
				<p class="text-lg text-gray-400">Loading projects...</p>
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
	</div>
</PageLayout>

<style>
@media (max-width: 640px) {
	.skill-title {
		font-size: 2.5rem !important;
	}
	.modern-subtitle .subtitle-text {
		font-size: 1rem !important;
	}
}
@media (max-width: 480px) {
	.skill-title {
		font-size: 1.8rem !important;
	}
	.modern-subtitle .subtitle-text {
		font-size: 0.9rem !important;
	}
}
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
	/* ===== GLOBAL CSS ===== */
	/* ===== ANIMATIONS ===== */
	/* Enhanced animations and effects */
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px) scale(0.9);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0px) rotate(0deg);
		}
		25% {
			transform: translateY(-15px) rotate(90deg);
		}
		50% {
			transform: translateY(-20px) rotate(180deg);
		}
		75% {
			transform: translateY(-10px) rotate(270deg);
		}
	}

	@keyframes float-reverse {
		0%,
		100% {
			transform: translateY(0px) rotate(360deg);
		}
		25% {
			transform: translateY(-10px) rotate(270deg);
		}
		50% {
			transform: translateY(-15px) rotate(180deg);
		}
		75% {
			transform: translateY(-8px) rotate(90deg);
		}
	}

	@keyframes shine {
		0% {
			transform: translateX(-100%) skewX(-12deg);
		}
		100% {
			transform: translateX(200%) skewX(-12deg);
		}
	}

	@keyframes count-up {
		from {
			transform: scale(0.5);
			opacity: 0;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}

	@keyframes fade-in-up {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes pulse-glow {
		0%,
		100% {
			box-shadow:
				0 0 5px currentColor,
				0 0 10px currentColor,
				0 0 15px currentColor;
			transform: scale(1);
		}
		50% {
			box-shadow:
				0 0 10px currentColor,
				0 0 20px currentColor,
				0 0 30px currentColor;
			transform: scale(1.05);
		}
	}

	@keyframes bounce-in {
		0% {
			transform: scale(0.3);
			opacity: 0;
		}
		50% {
			transform: scale(1.05);
		}
		70% {
			transform: scale(0.9);
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	@keyframes slide-in-left {
		from {
			transform: translateX(-50px);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	/* Skill title animation */
	.skill-title span:hover {
		color: #ffde21;
		text-shadow:
			0 0 10px #ffde21,
			0 0 20px #ffd700,
			0 0 30px #ffde21;
		transform: scale(1.2) rotateY(360deg);
	}

	/* ===== PROJECTS MAIN TITLE ANIMATIONS ===== */
	/* Clean and simple animation for main Projects title */
	@keyframes smoothSlideUp {
		0% {
			opacity: 0;
			transform: translateY(30px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slideInFromLeft {
		0% {
			opacity: 0;
			transform: translateX(-30px);
		}
		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes slideInFromRight {
		0% {
			opacity: 0;
			transform: translateX(30px);
		}
		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes lineGrowDown {
		0% {
			height: 0;
		}
		100% {
			height: 40px;
		}
	}

	/* CSS Variables for dynamic colors */
	:root {
		--primary-rgb: 0, 245, 255;
	}

	@keyframes pulse-glow {
		0%,
		100% {
			box-shadow: 0 0 20px rgba(0, 245, 255, 0.3);
		}
		50% {
			box-shadow:
				0 0 40px rgba(0, 245, 255, 0.6),
				0 0 60px rgba(0, 245, 255, 0.3);
		}
	}

	@keyframes spin-slow {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes spin-reverse {
		from {
			transform: rotate(360deg);
		}
		to {
			transform: rotate(0deg);
		}
	}

	@keyframes text-gradient {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}

	@keyframes shine {
		0% {
			transform: translateX(-100%) skewX(-12deg);
		}
		100% {
			transform: translateX(200%) skewX(-12deg);
		}
	}

	.animate-spin-slow {
		animation: spin-slow 10s linear infinite;
	}

	/* Modern Subtitle Design */
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

	@keyframes dotFloat {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-5px);
		}
	}

	@keyframes lineExtend {
		0%,
		100% {
			transform: scaleX(1);
			opacity: 1;
		}
		50% {
			transform: scaleX(1.2);
			opacity: 0.8;
		}
	}

	@keyframes fadeInOut {
		0%,
		100% {
			opacity: 0.8;
		}
		50% {
			opacity: 1;
		}
	}

	/* CSS Variables for dynamic colors */
	:root {
		--primary-rgb: 0, 245, 255;
	}

	/* ===== TITLE AND SUBTITLE STYLES FOR GITHUB ACTIVITY ===== */
	/* Keep title and subtitle styles since they remain in the main page */

	/* Animated Title Styling - Matching Projects Section */
	.github-main-title-container {
		position: relative;
		padding: 0.5rem 0;
	}

	.github-main-title {
		font-family: 'JetBrains Mono', monospace;
		position: relative;
		display: inline-block;
		color: white !important;
		text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
		filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.2));
		font-size: 4rem;
		font-weight: 700;
		letter-spacing: -0.05em; /* Tighten letter spacing */
	}

	.circle-swirl-icon {
		display: inline-block;
		font-size: 2.5rem;
		color: #facc15;
		margin: 0 0.8rem;
		animation: continuousRotate 3s linear infinite;
		transform-origin: center;
		opacity: 0.8;
		transition: all 0.3s ease;
	}

	.circle-swirl-icon:hover {
		opacity: 1;
		color: #ffde21;
		transform: scale(1.2);
		animation: fastRotate 0.5s linear infinite;
	}

	@keyframes continuousRotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes fastRotate {
		0% {
			transform: scale(1.2) rotate(0deg);
		}
		100% {
			transform: scale(1.2) rotate(360deg);
		}
	}

	.smooth-letter {
		display: inline-block;
		opacity: 1;
		color: white !important;
		animation: simpleSlideIn 0.6s ease-out forwards;
		transition: all 0.5s ease;
		cursor: pointer;
		transform-origin: center; /* Ensure proper rotation center */
		margin: 0 -0.02em; /* Slight negative margin to bring letters closer */
	}

	.smooth-letter:hover {
		color: #facc15 !important;
		transform: translateY(-5px) scale(1.1) rotateZ(360deg);
		text-shadow: 0 0 20px rgba(250, 204, 21, 0.8);
		filter: drop-shadow(0 8px 25px rgba(250, 204, 21, 0.6));
		animation: letterSpin 0.6s ease-in-out;
	}

	@keyframes letterSpin {
		0% {
			transform: translateY(0) scale(1) rotateZ(0deg);
		}
		50% {
			transform: translateY(-8px) scale(1.15) rotateZ(180deg);
		}
		100% {
			transform: translateY(-5px) scale(1.1) rotateZ(360deg);
		}
	}

	@keyframes simpleSlideIn {
		0% {
			opacity: 0;
			transform: translateX(-30px);
		}
		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}

	/* Modern Subtitle - Matching Projects */
	.modern-subtitle.github-subtitle {
		position: relative;
		padding: 0.5rem 0; /* Reduced from 1rem to 0.5rem */
	}

	.modern-subtitle .subtitle-row {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.modern-subtitle .subtitle-text {
		font-size: 1.25rem;
		color: rgba(255, 255, 255, 0.8);
		font-weight: 500;
		letter-spacing: 0.05em;
		position: relative;
	}

	.modern-subtitle .subtitle-accent {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		position: relative;
	}

	.modern-subtitle .accent-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: linear-gradient(45deg, #facc15, #eab308);
		box-shadow: 0 0 10px rgba(250, 204, 21, 0.5);
		animation: pulse 2s ease-in-out infinite;
	}

	.modern-subtitle .accent-line {
		width: 60px;
		height: 2px;
		background: linear-gradient(90deg, transparent, #facc15, transparent);
		position: relative;
		overflow: hidden;
	}

	.modern-subtitle .accent-line::after {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
		animation: shimmer 3s ease-in-out infinite;
	}

	@keyframes shimmer {
		0% {
			left: -100%;
		}
		50% {
			left: 100%;
		}
		100% {
			left: 100%;
		}
	}

	/* Responsive Design for Title */
	@media (max-width: 768px) {
		.github-main-title {
			font-size: 3rem;
		}
	}

	@media (max-width: 480px) {
		.github-main-title {
			font-size: 2.5rem;
		}
	}
</style>
