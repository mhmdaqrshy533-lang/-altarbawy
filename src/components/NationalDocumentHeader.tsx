import React from 'react';
import { useRole } from '../context/RoleContext';

interface NationalDocumentHeaderProps {
  documentTitle?: string;
  documentNumber?: string;
  className?: string;
}

export const NationalDocumentHeader: React.FC<NationalDocumentHeaderProps> = ({
  documentTitle,
  documentNumber,
  className = ''
}) => {
  const { headerInfo } = useRole();

  return (
    <div className={`w-full bg-white p-4 border-b-2 border-slate-900 font-sans select-none ${className}`} dir="rtl">
      <div className="flex items-center justify-between gap-4 text-xs font-black text-slate-800">
        
        {/* Right Info */}
        <div className="space-y-0.5 text-right flex-1">
          <p className="text-slate-900 font-black">{headerInfo.republic}</p>
          <p className="text-slate-700 font-bold">{headerInfo.ministry}</p>
          <p className="text-slate-600 font-bold">{headerInfo.office}</p>
          <p className="text-slate-500 font-bold">{headerInfo.schoolName}</p>
        </div>

        {/* Center Emblem & Title */}
        <div className="flex flex-col items-center justify-center text-center px-4 space-y-1">
          {headerInfo.showSeal && (
            <div className="w-14 h-14 rounded-full bg-slate-50 border-2 border-amber-600/60 flex items-center justify-center shadow-sm">
              <span className="text-2xl">🦅</span>
            </div>
          )}
          {documentTitle && (
            <h2 className="text-base font-black text-slate-900 border-b-2 border-amber-500 pb-0.5 mt-1">
              {documentTitle}
            </h2>
          )}
        </div>

        {/* Left Info */}
        <div className="space-y-0.5 text-left flex-1">
          <p className="text-slate-700 font-bold">العام الدراسي: {headerInfo.academicYear}</p>
          <p className="text-slate-600 font-bold">{headerInfo.term}</p>
          {documentNumber && <p className="text-slate-800 font-black dir-ltr">Ref: {documentNumber}</p>}
          <p className="text-slate-500 font-bold">المحرر: {headerInfo.authorName}</p>
        </div>

      </div>
    </div>
  );
};
