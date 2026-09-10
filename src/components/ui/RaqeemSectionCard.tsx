/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * الرقيم التربوي - بطاقة الأقسام الرئيسية (RaqeemSectionCard)
 * بطاقة موحدة تعكس معايير التصميم المؤسسي السيادي (Government-Grade Institutional UX).
 * برمجة وتصميم وتطوير المهندس سهيل الهزبري
 */

import React from 'react';
import { LucideIcon, ArrowLeft } from 'lucide-react';

export interface RaqeemSectionCardProps {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  countLabel?: string;
  route: string;
  onClick: (route: string) => void;
  accentColor?: 'primary' | 'secondary' | 'amber';
}

export const RaqeemSectionCard: React.FC<RaqeemSectionCardProps> = ({
  id,
  title,
  subtitle,
  description,
  icon: Icon,
  badge,
  countLabel,
  route,
  onClick,
  accentColor = 'primary',
}) => {
  return (
    <div
      onClick={() => onClick(route)}
      className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-700 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer select-none text-right overflow-hidden focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-hidden"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(route);
        }
      }}
    >
      {/* Top row: Icon & Badges */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 text-[#004B6E] dark:text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#004B6E] group-hover:text-white dark:group-hover:bg-sky-600 transition-all duration-200 shadow-2xs">
          <Icon size={24} strokeWidth={2.2} />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          {badge && (
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-[#004B6E] dark:text-sky-300 border border-sky-200 dark:border-sky-800">
              {badge}
            </span>
          )}
          {countLabel && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 tabular-nums">
              {countLabel}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1.5 mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-[#004B6E] dark:group-hover:text-sky-300 transition-colors leading-snug">
            {title}
          </h3>
          {subtitle && (
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
              ({subtitle})
            </span>
          )}
        </div>
        <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom Action Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs font-bold text-slate-400 dark:text-slate-500 group-hover:text-[#004B6E] dark:group-hover:text-sky-400 transition-colors">
        <span className="text-[11px] font-extrabold group-hover:underline">فتح القسم</span>
        <div className="w-7 h-7 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-sky-50 dark:group-hover:bg-slate-700 transition-colors">
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
        </div>
      </div>
    </div>
  );
};
