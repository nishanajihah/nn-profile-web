// ===== GITHUB ACTIVITY TYPES =====
// TypeScript interfaces for GitHub Activity component

export interface GitHubEvent {
	id: string;
	type: string;
	repo?: {
		name: string;
		url: string;
	};
	created_at: string;
	payload?: Record<string, unknown>;
}

export interface ContributionsData {
	total: number;
	lastYear: number;
	streak: number;
	publicRepos: number;
}

export interface ContributionDay {
	date: string;
	day: number;
	count: number;
	level: number;
	isToday: boolean;
}

export interface ContributionMonth {
	month: string;
	monthKey: string;
	count: number;
	level: number;
	isCurrentMonth: boolean;
	days: ContributionDay[];
}

export type ContributionActivity = ContributionMonth[];

// ===== UTILITY FUNCTIONS =====
export function formatEventDate(dateString: string): string {
	const date = new Date(dateString);
	const now = new Date();
	const diffTime = Math.abs(now.getTime() - date.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	
	if (diffDays === 1) return '1 day ago';
	if (diffDays < 7) return `${diffDays} days ago`;
	if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
	return `${Math.floor(diffDays / 30)} months ago`;
}

export function getEventAction(event: GitHubEvent): string {
	switch (event.type) {
		case 'PushEvent':
			return 'pushed to';
		case 'CreateEvent':
			return 'created';
		case 'DeleteEvent':
			return 'deleted';
		case 'IssuesEvent':
			return 'opened issue in';
		case 'PullRequestEvent':
			return 'opened pull request in';
		case 'ForkEvent':
			return 'forked';
		case 'WatchEvent':
			return 'starred';
		default:
			return 'updated';
	}
}
