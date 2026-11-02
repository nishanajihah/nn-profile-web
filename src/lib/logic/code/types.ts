export type ProjectType = 'Website' | 'MobileApp' | 'Hybrid' | 'API' | 'AppWeb' | 'Agent';
export type ProjectStatus = 'active' | 'in-progress' | 'standby' | 'hidden' | 'live' | 'demo';
export type ProjectVisibility = 'public' | 'private' | 'restricted';

export interface ProjectData {
  id: string;
  name: string;
  type: ProjectType;
  description: string;
  tags: string[];

  // Visibility & Development Status
  hidden?: boolean;              // When true, hides this project from active deployments
  status?: ProjectStatus;        // Status: 'active' | 'in-progress' | 'standby' | 'hidden' | 'live' | 'demo'
  visibility?: ProjectVisibility;// Visibility: 'public' | 'private' | 'restricted'
  statusLabel?: string;          // Optional custom status badge (e.g. 'LIVE // PUBLIC', 'ACTIVE (PRIVATE)', 'DEMO')

  // Custom Visuals & Badges
  projectIcon?: string;         // App Logo icon / Web favicon
  projectIconBg?: string;       // Optional custom background for the icon box (e.g. '#ffffff' or 'rgba(255, 255, 255, 0.95)')
  projectDeviceImage?: string;   // Mockup / visual preview screenshot
  projectBadge?: string;        // Badge label (e.g. 'APP', 'WEB', 'AGENT', 'API')
  projectCategory?: string;     // Category (e.g. 'Entertainment', 'Web Development')
  platformChip?: string;        // Platform chip label (e.g. 'ANDROID RELEASE', 'WEB PRODUCTION')
  accentColor?: string;         // Optional custom hex color for landing page matching (defaults to theme yellow #ffaa33)
  ctaText?: string;             // Action button text (e.g. 'VISIT WEBSITE', 'ENTER SYSTEM')
  hasSplitLayout?: boolean;     // Triggers the refined split container card layout
  layoutType?: 'split' | 'stacked'; // Layout direction: 'split' (app left & right) or 'stacked' (web top & bottom)

  // Layout triggers
  hasImages: boolean;
  hasLanding: boolean;

  // Dynamic fields
  customLandingUrl?: string; // Links directly to a static custom landing page OR an external URL!
  liveUrl?: string;
  docsUrl?: string;
  repoUrl?: string;
  stores?: Array<{
    name: 'apple' | 'google' | 'huawei' | 'samsung' | 'amazon';
    url: string;
  }>;
  gallery?: string[];
}
