import { motion } from 'framer-motion';
import { useI18n } from '@/i18n';

interface FunnelStage {
  name: string;
  value: number;
  color: string;
  dropOff?: number;
}

interface FunnelChartProps {
  data: FunnelStage[];
  showDropOff?: boolean;
  animated?: boolean;
}

export function FunnelChart({
  data,
  showDropOff = true,
  animated = true,
}: FunnelChartProps) {
  const { t } = useI18n();
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="space-y-2">
      {data.map((stage, index) => {
        const width = (stage.value / maxValue) * 100;
        const prevStage = index > 0 ? data[index - 1] : null;
        const dropOffRate = prevStage && showDropOff
          ? ((prevStage.value - stage.value) / prevStage.value * 100).toFixed(1)
          : null;

        return (
          <div key={stage.name} className="relative">
            {/* Drop off indicator */}
            {dropOffRate && Number(dropOffRate) > 0 && (
              <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 text-xs text-red-500">
                ↓ {dropOffRate}%
              </div>
            )}

            {/* Funnel bar */}
            <div className="flex items-center gap-4">
              <motion.div
                initial={animated ? { width: 0 } : { width: `${width}%` }}
                animate={{ width: `${width}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative h-12 rounded-r-lg overflow-hidden"
                style={{ backgroundColor: stage.color }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                {/* Label inside */}
                <div className="absolute inset-0 flex items-center px-4">
                  <span className="text-white font-medium text-sm truncate">
                    {stage.name}
                  </span>
                </div>
              </motion.div>

              {/* Value */}
              <div className="flex-shrink-0 text-right">
                <span className="text-lg font-bold text-gray-900">
                  {stage.value.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 ml-1">{t('components.demo.funnelUnit')}</span>
              </div>
            </div>

            {/* Stage number */}
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                {index + 1}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
