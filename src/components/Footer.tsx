import type { Studio } from '../types/site';
import StudioMark from './StudioMark';

interface FooterProps {
  studio: Studio;
}

export default function Footer({ studio }: FooterProps) {
  return (
    <footer className="foot">
      <div className="shell">
        <StudioMark compact />
        <span>{studio.name}</span>
        <nav aria-label="Footer links">
          <a href={studio.links.builtbybit} target="_blank" rel="noopener noreferrer">BuiltByBit</a>
          <a href={studio.links.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href={studio.links.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
        </nav>
      </div>
    </footer>
  );
}
