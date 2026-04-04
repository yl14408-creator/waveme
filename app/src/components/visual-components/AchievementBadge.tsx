import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Target, TrendingUp } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  metric?: {
    value: number;
    unit: string;
    change?: number;
  };
  icon?: 'trophy' | 'star' | 'zap' | 'target' | 'trending';
  color?: string;
}

interface AchievementBadgeProps {
  achievements: Achievement[];
  layout?: 'grid' | 'list';
}

const iconMap = {
  trophy: Trophy,
  star: Star,
  zap: Zap,
  target: Target,
  trending: TrendingUp,
};

export function AchievementBadge({
  achievements,
  layout = 'grid',
}: AchievementBadgeProps) {
  if (layout === 'list') {
    return (
      <div className="space-y-3">
        {achievements.map((achievement, index) => {
          const Icon = iconMap[achievement.icon || 'trophy'];
          
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 bg-white rounded-xl border hover:shadow-md transition-shadow"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: achievement.color || '#f59e0b' }}
              >
                <Icon className="w-6 h-6" />
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                <p className="text-sm text-gray-500">{achievement.description}</p>
              </div>
              
              {achievement.metric && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {achievement.metric.value}
                    <span className="text-sm text-gray-500 ml-1">{achievement.metric.unit}</span>
                  </div>
                  {achievement.metric.change && (
                    <div className={`text-sm ${achievement.metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {achievement.metric.change >= 0 ? '+' : ''}{achievement.metric.change}%
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {achievements.map((achievement, index) => {
        const Icon = iconMap[achievement.icon || 'trophy'];
        
        return (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-5 bg-white rounded-2xl border hover:shadow-lg transition-all hover:-translate-y-1"
          >
            {/* Glow effect */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity"
              style={{ backgroundColor: achievement.color || '#f59e0b' }}
            />
            
            <div className="relative">
              {/* Icon */}
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white mb-3"
                style={{ backgroundColor: achievement.color || '#f59e0b' }}
              >
                <Icon className="w-5 h-5" />
              </div>
              
              {/* Content */}
              <h4 className="font-semibold text-gray-900 text-sm mb-1">{achievement.title}</h4>
              <p className="text-xs text-gray-500 mb-3">{achievement.description}</p>
              
              {/* Metric */}
              {achievement.metric && (
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-gray-900">
                    {achievement.metric.value}
                  </span>
                  <span className="text-xs text-gray-500">{achievement.metric.unit}</span>
                  {achievement.metric.change && (
                    <span className={`text-xs ml-auto ${achievement.metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {achievement.metric.change >= 0 ? '↑' : '↓'} {Math.abs(achievement.metric.change)}%
                    </span>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
