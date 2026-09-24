import rawData from './site.json';
import type { SiteData } from '../types/site';

// Site content is kept in one editable JSON file, as in the original HTML.
export const siteData = rawData as unknown as SiteData;
