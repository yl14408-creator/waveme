import { motion } from 'framer-motion';

interface GaugeChartProps {
  value: number;
  min?: number;
  max?: number;
  label: string;
  unit?: string;
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'blue' | 'green' | 'orange' | 'purple' | 'stone';
}

export function GaugeChart({
  value,
  min = 0,
  max = 100,
  label,
  unit = '',
  size = 'md',
  colorScheme = 'blue',
}: GaugeChartProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  
  const sizeClasses = {
    sm: { width: 120, stroke: 8, font: 20 },
    md: { width: 160, stroke: 12, font: 28 },
    lg: { width: 200, stroke: 16, font: 36 },
  };

  const colors = {
    blue: { start: '#06b6d4', end: '#3b82f6' },
    green: { start: '#10b981', end: '#22c55e' },
    orange: { start: '#f59e0b', end: '#f97316' },
    purple: { start: '#8b5cf6', end: '#a855f7' },
    stone: { start: '#78716c', end: '#57534e' },
  };

  const { width, stroke, font } = sizeClasses[size];
  const radius = (width - stroke) / 2;
  const circumference = radius * Math.PI;
  const strokeDashoffset = circumference - (clampedPercentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width, height: width / 2 + 20 }}>
        <svg width={width} height={width / 2 + 20} className="transform rotate-180">
          {/* Background arc */}
          <path
            d={`M ${stroke / 2} ${width / 2} A ${radius} ${radius} 0 0 1 ${width - stroke / 2} ${width / 2}`}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          
          {/* Value arc */}
          <motion.path
            d={`M ${stroke / 2} ${width / 2} A ${radius} ${radius} 0 0 1 ${width - stroke / 2} ${width / 2}`}
            fill="none"
            stroke={`url(#gradient-${colorScheme})`}
            strokeWidth={stroke}
            strokeLinecap="round"
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id={`gradient-${colorScheme}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors[colorScheme].start} />
              <stop offset="100%" stopColor={colors[colorScheme].end} />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center value */}
        <div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center"
          style={{ marginBottom: -10 }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="font-bold text-gray-900"
            style={{ fontSize: font }}
          >
            {value}
          </motion.span>
          {unit && (
            <span className="text-sm text-gray-500 ml-1">{unit}</span>
          )}
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mt-2 text-center">{label}</p>
      
      {/* Min/Max labels */}
      <div className="flex justify-between w-full px-4 mt-1">
        <span className="text-xs text-gray-400">{min}</span>
        <span className="text-xs text-gray-400">{max}</span>
      </div>
    </div>
  );
}
