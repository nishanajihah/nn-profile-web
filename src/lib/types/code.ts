export type ProjectType = 'Website' | 'MobileApp' | 'Hybrid' | 'API';

export interface ProjectData {
  id: string;
  name: string;
  type: ProjectType;
  description: string;
  tags: string[];
  
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
