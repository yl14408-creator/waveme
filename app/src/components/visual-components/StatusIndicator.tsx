import { motion } from 'framer-motion';

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'warning' | 'error' | 'processing';
  label?: string;
  showPulse?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig = {
  online: {
    color: 'bg-green-500',
    pulseColor: 'bg-green-400',
    label: '运行正常',
  },
  offline: {
    color: 'bg-gray-400',
    pulseColor: 'bg-gray-300',
    label: '离线',
  },
  warning: {
    color: 'bg-amber-500',
    pulseColor: 'bg-amber-400',
    label: '警告',
  },
  error: {
    color: 'bg-red-500',
    pulseColor: 'bg-red-400',
    label: '异常',
  },
  processing: {
    color: 'bg-blue-500',
    pulseColor: 'bg-blue-400',
    label: '处理中',
  },
};

export function StatusIndicator({
  status,
  label,
  showPulse = true,
  size = 'md',
}: StatusIndicatorProps) {
  const config = statusConfig[status];
  
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        {/* Pulse animation */}
        {showPulse && status !== 'offline' && (
          <motion.span
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: status === 'error' ? 0.5 : 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`absolute inset-0 ${config.pulseColor} rounded-full`}
          />
        )}
        
        {/* Main dot */}
        <span className={`relative block ${sizeClasses[size]} ${config.color} rounded-full`} />
      </div>
      
      {(label || config.label) && (
        <span className="text-sm text-gray-600">{label || config.label}</span>
      )}
    </div>
  );
}
