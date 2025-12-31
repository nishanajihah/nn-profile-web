// This is a "Wrapper" file. 
// It doesn't do the hard work; it just asks the "github-api-service.ts" for the data
// and gives it to the Code page (+page.svelte).

import { fetchMyGithubProjects } from '$lib/services/github-api-service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    // We just call the service here. Easy to remember!
    const githubData = await fetchMyGithubProjects();
    
    return {
        ...githubData
    };
};
