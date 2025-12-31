// This file contains all the "Shapes" (Interfaces) for GitHub data.
// We use these so TypeScript knows exactly what kind of data we are working with.

export interface GithubRepository {
	id: number;
	name: string;
	description: string | null;
	url: string;
	stars: number;
	language: string | null;
	topics: string[];
}

export interface GithubUserInfo {
	name: string | null;
	public_repos: number;
	followers: number;
}

export interface GithubLoadResult {
	repos: GithubRepository[];
	user: GithubUserInfo | null;
	contributions: {
		recentEvents: number;
	} | null;
	error?: string;
}
