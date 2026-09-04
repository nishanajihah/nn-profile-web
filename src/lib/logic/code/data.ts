import type { ProjectData } from './types';
import randomKitLogo from '$lib/assets/projects/random-kit-idle/random-kit-logo.png';
import screenshotDashboard from '$lib/assets/projects/random-kit-idle/screenshot-dashboard.png';

export const featuredProjects: ProjectData[] = [
  {
    id: 'random-kit-idle',
    name: 'Random Kit+ Idle',
    type: 'MobileApp',
    projectBadge: 'APP',
    projectCategory: 'Entertainment',
    projectIcon: randomKitLogo,
    projectDeviceImage: screenshotDashboard,
    description: 'Yours All-in-One Utility & Arcade Kit.',
    tags: ['Flutter', 'Dart', 'Android', 'AdMob', 'SharedPreferences'],
    hasImages: true,
    hasLanding: true,
    customLandingUrl: '/code/project/landing/random-kit-idle',
  }
];
