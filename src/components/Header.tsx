import type { Studio } from '../types/site';
import StudioMark from './StudioMark';

interface HeaderProps {
  studio: Studio;
}

export default function Header({ studio }: HeaderProps) {
  const { builtbybit, youtube, tiktok } = studio.links;

  return (
    <header className="masthead">
      <div className="shell">
        <a className="mark" href="#/" aria-label={`${studio.name}, home`}>
          <StudioMark />
          Starless <i>Studios</i>
        </a>

        <nav className="nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#studio">Studio</a>
          <a href="#elsewhere">Elsewhere</a>
        </nav>

        <nav className="header-links" aria-label="Elsewhere">
          <a href={builtbybit} target="_blank" rel="noopener noreferrer">BuiltByBit</a>
          <a href={youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href={tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
        </nav>

        <a className="cta" href={builtbybit} target="_blank" rel="noopener noreferrer">
          Get the systems
        </a>
      </div>
    </header>
  );
}
