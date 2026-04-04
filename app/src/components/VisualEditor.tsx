import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Palette, 
  Type, 
  Layout, 
  Sparkles, 
  Eye,
  Monitor,
  Smartphone,
  Tablet,
  Check,
  Undo,
  Redo,
  Download
} from 'lucide-react';
import { AIChatAssistant } from './AIChatAssistant';
import { templatesV2, generateTemplateHTMLV2 } from '@/services/templates-v2';
import type { ResumeData } from '@/types';

interface VisualEditorProps {
  resumeData: ResumeData;
  initialTemplate: string;
  onExport: (html: string) => void;
}

// 配色方案预设
const colorPresets = {
  morandi: {
    primary: '#c9b8a8',
    secondary: '#a8b5c9',
    background: '#f5f3f0',
    text: '#5a5a5a',
    accent: '#d4c4b5',
  },
  ocean: {
    primary: '#0066cc',
    secondary: '#0099ff',
    background: '#f0f8ff',
    text: '#1a3a5c',
    accent: '#00ccff',
  },
  forest: {
    primary: '#2d5a3d',
    secondary: '#4a7c59',
    background: '#f5faf6',
    text: '#1e3d2f',
    accent: '#7cb342',
  },
  sunset: {
    primary: '#ff6b35',
    secondary: '#f7931e',
    background: '#fff8f5',
    text: '#4a2c1d',
    accent: '#ffcc00',
  },
  cyberpunk: {
    primary: '#ff00ff',
    secondary: '#00ffff',
    background: '#0a0014',
    text: '#ffffff',
    accent: '#ffff00',
  },
  monochrome: {
    primary: '#1a1a1a',
    secondary: '#4a4a4a',
    background: '#ffffff',
    text: '#1a1a1a',
    accent: '#888888',
  },
};

// 字体预设
const fontPresets = {
  modern: { heading: 'Inter', body: 'Inter' },
  classic: { heading: 'Playfair Display', body: 'Source Sans Pro' },
  tech: { heading: 'JetBrains Mono', body: 'JetBrains Mono' },
  playful: { heading: 'Poppins', body: 'Comic Neue' },
  elegant: { heading: 'Cormorant Garamond', body: 'Lato' },
};

// 间距预设
const spacingPresets = {
  compact: '0.75rem',
  normal: '1rem',
  relaxed: '1.5rem',
  spacious: '2rem',
};

// 圆角预设
const radiusPresets = {
  sharp: '0px',
  slight: '4px',
  normal: '8px',
  rounded: '16px',
  pill: '9999px',
};

type TabType = 'template' | 'color' | 'typography' | 'layout' | 'effects';

export function VisualEditor({ resumeData, initialTemplate, onExport }: VisualEditorProps) {
  const [activeTab, setActiveTab] = useState<TabType>('template');
  const [selectedTemplate, setSelectedTemplate] = useState(initialTemplate);
  const [colors, setColors] = useState(colorPresets.ocean);
  const [fonts, setFonts] = useState(fontPresets.modern);
  const [spacing, setSpacing] = useState('normal');
  const [radius, setRadius] = useState('normal');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showPreview, setShowPreview] = useState(true);
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // 生成预览 HTML
  const previewHTML = generateTemplateHTMLV2(
    selectedTemplate,
    resumeData,
    colors,
    ['home', 'about', 'projects', 'skills', 'contact']
  );

  // 应用 AI 建议
  const handleApplySuggestion = (suggestion: string) => {
    if (suggestion.startsWith('apply_color:')) {
      const colorKey = suggestion.replace('apply_color:', '') as keyof typeof colorPresets;
      if (colorPresets[colorKey]) {
        saveToHistory();
        setColors(colorPresets[colorKey]);
      }
    } else if (suggestion.startsWith('apply_font:')) {
      const fontKey = suggestion.replace('apply_font:', '') as keyof typeof fontPresets;
      if (fontPresets[fontKey]) {
        saveToHistory();
        setFonts(fontPresets[fontKey]);
      }
    } else if (suggestion.startsWith('apply_layout:')) {
      // 布局切换逻辑
      saveToHistory();
      // 这里可以切换不同的模板变体
    }
  };

  // 保存到历史
  const saveToHistory = () => {
    const state = { colors, fonts, spacing, radius, selectedTemplate };
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(state);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // 撤销
  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setColors(prevState.colors);
      setFonts(prevState.fonts);
      setSpacing(prevState.spacing);
      setRadius(prevState.radius);
      setSelectedTemplate(prevState.selectedTemplate);
      setHistoryIndex(historyIndex - 1);
    }
  };

  // 重做
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setColors(nextState.colors);
      setFonts(nextState.fonts);
      setSpacing(nextState.spacing);
      setRadius(nextState.radius);
      setSelectedTemplate(nextState.selectedTemplate);
      setHistoryIndex(historyIndex + 1);
    }
  };

  // 导出
  const handleExport = () => {
    onExport(previewHTML);
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'template', label: '模板', icon: <Layout className="w-4 h-4" /> },
    { id: 'color', label: '配色', icon: <Palette className="w-4 h-4" /> },
    { id: 'typography', label: '字体', icon: <Type className="w-4 h-4" /> },
    { id: 'layout', label: '布局', icon: <Monitor className="w-4 h-4" /> },
    { id: 'effects', label: '动效', icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="h-16 bg-white border-b flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold text-lg">可视化编辑器</h1>
          <div className="h-6 w-px bg-gray-200" />
          <div className="flex items-center gap-2">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-30"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-30"
            >
              <Redo className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Preview Mode Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`p-2 rounded-md transition-colors ${previewMode === 'desktop' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewMode('tablet')}
              className={`p-2 rounded-md transition-colors ${previewMode === 'tablet' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`p-2 rounded-md transition-colors ${previewMode === 'mobile' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <div className="h-6 w-px bg-gray-200" />

          <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
            <Eye className="w-4 h-4 mr-2" />
            {showPreview ? '隐藏预览' : '显示预览'}
          </Button>

          <Button onClick={handleExport} className="bg-gradient-to-r from-cyan-500 to-blue-500">
            <Download className="w-4 h-4 mr-2" />
            导出
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Editor */}
        <div className="w-80 bg-white border-r flex flex-col">
          {/* Tabs */}
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-cyan-600 border-b-2 border-cyan-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <AnimatePresence mode="wait">
              {activeTab === 'template' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <h3 className="font-medium text-gray-900">选择模板</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {templatesV2.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => {
                          saveToHistory();
                          setSelectedTemplate(template.id);
                        }}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                          selectedTemplate === template.id
                            ? 'border-cyan-500 ring-2 ring-cyan-500/20'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div 
                          className="absolute inset-0"
                          style={{ background: `linear-gradient(135deg, ${template.colors.primary}33, ${template.colors.secondary}33)` }}
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                          <span className="text-xs font-medium text-gray-700 text-center">
                            {template.name}
                          </span>
                          <span className="text-[10px] text-gray-500 mt-1">
                            {template.category}
                          </span>
                        </div>
                        {selectedTemplate === template.id && (
                          <div className="absolute top-1 right-1 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'color' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <h3 className="font-medium text-gray-900">配色方案</h3>
                  <div className="space-y-3">
                    {Object.entries(colorPresets).map(([key, preset]) => (
                      <button
                        key={key}
                        onClick={() => {
                          saveToHistory();
                          setColors(preset);
                        }}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                          JSON.stringify(colors) === JSON.stringify(preset)
                            ? 'border-cyan-500 bg-cyan-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex gap-1">
                          <div 
                            className="w-6 h-6 rounded-full border border-gray-200"
                            style={{ background: preset.primary }}
                          />
                          <div 
                            className="w-6 h-6 rounded-full border border-gray-200"
                            style={{ background: preset.secondary }}
                          />
                          <div 
                            className="w-6 h-6 rounded-full border border-gray-200"
                            style={{ background: preset.accent }}
                          />
                        </div>
                        <span className="text-sm font-medium capitalize">{key}</span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">自定义颜色</h4>
                    <div className="space-y-3">
                      {Object.entries(colors).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 capitalize">{key}</span>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={value}
                              onChange={(e) => {
                                saveToHistory();
                                setColors(prev => ({ ...prev, [key]: e.target.value }));
                              }}
                              className="w-8 h-8 rounded cursor-pointer"
                            />
                            <span className="text-xs text-gray-400 w-16">{value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'typography' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <h3 className="font-medium text-gray-900">字体风格</h3>
                  <div className="space-y-2">
                    {Object.entries(fontPresets).map(([key, preset]) => (
                      <button
                        key={key}
                        onClick={() => {
                          saveToHistory();
                          setFonts(preset);
                        }}
                        className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                          JSON.stringify(fonts) === JSON.stringify(preset)
                            ? 'border-cyan-500 bg-cyan-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span 
                          className="text-lg font-medium block"
                          style={{ fontFamily: preset.heading }}
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </span>
                        <span 
                          className="text-sm text-gray-500"
                          style={{ fontFamily: preset.body }}
                        >
                          {preset.heading} + {preset.body}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'layout' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <h3 className="font-medium text-gray-900">间距</h3>
                  <div className="space-y-2">
                    {Object.keys(spacingPresets).map((key) => (
                      <button
                        key={key}
                        onClick={() => {
                          saveToHistory();
                          setSpacing(key);
                        }}
                        className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                          spacing === key
                            ? 'border-cyan-500 bg-cyan-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="font-medium capitalize">{key}</span>
                      </button>
                    ))}
                  </div>

                  <h3 className="font-medium text-gray-900 pt-4">圆角</h3>
                  <div className="space-y-2">
                    {Object.entries(radiusPresets).map(([key, value]) => (
                      <button
                        key={key}
                        onClick={() => {
                          saveToHistory();
                          setRadius(key);
                        }}
                        className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                          radius === key
                            ? 'border-cyan-500 bg-cyan-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div 
                          className="w-8 h-8 bg-gray-200"
                          style={{ borderRadius: value }}
                        />
                        <span className="font-medium capitalize">{key}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'effects' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <h3 className="font-medium text-gray-900">动画效果</h3>
                  <div className="space-y-2">
                    {[
                      { label: '淡入效果', value: 'fade' },
                      { label: '滑动效果', value: 'slide' },
                      { label: '缩放效果', value: 'scale' },
                      { label: '视差滚动', value: 'parallax' },
                      { label: '粒子背景', value: 'particles' },
                    ].map((effect) => (
                      <button
                        key={effect.value}
                        className="w-full p-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-left transition-all"
                      >
                        {effect.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right - Preview */}
        {showPreview && (
          <div className="flex-1 bg-gray-100 p-8 overflow-auto">
            <div 
              className={`mx-auto bg-white shadow-2xl transition-all duration-300 ${
                previewMode === 'desktop' ? 'w-full max-w-5xl' :
                previewMode === 'tablet' ? 'w-[768px]' :
                'w-[375px]'
              }`}
              style={{ minHeight: '80vh' }}
            >
              <iframe
                srcDoc={previewHTML}
                className="w-full h-full min-h-[80vh]"
                title="Preview"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        )}
      </div>

      {/* AI Chat Assistant */}
      <AIChatAssistant 
        onApplySuggestion={handleApplySuggestion}
      />
    </div>
  );
}
