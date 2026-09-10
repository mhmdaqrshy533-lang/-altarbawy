import React from 'react';
import * as Icons from 'lucide-react';
import { ServiceTool } from '../../services/servicesRegistry';

export interface ServiceCardProps {
  tool?: ServiceTool;
  title?: string;
  description?: string;
  iconName?: string;
  badge?: string;
  badgeColor?: string;
  category?: string;
  status?: string;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent) => void;
  onClick?: () => void;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  tool,
  title,
  description,
  iconName,
  badge,
  badgeColor,
  isFavorite,
  onToggleFavorite,
  onClick,
  className = '',
}) => {
  const cardTitle = title || tool?.name || 'خدمة جديدة';
  const cardDesc = description || tool?.description || '';
  const iconKey = iconName || tool?.iconName || 'Workflow';
  const cardBadge = badge || tool?.badge;

  // Dynamically lookup Lucide icon
  const IconComponent = (Icons as any)[iconKey] || Icons.Workflow;

  return (
    <div
      onClick={onClick}
      className={`group relative bg-white rounded-3xl p-5 border border-slate-200/90 hover:border-sky-300 shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Top bar with icon and badge/favorite */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="w-12 h-12 rounded-2xl bg-sky-50/90 text-[#004B6E] flex items-center justify-center border border-sky-100 group-hover:bg-[#004B6E] group-hover:text-[#38BDF8] group-hover:scale-105 transition-all duration-300 shadow-xs">
            <IconComponent size={22} className="shrink-0" />
          </div>

          <div className="flex items-center gap-2">
            {cardBadge && (
              <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${
                badgeColor || 'bg-sky-50 text-sky-800 border-sky-200'
              }`}>
                {cardBadge}
              </span>
            )}
            {onToggleFavorite && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(e);
                }}
                className={`p-1.5 rounded-xl transition-colors ${
                  isFavorite ? 'text-amber-500 bg-amber-50' : 'text-slate-300 hover:text-amber-500 hover:bg-slate-50'
                }`}
                title={isFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
              >
                <Icons.Star size={16} className={isFavorite ? 'fill-amber-500' : ''} />
              </button>
            )}
          </div>
        </div>

        {/* Title and Description */}
        <h3 className="font-black text-slate-900 text-sm sm:text-base group-hover:text-[#004B6E] transition-colors leading-snug mb-1.5">
          {cardTitle}
        </h3>
        <p className="text-xs font-bold text-slate-500 line-clamp-2 leading-relaxed">
          {cardDesc}
        </p>
      </div>

      {/* Footer Action */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-[#004B6E] group-hover:text-sky-600 transition-colors">
        <span>فتح الخدمة</span>
        <Icons.ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
