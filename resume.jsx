import { useState } from "react";

// ── shadcn-inspired Resume ──
// Aesthetic: Refined minimalism with crisp borders, careful typography hierarchy,
// monochrome palette with subtle zinc tones, and tasteful micro-interactions.

const RESUME_DATA = {
  header: {
    name: "张三",
    title: "产品经理",
    github: "github.com/zhangsan",
    website: "zhangsan.dev",
    phone: "+86 138-0000-0000",
    email: "zhangsan@example.com",
  },
  summary:
    "拥有 5 年互联网产品经验的产品经理，擅长从 0 到 1 搭建产品体系。曾主导多款用户量级百万的 SaaS 产品，对用户增长、数据驱动决策及跨团队协作有深刻理解。热衷于用技术思维解决产品问题，具备良好的前后端技术认知。",
  projects: [
    {
      name: "AI 智能客服平台",
      repo: "github.com/zhangsan/ai-support",
      overview: "基于 LLM 的智能客服系统，实现多轮对话与意图识别",
      bullets: [
        "主导产品从 0-1 设计，完成需求调研、竞品分析、PRD 撰写与原型设计",
        "设计多轮对话引擎架构，支持意图识别准确率达 92%",
        "搭建数据看板体系，日均处理工单量提升 180%",
        "协调前后端与算法团队，按期交付 3 个大版本迭代",
      ],
      techStack: ["React", "Node.js", "Python", "LangChain", "PostgreSQL"],
    },
    {
      name: "SaaS 协作工具",
      repo: "github.com/zhangsan/collab-tool",
      overview: "面向中小团队的项目管理与文档协作平台",
      bullets: [
        "负责核心模块产品设计，包括任务看板、文档协作与权限体系",
        "通过用户访谈与数据分析优化核心流程，用户留存率提升 35%",
        "设计灵活的插件化架构方案，支持第三方集成",
      ],
      techStack: ["Next.js", "Tailwind CSS", "Supabase"],
    },
  ],
  experience: [
    {
      company: "字节跳动",
      position: "高级产品经理",
      period: "2022.03 – 至今",
      overview: "负责企业级 SaaS 产品线的规划与落地",
      bullets: [
        "主导 B 端产品战略规划，年 ARR 增长 200%",
        "建立产品数据指标体系，推动数据驱动决策文化落地",
        "管理 5 人产品团队，制定季度 OKR 并追踪执行",
        "与销售、客户成功团队紧密协作，构建客户反馈闭环",
      ],
    },
    {
      company: "阿里巴巴",
      position: "产品经理",
      period: "2020.06 – 2022.02",
      overview: "负责电商中台产品模块设计与优化",
      bullets: [
        "设计商品中心与订单中心核心模块，支撑日均百万级订单处理",
        "推动搜索推荐算法优化，商品点击率提升 25%",
        "主导用户端体验升级项目，NPS 评分提升 15 个百分点",
      ],
    },
    {
      company: "美团",
      position: "产品实习生",
      period: "2019.07 – 2019.12",
    },
  ],
  education: [
    {
      school: "北京大学",
      degree: "硕士",
      major: "信息管理与信息系统",
      period: "2018.09 – 2020.06",
    },
    {
      school: "武汉大学",
      degree: "本科",
      major: "计算机科学与技术",
      period: "2014.09 – 2018.06",
    },
  ],
  skills: [
    "产品设计与原型工具 (Figma / Axure / Sketch)",
    "数据分析 (SQL / Python / Tableau / Google Analytics)",
    "技术理解 (REST API / 微服务架构 / 基础前后端开发)",
    "项目管理 (Scrum / JIRA / Notion / 飞书多维表格)",
    "AI & LLM 应用 (Prompt Engineering / RAG / Agent 设计)",
  ],
  appendix: [
    {
      title: "产品架构图 — AI 智能客服平台",
      description: "展示系统整体架构与核心模块交互关系",
      placeholder: true, // set to false and provide imageUrl when you have a real image
      imageUrl: "",
    },
    {
      title: "用户增长数据看板截图",
      description: "核心业务指标 Dashboard，展示关键增长曲线",
      placeholder: true,
      imageUrl: "",
    },
  ],
};

// ── Icons ──
function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function GraduationCapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function ImagePlaceholderIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

// ── Badge Component ──
function Badge({ children, variant = "default" }) {
  const base =
    "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset transition-colors duration-150";
  const variants = {
    default: "bg-zinc-900 text-zinc-100 ring-zinc-700",
    secondary: "bg-zinc-100 text-zinc-700 ring-zinc-200",
    outline: "bg-transparent text-zinc-500 ring-zinc-200",
  };
  return <span className={`${base} ${variants[variant]}`}>{children}</span>;
}

// ── Section Header ──
function SectionHeader({ icon, title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "28px",
          height: "28px",
          borderRadius: "6px",
          background: "#18181b",
          color: "#fafafa",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <h2
        style={{
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: "#18181b",
          margin: 0,
        }}
      >
        {title}
      </h2>
      <div style={{ flex: 1, height: "1px", background: "#e4e4e7", marginLeft: "8px" }} />
    </div>
  );
}

// ── Contact Chip ──
function ContactChip({ icon, text, href }) {
  const inner = (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 10px",
        borderRadius: "6px",
        border: "1px solid #e4e4e7",
        fontSize: "12.5px",
        color: "#3f3f46",
        background: "#fafafa",
        cursor: href ? "pointer" : "default",
        transition: "all 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#f4f4f5";
        e.currentTarget.style.borderColor = "#a1a1aa";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#fafafa";
        e.currentTarget.style.borderColor = "#e4e4e7";
      }}
    >
      <span style={{ color: "#71717a", display: "flex" }}>{icon}</span>
      {text}
    </span>
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        {inner}
      </a>
    );
  }
  return inner;
}

// ── Main Resume Component ──
export default function Resume() {
  const d = RESUME_DATA;
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredExp, setHoveredExp] = useState(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #fafafa 0%, #f0f0f2 100%)",
        display: "flex",
        justifyContent: "center",
        padding: "40px 16px",
        fontFamily:
          '"Source Han Sans SC", "Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .resume-card {
          animation: fadeInUp 0.5s ease-out both;
        }
        
        .section-block {
          animation: fadeInUp 0.4s ease-out both;
        }
        
        .bullet-item {
          animation: slideInLeft 0.3s ease-out both;
        }
        
        @media print {
          body { background: white !important; }
          .resume-card { box-shadow: none !important; border: none !important; }
        }
      `}</style>

      <div
        className="resume-card"
        style={{
          width: "100%",
          maxWidth: "720px",
          background: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e4e4e7",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
          overflow: "hidden",
        }}
      >
        {/* ═══ HEADER ═══ */}
        <div
          style={{
            padding: "32px 36px 28px",
            borderBottom: "1px solid #e4e4e7",
            background: "linear-gradient(135deg, #18181b 0%, #27272a 100%)",
            color: "#fafafa",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* subtle grid pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.04,
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h1
                  style={{
                    fontSize: "32px",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    marginBottom: "6px",
                    fontFamily: '"Noto Sans SC", sans-serif',
                  }}
                >
                  {d.header.name}
                </h1>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: 400,
                    color: "#a1a1aa",
                    letterSpacing: "0.02em",
                  }}
                >
                  {d.header.title}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "12px",
                  color: "#a1a1aa",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                <span style={{ marginLeft: "4px" }}>Open to work</span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "20px",
              }}
            >
              <ContactChipDark icon={<GithubIcon />} text={d.header.github} />
              <ContactChipDark icon={<GlobeIcon />} text={d.header.website} />
              <ContactChipDark icon={<PhoneIcon />} text={d.header.phone} />
              <ContactChipDark icon={<MailIcon />} text={d.header.email} />
            </div>
          </div>
        </div>

        {/* ═══ BODY ═══ */}
        <div style={{ padding: "28px 36px 36px" }}>
          {/* ── Summary ── */}
          <div className="section-block" style={{ marginBottom: "28px", animationDelay: "0.1s" }}>
            <SectionHeader icon={<UserIcon />} title="个人简介" />
            <p
              style={{
                fontSize: "13.5px",
                lineHeight: 1.75,
                color: "#3f3f46",
                paddingLeft: "36px",
              }}
            >
              {d.summary}
            </p>
          </div>

          {/* ── Projects ── */}
          <div className="section-block" style={{ marginBottom: "28px", animationDelay: "0.2s" }}>
            <SectionHeader icon={<FolderIcon />} title="项目经历" />
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingLeft: "36px" }}>
              {d.projects.map((proj, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredProject(i)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{
                    padding: "16px 18px",
                    borderRadius: "8px",
                    border: "1px solid",
                    borderColor: hoveredProject === i ? "#a1a1aa" : "#e4e4e7",
                    background: hoveredProject === i ? "#fafafa" : "#fff",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px", flexWrap: "wrap", gap: "8px" }}>
                    <h3 style={{ fontSize: "14.5px", fontWeight: 600, color: "#18181b" }}>
                      {proj.name}
                    </h3>
                    <a
                      href={`https://${proj.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "12px",
                        color: "#71717a",
                        textDecoration: "none",
                        fontFamily: '"JetBrains Mono", monospace',
                      }}
                    >
                      <GithubIcon /> {proj.repo.split("/").slice(-1)[0]}
                      <ExternalLinkIcon />
                    </a>
                  </div>
                  <p style={{ fontSize: "12.5px", color: "#71717a", marginBottom: "10px" }}>
                    {proj.overview}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px 0" }}>
                    {proj.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="bullet-item"
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "8px",
                          fontSize: "13px",
                          lineHeight: 1.65,
                          color: "#3f3f46",
                          marginBottom: "4px",
                          animationDelay: `${0.3 + j * 0.05}s`,
                        }}
                      >
                        <span
                          style={{
                            width: "4px",
                            height: "4px",
                            borderRadius: "50%",
                            background: "#a1a1aa",
                            flexShrink: 0,
                            marginTop: "8px",
                          }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {proj.techStack && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {proj.techStack.map((t, k) => (
                        <span
                          key={k}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: "11px",
                            fontWeight: 500,
                            fontFamily: '"JetBrains Mono", monospace',
                            background: "#f4f4f5",
                            color: "#52525b",
                            border: "1px solid #e4e4e7",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Experience ── */}
          <div className="section-block" style={{ marginBottom: "28px", animationDelay: "0.3s" }}>
            <SectionHeader icon={<BriefcaseIcon />} title="工作经历" />
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", paddingLeft: "36px" }}>
              {d.experience.map((exp, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredExp(i)}
                  onMouseLeave={() => setHoveredExp(null)}
                  style={{
                    position: "relative",
                    paddingLeft: "20px",
                    borderLeft: "2px solid",
                    borderColor: hoveredExp === i ? "#18181b" : "#e4e4e7",
                    transition: "border-color 0.2s ease",
                  }}
                >
                  {/* timeline dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: "-5px",
                      top: "4px",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: hoveredExp === i ? "#18181b" : "#a1a1aa",
                      transition: "background 0.2s ease",
                    }}
                  />
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "4px", marginBottom: "2px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <h3 style={{ fontSize: "14.5px", fontWeight: 600, color: "#18181b" }}>
                        {exp.company}
                      </h3>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#fafafa",
                          background: "#18181b",
                          padding: "1px 8px",
                          borderRadius: "4px",
                          fontWeight: 500,
                        }}
                      >
                        {exp.position}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#a1a1aa",
                        fontFamily: '"JetBrains Mono", monospace',
                        fontWeight: 400,
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>
                  {exp.overview && (
                    <p style={{ fontSize: "12.5px", color: "#71717a", margin: "4px 0 8px" }}>
                      {exp.overview}
                    </p>
                  )}
                  {exp.bullets && (
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {exp.bullets.map((b, j) => (
                        <li
                          key={j}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "8px",
                            fontSize: "13px",
                            lineHeight: 1.65,
                            color: "#3f3f46",
                            marginBottom: "3px",
                          }}
                        >
                          <span
                            style={{
                              width: "4px",
                              height: "4px",
                              borderRadius: "50%",
                              background: "#a1a1aa",
                              flexShrink: 0,
                              marginTop: "8px",
                            }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Education ── */}
          <div className="section-block" style={{ marginBottom: "28px", animationDelay: "0.4s" }}>
            <SectionHeader icon={<GraduationCapIcon />} title="教育经历" />
            <div style={{ paddingLeft: "36px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {d.education.map((edu, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "8px",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid #e4e4e7",
                    background: "#fafafa",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: "14.5px", fontWeight: 600, color: "#18181b" }}>
                      {edu.school}
                    </h3>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#fafafa",
                        background: "#18181b",
                        padding: "1px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {edu.degree}
                    </span>
                    <span style={{ fontSize: "13px", color: "#71717a" }}>{edu.major}</span>
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#a1a1aa",
                      fontFamily: '"JetBrains Mono", monospace',
                    }}
                  >
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Skills ── */}
          <div className="section-block" style={{ animationDelay: "0.5s" }}>
            <SectionHeader icon={<ZapIcon />} title="技能" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", paddingLeft: "36px" }}>
              {d.skills.map((skill, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "6px 14px",
                    borderRadius: "6px",
                    fontSize: "12.5px",
                    color: "#3f3f46",
                    background: "#fafafa",
                    border: "1px solid #e4e4e7",
                    transition: "all 0.15s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#18181b";
                    e.currentTarget.style.color = "#fafafa";
                    e.currentTarget.style.borderColor = "#18181b";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#fafafa";
                    e.currentTarget.style.color = "#3f3f46";
                    e.currentTarget.style.borderColor = "#e4e4e7";
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* ── Appendix ── */}
          {d.appendix && d.appendix.length > 0 && (
            <div className="section-block" style={{ marginTop: "28px", animationDelay: "0.6s" }}>
              <SectionHeader icon={<PaperclipIcon />} title="附录" />
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingLeft: "36px" }}>
                {d.appendix.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #e4e4e7",
                      overflow: "hidden",
                      background: "#fff",
                    }}
                  >
                    {/* Appendix item header */}
                    <div
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid #e4e4e7",
                        background: "#fafafa",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <h4 style={{ fontSize: "13.5px", fontWeight: 600, color: "#18181b", margin: 0 }}>
                          附录 {String.fromCharCode(65 + i)}：{item.title}
                        </h4>
                        {item.description && (
                          <p style={{ fontSize: "12px", color: "#a1a1aa", margin: "2px 0 0" }}>
                            {item.description}
                          </p>
                        )}
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 500,
                          color: "#a1a1aa",
                          fontFamily: '"JetBrains Mono", monospace',
                          padding: "2px 8px",
                          borderRadius: "4px",
                          background: "#f4f4f5",
                          border: "1px solid #e4e4e7",
                        }}
                      >
                        Fig.{i + 1}
                      </span>
                    </div>
                    {/* Image area */}
                    <div style={{ padding: "4px" }}>
                      {item.placeholder || !item.imageUrl ? (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            minHeight: "200px",
                            borderRadius: "6px",
                            background:
                              "repeating-conic-gradient(#f4f4f5 0% 25%, transparent 0% 50%) 50% / 16px 16px",
                            color: "#a1a1aa",
                            gap: "10px",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            border: "2px dashed #e4e4e7",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#a1a1aa";
                            e.currentTarget.style.background =
                              "repeating-conic-gradient(#ececef 0% 25%, transparent 0% 50%) 50% / 16px 16px";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "#e4e4e7";
                            e.currentTarget.style.background =
                              "repeating-conic-gradient(#f4f4f5 0% 25%, transparent 0% 50%) 50% / 16px 16px";
                          }}
                        >
                          <ImagePlaceholderIcon />
                          <span style={{ fontSize: "12.5px", fontWeight: 500 }}>
                            在此处粘贴图片
                          </span>
                          <span style={{ fontSize: "11px", color: "#d4d4d8" }}>
                            替换 imageUrl 字段或直接插入图片链接
                          </span>
                        </div>
                      ) : (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          style={{
                            width: "100%",
                            borderRadius: "6px",
                            display: "block",
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ═══ FOOTER ═══ */}
        <div
          style={{
            padding: "16px 36px",
            borderTop: "1px solid #e4e4e7",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#fafafa",
          }}
        >
          <span style={{ fontSize: "11px", color: "#a1a1aa" }}>
            Built with shadcn/ui style
          </span>
          <span style={{ fontSize: "11px", color: "#a1a1aa", fontFamily: '"JetBrains Mono", monospace' }}>
            Updated 2026.02
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Dark contact chip for header ──
function ContactChipDark({ icon, text }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "5px 12px",
        borderRadius: "6px",
        border: "1px solid rgba(255,255,255,0.1)",
        fontSize: "12.5px",
        color: "#a1a1aa",
        background: "rgba(255,255,255,0.05)",
        cursor: "default",
        transition: "all 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.1)";
        e.currentTarget.style.color = "#e4e4e7";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        e.currentTarget.style.color = "#a1a1aa";
      }}
    >
      <span style={{ display: "flex", color: "#71717a" }}>{icon}</span>
      {text}
    </span>
  );
}
