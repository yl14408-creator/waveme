import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface Skill {
  name: string;
  level: number;
  category?: string;
}

interface RadarSkillsProps {
  skills: Skill[];
  size?: 'sm' | 'md' | 'lg';
  showLegend?: boolean;
  color?: string;
}

export function RadarSkills({
  skills,
  size = 'md',
  showLegend = true,
  color = '#06b6d4',
}: RadarSkillsProps) {
  const sizeClasses = {
    sm: 'h-48',
    md: 'h-64',
    lg: 'h-80',
  };

  const data = skills.map(skill => ({
    skill: skill.name,
    level: skill.level,
    fullMark: 100,
  }));

  return (
    <div className="bg-white rounded-2xl border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">技能雷达</h3>
      
      <div className={sizeClasses[size]}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis
              dataKey="skill"
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: '#9ca3af', fontSize: 10 }}
            />
            <Radar
              name="技能水平"
              dataKey="level"
              stroke={color}
              strokeWidth={2}
              fill={color}
              fillOpacity={0.3}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-2 rounded-lg shadow-lg border">
                      <p className="font-medium text-gray-900">
                        {payload[0].payload.skill}
                      </p>
                      <p style={{ color }}>
                        {payload[0].value}%
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {showLegend && (
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg"
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: `hsl(${180 + index * 20}, 70%, 50%)`,
                }}
              />
              <span className="text-xs text-gray-600">{skill.name}</span>
              <span className="text-xs text-cyan-600 font-medium">{skill.level}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
