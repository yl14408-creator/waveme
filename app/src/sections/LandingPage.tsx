import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Waves, 
  Upload, 
  Sparkles, 
  BarChart3, 
  Globe, 
  Zap,
  ArrowRight,
  CheckCircle2,
  FileText,
  Eye,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 涟漪动画效果
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

    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      speed: number;
    }

    const ripples: Ripple[] = [];

    const createRipple = () => {
      ripples.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 0,
        maxRadius: 100 + Math.random() * 150,
        opacity: 0.3 + Math.random() * 0.3,
        speed: 0.5 + Math.random() * 1,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 创建新涟漪
      if (Math.random() < 0.03) createRipple();

      ripples.forEach((ripple, index) => {
        ripple.radius += ripple.speed;
        ripple.opacity -= 0.003;

        if (ripple.opacity <= 0) {
          ripples.splice(index, 1);
          return;
        }

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6, 182, 212, ${ripple.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener('resize', resize);
  }, []);

  const features = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: '一键上传',
      description: '上传你的简历PDF，AI自动解析提取关键信息',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: '智能生成',
      description: '自动识别姓名、经历、技能，生成专业个人网站',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: '数据洞察',
      description: '追踪访问量、用户来源、停留时间，了解求职效果',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: '即时部署',
      description: '一键生成可部署的HTML文件，轻松分享你的个人品牌',
    },
  ];

  const steps = [
    {
      number: '01',
      icon: <FileText className="w-8 h-8" />,
      title: '上传简历',
      description: '拖拽或选择你的PDF简历文件，支持自动解析',
    },
    {
      number: '02',
      icon: <Sparkles className="w-8 h-8" />,
      title: '选择模板',
      description: '从多种专业模板中选择最适合你的风格',
    },
    {
      number: '03',
      icon: <Eye className="w-8 h-8" />,
      title: '预览编辑',
      description: '实时预览生成的网站，微调内容和样式',
    },
    {
      number: '04',
      icon: <TrendingUp className="w-8 h-8" />,
      title: '追踪数据',
      description: '发布后开始收集访问数据，洞察求职效果',
    },
  ];

  const templates = [
    {
      name: '极简风格',
      description: '干净简洁，突出内容',
      color: 'from-gray-100 to-gray-200',
      textColor: 'text-gray-800',
    },
    {
      name: '商务专业',
      description: '经典稳重，专业可靠',
      color: 'from-blue-900 to-blue-800',
      textColor: 'text-white',
    },
    {
      name: '技术现代',
      description: '科技感强，动态丰富',
      color: 'from-slate-900 to-slate-800',
      textColor: 'text-cyan-400',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/50 via-white/80 to-white pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 rounded-full text-cyan-600 text-sm font-medium mb-8">
              <Waves className="w-4 h-4" />
              <span>投石问路，泛起涟漪</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            让简历变成
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              个人网站
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto"
          >
            上传简历，一键生成专业个人网站。追踪访问数据，了解HR在哪里停留最久，优化你的求职策略。
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-sm text-gray-500 mb-10"
          >
            解决投简历没回应，却不知道问题出在哪的痛点
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={() => onNavigate('upload')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 transition-all"
            >
              <Upload className="w-5 h-5 mr-2" />
              上传简历，开始创建
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('templates')}
              className="px-8 py-6 text-lg rounded-xl border-2"
            >
              <Eye className="w-5 h-5 mr-2" />
              浏览模板
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: '10,000+', label: '已生成网站' },
              { value: '3', label: '专业模板' },
              { value: '98%', label: '用户满意度' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
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

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              为什么选择 waveme？
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              不只是生成网站，更是你的求职数据分析助手
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              简单四步，生成你的个人网站
            </h2>
            <p className="text-lg text-gray-600">
              无需编程，无需设计，几分钟即可完成
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-gray-100 absolute -top-4 -left-2">
                  {step.number}
                </div>
                <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section id="templates" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              多种模板，总有一款适合你
            </h2>
            <p className="text-lg text-gray-600">
              针对不同行业和岗位，精心设计的专业模板
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`h-80 rounded-2xl bg-gradient-to-br ${template.color} p-8 flex flex-col justify-between cursor-pointer hover:scale-105 transition-transform shadow-lg`}>
                  <div>
                    <h3 className={`text-2xl font-bold ${template.textColor} mb-2`}>
                      {template.name}
                    </h3>
                    <p className={`${template.textColor} opacity-80`}>
                      {template.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-5 h-5 ${template.textColor}`} />
                    <span className={`text-sm ${template.textColor} opacity-80`}>响应式设计</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 rounded-full text-cyan-600 text-sm font-medium mb-6">
                <BarChart3 className="w-4 h-4" />
                <span>数据洞察</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                了解谁在看你的网站，
                <br />
                他们在关注什么
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                就像在大海里投下一颗石头，泛起涟漪。你可以看到：
              </p>
              <ul className="space-y-4">
                {[
                  '总访问量和独立访客数',
                  '用户来自哪里（LinkedIn、邮件、直接访问）',
                  '在每一段经历上停留了多久',
                  '哪些技能最吸引HR关注',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-semibold">访问数据概览</h3>
                <span className="text-sm text-slate-400">最近30天</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: '总访问量', value: '1,234' },
                  { label: '独立访客', value: '892' },
                  { label: '平均停留', value: '2:34' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                    <div className="text-xs text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">工作经历</span>
                    <span className="text-cyan-400">45%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-[45%] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">技能列表</span>
                    <span className="text-cyan-400">30%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-[30%] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">项目展示</span>
                    <span className="text-cyan-400">25%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-[25%] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-cyan-500 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            准备好创建你的个人网站了吗？
          </h2>
          <p className="text-xl text-cyan-100 mb-10">
            投下你的简历，让涟漪开始扩散
          </p>
          <Button
            size="lg"
            onClick={() => onNavigate('upload')}
            className="bg-white text-cyan-600 hover:bg-cyan-50 px-10 py-6 text-lg rounded-xl shadow-xl"
          >
            <Zap className="w-5 h-5 mr-2" />
            免费开始创建
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Waves className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">waveme</span>
            </div>
            <div className="text-sm">
              © 2026 Waveme. 让每一份简历都能泛起涟漪。
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
