export type ProjectType = 'Website' | 'MobileApp' | 'Hybrid' | 'API' | 'AppWeb' | 'Agent';

export interface ProjectData {
  id: string;
  name: string;
  type: ProjectType;
  description: string;
  tags: string[];
  
  // Custom Visuals & Badges
  projectIcon?: string;         // App Logo icon
  projectDeviceImage?: string;   // Phone mockup screenshot
  projectBadge?: string;        // Badge label (e.g. 'APP', 'MOBILE APP', 'WEB', 'AGENT', 'API')
  projectCategory?: string;     // Google Play / Store category (e.g. 'Tools & Utilities', 'Entertainment', 'Education')
  accentColor?: string;         // Optional custom hex color for landing page matching (defaults to theme yellow #ffaa33)
  
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
