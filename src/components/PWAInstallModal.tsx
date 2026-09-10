import React, { useState } from 'react';
import { Download, X, Smartphone, Monitor, CheckCircle2, Sparkles, Share2, PlusSquare } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, installApp } = usePWA();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans select-none" dir="rtl">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col border border-slate-100 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-700 via-indigo-700 to-purple-800 text-white p-6 relative overflow-hidden flex justify-between items-center">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shadow-inner">
              <Download size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">تثبيت تطبيق الرقيم (PWA)</h2>
              <p className="text-xs font-bold text-violet-100 mt-0.5">تطبيق ويب تقدمي يعمل كأنها تطبيق أجهزة ذكية بدون إنترنت</p>
            </div>
          </div>

          <button 
            type="button"
            onClick={onClose} 
            className="p-2 hover:bg-white/20 rounded-2xl text-violet-100 hover:text-white transition-all relative z-10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          
          {/* Features highlight */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-violet-50/70 border border-violet-100 p-3 rounded-2xl flex items-start gap-2.5">
              <CheckCircle2 size={18} className="text-violet-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-slate-800">عمل كامل بدون إنترنت</h4>
                <p className="text-[11px] font-bold text-slate-500 mt-0.5">تصميم الامتحانات والأتمتة دون حجب أو انقطاع</p>
              </div>
            </div>

            <div className="bg-indigo-50/70 border border-indigo-100 p-3 rounded-2xl flex items-start gap-2.5">
              <CheckCircle2 size={18} className="text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-slate-800">وصول سريع من الشاشة</h4>
                <p className="text-[11px] font-bold text-slate-500 mt-0.5">أيقونة خاصة واختصارات فورية على سطح المكتب</p>
              </div>
            </div>
          </div>

          {/* Dynamic Install State */}
          {isInstalled ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-2">
              <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="font-black text-emerald-900 text-sm">التطبيق مثبت بالفعل على جهازك!</h3>
              <p className="text-xs font-bold text-emerald-700">يمكنك تشغيله مباشرة من أيقونة الشاشة الرئيسية أو سطح المكتب.</p>
            </div>
          ) : isInstallable ? (
            <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl p-4 text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-violet-600 text-white px-3 py-1 rounded-full text-[11px] font-bold">
                <Sparkles size={13} />
                <span>جاهز للتثبيت بنقرة واحدة</span>
              </div>
              <p className="text-xs font-bold text-slate-700 leading-relaxed">
                اضغط على الزر أدناه لتثبيت "الرقيم" كتطبيق مستقل على كمبيوترك أو هاتفك الذكي.
              </p>
              <button
                onClick={async () => {
                  await installApp();
                  onClose();
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-xs font-black shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Download size={18} className="stroke-[2.5]" />
                <span>تثبيت تطبيق الرقيم الآن</span>
              </button>
            </div>
          ) : isIOS ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black text-slate-800">
                <Smartphone size={16} className="text-violet-600" />
                <span>طريقة التثبيت على آيفون وآيباد (iOS):</span>
              </div>
              <ol className="text-xs font-bold text-slate-600 space-y-2 pr-2 list-decimal list-inside">
                <li className="flex items-center gap-2">
                  <span>انقر على زر المشاركة</span>
                  <Share2 size={15} className="text-blue-500 inline" />
                  <span>في متصفح Safari.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>اختر "الإضافة إلى الشاشة الرئيسية"</span>
                  <PlusSquare size={15} className="text-slate-700 inline" />
                </li>
                <li>اضغط على "إضافة" بالزاوية العلوية.</li>
              </ol>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black text-slate-800">
                <Monitor size={16} className="text-violet-600" />
                <span>كيفية تثبيت التطبيق يدوياً من المتصفح:</span>
              </div>
              <ul className="text-xs font-bold text-slate-600 space-y-2 list-disc list-inside">
                <li>في Chrome / Edge: اضغط أيقونة التثبيت <Download size={13} className="inline mx-1 text-indigo-600" /> في شريط العنوان بالأعلى.</li>
                <li>أو فتح القائمة (⋮) ثم اختيار "Install Raqeem" / "تثبيت تطبيق الرقيم".</li>
              </ul>
            </div>
          )}

          {/* Close button */}
          <div className="pt-2 flex justify-end border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-xs font-extrabold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              إغلاق
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
