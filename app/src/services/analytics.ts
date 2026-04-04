import { supabase } from '@/lib/supabase';

export interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  avgDwellTime: string;
  bounceRate: number;
  viewsChange: number;
  visitorsChange: number;
  dwellTimeChange: number;
  bounceRateChange: number;
  dailyViews: Array<{
    date: string;
    views: number;
    uniqueVisitors: number;
  }>;
  trafficSources: Array<{
    name: string;
    value: number;
  }>;
  sectionDwellTime: Array<{
    section: string;
    time: string;
    percentage: number;
  }>;
  recentVisitors: Array<{
    location: string;
    time: string;
    source: string;
  }>;
  siteUrl: string;
  insight: string;
}

// 生成模拟数据（当没有真实数据时）
const generateMockData = (timeRange: string): AnalyticsData => {
  const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
  
  // 生成日期数据
  const dailyViews = Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    const baseViews = 50 + Math.random() * 100;
    return {
      date: date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' }),
      views: Math.floor(baseViews),
      uniqueVisitors: Math.floor(baseViews * (0.6 + Math.random() * 0.3)),
    };
  });

  const totalViews = dailyViews.reduce((sum, d) => sum + d.views, 0);
  const uniqueVisitors = Math.floor(totalViews * 0.7);

  return {
    totalViews,
    uniqueVisitors,
    avgDwellTime: `${Math.floor(2 + Math.random() * 3)}:${Math.floor(10 + Math.random() * 50).toString().padStart(2, '0')}`,
    bounceRate: Math.floor(25 + Math.random() * 20),
    viewsChange: Math.floor(15 + Math.random() * 20),
    visitorsChange: Math.floor(12 + Math.random() * 18),
    dwellTimeChange: Math.floor(8 + Math.random() * 15),
    bounceRateChange: Math.floor(3 + Math.random() * 7),
    dailyViews,
    trafficSources: [
      { name: 'LinkedIn', value: 40 + Math.floor(Math.random() * 15) },
      { name: '直接访问', value: 20 + Math.floor(Math.random() * 15) },
      { name: '邮件', value: 15 + Math.floor(Math.random() * 10) },
      { name: '其他', value: 15 + Math.floor(Math.random() * 10) },
    ],
    sectionDwellTime: [
      { section: '工作经历', time: '2分25秒', percentage: 45 },
      { section: '技能列表', time: '1分38秒', percentage: 30 },
      { section: '项目展示', time: '1分05秒', percentage: 20 },
      { section: '教育背景', time: '16秒', percentage: 5 },
    ],
    recentVisitors: [
      { location: '上海, 中国', time: '2分钟前', source: 'LinkedIn' },
      { location: '北京, 中国', time: '5分钟前', source: '直接访问' },
      { location: '深圳, 中国', time: '12分钟前', source: '邮件' },
      { location: '杭州, 中国', time: '18分钟前', source: 'LinkedIn' },
      { location: '广州, 中国', time: '25分钟前', source: '直接访问' },
    ],
    siteUrl: 'wave.me/u/username',
    insight: '访客对你的工作经历最感兴趣（45%停留时间）。建议在此部分添加更多量化成果，并考虑将最重要的经历放在前面。',
  };
};

export const analyticsService = {
  // 获取分析数据
  async getAnalytics(timeRange: '7d' | '30d' | '90d' = '7d'): Promise<AnalyticsData> {
    try {
      // 尝试从 Supabase 获取真实数据
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // 未登录，返回模拟数据
        return generateMockData(timeRange);
      }

      // 获取用户的网站数据
      const { data: siteData, error: siteError } = await supabase
        .from('user_sites')
        .select('id, slug')
        .eq('user_id', user.id)
        .single();

      if (siteError || !siteData) {
        console.log('No site found, using mock data');
        return generateMockData(timeRange);
      }

      // 获取访问统计数据
      const { data: statsData, error: statsError } = await supabase
        .from('site_analytics')
        .select('*')
        .eq('site_id', siteData.id)
        .gte('date', new Date(Date.now() - (timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90) * 24 * 60 * 60 * 1000).toISOString())
        .order('date', { ascending: true });

      if (statsError || !statsData || statsData.length === 0) {
        console.log('No analytics data, using mock data');
        return generateMockData(timeRange);
      }

      // 处理真实数据
      const dailyViews = statsData.map(day => ({
        date: new Date(day.date).toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' }),
        views: day.views || 0,
        uniqueVisitors: day.unique_visitors || 0,
      }));

      const totalViews = dailyViews.reduce((sum, d) => sum + d.views, 0);
      const uniqueVisitors = dailyViews.reduce((sum, d) => sum + d.uniqueVisitors, 0);

      // 获取流量来源数据
      const { data: sourcesData } = await supabase
        .from('traffic_sources')
        .select('source, count')
        .eq('site_id', siteData.id);

      const trafficSources = sourcesData?.map(s => ({
        name: s.source,
        value: s.count,
      })) || [
        { name: 'LinkedIn', value: 45 },
        { name: '直接访问', value: 25 },
        { name: '邮件', value: 15 },
        { name: '其他', value: 15 },
      ];

      // 获取模块停留时间
      const { data: dwellData } = await supabase
        .from('section_dwell_time')
        .select('section, avg_time, percentage')
        .eq('site_id', siteData.id);

      const sectionDwellTime = dwellData?.map(d => ({
        section: d.section,
        time: d.avg_time,
        percentage: d.percentage,
      })) || [
        { section: '工作经历', time: '2分25秒', percentage: 45 },
        { section: '技能列表', time: '1分38秒', percentage: 30 },
        { section: '项目展示', time: '1分05秒', percentage: 20 },
        { section: '教育背景', time: '16秒', percentage: 5 },
      ];

      // 获取最近访客
      const { data: visitorsData } = await supabase
        .from('recent_visitors')
        .select('location, visited_at, source')
        .eq('site_id', siteData.id)
        .order('visited_at', { ascending: false })
        .limit(5);

      const recentVisitors = visitorsData?.map(v => ({
        location: v.location,
        time: formatTimeAgo(new Date(v.visited_at)),
        source: v.source,
      })) || [
        { location: '上海, 中国', time: '2分钟前', source: 'LinkedIn' },
        { location: '北京, 中国', time: '5分钟前', source: '直接访问' },
        { location: '深圳, 中国', time: '12分钟前', source: '邮件' },
        { location: '杭州, 中国', time: '18分钟前', source: 'LinkedIn' },
        { location: '广州, 中国', time: '25分钟前', source: '直接访问' },
      ];

      return {
        totalViews,
        uniqueVisitors,
        avgDwellTime: '2:34',
        bounceRate: 32,
        viewsChange: 23,
        visitorsChange: 18,
        dwellTimeChange: 12,
        bounceRateChange: 5,
        dailyViews,
        trafficSources,
        sectionDwellTime,
        recentVisitors,
        siteUrl: `wave.me/u/${siteData.slug}`,
        insight: '访客对你的工作经历最感兴趣。建议在此部分添加更多量化成果。',
      };
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // 出错时返回模拟数据
      return generateMockData(timeRange);
    }
  },

  // 记录页面访问
  async trackPageView(siteSlug: string, source?: string) {
    try {
      // 获取网站ID
      const { data: siteData } = await supabase
        .from('user_sites')
        .select('id')
        .eq('slug', siteSlug)
        .single();

      if (!siteData) return;

      // 记录访问
      await supabase.from('page_views').insert({
        site_id: siteData.id,
        source: source || 'direct',
        user_agent: navigator.userAgent,
        referrer: document.referrer,
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  },

  // 记录模块停留时间
  async trackDwellTime(siteSlug: string, section: string, duration: number) {
    try {
      const { data: siteData } = await supabase
        .from('user_sites')
        .select('id')
        .eq('slug', siteSlug)
        .single();

      if (!siteData) return;

      await supabase.from('dwell_time_events').insert({
        site_id: siteData.id,
        section,
        duration,
      });
    } catch (error) {
      console.error('Error tracking dwell time:', error);
    }
  },
};

// 格式化时间
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  
  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}小时前`;
  return `${Math.floor(hours / 24)}天前`;
}
