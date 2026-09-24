import type { SiteData } from '../types/site';
import DeadStar from '../graphics/DeadStar';

interface HomeProps {
  data: SiteData;
}

export default function Home({ data }: HomeProps) {
  const { studio, projects } = data;
  const outlinks = [
    {
      name: 'BuiltByBit',
      url: studio.links.builtbybit,
      description: 'Buy the systems, with support and updates.',
    },
    {
      name: 'YouTube',
      url: studio.links.youtube,
      description: 'Demos, breakdowns, and the occasional devlog.',
    },
    {
      name: 'TikTok',
      url: studio.links.tiktok,
      description: 'Short clips of whatever is on the screen today.',
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
            <a className="btn btn-solid" href="#work">See the projects</a>
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

      <section className="band" id="work">
        <div className="shell">
          <div className="band-head">
            <h2>Roblox Studio projects</h2>
            <p>Each one ships with a full wiki — setup, API, and the parts that usually break.</p>
          </div>
          <div className="projects">
            {projects.map((project) => (
              <article className="project" key={project.id}>
                <a
                  className="project-visual"
                  href={`#/p/${project.id}`}
                  aria-label={project.name}
                  style={project.cover ? { backgroundImage: `url("${project.cover}")` } : undefined}
                />
                <div className="project-body">
                  <h3>{project.name}</h3>
                  <p className="desc">{project.tagline}</p>
                  <div className="meta">
                    <span className="state">{project.status}</span>
                    {project.tags.map((tag) => (
                      <span className="tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                  <a className="project-open" href={`#/p/${project.id}`}>
                    Open the wiki
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band" id="studio">
        <div className="shell">
          <div className="band-head"><h2>Studio</h2></div>
          <p style={{ maxWidth: '60ch', color: 'var(--grey)', margin: 0, fontSize: '1.05rem', fontWeight: 300 }}>
            A one-person studio making systems for Roblox — camera rigs, interface tooling, the kind of
            plumbing you would rather not write twice. Everything is documented before it is sold, and the
            documentation lives here, not in a zip file.
          </p>
        </div>
      </section>

      <section className="band" id="elsewhere">
        <div className="shell">
          <div className="band-head"><h2>Elsewhere</h2></div>
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
