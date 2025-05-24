/**
 * GitHub API utilities
 */

import { GITHUB_CONFIG } from './env.js';

// GitHub API endpoints
const GITHUB_API_BASE = 'https://api.github.com';

// GitHub username from configuration
const GITHUB_USERNAME = GITHUB_CONFIG.username;

/**
 * Get user data from GitHub
 * @returns {Promise<Object|null>} User data or null on error
 */
export async function getGitHubUser() {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
    const data = await response.json();
    
    if (data.message && data.message.includes('API rate limit exceeded')) {
      console.warn('GitHub API rate limit exceeded');
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    return null;
  }
}

/**
 * Get repositories for a user
 * @param {number} limit - Number of repos to return
 * @returns {Promise<Array|null>} Repositories array or null on error
 */
export async function getRepositories(limit = 10) {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${limit}`);
    const data = await response.json();
    
    if (data.message && data.message.includes('API rate limit exceeded')) {
      console.warn('GitHub API rate limit exceeded');
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return null;
  }
}

/**
 * Get repository details including README
 * @param {string} repo - Repository name
 * @returns {Promise<Object|null>} Repository data with README or null on error
 */
export async function getRepositoryDetails(repo) {
  try {
    // Get repo info
    const repoResponse = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repo}`);
    const repoData = await repoResponse.json();
    
    if (repoData.message && repoData.message.includes('API rate limit exceeded')) {
      console.warn('GitHub API rate limit exceeded');
      return null;
    }
    
    // Try to get README content
    try {
      const readmeResponse = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repo}/readme`);
      const readmeData = await readmeResponse.json();
      
      if (readmeData && !readmeData.message) {
        // Decode content from base64
        const content = atob(readmeData.content);
        
        return {
          ...repoData,
          readme: content
        };
      }
    } catch (readmeError) {
      // Continue with repo data even if README fetch fails
    }
    
    return repoData;
  } catch (error) {
    console.error('Error fetching repository details:', error);
    return null;
  }
}

/**
 * Get contribution data for the user
 * @returns {Promise<Object|null>} Contribution data or null on error
 */
export async function getContributionData() {
  try {
    // GitHub doesn't provide this directly through their REST API
    // In a real implementation, you would need to use GraphQL API
    const query = `
      query {
        user(login: "${GITHUB_USERNAME}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;
    
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${import.meta.env.VITE_GITHUB_TOKEN || ''}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });
    
    const data = await response.json();
    
    if (data.errors) {
      console.warn('GitHub GraphQL API error:', data.errors);
      return generateMockContributionData();
    }
    
    return data.data?.user?.contributionsCollection?.contributionCalendar || generateMockContributionData();
  } catch (error) {
    console.error('Error fetching contribution data:', error);
    return generateMockContributionData();
  }
}

/**
 * Generate mock contribution data for development
 */
function generateMockContributionData() {
  // Generate mock data for development
  const weeks = [];
  for (let i = 0; i < 52; i++) {
    const days = [];
    for (let j = 0; j < 7; j++) {
      days.push({
        contributionCount: Math.floor(Math.random() * 10),
        date: new Date(Date.now() - ((52 - i) * 7 + (7 - j)) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });
    }
    weeks.push({ contributionDays: days });
  }
  
  return {
    totalContributions: 842,
    weeks
  };
}

/**
 * For development: Use mock data when real API isn't available
 * @returns {Array} Mock repository data
 */
export function getMockRepositories() {
  return [
    {
      id: 1,
      name: 'portfolio-website',
      html_url: 'https://github.com/nishanajihah/portfolio-website',
      description: 'My personal portfolio website built with SvelteKit and GSAP',
      language: 'JavaScript',
      stargazers_count: 42,
      forks_count: 12,
      topics: ['svelte', 'portfolio', 'web-development'],
      homepage: 'https://nishanajihah.com'
    },
    {
      id: 2,
      name: 'music-visualizer',
      html_url: 'https://github.com/nishanajihah/music-visualizer',
      description: 'Audio visualizer built with Tone.js and Three.js',
      language: 'JavaScript',
      stargazers_count: 24,
      forks_count: 5,
      topics: ['audio', 'visualization', 'tone-js'],
      homepage: null
    },
    {
      id: 3,
      name: 'react-spotify-clone',
      html_url: 'https://github.com/nishanajihah/react-spotify-clone',
      description: 'A Spotify clone built with React and the Spotify API',
      language: 'TypeScript',
      stargazers_count: 18,
      forks_count: 7,
      topics: ['react', 'spotify-api', 'music'],
      homepage: 'https://spotify-clone-demo.vercel.app'
    },
    {
      id: 4,
      name: 'node-midi-converter',
      html_url: 'https://github.com/nishanajihah/node-midi-converter',
      description: 'Node.js library for converting between different music file formats',
      language: 'JavaScript',
      stargazers_count: 56,
      forks_count: 14,
      topics: ['nodejs', 'midi', 'audio-processing'],
      homepage: null
    }
  ];
}
