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
  name: string;
  status: string;
  tagline: string;
  tags: string[];
  cover: string;
  links: ProjectLink[];
  wiki: WikiSection[];
}

export interface SiteData {
  studio: Studio;
  projects: Project[];
}
