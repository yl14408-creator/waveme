import type { Template, TemplateType, ResumeData } from '@/types';

export const templates: Template[] = [
  {
    id: 'minimal',
    name: '极简风格',
    description: '干净简洁的设计，突出内容本身，适合设计师和创意工作者',
    previewImage: '/templates/minimal.jpg',
    color: '#1a1a1a'
  },
  {
    id: 'professional',
    name: '商务专业',
    description: '经典商务风格，稳重专业，适合金融、咨询、管理岗位',
    previewImage: '/templates/professional.jpg',
    color: '#1e3a5f'
  },
  {
    id: 'tech',
    name: '技术现代',
    description: '现代科技感设计，动态效果丰富，适合程序员和工程师',
    previewImage: '/templates/tech.jpg',
    color: '#0f172a'
  }
];

export function getTemplateById(id: TemplateType): Template | undefined {
  return templates.find(t => t.id === id);
}

// 生成HTML模板代码
export function generateTemplateHTML(
  templateType: TemplateType, 
  data: ResumeData,
  primaryColor: string = '#3b82f6'
): string {
  switch (templateType) {
    case 'minimal':
      return generateMinimalTemplate(data, primaryColor);
    case 'professional':
      return generateProfessionalTemplate(data, primaryColor);
    case 'tech':
      return generateTechTemplate(data, primaryColor);
    default:
      return generateMinimalTemplate(data, primaryColor);
  }
}

// 极简风格模板
function generateMinimalTemplate(data: ResumeData, primaryColor: string): string {
  const experienceHTML = data.experience.map(exp => `
    <div class="mb-8">
      <div class="flex justify-between items-baseline mb-2">
        <h3 class="text-xl font-semibold text-gray-900">${exp.title}</h3>
        <span class="text-sm text-gray-500">${exp.startDate} - ${exp.current ? '至今' : exp.endDate}</span>
      </div>
      <div class="text-gray-700 mb-2">${exp.company} · ${exp.location}</div>
      <ul class="list-disc list-inside text-gray-600 space-y-1">
        ${exp.description.map(d => `<li>${d}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  const educationHTML = data.education.map(edu => `
    <div class="mb-6">
      <div class="flex justify-between items-baseline mb-1">
        <h3 class="text-lg font-semibold text-gray-900">${edu.school}</h3>
        <span class="text-sm text-gray-500">${edu.startDate} - ${edu.endDate}</span>
      </div>
      <div class="text-gray-700">${edu.degree} · ${edu.field}</div>
      ${edu.description ? `<p class="text-gray-600 mt-1">${edu.description}</p>` : ''}
    </div>
  `).join('');

  const skillsHTML = data.skills.map(skill => 
    `<span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">${skill}</span>`
  ).join('');

  const projectsHTML = data.projects.map(proj => `
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-1">${proj.name}</h3>
      <p class="text-gray-600 mb-2">${proj.description}</p>
      <div class="flex flex-wrap gap-2 mb-2">
        ${proj.technologies.map(tech => 
          `<span class="px-2 py-0.5 bg-gray-50 text-gray-600 rounded text-xs">${tech}</span>`
        ).join('')}
      </div>
      ${proj.link ? `<a href="${proj.link}" class="text-blue-600 hover:underline text-sm" target="_blank">查看项目 →</a>` : ''}
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} - ${data.title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
    .section-title { 
      font-size: 0.875rem; 
      font-weight: 600; 
      text-transform: uppercase; 
      letter-spacing: 0.05em;
      color: ${primaryColor};
      margin-bottom: 1.5rem;
    }
  </style>
</head>
<body class="bg-white text-gray-900">
  <div class="max-w-3xl mx-auto px-8 py-16">
    <!-- Header -->
    <header class="mb-16">
      <h1 class="text-4xl font-bold mb-3">${data.name}</h1>
      <p class="text-xl text-gray-600 mb-4">${data.title}</p>
      <div class="flex flex-wrap gap-4 text-sm text-gray-500">
        ${data.email ? `<a href="mailto:${data.email}" class="hover:text-gray-900">${data.email}</a>` : ''}
        ${data.phone ? `<span>${data.phone}</span>` : ''}
        ${data.location ? `<span>${data.location}</span>` : ''}
        ${data.website ? `<a href="${data.website}" target="_blank" class="hover:text-gray-900">${data.website}</a>` : ''}
      </div>
    </header>

    <!-- Summary -->
    ${data.summary ? `
    <section class="mb-16">
      <h2 class="section-title">关于我</h2>
      <p class="text-gray-700 leading-relaxed">${data.summary}</p>
    </section>
    ` : ''}

    <!-- Experience -->
    <section class="mb-16">
      <h2 class="section-title">工作经历</h2>
      ${experienceHTML}
    </section>

    <!-- Education -->
    <section class="mb-16">
      <h2 class="section-title">教育背景</h2>
      ${educationHTML}
    </section>

    <!-- Skills -->
    <section class="mb-16">
      <h2 class="section-title">技能</h2>
      <div class="flex flex-wrap gap-2">
        ${skillsHTML}
      </div>
    </section>

    <!-- Projects -->
    ${data.projects.length > 0 ? `
    <section class="mb-16">
      <h2 class="section-title">项目</h2>
      ${projectsHTML}
    </section>
    ` : ''}
  </div>
</body>
</html>`;
}

// 商务专业模板
function generateProfessionalTemplate(data: ResumeData, _primaryColor: string): string {
  const experienceHTML = data.experience.map(exp => `
    <div class="mb-8 border-l-4 border-blue-800 pl-6">
      <div class="flex justify-between items-start mb-2">
        <div>
          <h3 class="text-lg font-bold text-gray-900">${exp.title}</h3>
          <div class="text-blue-800 font-medium">${exp.company}</div>
        </div>
        <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">${exp.startDate} - ${exp.current ? '至今' : exp.endDate}</span>
      </div>
      <div class="text-gray-600 mb-2">${exp.location}</div>
      <ul class="list-disc list-inside text-gray-700 space-y-1">
        ${exp.description.map(d => `<li>${d}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  const educationHTML = data.education.map(edu => `
    <div class="mb-6 border-l-4 border-blue-800 pl-6">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-lg font-bold text-gray-900">${edu.school}</h3>
          <div class="text-blue-800">${edu.degree} · ${edu.field}</div>
        </div>
        <span class="text-sm text-gray-500">${edu.startDate} - ${edu.endDate}</span>
      </div>
      ${edu.description ? `<p class="text-gray-600 mt-2">${edu.description}</p>` : ''}
    </div>
  `).join('');

  const skillsHTML = data.skills.map(skill => 
    `<span class="px-4 py-2 bg-blue-50 text-blue-800 rounded-lg text-sm font-medium border border-blue-100">${skill}</span>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} - ${data.title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Georgia:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
    .serif { font-family: 'Georgia', serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-900">
  <div class="max-w-4xl mx-auto bg-white shadow-lg">
    <!-- Header -->
    <header class="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-12">
      <h1 class="text-5xl font-bold serif mb-3">${data.name}</h1>
      <p class="text-xl text-blue-100 mb-6">${data.title}</p>
      <div class="flex flex-wrap gap-6 text-sm text-blue-100">
        ${data.email ? `<a href="mailto:${data.email}" class="hover:text-white flex items-center gap-2">📧 ${data.email}</a>` : ''}
        ${data.phone ? `<span class="flex items-center gap-2">📱 ${data.phone}</span>` : ''}
        ${data.location ? `<span class="flex items-center gap-2">📍 ${data.location}</span>` : ''}
        ${data.linkedin ? `<a href="https://${data.linkedin}" target="_blank" class="hover:text-white flex items-center gap-2">💼 LinkedIn</a>` : ''}
      </div>
    </header>

    <div class="p-12">
      <!-- Summary -->
      ${data.summary ? `
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-900">职业概述</h2>
        <p class="text-gray-700 leading-relaxed text-lg">${data.summary}</p>
      </section>
      ` : ''}

      <!-- Experience -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-blue-900 mb-6 pb-2 border-b-2 border-blue-900">工作经历</h2>
        ${experienceHTML}
      </section>

      <!-- Education -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-blue-900 mb-6 pb-2 border-b-2 border-blue-900">教育背景</h2>
        ${educationHTML}
      </section>

      <!-- Skills -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-blue-900 mb-6 pb-2 border-b-2 border-blue-900">专业技能</h2>
        <div class="flex flex-wrap gap-3">
          ${skillsHTML}
        </div>
      </section>

      <!-- Projects -->
      ${data.projects.length > 0 ? `
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-blue-900 mb-6 pb-2 border-b-2 border-blue-900">项目经历</h2>
        ${data.projects.map(proj => `
          <div class="mb-6 border-l-4 border-blue-800 pl-6">
            <h3 class="text-lg font-bold text-gray-900">${proj.name}</h3>
            <p class="text-gray-700 mb-2">${proj.description}</p>
            <div class="flex flex-wrap gap-2 mb-2">
              ${proj.technologies.map(tech => 
                `<span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">${tech}</span>`
              ).join('')}
            </div>
          </div>
        `).join('')}
      </section>
      ` : ''}
    </div>
  </div>
</body>
</html>`;
}

// 技术现代模板
function generateTechTemplate(data: ResumeData, _primaryColor: string): string {
  const experienceHTML = data.experience.map((exp) => `
    <div class="relative pl-8 pb-8 border-l-2 border-cyan-500/30 last:pb-0">
      <div class="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50"></div>
      <div class="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-cyan-500/50 transition-colors">
        <div class="flex flex-wrap justify-between items-start gap-2 mb-3">
          <div>
            <h3 class="text-xl font-bold text-white">${exp.title}</h3>
            <div class="text-cyan-400 font-medium">${exp.company}</div>
          </div>
          <span class="text-sm text-slate-400 bg-slate-900 px-3 py-1 rounded-full">${exp.startDate} - ${exp.current ? '至今' : exp.endDate}</span>
        </div>
        <div class="text-slate-500 mb-3">${exp.location}</div>
        <ul class="space-y-2">
          ${exp.description.map(d => `<li class="text-slate-300 flex items-start gap-2"><span class="text-cyan-500 mt-1.5">▸</span><span>${d}</span></li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');

  const skillsHTML = data.skills.map(skill => 
    `<span class="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-lg text-sm font-medium border border-cyan-500/30 hover:border-cyan-500/60 transition-colors cursor-default">${skill}</span>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} - ${data.title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            mono: ['JetBrains Mono', 'monospace'],
            sans: ['Inter', 'sans-serif'],
          }
        }
      }
    }
  </script>
  <style>
    body { 
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
    }
    .glow {
      box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
    }
    .text-glow {
      text-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
    }
  </style>
</head>
<body class="min-h-screen text-white">
  <div class="max-w-4xl mx-auto px-6 py-16">
    <!-- Header -->
    <header class="text-center mb-16">
      <div class="inline-block mb-4">
        <span class="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-mono border border-cyan-500/30">&lt;developer /&gt;</span>
      </div>
      <h1 class="text-5xl md:text-6xl font-bold mb-4 text-glow">${data.name}</h1>
      <p class="text-2xl text-cyan-400 mb-8">${data.title}</p>
      <div class="flex flex-wrap justify-center gap-4 text-sm">
        ${data.email ? `<a href="mailto:${data.email}" class="px-4 py-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors border border-slate-700">${data.email}</a>` : ''}
        ${data.phone ? `<span class="px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">${data.phone}</span>` : ''}
        ${data.github ? `<a href="https://${data.github}" target="_blank" class="px-4 py-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors border border-slate-700">GitHub</a>` : ''}
        ${data.linkedin ? `<a href="https://${data.linkedin}" target="_blank" class="px-4 py-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors border border-slate-700">LinkedIn</a>` : ''}
      </div>
    </header>

    <!-- Summary -->
    ${data.summary ? `
    <section class="mb-16">
      <div class="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
        <h2 class="text-2xl font-bold mb-4 flex items-center gap-3">
          <span class="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 text-lg">💡</span>
          关于我
        </h2>
        <p class="text-slate-300 leading-relaxed text-lg">${data.summary}</p>
      </div>
    </section>
    ` : ''}

    <!-- Experience -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-8 flex items-center gap-3">
        <span class="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 text-lg">💼</span>
        工作经历
      </h2>
      ${experienceHTML}
    </section>

    <!-- Skills -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-8 flex items-center gap-3">
        <span class="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 text-lg">🛠</span>
        技术栈
      </h2>
      <div class="flex flex-wrap gap-3">
        ${skillsHTML}
      </div>
    </section>

    <!-- Education -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-8 flex items-center gap-3">
        <span class="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 text-lg">🎓</span>
        教育背景
      </h2>
      ${data.education.map(edu => `
        <div class="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50 mb-4">
          <div class="flex flex-wrap justify-between items-start gap-2">
            <div>
              <h3 class="text-xl font-bold text-white">${edu.school}</h3>
              <div class="text-cyan-400">${edu.degree} · ${edu.field}</div>
            </div>
            <span class="text-sm text-slate-400">${edu.startDate} - ${edu.endDate}</span>
          </div>
        </div>
      `).join('')}
    </section>

    <!-- Projects -->
    ${data.projects.length > 0 ? `
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-8 flex items-center gap-3">
        <span class="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 text-lg">🚀</span>
        项目
      </h2>
      <div class="grid md:grid-cols-2 gap-6">
        ${data.projects.map(proj => `
          <div class="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-colors group">
            <h3 class="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">${proj.name}</h3>
            <p class="text-slate-400 mb-4">${proj.description}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              ${proj.technologies.map(tech => 
                `<span class="px-2 py-1 bg-slate-900/50 text-cyan-300 rounded text-xs font-mono">${tech}</span>`
              ).join('')}
            </div>
            ${proj.link ? `<a href="${proj.link}" target="_blank" class="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1">查看项目 →</a>` : ''}
          </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    <!-- Footer -->
    <footer class="text-center text-slate-500 text-sm">
      <p>© ${new Date().getFullYear()} ${data.name} · Built with Waveme</p>
    </footer>
  </div>
</body>
</html>`;
}

// 导出完整网站包
export function exportWebsite(
  templateType: TemplateType,
  data: ResumeData,
  primaryColor: string
): { html: string; filename: string } {
  const html = generateTemplateHTML(templateType, data, primaryColor);
  const filename = `${data.name.replace(/\s+/g, '_')}_Portfolio.html`;
  
  return { html, filename };
}

// 下载HTML文件
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
