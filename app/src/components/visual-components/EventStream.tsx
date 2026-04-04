import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Eye, 
  MousePointer, 
  ExternalLink, 
  Clock,
  MapPin
} from 'lucide-react';

interface Event {
  id: string;
  type: 'view' | 'click' | 'scroll' | 'hover';
  user: string;
  location: string;
  target: string;
  timestamp: Date;
  avatar?: string;
}

interface EventStreamProps {
  events?: Event[];
  maxEvents?: number;
  autoScroll?: boolean;
}

const eventIcons = {
  view: <Eye className="w-4 h-4" />,
  click: <MousePointer className="w-4 h-4" />,
  scroll: <ExternalLink className="w-4 h-4" />,
  hover: <Clock className="w-4 h-4" />,
};

const eventColors = {
  view: 'bg-blue-100 text-blue-600',
  click: 'bg-green-100 text-green-600',
  scroll: 'bg-purple-100 text-purple-600',
  hover: 'bg-amber-100 text-amber-600',
};

// Generate mock events
function generateMockEvents(count: number): Event[] {
  const actions = ['查看了工作经历', '点击了项目链接', '浏览了技能列表', '查看了联系方式'];
  const locations = ['上海', '北京', '深圳', '杭州', '广州', '成都'];
  const users = ['访客A', '访客B', '访客C', '访客D', '访客E'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `event-${i}`,
    type: ['view', 'click', 'scroll', 'hover'][Math.floor(Math.random() * 4)] as Event['type'],
    user: users[Math.floor(Math.random() * users.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    target: actions[Math.floor(Math.random() * actions.length)],
    timestamp: new Date(Date.now() - Math.random() * 300000),
  }));
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  if (seconds < 10) return '刚刚';
  if (seconds < 60) return `${seconds}秒前`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}分钟前`;
  return `${Math.floor(seconds / 3600)}小时前`;
}

export function EventStream({
  events: propEvents,
  maxEvents = 10,
}: EventStreamProps) {
  const [events, setEvents] = useState<Event[]>(propEvents || generateMockEvents(5));

  // Simulate new events
  useEffect(() => {
    if (!propEvents) {
      const interval = setInterval(() => {
        setEvents(prev => {
          const newEvent = generateMockEvents(1)[0];
          newEvent.timestamp = new Date();
          const updated = [newEvent, ...prev].slice(0, maxEvents);
          return updated;
        });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [propEvents, maxEvents]);

  return (
    <div className="bg-white rounded-2xl border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          实时事件流
        </h3>
        <span className="text-xs text-gray-500">
          {events.length} 个事件
        </span>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {events.map((event) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {/* Avatar */}
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                {event.user.charAt(0)}
              </div>

              {/* Event icon */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${eventColors[event.type]}`}>
                {eventIcons[event.type]}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 truncate">
                  <span className="font-medium">{event.user}</span>
                  {' '}{event.target}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  {event.location}
                </div>
              </div>

              {/* Time */}
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {formatTimeAgo(event.timestamp)}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
