import type { ResumeData } from '@/types';

// 模拟简历数据 - 用于演示
const mockResumeData: ResumeData = {
  name: "张明远",
  title: "高级前端工程师",
  email: "zhangmingyuan@email.com",
  phone: "138-0000-0000",
  location: "上海",
  website: "https://zhangmingyuan.dev",
  linkedin: "linkedin.com/in/zhangmingyuan",
  github: "github.com/zhangmingyuan",
  summary: "5年前端开发经验，专注于React生态系统和现代Web技术。热衷于构建高性能、用户友好的Web应用。有丰富的大型项目架构经验和团队协作能力。",
  experience: [
    {
      id: "1",
      company: "字节跳动",
      title: "高级前端工程师",
      location: "上海",
      startDate: "2021-03",
      endDate: "",
      current: true,
      description: [
        "负责抖音创作者平台前端架构设计与开发",
        "带领5人团队完成平台重构，性能提升40%",
        "设计并实现组件库，被10+团队采用",
        "优化构建流程，部署时间缩短60%"
      ]
    },
    {
      id: "2",
      company: "阿里巴巴",
      title: "前端工程师",
      location: "杭州",
      startDate: "2018-07",
      endDate: "2021-02",
      current: false,
      description: [
        "参与淘宝商家后台系统开发",
        "实现复杂数据可视化大屏",
        "开发微前端架构解决方案",
        "指导3名初级工程师成长"
      ]
    },
    {
      id: "3",
      company: "美团",
      title: "初级前端工程师",
      location: "北京",
      startDate: "2016-06",
      endDate: "2018-06",
      current: false,
      description: [
        "负责商家端H5页面开发",
        "参与小程序开发项目",
        "优化页面加载性能"
      ]
    }
  ],
  education: [
    {
      id: "1",
      school: "浙江大学",
      degree: "本科",
      field: "计算机科学与技术",
      location: "杭州",
      startDate: "2012-09",
      endDate: "2016-06",
      description: "GPA: 3.8/4.0，获得国家奖学金，ACM竞赛省级一等奖"
    }
  ],
  skills: [
    "React", "TypeScript", "Vue.js", "Node.js", "Next.js", 
    "Webpack", "Vite", "Docker", "Kubernetes", "GraphQL",
    "Tailwind CSS", "Material-UI", "Ant Design",
    "Git", "CI/CD", "Jest", "Cypress"
  ],
  projects: [
    {
      id: "1",
      name: "开源组件库 Vue-UI",
      description: "基于Vue 3的现代化组件库，提供50+高质量组件，GitHub Star数超过2000",
      technologies: ["Vue 3", "TypeScript", "Vite", "Vitest"],
      link: "https://github.com/zhangmingyuan/vue-ui"
    },
    {
      id: "2",
      name: "个人博客系统",
      description: "基于Next.js的静态博客生成器，支持MDX、主题定制、SEO优化",
      technologies: ["Next.js", "MDX", "Tailwind CSS", "Vercel"],
      link: "https://zhangmingyuan.dev"
    }
  ]
};

// 解析PDF文件（模拟）
export async function parseResumePDF(file: File): Promise<ResumeData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      // 模拟解析延迟
      setTimeout(() => {
        // 实际项目中，这里应该调用后端API进行PDF解析
        // 或者使用 pdf-parse 库在服务端解析
        
        // 为了演示，返回模拟数据，但会根据文件名做一些变化
        const fileName = file.name.replace('.pdf', '');
        const personalizedData = {
          ...mockResumeData,
          name: fileName.includes('简历') || fileName.includes('resume') 
            ? mockResumeData.name 
            : fileName,
        };
        
        resolve(personalizedData);
      }, 2000);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read PDF file'));
    };
    
    reader.readAsArrayBuffer(file);
  });
}

// 从文本中提取简历信息（实际项目中使用NLP）
export function extractResumeInfo(text: string): Partial<ResumeData> {
  // 这是一个简化的示例
  // 实际项目中应该使用更复杂的NLP技术
  
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
  
  const extracted: Partial<ResumeData> = {
    experience: [],
    education: [],
    skills: []
  };
  
  // 简单的模式匹配
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  const phoneRegex = /(\+?\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/;
  
  for (const line of lines) {
    // 提取邮箱
    const emailMatch = line.match(emailRegex);
    if (emailMatch && !extracted.email) {
      extracted.email = emailMatch[0];
    }
    
    // 提取电话
    const phoneMatch = line.match(phoneRegex);
    if (phoneMatch && !extracted.phone) {
      extracted.phone = phoneMatch[0];
    }
  }
  
  return extracted;
}

// 生成唯一ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// 验证简历数据
export function validateResumeData(data: Partial<ResumeData>): string[] {
  const errors: string[] = [];
  
  if (!data.name) errors.push('姓名缺失');
  if (!data.email) errors.push('邮箱缺失');
  if (!data.experience || data.experience.length === 0) {
    errors.push('工作经历缺失');
  }
  
  return errors;
}
