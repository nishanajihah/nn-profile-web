import { GITHUB_TOKEN } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { featuredProjects } from '$lib/logic/code/data';
import { getGitHubStatsAndRepos } from '$lib/logic/code/github';

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const { stats, repos } = await getGitHubStatsAndRepos(GITHUB_TOKEN, fetch);
    return {
      stats,
      repos,
      featuredProjects
    };
  } catch (e: any) {
    const reason = e?.name === 'TimeoutError' ? 'Connection timed out (3s)' : (e?.message || 'Network unavailable');
    console.warn(`[GitHub API] Offline/Fallback mode active: ${reason}`);

    return {
      stats: {
        followers: 142,
        publicRepos: 24,
        profileUrl: 'https://github.com/nishanajihah',
        avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
      },
      repos: Array.from({ length: 12 }).map((_, i) => ({
        id: i + 1,
        name: `system-module-${i + 1}`,
        description: 'Core architectural deployment.',
        html_url: '#',
        language: 'TypeScript',
        stargazers_count: Math.floor(Math.random() * 50),
        forks_count: Math.floor(Math.random() * 10),
      })),
      featuredProjects
    };
  }
};
