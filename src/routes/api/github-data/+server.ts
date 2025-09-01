// SvelteKit API route to fetch GitHub data
import { GITHUB_TOKEN } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';

interface GitHubRepo {
	id: number;
	name: string;
	description: string | null;
	html_url: string;
	homepage: string | null;
	stargazers_count: number;
	language: string | null;
	topics: string[];
	created_at: string;
	updated_at: string;
	fork: boolean;
	archived: boolean;
}

interface GitHubUser {
	login: string;
	name: string;
	public_repos: number;
	followers: number;
	following: number;
	created_at: string;
}

interface GitHubEvent {
	id: string;
	type: string;
	actor: {
		login: string;
		display_login: string;
	};
	repo: {
		name: string;
		url: string;
	};
	created_at: string;
	public: boolean;
}

/**
 * GET handler for /api/github-data
 * Fetches public repositories and user events from GitHub concurrently.
 * Returns combined data as JSON. Handles errors gracefully.
 */
export async function GET(event: RequestEvent) {
	console.log('=== API CALLED ===');

	const headers = {
		Authorization: `Bearer ${GITHUB_TOKEN}`,
		Accept: 'application/vnd.github+json',
		'X-GitHub-Api-Version': '2022-11-28',
		'User-Agent': 'nn-profile-web'
	};

	try {
		// Fetch repos, events, and user info concurrently
		const [reposRes, eventsRes, userRes] = await Promise.all([
			event.fetch('https://api.github.com/users/nishanajihah/repos?sort=updated&per_page=100', {
				headers
			}),
			event.fetch('https://api.github.com/users/nishanajihah/events/public?per_page=30', {
				headers
			}),
			event.fetch('https://api.github.com/users/nishanajihah', { headers })
		]);

		// Check for errors
		if (!reposRes.ok || !eventsRes.ok || !userRes.ok) {
			const errorResponse = !reposRes.ok ? reposRes : !eventsRes.ok ? eventsRes : userRes;
			const errorData = await errorResponse.json();
			console.error('GitHub API Error:', errorData);

			return new Response(
				JSON.stringify({
					error: `GitHub API Error: ${errorData.message || 'Unknown error'}`,
					status: errorResponse.status
				}),
				{
					status: errorResponse.status,
					headers: { 'Content-Type': 'application/json' }
				}
			);
		}

		// Parse JSON
		const [repos, events, userInfo]: [GitHubRepo[], GitHubEvent[], GitHubUser] = await Promise.all([
			reposRes.json(),
			eventsRes.json(),
			userRes.json()
		]);

		// Filter out forks and archived repos, sort by stars and recent activity
		const filteredRepos = repos
			.filter((repo) => !repo.fork && !repo.archived)
			.sort((a, b) => {
				// Sort by stars first, then by updated date
				if (b.stargazers_count !== a.stargazers_count) {
					return b.stargazers_count - a.stargazers_count;
				}
				return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
			});

		// Get more repos to increase chances of finding projects with live websites
		const pinnedRepos = filteredRepos.slice(0, 12); // Take top 12 to filter down to projects with live sites
		console.log(
			'All filtered repos:',
			filteredRepos.map((r) => r.name)
		);
		console.log(
			'Pinned repos selected for screening:',
			pinnedRepos.map((r) => r.name)
		);

		// Enhance pinned repos with README images and live URLs
		const enhancedPinnedRepos = await Promise.all(
			pinnedRepos.map(async (repo) => {
				let readme_image = null;
				let readme_live_url = null;
				// languages removed for simplicity

				try {
					// Fetch README
					const readmeRes = await event.fetch(
						`https://api.github.com/repos/nishanajihah/${repo.name}/readme`,
						{ headers }
					);
					if (readmeRes.ok) {
						const readmeData = await readmeRes.json();
						const readmeContent = atob(readmeData.content);
						// ...existing code for image and live url extraction...
						// Extract first image from README markdown
						const imageMatch = readmeContent.match(/!\[.*?\]\((.*?)\)|<img[^>]+src="([^"]+)"/);
						if (imageMatch) {
							let imageUrl = imageMatch[1] || imageMatch[2];
							if (imageUrl) {
								if (imageUrl.startsWith('./') || imageUrl.startsWith('/')) {
									imageUrl = `https://raw.githubusercontent.com/nishanajihah/${repo.name}/main/${imageUrl.replace('./', '')}`;
								} else if (!imageUrl.startsWith('http')) {
									imageUrl = `https://raw.githubusercontent.com/nishanajihah/${repo.name}/main/${imageUrl}`;
								}
								readme_image = imageUrl;
							}
						}
						// Extract live URL from README content
						const liveUrlPatterns = [
							/(?:Live\s+Demo|Website|Demo|Live\s+Site|Visit|App):\s*\[.*?\]\((https?:\/\/[^\s)]+)\)/gi,
							/(?:Live\s+Demo|Website|Demo|Live\s+Site|Visit|App):\s*(https?:\/\/[^\s)]+)/gi,
							/\[(?:Live\s+Demo|Website|Demo|Live\s+Site|Visit|App)\]\((https?:\/\/[^\s)]+)\)/gi,
							/(?:🚀|🌐|🔗|➡️)\s*\[.*?\]\((https?:\/\/[^\s)]+)\)/gi,
							/(?:🚀|🌐|🔗|➡️)\s*(https?:\/\/[^\s)]+)/gi,
							/(https?:\/\/[a-zA-Z0-9-]+\.onrender\.com[^\s)]*)/gi,
							/\[.*?\]\((https?:\/\/[a-zA-Z0-9-]+\.onrender\.com[^\s)]*)\)/gi
						];
						for (const pattern of liveUrlPatterns) {
							const match = readmeContent.match(pattern);
							if (match) {
								const urlMatch = match[0].match(/(https?:\/\/[^\s)]+)/);
								if (urlMatch) {
									readme_live_url = urlMatch[1];
									break;
								}
							}
						}
					}
				} catch {
					// Silently handle README parsing errors
				}

				// Fetch languages for each repo - commented out to reduce complexity
				// try {
				// 	const langRes = await event.fetch(
				// 		`https://api.github.com/repos/nishanajihah/${repo.name}/languages`,
				// 		{ headers }
				// 	);
				// 	if (langRes.ok) {
				// 		const langData = await langRes.json();
				// 		languages = Object.keys(langData).filter(l => l !== repo.language);
				// 	}
				// } catch {
				// 	// Silently handle language API errors
				// }

				return {
					...repo,
					readme_image,
					readme_live_url
					// languages removed for simplicity
				};
			})
		);

		// Transform repos to match our interface
		const transformedRepos = filteredRepos.map((repo) => ({
			id: repo.id,
			name: repo.name,
			description: repo.description || 'No description available',
			html_url: repo.html_url,
			homepage: repo.homepage,
			stargazers_count: repo.stargazers_count,
			language: repo.language || 'Unknown',
			languageColor: getLanguageColor(repo.language),
			topics: repo.topics || []
		}));

		const transformedPinnedRepos = enhancedPinnedRepos.map((repo) => {
			// Manual override for trend-compass-ai if needed
			let finalHomepage = repo.homepage || repo.readme_live_url;
			if (repo.name.toLowerCase().includes('trend') && !finalHomepage) {
				finalHomepage = 'https://trend-compass-ai.onrender.com/';
				console.log(`Manually setting homepage for ${repo.name}: ${finalHomepage}`);
			}

			return {
				id: repo.id,
				name: repo.name,
				description: repo.description || 'No description available',
				html_url: repo.html_url,
				homepage: finalHomepage,
				stargazers_count: repo.stargazers_count,
				language: repo.language || 'Unknown',
				languageColor: getLanguageColor(repo.language),
				topics: repo.topics || [],
				readme_image: repo.readme_image,
				// Add demo_url for pinned repos (you can customize this logic)
				demo_url: repo.topics.some(
					(topic) => topic.includes('demo') || topic.includes('live') || topic.includes('website')
				)
					? `${repo.html_url}#demo`
					: undefined
			};
		});

		// Filter to only include projects with live websites for Featured Projects
		// Exclude the portfolio website itself (nn-profile-web) as it's still in development
		const featuredProjectsWithLiveWebsites = transformedPinnedRepos.filter((repo) => {
			const hasLiveWebsite = repo.homepage && repo.homepage.trim() !== '';
			const isPortfolioWebsite =
				repo.name.toLowerCase().includes('nn-profile') ||
				repo.name.toLowerCase().includes('profile-web') ||
				repo.html_url.includes('nn-profile-web');

			console.log(
				`${repo.name}: has live website = ${hasLiveWebsite}, is portfolio = ${isPortfolioWebsite}, homepage = ${repo.homepage || 'none'}`
			);

			// Include if it has a live website AND is not the portfolio website
			return hasLiveWebsite && !isPortfolioWebsite;
		});

		console.log(
			'Featured projects with live websites:',
			featuredProjectsWithLiveWebsites.map((r) => r.name)
		);

		// Calculate contributions data
		const contributionsData = {
			total: filteredRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
			lastYear: events.length,
			streak: calculateContributionStreak(events),
			publicRepos: userInfo.public_repos
		};

		// Generate contribution activity graph data for the last 365 days
		const contributionActivity = generateContributionActivity(events);

		// Return combined data
		return new Response(
			JSON.stringify({
				repos: transformedRepos,
				pinnedRepos: featuredProjectsWithLiveWebsites, // Only projects with live websites
				events: events.slice(0, 10), // Latest 10 events
				contributions: contributionsData,
				contributionActivity: contributionActivity
			}),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
				}
			}
		);
	} catch (err: unknown) {
		console.error('Server error:', err);
		const errorMessage = err instanceof Error ? err.message : 'Unknown server error';

		return new Response(
			JSON.stringify({
				error: `Server Error: ${errorMessage}`
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}
}

// Helper function to get language colors
function getLanguageColor(language: string | null): string {
	const colorMap: Record<string, string> = {
		TypeScript: '#3178c6',
		JavaScript: '#f1e05a',
		Python: '#3572A5',
		HTML: '#e34c26',
		CSS: '#563d7c',
		Svelte: '#ff3e00',
		Vue: '#4FC08D',
		React: '#61dafb',
		Ruby: '#701516',
		Go: '#00ADD8',
		Rust: '#dea584',
		'C#': '#239120',
		Java: '#b07219',
		Kotlin: '#A97BFF',
		Swift: '#ffac45',
		PHP: '#4F5D95',
		'C++': '#f34b7d',
		C: '#555555',
		Shell: '#89e051',
		Dockerfile: '#384d54'
	};

	return colorMap[language || ''] || '#586069';
}

// Helper function to generate contribution activity graph data
function generateContributionActivity(events: GitHubEvent[]) {
	const currentYear = new Date().getFullYear();
	const monthlyData = [];

	// Count events by date for current year
	const dailyContributions = new Map<string, number>();

	events.forEach((event) => {
		const eventDate = new Date(event.created_at);
		if (eventDate.getFullYear() === currentYear) {
			const dateKey = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}-${String(eventDate.getDate()).padStart(2, '0')}`;
			dailyContributions.set(dateKey, (dailyContributions.get(dateKey) || 0) + 1);
		}
	});

	// Generate data for all 12 months of current year
	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	for (let month = 0; month < 12; month++) {
		const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
		const monthKey = `${currentYear}-${String(month + 1).padStart(2, '0')}`;

		// Get all days for this month
		const days = [];
		let monthTotal = 0;

		for (let day = 1; day <= daysInMonth; day++) {
			const dateKey = `${currentYear}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
			const count = dailyContributions.get(dateKey) || 0;
			monthTotal += count;

			// Determine contribution level (0-4 based on count)
			let level = 0;
			if (count > 0) level = 1;
			if (count >= 2) level = 2;
			if (count >= 4) level = 3;
			if (count >= 6) level = 4;

			days.push({
				date: dateKey,
				day: day,
				count: count,
				level: level,
				isToday: dateKey === new Date().toISOString().split('T')[0]
			});
		}

		// Determine month contribution level
		let monthLevel = 0;
		if (monthTotal > 0) monthLevel = 1;
		if (monthTotal >= 10) monthLevel = 2;
		if (monthTotal >= 25) monthLevel = 3;
		if (monthTotal >= 50) monthLevel = 4;

		monthlyData.push({
			month: monthNames[month],
			monthKey: monthKey,
			count: monthTotal,
			level: monthLevel,
			isCurrentMonth: month === new Date().getMonth(),
			days: days
		});
	}

	return monthlyData;
}

// Helper function to calculate contribution streak
function calculateContributionStreak(events: GitHubEvent[]): number {
	if (events.length === 0) return 0;

	// Group events by date
	const eventDates = new Set(events.map((event) => new Date(event.created_at).toDateString()));

	// Calculate streak from today backwards
	let streak = 0;
	const today = new Date();

	for (let i = 0; i < 30; i++) {
		// Check last 30 days
		const checkDate = new Date(today);
		checkDate.setDate(today.getDate() - i);

		if (eventDates.has(checkDate.toDateString())) {
			streak++;
		} else if (streak > 0) {
			break; // Streak broken
		}
	}

	return streak;
}
