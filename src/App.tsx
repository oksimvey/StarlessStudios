import { useEffect, useSyncExternalStore } from 'react';
import { siteData } from './data';
import Header from './components/Header';
import Home from './components/Home';
import Wiki from './components/Wiki';
import CollectionPage from './components/CollectionPage';
import Footer from './components/Footer';
import GlobalDust from './graphics/GlobalDust';

function subscribeToHash(callback: () => void) {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}

function getHash() {
  return window.location.hash;
}

export default function App() {
  const hash = useSyncExternalStore(subscribeToHash, getHash, () => '#/');
  // Clean, crawlable URLs are preferred; previous hash URLs keep working.
  const base = import.meta.env.BASE_URL;
  const pathname = window.location.pathname.startsWith(base)
    ? window.location.pathname.slice(base.length).replace(/\\/+$/, '')
    : '';
  const legacyProjectMatch = /^#\/p\/([\w-]+)(?:\/([\w-]+))?$/.exec(hash);
  const projectMatch = legacyProjectMatch ?? /^p\/([\w-]+)(?:\/([\w-]+))?$/.exec(pathname);
  const collectionMatch = /^#\/collection\/([\w-]+)$/.exec(hash)
    ?? /^collection\/([\w-]+)$/.exec(pathname);
  const requestedProjectId = projectMatch?.[1];
  const projectId = requestedProjectId === 'uiforge' ? 'uiforging' : requestedProjectId;

  const project = projectId
    ? siteData.projects.find((item) => item.id === projectId)
    : undefined;
  const sectionId = project
    ? (projectMatch?.[2] ?? (!hash.startsWith('#/') ? hash.slice(1) : undefined))
    : undefined;
  const collection = collectionMatch
    ? siteData.collections.find((item) => item.id === collectionMatch[1])
    : undefined;

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

      if (collection) {
        window.scrollTo(0, 0);
        return;
      }

      const anchor = hash.startsWith('#') ? hash.slice(1) : '';
      const homeAnchors = new Set(['work', 'studio', 'elsewhere']);

      if (homeAnchors.has(anchor)) {
        document.getElementById(anchor)?.scrollIntoView();
      } else {
        window.scrollTo(0, 0);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [hash, project, collection, sectionId]);

  const collectionProjects = collection
    ? siteData.projects.filter((item) => item.category === collection.id)
    : [];

  return (
    <>
      <GlobalDust />
      <Header studio={siteData.studio} collections={siteData.collections} />
      <main>
        {project ? (
          <Wiki project={project} />
        ) : collection ? (
          <CollectionPage collection={collection} projects={collectionProjects} />
        ) : (
          <Home data={siteData} />
        )}
      </main>
      <Footer studio={siteData.studio} />
    </>
  );
}
