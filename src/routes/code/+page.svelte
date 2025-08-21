<script lang="ts">
	// ===== IMPORTS =====
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import PageLayout from '$lib/components/PageLayout.svelte';

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

	// ===== SKILLS SECTION - TypeScript =====
	let hoveredCategory: string | null = null;

	// Skills data with categories
	const skills = [
		{
			category: 'Frontend',
			name: 'JavaScript',
			level: 90,
			color: '#f7df1e',
			logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
		},
		{
			category: 'Frontend',
			name: 'TypeScript',
			level: 85,
			color: '#3178c6',
			logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
		},
		{
			category: 'Frontend',
			name: 'React',
			level: 88,
			color: '#61dafb',
			logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
		},
		{
			category: 'Frontend',
			name: 'Svelte',
			level: 78,
			color: '#ff3e00',
			logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg'
		},
		{
			category: 'Frontend',
			name: 'HTML/CSS',
			level: 92,
			color: '#e34c26',
			logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
		},
		{
			category: 'Frontend',
			name: 'TailwindCSS',
			level: 85,
			color: '#06b6d4',
			logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'
		},
		{
			category: 'Backend',
			name: 'Node.js',
			level: 82,
			color: '#339933',
			logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
		},
		{
			category: 'Backend',
			name: 'Express',
			level: 80,
			color: '#000000',
			logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg'
		},
		{
			category: 'Backend',
			name: 'GraphQL',
			level: 75,
			color: '#e535ab',
			logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg'
		},
		{
			category: 'Backend',
			name: 'PostgreSQL',
			level: 75,
			color: '#336791',
			logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
		},
		{
			category: 'Tools',
			name: 'Git',
			level: 88,
			color: '#f34f29',
			logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
		},
		{
			category: 'Tools',
			name: 'Docker',
			level: 72,
			color: '#2496ed',
			logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'
		},
		{
			category: 'Tools',
			name: 'VS Code',
			level: 90,
			color: '#007acc',
			logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg'
		},
		{
			category: 'Languages',
			name: 'Python',
			level: 70,
			color: '#3572A5',
			logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
		},
		{
			category: 'Languages',
			name: 'Java',
			level: 65,
			color: '#f89820',
			logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
		}
	];

	// Skills utility functions
	const shuffleArray = (array: typeof skills) => {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	};

	const getSkillLevel = (level: number): string => {
		if (level >= 80) return 'Advanced';
		if (level >= 60) return 'Intermediate';
		if (level >= 40) return 'Beginner';
		return 'Learning';
	};

	// Skills derived data
	const randomizedSkills = shuffleArray(skills);

	const skillCategories = skills.reduce(
		(acc, skill) => {
			if (!acc[skill.category]) {
				acc[skill.category] = [];
			}
			acc[skill.category].push(skill);
			return acc;
		},
		{} as Record<string, typeof skills>
	);

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
			const response = await fetch('/api/github-data');

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
			}

			const data = await response.json();

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
			const data = await fetchGithubData();
			projects = data.repos;
			pinnedProjects = data.pinnedRepos;
			githubEvents = data.events;
			contributionsData = data.contributions;
			contributionActivity = data.contributionActivity || [];
			isLoading = false;

			// Initialize animations after data is loaded
			setTimeout(() => initAnimations(), 100);
		} catch (err: unknown) {
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
				<!-- Featured Projects -->
				{#if pinnedProjects.length > 0}
					<section>
						<div class="mb-12 text-center">
							<h2 class="mb-4 text-4xl font-bold text-white">Featured Projects</h2>
							<p class="mx-auto max-w-2xl text-xl text-gray-400">
								Showcasing my best work that combines creativity with technical excellence
							</p>
						</div>
						<div
							bind:this={projectsSection}
							class="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3"
						>
							{#each pinnedProjects as project (project.id)}
								<article
									class="project-card group hover:border-primary/50 hover:shadow-primary/10 relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
								>
									<!-- Project Image Placeholder -->
									<div class="relative aspect-video overflow-hidden">
										{#if project.readme_image}
											<img
												src={project.readme_image}
												alt="{project.name} preview"
												class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
											/>
										{:else}
											<div
												class="from-primary/20 flex h-full w-full items-center justify-center bg-gradient-to-br to-purple-600/20"
											>
												<div class="text-primary/30 text-6xl">
													{#if project.language === 'TypeScript'}📘
													{:else if project.language === 'JavaScript'}📙
													{:else if project.language === 'Python'}🐍
													{:else if project.language === 'HTML'}🌐
													{:else}📁{/if}
												</div>
											</div>
										{/if}
										<div
											class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
										></div>
									</div>

									<!-- Content -->
									<div class="p-6">
										<h3
											class="group-hover:text-primary mb-3 text-xl font-bold text-white transition-colors duration-300"
										>
											{project.name}
										</h3>
										<p class="mb-4 line-clamp-3 text-gray-400">
											{project.description || 'No description available'}
										</p>

										<!-- Language & Topics -->
										{#if project.language}
											<div class="mb-3 flex items-center gap-2">
												<span
													class="inline-block h-3 w-3 rounded-full {getLanguageColorClass(
														project.language
													)}"
												></span>
												<span class="text-sm text-gray-300">{project.language}</span>
											</div>
										{/if}

										{#if project.topics && project.topics.length > 0}
											<div class="mb-4 flex flex-wrap gap-2">
												{#each project.topics.slice(0, 3) as topic}
													<span
														class="bg-primary/10 text-primary border-primary/20 rounded-full border px-2 py-1 text-xs"
													>
														{topic}
													</span>
												{/each}
												{#if project.topics.length > 3}
													<span class="rounded-full bg-gray-700/50 px-2 py-1 text-xs text-gray-400">
														+{project.topics.length - 3}
													</span>
												{/if}
											</div>
										{/if}

										<!-- Stats & Actions -->
										<div class="flex items-center justify-between border-t border-gray-700/30 pt-4">
											<div class="flex items-center gap-4 text-sm text-gray-400">
												<span class="flex items-center gap-1">
													⭐ {project.stargazers_count}
												</span>
												<span class="flex items-center gap-1">
													🍴 {project.forks_count}
												</span>
											</div>
											<div class="flex gap-2">
												{#if project.homepage}
													<a
														href={project.homepage}
														target="_blank"
														rel="noopener noreferrer"
														class="bg-primary hover:bg-primary/80 rounded-lg px-3 py-1 text-sm text-white transition-all duration-300 hover:scale-105"
													>
														Demo
													</a>
												{/if}
												<a
													href={project.html_url}
													target="_blank"
													rel="noopener noreferrer"
													class="rounded-lg bg-gray-700 px-3 py-1 text-sm text-white transition-all duration-300 hover:scale-105 hover:bg-gray-600"
												>
													Code
												</a>
											</div>
										</div>
									</div>

									<!-- Floating Elements for Animation -->
									<div
										class="absolute top-4 right-4 transform opacity-0 transition-all duration-500 group-hover:rotate-12 group-hover:opacity-100"
									>
										<div class="bg-primary/20 h-8 w-8 animate-pulse rounded-full"></div>
									</div>
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
						<div class="mb-12 text-center">
							<h2 class="mb-4 text-4xl font-bold text-white">All Projects</h2>
							<p class="mx-auto max-w-2xl text-xl text-gray-400">Browse all my repositories</p>
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
									<span class="subtitle-text">Transforming Ideas Into Reality</span>
									<div class="subtitle-accent">
										<span class="accent-dot"></span>
										<span class="accent-line"></span>
										<span class="accent-dot"></span>
									</div>
									<span class="subtitle-text">Through Code & Creativity</span>
								</div>
							</div>
						</div>
					</div>

					<!-- Skills Section - All Skills Mixed Together -->
					<div class="mixed-skills-section">
						<!-- All Individual Skills Mixed - No Categories -->
						<div class="all-skills-container">
							<div class="skills-mixed-row">
								{#each randomizedSkills as skill, skillIndex}
									<div
										class="skill-bubble"
										class:skill-highlighted={hoveredCategory === skill.category}
										class:skill-dimmed={hoveredCategory && hoveredCategory !== skill.category}
										style="
											 --random-offset: {((skillIndex % 6) - 3) * 8}px;
											 --random-rotation: {((skillIndex % 5) - 2) * 1.5}deg;
											 --random-vertical: {((skillIndex % 4) - 2) * 5}px;
										 "
									>
										<div class="bubble-content">
											<div class="skill-logo">
												<img src={skill.logo} alt={skill.name} />
											</div>
											<div class="skill-info">
												<div class="skill-name">{skill.name}</div>
												<div class="skill-level">
													<span class="skill-percentage">{skill.level}%</span>
													<span class="skill-label">{getSkillLevel(skill.level)}</span>
												</div>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>

						<!-- Category Dashboard - 4 in a Row -->
						<div class="category-dashboard">
							{#each Object.entries(skillCategories) as [category, categorySkills], categoryIndex}
								<div
									class="category-panel"
									class:highlight-skills={hoveredCategory === category}
									data-category={category}
									role="button"
									tabindex="0"
									on:mouseenter={() => (hoveredCategory = category)}
									on:mouseleave={() => (hoveredCategory = null)}
								>
									<div class="panel-header">
										<div class="category-badge">
											<div class="badge-title">
												<span class="category-name">{category}</span>
												<span class="skill-count">{categorySkills.length} skills</span>
											</div>
										</div>
									</div>
									<div class="category-skills">
										{#each categorySkills as skill}
											<div class="mini-skill-item">
												<img src={skill.logo} alt={skill.name} class="mini-skill-logo" />
											</div>
										{/each}
									</div>
								</div>
							{/each}
						</div>
					</div>
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

	/* ===== SKILLS SECTION - CSS ===== */
	/* === Mixed Skills Section === */
	.mixed-skills-section {
		position: relative;
		padding: 3rem 0;
		overflow: hidden;
	}

	.skills-section-title {
		font-size: 2rem;
		font-weight: 900;
		text-align: center;
		color: white;
		margin-bottom: 2rem;
		background: linear-gradient(135deg, #ffffff 0%, #ffde21 50%, #ffd700 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-shadow: 0 4px 20px rgba(255, 222, 33, 0.3);
	}

	.skills-section-title::after {
		content: '';
		position: absolute;
		bottom: -8px;
		left: 50%;
		transform: translateX(-50%);
		width: 120px;
		height: 3px;
		background: linear-gradient(90deg, transparent, #ffde21, transparent);
		border-radius: 2px;
	}

	/* All Individual Skills Mixed Container */
	.all-skills-container {
		margin-bottom: 4rem;
		padding: 0 2rem;
	}

	.skills-mixed-row {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 1.5rem;
		justify-items: center;
		align-items: flex-start;
		min-height: 200px;
		max-width: 1200px;
		margin: 0 auto;
		padding: 1rem;
	}

	/* With 5 columns, all 15 skills fit perfectly in 3 full rows */
	/* No special positioning needed - all rows will be complete */

	/* Individual Skill Bubbles - Horizontal Layout */
	.skill-bubble {
		opacity: 1;
		animation: gentleFloat 4s ease-in-out infinite;
		margin-top: var(--random-vertical);
		transform: translateX(var(--random-offset)) rotate(var(--random-rotation));
		justify-self: center;
		position: relative;
		max-width: 180px;
		width: 100%;
	}

	.bubble-content {
		background: linear-gradient(
			145deg,
			rgba(255, 255, 255, 0.1) 0%,
			rgba(255, 255, 255, 0.05) 50%,
			rgba(255, 255, 255, 0.05) 100%
		);
		border: 2px solid transparent;
		background-clip: padding-box;
		border-radius: 15px;
		padding: 0.8rem 1rem;
		min-width: 140px;
		max-width: 180px;
		backdrop-filter: blur(15px);
		box-shadow:
			0 4px 20px rgba(0, 0, 0, 0.1),
			0 0 0 1px rgba(255, 255, 255, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		gap: 0.8rem;
	}

	.bubble-content::before {
		content: '';
		position: absolute;
		inset: -2px;
		background: linear-gradient(
			45deg,
			rgba(255, 255, 255, 0.2) 0%,
			rgba(255, 255, 255, 0.15) 50%,
			rgba(255, 255, 255, 0.2) 100%
		);
		border-radius: 17px;
		z-index: -1;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.skill-bubble:hover .bubble-content {
		transform: translateY(-1px) scale(1.01);
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.15);
		box-shadow:
			0 6px 20px rgba(255, 255, 255, 0.12),
			0 0 15px rgba(255, 255, 255, 0.06),
			0 4px 20px rgba(0, 0, 0, 0.1),
			0 0 0 1px rgba(255, 255, 255, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
	}

	.skill-bubble:hover .bubble-content::before {
		opacity: 0.2;
		background: radial-gradient(circle at center, rgba(255, 255, 255, 0.15), transparent);
	}

	/* Category hover effects for individual skills */
	.skill-highlighted {
		transform: scale(1.02) translateY(-2px);
		z-index: 10;
	}

	.skill-highlighted .bubble-content {
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.15);
		box-shadow:
			0 6px 20px rgba(255, 255, 255, 0.15),
			0 0 15px rgba(255, 255, 255, 0.08),
			0 4px 20px rgba(0, 0, 0, 0.1),
			0 0 0 1px rgba(255, 255, 255, 0.12),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
	}

	.skill-dimmed {
		opacity: 0.3;
		transform: scale(0.95);
		filter: grayscale(0.8);
	}

	.skill-logo {
		width: 32px;
		height: 32px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.08);
		border-radius: 8px;
		padding: 4px;
	}

	.skill-logo img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
	}

	.skill-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.bubble-content .skill-name {
		color: white;
		font-size: 0.85rem;
		font-weight: 600;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
		line-height: 1.2;
	}

	.bubble-content .skill-level {
		color: #ffde21;
		font-size: 0.8rem;
		font-weight: 700;
		font-family: 'JetBrains Mono', monospace;
		text-shadow: 0 0 8px rgba(255, 222, 33, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
	}

	.skill-percentage {
		font-size: 0.8rem;
	}

	.skill-label {
		font-size: 0.65rem;
		color: rgba(255, 255, 255, 0.8);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	@keyframes gentleFloat {
		0%,
		100% {
			transform: translateY(0) translateX(var(--random-offset)) rotate(var(--random-rotation));
		}
		50% {
			transform: translateY(-6px) translateX(var(--random-offset))
				rotate(calc(var(--random-rotation) + 1deg));
		}
	}

	/* === Category Dashboard Section === */
	.category-dashboard {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		padding: 0 1rem;
		max-width: 1000px;
		margin: 0 auto;
	}

	.category-panel {
		background: linear-gradient(
			145deg,
			rgba(255, 255, 255, 0.1) 0%,
			rgba(255, 222, 33, 0.08) 30%,
			rgba(255, 222, 33, 0.05) 70%,
			rgba(255, 255, 255, 0.05) 100%
		);
		border: 2px solid transparent;
		background-clip: padding-box;
		border-radius: 20px;
		padding: 1rem;
		backdrop-filter: blur(20px);
		box-shadow:
			0 8px 25px rgba(0, 0, 0, 0.15),
			0 0 0 1px rgba(255, 222, 33, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.2),
			inset 0 -1px 0 rgba(255, 222, 33, 0.1);
		transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		min-height: 220px;
		max-height: 280px;
	}

	.category-panel::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
		transition: left 0.6s ease;
	}

	.category-panel::after {
		content: '';
		position: absolute;
		inset: -2px;
		background: linear-gradient(
			45deg,
			rgba(255, 255, 255, 0.2) 0%,
			rgba(255, 255, 255, 0.15) 25%,
			rgba(255, 255, 255, 0.2) 50%,
			rgba(255, 255, 255, 0.15) 75%,
			rgba(255, 255, 255, 0.2) 100%
		);
		border-radius: 20px;
		z-index: -1;
		opacity: 0;
		transition: opacity 0.4s ease;
	}

	.category-panel:hover {
		transform: translateY(-5px) scale(1.02);
		box-shadow:
			0 15px 30px rgba(255, 255, 255, 0.1),
			0 0 20px rgba(255, 255, 255, 0.05),
			inset 0 2px 0 rgba(255, 255, 255, 0.15),
			inset 0 -2px 0 rgba(255, 255, 255, 0.08);
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	.category-panel:hover::before {
		left: 100%;
	}

	.category-panel:hover::after {
		opacity: 0.8;
	}

	.panel-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex-shrink: 0;
	}

	.category-badge {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.3rem;
	}

	.badge-icon {
		width: 40px;
		height: 40px;
		background: linear-gradient(135deg, #ffde21 0%, #ffd700 50%, #ffb700 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.2rem;
		color: #000;
		font-weight: 900;
		box-shadow:
			0 4px 12px rgba(255, 222, 33, 0.4),
			inset 0 1px 0 rgba(255, 255, 255, 0.3),
			inset 0 -1px 0 rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
		position: relative;
	}

	.badge-icon::before {
		content: '';
		position: absolute;
		inset: 2px;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
		border-radius: 50%;
		pointer-events: none;
	}

	.badge-title {
		color: white;
		font-size: 0.9rem;
		font-weight: 700;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		line-height: 1.2;
		letter-spacing: 0.5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
	}

	.category-name {
		font-size: 1.1rem;
	}

	.skill-count {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.7);
		font-weight: 500;
		text-transform: lowercase;
		letter-spacing: 0.3px;
	}

	.category-skills {
		flex: 1;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 0.2rem;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
		max-height: 120px; /* Reduced height for tighter spacing */
		padding: 0.2rem;
	}

	.category-skills::-webkit-scrollbar {
		width: 4px;
	}

	.category-skills::-webkit-scrollbar-thumb {
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
		border-radius: 2px;
	}

	.category-skills::-webkit-scrollbar-track {
		background: transparent;
	}

	.mini-skill-item {
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		padding: 0.3rem;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
		aspect-ratio: 1;
		min-height: auto;
	}

	.mini-skill-item::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 3px;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.3));
		transform: scaleY(0);
		transition: transform 0.3s ease;
	}

	.mini-skill-item:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.3);
		transform: scale(1.1);
		box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
	}

	.mini-skill-item:hover::before {
		transform: scaleY(1);
	}

	.mini-skill-logo {
		width: 20px;
		height: 20px;
		object-fit: contain;
		flex-shrink: 0;
		filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
	}

	.mini-skill-name {
		color: white;
		font-size: 0.75rem;
		font-weight: 600;
		flex: 1;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	}

	.mini-skill-level {
		color: #ffde21;
		font-size: 0.7rem;
		font-weight: 700;
		font-family: 'JetBrains Mono', monospace;
		text-shadow: 0 0 6px rgba(255, 222, 33, 0.5);
		background: rgba(255, 222, 33, 0.2);
		padding: 0.1rem 0.4rem;
		border-radius: 8px;
		border: 1px solid rgba(255, 222, 33, 0.3);
		flex-shrink: 0;
	}

	/* Responsive Design */
	@media (max-width: 1024px) {
		.category-dashboard {
			grid-template-columns: repeat(2, 1fr);
			gap: 0.8rem;
			max-width: 600px;
		}

		.category-panel {
			min-height: 200px;
			max-height: 250px;
		}
	}

	@media (max-width: 640px) {
		.category-dashboard {
			grid-template-columns: 1fr;
			gap: 0.8rem;
			max-width: 350px;
		}

		.category-panel {
			min-height: 180px;
			max-height: 220px;
			padding: 0.8rem;
		}

		.badge-icon {
			width: 35px;
			height: 35px;
			font-size: 1rem;
		}

		.badge-title {
			font-size: 0.8rem;
		}

		.mini-skill-item {
			padding: 0.3rem 0.5rem;
			gap: 0.4rem;
		}

		.mini-skill-logo {
			width: 16px;
			height: 16px;
		}

		.mini-skill-name {
			font-size: 0.7rem;
		}

		.mini-skill-level {
			font-size: 0.65rem;
			padding: 0.1rem 0.3rem;
		}

		.skills-mixed-row {
			grid-template-columns: repeat(3, 1fr);
			gap: 0.6rem;
		}

		.bubble-content {
			min-width: 120px;
			max-width: 150px;
			padding: 0.6rem 0.8rem;
			gap: 0.6rem;
		}

		.skill-logo {
			width: 28px;
			height: 28px;
		}

		.bubble-content .skill-name {
			font-size: 0.8rem;
		}
	}

	/* Skills List in Category - Fun Style */
	.category-skills-list {
		margin-bottom: 2rem;
		max-height: 250px;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: rgba(0, 245, 255, 0.4) transparent;
		padding-right: 0.5rem;
	}

	.category-skills-list::-webkit-scrollbar {
		width: 6px;
	}

	.category-skills-list::-webkit-scrollbar-thumb {
		background: linear-gradient(180deg, #00f5ff, #9333ea);
		border-radius: 3px;
	}

	.category-skills-list::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 3px;
	}

	.category-skill-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem;
		margin-bottom: 0.5rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 15px;
		background: rgba(255, 255, 255, 0.03);
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		position: relative;
		overflow: hidden;
	}

	.category-skill-item::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 3px;
		background: linear-gradient(180deg, #00f5ff, #9333ea);
		transform: scaleY(0);
		transition: transform 0.3s ease;
	}

	.category-skill-item:hover {
		background: rgba(0, 245, 255, 0.08);
		border-color: rgba(0, 245, 255, 0.2);
		transform: translateX(5px) scale(1.02);
		box-shadow: 0 5px 15px rgba(0, 245, 255, 0.1);
	}

	.category-skill-item:hover::before {
		transform: scaleY(1);
	}

	/* Category Stats - More Fun */
	.category-stats {
		display: flex;
		justify-content: space-around;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 20px;
		padding: 1.5rem;
		border: 2px solid rgba(255, 255, 255, 0.08);
		position: relative;
		overflow: hidden;
	}

	.category-stats::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.1), transparent);
		animation: statsShine 3s ease-in-out infinite;
	}

	.stat {
		text-align: center;
		position: relative;
		z-index: 2;
	}

	.stat-label {
		color: rgba(255, 255, 255, 0.7);
		font-size: 0.8rem;
		margin-bottom: 0.5rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.stat-value {
		color: #00f5ff;
		font-weight: 800;
		font-family: 'JetBrains Mono', monospace;
		font-size: 1.1rem;
		text-shadow: 0 0 10px rgba(0, 245, 255, 0.4);
		animation: statPulse 2s ease-in-out infinite;
	}

	@keyframes statsShine {
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

	@keyframes statPulse {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
	}

	/* Responsive Design */
	@media (max-width: 1200px) {
		.category-dashboard {
			grid-template-columns: repeat(2, 1fr);
		}

		.floating-skill-bubble {
			--random-offset: calc(var(--random-offset) * 0.5);
		}
	}

	@media (max-width: 768px) {
		.mixed-skills-section {
			padding: 2rem 0;
		}

		.skills-section-title {
			font-size: 2.2rem;
		}

		.skills-mixed-row {
			grid-template-columns: repeat(4, 1fr);
			gap: 0.8rem;
		}

		.mixed-skills-container,
		.category-dashboard {
			padding: 0 1rem;
		}

		.category-dashboard {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.skills-scattered-row {
			gap: 1rem;
		}

		.bubble-content {
			min-width: 150px;
			padding: 1rem;
		}

		.category-panel {
			padding: 1.5rem;
		}

		.panel-header {
			flex-direction: column;
			gap: 1rem;
			text-align: center;
		}

		.floating-skill-bubble {
			--random-offset: 0px;
			--random-rotation: 0deg;
		}
	}

	@media (max-width: 480px) {
		.skills-section-title {
			font-size: 1.8rem;
		}

		.category-label {
			font-size: 1.2rem;
		}

		.bubble-content {
			min-width: 130px;
			padding: 0.8rem;
		}

		.skill-emoji {
			width: 40px;
			height: 40px;
			font-size: 1.2rem;
		}

		.category-panel {
			padding: 1rem;
		}

		.badge-icon {
			width: 50px;
			height: 50px;
			font-size: 1.5rem;
		}

		.badge-title {
			font-size: 1.2rem;
		}
	}

	.skill-icon {
		transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}

	.animate-shine {
		animation: shine 2s ease-in-out infinite;
		animation-delay: 1s;
	}

	.animate-count-up {
		animation: count-up 0.6s ease-out forwards;
	}

	.animate-fade-in-up {
		animation: fade-in-up 0.8s ease-out forwards;
		animation-delay: 0.3s;
		opacity: 0;
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
		color: #00f5ff;
		text-shadow:
			0 0 10px #00f5ff,
			0 0 20px #00f5ff,
			0 0 30px #00f5ff;
		transform: scale(1.2) rotateY(360deg);
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
