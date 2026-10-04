import type { WikiBlockData } from '../types/site';
import CodeBlock from './CodeBlock';

interface WikiBlockProps {
  block: WikiBlockData;
}

/** Inline HTML comes from src/data/site.json, an editable, trusted local file. */
function InlineMarkup({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

function resolveMediaUrl(url: string) {
  if (!url) return '';

  if (
    /^(?:https?:)?\/\//i.test(url)
    || url.startsWith('data:')
    || url.startsWith('blob:')
    || url.startsWith('/')
  ) {
    return url;
  }

  return `${import.meta.env.BASE_URL}${url.replace(/^\.\//, '')}`;
}

function isVideoFile(url: string) {
  return /\.(?:mp4|webm|ogg)(?:[?#].*)?$/i.test(url);
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

    case 'image': {
      const src = resolveMediaUrl(block.url);

      return (
        <figure>
          {src ? (
            <img src={src} alt={block.caption ?? ''} loading="lazy" />
          ) : (
            <div className="embed" aria-label="Image pending" />
          )}
          {(block.caption || !src) && (
            <figcaption>{block.caption || 'Image pending'}</figcaption>
          )}
        </figure>
      );
    }

    case 'video': {
      const src = resolveMediaUrl(block.url);
      const localVideo = isVideoFile(src);

      return (
        <figure>
          <div className="embed">
            {!src ? (
              <div aria-label="Video pending" />
            ) : localVideo ? (
              <video
                src={src}
                controls
                playsInline
                preload="metadata"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  background: '#000',
                }}
              />
            ) : (
              <iframe
                src={src}
                title={block.caption || 'Video'}
                loading="lazy"
                allowFullScreen
                allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
              />
            )}
          </div>
          {(block.caption || !src) && (
            <figcaption>{block.caption || 'Video pending'}</figcaption>
          )}
        </figure>
      );
    }

    case 'code':
      return <CodeBlock block={block} />;
  }
}
