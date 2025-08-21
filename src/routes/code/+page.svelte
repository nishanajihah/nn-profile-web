<script lang="ts">
	// ===== IMPORTS =====
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import PageLayout from '$lib/components/PageLayout.svelte';
	import SkillsSection from '$lib/components/code/SkillsSection.svelte';

	// Register GSAP plugins
	gsap.registerPlugin(ScrollTrigger);

	// ===== TYPES & INTERFACES =====
	interface Project {
		id: number;
		name: string;
		description: string;
		html_url: string;
		stargazers_count: number;
		forks_count: number;
		language: string;
		languageColor: string;
		topics: string[];
		demo_url?: string;
		readme_image?: string;
		created_at: string;
		updated_at: string;
		pushed_at: string;
		homepage?: string;
		size: number;
	}

	// ===== GLOBAL STATE =====
	let isLoading = true;
	let error: string | null = null;

	// ===== ANIMATION REFERENCES =====
	let projectsSection: HTMLElement;
	let skillsSection: HTMLElement;
	let contributionsSection: HTMLElement;

	// ===== PROJECTS SECTION - TypeScript =====
	let projects: Project[] = [];
	let pinnedProjects: Project[] = [];
	let showAllProjects = false;
	let projectSearchQuery = '';

	// Project filtering logic
	$: filteredProjects = projects.filter(
		(project) =>
			project.name.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
			(project.description &&
				project.description.toLowerCase().includes(projectSearchQuery.toLowerCase())) ||
			(project.language &&
				project.language.toLowerCase().includes(projectSearchQuery.toLowerCase()))
	);

	// Display projects (limit to 15 unless showing all)
	$: displayedProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 15);

	function getLanguageColorClass(language: string): string {
		const colorMap: Record<string, string> = {
			TypeScript: 'bg-blue-500',
			JavaScript: 'bg-yellow-400',
			Python: 'bg-blue-700',
			HTML: 'bg-orange-600',
			CSS: 'bg-blue-500',
			Svelte: 'bg-orange-600',
			Vue: 'bg-green-500',
			Ruby: 'bg-red-600',
			Go: 'bg-blue-400',
			Rust: 'bg-orange-700',
			'C#': 'bg-green-600',
			Java: 'bg-amber-600',
			Kotlin: 'bg-purple-600',
			Swift: 'bg-orange-500',
			PHP: 'bg-indigo-600'
		};

		return colorMap[language] || 'bg-gray-500';
	}

	// ===== GITHUB SECTION - TypeScript =====
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
	// Fetch GitHub data from our API route
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

	// ===== ANIMATIONS =====
	function initAnimations() {
		// Animate featured projects
		if (projectsSection) {
			gsap.from(projectsSection.querySelectorAll('.project-card'), {
				y: 40,
				opacity: 0,
				stagger: 0.1,
				duration: 0.6,
				scrollTrigger: {
					trigger: projectsSection,
					start: 'top bottom-=100'
				}
			});
		}

		// Animate contributions section
		if (contributionsSection) {
			gsap.from(contributionsSection, {
				y: 30,
				opacity: 0,
				duration: 0.8,
				scrollTrigger: {
					trigger: contributionsSection,
					start: 'top bottom-=50'
				}
			});
		}
	}

	// ===== LIFECYCLE =====
	onMount(async () => {
		try {
			console.log('Fetching GitHub data...');
			const data = await fetchGithubData();
			console.log('GitHub data received:', data);
			projects = data.repos;
			pinnedProjects = data.pinnedRepos;
			console.log('Pinned projects:', pinnedProjects);
			console.log('All projects:', projects);
			githubEvents = data.events;
			contributionsData = data.contributions;
			contributionActivity = data.contributionActivity || [];
			isLoading = false;

			// Initialize animations after data is loaded
			setTimeout(() => initAnimations(), 100);
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
	<div class="container-custom">
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
					<div class="projects-main-title-container mb-8">
						<h1 class="projects-main-title text-6xl font-bold text-white mb-6">
							<span class="smooth-letter" style="animation-delay: 0.1s;">P</span>
							<span class="smooth-letter" style="animation-delay: 0.15s;">r</span>
							<span class="smooth-letter" style="animation-delay: 0.2s;">o</span>
							<span class="smooth-letter" style="animation-delay: 0.25s;">j</span>
							<span class="smooth-letter" style="animation-delay: 0.3s;">e</span>
							<span class="smooth-letter" style="animation-delay: 0.35s;">c</span>
							<span class="smooth-letter" style="animation-delay: 0.4s;">t</span>
							<span class="smooth-letter" style="animation-delay: 0.45s;">s</span>
						</h1>
						<div class="modern-subtitle projects-subtitle">
							<div class="subtitle-row">
								<span class="subtitle-text">From Concept To Deployment</span>
								<div class="subtitle-accent">
									<span class="accent-dot"></span>
									<span class="accent-line"></span>
									<span class="accent-dot"></span>
								</div>
								<span class="subtitle-text">Bringing Ideas To Life</span>
							</div>
						</div>
					</div>
				</section>

				<!-- Featured Projects -->
				{#if pinnedProjects.length > 0}
					<section>
						<div class="mb-12 text-left">
							<h2 class="mb-4 text-4xl font-bold text-white subsection-title-left">Featured Projects</h2>
							<p class="max-w-2xl text-xl text-gray-400">
								Showcasing my best work that combines creativity with technical excellence
							</p>
						</div>
						<div
							bind:this={projectsSection}
							class="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3"
						>
							{#each pinnedProjects as project, index (project.id)}
								<article
									class="featured-project-card group relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm transition-all duration-700 hover:-translate-y-4 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20 flex flex-col"
									style="animation-delay: {index * 0.2}s"
								>
									<!-- Project Image with Enhanced Effects -->
									<div class="relative aspect-video overflow-hidden">
										{#if project.readme_image}
											<img
												src={project.readme_image}
												alt="{project.name} preview"
												class="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
											/>
										{:else}
											<div
												class="from-primary/20 flex h-full w-full items-center justify-center bg-gradient-to-br to-purple-600/20 transition-all duration-500 group-hover:from-primary/30 group-hover:to-purple-600/30"
											>
												<!-- Clean gradient background, no icon -->
											</div>
										{/if}
										
										<!-- Live Site Badge -->
										{#if project.homepage}
											<div class="absolute top-3 right-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
												<div class="flex items-center gap-1 rounded-full bg-green-500/90 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
													<span class="h-2 w-2 animate-pulse rounded-full bg-green-300"></span>
													Live
												</div>
											</div>
										{/if}
										
										<!-- Overlay Effects -->
										<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100"></div>
										<div class="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-purple-600/10 opacity-0 transition-all duration-500 group-hover:opacity-100"></div>
									</div>

									<!-- Enhanced Content -->
									<div class="p-6 flex-1 flex flex-col">
										<!-- Project Title with Glow Effect -->
										<h3 class="group-hover:text-primary mb-3 text-xl font-bold text-white transition-all duration-300 group-hover:text-shadow-glow">
											{project.name}
										</h3>
										
										<!-- Description - Fixed Height -->
										<div class="mb-4 h-16 flex items-start">
											{#if project.description && project.description.trim() !== '' && project.description !== 'No description available'}
												<p class="line-clamp-3 text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
													{project.description}
												</p>
											{:else}
												<!-- Empty state - no text displayed -->
												<div class="w-full"></div>
											{/if}
										</div>

										<!-- Tech Stack Section -->
										<div class="mb-4 min-h-[80px] flex flex-col justify-start">
											<!-- Primary Language -->
											{#if project.language}
												<div class="mb-3 flex items-center gap-2">
													<span class="inline-block h-3 w-3 rounded-full {getLanguageColorClass(project.language)} shadow-lg"></span>
													<span class="text-sm font-medium text-gray-300">{project.language}</span>
													<span class="text-xs text-gray-500">• Primary</span>
												</div>
											{/if}

											<!-- Languages Used -->
											<div class="flex-1">
												<div class="mb-2 text-xs font-medium text-gray-400 uppercase tracking-wide">Other Languages</div>
												<div class="flex flex-wrap gap-2">
													{#if project.topics && project.topics.length > 0}
														{#each project.topics.filter(topic => topic.toLowerCase() !== project.language?.toLowerCase()) as lang}
															<span class="tech-badge bg-gray-700 text-white border-gray-600 rounded-full border px-3 py-1 text-xs font-medium transition-all duration-300 hover:scale-105">
																{lang}
															</span>
														{/each}
													{:else}
														<span class="text-xs text-gray-500 italic">No additional languages detected</span>
													{/if}
												</div>
											</div>
										</div>

										<!-- Stats Section -->
										<div class="mb-4 flex items-center gap-4 text-sm text-gray-400">
											<div class="flex items-center gap-1 transition-colors duration-300 hover:text-yellow-400">
												<span>⭐</span>
												<span class="font-medium">{project.stargazers_count}</span>
												<span class="text-xs">stars</span>
											</div>
											{#if project.homepage}
												<div class="flex items-center gap-1 text-green-400">
													<span>�</span>
													<span class="text-xs font-medium">Live Site</span>
												</div>
											{/if}
										</div>

										<!-- Live URL Display -->
										{#if project.homepage}
											<div class="mb-4 rounded-xl bg-gradient-to-r from-yellow-400/20 via-yellow-300/10 to-yellow-400/20 p-4 border-2 border-yellow-400/60 shadow-lg flex flex-col items-start gap-2">
												<span class="text-xs font-extrabold text-yellow-400 uppercase tracking-wide mb-1">Live Web URL</span>
												<a 
													href={project.homepage} 
													target="_blank" 
													rel="noopener noreferrer"
													class="block w-full text-yellow-300 hover:text-yellow-500 text-xs font-mono break-all transition-all duration-200 bg-gray-900/80 rounded-lg px-3 py-2 shadow-inner border border-yellow-400/30 hover:bg-yellow-400/10"
												>
													{project.homepage}
												</a>
											</div>
										{/if}

										<!-- Action Buttons -->
										<div class="flex gap-3 border-t border-gray-700/30 pt-4 mt-auto">
											{#if project.homepage && project.html_url}
												<!-- Both live site and code available -->
												<a
													href={project.homepage}
													target="_blank"
													rel="noopener noreferrer"
													class="flex-1 bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center rounded-full px-6 py-2 text-sm font-extrabold text-gray-900 transition-all duration-200 shadow-lg border-2 border-yellow-400/80 tracking-wide hover:scale-105 hover:shadow-xl animate-pulse"
												>
													Live Web
												</a>
												<a
													href={project.html_url}
													target="_blank"
													rel="noopener noreferrer"
													class="flex-1 group/btn flex items-center justify-center rounded-full bg-gray-700/80 backdrop-blur-sm px-6 py-2 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-gray-600/80 hover:shadow-xl border border-gray-600/30"
												>
													View Code
												</a>
											{:else if project.homepage}
												<!-- Only live site available -->
												<a
													href={project.homepage}
													target="_blank"
													rel="noopener noreferrer"
													class="w-full bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center rounded-full px-6 py-2 text-sm font-extrabold text-gray-900 transition-all duration-200 shadow-lg border-2 border-yellow-400/80 tracking-wide hover:scale-105 hover:shadow-xl animate-pulse"
												>
													Live Web
												</a>
											{:else if project.html_url}
												<!-- Only code available -->
												<a
													href={project.html_url}
													target="_blank"
													rel="noopener noreferrer"
													class="w-full group/btn flex items-center justify-center rounded-full bg-gray-700/80 backdrop-blur-sm px-6 py-2 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-gray-600/80 hover:shadow-xl border border-gray-600/30"
												>
													View Source Code
												</a>
											{/if}
										</div>
									</div>

									<!-- Enhanced Floating Elements -->
									<div class="absolute top-4 left-4 opacity-0 transition-all duration-700 group-hover:opacity-100">
										<div class="bg-primary/30 h-3 w-3 animate-ping rounded-full"></div>
									</div>
									<div class="absolute bottom-4 right-4 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:animate-pulse">
										<div class="bg-yellow-400/40 h-4 w-4 rounded-full"></div>
									</div>
									
									<!-- Shimmer Effect -->
									<div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
								</article>
							{/each}
						</div>
					</section>
				{:else}
					<!-- No Pinned Projects Fallback -->
					<section>
						<div class="py-12 text-center">
							<div class="mb-4 text-6xl">🚀</div>
							<h3 class="mb-2 text-2xl font-bold text-white">No Featured Projects Yet</h3>
							<p class="text-gray-400">Check back soon for featured projects!</p>
						</div>
					</section>
				{/if}

				<!-- All Projects -->
				{#if projects.length > 0}
					<section>
						<div class="mb-12 text-right">
							<h2 class="mb-4 text-4xl font-bold text-white subsection-title-right">All Projects</h2>
							<p class="max-w-2xl text-xl text-gray-400 ml-auto">Browse all my repositories</p>
						</div>

						{#if showAllProjects}
							<div class="mb-6">
								<input
									type="text"
									placeholder="Search projects..."
									bind:value={projectSearchQuery}
									class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white"
								/>
							</div>
						{/if}

						<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
							{#each displayedProjects as project (project.id)}
								<div class="rounded-xl border border-gray-700/50 bg-gray-900/50 p-6">
									<h3 class="mb-2 text-lg font-bold text-white">{project.name}</h3>
									<p class="mb-4 line-clamp-2 text-sm text-gray-400">
										{project.description || 'No description'}
									</p>
									<div class="flex items-center justify-between">
										<span class="text-xs text-gray-500">{project.language}</span>
										<a
											href={project.html_url}
											target="_blank"
											class="text-primary hover:text-primary/80 text-sm"
										>
											View
										</a>
									</div>
								</div>
							{/each}
						</div>

						{#if !showAllProjects && projects.length > 15}
							<div class="mt-8 text-center">
								<button
									on:click={() => (showAllProjects = true)}
									class="bg-primary hover:bg-primary/80 rounded-lg px-6 py-3 font-medium text-white"
								>
									View All {projects.length} Repositories
								</button>
							</div>
						{/if}
					</section>
				{/if}

				<!-- Skills Section -->
				<section bind:this={skillsSection} class="relative overflow-hidden">
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

					<div class="relative z-10 mb-12 text-center">
						<div class="skill-title-container mb-8">
							<h2 class="skill-title perspective-1000 text-6xl font-bold text-white">
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
							<div class="modern-subtitle">
								<div class="subtitle-row">
									<span class="subtitle-text">Learning New skills</span>
									<div class="subtitle-accent">
										<span class="accent-dot"></span>
										<span class="accent-line"></span>
										<span class="accent-dot"></span>
									</div>
									<span class="subtitle-text">Leveling Up Border Horizon</span>
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
						<h2 class="mb-4 text-4xl font-bold text-white">GitHub Activity</h2>
						<p class="mx-auto max-w-2xl text-xl text-gray-400">
							My contributions and recent activity
						</p>
					</div>

					<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
						<!-- Contribution Stats -->
						<div
							bind:this={contributionsSection}
							class="rounded-2xl border border-gray-700/50 bg-gray-900/50 p-8"
						>
							<h3 class="mb-6 text-2xl font-bold text-white">Contribution Stats</h3>
							<div class="grid grid-cols-3 gap-6">
								<div class="text-center">
									<div class="text-primary mb-2 text-3xl font-bold">{contributionsData.total}</div>
									<div class="text-sm text-gray-400">Total Stars</div>
								</div>
								<div class="text-center">
									<div class="text-primary mb-2 text-3xl font-bold">
										{contributionsData.lastYear}
									</div>
									<div class="text-sm text-gray-400">Recent Events</div>
								</div>
								<div class="text-center">
									<div class="text-primary mb-2 text-3xl font-bold">{contributionsData.streak}</div>
									<div class="text-sm text-gray-400">Activity Streak</div>
								</div>
							</div>
						</div>

						<!-- Recent Activity -->
						<div class="rounded-2xl border border-gray-700/50 bg-gray-900/50 p-8">
							<h3 class="mb-6 text-2xl font-bold text-white">Recent Activity</h3>
							<div class="max-h-80 space-y-4 overflow-y-auto">
								{#each githubEvents.slice(0, 8) as event}
									<div class="flex items-start gap-3 rounded-lg bg-gray-800/30 p-3">
										<div class="bg-primary mt-2 h-2 w-2 rounded-full"></div>
										<div>
											<p class="text-sm text-gray-300">
												<span class="font-medium text-white"
													>{event.type?.replace(/([A-Z])/g, ' $1').trim()}</span
												>
												{#if event.repo}
													in <span class="text-primary">{event.repo.name}</span>
												{/if}
											</p>
											{#if event.created_at}
												<p class="mt-1 text-xs text-gray-500">
													{new Date(event.created_at).toLocaleDateString()}
												</p>
											{/if}
										</div>
									</div>
								{/each}
								{#if githubEvents.length === 0}
									<p class="py-8 text-center text-gray-400">No recent activity available</p>
								{/if}
							</div>
						</div>
					</div>
				</section>
			</div>
		{/if}
	</div>
</PageLayout>

<style>
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

	@keyframes wiggle {
		0%,
		7% {
			transform: rotateZ(0);
		}
		15% {
			transform: rotateZ(-15deg);
		}
		20% {
			transform: rotateZ(10deg);
		}
		25% {
			transform: rotateZ(-10deg);
		}
		30% {
			transform: rotateZ(6deg);
		}
		35% {
			transform: rotateZ(-4deg);
		}
		40%,
		100% {
			transform: rotateZ(0);
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

	@keyframes typewriter {
		from {
			width: 0;
		}
		to {
			width: 100%;
		}
	}

	@keyframes blink {
		0%,
		50% {
			opacity: 1;
		}
		51%,
		100% {
			opacity: 0;
		}
	}

	/* Floating particles */
	.animate-float {
		animation: float 4s ease-in-out infinite;
	}

	.animate-float-reverse {
		animation: float-reverse 5s ease-in-out infinite;
	}

	.floating-particle {
		filter: blur(1px);
	}

	/* Enhanced skill animations */
	.category-section {
		animation: fadeInUp 0.8s ease-out forwards;
		opacity: 0;
	}

	.skill-item {
		animation: slide-in-left 0.6s ease-out forwards;
		opacity: 0;
	}

	.skill-bubble {
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		overflow: hidden;
	}

	.skill-bubble:hover {
		transform: translateY(-2px) scale(1.02);
	}

	/* ===== PROJECTS SECTION - CSS ===== */
	/* Project card animations */
	.project-card {
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		transform-origin: center;
	}

	.project-card:hover {
		animation: pulse-glow 2s ease-in-out infinite;
	}

	/* Ripple effect */
	.ripple-effect {
		background: radial-gradient(circle, rgba(var(--primary-rgb), 0.3) 0%, transparent 70%);
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

	.projects-main-title {
		animation: fadeInUp 0.8s ease-out forwards;
	}

	.smooth-letter {
		display: inline-block;
		opacity: 0;
		animation: smoothSlideUp 0.8s ease-out forwards;
		cursor: default;
		transition: all 0.3s ease;
	}

	.smooth-letter:hover {
		color: #ffde21;
		text-shadow: 0 0 20px #ffde21;
		transform: translateY(-5px);
	}

	/* Projects subtitle styling */
	.projects-subtitle {
		opacity: 0;
		animation: fadeInUp 1s ease-out forwards;
		animation-delay: 0.8s;
	}

	.projects-subtitle .subtitle-text {
		animation-delay: 1s;
	}

	.projects-subtitle .subtitle-accent {
		animation-delay: 1.2s;
	}

	/* ===== FEATURED PROJECTS ANIMATIONS ===== */
	/* Enhanced featured project card animations */
	@keyframes featuredCardEntrance {
		0% {
			opacity: 0;
			transform: translateY(40px) scale(0.95);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.featured-project-card {
		opacity: 0;
		animation: featuredCardEntrance 0.8s ease-out forwards;
		position: relative;
	}

	.featured-project-card::before {
		content: '';
		position: absolute;
		top: -2px;
		left: -2px;
		right: -2px;
		bottom: -2px;
		background: linear-gradient(45deg, transparent, rgba(0, 245, 255, 0.1), transparent);
		border-radius: inherit;
		opacity: 0;
		transition: opacity 0.5s ease;
		z-index: -1;
	}

	.featured-project-card:hover::before {
		opacity: 1;
	}

	/* Tech badge animations */
	.tech-badge {
		position: relative;
		overflow: hidden;
	}

	.tech-badge::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		transition: left 0.5s ease;
	}

	.tech-badge:hover::before {
		left: 100%;
	}

	/* Text glow effect */
	.text-shadow-glow {
		text-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
	}

	/* Subsection titles animations */
	.subsection-title-left {
		opacity: 0;
		animation: slideInFromLeft 0.8s ease-out forwards;
		animation-delay: 1.4s;
		position: relative;
	}

	.subsection-title-left::before {
		content: '';
		position: absolute;
		left: -20px;
		top: 50%;
		transform: translateY(-50%);
		width: 4px;
		height: 0;
		background: linear-gradient(to bottom, #ffde21, #ffd700);
		border-radius: 2px;
		animation: lineGrowDown 0.6s ease-out forwards;
		animation-delay: 2s;
	}

	.subsection-title-right {
		opacity: 0;
		animation: slideInFromRight 0.8s ease-out forwards;
		animation-delay: 1.6s;
		position: relative;
	}

	.subsection-title-right::after {
		content: '';
		position: absolute;
		right: -20px;
		top: 50%;
		transform: translateY(-50%);
		width: 4px;
		height: 0;
		background: linear-gradient(to bottom, #ffde21, #ffd700);
		border-radius: 2px;
		animation: lineGrowDown 0.6s ease-out forwards;
		animation-delay: 2.2s;
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

	/* Category icon animations */
	.category-icon {
		filter: drop-shadow(0 0 8px rgba(var(--primary-rgb), 0.3));
	}

	/* Skill dots animation */
	.skill-dot {
		animation: bounce-in 0.4s ease-out forwards;
		opacity: 0;
	}

	/* Progress bar enhancements */
	.skill-bar {
		position: relative;
		overflow: hidden;
	}

	/* Enhanced staggered animations */
	.category-section:nth-child(1) {
		animation-delay: 0.2s;
	}
	.category-section:nth-child(2) {
		animation-delay: 0.4s;
	}
	.category-section:nth-child(3) {
		animation-delay: 0.6s;
	}
	.category-section:nth-child(4) {
		animation-delay: 0.8s;
	}

	.skill-item:nth-child(1) {
		animation-delay: 0.1s;
	}
	.skill-item:nth-child(2) {
		animation-delay: 0.2s;
	}
	.skill-item:nth-child(3) {
		animation-delay: 0.3s;
	}
	.skill-item:nth-child(4) {
		animation-delay: 0.4s;
	}
	.skill-item:nth-child(5) {
		animation-delay: 0.5s;
	}
	.skill-item:nth-child(6) {
		animation-delay: 0.6s;
	}

	/* Project card hover effects */
	.project-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(45deg, transparent, rgba(var(--primary-rgb), 0.1), transparent);
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
	}

	.project-card:hover::before {
		opacity: 1;
	}

	/* Utility classes */
	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.skill-count-badge {
		animation: bounce-in 0.5s ease-out;
		animation-delay: 0.8s;
		opacity: 0;
		animation-fill-mode: forwards;
	}

	/* CSS Variables for dynamic colors */
	:root {
		--primary-rgb: 0, 245, 255;
	}

	/* Advanced GSAP-enhanced animations */
	@keyframes orbit {
		from {
			transform: rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg);
		}
		to {
			transform: rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg);
		}
	}

	@keyframes morph {
		0%,
		100% {
			border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
			transform: translate(0, 0) rotate(0deg);
		}
		25% {
			border-radius: 30% 70% 60% 40% / 50% 60% 40% 50%;
			transform: translate(10px, -10px) rotate(90deg);
		}
		50% {
			border-radius: 50% 50% 50% 50% / 60% 40% 60% 40%;
			transform: translate(-10px, 10px) rotate(180deg);
		}
		75% {
			border-radius: 70% 30% 40% 60% / 40% 70% 30% 60%;
			transform: translate(10px, 10px) rotate(270deg);
		}
	}

	@keyframes morph-reverse {
		0%,
		100% {
			border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%;
			transform: translate(0, 0) rotate(360deg);
		}
		25% {
			border-radius: 70% 30% 40% 60% / 60% 40% 60% 40%;
			transform: translate(-15px, 15px) rotate(270deg);
		}
		50% {
			border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
			transform: translate(15px, -15px) rotate(180deg);
		}
		75% {
			border-radius: 60% 40% 30% 70% / 30% 70% 40% 60%;
			transform: translate(-15px, -15px) rotate(90deg);
		}
	}

	@keyframes morph-slow {
		0%,
		100% {
			border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
			transform: scale(1) rotate(0deg);
		}
		33% {
			border-radius: 70% 30% 60% 40% / 40% 60% 30% 70%;
			transform: scale(1.1) rotate(120deg);
		}
		66% {
			border-radius: 30% 70% 40% 60% / 70% 30% 60% 40%;
			transform: scale(0.9) rotate(240deg);
		}
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

	/* Enhanced skill animations */
	.animate-morph {
		animation: morph 8s ease-in-out infinite;
	}

	.animate-morph-reverse {
		animation: morph-reverse 10s ease-in-out infinite;
	}

	.animate-morph-slow {
		animation: morph-slow 12s ease-in-out infinite;
	}

	.animate-pulse-glow {
		animation: pulse-glow 3s ease-in-out infinite;
	}

	.animate-spin-slow {
		animation: spin-slow 10s linear infinite;
	}

	.animate-spin-reverse {
		animation: spin-reverse 8s linear infinite;
	}

	.text-gradient-animated {
		background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe);
		background-size: 400% 400%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: text-gradient 3s ease infinite;
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

	.animate-shine {
		animation: shine 2s ease-in-out infinite;
	}

	/* Skills constellation layout */
	.skills-constellation {
		perspective: 1000px;
	}

	.category-orbit {
		transform-style: preserve-3d;
	}

	.skill-tooltip {
		z-index: 1000;
		pointer-events: none;
	}

	/* ===== GITHUB SECTION - CSS ===== */
	.stats-container {
		perspective: 1000px;
	}

	.stat-item {
		transition: all 0.3s ease;
		position: relative;
	}

	.stat-item:hover {
		transform: translateY(-5px);
	}

	/* Project card enhancements */
	.project-card {
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		transform-style: preserve-3d;
	}

	.project-card:hover {
		transform: translateY(-8px) rotateX(5deg) rotateY(5deg);
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
	}

	/* CSS Variables for dynamic colors */
	:root {
		--primary-rgb: 0, 245, 255;
	}

	/* ===== UTILITIES ===== */
	/* Utility classes */
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

</style>
