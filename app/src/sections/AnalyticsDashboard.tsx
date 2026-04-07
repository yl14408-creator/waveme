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
  Activity,
  RefreshCw
} from 'lucide-react';
import { analyticsService, type AnalyticsData } from '@/services/analytics';
import { useI18n } from '@/i18n';

// Hourly data and other supplementary data that analytics service doesn't provide
const defaultHourlyData = [
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
  const { t } = useI18n();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load real data from analytics service
  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange]);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    try {
      const data = await analyticsService.getAnalytics(timeRange);
      setAnalyticsData(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Ripple animation
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
    let animationId: number;

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

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const trafficSourceColors = ['#0077b5', '#3b82f6', '#4285f4', '#333', '#9ca3af'];

  const deviceData = analyticsData ? [
    { name: t('analytics.dashboard.deviceDistribution'), value: 55, icon: <Monitor className="w-4 h-4" /> },
    { name: 'Mobile', value: 35, icon: <Smartphone className="w-4 h-4" /> },
    { name: 'Tablet', value: 10, icon: <Tablet className="w-4 h-4" /> },
  ] : [];

  const stats = analyticsData ? [
    {
      title: t('analytics.dashboard.totalViews'),
      value: analyticsData.totalViews.toLocaleString(),
      change: `+${analyticsData.viewsChange}%`,
      trend: 'up' as const,
      icon: <Eye className="w-5 h-5" />,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      title: t('analytics.dashboard.uniqueVisitors'),
      value: analyticsData.uniqueVisitors.toLocaleString(),
      change: `+${analyticsData.visitorsChange}%`,
      trend: 'up' as const,
      icon: <Users className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: t('analytics.dashboard.avgStay'),
      value: analyticsData.avgDwellTime,
      change: `+${analyticsData.dwellTimeChange}%`,
      trend: 'up' as const,
      icon: <Clock className="w-5 h-5" />,
      color: 'from-purple-500 to-violet-500',
    },
    {
      title: t('analytics.dashboard.bounceRate'),
      value: `${analyticsData.bounceRate}%`,
      change: `-${analyticsData.bounceRateChange}%`,
      trend: 'down' as const,
      icon: <MousePointer className="w-5 h-5" />,
      color: 'from-orange-500 to-red-500',
    },
  ] : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <RefreshCw className="w-8 h-8 text-gray-400" />
          </motion.div>
          <p className="text-gray-500">{t('common.loading')}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t('analytics.dashboard.title')}</h1>
              <p className="text-sm text-gray-500">{t('analytics.dashboard.subtitle')}</p>
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
                    {t(`analytics.dashboard.timeRange.${range}`)}
                  </button>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={loadAnalyticsData}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                {t('analytics.refresh')}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                {t('analytics.dashboard.exportReport')}
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
                      <h3 className="text-2xl font-bold">{t('analytics.dashboard.rippleTitle')}</h3>
                    </div>
                    <p className="text-slate-400">
                      {t('analytics.dashboard.rippleDesc')}
                    </p>
                    <div className="flex items-center justify-center gap-6 mt-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-400">
                          {analyticsData ? Math.floor(analyticsData.uniqueVisitors / 100) : 0}
                        </div>
                        <div className="text-xs text-slate-500">{t('analytics.dashboard.currentOnline')}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400">
                          {analyticsData ? Math.floor(analyticsData.totalViews / (timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90)) : 0}
                        </div>
                        <div className="text-xs text-slate-500">{t('analytics.dashboard.todayVisits')}</div>
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
                        <span className="text-sm text-gray-400">{t('analytics.dashboard.vsLastWeek')}</span>
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
                    {t('analytics.dashboard.trafficTrend')}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData?.dailyViews || []}>
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
                        name={t('analytics.totalViews')}
                      />
                      <Area
                        type="monotone"
                        dataKey="uniqueVisitors"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorVisitors)"
                        name={t('analytics.uniqueVisitors')}
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
                  {t('analytics.dashboard.trafficSources')}
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
                        {(analyticsData?.trafficSources || []).map((_entry, index) => (
                          <Cell key={`cell-${index}`} fill={trafficSourceColors[index % trafficSourceColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {(analyticsData?.trafficSources || []).map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: trafficSourceColors[index % trafficSourceColors.length] }}
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
                  {t('analytics.dashboard.hourlyDistribution')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={defaultHourlyData}>
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
                  {t('analytics.dashboard.deviceDistribution')}
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

          {/* Recent Visitors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-500" />
                  {t('analytics.dashboard.visitorDistribution')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(analyticsData?.recentVisitors || []).map((visitor, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="text-sm font-medium">{visitor.location}</div>
                          <div className="text-xs text-gray-500">{visitor.source}</div>
                        </div>
                      </div>
                      <div className="text-sm text-cyan-600">
                        {visitor.time}
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
                {t('analytics.dashboard.sectionDwell')}
              </CardTitle>
              <p className="text-sm text-gray-500">
                {t('analytics.dashboard.sectionDwellDesc')}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {(analyticsData?.sectionDwellTime || []).map((section, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {section.section}
                        </span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">
                            {section.time}
                          </span>
                          <span className="text-sm font-medium text-cyan-600">
                            {section.percentage}%
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${section.percentage}%` }}
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
                    {t('analytics.dashboard.insightTitle')}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {analyticsData?.insight || ''}
                  </p>
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
                {t('analytics.dashboard.skillsRadar')}
              </CardTitle>
              <p className="text-sm text-gray-500">
                {t('analytics.dashboard.skillsRadarDesc')}
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
                      name={t('analytics.dashboard.skillsRadar')}
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
