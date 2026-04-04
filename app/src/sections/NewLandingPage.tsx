import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  BarChart3, 
  Globe, 
  Palette,
  Layers,
  MousePointer,
  Check,
  Play,
  Star,
  Quote
} from 'lucide-react';

interface NewLandingPageProps {
  onNavigate: (page: string) => void;
}

// Animated background with floating particles
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }

    const particles: Particle[] = [];
    const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(250, 250, 252, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#06b6d4';
            ctx.globalAlpha = (1 - dist / 150) * 0.2;
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
    />
  );
};

// Template showcase cards
const templates = [
  {
    id: 'minimal',
    name: '极简主义',
    category: '设计师',
    image: 'from-gray-100 to-gray-200',
    description: '干净、优雅，让作品自己说话',
    features: ['无边框设计', '大字体排版', '留白艺术'],
  },
  {
    id: 'modern',
    name: '现代科技',
    category: '程序员',
    image: 'from-slate-900 via-blue-900 to-slate-900',
    description: '深色主题，动态效果，科技感十足',
    features: ['渐变背景', '发光效果', '动画交互'],
  },
  {
    id: 'creative',
    name: '创意无限',
    category: '艺术家',
    image: 'from-purple-600 via-pink-500 to-orange-400',
    description: '大胆用色，独特布局，展现个性',
    features: ['鲜艳配色', '不规则布局', '视觉冲击'],
  },
  {
    id: 'professional',
    name: '商务精英',
    category: '管理者',
    image: 'from-blue-800 to-blue-600',
    description: '经典稳重，专业可靠',
    features: ['传统布局', '商务配色', '清晰层次'],
  },
];

// Features data
const features = [
  {
    icon: <Palette className="w-6 h-6" />,
    title: '可视化编辑器',
    description: '像搭积木一样拖拽编辑，实时预览效果',
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: '20+ 专业模板',
    description: '覆盖各行各业，总有一款适合你',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: '深度数据分析',
    description: '了解访客行为，优化你的个人品牌',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: '一键部署',
    description: '秒级部署到全球 CDN，访问飞快',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'AI 智能助手',
    description: '聊天式编辑，说出你的想法即可',
  },
  {
    icon: <MousePointer className="w-6 h-6" />,
    title: '自定义域名',
    description: '绑定你的专属域名，专业形象升级',
  },
];

// Testimonials
const testimonials = [
  {
    name: '李明远',
    role: '高级前端工程师',
    company: '字节跳动',
    content: 'Waveme 帮我打造了一个专业的技术博客，面试时 HR 都夸我的个人网站很有格调。数据分析功能让我知道哪些项目最受关注。',
    avatar: 'L',
  },
  {
    name: '张雨晴',
    role: 'UI/UX 设计师',
    company: 'Figma',
    content: '作为一个设计师，我对作品集的要求很高。Waveme 的模板质量超出预期，而且自定义功能非常强大，完全满足我的需求。',
    avatar: 'Z',
  },
  {
    name: '王浩然',
    role: '产品经理',
    company: '阿里巴巴',
    content: '投简历总是石沉大海，有了 Waveme 后，我可以追踪谁看了我的网站，在哪个模块停留最久，这让我能更好地调整求职策略。',
    avatar: 'W',
  },
];

export function NewLandingPage({ onNavigate }: NewLandingPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#fafafc] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleBackground />
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl" />

        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg shadow-cyan-500/10 border border-cyan-100 mb-8"
          >
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <span className="text-sm font-medium text-gray-700">全新升级 2.0</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight"
          >
            打造你的
            <br />
            <span className="text-gradient">个人品牌</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed"
          >
            不只是简历，更是你的作品集。
            <br className="hidden md:block" />
            像 Squarespace 一样简单，像专业设计师一样精美。
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-sm text-gray-500 mb-10"
          >
            投下的每一块石头，都应该泛起涟漪
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={() => onNavigate('upload')}
              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 transition-all hover:scale-105"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              免费开始创建
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('templates')}
              className="px-8 py-6 text-lg rounded-2xl border-2 hover:bg-gray-50"
            >
              <Play className="w-5 h-5 mr-2" />
              浏览模板
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto"
          >
            {[
              { value: '50,000+', label: '已创建网站' },
              { value: '20+', label: '精美模板' },
              { value: '99%', label: '用户满意度' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-gray-400 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Template Showcase */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-cyan-50 text-cyan-600 rounded-full text-sm font-medium mb-4">
              精选模板
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              为每个职业量身打造
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              从程序员到设计师，从商务精英到创意工作者，总有一款适合你
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => onNavigate('templates')}
              >
                <div className="relative overflow-hidden rounded-3xl bg-gray-100 aspect-[4/3]">
                  {/* Template preview */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${template.image} opacity-90`} />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur text-gray-800 rounded-full text-sm font-medium">
                        {template.category}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                        {template.name}
                      </h3>
                      <p className="text-white/80 text-sm mb-4 drop-shadow">
                        {template.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {template.features.map((feature, i) => (
                          <span 
                            key={i}
                            className="px-2 py-1 bg-white/20 backdrop-blur text-white rounded-lg text-xs"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="px-6 py-3 bg-white rounded-full text-gray-900 font-medium shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      预览模板
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('templates')}
              className="rounded-full px-8"
            >
              查看全部 20+ 模板
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium mb-4">
              强大功能
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              像专业设计师一样创作
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              无需编程，无需设计经验，Waveme 让每个人都能打造精美的个人网站
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium mb-4">
              简单三步
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              几分钟，打造专业形象
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: '上传简历',
                description: '拖拽你的 PDF 简历，AI 自动提取关键信息',
                icon: <Layers className="w-8 h-8" />,
              },
              {
                step: '02',
                title: '选择模板',
                description: '从 20+ 专业模板中选择，一键应用',
                icon: <Palette className="w-8 h-8" />,
              },
              {
                step: '03',
                title: '自定义 & 发布',
                description: '调整颜色、字体、布局，一键部署上线',
                icon: <Globe className="w-8 h-8" />,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-8xl font-bold text-gray-100 absolute -top-6 left-0 select-none">
                  {item.step}
                </div>
                <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-white mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Preview */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium mb-6">
                <BarChart3 className="w-4 h-4 inline mr-2" />
                数据洞察
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                每一次访问，
                <br />
                都<span className="text-gradient">清晰可见</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                不再盲目投递简历。了解谁在看你的网站，他们在关注什么，
                用数据驱动你的求职策略。
              </p>
              
              <ul className="space-y-4">
                {[
                  '实时访问统计与趋势分析',
                  '访客来源追踪（LinkedIn、邮件、直接访问）',
                  '模块停留时间热力图',
                  '地理位置与设备分析',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative bg-slate-800/50 rounded-3xl p-8 border border-slate-700 backdrop-blur">
                {/* Mock analytics dashboard */}
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-semibold">访问概览</h3>
                  <span className="text-sm text-slate-400">最近 30 天</span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { label: '总访问', value: '2,847' },
                    { label: '独立访客', value: '1,923' },
                    { label: '平均停留', value: '3:42' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-4 bg-slate-700/50 rounded-2xl">
                      <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                      <div className="text-xs text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">工作经历</span>
                      <span className="text-cyan-400">48%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-[48%] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">项目展示</span>
                      <span className="text-cyan-400">32%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-[32%] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">技能列表</span>
                      <span className="text-cyan-400">20%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-[20%] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-yellow-50 text-yellow-600 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4 inline mr-1" />
              用户评价
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              他们都在用 Waveme
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <Quote className="w-10 h-10 text-cyan-200 mb-4" />
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role} · {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              准备好打造你的个人品牌了吗？
            </h2>
            <p className="text-xl text-white/80 mb-10">
              免费开始，无需信用卡，随时升级
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => onNavigate('upload')}
                className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-6 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                免费开始创建
              </Button>
            </div>
            <p className="text-white/60 text-sm mt-6">
              已有 50,000+ 用户信任 Waveme
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">waveme</span>
            </div>
            <div className="text-sm">
              © 2026 Waveme. 让每一份努力都能被看见。
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
