import type { ProjectData } from '../types/code';

export const featuredProjects: ProjectData[] = [
  {
    id: 'random-kit-idle',
    name: 'Random Kit +Idle',
    type: 'MobileApp', // Required by type, even if we don't strictly use it for logic anymore
    description: 'A custom idle game experience built with SvelteKit.',
    tags: ['SvelteKit', 'TypeScript', 'Idle Game'],
    hasImages: false,
    hasLanding: true,
    customLandingUrl: '/code/project/landing/random-kit-idle',
  }
];
