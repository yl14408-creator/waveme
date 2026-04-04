import { motion } from 'framer-motion';
import { GraduationCap, Award, TrendingUp } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: number;
  maxGpa?: number;
  ranking?: string;
  achievements?: string[];
  logo?: string;
}

interface EducationCardProps {
  education: Education[];
  showGpa?: boolean;
  showRanking?: boolean;
  layout?: 'list' | 'timeline' | 'cards';
}

export function EducationCard({
  education,
  showGpa = true,
  showRanking = true,
  layout = 'cards',
}: EducationCardProps) {
  if (layout === 'timeline') {
    return (
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-blue-500" />
        
        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-16"
            >
              {/* Timeline dot */}
              <div className="absolute left-3 w-6 h-6 bg-white border-4 border-cyan-500 rounded-full" />
              
              <div className="bg-white rounded-2xl border p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{edu.school}</h3>
                    <p className="text-gray-600">{edu.degree} · {edu.field}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                  {edu.logo && (
                    <img src={edu.logo} alt={edu.school} className="w-12 h-12 object-contain" />
                  )}
                </div>
                
                {(showGpa && edu.gpa) && (
                  <div className="mt-4">
                    <ProgressBar
                      label={`GPA: ${edu.gpa}/${edu.maxGpa || 4.0}`}
                      value={edu.gpa}
                      max={edu.maxGpa || 4.0}
                      color="bg-gradient-to-r from-green-400 to-emerald-500"
                    />
                  </div>
                )}
                
                {edu.achievements && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {edu.achievements.map((achievement, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs"
                      >
                        <Award className="w-3 h-3" />
                        {achievement}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {education.map((edu, index) => (
        <motion.div
          key={edu.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl border p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-white">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{edu.school}</h3>
              <p className="text-sm text-gray-600">{edu.degree}</p>
              <p className="text-xs text-gray-400">{edu.field}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">{edu.startDate} - {edu.endDate}</span>
            </div>
            
            {(showGpa && edu.gpa) && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">GPA</span>
                  <span className="text-sm text-cyan-600 font-semibold">
                    {edu.gpa}/{edu.maxGpa || 4.0}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(edu.gpa / (edu.maxGpa || 4.0)) * 100}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  />
                </div>
              </div>
            )}
            
            {(showRanking && edu.ranking) && (
              <div className="mt-3 flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-gray-600">排名: {edu.ranking}</span>
              </div>
            )}
            
            {edu.achievements && (
              <div className="mt-4 space-y-2">
                {edu.achievements.map((achievement, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <Award className="w-4 h-4 text-amber-500" />
                    {achievement}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
