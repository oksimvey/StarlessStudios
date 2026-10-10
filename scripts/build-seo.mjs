// Generate real, crawlable static entry points for the Vite SPA.
// Existing /#/collection/... and /#/p/... links are kept as backwards-compatible routes.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const BASE = 'https://oksimvey.github.io/StarlessStudios/';
const DIST = 'dist';
const site = JSON.parse(await readFile('src/data/site.json', 'utf8'));
const template = await readFile(join(DIST, 'index.html'), 'utf8');

const escapeHtml = (value) => String(value ?? '').replace(/&/g, '&amp;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const cleanText = (value) => String(value ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

const projects = site.projects.map((project) => project.id === 'uiforge'
  ? {
      ...project,
      id: 'uiforging',
      name: 'UIForging',
      tagline: 'A visual development workspace for designing, structuring and exporting interfaces with a developer-focused workflow.',
      tags: ['React', 'TypeScript', 'Visual Editor', 'SaaS'],
    }
  : project);

const pages = [{
  kind: 'home',
  path: '',
  title: 'Starless Studios | Roblox Systems, Websites & Developer Tools',
  description: 'Starless Studios creates Roblox Studio systems, developer tools, websites and independent software. Explore our smooth camera system, cutscenes, UI tools and projects.',
}];

for (const collection of site.collections) {
  pages.push({
    kind: 'collection',
    path: 'collection/' + collection.id + '/',
    title: collection.title + ' | Starless Studios',
    description: collection.description + ' Explore the Starless Studios portfolio.',
    collection,
  });
}
for (const project of projects) {
  if (!project.wiki?.length) continue;
  pages.push({
    kind: 'project',
    path: 'p/' + project.id + '/',
    title: project.name + ' | ' + (project.category === 'roblox' ? 'Roblox Studio Systems' : 'Software Projects') + ' | Starless Studios',
    description: project.tagline + ' Features, documentation and project details from Starless Studios.',
    project,
    collection: site.collections.find((collection) => collection.id === project.category),
  });
}

function fallbackFor(page) {
  const collectionLinks = site.collections.map((collection) =>
    '<li><a href="' + BASE + 'collection/' + escapeHtml(collection.id) + '/">' + escapeHtml(collection.title) + '</a></li>'
  ).join('');
  const projectLinks = (page.kind === 'collection'
    ? projects.filter((project) => project.category === page.collection.id)
    : projects
  ).map((project) =>
    '<li><a href="' + BASE + 'p/' + escapeHtml(project.id) + '/">' + escapeHtml(project.name) + '</a> — ' + escapeHtml(project.tagline) + '</li>'
  ).join('');

  let content = '<h1>' + escapeHtml(page.kind === 'home' ? 'Starless Studios' : page.kind === 'collection' ? page.collection.title : page.project.name) + '</h1>';
  content += '<p>' + escapeHtml(page.kind === 'home' ? site.studio.tagline : page.description) + '</p>';

  if (page.kind === 'project') {
    content += '<p><a href="' + BASE + '">Starless Studios</a> / <a href="' + BASE + 'collection/' + escapeHtml(page.collection.id) + '/">' + escapeHtml(page.collection.title) + '</a></p>';
    const sections = page.project.wiki.map((section) => {
      const intro = section.blocks.find((block) => block.type === 'text')?.value;
      return '<li><a href="#' + escapeHtml(section.id) + '">' + escapeHtml(section.title) + '</a>' +
        (intro ? ' — ' + escapeHtml(cleanText(intro).slice(0, 260)) : '') + '</li>';
    }).join('');
    if (sections) content += '<h2>Documentation and features</h2><ul>' + sections + '</ul>';
  } else {
    content += '<h2>Explore our work</h2><ul>' + (page.kind === 'home' ? collectionLinks : projectLinks) + '</ul>';
    if (page.kind === 'home') content += '<h2>Featured projects</h2><ul>' + projectLinks + '</ul>';
    content += '<p><a href="' + escapeHtml(site.studio.links.builtbybit) + '">Starless Studios on BuiltByBit</a></p>';
  }
  // Static HTML is visible without JS, and React replaces it with the corresponding live page.
  return '<div class="seo-content shell">' + content + '</div>';
}

function structuredDataFor(page) {
  if (page.kind === 'home') return null; // original index.html already has Website + Organization schema
  const url = BASE + page.path;
  const crumbs = [
    { name: 'Starless Studios', url: BASE },
    ...(page.kind === 'project' ? [{ name: page.collection.title, url: BASE + 'collection/' + page.collection.id + '/' }] : []),
    { name: page.kind === 'project' ? page.project.name : page.collection.title, url },
  ];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': url + '#webpage',
        url,
        name: page.title,
        description: page.description,
        isPartOf: { '@id': BASE + '#website' },
        publisher: { '@id': BASE + '#organization' },
        breadcrumb: { '@id': url + '#breadcrumb' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': url + '#breadcrumb',
        itemListElement: crumbs.map((crumb, index) => ({
          '@type': 'ListItem', position: index + 1, name: crumb.name, item: crumb.url,
        })),
      },
    ],
  };
}

function renderPage(page) {
  let html = template;
  if (page.kind !== 'home') {
    const url = BASE + page.path;
    const title = escapeHtml(page.title);
    const description = escapeHtml(page.description);
    const image = page.project?.cover ? BASE + page.project.cover.replace(/^\/+/, '') : BASE + 'og-image.png';
    const replacements = [
      [/<title>[^<]*<\/title>/, '<title>' + title + '</title>'],
      [/<meta name="description" content="[^"]*" \/>/, '<meta name="description" content="' + description + '" />'],
      [/<link rel="canonical" href="[^"]*" \/>/, '<link rel="canonical" href="' + url + '" />'],
      [/<meta property="og:title" content="[^"]*" \/>/, '<meta property="og:title" content="' + title + '" />'],
      [/<meta property="og:description" content="[^"]*" \/>/, '<meta property="og:description" content="' + description + '" />'],
      [/<meta property="og:url" content="[^"]*" \/>/, '<meta property="og:url" content="' + url + '" />'],
      [/<meta property="og:image" content="[^"]*" \/>/, '<meta property="og:image" content="' + escapeHtml(image) + '" />'],
      [/<meta property="og:image:alt" content="[^"]*" \/>/, '<meta property="og:image:alt" content="' + title + '" />'],
      [/<meta name="twitter:title" content="[^"]*" \/>/, '<meta name="twitter:title" content="' + title + '" />'],
      [/<meta name="twitter:description" content="[^"]*" \/>/, '<meta name="twitter:description" content="' + description + '" />'],
      [/<meta name="twitter:image" content="[^"]*" \/>/, '<meta name="twitter:image" content="' + escapeHtml(image) + '" />'],
    ];
    for (const [pattern, replacement] of replacements) {
      if (!pattern.test(html)) throw new Error('Missing SEO tag for ' + page.path + ': ' + pattern);
      html = html.replace(pattern, replacement);
    }
    const schema = JSON.stringify(structuredDataFor(page)).replace(/</g, '\\u003c');
    html = html.replace(/<script id="seo-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/,
      '<script id="seo-structured-data" type="application/ld+json">' + schema + '</script>');
  }

  const root = '<div id="root"></div>';
  if (!html.includes(root)) throw new Error('Missing React root in Vite output');
  return html.replace(root, '<div id="root">' + fallbackFor(page) + '</div>');
}

for (const page of pages) {
  const target = join(DIST, page.path, 'index.html');
  await mkdir(join(DIST, page.path), { recursive: true });
  await writeFile(target, renderPage(page), 'utf8');
}

const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  pages.map((page) => '  <url><loc>' + escapeHtml(BASE + page.path) + '</loc></url>').join('\n') +
  '\n</urlset>\n';
await writeFile(join(DIST, 'sitemap.xml'), sitemap, 'utf8');
console.log('SEO: generated ' + pages.length + ' crawlable pages and sitemap.xml');
