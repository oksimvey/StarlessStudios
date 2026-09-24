import type { WikiBlockData } from '../types/site';
import CodeBlock from './CodeBlock';

interface WikiBlockProps {
  block: WikiBlockData;
}

/** Inline HTML comes from src/data/site.json, an editable, trusted local file. */
function InlineMarkup({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function WikiBlock({ block }: WikiBlockProps) {
  switch (block.type) {
    case 'heading':
      return <h3><InlineMarkup html={block.value} /></h3>;

    case 'text':
      return <p><InlineMarkup html={block.value} /></p>;

    case 'list':
      return (
        <ul>
          {block.items.map((item, index) => (
            <li key={index}><InlineMarkup html={item} /></li>
          ))}
        </ul>
      );

    case 'note':
      return (
        <div className="note">
          {block.title && <><b>{block.title}.</b>{' '}</>}
          <InlineMarkup html={block.value} />
        </div>
      );

    case 'divider':
      return <hr className="rule" />;

    case 'image':
      return (
        <figure>
          {block.url ? (
            <img src={block.url} alt={block.caption ?? ''} loading="lazy" />
          ) : (
            <div className="embed" aria-label="Image pending" />
          )}
          {(block.caption || !block.url) && (
            <figcaption>{block.caption || 'Image pending'}</figcaption>
          )}
        </figure>
      );

    case 'video':
      return (
        <figure>
          <div className="embed">
            <iframe
              src={block.url}
              title={block.caption || 'Video'}
              loading="lazy"
              allowFullScreen
              allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
            />
          </div>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );

    case 'code':
      return <CodeBlock block={block} />;
  }
}
