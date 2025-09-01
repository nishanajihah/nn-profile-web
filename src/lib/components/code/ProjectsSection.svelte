<script lang="ts">
	/*
	 * ===== PROJECTS SECTION COMPONENT =====
	 * 
	 * Displays:
	 * - Featured/pinned projects with premium design
	 * - All projects with search functionality
	 * - Carousel for 3+ featured projects
	 */

	// ===== IMPORTS =====
	import { createEventDispatcher } from 'svelte';
	import { 
		type Project, 
		getLanguageColorClass, 
		createCarouselControls, 
		filterProjects, 
		getDisplayedProjects 
	} from '../../../ts/code/projectsSection';

	// ===== PROPS =====
	export let projects: Project[] = [];
	export let pinnedProjects: Project[] = [];

	// ===== STATE MANAGEMENT =====
	let showAllProjects = false;
	let projectSearchQuery = '';
	let projectsSection: HTMLElement;

	// Carousel state for featured projects
	let currentProjectIndex = 0;
	let carouselControls: ReturnType<typeof createCarouselControls> | null = null;

	// ===== REACTIVE STATEMENTS =====
	$: filteredProjects = filterProjects(projects, projectSearchQuery);
	$: displayedProjects = getDisplayedProjects(filteredProjects, showAllProjects, 15);
	$: isCarouselMode = pinnedProjects.length > 3;

	// ===== CAROUSEL FUNCTIONS =====
	$: if (isCarouselMode && pinnedProjects.length > 0) {
		carouselControls = createCarouselControls(pinnedProjects);
		carouselControls.setCurrentIndex(currentProjectIndex);
	}

	function nextProject() {
		if (carouselControls) {
			currentProjectIndex = carouselControls.nextProject();
		}
	}

	function prevProject() {
		if (carouselControls) {
			currentProjectIndex = carouselControls.prevProject();
		}
	}

	function goToProject(index: number) {
		if (carouselControls) {
			currentProjectIndex = carouselControls.goToProject(index);
		}
	}
</script>

<!-- Featured Projects -->
{#if pinnedProjects.length > 0}
	<section>
		<div class="mb-8 text-left">
			<h2 class="mb-4 text-4xl font-bold text-white">
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
			<h2 class="mb-4 text-4xl font-bold text-white">
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

<style>
	@import '../../../css/code/projectsSection.css';
</style>
