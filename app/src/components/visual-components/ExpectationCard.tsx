import { DollarSign, MapPin, Briefcase, Calendar, TrendingUp } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface ExpectationData {
  salary?: {
    min: number;
    max: number;
    expected: number;
    currency: string;
    industryAverage?: number;
  };
  location?: {
    preferred: string[];
    willingToRelocate: boolean;
  };
  position?: {
    title: string;
    level: string;
  };
  availability?: {
    noticePeriod: string;
    earliestStart: string;
  };
}

interface ExpectationCardProps {
  data: ExpectationData;
  industryBenchmarks?: {
    salaryRange: [number, number];
  };
}

export function ExpectationCard({ data, industryBenchmarks }: ExpectationCardProps) {
  const { salary, location, position, availability } = data;

  return (
    <div className="bg-white rounded-2xl border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-cyan-500" />
        求职期望
      </h3>

      <div className="space-y-6">
        {/* Salary Expectation */}
        {salary && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">期望薪资</span>
              </div>
              <span className="text-sm text-cyan-600 font-semibold">
                {salary.currency} {salary.expected.toLocaleString()}
              </span>
            </div>
            
            {industryBenchmarks && (
              <div className="relative">
                <ProgressBar
                  label=""
                  value={salary.expected}
                  max={industryBenchmarks.salaryRange[1]}
                  showPercentage={false}
                  color="bg-gradient-to-r from-cyan-500 to-blue-500"
                />
                <div className="flex justify-between mt-1 text-xs text-gray-400">
                  <span>行业最低: {industryBenchmarks.salaryRange[0].toLocaleString()}</span>
                  <span>行业最高: {industryBenchmarks.salaryRange[1].toLocaleString()}</span>
                </div>
                {salary.industryAverage && (
                  <div 
                    className="absolute top-0 w-0.5 h-2.5 bg-amber-400"
                    style={{ left: `${(salary.industryAverage / industryBenchmarks.salaryRange[1]) * 100}%` }}
                  >
                    <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-[10px] text-amber-600 whitespace-nowrap">
                      行业平均
                    </span>
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>接受范围: {salary.currency} {salary.min.toLocaleString()} - {salary.max.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Location */}
        {location && (
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">期望地点</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {location.preferred.map((city, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-cyan-50 text-cyan-700 rounded-lg text-sm"
                >
                  <MapPin className="w-3 h-3" />
                  {city}
                </span>
              ))}
              {location.willingToRelocate && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm">
                  接受异地
                </span>
              )}
            </div>
          </div>
        )}

        {/* Position */}
        {position && (
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">目标岗位</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-gray-900">{position.title}</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                {position.level}
              </span>
            </div>
          </div>
        )}

        {/* Availability */}
        {availability && (
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">到岗时间</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">离职通知期</p>
                <p className="font-medium text-gray-900">{availability.noticePeriod}</p>
              </div>
              <div className="p-3 bg-cyan-50 rounded-lg">
                <p className="text-xs text-cyan-600 mb-1">最早可到岗</p>
                <p className="font-medium text-cyan-700">{availability.earliestStart}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
