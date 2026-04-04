import { motion } from 'framer-motion';
import { FolderOpen, Plus, Search, Inbox, FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  type?: 'data' | 'search' | 'create' | 'error' | 'custom';
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

const defaultContent = {
  data: {
    icon: <Inbox className="w-16 h-16" />,
    title: '暂无数据',
    description: '还没有任何数据，开始创建你的第一个项目吧',
  },
  search: {
    icon: <Search className="w-16 h-16" />,
    title: '未找到结果',
    description: '没有找到匹配的内容，试试其他关键词',
  },
  create: {
    icon: <FolderOpen className="w-16 h-16" />,
    title: '开始创建',
    description: '还没有内容，点击下面按钮开始创建',
  },
  error: {
    icon: <FileQuestion className="w-16 h-16" />,
    title: '出错了',
    description: '加载内容时出现问题，请稍后重试',
  },
  custom: {
    icon: null,
    title: '',
    description: '',
  },
};

export function EmptyState({
  type = 'data',
  title,
  description,
  icon,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const content = defaultContent[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      {/* Illustration */}
      <div className="relative mb-6">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-2xl opacity-50 scale-150" />
        
        {/* Icon */}
        <div className="relative w-32 h-32 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl flex items-center justify-center text-cyan-400">
          {icon || content.icon}
        </div>
        
        {/* Floating elements */}
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center"
        >
          <span className="text-lg">✨</span>
        </motion.div>
        
        <motion.div
          animate={{ y: [5, -5, 5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-200 rounded-full flex items-center justify-center"
        >
          <span className="text-sm">💫</span>
        </motion.div>
      </div>

      {/* Text */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title || content.title}
      </h3>
      <p className="text-gray-500 max-w-sm mb-6">
        {description || content.description}
      </p>

      {/* Action */}
      {onAction && (
        <Button
          onClick={onAction}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          {actionLabel || '开始创建'}
        </Button>
      )}
    </motion.div>
  );
}
