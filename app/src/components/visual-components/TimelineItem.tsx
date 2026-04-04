import { motion } from 'framer-motion';
import { Building2, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { MicroBrowser } from './MicroBrowser';

interface TimelineItemProps {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string[];
  achievements?: { label: string; value: string; change?: number }[];
  link?: string;
  photos?: string[];
  logo?: string;
  index?: number;
}

export function TimelineItem({
  title,
  company,
  location,
  startDate,
  endDate,
  current = false,
  description = [],
  achievements = [],
  link,
  photos = [],
  logo,
  index = 0,
}: TimelineItemProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="relative pl-8 pb-8 last:pb-0"
      >
        {/* Timeline line */}
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-blue-500 last:from-cyan-500 last:to-transparent" />
        
        {/* Timeline dot */}
        <div className="absolute left-0 top-1 w-6 h-6 bg-white border-4 border-cyan-500 rounded-full z-10" />

        {/* Content card */}
        <div className="bg-white rounded-2xl border p-5 hover:shadow-lg transition-shadow">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              {logo ? (
                <img src={logo} alt={company} className="w-12 h-12 object-contain rounded-lg bg-gray-50 p-2" />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-white">
                  <Building2 className="w-6 h-6" />
                </div>
              )}
              
              <div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-600">{company}</p>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {startDate} - {current ? '至今' : endDate}
                  </span>
                  {location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {location}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {link && (
              <button
                onClick={() => setShowPreview(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="预览链接"
              >
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Achievements */}
          {achievements.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-3">
              {achievements.map((achievement, i) => (
                <div 
                  key={i}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg"
                >
                  <span className="text-sm text-gray-600">{achievement.label}</span>
                  <span className="font-semibold text-cyan-600">{achievement.value}</span>
                  {achievement.change && (
                    <span className="text-xs text-green-500">
                      +{achievement.change}%
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          {description.length > 0 && (
            <ul className="space-y-2">
              {description.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          {/* Photos */}
          {photos.length > 0 && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {photos.map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  alt={`Photo ${i + 1}`}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0 hover:scale-105 transition-transform cursor-pointer"
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Micro Browser Preview */}
      <MicroBrowser
        url={link || ''}
        title={`${company} - 预览`}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </>
  );
}
