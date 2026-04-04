# Waveme V2 架构设计

## 产品定位
**"像 Squarespace 一样打造你的个人品牌"**

从"简历生成器"升级为"个人品牌作品集平台"，帮助求职者、设计师、创作者建立专业的在线形象。

## 核心功能

### 1. 前端 (Next.js + Tailwind + shadcn/ui)
- **Landing Page**: Squarespace 风格，视觉冲击力强
- **Dashboard**: 现代化管理后台
- **Editor**: 可视化拖拽编辑器
- **Template Gallery**: 15+ 专业模板
- **Analytics**: 高级数据洞察

### 2. 后端 (Node.js + Express + MongoDB)
- **Auth**: JWT 用户认证
- **PDF Parser**: 真实 PDF 解析
- **AI Chat**: GPT-4 助手
- **Deploy**: Vercel API 集成
- **Analytics**: 自研统计系统

### 3. 数据库 (MongoDB)
- Users: 用户信息
- Sites: 网站配置
- Templates: 模板数据
- Analytics: 访问数据

## 技术栈

### 前端
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- React DnD (拖拽)
- Zustand (状态管理)

### 后端
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- pdf-parse
- OpenAI API
- Vercel SDK
- JWT

## 页面结构

```
/                    - Landing Page (Squarespace 风格)
/dashboard           - 用户控制台
/editor/[siteId]     - 可视化编辑器
/templates           - 模板库 (15+ 模板)
/preview/[siteId]    - 网站预览
/analytics/[siteId]  - 数据分析
/settings            - 账户设置
```

## 模板分类

### 职业类型
1. **Tech** - 程序员、工程师
2. **Design** - 设计师、创意工作者
3. **Business** - 商务、管理、咨询
4. **Creative** - 艺术家、摄影师、作家
5. **Academic** - 学者、研究员

### 风格类型
- Minimal (极简)
- Modern (现代)
- Classic (经典)
- Bold (大胆)
- Elegant (优雅)

## 自定义系统

### 全局设置
- 主题色 (Color Picker)
- 字体 (Google Fonts)
- 间距
- 动画效果

### 模块设置
- Hero 区域
- 关于我
- 经历时间轴
- 技能树
- 项目展示
- 联系方式

### 高级功能
- 自定义 CSS
- 自定义域名
- SEO 设置
- 社交媒体链接
