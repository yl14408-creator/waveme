import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  Eye, 
  Edit3, 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench,
  FolderGit2,
  ArrowLeft,
  Check,
  Wand2,
  Sparkles,
  Palette
} from 'lucide-react';
import { motion } from 'framer-motion';
import { generateTemplateHTMLV2, downloadHTML } from '@/services/templates-v2';
import { AIAssistant, type AISuggestion } from '@/components/AIAssistant';
import { useI18n } from '@/i18n/index.tsx';
import type { ResumeData } from '@/types';
import { wavemeColors } from '@/styles/waveme-theme';

interface EditorPageProps {
  onNavigate: (page: string) => void;
  resumeData: ResumeData;
  template: string;
  onUpdateResumeData: (data: ResumeData) => void;
}

// 水墨风格配色选项
const inkThemeColors = [
  { name: '墨青', value: wavemeColors.ink[700], desc: '沉稳专业' },
  { name: '竹青', value: wavemeColors.nature.bamboo, desc: '清新自然' },
  { name: '石青', value: wavemeColors.accent.azurite, desc: '雅致深邃' },
  { name: '朱砂', value: wavemeColors.accent.cinnabar, desc: '点睛之笔' },
  { name: '水墨', value: wavemeColors.ink[600], desc: '经典素雅' },
  { name: '赭石', value: wavemeColors.accent.ochre, desc: '温暖古朴' },
];

export function EditorPage({ 
  onNavigate, 
  resumeData, 
  template,
  onUpdateResumeData 
}: EditorPageProps) {
  const { t } = useI18n();
  const [localData, setLocalData] = useState<ResumeData>(resumeData);
  const [activeTab, setActiveTab] = useState('preview');
  const [primaryColor, setPrimaryColor] = useState(wavemeColors.ink[700]);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [appliedSuggestions, setAppliedSuggestions] = useState<string[]>([]);

  const handleUpdate = (field: keyof ResumeData, value: unknown) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onUpdateResumeData(updated);
  };

  const handleExport = () => {
    const html = generateTemplateHTMLV2(template, localData, { primary: primaryColor });
    const filename = `${localData.name.replace(/\s+/g, '_')}_Portfolio.html`;
    downloadHTML(html, filename);
  };

  const handleAISuggestion = (suggestion: AISuggestion) => {
    // 检查是否已应用
    if (appliedSuggestions.includes(suggestion.title)) {
      return;
    }
    
    setAppliedSuggestions(prev => [...prev, suggestion.title]);
    
    // 根据建议类型应用不同的更新
    switch (suggestion.type) {
      case 'color':
        if (suggestion.data && typeof suggestion.data === 'object' && 'primary' in suggestion.data) {
          setPrimaryColor(suggestion.data.primary as string);
        }
        break;
      case 'content':
        // 可以在这里应用内容优化
        break;
      default:
        break;
    }
  };

  const previewHTML = generateTemplateHTMLV2(template, localData, { primary: primaryColor });

  return (
    <div className="min-h-screen bg-[#faf9f7] pt-16">
      {/* AI Assistant */}
      <AIAssistant
        isOpen={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
        onSuggestion={handleAISuggestion}
        currentTemplate={template}
      />

      {/* Header */}
      <div className="bg-white border-b border-[#e8e4df] sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => onNavigate('templates')}
                className="text-[#6a6a6a] hover:text-[#3d3d3d] hover:bg-[#f5f3f0]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('common.back') || '返回'}
              </Button>
              <div>
                <h2 className="font-semibold text-[#3d3d3d]">{t('editor.title') || '编辑器'}</h2>
                <p className="text-sm text-[#8c8c8c]">{t('editor.subtitle') || '编辑你的个人网站'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowAIAssistant(true)}
                className="bg-gradient-to-r from-[#4a7c8c] to-[#5a8c9c] text-white border-0 hover:from-[#3a6c7c] hover:to-[#4a7c8c]"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                AI {t('ai.feature.optimize') || '优化'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveTab('preview')}
                className={activeTab === 'preview' ? 'bg-[#f0f5f3] border-[#4a7c8c] text-[#4a7c8c]' : 'border-[#d8d4cf]'}
              >
                <Eye className="w-4 h-4 mr-2" />
                {t('editor.tab.preview') || '预览'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveTab('edit')}
                className={activeTab === 'edit' ? 'bg-[#f0f5f3] border-[#4a7c8c] text-[#4a7c8c]' : 'border-[#d8d4cf]'}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                {t('editor.tab.edit') || '编辑'}
              </Button>
              <Button
                onClick={handleExport}
                className="bg-gradient-to-r from-[#7a9a7c] to-[#8aaa8c] text-white hover:from-[#6a8a6c] hover:to-[#7a9a7c]"
              >
                <Download className="w-4 h-4 mr-2" />
                {t('editor.export') || '导出'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Applied Suggestions Banner */}
      {appliedSuggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#f0f5f3] to-[#f5f8f5] border-b border-[#d8e4df]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2 text-sm text-[#4a7c8c]">
              <Sparkles className="w-4 h-4" />
              <span>AI 已应用：</span>
              <div className="flex gap-2">
                {appliedSuggestions.map((s, i) => (
                  <span key={i} className="px-2 py-0.5 bg-[#e8f0ec] rounded-full text-xs text-[#3a6c7c]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'preview' ? (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Settings Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="bg-white rounded-xl shadow-sm border border-[#e8e4df] p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold text-[#3d3d3d] mb-4 flex items-center gap-2">
                      <Palette className="w-4 h-4 text-[#4a7c8c]" />
                      {t('editor.settings.appearance') || '外观设置'}
                    </h3>
                    <div>
                      <Label className="text-sm text-[#6a6a6a] mb-3 block">
                        {t('editor.settings.themeColor') || '主题配色'}
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {inkThemeColors.map((color) => (
                          <button
                            key={color.value}
                            onClick={() => setPrimaryColor(color.value)}
                            className={`flex items-center gap-2 p-2 rounded-lg border transition-all ${
                              primaryColor === color.value
                                ? 'border-[#4a7c8c] bg-[#f0f5f3]'
                                : 'border-[#e8e4df] hover:border-[#d8d4cf] hover:bg-[#faf9f7]'
                            }`}
                          >
                            <div
                              className="w-6 h-6 rounded-full border border-[#e8e4df]"
                              style={{ backgroundColor: color.value }}
                            />
                            <div className="text-left">
                              <span className="text-xs font-medium text-[#3d3d3d] block">{color.name}</span>
                              <span className="text-[10px] text-[#8c8c8c]">{color.desc}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#e8e4df] pt-4">
                    <h3 className="font-semibold text-[#3d3d3d] mb-4">{t('editor.settings.overview') || '概览'}</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#8c8c8c]">{t('editor.settings.name') || '姓名'}</span>
                        <span className="font-medium text-[#3d3d3d]">{localData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8c8c8c]">{t('editor.settings.title') || '职位'}</span>
                        <span className="font-medium text-[#3d3d3d]">{localData.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8c8c8c]">{t('editor.settings.experience') || '工作经历'}</span>
                        <span className="font-medium text-[#3d3d3d]">{localData.experience.length} {t('common.items') || '项'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8c8c8c]">{t('editor.settings.skills') || '技能'}</span>
                        <span className="font-medium text-[#3d3d3d]">{localData.skills.length} {t('common.items') || '项'}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => onNavigate('dashboard')}
                    className="w-full bg-gradient-to-r from-[#4a7c8c] to-[#5a8c9c] text-white hover:from-[#3a6c7c] hover:to-[#4a7c8c]"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    {t('editor.finish') || '完成编辑'}
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Preview */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg border border-[#e8e4df] overflow-hidden"
              >
                <iframe
                  srcDoc={previewHTML}
                  className="w-full h-[800px]"
                  title="Preview"
                  sandbox="allow-scripts"
                />
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-5 bg-[#f5f3f0]">
                  <TabsTrigger 
                    value="basic"
                    className="data-[state=active]:bg-white data-[state=active]:text-[#4a7c8c]"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {t('editor.settings.name') || '基本信息'}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="experience"
                    className="data-[state=active]:bg-white data-[state=active]:text-[#4a7c8c]"
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    {t('editor.settings.experience') || '工作经历'}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="education"
                    className="data-[state=active]:bg-white data-[state=active]:text-[#4a7c8c]"
                  >
                    <GraduationCap className="w-4 h-4 mr-2" />
                    {t('nav.education') || '教育'}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="skills"
                    className="data-[state=active]:bg-white data-[state=active]:text-[#4a7c8c]"
                  >
                    <Wrench className="w-4 h-4 mr-2" />
                    {t('editor.settings.skills') || '技能'}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="projects"
                    className="data-[state=active]:bg-white data-[state=active]:text-[#4a7c8c]"
                  >
                    <FolderGit2 className="w-4 h-4 mr-2" />
                    {t('nav.projects') || '项目'}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="mt-6">
                  <div className="bg-white rounded-xl shadow-sm border border-[#e8e4df] p-6 space-y-6">
                    <h3 className="text-lg font-semibold text-[#3d3d3d]">{t('editor.settings.name') || '基本信息'}</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-[#6a6a6a]">{t('editor.settings.name') || '姓名'}</Label>
                        <Input
                          value={localData.name}
                          onChange={(e) => handleUpdate('name', e.target.value)}
                          className="mt-2 border-[#e8e4df] focus:border-[#4a7c8c] focus:ring-[#4a7c8c]"
                        />
                      </div>
                      <div>
                        <Label className="text-[#6a6a6a]">{t('editor.settings.title') || '职位'}</Label>
                        <Input
                          value={localData.title}
                          onChange={(e) => handleUpdate('title', e.target.value)}
                          className="mt-2 border-[#e8e4df] focus:border-[#4a7c8c] focus:ring-[#4a7c8c]"
                        />
                      </div>
                      <div>
                        <Label className="text-[#6a6a6a]">Email</Label>
                        <Input
                          value={localData.email}
                          onChange={(e) => handleUpdate('email', e.target.value)}
                          className="mt-2 border-[#e8e4df] focus:border-[#4a7c8c] focus:ring-[#4a7c8c]"
                        />
                      </div>
                      <div>
                        <Label className="text-[#6a6a6a]">{t('common.phone') || '电话'}</Label>
                        <Input
                          value={localData.phone}
                          onChange={(e) => handleUpdate('phone', e.target.value)}
                          className="mt-2 border-[#e8e4df] focus:border-[#4a7c8c] focus:ring-[#4a7c8c]"
                        />
                      </div>
                      <div>
                        <Label className="text-[#6a6a6a]">{t('common.location') || '地点'}</Label>
                        <Input
                          value={localData.location}
                          onChange={(e) => handleUpdate('location', e.target.value)}
                          className="mt-2 border-[#e8e4df] focus:border-[#4a7c8c] focus:ring-[#4a7c8c]"
                        />
                      </div>
                      <div>
                        <Label className="text-[#6a6a6a]">Website</Label>
                        <Input
                          value={localData.website || ''}
                          onChange={(e) => handleUpdate('website', e.target.value)}
                          className="mt-2 border-[#e8e4df] focus:border-[#4a7c8c] focus:ring-[#4a7c8c]"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-[#6a6a6a]">{t('common.summary') || '个人简介'}</Label>
                      <Textarea
                        value={localData.summary}
                        onChange={(e) => handleUpdate('summary', e.target.value)}
                        className="mt-2 border-[#e8e4df] focus:border-[#4a7c8c] focus:ring-[#4a7c8c]"
                        rows={4}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="experience" className="mt-6">
                  <div className="space-y-4">
                    {localData.experience.map((exp, index) => (
                      <div key={exp.id} className="bg-white rounded-xl shadow-sm border border-[#e8e4df] p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-[#3d3d3d]">{t('editor.settings.experience') || '工作经历'} {index + 1}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newExp = localData.experience.filter((_, i) => i !== index);
                              handleUpdate('experience', newExp);
                            }}
                            className="text-[#c45c48] hover:text-[#b34c38] hover:bg-[#fdf5f3]"
                          >
                            {t('common.delete') || '删除'}
                          </Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-[#6a6a6a]">{t('common.company') || '公司'}</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => {
                                const newExp = [...localData.experience];
                                newExp[index].company = e.target.value;
                                handleUpdate('experience', newExp);
                              }}
                              className="mt-2 border-[#e8e4df] focus:border-[#4a7c8c] focus:ring-[#4a7c8c]"
                            />
                          </div>
                          <div>
                            <Label className="text-[#6a6a6a]">{t('common.title') || '职位'}</Label>
                            <Input
                              value={exp.title}
                              onChange={(e) => {
                                const newExp = [...localData.experience];
                                newExp[index].title = e.target.value;
                                handleUpdate('experience', newExp);
                              }}
                              className="mt-2 border-[#e8e4df] focus:border-[#4a7c8c] focus:ring-[#4a7c8c]"
                            />
                          </div>
                          <div>
                            <Label className="text-[#6a6a6a]">{t('common.startDate') || '开始日期'}</Label>
                            <Input
                              value={exp.startDate}
                              onChange={(e) => {
                                const newExp = [...localData.experience];
                                newExp[index].startDate = e.target.value;
                                handleUpdate('experience', newExp);
                              }}
                              className="mt-2 border-[#e8e4df] focus:border-[#4a7c8c] focus:ring-[#4a7c8c]"
                            />
                          </div>
                          <div>
                            <Label className="text-[#6a6a6a]">{t('common.endDate') || '结束日期'}</Label>
                            <Input
                              value={exp.endDate || ''}
                              onChange={(e) => {
                                const newExp = [...localData.experience];
                                newExp[index].endDate = e.target.value || null;
                                handleUpdate('experience', newExp);
                              }}
                              className="mt-2 border-[#e8e4df] focus:border-[#4a7c8c] focus:ring-[#4a7c8c]"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Label className="text-[#6a6a6a]">{t('common.description') || '描述'}</Label>
                          <Textarea
                            value={exp.description.join('\n')}
                            onChange={(e) => {
                              const newExp = [...localData.experience];
                              newExp[index].description = e.target.value.split('\n').filter(Boolean);
                              handleUpdate('experience', newExp);
                            }}
                            className="mt-2 border-[#e8e4df] focus:border-[#4a7c8c] focus:ring-[#4a7c8c]"
                            rows={4}
                            placeholder="每行一个要点..."
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => {
                        const newExp = [...localData.experience, {
                          id: Date.now().toString(),
                          company: '',
                          title: '',
                          location: '',
                          startDate: '',
                          endDate: null,
                          current: false,
                          description: [],
                        }];
                        handleUpdate('experience', newExp);
                      }}
                      className="w-full border-[#d8d4cf] hover:bg-[#f5f3f0] text-[#6a6a6a]"
                    >
                      + {t('common.add') || '添加'} {t('editor.settings.experience') || '工作经历'}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="education" className="mt-6">
                  <div className="bg-white rounded-xl shadow-sm border border-[#e8e4df] p-6">
                    <h3 className="text-lg font-semibold text-[#3d3d3d] mb-4">{t('nav.education') || '教育经历'}</h3>
                    <p className="text-[#8c8c8c]">{t('common.loading') || '功能开发中...'}</p>
                  </div>
                </TabsContent>

                <TabsContent value="skills" className="mt-6">
                  <div className="bg-white rounded-xl shadow-sm border border-[#e8e4df] p-6">
                    <h3 className="text-lg font-semibold text-[#3d3d3d] mb-4">{t('editor.settings.skills') || '技能'}</h3>
                    <Textarea
                      value={localData.skills.join(', ')}
                      onChange={(e) => {
                        handleUpdate('skills', e.target.value.split(',').map(s => s.trim()).filter(Boolean));
                      }}
                      className="mt-2 border-[#e8e4df] focus:border-[#4a7c8c] focus:ring-[#4a7c8c]"
                      rows={4}
                      placeholder="React, TypeScript, Node.js..."
                    />
                    <p className="text-xs text-[#8c8c8c] mt-2">用逗号分隔多个技能</p>
                  </div>
                </TabsContent>

                <TabsContent value="projects" className="mt-6">
                  <div className="bg-white rounded-xl shadow-sm border border-[#e8e4df] p-6">
                    <h3 className="text-lg font-semibold text-[#3d3d3d] mb-4">{t('nav.projects') || '项目'}</h3>
                    <p className="text-[#8c8c8c]">{t('common.loading') || '功能开发中...'}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* AI Tips Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-gradient-to-br from-[#f5f3f0] to-[#faf9f7] rounded-xl border border-[#e8e4df] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Wand2 className="w-5 h-5 text-[#4a7c8c]" />
                  <h3 className="font-semibold text-[#3d3d3d]">AI {t('ai.suggestion.title') || '建议'}</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg border border-[#e8e4df]">
                    <p className="text-sm text-[#6a6a6a]">
                      {t('ai.feature.optimizeDesc') || 'AI 可以帮你优化简历内容，使其更具吸引力'}
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-[#e8e4df]">
                    <p className="text-sm text-[#6a6a6a]">
                      {t('ai.feature.suggestDesc') || '根据你的职业背景，AI 会推荐合适的模板和配色'}
                    </p>
                  </div>
                  <Button
                    onClick={() => setShowAIAssistant(true)}
                    className="w-full bg-gradient-to-r from-[#4a7c8c] to-[#5a8c9c] text-white hover:from-[#3a6c7c] hover:to-[#4a7c8c]"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {t('ai.title') || 'AI 助手'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
