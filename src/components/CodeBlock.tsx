import { useEffect, useMemo, useRef, useState } from 'react';
import hljs from 'highlight.js/lib/core';
import lua from 'highlight.js/lib/languages/lua';
import type { CodeBlockData } from '../types/site';

hljs.registerLanguage('lua', lua);

interface CodeBlockProps {
  block: CodeBlockData;
}

export default function CodeBlock({ block }: CodeBlockProps) {
  const [copyLabel, setCopyLabel] = useState('Copy');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const language = block.lang ?? 'lua';

  const highlighted = useMemo(() => {
    if (!hljs.getLanguage(language)) return null;
    try {
      return hljs.highlight(block.value, { language }).value;
    } catch {
      return null;
    }
  }, [block.value, language]);

  useEffect(() => () => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
  }, []);

  async function copy() {
    if (!navigator.clipboard?.writeText) {
      setCopyLabel('Press Ctrl+C');
      return;
    }
    try {
      await navigator.clipboard.writeText(block.value);
      setCopyLabel('Copied');
      if (timerRef.current !== null) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopyLabel('Copy'), 1600);
    } catch {
      setCopyLabel('Press Ctrl+C');
    }
  }

  return (
    <div className="code">
      <header>
        <span>{block.file ?? language}</span>
        <button type="button" onClick={() => void copy()} aria-live="polite">
          {copyLabel}
        </button>
      </header>
      <pre><code className="hljs">{highlighted === null
        ? block.value
        : <span dangerouslySetInnerHTML={{ __html: highlighted }} />}
      </code></pre>
    </div>
  );
}
