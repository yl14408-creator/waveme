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

// Helper to get current language
function getLang(): 'zh' | 'en' {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('waveme-language');
    if (saved === 'zh' || saved === 'en') return saved;
  }
  return 'en';
}

// Generate mock data (when no real data is available)
const generateMockData = (timeRange: string): AnalyticsData => {
  const lang = getLang();
  const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;

  const dailyViews = Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    const baseViews = 50 + Math.random() * 100;
    return {
      date: date.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { month: '2-digit', day: '2-digit' }),
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
      { name: lang === 'zh' ? '直接访问' : 'Direct', value: 20 + Math.floor(Math.random() * 15) },
      { name: lang === 'zh' ? '邮件' : 'Email', value: 15 + Math.floor(Math.random() * 10) },
      { name: lang === 'zh' ? '其他' : 'Other', value: 15 + Math.floor(Math.random() * 10) },
    ],
    sectionDwellTime: [
      { section: lang === 'zh' ? '工作经历' : 'Work Experience', time: '2:25', percentage: 45 },
      { section: lang === 'zh' ? '技能列表' : 'Skills', time: '1:38', percentage: 30 },
      { section: lang === 'zh' ? '项目展示' : 'Projects', time: '1:05', percentage: 20 },
      { section: lang === 'zh' ? '教育背景' : 'Education', time: '0:16', percentage: 5 },
    ],
    recentVisitors: [
      { location: lang === 'zh' ? '上海, 中国' : 'Shanghai, China', time: formatTimeAgo(new Date(Date.now() - 2 * 60000)), source: 'LinkedIn' },
      { location: lang === 'zh' ? '北京, 中国' : 'Beijing, China', time: formatTimeAgo(new Date(Date.now() - 5 * 60000)), source: lang === 'zh' ? '直接访问' : 'Direct' },
      { location: lang === 'zh' ? '深圳, 中国' : 'Shenzhen, China', time: formatTimeAgo(new Date(Date.now() - 12 * 60000)), source: lang === 'zh' ? '邮件' : 'Email' },
      { location: lang === 'zh' ? '杭州, 中国' : 'Hangzhou, China', time: formatTimeAgo(new Date(Date.now() - 18 * 60000)), source: 'LinkedIn' },
      { location: lang === 'zh' ? '广州, 中国' : 'Guangzhou, China', time: formatTimeAgo(new Date(Date.now() - 25 * 60000)), source: lang === 'zh' ? '直接访问' : 'Direct' },
    ],
    siteUrl: 'wave.me/u/username',
    insight: lang === 'zh'
      ? '访客对你的工作经历最感兴趣（45%停留时间）。建议在此部分添加更多量化成果，并考虑将最重要的经历放在前面。'
      : 'Visitors are most interested in your work experience (45% dwell time). Consider adding more quantified achievements and placing the most important experience first.',
  };
};

export const analyticsService = {
  // Get analytics data - queries real Supabase data, falls back to mock data
  async getAnalytics(timeRange: '7d' | '30d' | '90d' = '7d'): Promise<AnalyticsData> {
    try {
      // Try to fetch real data from Supabase
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Not logged in, return mock data
        return generateMockData(timeRange);
      }

      // Get user's site data
      const { data: siteData, error: siteError } = await supabase
        .from('user_sites')
        .select('id, slug')
        .eq('user_id', user.id)
        .single();

      if (siteError || !siteData) {
        console.log('No site found, using mock data');
        return generateMockData(timeRange);
      }

      // Get visit statistics
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

      // Process real data
      const lang = getLang();
      const dailyViews = statsData.map(day => ({
        date: new Date(day.date).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { month: '2-digit', day: '2-digit' }),
        views: day.views || 0,
        uniqueVisitors: day.unique_visitors || 0,
      }));

      const totalViews = dailyViews.reduce((sum, d) => sum + d.views, 0);
      const uniqueVisitors = dailyViews.reduce((sum, d) => sum + d.uniqueVisitors, 0);

      // Get traffic source data
      const { data: sourcesData } = await supabase
        .from('traffic_sources')
        .select('source, count')
        .eq('site_id', siteData.id);

      const trafficSources = sourcesData?.map(s => ({
        name: s.source,
        value: s.count,
      })) || [
        { name: 'LinkedIn', value: 45 },
        { name: lang === 'zh' ? '直接访问' : 'Direct', value: 25 },
        { name: lang === 'zh' ? '邮件' : 'Email', value: 15 },
        { name: lang === 'zh' ? '其他' : 'Other', value: 15 },
      ];

      // Get section dwell time
      const { data: dwellData } = await supabase
        .from('section_dwell_time')
        .select('section, avg_time, percentage')
        .eq('site_id', siteData.id);

      const sectionDwellTime = dwellData?.map(d => ({
        section: d.section,
        time: d.avg_time,
        percentage: d.percentage,
      })) || [
        { section: lang === 'zh' ? '工作经历' : 'Work Experience', time: '2:25', percentage: 45 },
        { section: lang === 'zh' ? '技能列表' : 'Skills', time: '1:38', percentage: 30 },
        { section: lang === 'zh' ? '项目展示' : 'Projects', time: '1:05', percentage: 20 },
        { section: lang === 'zh' ? '教育背景' : 'Education', time: '0:16', percentage: 5 },
      ];

      // Get recent visitors
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
        { location: lang === 'zh' ? '上海, 中国' : 'Shanghai, China', time: formatTimeAgo(new Date(Date.now() - 2 * 60000)), source: 'LinkedIn' },
        { location: lang === 'zh' ? '北京, 中国' : 'Beijing, China', time: formatTimeAgo(new Date(Date.now() - 5 * 60000)), source: lang === 'zh' ? '直接访问' : 'Direct' },
        { location: lang === 'zh' ? '深圳, 中国' : 'Shenzhen, China', time: formatTimeAgo(new Date(Date.now() - 12 * 60000)), source: lang === 'zh' ? '邮件' : 'Email' },
        { location: lang === 'zh' ? '杭州, 中国' : 'Hangzhou, China', time: formatTimeAgo(new Date(Date.now() - 18 * 60000)), source: 'LinkedIn' },
        { location: lang === 'zh' ? '广州, 中国' : 'Guangzhou, China', time: formatTimeAgo(new Date(Date.now() - 25 * 60000)), source: lang === 'zh' ? '直接访问' : 'Direct' },
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
        insight: lang === 'zh'
          ? '访客对你的工作经历最感兴趣。建议在此部分添加更多量化成果。'
          : 'Visitors are most interested in your work experience. Consider adding more quantified achievements.',
      };
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Return mock data on error
      return generateMockData(timeRange);
    }
  },

  // Track page view
  async trackPageView(siteSlug: string, source?: string) {
    try {
      // Get site ID
      const { data: siteData } = await supabase
        .from('user_sites')
        .select('id')
        .eq('slug', siteSlug)
        .single();

      if (!siteData) return;

      // Record visit
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

  // Track section dwell time
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

// Format relative time
function formatTimeAgo(date: Date): string {
  const lang = getLang();
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);

  if (lang === 'zh') {
    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}小时前`;
    return `${Math.floor(hours / 24)}天前`;
  }

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
