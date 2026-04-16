import { error } from '@sveltejs/kit';
import { isPathUnderConstruction } from '$lib/config/site-config';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
  if (isPathUnderConstruction(url.pathname)) {
    throw error(503, 'BUILDING_MODE');
  }
};
