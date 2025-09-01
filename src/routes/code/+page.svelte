<script lang="ts">
	/*
	 * ===== CODE & PROJECTS PAGE =====
	 * 
	 * This component displays:
	 * - Featured/pinned projects from GitHub
	 * - All projects with search functionality
	 * - Skills section with tech stack
	 * - GitHub activity and contribution calendar
	 * 
	 * Architecture:
	 * 1. Types & Interfaces
	 * 2. State Management (DOM refs, projects, GitHub data)
	 * 3. Reactive Computations (filtering, display logic)
	 * 4. Utility Functions (language colors, etc.)
	 * 5. Interaction Handlers (scroll, navigation)
	 * 6. API Functions (GitHub data fetching)
	 * 7. Animation Functions (GSAP setup)
	 * 8. Component Lifecycle (onMount initialization)
	 */

	// ===== IMPORTS =====
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import PageLayout from '$lib/components/PageLayout.svelte';
	import SkillsSection from '$lib/components/code/SkillsSection.svelte';
	import GitHubActivitySection from '$lib/components/code/GitHubActivitySection.svelte';

	// Register GSAP plugins
	gsap.registerPlugin(ScrollTrigger);

	// ===== TYPES & INTERFACES =====
	// Main project interface matching GitHub API response
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
		languages?: string[];
	}

	// ===== STATE MANAGEMENT =====
	// Global state
	let isLoading = true;
	let error: string | null = null;

	// DOM references for animations
	let projectsSection: HTMLElement;
	let skillsSection: HTMLElement;

	// Projects state
	let projects: Project[] = [];
	let pinnedProjects: Project[] = [];
	let showAllProjects = false;
	let projectSearchQuery = '';

	// Carousel state for featured projects
	let currentProjectIndex = 0;
	let carouselContainer: HTMLElement;
	let isCarouselMode = false;

	// GitHub activity state (passed to component)
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

	// ===== REACTIVE COMPUTATIONS =====
	// Filter projects based on search query (name, description, language, topics)
	$: filteredProjects = projects.filter(
		(project) =>
			project.name.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
			(project.description &&
				project.description.toLowerCase().includes(projectSearchQuery.toLowerCase())) ||
			(project.language &&
				project.language.toLowerCase().includes(projectSearchQuery.toLowerCase()))
	);

	// Limit displayed projects to 15 unless user requests all
	$: displayedProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 15);

	// Determine if carousel mode should be active (more than 3 projects)
	$: isCarouselMode = pinnedProjects.length > 3;

	// Carousel navigation functions
	function nextProject() {
		if (isCarouselMode) {
			currentProjectIndex = (currentProjectIndex + 1) % pinnedProjects.length;
		}
	}

	function prevProject() {
		if (isCarouselMode) {
			currentProjectIndex = currentProjectIndex === 0 ? pinnedProjects.length - 1 : currentProjectIndex - 1;
		}
	}

	function goToProject(index: number) {
		if (isCarouselMode) {
			currentProjectIndex = index;
		}
	}

	// ===== UTILITY FUNCTIONS =====
	// Map programming languages to Tailwind CSS color classes
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

	// ===== INTERACTION HANDLERS =====
	// (GitHub Activity interactions are now handled by the component)

	// ===== API FUNCTIONS =====
	// Fetch all GitHub data (repos, events, contributions) from backend API
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

	// ===== ANIMATION FUNCTIONS =====
	// Setup GSAP animations for smooth page element reveals
	function initAnimations() {
		// Animate featured project cards with staggered entrance
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

		// GitHub Activity animations are now handled by the component
	}

	// ===== COMPONENT LIFECYCLE =====
	// Load GitHub data and initialize animations when component mounts
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
						<h1 class="projects-main-title mb-6 text-6xl font-bold text-white">
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
						<div class="mb-8 text-left">
							<h2 class="subsection-title-left mb-4 text-4xl font-bold text-white">
								Featured Projects
							</h2>
							<p class="max-w-2xl text-lg text-gray-400">
								Showcasing my best work
							</p>
						</div>

						<!-- Carousel Container -->
						<div class="relative">
							{#if isCarouselMode}
								<!-- Carousel Mode (More than 3 projects) -->
								<div class="overflow-hidden rounded-3xl">
									<div 
										class="flex transition-transform duration-500 ease-in-out"
										style="transform: translateX(-{currentProjectIndex * (100 / 3)}%)"
									>
										{#each pinnedProjects as project, index (project.id)}
											<div class="w-1/3 flex-shrink-0 px-3">
												<div class="featured-project-premium group cursor-pointer">
													<!-- Premium Featured Card -->
													<div class="featured-neuro-card relative overflow-hidden">
														<!-- Project Image Section -->
														<div class="image-section relative">
															{#if project.readme_image}
																<img
																	src={project.readme_image}
																	alt="{project.name} preview"
																	class="project-image"
																/>
															{:else}
																<div class="gradient-placeholder">
																	<div class="placeholder-pattern"></div>
																	<div class="project-icon">
																		<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
																			<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
																		</svg>
																	</div>
																</div>
															{/if}
															
															<!-- Live Site Overlay Badge -->
															{#if project.homepage}
																<div class="live-badge">
																	<div class="live-indicator"></div>
																	<span>Live Site</span>
																</div>
															{/if}

															<!-- Glassmorphism Overlay -->
															<div class="image-overlay group-hover:opacity-100"></div>
														</div>

														<!-- Content Section -->
														<div class="content-section">
															<h3 class="featured-title">{project.name}</h3>
															
															{#if project.description}
																<p class="featured-desc">{project.description}</p>
															{/if}

															<!-- Live Web URL Display -->
															{#if project.homepage}
																<div class="live-url-display">
																	<div class="url-label">Live Web URL</div>
																	<a
																		href={project.homepage}
																		target="_blank"
																		rel="noopener noreferrer"
																		class="url-link"
																		on:click|stopPropagation
																	>
																		{project.homepage}
																	</a>
																</div>
															{/if}

															<!-- Tech & Stats Row -->
															<div class="tech-stats-row">
																{#if project.language}
																	<div class="primary-tech">
																		<span class="tech-dot {getLanguageColorClass(project.language)}"></span>
																		<span class="tech-name">{project.language}</span>
																	</div>
																{/if}
																<div class="stats-mini">
																	<span class="star-count">⭐ {project.stargazers_count}</span>
																</div>
															</div>

															<!-- Action Buttons -->
															<div class="featured-actions">
																{#if project.homepage}
																	<a
																		href={project.homepage}
																		target="_blank"
																		rel="noopener noreferrer"
																		class="btn-primary"
																		on:click|stopPropagation
																	>
																		View Live Site
																	</a>
																{/if}
																{#if project.html_url}
																	<a
																		href={project.html_url}
																		target="_blank"
																		rel="noopener noreferrer"
																		class="btn-secondary"
																		on:click|stopPropagation
																	>
																		Source Code
																	</a>
																{/if}
															</div>
														</div>
													</div>
												</div>
											</div>
										{/each}
									</div>
								</div>

								<!-- Carousel Controls -->
								<div class="flex items-center justify-center mt-6 space-x-4">
									<button
										on:click={prevProject}
										class="neuro-button p-3 text-white hover:text-blue-400 transition-all duration-200"
										aria-label="Previous project"
									>
										<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
											<path d="M15.5 17l-5-5 5-5v10z"/>
										</svg>
									</button>

									<!-- Dots Indicator -->
									<div class="flex space-x-2">
										{#each pinnedProjects as _, index}
											<button
												on:click={() => goToProject(index)}
												class="w-2 h-2 rounded-full transition-all duration-200 {index === currentProjectIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/60'}"
												aria-label="Go to project {index + 1}"
											></button>
										{/each}
									</div>

									<button
										on:click={nextProject}
										class="neuro-button p-3 text-white hover:text-blue-400 transition-all duration-200"
										aria-label="Next project"
									>
										<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
											<path d="M8.5 7l5 5-5 5V7z"/>
										</svg>
									</button>
								</div>
							{:else}
								<!-- Grid Mode (3 or fewer projects) -->
								<div bind:this={projectsSection} class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
									{#each pinnedProjects as project, index (project.id)}
										<div class="featured-project-premium group cursor-pointer" style="animation-delay: {index * 0.1}s">
											<!-- Premium Featured Card -->
											<div class="featured-neuro-card relative overflow-hidden">
												<!-- Project Image Section -->
												<div class="image-section relative">
													{#if project.readme_image}
														<img
															src={project.readme_image}
															alt="{project.name} preview"
															class="project-image"
														/>
													{:else}
														<div class="gradient-placeholder">
															<div class="placeholder-pattern"></div>
															<div class="project-icon">
																<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
																	<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
																</svg>
															</div>
														</div>
													{/if}
													
													<!-- Live Site Overlay Badge -->
													{#if project.homepage}
														<div class="live-badge">
															<div class="live-indicator"></div>
															<span>Live Site</span>
														</div>
													{/if}

													<!-- Glassmorphism Overlay -->
													<div class="image-overlay group-hover:opacity-100"></div>
												</div>

												<!-- Content Section -->
												<div class="content-section">
													<h3 class="featured-title">{project.name}</h3>
													
													{#if project.description}
														<p class="featured-desc">{project.description}</p>
													{/if}

													<!-- Live Web URL Display -->
													{#if project.homepage}
														<div class="live-url-display">
															<div class="url-label">Live Web URL</div>
															<a
																href={project.homepage}
																target="_blank"
																rel="noopener noreferrer"
																class="url-link"
																on:click|stopPropagation
															>
																{project.homepage}
															</a>
														</div>
													{/if}

													<!-- Tech & Stats Row -->
													<div class="tech-stats-row">
														{#if project.language}
															<div class="primary-tech">
																<span class="tech-dot {getLanguageColorClass(project.language)}"></span>
																<span class="tech-name">{project.language}</span>
															</div>
														{/if}
														<div class="stats-mini">
															<span class="star-count">⭐ {project.stargazers_count}</span>
														</div>
													</div>

													<!-- Action Buttons -->
													<div class="featured-actions">
														{#if project.homepage}
															<a
																href={project.homepage}
																target="_blank"
																rel="noopener noreferrer"
																class="btn-primary"
																on:click|stopPropagation
															>
																View Live Site
															</a>
														{/if}
														{#if project.html_url}
															<a
																href={project.html_url}
																target="_blank"
																rel="noopener noreferrer"
																class="btn-secondary"
																on:click|stopPropagation
															>
																Source Code
															</a>
														{/if}
													</div>
												</div>
											</div>
										</div>
									{/each}
								</div>
							{/if}
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
					<section class="all-projects-section">
						<div class="mb-12 text-right">
							<h2 class="subsection-title-right mb-4 text-4xl font-bold text-white">
								All Projects
							</h2>
							<p class="ml-auto max-w-2xl text-xl text-gray-400">Browse all my repositories</p>
						</div>

						{#if showAllProjects}
							<div class="mb-8">
								<div class="search-container">
									<input
										type="text"
										placeholder="🔍 Search projects..."
										bind:value={projectSearchQuery}
										class="search-input"
									/>
								</div>
							</div>
						{/if}

						<div class="projects-grid">
							{#each displayedProjects as project (project.id)}
								<article class="project-card-minimal">
									<!-- Simple content layout -->
									<div class="card-header">
										<h3 class="project-title">{project.name}</h3>
										{#if project.language}
											<span class="language-tag {getLanguageColorClass(project.language)}">
												{project.language}
											</span>
										{/if}
									</div>

									<p class="project-desc">
										{project.description || 'No description available'}
									</p>

									<div class="project-footer">
										<div class="project-stats-simple">
											<span class="stat">⭐ {project.stargazers_count}</span>
											<span class="stat">🍴 {project.forks_count}</span>
										</div>
										
										<div class="project-links">
											{#if project.homepage}
												<a
													href={project.homepage}
													target="_blank"
													rel="noopener noreferrer"
													class="link-btn live-btn"
												>
													Live
												</a>
											{/if}
											<a
												href={project.html_url}
												target="_blank"
												rel="noopener noreferrer"
												class="link-btn code-btn"
											>
												Code
											</a>
										</div>
									</div>
								</article>
							{/each}
						</div>

						{#if !showAllProjects && projects.length > 15}
							<div class="mt-12 text-center">
								<button
									on:click={() => (showAllProjects = true)}
									class="view-all-minimal"
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
						<div class="github-main-title-container mb-4">
							<h2 class="github-main-title">
								<span class="smooth-letter" style="animation-delay: 0s;">G</span>
								<span class="smooth-letter" style="animation-delay: 0.1s;">i</span>
								<span class="smooth-letter" style="animation-delay: 0.2s;">t</span>
								<span class="smooth-letter" style="animation-delay: 0.3s;">H</span>
								<span class="smooth-letter" style="animation-delay: 0.4s;">u</span>
								<span class="smooth-letter" style="animation-delay: 0.5s;">b</span>
								<span class="circle-swirl-icon">◉</span>
								<span class="smooth-letter" style="animation-delay: 0.7s;">A</span>
								<span class="smooth-letter" style="animation-delay: 0.8s;">c</span>
								<span class="smooth-letter" style="animation-delay: 0.9s;">t</span>
								<span class="smooth-letter" style="animation-delay: 1s;">i</span>
								<span class="smooth-letter" style="animation-delay: 1.1s;">v</span>
								<span class="smooth-letter" style="animation-delay: 1.2s;">i</span>
								<span class="smooth-letter" style="animation-delay: 1.3s;">t</span>
								<span class="smooth-letter" style="animation-delay: 1.4s;">y</span>
							</h2>
							<div class="modern-subtitle github-subtitle">
								<div class="subtitle-row">
									<span class="subtitle-text">Code Contributions</span>
									<div class="subtitle-accent">
										<span class="accent-dot"></span>
										<span class="accent-line"></span>
										<span class="accent-dot"></span>
									</div>
									<span class="subtitle-text">Development Journey</span>
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

	/* ===== FEATURED PROJECTS PREMIUM DESIGN ===== */
	/* Premium neumorphism and glassmorphism design for featured projects */
	
	.featured-project-premium {
		opacity: 0;
		animation: fadeInUpPremium 0.8s ease-out forwards;
	}

	@keyframes fadeInUpPremium {
		0% {
			opacity: 0;
			transform: translateY(30px) scale(0.95);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	/* Premium Featured Card Container */
	.featured-neuro-card {
		background: rgba(255, 255, 255, 0.04);
		backdrop-filter: blur(16px) saturate(180%);
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 28px;
		box-shadow: 
			8px 8px 24px rgba(0, 0, 0, 0.4),
			-8px -8px 24px rgba(255, 255, 255, 0.03),
			inset 2px 2px 12px rgba(255, 255, 255, 0.06),
			inset -2px -2px 12px rgba(0, 0, 0, 0.1);
		transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		overflow: hidden;
		height: auto;
		min-height: 480px;
	}

	.featured-neuro-card:hover {
		box-shadow: 
			12px 12px 32px rgba(0, 0, 0, 0.5),
			-12px -12px 32px rgba(255, 255, 255, 0.04),
			inset 3px 3px 16px rgba(255, 255, 255, 0.08),
			inset -3px -3px 16px rgba(0, 0, 0, 0.15);
		transform: translateY(-4px);
		border-color: rgba(255, 255, 255, 0.18);
	}

	/* Image Section */
	.image-section {
		height: 200px;
		position: relative;
		overflow: hidden;
		border-radius: 24px 24px 0 0;
	}

	.project-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	.featured-project-premium:hover .project-image {
		transform: scale(1.05);
		filter: brightness(1.1) saturate(1.2);
	}

	/* Gradient Placeholder for projects without images */
	.gradient-placeholder {
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, 
			rgba(99, 102, 241, 0.3) 0%,
			rgba(168, 85, 247, 0.3) 35%,
			rgba(236, 72, 153, 0.3) 70%,
			rgba(251, 146, 60, 0.3) 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
	}

	.placeholder-pattern {
		position: absolute;
		inset: 0;
		background: 
			radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
			radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
	}

	.project-icon {
		color: rgba(255, 255, 255, 0.6);
		z-index: 2;
		position: relative;
	}

	/* Live Site Badge */
	.live-badge {
		position: absolute;
		top: 16px;
		right: 16px;
		background: rgba(34, 197, 94, 0.9);
		backdrop-filter: blur(8px);
		border: 1px solid rgba(34, 197, 94, 0.3);
		border-radius: 20px;
		padding: 6px 12px;
		font-size: 11px;
		font-weight: 600;
		color: white;
		display: flex;
		align-items: center;
		gap: 6px;
		box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
		z-index: 3;
	}

	.live-indicator {
		width: 6px;
		height: 6px;
		background: #4ade80;
		border-radius: 50%;
		animation: pulse 2s infinite;
	}

	/* Image Overlay */
	.image-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			rgba(0, 0, 0, 0.1) 0%,
			rgba(255, 255, 255, 0.05) 50%,
			rgba(0, 0, 0, 0.1) 100%
		);
		opacity: 0;
		transition: opacity 0.4s ease;
	}

	/* Content Section */
	.content-section {
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		height: calc(100% - 200px);
	}

	.featured-title {
		font-size: 20px;
		font-weight: 700;
		color: white;
		margin: 0;
		line-height: 1.3;
	}

	.featured-desc {
		font-size: 14px;
		color: rgba(255, 255, 255, 0.7);
		line-height: 1.5;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Live URL Display */
	.live-url-display {
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(12px) saturate(160%);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 16px;
		padding: 12px;
		box-shadow: 
			0 4px 16px rgba(0, 0, 0, 0.2),
			inset 0 1px 4px rgba(255, 255, 255, 0.1);
	}

	.url-label {
		font-size: 10px;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.8);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-bottom: 6px;
	}

	.url-link {
		display: block;
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 11px;
		font-weight: 500;
		color: white;
		background: rgba(255, 255, 255, 0.12);
		backdrop-filter: blur(8px);
		border-radius: 8px;
		padding: 8px 10px;
		text-decoration: none;
		transition: all 0.3s ease;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.url-link:hover {
		background: rgba(255, 255, 255, 0.18);
		color: #e0e7ff;
		border-color: rgba(255, 255, 255, 0.2);
		transform: translateY(-1px);
	}

	/* Tech & Stats Row */
	.tech-stats-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.primary-tech {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.tech-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
	}

	.tech-name {
		font-size: 13px;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.9);
	}

	.stats-mini {
		display: flex;
		gap: 12px;
	}

	.star-count {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.6);
		font-weight: 500;
	}

	/* Action Buttons */
	.featured-actions {
		display: flex;
		gap: 12px;
		margin-top: auto;
	}

	.btn-primary {
		flex: 1;
		background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%);
		color: #1f2937;
		border: none;
		border-radius: 24px;
		padding: 12px 20px;
		font-size: 13px;
		font-weight: 700;
		text-align: center;
		text-decoration: none;
		transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		box-shadow: 
			0 4px 12px rgba(0, 0, 0, 0.2),
			0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.btn-primary:hover {
		background: linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%);
		transform: translateY(-2px);
		box-shadow: 
			0 6px 20px rgba(0, 0, 0, 0.3),
			0 4px 8px rgba(0, 0, 0, 0.15);
	}

	.btn-secondary {
		flex: 1;
		background: rgba(255, 255, 255, 0.1);
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 24px;
		padding: 12px 20px;
		font-size: 13px;
		font-weight: 600;
		text-align: center;
		text-decoration: none;
		backdrop-filter: blur(8px);
		transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		box-shadow: 
			0 4px 12px rgba(0, 0, 0, 0.2),
			inset 0 1px 2px rgba(255, 255, 255, 0.1);
	}

	.btn-secondary:hover {
		background: rgba(255, 255, 255, 0.15);
		border-color: rgba(255, 255, 255, 0.3);
		transform: translateY(-2px);
		box-shadow: 
			0 6px 20px rgba(0, 0, 0, 0.3),
			inset 0 2px 4px rgba(255, 255, 255, 0.15);
	}

	/* Carousel specific styles */
	.featured-neuro-card {
		min-height: 400px;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.featured-neuro-card {
			min-height: 420px;
		}
		
		.image-section {
			height: 160px;
		}
		
		.content-section {
			padding: 20px;
			height: calc(100% - 160px);
		}
		
		.featured-title {
			font-size: 18px;
		}
		
		.featured-actions {
			flex-direction: column;
		}
	}

	/* ===== CAROUSEL CONTROLS ===== */
	/* Neumorphism button design for carousel */
	.neuro-button {
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 16px;
		box-shadow: 
			4px 4px 12px rgba(0, 0, 0, 0.3),
			-4px -4px 12px rgba(255, 255, 255, 0.02),
			inset 1px 1px 4px rgba(255, 255, 255, 0.05),
			inset -1px -1px 4px rgba(0, 0, 0, 0.1);
		transition: all 0.2s ease;
	}

	.neuro-button:hover {
		box-shadow: 
			2px 2px 8px rgba(0, 0, 0, 0.4),
			-2px -2px 8px rgba(255, 255, 255, 0.03),
			inset 2px 2px 6px rgba(255, 255, 255, 0.08),
			inset -2px -2px 6px rgba(0, 0, 0, 0.15);
		transform: translateY(1px);
	}

	.neuro-button:active {
		box-shadow: 
			inset 3px 3px 8px rgba(0, 0, 0, 0.2),
			inset -3px -3px 8px rgba(255, 255, 255, 0.05);
		transform: translateY(2px);
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

	/* Utility classes */
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Utility classes */
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* ===== ALL PROJECTS SECTION - MINIMAL DESIGN ===== */
	.all-projects-section {
		position: relative;
		padding: 1rem 0;
	}

	/* Simple Search Input */
	.search-container {
		max-width: 500px;
		margin: 0 auto;
	}

	.search-input {
		width: 100%;
		padding: 1rem 1.5rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 222, 33, 0.2);
		border-radius: 12px;
		color: white;
		font-size: 1rem;
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
		outline: none;
	}

	.search-input:focus {
		border-color: rgba(255, 222, 33, 0.5);
		box-shadow: 0 0 20px rgba(255, 222, 33, 0.2);
	}

	.search-input::placeholder {
		color: #888;
	}

	/* Simple Grid Layout */
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 1.5rem;
		margin-top: 2rem;
	}

	/* Minimal Project Cards */
	.project-card-minimal {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 16px;
		padding: 1.5rem;
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-height: 180px;
	}

	.project-card-minimal:hover {
		transform: translateY(-4px);
		border-color: rgba(255, 222, 33, 0.3);
		box-shadow: 0 8px 32px rgba(255, 222, 33, 0.1);
		background: rgba(255, 255, 255, 0.06);
	}

	/* Card Header */
	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.project-title {
		font-size: 1.2rem;
		font-weight: 600;
		color: white;
		transition: all 0.3s ease;
		flex: 1;
		min-width: 0;
	}

	.project-card-minimal:hover .project-title {
		color: #ffde21;
	}

	.language-tag {
		padding: 0.3rem 0.8rem;
		border-radius: 8px;
		font-size: 0.8rem;
		font-weight: 500;
		color: white;
		opacity: 0.9;
		transition: all 0.3s ease;
	}

	.project-card-minimal:hover .language-tag {
		opacity: 1;
		transform: scale(1.05);
	}

	/* Project Description */
	.project-desc {
		color: #bbb;
		font-size: 0.9rem;
		line-height: 1.5;
		flex: 1;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		transition: color 0.3s ease;
	}

	.project-card-minimal:hover .project-desc {
		color: #ddd;
	}

	/* Card Footer */
	.project-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		padding-top: 1rem;
		margin-top: auto;
	}

	/* Simple Stats */
	.project-stats-simple {
		display: flex;
		gap: 1rem;
	}

	.stat {
		font-size: 0.8rem;
		color: #999;
		transition: color 0.3s ease;
	}

	.project-card-minimal:hover .stat {
		color: #ccc;
	}

	/* Project Links */
	.project-links {
		display: flex;
		gap: 0.8rem;
	}

	.link-btn {
		padding: 0.4rem 1rem;
		border-radius: 8px;
		text-decoration: none;
		font-size: 0.8rem;
		font-weight: 500;
		transition: all 0.3s ease;
		border: 1px solid transparent;
	}

	.live-btn {
		background: rgba(255, 222, 33, 0.1);
		color: #ffde21;
		border-color: rgba(255, 222, 33, 0.2);
	}

	.live-btn:hover {
		background: rgba(255, 222, 33, 0.2);
		border-color: rgba(255, 222, 33, 0.4);
		transform: scale(1.05);
	}

	.code-btn {
		background: rgba(255, 255, 255, 0.05);
		color: #ccc;
		border-color: rgba(255, 255, 255, 0.1);
	}

	.code-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		color: white;
		border-color: rgba(255, 255, 255, 0.2);
		transform: scale(1.05);
	}

	/* Simple View All Button */
	.view-all-minimal {
		background: rgba(255, 222, 33, 0.1);
		border: 1px solid rgba(255, 222, 33, 0.3);
		color: #ffde21;
		padding: 1rem 2rem;
		border-radius: 12px;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
		backdrop-filter: blur(10px);
	}

	.view-all-minimal:hover {
		background: rgba(255, 222, 33, 0.2);
		border-color: rgba(255, 222, 33, 0.5);
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(255, 222, 33, 0.2);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.projects-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.card-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.8rem;
		}

		.project-footer {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.project-links {
			width: 100%;
			justify-content: flex-end;
		}
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
		0% { left: -100%; }
		50% { left: 100%; }
		100% { left: 100%; }
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
