import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Sparkles, 
  Droplets,
  Wind,
  Mountain,
  Waves,
  Leaf,
  Feather,
  Scroll,
  Palette,
  Eye,
  BarChart3,
  Shield,
  Lock,
  Globe,
  X,
  Check,
  ChevronRight,
  Quote,
  Send,
  FileText,
  Wand2,
  Menu,
  Languages
} from 'lucide-react';
import { wavemeColors, wavemeGradients, wavemeShadows } from '@/styles/waveme-theme';
import { useI18n } from '@/i18n/index.tsx';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

interface WavemeInkLandingProps {
  onNavigate: (page: string) => void;
}

// 水墨粒子背景
const InkParticleBackground = () => {
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
    
    // 水墨粒子
    const particles: { 
      x: number; 
      y: number; 
      vx: number; 
      vy: number; 
      size: number; 
      opacity: number;
      life: number;
      maxLife: number;
    }[] = [];
    
    // 创建新粒子
    const createParticle = () => {
      if (particles.length < 30) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 80 + 40,
          opacity: 0,
          life: 0,
          maxLife: Math.random() * 300 + 200,
        });
      }
    };
    
    const animate = () => {
      // 淡入淡出效果
      ctx.fillStyle = 'rgba(250, 249, 247, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 创建新粒子
      if (Math.random() < 0.05) createParticle();
      
      particles.forEach((p, i) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        
        // 生命周期管理
        if (p.life < 50) {
          p.opacity = (p.life / 50) * 0.08;
        } else if (p.life > p.maxLife - 50) {
          p.opacity = ((p.maxLife - p.life) / 50) * 0.08;
        }
        
        // 绘制水墨晕染效果
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(107, 102, 94, ${p.opacity})`);
        gradient.addColorStop(0.5, `rgba(163, 158, 150, ${p.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(107, 102, 94, 0)');
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // 移除死亡粒子
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    return () => window.removeEventListener('resize', resize);
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
};

// 水波纹组件
const WaterRipple = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: 'rgba(138, 156, 164, 0.2)' }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.5, 2],
            opacity: [0.6, 0.3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
};

// 导航栏
const Navbar = ({ onNavigate, currentPage }: { onNavigate: (page: string) => void; currentPage: string }) => {
  const { t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { id: 'templates', label: t('nav.templates') },
    { id: 'components', label: t('nav.components') },
    { id: 'pricing', label: t('nav.pricing') },
  ];
  
  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#faf9f7]/90 backdrop-blur-md shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 group"
            >
              <div className="relative w-10 h-10">
                <WaterRipple className="w-10 h-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-[#6b8c5c] group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <span className="text-xl font-medium tracking-wide" style={{ fontFamily: 'serif' }}>
                <span className="text-[#2d2a26]">wave</span>
                <span className="text-[#6b8c5c]">me</span>
              </span>
            </button>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="relative text-[#4a453f] hover:text-[#2d2a26] transition-colors text-sm tracking-wide"
                >
                  {item.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-px bg-[#6b8c5c]"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
              ))}
            </div>
            
            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />
              <button 
                onClick={() => onNavigate('auth')}
                className="text-sm text-[#4a453f] hover:text-[#2d2a26] transition-colors"
              >
                {t('common.login')}
              </button>
              <Button
                onClick={() => onNavigate('upload')}
                className="bg-[#c45c48] hover:bg-[#a34432] text-white rounded-full px-6 text-sm"
                style={{ boxShadow: wavemeShadows.md }}
              >
                {t('common.startFree')}
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 z-40 md:hidden bg-[#faf9f7]/95 backdrop-blur-md border-b border-[#e8e4df]"
          >
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-[#4a453f]"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-[#e8e4df] space-y-3">
                <LanguageSwitcher />
                <button 
                  onClick={() => {
                    onNavigate('auth');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-[#4a453f]"
                >
                  {t('common.login')}
                </button>
                <Button
                  onClick={() => {
                    onNavigate('upload');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-[#c45c48] hover:bg-[#a34432] text-white"
                >
                  {t('common.startFree')}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Hero Section
const HeroSection = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const { t } = useI18n();
  const [showAIGuide, setShowAIGuide] = useState(false);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <InkParticleBackground />
      
      {/* 远山背景 */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 opacity-30">
        <svg viewBox="0 0 1440 400" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M0,300 Q200,200 400,280 T800,250 T1200,300 T1440,280 L1440,400 L0,400 Z"
            fill="url(#mountainGradient)"
          />
          <path
            d="M0,350 Q300,280 600,320 T1200,300 T1440,340 L1440,400 L0,400 Z"
            fill="url(#mountainGradient2)"
            opacity="0.5"
          />
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a39e96" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#d4cfc7" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="mountainGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6b665e" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#e8e4df" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
        {/* 印章 Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 border-2 border-[#c45c48] rounded-lg rotate-3">
            <div className="text-center">
              <div className="text-[#c45c48] text-xs tracking-widest">上善</div>
              <div className="text-[#c45c48] text-lg font-bold">若水</div>
            </div>
          </div>
        </motion.div>
        
        {/* 主标题 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 tracking-wider"
          style={{ fontFamily: 'serif', color: '#2d2a26' }}
        >
          潜心打磨
          <br />
          <span className="text-[#6b8c5c]">水到渠成</span>
        </motion.h1>
        
        {/* 副标题 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-[#6b665e] mb-4 max-w-2xl mx-auto leading-relaxed"
        >
          {t('hero.description')}
        </motion.p>
        
        {/* 理念 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm text-[#a39e96] mb-12 italic"
        >
          "不争不抢，把石头投入水中，看涟漪自然散开"
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            onClick={() => setShowAIGuide(true)}
            className="bg-[#c45c48] hover:bg-[#a34432] text-white px-8 py-6 text-base rounded-full"
            style={{ boxShadow: wavemeShadows.lg }}
          >
            <Wand2 className="w-5 h-5 mr-2" />
            {t('hero.cta.start')}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => onNavigate('templates')}
            className="px-8 py-6 text-base rounded-full border-[#d4cfc7] hover:bg-[#f5f3f0] text-[#4a453f]"
          >
            <Palette className="w-5 h-5 mr-2" />
            {t('hero.cta.browse')}
          </Button>
        </motion.div>
        
        {/* 统计数据 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: '50,000+', label: '已创作网站' },
            { value: '15+', label: '水墨风格模板' },
            { value: '99%', label: '用户满意度' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-light text-[#2d2a26]">{stat.value}</div>
              <div className="text-xs text-[#a39e96] mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* 滚动提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-[#d4cfc7] rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-[#a39e96] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// 理念 Section
const PhilosophySection = () => {
  const philosophies = [
    {
      icon: <Droplets className="w-8 h-8" />,
      title: '潜心打磨',
      description: '像水一样，不争不抢，专注于自我修炼。在 Waveme，你可以抛开外界干扰，专注于打磨自己的作品。',
      color: '#6b8c5c',
    },
    {
      icon: <Waves className="w-8 h-8" />,
      title: '水到渠成',
      description: '当作品足够优秀，机会自然会找上门来。不需要海量投递，让工作主动找到你。',
      color: '#4a7c8c',
    },
    {
      icon: <Wind className="w-8 h-8" />,
      title: '上善若水',
      description: '水的智慧在于适应与包容。Waveme 适应各种展示需求，从个人求职到项目推介。',
      color: '#8c9ca4',
    },
    {
      icon: <Mountain className="w-8 h-8" />,
      title: '以柔克刚',
      description: '柔和的设计背后，是强大的功能支撑。简洁的界面，专业的展示效果。',
      color: '#b8916c',
    },
  ];
  
  return (
    <section className="py-32 bg-[#f5f3f0]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1 bg-[#e8e4df] text-[#6b665e] rounded-full text-sm mb-6">
            品牌理念
          </span>
          <h2 
            className="text-4xl md:text-5xl font-light mb-6"
            style={{ fontFamily: 'serif', color: '#2d2a26' }}
          >
            上善若水
          </h2>
          <p className="text-[#6b665e] max-w-xl mx-auto leading-relaxed">
            最崇高的善就像水一样。水善于滋养万物而不与万物相争，
            处众人之所恶，故几于道。
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {philosophies.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-[#faf9f7] rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-medium mb-3" style={{ color: '#2d2a26' }}>
                  {item.title}
                </h3>
                <p className="text-sm text-[#6b665e] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 模板展示 Section
const TemplatesSection = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const { t } = useI18n();
  const [hoveredTemplate, setHoveredTemplate] = useState<number | null>(null);
  
  const templates = [
    {
      name: '水墨山水',
      description: '淡雅水墨风格，如山水画卷',
      style: '传统',
      color: '#6b665e',
      bgImage: 'linear-gradient(135deg, #f5f3f0 0%, #e8e4df 50%, #d4cfc7 100%)',
    },
    {
      name: '竹韵清风',
      description: '竹青配色，清新自然',
      style: '自然',
      color: '#6b8c5c',
      bgImage: 'linear-gradient(135deg, #f5f3f0 0%, #e8f0e8 50%, #d4e0d4 100%)',
    },
    {
      name: '朱砂印记',
      description: '朱砂点缀，庄重典雅',
      style: '典雅',
      color: '#c45c48',
      bgImage: 'linear-gradient(135deg, #faf9f7 0%, #f5ebe8 50%, #f0ddd8 100%)',
    },
    {
      name: 'Pixel Art',
      description: '像素艺术风格，复古游戏感',
      style: '创意',
      color: '#4a7c8c',
      bgImage: 'linear-gradient(135deg, #f0f4f8 0%, #e0e8f0 50%, #d0e0f0 100%)',
      hasAnimation: true,
    },
    {
      name: '手绘涂鸦',
      description: '轻松活泼，展现个性',
      style: '创意',
      color: '#d4a574',
      bgImage: 'linear-gradient(135deg, #faf8f5 0%, #f5f0e8 50%, #f0e8d8 100%)',
      hasAnimation: true,
    },
    {
      name: '石青雅韵',
      description: '石青配色，沉稳大气',
      style: '商务',
      color: '#4a7c8c',
      bgImage: 'linear-gradient(135deg, #f5f8fa 0%, #e8f0f5 50%, #d8e8f0 100%)',
    },
  ];
  
  return (
    <section className="py-32 bg-[#faf9f7]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-[#e8e4df] text-[#6b665e] rounded-full text-sm mb-6">
            {templates.length}+ 精选模板
          </span>
          <h2 
            className="text-4xl md:text-5xl font-light mb-6"
            style={{ fontFamily: 'serif', color: '#2d2a26' }}
          >
            找到属于你的风格
          </h2>
          <p className="text-[#6b665e] max-w-xl mx-auto">
            水墨、竹青、朱砂... 每一款都如国画般淡雅自然
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredTemplate(index)}
              onMouseLeave={() => setHoveredTemplate(null)}
              onClick={() => onNavigate('templates')}
              className="group cursor-pointer"
            >
              <div 
                className="relative aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-500"
                style={{ 
                  background: template.bgImage,
                  boxShadow: hoveredTemplate === index ? wavemeShadows.xl : wavemeShadows.sm,
                }}
              >
                {/* 模板预览内容 */}
                <div className="absolute inset-0 p-6 flex flex-col">
                  {/* 模拟浏览器头部 */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-[#d4cfc7]" />
                    <div className="w-3 h-3 rounded-full bg-[#d4cfc7]" />
                    <div className="w-3 h-3 rounded-full bg-[#d4cfc7]" />
                    <div className="flex-1 h-6 bg-white/50 rounded-md ml-2" />
                  </div>
                  
                  {/* 模拟内容 */}
                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-2/3 bg-white/60 rounded" />
                    <div className="h-3 w-1/2 bg-white/40 rounded" />
                    <div className="h-3 w-3/4 bg-white/40 rounded" />
                    <div className="flex gap-2 mt-4">
                      <div className="h-8 w-20 rounded-full" style={{ backgroundColor: `${template.color}30` }} />
                      <div className="h-8 w-20 rounded-full" style={{ backgroundColor: `${template.color}20` }} />
                    </div>
                  </div>
                </div>
                
                {/* Hover 遮罩 */}
                <div className={`absolute inset-0 bg-[#2d2a26]/60 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredTemplate === index ? 'opacity-100' : 'opacity-0'
                }`}>
                  <span className="text-white text-sm flex items-center gap-2">
                    预览模板 <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
                
                {/* 动画标识 */}
                {template.hasAnimation && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-[#c45c48] text-white text-xs rounded-full">
                    动画
                  </div>
                )}
              </div>
              
              {/* 模板信息 */}
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-[#2d2a26]">{template.name}</h3>
                  <span 
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${template.color}15`, color: template.color }}
                  >
                    {template.style}
                  </span>
                </div>
                <p className="text-sm text-[#a39e96]">{template.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button
            onClick={() => onNavigate('templates')}
            variant="outline"
            className="border-[#d4cfc7] hover:bg-[#f5f3f0] text-[#4a453f] rounded-full px-8"
          >
            查看全部模板 <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

// 隐私保护 Section
const PrivacySection = () => {
  const { t } = useI18n();
  
  return (
    <section className="py-32 bg-[#2d2a26] text-white relative overflow-hidden">
      {/* 水墨纹理背景 */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm mb-6">
            <Shield className="w-4 h-4" />
            <span>隐私保护</span>
          </div>
          <h2 
            className="text-4xl md:text-5xl font-light mb-6"
            style={{ fontFamily: 'serif' }}
          >
            你的简历属于你
            <br />
            <span className="text-[#c45c48]">不属于 Waveme</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            我们只帮你展示，不帮你收集
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: <Lock className="w-6 h-6" />, title: '最小化收集', desc: '只收集必要信息' },
            { icon: <Eye className="w-6 h-6" />, title: '去标识化', desc: 'IP解析后即丢弃' },
            { icon: <Globe className="w-6 h-6" />, title: '端到端加密', desc: 'TLS传输加密' },
            { icon: <Shield className="w-6 h-6" />, title: '一键删除', desc: '随时清除数据' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4 text-[#c45c48]">
                {item.icon}
              </div>
              <h3 className="font-medium mb-2">{item.title}</h3>
              <p className="text-sm text-white/50">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 用户评价 Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      content: 'Waveme 让我可以专注于打磨作品本身，而不是焦虑地海投简历。当我的网站做好后，机会自然就来了。',
      author: '李明远',
      title: '独立开发者',
      avatar: '李',
    },
    {
      content: '像水一样，不争不抢，但自有力量。Waveme 的设计理念让我找到了内心的平静。',
      author: '张雨晴',
      title: 'UI 设计师',
      avatar: '张',
    },
    {
      content: '我们团队用 Waveme 做项目推介，比 PPT 更灵活，比传统网站更优雅。',
      author: '王浩然',
      title: '创业公司 CEO',
      avatar: '王',
    },
  ];
  
  return (
    <section className="py-32 bg-[#f5f3f0]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-[#e8e4df] text-[#6b665e] rounded-full text-sm mb-6">
            用户评价
          </span>
          <h2 
            className="text-4xl md:text-5xl font-light"
            style={{ fontFamily: 'serif', color: '#2d2a26' }}
          >
            他们都在用 Waveme
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#faf9f7] rounded-2xl p-8 shadow-sm"
            >
              <Quote className="w-8 h-8 text-[#d4cfc7] mb-4" />
              <p className="text-[#4a453f] leading-relaxed mb-6">
                "{item.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#e8e4df] rounded-full flex items-center justify-center text-[#6b665e] font-medium">
                  {item.avatar}
                </div>
                <div>
                  <div className="font-medium text-[#2d2a26]">{item.author}</div>
                  <div className="text-sm text-[#a39e96]">{item.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <section className="py-32 bg-[#faf9f7] relative overflow-hidden">
      {/* 水波纹装饰 */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <div className="w-[800px] h-[800px] rounded-full border border-[#6b8c5c]" />
        <div className="absolute w-[600px] h-[600px] rounded-full border border-[#6b8c5c]" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-[#6b8c5c]" />
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 
            className="text-4xl md:text-5xl font-light mb-6"
            style={{ fontFamily: 'serif', color: '#2d2a26' }}
          >
            准备好开始你的创作了吗？
          </h2>
          <p className="text-[#6b665e] mb-10 max-w-xl mx-auto">
            抛下焦虑，潜心打磨。让作品如水般自然流淌，机会自会水到渠成。
          </p>
          <Button
            size="lg"
            onClick={() => onNavigate('upload')}
            className="bg-[#c45c48] hover:bg-[#a34432] text-white px-10 py-6 text-base rounded-full"
            style={{ boxShadow: wavemeShadows.lg }}
          >
            <Droplets className="w-5 h-5 mr-2" />
            开始创作
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

// Footer
const Footer = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const { t } = useI18n();
  
  return (
    <footer className="py-16 bg-[#2d2a26] text-white/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="w-6 h-6 text-[#6b8c5c]" />
              <span className="text-xl font-medium text-white">waveme</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              上善若水，潜心打磨，水到渠成。
            </p>
            <p className="text-xs text-white/40">
              {t('footer.copyright')}
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="text-white font-medium mb-4">{t('footer.product')}</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('templates')} className="hover:text-white transition-colors">{t('nav.templates')}</button></li>
              <li><button onClick={() => onNavigate('components')} className="hover:text-white transition-colors">{t('nav.components')}</button></li>
              <li><button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors">{t('nav.pricing')}</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">{t('nav.faq')}</button></li>
              <li><a href="mailto:support@waveme.app" className="hover:text-white transition-colors">support@waveme.app</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">{t('privacy.title')}</button></li>
              <li><button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">服务条款</button></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-xs">
          <span>{t('footer.madeWith')}</span>
        </div>
      </div>
    </footer>
  );
};

// 主组件
export function WavemeInkLanding({ onNavigate }: WavemeInkLandingProps) {
  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <Navbar onNavigate={onNavigate} currentPage="home" />
      <HeroSection onNavigate={onNavigate} />
      <PhilosophySection />
      <TemplatesSection onNavigate={onNavigate} />
      <PrivacySection />
      <TestimonialsSection />
      <CTASection onNavigate={onNavigate} />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
