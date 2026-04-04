import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Loader2 } from 'lucide-react';

interface LinkPreviewProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

interface PreviewData {
  title: string;
  description: string;
  image?: string;
  url: string;
}

export function LinkPreview({ href, children, className = '' }: LinkPreviewProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const linkRef = useRef<HTMLAnchorElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 模拟获取预览数据
  const fetchPreviewData = async (url: string): Promise<PreviewData> => {
    // 这里应该调用真实的链接预览API
    // 目前使用模拟数据
    const domain = new URL(url).hostname;
    
    const mockData: Record<string, PreviewData> = {
      'linkedin.com': {
        title: 'LinkedIn - 职业社交网站',
        description: '全球最大的职业社交平台，连接专业人士，发现职业机会。',
        url: 'https://linkedin.com',
      },
      'github.com': {
        title: 'GitHub - 代码托管平台',
        description: '全球最大的代码托管平台，协作开发，开源社区。',
        url: 'https://github.com',
      },
      'figma.com': {
        title: 'Figma - 设计协作工具',
        description: '基于浏览器的协作设计工具，实时协作，原型设计。',
        url: 'https://figma.com',
      },
    };

    return mockData[domain] || {
      title: domain,
      description: `访问 ${domain} 了解更多信息`,
      url,
    };
  };

  const handleMouseEnter = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      setIsVisible(true);
      
      if (!previewData) {
        setIsLoading(true);
        try {
          const data = await fetchPreviewData(href);
          setPreviewData(data);
        } catch (error) {
          console.error('Failed to fetch preview:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }, 300);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    // 如果点击的是卡片内部，不阻止默认行为
    const target = e.target as HTMLElement;
    if (target.closest('.preview-card')) {
      return;
    }
    // 否则正常跳转
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <span className="relative inline-block">
      <a
        ref={linkRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1 px-2 py-0.5 bg-stone-100 text-stone-700 rounded-md text-sm font-mono hover:bg-stone-200 transition-colors cursor-pointer ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => {
          e.preventDefault();
          handleClick(e);
        }}
      >
        {children}
        <ExternalLink className="w-3 h-3 opacity-50" />
      </a>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="preview-card absolute z-50 left-0 top-full mt-2 w-80"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="bg-white rounded-xl shadow-xl border border-stone-200 overflow-hidden">
              {isLoading ? (
                <div className="p-6 flex items-center justify-center">
                  <Loader2 className="w-5 h-5 text-stone-400 animate-spin" />
                </div>
              ) : previewData ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:bg-stone-50 transition-colors"
                >
                  {previewData.image && (
                    <div className="h-32 bg-stone-100 flex items-center justify-center">
                      <img
                        src={previewData.image}
                        alt={previewData.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="font-semibold text-stone-800 mb-1 line-clamp-1">
                      {previewData.title}
                    </h4>
                    <p className="text-sm text-stone-500 line-clamp-2">
                      {previewData.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-stone-400">
                      <ExternalLink className="w-3 h-3" />
                      <span className="truncate">{new URL(previewData.url).hostname}</span>
                    </div>
                  </div>
                </a>
              ) : null}
            </div>
            {/* 小三角 */}
            <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-stone-200 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

// 简化的内联链接预览（用于行内代码样式链接）
export function InlineLinkPreview({ href, children }: { href: string; children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsVisible(true), 200);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsVisible(false), 100);
  };

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  const domain = new URL(href).hostname;

  return (
    <span className="relative inline-block">
      <code
        className="px-1.5 py-0.5 bg-stone-100 text-stone-700 rounded text-sm font-mono cursor-pointer hover:bg-stone-200 transition-colors"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => window.open(href, '_blank', 'noopener,noreferrer')}
      >
        {children}
      </code>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 left-1/2 -translate-x-1/2 top-full mt-2 w-64"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="bg-white rounded-xl shadow-lg border border-stone-200 p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-stone-100 rounded-lg flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 text-stone-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-800 truncate">{domain}</p>
                  <p className="text-xs text-stone-400 truncate">点击访问链接</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-stone-200 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
