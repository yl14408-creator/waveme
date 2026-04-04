import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Check, 
  Eye, 
  ArrowRight, 
  Palette,
  Code2,
  Paintbrush,
  Briefcase,
  GraduationCap,
  Sparkles,
  X,
  ExternalLink,
  Monitor,
  Smartphone,
  Tablet,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { templatesV2, generateTemplateHTMLV2, type TemplateV2 } from '@/services/templates-v2';
import type { ResumeData } from '@/types';
import { useI18n } from '@/i18n';

interface TemplatePageProps {
  onNavigate: (page: string) => void;
  resumeData: ResumeData | null;
  onSelectTemplate: (template: string) => void;
  selectedTemplate: string;
}

// 水墨风格的颜色映射 - 将荧光色转换为柔和色调
const getMutedColor = (color: string): string => {
  const colorMap: Record<string, string> = {
    '#00ff88': '#6b8e6b', // 荧光绿 -> 柔和绿
    '#00d4ff': '#6b8a9a', // 荧光蓝 -> 柔和蓝
    '#ff00ff': '#9a6b8a', // 荧光紫 -> 柔和紫
    '#ff6b00': '#9a7a6b', // 荧光橙 -> 柔和棕
    '#ffff00': '#9a9a6b', // 荧光黄 -> 柔和黄
    '#00ffff': '#6b9a9a', // 荧光青 -> 柔和青
    '#ff0080': '#9a6b7a', // 荧光粉 -> 柔和粉
    '#80ff00': '#7a9a6b', // 荧光黄绿 -> 柔和绿
    '#ff4040': '#9a6b6b', // 荧光红 -> 柔和红
    '#4080ff': '#6b7a9a', // 亮蓝 -> 柔和蓝
  };
  return colorMap[color.toLowerCase()] || color;
};

export function TemplatePage({ 
  onNavigate, 
  resumeData, 
  onSelectTemplate,
  selectedTemplate 
}: TemplatePageProps) {
  const { t, language } = useI18n();
  const [previewTemplate, setPreviewTemplate] = useState<TemplateV2 | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // 根据语言获取分类名称
  const getCategoryName = (id: string) => {
    const names: Record<string, Record<string, string>> = {
      all: { zh: '全部', en: 'All' },
      tech: { zh: '技术极客', en: 'Tech' },
      design: { zh: '设计师', en: 'Design' },
      business: { zh: '商务精英', en: 'Business' },
      creative: { zh: '创意工作者', en: 'Creative' },
      academic: { zh: '学术研究者', en: 'Academic' },
    };
    return names[id]?.[language] || names[id]?.zh || id;
  };

  const categories = [
    { id: 'all', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'tech', icon: <Code2 className="w-4 h-4" /> },
    { id: 'design', icon: <Paintbrush className="w-4 h-4" /> },
    { id: 'business', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'creative', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'academic', icon: <GraduationCap className="w-4 h-4" /> },
  ];

  const filteredTemplates = activeCategory === 'all' 
    ? templatesV2 
    : templatesV2.filter(t => t.category === activeCategory);

  const handlePreview = (template: TemplateV2) => {
    setPreviewTemplate(template);
  };

  const handleSelect = (templateId: string) => {
    onSelectTemplate(templateId);
  };

  const handleContinue = () => {
    onNavigate('editor');
  };

  if (previewTemplate && resumeData) {
    const previewHTML = generateTemplateHTMLV2(previewTemplate.id, resumeData);
    
    const frameWidth = {
      desktop: '100%',
      tablet: '768px',
      mobile: '375px'
    }[viewMode];

    return (
      <div className="min-h-screen bg-stone-100 pt-20">
        {/* Preview Header */}
        <motion.div 
          className="bg-white border-b border-stone-200 sticky top-16 z-40"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    onClick={() => setPreviewTemplate(null)}
                    className="border-stone-300"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'Back' : '返回'}
                  </Button>
                </motion.div>
                <div>
                  <h2 className="font-semibold text-stone-800">{previewTemplate.name}</h2>
                  <p className="text-sm text-stone-500">{previewTemplate.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 bg-stone-100 rounded-lg p-1">
                  {(['desktop', 'tablet', 'mobile'] as const).map((mode) => (
                    <motion.button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`p-2 rounded transition-colors ${viewMode === mode ? 'bg-white shadow-sm' : 'hover:bg-stone-200'}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {mode === 'desktop' && <Monitor className="w-4 h-4" />}
                      {mode === 'tablet' && <Tablet className="w-4 h-4" />}
                      {mode === 'mobile' && <Smartphone className="w-4 h-4" />}
                    </motion.button>
                  ))}
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => {
                      handleSelect(previewTemplate.id);
                      onNavigate('editor');
                    }}
                    className="bg-stone-700 hover:bg-stone-800 text-white"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'Use This Template' : '使用此模板'}
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Preview Frame */}
        <div className="p-8 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 border border-stone-200"
            style={{ width: frameWidth, maxWidth: '100%' }}
          >
            <iframe
              srcDoc={previewHTML}
              className="w-full h-[calc(100vh-280px)]"
              title="Template Preview"
              sandbox="allow-scripts"
            />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full text-stone-600 text-sm font-medium mb-6 border border-stone-200"
            whileHover={{ scale: 1.05 }}
          >
            <Palette className="w-4 h-4" />
            <span>{language === 'en' ? '15+ Curated Templates' : '15+ 精选模板'}</span>
          </motion.span>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-stone-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {language === 'en' ? 'Find Your Style' : '找到属于你的风格'}
          </motion.h1>
          <motion.p 
            className="text-xl text-stone-500 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {language === 'en' 
              ? 'Pixel, doodle, minimal, cyberpunk... there\'s one that expresses you' 
              : '像素风、涂鸦风、极简风、赛博朋克... 总有一款能表达你'}
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat, index) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-stone-700 text-white shadow-lg'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.icon}
              {getCategoryName(cat.id)}
            </motion.button>
          ))}
        </motion.div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <AnimatePresence mode="wait">
            {filteredTemplates.map((template, index) => {
              const isSelected = selectedTemplate === template.id;
              const mutedPrimary = getMutedColor(template.colors.primary);
              const mutedSecondary = getMutedColor(template.colors.secondary);

              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ delay: index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8 }}
                >
                  <Card
                    className={`h-full cursor-pointer transition-all overflow-hidden border-stone-200 ${
                      isSelected
                        ? 'ring-2 ring-stone-600 shadow-xl'
                        : 'hover:shadow-xl hover:border-stone-300'
                    }`}
                  >
                    <CardContent className="p-0">
                      {/* Preview Area - 更真实的网站预览 */}
                      <motion.div 
                        className="h-72 relative group"
                        style={{ 
                          background: `linear-gradient(135deg, ${mutedPrimary}08, ${mutedSecondary}08)` 
                        }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* 模拟真实网站预览 */}
                        <div className="absolute inset-3 bg-white rounded-lg shadow-md overflow-hidden border border-stone-100">
                          {/* 浏览器顶部 */}
                          <div 
                            className="h-8 flex items-center px-3 gap-2"
                            style={{ background: `linear-gradient(to right, ${mutedPrimary}, ${mutedSecondary})` }}
                          >
                            <div className="flex gap-1.5">
                              <div className="w-3 h-3 rounded-full bg-white/40" />
                              <div className="w-3 h-3 rounded-full bg-white/40" />
                              <div className="w-3 h-3 rounded-full bg-white/40" />
                            </div>
                            <div className="flex-1 mx-3">
                              <div className="h-5 bg-white/20 rounded-md text-[9px] flex items-center justify-center text-white/70 font-mono">
                                {template.name.toLowerCase().replace(/\s+/g, '')}.com
                              </div>
                            </div>
                          </div>
                          
                          {/* 网站主体内容预览 */}
                          <div className="p-3 space-y-2.5">
                            {/* Hero区域 - 头像和名字 */}
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-10 h-10 rounded-full shadow-sm"
                                style={{ backgroundColor: mutedPrimary }}
                              />
                              <div className="flex-1 space-y-1.5">
                                <div 
                                  className="h-3 w-24 rounded"
                                  style={{ backgroundColor: mutedPrimary }}
                                />
                                <div 
                                  className="h-2 w-16 rounded"
                                  style={{ backgroundColor: `${mutedSecondary}80` }}
                                />
                              </div>
                            </div>
                            
                            {/* 简介文字 */}
                            <div className="space-y-1">
                              <div className="h-2 w-full rounded bg-stone-200" />
                              <div className="h-2 w-5/6 rounded bg-stone-200" />
                              <div className="h-2 w-4/5 rounded bg-stone-200" />
                            </div>
                            
                            {/* 技能标签 */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {['React', 'TypeScript', 'Node.js', 'Design'].map((tag, i) => (
                                <div 
                                  key={i}
                                  className="px-2 py-1 rounded text-[8px] font-medium text-white"
                                  style={{ backgroundColor: i % 2 === 0 ? mutedPrimary : mutedSecondary }}
                                >
                                  {tag}
                                </div>
                              ))}
                            </div>
                            
                            {/* 项目卡片 */}
                            <div className="grid grid-cols-2 gap-2 pt-1">
                              <div 
                                className="h-14 rounded p-2"
                                style={{ backgroundColor: `${mutedPrimary}12` }}
                              >
                                <div 
                                  className="h-2 w-12 rounded mb-1"
                                  style={{ backgroundColor: mutedPrimary }}
                                />
                                <div className="h-1.5 w-full rounded bg-stone-200" />
                                <div className="h-1.5 w-3/4 rounded bg-stone-200 mt-0.5" />
                              </div>
                              <div 
                                className="h-14 rounded p-2"
                                style={{ backgroundColor: `${mutedSecondary}12` }}
                              >
                                <div 
                                  className="h-2 w-12 rounded mb-1"
                                  style={{ backgroundColor: mutedSecondary }}
                                />
                                <div className="h-1.5 w-full rounded bg-stone-200" />
                                <div className="h-1.5 w-3/4 rounded bg-stone-200 mt-0.5" />
                              </div>
                            </div>
                            
                            {/* 底部按钮 */}
                            <div className="flex gap-2 pt-1">
                              <div 
                                className="flex-1 h-6 rounded flex items-center justify-center"
                                style={{ backgroundColor: mutedPrimary }}
                              >
                                <div className="h-2 w-16 rounded bg-white/40" />
                              </div>
                              <div 
                                className="flex-1 h-6 rounded flex items-center justify-center border"
                                style={{ borderColor: mutedSecondary }}
                              >
                                <div 
                                  className="h-2 w-16 rounded"
                                  style={{ backgroundColor: `${mutedSecondary}60` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Hover Overlay */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/40 to-transparent flex items-end justify-center pb-6"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex gap-3">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="secondary"
                                onClick={() => handlePreview(template)}
                                className="bg-white text-stone-800 hover:bg-stone-100"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                {language === 'en' ? 'Preview' : '预览'}
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="secondary"
                                onClick={() => handlePreview(template)}
                                className="bg-white/90 text-stone-800 hover:bg-white"
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                {language === 'en' ? 'View Example' : '查看示例'}
                              </Button>
                            </motion.div>
                          </div>
                        </motion.div>

                        {/* Selected Badge */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div 
                              className="absolute top-3 right-3 w-8 h-8 bg-stone-700 rounded-full flex items-center justify-center shadow-lg"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              transition={{ type: 'spring', stiffness: 300 }}
                            >
                              <Check className="w-5 h-5 text-white" />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Style Tag */}
                        <div className="absolute top-3 left-3">
                          <span 
                            className="px-2.5 py-1 rounded-full text-xs font-medium text-white shadow-sm"
                            style={{ backgroundColor: mutedPrimary }}
                          >
                            {template.style}
                          </span>
                        </div>
                      </motion.div>

                      {/* Info Area */}
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-bold text-stone-800">{template.name}</h3>
                          <span className="text-xs text-stone-500 capitalize">{template.category}</span>
                        </div>
                        <p className="text-sm text-stone-600 mb-4">{template.description}</p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {template.features.slice(0, 3).map((feature, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-stone-100 text-stone-600 rounded text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              variant="outline"
                              className="w-full border-stone-300 text-stone-700"
                              onClick={() => handlePreview(template)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              {language === 'en' ? 'Preview' : '预览'}
                            </Button>
                          </motion.div>
                          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              className={`w-full ${
                                isSelected
                                  ? 'bg-stone-500 hover:bg-stone-600'
                                  : 'bg-stone-700 hover:bg-stone-800'
                              } text-white`}
                              onClick={() => handleSelect(template.id)}
                            >
                              {isSelected ? (
                                <>
                                  <Check className="w-4 h-4 mr-2" />
                                  {language === 'en' ? 'Selected' : '已选择'}
                                </>
                              ) : (
                                <>
                                  <Check className="w-4 h-4 mr-2" />
                                  {language === 'en' ? 'Select' : '选择'}
                                </>
                              )}
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={handleContinue}
              className="bg-stone-700 hover:bg-stone-800 text-white px-10 py-6 text-lg rounded-xl shadow-lg"
            >
              {language === 'en' ? 'Continue Editing' : '继续编辑'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
