<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import PageLayout from '$lib/components/PageLayout.svelte';

	// Register GSAP plugins
	gsap.registerPlugin(ScrollTrigger);
	
	// Reference elements for animations
	let projectsSection: HTMLElement;
	let skillsSection: HTMLElement;
	let contributionsSection: HTMLElement;

	// Define types for our data structures
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

	// State management
	let isLoading = true;
	let error: string | null = null;
	let projects: Project[] = [];
	let pinnedProjects: Project[] = [];
	let githubEvents: any[] = [];
	let contributionsData = { total: 0, lastYear: 0, streak: 0, publicRepos: 0 };
	let contributionActivity: Array<{
		month: string, 
		monthKey: string, 
		count: number, 
		level: number, 
		isCurrentMonth: boolean,
		days: Array<{date: string, day: number, count: number, level: number, isToday: boolean}>
	}> = [];
	let selectedMonth: string | null = null;
	let showAllProjects = false;
	let projectSearchQuery = '';

	// Skills visualization data with categories
	const skills = [
		{ category: 'Frontend', name: 'JavaScript', level: 90, color: '#f7df1e', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
		{ category: 'Frontend', name: 'TypeScript', level: 85, color: '#3178c6', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
		{ category: 'Frontend', name: 'React', level: 88, color: '#61dafb', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
		{ category: 'Frontend', name: 'Svelte', level: 78, color: '#ff3e00', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg' },
		{ category: 'Frontend', name: 'HTML/CSS', level: 92, color: '#e34c26', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
		{ category: 'Frontend', name: 'TailwindCSS', level: 85, color: '#06b6d4', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
		{ category: 'Backend', name: 'Node.js', level: 82, color: '#339933', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
		{ category: 'Backend', name: 'Express', level: 80, color: '#000000', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
		{ category: 'Backend', name: 'GraphQL', level: 75, color: '#e535ab', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
		{ category: 'Backend', name: 'PostgreSQL', level: 75, color: '#336791', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
		{ category: 'Tools', name: 'Git', level: 88, color: '#f34f29', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
		{ category: 'Tools', name: 'Docker', level: 72, color: '#2496ed', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
		{ category: 'Tools', name: 'VS Code', level: 90, color: '#007acc', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
		{ category: 'Languages', name: 'Python', level: 70, color: '#3572A5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
		{ category: 'Languages', name: 'Java', level: 65, color: '#f89820', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' }
	];

	// Group skills by category
	const skillCategories = skills.reduce((acc, skill) => {
		if (!acc[skill.category]) {
			acc[skill.category] = [];
		}
		acc[skill.category].push(skill);
		return acc;
	}, {} as Record<string, typeof skills>);

	// Filter projects based on search query
	$: filteredProjects = projects.filter(project => 
		project.name.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
		(project.description && project.description.toLowerCase().includes(projectSearchQuery.toLowerCase())) ||
		(project.language && project.language.toLowerCase().includes(projectSearchQuery.toLowerCase()))
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

	// Initialize animations
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

		// Animate skills section
		if (skillsSection) {
			// Animate the central hub
			gsap.fromTo(skillsSection.querySelector('.central-hub'), {
				scale: 0,
				rotation: -180,
				opacity: 0
			}, {
				scale: 1,
				rotation: 0,
				opacity: 1,
				duration: 1.5,
				ease: 'elastic.out(1, 0.5)',
				scrollTrigger: {
					trigger: skillsSection,
					start: 'top bottom-=100'
				}
			});

			// Animate category planets
			gsap.from(skillsSection.querySelectorAll('.category-planet'), {
				y: 100,
				opacity: 0,
				scale: 0,
				rotation: 360,
				stagger: 0.2,
				duration: 1,
				ease: 'back.out(1.7)',
				delay: 0.5,
				scrollTrigger: {
					trigger: skillsSection,
					start: 'top bottom-=50'
				}
			});

			// Animate skill satellites
			gsap.from(skillsSection.querySelectorAll('.skill-satellite'), {
				scale: 0,
				opacity: 0,
				stagger: {
					amount: 2,
					from: 'random'
				},
				duration: 0.8,
				ease: 'power2.out',
				delay: 1,
				scrollTrigger: {
					trigger: skillsSection,
					start: 'top bottom-=50'
				}
			});

			// Animate floating stats
			gsap.from(skillsSection.querySelectorAll('.stat-item'), {
				y: 50,
				opacity: 0,
				stagger: 0.1,
				duration: 0.8,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: skillsSection,
					start: 'top bottom-=100'
				}
			});

			// Animate morphing blobs
			gsap.to(skillsSection.querySelectorAll('.morphing-blob'), {
				x: 'random(-50, 50)',
				y: 'random(-30, 30)',
				scale: 'random(0.8, 1.2)',
				duration: 'random(3, 6)',
				ease: 'sine.inOut',
				repeat: -1,
				yoyo: true,
				stagger: 0.5
			});

			// Create floating animation for skill orbs
			gsap.to(skillsSection.querySelectorAll('.skill-orb'), {
				y: 'random(-5, 5)',
				duration: 'random(2, 4)',
				ease: 'sine.inOut',
				repeat: -1,
				yoyo: true,
				stagger: 0.1
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
						<div class="text-center mb-12">
							<h2 class="text-4xl font-bold text-white mb-4">Featured Projects</h2>
							<p class="text-xl text-gray-400 max-w-2xl mx-auto">Showcasing my best work that combines creativity with technical excellence</p>
						</div>
						<div bind:this={projectsSection} class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
							{#each pinnedProjects as project (project.id)}
								<article class="project-card group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
									<!-- Project Image Placeholder -->
									<div class="relative aspect-video overflow-hidden">
										{#if project.readme_image}
											<img
												src={project.readme_image}
												alt="{project.name} preview"
												class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
											/>
										{:else}
											<div class="w-full h-full bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
												<div class="text-6xl text-primary/30">
													{#if project.language === 'TypeScript'}📘
													{:else if project.language === 'JavaScript'}📙
													{:else if project.language === 'Python'}🐍
													{:else if project.language === 'HTML'}🌐
													{:else}📁{/if}
												</div>
											</div>
										{/if}
										<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
									</div>

									<!-- Content -->
									<div class="p-6">
										<h3 class="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">{project.name}</h3>
										<p class="text-gray-400 mb-4 line-clamp-3">{project.description || 'No description available'}</p>
										
										<!-- Language & Topics -->
										{#if project.language}
											<div class="flex items-center gap-2 mb-3">
												<span class="inline-block w-3 h-3 rounded-full {getLanguageColorClass(project.language)}"></span>
												<span class="text-sm text-gray-300">{project.language}</span>
											</div>
										{/if}

										{#if project.topics && project.topics.length > 0}
											<div class="flex flex-wrap gap-2 mb-4">
												{#each project.topics.slice(0, 3) as topic}
													<span class="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20">
														{topic}
													</span>
												{/each}
												{#if project.topics.length > 3}
													<span class="px-2 py-1 text-xs bg-gray-700/50 text-gray-400 rounded-full">
														+{project.topics.length - 3}
													</span>
												{/if}
											</div>
										{/if}

										<!-- Stats & Actions -->
										<div class="flex items-center justify-between pt-4 border-t border-gray-700/30">
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
														class="px-3 py-1 text-sm bg-primary hover:bg-primary/80 text-white rounded-lg transition-all duration-300 hover:scale-105"
													>
														Demo
													</a>
												{/if}
												<a
													href={project.html_url}
													target="_blank"
													rel="noopener noreferrer"
													class="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
												>
													Code
												</a>
											</div>
										</div>
									</div>

									<!-- Floating Elements for Animation -->
									<div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:rotate-12">
										<div class="w-8 h-8 bg-primary/20 rounded-full animate-pulse"></div>
									</div>
								</article>
							{/each}
						</div>
					</section>
				{:else}
					<!-- No Pinned Projects Fallback -->
					<section>
						<div class="text-center py-12">
							<div class="text-6xl mb-4">🚀</div>
							<h3 class="text-2xl font-bold text-white mb-2">No Featured Projects Yet</h3>
							<p class="text-gray-400">Check back soon for featured projects!</p>
						</div>
					</section>
				{/if}

				<!-- All Projects -->
				{#if projects.length > 0}
					<section>
						<div class="text-center mb-12">
							<h2 class="text-4xl font-bold text-white mb-4">All Projects</h2>
							<p class="text-xl text-gray-400 max-w-2xl mx-auto">Browse all my repositories</p>
						</div>
						
						{#if showAllProjects}
							<div class="mb-6">
								<input
									type="text"
									placeholder="Search projects..."
									bind:value={projectSearchQuery}
									class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
								/>
							</div>
						{/if}

						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{#each displayedProjects as project (project.id)}
								<div class="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
									<h3 class="text-lg font-bold text-white mb-2">{project.name}</h3>
									<p class="text-gray-400 text-sm mb-4 line-clamp-2">{project.description || 'No description'}</p>
									<div class="flex items-center justify-between">
										<span class="text-xs text-gray-500">{project.language}</span>
										<a href={project.html_url} target="_blank" class="text-primary text-sm hover:text-primary/80">
											View
										</a>
									</div>
								</div>
							{/each}
						</div>

						{#if !showAllProjects && projects.length > 15}
							<div class="text-center mt-8">
								<button
									on:click={() => showAllProjects = true}
									class="bg-primary hover:bg-primary/80 px-6 py-3 rounded-lg text-white font-medium"
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
					<div class="absolute inset-0 pointer-events-none">
						<!-- Circuit Board Pattern -->
						<div class="absolute inset-0 opacity-10">
							<svg class="w-full h-full" viewBox="0 0 800 600">
								<defs>
									<pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
										<path d="M10,10 L90,10 L90,90 L10,90 Z" fill="none" stroke="currentColor" stroke-width="1"/>
										<circle cx="50" cy="50" r="3" fill="currentColor"/>
									</pattern>
								</defs>
								<rect width="100%" height="100%" fill="url(#circuit)" class="text-primary"/>
							</svg>
						</div>
						
						<!-- Floating Particles -->
						<div class="particle absolute top-1/4 left-10 w-2 h-2 bg-primary/60 rounded-full animate-pulse"></div>
						<div class="particle absolute top-3/4 right-20 w-3 h-3 bg-green-400/60 rounded-full animate-bounce"></div>
						<div class="particle absolute top-1/2 left-1/3 w-1 h-1 bg-yellow-400/60 rounded-full animate-ping"></div>
						<div class="particle absolute bottom-1/4 right-1/3 w-2 h-2 bg-blue-400/60 rounded-full animate-pulse"></div>
						
						<!-- Energy Streams -->
						<div class="absolute top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-pulse"></div>
						<div class="absolute bottom-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent animate-pulse" style="animation-delay: 1s;"></div>
					</div>

					<div class="text-center mb-12 relative z-10">
						<div class="skill-title-container mb-8">
							<h2 class="text-6xl font-bold text-white skill-title perspective-1000">
								<span class="inline-block hover:animate-bounce transition-all duration-300 cursor-default transform hover:scale-110 hover:rotate-12 hover:text-yellow-300">S</span>
								<span class="inline-block hover:animate-bounce transition-all duration-300 cursor-default transform hover:scale-110 hover:rotate-12 hover:text-yellow-400" style="animation-delay: 0.1s;">k</span>
								<span class="inline-block hover:animate-bounce transition-all duration-300 cursor-default transform hover:scale-110 hover:rotate-12 hover:text-yellow-300" style="animation-delay: 0.2s;">i</span>
								<span class="inline-block hover:animate-bounce transition-all duration-300 cursor-default transform hover:scale-110 hover:rotate-12 hover:text-yellow-400" style="animation-delay: 0.3s;">l</span>
								<span class="inline-block hover:animate-bounce transition-all duration-300 cursor-default transform hover:scale-110 hover:rotate-12 hover:text-yellow-300" style="animation-delay: 0.4s;">l</span>
								<span class="inline-block hover:animate-bounce transition-all duration-300 cursor-default transform hover:scale-110 hover:rotate-12 hover:text-yellow-400" style="animation-delay: 0.5s;">s</span>
								<span class="mx-6 text-primary animate-spin-slow text-7xl">⚡</span>
								<span class="inline-block hover:animate-bounce transition-all duration-300 cursor-default transform hover:scale-110 hover:rotate-12 hover:text-yellow-300" style="animation-delay: 0.6s;">T</span>
								<span class="inline-block hover:animate-bounce transition-all duration-300 cursor-default transform hover:scale-110 hover:rotate-12 hover:text-yellow-400" style="animation-delay: 0.7s;">e</span>
								<span class="inline-block hover:animate-bounce transition-all duration-300 cursor-default transform hover:scale-110 hover:rotate-12 hover:text-yellow-300" style="animation-delay: 0.8s;">c</span>
								<span class="inline-block hover:animate-bounce transition-all duration-300 cursor-default transform hover:scale-110 hover:rotate-12 hover:text-yellow-400" style="animation-delay: 0.9s;">h</span>
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
								{#each skills as skill, skillIndex}
									<div class="skill-bubble" 
										 style="
											 --random-offset: {(skillIndex % 5 - 2) * 10}px;
											 --random-rotation: {(skillIndex % 7 - 3) * 2}deg;
										 ">
										<div class="bubble-content">
											<div class="skill-logo">
												<img src={skill.logo} alt={skill.name} />
											</div>
											<div class="skill-info">
												<div class="skill-name">{skill.name}</div>
												<div class="skill-level">{skill.level}%</div>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>

						<!-- Category Dashboard - 4 in a Row -->
						<div class="category-dashboard">
							{#each Object.entries(skillCategories) as [category, categorySkills], categoryIndex}
								<div class="category-panel" data-category={category}>
									<div class="panel-header">
										<div class="category-badge">
											<div class="badge-icon">
												{#if category === 'Frontend'}🎨
												{:else if category === 'Backend'}⚙️
												{:else if category === 'Tools'}🔧
												{:else if category === 'Languages'}💻
												{:else}📚{/if}
											</div>
											<div class="badge-title">{category}</div>
										</div>
									</div>
									<div class="category-skills">
										{#each categorySkills as skill}
											<div class="mini-skill-item">
												<img src={skill.logo} alt={skill.name} class="mini-skill-logo" />
												<span class="mini-skill-name">{skill.name}</span>
												<span class="mini-skill-level">{skill.level}%</span>
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
					<div class="text-center mb-12">
						<h2 class="text-4xl font-bold text-white mb-4">GitHub Activity</h2>
						<p class="text-xl text-gray-400 max-w-2xl mx-auto">My contributions and recent activity</p>
					</div>

					<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<!-- Contribution Stats -->
						<div bind:this={contributionsSection} class="bg-gray-900/50 rounded-2xl p-8 border border-gray-700/50">
							<h3 class="text-2xl font-bold text-white mb-6">Contribution Stats</h3>
							<div class="grid grid-cols-3 gap-6">
								<div class="text-center">
									<div class="text-primary text-3xl font-bold mb-2">{contributionsData.total}</div>
									<div class="text-sm text-gray-400">Total Stars</div>
								</div>
								<div class="text-center">
									<div class="text-primary text-3xl font-bold mb-2">{contributionsData.lastYear}</div>
									<div class="text-sm text-gray-400">Recent Events</div>
								</div>
								<div class="text-center">
									<div class="text-primary text-3xl font-bold mb-2">{contributionsData.streak}</div>
									<div class="text-sm text-gray-400">Activity Streak</div>
								</div>
							</div>
						</div>

						<!-- Recent Activity -->
						<div class="bg-gray-900/50 rounded-2xl p-8 border border-gray-700/50">
							<h3 class="text-2xl font-bold text-white mb-6">Recent Activity</h3>
							<div class="space-y-4 max-h-80 overflow-y-auto">
								{#each githubEvents.slice(0, 8) as event}
									<div class="flex items-start gap-3 p-3 rounded-lg bg-gray-800/30">
										<div class="w-2 h-2 rounded-full bg-primary mt-2"></div>
										<div>
											<p class="text-sm text-gray-300">
												<span class="font-medium text-white">{event.type?.replace(/([A-Z])/g, ' $1').trim()}</span>
												{#if event.repo}
													in <span class="text-primary">{event.repo.name}</span>
												{/if}
											</p>
											{#if event.created_at}
												<p class="text-xs text-gray-500 mt-1">
													{new Date(event.created_at).toLocaleDateString()}
												</p>
											{/if}
										</div>
									</div>
								{/each}
								{#if githubEvents.length === 0}
									<p class="text-gray-400 text-center py-8">No recent activity available</p>
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
		0%, 100% { transform: translateY(0px) rotate(0deg); }
		25% { transform: translateY(-15px) rotate(90deg); }
		50% { transform: translateY(-20px) rotate(180deg); }
		75% { transform: translateY(-10px) rotate(270deg); }
	}

	@keyframes float-reverse {
		0%, 100% { transform: translateY(0px) rotate(360deg); }
		25% { transform: translateY(-10px) rotate(270deg); }
		50% { transform: translateY(-15px) rotate(180deg); }
		75% { transform: translateY(-8px) rotate(90deg); }
	}

	@keyframes shine {
		0% { transform: translateX(-100%) skewX(-12deg); }
		100% { transform: translateX(200%) skewX(-12deg); }
	}

	@keyframes count-up {
		from { transform: scale(0.5); opacity: 0; }
		to { transform: scale(1); opacity: 1; }
	}

	@keyframes fade-in-up {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@keyframes wiggle {
		0%, 7% { transform: rotateZ(0); }
		15% { transform: rotateZ(-15deg); }
		20% { transform: rotateZ(10deg); }
		25% { transform: rotateZ(-10deg); }
		30% { transform: rotateZ(6deg); }
		35% { transform: rotateZ(-4deg); }
		40%, 100% { transform: rotateZ(0); }
	}

	@keyframes pulse-glow {
		0%, 100% { 
			box-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor;
			transform: scale(1);
		}
		50% { 
			box-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
			transform: scale(1.05);
		}
	}

	@keyframes bounce-in {
		0% { transform: scale(0.3); opacity: 0; }
		50% { transform: scale(1.05); }
		70% { transform: scale(0.9); }
		100% { transform: scale(1); opacity: 1; }
	}

	@keyframes slide-in-left {
		from { transform: translateX(-50px); opacity: 0; }
		to { transform: translateX(0); opacity: 1; }
	}

	@keyframes typewriter {
		from { width: 0; }
		to { width: 100%; }
	}

	@keyframes blink {
		0%, 50% { opacity: 1; }
		51%, 100% { opacity: 0; }
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
		transform: translateY(-4px) scale(1.02);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
	}

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
		text-shadow: 0 4px 20px rgba(255,222,33,0.3);
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
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		align-items: flex-start;
		min-height: 200px;
	}

	/* Individual Skill Bubbles - Horizontal Layout */
	.skill-bubble {
		opacity: 1;
		animation: gentleFloat 4s ease-in-out infinite;
		margin-top: calc(var(--random-offset) * 0.1);
		transform: translateX(var(--random-offset)) rotate(var(--random-rotation));
	}

	.bubble-content {
		background: linear-gradient(145deg, 
			rgba(255,255,255,0.1) 0%, 
			rgba(255,222,33,0.05) 50%,
			rgba(255,255,255,0.05) 100%
		);
		border: 2px solid transparent;
		background-clip: padding-box;
		border-radius: 15px;
		padding: 0.8rem 1rem;
		min-width: 140px;
		max-width: 180px;
		backdrop-filter: blur(15px);
		box-shadow: 
			0 4px 20px rgba(0,0,0,0.1),
			0 0 0 1px rgba(255,222,33,0.2),
			inset 0 1px 0 rgba(255,255,255,0.2);
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
		background: linear-gradient(45deg, 
			#ffde21 0%, 
			#ffd700 50%, 
			#ffde21 100%
		);
		border-radius: 15px;
		z-index: -1;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.skill-bubble:hover .bubble-content {
		transform: translateY(-3px) scale(1.03);
		box-shadow: 
			0 15px 30px rgba(255,222,33,0.2),
			0 0 30px rgba(255,222,33,0.1),
			inset 0 1px 0 rgba(255,255,255,0.3);
	}

	.skill-bubble:hover .bubble-content::before {
		opacity: 0.7;
	}

	.skill-logo {
		width: 32px;
		height: 32px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255,222,33,0.1);
		border-radius: 8px;
		padding: 4px;
	}

	.skill-logo img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
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
		text-shadow: 0 1px 3px rgba(0,0,0,0.3);
		line-height: 1.2;
	}

	.bubble-content .skill-level {
		color: #ffde21;
		font-size: 0.75rem;
		font-weight: 700;
		font-family: 'JetBrains Mono', monospace;
		text-shadow: 0 0 8px rgba(255,222,33,0.5);
	}

	@keyframes gentleFloat {
		0%, 100% { transform: translateY(0) translateX(var(--random-offset)) rotate(var(--random-rotation)); }
		50% { transform: translateY(-6px) translateX(var(--random-offset)) rotate(calc(var(--random-rotation) + 1deg)); }
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
		background: linear-gradient(145deg, 
			rgba(255,255,255,0.1) 0%, 
			rgba(255,222,33,0.08) 30%,
			rgba(255,222,33,0.05) 70%,
			rgba(255,255,255,0.05) 100%
		);
		border: 2px solid transparent;
		background-clip: padding-box;
		border-radius: 20px;
		padding: 1rem;
		backdrop-filter: blur(20px);
		box-shadow: 
			0 8px 25px rgba(0,0,0,0.15),
			0 0 0 1px rgba(255,222,33,0.3),
			inset 0 1px 0 rgba(255,255,255,0.2),
			inset 0 -1px 0 rgba(255,222,33,0.1);
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
		background: linear-gradient(90deg, 
			transparent, 
			rgba(255,222,33,0.15), 
			transparent
		);
		transition: left 0.6s ease;
	}

	.category-panel::after {
		content: '';
		position: absolute;
		inset: -2px;
		background: linear-gradient(45deg, 
			#ffde21 0%, 
			#ffd700 25%,
			#ffde21 50%, 
			#ffd700 75%,
			#ffde21 100%
		);
		border-radius: 20px;
		z-index: -1;
		opacity: 0;
		transition: opacity 0.4s ease;
	}

	.category-panel:hover {
		transform: translateY(-5px) scale(1.02);
		box-shadow: 
			0 15px 30px rgba(255,222,33,0.25),
			0 0 30px rgba(255,222,33,0.15),
			inset 0 2px 0 rgba(255,255,255,0.4),
			inset 0 -2px 0 rgba(255,222,33,0.2);
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
			0 4px 12px rgba(255,222,33,0.4),
			inset 0 1px 0 rgba(255,255,255,0.3),
			inset 0 -1px 0 rgba(0,0,0,0.1);
		transition: all 0.3s ease;
		position: relative;
	}

	.badge-icon::before {
		content: '';
		position: absolute;
		inset: 2px;
		background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
		border-radius: 50%;
		pointer-events: none;
	}

	.category-panel:hover .badge-icon {
		transform: scale(1.1) rotate(5deg);
		box-shadow: 
			0 6px 15px rgba(255,222,33,0.6),
			inset 0 2px 0 rgba(255,255,255,0.4),
			inset 0 -2px 0 rgba(0,0,0,0.15);
	}

	.badge-title {
		color: white;
		font-size: 0.9rem;
		font-weight: 700;
		text-shadow: 0 2px 4px rgba(0,0,0,0.3);
		line-height: 1.2;
		letter-spacing: 0.5px;
	}

	.category-skills {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: rgba(255,222,33,0.3) transparent;
	}

	.category-skills::-webkit-scrollbar {
		width: 4px;
	}

	.category-skills::-webkit-scrollbar-thumb {
		background: linear-gradient(180deg, #ffde21, #ffd700);
		border-radius: 2px;
	}

	.category-skills::-webkit-scrollbar-track {
		background: transparent;
	}

	.mini-skill-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: rgba(255,222,33,0.1);
		border: 1px solid rgba(255,222,33,0.2);
		border-radius: 12px;
		padding: 0.4rem 0.6rem;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.mini-skill-item::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 3px;
		background: linear-gradient(180deg, #ffde21, #ffd700);
		transform: scaleY(0);
		transition: transform 0.3s ease;
	}

	.mini-skill-item:hover {
		background: rgba(255,222,33,0.15);
		border-color: rgba(255,222,33,0.4);
		transform: translateX(4px);
	}

	.mini-skill-item:hover::before {
		transform: scaleY(1);
	}

	.mini-skill-logo {
		width: 18px;
		height: 18px;
		object-fit: contain;
		flex-shrink: 0;
		filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
	}

	.mini-skill-name {
		color: white;
		font-size: 0.75rem;
		font-weight: 600;
		flex: 1;
		text-shadow: 0 1px 2px rgba(0,0,0,0.3);
	}

	.mini-skill-level {
		color: #ffde21;
		font-size: 0.7rem;
		font-weight: 700;
		font-family: 'JetBrains Mono', monospace;
		text-shadow: 0 0 6px rgba(255,222,33,0.5);
		background: rgba(255,222,33,0.2);
		padding: 0.1rem 0.4rem;
		border-radius: 8px;
		border: 1px solid rgba(255,222,33,0.3);
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
		scrollbar-color: rgba(0,245,255,0.4) transparent;
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
		background: rgba(255,255,255,0.05);
		border-radius: 3px;
	}

	.category-skill-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem;
		margin-bottom: 0.5rem;
		border: 1px solid rgba(255,255,255,0.08);
		border-radius: 15px;
		background: rgba(255,255,255,0.03);
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
		background: rgba(0,245,255,0.08);
		border-color: rgba(0,245,255,0.2);
		transform: translateX(5px) scale(1.02);
		box-shadow: 0 5px 15px rgba(0,245,255,0.1);
	}

	.category-skill-item:hover::before {
		transform: scaleY(1);
	}

	.category-skill-item .skill-name {
		color: rgba(255,255,255,0.95);
		font-size: 0.9rem;
		font-weight: 600;
		transition: color 0.3s ease;
	}

	.category-skill-item:hover .skill-name {
		color: white;
	}

	.category-skill-item .skill-percentage {
		color: #00f5ff;
		font-size: 0.85rem;
		font-weight: 800;
		font-family: 'JetBrains Mono', monospace;
		background: rgba(0,245,255,0.1);
		padding: 0.25rem 0.5rem;
		border-radius: 10px;
		border: 1px solid rgba(0,245,255,0.2);
		transition: all 0.3s ease;
	}

	.category-skill-item:hover .skill-percentage {
		background: rgba(0,245,255,0.2);
		transform: scale(1.1);
		text-shadow: 0 0 8px rgba(0,245,255,0.5);
	}

	/* Category Stats - More Fun */
	.category-stats {
		display: flex;
		justify-content: space-around;
		background: rgba(0,0,0,0.3);
		border-radius: 20px;
		padding: 1.5rem;
		border: 2px solid rgba(255,255,255,0.08);
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
		background: linear-gradient(90deg, 
			transparent, 
			rgba(0,245,255,0.1), 
			transparent
		);
		animation: statsShine 3s ease-in-out infinite;
	}

	.stat {
		text-align: center;
		position: relative;
		z-index: 2;
	}

	.stat-label {
		color: rgba(255,255,255,0.7);
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
		text-shadow: 0 0 10px rgba(0,245,255,0.4);
		animation: statPulse 2s ease-in-out infinite;
	}

	@keyframes statsShine {
		0% { left: -100%; }
		50% { left: 100%; }
		100% { left: 100%; }
	}

	@keyframes statPulse {
		0%, 100% { transform: scale(1); }
		50% { transform: scale(1.05); }
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
		text-shadow: 0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 30px #00f5ff;
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

	.skill-item:nth-child(1) { animation-delay: 0.1s; }
	.skill-item:nth-child(2) { animation-delay: 0.2s; }
	.skill-item:nth-child(3) { animation-delay: 0.3s; }
	.skill-item:nth-child(4) { animation-delay: 0.4s; }
	.skill-item:nth-child(5) { animation-delay: 0.5s; }
	.skill-item:nth-child(6) { animation-delay: 0.6s; }

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
		0%, 100% {
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
		0%, 100% {
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
		0%, 100% {
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
		0%, 100% {
			box-shadow: 0 0 20px rgba(0, 245, 255, 0.3);
		}
		50% {
			box-shadow: 0 0 40px rgba(0, 245, 255, 0.6), 0 0 60px rgba(0, 245, 255, 0.3);
		}
	}

	@keyframes spin-slow {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	@keyframes spin-reverse {
		from { transform: rotate(360deg); }
		to { transform: rotate(0deg); }
	}

	@keyframes text-gradient {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
	}

	@keyframes shine {
		0% { transform: translateX(-100%) skewX(-12deg); }
		100% { transform: translateX(200%) skewX(-12deg); }
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
		text-shadow: 0 2px 10px rgba(255,222,33,0.3);
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
			0 0 10px rgba(255,222,33,0.6),
			0 0 20px rgba(255,222,33,0.3);
		animation: dotFloat 2s ease-in-out infinite;
	}

	.accent-dot:nth-child(3) {
		animation-delay: 1s;
	}

	.accent-line {
		width: 40px;
		height: 2px;
		background: linear-gradient(90deg, 
			transparent, 
			#ffde21, 
			#ffd700, 
			#ffde21, 
			transparent
		);
		border-radius: 1px;
		animation: lineExtend 3s ease-in-out infinite;
	}

	@keyframes subtitleGlow {
		0%, 100% { 
			text-shadow: 0 2px 10px rgba(255,222,33,0.3);
			transform: scale(1);
		}
		50% { 
			text-shadow: 0 4px 20px rgba(255,222,33,0.6);
			transform: scale(1.02);
		}
	}

	@keyframes accentPulse {
		0%, 100% { opacity: 1; transform: scale(1); }
		50% { opacity: 0.7; transform: scale(1.1); }
	}

	@keyframes dotFloat {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-5px); }
	}

	@keyframes lineExtend {
		0%, 100% { transform: scaleX(1); opacity: 1; }
		50% { transform: scaleX(1.2); opacity: 0.8; }
	}

	@keyframes fadeInOut {
		0%, 100% { opacity: 0.8; }
		50% { opacity: 1; }
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

	.skill-satellite {
		transform-origin: 50% 50%;
		will-change: transform;
	}

	.skill-orb {
		backdrop-filter: blur(10px);
		transform-style: preserve-3d;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.skill-orb:hover {
		transform: translateZ(20px) scale(1.2);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	}

	.skill-tooltip {
		z-index: 1000;
		pointer-events: none;
	}

	/* Interactive elements */
	.central-hub {
		filter: drop-shadow(0 10px 30px rgba(0, 245, 255, 0.3));
	}

	.category-planet {
		transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.category-planet:hover {
		transform: translateY(-10px) scale(1.1);
		filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.3));
	}

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

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.skills-orbit-container {
			grid-template-columns: 1fr 1fr;
			gap: 2rem;
		}
		
		.skill-satellite {
			--orbit-radius: 60px;
		}
		
		.central-hub .w-32 {
			width: 6rem;
			height: 6rem;
		}
	}

	@media (max-width: 480px) {
		.skills-orbit-container {
			grid-template-columns: 1fr;
		}
		
		.skill-satellite {
			--orbit-radius: 50px;
		}
	}
</style>
