/**
 * PDF 解析服务
 * 支持使用 OpenAI Vision API 进行真实解析
 */

import type { ResumeData } from '@/types';
import { parseResumeWithVision } from './aiService';
import { convertPDFToImages } from './pdfToImage';

interface ParsePDFOptions {
  onProgress?: (progress: number) => void;
  language?: 'zh' | 'en' | 'auto';
  useRealAPI?: boolean;
}

interface ParsePDFResult {
  success: boolean;
  data?: ResumeData;
  error?: string;
}

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function validatePDFFile(file: File): { valid: boolean; error?: string } {
  if (!file.type.includes('pdf')) {
    return { valid: false, error: '请上传 PDF 文件' };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: '文件大小超过 10MB 限制' };
  }
  return { valid: true };
}

export function getFileSizeInfo(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * 解析 PDF 文件
 * 支持两种方式：
 * 1. 真实 API 解析（使用 OpenAI Vision API）
 * 2. 模拟解析（用于演示）
 */
export async function parsePDF(
  file: File,
  options: ParsePDFOptions = {}
): Promise<ParsePDFResult> {
  const { onProgress, language = 'auto', useRealAPI = true } = options;

  // 检查文件类型
  if (!file.type.includes('pdf')) {
    return {
      success: false,
      error: '请上传 PDF 文件',
    };
  }

  // 检查文件大小（最大 10MB）
  if (file.size > 10 * 1024 * 1024) {
    return {
      success: false,
      error: '文件大小超过 10MB 限制',
    };
  }

  // 如果使用真实 API
  if (useRealAPI) {
    try {
      onProgress?.(10);

      // 第一步：将 PDF 转换为图片
      const conversionResult = await convertPDFToImages(file, {
        scale: 2,
        maxPages: 3, // 最多解析 3 页
        onProgress: (currentPage, totalPages) => {
          const progress = 10 + Math.round((currentPage / totalPages) * 30);
          onProgress?.(progress);
        },
      });

      if (!conversionResult.success) {
        return {
          success: false,
          error: conversionResult.error || 'PDF 转换失败',
        };
      }

      onProgress?.(40);

      // 第二步：使用 Vision API 解析图片
      const visionResult = await parseResumeWithVision(
        conversionResult.images,
        {
          language,
          onProgress: (progress) => {
            onProgress?.(40 + Math.round(progress * 0.6));
          },
        }
      );

      if (!visionResult.success) {
        return {
          success: false,
          error: visionResult.error || 'AI 解析失败',
        };
      }

      return {
        success: true,
        data: visionResult.data,
      };
    } catch (error) {
      console.error('PDF Parse Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : '解析失败，请重试',
      };
    }
  }

  // 模拟解析（用于演示）
  return simulatePDFParsing(onProgress);
}

/**
 * 模拟 PDF 解析（用于演示）
 */
async function simulatePDFParsing(
  onProgress?: (progress: number) => void
): Promise<ParsePDFResult> {
  // 模拟解析过程
  const steps = [
    { progress: 10, message: '正在读取文件...' },
    { progress: 25, message: '正在提取文本...' },
    { progress: 40, message: '正在分析结构...' },
    { progress: 60, message: '正在识别信息...' },
    { progress: 80, message: '正在整理数据...' },
    { progress: 100, message: '解析完成！' },
  ];

  for (const step of steps) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    onProgress?.(step.progress);
  }

  // 返回模拟数据
  return {
    success: true,
    data: generateMockResumeData(),
  };
}

/**
 * 生成模拟简历数据
 */
function generateMockResumeData(): ResumeData {
  return {
    name: '李明远',
    title: '高级前端工程师',
    email: 'limingyuan@example.com',
    phone: '138-1234-5678',
    location: '上海',
    website: 'https://limingyuan.dev',
    linkedin: 'https://linkedin.com/in/limingyuan',
    github: 'https://github.com/limingyuan',
    summary: '8年前端开发经验，专注于React生态系统和现代Web技术。曾主导多个大型项目的前端架构设计，擅长性能优化和团队协作。热爱开源，GitHub Star 超过 1000。',
    experience: [
      {
        id: '1',
        company: '字节跳动',
        title: '高级前端工程师',
        location: '上海',
        startDate: '2021-03',
        endDate: '',
        current: true,
        description: [
          '负责抖音创作者平台前端架构设计，服务千万级用户',
          '主导微前端架构改造，将构建时间从 15 分钟缩短至 3 分钟',
          '建立前端性能监控体系，首屏加载时间优化 40%',
        ],
        highlights: ['技术负责人', '团队 15 人'],
      },
      {
        id: '2',
        company: '阿里巴巴',
        title: '前端工程师',
        location: '杭州',
        startDate: '2018-07',
        endDate: '2021-02',
        current: false,
        description: [
          '参与淘宝商家后台系统开发，负责订单管理模块',
          '开发通用组件库，被 10+ 团队采用',
          '优化页面渲染性能，提升用户体验',
        ],
        highlights: ['P6 晋升'],
      },
      {
        id: '3',
        company: '美团',
        title: '初级前端工程师',
        location: '北京',
        startDate: '2016-06',
        endDate: '2018-06',
        current: false,
        description: [
          '负责商家端 H5 页面开发',
          '参与小程序项目，完成核心功能开发',
        ],
        highlights: ['优秀新人'],
      },
    ],
    education: [
      {
        id: '1',
        school: '浙江大学',
        degree: '本科',
        field: '计算机科学与技术',
        location: '杭州',
        startDate: '2012-09',
        endDate: '2016-06',
        gpa: 3.8,
        achievements: ['国家奖学金获得者', 'ACM竞赛省级一等奖', '优秀毕业生'],
      },
    ],
    skills: [
      'React',
      'TypeScript',
      'Next.js',
      'Vue.js',
      'Node.js',
      'Webpack',
      'Vite',
      'GraphQL',
      'Docker',
      'Kubernetes',
      'CI/CD',
      '性能优化',
    ],
    projects: [
      {
        id: '1',
        name: '抖音创作者平台',
        description: '面向内容创作者的一站式服务平台，提供数据分析、内容管理、收益结算等功能',
        url: 'https://creator.douyin.com',
        technologies: ['React', 'TypeScript', 'GraphQL', '微前端'],
      },
      {
        id: '2',
        name: '前端组件库',
        description: '公司内部通用组件库，支持 React 和 Vue，包含 50+ 组件',
        url: 'https://github.com/limingyuan/ui-lib',
        technologies: ['React', 'Vue', 'Storybook', 'Rollup'],
      },
    ],
    certifications: [],
    languages: [
      { name: '中文', level: '母语' },
      { name: '英语', level: '流利' },
    ],
    awards: [
      {
        id: '1',
        name: '字节跳动技术卓越奖',
        date: '2023-12',
        description: '年度技术创新奖',
      },
      {
        id: '2',
        name: '开源贡献奖',
        date: '2022-06',
        description: 'GitHub Star 突破 1000',
      },
    ],
  };
}

/**
 * 检查 PDF 解析服务是否可用
 */
export function isPDFParserAvailable(): boolean {
  return typeof window !== 'undefined';
}
