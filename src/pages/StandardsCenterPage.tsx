/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * الرقيم التربوي - مركز المعايير والهوية العربية للوثائق التعليمية (Arabic Standards Center)
 * واجهة تحكم بصرية كاملة (Visual No-Code) لضبط الدولة، الوزارة، الهيكل الإداري،
 * نوع الوثيقة، نظام الدرجات، والهوية البصرية مع معاينة فورية لورقة A4.
 * برمجة وتصميم وتطوير المهندس سهيل الهزبري
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, Globe, FileSpreadsheet, Palette, Check, RefreshCw, 
  Download, Upload, ArrowRight, ShieldCheck, Sparkles, Layout,
  Sliders, Award, School, ChevronRight, FileText
} from 'lucide-react';
import { EducationStandardsEngine } from '../core/standards/EducationStandardsEngine';
import { DocumentStandardProfile, CountryProfile } from '../core/standards/EducationStandardsTypes';
import { StandardizedEducationHeader } from '../components/StandardizedEducationHeader';
import { RAQEEM_OFFICIAL_CREDIT } from '../core/DocumentAbstraction';

export const StandardsCenterPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [profile, setProfile] = useState<DocumentStandardProfile>(() => 
    EducationStandardsEngine.getActiveProfile()
  );
  const [activeTab, setActiveTab] = useState<'country' | 'hierarchy' | 'doctype' | 'branding' | 'grades'>('country');
  const [saveToast, setSaveToast] = useState(false);
  const [importNotice, setImportNotice] = useState<string | null>(null);

  const countries = EducationStandardsEngine.getAllCountries();
  const docTypes = EducationStandardsEngine.getAllDocumentTypes();
  const gradeSystems = EducationStandardsEngine.getAllGradeSystems();

  useEffect(() => {
    const unsub = EducationStandardsEngine.subscribe(() => {
      setProfile(EducationStandardsEngine.getActiveProfile());
    });
    return unsub;
  }, []);

  const handleCountryChange = (country: CountryProfile) => {
    const updated = EducationStandardsEngine.createDefaultProfile(country.id, profile.documentType.id);
    EducationStandardsEngine.setActiveProfile(updated);
    setProfile(updated);
    triggerSaveToast();
  };

  const handleDocTypeChange = (docTypeId: string) => {
    const docType = EducationStandardsEngine.getDocumentTypeById(docTypeId);
    if (!docType) return;
    const updated: DocumentStandardProfile = {
      ...profile,
      documentType: docType,
      title: `${docType.name} — ${profile.authority.countryName}`,
    };
    EducationStandardsEngine.setActiveProfile(updated);
    setProfile(updated);
    triggerSaveToast();
  };

  const handleAuthorityField = (field: string, value: string) => {
    const updated: DocumentStandardProfile = {
      ...profile,
      authority: {
        ...profile.authority,
        [field]: value,
      },
    };
    EducationStandardsEngine.setActiveProfile(updated);
    setProfile(updated);
    triggerSaveToast();
  };

  const handleBrandColor = (color: string) => {
    const updated: DocumentStandardProfile = {
      ...profile,
      brand: {
        ...profile.brand,
        primaryColor: color,
      },
    };
    EducationStandardsEngine.setActiveProfile(updated);
    setProfile(updated);
    triggerSaveToast();
  };

  const triggerSaveToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleExport = () => {
    const jsonStr = EducationStandardsEngine.exportProfileJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `raqeem-standard-profile-${profile.authority.countryId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = EducationStandardsEngine.importProfileJSON(content);
      if (success) {
        setImportNotice('تم استيراد معيار الوثيقة بنجاح');
        setTimeout(() => setImportNotice(null), 3000);
      } else {
        setImportNotice('عفواً، الملف غير متوافق مع نظام معايير الرقيم');
        setTimeout(() => setImportNotice(null), 3000);
      }
    };
    reader.readAsText(file);
  };

  const brandColors = [
    { name: 'كحلي رسمي ملكي', hex: '#004B6E' },
    { name: 'أخضر تربوي وطني', hex: '#047857' },
    { name: 'عنابي وقور', hex: '#881337' },
    { name: 'نيلي معاصر', hex: '#3730a3' },
    { name: 'رمادي رصاصي رسمي', hex: '#1e293b' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none" dir="rtl">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-2xl transition-all"
              title="العودة"
            >
              <ArrowRight size={20} />
            </button>
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#004B6E] flex items-center justify-center font-black">
              <Building2 size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-slate-900">
                  مركز المعايير والهوية العربية للوثائق التعليمية
                </h1>
                <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                  معايير قابلة للتخصيص
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500">
                إدارة بروفايل الدولة والجهة الرسمية ونظام الدرجات والترويسة لجميع محررات المنظومة
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {saveToast && (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1">
                <Check size={14} />
                <span>تم الحفظ في المحرك</span>
              </span>
            )}
            
            <button
              onClick={handleExport}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
              title="تصدير المعيار الحالي كملف"
            >
              <Download size={14} />
              <span>تصدير المعيار</span>
            </button>

            <label className="px-3.5 py-2 bg-[#004B6E] hover:bg-[#003B57] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all">
              <Upload size={14} />
              <span>استيراد معيار</span>
              <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
            </label>
          </div>
        </div>
      </header>

      {importNotice && (
        <div className="bg-amber-500 text-white text-center py-2 text-xs font-bold shadow-sm">
          {importNotice}
        </div>
      )}

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* Left Side (Settings Controller - 5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Navigation Pills */}
          <div className="bg-white p-1.5 rounded-2xl border border-slate-200 flex items-center gap-1 text-xs font-black text-slate-600 shadow-2xs">
            <button
              onClick={() => setActiveTab('country')}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'country' ? 'bg-[#004B6E] text-white shadow-xs' : 'hover:bg-slate-50'
              }`}
            >
              <Globe size={14} />
              <span>الدولة</span>
            </button>
            <button
              onClick={() => setActiveTab('hierarchy')}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'hierarchy' ? 'bg-[#004B6E] text-white shadow-xs' : 'hover:bg-slate-50'
              }`}
            >
              <School size={14} />
              <span>الجهة</span>
            </button>
            <button
              onClick={() => setActiveTab('doctype')}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'doctype' ? 'bg-[#004B6E] text-white shadow-xs' : 'hover:bg-slate-50'
              }`}
            >
              <FileSpreadsheet size={14} />
              <span>النوع</span>
            </button>
            <button
              onClick={() => setActiveTab('branding')}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'branding' ? 'bg-[#004B6E] text-white shadow-xs' : 'hover:bg-slate-50'
              }`}
            >
              <Palette size={14} />
              <span>الهوية</span>
            </button>
          </div>

          {/* Tab 1: Country Selection */}
          {activeTab === 'country' && (
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-sm font-black text-slate-800">اختيار الدولة أو الكيان التعليمي</h2>
                <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                  يتيح لك النظام تخصيص الترويسة ومسميات الهيكل الإداري تلقائياً دون فرض نموذج موحد.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {countries.map((c) => {
                  const isSelected = profile.authority.countryId === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleCountryChange(c)}
                      className={`p-3 rounded-2xl border text-right transition-all flex items-start gap-2.5 ${
                        isSelected 
                          ? 'border-[#004B6E] bg-sky-50/50 shadow-xs ring-1 ring-[#004B6E]' 
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <span className="text-2xl select-none">{c.flagEmoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-slate-900 truncate">{c.name}</p>
                        <p className="text-[10px] font-semibold text-slate-500 truncate mt-0.5">
                          {c.defaultMinistryName}
                        </p>
                      </div>
                      {isSelected && <Check size={15} className="text-[#004B6E] shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Administrative Hierarchy Customizer */}
          {activeTab === 'hierarchy' && (
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-sm font-black text-slate-800">بيانات الجهة والمؤسسة التعليمية</h2>
                <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                  جميع الحقول قابلة للتعديل والظهور في الترويسة الرسمية للامتحانات والكشوفات.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">اسم الوزارة / الهيئة</label>
                  <input
                    type="text"
                    value={profile.authority.ministry}
                    onChange={(e) => handleAuthorityField('ministry', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#004B6E] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">المنطقة / المحافظة</label>
                    <input
                      type="text"
                      value={profile.authority.governorateOrRegion}
                      onChange={(e) => handleAuthorityField('governorateOrRegion', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#004B6E] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">المديرية / الإدارة</label>
                    <input
                      type="text"
                      value={profile.authority.directorate}
                      onChange={(e) => handleAuthorityField('directorate', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#004B6E] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">اسم المدرسة / المجمع</label>
                    <input
                      type="text"
                      value={profile.authority.schoolName}
                      onChange={(e) => handleAuthorityField('schoolName', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#004B6E] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">المرحلة الدراسية</label>
                    <select
                      value={profile.authority.schoolStage}
                      onChange={(e) => handleAuthorityField('schoolStage', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#004B6E] focus:outline-none"
                    >
                      <option value="ابتدائي">ابتدائي</option>
                      <option value="أساسي">أساسي</option>
                      <option value="متوسط">متوسط</option>
                      <option value="ثانوي">ثانوي</option>
                      <option value="مشترك">مشترك</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">العام الدراسي</label>
                    <input
                      type="text"
                      value={profile.authority.academicYear}
                      onChange={(e) => handleAuthorityField('academicYear', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#004B6E] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">الفصل الدراسي</label>
                    <input
                      type="text"
                      value={profile.authority.termName}
                      onChange={(e) => handleAuthorityField('termName', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#004B6E] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">رمز الوسام / الشعار المفضل</label>
                  <div className="flex gap-2">
                    {['🦅', '🏛️', '📚', '🎓', '⭐'].map(emoji => (
                      <button
                        key={emoji}
                        onClick={() => handleAuthorityField('customSealEmoji', emoji)}
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center text-lg ${
                          profile.authority.customSealEmoji === emoji ? 'border-[#004B6E] bg-sky-50' : 'border-slate-200 bg-white'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Document Type */}
          {activeTab === 'doctype' && (
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-sm font-black text-slate-800">نوع الوثيقة التعليمية النشطة</h2>
                <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                  يحدد النمط الهندسي، اتجاه الورقة (رأسي/أفقي)، وتنسيق الترويسة الموصى به.
                </p>
              </div>

              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {docTypes.map((dt) => {
                  const isSelected = profile.documentType.id === dt.id;
                  return (
                    <button
                      key={dt.id}
                      onClick={() => handleDocTypeChange(dt.id)}
                      className={`w-full p-3 rounded-2xl border text-right transition-all flex items-start gap-3 ${
                        isSelected 
                          ? 'border-[#004B6E] bg-sky-50/50 shadow-xs' 
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className={`p-2 rounded-xl mt-0.5 ${isSelected ? 'bg-[#004B6E] text-white' : 'bg-slate-100 text-slate-600'}`}>
                        <FileText size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-black text-slate-900">{dt.name}</p>
                          <span className="text-[10px] font-bold text-slate-400">
                            {dt.defaultPageOrientation === 'landscape' ? 'عرضي A4' : 'طولي A4'}
                          </span>
                        </div>
                        <p className="text-[11px] font-medium text-slate-500 mt-1 leading-relaxed">
                          {dt.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 4: Branding & Colors */}
          {activeTab === 'branding' && (
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-sm font-black text-slate-800">الهوية البصرية والألوان الرسمية</h2>
                <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                  تطبيق لوحة ألوان رصينة على الترويسة والجداول والإطارات الرسمية للوثيقة.
                </p>
              </div>

              <div className="space-y-2.5">
                {brandColors.map((b) => {
                  const isSelected = profile.brand.primaryColor === b.hex;
                  return (
                    <button
                      key={b.hex}
                      onClick={() => handleBrandColor(b.hex)}
                      className={`w-full p-3 rounded-2xl border flex items-center justify-between transition-all ${
                        isSelected ? 'border-slate-800 shadow-xs' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span 
                          className="w-6 h-6 rounded-full border border-black/10 shadow-xs"
                          style={{ backgroundColor: b.hex }}
                        ></span>
                        <span className="text-xs font-black text-slate-800">{b.name}</span>
                      </div>
                      {isSelected && <Check size={16} className="text-slate-800" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Right Side (Live Document Preview - 7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full bg-slate-200/70 p-4 rounded-3xl border border-slate-300/80 flex flex-col items-center shadow-inner">
            
            <div className="w-full flex items-center justify-between text-xs font-black text-slate-600 mb-3 px-2">
              <span className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#004B6E]" />
                <span>معاينة حية للمعيار المعتمد (ورقة A4 الرسمية)</span>
              </span>
              <span className="bg-white px-2.5 py-1 rounded-md border border-slate-300 text-[11px] font-mono">
                {profile.documentType.defaultPageOrientation === 'landscape' ? 'A4 Landscape (297x210mm)' : 'A4 Portrait (210x297mm)'}
              </span>
            </div>

            {/* Simulated Paper A4 Canvas */}
            <div 
              className="bg-white rounded-lg shadow-xl border border-slate-300 overflow-hidden w-full transition-all"
              style={{
                maxWidth: '794px',
                minHeight: '480px',
                borderColor: profile.brand.primaryColor,
              }}
            >
              {/* The Central Reusable Standard Header */}
              <StandardizedEducationHeader 
                profile={profile}
                subjectName="الرياضيات والعلوم التطبيقية"
                examDuration="ساعتان ونصف"
              />

              {/* Simulated Document Body Content */}
              <div className="p-6 space-y-4 text-slate-800 font-sans">
                
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-[#004B6E]">السؤال الأول: اختر الإجابة الصحيحة (10 درجات)</span>
                    <span className="text-[11px] font-bold text-slate-500">نظام التقويم: {profile.gradeSystem?.name || 'مئوي'}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-bold">
                    1. ما هو الناتج المنطقي لتطبيق نظام المعايير العربية على كافة محررات الرقيم التربوي؟
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-xs font-semibold text-slate-600">
                    <div className="p-2 rounded-lg bg-white border border-slate-200">أ) مرونة كاملة لجميع الدول والوزارات العربية</div>
                    <div className="p-2 rounded-lg bg-white border border-slate-200">ب) عدم كسر أي كود أو محرر قائم</div>
                    <div className="p-2 rounded-lg bg-white border border-slate-200">ج) توحيد الهوية والمقاسات بدقة A4 والطباعة النظيفة</div>
                    <div className="p-2 rounded-lg bg-white border border-slate-200">د) جميع ما سبق صحيح</div>
                  </div>
                </div>

                {/* Simulated Table */}
                <div className="border border-slate-300 rounded-lg overflow-hidden text-center text-xs">
                  <table className="w-full">
                    <thead className="bg-slate-100 font-black text-slate-700 border-b border-slate-300">
                      <tr>
                        <th className="p-2 border-l border-slate-300">الرقم</th>
                        <th className="p-2 border-l border-slate-300">المعيار الإداري</th>
                        <th className="p-2 border-l border-slate-300">البيان الحالي في المنظومة</th>
                        <th className="p-2">الحالة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-medium text-slate-600">
                      <tr>
                        <td className="p-2 border-l border-slate-200 font-mono">01</td>
                        <td className="p-2 border-l border-slate-200 font-bold">الدولة المعتمدة</td>
                        <td className="p-2 border-l border-slate-200">{profile.authority.countryName}</td>
                        <td className="p-2 text-emerald-600 font-bold">نشط ومحفوظ</td>
                      </tr>
                      <tr>
                        <td className="p-2 border-l border-slate-200 font-mono">02</td>
                        <td className="p-2 border-l border-slate-200 font-bold">الجهة المشرفة</td>
                        <td className="p-2 border-l border-slate-200">{profile.authority.ministry}</td>
                        <td className="p-2 text-emerald-600 font-bold">نشط ومحفوظ</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>

              {/* Standardized Footer Preview */}
              <footer className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-[10px] font-bold text-slate-500">
                <span>صفحة 1 من 1</span>
                <span>{RAQEEM_OFFICIAL_CREDIT}</span>
                <span>تاريخ الاعتماد: {new Date().toLocaleDateString('ar-EG')}</span>
              </footer>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
