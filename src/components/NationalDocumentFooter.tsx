import React from 'react';
import { useRole } from '../context/RoleContext';

interface NationalDocumentFooterProps {
  documentRef?: string;
  showSignatures?: boolean;
  className?: string;
}

export const NationalDocumentFooter: React.FC<NationalDocumentFooterProps> = ({
  documentRef = 'RQM-NAT-DOC-2025',
  showSignatures = true,
  className = ''
}) => {
  const { headerInfo } = useRole();

  return (
    <div className={`w-full bg-white pt-6 pb-4 border-t border-slate-200 text-xs font-sans select-none ${className}`} dir="rtl">
      
      {/* Signatures Row */}
      {showSignatures && (
        <div className="grid grid-cols-3 gap-4 text-center font-black text-slate-800 mb-6">
          <div className="space-y-8">
            <p className="text-slate-600">توقيع أستاذ المادة/المحرر:</p>
            <p className="text-slate-400 font-normal">.................................</p>
          </div>
          <div className="space-y-8">
            <p className="text-slate-600">ختم وتوقيع المشرف/الإدارة:</p>
            <p className="text-slate-400 font-normal">.................................</p>
          </div>
          <div className="space-y-8">
            <p className="text-slate-600">اعتماد إدارة المدرسة/الوزارة:</p>
            <p className="text-slate-400 font-normal">.................................</p>
          </div>
        </div>
      )}

      {/* Developer Credit & Official Metadata */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-slate-100 text-[10px] font-bold text-slate-500">
        <div className="flex items-center gap-2">
          <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-black">
            {documentRef}
          </span>
          <span>وثيقة رسمية صادرة عبر المنصة الوطنية للوثائق التعليمية</span>
        </div>

        <div className="text-violet-700 font-black tracking-tight">
          {headerInfo.developerCredit}
        </div>
      </div>
    </div>
  );
};
