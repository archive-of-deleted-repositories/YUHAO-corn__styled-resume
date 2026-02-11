import type { ResumeData } from '../types/resume';

export const SAMPLE_DATA: ResumeData = {
  header: {
    name: "张三",
    title: "产品经理",
    github: "github.com/zhangsan",
    website: "zhangsan.dev",
    phone: "+86 138-0000-0000",
    email: "zhangsan@example.com",
    status: "Open to work",
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
    },
    {
      title: "用户增长数据看板截图",
      description: "核心业务指标 Dashboard，展示关键增长曲线",
    },
  ],
};
