/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * الرقيم التربوي - مكوّن الترويسة القياسية المتجاوبة (Standardized Education Header)
 * يعكس بدقة بيانات الدولة، الوزارة، التسلسل الإداري، والخيارات البصرية المعتمدة في الـ Profile
 * برمجة وتصميم وتطوير المهندس سهيل الهزبري
 */

import React from 'react';
import { DocumentStandardProfile } from '../core/standards/EducationStandardsTypes';

interface StandardizedHeaderProps {
  profile: DocumentStandardProfile;
  documentTitle?: string;
  subjectName?: string;
  examDuration?: string;
  className?: string;
}

export const StandardizedEducationHeader: React.FC<StandardizedHeaderProps> = ({
  profile,
  documentTitle,
  subjectName,
  examDuration,
  className = '',
}) => {
  const { authority, header, typography, brand, documentType } = profile;

  const titleToShow = documentTitle || documentType.name;

  return (
    <header 
      className={`w-full bg-white select-none font-sans ${header.headerBorderBottom ? 'border-b-2' : ''} ${className}`}
      style={{
        borderColor: brand.primaryColor || '#0f172a',
        fontFamily: typography.primaryFont,
        direction: typography.direction,
      }}
      dir="rtl"
    >
      <div className="flex items-start justify-between gap-3 p-4">
        
        {/* الجانب الأيمن: التسلسل الإداري المتدرج */}
        <div className="flex-1 text-right space-y-1">
          {header.showCountryName && (
            <p className="text-sm font-black text-slate-950 leading-tight">
              {authority.countryName}
            </p>
          )}
          {header.showMinistry && (
            <p className="text-xs font-black text-slate-800 leading-tight">
              {authority.ministry}
            </p>
          )}
          {header.showGovernorate && authority.governorateOrRegion && (
            <p className="text-[11px] font-bold text-slate-700 leading-tight">
              {authority.governorateOrRegion}
            </p>
          )}
          {header.showDirectorate && authority.directorate && (
            <p className="text-[11px] font-semibold text-slate-600 leading-tight">
              {authority.directorate}
            </p>
          )}
          {header.showSchoolName && (
            <p className="text-xs font-black text-slate-900 mt-1">
              {authority.schoolName} ({authority.schoolStage})
            </p>
          )}
        </div>

        {/* المنتصف: الشعار / الوسام وعنوان الوثيقة ونوعها */}
        <div className="flex flex-col items-center justify-center text-center px-2 flex-1">
          {header.showEmblem && (
            <div 
              className="rounded-full bg-slate-50 border flex items-center justify-center shadow-sm mb-1"
              style={{ 
                width: `${header.emblemSize}px`, 
                height: `${header.emblemSize}px`,
                borderColor: brand.primaryColor,
              }}
            >
              {authority.customLogoUrl ? (
                <img 
                  src={authority.customLogoUrl} 
                  alt="شعار المؤسسة" 
                  className="w-full h-full object-contain rounded-full"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-2xl select-none">
                  {authority.customSealEmoji || '🦅'}
                </span>
              )}
            </div>
          )}

          {header.showDocumentTitle && (
            <div className="mt-0.5">
              <h1 
                className="text-sm md:text-base font-black px-3 py-0.5 rounded-lg inline-block"
                style={{ 
                  color: brand.primaryColor, 
                  backgroundColor: `${brand.primaryColor}10` 
                }}
              >
                {titleToShow}
              </h1>
            </div>
          )}

          {subjectName && (
            <p className="text-xs font-black text-slate-800 mt-0.5">
              مادة: <span className="underline decoration-2">{subjectName}</span>
            </p>
          )}
        </div>

        {/* الجانب الأيسر: البيانات التوثيقية والزمنية والامتحانية */}
        <div className="flex-1 text-left space-y-1 text-slate-700">
          {header.showAcademicYear && (
            <p className="text-xs font-bold leading-tight">
              العام الدراسي: <span className="font-black text-slate-900">{authority.academicYear}</span>
            </p>
          )}
          {header.showTerm && (
            <p className="text-xs font-bold leading-tight">
              {authority.termName}
            </p>
          )}
          {examDuration && (
            <p className="text-xs font-bold text-slate-800 leading-tight">
              الزمن: <span className="font-black">{examDuration}</span>
            </p>
          )}
          {header.showDate && (
            <p className="text-[10px] font-semibold text-slate-500 leading-tight">
              التاريخ: {new Date().toLocaleDateString('ar-EG')}
            </p>
          )}
          {header.showRefNumber && (
            <p className="text-[10px] font-bold text-slate-600 font-mono" dir="ltr">
              Doc-ID: #{profile.id.slice(-6).toUpperCase()}
            </p>
          )}
        </div>

      </div>

      {/* سطر تصنيف المعيار (رسمي المظهر / تربوي) */}
      <div className="bg-slate-50 px-4 py-1 border-t border-slate-200/80 flex items-center justify-between text-[10px] font-bold text-slate-500">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>معيار الوثيقة: {documentType.name} (قالب رسمي المظهر قابل للاعتماد)</span>
        </span>
        <span>اسم الطالب: ................................................................</span>
        <span>الشعبة / الصف: ................</span>
      </div>
    </header>
  );
};
