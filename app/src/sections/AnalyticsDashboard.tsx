import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AreaChart, 
  Area,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  Clock, 
  MousePointer,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  ArrowUpRight,
  MapPin,
  Download,
  Target,
  Zap,
  BarChart3,
  Activity
} from 'lucide-react';

// 模拟数据
const generateDailyData = (days: number) => {
  const data = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }),
      views: Math.floor(Math.random() * 200) + 50,
      uniqueVisitors: Math.floor(Math.random() * 150) + 30,
      avgDuration: Math.floor(Math.random() * 180) + 60,
    });
  }
  return data;
};

const trafficSources = [
  { name: 'LinkedIn', value: 45, color: '#0077b5' },
  { name: '直接访问', value: 25, color: '#3b82f6' },
  { name: 'Google', value: 15, color: '#4285f4' },
  { name: 'GitHub', value: 10, color: '#333' },
  { name: '其他', value: 5, color: '#9ca3af' },
];

const deviceData = [
  { name: '桌面端', value: 55, icon: <Monitor className="w-4 h-4" /> },
  { name: '移动端', value: 35, icon: <Smartphone className="w-4 h-4" /> },
  { name: '平板', value: 10, icon: <Tablet className="w-4 h-4" /> },
];

const sectionEngagement = [
  { section: '工作经历', views: 245, avgTime: 145, satisfaction: 92 },
  { section: '项目展示', views: 189, avgTime: 120, satisfaction: 88 },
  { section: '技能列表', views: 156, avgTime: 45, satisfaction: 75 },
  { section: '关于我', views: 134, avgTime: 68, satisfaction: 85 },
  { section: '联系方式', views: 89, avgTime: 25, satisfaction: 95 },
];

const topCountries = [
  { country: '中国', city: '上海', visitors: 456, flag: '🇨🇳' },
  { country: '中国', city: '北京', visitors: 234, flag: '🇨🇳' },
  { country: '美国', city: '旧金山', visitors: 189, flag: '🇺🇸' },
  { country: '新加坡', city: '新加坡', visitors: 123, flag: '🇸🇬' },
  { country: '日本', city: '东京', visitors: 98, flag: '🇯🇵' },
];

const hourlyData = [
  { hour: '00:00', views: 12 },
  { hour: '02:00', views: 8 },
  { hour: '04:00', views: 5 },
  { hour: '06:00', views: 15 },
  { hour: '08:00', views: 45 },
  { hour: '10:00', views: 89 },
  { hour: '12:00', views: 67 },
  { hour: '14:00', views: 98 },
  { hour: '16:00', views: 112 },
  { hour: '18:00', views: 87 },
  { hour: '20:00', views: 56 },
  { hour: '22:00', views: 34 },
];

// 技能雷达图数据
const skillsRadarData = [
  { skill: 'React', score: 95 },
  { skill: 'TypeScript', score: 88 },
  { skill: 'Node.js', score: 82 },
  { skill: 'Python', score: 75 },
  { skill: 'Design', score: 70 },
  { skill: 'DevOps', score: 65 },
];

interface AnalyticsDashboardProps {
  // _onNavigate?: (page: string) => void;
}

export function AnalyticsDashboard({}: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [dailyData, setDailyData] = useState(generateDailyData(30));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 涟漪动画
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
      opacity: number;
    }

    const ripples: Ripple[] = [];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      if (Math.random() < 0.03) {
        ripples.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          radius: 0,
          opacity: 0.5,
        });
      }

      ripples.forEach((ripple, i) => {
        ripple.radius += 0.5;
        ripple.opacity -= 0.005;

        if (ripple.opacity <= 0) {
          ripples.splice(i, 1);
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
  }, []);

  // 更新时间范围
  useEffect(() => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    setDailyData(generateDailyData(days));
  }, [timeRange]);

  const stats = [
    {
      title: '总访问量',
      value: '12,847',
      change: '+23.5%',
      trend: 'up',
      icon: <Eye className="w-5 h-5" />,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      title: '独立访客',
      value: '8,234',
      change: '+18.2%',
      trend: 'up',
      icon: <Users className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: '平均停留',
      value: '3:42',
      change: '+12.8%',
      trend: 'up',
      icon: <Clock className="w-5 h-5" />,
      color: 'from-purple-500 to-violet-500',
    },
    {
      title: '跳出率',
      value: '32.4%',
      change: '-5.2%',
      trend: 'down',
      icon: <MousePointer className="w-5 h-5" />,
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">数据洞察</h1>
              <p className="text-sm text-gray-500">追踪你的个人网站表现</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {(['7d', '30d', '90d'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      timeRange === range
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {range === '7d' ? '7天' : range === '30d' ? '30天' : '90天'}
                  </button>
                ))}
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                导出报告
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Live Ripple Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0 relative">
              <div className="h-48 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <Activity className="w-8 h-8 text-cyan-400 animate-pulse" />
                      <h3 className="text-2xl font-bold">实时访问涟漪</h3>
                    </div>
                    <p className="text-slate-400">
                      每一个涟漪代表一次访问，就像你投下的石头在海面泛起的波纹
                    </p>
                    <div className="flex items-center justify-center gap-6 mt-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-400">24</div>
                        <div className="text-xs text-slate-500">当前在线</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400">156</div>
                        <div className="text-xs text-slate-500">今日访问</div>
                      </div>
                    </div>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <div className="flex items-center gap-1 mt-2">
                        {stat.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-green-500" />
                        )}
                        <span className="text-sm text-green-600">{stat.change}</span>
                        <span className="text-sm text-gray-400">vs 上周</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-white`}>
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Charts */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Traffic Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-cyan-500" />
                    访问趋势
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dailyData}>
                      <defs>
                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                      <YAxis stroke="#9ca3af" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="views"
                        stroke="#06b6d4"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorViews)"
                        name="访问量"
                      />
                      <Area
                        type="monotone"
                        dataKey="uniqueVisitors"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorVisitors)"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Globe className="w-5 h-5 text-cyan-500" />
                  流量来源
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trafficSources}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {trafficSources.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {trafficSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: source.color }}
                        />
                        <span className="text-sm text-gray-600">{source.name}</span>
                      </div>
                      <span className="text-sm font-medium">{source.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Secondary Charts */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Hourly Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-cyan-500" />
                  24小时分布
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                      <XAxis dataKey="hour" stroke="#9ca3af" fontSize={10} interval={2} />
                      <YAxis stroke="#9ca3af" fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="views" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Device Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-cyan-500" />
                  设备分布
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deviceData.map((device, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">{device.icon}</span>
                          <span className="text-sm text-gray-700">{device.name}</span>
                        </div>
                        <span className="text-sm font-medium">{device.value}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${device.value}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Geographic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-500" />
                  访客分布
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topCountries.map((country, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{country.flag}</span>
                        <div>
                          <div className="text-sm font-medium">{country.city}</div>
                          <div className="text-xs text-gray-500">{country.country}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-cyan-600">
                        {country.visitors}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Section Engagement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-500" />
                模块停留分析
              </CardTitle>
              <p className="text-sm text-gray-500">
                了解访客在你的简历哪些部分停留最久
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {sectionEngagement.map((section, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {section.section}
                        </span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">
                            {Math.floor(section.avgTime / 60)}分{section.avgTime % 60}秒
                          </span>
                          <span className="text-sm font-medium text-cyan-600">
                            {section.views} 次
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(section.avgTime / 180) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    洞察建议
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <ArrowUpRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>
                        你的<strong>工作经历</strong>最受欢迎，访客平均停留 2分25秒。
                        建议添加更多量化成果。
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowUpRight className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>技能列表</strong>停留时间较短，考虑添加技能熟练度可视化。
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowUpRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>
                        来自 <strong>LinkedIn</strong> 的流量占比最高（45%），
                        说明你的 LinkedIn 引流效果很好！
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Skills Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-500" />
                技能热度雷达
              </CardTitle>
              <p className="text-sm text-gray-500">
                基于访客点击和停留时间计算的技能关注度
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillsRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="技能热度"
                      dataKey="score"
                      stroke="#06b6d4"
                      fill="#06b6d4"
                      fillOpacity={0.3}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
