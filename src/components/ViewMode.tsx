import { useRef } from 'react';
import { getTemplate } from '../templates/registry';
import type { ResumeData } from '../types/resume';

interface ViewModeProps {
  templateId: string;
  data: ResumeData;
}

export default function ViewMode({ templateId, data }: ViewModeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const template = getTemplate(templateId);
  const Preview = template.component;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f4f4f5',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <div ref={ref} style={{ width: '100%' }}>
        <Preview data={data} />
      </div>
      <footer style={{
        padding: '24px 0 32px',
        textAlign: 'center',
        fontSize: '13px',
        color: '#a1a1aa',
        fontFamily: '"JetBrains Mono", monospace',
      }}>
        <a
          href={window.location.origin + window.location.pathname}
          style={{ color: '#71717a', textDecoration: 'none' }}
        >
          使用 styled-resume 制作你的简历
        </a>
      </footer>
    </div>
  );
}
