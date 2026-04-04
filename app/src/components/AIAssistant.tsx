import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wand2, 
  X, 
  Send, 
  Sparkles, 
  Lightbulb,
  ChevronRight,
  Loader2,
  Check,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useI18n } from '@/i18n/index.tsx';
import { sendChatMessage, type AIChatMessage, type AISuggestion as AIServiceSuggestion } from '@/services/aiService';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onSuggestion: (suggestion: AISuggestion) => void;
  currentTemplate?: string;
}

export interface AISuggestion {
  type: 'template' | 'color' | 'content' | 'optimization' | 'skill';
  title: string;
  description: string;
  data?: unknown;
  action?: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  suggestions?: AISuggestion[];
  timestamp: number;
}

interface AppliedSuggestion {
  id: string;
  title: string;
  type: string;
  appliedAt: number;
}

const examplePrompts = [
  '我是一名前端工程师，有5年经验，想展示我的技术能力',
  '我是设计师，想做一个作品集网站展示我的作品',
  '我是应届毕业生，想做一个专业的求职网站',
  '帮我优化一下我的项目描述',
  '推荐一个适合我的模板风格',
];

// 生成唯一ID
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export function AIAssistant({ isOpen, onClose, onSuggestion, currentTemplate }: AIAssistantProps) {
  const { t } = useI18n();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `你好！我是 Waveme AI 助手 🌊

我可以帮你：

1. **推荐模板** - 根据你的行业和风格偏好
2. **优化内容** - 改进项目描述和工作经历
3. **配色建议** - 推荐专业的配色方案
4. **简历包装** - 让你的简历更有吸引力

告诉我你的需求，我来帮你打造完美的个人品牌！`,
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [appliedSuggestions, setAppliedSuggestions] = useState<AppliedSuggestion[]>([]);
  const [chatHistory, setChatHistory] = useState<AIChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 检查建议是否已应用
  const isSuggestionApplied = useCallback((suggestion: AISuggestion): boolean => {
    return appliedSuggestions.some(
      applied => applied.title === suggestion.title && applied.type === suggestion.type
    );
  }, [appliedSuggestions]);

  // 生成AI响应（使用真实API）
  const generateResponse = async (userInput: string): Promise<Message> => {
    setIsGenerating(true);
    
    try {
      // 构建消息历史
      const newHistory: AIChatMessage[] = [
        ...chatHistory,
        { role: 'user', content: userInput },
      ];

      // 调用真实AI服务
      const response = await sendChatMessage(newHistory, {
        model: 'gpt-4o-mini',
        temperature: 0.7,
      });

      // 更新聊天历史
      setChatHistory([
        ...newHistory,
        { role: 'assistant', content: response.message },
      ]);

      // 转换建议格式
      const suggestions: AISuggestion[] | undefined = response.suggestions?.map(s => ({
        type: s.type,
        title: s.title,
        description: s.description,
        data: s.data,
        action: s.action,
      }));

      // 如果没有消息且有错误，显示配置提示
      if (!response.message && response.error) {
        return {
          id: generateId(),
          role: 'assistant',
          content: `⚠️ ${response.error}

如果你想使用真实的 AI 功能，请配置 OpenAI API Key：
1. 访问 https://platform.openai.com/api-keys 获取 API Key
2. 在项目根目录创建 .env 文件
3. 添加 VITE_OPENAI_API_KEY=your_api_key_here
4. 重启开发服务器

目前我使用的是模拟回复模式，可以回答一些常见问题。`,
          timestamp: Date.now(),
        };
      }

      return {
        id: generateId(),
        role: 'assistant',
        content: response.message || '抱歉，我没有理解你的问题。请尝试用不同的方式描述你的需求，比如告诉我你的职业背景（前端开发、设计师、产品经理等）。',
        suggestions,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('AI Response Error:', error);
      return {
        id: generateId(),
        role: 'assistant',
        content: '抱歉，AI服务暂时不可用。请稍后再试，或者直接联系我们的客服团队。',
        timestamp: Date.now(),
      };
    } finally {
      setIsGenerating(false);
    }
  };

  // 发送消息
  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const response = await generateResponse(input);
    setMessages(prev => [...prev, response]);
  };

  // 处理建议点击
  const handleSuggestionClick = (suggestion: AISuggestion) => {
    // 检查是否已应用
    if (isSuggestionApplied(suggestion)) {
      // 已应用，显示提示但不重复添加消息
      const alreadyAppliedMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: `「${suggestion.title}」已经应用过了。你可以尝试其他建议，或者告诉我更多关于你的需求。`,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, alreadyAppliedMessage]);
      return;
    }

    // 应用建议
    onSuggestion(suggestion);
    
    // 记录已应用的建议
    const applied: AppliedSuggestion = {
      id: generateId(),
      title: suggestion.title,
      type: suggestion.type,
      appliedAt: Date.now(),
    };
    setAppliedSuggestions(prev => [...prev, applied]);

    // 添加确认消息（只添加一次）
    const confirmMessage: Message = {
      id: generateId(),
      role: 'assistant',
      content: `✅ 已应用「${suggestion.title}」！

${getSuggestionFollowUp(suggestion.type)}`,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, confirmMessage]);
  };

  // 根据建议类型获取后续提示
  const getSuggestionFollowUp = (type: string): string => {
    switch (type) {
      case 'template':
        return '模板已切换。你可以在预览区查看效果，不满意可以随时更换其他模板。';
      case 'color':
        return '配色方案已应用。整体色调已调整，你可以继续优化其他元素。';
      case 'content':
        return '内容优化建议已记录。你可以在编辑器中查看具体的修改建议。';
      case 'optimization':
        return '优化建议已应用。还有其他方面需要改进吗？';
      case 'skill':
        return '技能展示建议已应用。继续完善你的技能列表吧！';
      default:
        return '还有其他需要优化的吗？';
    }
  };

  // 清空对话
  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: `你好！我是 Waveme AI 助手 🌊

我可以帮你：

1. **推荐模板** - 根据你的行业和风格偏好
2. **优化内容** - 改进项目描述和工作经历
3. **配色建议** - 推荐专业的配色方案
4. **简历包装** - 让你的简历更有吸引力

告诉我你的需求，我来帮你打造完美的个人品牌！`,
        timestamp: Date.now(),
      },
    ]);
    setChatHistory([]);
    setAppliedSuggestions([]);
  };

  // 获取建议图标
  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'template':
        return <Sparkles className="w-4 h-4 text-[#c45c48]" />;
      case 'color':
        return <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#4a7c8c] to-[#7a9a7c]" />;
      case 'content':
        return <div className="w-4 h-4 rounded bg-[#8c9ca4]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#c45c48]" />;
    }
  };

  // 获取建议状态样式
  const getSuggestionStyle = (suggestion: AISuggestion) => {
    const applied = isSuggestionApplied(suggestion);
    return applied 
      ? 'opacity-60 bg-gray-50 border-gray-200' 
      : 'bg-white border-gray-200 hover:border-[#c45c48] hover:shadow-md';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-[#faf9f7] rounded-2xl w-full max-w-lg h-[650px] flex flex-col shadow-2xl overflow-hidden border border-[#e8e4df]"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#e8e4df] bg-gradient-to-r from-[#f5f3f0] to-[#faf9f7]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4a7c8c] to-[#7a9a7c] rounded-xl flex items-center justify-center shadow-md">
                <Wand2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#3d3d3d]">{t('ai.title') || 'AI 智能助手'}</h3>
                <p className="text-xs text-[#8c8c8c]">{t('ai.subtitle') || '为你提供专业建议'}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 1 && (
                <button
                  onClick={handleClearChat}
                  className="p-2 hover:bg-[#e8e4df] rounded-lg transition-colors"
                  title="清空对话"
                >
                  <RefreshCw className="w-4 h-4 text-[#8c8c8c]" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#e8e4df] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#8c8c8c]" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-[#4a7c8c] to-[#5a8c9c] text-white'
                      : 'bg-white text-[#3d3d3d] border border-[#e8e4df]'
                  }`}
                >
                  <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
                  
                  {/* Suggestions */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {message.suggestions.map((suggestion, index) => {
                        const applied = isSuggestionApplied(suggestion);
                        return (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            disabled={applied}
                            className={`w-full text-left p-3 rounded-xl border transition-all group ${getSuggestionStyle(suggestion)}`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  {applied ? (
                                    <Check className="w-4 h-4 text-green-500" />
                                  ) : (
                                    getSuggestionIcon(suggestion.type)
                                  )}
                                  <span className={`font-medium text-sm ${applied ? 'text-gray-500' : 'text-[#3d3d3d]'}`}>
                                    {suggestion.title}
                                  </span>
                                  {applied && (
                                    <span className="text-xs text-green-500 bg-green-50 px-2 py-0.5 rounded-full">
                                      已应用
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-[#8c8c8c] mt-1">{suggestion.description}</p>
                              </div>
                              {!applied && (
                                <ChevronRight className="w-4 h-4 text-[#c0c0c0] group-hover:text-[#c45c48] transition-colors" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isGenerating && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#e8e4df] rounded-2xl p-4 flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin text-[#4a7c8c]" />
                  <span className="text-sm text-[#8c8c8c]">AI 正在思考...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Example Prompts */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-[#8c8c8c] mb-2 flex items-center gap-1">
                <Lightbulb className="w-3 h-3" />
                试试这些：
              </p>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(prompt)}
                    className="text-xs px-3 py-1.5 bg-white border border-[#e8e4df] hover:border-[#4a7c8c] hover:bg-[#f5f3f0] rounded-full transition-colors text-[#5a5a5a]"
                  >
                    {prompt.length > 18 ? prompt.slice(0, 18) + '...' : prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-[#e8e4df] bg-[#f5f3f0]">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={t('ai.prompt.placeholder') || '输入你的需求...'}
                className="flex-1 min-h-[60px] resize-none bg-white border-[#e8e4df] focus:border-[#4a7c8c] focus:ring-[#4a7c8c]"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isGenerating}
                className="bg-gradient-to-r from-[#4a7c8c] to-[#5a8c9c] hover:from-[#3a6c7c] hover:to-[#4a7c8c] text-white h-[60px] px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-[#a0a0a0] mt-2 text-center">
              Waveme AI 使用 GPT-4o-mini 提供智能建议
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
