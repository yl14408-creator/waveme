import { useI18n, type Language } from '@/i18n';
import { Globe, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'zh', name: '简体中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = languages.find(l => l.code === language);

  return (
    <div ref={containerRef} className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-stone-600 hover:text-stone-800 hover:bg-stone-100 transition-colors"
        title={t('common.language')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLang?.flag}</span>
        <span className="hidden md:inline">{currentLang?.name}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-stone-200 py-2 z-50"
          >
            {languages.map((lang, index) => (
              <motion.button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-stone-50 transition-colors ${
                  language === lang.code ? 'text-stone-800 bg-stone-100' : 'text-stone-600'
                }`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 4 }}
              >
                <span className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </span>
                {language === lang.code && <Check className="w-4 h-4" />}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
