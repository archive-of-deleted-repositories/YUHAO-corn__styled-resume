type Locale = 'zh' | 'en';

const messages: Record<Locale, Record<string, string>> = {
  zh: {
    brand: 'styled-resume',
    exportPdf: '下载 PDF',
    exportHtml: '导出 HTML',
    shareLink: '分享链接',
    linkCopied: '链接已复制到剪贴板',
    editorLabel: 'resume.md',
    charCount: '{n} 字',
    viewFooter: '使用 styled-resume 制作你的简历',
  },
  en: {
    brand: 'styled-resume',
    exportPdf: 'PDF',
    exportHtml: 'HTML',
    shareLink: 'Share',
    linkCopied: 'Link copied to clipboard',
    editorLabel: 'resume.md',
    charCount: '{n} chars',
    viewFooter: 'Built with styled-resume',
  },
};

function detectLocale(): Locale {
  try {
    const lang = navigator.language || '';
    return lang.startsWith('zh') ? 'zh' : 'en';
  } catch {
    return 'en';
  }
}

export const locale: Locale = detectLocale();

export function t(key: string, params?: Record<string, string | number>): string {
  let text = messages[locale]?.[key] || messages.en[key] || key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(`{${k}}`, String(v));
    }
  }
  return text;
}
