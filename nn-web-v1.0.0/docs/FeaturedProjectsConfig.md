# Featured Projects Configuration

## Portfolio Website Exception

### Current Configuration
The portfolio website (`nn-profile-web`) is currently **excluded** from the Featured Projects section.

**Location**: `src/routes/api/github-data/+server.ts`

**Code Section**:
```typescript
// Filter to only include projects with live websites for Featured Projects
// Exclude the portfolio website itself (nn-profile-web) as it's still in development
const featuredProjectsWithLiveWebsites = transformedPinnedRepos.filter(repo => {
    const hasLiveWebsite = repo.homepage && repo.homepage.trim() !== '';
    const isPortfolioWebsite = repo.name.toLowerCase().includes('nn-profile') || 
                              repo.name.toLowerCase().includes('profile-web') ||
                              repo.html_url.includes('nn-profile-web');
    
    // Include if it has a live website AND is not the portfolio website
    return hasLiveWebsite && !isPortfolioWebsite;
});
```

### Why This Exception Exists
- The portfolio website is still in development
- URL will change later when deployed
- It's more appropriate to showcase other projects rather than the portfolio itself

### When to Modify This Exception

#### Option 1: Remove Exception Completely
If you want to include the portfolio in Featured Projects later:

```typescript
// Remove the isPortfolioWebsite check
const featuredProjectsWithLiveWebsites = transformedPinnedRepos.filter(repo => {
    const hasLiveWebsite = repo.homepage && repo.homepage.trim() !== '';
    return hasLiveWebsite;
});
```

#### Option 2: Update Exception Rules
If you want to change which repositories are excluded:

```typescript
const isPortfolioWebsite = repo.name.toLowerCase().includes('your-new-pattern') || 
                          repo.name.toLowerCase().includes('another-pattern') ||
                          repo.html_url.includes('specific-repo-name');
```

#### Option 3: Add More Exceptions
If you want to exclude other repositories:

```typescript
const isExcludedRepo = repo.name.toLowerCase().includes('nn-profile') || 
                      repo.name.toLowerCase().includes('profile-web') ||
                      repo.name.toLowerCase().includes('other-repo-to-exclude') ||
                      repo.html_url.includes('nn-profile-web');
```

### Featured Projects Logic Summary

1. **Initial Selection**: Takes top 12 most starred repositories
2. **Enhancement**: Adds README images and extracts live URLs
3. **Manual Overrides**: Includes specific projects (like trend-compass-ai)
4. **Filtering**: Only keeps projects with live websites
5. **Exceptions**: Excludes portfolio website and other specified repos

### Testing Changes
After modifying the exception logic:
1. Restart the development server: `npm run dev`
2. Check terminal output for debug logs
3. Visit `/code` page to see updated Featured Projects
4. Verify correct projects are included/excluded

### Related Files
- **Main Logic**: `src/routes/api/github-data/+server.ts`
- **Frontend Display**: `src/routes/code/+page.svelte`
- **Manual Overrides**: Same file as main logic (search for "Manual override")

---
**Last Updated**: August 22, 2025  
**Next Review**: When portfolio deployment URL is finalized
