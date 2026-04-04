import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  X, 
  Send, 
  Sparkles, 
  Lightbulb,
  Palette,
  Layout,
  Type,
  Image,
  Wand2
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'suggestion' | 'action';
  actions?: { label: string; value: string }[];
}

interface AIChatAssistantProps {
  onApplySuggestion?: (suggestion: string) => void;
}

// Prompt 引导提示
const promptGuides = [
  {
    icon: <Palette className="w-4 h-4" />,
    title: '想要特定的配色？',
    example: '把主题色换成莫兰迪色系，偏灰粉色调',
  },
  {
    icon: <Layout className="w-4 h-4" />,
    title: '调整布局风格？',
    example: '把工作经历改成时间轴样式，从左到右',
  },
  {
    icon: <Type className="w-4 h-4" />,
    title: '改变字体感觉？',
    example: '换成更有科技感的字体，像代码编辑器那样',
  },
  {
    icon: <Image className="w-4 h-4" />,
    title: '添加视觉效果？',
    example: '加个粒子动画背景，像星空一样',
  },
];

// 开场对话
const welcomeMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: '嗨！我是你的 AI 设计助手 ✨\n\n告诉我你想要什么样的个人网站，我可以帮你：',
    type: 'suggestion',
  },
  {
    id: '2',
    role: 'assistant',
    content: '',
    type: 'action',
    actions: [
      { label: '🎨 换个配色方案', value: 'color' },
      { label: '📐 调整布局样式', value: 'layout' },
      { label: '✨ 添加动效', value: 'animation' },
      { label: '📝 优化文案', value: 'copy' },
    ],
  },
];

export function AIChatAssistant({ 
  onApplySuggestion
}: AIChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(welcomeMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 模拟 AI 回复
  const simulateAIResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const responses = generateResponse(userMessage);
    
    for (const response of responses) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setMessages(prev => [...prev, response]);
    }
    
    setIsTyping(false);
  };

  // 根据用户输入生成回复
  const generateResponse = (userMessage: string): Message[] => {
    const lowerMsg = userMessage.toLowerCase();
    
    // 颜色相关
    if (lowerMsg.includes('颜色') || lowerMsg.includes('配色') || lowerMsg.includes('color')) {
      return [
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: '好的，我来帮你调整配色方案！这里有几个推荐：',
          type: 'text',
        },
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '',
          type: 'action',
          actions: [
            { label: '🌸 莫兰迪粉灰', value: 'apply_color:morandi' },
            { label: '🌊 深海蓝调', value: 'apply_color:ocean' },
            { label: '🌲 森林墨绿', value: 'apply_color:forest' },
            { label: '🌅 日落橙黄', value: 'apply_color:sunset' },
            { label: '🌃 赛博霓虹', value: 'apply_color:cyberpunk' },
          ],
        },
      ];
    }
    
    // 布局相关
    if (lowerMsg.includes('布局') || lowerMsg.includes('排版') || lowerMsg.includes('layout')) {
      return [
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: '我可以帮你调整页面布局。你想怎么改？',
          type: 'text',
        },
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '',
          type: 'action',
          actions: [
            { label: '⏱️ 时间轴样式', value: 'apply_layout:timeline' },
            { label: '🃏 卡片网格', value: 'apply_layout:grid' },
            { label: '📄 单页滚动', value: 'apply_layout:onepage' },
            { label: '🗂️ 标签页切换', value: 'apply_layout:tabs' },
          ],
        },
      ];
    }
    
    // 字体相关
    if (lowerMsg.includes('字体') || lowerMsg.includes('font') || lowerMsg.includes('文字')) {
      return [
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: '字体对整体感觉影响很大！试试这些风格：',
          type: 'text',
        },
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '',
          type: 'action',
          actions: [
            { label: '💻 代码等宽体', value: 'apply_font:mono' },
            { label: '📰 经典衬线体', value: 'apply_font:serif' },
            { label: '🎯 现代无衬线', value: 'apply_font:sans' },
            { label: '✏️ 手写风格', value: 'apply_font:handwritten' },
          ],
        },
      ];
    }
    
    // 动画相关
    if (lowerMsg.includes('动画') || lowerMsg.includes('动效') || lowerMsg.includes('animation')) {
      return [
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: '动效可以让网站更生动！我可以添加：',
          type: 'text',
        },
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '',
          type: 'action',
          actions: [
            { label: '✨ 淡入动画', value: 'apply_animation:fade' },
            { label: '🌊 滚动视差', value: 'apply_animation:parallax' },
            { label: '🎯 鼠标跟随', value: 'apply_animation:cursor' },
            { label: '🎆 粒子背景', value: 'apply_animation:particles' },
          ],
        },
      ];
    }
    
    // 默认回复
    return [
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: '明白了！让我来帮你实现这个想法。\n\n你可以更具体地描述一下吗？比如：',
        type: 'text',
      },
      {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        type: 'action',
        actions: [
          { label: '🎨 换个配色', value: 'color' },
          { label: '📐 调整布局', value: 'layout' },
          { label: '✨ 添加动效', value: 'animation' },
          { label: '📝 优化文案', value: 'copy' },
        ],
      },
    ];
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      type: 'text',
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setShowGuide(false);
    
    simulateAIResponse(input);
  };

  const handleAction = (value: string) => {
    // 如果是 apply_ 开头，直接应用
    if (value.startsWith('apply_')) {
      onApplySuggestion?.(value);
      
      const confirmMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: '已应用！看看效果如何？不满意的话可以继续调整 ✨',
        type: 'text',
      };
      setMessages(prev => [...prev, confirmMessage]);
    } else {
      // 否则生成新的建议
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: value,
        type: 'text',
      };
      setMessages(prev => [...prev, userMessage]);
      simulateAIResponse(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center text-white hover:shadow-xl transition-shadow"
      >
        <Sparkles className="w-6 h-6" />
      </motion.button>

      {/* Prompt Guide - 右下角提示 */}
      <AnimatePresence>
        {showGuide && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-40 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 border-b">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-cyan-500" />
                <span className="font-medium text-gray-800">不知道怎么描述？</span>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {promptGuides.map((guide, index) => (
                <div 
                  key={index}
                  className="group cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setInput(guide.example);
                    setIsOpen(true);
                  }}
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <span className="text-cyan-500">{guide.icon}</span>
                    {guide.title}
                  </div>
                  <p className="text-xs text-gray-500 group-hover:text-cyan-600 transition-colors">
                    "{guide.example}"
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              <div className="flex items-center gap-2">
                <Wand2 className="w-5 h-5" />
                <span className="font-medium">AI 设计助手</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-gray-900 text-white rounded-2xl rounded-tr-sm'
                        : 'bg-gray-100 text-gray-800 rounded-2xl rounded-tl-sm'
                    } p-3`}
                  >
                    {message.content && (
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    )}
                    
                    {message.type === 'action' && message.actions && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.actions.map((action, i) => (
                          <button
                            key={i}
                            onClick={() => handleAction(action.value)}
                            className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium hover:border-cyan-400 hover:text-cyan-600 transition-colors"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mr-2">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="描述你想要的效果..."
                  className="flex-1 bg-white"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  size="icon"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                按 Enter 发送，AI 会理解你的需求
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
