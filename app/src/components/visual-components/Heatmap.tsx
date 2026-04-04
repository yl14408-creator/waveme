import { motion } from 'framer-motion';

interface HeatmapData {
  x: string;
  y: string;
  value: number;
}

interface HeatmapProps {
  data: HeatmapData[];
  xLabels: string[];
  yLabels: string[];
  title?: string;
  colorScale?: string[];
}

export function Heatmap({ data, xLabels, yLabels, title, colorScale }: HeatmapProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  const getColor = (value: number) => {
    if (colorScale) {
      const intensity = value / maxValue;
      if (intensity === 0) return colorScale[0] || 'bg-gray-100';
      if (intensity < 0.25) return colorScale[1] || colorScale[0];
      if (intensity < 0.5) return colorScale[2] || colorScale[1];
      if (intensity < 0.75) return colorScale[3] || colorScale[2];
      return colorScale[4] || colorScale[3];
    }
    const intensity = value / maxValue;
    if (intensity === 0) return 'bg-gray-100';
    if (intensity < 0.25) return 'bg-cyan-100';
    if (intensity < 0.5) return 'bg-cyan-200';
    if (intensity < 0.75) return 'bg-cyan-300';
    return 'bg-cyan-500';
  };

  return (
    <div className="bg-white rounded-2xl border p-6">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}

      <div className="overflow-x-auto">
        <div className="inline-block">
          {/* Header */}
          <div className="flex">
            <div className="w-20" /> {/* Corner */}
            {xLabels.map(label => (
              <div key={label} className="w-12 text-center text-xs text-gray-500 py-2">
                {label}
              </div>
            ))}
          </div>

          {/* Rows */}
          {yLabels.map(yLabel => (
            <div key={yLabel} className="flex items-center">
              <div className="w-20 text-right text-xs text-gray-500 pr-3">
                {yLabel}
              </div>
              {xLabels.map(xLabel => {
                const cell = data.find(d => d.x === xLabel && d.y === yLabel);
                const value = cell?.value || 0;

                return (
                  <motion.div
                    key={`${xLabel}-${yLabel}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`w-12 h-8 ${getColor(value)} rounded m-0.5 relative group cursor-pointer`}
                    title={`${yLabel} - ${xLabel}: ${value}`}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {value}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-end gap-2">
        <span className="text-xs text-gray-500">低</span>
        <div className="flex gap-1">
          {(colorScale || ['bg-gray-100', 'bg-cyan-100', 'bg-cyan-200', 'bg-cyan-300', 'bg-cyan-500']).map((color, i) => (
            <div key={i} className={`w-4 h-4 rounded ${color.startsWith('bg-') ? color : ''}`} style={!color.startsWith('bg-') ? { backgroundColor: color } : undefined} />
          ))}
        </div>
        <span className="text-xs text-gray-500">高</span>
      </div>
    </div>
  );
}
