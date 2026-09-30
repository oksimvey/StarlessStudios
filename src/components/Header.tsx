import type { ProjectCollection, Studio } from '../types/site';
import StudioMark from './StudioMark';

interface HeaderProps {
  studio: Studio;
  collections: ProjectCollection[];
}

export default function Header({ studio, collections }: HeaderProps) {
  const { builtbybit, youtube, tiktok } = studio.links;

  return (
    <header className="masthead">
      <div className="shell">
        <a className="mark" href="#/" aria-label={`${studio.name}, home`}>
          <StudioMark />
          Starless <i>Studios</i>
        </a>

        <nav className="nav" aria-label="Main navigation">
          {collections.map((collection) => (
            <a href={`#${collection.id}`} key={collection.id}>
              {collection.eyebrow}
            </a>
          ))}
        </nav>

        <nav className="header-links" aria-label="Elsewhere">
          <a href={builtbybit} target="_blank" rel="noopener noreferrer">BuiltByBit</a>
          <a href={youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href={tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
        </nav>

        <a className="cta" href="#work">
          Explore work
        </a>
      </div>
    </header>
  );
}
