import React from 'react';
import * as Icons from 'lucide-react';

export interface KpiCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: string;
  trendType?: 'up' | 'down' | 'neutral';
  iconName?: string;
  iconBg?: string;
  iconColor?: string;
  onClick?: () => void;
  className?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtext,
  trend,
  trendType = 'up',
  iconName = 'BarChart3',
  iconBg = 'bg-sky-50',
  iconColor = 'text-[#004B6E]',
  onClick,
  className = '',
}) => {
  const IconComponent = (Icons as any)[iconName] || Icons.BarChart3;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 ${
        onClick ? 'cursor-pointer hover:border-sky-300' : ''
      } ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`w-11 h-11 rounded-2xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0 border border-slate-100`}>
          <IconComponent size={20} />
        </div>
        {trend && (
          <span className={`text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 ${
            trendType === 'up' 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : trendType === 'down'
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-slate-50 text-slate-700 border border-slate-200'
          }`}>
            {trend}
          </span>
        )}
      </div>

      <p className="text-xs font-bold text-slate-500 mb-1">{title}</p>
      <div className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight font-mono">
        {value}
      </div>
      {subtext && (
        <p className="text-[11px] font-bold text-slate-400 mt-1 truncate">
          {subtext}
        </p>
      )}
    </div>
  );
};
