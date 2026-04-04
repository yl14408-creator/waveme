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
    navigation: ['home', 'projects', 'skills', 'experience', 'contact'],
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    category: 'tech',
    style: 'bold',
    description: '赛博朋克风格，霓虹灯效果，未来感十足',
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
    navigation: ['home', 'about', 'projects', 'skills', 'contact'],
  },
  {
    id: 'clean-code',
    name: 'Clean Code',
    category: 'tech',
    style: 'minimal',
    description: '干净简洁的代码风格，专注内容展示',
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
    navigation: ['home', 'projects', 'experience', 'skills', 'blog', 'contact'],
  },

  // ===== 设计类 =====
  {
    id: 'portfolio-pro',
    name: 'Portfolio Pro',
    category: 'design',
    style: 'elegant',
    description: '专业设计师作品集，大图展示，视觉冲击力强',
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
    navigation: ['home', 'projects', 'about', 'contact'],
  },
  {
    id: 'brutalist',
    name: 'Brutalist',
    category: 'design',
    style: 'bold',
    description: '粗野主义风格，大胆排版，打破常规',
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
    navigation: ['home', 'projects', 'about', 'contact'],
  },
  {
    id: 'scandinavian',
    name: 'Scandinavian',
    category: 'design',
    style: 'minimal',
    description: '北欧简约风，温暖色调，舒适自然',
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
    navigation: ['home', 'about', 'projects', 'blog', 'contact'],
  },

  // ===== 创意类 =====
  {
    id: 'pixel-art',
    name: 'Pixel Art',
    category: 'creative',
    style: 'playful',
    description: '像素艺术风格，复古游戏感，个性十足',
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
    navigation: ['home', 'about', 'projects', 'skills', 'contact'],
  },
  {
    id: 'doodle',
    name: 'Doodle',
    category: 'creative',
    style: 'playful',
    description: '手绘涂鸦风格，轻松活泼，展现个性',
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
    navigation: ['home', 'projects', 'blog', 'about', 'contact'],
  },
  {
    id: 'collage',
    name: 'Collage',
    category: 'creative',
    style: 'bold',
    description: '拼贴艺术风格，层次丰富，视觉冲击',
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
    navigation: ['home', 'projects', 'about', 'contact'],
  },

  // ===== 商务类 =====
  {
    id: 'executive',
    name: 'Executive',
    category: 'business',
    style: 'elegant',
    description: '高管精英风格，稳重专业，值得信赖',
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
    navigation: ['home', 'experience', 'skills', 'contact'],
  },
  {
    id: 'consultant',
    name: 'Consultant',
    category: 'business',
    style: 'modern',
    description: '咨询顾问风格，数据驱动，逻辑清晰',
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
    navigation: ['home', 'about', 'experience', 'contact'],
  },

  // ===== 学术类 =====
  {
    id: 'researcher',
    name: 'Researcher',
    category: 'academic',
    style: 'minimal',
    description: '学术研究风格，严谨专业，文献展示',
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
    navigation: ['home', 'research', 'publications', 'contact'],
  },
  {
    id: 'professor',
    name: 'Professor',
    category: 'academic',
    style: 'elegant',
    description: '教授个人主页，教学研究，学生资源',
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
    navigation: ['home', 'teaching', 'research', 'students', 'contact'],
  },

  // ===== 通用类 =====
  {
    id: 'one-page',
    name: 'One Page',
    category: 'creative',
    style: 'modern',
    description: '单页滚动设计，流畅体验，故事叙述',
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
    navigation: ['home'], // 单页设计，锚点导航
  },
  {
    id: 'magazine',
    name: 'Magazine',
    category: 'design',
    style: 'elegant',
    description: '杂志风格，大图配文，阅读体验佳',
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
    navigation: ['home', 'articles', 'about', 'contact'],
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    category: 'tech',
    style: 'modern',
    description: '仪表盘风格，数据可视化，信息密度高',
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
    navigation: ['home', 'stats', 'projects', 'skills', 'contact'],
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
