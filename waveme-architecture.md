# Waveme 平台架构设计

## 产品理念
"投石问路，泛起涟漪" —— 求职者上传简历，生成个人网站，通过访问数据洞察求职效果。

## 核心功能

### 1. 前端平台 (waveme.app)
- **Landing Page**: 介绍产品价值，吸引用户
- **上传页面**: 拖拽上传 PDF 简历
- **编辑器**: 预览和微调生成的网站
- **Dashboard**: 查看访问数据（涟漪效果可视化）

### 2. 简历解析引擎
- PDF 文本提取 (pdf-parse)
- NLP 信息识别 (姓名、联系方式、工作经历、教育背景、技能)
- 结构化数据输出

### 3. 模板引擎
- 模板 A: Minimal - 极简风格，适合设计师/创意工作者
- 模板 B: Professional - 商务风格，适合金融/咨询/管理
- 模板 C: Tech - 技术风格，适合程序员/工程师

### 4. 数据追踪
- 页面浏览量
- 用户来源
- 各模块停留时间
- 热力图分析

## 技术栈
- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- pdf-parse (PDF解析)
- framer-motion (涟漪动画)
- recharts (数据可视化)

## 数据结构

```typescript
interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
}

interface Analytics {
  totalViews: number;
  uniqueVisitors: number;
  avgTimeOnSite: number;
  sectionDwellTime: Record<string, number>;
  trafficSources: Record<string, number>;
}
```
