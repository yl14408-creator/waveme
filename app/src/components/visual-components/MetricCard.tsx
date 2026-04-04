import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { AnimatedNumber } from './AnimatedNumber';

interface MetricCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  watermark?: React.ReactNode;
  status?: 'normal' | 'warning' | 'success' | 'error';
  loading?: boolean;
  decimals?: number;
}

export function MetricCard({
  title,
  value,
  prefix = '',
  suffix = '',
  change,
  changeLabel = 'vs 上月',
  icon,
  iconBg = 'bg-blue-500',
  watermark,
  status = 'normal',
  loading = false,
  decimals = 0,
}: MetricCardProps) {
  const statusColors = {
    normal: 'bg-white',
    warning: 'bg-amber-50 border-amber-200',
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl border p-6 ${statusColors[status]}`}
    >
      {/* Watermark */}
      {watermark && (
        <div className="absolute -bottom-4 -right-4 opacity-5 transform rotate-12">
          {watermark}
        </div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500 font-medium">{title}</span>
          {icon && (
            <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center text-white`}>
              {icon}
            </div>
          )}
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-gray-900">
            {prefix}
            <AnimatedNumber value={value} decimals={decimals} loading={loading} />
            {suffix}
          </span>
        </div>

        {/* Change */}
        {change !== undefined && (
          <div className="flex items-center gap-2 mt-3">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                change >= 0
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {change >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {change >= 0 ? '+' : ''}{change.toFixed(1)}%
            </span>
            <span className="text-xs text-gray-400">{changeLabel}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
