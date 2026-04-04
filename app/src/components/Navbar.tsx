import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles, Layers, HelpCircle, User, Droplets, FileUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/i18n/index.tsx';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const { t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t('nav.home') || '首页' },
    { id: 'templates', label: t('nav.templates') || '模板' },
    { id: 'components', label: t('nav.components') || '组件', icon: <Layers className="w-4 h-4" /> },
    { id: 'pricing', label: t('nav.pricing') || '定价' },
    { id: 'faq', label: t('nav.faq') || '帮助', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-stone-200/50 border-b border-stone-200'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="w-10 h-10 bg-gradient-to-br from-stone-600 via-stone-700 to-stone-800 rounded-xl flex items-center justify-center shadow-lg shadow-stone-600/20"
                whileHover={{ rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Droplets className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold text-stone-800">
                waveme
              </span>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full flex items-center gap-1.5 ${
                    currentPage === item.id
                      ? 'text-stone-800'
                      : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  {item.label}
                  {currentPage === item.id && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-stone-100 rounded-full -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher />
              <motion.button
                onClick={() => onNavigate('auth')}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-800 hover:bg-stone-100 rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-4 h-4" />
                {t('common.login') || '登录'}
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => onNavigate('upload')}
                  className="bg-stone-700 hover:bg-stone-800 text-white rounded-full px-6 shadow-lg shadow-stone-700/20 hover:shadow-xl hover:shadow-stone-700/30 transition-all flex items-center gap-2"
                >
                  <FileUp className="w-4 h-4" />
                  {t('common.startFree') || '上传简历'}
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-xl hover:bg-stone-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-stone-800" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-stone-800" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-20 z-40 md:hidden"
          >
            <motion.div 
              className="mx-4 p-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-stone-200"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-2 ${
                      currentPage === item.id
                        ? 'bg-stone-100 text-stone-800'
                        : 'text-stone-500 hover:bg-stone-50'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.icon}
                    {item.label}
                  </motion.button>
                ))}
                <div className="pt-2 border-t border-stone-200 mt-2 space-y-2">
                  <div className="px-4 py-2">
                    <LanguageSwitcher />
                  </div>
                  <motion.button
                    onClick={() => {
                      onNavigate('auth');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <User className="w-4 h-4" />
                    {t('common.login') || '登录'}
                  </motion.button>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      onClick={() => {
                        onNavigate('upload');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-stone-700 hover:bg-stone-800 text-white rounded-xl flex items-center gap-2"
                    >
                      <FileUp className="w-4 h-4" />
                      {t('common.startFree') || '上传简历'}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
