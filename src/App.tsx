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
    const title = `${resumeData.header.name || 'Resume'}-简历`;

    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${title}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }

  @page {
    size: 210mm 297mm;
    margin: 0;
  }

  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    width: 210mm;
  }

  /* 外层容器：去掉 100vh、渐变、padding */
  body > div {
    min-height: auto !important;
    background: white !important;
    padding: 0 !important;
    display: block !important;
  }

  /* 卡片：撑满宽度，去掉装饰 */
  .resume-card {
    max-width: 100% !important;
    border-radius: 0 !important;
    border: none !important;
    box-shadow: none !important;
  }

  /* 禁用所有动画 */
  .resume-card,
  .section-block,
  .bullet-item {
    animation: none !important;
  }
</style>
</head>
<body>${previewHtml}</body>
</html>`);
    printWindow.document.close();

    const triggerPrint = () => {
      // 量出内容实际高度，动态设置页面尺寸，实现单页连续 PDF
      const contentHeight = printWindow.document.body.scrollHeight;
      const heightMm = Math.ceil(contentHeight * 25.4 / 96) + 1; // px → mm，+1 防止四舍五入截断
      const pageStyle = printWindow.document.createElement('style');
      pageStyle.textContent = `@page { size: 210mm ${heightMm}mm; margin: 0; }`;
      printWindow.document.head.appendChild(pageStyle);
      printWindow.print();
    };

    if (printWindow.document.fonts) {
      printWindow.document.fonts.ready.then(triggerPrint);
    } else {
      printWindow.onload = () => setTimeout(triggerPrint, 500);
    }
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