<script lang="ts">
	// ===== GITHUB ACTIVITY COMPONENT =====
	// Displays GitHub contribution calendar, stats overview, and recent activity feed
	
	import type { 
		GitHubEvent, 
		ContributionsData
		// ContributionActivity  // TODO: Will be used when implementing real contribution data
	} from '../../../ts/code/githubActivitySection';
	
	// ===== COMPONENT PROPS =====
	export let githubEvents: GitHubEvent[] = [];
	export let contributionsData: ContributionsData = { total: 0, lastYear: 0, streak: 0, publicRepos: 0 };
	// export let contributionActivity: ContributionActivity = []; // TODO: Implement real contribution data
	export let projectsCount: number = 0;
	
	// ===== DOM REFERENCES =====
	let recentActivitySection: HTMLElement;
	
	// ===== INTERACTION HANDLERS =====
	// Handle clicking on Recent Events card to scroll to activity feed
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
<section class="github-activity-section">
	<!-- Activity Overview Cards -->
	<div class="activity-overview-grid">
		<!-- Total Stars -->
		<div class="stats-card-minimal">
			<div class="stat-header">
				<span class="stat-icon">⭐</span>
				<span class="stat-label">Total Stars</span>
			</div>
			<div class="stat-number">{contributionsData.total}</div>
		</div>

		<!-- Recent Events - Clickable -->
		<div 
			class="stats-card-minimal clickable-card" 
			on:click={handleRecentEventsClick} 
			on:keydown={handleKeyDown} 
			role="button" 
			tabindex="0"
			aria-label="View recent GitHub activity"
		>
			<div class="stat-header">
				<span class="stat-icon">📈</span>
				<span class="stat-label">Recent Events</span>
			</div>
			<div class="stat-number">{contributionsData.lastYear}</div>
			<div class="click-indicator">Click to view →</div>
		</div>

		<!-- Activity Streak -->
		<div class="stats-card-minimal">
			<div class="stat-header">
				<span class="stat-icon">🔥</span>
				<span class="stat-label">Activity Streak</span>
			</div>
			<div class="stat-number">{contributionsData.streak}</div>
		</div>

		<!-- Public Repos -->
		<div class="stats-card-minimal">
			<div class="stat-header">
				<span class="stat-icon">📂</span>
				<span class="stat-label">Public Repos</span>
			</div>
			<div class="stat-number">{projectsCount}</div>
		</div>
	</div>

	<!-- GitHub-style Contribution Graph -->
	<div class="contribution-section">
		<div class="contribution-card">
			<div class="contribution-header">
				<h3 class="contribution-title">Contribution Activity</h3>
				<div class="contribution-legend">
					<span class="legend-text">Less</span>
					<div class="legend-squares">
						<div class="legend-square level-0"></div>
						<div class="legend-square level-1"></div>
						<div class="legend-square level-2"></div>
						<div class="legend-square level-3"></div>
						<div class="legend-square level-4"></div>
					</div>
					<span class="legend-text">More</span>
				</div>
			</div>
			
			<!-- GitHub-style contribution graph -->
			<div class="contribution-graph">
				<!-- Week day labels -->
				<div class="weekday-labels">
					<div class="weekday-label"></div>
					<div class="weekday-label">Mon</div>
					<div class="weekday-label"></div>
					<div class="weekday-label">Wed</div>
					<div class="weekday-label"></div>
					<div class="weekday-label">Fri</div>
					<div class="weekday-label"></div>
				</div>
				
				<!-- Contribution grid -->
				<div class="contribution-grid">
					{#each Array(53) as _, weekIndex}
						<div class="week-column">
							{#each Array(7) as _, dayIndex}
								{@const randomLevel = Math.floor(Math.random() * 5)}
								{@const isToday = weekIndex === 52 && dayIndex === new Date().getDay()}
								<div 
									class="contribution-square level-{randomLevel} {isToday ? 'today' : ''}"
									title="Contributions on this day"
								></div>
							{/each}
						</div>
					{/each}
				</div>
				
				<!-- Month labels -->
				<div class="month-labels">
					<div class="month-label">Jan</div>
					<div class="month-label">Feb</div>
					<div class="month-label">Mar</div>
					<div class="month-label">Apr</div>
					<div class="month-label">May</div>
					<div class="month-label">Jun</div>
					<div class="month-label">Jul</div>
					<div class="month-label">Aug</div>
					<div class="month-label">Sep</div>
					<div class="month-label">Oct</div>
					<div class="month-label">Nov</div>
					<div class="month-label">Dec</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Recent Activity Feed -->
	<div class="activity-feed-section" bind:this={recentActivitySection}>
		<div class="activity-feed-card">
			<h3 class="feed-title">Recent Activity</h3>
			<div class="activity-list">
				{#each githubEvents.slice(0, 8) as event, index}
					<div class="activity-item-minimal" style="animation-delay: {index * 0.1}s">
						<div class="activity-info">
							<span class="activity-type">
								{event.type?.replace(/([A-Z])/g, ' $1').trim() || 'Activity'}
							</span>
							{#if event.repo}
								<span class="activity-repo">in {event.repo.name}</span>
							{/if}
						</div>
						{#if event.created_at}
							<div class="activity-date">
								{new Date(event.created_at).toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric'
								})}
							</div>
						{/if}
					</div>
				{/each}
				{#if githubEvents.length === 0}
					<div class="no-activity-minimal">
						<span class="no-activity-icon">💤</span>
						<p class="no-activity-text">No recent activity available</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	@import '../../../css/code/githubActivity.css';
</style>
