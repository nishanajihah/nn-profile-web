export async function getGitHubStatsAndRepos(githubToken?: string) {
  const hasToken = Boolean(githubToken && githubToken.trim().length > 0);

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'nn-profile-web'
  };

  if (hasToken) {
    headers.Authorization = `Bearer ${githubToken}`;
  }

  const userEndpoint = hasToken
    ? 'https://api.github.com/user'
    : 'https://api.github.com/users/nishanajihah';

  const reposEndpoint = hasToken
    ? 'https://api.github.com/user/repos?sort=updated&per_page=30'
    : 'https://api.github.com/users/nishanajihah/repos?sort=updated&per_page=30';

  const signal = AbortSignal.timeout(3000);

  const [userResponse, reposResponse] = await Promise.all([
    globalThis.fetch(userEndpoint, { headers, signal }),
    globalThis.fetch(reposEndpoint, { headers, signal }),
  ]);

  if (!userResponse.ok || !reposResponse.ok) {
    throw new Error(`HTTP ${userResponse.status}/${reposResponse.status}`);
  }

  const userData = await userResponse.json();
  const reposData = await reposResponse.json();

  const stats = {
    followers: userData.followers || 0,
    publicRepos: userData.public_repos || 0,
    profileUrl: userData.html_url || 'https://github.com/nishanajihah',
    avatarUrl: userData.avatar_url || 'https://avatars.githubusercontent.com/u/1?v=4',
  };

  const repos = (Array.isArray(reposData) ? reposData : []).map((repo: any) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    html_url: repo.html_url,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    updated_at: repo.updated_at,
  }));

  return { stats, repos };
}
