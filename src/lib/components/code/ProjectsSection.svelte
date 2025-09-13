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
<!-- DEBUG: Always show featured projects section to check if data is being passed -->
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
							<div class="w-full sm:w-1/2 md:w-1/3 flex-shrink-0 px-3">
								<div class="group cursor-pointer opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
									<!-- Premium Featured Card -->
									<div class="relative overflow-hidden bg-gradient-to-br from-slate-800/95 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1)] transition-all duration-500 hover:translate-y-[-8px] hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,193,7,0.3)] hover:border-yellow-400/30">
										<!-- Project Image Section with proper rounded corners -->
										<div class="relative h-48 overflow-hidden rounded-t-3xl bg-gradient-to-br from-gray-700 to-gray-800">
											{#if project.readme_image}
												<img
													src={project.readme_image}
													alt="{project.name} preview"
													class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
													on:error={(e) => {
														const target = e.currentTarget as HTMLImageElement;
														const fallback = target.nextElementSibling as HTMLElement;
														if (target && fallback) {
															target.style.display = 'none';
															fallback.style.display = 'flex';
														}
													}}
												/>
												<!-- Gradient fallback (hidden by default, shown when image fails) -->
												<div class="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-orange-500/20 to-purple-600/20 flex items-center justify-center" style="display: none;">
													<div class="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.1)_1px,transparent_1px),radial-gradient(circle_at_75%_75%,rgba(255,193,7,0.15)_1px,transparent_1px)] bg-[length:20px_20px] animate-pulse"></div>
													<div class="text-white/80 z-10 flex flex-col items-center gap-2">
														<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" class="drop-shadow-lg">
															<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
														</svg>
														<span class="text-sm font-medium">{project.name}</span>
													</div>
												</div>
											{:else}
												<!-- Default gradient when no image -->
												<div class="w-full h-full bg-gradient-to-br from-yellow-400/20 via-orange-500/20 to-purple-600/20 flex items-center justify-center relative overflow-hidden">
													<div class="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.1)_1px,transparent_1px),radial-gradient(circle_at_75%_75%,rgba(255,193,7,0.15)_1px,transparent_1px)] bg-[length:20px_20px] animate-pulse"></div>
													<div class="text-white/80 z-10 flex flex-col items-center gap-2">
														<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" class="drop-shadow-lg">
															<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
														</svg>
														<span class="text-sm font-medium">{project.name}</span>
													</div>
												</div>
											{/if}
											
											<!-- Live Site Overlay Badge -->
											{#if project.homepage}
												<div class="absolute top-3 right-3 bg-yellow-400 text-black text-sm font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg shadow-yellow-400/20 z-10 border-2 border-yellow-400">
													<div class="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
													<span>Live Site</span>
												</div>
											{/if}

											<!-- Glassmorphism Overlay -->
											<div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
										</div>

										<!-- Content Section -->
										<div class="p-6">
											<h3 class="text-xl font-bold text-white mb-3 leading-tight">{project.name}</h3>
											
											{#if project.description}
												<p class="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>
											{/if}

											<!-- Live Web URL Display -->
											{#if project.homepage}
												<div class="bg-white/5 border border-white/10 rounded-xl p-3 mb-4">
													<div class="text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-1">Live Web URL</div>
													<a
														href={project.homepage}
														target="_blank"
														rel="noopener noreferrer"
														class="text-white font-medium text-sm break-all hover:text-yellow-400 transition-colors duration-200"
														on:click|stopPropagation
													>
														{project.homepage}
													</a>
												</div>
											{/if}

											<!-- Tech & Stats Row -->
											<div class="flex items-center justify-between mb-5">
												{#if project.language}
													<div class="flex items-center gap-2">
														<span class="w-3 h-3 rounded-full {getLanguageColorClass(project.language)}"></span>
														<span class="text-white/90 font-medium text-sm">{project.language}</span>
													</div>
												{/if}
												<div class="flex gap-3">
													<span class="text-white/70 text-sm font-medium">⭐ {project.stargazers_count}</span>
												</div>
											</div>

											<!-- Action Buttons -->
											<div class="flex gap-3">
												{#if project.homepage}
													<a
														href={project.homepage}
														target="_blank"
														rel="noopener noreferrer"
														class="flex-1 bg-yellow-400 text-black font-bold text-sm px-5 py-2.5 rounded-xl text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-400/25 border-2 border-yellow-400"
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
														class="flex-1 bg-white/10 text-white font-semibold text-sm px-5 py-2.5 rounded-xl text-center border border-white/20 backdrop-blur-lg transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:-translate-y-0.5"
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
						<div class="group cursor-pointer opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]" style="animation-delay: {index * 0.1}s">
							<!-- Premium Featured Card -->
							<div class="relative overflow-hidden bg-gradient-to-br from-slate-800/95 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1)] transition-all duration-500 hover:translate-y-[-8px] hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,193,7,0.3)] hover:border-yellow-400/30">
								<!-- Project Image Section with proper rounded corners -->
								<div class="relative h-48 overflow-hidden rounded-t-3xl bg-gradient-to-br from-gray-700 to-gray-800">
									{#if project.readme_image}
										<img
											src={project.readme_image}
											alt="{project.name} preview"
											class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
											on:error={(e) => {
												const target = e.currentTarget as HTMLImageElement;
												const fallback = target.nextElementSibling as HTMLElement;
												if (target && fallback) {
													target.style.display = 'none';
													fallback.style.display = 'flex';
												}
											}}
										/>
										<!-- Gradient fallback (hidden by default, shown when image fails) -->
										<div class="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-orange-500/20 to-purple-600/20 flex items-center justify-center" style="display: none;">
											<div class="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.1)_1px,transparent_1px),radial-gradient(circle_at_75%_75%,rgba(255,193,7,0.15)_1px,transparent_1px)] bg-[length:20px_20px] animate-pulse"></div>
											<div class="text-white/80 z-10 flex flex-col items-center gap-2">
												<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" class="drop-shadow-lg">
													<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
												</svg>
												<span class="text-sm font-medium">{project.name}</span>
											</div>
										</div>
									{:else}
										<!-- Default gradient when no image -->
										<div class="w-full h-full bg-gradient-to-br from-yellow-400/20 via-orange-500/20 to-purple-600/20 flex items-center justify-center relative overflow-hidden">
											<div class="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.1)_1px,transparent_1px),radial-gradient(circle_at_75%_75%,rgba(255,193,7,0.15)_1px,transparent_1px)] bg-[length:20px_20px] animate-pulse"></div>
											<div class="text-white/80 z-10 flex flex-col items-center gap-2">
												<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" class="drop-shadow-lg">
													<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
												</svg>
												<span class="text-sm font-medium">{project.name}</span>
											</div>
										</div>
									{/if}
									
									<!-- Live Site Overlay Badge -->
									{#if project.homepage}
										<div class="absolute top-4 right-4 bg-yellow-400 text-black text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg shadow-yellow-400/20 z-10 border-2 border-yellow-400">
											<div class="w-2 h-2 bg-black rounded-full animate-pulse"></div>
											<span>Live Site</span>
										</div>
									{/if}

									<!-- Glassmorphism Overlay -->
									<div class="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-orange-500/5 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
								</div>

								<!-- Content Section -->
								<div class="p-6 flex flex-col">
									<h3 class="text-xl font-bold text-white mb-3 leading-tight">{project.name}</h3>
									
									{#if project.description}
										<p class="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>
									{/if}

									<!-- Live Web URL Display -->
									{#if project.homepage}
										<div class="bg-white/5 border border-white/10 rounded-xl p-3 mb-4">
											<div class="text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-1">Live Web URL</div>
											<a
												href={project.homepage}
												target="_blank"
												rel="noopener noreferrer"
												class="text-white font-medium text-sm break-all hover:text-yellow-400 transition-colors duration-200"
												on:click|stopPropagation
											>
												{project.homepage}
											</a>
										</div>
									{/if}

									<!-- Tech & Stats Row -->
									<div class="flex items-center justify-between mb-5">
										{#if project.language}
											<div class="flex items-center gap-2">
												<span class="w-3 h-3 rounded-full {getLanguageColorClass(project.language)}"></span>
												<span class="text-white/90 font-medium text-sm">{project.language}</span>
											</div>
										{/if}
										<div class="flex gap-3">
											<span class="text-white/70 text-sm font-medium">⭐ {project.stargazers_count}</span>
										</div>
									</div>

									<!-- Action Buttons -->
									<div class="flex gap-3">
										{#if project.homepage}
											<a
												href={project.homepage}
												target="_blank"
												rel="noopener noreferrer"
												class="flex-1 bg-yellow-400 text-black font-bold text-sm px-4 py-2.5 rounded-xl text-center transition-all duration-300 hover:bg-yellow-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/25"
												on:click|stopPropagation
											>
												Live Site
											</a>
										{/if}
										{#if project.html_url}
											<a
												href={project.html_url}
												target="_blank"
												rel="noopener noreferrer"
												class="flex-1 bg-white/10 text-white font-semibold text-sm px-4 py-2.5 rounded-xl text-center border border-white/20 backdrop-blur-lg transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:scale-105"
												on:click|stopPropagation
											>
												Code
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
				<div class="flex justify-center">
					<input
						type="text"
						placeholder="🔍 Search projects..."
						bind:value={projectSearchQuery}
						class="w-full max-w-md bg-white/10 text-white placeholder-gray-400 px-6 py-3 rounded-xl border border-white/20 backdrop-blur-lg focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
					/>
				</div>
			</div>
		{/if}

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each displayedProjects as project (project.id)}
				<article class="bg-gradient-to-br from-slate-800/50 to-slate-900/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:border-yellow-400/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-400/10">
					<!-- Simple content layout -->
					<div class="flex items-start justify-between mb-4">
						<h3 class="text-lg font-bold text-white leading-tight flex-grow pr-3">{project.name}</h3>
						{#if project.language}
							<span class="text-xs px-2.5 py-1 rounded-full font-medium {getLanguageColorClass(project.language)} bg-opacity-20 border border-current shrink-0">
								{project.language}
							</span>
						{/if}
					</div>

					<p class="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
						{project.description || 'No description available'}
					</p>

					<div class="flex items-center justify-between mt-auto">
						<div class="flex items-center gap-4 text-sm text-gray-400">
							<span class="flex items-center gap-1">
								<span>⭐</span>
								<span>{project.stargazers_count}</span>
							</span>
							<span class="flex items-center gap-1">
								<span>🍴</span>
								<span>{project.forks_count}</span>
							</span>
						</div>
						
						<div class="flex items-center gap-2">
							{#if project.homepage}
								<a
									href={project.homepage}
									target="_blank"
									rel="noopener noreferrer"
									class="bg-yellow-400 text-black text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200 hover:bg-yellow-500 hover:-translate-y-0.5"
								>
									Live
								</a>
							{/if}
							<a
								href={project.html_url}
								target="_blank"
								rel="noopener noreferrer"
								class="bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/20 transition-all duration-200 hover:bg-white/15 hover:border-white/30 hover:-translate-y-0.5"
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
					class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold px-8 py-3 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-yellow-400/25 border-2 border-yellow-400"
				>
					View All {projects.length} Repositories
				</button>
			</div>
		{/if}
	</section>
{/if}


