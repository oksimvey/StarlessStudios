import type { Project, SiteData } from '../types/site';
import DeadStar from '../graphics/DeadStar';

interface HomeProps {
  data: SiteData;
}

function projectTarget(project: Project) {
  if (project.wiki.length > 0) return `#/p/${project.id}`;
  return project.links[0]?.url ?? null;
}

function ProjectCard({ project }: { project: Project }) {
  const href = projectTarget(project);
  const external = Boolean(href?.startsWith('http'));
  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  const visualStyle = project.cover
    ? { backgroundImage: `url("${project.cover}")` }
    : undefined;

  return (
    <article className="project">
      {href ? (
        <a
          className="project-visual"
          href={href}
          aria-label={project.name}
          style={visualStyle}
          {...linkProps}
        />
      ) : (
        <div className="project-visual" style={visualStyle} aria-hidden="true" />
      )}

      <div className="project-body">
        <h3>{project.name}</h3>
        <p className="desc">{project.tagline}</p>

        <div className="meta">
          <span className="state">{project.status}</span>
          {project.tags.map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>

        {href ? (
          <a className="project-open" href={href} {...linkProps}>
            {project.wiki.length > 0 ? 'Open the wiki' : project.links[0]?.label ?? 'View project'}
          </a>
        ) : (
          <span className="project-open project-open-muted">Details soon</span>
        )}
      </div>
    </article>
  );
}

export default function Home({ data }: HomeProps) {
  const { studio, collections, projects } = data;
  const outlinks = [
    {
      name: 'BuiltByBit',
      url: studio.links.builtbybit,
      description: 'Roblox systems, templates, support, and updates.',
    },
    {
      name: 'YouTube',
      url: studio.links.youtube,
      description: 'Demos, breakdowns, experiments, and devlogs.',
    },
    {
      name: 'TikTok',
      url: studio.links.tiktok,
      description: 'Short clips from whatever is being built today.',
    },
  ];

  return (
    <div className="home">
      <section className="hero">
        <DeadStar />

        <div className="shell">
          <h1>
            Starless<br />
            <span>Studios</span>
          </h1>
          <p>{studio.tagline}</p>
          <div className="hero-actions">
            <a className="btn btn-solid" href="#work">Explore the work</a>
            <a
              className="btn btn-ghost"
              href={studio.links.builtbybit}
              target="_blank"
              rel="noopener noreferrer"
            >
              BuiltByBit
            </a>
          </div>
        </div>

        <p className="hint">Move the cursor through the star</p>
      </section>

      <section className="band work-index" id="work">
        <div className="shell">
          <div className="band-head work-index-head">
            <p className="section-kicker">What we build</p>
            <h2>Three directions. One studio.</h2>
            <p>
              The studio now lives across web work, Roblox development, and our own software products.
              Each area stays independent enough to grow without turning the site into a junk drawer.
            </p>
          </div>

          <div className="collection-nav">
            {collections.map((collection, index) => {
              const count = projects.filter((project) => project.category === collection.id).length;

              return (
                <a className="collection-jump" href={`#${collection.id}`} key={collection.id}>
                  <span className="collection-number">0{index + 1}</span>
                  <span className="collection-copy">
                    <small>{collection.eyebrow}</small>
                    <strong>{collection.title}</strong>
                    <span>{collection.description}</span>
                  </span>
                  <span className="collection-count">
                    {count.toString().padStart(2, '0')} {count === 1 ? 'project' : 'projects'}
                  </span>
                  <span className="collection-arrow" aria-hidden="true">↘</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {collections.map((collection, index) => {
        const collectionProjects = projects.filter((project) => project.category === collection.id);

        return (
          <section className="band work-section" id={collection.id} key={collection.id}>
            <div className="shell">
              <div className="work-section-head">
                <span className="section-index">0{index + 1}</span>
                <div className="band-head">
                  <p className="section-kicker">{collection.eyebrow}</p>
                  <h2>{collection.title}</h2>
                  <p>{collection.description}</p>
                </div>
                <span className="section-total">
                  {collectionProjects.length.toString().padStart(2, '0')} / live
                </span>
              </div>

              {collectionProjects.length > 0 ? (
                <div className="projects">
                  {collectionProjects.map((project) => (
                    <ProjectCard project={project} key={project.id} />
                  ))}
                </div>
              ) : (
                <div className="empty-project">
                  <span>Collection open</span>
                  <p>
                    No public release lives here yet. The section is wired and ready for the first
                    website, client build, or template.
                  </p>
                </div>
              )}
            </div>
          </section>
        );
      })}

      <section className="band" id="studio">
        <div className="shell">
          <div className="band-head">
            <p className="section-kicker">About</p>
            <h2>Studio</h2>
          </div>
          <p className="studio-copy">
            Starless is a small independent studio building across three lanes: websites and templates,
            Roblox systems and tooling, and original software products. The goal stays the same in all
            three — make useful things feel intentional, documented, and finished.
          </p>
        </div>
      </section>

      <section className="band" id="elsewhere">
        <div className="shell">
          <div className="band-head">
            <p className="section-kicker">Links</p>
            <h2>Elsewhere</h2>
          </div>
          <div className="outlinks">
            {outlinks.map(({ name, url, description }) => (
              <a className="outlink" href={url} target="_blank" rel="noopener noreferrer" key={name}>
                <b>{name}</b>
                <span>{description}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
