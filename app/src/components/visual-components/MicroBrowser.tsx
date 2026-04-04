import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Loader2, Globe } from 'lucide-react';

interface MicroBrowserProps {
  url: string;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  width?: number;
  height?: number;
}

export function MicroBrowser({
  url,
  title = '预览',
  isOpen,
  onClose,
  width = 800,
  height = 500,
}: MicroBrowserProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [isOpen, url]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Browser Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed z-50 bg-white rounded-2xl shadow-2xl overflow-hidden"
            style={{
              width: Math.min(width, window.innerWidth - 40),
              height: Math.min(height, window.innerHeight - 100),
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Browser Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex items-center gap-2 ml-4 px-3 py-1.5 bg-white rounded-lg text-sm text-gray-600 max-w-md">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{url}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  title="在新窗口打开"
                >
                  <ExternalLink className="w-4 h-4 text-gray-600" />
                </a>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Browser Content */}
            <div className="relative bg-white" style={{ height: 'calc(100% - 52px)' }}>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
                    <span className="text-sm text-gray-500">加载中...</span>
                  </div>
                </div>
              )}

              {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 mb-2">无法加载此页面</p>
                    <p className="text-sm text-gray-400 mb-4">该网站可能禁止了 iframe 嵌入</p>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      在新窗口打开
                    </a>
                  </div>
                </div>
              )}

              <iframe
                ref={iframeRef}
                src={url}
                onLoad={handleLoad}
                onError={handleError}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                title={title}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Hover Preview Component
interface LinkPreviewProps {
  url: string;
  children: React.ReactNode;
}

export function LinkPreview({ url, children }: LinkPreviewProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<{
    title?: string;
    description?: string;
    image?: string;
  }>({});

  useEffect(() => {
    // In a real app, you would fetch Open Graph data here
    // For now, we'll just show the URL
    setPreviewData({ title: url });
  }, [url]);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      {children}
      
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50"
          >
            <div className="bg-white rounded-xl shadow-xl border p-3 w-64">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {previewData.title || url}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{url}</p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t flex items-center justify-between">
                <span className="text-xs text-gray-400">悬停查看预览</span>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </div>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
