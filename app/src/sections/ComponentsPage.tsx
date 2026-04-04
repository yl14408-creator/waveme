import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  ArrowRight,
  BarChart3,
  MapPin,
  Globe,
  Image,
  GraduationCap,
  Target,
  Activity,
  TrendingUp,
  Clock,
  Award,
  Zap,
  LineChart,
  PieChart,
  Calendar,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/visual-components/ProgressBar';
import { GaugeChart } from '@/components/visual-components/GaugeChart';
import { MiniMap } from '@/components/visual-components/MiniMap';
import { PhotoGallery } from '@/components/visual-components/PhotoGallery';
import { EducationCard } from '@/components/visual-components/EducationCard';
import { ExpectationCard } from '@/components/visual-components/ExpectationCard';
import { AchievementBadge } from '@/components/visual-components/AchievementBadge';
import { TimelineItem } from '@/components/visual-components/TimelineItem';
import { SalarySlider } from '@/components/visual-components/SalarySlider';
import { RadarSkills } from '@/components/visual-components/RadarSkills';
import { MetricCard } from '@/components/visual-components/MetricCard';
import { StatusIndicator } from '@/components/visual-components/StatusIndicator';
import { FunnelChart } from '@/components/visual-components/FunnelChart';
import { Heatmap } from '@/components/visual-components/Heatmap';
import { EventStream } from '@/components/visual-components/EventStream';
import { ComparisonTag } from '@/components/visual-components/ComparisonTag';
import { analyticsService, type AnalyticsData } from '@/services/analytics';

interface ComponentsPageProps {
  onNavigate: (page: string) => void;
}

// Stone色系的颜色配置
const STONE_COLORS = {
  primary: '#57534e',
  secondary: '#78716c',
  accent: '#a8a29e',
  light: '#e7e5e4',
  chart: ['#57534e', '#78716c', '#a8a29e', '#d6d3d1', '#c4c0bb'],
};

const componentCategories = [
  {
    id: 'charts',
    name: '数据图表',
    icon: <BarChart3 className="w-5 h-5" />,
    description: '丰富的数据可视化组件，让数据更有说服力'
  },
  {
    id: 'progress',
    name: '进度展示',
    icon: <TrendingUp className="w-5 h-5" />,
    description: '技能进度、项目完成度等可视化展示'
  },
  {
    id: 'cards',
    name: '信息卡片',
    icon: <Layers className="w-5 h-5" />,
    description: '教育背景、工作经历等结构化信息展示'
  },
  {
    id: 'media',
    name: '媒体展示',
    icon: <Image className="w-5 h-5" />,
    description: '图片画廊、地图等富媒体组件'
  },
  {
    id: 'dashboard',
    name: '仪表盘',
    icon: <Activity className="w-5 h-5" />,
    description: '实时数据监控和分析组件'
  }
];

const sampleEducation = [
  {
    id: '1',
    school: '浙江大学',
    degree: '本科',
    field: '计算机科学与技术',
    startDate: '2012-09',
    endDate: '2016-06',
    gpa: 3.8,
    maxGpa: 4.0,
    achievements: ['国家奖学金获得者', 'ACM竞赛省级一等奖', '优秀毕业生']
  }
];

const samplePhotos = [
  { id: '1', src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop', caption: '电商平台首页' },
  { id: '2', src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', caption: '数据可视化大屏' },
  { id: '3', src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop', caption: '移动端应用' },
  { id: '4', src: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=400&h=300&fit=crop', caption: '后台管理系统' },
];

const sampleLocations = [
  { id: '1', name: '上海', country: '中国', type: 'work' as const },
  { id: '2', name: '杭州', country: '中国', type: 'work' as const },
  { id: '3', name: '北京', country: '中国', type: 'education' as const },
];

const sampleAchievements = [
  { id: '1', title: '开源贡献者', description: 'GitHub Star 超过 1000', metric: { value: 1200, unit: 'Stars', change: 15 }, icon: 'trophy' as const, color: STONE_COLORS.primary },
  { id: '2', title: '技术博主', description: '发布 50+ 技术文章', metric: { value: 58, unit: '篇', change: 8 }, icon: 'star' as const, color: STONE_COLORS.secondary },
  { id: '3', title: '社区活跃', description: '回答问题 500+', metric: { value: 523, unit: '个', change: 12 }, icon: 'zap' as const, color: STONE_COLORS.accent },
];

const sampleExpectationData = {
  salary: {
    min: 20000,
    max: 35000,
    expected: 28000,
    currency: '¥',
    industryAverage: 25000
  },
  location: {
    preferred: ['上海', '杭州', '深圳'],
    willingToRelocate: true
  },
  position: {
    title: '高级前端工程师',
    level: 'P7'
  },
  availability: {
    noticePeriod: '1个月',
    earliestStart: '2026-02-01'
  }
};

export function ComponentsPage({ onNavigate }: ComponentsPageProps) {
  const [activeCategory, setActiveCategory] = useState('charts');
  const [salaryValue, setSalaryValue] = useState(25000);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 加载真实数据
  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    try {
      const data = await analyticsService.getAnalytics('7d');
      setAnalyticsData(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderComponents = () => {
    switch (activeCategory) {
      case 'charts':
        return (
          <div className="space-y-8">
            {/* Gauge Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-stone-600" />
                仪表盘图表
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <GaugeChart value={85} max={100} label="技能掌握度" colorScheme="stone" />
                <GaugeChart value={72} max={100} label="项目完成度" colorScheme="stone" />
                <GaugeChart value={93} max={100} label="客户满意度" colorScheme="stone" />
              </div>
            </div>

            {/* Radar Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <LineChart className="w-5 h-5 text-stone-600" />
                技能雷达图
              </h3>
              <div className="max-w-md mx-auto">
                <RadarSkills 
                  skills={[
                    { name: 'React', level: 90 },
                    { name: 'TypeScript', level: 85 },
                    { name: 'Node.js', level: 75 },
                    { name: 'Design', level: 70 },
                    { name: 'Communication', level: 88 },
                    { name: 'Leadership', level: 65 },
                  ]}
                  color={STONE_COLORS.primary}
                />
              </div>
            </div>

            {/* Funnel Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-stone-600" />
                漏斗分析
              </h3>
              <FunnelChart 
                data={[
                  { name: '访问', value: 10000, color: STONE_COLORS.primary },
                  { name: '浏览项目', value: 6500, color: STONE_COLORS.secondary },
                  { name: '查看联系', value: 3200, color: STONE_COLORS.accent },
                  { name: '发送邮件', value: 1200, color: STONE_COLORS.light },
                ]}
              />
            </div>
          </div>
        );

      case 'progress':
        return (
          <div className="space-y-8">
            {/* Progress Bars */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-stone-600" />
                技能进度条
              </h3>
              <div className="space-y-4">
                <ProgressBar label="React / Next.js" value={95} color={STONE_COLORS.primary} showPercentage />
                <ProgressBar label="TypeScript" value={88} color={STONE_COLORS.secondary} showPercentage />
                <ProgressBar label="Node.js" value={75} color={STONE_COLORS.accent} showPercentage />
                <ProgressBar label="Python" value={60} color="#9ca3af" showPercentage />
                <ProgressBar label="UI/UX Design" value={70} color="#a8a29e" showPercentage />
              </div>
            </div>

            {/* Salary Slider */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-stone-600" />
                薪资期望滑块
              </h3>
              <SalarySlider 
                value={salaryValue}
                onChange={setSalaryValue}
                min={5000}
                max={50000}
                industryAverage={25000}
                color={STONE_COLORS.primary}
              />
            </div>

            {/* Comparison Tags */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-stone-600" />
                对比标签
              </h3>
              <div className="flex flex-wrap gap-3">
                <ComparisonTag value={23.5} label="vs 上月" />
                <ComparisonTag value={-5.2} label="vs 上周" />
                <ComparisonTag value={0} label="持平" />
              </div>
            </div>
          </div>
        );

      case 'cards':
        return (
          <div className="space-y-8">
            {/* Education Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-stone-600" />
                教育背景卡片
              </h3>
              <EducationCard education={sampleEducation} />
            </div>

            {/* Expectation Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-stone-600" />
                求职期望卡片
              </h3>
              <ExpectationCard 
                data={sampleExpectationData}
                industryBenchmarks={{ salaryRange: [15000, 40000] }}
              />
            </div>

            {/* Achievement Badges */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-stone-600" />
                成就徽章
              </h3>
              <AchievementBadge achievements={sampleAchievements} />
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-stone-600" />
                时间线
              </h3>
              <div className="space-y-0">
                <TimelineItem 
                  title="高级前端工程师"
                  company="字节跳动"
                  startDate="2021-03"
                  current
                  description={['负责抖音创作者平台前端架构设计']}
                />
                <TimelineItem 
                  title="前端工程师"
                  company="阿里巴巴"
                  startDate="2018-07"
                  endDate="2021-02"
                  description={['参与淘宝商家后台系统开发']}
                />
                <TimelineItem 
                  title="初级前端工程师"
                  company="美团"
                  startDate="2016-06"
                  endDate="2018-06"
                  description={['负责商家端H5页面开发']}
                />
              </div>
            </div>
          </div>
        );

      case 'media':
        return (
          <div className="space-y-8">
            {/* Photo Gallery */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <Image className="w-5 h-5 text-stone-600" />
                项目照片画廊
              </h3>
              <PhotoGallery photos={samplePhotos} />
            </div>

            {/* Mini Map */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-stone-600" />
                工作地点地图
              </h3>
              <MiniMap locations={sampleLocations} />
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Real Data Notice */}
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-stone-600" />
                <span className="text-stone-700">
                  {isLoading ? '加载真实数据中...' : analyticsData ? '已接入真实数据分析' : '显示示例数据'}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={loadAnalyticsData} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                刷新
              </Button>
            </div>

            {/* Metric Cards - 使用真实数据 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-stone-600" />
                指标卡片
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <MetricCard 
                  title="总访问"
                  value={analyticsData?.totalViews || 12847}
                  change={analyticsData?.viewsChange || 23.5}
                  icon={<Globe className="w-5 h-5" />}
                  iconBg="bg-stone-600"
                />
                <MetricCard 
                  title="独立访客"
                  value={analyticsData?.uniqueVisitors || 8234}
                  change={analyticsData?.visitorsChange || 18.2}
                  icon={<Activity className="w-5 h-5" />}
                  iconBg="bg-stone-500"
                />
                <MetricCard 
                  title="平均停留"
                  value={analyticsData ? parseInt(analyticsData.avgDwellTime) : 222}
                  suffix="秒"
                  change={analyticsData?.dwellTimeChange || 12.8}
                  icon={<Clock className="w-5 h-5" />}
                  iconBg="bg-stone-400"
                />
                <MetricCard 
                  title="跳出率"
                  value={analyticsData?.bounceRate || 32}
                  suffix="%"
                  change={-(analyticsData?.bounceRateChange || 5)}
                  icon={<TrendingUp className="w-5 h-5" />}
                  iconBg="bg-stone-400"
                  decimals={1}
                />
              </div>
            </div>

            {/* Status Indicators */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-stone-600" />
                状态指示灯
              </h3>
              <div className="flex flex-wrap gap-4">
                <StatusIndicator status="online" label="网站在线" />
                <StatusIndicator status="warning" label="维护模式" />
                <StatusIndicator status="offline" label="服务异常" />
                <StatusIndicator status="processing" label="处理中" />
              </div>
            </div>

            {/* Heatmap */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-stone-600" />
                访问热力图
              </h3>
              <Heatmap 
                data={[
                  { x: '周一', y: '上午', value: 3 },
                  { x: '周一', y: '下午', value: 5 },
                  { x: '周二', y: '上午', value: 4 },
                  { x: '周二', y: '下午', value: 6 },
                  { x: '周三', y: '上午', value: 7 },
                  { x: '周四', y: '下午', value: 5 },
                  { x: '周五', y: '晚上', value: 8 },
                ]} 
                xLabels={['周一', '周二', '周三', '周四', '周五']}
                yLabels={['上午', '下午', '晚上']}
                colorScale={['#f5f5f4', '#e7e5e4', '#d6d3d1', '#a8a29e', '#78716c', '#57534e']}
              />
            </div>

            {/* Event Stream */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-stone-600" />
                实时事件流
              </h3>
              <EventStream />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full text-stone-600 text-sm font-medium mb-6 border border-stone-200">
            <Layers className="w-4 h-4" />
            <span>组件库</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
            丰富的可视化组件
          </h1>
          <p className="text-xl text-stone-500 max-w-2xl mx-auto">
            20+ 精心设计的组件，让你的个人网站更具专业感和视觉冲击力
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10"
        >
          {componentCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`p-4 rounded-xl text-left transition-all ${
                activeCategory === cat.id
                  ? 'bg-stone-700 text-white shadow-lg'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <div className={`mb-2 ${activeCategory === cat.id ? 'text-white' : 'text-stone-500'}`}>
                {cat.icon}
              </div>
              <div className="font-medium text-sm">{cat.name}</div>
            </button>
          ))}
        </motion.div>

        {/* Components Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {renderComponents()}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button
            size="lg"
            onClick={() => onNavigate('upload')}
            className="bg-stone-700 hover:bg-stone-800 text-white px-10 py-6 text-lg rounded-xl shadow-lg"
          >
            开始使用这些组件
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
