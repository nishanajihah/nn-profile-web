<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	
	// Register GSAP plugins
	gsap.registerPlugin(ScrollTrigger);
	
	// Reference elements for animations
	let headerSection: HTMLElement;
	let projectsSection: HTMLElement;
	let skillsSection: HTMLElement;
	let contributionsSection: HTMLElement;
	
	// Define types for our data structures
	type Project = {
		id: number;
		name: string;
		description: string;
		html_url: string;
		stargazers_count: number;
		language: string;
		languageColor: string;
		topics: string[];
		demo_url?: string;
	};
	
	// State management
	let isLoading = true;
	let error: string | null = null;
	let projects: Project[] = [];
	let pinnedProjects: Project[] = [];

	// Skills visualization data with categories
	const skills = [
		{ category: 'Frontend', name: 'JavaScript', level: 90, color: '#f7df1e' },
		{ category: 'Frontend', name: 'TypeScript', level: 85, color: '#3178c6' },
		{ category: 'Frontend', name: 'React', level: 88, color: '#61dafb' },
		{ category: 'Frontend', name: 'Svelte', level: 78, color: '#ff3e00' },
		{ category: 'Frontend', name: 'HTML/CSS', level: 92, color: '#e34c26' },
		{ category: 'Frontend', name: 'TailwindCSS', level: 85, color: '#06b6d4' },
		{ category: 'Backend', name: 'Node.js', level: 82, color: '#339933' },
		{ category: 'Backend', name: 'Express', level: 80, color: '#000000' },
		{ category: 'Backend', name: 'GraphQL', level: 75, color: '#e535ab' },
		{ category: 'Other', name: 'Python', level: 70, color: '#3572A5' },
		{ category: 'Other', name: 'Git', level: 88, color: '#f34f29' },
		{ category: 'Other', name: 'Docker', level: 72, color: '#2496ed' },
		{ category: 'Music', name: 'Audio Production', level: 95, color: '#ff7eb6' },
		{ category: 'Music', name: 'Sound Design', level: 92, color: '#7eb6ff' },
		{ category: 'Music', name: 'Music Theory', level: 85, color: '#b67eff' }
	];
	// Define type for the skill categories object
	type SkillCategoryMap = {
		[key: string]: typeof skills;
	};
	
	// Group skills by category
	const skillCategories: SkillCategoryMap = skills.reduce((acc: SkillCategoryMap, skill) => {
		if (!acc[skill.category]) {
			acc[skill.category] = [];
		}
		acc[skill.category].push(skill);
		return acc;
	}, {} as SkillCategoryMap);
	// Convert GitHub language colors to tailwind classes
	function getLanguageColorClass(language: string): string {
		const colorMap: Record<string, string> = {
			'TypeScript': 'bg-blue-500',
			'JavaScript': 'bg-yellow-400',
			'Python': 'bg-blue-700',
			'HTML': 'bg-orange-600',
			'CSS': 'bg-blue-500',
			'Svelte': 'bg-orange-600',
			'Vue': 'bg-green-500',
			'Ruby': 'bg-red-600',
			'Go': 'bg-blue-400',
			'Rust': 'bg-orange-700',
			'C#': 'bg-green-600',
			'Java': 'bg-amber-600',
			'Kotlin': 'bg-purple-600',
			'Swift': 'bg-orange-500',
			'PHP': 'bg-indigo-600'
		};
		
		return colorMap[language] || 'bg-gray-500';
	}

	// Mock function for fetching GitHub data (to be replaced with actual API call)
	async function fetchGithubData() {
		try {
			// This would be replaced with actual GitHub API calls using @octokit/rest
			// Example:
			// const octokit = new Octokit({ auth: import.meta.env.VITE_GITHUB_TOKEN });
			// const { data } = await octokit.repos.listForUser({
			//   username: 'yourusername',
			//   sort: 'updated',
			//   direction: 'desc'
			// });
			
			// Simulated API response delay
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			// Mock data for projects
			return {
				repos: [
					{
						id: 1,
						name: 'audio-visualizer',
						description: 'An interactive audio visualization library that reacts to music in real-time using WebAudio API and Canvas.',
						html_url: 'https://github.com/username/audio-visualizer',
						stargazers_count: 64,
						language: 'JavaScript',
						languageColor: '#f1e05a',
						topics: ['audio', 'visualization', 'web-audio', 'canvas']
					},
					{
						id: 2,
						name: 'svelte-music-player',
						description: 'A customizable music player component built with Svelte and TypeScript.',
						html_url: 'https://github.com/username/svelte-music-player',
						stargazers_count: 38,
						language: 'TypeScript', 
						languageColor: '#3178c6',
						topics: ['svelte', 'music-player', 'typescript']
					},
					{
						id: 3,
						name: 'neural-composer',
						description: 'An AI-powered music composition tool using machine learning to generate unique musical pieces.',
						html_url: 'https://github.com/username/neural-composer',
						stargazers_count: 112,
						language: 'Python',
						languageColor: '#3572A5',
						topics: ['machine-learning', 'music-generation', 'ai', 'tensorflow']
					},
					{
						id: 4,
						name: 'react-daw',
						description: 'A digital audio workstation built with React and Tone.js for browser-based music production.',
						html_url: 'https://github.com/username/react-daw',
						stargazers_count: 87,
						language: 'TypeScript',
						languageColor: '#3178c6',
						topics: ['react', 'audio', 'daw', 'tonejs']
					},
					{
						id: 5,
						name: 'personal-website',
						description: 'My personal portfolio website built with SvelteKit and TailwindCSS.',
						html_url: 'https://github.com/username/personal-website',
						stargazers_count: 24,
						language: 'Svelte',
						languageColor: '#ff3e00',
						topics: ['portfolio', 'sveltekit', 'tailwindcss']
					},
					{
						id: 6,
						name: 'midi-controller',
						description: 'A Node.js library for interacting with MIDI controllers and devices.',
						html_url: 'https://github.com/username/midi-controller',
						stargazers_count: 42,
						language: 'JavaScript',
						languageColor: '#f1e05a',
						topics: ['midi', 'nodejs', 'music', 'hardware']
					}
				],
				pinnedRepos: [
					{
						id: 3,
						name: 'neural-composer',
						description: 'An AI-powered music composition tool using machine learning to generate unique musical pieces.',
						html_url: 'https://github.com/username/neural-composer',
						stargazers_count: 112,
						language: 'Python',
						languageColor: '#3572A5',
						topics: ['machine-learning', 'music-generation', 'ai', 'tensorflow'],
						demo_url: 'https://neural-composer-demo.vercel.app'
					},
					{
						id: 4,
						name: 'react-daw',
						description: 'A digital audio workstation built with React and Tone.js for browser-based music production.',
						html_url: 'https://github.com/username/react-daw',
						stargazers_count: 87,
						language: 'TypeScript',
						languageColor: '#3178c6',
						topics: ['react', 'audio', 'daw', 'tonejs'],
						demo_url: 'https://react-daw-demo.vercel.app'
					},
					{
						id: 1,
						name: 'audio-visualizer',
						description: 'An interactive audio visualization library that reacts to music in real-time using WebAudio API and Canvas.',
						html_url: 'https://github.com/username/audio-visualizer',
						stargazers_count: 64,
						language: 'JavaScript',
						languageColor: '#f1e05a',
						topics: ['audio', 'visualization', 'web-audio', 'canvas'],
						demo_url: 'https://audio-visualizer-demo.vercel.app'
					}
				],
				contributions: {
					total: 728,
					lastYear: 412,
					streak: 14
				}
			};
		} catch (err) {
			console.error('Error fetching GitHub data:', err);
			throw new Error('Failed to load GitHub projects. Please try again later.');
		}
	}

	// Initialize animations
	function initAnimations() {
		// Animate header elements
		if (headerSection) {
			gsap.from(headerSection.querySelectorAll('.animate-item'), {
				y: 30,
				opacity: 0,
				duration: 0.8,
				stagger: 0.2,
				ease: "power2.out",
				delay: 0.2
			});
		}
		
		// Animate featured projects
		if (projectsSection) {
			gsap.from(projectsSection.querySelectorAll('.project-card'), {
				y: 40,
				opacity: 0,
				stagger: 0.1,
				duration: 0.6,
				scrollTrigger: {
					trigger: projectsSection,
					start: "top bottom-=100"
				}
			});
		}
		
		// Animate skills section
		if (skillsSection) {
			gsap.from(skillsSection.querySelectorAll('.skill-category'), {
				y: 30,
				opacity: 0,
				stagger: 0.2,
				duration: 0.5,
				scrollTrigger: {
					trigger: skillsSection,
					start: "top bottom-=50"
				}
			});
			
			// Animate skill bars with delay
			gsap.from(skillsSection.querySelectorAll('.skill-bar'), {
				width: 0,
				duration: 1,
				stagger: 0.05,
				ease: "power2.out",
				scrollTrigger: {
					trigger: skillsSection,
					start: "top bottom-=50"
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
					start: "top bottom-=50"
				}
			});
		}
	}
	onMount(async () => {
		try {
			const data = await fetchGithubData();
			projects = data.repos;
			pinnedProjects = data.pinnedRepos;
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

<div class="min-h-screen py-16 md:py-20">
	<div class="container-custom">
		<!-- Header Section -->
		<header bind:this={headerSection} class="mb-16 text-center">
			<h1 class="animate-item mb-4 text-4xl font-bold text-white md:text-5xl">Code & Projects</h1>
			<p class="animate-item mx-auto max-w-2xl text-lg text-gray-300">
				Exploring the intersection of code and creativity through web development, 
				audio applications, and innovative digital experiences.
			</p>
		</header>

		{#if isLoading}
			<!-- Loading State -->
			<div class="flex flex-col items-center justify-center py-20">
				<div class="mb-6 h-16 w-16 animate-spin rounded-full border-t-2 border-b-2 border-primary"></div>
				<p class="text-lg text-gray-400">Loading projects...</p>
			</div>
		{:else if error}
			<!-- Error State -->
			<div class="bg-red-900/20 border-red-600/50 mx-auto max-w-2xl rounded-lg border p-6 text-center">
				<svg class="mx-auto mb-4 h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
				</svg>
				<h2 class="mb-2 text-xl font-semibold text-white">Unable to Load Projects</h2>
				<p class="text-gray-300">{error}</p>
				<button class="mt-4 rounded-md bg-primary px-4 py-2 font-medium text-white hover:bg-primary-600" on:click={() => window.location.reload()}>
					Try Again
				</button>
			</div>
		{:else}
			<!-- Featured Projects -->
			{#if pinnedProjects.length > 0}
				<section class="mb-20">
					<h2 class="mb-2 text-2xl font-semibold text-white">Featured Projects</h2>
					<p class="mb-8 text-gray-400">Highlighted work that showcases my skills and interests</p>
					
					<div bind:this={projectsSection} class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						{#each pinnedProjects as project (project.id)}
							<div
								class="project-card bg-dark-800 border-dark-700 group overflow-hidden rounded-lg border shadow-lg transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
							>
								<div class="relative aspect-video overflow-hidden">
									<!-- Project preview image (mock) -->
									<div 
										class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-dark-700 to-dark-900 text-gray-600 text-opacity-20"
									>
										<span class="text-6xl font-bold">{project.name.charAt(0).toUpperCase()}</span>
									</div>
									
									<!-- Overlay with links -->
									<div class="absolute inset-0 flex items-center justify-center bg-dark-900/60 opacity-0 transition-opacity group-hover:opacity-100">
										<div class="flex gap-4">
											{#if project.demo_url}
												<a 
													href={project.demo_url} 
													class="flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:bg-primary-600 hover:shadow-primary/20"
													target="_blank"
													rel="noreferrer noopener"
												>
													<svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
														<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
													</svg>
													Live Demo
												</a>
											{/if}
											
											<a 
												href={project.html_url} 
												class="flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
												target="_blank"
												rel="noreferrer noopener"
											>
												<svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
													<path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
												</svg>
												Code
											</a>
										</div>
									</div>
								</div>
								
								<div class="p-6">
									<div class="flex items-start justify-between">
										<h3 class="mb-2 text-xl font-semibold text-white">{project.name}</h3>
										<div class="flex items-center text-gray-400">
											<svg class="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
												<path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
											</svg>
											<span class="text-sm">{project.stargazers_count}</span>
										</div>
									</div>
									
									<p class="mb-4 text-sm text-gray-400">{project.description}</p>
									
									<!-- Technology tags -->
									<div class="mb-4 flex flex-wrap gap-2">
										{#each project.topics.slice(0, 3) as topic}
											<span class="rounded-full bg-dark-700 px-3 py-1 text-xs font-medium text-gray-300">
												{topic}
											</span>
										{/each}
									</div>
									
									<div class="mt-auto flex items-center">
										<span class={`mr-2 inline-block h-3 w-3 rounded-full ${getLanguageColorClass(project.language)}`}></span>
										<span class="text-sm text-gray-300">{project.language}</span>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</section>
			{/if}
			
			<!-- All GitHub Projects -->
			<section class="mb-20">
				<h2 class="mb-2 text-2xl font-semibold text-white">GitHub Projects</h2>
				<p class="mb-8 text-gray-400">A selection of my open-source work and personal projects</p>
				
				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each projects as project (project.id)}
						<div
							class="project-card bg-dark-800/80 border-dark-700 flex flex-col rounded-lg border p-6 transition-all hover:border-dark-600 hover:bg-dark-800"
						>
							<h3 class="mb-2 text-lg font-medium text-white">{project.name}</h3>
							<p class="mb-4 flex-grow text-sm text-gray-400">{project.description}</p>

							<div class="mt-auto">
								<div class="mb-4 flex items-center justify-between">
									<div class="flex items-center">
										<span 
											class={`mr-2 inline-block h-3 w-3 rounded-full ${getLanguageColorClass(project.language)}`}
										></span>
										<span class="text-xs text-gray-300">{project.language}</span>
									</div>
									<div class="flex items-center text-gray-400">
										<svg class="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
											<path
												d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
											/>
										</svg>
										<span class="text-xs">{project.stargazers_count}</span>
									</div>
								</div>

								<a
									href={project.html_url}
									class="border-dark-700 hover:bg-dark-700 inline-flex w-full items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors"
									target="_blank"
									rel="noreferrer noopener"
								>
									<svg
										class="mr-2 h-4 w-4"
										fill="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path
											fill-rule="evenodd"
											d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
											clip-rule="evenodd"
										/>
									</svg>
									View on GitHub
								</a>
							</div>
						</div>
					{/each}
				</div>
			</section>

			<!-- Skills Visualization -->
			<section bind:this={skillsSection} class="mb-20">
				<h2 class="mb-2 text-2xl font-semibold text-white">Skills & Technologies</h2>
				<p class="mb-8 text-gray-400">My technical expertise across various domains</p>

				<div class="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
					{#each Object.keys(skillCategories) as category}
						<div class="skill-category">
							<h3 class="mb-4 text-lg font-medium text-white">{category}</h3>
							
							<div class="space-y-4">
								{#each skillCategories[category] as skill}
									<div>
										<div class="mb-1 flex justify-between">
											<span class="text-sm font-medium">{skill.name}</span>
											<span class="text-xs text-gray-400">{skill.level}%</span>
										</div>
										<div class="bg-dark-700 h-2 overflow-hidden rounded-full">
											<div
												class="skill-bar h-full transition-all duration-1000 ease-out"
												style="background-color: {skill.color}; width: {skill.level}%;"
											></div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</section>
			
			<!-- GitHub Contributions -->
			<section bind:this={contributionsSection} class="text-center">
				<h2 class="mb-2 text-2xl font-semibold text-white">Open Source Contributions</h2>
				<p class="mb-8 text-gray-400">My activity and contributions to the open source community</p>
				
				<div class="bg-dark-800 border-dark-700 mx-auto max-w-3xl rounded-xl border p-8 shadow-lg">
					<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
						<div class="text-center">
							<div class="text-4xl font-bold text-primary">728</div>
							<div class="text-sm text-gray-400">Total Contributions</div>
						</div>
						<div class="text-center">
							<div class="text-4xl font-bold text-primary">412</div>
							<div class="text-sm text-gray-400">Last Year</div>
						</div>
						<div class="text-center">
							<div class="text-4xl font-bold text-primary">14</div>
							<div class="text-sm text-gray-400">Current Streak</div>
						</div>
					</div>
					
					<div class="mt-8">
						<a 
							href="https://github.com/username" 
							class="inline-flex items-center rounded-md bg-primary px-6 py-3 font-medium text-white shadow-lg transition-all hover:bg-primary-600"
							target="_blank"
							rel="noreferrer noopener"
						>
							<svg class="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
								<path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
							</svg>
							View GitHub Profile
						</a>
					</div>
				</div>
			</section>
		{/if}
	</div>
</div>
