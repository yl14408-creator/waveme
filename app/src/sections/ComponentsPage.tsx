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
import { useI18n } from '@/i18n';

interface ComponentsPageProps {
  onNavigate: (page: string) => void;
}

// Stone color palette
const STONE_COLORS = {
  primary: '#57534e',
  secondary: '#78716c',
  accent: '#a8a29e',
  light: '#e7e5e4',
  chart: ['#57534e', '#78716c', '#a8a29e', '#d6d3d1', '#c4c0bb'],
};

const componentCategoryDefs = [
  { id: 'charts', nameKey: 'components.category.charts', icon: <BarChart3 className="w-5 h-5" /> },
  { id: 'progress', nameKey: 'components.category.progress', icon: <TrendingUp className="w-5 h-5" /> },
  { id: 'cards', nameKey: 'components.category.cards', icon: <Layers className="w-5 h-5" /> },
  { id: 'media', nameKey: 'components.category.media', icon: <Image className="w-5 h-5" /> },
  { id: 'dashboard', nameKey: 'components.category.dashboard', icon: <Activity className="w-5 h-5" /> },
];

// Sample data is generated via getSampleData() inside the component to support i18n

export function ComponentsPage({ onNavigate }: ComponentsPageProps) {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState('charts');
  const [salaryValue, setSalaryValue] = useState(25000);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const sampleEducation = [
    {
      id: '1',
      school: t('components.demo.sampleSchool'),
      degree: t('components.demo.sampleDegree'),
      field: t('components.demo.sampleField'),
      startDate: '2012-09',
      endDate: '2016-06',
      gpa: 3.8,
      maxGpa: 4.0,
      achievements: [t('components.demo.sampleAchievement1'), t('components.demo.sampleAchievement2'), t('components.demo.sampleAchievement3')]
    }
  ];

  const samplePhotos = [
    { id: '1', src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop', caption: t('components.demo.photoCaption1') },
    { id: '2', src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', caption: t('components.demo.photoCaption2') },
    { id: '3', src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop', caption: t('components.demo.photoCaption3') },
    { id: '4', src: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=400&h=300&fit=crop', caption: t('components.demo.photoCaption4') },
  ];

  const sampleLocations = [
    { id: '1', name: t('components.demo.locationShanghai'), country: t('components.demo.countryChina'), type: 'work' as const },
    { id: '2', name: t('components.demo.locationHangzhou'), country: t('components.demo.countryChina'), type: 'work' as const },
    { id: '3', name: t('components.demo.locationBeijing'), country: t('components.demo.countryChina'), type: 'education' as const },
  ];

  const sampleAchievements = [
    { id: '1', title: t('components.demo.achievement1Title'), description: t('components.demo.achievement1Desc'), metric: { value: 1200, unit: 'Stars', change: 15 }, icon: 'trophy' as const, color: STONE_COLORS.primary },
    { id: '2', title: t('components.demo.achievement2Title'), description: t('components.demo.achievement2Desc'), metric: { value: 58, unit: t('components.demo.achievement2Unit'), change: 8 }, icon: 'star' as const, color: STONE_COLORS.secondary },
    { id: '3', title: t('components.demo.achievement3Title'), description: t('components.demo.achievement3Desc'), metric: { value: 523, unit: t('components.demo.achievement3Unit'), change: 12 }, icon: 'zap' as const, color: STONE_COLORS.accent },
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
      preferred: [t('components.demo.sampleCity1'), t('components.demo.sampleCity2'), t('components.demo.sampleCity3')],
      willingToRelocate: true
    },
    position: {
      title: t('components.demo.samplePosition'),
      level: 'P7'
    },
    availability: {
      noticePeriod: t('components.demo.sampleNoticePeriod'),
      earliestStart: '2026-02-01'
    }
  };

  const componentCategories = componentCategoryDefs.map(c => ({
    ...c,
    name: t(c.nameKey),
  }));

  // Load real data
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
                {t('components.section.gaugeCharts')}
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <GaugeChart value={85} max={100} label={t('components.gauge.skillMastery')} colorScheme="stone" />
                <GaugeChart value={72} max={100} label={t('components.gauge.projectCompletion')} colorScheme="stone" />
                <GaugeChart value={93} max={100} label={t('components.gauge.clientSatisfaction')} colorScheme="stone" />
              </div>
            </div>

            {/* Radar Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <LineChart className="w-5 h-5 text-stone-600" />
                {t('components.section.radarChart')}
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
                {t('components.section.funnelChart')}
              </h3>
              <FunnelChart
                data={[
                  { name: t('components.demo.funnelVisits'), value: 10000, color: STONE_COLORS.primary },
                  { name: t('components.demo.funnelBrowse'), value: 6500, color: STONE_COLORS.secondary },
                  { name: t('components.demo.funnelContact'), value: 3200, color: STONE_COLORS.accent },
                  { name: t('components.demo.funnelEmail'), value: 1200, color: STONE_COLORS.light },
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
                {t('components.section.progressBars')}
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
                {t('components.section.salarySlider')}
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
                {t('components.section.comparisonTags')}
              </h3>
              <div className="flex flex-wrap gap-3">
                <ComparisonTag value={23.5} label={t('components.demo.comparisonVsLastMonth')} />
                <ComparisonTag value={-5.2} label={t('components.demo.comparisonVsLastWeek')} />
                <ComparisonTag value={0} label={t('components.demo.comparisonFlat')} />
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
                {t('components.section.educationCard')}
              </h3>
              <EducationCard education={sampleEducation} />
            </div>

            {/* Expectation Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-stone-600" />
                {t('components.section.expectationCard')}
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
                {t('components.section.achievementBadges')}
              </h3>
              <AchievementBadge achievements={sampleAchievements} />
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-stone-600" />
                {t('components.section.timeline')}
              </h3>
              <div className="space-y-0">
                <TimelineItem
                  title={t('components.demo.timelineTitle1')}
                  company={t('components.demo.timelineCompany1')}
                  startDate="2021-03"
                  current
                  description={[t('components.demo.timelineDesc1')]}
                />
                <TimelineItem
                  title={t('components.demo.timelineTitle2')}
                  company={t('components.demo.timelineCompany2')}
                  startDate="2018-07"
                  endDate="2021-02"
                  description={[t('components.demo.timelineDesc2')]}
                />
                <TimelineItem
                  title={t('components.demo.timelineTitle3')}
                  company={t('components.demo.timelineCompany3')}
                  startDate="2016-06"
                  endDate="2018-06"
                  description={[t('components.demo.timelineDesc3')]}
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
                {t('components.section.photoGallery')}
              </h3>
              <PhotoGallery photos={samplePhotos} />
            </div>

            {/* Mini Map */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-stone-600" />
                {t('components.section.miniMap')}
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
                  {isLoading ? t('components.section.dataNotice.loading') : analyticsData ? t('components.section.dataNotice.real') : t('components.section.dataNotice.sample')}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={loadAnalyticsData} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                {t('components.section.refresh')}
              </Button>
            </div>

            {/* Metric Cards - uses real data */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-stone-600" />
                {t('components.section.metricCards')}
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <MetricCard
                  title={t('analytics.dashboard.totalViews')}
                  value={analyticsData?.totalViews || 12847}
                  change={analyticsData?.viewsChange || 23.5}
                  icon={<Globe className="w-5 h-5" />}
                  iconBg="bg-stone-600"
                />
                <MetricCard
                  title={t('analytics.dashboard.uniqueVisitors')}
                  value={analyticsData?.uniqueVisitors || 8234}
                  change={analyticsData?.visitorsChange || 18.2}
                  icon={<Activity className="w-5 h-5" />}
                  iconBg="bg-stone-500"
                />
                <MetricCard
                  title={t('analytics.dashboard.avgStay')}
                  value={analyticsData ? parseInt(analyticsData.avgDwellTime) : 222}
                  suffix={t('components.demo.seconds')}
                  change={analyticsData?.dwellTimeChange || 12.8}
                  icon={<Clock className="w-5 h-5" />}
                  iconBg="bg-stone-400"
                />
                <MetricCard
                  title={t('analytics.dashboard.bounceRate')}
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
                {t('components.section.statusIndicators')}
              </h3>
              <div className="flex flex-wrap gap-4">
                <StatusIndicator status="online" label={t('components.demo.statusOnline')} />
                <StatusIndicator status="warning" label={t('components.demo.statusMaintenance')} />
                <StatusIndicator status="offline" label={t('components.demo.statusError')} />
                <StatusIndicator status="processing" label={t('components.demo.statusProcessing')} />
              </div>
            </div>

            {/* Heatmap */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-stone-600" />
                {t('components.section.heatmap')}
              </h3>
              <Heatmap
                data={[
                  { x: t('components.demo.heatmapMon'), y: t('components.demo.heatmapMorning'), value: 3 },
                  { x: t('components.demo.heatmapMon'), y: t('components.demo.heatmapAfternoon'), value: 5 },
                  { x: t('components.demo.heatmapTue'), y: t('components.demo.heatmapMorning'), value: 4 },
                  { x: t('components.demo.heatmapTue'), y: t('components.demo.heatmapAfternoon'), value: 6 },
                  { x: t('components.demo.heatmapWed'), y: t('components.demo.heatmapMorning'), value: 7 },
                  { x: t('components.demo.heatmapThu'), y: t('components.demo.heatmapAfternoon'), value: 5 },
                  { x: t('components.demo.heatmapFri'), y: t('components.demo.heatmapEvening'), value: 8 },
                ]}
                xLabels={[t('components.demo.heatmapMon'), t('components.demo.heatmapTue'), t('components.demo.heatmapWed'), t('components.demo.heatmapThu'), t('components.demo.heatmapFri')]}
                yLabels={[t('components.demo.heatmapMorning'), t('components.demo.heatmapAfternoon'), t('components.demo.heatmapEvening')]}
                colorScale={['#f5f5f4', '#e7e5e4', '#d6d3d1', '#a8a29e', '#78716c', '#57534e']}
              />
            </div>

            {/* Event Stream */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-stone-600" />
                {t('components.section.eventStream')}
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
            <span>{t('components.badge')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
            {t('components.title')}
          </h1>
          <p className="text-xl text-stone-500 max-w-2xl mx-auto">
            {t('components.subtitle')}
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
            {t('components.cta')}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
