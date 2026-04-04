import { motion } from 'framer-motion';

interface ProgressBarProps {
  label: string;
  value: number;
  max?: number;
  showPercentage?: boolean;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  tooltip?: string;
}

export function ProgressBar({
  label,
  value,
  max = 100,
  showPercentage = true,
  color = 'bg-gradient-to-r from-cyan-500 to-blue-500',
  size = 'md',
  animated = true,
  tooltip,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className="group relative">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {showPercentage && (
          <span className="text-sm text-gray-500">
            {value.toFixed(1)}{max !== 100 && ` / ${max}`}
            {max === 100 && '%'}
          </span>
        )}
      </div>
      
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={animated ? { duration: 1, ease: 'easeOut' } : { duration: 0 }}
          className={`h-full ${color} rounded-full relative`}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </motion.div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {tooltip}
        </div>
      )}
    </div>
  );
}
