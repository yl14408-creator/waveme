// 简历数据结构
export interface Experience {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string[];
  highlights?: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: number;
  maxGpa?: number;
  description?: string;
  achievements?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  url?: string;
  image?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Certification {
  name: string;
  date: string;
  issuer?: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Award {
  id?: string;
  name: string;
  year?: string;
  date?: string;
  description?: string;
}

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications?: Certification[];
  languages?: Language[];
  awards?: Award[];
  publications?: string[];
  volunteer?: string[];
  interests?: string[];
  references?: string[];
  customFields?: Record<string, unknown>;
}

// 分析数据
export interface SectionDwellTime {
  section: string;
  time: number; // 秒
}

export interface TrafficSource {
  source: string;
  count: number;
}

export interface DailyView {
  date: string;
  views: number;
  uniqueVisitors: number;
}

export interface Analytics {
  totalViews: number;
  uniqueVisitors: number;
  avgTimeOnSite: number;
  sectionDwellTime: SectionDwellTime[];
  trafficSources: TrafficSource[];
  dailyViews: DailyView[];
}

// 模板类型
export type TemplateType = 'minimal' | 'professional' | 'tech';

export interface Template {
  id: TemplateType;
  name: string;
  description: string;
  previewImage: string;
  color: string;
}

// 用户网站配置
export interface UserSiteConfig {
  resumeData: ResumeData;
  template: TemplateType;
  primaryColor: string;
  fontFamily: string;
  analyticsEnabled: boolean;
}

// 上传状态
export type UploadStatus = 'idle' | 'uploading' | 'parsing' | 'extracting' | 'success' | 'error';

export interface UploadState {
  status: UploadStatus;
  progress: number;
  fileName: string;
  error?: string;
}
