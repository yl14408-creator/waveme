import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type Language = 'zh' | 'en';

const zhTranslations = {
  // 通用
  'common.appName': 'Waveme',
  'common.slogan': '让每一份努力都被看见',
  'common.startFree': '免费开始',
  'common.learnMore': '了解更多',
  'common.login': '登录',
  'common.register': '注册',
  'common.logout': '退出',
  'common.save': '保存',
  'common.cancel': '取消',
  'common.delete': '删除',
  'common.edit': '编辑',
  'common.preview': '预览',
  'common.export': '导出',
  'common.share': '分享',
  'common.copy': '复制',
  'common.copied': '已复制',
  'common.loading': '加载中...',
  'common.error': '出错了',
  'common.success': '成功',
  'common.confirm': '确认',
  'common.back': '返回',
  'common.next': '下一步',
  'common.finish': '完成',
  'common.close': '关闭',
  'common.open': '打开',
  'common.search': '搜索',
  'common.filter': '筛选',
  'common.sort': '排序',
  'common.all': '全部',
  'common.none': '无',
  'common.or': '或',
  'common.and': '和',
  'common.more': '更多',
  'common.less': '收起',
  'common.show': '显示',
  'common.hide': '隐藏',
  'common.yes': '是',
  'common.no': '否',
  'common.ok': '确定',
  'common.submit': '提交',
  'common.upload': '上传',
  'common.download': '下载',
  'common.dragDrop': '拖拽到此处',
  'common.clickUpload': '点击上传',
  'common.fileSizeLimit': '文件大小限制',
  'common.supportedFormats': '支持格式',
  'common.days': '天',
  'common.language': '语言',
  
  // 导航
  'nav.home': '首页',
  'nav.templates': '模板',
  'nav.components': '组件库',
  'nav.pricing': '定价',
  'nav.faq': '常见问题',
  'nav.dashboard': '数据面板',
  'nav.editor': '编辑器',
  'nav.settings': '设置',
  'nav.profile': '个人资料',
  'nav.analytics': '数据分析',
  
  // 首页 Hero
  'hero.title': '打造你的',
  'hero.subtitle': '个人品牌',
  'hero.description': '不只是简历，更是你的作品集。上传简历，AI 帮你生成专业个人网站。',
  'hero.cta.start': 'AI 帮我创建',
  'hero.cta.browse': '浏览模板',
  'hero.stats.sites': '已创建网站',
  'hero.stats.templates': '精美模板',
  'hero.stats.satisfaction': '用户满意度',
  
  // AI 引导
  'aiGuide.title': 'AI 助手',
  'aiGuide.question.purpose': '你想用个人网站做什么？',
  'aiGuide.question.industry': '你所在的行业是？',
  'aiGuide.question.style': '你喜欢什么风格？',
  'aiGuide.option.job': '参加校招/求职',
  'aiGuide.option.portfolio': '展示设计作品',
  'aiGuide.option.tech': '技术博客/开源',
  'aiGuide.option.academic': '学术研究/论文',
  'aiGuide.option.techIndustry': '互联网/科技',
  'aiGuide.option.design': '设计/创意',
  'aiGuide.option.business': '金融/咨询',
  'aiGuide.option.other': '其他',
  'aiGuide.option.minimal': '极简干净',
  'aiGuide.option.techStyle': '科技感',
  'aiGuide.option.playful': '活泼有趣',
  'aiGuide.option.professional': '专业稳重',
  'aiGuide.option.creative': '艺术创作',
  
  // 模板
  'templates.title': '找到属于你的风格',
  'templates.subtitle': '像素风、涂鸦风、极简风、赛博朋克... 总有一款能表达你',
  'templates.count': '精选模板',
  'templates.preview': '预览模板',
  'templates.viewAll': '查看全部模板',
  'templates.category.tech': '技术极客',
  'templates.category.design': '设计师',
  'templates.category.creative': '创意工作者',
  'templates.category.business': '商务精英',
  'templates.category.academic': '学术研究者',
  
  // 数据面板
  'dashboard.title': '数据洞察',
  'dashboard.subtitle': '每一次访问，都清晰可见',
  'dashboard.description': '不再盲目投递简历。了解谁在看你的网站，他们在关注什么，用数据驱动你的求职策略。',
  'dashboard.stats.totalViews': '总访问',
  'dashboard.stats.uniqueVisitors': '独立访客',
  'dashboard.stats.avgTime': '平均停留',
  'dashboard.features.realtime': '实时访问统计与趋势分析',
  'dashboard.features.source': '访客来源追踪（LinkedIn、邮件、直接访问）',
  'dashboard.features.heatmap': '模块停留时间热力图',
  'dashboard.features.geo': '地理位置与设备分析',
  
  // 上传页面
  'upload.title': '上传你的简历',
  'upload.subtitle': '支持 PDF 格式，AI 将自动提取你的姓名、经历、技能等信息',
  'upload.dragText': '拖拽PDF文件到此处，或点击上传',
  'upload.supported': '支持 PDF 格式，文件大小不超过 10MB',
  'upload.status.uploading': '正在上传...',
  'upload.status.parsing': '正在解析简历内容...',
  'upload.status.success': '解析成功！',
  'upload.status.error': '上传失败',
  'upload.feature.auto': '自动识别',
  'upload.feature.autoDesc': '智能提取姓名、联系方式、工作经历等关键信息',
  'upload.feature.structure': '结构解析',
  'upload.feature.structureDesc': '自动识别简历结构，整理成标准化的数据格式',
  'upload.feature.preview': '即时预览',
  'upload.feature.previewDesc': '解析完成后可立即预览生成的个人网站效果',
  'upload.tips.title': '小贴士',
  'upload.tips.pdf': '确保PDF中的文字可以被选中（不是扫描件图片）',
  'upload.tips.format': '简历格式越规范，解析效果越好',
  'upload.tips.edit': '解析完成后可以在编辑器中修改和调整内容',
  
  // 隐私
  'privacy.title': '隐私保护',
  'privacy.slogan': '你的简历属于你，不属于 WaveMe',
  'privacy.promise': '我们只帮你展示，不帮你收集',
  'privacy.minimal': '最小化数据收集',
  'privacy.minimalDesc': '只收集实现功能所需的最少字段',
  'privacy.anonymize': '去标识化处理',
  'privacy.anonymizeDesc': '不存储 PII；城市级别位置；IP 仅用于解析后丢弃',
  'privacy.encryption': '端到端加密',
  'privacy.encryptionDesc': '传输 TLS；存储端使用服务端加密',
  'privacy.delete': '一键删除',
  'privacy.deleteDesc': '随时删除你的简历和解析数据',
  'privacy.mode': '隐私模式',
  'privacy.modeDesc': '关闭访客分析，保护访问者隐私',
  'privacy.searchEngine': '防止搜索引擎抓取',
  'privacy.searchEngineDesc': '为你的网站信息加筑安全保障',
  
  // 定价
  'pricing.title': '选择适合你的方案',
  'pricing.subtitle': '免费开始，随时升级',
  'pricing.free': '免费版',
  'pricing.pro': '专业版',
  'pricing.enterprise': '企业版',
  'pricing.month': '/月',
  'pricing.year': '/年',
  'pricing.popular': '最受欢迎',
  'pricing.cta.free': '免费开始',
  'pricing.cta.pro': '升级专业版',
  'pricing.cta.enterprise': '联系销售',
  'pricing.feature.sites': '网站数量',
  'pricing.feature.templates': '模板数量',
  'pricing.feature.analytics': '数据分析',
  'pricing.feature.customDomain': '自定义域名',
  'pricing.feature.export': '导出代码',
  'pricing.feature.support': '客服支持',
  
  // FAQ
  'faq.title': '常见问题',
  'faq.subtitle': '找不到答案？随时联系我们的客服团队',
  'faq.category.gettingStarted': '入门',
  'faq.category.features': '功能',
  'faq.category.pricing': '定价',
  'faq.category.security': '安全',
  'faq.category.deployment': '部署',
  'faq.contact.title': '还有其他问题？',
  'faq.contact.desc': '我们的客服团队随时为你解答',
  'faq.contact.email': '发送邮件',
  
  // 组件库
  'components.title': '丰富的可视化组件',
  'components.subtitle': '20+ 精心设计的组件，让你的个人网站更具专业感和视觉冲击力',
  'components.category.charts': '数据图表',
  'components.category.progress': '进度展示',
  'components.category.cards': '信息卡片',
  'components.category.media': '媒体展示',
  'components.category.dashboard': '仪表盘',
  'components.cta': '开始使用这些组件',
  
  // 编辑器
  'editor.title': '编辑个人网站',
  'editor.subtitle': '预览并调整你的内容',
  'editor.tab.preview': '预览',
  'editor.tab.edit': '编辑',
  'editor.settings.appearance': '外观设置',
  'editor.settings.themeColor': '主题色',
  'editor.settings.overview': '内容概览',
  'editor.settings.name': '姓名',
  'editor.settings.title': '职位',
  'editor.settings.experience': '工作经历',
  'editor.settings.skills': '技能',
  'editor.export': '导出网站',
  'editor.finish': '完成，查看数据面板',
  
  // AI 功能
  'ai.title': 'AI 智能助手',
  'ai.subtitle': '让 AI 帮你包装简历，打造完美个人品牌',
  'ai.feature.optimize': '简历优化',
  'ai.feature.optimizeDesc': 'AI 分析你的简历，给出优化建议',
  'ai.feature.generate': '内容生成',
  'ai.feature.generateDesc': '根据你的经历，生成专业的项目描述',
  'ai.feature.suggest': '智能推荐',
  'ai.feature.suggestDesc': '推荐最适合你的模板和配色方案',
  'ai.prompt.placeholder': '描述你的职业背景和期望...',
  'ai.prompt.example1': '我是一名前端工程师，有5年经验，想展示我的技术能力',
  'ai.prompt.example2': '我是设计师，想做一个作品集网站展示我的作品',
  'ai.prompt.example3': '我是应届毕业生，想做一个专业的求职网站',
  'ai.generating': 'AI 正在生成...',
  'ai.suggestion.title': 'AI 建议',
  'ai.suggestion.template': '推荐模板',
  'ai.suggestion.color': '推荐配色',
  'ai.suggestion.content': '内容优化',
  
  // 客服
  'support.email': 'support@waveme.app',
  'support.title': '客服支持',
  'support.desc': '遇到问题？我们随时为你提供帮助',
  'support.hours': '工作时间：周一至周五 9:00-18:00',
  'support.response': '通常在 24 小时内回复',
  
  // 错误页面
  'error.404.title': '页面未找到',
  'error.404.desc': '抱歉，你访问的页面不存在',
  'error.404.back': '返回首页',
  'error.500.title': '服务器错误',
  'error.500.desc': '抱歉，服务器出现了一些问题',
  'error.500.retry': '重试',
  
  // footer
  'footer.product': '产品',
  'footer.support': '支持',
  'footer.legal': '法律',
  'footer.copyright': '© 2026 Waveme. 让每一份努力都能被看见。',
  'footer.madeWith': 'Made with ❤️ for job seekers',
  'footer.slogan': '让每一份努力都被看见',
  'footer.promise': '我们只帮你展示，不帮你收集',
  'footer.templates': '模板',
  'footer.components': '组件库',
  'footer.pricing': '定价',
  'footer.startFree': '免费开始',
  'footer.faq': '常见问题',
  'footer.sendEmail': '发送邮件',
  'footer.login': '登录 / 注册',
  'footer.terms': '服务条款',
  'footer.privacy': '隐私政策',
  
  // CTA Section
  'cta.title': '准备好展示你的作品了吗？',
  'cta.subtitle': '免费开始，随时升级',
  'cta.start': '免费开始',
  'cta.pricing': '查看定价',
  
  // Testimonials
  'testimonials.title': '他们都在用 Waveme',
  'testimonials.subtitle': '用户满意度 99%',
  
  // Dashboard Preview
  'dashboardPreview.title': '每一次访问，都清晰可见',
  'dashboardPreview.subtitle': '数据洞察',
  'dashboardPreview.description': '不再盲目投递简历。了解谁在看你的网站，他们在关注什么，用数据驱动你的求职策略。',
  'dashboardPreview.days': '30 天',
  'dashboardPreview.workExperience': '工作经历',
  'dashboardPreview.components': '组件库',
  'dashboardPreview.skills': '技能',
  
  // Template Showcase
  'templateShowcase.badge': '15+ 精选模板',
  'templateShowcase.preview': '预览模板',
  'templateShowcase.viewAll': '查看全部模板',

  // Template Page
  'template.select': '选择',
  'template.selected': '已选择',
  'template.preview': '预览',
  'template.viewExample': '查看示例',
  'template.continue': '继续编辑',
  'template.style': '风格',
  'template.features': '特性',

  // Auth Page
  'auth.login': '登录',
  'auth.register': '注册',
  'auth.email': '邮箱',
  'auth.password': '密码',
  'auth.confirmPassword': '确认密码',
  'auth.forgotPassword': '忘记密码？',
  'auth.noAccount': '没有账号？',
  'auth.hasAccount': '已有账号？',
  'auth.loginWithGoogle': '使用 Google 登录',
  'auth.or': '或',
  'auth.terms': '继续即表示你同意我们的服务条款和隐私政策',

  // Domain Page
  'domain.title': '自定义域名',
  'domain.subtitle': '使用你自己的域名，看起来更专业',
  'domain.search': '搜索域名',
  'domain.available': '可用',
  'domain.registered': '已注册',
  'domain.price': '价格',
  'domain.select': '选择',
  'domain.manage': '管理域名',

  // Analytics
  'analytics.totalViews': '总访问量',
  'analytics.uniqueVisitors': '独立访客',
  'analytics.avgTime': '平均停留',
  'analytics.bounceRate': '跳出率',
  'analytics.trafficSources': '流量来源',
  'analytics.sectionDwell': '模块停留时间',
  'analytics.recentVisitors': '最近访客',
  'analytics.insight': '洞察',
  'analytics.refresh': '刷新',
  'analytics.export': '导出报告',
  'analytics.share': '分享',

  // Status
  'status.online': '在线',
  'status.offline': '离线',
  'status.warning': '警告',
  'status.processing': '处理中',

  // Common Actions
  'action.copy': '复制',
  'action.copied': '已复制！',
  'action.save': '保存',
  'action.edit': '编辑',
  'action.delete': '删除',
  'action.cancel': '取消',
  'action.confirm': '确认',
  'action.apply': '应用',
  'action.reset': '重置',
  'action.filter': '筛选',
  'action.sort': '排序',
  'action.search': '搜索',
  'action.clear': '清除',
  'action.loadMore': '加载更多',
  'action.viewAll': '查看全部',
  'action.seeMore': '查看更多',
  'action.seeLess': '收起',
  'action.expand': '展开',
  'action.collapse': '折叠',
  'action.show': '显示',
  'action.hide': '隐藏',

  // Time
  'time.justNow': '刚刚',
  'time.minutesAgo': '{{minutes}} 分钟前',
  'time.hoursAgo': '{{hours}} 小时前',
  'time.daysAgo': '{{days}} 天前',
  'time.today': '今天',
  'time.yesterday': '昨天',
  'time.thisWeek': '本周',
  'time.thisMonth': '本月',
  'time.lastMonth': '上个月',
};

const enTranslations: Record<string, string> = {
  // Common
  'common.appName': 'Waveme',
  'common.slogan': 'Make every effort visible',
  'common.startFree': 'Start for Free',
  'common.learnMore': 'Learn More',
  'common.login': 'Login',
  'common.register': 'Register',
  'common.logout': 'Logout',
  'common.save': 'Save',
  'common.cancel': 'Cancel',
  'common.delete': 'Delete',
  'common.edit': 'Edit',
  'common.preview': 'Preview',
  'common.export': 'Export',
  'common.share': 'Share',
  'common.copy': 'Copy',
  'common.copied': 'Copied',
  'common.loading': 'Loading...',
  'common.error': 'Error',
  'common.success': 'Success',
  'common.confirm': 'Confirm',
  'common.back': 'Back',
  'common.next': 'Next',
  'common.finish': 'Finish',
  'common.close': 'Close',
  'common.open': 'Open',
  'common.search': 'Search',
  'common.filter': 'Filter',
  'common.sort': 'Sort',
  'common.all': 'All',
  'common.none': 'None',
  'common.or': 'Or',
  'common.and': 'And',
  'common.more': 'More',
  'common.less': 'Less',
  'common.show': 'Show',
  'common.hide': 'Hide',
  'common.yes': 'Yes',
  'common.no': 'No',
  'common.ok': 'OK',
  'common.submit': 'Submit',
  'common.upload': 'Upload',
  'common.download': 'Download',
  'common.dragDrop': 'Drag and drop here',
  'common.clickUpload': 'Click to upload',
  'common.fileSizeLimit': 'File size limit',
  'common.supportedFormats': 'Supported formats',
  'common.days': 'days',
  'common.language': 'Language',
  
  // Navigation
  'nav.home': 'Home',
  'nav.templates': 'Templates',
  'nav.components': 'Components',
  'nav.pricing': 'Pricing',
  'nav.faq': 'FAQ',
  'nav.dashboard': 'Dashboard',
  'nav.editor': 'Editor',
  'nav.settings': 'Settings',
  'nav.profile': 'Profile',
  'nav.analytics': 'Analytics',
  
  // Hero
  'hero.title': 'More than a Resume',
  'hero.subtitle': 'It is Your Portfolio',
  'hero.description': 'Upload your resume, AI will generate a professional personal website',
  'hero.tagline': 'Let opportunities find you',
  'hero.uploadResume': 'Upload Resume',
  'hero.aiCreate': 'AI Create',
  'hero.browseTemplates': 'Browse Templates',
  'hero.scrollDown': 'Scroll Down',
  'hero.cta.start': 'Create with AI',
  'hero.cta.browse': 'Browse Templates',
  'hero.stats.sites': 'Sites Created',
  'hero.stats.templates': 'Templates',
  'hero.stats.satisfaction': 'Satisfaction',
  
  // AI Guide
  'aiGuide.title': 'AI Assistant',
  'aiGuide.question.purpose': 'What do you want to use your personal website for?',
  'aiGuide.question.industry': 'What industry are you in?',
  'aiGuide.question.style': 'What style do you prefer?',
  'aiGuide.option.job': 'Job Hunting',
  'aiGuide.option.portfolio': 'Portfolio Showcase',
  'aiGuide.option.tech': 'Tech Blog / Open Source',
  'aiGuide.option.academic': 'Academic Research',
  'aiGuide.option.techIndustry': 'Tech / Internet',
  'aiGuide.option.design': 'Design / Creative',
  'aiGuide.option.business': 'Finance / Consulting',
  'aiGuide.option.other': 'Other',
  'aiGuide.option.minimal': 'Minimal & Clean',
  'aiGuide.option.techStyle': 'Tech Style',
  'aiGuide.option.playful': 'Playful & Fun',
  'aiGuide.option.professional': 'Professional',
  'aiGuide.option.creative': 'Creative Art',
  
  // Templates
  'templates.title': 'Find Your Style',
  'templates.subtitle': 'Pixel, Doodle, Minimal, Cyberpunk... There is one that expresses you',
  'templates.count': 'Templates',
  'templates.preview': 'Preview',
  'templates.viewAll': 'View All Templates',
  'templates.category.tech': 'Tech Geek',
  'templates.category.design': 'Designer',
  'templates.category.creative': 'Creative',
  'templates.category.business': 'Business',
  'templates.category.academic': 'Academic',
  
  // Dashboard
  'dashboard.title': 'Data Insights',
  'dashboard.subtitle': 'Every visit is clearly visible',
  'dashboard.description': 'Stop sending resumes blindly. Know who is viewing your site, what they are interested in, and use data to drive your job search strategy.',
  'dashboard.stats.totalViews': 'Total Views',
  'dashboard.stats.uniqueVisitors': 'Unique Visitors',
  'dashboard.stats.avgTime': 'Avg. Time',
  'dashboard.features.realtime': 'Real-time visit statistics and trend analysis',
  'dashboard.features.source': 'Visitor source tracking (LinkedIn, Email, Direct)',
  'dashboard.features.heatmap': 'Module dwell time heatmap',
  'dashboard.features.geo': 'Geographic and device analysis',
  
  // Upload
  'upload.title': 'Upload Your Resume',
  'upload.subtitle': 'Supports PDF format. AI will automatically extract your name, experience, skills, etc.',
  'upload.dragText': 'Drag PDF here or click to upload',
  'upload.supported': 'Supports PDF, max 10MB',
  'upload.status.uploading': 'Uploading...',
  'upload.status.parsing': 'Parsing resume...',
  'upload.status.success': 'Parse successful!',
  'upload.status.error': 'Upload failed',
  'upload.feature.auto': 'Auto Recognition',
  'upload.feature.autoDesc': 'Intelligently extract name, contact, work experience, etc.',
  'upload.feature.structure': 'Structure Parsing',
  'upload.feature.structureDesc': 'Automatically recognize resume structure and organize into standardized format',
  'upload.feature.preview': 'Instant Preview',
  'upload.feature.previewDesc': 'Preview generated website immediately after parsing',
  'upload.tips.title': 'Tips',
  'upload.tips.pdf': 'Ensure PDF text is selectable (not scanned image)',
  'upload.tips.format': 'The more standardized the format, the better the parsing',
  'upload.tips.edit': 'You can edit and adjust content after parsing',
  
  // Privacy
  'privacy.title': 'Privacy Protection',
  'privacy.slogan': 'Your resume belongs to you, not WaveMe',
  'privacy.promise': 'We only help you showcase, not collect',
  'privacy.minimal': 'Minimal Data Collection',
  'privacy.minimalDesc': 'Only collect minimum fields needed for functionality',
  'privacy.anonymize': 'De-identification',
  'privacy.anonymizeDesc': 'No PII stored; city-level location; IP discarded after parsing',
  'privacy.encryption': 'End-to-End Encryption',
  'privacy.encryptionDesc': 'TLS for transmission; server-side encryption for storage',
  'privacy.delete': 'One-Click Delete',
  'privacy.deleteDesc': 'Delete your resume and parsed data anytime',
  'privacy.mode': 'Privacy Mode',
  'privacy.modeDesc': 'Disable visitor analytics to protect visitor privacy',
  'privacy.searchEngine': 'Prevent Search Engine Indexing',
  'privacy.searchEngineDesc': 'Add security protection for your website information',
  
  // Pricing
  'pricing.title': 'Choose Your Plan',
  'pricing.subtitle': 'Start free, upgrade anytime',
  'pricing.free': 'Free',
  'pricing.pro': 'Pro',
  'pricing.enterprise': 'Enterprise',
  'pricing.month': '/month',
  'pricing.year': '/year',
  'pricing.popular': 'Most Popular',
  'pricing.cta.free': 'Start Free',
  'pricing.cta.pro': 'Upgrade to Pro',
  'pricing.cta.enterprise': 'Contact Sales',
  'pricing.feature.sites': 'Websites',
  'pricing.feature.templates': 'Templates',
  'pricing.feature.analytics': 'Analytics',
  'pricing.feature.customDomain': 'Custom Domain',
  'pricing.feature.export': 'Export Code',
  'pricing.feature.support': 'Support',
  
  // FAQ
  'faq.title': 'FAQ',
  'faq.subtitle': 'Cannot find the answer? Contact our support team anytime',
  'faq.category.gettingStarted': 'Getting Started',
  'faq.category.features': 'Features',
  'faq.category.pricing': 'Pricing',
  'faq.category.security': 'Security',
  'faq.category.deployment': 'Deployment',
  'faq.contact.title': 'Still have questions?',
  'faq.contact.desc': 'Our support team is ready to help',
  'faq.contact.email': 'Send Email',
  
  // Components
  'components.title': 'Rich Visual Components',
  'components.subtitle': '20+ carefully designed components to make your personal website more professional and visually impactful',
  'components.category.charts': 'Data Charts',
  'components.category.progress': 'Progress Display',
  'components.category.cards': 'Info Cards',
  'components.category.media': 'Media Display',
  'components.category.dashboard': 'Dashboard',
  'components.cta': 'Start Using These Components',
  
  // Editor
  'editor.title': 'Edit Your Website',
  'editor.subtitle': 'Preview and adjust your content',
  'editor.tab.preview': 'Preview',
  'editor.tab.edit': 'Edit',
  'editor.settings.appearance': 'Appearance Settings',
  'editor.settings.themeColor': 'Theme Color',
  'editor.settings.overview': 'Content Overview',
  'editor.settings.name': 'Name',
  'editor.settings.title': 'Title',
  'editor.settings.experience': 'Experience',
  'editor.settings.skills': 'Skills',
  'editor.export': 'Export Website',
  'editor.finish': 'Finish, View Dashboard',
  
  // AI
  'ai.title': 'AI Smart Assistant',
  'ai.subtitle': 'Let AI help you package your resume and build the perfect personal brand',
  'ai.feature.optimize': 'Resume Optimization',
  'ai.feature.optimizeDesc': 'AI analyzes your resume and gives optimization suggestions',
  'ai.feature.generate': 'Content Generation',
  'ai.feature.generateDesc': 'Generate professional project descriptions based on your experience',
  'ai.feature.suggest': 'Smart Recommendations',
  'ai.feature.suggestDesc': 'Recommend the best templates and color schemes for you',
  'ai.prompt.placeholder': 'Describe your background and expectations...',
  'ai.prompt.example1': 'I am a frontend engineer with 5 years experience, want to showcase my technical skills',
  'ai.prompt.example2': 'I am a designer, want to create a portfolio website to showcase my work',
  'ai.prompt.example3': 'I am a fresh graduate, want to create a professional job search website',
  'ai.generating': 'AI is generating...',
  'ai.suggestion.title': 'AI Suggestions',
  'ai.suggestion.template': 'Recommended Template',
  'ai.suggestion.color': 'Recommended Colors',
  'ai.suggestion.content': 'Content Optimization',
  
  // Support
  'support.email': 'support@waveme.app',
  'support.title': 'Customer Support',
  'support.desc': 'Having issues? We are here to help',
  'support.hours': 'Working hours: Mon-Fri 9:00-18:00',
  'support.response': 'Usually respond within 24 hours',
  
  // Error
  'error.404.title': 'Page Not Found',
  'error.404.desc': 'Sorry, the page you visited does not exist',
  'error.404.back': 'Back to Home',
  'error.500.title': 'Server Error',
  'error.500.desc': 'Sorry, there are some issues with the server',
  'error.500.retry': 'Retry',
  
  // Footer
  'footer.product': 'Product',
  'footer.support': 'Support',
  'footer.legal': 'Legal',
  'footer.copyright': '© 2026 Waveme. Make every effort visible.',
  'footer.madeWith': 'Made with ❤️ for job seekers by lili',
  'footer.slogan': 'Make every effort visible',
  'footer.promise': 'We only help you showcase, not collect',
  'footer.templates': 'Templates',
  'footer.components': 'Components',
  'footer.pricing': 'Pricing',
  'footer.startFree': 'Start Free',
  'footer.faq': 'FAQ',
  'footer.sendEmail': 'Send Email',
  'footer.login': 'Login / Register',
  'footer.terms': 'Terms of Service',
  'footer.privacy': 'Privacy Policy',
  
  // CTA Section
  'cta.title': 'Ready to showcase your work?',
  'cta.subtitle': 'Start free, upgrade anytime',
  'cta.start': 'Start Free',
  'cta.pricing': 'View Pricing',
  
  // Testimonials
  'testimonials.title': 'They are all using Waveme',
  'testimonials.subtitle': 'User satisfaction 99%',
  
  // Dashboard Preview
  'dashboardPreview.title': 'Every visit is clearly visible',
  'dashboardPreview.subtitle': 'Data Insights',
  'dashboardPreview.description': 'Stop sending resumes blindly. Know who is viewing your site, what they are interested in, and use data to drive your job search strategy.',
  'dashboardPreview.days': '30 Days',
  'dashboardPreview.workExperience': 'Work Experience',
  'dashboardPreview.components': 'Components',
  'dashboardPreview.skills': 'Skills',
  
  // Template Showcase
  'templateShowcase.badge': '15+ Curated Templates',
  'templateShowcase.preview': 'Preview Template',
  'templateShowcase.viewAll': 'View All Templates',
  
  // Template Page
  'template.select': 'Select',
  'template.selected': 'Selected',
  'template.preview': 'Preview',
  'template.viewExample': 'View Example',
  'template.continue': 'Continue Editing',
  'template.style': 'Style',
  'template.features': 'Features',
  
  // Auth Page
  'auth.login': 'Login',
  'auth.register': 'Register',
  'auth.email': 'Email',
  'auth.password': 'Password',
  'auth.confirmPassword': 'Confirm Password',
  'auth.forgotPassword': 'Forgot Password?',
  'auth.noAccount': 'Don\'t have an account?',
  'auth.hasAccount': 'Already have an account?',
  'auth.loginWithGoogle': 'Login with Google',
  'auth.or': 'or',
  'auth.terms': 'By continuing, you agree to our Terms of Service and Privacy Policy',
  
  // Domain Page
  'domain.title': 'Custom Domain',
  'domain.subtitle': 'Use your own domain for a more professional look',
  'domain.search': 'Search Domain',
  'domain.available': 'Available',
  'domain.registered': 'Registered',
  'domain.price': 'Price',
  'domain.select': 'Select',
  'domain.manage': 'Manage Domains',
  
  // Analytics
  'analytics.totalViews': 'Total Views',
  'analytics.uniqueVisitors': 'Unique Visitors',
  'analytics.avgTime': 'Avg. Time',
  'analytics.bounceRate': 'Bounce Rate',
  'analytics.trafficSources': 'Traffic Sources',
  'analytics.sectionDwell': 'Section Dwell Time',
  'analytics.recentVisitors': 'Recent Visitors',
  'analytics.insight': 'Insight',
  'analytics.refresh': 'Refresh',
  'analytics.export': 'Export Report',
  'analytics.share': 'Share',
  
  // Status
  'status.online': 'Online',
  'status.offline': 'Offline',
  'status.warning': 'Warning',
  'status.processing': 'Processing',
  
  // Common Actions
  'action.copy': 'Copy',
  'action.copied': 'Copied!',
  'action.save': 'Save',
  'action.edit': 'Edit',
  'action.delete': 'Delete',
  'action.cancel': 'Cancel',
  'action.confirm': 'Confirm',
  'action.apply': 'Apply',
  'action.reset': 'Reset',
  'action.filter': 'Filter',
  'action.sort': 'Sort',
  'action.search': 'Search',
  'action.clear': 'Clear',
  'action.loadMore': 'Load More',
  'action.viewAll': 'View All',
  'action.seeMore': 'See More',
  'action.seeLess': 'See Less',
  'action.expand': 'Expand',
  'action.collapse': 'Collapse',
  'action.show': 'Show',
  'action.hide': 'Hide',
  
  // Time
  'time.justNow': 'Just now',
  'time.minutesAgo': '{{minutes}} minutes ago',
  'time.hoursAgo': '{{hours}} hours ago',
  'time.daysAgo': '{{days}} days ago',
  'time.today': 'Today',
  'time.yesterday': 'Yesterday',
  'time.thisWeek': 'This week',
  'time.thisMonth': 'This month',
  'time.lastMonth': 'Last month',
};

const translations: Record<Language, Record<string, string>> = {
  zh: zhTranslations,
  en: enTranslations,
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('waveme-language') as Language;
      if (saved && translations[saved]) return saved;
      
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'zh') return 'zh';
    }
    return 'en';
  });

  const setLanguageWithStorage = useCallback((lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('waveme-language', lang);
    }
  }, []);

  const t = useCallback((key: string, params?: Record<string, string>) => {
    const translation = translations[language][key] || key;
    if (typeof translation !== 'string') return key;
    
    if (params) {
      return Object.entries(params).reduce(
        (acc, [k, v]) => acc.replace(`{{${k}}}`, v),
        translation
      );
    }
    return translation;
  }, [language]);

  return (
    <I18nContext.Provider value={{ 
      language, 
      setLanguage: setLanguageWithStorage, 
      t 
    }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

export { translations };
