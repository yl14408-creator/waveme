import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { 
  Check, 
  Sparkles, 
  Zap, 
  Crown, 
  Shield,
  ArrowLeft,
  Loader2,
  Globe,
  Search,
  ArrowRight,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useI18n } from '@/i18n/index.tsx';
import { PaymentModal } from '@/components/PaymentModal';
import type { PaymentResult, PlanType, BillingCycle } from '@/services/payment';

interface PricingPageProps {
  onNavigate: (page: string) => void;
}

interface PricingPlan {
  id: PlanType;
  name: string;
  description: string;
  icon: React.ReactNode;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
}

// 自定义域名定价
export const domainPricing = {
  // 常见域名后缀价格（年费）
  tlds: [
    { suffix: '.com', price: 88, popular: true },
    { suffix: '.cn', price: 35, popular: true },
    { suffix: '.net', price: 98 },
    { suffix: '.org', price: 108 },
    { suffix: '.io', price: 298, popular: true },
    { suffix: '.co', price: 168 },
    { suffix: '.me', price: 128, popular: true },
    { suffix: '.dev', price: 158 },
    { suffix: '.app', price: 138 },
    { suffix: '.xyz', price: 18 },
    { suffix: '.top', price: 25 },
    { suffix: '.club', price: 45 },
  ],
  // 域名服务
  services: {
    registration: '新域名注册',
    transfer: '域名转入',
    renewal: '域名续费',
    privacy: '隐私保护（免费）',
    ssl: 'SSL证书（免费）',
    dns: 'DNS管理',
  },
};

const plans: PricingPlan[] = [
  {
    id: 'free',
    name: '免费版',
    description: '适合个人尝鲜',
    icon: <Sparkles className="w-6 h-6" />,
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      '1 个个人网站',
      '基础模板（3款）',
      '基础 AI 助手',
      '免费二级域名（waveme.site/xxx）',
      '基础数据分析',
      '社区支持',
      '⚡ 永久免费',
    ],
    ctaText: '免费开始',
  },
  {
    id: 'pro',
    name: '专业版',
    description: '适合认真打造个人品牌',
    icon: <Zap className="w-6 h-6" />,
    monthlyPrice: 29,
    yearlyPrice: 290,
    highlighted: true,
    features: [
      '无限个人网站',
      '全部 15+ 款模板',
      '高级 AI 助手',
      '✅ 自定义域名支持',
      '域名购买 9 折优惠',
      '高级数据分析',
      'SEO 优化',
      '密码保护页面',
      '优先客服支持',
      '导出 PDF / HTML',
    ],
    ctaText: '升级专业版',
  },
  {
    id: 'team',
    name: '团队版',
    description: '适合小团队和企业',
    icon: <Crown className="w-6 h-6" />,
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      '专业版全部功能',
      '最多 5 个团队成员',
      '团队协作功能',
      '品牌定制',
      '域名购买 8 折优惠',
      'API 接入',
      '专属客服',
      'SLA 保障',
      '数据导出',
    ],
    ctaText: '联系销售',
  },
];

export function PricingPage({ onNavigate }: PricingPageProps) {
  const { t } = useI18n();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [planToPurchase, setPlanToPurchase] = useState<{ plan: PlanType; cycle: BillingCycle } | null>(null);
  
  // Domain search states
  const [domainQuery, setDomainQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Array<{
    domain: string;
    available: boolean;
    price: number;
    tld: string;
  }> | null>(null);

  const handleSelectPlan = async (plan: PricingPlan) => {
    if (plan.id === 'free') {
      onNavigate('upload');
      return;
    }

    setSelectedPlan(plan.id);
    setPlanToPurchase({ plan: plan.id, cycle: billingCycle });
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (result: PaymentResult) => {
    setShowPaymentModal(false);
    setIsProcessing(false);
    // 支付成功后跳转到上传页面
    onNavigate('upload');
  };

  const getPrice = (plan: PricingPlan) => {
    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    const period = billingCycle === 'monthly' ? '/月' : '/年';
    return { price, period };
  };

  const yearlySavings = () => {
    const monthlyTotal = plans[1].monthlyPrice * 12;
    const yearlyTotal = plans[1].yearlyPrice;
    const savings = monthlyTotal - yearlyTotal;
    const percentage = Math.round((savings / monthlyTotal) * 100);
    return { savings, percentage };
  };

  // Handle domain search
  const handleDomainSearch = async () => {
    if (!domainQuery.trim()) return;
    
    setIsSearching(true);
    setSearchResults(null);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock search results
    const query = domainQuery.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    const results = domainPricing.tlds.map(tld => ({
      domain: `${query}${tld.suffix}`,
      available: Math.random() > 0.3, // 70% chance available
      price: tld.price,
      tld: tld.suffix,
    }));
    
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleSelectDomain = (domain: string) => {
    // In real implementation, this would add domain to cart or redirect to checkout
    alert(`已选择域名: ${domain}\n\n在实际部署中，这将跳转到支付页面。`);
  };

  return (
    <>
      {/* Payment Modal */}
      {planToPurchase && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setIsProcessing(false);
            setSelectedPlan(null);
          }}
          plan={planToPurchase.plan}
          billingCycle={planToPurchase.cycle}
          onSuccess={handlePaymentSuccess}
        />
      )}

      <div className="min-h-screen bg-[#faf8f5] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
            className="absolute left-4 top-20 text-stone-500 hover:text-stone-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回
          </Button>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full text-stone-600 text-sm font-medium mb-6 border border-stone-200">
            <Shield className="w-4 h-4" />
            <span>7 天无理由退款</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
            选择适合你的方案
          </h1>
          <p className="text-lg text-stone-500 max-w-xl mx-auto">
            从免费开始，随时升级。所有付费方案都支持 7 天无理由退款。
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-stone-700 font-medium' : 'text-stone-400'}`}>
              月付
            </span>
            <Switch
              checked={billingCycle === 'yearly'}
              onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
              className="data-[state=checked]:bg-stone-600"
            />
            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-stone-700 font-medium' : 'text-stone-400'}`}>
              年付
            </span>
            {billingCycle === 'yearly' && (
              <span className="px-2 py-1 bg-stone-600 text-white text-xs rounded-full">
                省 {yearlySavings().percentage}%
              </span>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const { price, period } = getPrice(plan);
            const isSelected = selectedPlan === plan.id;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`h-full relative overflow-hidden transition-all duration-300 ${
                    plan.highlighted
                      ? 'border-stone-600 shadow-lg scale-105'
                      : 'border-stone-200 hover:border-stone-300 hover:shadow-md'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-stone-700 to-stone-800 text-white text-center py-2 text-sm font-medium">
                      最受欢迎
                    </div>
                  )}

                  <CardContent className={`p-6 ${plan.highlighted ? 'pt-14' : ''}`}>
                    {/* Plan Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        plan.highlighted ? 'bg-stone-100 text-stone-700' : 'bg-stone-50 text-stone-500'
                      }`}>
                        {plan.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-stone-800">{plan.name}</h3>
                        <p className="text-sm text-stone-400">{plan.description}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-stone-800">
                          ¥{price}
                        </span>
                        <span className="text-stone-400">{period}</span>
                      </div>
                      {billingCycle === 'yearly' && plan.id !== 'free' && (
                        <p className="text-sm text-stone-500 mt-1">
                          相当于 ¥{Math.round(plan.yearlyPrice / 12)}/月
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            plan.highlighted ? 'text-stone-600' : 'text-stone-500'
                          }`} />
                          <span className="text-sm text-stone-600">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button
                      onClick={() => handleSelectPlan(plan)}
                      disabled={isProcessing && isSelected}
                      className={`w-full ${
                        plan.highlighted
                          ? 'bg-stone-700 hover:bg-stone-800 text-white'
                          : plan.id === 'free'
                          ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                          : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {isProcessing && isSelected ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          处理中...
                        </>
                      ) : (
                        plan.ctaText
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Domain Pricing Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-16 bg-white rounded-2xl border border-stone-200 p-8"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full text-stone-600 text-sm font-medium mb-4 border border-stone-200">
              <Globe className="w-4 h-4" />
              <span>自定义域名</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-800 mb-2">
              购买你的专属域名
            </h2>
            <p className="text-stone-500">
              专业版用户享 9 折，团队版用户享 8 折优惠
            </p>
          </div>

          {/* Domain Search */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  value={domainQuery}
                  onChange={(e) => setDomainQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleDomainSearch()}
                  placeholder="输入你想要的域名，如 yourname"
                  className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent"
                />
                {domainQuery && (
                  <button
                    onClick={() => { setDomainQuery(''); setSearchResults(null); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <Button 
                onClick={handleDomainSearch}
                disabled={isSearching || !domainQuery.trim()}
                className="bg-stone-700 hover:bg-stone-800 text-white px-6 disabled:opacity-50"
              >
                {isSearching ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    搜索
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
            
            {/* Search Results */}
            <AnimatePresence>
              {searchResults && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 bg-white rounded-xl border border-stone-200 shadow-lg overflow-hidden"
                >
                  <div className="p-3 bg-stone-50 border-b border-stone-200">
                    <span className="text-sm text-stone-500">
                      搜索结果: <span className="font-medium text-stone-800">{domainQuery}</span>
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {searchResults.map((result, index) => (
                      <div
                        key={result.domain}
                        className={`flex items-center justify-between p-4 ${
                          index !== searchResults.length - 1 ? 'border-b border-stone-100' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {result.available ? (
                            <CheckCircle2 className="w-5 h-5 text-stone-500" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-stone-300" />
                          )}
                          <div>
                            <span className={`font-medium ${result.available ? 'text-stone-800' : 'text-stone-400'}`}>
                              {result.domain}
                            </span>
                            {result.available && (
                              <span className="ml-2 text-xs text-stone-500">可注册</span>
                            )}
                            {!result.available && (
                              <span className="ml-2 text-xs text-stone-400">已被注册</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-stone-600 font-semibold">¥{result.price}/年</span>
                          {result.available && (
                            <Button
                              size="sm"
                              onClick={() => handleSelectDomain(result.domain)}
                              className="bg-stone-700 hover:bg-stone-800 text-white text-xs"
                            >
                              选择
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Domain Pricing Table */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {domainPricing.tlds.map((tld) => (
              <div
                key={tld.suffix}
                className={`p-4 rounded-xl border text-center transition-all hover:shadow-md ${
                  tld.popular
                    ? 'border-stone-600 bg-stone-50'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="font-bold text-stone-800 text-lg">{tld.suffix}</div>
                <div className="text-stone-600 font-semibold">¥{tld.price}/年</div>
                {tld.popular && (
                  <span className="inline-block mt-1 px-2 py-0.5 bg-stone-700 text-white text-xs rounded">
                    热门
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-stone-500">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-stone-500" />
              <span>免费隐私保护</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-stone-500" />
              <span>免费 SSL 证书</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-stone-500" />
              <span>自动 DNS 配置</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-stone-500" />
              <span>24小时生效</span>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-stone-800 text-center mb-8">常见问题</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: '可以随时取消订阅吗？',
                a: '是的，你可以随时取消订阅。取消后，你仍然可以使用付费功能直到当前计费周期结束。',
              },
              {
                q: '7 天退款政策是怎样的？',
                a: '如果你对服务不满意，可以在购买后 7 天内申请全额退款，无需说明理由。',
              },
              {
                q: '免费版有什么限制？',
                a: '免费版可以创建 1 个网站，使用 3 款基础模板，适合个人尝鲜使用。',
              },
              {
                q: '支持哪些支付方式？',
                a: '我们支持支付宝、微信支付、信用卡等多种支付方式。',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-stone-200 p-6">
                <h3 className="font-semibold text-stone-800 mb-2">{faq.q}</h3>
                <p className="text-sm text-stone-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="flex items-center justify-center gap-8 text-stone-400">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">安全支付</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span className="text-sm">7 天退款</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm">无需信用卡试用</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
}
