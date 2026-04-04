import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  country: string;
  type: 'work' | 'education' | 'project' | 'home';
  coordinates?: { x: number; y: number };
}

interface MiniMapProps {
  locations: Location[];
  title?: string;
  size?: 'sm' | 'md' | 'lg';
}

const typeColors = {
  work: 'bg-blue-500',
  education: 'bg-green-500',
  project: 'bg-purple-500',
  home: 'bg-orange-500',
};

const typeLabels = {
  work: '工作',
  education: '教育',
  project: '项目',
  home: '居住',
};

export function MiniMap({
  locations,
  title = '足迹地图',
  size = 'md',
}: MiniMapProps) {
  const sizeClasses = {
    sm: 'h-48',
    md: 'h-64',
    lg: 'h-80',
  };

  return (
    <div className="bg-white rounded-2xl border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      {/* Simplified world map visualization */}
      <div className={`relative ${sizeClasses[size]} bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl overflow-hidden`}>
        {/* World map silhouette (simplified) */}
        <svg viewBox="0 0 800 400" className="absolute inset-0 w-full h-full opacity-30">
          <path
            fill="#cbd5e1"
            d="M150,100 Q200,80 250,100 T350,120 Q400,100 450,110 T550,100 Q600,90 650,110 L650,200 Q600,220 550,210 T450,230 Q400,220 350,240 T250,230 Q200,250 150,230 Z"
          />
        </svg>
        
        {/* Location markers */}
        {locations.map((location, index) => (
          <motion.div
            key={location.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="absolute group cursor-pointer"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
          >
            {/* Pulse effect */}
            <span className={`absolute inset-0 ${typeColors[location.type]} rounded-full animate-ping opacity-30`} />
            
            {/* Marker */}
            <div className={`relative w-4 h-4 ${typeColors[location.type]} rounded-full border-2 border-white shadow-lg flex items-center justify-center`}>
              <MapPin className="w-2.5 h-2.5 text-white" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              <div className="font-medium">{location.name}</div>
              <div className="text-gray-400">{typeLabels[location.type]}</div>
            </div>
          </motion.div>
        ))}
        
        {/* Legend */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          {Object.entries(typeLabels).map(([type, label]) => (
            <div key={type} className="flex items-center gap-1.5 bg-white/80 backdrop-blur px-2 py-1 rounded-full">
              <div className={`w-2 h-2 ${typeColors[type as keyof typeof typeColors]} rounded-full`} />
              <span className="text-xs text-gray-600">{label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Location list */}
      <div className="mt-4 space-y-2">
        {locations.slice(0, 3).map((location) => (
          <div key={location.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <div className={`w-8 h-8 ${typeColors[location.type]} rounded-lg flex items-center justify-center`}>
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">{location.name}</div>
              <div className="text-xs text-gray-500">{typeLabels[location.type]}</div>
            </div>
          </div>
        ))}
        {locations.length > 3 && (
          <div className="text-center text-sm text-gray-500 py-2">
            +{locations.length - 3} 更多地点
          </div>
        )}
      </div>
    </div>
  );
}
