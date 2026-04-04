import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  HelpCircle, 
  MessageCircle,
  Mail,
  FileText,
  Sparkles,
  Zap,
  Shield,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FAQPageProps {
  onNavigate: (page: string) => void;
}

const faqs = [
  {
    category: '入门',
    icon: <Sparkles className="w-5 h-5" />,
    questions: [
      {
        q: 'Waveme 是什么？',
        a: 'Waveme 是一个个人品牌作品集平台，帮助求职者创建专业的个人网站。你可以上传简历，选择喜欢的模板，AI 会自动帮你生成一个精美的个人网站。核心概念是"投石问路，泛起涟漪"——你可以追踪谁访问了你的网站，了解他们的来源和兴趣点。'
      },
      {
        q: '如何开始使用 Waveme？',
        a: '非常简单！1) 点击"开始创建"按钮；2) 上传你的简历 PDF；3) 选择一个喜欢的模板；4) 编辑和完善内容；5) 一键部署上线。整个过程只需要几分钟。'
      },
      {
        q: '需要编程知识吗？',
        a: '完全不需要！Waveme 的设计理念就是让任何人都能轻松创建专业的个人网站。所有操作都是可视化的，就像编辑 PPT 一样简单。'
      }
    ]
  },
  {
    category: '功能',
    icon: <Zap className="w-5 h-5" />,
    questions: [
      {
        q: 'PDF 解析支持哪些格式？',
        a: '我们支持标准的 PDF 格式。请确保你的 PDF 中的文字可以被选中（不是扫描件图片）。常见的简历格式如中文、英文、中英文混合都可以很好地解析。'
      },
      {
        q: '可以自定义模板吗？',
        a: '当然可以！每个模板都支持自定义颜色、字体、布局等。专业版用户还可以访问更多高级自定义选项，包括自定义 CSS 和 JavaScript。'
      },
      {
        q: '数据看板能看到什么信息？',
        a: '你可以看到：总访问量、独立访客数、平均停留时间、访客来源（LinkedIn、邮件、直接访问等）、热门模块、地理位置分布、设备类型等。帮助你了解谁在关注你的简历。'
      },
      {
        q: '支持自定义域名吗？',
        a: '是的！专业版和企业版用户可以使用自己的域名。我们提供简单的域名配置向导，让你的个人网站看起来更专业。'
      }
    ]
  },
  {
    category: '定价',
    icon: <FileText className="w-5 h-5" />,
    questions: [
      {
        q: '免费版有什么限制？',
        a: '免费版可以创建一个个人网站，使用 5 个基础模板，获得基础的数据统计。网站会显示 Waveme 的品牌标识。适合想要尝试的用户。'
      },
      {
        q: '如何升级到付费版？',
        a: '点击导航栏的"定价"按钮，选择适合你的套餐。我们支持支付宝、微信支付和信用卡。升级后立即解锁所有功能。'
      },
      {
        q: '可以退款吗？',
        a: '我们提供 14 天无理由退款保证。如果你对我们的服务不满意，可以在购买后 14 天内申请全额退款。'
      }
    ]
  },
  {
    category: '安全',
    icon: <Shield className="w-5 h-5" />,
    questions: [
      {
        q: '我的数据安全吗？',
        a: '绝对安全。我们使用银行级别的加密技术保护你的数据。你的简历和个人信息只会用于生成个人网站，绝不会出售给第三方。'
      },
      {
        q: '可以删除我的数据吗？',
        a: '随时可以。在账户设置中，你可以一键删除所有数据。删除后数据将无法恢复，请谨慎操作。'
      },
      {
        q: '网站会被搜索引擎收录吗？',
        a: '默认情况下，个人网站允许搜索引擎收录。如果你希望保持隐私，可以在设置中关闭搜索引擎索引。'
      }
    ]
  },
  {
    category: '部署',
    icon: <Globe className="w-5 h-5" />,
    questions: [
      {
        q: '如何部署我的网站？',
        a: 'Waveme 提供一键部署功能。完成编辑后，点击"发布"按钮，你的网站就会在几秒钟内上线。我们会提供一个 waveme.app 的子域名。'
      },
      {
        q: '可以导出网站代码吗？',
        a: '专业版和企业版用户可以导出完整的 HTML/CSS/JavaScript 代码，然后部署到自己的服务器或 Vercel、Netlify 等平台。'
      },
      {
        q: '网站加载速度快吗？',
        a: '我们的网站托管在全球 CDN 上，确保世界各地的用户都能快速访问。平均加载时间小于 1 秒。'
      }
    ]
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors px-2 rounded-lg"
      >
        <span className="font-medium text-gray-900 pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-gray-600 leading-relaxed px-2">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQPage({ onNavigate }: FAQPageProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredFaqs = activeCategory 
    ? faqs.filter(f => f.category === activeCategory)
    : faqs;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50/50 to-white pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 rounded-full text-cyan-600 text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>帮助中心</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            常见问题
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            找不到答案？随时联系我们的客服团队
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
              activeCategory === null
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            全部
          </button>
          {faqs.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                activeCategory === cat.category
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {cat.icon}
              {cat.category}
            </button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {filteredFaqs.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                    <span className="text-cyan-600">{category.icon}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{category.category}</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-2">
                  {category.questions.map((item, qIndex) => (
                    <FAQItem key={qIndex} question={item.q} answer={item.a} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-8 text-white">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-2">还有其他问题？</h3>
            <p className="text-white/80 mb-6">
              我们的客服团队随时为你解答
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="secondary"
                className="bg-white text-cyan-600 hover:bg-gray-100"
                onClick={() => window.open('mailto:support@waveme.app')}
              >
                <Mail className="w-4 h-4 mr-2" />
                发送邮件
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => onNavigate('home')}
              >
                返回首页
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
