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
import { useI18n } from '@/i18n';

interface FAQPageProps {
  onNavigate: (page: string) => void;
}

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
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const faqs = [
    {
      category: t('faq.category.gettingStarted'),
      icon: <Sparkles className="w-5 h-5" />,
      questions: [
        { q: t('faq.gettingStarted.q1'), a: t('faq.gettingStarted.a1') },
        { q: t('faq.gettingStarted.q2'), a: t('faq.gettingStarted.a2') },
        { q: t('faq.gettingStarted.q3'), a: t('faq.gettingStarted.a3') },
      ]
    },
    {
      category: t('faq.category.features'),
      icon: <Zap className="w-5 h-5" />,
      questions: [
        { q: t('faq.features.q1'), a: t('faq.features.a1') },
        { q: t('faq.features.q2'), a: t('faq.features.a2') },
        { q: t('faq.features.q3'), a: t('faq.features.a3') },
        { q: t('faq.features.q4'), a: t('faq.features.a4') },
      ]
    },
    {
      category: t('faq.category.pricing'),
      icon: <FileText className="w-5 h-5" />,
      questions: [
        { q: t('faq.pricing.q1'), a: t('faq.pricing.a1') },
        { q: t('faq.pricing.q2'), a: t('faq.pricing.a2') },
        { q: t('faq.pricing.q3'), a: t('faq.pricing.a3') },
      ]
    },
    {
      category: t('faq.category.security'),
      icon: <Shield className="w-5 h-5" />,
      questions: [
        { q: t('faq.security.q1'), a: t('faq.security.a1') },
        { q: t('faq.security.q2'), a: t('faq.security.a2') },
        { q: t('faq.security.q3'), a: t('faq.security.a3') },
      ]
    },
    {
      category: t('faq.category.deployment'),
      icon: <Globe className="w-5 h-5" />,
      questions: [
        { q: t('faq.deployment.q1'), a: t('faq.deployment.a1') },
        { q: t('faq.deployment.q2'), a: t('faq.deployment.a2') },
        { q: t('faq.deployment.q3'), a: t('faq.deployment.a3') },
      ]
    }
  ];

  const filteredFaqs = activeCategory
    ? faqs.filter(f => f.category === activeCategory)
    : faqs;

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full text-stone-600 text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>{t('faq.helpCenter')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('faq.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('faq.subtitle')}
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
                ? 'bg-stone-700 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {t('common.all')}
          </button>
          {faqs.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                activeCategory === cat.category
                  ? 'bg-stone-700 text-white shadow-lg'
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
                  <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center">
                    <span className="text-stone-600">{category.icon}</span>
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
          <div className="bg-gradient-to-r from-stone-600 to-stone-700 rounded-2xl p-8 text-white">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-2">{t('faq.contact.title')}</h3>
            <p className="text-white/80 mb-6">
              {t('faq.contact.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="secondary"
                className="bg-white text-stone-600 hover:bg-gray-100"
                onClick={() => window.open('mailto:support@waveme.app')}
              >
                <Mail className="w-4 h-4 mr-2" />
                {t('faq.contact.email')}
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => onNavigate('home')}
              >
                {t('faq.backHome')}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
