import React, { useState } from 'react';
import { useBookStudioStore } from '../store/useBookStudioStore';
import { CoverStylePreset } from '../types';
import { YEMENI_CURRICULUM_PRESETS } from '../data';
import { 
  X, Sparkles, Image, QrCode, Shield, Check, RefreshCw, 
  Layers, Palette, Type, Award, BookOpen, Wand2, CheckCircle2 
} from 'lucide-react';

interface SmartCoverEditorModalProps {
  onClose: () => void;
}

export const SmartCoverEditorModal: React.FC<SmartCoverEditorModalProps> = ({ onClose }) => {
  const { currentProject, updateCoverSettings, updateColorPalette, saveCurrentProject } = useBookStudioStore();

  if (!currentProject) return null;
  const cover = currentProject.cover;

  const [activeTab, setActiveTab] = useState<'text' | 'branding' | 'graphics' | 'border' | 'yemeni_presets'>('yemeni_presets');

  const handleSaveAndClose = () => {
    saveCurrentProject();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 font-sans select-none" dir="rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl h-[90vh] overflow-hidden shadow-2xl text-slate-100 flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-amber-500 to-orange-600 text-slate-950 rounded-2xl font-black">
              <Sparkles size={22} />
            </div>
            <div>
              <h3 className="text-base font-black text-white">مولد ومصمم الأغلفة المنهجية الذكي</h3>
              <p className="text-xs font-bold text-slate-400">تعديل العناوين، الأختام الوزارية، الـ QR، والأشكال الزخرفية للغلاف</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAndClose}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg transition-all"
            >
              حفظ الغلاف
            </button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Studio Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* Controls Panel (Left side in RTL) */}
          <div className="lg:col-span-5 bg-slate-950 border-l border-slate-800 p-5 overflow-y-auto custom-scrollbar space-y-6">
            
            {/* Nav Tabs */}
            <div className="grid grid-cols-5 gap-1 p-1 bg-slate-900 rounded-2xl border border-slate-800 text-[10px] font-bold">
              <button
                onClick={() => setActiveTab('yemeni_presets')}
                className={`py-2 rounded-xl transition-all ${activeTab === 'yemeni_presets' ? 'bg-amber-600 text-white font-black' : 'text-slate-400 hover:text-white'}`}
              >
                قوالب المناهج
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`py-2 rounded-xl transition-all ${activeTab === 'text' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                العناوين
              </button>
              <button
                onClick={() => setActiveTab('branding')}
                className={`py-2 rounded-xl transition-all ${activeTab === 'branding' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                الهوية
              </button>
              <button
                onClick={() => setActiveTab('graphics')}
                className={`py-2 rounded-xl transition-all ${activeTab === 'graphics' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                المساعد
              </button>
              <button
                onClick={() => setActiveTab('border')}
                className={`py-2 rounded-xl transition-all ${activeTab === 'border' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                الإطار
              </button>
            </div>

            {/* TAB 0: YEMENI CURRICULUM PRESETS (طبق الأصل) */}
            {activeTab === 'yemeni_presets' && (
              <div className="space-y-3">
                <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-2xl text-amber-200 text-xs font-bold leading-relaxed">
                  <Sparkles size={16} className="inline ml-1.5 text-amber-400" />
                  اختر من قوالب الكتب المدرسية الرسمية لوزارة التربية والتعليم (طبق الأصل للصور المرفقة):
                </div>

                <div className="space-y-2.5">
                  {YEMENI_CURRICULUM_PRESETS.map((p) => {
                    const isCurrent = cover.mainTitle === p.mainTitle;

                    return (
                      <div
                        key={p.id}
                        onClick={() => {
                          updateCoverSettings({
                            mainTitle: p.mainTitle,
                            subtitle: p.subtitle,
                            authorName: p.authorName,
                            reviewerName: p.reviewerName,
                            publisherName: p.publisherName,
                            editionNumber: p.editionNumber,
                            accentColor: p.accentColor,
                            backgroundColor: p.backgroundColor,
                            titleColor: p.titleColor,
                            heroGraphicType: p.heroGraphicType,
                            borderStyle: p.borderStyle,
                            hasDecorativeBorder: true,
                            showLogo: true
                          });
                        }}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isCurrent
                            ? 'bg-amber-950/60 border-amber-500 text-white ring-2 ring-amber-500/30'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-black text-white" style={{ backgroundColor: p.accentColor }}>
                              {p.badge}
                            </span>
                            <span className="text-xs font-black text-white">{p.mainTitle}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-bold">{p.subtitle}</p>
                        </div>

                        {isCurrent ? (
                          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                        ) : (
                          <button className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-[10px] font-black shrink-0">
                            تطبيق
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 1: Text Fields */}
            {activeTab === 'text' && (
              <div className="space-y-4 text-xs font-bold">
                <div>
                  <label className="block text-slate-300 mb-1">عنوان الكتاب الرئيسي:</label>
                  <input
                    type="text"
                    value={cover.mainTitle}
                    onChange={(e) => updateCoverSettings({ mainTitle: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-black text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">العنوان الفرعي / الصف:</label>
                  <input
                    type="text"
                    value={cover.subtitle}
                    onChange={(e) => updateCoverSettings({ subtitle: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1">اسم المؤلف:</label>
                    <input
                      type="text"
                      value={cover.authorName}
                      onChange={(e) => updateCoverSettings({ authorName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">اسم المراجع / المدقق:</label>
                    <input
                      type="text"
                      value={cover.reviewerName}
                      onChange={(e) => updateCoverSettings({ reviewerName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1">رقم الطبعة:</label>
                    <input
                      type="text"
                      value={cover.editionNumber}
                      onChange={(e) => updateCoverSettings({ editionNumber: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">سنة الإصدار:</label>
                    <input
                      type="text"
                      value={cover.publicationYear}
                      onChange={(e) => updateCoverSettings({ publicationYear: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Branding & Badges */}
            {activeTab === 'branding' && (
              <div className="space-y-4 text-xs font-bold">
                <div>
                  <label className="block text-slate-300 mb-1">جهة الإصدار / النشر:</label>
                  <input
                    type="text"
                    value={cover.publisherName}
                    onChange={(e) => updateCoverSettings({ publisherName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">رقم الردمك الدولي (ISBN):</label>
                  <input
                    type="text"
                    value={cover.isbnNumber || ''}
                    onChange={(e) => updateCoverSettings({ isbnNumber: e.target.value })}
                    placeholder="978-9953-0-1234-5"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">رابط أو رمز QR للتأكد والتفاعل:</label>
                  <input
                    type="text"
                    value={cover.qrCodeUrl || ''}
                    onChange={(e) => updateCoverSettings({ qrCodeUrl: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <label className="flex items-center gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cover.showLogo}
                    onChange={(e) => updateCoverSettings({ showLogo: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded border-slate-700"
                  />
                  <span>إظهار شعار منصة الرقيم والجهة الوزارية على الغلاف</span>
                </label>
              </div>
            )}

            {/* TAB 3: Subject Assistant & Graphics */}
            {activeTab === 'graphics' && (
              <div className="space-y-4 text-xs font-bold">
                <div className="p-3 bg-indigo-950/60 border border-indigo-500/30 rounded-2xl text-indigo-300 text-xs">
                  <Wand2 size={16} className="mb-1 text-amber-400" />
                  يقوم المساعد باقتراح زينة إيضاحية بصرية تتوافق تلقائياً مع مادة ({currentProject.subject}).
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'formula', name: 'رموز ومعادلات' },
                    { id: 'circuit', name: 'دوائر وموجات' },
                    { id: 'flask', name: 'دورق كيميائي' },
                    { id: 'dna', name: 'شريط أحياء DNA' },
                    { id: 'calligraphy', name: 'زخرفة عربية' },
                    { id: 'abstract', name: 'أشكال هندسية' }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => updateCoverSettings({ heroGraphicType: item.id as any })}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        cover.heroGraphicType === item.id 
                          ? 'bg-indigo-600 border-indigo-500 text-white font-black' 
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: Borders & Styles */}
            {activeTab === 'border' && (
              <div className="space-y-4 text-xs font-bold">
                <div>
                  <label className="block text-slate-300 mb-2">نمط الإطار الزخرفي:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'classic', name: 'إطار كلاسيكي مزدوج' },
                      { id: 'islamic_frame', name: 'إطار إسلامي رسمي' },
                      { id: 'modern_grid', name: 'إطار هندسي حديث' },
                      { id: 'minimal_bar', name: 'شريط جانبي أنيق' }
                    ].map(b => (
                      <button
                        key={b.id}
                        onClick={() => updateCoverSettings({ borderStyle: b.id as any })}
                        className={`p-3 rounded-2xl border text-center transition-all ${
                          cover.borderStyle === b.id 
                            ? 'bg-indigo-600 border-indigo-500 text-white font-black' 
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">اللون الأساسي للغلاف:</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={cover.accentColor}
                      onChange={(e) => updateCoverSettings({ accentColor: e.target.value })}
                      className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                    />
                    <span className="font-mono text-slate-300">{cover.accentColor}</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Real-time Cover Preview Area (Right side in RTL) */}
          <div className="lg:col-span-7 bg-slate-950/60 p-6 flex items-center justify-center overflow-auto custom-scrollbar">
            
            {/* Book Cover Canvas Mockup */}
            <div 
              className="w-[340px] h-[480px] bg-white rounded-2xl shadow-2xl relative p-6 flex flex-col justify-between text-slate-900 overflow-hidden border-4 border-slate-800"
              style={{
                borderColor: cover.accentColor,
                fontFamily: currentProject.fontPairing.headingFont
              }}
            >
              {/* Background Accent Top Bar */}
              <div 
                className="absolute top-0 right-0 left-0 h-28 opacity-15"
                style={{ backgroundColor: cover.accentColor }}
              />

              {/* Cover Top Header / Ministry Emblem */}
              <div className="relative z-10 flex items-center justify-between border-b pb-3 border-slate-200">
                <div className="text-[10px] font-black text-slate-700 leading-tight">
                  <span className="block">الجمهورية اليمنية</span>
                  <span className="block">{cover.publisherName}</span>
                </div>

                {cover.showLogo && (
                  <div className="p-1.5 bg-slate-900 text-white rounded-xl text-[10px] font-black tracking-widest">
                    رقيم
                  </div>
                )}
              </div>

              {/* Cover Center Hero Graphics & Titles */}
              <div className="relative z-10 my-auto text-center space-y-4">
                
                {/* Hero Illustration Icon */}
                <div 
                  className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: `${cover.accentColor}20`, color: cover.accentColor }}
                >
                  <BookOpen size={40} className="stroke-[2.5]" />
                </div>

                <div>
                  <h1 className="text-xl font-black text-slate-900 leading-tight">
                    {cover.mainTitle}
                  </h1>
                  <p className="text-xs font-bold text-slate-600 mt-1">
                    {cover.subtitle}
                  </p>
                </div>
              </div>

              {/* Cover Bottom Metadata Footer */}
              <div className="relative z-10 pt-3 border-t border-slate-200 flex items-end justify-between text-[9px] font-bold text-slate-600">
                <div>
                  <span className="block text-slate-900 font-black">إعداد: {cover.authorName}</span>
                  <span className="block">مراجعة: {cover.reviewerName}</span>
                  <span className="block text-slate-500 mt-0.5">{cover.editionNumber}</span>
                </div>

                {/* QR Code Placeholder */}
                {cover.qrCodeUrl && (
                  <div className="p-1 bg-slate-100 border border-slate-300 rounded-lg text-center">
                    <QrCode size={28} className="text-slate-800" />
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
