export type ProjectType = 'Website' | 'MobileApp' | 'Hybrid' | 'API' | 'AppWeb' | 'Agent';

export interface ProjectData {
  id: string;
  name: string;
  type: ProjectType;
  description: string;
  tags: string[];

  // Visibility & Development Status
  hidden?: boolean;              // When true, hides this project from active deployments
  status?: 'active' | 'in-progress' | 'standby' | 'hidden';

  // Custom Visuals & Badges
  projectIcon?: string;         // App Logo icon / Web favicon
  projectDeviceImage?: string;   // Mockup / visual preview screenshot
  projectBadge?: string;        // Badge label (e.g. 'APP', 'WEB', 'AGENT', 'API')
  projectCategory?: string;     // Category (e.g. 'Entertainment', 'Telecommunication Infrastructure')
  platformChip?: string;        // Platform chip label (e.g. 'ANDROID RELEASE', 'WEB PRODUCTION')
  accentColor?: string;         // Optional custom hex color for landing page matching (defaults to theme yellow #ffaa33)
  ctaText?: string;             // Action button text (e.g. 'VISIT WEBSITE', 'ENTER SYSTEM')
  hasSplitLayout?: boolean;     // Triggers the refined split container card layout

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
