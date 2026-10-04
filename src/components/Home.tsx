import type { SiteData } from '../types/site';
import DeadStar from '../graphics/DeadStar';

interface HomeProps {
  data: SiteData;
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
              Each area now has its own space, visual language, and project index — without losing the shared Starless identity.
            </p>
          </div>

          <div className="collection-nav">
            {collections.map((collection, index) => {
              const count = projects.filter((project) => project.category === collection.id).length;

              return (
                <a className="collection-jump" href={`#/collection/${collection.id}`} key={collection.id}>
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
