// ===== SKILLS SECTION - TypeScript =====

export interface Skill {
	category: string;
	name: string;
	level: number;
	color: string;
	logo: string;
}

export type SkillCategories = Record<string, Skill[]>;

// Skills data with categories
export const skills: Skill[] = [
	{
		category: 'Frontend',
		name: 'JavaScript',
		level: 90,
		color: '#f7df1e',
		logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
	},
	{
		category: 'Frontend',
		name: 'TypeScript',
		level: 85,
		color: '#3178c6',
		logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
	},
	{
		category: 'Frontend',
		name: 'React',
		level: 88,
		color: '#61dafb',
		logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
	},
	{
		category: 'Frontend',
		name: 'Svelte',
		level: 78,
		color: '#ff3e00',
		logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg'
	},
	{
		category: 'Frontend',
		name: 'HTML/CSS',
		level: 92,
		color: '#e34c26',
		logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
	},
	{
		category: 'Frontend',
		name: 'TailwindCSS',
		level: 85,
		color: '#06b6d4',
		logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'
	},
	{
		category: 'Backend',
		name: 'Node.js',
		level: 82,
		color: '#339933',
		logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
	},
	{
		category: 'Backend',
		name: 'Express',
		level: 80,
		color: '#000000',
		logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg'
	},
	{
		category: 'Backend',
		name: 'GraphQL',
		level: 75,
		color: '#e535ab',
		logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg'
	},
	{
		category: 'Backend',
		name: 'PostgreSQL',
		level: 75,
		color: '#336791',
		logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
	},
	{
		category: 'Tools',
		name: 'Git',
		level: 88,
		color: '#f34f29',
		logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
	},
	{
		category: 'Tools',
		name: 'Docker',
		level: 72,
		color: '#2496ed',
		logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'
	},
	{
		category: 'Tools',
		name: 'VS Code',
		level: 90,
		color: '#007acc',
		logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg'
	},
	{
		category: 'Languages',
		name: 'Python',
		level: 70,
		color: '#3572A5',
		logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
	},
	{
		category: 'Languages',
		name: 'Java',
		level: 65,
		color: '#f89820',
		logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
	}
];

// Skills utility functions
export const shuffleArray = (array: Skill[]): Skill[] => {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
};

export const getSkillLevel = (level: number): string => {
	if (level >= 80) return 'Advanced';
	if (level >= 60) return 'Intermediate';
	if (level >= 40) return 'Beginner';
	return 'Learning';
};

// Skills derived data
export const randomizedSkills = shuffleArray(skills);

export const skillCategories: SkillCategories = skills.reduce(
	(acc, skill) => {
		if (!acc[skill.category]) {
			acc[skill.category] = [];
		}
		acc[skill.category].push(skill);
		return acc;
	},
	{} as SkillCategories
);
