import type { Project, ProjectCollection } from '../types/site';
import { marketplaceLinks } from '../data/marketplace';

interface CollectionPageProps {
  collection: ProjectCollection;
  projects: Project[];
}

const presentation: Record<string, { label: string; statement: string; visualLabel: string }> = {
  websites: {
    label: 'WEB / CLIENT WORK',
    statement: 'Interfaces with a point of view — built to look intentional before they even start moving.',
    visualLabel: 'HTML / CSS / TS',
  },
  roblox: {
    label: 'ROBLOX / SYSTEMS',
    statement: 'Drop-in systems, tools, and templates designed around clean APIs, practical setup, and real documentation.',
    visualLabel: 'LUAU / STUDIO',
  },
  products: {
    label: 'INDEPENDENT / SOFTWARE',
    statement: 'Products, SaaS experiments, and tools that start as an idea and get pushed until they feel complete.',
    visualLabel: 'APPS / SAAS / LAB',
  },
};

function projectTarget(project: Project) {
  if (project.wiki.length > 0) return `${import.meta.env.BASE_URL}p/${project.id}/`;
  return project.links[0]?.url ?? null;
}

function ProjectCard({ project }: { project: Project }) {
  const href = projectTarget(project);
  const external = Boolean(href?.startsWith('http'));
  const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  const marketplace = marketplaceLinks[project.id];
  const visualStyle = project.cover
    ? { backgroundImage: `url("${project.cover}")` }
    : undefined;

  return (
    <article className="project collection-project">
      {href ? (
        <a className="project-visual" href={href} aria-label={project.name} style={visualStyle} {...linkProps} />
      ) : (
        <div className="project-visual" style={visualStyle} aria-hidden="true" />
      )}

      <div className="project-body">
        <h3>{project.name}</h3>
        <p className="desc">{project.tagline}</p>
        <div className="meta">
          <span className="state">{project.status}</span>
          {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>

        <div className="collection-project-actions">
          {href ? (
            <a className="project-open" href={href} {...linkProps}>
              {project.wiki.length > 0 ? 'Open documentation' : project.links[0]?.label ?? 'View project'}
            </a>
          ) : (
            <span className="project-open project-open-muted">Details soon</span>
          )}

          {marketplace && (
            <a
              className="project-open project-resource"
              href={marketplace.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View resource on {marketplace.platform}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function CollectionVisual({ id, label }: { id: string; label: string }) {
  if (id === 'websites') {
    return (
      <div className="collection-art web-art" aria-hidden="true">
        <div className="web-window web-window-back"><span /></div>
        <div className="web-window web-window-front">
          <div className="web-bar"><i /><i /><i /></div>
          <div className="web-layout"><b /><span /><span /><span /></div>
        </div>
        <small>{label}</small>
      </div>
    );
  }

  if (id === 'roblox') {
    return (
      <div className="collection-art roblox-art" aria-hidden="true">
        <div className="module-tree">
          <span>ReplicatedStorage</span>
          <span className="depth-1">System</span>
          <span className="depth-2">Config.luau</span>
          <span className="depth-2 active">Controller.luau</span>
          <span className="depth-2">API.luau</span>
        </div>
        <div className="code-lines"><i /><i /><i /><i /><i /></div>
        <small>{label}</small>
      </div>
    );
  }

  return (
    <div className="collection-art product-art" aria-hidden="true">
      <div className="product-orbit orbit-a"><i /></div>
      <div className="product-orbit orbit-b"><i /></div>
      <div className="product-core">S</div>
      <span className="lab-chip chip-a">BUILD</span>
      <span className="lab-chip chip-b">TEST</span>
      <span className="lab-chip chip-c">SHIP</span>
      <small>{label}</small>
    </div>
  );
}

export default function CollectionPage({ collection, projects }: CollectionPageProps) {
  const view = presentation[collection.id] ?? {
    label: collection.eyebrow.toUpperCase(),
    statement: collection.description,
    visualLabel: 'STARLESS / WORK',
  };

  return (
    <div className={`collection-page collection-page-${collection.id}`}>
      <section className="collection-hero">
        <div className="shell collection-hero-grid">
          <div className="collection-hero-copy">
            <a className="collection-back" href={import.meta.env.BASE_URL}>← Starless Studios</a>
            <p className="section-kicker">{view.label}</p>
            <h1>{collection.title}</h1>
            <p className="collection-lead">{view.statement}</p>
            <div className="collection-facts">
              <span>{projects.length.toString().padStart(2, '0')} projects</span>
              <span>{collection.eyebrow}</span>
              <span>Starless Studios</span>
            </div>
          </div>
          <CollectionVisual id={collection.id} label={view.visualLabel} />
        </div>
      </section>

      <section className="band collection-work">
        <div className="shell">
          <div className="collection-work-head">
            <div>
              <p className="section-kicker">Selected work</p>
              <h2>{collection.description}</h2>
            </div>
            <span>{projects.length.toString().padStart(2, '0')} / live</span>
          </div>

          {projects.length > 0 ? (
            <div className="projects collection-projects">
              {projects.map((project) => <ProjectCard project={project} key={project.id} />)}
            </div>
          ) : (
            <div className="empty-project collection-empty">
              <span>Collection open</span>
              <p>The page is ready. New releases in this category will appear here automatically from the site data.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
