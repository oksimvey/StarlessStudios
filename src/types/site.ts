export interface StudioLinks {
  builtbybit: string;
  tiktok: string;
  youtube: string;
}

export interface Studio {
  name: string;
  tagline: string;
  links: StudioLinks;
}

export interface ProjectCollection {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

interface BlockBase {
  type: string;
}

export interface TextBlock extends BlockBase {
  type: 'text' | 'heading';
  value: string;
}

export interface ListBlock extends BlockBase {
  type: 'list';
  items: string[];
  ordered?: boolean;
}

export interface NoteBlock extends BlockBase {
  type: 'note';
  title?: string;
  value: string;
}

export interface DividerBlock extends BlockBase {
  type: 'divider';
}

export interface ImageBlock extends BlockBase {
  type: 'image';
  url: string;
  caption?: string;
}

export interface VideoBlock extends BlockBase {
  type: 'video';
  url: string;
  sourceRef?: string;
  caption?: string;
}

export interface CodeBlockData extends BlockBase {
  type: 'code';
  value: string;
  lang?: string;
  file?: string;
}

export type WikiBlockData =
  | TextBlock
  | ListBlock
  | NoteBlock
  | DividerBlock
  | ImageBlock
  | VideoBlock
  | CodeBlockData;

export interface WikiSection {
  id: string;
  title: string;
  blocks: WikiBlockData[];
}

export interface Project {
  id: string;
  category: string;
  name: string;
  status: string;
  tagline: string;
  tags: string[];
  cover: string;
  updatedAt?: string;
  links: ProjectLink[];
  wiki: WikiSection[];
}

export interface SiteData {
  studio: Studio;
  collections: ProjectCollection[];
  projects: Project[];
}
