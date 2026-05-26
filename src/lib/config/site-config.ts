/**
 * Global site configuration
 */
export const siteConfig = {
  // Set to true to enable "Building Mode" for specific routes
  isBuildingMode: true,
  
  // List of paths that should show the "Building Mode" state
  underConstructionPaths: ['/about']
};

/**
 * Checker function for building mode
 */
export const isPathUnderConstruction = (path: string) => {
  return siteConfig.isBuildingMode && siteConfig.underConstructionPaths.some(p => path.startsWith(p));
};
