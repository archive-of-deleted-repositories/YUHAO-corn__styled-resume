import { useState, useMemo, useCallback, useRef } from 'react';
import ShadcnPreview from './templates/shadcn/PreviewTemplate';
import { parseMarkdown } from './parser/markdown-parser';
import { DEFAULT_MARKDOWN } from './data/default-markdown';

function App() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const previewRef = useRef<HTMLDivElement>(null);

  const resumeData = useMemo(() => {
    try {
      return parseMarkdown(markdown);
    } catch {
      return { header: { name: '', title: '' } };
    }
  }, [markdown]);

  const charCount = markdown.replace(/\s/g, '').length;

  const handleExportPdf = useCallback(() => {
    if (!previewRef.current) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const previewHtml = previewRef.current.innerHTML;
    printWindow.document.write(`<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<title>${resumeData.header.name || 'Resume'}-简历</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .resume-card { box-shadow: none !important; border: none !important; border-radius: 0 !important; }
  }
</style>
</head><body>${previewHtml}</body></html>`);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  }, [resumeData]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 16px', background: '#09090b',
        borderBottom: '1px solid #27272a',
      }}>
        <span style={{
          fontSize: '14px', fontWeight: 700, color: '#fafafa',
          fontFamily: '"JetBrains Mono", monospace',
          letterSpacing: '-0.02em',
        }}>
          md-resume
        </span>
        <button
          onClick={handleExportPdf}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '6px 14px', borderRadius: '6px', border: 'none',
            background: '#fafafa', color: '#18181b',
            fontSize: '12px', fontWeight: 600, cursor: 'pointer',
            fontFamily: '"JetBrains Mono", monospace',
            transition: 'all 0.15s',
          }}
        >
          下载 PDF
        </button>
      </div>

      {/* Workspace */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
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
          <div ref={previewRef}>
            <ShadcnPreview data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;