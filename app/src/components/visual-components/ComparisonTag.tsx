import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ComparisonTagProps {
  value: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function ComparisonTag({
  value,
  label = 'vs 上月',
  size = 'md',
  showIcon = true,
}: ComparisonTagProps) {
  const isPositive = value > 0;
  const isNeutral = value === 0;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const colors = isPositive
    ? 'bg-green-100 text-green-700'
    : isNeutral
    ? 'bg-gray-100 text-gray-600'
    : 'bg-red-100 text-red-700';

  const Icon = isPositive ? TrendingUp : isNeutral ? Minus : TrendingDown;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClasses[size]} ${colors}`}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      <span>{isPositive ? '+' : ''}{value.toFixed(1)}%</span>
      {label && <span className="opacity-70 ml-1">{label}</span>}
    </motion.span>
  );
}
