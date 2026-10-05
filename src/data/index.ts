import rawData from './site.json';
import { uiforgingProject } from './uiforging';
import type { SiteData } from '../types/site';

const baseData = rawData as unknown as SiteData;

export const siteData: SiteData = {
  ...baseData,
  projects: baseData.projects.map((project) =>
    project.id === 'uiforge' || project.id === 'uiforging'
      ? uiforgingProject
      : project,
  ),
};
