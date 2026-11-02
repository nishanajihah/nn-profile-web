import type { ProjectData } from './types';
import enoventIcon from '$lib/assets/projects/enovent-tower/enovent-icon.png';
import enoventPreview from '$lib/assets/projects/enovent-tower/enovent-browser-preview.png';
import randomKitLogo from '$lib/assets/projects/random-kit-idle/random-kit-logo.png';
import screenshotDashboard from '$lib/assets/projects/random-kit-idle/screenshot-dashboard.png';

/**
 * ========================================================
 * SECTION 02: FEATURED DEPLOYMENTS GLOBAL VISIBILITY TOGGLE
 * ========================================================
 * Set to `true` to display the Featured Deployments section on the /code page.
 * Set to `false` to disable and hide the entire section 02.
 */
export const isProjectsSectionEnabled = true;

export const featuredProjects: ProjectData[] = [
  {
    id: 'enovent-tower',
    name: 'Enovent Tower',
    type: 'Website',
    projectBadge: 'WEB',
    projectCategory: 'Web',
    platformChip: 'WEB PRODUCTION',
    projectIcon: enoventIcon,
    projectDeviceImage: enoventPreview,
    description:
      'Official corporate website and engineering showcase for Enovent Tower Sdn Bhd — specializing in pre-engineered telecommunication towers, monopoles, and structural infrastructure.',
    tags: ['SvelteKit', 'TypeScript', 'Web Architecture', 'Engineering', 'Production'],
    hasImages: true,
    hasLanding: false,
    customLandingUrl: 'https://www.enoventtower.com/',
    ctaText: 'VISIT WEBSITE',
    layoutType: 'stacked', // Top & Bottom layout for Web
    hidden: false,
  },
  {
    id: 'random-kit-idle',
    name: 'Random Kit+ Idle',
    type: 'MobileApp',
    projectBadge: 'APP',
    projectCategory: 'Entertainment',
    platformChip: 'ANDROID RELEASE',
    projectIcon: randomKitLogo,
    projectDeviceImage: screenshotDashboard,
    description: 'Yours All-in-One Utility & Arcade Kit.',
    tags: ['Flutter', 'Dart', 'Android', 'AdMob', 'SharedPreferences'],
    hasImages: true,
    hasLanding: true,
    customLandingUrl: '/code/project/landing/random-kit-idle',
    ctaText: 'ENTER SYSTEM',
    layoutType: 'split', // Left & Right layout for App
    hidden: true, // In progress — hidden from active deployments
  }
];

/**
 * Filtered helper returning only active (non-hidden) projects.
 */
export const activeFeaturedProjects = featuredProjects.filter((p) => !p.hidden);
