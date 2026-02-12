import type { Locale } from '../i18n';

const ZH_MARKDOWN = `---
name: 张三
title: 产品经理
phone: "+86 138-0000-0000"
email: zhangsan@example.com
github: github.com/zhangsan
website: zhangsan.dev
status: Open to work
---

## 个人简介

拥有 5 年互联网产品经验的产品经理，擅长从 0 到 1 搭建产品体系。曾主导多款用户量级百万的 SaaS 产品，对用户增长、数据驱动决策及跨团队协作有深刻理解。热衷于用技术思维解决产品问题，具备良好的前后端技术认知。

## 项目经历

### AI 智能客服平台 | github.com/zhangsan/ai-support
> 基于 LLM 的智能客服系统，实现多轮对话与意图识别
- 主导产品从 0-1 设计，完成需求调研、竞品分析、PRD 撰写与原型设计
- 设计多轮对话引擎架构，支持意图识别准确率达 92%
- 搭建数据看板体系，日均处理工单量提升 180%
- 协调前后端与算法团队，按期交付 3 个大版本迭代

\`React\` \`Node.js\` \`Python\` \`LangChain\` \`PostgreSQL\`

### SaaS 协作工具 | github.com/zhangsan/collab-tool
> 面向中小团队的项目管理与文档协作平台
- 负责核心模块产品设计，包括任务看板、文档协作与权限体系
- 通过用户访谈与数据分析优化核心流程，用户留存率提升 35%
- 设计灵活的插件化架构方案，支持第三方集成

\`Next.js\` \`Tailwind CSS\` \`Supabase\`

## 工作经历

### 字节跳动 | 高级产品经理 | 2022.03 – 至今
> 负责企业级 SaaS 产品线的规划与落地
- 主导 B 端产品战略规划，年 ARR 增长 200%
- 建立产品数据指标体系，推动数据驱动决策文化落地
- 管理 5 人产品团队，制定季度 OKR 并追踪执行
- 与销售、客户成功团队紧密协作，构建客户反馈闭环

### 阿里巴巴 | 产品经理 | 2020.06 – 2022.02
> 负责电商中台产品模块设计与优化
- 设计商品中心与订单中心核心模块，支撑日均百万级订单处理
- 推动搜索推荐算法优化，商品点击率提升 25%
- 主导用户端体验升级项目，NPS 评分提升 15 个百分点

### 美团 | 产品实习生 | 2019.07 – 2019.12

## 教育经历

### 北京大学 | 硕士 | 信息管理与信息系统 | 2018.09 – 2020.06
### 武汉大学 | 本科 | 计算机科学与技术 | 2014.09 – 2018.06

## 技能

- 产品设计与原型工具 (Figma / Axure / Sketch)
- 数据分析 (SQL / Python / Tableau / Google Analytics)
- 技术理解 (REST API / 微服务架构 / 基础前后端开发)
- 项目管理 (Scrum / JIRA / Notion / 飞书多维表格)
- AI & LLM 应用 (Prompt Engineering / RAG / Agent 设计)

## 附录

### 产品架构图 — AI 智能客服平台
展示系统整体架构与核心模块交互关系

### 用户增长数据看板截图
核心业务指标 Dashboard，展示关键增长曲线
`;

const EN_MARKDOWN = `---
name: Jane Smith
title: Product Manager
phone: "+1 555-000-1234"
email: jane@example.com
github: github.com/janesmith
website: janesmith.dev
status: Open to work
---

## Summary

Product manager with 5 years of experience building internet products from 0 to 1. Led multiple SaaS products serving millions of users, with deep expertise in user growth, data-driven decision making, and cross-functional collaboration.

## Projects

### AI Customer Support Platform | github.com/janesmith/ai-support
> LLM-powered customer support system with multi-turn dialogue and intent recognition
- Led end-to-end product design: user research, competitive analysis, PRD, and prototyping
- Designed multi-turn dialogue engine achieving 92% intent recognition accuracy
- Built analytics dashboard, increasing daily ticket throughput by 180%
- Coordinated frontend, backend, and ML teams to deliver 3 major releases on schedule

\`React\` \`Node.js\` \`Python\` \`LangChain\` \`PostgreSQL\`

### SaaS Collaboration Tool | github.com/janesmith/collab-tool
> Project management and document collaboration platform for small teams
- Owned core module design: task boards, document collaboration, and permission system
- Improved user retention by 35% through user interviews and data analysis
- Designed plugin architecture supporting third-party integrations

\`Next.js\` \`Tailwind CSS\` \`Supabase\`

## Experience

### ByteDance | Senior Product Manager | Mar 2022 – Present
> Enterprise SaaS product line planning and execution
- Led B2B product strategy, growing annual ARR by 200%
- Established product metrics framework, driving data-informed culture
- Managed a team of 5 PMs, setting quarterly OKRs and tracking execution
- Partnered with sales and customer success to build feedback loops

### Alibaba | Product Manager | Jun 2020 – Feb 2022
> E-commerce platform module design and optimization
- Designed product catalog and order management modules handling 1M+ daily orders
- Drove search and recommendation optimization, improving CTR by 25%
- Led UX upgrade initiative, increasing NPS by 15 points

### Meituan | Product Intern | Jul 2019 – Dec 2019

## Education

### Peking University | M.S. | Information Management | Sep 2018 – Jun 2020
### Wuhan University | B.S. | Computer Science | Sep 2014 – Jun 2018

## Skills

- Product Design & Prototyping (Figma / Axure / Sketch)
- Data Analysis (SQL / Python / Tableau / Google Analytics)
- Technical Understanding (REST API / Microservices / Frontend & Backend)
- Project Management (Scrum / JIRA / Notion / Linear)
- AI & LLM Applications (Prompt Engineering / RAG / Agent Design)

## Appendix

### Architecture Diagram — AI Support Platform
System architecture overview showing core module interactions

### Growth Dashboard Screenshot
Key business metrics dashboard with growth curves
`;

export function getDefaultMarkdown(locale: Locale): string {
  return locale === 'zh' ? ZH_MARKDOWN : EN_MARKDOWN;
}

export const DEFAULT_MARKDOWN = ZH_MARKDOWN;
