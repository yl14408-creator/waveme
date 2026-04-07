import { motion } from 'framer-motion';
import { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { useI18n } from '@/i18n';

interface SalarySliderProps {
  min: number;
  max: number;
  value: number;
  industryAverage?: number;
  currency?: string;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  color?: string;
}

export function SalarySlider({
  min,
  max,
  value,
  industryAverage,
  currency = '¥',
  onChange,
  readOnly = false,
  color = '#06b6d4',
}: SalarySliderProps) {
  const { t } = useI18n();
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const displayValue = hoverValue ?? value;
  const percentage = ((displayValue - min) / (max - min)) * 100;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (readOnly || !onChange) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercentage = (clickX / rect.width) * 100;
    const newValue = Math.round(min + (newPercentage / 100) * (max - min));
    onChange(Math.min(Math.max(newValue, min), max));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (readOnly) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const moveX = e.clientX - rect.left;
    const hoverPercentage = (moveX / rect.width) * 100;
    const hoverVal = Math.round(min + (hoverPercentage / 100) * (max - min));
    setHoverValue(Math.min(Math.max(hoverVal, min), max));
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  return (
    <div className="bg-white rounded-2xl border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" style={{ color }} />
          <h3 className="font-semibold text-gray-900">{t('components.demo.expectedSalary')}</h3>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold" style={{ color }}>
            {currency} {displayValue.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500"> {t('components.demo.perMonth')}</span>
        </div>
      </div>

      {/* Slider */}
      <div 
        className={`relative h-12 bg-gray-100 rounded-xl overflow-hidden ${!readOnly ? 'cursor-pointer' : ''}`}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-yellow-100 to-red-100 opacity-50" />
        
        {/* Industry average marker */}
        {industryAverage && (
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-amber-500 z-10"
            style={{ left: `${((industryAverage - min) / (max - min)) * 100}%` }}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="text-xs text-amber-600 font-medium">{t('components.demo.industryAverage')}</span>
            </div>
          </div>
        )}
        
        {/* Value bar */}
        <motion.div
          className="absolute left-0 top-0 bottom-0"
          style={{ background: `linear-gradient(to right, ${color}, ${color}dd)` }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Labels */}
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
          <span className="text-xs text-gray-500">{currency}{min.toLocaleString()}</span>
          <span className="text-xs text-gray-500">{currency}{max.toLocaleString()}</span>
        </div>
        
        {/* Handle */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-2"
          style={{ borderColor: color, left: `calc(${percentage}% - 12px)` }}
          whileHover={{ scale: 1.2 }}
        />
      </div>

      {/* Comparison */}
      {industryAverage && (
        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Info className="w-4 h-4" />
              {t('components.demo.vsIndustryAvg')}
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              {value > industryAverage ? (
                <>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 font-medium">
                    {t('components.demo.aboveAvg')} {((value - industryAverage) / industryAverage * 100).toFixed(0)}%
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-4 h-4 text-amber-500" />
                  <span className="text-amber-600 font-medium">
                    {t('components.demo.belowAvg')} {((industryAverage - value) / industryAverage * 100).toFixed(0)}%
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
