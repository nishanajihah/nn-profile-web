import { GITHUB_TOKEN } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { featuredProjects } from '$lib/data/projects';

export const load: PageServerLoad = async ({ fetch }) => {
  if (!GITHUB_TOKEN) {
    console.error('GITHUB_TOKEN is missing in environment variables.');
  }

  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  };


  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch('https://api.github.com/user', { headers }),
      fetch('https://api.github.com/user/repos?sort=updated&per_page=30', { headers }),
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      throw error(500, 'Failed to fetch GitHub data');
    }

    const userData = await userResponse.json();
    const reposData = await reposResponse.json();

    const stats = {
      followers: userData.followers,
      publicRepos: userData.public_repos,
      profileUrl: userData.html_url,
      avatarUrl: userData.avatar_url,
    };

    const repos = reposData.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      updated_at: repo.updated_at,
    }));

    return {
      stats,
      repos,
      featuredProjects
    };
  } catch (e) {
    console.error('GitHub API error:', e);
    // Return mock fallback data if API fails
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
