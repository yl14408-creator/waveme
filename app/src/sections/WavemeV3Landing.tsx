import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Sparkles, 
  BarChart3, 
  Palette,
  Check,
  Play,
  Star,
  Quote,
  Wand2,
  Code2,
  Paintbrush,
  Briefcase,
  GraduationCap,
  Cpu,
  Gamepad2,
  Eye,
  Users,
  Clock,
  X,
  Shield,
  Lock,
  Trash2,
  Globe,
  Droplets,
  Waves,
  Wind,
  FileUp,
  ChevronDown,
  TrendingUp,
  MousePointer
} from 'lucide-react';
import { templatesV2 } from '@/services/templates-v2';
import { useI18n } from '@/i18n/index.tsx';

interface WavemeV3LandingProps {
  onNavigate: (page: string) => void;
}

// 柔和的水墨晕染背景 - 使用stone色系
const InkBackground = () => {
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
    
    const inks: { x: number; y: number; vx: number; vy: number; radius: number; opacity: number; life: number }[] = [];
    
    const createInk = () => {
      if (inks.length < 8) {
        inks.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          radius: Math.random() * 250 + 150,
          opacity: Math.random() * 0.015 + 0.005,
          life: 1,
        });
      }
    };
    
    const animate = () => {
      ctx.fillStyle = 'rgba(250, 248, 245, 0.008)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      if (Math.random() < 0.01) createInk();
      
      inks.forEach((ink, i) => {
        ink.x += ink.vx;
        ink.y += ink.vy;
        ink.life -= 0.0008;
        
        if (ink.x < -ink.radius) ink.x = canvas.width + ink.radius;
        if (ink.x > canvas.width + ink.radius) ink.x = -ink.radius;
        if (ink.y < -ink.radius) ink.y = canvas.height + ink.radius;
        if (ink.y > canvas.height + ink.radius) ink.y = -ink.radius;
        
        // 使用stone色系 - 温暖的灰褐色
        const gradient = ctx.createRadialGradient(
          ink.x, ink.y, 0,
          ink.x, ink.y, ink.radius
        );
        gradient.addColorStop(0, `rgba(168, 162, 158, ${ink.opacity * ink.life})`);
        gradient.addColorStop(0.5, `rgba(180, 174, 170, ${ink.opacity * 0.5 * ink.life})`);
        gradient.addColorStop(1, 'rgba(200, 194, 190, 0)');
        
        ctx.beginPath();
        ctx.arc(ink.x, ink.y, ink.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        if (ink.life <= 0) {
          inks.splice(i, 1);
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    for (let i = 0; i < 4; i++) createInk();
    
    return () => window.removeEventListener('resize', resize);
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
};

// 滚动指示器
const ScrollIndicator = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <motion.button
    onClick={onClick}
    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.5 }}
  >
    <span className="text-xs">{label}</span>
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <ChevronDown className="w-5 h-5" />
    </motion.div>
  </motion.button>
);

// AI 引导弹窗组件
const AIGuideModal = ({ isOpen, onClose, onStart }: { isOpen: boolean; onClose: () => void; onStart: () => void }) => {
  const { t } = useI18n();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const questions = [
    {
      id: 'purpose',
      question: t('aiGuide.question.purpose'),
      options: [
        { label: t('aiGuide.option.job'), value: 'job', icon: <Briefcase className="w-5 h-5" /> },
        { label: t('aiGuide.option.portfolio'), value: 'portfolio', icon: <Paintbrush className="w-5 h-5" /> },
        { label: t('aiGuide.option.tech'), value: 'tech', icon: <Code2 className="w-5 h-5" /> },
        { label: t('aiGuide.option.academic'), value: 'academic', icon: <GraduationCap className="w-5 h-5" /> },
      ],
    },
    {
      id: 'industry',
      question: t('aiGuide.question.industry'),
      options: [
        { label: t('aiGuide.option.techIndustry'), value: 'tech', icon: <Cpu className="w-5 h-5" /> },
        { label: t('aiGuide.option.design'), value: 'design', icon: <Palette className="w-5 h-5" /> },
        { label: t('aiGuide.option.business'), value: 'business', icon: <Briefcase className="w-5 h-5" /> },
        { label: t('aiGuide.option.other'), value: 'other', icon: <Sparkles className="w-5 h-5" /> },
      ],
    },
    {
      id: 'style',
      question: t('aiGuide.question.style'),
      options: [
        { label: t('aiGuide.option.minimal'), value: 'minimal', icon: <Wind className="w-5 h-5" /> },
        { label: t('aiGuide.option.techStyle'), value: 'tech', icon: <Code2 className="w-5 h-5" /> },
        { label: t('aiGuide.option.playful'), value: 'playful', icon: <Gamepad2 className="w-5 h-5" /> },
        { label: t('aiGuide.option.professional'), value: 'professional', icon: <Briefcase className="w-5 h-5" /> },
        { label: t('aiGuide.option.creative'), value: 'creative', icon: <Paintbrush className="w-5 h-5" /> },
      ],
    },
  ];

  const handleSelect = (value: string) => {
    setAnswers({ ...answers, [questions[step].id]: value });
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onStart();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-stone-200"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <motion.div 
                className="w-10 h-10 bg-gradient-to-br from-stone-600 to-stone-800 rounded-xl flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Wand2 className="w-5 h-5 text-white" />
              </motion.div>
              <span className="font-semibold text-stone-800">{t('aiGuide.title')}</span>
            </div>
            <motion.button 
              onClick={onClose} 
              className="p-2 hover:bg-stone-100 rounded-lg"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5 text-stone-600" />
            </motion.button>
          </div>
          
          <div className="mb-2">
            <div className="flex gap-1 mb-6">
              {questions.map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`h-1 flex-1 rounded-full origin-left ${i <= step ? 'bg-stone-600' : 'bg-stone-200'}`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.h3 
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-xl font-bold mb-6 text-stone-800"
            >
              {questions[step].question}
            </motion.h3>
          </AnimatePresence>
          
          <div className="grid grid-cols-2 gap-3">
            <AnimatePresence mode="wait">
              {questions[step].options.map((option, index) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className="flex flex-col items-center gap-2 p-4 border-2 border-stone-100 rounded-xl hover:border-stone-400 hover:bg-stone-50 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.span 
                    className="text-stone-600"
                    whileHover={{ rotate: 10 }}
                  >
                    {option.icon}
                  </motion.span>
                  <span className="text-sm font-medium text-stone-700">{option.label}</span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// 模板展示 - 按分类 - 美化版
const TemplateShowcase = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const { t } = useI18n();
  const categories = [
    { id: 'tech', name: t('templates.category.tech'), icon: <Code2 className="w-5 h-5" />, gradient: 'from-stone-600 to-stone-700' },
    { id: 'design', name: t('templates.category.design'), icon: <Paintbrush className="w-5 h-5" />, gradient: 'from-stone-500 to-stone-600' },
    { id: 'creative', name: t('templates.category.creative'), icon: <Sparkles className="w-5 h-5" />, gradient: 'from-stone-500 to-stone-600' },
    { id: 'business', name: t('templates.category.business'), icon: <Briefcase className="w-5 h-5" />, gradient: 'from-stone-700 to-stone-800' },
    { id: 'academic', name: t('templates.category.academic'), icon: <GraduationCap className="w-5 h-5" />, gradient: 'from-stone-500 to-stone-600' },
  ];

  const [activeCategory, setActiveCategory] = useState('tech');
  
  const filteredTemplates = templatesV2.filter(t => t.category === activeCategory);

  return (
    <div className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <motion.span 
            className="inline-block px-4 py-1 bg-stone-100 text-stone-600 rounded-full text-sm font-medium mb-4 border border-stone-200"
            whileHover={{ scale: 1.05 }}
          >
            {t('templateShowcase.badge')}
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-stone-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('templates.title')}
          </motion.h2>
          <motion.p 
            className="text-xl text-stone-500 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t('templates.subtitle')}
          </motion.p>
        </motion.div>

        {/* 分类标签 */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((cat, index) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                activeCategory === cat.id
                  ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg`
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.icon}
              {cat.name}
            </motion.button>
          ))}
        </motion.div>

        {/* 模板网格 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onNavigate('templates')}
                className="group cursor-pointer"
                whileHover={{ y: -8 }}
              >
                <motion.div 
                  className="relative overflow-hidden rounded-2xl bg-white aspect-[4/3] shadow-md border border-stone-200"
                  whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
                  transition={{ duration: 0.3 }}
                >
                  {/* 背景渐变 */}
                  <motion.div 
                    className="absolute inset-0"
                    style={{ 
                      background: `linear-gradient(135deg, ${template.colors.primary}08, ${template.colors.secondary}08)` 
                    }}
                    whileHover={{ opacity: 1.5 }}
                  />
                  
                  {/* 网站预览样式 - 更真实的展示 */}
                  <div className="absolute inset-4 bg-white rounded-lg shadow-sm overflow-hidden border border-stone-100">
                    {/* 浏览器头部 */}
                    <div className="h-6 bg-stone-100 flex items-center px-2 gap-1">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-stone-300" />
                        <div className="w-2 h-2 rounded-full bg-stone-300" />
                        <div className="w-2 h-2 rounded-full bg-stone-300" />
                      </div>
                      <div className="flex-1 mx-2">
                        <div className="h-3 bg-stone-200 rounded text-[6px] flex items-center justify-center text-stone-400">
                          {template.name.toLowerCase().replace(/\s+/g, '')}.com
                        </div>
                      </div>
                    </div>
                    {/* 网站内容预览 */}
                    <div className="p-2 space-y-1.5">
                      <div 
                        className="h-6 rounded flex items-center px-2 gap-2"
                        style={{ backgroundColor: `${template.colors.primary}08` }}
                      >
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: template.colors.primary }}
                        />
                        <div className="flex-1 space-y-0.5">
                          <div 
                            className="h-1.5 w-10 rounded"
                            style={{ backgroundColor: template.colors.primary }}
                          />
                          <div 
                            className="h-1 w-6 rounded"
                            style={{ backgroundColor: `${template.colors.secondary}40` }}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="col-span-2 space-y-1">
                          <div className="h-1.5 w-full rounded bg-stone-200" />
                          <div className="h-1.5 w-4/5 rounded bg-stone-200" />
                        </div>
                        <div 
                          className="h-8 rounded"
                          style={{ backgroundColor: `${template.colors.secondary}10` }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {[1,2,3].map(i => (
                          <div 
                            key={i}
                            className="h-3 w-6 rounded"
                            style={{ backgroundColor: `${template.colors.accent || template.colors.primary}15` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/20 to-transparent flex items-end justify-center pb-6"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="px-6 py-3 bg-white rounded-full text-sm font-medium text-stone-800 shadow-lg"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ scale: 1.05 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {t('templateShowcase.preview')}
                    </motion.div>
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-stone-800 group-hover:text-stone-600 transition-colors">{template.name}</h3>
                  <p className="text-sm text-stone-500">{template.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={() => onNavigate('templates')}
              className="bg-stone-700 hover:bg-stone-800 text-white"
            >
              {t('templateShowcase.viewAll')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// 隐私保护展示
const PrivacySection = () => {
  const { t } = useI18n();
  const privacyFeatures = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('privacy.minimal'),
      description: t('privacy.minimalDesc'),
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: t('privacy.anonymize'),
      description: t('privacy.anonymizeDesc'),
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: t('privacy.encryption'),
      description: t('privacy.encryptionDesc'),
    },
    {
      icon: <Trash2 className="w-6 h-6" />,
      title: t('privacy.delete'),
      description: t('privacy.deleteDesc'),
    },
  ];

  return (
    <div className="py-24 bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 text-stone-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-block px-4 py-1 bg-stone-700/50 text-stone-300 rounded-full text-sm font-medium mb-4 border border-stone-600"
            whileHover={{ scale: 1.05 }}
          >
            <Lock className="w-4 h-4 inline mr-2" />
            {t('privacy.title')}
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('privacy.slogan')}
          </motion.h2>
          <motion.p 
            className="text-xl text-stone-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t('privacy.promise')}
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {privacyFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-stone-700 hover:bg-white/10 hover:border-stone-600 transition-all cursor-pointer"
            >
              <motion.div 
                className="w-12 h-12 bg-stone-700/50 rounded-xl flex items-center justify-center mb-4"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-stone-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 数据看板预览
const DashboardPreview = () => {
  const { t } = useI18n();
  const stats = [
    { label: t('dashboard.stats.totalViews'), value: '12,847', change: '+23.5%', icon: <Eye className="w-5 h-5" /> },
    { label: t('dashboard.stats.uniqueVisitors'), value: '8,234', change: '+18.2%', icon: <Users className="w-5 h-5" /> },
    { label: t('dashboard.stats.avgTime'), value: '3:42', change: '+12.8%', icon: <Clock className="w-5 h-5" /> },
  ];

  return (
    <div className="py-24 bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 text-stone-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span 
              className="inline-block px-4 py-1 bg-stone-700/50 text-stone-300 rounded-full text-sm font-medium mb-6 border border-stone-600"
              whileHover={{ scale: 1.05 }}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              {t('dashboardPreview.subtitle')}
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t('dashboardPreview.title')}
            </motion.h2>
            <motion.p 
              className="text-xl text-stone-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {t('dashboardPreview.description')}
            </motion.p>
            
            <div className="space-y-4">
              {[
                t('dashboard.features.realtime'),
                t('dashboard.features.source'),
                t('dashboard.features.heatmap'),
                t('dashboard.features.geo'),
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center gap-3 list-none"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <motion.div 
                    className="w-6 h-6 bg-stone-700/50 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <Check className="w-4 h-4 text-stone-300" />
                  </motion.div>
                  <span className="text-stone-300">{item}</span>
                </motion.li>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <motion.div 
              className="relative bg-stone-800/50 rounded-3xl p-6 border border-stone-700 backdrop-blur"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">{t('dashboardPreview.subtitle')}</h3>
                <span className="text-sm text-stone-400">{t('dashboardPreview.days')}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {stats.map((stat, i) => (
                  <motion.div 
                    key={i} 
                    className="text-center p-4 bg-stone-700/50 rounded-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.4 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                  >
                    <motion.div 
                      className="text-2xl font-bold text-stone-300"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.5, type: 'spring', stiffness: 200 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs text-stone-400">{stat.label}</div>
                    <motion.div 
                      className="text-xs text-stone-500 mt-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.6 }}
                    >
                      {stat.change}
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-3">
                {[
                  { label: t('dashboardPreview.workExperience'), value: 48 },
                  { label: t('dashboardPreview.components'), value: 32 },
                  { label: t('dashboardPreview.skills'), value: 20 },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.6 }}
                  >
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-stone-400">{item.label}</span>
                      <span className="text-stone-300">{item.value}%</span>
                    </div>
                    <div className="h-2 bg-stone-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-stone-500 to-stone-400 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// 用户评价
const Testimonials = () => {
  const { t, language } = useI18n();
  const testimonials = language === 'zh' ? [
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
      content: '作为一个设计师，我对作品集的要求很高。Waveme 的模板质量超出预期，而且自定义功能非常强大。',
      avatar: 'Z',
    },
    {
      name: '王浩然',
      role: '产品经理',
      company: '阿里巴巴',
      content: '投简历总是石沉大海，有了 Waveme 后，我可以追踪谁看了我的网站，在哪个模块停留最久。',
      avatar: 'W',
    },
  ] : [
    {
      name: 'Alex Chen',
      role: 'Senior Frontend Engineer',
      company: 'Google',
      content: 'Waveme helped me create a professional tech blog. The HR praised my personal website during interviews. The analytics feature shows which projects get the most attention.',
      avatar: 'A',
    },
    {
      name: 'Sarah Liu',
      role: 'UI/UX Designer',
      company: 'Figma',
      content: 'As a designer, I have high standards for portfolios. Waveme\'s templates exceeded my expectations, and the customization features are very powerful.',
      avatar: 'S',
    },
    {
      name: 'Michael Wang',
      role: 'Product Manager',
      company: 'Meta',
      content: 'Resumes used to disappear into a black hole. With Waveme, I can track who views my site and which sections they spend the most time on.',
      avatar: 'M',
    },
  ];

  return (
    <div className="py-24 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-block px-4 py-1 bg-stone-100 text-stone-600 rounded-full text-sm font-medium mb-4 border border-stone-200"
            whileHover={{ scale: 1.05 }}
          >
            <Star className="w-4 h-4 inline mr-1" />
            {t('testimonials.subtitle')}
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-stone-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('testimonials.title')}
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border border-stone-100 cursor-pointer"
            >
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Quote className="w-10 h-10 text-stone-200 mb-4" />
              </motion.div>
              <p className="text-stone-600 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-stone-600 to-stone-800 rounded-full flex items-center justify-center text-white font-bold"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  {testimonial.avatar}
                </motion.div>
                <div>
                  <div className="font-semibold text-stone-800">{testimonial.name}</div>
                  <div className="text-sm text-stone-500">
                    {testimonial.role} · {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 主组件
export function WavemeV3Landing({ onNavigate }: WavemeV3LandingProps) {
  const { t } = useI18n();
  const [showAIGuide, setShowAIGuide] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <InkBackground />
        
        {/* 装饰性水墨圆 - 使用温暖的stone色系 */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-stone-200/15 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.2, 0.15]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-stone-300/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20"
          style={{ opacity, scale }}
        >
          {/* Slogan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-stone-200 mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Droplets className="w-4 h-4 text-stone-500" />
            </motion.div>
            <span className="text-sm font-medium text-stone-600">{t('common.slogan')}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-stone-800 mb-6 leading-[1.1] tracking-tight"
          >
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {t('hero.title')}
            </motion.span>
            <br />
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-stone-600 via-stone-700 to-stone-800"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t('hero.subtitle')}
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-stone-500 mb-4 max-w-2xl mx-auto leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-stone-400 mb-10"
          >
            {t('hero.tagline')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={() => onNavigate('upload')}
                className="bg-stone-700 hover:bg-stone-800 text-white px-8 py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <FileUp className="w-5 h-5" />
                {t('hero.uploadResume')}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowAIGuide(true)}
                className="px-8 py-6 text-lg rounded-2xl border-2 border-stone-300 hover:bg-stone-100 text-stone-700 flex items-center gap-2"
              >
                <Wand2 className="w-5 h-5" />
                {t('hero.aiCreate')}
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="ghost"
                onClick={() => onNavigate('templates')}
                className="px-8 py-6 text-lg rounded-2xl text-stone-600 hover:text-stone-800 hover:bg-stone-100 flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                {t('hero.browseTemplates')}
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto"
          >
            {[
              { value: '50,000+', label: t('hero.stats.sites') },
              { value: '15+', label: t('hero.stats.templates') },
              { value: '99%', label: t('hero.stats.satisfaction') },
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -4 }}
              >
                <motion.div 
                  className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-stone-600 to-stone-800"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, type: 'spring', stiffness: 200 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-stone-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <ScrollIndicator onClick={scrollToContent} label={t('hero.scrollDown')} />
      </section>

      {/* AI Guide Modal */}
      <AIGuideModal 
        isOpen={showAIGuide} 
        onClose={() => setShowAIGuide(false)}
        onStart={() => {
          setShowAIGuide(false);
          onNavigate('upload');
        }}
      />

      {/* Template Showcase */}
      <TemplateShowcase onNavigate={onNavigate} />

      {/* Privacy Section */}
      <PrivacySection />

      {/* Dashboard Preview */}
      <DashboardPreview />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-stone-700 via-stone-800 to-stone-900 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-stone-100 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t('cta.title')}
            </motion.h2>
            <motion.p 
              className="text-xl text-stone-400 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {t('cta.subtitle')}
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  onClick={() => onNavigate('upload')}
                  className="bg-white text-stone-800 hover:bg-stone-100 px-10 py-6 text-lg rounded-2xl shadow-xl flex items-center gap-2"
                >
                  <FileUp className="w-5 h-5" />
                  {t('cta.start')}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('pricing')}
                  className="border-stone-600 text-stone-300 hover:bg-stone-800 px-10 py-6 text-lg rounded-2xl"
                >
                  {t('cta.pricing')}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-stone-950 text-stone-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <motion.div 
                className="flex items-center gap-2 mb-4"
                whileHover={{ x: 4 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-stone-600 to-stone-800 rounded-xl flex items-center justify-center">
                  <Waves className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-stone-100">waveme</span>
              </motion.div>
              <p className="text-sm mb-6">
                {t('footer.slogan')}<br />
                {t('footer.promise')}
              </p>
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-3">
                {[
                  { href: 'https://discord.gg/waveme', icon: 'discord', color: '#5865F2' },
                  { href: 'https://facebook.com/waveme', icon: 'facebook', color: '#1877F2' },
                  { href: 'https://linkedin.com/company/waveme', icon: 'linkedin', color: '#0A66C2' },
                  { href: 'https://x.com/waveme', icon: 'x', color: '#000000' },
                ].map((social, i) => (
                  <motion.a 
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center transition-all"
                    whileHover={{ scale: 1.1, backgroundColor: social.color }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      {social.icon === 'discord' && <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>}
                      {social.icon === 'facebook' && <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>}
                      {social.icon === 'linkedin' && <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>}
                      {social.icon === 'x' && <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>}
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-stone-100 font-semibold mb-4">{t('footer.product')}</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { id: 'templates', label: t('footer.templates') },
                  { id: 'components', label: t('footer.components') },
                  { id: 'pricing', label: t('footer.pricing') },
                  { id: 'upload', label: t('footer.startFree') },
                ].map((item) => (
                  <li key={item.id}>
                    <motion.button 
                      onClick={() => onNavigate(item.id)}
                      className="hover:text-white transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      {item.label}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-stone-100 font-semibold mb-4">{t('footer.support')}</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { id: 'faq', label: t('footer.faq') },
                  { href: 'mailto:support@waveme.app', label: t('footer.sendEmail') },
                  { id: 'auth', label: t('footer.login') },
                ].map((item, i) => (
                  <li key={i}>
                    {'href' in item ? (
                      <motion.a 
                        href={item.href}
                        className="hover:text-white transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        {item.label}
                      </motion.a>
                    ) : (
                      <motion.button 
                        onClick={() => onNavigate(item.id)}
                        className="hover:text-white transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        {item.label}
                      </motion.button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-stone-100 font-semibold mb-4">{t('footer.legal')}</h4>
              <ul className="space-y-2 text-sm">
                <li><motion.button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors" whileHover={{ x: 4 }}>{t('footer.terms')}</motion.button></li>
                <li><motion.button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors" whileHover={{ x: 4 }}>{t('footer.privacy')}</motion.button></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm">
              {t('footer.copyright')}
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <span className="text-xs">{t('footer.madeWith')}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
