/**
 * Waveme AI 服务
 * 接入 DeepSeek API 实现真实的 AI 对话和建议
 */

import type { ResumeData } from '@/types';

export interface AIChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string | Array<{type: 'text' | 'image_url', text?: string, image_url?: {url: string}}>;
}

export interface AISuggestion {
  type: 'template' | 'color' | 'content' | 'optimization' | 'skill';
  title: string;
  description: string;
  action?: string;
  data?: unknown;
}

export interface AIChatResponse {
  message: string;
  suggestions?: AISuggestion[];
  error?: string;
}

// DeepSeek API 配置
const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || '';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// 系统提示词
const SYSTEM_PROMPT = `你是 Waveme AI 助手，一个专注于帮助用户打造个人品牌网站的智能助手。

Waveme 的核心理念是"上善若水"：
- 不争不抢，潜心打磨
- 水到渠成，机会自来
- 像水一样适应各种环境

你的职责：
1. 根据用户的职业背景和展示需求，推荐合适的模板风格
2. 帮助优化简历内容，使其更具吸引力
3. 提供配色和设计建议
4. 回答关于 Waveme 功能的问题

回复风格：
- 温和、专业、有洞察力
- 使用中文回复
- 给出具体可操作的建议
- 适当使用 emoji 增加亲和力

当用户询问模板推荐时，请提供具体的模板名称和理由。
当用户询问内容优化时，请给出具体的修改建议。`;

/**
 * 发送聊天消息到 DeepSeek API
 */
export async function sendChatMessage(
  messages: AIChatMessage[],
  options?: {
    model?: 'deepseek-chat' | 'deepseek-reasoner';
    temperature?: number;
  }
): Promise<AIChatResponse> {
  const { model = 'deepseek-chat', temperature = 0.7 } = options || {};

  // 检查 API Key
  if (!DEEPSEEK_API_KEY) {
    // 如果没有配置 API Key，使用模拟响应
    console.log('No DeepSeek API Key found, using mock response');
    const mockResponse = generateMockResponse(messages);
    // 添加一个提示，告诉用户这是模拟模式
    if (mockResponse.message && !mockResponse.message.includes('模拟模式')) {
      mockResponse.message = `[模拟模式] ${mockResponse.message}\n\n---\n💡 提示：当前使用的是模拟回复。如需真实 AI 功能，请配置 VITE_DEEPSEEK_API_KEY 环境变量。`;
    }
    return mockResponse;
  }

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        temperature,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'API 请求失败');
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';

    // 解析响应，提取建议
    const suggestions = parseSuggestions(content);

    return {
      message: content,
      suggestions,
    };
  } catch (error) {
    console.error('AI API Error:', error);
    return {
      message: '',
      error: error instanceof Error ? error.message : 'AI 服务暂时不可用',
    };
  }
}

/**
 * 解析 AI 响应中的建议
 */
function parseSuggestions(content: string): AISuggestion[] | undefined {
  const suggestions: AISuggestion[] = [];

  // 检测模板推荐
  const templateMatch = content.match(/推荐模板[：:]\s*([^\n]+)/);
  if (templateMatch) {
    suggestions.push({
      type: 'template',
      title: '模板推荐',
      description: templateMatch[1].trim(),
    });
  }

  // 检测配色建议
  const colorMatch = content.match(/配色建议[：:]\s*([^\n]+)/);
  if (colorMatch) {
    suggestions.push({
      type: 'color',
      title: '配色方案',
      description: colorMatch[1].trim(),
    });
  }

  // 检测内容优化
  if (content.includes('内容优化') || content.includes('修改建议')) {
    suggestions.push({
      type: 'content',
      title: '内容优化',
      description: '根据你的描述，可以优化项目描述和工作经历',
    });
  }

  return suggestions.length > 0 ? suggestions : undefined;
}

/**
 * 生成模拟响应（当没有 API Key 时使用）
 */
function generateMockResponse(messages: AIChatMessage[]): AIChatResponse {
  const lastMessage = messages[messages.length - 1];
  const content = lastMessage?.content;
  const userInput = typeof content === 'string' ? content.toLowerCase() : '';

  if (userInput?.includes('前端') || userInput?.includes('开发') || userInput?.includes('engineer')) {
    return {
      message: `你好！作为前端工程师，我建议你选择**水墨山水**或**竹韵清风**风格的模板 🎋

这两款模板都采用了淡雅的配色，非常适合技术背景的展示。水墨山山的灰色调显得专业稳重，而竹韵清风的竹青色则给人清新自然的感觉。

**内容优化建议：**
1. 在项目描述中使用 STAR 法则（情境-任务-行动-结果）
2. 量化你的成果，比如"优化首屏加载时间从 3s 降至 1.2s"
3. 列出你掌握的核心技术栈，按熟练度排序

你想看看这两款模板的预览效果吗？`,
      suggestions: [
        {
          type: 'template',
          title: '水墨山水',
          description: '淡雅水墨风格，如山水画卷，适合技术背景',
          data: { templateId: 'ink-landscape' },
        },
        {
          type: 'template',
          title: '竹韵清风',
          description: '竹青配色，清新自然，展现技术活力',
          data: { templateId: 'bamboo-breeze' },
        },
        {
          type: 'content',
          title: 'STAR 法则',
          description: '用情境-任务-行动-结果的方式描述项目',
        },
      ],
    };
  }

  if (userInput?.includes('设计') || userInput?.includes('designer') || userInput?.includes('作品')) {
    return {
      message: `作为设计师，视觉展示是关键！✨

我强烈推荐**朱砂印记**或**手绘涂鸦**风格的模板。这两款模板都有很强的视觉冲击力，能够很好地展示你的设计作品。

**作品展示技巧：**
1. 每个项目配 3-5 张高清图，展示设计过程
2. 添加设计思路说明，让访客了解你的思考
3. 使用大图展示，让作品成为焦点

你主要是做哪方面的设计呢？UI/UX、品牌设计还是插画？我可以给你更具体的建议。`,
      suggestions: [
        {
          type: 'template',
          title: '朱砂印记',
          description: '朱砂点缀，庄重典雅，适合展示成熟作品',
          data: { templateId: 'cinnabar-mark' },
        },
        {
          type: 'template',
          title: '手绘涂鸦',
          description: '轻松活泼，展现个性，适合创意作品',
          data: { templateId: 'doodle-style' },
        },
        {
          type: 'optimization',
          title: '作品展示',
          description: '每个项目配3-5张高清图，添加设计思路',
        },
      ],
    };
  }

  if (userInput?.includes('应届') || userInput?.includes('毕业生') || userInput?.includes('fresh')) {
    return {
      message: `作为应届毕业生，重点是展示潜力和学习能力！📚

我建议选择**石青雅韵**或**水墨山水**风格的模板，这两款都比较简洁大方，能够突出你的教育背景和实习经历。

**简历优化建议：**
1. 强调 GPA、奖学金、社团活动
2. 详细描述实习经历，即使是短期的也要写清楚你的贡献
3. 列出掌握的技能和工具，展示学习意愿
4. 可以添加课程项目，展示实践能力

你有实习经历或者做过什么项目吗？我可以帮你优化描述。`,
      suggestions: [
        {
          type: 'template',
          title: '石青雅韵',
          description: '沉稳大气，适合应届毕业生',
          data: { templateId: 'azurite-elegant' },
        },
        {
          type: 'content',
          title: '突出亮点',
          description: '强调 GPA、奖学金、实习和项目经历',
        },
        {
          type: 'skill',
          title: '技能展示',
          description: '列出掌握的技能，展示学习意愿',
        },
      ],
    };
  }

  if (userInput?.includes('创业') || userInput?.includes('startup') || userInput?.includes('项目推介')) {
    return {
      message: `用 Waveme 做项目推介是非常棒的选择！🚀

相比传统的 PPT，Waveme 生成的网站更加灵活，可以随时更新，而且给投资人的印象更专业。

**推介页面建议：**
1. 首页展示核心价值和愿景
2. 产品/服务页面详细介绍解决方案
3. 团队页面展示核心成员背景
4. 数据页面展示关键指标
5. 联系方式要醒目

我建议选择**水墨山水**或**朱砂印记**风格，显得专业稳重。你想先创建哪个部分呢？`,
      suggestions: [
        {
          type: 'template',
          title: '水墨山水',
          description: '专业稳重，适合商业推介',
          data: { templateId: 'ink-landscape' },
        },
        {
          type: 'optimization',
          title: '推介结构',
          description: '核心价值 → 产品 → 团队 → 数据 → 联系方式',
        },
      ],
    };
  }

  // 默认响应
  return {
    message: `你好！我是 Waveme AI 助手 🌊

我可以帮你：
• 推荐适合你职业背景的模板风格
• 优化简历内容，使其更具吸引力
• 提供配色和设计建议
• 回答关于 Waveme 功能的问题

请告诉我：
1. 你的职业背景是什么？（前端开发、设计师、产品经理等）
2. 你想用个人网站做什么？（求职、作品展示、项目推介等）
3. 你喜欢什么风格？（简约、活泼、专业等）

我会根据你的需求给出具体建议！`,
    suggestions: [
      {
        type: 'template',
        title: '浏览全部模板',
        description: '查看 15+ 款水墨风格模板',
        action: 'navigate:templates',
      },
    ],
  };
}

/**
 * 优化简历内容
 */
export async function optimizeResumeContent(
  section: 'summary' | 'experience' | 'project',
  content: string,
  context?: string
): Promise<string> {
  const prompt = `请帮我优化以下${section === 'summary' ? '个人简介' : section === 'experience' ? '工作经历' : '项目描述'}，使其更具吸引力：

${content}

${context ? `背景信息：${context}` : ''}

要求：
1. 使用 STAR 法则（情境-任务-行动-结果）
2. 量化成果，使用具体数字
3. 突出关键词，便于搜索
4. 保持简洁，不超过 150 字

请直接给出优化后的内容。`;

  const response = await sendChatMessage([
    { role: 'user', content: prompt },
  ]);

  return response.message || content;
}

/**
 * 生成项目描述
 */
export async function generateProjectDescription(
  projectName: string,
  technologies: string[],
  achievements: string
): Promise<string> {
  const prompt = `请为以下项目生成一段专业的描述：

项目名称：${projectName}
技术栈：${technologies.join(', ')}
主要成果：${achievements}

要求：
1. 使用 STAR 法则
2. 突出技术亮点
3. 量化成果
4. 控制在 100 字以内

请直接给出描述内容。`;

  const response = await sendChatMessage([
    { role: 'user', content: prompt },
  ]);

  return response.message || '';
}

/**
 * 从 AI 响应中提取 JSON
 */
function extractJSONFromResponse(text: string): unknown | null {
  try {
    // 尝试直接解析
    return JSON.parse(text);
  } catch {
    // 尝试从 markdown 代码块中提取
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[1].trim());
      } catch {
        // 继续尝试其他方法
      }
    }

    // 尝试从文本中提取 JSON 对象
    const objectMatch = text.match(/\{[\s\S]*\}/);
    if (objectMatch) {
      try {
        return JSON.parse(objectMatch[0]);
      } catch {
        // 解析失败
      }
    }

    return null;
  }
}

/**
 * 推荐模板
 */
export async function recommendTemplate(
  profession: string,
  style: string,
  purpose: string
): Promise<AISuggestion[]> {
  const prompt = `请为以下用户推荐合适的模板：

职业：${profession}
风格偏好：${style}
使用目的：${purpose}

请推荐 2-3 款模板，并说明理由。`;

  const response = await sendChatMessage([
    { role: 'user', content: prompt },
  ]);

  return response.suggestions || [];
}

/**
 * 从纯文本中提取结构化简历数据（使用 DeepSeek chat API）
 */
export async function extractResumeFromText(
  resumeText: string
): Promise<{ success: boolean; data?: ResumeData; error?: string }> {
  if (!DEEPSEEK_API_KEY) {
    return { success: false, error: 'No DeepSeek API key configured' };
  }

  const prompt = `You are a resume parser. Extract structured information from the following resume text and return ONLY a valid JSON object with no markdown, no code fences, no extra text.

Required JSON structure:
{
  "name": "Full Name",
  "title": "Current Job Title or Target Position",
  "email": "email@example.com",
  "phone": "phone number",
  "location": "City, Country",
  "website": "personal website URL or null",
  "linkedin": "LinkedIn URL or null",
  "github": "GitHub URL or null",
  "summary": "Professional summary",
  "experience": [
    {
      "id": "1",
      "company": "Company Name",
      "title": "Job Title",
      "location": "City",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM or empty string if current",
      "current": false,
      "description": ["Key responsibility 1", "Key responsibility 2"],
      "highlights": ["highlight1"]
    }
  ],
  "education": [
    {
      "id": "1",
      "school": "University Name",
      "degree": "Degree Type",
      "field": "Field of Study",
      "location": "City",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "gpa": null,
      "achievements": []
    }
  ],
  "skills": ["skill1", "skill2", "skill3"],
  "projects": [
    {
      "id": "1",
      "name": "Project Name",
      "description": "Project description",
      "technologies": ["tech1", "tech2"],
      "url": null
    }
  ],
  "certifications": [],
  "languages": [{"name": "Language", "level": "Proficiency"}],
  "awards": []
}

Important rules:
1. Date format must be YYYY-MM
2. experience.description MUST be an array of strings
3. If a field is not found, use null for optional strings, "" for required strings, or [] for arrays
4. Each experience/education/project must have a unique "id" field (use "1", "2", "3"...)
5. Preserve the original language of the resume content

Resume text:
${resumeText}`;

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return { success: false, error: `DeepSeek API error: ${err}` };
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content ?? '';

    // Parse JSON from response
    const parsed = extractJSONFromResponse(content);

    if (!parsed) {
      return { success: false, error: '无法解析 AI 响应' };
    }

    // Normalize common field name variants
    const normalized = parsed as Record<string, unknown>;
    if (normalized.fullName && !normalized.name) normalized.name = normalized.fullName;
    if ((normalized.jobTitle || normalized.position) && !normalized.title) {
      normalized.title = (normalized.jobTitle || normalized.position) as string;
    }
    if (normalized.contactEmail && !normalized.email) normalized.email = normalized.contactEmail;
    if (normalized.phoneNumber && !normalized.phone) normalized.phone = normalized.phoneNumber;

    return { success: true, data: normalized as unknown as ResumeData };
  } catch (e: any) {
    return { success: false, error: `Parse error: ${e.message}` };
  }
}

export { DEEPSEEK_API_KEY };
