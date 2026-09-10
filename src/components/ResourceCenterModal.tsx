import React, { useState } from 'react';
import { 
  X, Image as ImageIcon, Shield, Stamp, Calculator, 
  Map, Shapes, Check, Copy, Sparkles, Download, Layers
} from 'lucide-react';

interface ResourceCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResource?: (resource: { type: string; content: string; name: string }) => void;
}

export const ResourceCenterModal: React.FC<ResourceCenterModalProps> = ({
  isOpen,
  onClose,
  onSelectResource
}) => {
  const [activeTab, setActiveTab] = useState<'logos' | 'math' | 'physics' | 'chemistry' | 'shapes' | 'credits'>('logos');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyOrInsert = (item: { type: string; content: string; name: string }) => {
    if (onSelectResource) {
      onSelectResource(item);
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(item.content);
      setCopiedItem(item.name);
      setTimeout(() => setCopiedItem(null), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans select-none" dir="rtl">
      <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-100 max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-900 text-white p-6 flex justify-between items-center relative overflow-hidden shrink-0">
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-amber-400 border border-white/10">
              <Shield size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black">مركز الموارد والرموز الوطنية الرسمية</h2>
              <p className="text-xs font-bold text-slate-300 mt-0.5">الشعارات الرسمية، الأختام، المعادلا والرموز العلمية الجاهزة</p>
            </div>
          </div>

          <button 
            type="button"
            onClick={onClose} 
            className="p-2 hover:bg-white/20 rounded-2xl text-slate-300 hover:text-white transition-colors relative z-10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 border-b border-slate-200 p-2 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'logos', label: 'الشعارات والأختام', icon: Stamp },
            { id: 'math', label: 'رموز الرياضيات', icon: Calculator },
            { id: 'physics', label: 'الفيزياء والهندسة', icon: Shapes },
            { id: 'chemistry', label: 'الكيمياء والأحياء', icon: Sparkles },
            { id: 'shapes', label: 'الأشكال والرؤوس', icon: Layers },
            { id: 'credits', label: 'بيانات التطوير', icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-white text-indigo-700 shadow-sm border border-slate-200' 
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">

          {/* Logos & Seals */}
          {activeTab === 'logos' && (
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">الشعارات السيادية والأختام المعتمدة</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Yemeni Emblem Card */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between hover:border-indigo-400 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-100 border border-amber-300 rounded-xl flex items-center justify-center text-amber-900 font-black text-lg">
                      🦅
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800">شعار الجمهورية اليمنية الرسمية</h4>
                      <p className="text-[10px] font-bold text-slate-500">مفرغ بدقة عالية للترويس والتصاميم</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopyOrInsert({ type: 'logo', content: 'شعار_الجمهورية_اليمنية', name: 'شعار الجمهورية' })}
                    className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-black hover:bg-indigo-700 transition-colors"
                  >
                    {copiedItem === 'شعار الجمهورية' ? <Check size={14} /> : 'إدراج / نسخ'}
                  </button>
                </div>

                {/* Ministry Seal Card */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between hover:border-indigo-400 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 border border-blue-300 rounded-xl flex items-center justify-center text-blue-900 font-black text-lg">
                      🏛️
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800">ختم الاعتماد الوزاري</h4>
                      <p className="text-[10px] font-bold text-slate-500">ختم دائري للشهادات والقرارات</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopyOrInsert({ type: 'seal', content: 'ختم_الوزارة_المعتمد', name: 'ختم الوزارة' })}
                    className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-black hover:bg-indigo-700 transition-colors"
                  >
                    {copiedItem === 'ختم الوزارة' ? <Check size={14} /> : 'إدراج / نسخ'}
                  </button>
                </div>

                {/* School Seal Card */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between hover:border-indigo-400 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 border border-purple-300 rounded-xl flex items-center justify-center text-purple-900 font-black text-lg">
                      🏫
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800">ختم إدارة المدرسة والمشتركات</h4>
                      <p className="text-[10px] font-bold text-slate-500">ختم المدرسة والتصحيح</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopyOrInsert({ type: 'seal', content: 'ختم_المدرسة_الرسمي', name: 'ختم المدرسة' })}
                    className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-black hover:bg-indigo-700 transition-colors"
                  >
                    {copiedItem === 'ختم المدرسة' ? <Check size={14} /> : 'إدراج / نسخ'}
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* Math Symbols */}
          {activeTab === 'math' && (
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">الرموز والمعادلات الرياضية العربية</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'جذر تربيعي', content: '√(س + ص)' },
                  { name: 'تكامل محدود', content: '∫ (س² + ٣س) د س' },
                  { name: 'مجموع (سيجما)', content: '∑ (س_ن)' },
                  { name: 'كسر اعتيادي', content: '¾' },
                  { name: 'زاوية وهيئة', content: '∠ أ ب جـ = ٩٠°' },
                  { name: 'المعامل باي (ط)', content: 'π ≈ ٣.١٤' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between gap-2">
                    <span className="text-[10px] font-bold text-slate-500">{item.name}</span>
                    <span className="text-sm font-black text-indigo-900 text-center py-2 bg-white rounded-lg border border-slate-100 dir-rtl">
                      {item.content}
                    </span>
                    <button
                      onClick={() => handleCopyOrInsert({ type: 'math', content: item.content, name: item.name })}
                      className="w-full py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[11px] font-black hover:bg-indigo-100 transition-colors"
                    >
                      نسخ إلى المحرر
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Physics Symbols */}
          {activeTab === 'physics' && (
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">رموز وصيغ الفيزياء والكهرباء</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'قانون أوم', content: 'جـ = ت × م' },
                  { name: 'القوة والحركة', content: 'ق = ك × جـ' },
                  { name: 'سرعة الضوء', content: 'س = ٣ × ١٠⁸ م/ث' },
                  { name: 'ثابت الجاذبية', content: 'جـ = ٩.٨ م/ث²' },
                  { name: 'الطاقة الحركية', content: 'ط_ح = ½ ك ع²' },
                  { name: 'رمز المقاومة Ω', content: 'Ω (أوم)' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between gap-2">
                    <span className="text-[10px] font-bold text-slate-500">{item.name}</span>
                    <span className="text-sm font-black text-indigo-900 text-center py-2 bg-white rounded-lg border border-slate-100">
                      {item.content}
                    </span>
                    <button
                      onClick={() => handleCopyOrInsert({ type: 'physics', content: item.content, name: item.name })}
                      className="w-full py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[11px] font-black hover:bg-indigo-100 transition-colors"
                    >
                      نسخ إلى المحرر
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chemistry Symbols */}
          {activeTab === 'chemistry' && (
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">الصيغ الكيميائية والتفاعلات</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'معادلة الماء', content: '2H₂ + O₂ → 2H₂O' },
                  { name: 'تفاعل الحمض والقاعدة', content: 'HCl + NaOH → NaCl + H₂O' },
                  { name: 'حمض الكبريتيك', content: 'H₂SO₄' },
                  { name: 'غاز ثاني أكسيد الكربون', content: 'CO₂' },
                  { name: 'سكر الجلوكوز', content: 'C₆H₁₂O₆' },
                  { name: 'أيون الهيدرونيوم', content: 'H₃O⁺' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between gap-2">
                    <span className="text-[10px] font-bold text-slate-500">{item.name}</span>
                    <span className="text-sm font-black text-indigo-900 text-center py-2 bg-white rounded-lg border border-slate-100 ltr">
                      {item.content}
                    </span>
                    <button
                      onClick={() => handleCopyOrInsert({ type: 'chemistry', content: item.content, name: item.name })}
                      className="w-full py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[11px] font-black hover:bg-indigo-100 transition-colors"
                    >
                      نسخ إلى المحرر
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shapes & Headers */}
          {activeTab === 'shapes' && (
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">الترويسات والأطر الرسمية المعتمدة</h3>
              <div className="space-y-3">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <h4 className="text-xs font-black text-slate-800">الترويسة الوزارية الكاملة (يمين ويسار)</h4>
                  <div className="bg-white p-3 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 flex justify-between items-center">
                    <div className="text-right">
                      <p>الجمهورية اليمنية</p>
                      <p>وزارة التربية والتعليم</p>
                      <p>مكتب التربية والتعليم</p>
                    </div>
                    <div className="text-center font-black text-amber-800">
                      🦅 [شعار الجمهورية]
                    </div>
                    <div className="text-left">
                      <p>المادة: الرياضيات</p>
                      <p>التاريخ: ..../..../٢٠٢٥م</p>
                      <p>الزمن: ساعتان</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopyOrInsert({ type: 'header', content: 'ترويسة_وزارية_كاملة', name: 'ترويسة وزارية' })}
                    className="w-full py-2 bg-indigo-600 text-white rounded-xl text-xs font-black hover:bg-indigo-700 transition-colors"
                  >
                    إدراج الترويسة بالكامل في الوثيقة
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Credits & Developer Info */}
          {activeTab === 'credits' && (
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 rounded-3xl space-y-4 border border-indigo-900/50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-400 text-slate-900 rounded-2xl flex items-center justify-center font-black text-xl">
                  S
                </div>
                <div>
                  <h3 className="font-black text-lg">المنصة الوطنية للوثائق التعليمية - الرقيم</h3>
                  <p className="text-xs font-bold text-amber-300">برمجة وتطوير المهندس//:سهيل الهزبري</p>
                </div>
              </div>

              <p className="text-xs font-bold text-slate-300 leading-relaxed">
                تطبيق الرقيم هو نظام متكامل ومحرك وثائق عالي الاعتمادية مخصص للمنظومة التعليمية الرسمية. يعمل بالكامل دون إنترنت كـ PWA، ويوفر بيئة موحدة تحاكي أرقى المعايير العالمية مع الحفاظ على الهوية الوطنية السيادية.
              </p>

              <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] font-bold text-slate-400">
                <span>الإصدار الوطني: v4.2.0 (أوفلاين PWA)</span>
                <span>جميع الحقوق محفوظة للمطور © 2025م</span>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center shrink-0">
          <span className="text-xs font-bold text-slate-500">
            {copiedItem ? `تم نسخ: "${copiedItem}" بنجاح!` : 'انقر على أي عنصر لإدراجه أو نسخه'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-black transition-colors"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
