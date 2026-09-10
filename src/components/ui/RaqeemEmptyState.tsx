import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const RaqeemEmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div 
      className={`flex flex-col items-center justify-center p-8 text-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 ${className}`}
      dir="rtl"
    >
      <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-[#004B6E] shadow-sm mb-4">
        <Icon size={28} />
      </div>
      <h4 className="text-base font-black text-slate-800 mb-1">{title}</h4>
      <p className="text-xs font-medium text-slate-500 max-w-sm mb-5 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-[#004B6E] hover:bg-[#003B57] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2"
        >
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};
