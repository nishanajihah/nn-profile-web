// This file is responsible ONLY for talking to the GitHub API.
// It doesn't care about how the page looks, just how to get the data.

import { GITHUB_TOKEN } from '$env/static/private';
import { Octokit } from '@octokit/rest';
import type { GithubLoadResult } from '../types/github-data-structures';

const octokit = new Octokit({
	auth: GITHUB_TOKEN || undefined
});

export async function fetchMyGithubProjects(): Promise<GithubLoadResult> {
	try {
		const [reposRes, eventsRes, userRes] = await Promise.all([
			octokit.repos.listForUser({
				username: 'nishanajihah',
				sort: 'updated',
				per_page: 100
			}),
			octokit.activity.listPublicEventsForUser({
				username: 'nishanajihah',
				per_page: 30
			}),
			octokit.users.getByUsername({
				username: 'nishanajihah'
			})
		]);

		const repos = reposRes.data
			.filter(repo => !repo.fork && !repo.archived)
			.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
			.slice(0, 12);

		return {
			repos: repos.map(repo => ({
				id: repo.id,
				name: repo.name,
				description: repo.description || null,
				url: repo.html_url,
				stars: repo.stargazers_count || 0,
				language: repo.language || null,
				topics: repo.topics || []
			})),
			user: {
				name: userRes.data.name || 'Nisha Najihah',
				public_repos: userRes.data.public_repos,
				followers: userRes.data.followers
			},
			contributions: {
				recentEvents: eventsRes.data.length
			}
		};
	} catch (error) {
		console.error('Failed to fetch data from GitHub Service:', error);
		return {
			repos: [],
			user: null,
			contributions: null,
			error: 'Could not load GitHub projects at this time.'
		};
	}
}
