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
