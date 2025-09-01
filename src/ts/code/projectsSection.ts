/**
 * ===== PROJECTS SECTION LOGIC =====
 * 
 * Handles:
 * - Project filtering and search
 * - Carousel navigation for featured projects
 * - Language color mapping
 * - Project display state management
 */

// ===== TYPES & INTERFACES =====
export interface Project {
	id: number;
	name: string;
	description: string;
	html_url: string;
	stargazers_count: number;
	forks_count: number;
	language: string;
	languageColor: string;
	topics: string[];
	demo_url?: string;
	readme_image?: string;
	created_at: string;
	updated_at: string;
	pushed_at: string;
	homepage?: string;
	size: number;
	languages?: string[];
}

// ===== UTILITY FUNCTIONS =====
export function getLanguageColorClass(language: string): string {
	const colorMap: Record<string, string> = {
		TypeScript: 'bg-blue-500',
		JavaScript: 'bg-yellow-400',
		Python: 'bg-blue-700',
		HTML: 'bg-orange-600',
		CSS: 'bg-blue-500',
		Svelte: 'bg-orange-600',
		Vue: 'bg-green-500',
		Ruby: 'bg-red-600',
		Go: 'bg-blue-400',
		Rust: 'bg-orange-700',
		'C#': 'bg-green-600',
		Java: 'bg-amber-600',
		Kotlin: 'bg-purple-600',
		Swift: 'bg-orange-500',
		PHP: 'bg-indigo-600'
	};
	return colorMap[language] || 'bg-gray-500';
}

// ===== CAROUSEL FUNCTIONS =====
export function createCarouselControls(pinnedProjects: Project[]) {
	let currentProjectIndex = 0;
	
	function nextProject() {
		currentProjectIndex = (currentProjectIndex + 1) % pinnedProjects.length;
		return currentProjectIndex;
	}

	function prevProject() {
		currentProjectIndex = currentProjectIndex === 0 ? pinnedProjects.length - 1 : currentProjectIndex - 1;
		return currentProjectIndex;
	}

	function goToProject(index: number) {
		currentProjectIndex = index;
		return currentProjectIndex;
	}

	return {
		nextProject,
		prevProject,
		goToProject,
		getCurrentIndex: () => currentProjectIndex,
		setCurrentIndex: (index: number) => { currentProjectIndex = index; }
	};
}

// ===== FILTER FUNCTIONS =====
export function filterProjects(projects: Project[], searchQuery: string): Project[] {
	if (!searchQuery.trim()) return projects;
	
	return projects.filter(
		(project) =>
			project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			(project.description &&
				project.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
			(project.language &&
				project.language.toLowerCase().includes(searchQuery.toLowerCase()))
	);
}

export function getDisplayedProjects(filteredProjects: Project[], showAll: boolean, limit: number = 15): Project[] {
	return showAll ? filteredProjects : filteredProjects.slice(0, limit);
}
