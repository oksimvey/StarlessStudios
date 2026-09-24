import { useEffect, useSyncExternalStore } from 'react';
import { siteData } from './data';
import Header from './components/Header';
import Home from './components/Home';
import Wiki from './components/Wiki';
import Footer from './components/Footer';
import GlobalDust from './graphics/GlobalDust';

function subscribeToHash(callback: () => void) {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}

function getHash() {
  return window.location.hash;
}

/** Keeps the original #/p/project-id links and native #work/#studio anchors. */
export default function App() {
  const hash = useSyncExternalStore(subscribeToHash, getHash, () => '#/');
  const match = /^#\/p\/([\w-]+)(?:\/([\w-]+))?$/.exec(hash);
  const project = match ? siteData.projects.find((item) => item.id === match[1]) : undefined;
  const sectionId = project ? match?.[2] : undefined;

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (project) {
        if (sectionId) {
          const section = document.getElementById(sectionId);
          if (section && project.wiki.some((item) => item.id === sectionId)) {
            section.scrollIntoView();
            return;
          }
        }
        window.scrollTo(0, 0);
        return;
      }
      if (/^#(?:work|studio|elsewhere)$/.test(hash)) {
        document.getElementById(hash.slice(1))?.scrollIntoView();
      } else {
        window.scrollTo(0, 0);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, project, sectionId]);

  return (
    <>
      <GlobalDust />
      <Header studio={siteData.studio} />
      <main>
        {project ? <Wiki project={project} /> : <Home data={siteData} />}
      </main>
      <Footer studio={siteData.studio} />
    </>
  );
}
