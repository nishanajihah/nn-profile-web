<script lang="ts">
	// ===== IMPORTS =====
	import type { 
		GitHubEvent, 
		ContributionsData
	} from '../../../ts/code/githubActivitySection';
	import { 
		formatEventDate,
		getEventAction
	} from '../../../ts/code/githubActivitySection';
	
	// ===== COMPONENT PROPS =====
	export let githubEvents: GitHubEvent[] = [];
	export let contributionsData: ContributionsData = { total: 0, lastYear: 0, streak: 0, publicRepos: 0 };
	export let projectsCount: number = 0;
	
	// ===== DOM REFERENCES =====
	let recentActivitySection: HTMLElement;
	
	// ===== INTERACTION HANDLERS =====
	function handleRecentEventsClick() {
		if (recentActivitySection) {
			recentActivitySection.scrollIntoView({ 
				behavior: 'smooth', 
				block: 'start' 
			});
		}
	}
	
	// Handle keyboard navigation for Recent Events card
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleRecentEventsClick();
		}
	}
</script>

<!-- GitHub Activity Section -->
<section class="relative py-16 bg-gradient-to-br from-gray-800/40 to-black/60 rounded-3xl my-16 border border-gray-700/20 backdrop-blur-md">
	<!-- Activity Overview Cards -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 px-8">
		<!-- Total Contributions -->
		<div class="bg-gradient-to-br from-gray-800/60 to-black/80 border border-gray-700/30 rounded-xl p-6 backdrop-blur-md transition-all duration-300 flex flex-col gap-4 relative overflow-hidden hover:translate-y-[-2px] hover:border-yellow-400/30 hover:from-gray-700/70 hover:to-black/90 before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-yellow-400/5 before:to-transparent before:transition-all before:duration-500 hover:before:left-full">
			<div class="flex items-center gap-3">
				<span class="text-xl opacity-80 transition-opacity duration-300 hover:opacity-100">📊</span>
				<span class="text-gray-300 font-medium">Total Contributions</span>
			</div>
			<div class="text-3xl font-bold text-white">{contributionsData.total}</div>
		</div>

		<!-- This Year -->
		<div class="bg-gradient-to-br from-gray-800/60 to-black/80 border border-gray-700/30 rounded-xl p-6 backdrop-blur-md transition-all duration-300 flex flex-col gap-4 relative overflow-hidden hover:translate-y-[-2px] hover:border-yellow-400/30 hover:from-gray-700/70 hover:to-black/90 before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-yellow-400/5 before:to-transparent before:transition-all before:duration-500 hover:before:left-full">
			<div class="flex items-center gap-3">
				<span class="text-xl opacity-80 transition-opacity duration-300 hover:opacity-100">📈</span>
				<span class="text-gray-300 font-medium">This Year</span>
			</div>
			<div class="text-3xl font-bold text-white">{contributionsData.lastYear}</div>
		</div>

		<!-- Activity Streak -->
		<div class="bg-gradient-to-br from-gray-800/60 to-black/80 border border-gray-700/30 rounded-xl p-6 backdrop-blur-md transition-all duration-300 flex flex-col gap-4 relative overflow-hidden hover:translate-y-[-2px] hover:border-yellow-400/30 hover:from-gray-700/70 hover:to-black/90 before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-yellow-400/5 before:to-transparent before:transition-all before:duration-500 hover:before:left-full">
			<div class="flex items-center gap-3">
				<span class="text-xl opacity-80 transition-opacity duration-300 hover:opacity-100">🔥</span>
				<span class="text-gray-300 font-medium">Activity Streak</span>
			</div>
			<div class="text-3xl font-bold text-white">{contributionsData.streak}</div>
		</div>

		<!-- Public Repos -->
		<div class="bg-gradient-to-br from-gray-800/60 to-black/80 border border-gray-700/30 rounded-xl p-6 backdrop-blur-md transition-all duration-300 flex flex-col gap-4 relative overflow-hidden hover:translate-y-[-2px] hover:border-yellow-400/30 hover:from-gray-700/70 hover:to-black/90 before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-yellow-400/5 before:to-transparent before:transition-all before:duration-500 hover:before:left-full">
			<div class="flex items-center gap-3">
				<span class="text-xl opacity-80 transition-opacity duration-300 hover:opacity-100">📂</span>
				<span class="text-gray-300 font-medium">Public Repos</span>
			</div>
			<div class="text-3xl font-bold text-white">{projectsCount}</div>
		</div>
	</div>

	<!-- GitHub-style Contribution Graph -->
	<div class="mb-12 px-8">
		<div class="bg-white/[0.02] border border-white/10 rounded-2xl p-8 backdrop-blur-md">
			<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
				<h3 class="text-2xl font-bold text-white drop-shadow-lg">Contribution Activity (Debug: {githubEvents.length} events)</h3>
				<div class="flex items-center gap-3 text-sm">
					<span class="text-gray-400">Less</span>
					<div class="flex gap-1">
						<div class="w-3 h-3 rounded-sm bg-gray-800 border border-gray-700"></div>
						<div class="w-3 h-3 rounded-sm bg-yellow-900/50 border border-yellow-800/50"></div>
						<div class="w-3 h-3 rounded-sm bg-yellow-700/70 border border-yellow-600/70"></div>
						<div class="w-3 h-3 rounded-sm bg-yellow-500/80 border border-yellow-400/80"></div>
						<div class="w-3 h-3 rounded-sm bg-yellow-400 border border-yellow-300"></div>
					</div>
					<span class="text-gray-400">More</span>
				</div>
			</div>
			
			<!-- GitHub-style contribution graph -->
			<div class="relative overflow-x-auto">
				<!-- Week day labels -->
				<div class="flex">
					<div class="flex flex-col gap-1 mr-3 text-xs text-gray-500">
						<div class="h-3"></div>
						<div class="h-3 flex items-center">Mon</div>
						<div class="h-3"></div>
						<div class="h-3 flex items-center">Wed</div>
						<div class="h-3"></div>
						<div class="h-3 flex items-center">Fri</div>
						<div class="h-3"></div>
					</div>
					
					<!-- Contribution grid -->
					<div class="flex gap-1">
						{#each Array(53) as _, weekIndex}
							<div class="flex flex-col gap-1">
								{#each Array(7) as _, dayIndex}
									{@const randomLevel = Math.floor(Math.random() * 5)}
									{@const isToday = weekIndex === 52 && dayIndex === new Date().getDay()}
									<div 
										class="w-3 h-3 rounded-sm border transition-all duration-200 hover:scale-110 cursor-pointer
											{randomLevel === 0 ? 'bg-gray-800 border-gray-700' : ''}
											{randomLevel === 1 ? 'bg-yellow-900/50 border-yellow-800/50' : ''}
											{randomLevel === 2 ? 'bg-yellow-700/70 border-yellow-600/70' : ''}
											{randomLevel === 3 ? 'bg-yellow-500/80 border-yellow-400/80' : ''}
											{randomLevel === 4 ? 'bg-yellow-400 border-yellow-300' : ''}
											{isToday ? 'ring-2 ring-yellow-400/50' : ''}"
										title="Contributions on this day"
									></div>
								{/each}
							</div>
						{/each}
					</div>
				</div>
				
				<!-- Month labels -->
				<div class="flex mt-2 ml-10 gap-1 text-xs text-gray-500">
					<div class="w-12 text-center">Jan</div>
					<div class="w-12 text-center">Feb</div>
					<div class="w-12 text-center">Mar</div>
					<div class="w-12 text-center">Apr</div>
					<div class="w-12 text-center">May</div>
					<div class="w-12 text-center">Jun</div>
					<div class="w-12 text-center">Jul</div>
					<div class="w-12 text-center">Aug</div>
					<div class="w-12 text-center">Sep</div>
					<div class="w-12 text-center">Oct</div>
					<div class="w-12 text-center">Nov</div>
					<div class="w-12 text-center">Dec</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Recent Activity Feed -->
	<div class="px-8" bind:this={recentActivitySection}>
		<div class="bg-white/[0.02] border border-white/10 rounded-2xl p-8 backdrop-blur-md">
			<h3 class="text-2xl font-bold text-white drop-shadow-lg mb-6">Recent Activity</h3>
			<div class="space-y-4">
				{#each githubEvents.slice(0, 8) as event, index}
					<div class="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10">
						<div class="flex flex-col gap-1">
							<span class="text-white font-medium">
								{event.type?.replace(/([A-Z])/g, ' $1').trim() || 'Activity'}
							</span>
							{#if event.repo}
								<span class="text-gray-400 text-sm">in {event.repo.name}</span>
							{/if}
						</div>
						{#if event.created_at}
							<div class="text-gray-500 text-sm">
								{new Date(event.created_at).toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric'
								})}
							</div>
						{/if}
					</div>
				{/each}
				{#if githubEvents.length === 0}
					<div class="text-center py-8">
						<span class="text-4xl mb-4 block">💤</span>
						<p class="text-gray-400">No recent activity available</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	/* Only animations that can't be done with Tailwind */
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
