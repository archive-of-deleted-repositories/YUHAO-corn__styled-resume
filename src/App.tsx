import { useState, useMemo } from 'react';
import ShadcnPreview from './templates/shadcn/PreviewTemplate';
import { parseMarkdown } from './parser/markdown-parser';
import { DEFAULT_MARKDOWN } from './data/default-markdown';

function App() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);

  const resumeData = useMemo(() => {
    try {
      return parseMarkdown(markdown);
    } catch {
      return { header: { name: '', title: '' } };
    }
  }, [markdown]);

  const charCount = markdown.replace(/\s/g, '').length;

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Editor Panel */}
      <div style={{
        width: '50%', display: 'flex', flexDirection: 'column',
        borderRight: '1px solid #27272a', background: '#18181b',
      }}>
        <div style={{
          padding: '12px 16px', borderBottom: '1px solid #27272a',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{
            fontSize: '13px', fontWeight: 600, color: '#a1a1aa',
            fontFamily: '"JetBrains Mono", monospace',
          }}>
            resume.md
          </span>
          <span style={{
            fontSize: '11px', color: '#52525b',
            fontFamily: '"JetBrains Mono", monospace',
          }}>
            {charCount} 字
          </span>
        </div>
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          spellCheck={false}
          style={{
            flex: 1, resize: 'none', border: 'none', outline: 'none',
            padding: '20px', fontSize: '13px', lineHeight: 1.7,
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            background: '#09090b', color: '#e4e4e7',
            tabSize: 2,
          }}
        />
      </div>

      {/* Preview Panel */}
      <div style={{
        width: '50%', overflow: 'auto', background: '#f4f4f5',
      }}>
        <ShadcnPreview data={resumeData} />
      </div>
    </div>
  );
}

export default App;
