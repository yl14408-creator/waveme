import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart3, 
  Users, 
  Clock, 
  Globe, 
  MousePointer,
  TrendingUp,
  TrendingDown,
  Download,
  Share2,
  Link,
  Waves,
  ArrowLeft,
  RefreshCw,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { analyticsService, type AnalyticsData } from '@/services/analytics';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

// 水墨风格的颜色
const INK_COLORS = {
  primary: '#57534e',
  secondary: '#78716c',
  accent: '#a8a29e',
  light: '#e7e5e4',
  chart: ['#57534e', '#78716c', '#a8a29e', '#d6d3d1'],
};

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 加载真实数据
  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange]);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getAnalytics(timeRange);
      setAnalyticsData(data);
    } catch (err) {
      setError('加载数据失败，请稍后重试');
      console.error('Failed to load analytics:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 水墨涟漪动画效果
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();

    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      speed: number;
    }

    const ripples: Ripple[] = [];
    let animationId: number;

    const createRipple = () => {
      ripples.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        radius: 0,
        maxRadius: 30 + Math.random() * 50,
        opacity: 0.3 + Math.random() * 0.2,
        speed: 0.3 + Math.random() * 0.5,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // 创建新涟漪（模拟访问）
      if (Math.random() < 0.03) createRipple();

      ripples.forEach((ripple, index) => {
        ripple.radius += ripple.speed;
        ripple.opacity -= 0.004;

        if (ripple.opacity <= 0) {
          ripples.splice(index, 1);
          return;
        }

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(120, 113, 108, ${ripple.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const stats = analyticsData ? [
    {
      title: '总访问量',
      value: analyticsData.totalViews.toLocaleString(),
      change: `+${analyticsData.viewsChange}%`,
      trend: 'up' as const,
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      title: '独立访客',
      value: analyticsData.uniqueVisitors.toLocaleString(),
      change: `+${analyticsData.visitorsChange}%`,
      trend: 'up' as const,
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: '平均停留',
      value: analyticsData.avgDwellTime,
      change: `+${analyticsData.dwellTimeChange}%`,
      trend: 'up' as const,
      icon: <Clock className="w-5 h-5" />,
    },
    {
      title: '跳出率',
      value: `${analyticsData.bounceRate}%`,
      change: `-${analyticsData.bounceRateChange}%`,
      trend: 'down' as const,
      icon: <MousePointer className="w-5 h-5" />,
    },
  ] : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 pt-20 flex items-center justify-center">
        <motion.div 
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <RefreshCw className="w-8 h-8 text-stone-400" />
          </motion.div>
          <p className="text-stone-500">加载数据中...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-stone-50 pt-20 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-stone-600 mb-4">{error}</p>
          <Button onClick={loadAnalyticsData} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            重试
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      {/* Header */}
      <motion.div 
        className="bg-white border-b border-stone-200 sticky top-16 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  onClick={() => onNavigate('editor')}
                  className="text-stone-600"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回编辑器
                </Button>
              </motion.div>
              <div>
                <h2 className="font-semibold text-stone-800">数据洞察</h2>
                <p className="text-sm text-stone-500">追踪你的个人网站访问情况</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" className="border-stone-300">
                  <Share2 className="w-4 h-4 mr-2" />
                  分享
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" className="border-stone-300">
                  <Download className="w-4 h-4 mr-2" />
                  导出报告
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Ripple Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <Card className="overflow-hidden border-stone-200">
            <CardContent className="p-0 relative">
              <div className="h-48 bg-gradient-to-br from-stone-800 to-stone-900 relative overflow-hidden">
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <motion.div 
                      className="flex items-center justify-center gap-3 mb-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <Waves className="w-8 h-8 text-stone-400" />
                      </motion.div>
                      <h3 className="text-2xl font-bold">实时访问涟漪</h3>
                    </motion.div>
                    <p className="text-stone-400">
                      每一个涟漪代表一次访问，就像你投下的石头在海面泛起的波纹
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <Card className="border-stone-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-stone-500 mb-1">{stat.title}</p>
                      <motion.p 
                        className="text-3xl font-bold text-stone-800"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.4, type: 'spring', stiffness: 200 }}
                      >
                        {stat.value}
                      </motion.p>
                      <div className="flex items-center gap-1 mt-2">
                        {stat.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-stone-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-stone-600" />
                        )}
                        <span className="text-sm text-stone-600">{stat.change}</span>
                        <span className="text-sm text-stone-400">vs 上周</span>
                      </div>
                    </div>
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-stone-600 to-stone-700 rounded-xl flex items-center justify-center text-white"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {stat.icon}
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Traffic Trend */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2"
          >
            <Card className="h-full border-stone-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2 text-stone-800">
                    <BarChart3 className="w-5 h-5 text-stone-600" />
                    访问趋势
                  </CardTitle>
                  <div className="flex gap-2">
                    {(['7d', '30d', '90d'] as const).map((range) => (
                      <motion.button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                          timeRange === range
                            ? 'bg-stone-200 text-stone-800'
                            : 'text-stone-500 hover:bg-stone-100'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {range === '7d' ? '7天' : range === '30d' ? '30天' : '90天'}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData?.dailyViews || []}>
                      <defs>
                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={INK_COLORS.primary} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={INK_COLORS.primary} stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={INK_COLORS.secondary} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={INK_COLORS.secondary} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={INK_COLORS.light} />
                      <XAxis dataKey="date" stroke={INK_COLORS.secondary} fontSize={12} />
                      <YAxis stroke={INK_COLORS.secondary} fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: `1px solid ${INK_COLORS.light}`,
                          borderRadius: '8px',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="views"
                        stroke={INK_COLORS.primary}
                        fillOpacity={1}
                        fill="url(#colorViews)"
                        strokeWidth={2}
                        name="访问量"
                      />
                      <Area
                        type="monotone"
                        dataKey="uniqueVisitors"
                        stroke={INK_COLORS.secondary}
                        fillOpacity={1}
                        fill="url(#colorVisitors)"
                        strokeWidth={2}
                        name="独立访客"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Traffic Sources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="h-full border-stone-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2 text-stone-800">
                  <Globe className="w-5 h-5 text-stone-600" />
                  流量来源
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analyticsData?.trafficSources || []}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {(analyticsData?.trafficSources || []).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={INK_COLORS.chart[index % INK_COLORS.chart.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {(analyticsData?.trafficSources || []).map((source, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.7 }}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: INK_COLORS.chart[index % INK_COLORS.chart.length] }}
                        />
                        <span className="text-sm text-stone-600">{source.name}</span>
                      </div>
                      <span className="text-sm font-medium text-stone-800">{source.value}%</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Section Dwell Time & Recent Visitors */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Section Dwell Time */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="border-stone-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2 text-stone-800">
                  <Clock className="w-5 h-5 text-stone-600" />
                  模块停留时间
                </CardTitle>
                <p className="text-sm text-stone-500">
                  了解访客在你的简历哪些部分停留最久
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(analyticsData?.sectionDwellTime || []).map((section, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.8 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-stone-700">
                          {section.section}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-stone-500">
                            {section.time}
                          </span>
                          <span className="text-sm font-medium text-stone-600">
                            {section.percentage}%
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${section.percentage}%` }}
                          transition={{ duration: 1, delay: 0.9 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full bg-gradient-to-r from-stone-600 to-stone-500 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  className="mt-6 p-4 bg-stone-100 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <h4 className="text-sm font-semibold text-stone-800 mb-2">
                    💡 洞察建议
                  </h4>
                  <p className="text-sm text-stone-600">
                    {analyticsData?.insight || '访客对你的工作经历最感兴趣。建议在此部分添加更多量化成果，并考虑将最重要的经历放在前面。'}
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Visitors */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="border-stone-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2 text-stone-800">
                  <Users className="w-5 h-5 text-stone-600" />
                  最近访客
                </CardTitle>
                <p className="text-sm text-stone-500">
                  实时更新的访客信息
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AnimatePresence>
                    {(analyticsData?.recentVisitors || []).map((visitor, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.1 + 0.9 }}
                        className="flex items-center justify-between p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <motion.div 
                            className="w-10 h-10 bg-gradient-to-br from-stone-600 to-stone-700 rounded-full flex items-center justify-center text-white text-sm font-medium"
                            whileHover={{ scale: 1.1, rotate: 10 }}
                          >
                            {visitor.location.charAt(0)}
                          </motion.div>
                          <div>
                            <p className="text-sm font-medium text-stone-800">
                              {visitor.location}
                            </p>
                            <p className="text-xs text-stone-500">
                              来自 {visitor.source}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-stone-400">{visitor.time}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <motion.div 
                  className="mt-6 pt-6 border-t border-stone-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-stone-800">你的网站链接</p>
                      <p className="text-sm text-stone-500">{analyticsData?.siteUrl || 'wave.me/u/username'}</p>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" size="sm" className="border-stone-300">
                        <Link className="w-4 h-4 mr-2" />
                        复制
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
