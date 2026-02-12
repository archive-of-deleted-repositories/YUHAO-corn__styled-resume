import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { templates, getTemplate } from './templates/registry';
import { parseMarkdown } from './parser/markdown-parser';
import { DEFAULT_MARKDOWN } from './data/default-markdown';
import { isViewMode, decodeShareUrl, encodeShareUrl } from './utils/share';
import { exportHtml } from './utils/export-html';
import ViewMode from './components/ViewMode';

const STORAGE_KEY = 'md-resume:markdown';
const TEMPLATE_KEY = 'md-resume:template';

function loadMarkdown() {
  try {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_MARKDOWN;
  } catch {
    return DEFAULT_MARKDOWN;
  }
}

function App() {
  // View mode: render shared resume without editor
  const [viewPayload] = useState(() => isViewMode() ? decodeShareUrl(window.location.hash) : null);
  if (viewPayload) {
    return <ViewMode templateId={viewPayload.t} data={viewPayload.d} />;
  }

  const [markdown, setMarkdown] = useState(loadMarkdown);
  const [templateId, setTemplateId] = useState(
    () => localStorage.getItem(TEMPLATE_KEY) || 'shadcn'
  );
  const [toast, setToast] = useState('');
  const previewRef = useRef<HTMLDivElement>(null);

  const template = getTemplate(templateId);
  const PreviewComponent = template.component;

  const resumeData = useMemo(() => {
    try {
      return parseMarkdown(markdown);
    } catch {
      return { header: { name: '', title: '' } };
    }
  }, [markdown]);

  const charCount = markdown.replace(/\s/g, '').length;

  // 自动保存到 localStorage（500ms 防抖）
  useEffect(() => {
    const timer = setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, markdown); } catch {}
    }, 500);
    return () => clearTimeout(timer);
  }, [markdown]);

  useEffect(() => {
    try { localStorage.setItem(TEMPLATE_KEY, templateId); } catch {}
  }, [templateId]);

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

  const handleExportHtml = useCallback(() => {
    if (!previewRef.current) return;
    const title = `${resumeData.header.name || 'Resume'}-简历`;
    exportHtml(previewRef.current, title);
  }, [resumeData]);

  const handleShareLink = useCallback(() => {
    const url = encodeShareUrl(templateId, resumeData);
    navigator.clipboard.writeText(url).then(() => {
      setToast('链接已复制到剪贴板');
      setTimeout(() => setToast(''), 2000);
    });
  }, [templateId, resumeData]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 16px', background: '#09090b',
        borderBottom: '1px solid #27272a',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            fontSize: '14px', fontWeight: 700, color: '#fafafa',
            fontFamily: '"JetBrains Mono", monospace',
            letterSpacing: '-0.02em',
          }}>
            md-resume
          </span>
          <div style={{ display: 'flex', gap: '4px', padding: '2px', borderRadius: '6px', background: '#27272a' }}>
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => !t.disabled && setTemplateId(t.id)}
                style={{
                  padding: '3px 10px', borderRadius: '4px', border: 'none',
                  fontSize: '11px', fontWeight: 500,
                  fontFamily: '"JetBrains Mono", monospace',
                  cursor: t.disabled ? 'not-allowed' : 'pointer',
                  transition: 'all 0.15s',
                  background: templateId === t.id ? '#fafafa' : 'transparent',
                  color: t.disabled ? '#52525b' : templateId === t.id ? '#18181b' : '#a1a1aa',
                  opacity: t.disabled ? 0.5 : 1,
                }}
              >
                {t.name}{t.disabled ? ' ⏳' : ''}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={handleShareLink}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '6px',
              border: '1px solid #3f3f46',
              background: 'transparent', color: '#a1a1aa',
              fontSize: '12px', fontWeight: 600, cursor: 'pointer',
              fontFamily: '"JetBrains Mono", monospace',
              transition: 'all 0.15s',
            }}
          >
            分享链接
          </button>
          <button
            onClick={handleExportHtml}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '6px',
              border: '1px solid #3f3f46',
              background: 'transparent', color: '#a1a1aa',
              fontSize: '12px', fontWeight: 600, cursor: 'pointer',
              fontFamily: '"JetBrains Mono", monospace',
              transition: 'all 0.15s',
            }}
          >
            导出 HTML
          </button>
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
            <PreviewComponent data={resumeData} />
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
          padding: '8px 20px', borderRadius: '8px',
          background: '#18181b', color: '#fafafa', border: '1px solid #3f3f46',
          fontSize: '13px', fontFamily: '"JetBrains Mono", monospace',
          zIndex: 9999,
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;