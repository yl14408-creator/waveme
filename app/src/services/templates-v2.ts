// Waveme V2 - 15+ 专业模板库
// 参考 indiepa.ge, bryantcodes.art, nikolailehbr.ink 等风格

import type { ResumeData } from '@/types';

export type TemplateCategory = 'tech' | 'design' | 'business' | 'creative' | 'academic';
export type TemplateStyle = 'minimal' | 'modern' | 'retro' | 'playful' | 'elegant' | 'bold';

export interface TemplateV2 {
  id: string;
  name: string;
  category: TemplateCategory;
  style: TemplateStyle;
  description: string;
  descriptionEn: string;
  previewImage: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  features: string[];
  featuresEn: string[];
  navigation: ('home' | 'about' | 'projects' | 'experience' | 'skills' | 'blog' | 'contact' | 'research' | 'publications' | 'teaching' | 'students' | 'articles' | 'stats')[];
}

// 15+ 专业模板
export const templatesV2: TemplateV2[] = [
  // ===== 技术类 =====
  {
    id: 'terminal',
    name: 'Terminal',
    category: 'tech',
    style: 'retro',
    description: '复古终端风格，适合程序员展示技术栈',
    descriptionEn: 'Retro terminal style, ideal for developers to showcase their tech stack',
    previewImage: '/templates/terminal.jpg',
    colors: {
      primary: '#4a7c59',
      secondary: '#3d6b4a',
      background: '#1a1a1a',
      text: '#6b9a7c',
      accent: '#8b5a5a',
    },
    fonts: {
      heading: '"JetBrains Mono", monospace',
      body: '"JetBrains Mono", monospace',
    },
    features: ['终端动画', '打字机效果', '命令行交互', '代码高亮'],
    featuresEn: ['Terminal animation', 'Typewriter effect', 'CLI interaction', 'Code highlighting'],
    navigation: ['home', 'projects', 'skills', 'experience', 'contact'],
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    category: 'tech',
    style: 'bold',
    description: '赛博朋克风格，霓虹灯效果，未来感十足',
    descriptionEn: 'Cyberpunk style with neon lights and a futuristic feel',
    previewImage: '/templates/cyberpunk.jpg',
    colors: {
      primary: '#7a5a8a',
      secondary: '#5a8a9a',
      background: '#1a1420',
      text: '#e8e8e8',
      accent: '#9a8a5a',
    },
    fonts: {
      heading: '"Orbitron", sans-serif',
      body: '"Rajdhani", sans-serif',
    },
    features: ['霓虹发光', '网格背景', '故障艺术', '动态粒子'],
    featuresEn: ['Neon glow', 'Grid background', 'Glitch art', 'Dynamic particles'],
    navigation: ['home', 'about', 'projects', 'skills', 'contact'],
  },
  {
    id: 'clean-code',
    name: 'Clean Code',
    category: 'tech',
    style: 'minimal',
    description: '干净简洁的代码风格，专注内容展示',
    descriptionEn: 'Clean and minimal code style, focused on content display',
    previewImage: '/templates/clean-code.jpg',
    colors: {
      primary: '#57534e',
      secondary: '#78716c',
      background: '#fafaf9',
      text: '#44403c',
      accent: '#a8a29e',
    },
    fonts: {
      heading: '"Inter", sans-serif',
      body: '"Inter", sans-serif',
    },
    features: ['极简设计', '代码片段展示', 'GitHub 集成', '技能进度条'],
    featuresEn: ['Minimal design', 'Code snippets', 'GitHub integration', 'Skill progress bars'],
    navigation: ['home', 'projects', 'experience', 'skills', 'blog', 'contact'],
  },

  // ===== 设计类 =====
  {
    id: 'portfolio-pro',
    name: 'Portfolio Pro',
    category: 'design',
    style: 'elegant',
    description: '专业设计师作品集，大图展示，视觉冲击力强',
    descriptionEn: 'Professional designer portfolio with large images and visual impact',
    previewImage: '/templates/portfolio-pro.jpg',
    colors: {
      primary: '#1a1a1a',
      secondary: '#404040',
      background: '#ffffff',
      text: '#1a1a1a',
      accent: '#8a7a6a',
    },
    fonts: {
      heading: '"Playfair Display", serif',
      body: '"Inter", sans-serif',
    },
    features: ['大图展示', '瀑布流布局', '灯箱效果', '项目分类'],
    featuresEn: ['Large images', 'Masonry layout', 'Lightbox effect', 'Project categories'],
    navigation: ['home', 'projects', 'about', 'contact'],
  },
  {
    id: 'brutalist',
    name: 'Brutalist',
    category: 'design',
    style: 'bold',
    description: '粗野主义风格，大胆排版，打破常规',
    descriptionEn: 'Brutalist style with bold typography that breaks conventions',
    previewImage: '/templates/brutalist.jpg',
    colors: {
      primary: '#8a5a5a',
      secondary: '#5a5a8a',
      background: '#f0f0f0',
      text: '#1a1a1a',
      accent: '#8a8a5a',
    },
    fonts: {
      heading: '"Arial Black", sans-serif',
      body: '"Courier New", monospace',
    },
    features: ['大胆排版', '高对比度', '几何图形', '不规则布局'],
    featuresEn: ['Bold typography', 'High contrast', 'Geometric shapes', 'Irregular layout'],
    navigation: ['home', 'projects', 'about', 'contact'],
  },
  {
    id: 'scandinavian',
    name: 'Scandinavian',
    category: 'design',
    style: 'minimal',
    description: '北欧简约风，温暖色调，舒适自然',
    descriptionEn: 'Scandinavian minimalism with warm tones and natural comfort',
    previewImage: '/templates/scandinavian.jpg',
    colors: {
      primary: '#d4a574',
      secondary: '#8b7355',
      background: '#faf8f5',
      text: '#4a4a4a',
      accent: '#e8d5c4',
    },
    fonts: {
      heading: '"Cormorant Garamond", serif',
      body: '"Source Sans Pro", sans-serif',
    },
    features: ['温暖色调', '自然元素', '留白艺术', '柔和阴影'],
    featuresEn: ['Warm tones', 'Natural elements', 'White space art', 'Soft shadows'],
    navigation: ['home', 'about', 'projects', 'blog', 'contact'],
  },

  // ===== 创意类 =====
  {
    id: 'pixel-art',
    name: 'Pixel Art',
    category: 'creative',
    style: 'playful',
    description: '像素艺术风格，复古游戏感，个性十足',
    descriptionEn: 'Pixel art style with retro gaming vibes and personality',
    previewImage: '/templates/pixel-art.jpg',
    colors: {
      primary: '#8a6a6a',
      secondary: '#6a8a8a',
      background: '#2d2d2d',
      text: '#e8e8e8',
      accent: '#8a8a6a',
    },
    fonts: {
      heading: '"Press Start 2P", cursive',
      body: '"VT323", monospace',
    },
    features: ['像素动画', '8-bit 音乐', '游戏化交互', '复古配色'],
    featuresEn: ['Pixel animation', '8-bit music', 'Gamified interaction', 'Retro palette'],
    navigation: ['home', 'about', 'projects', 'skills', 'contact'],
  },
  {
    id: 'doodle',
    name: 'Doodle',
    category: 'creative',
    style: 'playful',
    description: '手绘涂鸦风格，轻松活泼，展现个性',
    descriptionEn: 'Hand-drawn doodle style, lighthearted and full of personality',
    previewImage: '/templates/doodle.jpg',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      background: '#fefce8',
      text: '#1e1b4b',
      accent: '#fbbf24',
    },
    fonts: {
      heading: '"Caveat", cursive',
      body: '"Comic Neue", cursive',
    },
    features: ['手绘元素', '涂鸦动画', '不规则边框', '贴纸效果'],
    featuresEn: ['Hand-drawn elements', 'Doodle animation', 'Irregular borders', 'Sticker effects'],
    navigation: ['home', 'projects', 'blog', 'about', 'contact'],
  },
  {
    id: 'collage',
    name: 'Collage',
    category: 'creative',
    style: 'bold',
    description: '拼贴艺术风格，层次丰富，视觉冲击',
    descriptionEn: 'Collage art style with rich layers and visual impact',
    previewImage: '/templates/collage.jpg',
    colors: {
      primary: '#8a5a5a',
      secondary: '#5a7a6a',
      background: '#faf8f5',
      text: '#2d2d2d',
      accent: '#6a5a8a',
    },
    fonts: {
      heading: '"Bebas Neue", sans-serif',
      body: '"Roboto", sans-serif',
    },
    features: ['拼贴布局', '胶带效果', '照片叠加', '手写字体'],
    featuresEn: ['Collage layout', 'Tape effect', 'Photo overlay', 'Handwritten fonts'],
    navigation: ['home', 'projects', 'about', 'contact'],
  },

  // ===== 商务类 =====
  {
    id: 'executive',
    name: 'Executive',
    category: 'business',
    style: 'elegant',
    description: '高管精英风格，稳重专业，值得信赖',
    descriptionEn: 'Executive elite style, reliable and professional',
    previewImage: '/templates/executive.jpg',
    colors: {
      primary: '#3a4a5f',
      secondary: '#5a6a80',
      background: '#ffffff',
      text: '#1e293b',
      accent: '#8a7a4a',
    },
    fonts: {
      heading: '"Cinzel", serif',
      body: '"Lato", sans-serif',
    },
    features: ['经典布局', '金色点缀', '成就展示', '时间轴'],
    featuresEn: ['Classic layout', 'Gold accents', 'Achievement display', 'Timeline'],
    navigation: ['home', 'experience', 'skills', 'contact'],
  },
  {
    id: 'consultant',
    name: 'Consultant',
    category: 'business',
    style: 'modern',
    description: '咨询顾问风格，数据驱动，逻辑清晰',
    descriptionEn: 'Consultant style, data-driven with clear logic',
    previewImage: '/templates/consultant.jpg',
    colors: {
      primary: '#5a7a76',
      secondary: '#6a8a8a',
      background: '#f8fafc',
      text: '#1a2a3a',
      accent: '#8a7a5a',
    },
    fonts: {
      heading: '"Montserrat", sans-serif',
      body: '"Open Sans", sans-serif',
    },
    features: ['数据可视化', '案例展示', '客户评价', '证书展示'],
    featuresEn: ['Data visualization', 'Case studies', 'Client reviews', 'Certifications'],
    navigation: ['home', 'about', 'experience', 'contact'],
  },

  // ===== 学术类 =====
  {
    id: 'researcher',
    name: 'Researcher',
    category: 'academic',
    style: 'minimal',
    description: '学术研究风格，严谨专业，文献展示',
    descriptionEn: 'Academic research style, rigorous and professional',
    previewImage: '/templates/researcher.jpg',
    colors: {
      primary: '#3730a3',
      secondary: '#6366f1',
      background: '#ffffff',
      text: '#1e1b4b',
      accent: '#dc2626',
    },
    fonts: {
      heading: '"Merriweather", serif',
      body: '"Source Serif Pro", serif',
    },
    features: ['论文列表', '引用统计', '研究项目', '合作网络'],
    featuresEn: ['Paper list', 'Citation stats', 'Research projects', 'Collaboration network'],
    navigation: ['home', 'research', 'publications', 'contact'],
  },
  {
    id: 'professor',
    name: 'Professor',
    category: 'academic',
    style: 'elegant',
    description: '教授个人主页，教学研究，学生资源',
    descriptionEn: 'Professor homepage with teaching, research, and student resources',
    previewImage: '/templates/professor.jpg',
    colors: {
      primary: '#7c2d12',
      secondary: '#92400e',
      background: '#fffbeb',
      text: '#451a03',
      accent: '#b45309',
    },
    fonts: {
      heading: '"Libre Baskerville", serif',
      body: '"Crimson Text", serif',
    },
    features: ['课程列表', '办公时间', '学生指导', '学术活动'],
    featuresEn: ['Course list', 'Office hours', 'Student mentoring', 'Academic events'],
    navigation: ['home', 'teaching', 'research', 'students', 'contact'],
  },

  // ===== 通用类 =====
  {
    id: 'one-page',
    name: 'One Page',
    category: 'creative',
    style: 'modern',
    description: '单页滚动设计，流畅体验，故事叙述',
    descriptionEn: 'Single-page scroll design with smooth storytelling experience',
    previewImage: '/templates/one-page.jpg',
    colors: {
      primary: '#8a5a7a',
      secondary: '#a88a9a',
      background: '#faf5f8',
      text: '#5a3a4a',
      accent: '#6a5a8a',
    },
    fonts: {
      heading: '"Poppins", sans-serif',
      body: '"Inter", sans-serif',
    },
    features: ['平滑滚动', '视差效果', '章节动画', '导航高亮'],
    featuresEn: ['Smooth scrolling', 'Parallax effects', 'Section animations', 'Nav highlighting'],
    navigation: ['home'], // 单页设计，锚点导航
  },
  {
    id: 'magazine',
    name: 'Magazine',
    category: 'design',
    style: 'elegant',
    description: '杂志风格，大图配文，阅读体验佳',
    descriptionEn: 'Magazine style with large images and great reading experience',
    previewImage: '/templates/magazine.jpg',
    colors: {
      primary: '#2a2a2a',
      secondary: '#5a5a5a',
      background: '#fafafa',
      text: '#2a2a2a',
      accent: '#8a5a5a',
    },
    fonts: {
      heading: '"Tiempos Headline", serif',
      body: '"Tiempos Text", serif',
    },
    features: ['杂志布局', '大图展示', '文章列表', '订阅功能'],
    featuresEn: ['Magazine layout', 'Large images', 'Article list', 'Subscription feature'],
    navigation: ['home', 'articles', 'about', 'contact'],
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    category: 'tech',
    style: 'modern',
    description: '仪表盘风格，数据可视化，信息密度高',
    descriptionEn: 'Dashboard style with data visualization and high information density',
    previewImage: '/templates/dashboard.jpg',
    colors: {
      primary: '#5a7a9a',
      secondary: '#7a9aba',
      background: '#1a2a3a',
      text: '#e2e8f0',
      accent: '#5a9a9a',
    },
    fonts: {
      heading: '"SF Pro Display", -apple-system, sans-serif',
      body: '"SF Pro Text", -apple-system, sans-serif',
    },
    features: ['卡片布局', '数据图表', '实时统计', '暗色主题'],
    featuresEn: ['Card layout', 'Data charts', 'Live stats', 'Dark theme'],
    navigation: ['home', 'stats', 'projects', 'skills', 'contact'],
  },
  // ===== 新模板 =====
  {
    id: 'minimalist-v2',
    name: 'Minimalist',
    category: 'design',
    style: 'minimal',
    description: '极简双栏布局，优雅的时间线式工作经历',
    descriptionEn: 'Clean two-column layout with elegant timeline experience',
    previewImage: '/templates/minimalist-v2.jpg',
    colors: { primary: '#0f172a', secondary: '#64748b', background: '#ffffff', text: '#0f172a', accent: '#3b82f6' },
    fonts: { heading: '"Inter", sans-serif', body: '"Inter", sans-serif' },
    features: ['双栏布局', '时间线', '标签技能'],
    featuresEn: ['Two-column layout', 'Timeline view', 'Tag skills'],
    navigation: ['home', 'experience', 'projects', 'skills', 'contact'],
  },
  {
    id: 'bento-v2',
    name: 'Bento',
    category: 'design',
    style: 'modern',
    description: 'Bento 网格布局，圆角卡片，现代感十足',
    descriptionEn: 'Bento grid layout with rounded cards and modern aesthetics',
    previewImage: '/templates/bento-v2.jpg',
    colors: { primary: '#3b82f6', secondary: '#10b981', background: '#f8f9fa', text: '#1a1a2e', accent: '#6366f1' },
    fonts: { heading: '"Space Grotesk", sans-serif', body: '"Space Grotesk", sans-serif' },
    features: ['网格布局', '圆角卡片', '彩色分区'],
    featuresEn: ['Grid layout', 'Rounded cards', 'Color sections'],
    navigation: ['home', 'experience', 'projects', 'skills', 'contact'],
  },
  {
    id: 'terminal-pro',
    name: 'Terminal Pro',
    category: 'tech',
    style: 'retro',
    description: 'GitHub 暗色终端风格，专业程序员专属',
    descriptionEn: 'GitHub dark terminal style — the ultimate dev portfolio',
    previewImage: '/templates/terminal-pro.jpg',
    colors: { primary: '#7ee787', secondary: '#79c0ff', background: '#0d1117', text: '#c9d1d9', accent: '#ffa657' },
    fonts: { heading: '"JetBrains Mono", monospace', body: '"JetBrains Mono", monospace' },
    features: ['终端窗口', 'JSON 输出', '语法配色', '光标动画'],
    featuresEn: ['Terminal window', 'JSON output', 'Syntax colors', 'Cursor animation'],
    navigation: ['home', 'experience', 'projects', 'skills', 'contact'],
  },
  {
    id: 'elegant-v2',
    name: 'Elegant',
    category: 'business',
    style: 'elegant',
    description: '衬线字体，居中排版，高端杂志编辑风格',
    descriptionEn: 'Serif typography, centered layout — editorial magazine style',
    previewImage: '/templates/elegant-v2.jpg',
    colors: { primary: '#1a1a1a', secondary: '#555555', background: '#fdfcfb', text: '#1a1a1a', accent: '#888888' },
    fonts: { heading: '"Cormorant Garamond", serif', body: '"Cormorant Garamond", serif' },
    features: ['衬线字体', '居中布局', '细线分隔', '斜体引用'],
    featuresEn: ['Serif fonts', 'Centered layout', 'Fine dividers', 'Italic quotes'],
    navigation: ['home', 'experience', 'projects', 'skills', 'contact'],
  },
];

// 获取模板 by ID
export function getTemplateById(id: string): TemplateV2 | undefined {
  return templatesV2.find(t => t.id === id);
}

// 按分类获取模板
export function getTemplatesByCategory(category: TemplateCategory): TemplateV2[] {
  return templatesV2.filter(t => t.category === category);
}

// 按风格获取模板
export function getTemplatesByStyle(style: TemplateStyle): TemplateV2[] {
  return templatesV2.filter(t => t.style === style);
}

// 生成模板 HTML
export function generateTemplateHTMLV2(
  templateId: string,
  data: ResumeData,
  customColors?: Partial<TemplateV2['colors']>,
  customNav?: string[]
): string {
  const template = getTemplateById(templateId);
  if (!template) return '';

  const colors = { ...template.colors, ...customColors };
  const navigation = customNav || template.navigation;

  switch (templateId) {
    case 'terminal':
      return generateTerminalTemplate(template, data, colors, navigation);
    case 'cyberpunk':
      return generateCyberpunkTemplate(template, data, colors, navigation);
    case 'pixel-art':
      return generatePixelArtTemplate(template, data, colors, navigation);
    case 'doodle':
      return generateDoodleTemplate(template, data, colors, navigation);
    case 'portfolio-pro':
      return generatePortfolioProTemplate(template, data, colors, navigation);
    case 'minimalist-v2':
      return generateMinimalistV2Template(template, data, colors, navigation);
    case 'bento-v2':
      return generateBentoV2Template(template, data, colors, navigation);
    case 'terminal-pro':
      return generateTerminalProV2Template(template, data, colors, navigation);
    case 'elegant-v2':
      return generateElegantV2Template(template, data, colors, navigation);
    default:
      return generateCleanCodeTemplate(template, data, colors, navigation);
  }
}

// ===== 终端风格模板 =====
function generateTerminalTemplate(
  _template: TemplateV2,
  data: ResumeData,
  colors: TemplateV2['colors'],
  navigation: string[]
): string {
  const navHTML = navigation.map(nav => 
    `<a href="#${nav}" class="nav-link">$ ${nav}</a>`
  ).join('\n    ');

  const experienceHTML = data.experience.map((exp, i) => `
    <div class="exp-item" style="animation-delay: ${i * 0.2}s">
      <div class="exp-header">
        <span class="prompt">➜</span>
        <span class="command">cat ${exp.company.toLowerCase().replace(/\s+/g, '_')}.json</span>
      </div>
      <div class="exp-content">
        <pre>{
  "position": "${exp.title}",
  "company": "${exp.company}",
  "period": "${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}",
  "location": "${exp.location}"
}</pre>
        <ul>
          ${exp.description.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');

  const skillsHTML = data.skills.map((skill, i) => 
    `<span class="skill-tag" style="animation-delay: ${i * 0.05}s">${skill}</span>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} - ${data.title}</title>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'JetBrains Mono', monospace;
      background: ${colors.background};
      color: ${colors.text};
      line-height: 1.6;
      min-height: 100vh;
    }
    .terminal {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
    }
    .terminal-header {
      background: #1a1a1a;
      padding: 0.75rem 1rem;
      border-radius: 8px 8px 0 0;
      display: flex;
      gap: 0.5rem;
    }
    .terminal-dot { width: 12px; height: 12px; border-radius: 50%; }
    .dot-red { background: #ff5f56; }
    .dot-yellow { background: #ffbd2e; }
    .dot-green { background: #27c93f; }
    .terminal-body {
      background: rgba(10, 10, 10, 0.95);
      padding: 2rem;
      border-radius: 0 0 8px 8px;
      min-height: 80vh;
    }
    nav {
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #333;
    }
    .nav-link {
      color: ${colors.primary};
      text-decoration: none;
      margin-right: 1.5rem;
      transition: all 0.3s;
    }
    .nav-link:hover {
      color: ${colors.accent};
      text-shadow: 0 0 10px ${colors.primary};
    }
    .hero {
      margin-bottom: 3rem;
    }
    .typing {
      overflow: hidden;
      white-space: nowrap;
      animation: typing 2s steps(40, end);
    }
    @keyframes typing {
      from { width: 0; }
      to { width: 100%; }
    }
    .prompt { color: ${colors.primary}; margin-right: 0.5rem; }
    .command { color: ${colors.secondary}; }
    .output { color: #ccc; margin: 0.5rem 0 1rem 1.5rem; }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    .subtitle { color: #888; margin-bottom: 1rem; }
    .exp-item {
      margin-bottom: 2rem;
      opacity: 0;
      animation: fadeIn 0.5s forwards;
    }
    @keyframes fadeIn {
      to { opacity: 1; }
    }
    .exp-header {
      cursor: pointer;
      padding: 0.5rem;
      background: rgba(0, 255, 0, 0.05);
      border-radius: 4px;
    }
    .exp-content {
      margin-top: 1rem;
      padding-left: 1.5rem;
    }
    pre {
      background: rgba(0, 0, 0, 0.5);
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
      color: ${colors.primary};
    }
    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    .skill-tag {
      padding: 0.25rem 0.75rem;
      border: 1px solid ${colors.primary};
      border-radius: 4px;
      font-size: 0.875rem;
      opacity: 0;
      animation: fadeIn 0.3s forwards;
    }
    .cursor {
      display: inline-block;
      width: 8px;
      height: 1.2em;
      background: ${colors.primary};
      animation: blink 1s infinite;
      vertical-align: text-bottom;
    }
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
    a { color: ${colors.accent}; }
  </style>
</head>
<body>
  <div class="terminal">
    <div class="terminal-header">
      <div class="terminal-dot dot-red"></div>
      <div class="terminal-dot dot-yellow"></div>
      <div class="terminal-dot dot-green"></div>
    </div>
    <div class="terminal-body">
      <nav>
        ${navHTML}
      </nav>
      
      <section class="hero" id="home">
        <div class="typing">
          <span class="prompt">$</span>
          <span class="command">whoami</span>
        </div>
        <div class="output">
          <h1>${data.name}</h1>
          <p class="subtitle">${data.title}</p>
          <p>${data.summary}</p>
        </div>
        <div>
          <span class="prompt">$</span>
          <span class="command">contact --info</span>
          <div class="output">
            <p>📧 ${data.email}</p>
            <p>📱 ${data.phone}</p>
            <p>📍 ${data.location}</p>
            ${data.github ? `<p>🐙 github.com/${data.github}</p>` : ''}
            ${data.linkedin ? `<p>💼 linkedin.com/in/${data.linkedin}</p>` : ''}
          </div>
        </div>
      </section>

      <section id="experience">
        <div>
          <span class="prompt">$</span>
          <span class="command">ls -la experience/</span>
        </div>
        <div class="output">
          ${experienceHTML}
        </div>
      </section>

      <section id="skills">
        <div>
          <span class="prompt">$</span>
          <span class="command">cat skills.txt</span>
        </div>
        <div class="output">
          <div class="skills">
            ${skillsHTML}
          </div>
        </div>
      </section>

      <div>
        <span class="prompt">$</span>
        <span class="cursor"></span>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// ===== 赛博朋克风格 =====
function generateCyberpunkTemplate(
  _template: TemplateV2,
  data: ResumeData,
  colors: TemplateV2['colors'],
  navigation: string[]
): string {
  // 赛博朋克模板实现...
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} - ${data.title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Rajdhani', sans-serif;
      background: ${colors.background};
      color: ${colors.text};
      overflow-x: hidden;
    }
    .grid-bg {
      position: fixed;
      inset: 0;
      background-image: 
        linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
      background-size: 50px 50px;
      pointer-events: none;
    }
    .glow-text {
      text-shadow: 0 0 10px ${colors.primary}, 0 0 20px ${colors.primary}, 0 0 40px ${colors.primary};
    }
    .neon-border {
      border: 1px solid ${colors.primary};
      box-shadow: 0 0 10px ${colors.primary}, inset 0 0 10px rgba(255, 0, 255, 0.1);
    }
    nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      padding: 1.5rem 3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(10, 0, 20, 0.8);
      backdrop-filter: blur(10px);
      z-index: 100;
    }
    .logo {
      font-family: 'Orbitron', sans-serif;
      font-size: 1.5rem;
      font-weight: 900;
      color: ${colors.primary};
      text-transform: uppercase;
      letter-spacing: 0.2em;
    }
    .nav-links {
      display: flex;
      gap: 2rem;
    }
    .nav-links a {
      color: ${colors.text};
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      position: relative;
      padding: 0.5rem 0;
    }
    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: ${colors.secondary};
      transition: width 0.3s;
      box-shadow: 0 0 10px ${colors.secondary};
    }
    .nav-links a:hover::after {
      width: 100%;
    }
    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 2rem;
      position: relative;
    }
    .hero h1 {
      font-family: 'Orbitron', sans-serif;
      font-size: clamp(3rem, 10vw, 8rem);
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 1rem;
    }
    .hero .subtitle {
      font-size: 1.5rem;
      color: ${colors.secondary};
      letter-spacing: 0.3em;
      text-transform: uppercase;
    }
    .glitch {
      position: relative;
    }
    .glitch::before,
    .glitch::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .glitch::before {
      animation: glitch-1 2s infinite;
      color: ${colors.secondary};
      z-index: -1;
    }
    .glitch::after {
      animation: glitch-2 2s infinite;
      color: ${colors.accent};
      z-index: -2;
    }
    @keyframes glitch-1 {
      0%, 100% { clip-path: inset(0 0 95% 0); transform: translate(-2px, 0); }
      20% { clip-path: inset(30% 0 50% 0); transform: translate(2px, 0); }
      40% { clip-path: inset(70% 0 10% 0); transform: translate(-2px, 0); }
      60% { clip-path: inset(10% 0 80% 0); transform: translate(2px, 0); }
      80% { clip-path: inset(50% 0 30% 0); transform: translate(-2px, 0); }
    }
    @keyframes glitch-2 {
      0%, 100% { clip-path: inset(95% 0 0 0); transform: translate(2px, 0); }
      20% { clip-path: inset(50% 0 30% 0); transform: translate(-2px, 0); }
      40% { clip-path: inset(10% 0 70% 0); transform: translate(2px, 0); }
      60% { clip-path: inset(80% 0 10% 0); transform: translate(-2px, 0); }
      80% { clip-path: inset(30% 0 50% 0); transform: translate(2px, 0); }
    }
    section {
      padding: 6rem 3rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .section-title {
      font-family: 'Orbitron', sans-serif;
      font-size: 2rem;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      margin-bottom: 3rem;
      color: ${colors.primary};
    }
    .card {
      background: rgba(255, 0, 255, 0.05);
      border: 1px solid rgba(255, 0, 255, 0.2);
      padding: 2rem;
      margin-bottom: 2rem;
      position: relative;
    }
    .card::before {
      content: '';
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      height: 2px;
      background: linear-gradient(90deg, ${colors.primary}, ${colors.secondary});
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
    }
    .skill-item {
      padding: 1rem;
      border: 1px solid ${colors.secondary};
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      transition: all 0.3s;
    }
    .skill-item:hover {
      background: ${colors.secondary};
      color: ${colors.background};
      box-shadow: 0 0 20px ${colors.secondary};
    }
  </style>
</head>
<body>
  <div class="grid-bg"></div>
  
  <nav>
    <div class="logo">${data.name.split(' ')[0]}</div>
    <div class="nav-links">
      ${navigation.map(nav => `<a href="#${nav}">${nav}</a>`).join('')}
    </div>
  </nav>

  <section class="hero" id="home">
    <h1 class="glitch glow-text" data-text="${data.name}">${data.name}</h1>
    <p class="subtitle">${data.title}</p>
  </section>

  <section id="about">
    <h2 class="section-title">// About</h2>
    <div class="card">
      <p>${data.summary}</p>
    </div>
  </section>

  <section id="experience">
    <h2 class="section-title">// Experience</h2>
    ${data.experience.map(exp => `
    <div class="card">
      <h3>${exp.title}</h3>
      <p style="color: ${colors.secondary}">${exp.company} | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</p>
      <ul style="margin-top: 1rem; padding-left: 1.5rem;">
        ${exp.description.map(d => `<li>${d}</li>`).join('')}
      </ul>
    </div>
    `).join('')}
  </section>

  <section id="skills">
    <h2 class="section-title">// Skills</h2>
    <div class="skills-grid">
      ${data.skills.map(skill => `
      <div class="skill-item">${skill}</div>
      `).join('')}
    </div>
  </section>

  <section id="contact">
    <h2 class="section-title">// Contact</h2>
    <div class="card">
      <p>📧 ${data.email}</p>
      <p>📱 ${data.phone}</p>
      ${data.github ? `<p>🐙 ${data.github}</p>` : ''}
      ${data.linkedin ? `<p>💼 ${data.linkedin}</p>` : ''}
    </div>
  </section>
</body>
</html>`;
}

// ===== 像素艺术风格 =====
function generatePixelArtTemplate(
  _template: TemplateV2,
  data: ResumeData,
  colors: TemplateV2['colors'],
  navigation: string[]
): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} - ${data.title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; image-rendering: pixelated; }
    body {
      font-family: 'VT323', monospace;
      background: ${colors.background};
      color: ${colors.text};
      font-size: 20px;
      line-height: 1.4;
    }
    .pixel-border {
      border: 4px solid ${colors.primary};
      box-shadow: 
        4px 4px 0 ${colors.secondary},
        -4px -4px 0 ${colors.accent};
    }
    nav {
      background: ${colors.primary};
      padding: 1rem;
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;
    }
    nav a {
      color: white;
      text-decoration: none;
      font-family: 'Press Start 2P', cursive;
      font-size: 0.6rem;
      padding: 0.5rem 1rem;
      background: ${colors.secondary};
      border: 2px solid white;
      transition: all 0.1s;
    }
    nav a:hover {
      transform: translate(-2px, -2px);
      box-shadow: 4px 4px 0 rgba(0,0,0,0.3);
    }
    .hero {
      text-align: center;
      padding: 4rem 2rem;
      background: linear-gradient(180deg, ${colors.primary}22 0%, transparent 100%);
    }
    .hero h1 {
      font-family: 'Press Start 2P', cursive;
      font-size: clamp(1rem, 5vw, 2rem);
      color: ${colors.primary};
      text-shadow: 4px 4px 0 ${colors.secondary};
      margin-bottom: 1rem;
      animation: bounce 1s infinite;
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    .avatar {
      width: 120px;
      height: 120px;
      background: ${colors.primary};
      margin: 0 auto 2rem;
      border: 4px solid ${colors.secondary};
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Press Start 2P', cursive;
      font-size: 3rem;
    }
    section {
      padding: 3rem 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    .section-title {
      font-family: 'Press Start 2P', cursive;
      font-size: 1rem;
      color: ${colors.primary};
      margin-bottom: 2rem;
      text-align: center;
      position: relative;
    }
    .section-title::before,
    .section-title::after {
      content: '◆';
      margin: 0 1rem;
      color: ${colors.accent};
    }
    .card {
      background: white;
      border: 4px solid ${colors.primary};
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      position: relative;
    }
    .card::before {
      content: '';
      position: absolute;
      top: 4px;
      left: 4px;
      right: -4px;
      bottom: -4px;
      background: ${colors.secondary};
      z-index: -1;
    }
    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .exp-title {
      font-family: 'Press Start 2P', cursive;
      font-size: 0.6rem;
      color: ${colors.primary};
    }
    .exp-date {
      font-size: 0.9rem;
      color: ${colors.secondary};
    }
    .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }
    .skill-tag {
      padding: 0.5rem 1rem;
      background: ${colors.primary};
      color: white;
      font-family: 'Press Start 2P', cursive;
      font-size: 0.5rem;
      border: 2px solid ${colors.secondary};
    }
    .contact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }
    .contact-item {
      padding: 1rem;
      background: ${colors.accent};
      border: 4px solid ${colors.primary};
      text-align: center;
      font-family: 'Press Start 2P', cursive;
      font-size: 0.5rem;
    }
    .heart {
      color: ${colors.accent};
      animation: pulse 0.5s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    footer {
      text-align: center;
      padding: 2rem;
      background: ${colors.primary};
      color: white;
      font-family: 'Press Start 2P', cursive;
      font-size: 0.5rem;
    }
  </style>
</head>
<body>
  <nav>
    ${navigation.map(nav => `<a href="#${nav}">${nav.toUpperCase()}</a>`).join('')}
  </nav>

  <section class="hero" id="home">
    <div class="avatar">${data.name.charAt(0)}</div>
    <h1>${data.name}</h1>
    <p style="font-size: 1.5rem; color: ${colors.secondary}">${data.title}</p>
  </section>

  <section id="about">
    <h2 class="section-title">ABOUT ME</h2>
    <div class="card">
      <p>${data.summary}</p>
    </div>
  </section>

  <section id="experience">
    <h2 class="section-title">EXPERIENCE</h2>
    ${data.experience.map(exp => `
    <div class="card">
      <div class="exp-header">
        <span class="exp-title">${exp.company}</span>
        <span class="exp-date">${exp.startDate}-${exp.current ? 'NOW' : exp.endDate}</span>
      </div>
      <p style="font-family: 'Press Start 2P', cursive; font-size: 0.5rem; margin-bottom: 0.5rem;">${exp.title}</p>
      <ul style="padding-left: 1.5rem;">
        ${exp.description.map(d => `<li>${d}</li>`).join('')}
      </ul>
    </div>
    `).join('')}
  </section>

  <section id="skills">
    <h2 class="section-title">SKILLS</h2>
    <div class="skills-container">
      ${data.skills.map(skill => `
      <span class="skill-tag">${skill}</span>
      `).join('')}
    </div>
  </section>

  <section id="contact">
    <h2 class="section-title">CONTACT</h2>
    <div class="contact-grid">
      <div class="contact-item">📧<br>${data.email}</div>
      <div class="contact-item">📱<br>${data.phone}</div>
      ${data.github ? `<div class="contact-item">🐱<br>${data.github}</div>` : ''}
      ${data.linkedin ? `<div class="contact-item">💼<br>${data.linkedin}</div>` : ''}
    </div>
  </section>

  <footer>
    <p>MADE WITH <span class="heart">♥</span> BY ${data.name.toUpperCase()}</p>
    <p style="margin-top: 1rem;">© 2026</p>
  </footer>
</body>
</html>`;
}

// ===== 涂鸦风格 =====
function generateDoodleTemplate(
  _template: TemplateV2,
  data: ResumeData,
  colors: TemplateV2['colors'],
  navigation: string[]
): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} - ${data.title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Comic+Neue:wght@400;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Comic Neue', cursive;
      background: ${colors.background};
      color: ${colors.text};
      font-size: 18px;
      line-height: 1.6;
      background-image: 
        radial-gradient(circle at 20% 50%, ${colors.primary}11 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, ${colors.secondary}11 0%, transparent 50%);
    }
    .doodle-border {
      border: 3px solid ${colors.primary};
      border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
    }
    nav {
      padding: 1.5rem;
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    nav a {
      padding: 0.75rem 1.5rem;
      background: white;
      border: 2px solid ${colors.primary};
      border-radius: 50% 20% / 10% 40%;
      color: ${colors.text};
      text-decoration: none;
      font-weight: bold;
      transition: all 0.3s;
      box-shadow: 3px 3px 0 ${colors.secondary};
    }
    nav a:hover {
      transform: rotate(-2deg) scale(1.05);
      box-shadow: 5px 5px 0 ${colors.accent};
    }
    .hero {
      text-align: center;
      padding: 4rem 2rem;
    }
    .hero h1 {
      font-family: 'Caveat', cursive;
      font-size: clamp(3rem, 10vw, 6rem);
      color: ${colors.primary};
      transform: rotate(-2deg);
      text-shadow: 3px 3px 0 ${colors.accent};
    }
    .hero .subtitle {
      font-size: 1.5rem;
      color: ${colors.secondary};
      margin-top: 1rem;
      transform: rotate(1deg);
    }
    .sticker {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: ${colors.accent};
      border: 2px solid ${colors.primary};
      transform: rotate(-3deg);
      font-weight: bold;
    }
    section {
      padding: 3rem 2rem;
      max-width: 900px;
      margin: 0 auto;
    }
    .section-title {
      font-family: 'Caveat', cursive;
      font-size: 2.5rem;
      color: ${colors.primary};
      margin-bottom: 2rem;
      display: inline-block;
      transform: rotate(-2deg);
      border-bottom: 3px wavy ${colors.accent};
    }
    .card {
      background: white;
      padding: 2rem;
      margin-bottom: 2rem;
      position: relative;
      box-shadow: 5px 5px 0 ${colors.secondary};
    }
    .card::before {
      content: '';
      position: absolute;
      top: -5px;
      left: -5px;
      right: 5px;
      bottom: 5px;
      border: 2px solid ${colors.primary};
      border-radius: 20px 50px 30px 40px;
      pointer-events: none;
    }
    .tape {
      position: absolute;
      top: -15px;
      left: 50%;
      transform: translateX(-50%) rotate(-5deg);
      width: 100px;
      height: 30px;
      background: rgba(255, 255, 255, 0.6);
      border: 1px solid rgba(0,0,0,0.1);
    }
    .skills-cloud {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }
    .skill-bubble {
      padding: 0.5rem 1rem;
      background: ${colors.primary};
      color: white;
      border-radius: 50px;
      font-weight: bold;
      transform: rotate(var(--rotation, 0deg));
    }
    .skill-bubble:nth-child(odd) { --rotation: -3deg; }
    .skill-bubble:nth-child(even) { --rotation: 3deg; }
    .contact-hand {
      font-size: 3rem;
      text-align: center;
      animation: wave 2s infinite;
    }
    @keyframes wave {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(20deg); }
      75% { transform: rotate(-10deg); }
    }
    footer {
      text-align: center;
      padding: 3rem;
      background: ${colors.primary};
      color: white;
      margin-top: 3rem;
    }
    .scribble {
      position: absolute;
      width: 50px;
      height: 50px;
      border: 2px solid ${colors.accent};
      border-radius: 50%;
      opacity: 0.3;
    }
  </style>
</head>
<body>
  <nav>
    ${navigation.map(nav => `<a href="#${nav}">${nav}</a>`).join('')}
  </nav>

  <section class="hero" id="home">
    <span class="sticker">Hello! 👋</span>
    <h1>${data.name}</h1>
    <p class="subtitle">${data.title}</p>
    <p style="margin-top: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">
      ${data.summary}
    </p>
  </section>

  <section id="experience">
    <h2 class="section-title">My Journey ✏️</h2>
    ${data.experience.map(exp => `
    <div class="card" style="position: relative;">
      <div class="tape"></div>
      <h3 style="color: ${colors.primary}; font-size: 1.5rem;">${exp.title}</h3>
      <p style="color: ${colors.secondary}; margin-bottom: 1rem;">
        ${exp.company} • ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
      </p>
      <ul style="padding-left: 1.5rem;">
        ${exp.description.map(d => `<li>${d}</li>`).join('')}
      </ul>
    </div>
    `).join('')}
  </section>

  <section id="skills">
    <h2 class="section-title">Things I Know 🎯</h2>
    <div class="skills-cloud">
      ${data.skills.map(skill => `
      <span class="skill-bubble">${skill}</span>
      `).join('')}
    </div>
  </section>

  <section id="contact">
    <h2 class="section-title">Let's Talk! 💬</h2>
    <div class="contact-hand">👋</div>
    <div style="text-align: center; margin-top: 2rem;">
      <p>📧 ${data.email}</p>
      <p>📱 ${data.phone}</p>
      ${data.github ? `<p>🐙 ${data.github}</p>` : ''}
    </div>
  </section>

  <footer>
    <p style="font-family: 'Caveat', cursive; font-size: 1.5rem;">
      Made with ❤️ by ${data.name}
    </p>
  </footer>
</body>
</html>`;
}

// ===== 作品集专业版 =====
function generatePortfolioProTemplate(
  _template: TemplateV2,
  data: ResumeData,
  colors: TemplateV2['colors'],
  navigation: string[]
): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} - ${data.title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', sans-serif;
      background: ${colors.background};
      color: ${colors.text};
      line-height: 1.6;
    }
    nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      padding: 1.5rem 3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(10px);
      z-index: 100;
    }
    .logo {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      font-weight: 700;
    }
    .nav-links {
      display: flex;
      gap: 2rem;
    }
    .nav-links a {
      color: ${colors.text};
      text-decoration: none;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      position: relative;
    }
    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 1px;
      background: ${colors.primary};
      transition: width 0.3s;
    }
    .nav-links a:hover::after {
      width: 100%;
    }
    .hero {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      padding: 0 5rem;
      gap: 4rem;
    }
    .hero-content h1 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(3rem, 6vw, 5rem);
      line-height: 1.1;
      margin-bottom: 1.5rem;
    }
    .hero-content p {
      font-size: 1.125rem;
      color: #666;
      margin-bottom: 2rem;
      max-width: 500px;
    }
    .cta-button {
      display: inline-block;
      padding: 1rem 2.5rem;
      background: ${colors.primary};
      color: white;
      text-decoration: none;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      transition: all 0.3s;
    }
    .cta-button:hover {
      background: ${colors.secondary};
      transform: translateY(-2px);
    }
    .hero-image {
      aspect-ratio: 3/4;
      background: linear-gradient(135deg, ${colors.primary}22, ${colors.secondary}22);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 8rem;
      color: ${colors.primary};
    }
    section {
      padding: 8rem 5rem;
    }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 4rem;
    }
    .section-title {
      font-family: 'Playfair Display', serif;
      font-size: 3rem;
    }
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }
    .project-card {
      position: relative;
      overflow: hidden;
      aspect-ratio: 4/3;
      background: #f5f5f5;
      cursor: pointer;
    }
    .project-card img,
    .project-card .project-placeholder {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s;
    }
    .project-card:hover .project-placeholder {
      transform: scale(1.05);
    }
    .project-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.7);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 2rem;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .project-card:hover .project-overlay {
      opacity: 1;
    }
    .project-title {
      color: white;
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    .project-category {
      color: #aaa;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .about-grid {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 4rem;
      align-items: start;
    }
    .about-image {
      aspect-ratio: 1;
      background: ${colors.primary}11;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 6rem;
    }
    .about-content h3 {
      font-family: 'Playfair Display', serif;
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }
    .experience-list {
      margin-top: 3rem;
    }
    .exp-item {
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 2rem;
      padding: 1.5rem 0;
      border-bottom: 1px solid #eee;
    }
    .exp-year {
      color: #999;
      font-size: 0.875rem;
    }
    .exp-title {
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    .exp-company {
      color: #666;
      font-size: 0.875rem;
    }
    footer {
      padding: 4rem 5rem;
      background: ${colors.primary};
      color: white;
      text-align: center;
    }
    footer h2 {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    .social-links {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 2rem;
    }
    .social-links a {
      color: white;
      text-decoration: none;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    @media (max-width: 768px) {
      .hero { grid-template-columns: 1fr; padding: 8rem 2rem 4rem; }
      section { padding: 4rem 2rem; }
      .about-grid { grid-template-columns: 1fr; }
      nav { padding: 1rem 2rem; }
      .nav-links { display: none; }
    }
  </style>
</head>
<body>
  <nav>
    <div class="logo">${data.name.split(' ')[0]}</div>
    <div class="nav-links">
      ${navigation.map(nav => `<a href="#${nav}">${nav}</a>`).join('')}
    </div>
  </nav>

  <section class="hero" id="home">
    <div class="hero-content">
      <h1>${data.name}</h1>
      <p>${data.title} — ${data.summary}</p>
      <a href="#contact" class="cta-button">Get in Touch</a>
    </div>
    <div class="hero-image">
      ${data.name.charAt(0)}
    </div>
  </section>

  <section id="projects">
    <div class="section-header">
      <h2 class="section-title">Selected Work</h2>
    </div>
    <div class="projects-grid">
      ${data.projects.map(proj => `
      <div class="project-card">
        <div class="project-placeholder" style="background: linear-gradient(135deg, ${colors.primary}22, ${colors.secondary}22); display: flex; align-items: center; justify-content: center; font-size: 4rem;">
          🚀
        </div>
        <div class="project-overlay">
          <h3 class="project-title">${proj.name}</h3>
          <p class="project-category">${proj.technologies.join(', ')}</p>
        </div>
      </div>
      `).join('')}
    </div>
  </section>

  <section id="about" style="background: #f9f9f9;">
    <div class="about-grid">
      <div class="about-image">${data.name.charAt(0)}</div>
      <div class="about-content">
        <h3>About Me</h3>
        <p>${data.summary}</p>
        
        <div class="experience-list">
          <h4 style="font-family: 'Playfair Display', serif; font-size: 1.5rem; margin-bottom: 1.5rem;">Experience</h4>
          ${data.experience.slice(0, 3).map(exp => `
          <div class="exp-item">
            <span class="exp-year">${exp.startDate} — ${exp.current ? 'Present' : exp.endDate}</span>
            <div>
              <div class="exp-title">${exp.title}</div>
              <div class="exp-company">${exp.company}</div>
            </div>
          </div>
          `).join('')}
        </div>
      </div>
    </div>
  </section>

  <footer id="contact">
    <h2>Let's work together</h2>
    <p>${data.email}</p>
    <div class="social-links">
      ${data.github ? `<a href="https://${data.github}">GitHub</a>` : ''}
      ${data.linkedin ? `<a href="https://${data.linkedin}">LinkedIn</a>` : ''}
      <a href="mailto:${data.email}">Email</a>
    </div>
  </footer>
</body>
</html>`;
}

// ===== 干净代码风格（默认） =====
function generateCleanCodeTemplate(
  _template: TemplateV2,
  data: ResumeData,
  colors: TemplateV2['colors'],
  navigation: string[]
): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} - ${data.title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: ${colors.background};
      color: ${colors.text};
      line-height: 1.6;
    }
    nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255,255,255,0.9);
      backdrop-filter: blur(10px);
      z-index: 100;
      border-bottom: 1px solid rgba(0,0,0,0.05);
    }
    .logo {
      font-weight: 700;
      font-size: 1.25rem;
    }
    .nav-links {
      display: flex;
      gap: 2rem;
    }
    .nav-links a {
      color: ${colors.text};
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    .nav-links a:hover {
      opacity: 1;
    }
    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 6rem 2rem 4rem;
      max-width: 800px;
      margin: 0 auto;
    }
    .hero h1 {
      font-size: clamp(2.5rem, 6vw, 4rem);
      font-weight: 700;
      line-height: 1.1;
      margin-bottom: 1rem;
      letter-spacing: -0.02em;
    }
    .hero .subtitle {
      font-size: 1.25rem;
      color: #666;
      margin-bottom: 1.5rem;
    }
    .hero p {
      font-size: 1.125rem;
      color: #555;
      max-width: 600px;
    }
    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }
    .social-links a {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      color: ${colors.text};
      text-decoration: none;
      font-size: 0.875rem;
      transition: all 0.2s;
    }
    .social-links a:hover {
      border-color: ${colors.primary};
      background: ${colors.primary};
      color: white;
    }
    section {
      padding: 5rem 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    .section-title {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #999;
      margin-bottom: 2rem;
    }
    .exp-item {
      padding: 1.5rem 0;
      border-bottom: 1px solid #eee;
    }
    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 0.5rem;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .exp-title {
      font-weight: 600;
      font-size: 1.125rem;
    }
    .exp-date {
      font-size: 0.875rem;
      color: #999;
    }
    .exp-company {
      color: #666;
      margin-bottom: 0.75rem;
    }
    .exp-desc {
      color: #555;
      font-size: 0.9375rem;
    }
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .skill-tag {
      padding: 0.375rem 0.875rem;
      background: #f5f5f5;
      border-radius: 4px;
      font-size: 0.875rem;
      color: #555;
    }
    footer {
      padding: 3rem 2rem;
      text-align: center;
      color: #999;
      font-size: 0.875rem;
      border-top: 1px solid #eee;
    }
    @media (max-width: 640px) {
      .nav-links { display: none; }
    }
  </style>
</head>
<body>
  <nav>
    <div class="logo">${data.name.split(' ')[0]}</div>
    <div class="nav-links">
      ${navigation.map(nav => `<a href="#${nav}">${nav.charAt(0).toUpperCase() + nav.slice(1)}</a>`).join('')}
    </div>
  </nav>

  <section class="hero" id="home">
    <h1>${data.name}</h1>
    <p class="subtitle">${data.title}</p>
    <p>${data.summary}</p>
    <div class="social-links">
      ${data.github ? `<a href="https://${data.github}">GitHub</a>` : ''}
      ${data.linkedin ? `<a href="https://${data.linkedin}">LinkedIn</a>` : ''}
      <a href="mailto:${data.email}">Email</a>
    </div>
  </section>

  <section id="experience">
    <h2 class="section-title">Experience</h2>
    ${data.experience.map(exp => `
    <div class="exp-item">
      <div class="exp-header">
        <span class="exp-title">${exp.title}</span>
        <span class="exp-date">${exp.startDate} — ${exp.current ? 'Present' : exp.endDate}</span>
      </div>
      <div class="exp-company">${exp.company}</div>
      <div class="exp-desc">
        ${exp.description.map(d => `<p>${d}</p>`).join('')}
      </div>
    </div>
    `).join('')}
  </section>

  <section id="skills">
    <h2 class="section-title">Skills</h2>
    <div class="skills-grid">
      ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
    </div>
  </section>

  <section id="projects">
    <h2 class="section-title">Projects</h2>
    ${data.projects.map(proj => `
    <div class="exp-item">
      <div class="exp-title">${proj.name}</div>
      <div class="exp-desc">${proj.description}</div>
      <div class="skills-grid" style="margin-top: 0.75rem;">
        ${proj.technologies.map(tech => `<span class="skill-tag">${tech}</span>`).join('')}
      </div>
    </div>
    `).join('')}
  </section>

  <footer id="contact">
    <p>© ${new Date().getFullYear()} ${data.name} — ${data.email}</p>
  </footer>
</body>
</html>`;
}

// 导出模板 HTML
export function exportTemplateHTML(
  templateId: string,
  data: ResumeData,
  customColors?: Partial<TemplateV2['colors']>
): { html: string; filename: string } {
  const html = generateTemplateHTMLV2(templateId, data, customColors);
  const filename = `${data.name.replace(/\s+/g, '_')}_Portfolio.html`;
  return { html, filename };
}

// 下载 HTML 文件
export function downloadHTML(html: string, filename: string): void {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ===== 新增 4 个高质量模板 =====

// --- Minimalist V2 ---
function generateMinimalistV2Template(
  _template: TemplateV2,
  data: ResumeData,
  colors: TemplateV2['colors'],
  _navigation: string[]
): string {
  const expHTML = data.experience.map(exp => `
    <div class="exp-item">
      <div class="exp-dot"></div>
      <div class="exp-header">
        <div>
          <h3 class="exp-role">${exp.title}</h3>
          <p class="exp-company">${exp.company}</p>
        </div>
        <span class="exp-period">${exp.startDate} – ${exp.current ? 'Present' : (exp.endDate || '')}</span>
      </div>
      <ul class="exp-desc">${exp.description.map(d => `<li>${d}</li>`).join('')}</ul>
    </div>`).join('');

  const projHTML = data.projects.map(p => `
    <div class="proj-item">
      <h3 class="proj-name">${p.name}${p.link ? ` <span class="proj-link">↗</span>` : ''}</h3>
      <p class="proj-desc">${p.description}</p>
      ${p.technologies?.length ? `<div class="proj-tech">${p.technologies.map(t => `<span>${t}</span>`).join('')}</div>` : ''}
    </div>`).join('');

  const eduHTML = data.education.map(e => `
    <div class="edu-item">
      <h3 class="edu-school">${e.school}</h3>
      <p class="edu-degree">${e.degree}${e.field ? `, ${e.field}` : ''}</p>
      <p class="edu-year">${e.endDate || e.startDate}</p>
    </div>`).join('');

  const skillsHTML = (data.skills || []).map(s => `<span class="skill-chip">${s}</span>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${data.name}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:#fff;color:#0f172a;line-height:1.6}
.page{max-width:900px;margin:0 auto;padding:3rem 2rem}
header{border-bottom:1px solid #f1f5f9;padding-bottom:2rem;margin-bottom:2.5rem}
h1{font-size:3rem;font-weight:800;letter-spacing:-0.03em;color:#0f172a}
.subtitle{font-size:1.1rem;color:#94a3b8;font-weight:500;text-transform:uppercase;letter-spacing:.12em;margin:.5rem 0 1.5rem}
.contacts{display:flex;flex-wrap:wrap;gap:1.5rem;font-size:.875rem;color:#475569}
.contacts span{display:flex;align-items:center;gap:.4rem}
.layout{display:grid;grid-template-columns:2fr 1fr;gap:3rem}
h2{font-size:.8rem;font-weight:700;text-transform:uppercase;letter-spacing:.2em;color:#94a3b8;border-bottom:1px solid #f8fafc;padding-bottom:.5rem;margin-bottom:1.5rem}
.summary{font-size:1.1rem;color:#334155;line-height:1.8;font-style:italic;margin-bottom:2.5rem}
.exp-item{position:relative;padding-left:1.5rem;border-left:2px solid #f1f5f9;margin-bottom:2rem}
.exp-dot{position:absolute;left:-9px;top:4px;width:16px;height:16px;border-radius:50%;background:#fff;border:2px solid #e2e8f0}
.exp-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.5rem}
.exp-role{font-size:1.1rem;font-weight:700}
.exp-company{color:#64748b;font-weight:500}
.exp-period{font-size:.75rem;font-family:monospace;color:#94a3b8;background:#f8fafc;padding:.2rem .5rem;border-radius:.25rem;white-space:nowrap}
.exp-desc{padding-left:1rem;color:#475569;font-size:.9rem;margin-top:.5rem}
.exp-desc li{margin-bottom:.25rem}
.proj-item{margin-bottom:1.5rem}
.proj-name{font-size:1rem;font-weight:700;color:#0f172a}
.proj-link{color:#94a3b8;font-size:.8rem}
.proj-desc{font-size:.875rem;color:#475569;margin:.25rem 0 .5rem}
.proj-tech{display:flex;flex-wrap:wrap;gap:.3rem}
.proj-tech span{font-size:.7rem;background:#f1f5f9;color:#475569;padding:.15rem .5rem;border-radius:.25rem}
.skill-chip{display:inline-block;padding:.3rem .75rem;background:#f8fafc;color:#334155;font-size:.8rem;font-weight:500;border-radius:9999px;border:1px solid #e2e8f0;margin:.2rem}
.edu-item{margin-bottom:1.2rem}
.edu-school{font-weight:700;color:#0f172a}
.edu-degree{font-size:.875rem;color:#475569}
.edu-year{font-size:.75rem;font-family:monospace;color:#94a3b8;margin-top:.25rem}
.section{margin-bottom:2.5rem}
.cta{background:#0f172a;color:#fff;border-radius:.75rem;padding:1rem;margin-top:2rem}
.cta p:first-child{font-size:.65rem;text-transform:uppercase;letter-spacing:.15em;opacity:.5;margin-bottom:.25rem}
.cta p:last-child{font-size:.875rem;font-weight:500}
</style>
</head>
<body>
<div class="page">
  <header>
    <h1>${data.name}</h1>
    <p class="subtitle">${data.title}</p>
    <div class="contacts">
      ${data.email ? `<span>✉ ${data.email}</span>` : ''}
      ${data.phone ? `<span>📞 ${data.phone}</span>` : ''}
      ${data.location ? `<span>📍 ${data.location}</span>` : ''}
      ${data.website ? `<span>🌐 ${data.website}</span>` : ''}
    </div>
  </header>
  <div class="layout">
    <div>
      ${data.summary ? `<p class="summary">"${data.summary}"</p>` : ''}
      ${data.experience?.length ? `<div class="section"><h2>Experience</h2>${expHTML}</div>` : ''}
      ${data.projects?.length ? `<div class="section"><h2>Projects</h2>${projHTML}</div>` : ''}
    </div>
    <div>
      ${data.skills?.length ? `<div class="section"><h2>Expertise</h2><div>${skillsHTML}</div></div>` : ''}
      ${data.education?.length ? `<div class="section"><h2>Education</h2>${eduHTML}</div>` : ''}
      <div class="cta"><p>Available for</p><p>Full-time opportunities &amp; consulting</p></div>
    </div>
  </div>
</div>
</body>
</html>`;
}

// --- Bento V2 ---
function generateBentoV2Template(
  _template: TemplateV2,
  data: ResumeData,
  _colors: TemplateV2['colors'],
  _navigation: string[]
): string {
  const skillsHTML = (data.skills || []).map(s => `<span class="skill-tag">${s}</span>`).join('');
  const expHTML = data.experience.map(exp => `
    <div class="exp-row">
      <div class="exp-left">
        <h3>${exp.title}</h3>
        <p class="exp-co">${exp.company}</p>
      </div>
      <div class="exp-right">
        <span class="period">${exp.startDate} – ${exp.current ? 'Now' : (exp.endDate || '')}</span>
        <p class="exp-detail">${exp.description[0] || ''}</p>
      </div>
    </div>`).join('');
  const projHTML = data.projects.slice(0, 4).map(p => `
    <div class="proj-card">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
    </div>`).join('');
  const eduHTML = data.education.map(e => `
    <div class="edu-row">
      <h3>${e.school}</h3>
      <p>${e.degree}${e.field ? `, ${e.field}` : ''}</p>
      <span>${e.endDate || e.startDate}</span>
    </div>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${data.name}</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Space Grotesk',sans-serif;background:#f8f9fa;color:#1a1a2e;min-height:100vh;padding:2rem}
.grid{display:grid;grid-template-columns:repeat(12,1fr);gap:1rem;max-width:1100px;margin:0 auto}
.card{border-radius:2rem;padding:2rem}
.profile{grid-column:span 8;background:#fff;border:1px solid #e8ecf0;box-shadow:0 1px 3px rgba(0,0,0,.05)}
.contact-card{grid-column:span 4;background:#1a1a2e;color:#fff;display:flex;flex-direction:column;justify-content:space-between}
.skills-card{grid-column:span 4;background:#eff6ff;border:1px solid #dbeafe}
.exp-card{grid-column:span 8;background:#fff;border:1px solid #e8ecf0;box-shadow:0 1px 3px rgba(0,0,0,.05)}
.proj-card-wrap{grid-column:span 7;background:#fff;border:1px solid #e8ecf0;box-shadow:0 1px 3px rgba(0,0,0,.05)}
.edu-card{grid-column:span 5;background:#ecfdf5;border:1px solid #d1fae5}
h1{font-size:3.5rem;font-weight:900;letter-spacing:-.03em;background:linear-gradient(135deg,#1a1a2e,#64748b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:.75rem}
.role{font-size:1.4rem;font-weight:500;color:#3b82f6;margin-bottom:1rem}
.summary-text{color:#64748b;line-height:1.7;font-size:1rem}
.contact-item{display:flex;align-items:center;gap:.75rem;margin-bottom:1rem}
.contact-icon{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0}
.contact-text{font-size:.875rem;font-weight:500;word-break:break-all}
.card h2{font-size:1rem;font-weight:700;margin-bottom:1.5rem;display:flex;align-items:center;gap:.5rem}
.card h2::before{content:'';display:inline-block;width:8px;height:8px;border-radius:50%}
.skills-card h2::before{background:#3b82f6}
.exp-card h2::before{background:#1a1a2e}
.proj-card-wrap h2::before{background:#10b981}
.edu-card h2::before{background:#059669}
.skill-tag{display:inline-block;padding:.4rem 1rem;background:#fff;border-radius:.75rem;font-size:.8rem;font-weight:700;color:#1d4ed8;box-shadow:0 1px 2px rgba(0,0,0,.05);margin:.2rem}
.exp-row{margin-bottom:1.5rem;padding-bottom:1.5rem;border-bottom:1px solid #f1f5f9}
.exp-row:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
.exp-left h3{font-size:1rem;font-weight:700;margin-bottom:.2rem}
.exp-co{color:#64748b;font-size:.9rem}
.period{font-size:.7rem;font-weight:900;text-transform:uppercase;letter-spacing:.1em;color:#94a3b8}
.exp-detail{font-size:.85rem;color:#475569;margin-top:.3rem;line-height:1.5}
.proj-grid{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}
.proj-card{padding:1.25rem;border-radius:1rem;background:#f8fafc;border:1px solid #f1f5f9}
.proj-card h3{font-weight:700;font-size:.95rem;margin-bottom:.4rem}
.proj-card p{font-size:.8rem;color:#64748b;line-height:1.5}
.edu-row{margin-bottom:1.25rem}
.edu-row h3{font-weight:700;color:#065f46;font-size:1rem}
.edu-row p{font-size:.875rem;color:#047857;margin:.2rem 0}
.edu-row span{font-size:.7rem;font-weight:900;color:#6ee7b7;text-transform:uppercase;letter-spacing:.1em}
@media(max-width:768px){.profile,.contact-card,.skills-card,.exp-card,.proj-card-wrap,.edu-card{grid-column:span 12}}
</style>
</head>
<body>
<div class="grid">
  <div class="card profile">
    <h1>${data.name}</h1>
    <p class="role">${data.title}</p>
    <p class="summary-text">${data.summary}</p>
  </div>
  <div class="card contact-card">
    <div>
      ${data.email ? `<div class="contact-item"><div class="contact-icon">✉</div><span class="contact-text">${data.email}</span></div>` : ''}
      ${data.phone ? `<div class="contact-item"><div class="contact-icon">📞</div><span class="contact-text">${data.phone}</span></div>` : ''}
      ${data.location ? `<div class="contact-item"><div class="contact-icon">📍</div><span class="contact-text">${data.location}</span></div>` : ''}
    </div>
  </div>
  ${data.skills?.length ? `<div class="card skills-card"><h2>Expertise</h2><div>${skillsHTML}</div></div>` : ''}
  ${data.experience?.length ? `<div class="card exp-card"><h2>Experience</h2>${expHTML}</div>` : ''}
  ${data.projects?.length ? `<div class="card proj-card-wrap"><h2>Projects</h2><div class="proj-grid">${projHTML}</div></div>` : ''}
  ${data.education?.length ? `<div class="card edu-card"><h2>Education</h2>${eduHTML}</div>` : ''}
</div>
</body>
</html>`;
}

// --- Terminal Pro V2 ---
function generateTerminalProV2Template(
  _template: TemplateV2,
  data: ResumeData,
  _colors: TemplateV2['colors'],
  _navigation: string[]
): string {
  const skillsLine = (data.skills || []).map(s => `<span class="skill">${s.toLowerCase().replace(/ /g,'_')}/</span>`).join('');
  const expHTML = data.experience.map((exp, i) => `
    <div class="exp-block">
      <div class="cmd-line"><span class="num">${1024+i}</span> <span class="cmd">cat ${exp.company.toLowerCase().replace(/\s+/g,'_')}.json</span></div>
      <div class="json-block"><pre>{
  "position": "${exp.title}",
  "company":  "${exp.company}",
  "period":   "${exp.startDate} → ${exp.current ? 'Present' : (exp.endDate||'')}",
  "location": "${exp.location||''}"
}</pre>
      <ul>${exp.description.map(d=>`<li>${d}</li>`).join('')}</ul></div>
    </div>`).join('');
  const projHTML = data.projects.map(p => `
    <div class="proj-line">
      <span class="perm">drwxr-xr-x</span>
      <div><p class="proj-name">${p.name}</p><p class="proj-desc">${p.description}</p></div>
    </div>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${data.name} — terminal</title>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'JetBrains Mono',monospace;background:#0d1117;color:#c9d1d9;min-height:100vh}
.window{max-width:900px;margin:2rem auto;border-radius:12px;overflow:hidden;border:1px solid #30363d;box-shadow:0 20px 60px rgba(0,0,0,.5)}
.titlebar{background:#161b22;padding:.75rem 1rem;display:flex;align-items:center;gap:.5rem}
.dot{width:12px;height:12px;border-radius:50%}
.dot-r{background:#ff5f56}.dot-y{background:#ffbd2e}.dot-g{background:#27c93f}
.title-text{margin-left:1rem;font-size:.75rem;color:#8b949e}
.body{padding:2rem;background:#0d1117}
.prompt{display:flex;gap:.75rem;color:#79c0ff;margin-bottom:.25rem}
.prompt .dollar{color:#8b949e}
.output{padding:.5rem 0 1.5rem 1rem}
.name{font-size:2rem;font-weight:700;color:#ffa657}
.role{font-size:1.2rem;color:#7ee787;margin-top:.25rem}
.json-contact{color:#a5d6ff}
.json-contact pre{font-size:.85rem;line-height:1.6;white-space:pre-wrap}
.summary-text{color:#8b949e;font-style:italic;line-height:1.7;font-size:.9rem;border-left:2px solid #30363d;padding-left:1rem}
.skills-row{display:flex;flex-wrap:wrap;gap:.5rem;padding:.5rem 0 1.5rem 1rem}
.skill{color:#7ee787;font-size:.85rem}
.section-cmd{margin-bottom:1.5rem}
.cmd-line{display:flex;gap:.75rem;align-items:baseline}
.num{color:#8b949e;font-size:.75rem;min-width:3rem}
.cmd{color:#79c0ff}
.json-block{padding-left:3.5rem;margin-top:.5rem}
.json-block pre{color:#a5d6ff;font-size:.8rem;line-height:1.6;margin-bottom:.5rem}
.json-block ul{list-style:none;padding:0}
.json-block li{color:#c9d1d9;font-size:.82rem;padding:.15rem 0}
.json-block li::before{content:"→ ";color:#27c93f}
.exp-block{margin-bottom:1.5rem}
.proj-line{display:flex;gap:1.5rem;margin-bottom:.75rem;padding-left:1rem}
.perm{color:#27c93f;font-size:.75rem;flex-shrink:0}
.proj-name{color:#7ee787;font-weight:700;font-size:.9rem}
.proj-desc{color:#8b949e;font-size:.8rem;margin-top:.2rem}
.cursor{display:inline-block;width:8px;height:1.2em;background:#79c0ff;animation:blink 1s step-end infinite;vertical-align:text-bottom}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
</style>
</head>
<body>
<div class="window">
  <div class="titlebar">
    <div class="dot dot-r"></div><div class="dot dot-y"></div><div class="dot dot-g"></div>
    <span class="title-text">bash — ${data.name.toLowerCase().replace(/ /g,'_')}.sh — 80×24</span>
  </div>
  <div class="body">
    <div class="prompt"><span class="dollar">$</span><span>whoami</span></div>
    <div class="output"><p class="name">${data.name}</p><p class="role">${data.title}</p></div>
    <div class="prompt"><span class="dollar">$</span><span>cat contact_info.json</span></div>
    <div class="output json-contact"><pre>{
  "email":    "${data.email}",
  "phone":    "${data.phone}",
  "location": "${data.location}"${data.website ? `,
  "website":  "https://${data.website}"` : ''}
}</pre></div>
    ${data.summary ? `<div class="prompt"><span class="dollar">$</span><span>grep -r "summary" .</span></div>
    <div class="output"><p class="summary-text">${data.summary}</p></div>` : ''}
    ${data.skills?.length ? `<div class="prompt"><span class="dollar">$</span><span>ls skills/</span></div>
    <div class="skills-row">${skillsLine}</div>` : ''}
    ${data.experience?.length ? `<div class="prompt"><span class="dollar">$</span><span>history | grep "work_experience"</span></div>
    <div class="output section-cmd">${expHTML}</div>` : ''}
    ${data.projects?.length ? `<div class="prompt"><span class="dollar">$</span><span>ls -la projects/</span></div>
    <div class="output">${projHTML}</div>` : ''}
    <div style="margin-top:2rem"><span class="dollar">$ </span><span class="cursor"></span></div>
  </div>
</div>
</body>
</html>`;
}

// --- Elegant V2 ---
function generateElegantV2Template(
  _template: TemplateV2,
  data: ResumeData,
  _colors: TemplateV2['colors'],
  _navigation: string[]
): string {
  const expHTML = data.experience.map(exp => `
    <div class="exp-row">
      <div class="exp-period">${exp.startDate}<br>${exp.current ? 'Present' : (exp.endDate||'')}</div>
      <div class="exp-body">
        <h3 class="exp-role">${exp.title}</h3>
        <p class="exp-co">${exp.company}</p>
        <ul class="exp-list">${exp.description.map(d=>`<li>${d}</li>`).join('')}</ul>
      </div>
    </div>`).join('');
  const eduHTML = data.education.map(e => `
    <div class="edu-item">
      <h3>${e.school}</h3>
      <p class="edu-deg">${e.degree}${e.field ? `, ${e.field}` : ''}</p>
      <p class="edu-yr">${e.endDate || e.startDate}</p>
    </div>`).join('');
  const skillsHTML = (data.skills || []).map(s => `
    <div class="skill-row"><div class="skill-dot"></div><span>${s}</span></div>`).join('');
  const projHTML = data.projects.map(p => `
    <div class="proj-item">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
    </div>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${data.name}</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Cormorant Garamond',serif;background:#fdfcfb;color:#1a1a1a;line-height:1.6}
.page{max-width:900px;margin:0 auto;padding:4rem 3rem}
header{text-align:center;margin-bottom:4rem}
h1{font-size:4rem;font-weight:300;letter-spacing:-.02em;border-bottom:2px solid #1a1a1a;display:inline-block;padding:0 2rem .75rem;margin-bottom:1rem}
.subtitle{font-family:'Inter',sans-serif;font-size:.9rem;font-weight:300;text-transform:uppercase;letter-spacing:.25em;color:#555;font-style:italic}
.contacts{display:flex;justify-content:center;gap:2rem;margin-top:1.5rem;font-family:'Inter',sans-serif;font-size:.8rem;text-transform:uppercase;letter-spacing:.15em;color:#888}
.divider{width:60px;height:1px;background:#1a1a1a;margin:3rem auto}
.section-title{font-family:'Inter',sans-serif;font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.35em;color:#999;text-align:center;margin-bottom:2.5rem}
.summary-quote{max-width:600px;margin:0 auto;text-align:center;font-size:1.3rem;line-height:1.8;font-style:italic;color:#333}
.exp-row{display:grid;grid-template-columns:120px 1fr;gap:2rem;margin-bottom:2.5rem}
.exp-period{font-family:'Inter',sans-serif;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#555;text-align:right;line-height:1.8;padding-top:.3rem}
.exp-role{font-size:1.6rem;font-weight:500;margin-bottom:.25rem}
.exp-co{font-size:1.1rem;font-style:italic;color:#666;margin-bottom:.75rem}
.exp-list{list-style:none;padding:0}
.exp-list li{font-size:.95rem;color:#444;padding:.2rem 0;line-height:1.7}
.exp-list li::before{content:"— ";color:#999}
.bottom-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;border-top:1px solid #eee;padding-top:3rem;margin-top:1rem}
.edu-item{margin-bottom:1.5rem}
.edu-item h3{font-size:1.3rem;font-weight:500}
.edu-deg{font-size:.95rem;font-style:italic;color:#666;margin:.2rem 0}
.edu-yr{font-family:'Inter',sans-serif;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:#aaa;margin-top:.4rem}
.skill-row{display:flex;align-items:center;gap:.75rem;margin-bottom:.6rem;font-family:'Inter',sans-serif;font-size:.8rem;text-transform:uppercase;letter-spacing:.15em;color:#444}
.skill-dot{width:4px;height:4px;background:#1a1a1a;border-radius:50%;flex-shrink:0}
.proj-section{border-top:1px solid #eee;padding-top:3rem;margin-top:3rem}
.proj-grid{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;margin-top:.5rem}
.proj-item{text-align:center}
.proj-item h3{font-size:1.2rem;font-weight:500;margin-bottom:.5rem}
.proj-item p{font-size:.9rem;color:#666;font-style:italic;line-height:1.6}
footer{margin-top:3rem;padding-top:1.5rem;border-top:1px solid #eee;text-align:center;font-family:'Inter',sans-serif;font-size:.65rem;text-transform:uppercase;letter-spacing:.4em;color:#aaa}
</style>
</head>
<body>
<div class="page">
  <header>
    <h1>${data.name.toUpperCase()}</h1>
    <p class="subtitle">${data.title}</p>
    <div class="contacts">
      ${data.email ? `<span>${data.email}</span>` : ''}
      ${data.phone ? `<span>${data.phone}</span>` : ''}
      ${data.location ? `<span>${data.location}</span>` : ''}
    </div>
  </header>
  ${data.summary ? `<div class="divider"></div><p class="summary-quote">"${data.summary}"</p>` : ''}
  ${data.experience?.length ? `<div class="divider"></div><h2 class="section-title">Professional Experience</h2>${expHTML}` : ''}
  ${(data.education?.length || data.skills?.length) ? `<div class="bottom-grid">
    ${data.education?.length ? `<div><h2 class="section-title" style="text-align:left">Education</h2>${eduHTML}</div>` : ''}
    ${data.skills?.length ? `<div><h2 class="section-title" style="text-align:left">Expertise</h2>${skillsHTML}</div>` : ''}
  </div>` : ''}
  ${data.projects?.length ? `<div class="proj-section"><h2 class="section-title">Selected Projects</h2><div class="proj-grid">${projHTML}</div></div>` : ''}
  <footer><p>References available upon request</p></footer>
</div>
</body>
</html>`;
}
