import { useEffect, useState } from 'react';
import type { Project } from '../types/site';
import WikiBlock from './WikiBlock';

interface WikiProps {
  project: Project;
}

export default function Wiki({ project }: WikiProps) {
  const [activeSection, setActiveSection] = useState(project.wiki[0]?.id ?? '');

  useEffect(() => {
    setActiveSection(project.wiki[0]?.id ?? '');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      }
    }, { rootMargin: '-104px 0px -65% 0px' });

    for (const section of project.wiki) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [project]);

  return (
    <div className="wiki shell">
      <p className="crumb">
        <a href="#/">Starless Studios</a>
        {' / '}{project.name}
      </p>
      <h1 className="wiki-title">{project.name}</h1>
      <p className="wiki-sub">{project.tagline}</p>

      <div className="meta">
        <span className="state">{project.status}</span>
        {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        {project.links.map((link) => (
          <a
            className="project-open"
            style={{ margin: 0 }}
            key={link.url + link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="wiki-body">
        <nav className="toc" aria-label="Sections">
          <ol>
            {project.wiki.map((section) => (
              <li key={section.id}>
                <a
                  href={`#/p/${project.id}/${section.id}`}
                  className={activeSection === section.id ? 'on' : undefined}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="doc">
          {project.wiki.map((section) => (
            <section id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.blocks.map((block, index) => (
                <WikiBlock block={block} key={`${section.id}-${index}`} />
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
