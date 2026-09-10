import React, { useState } from 'react';
import { 
  X, Shield, Check, Award, Building2, UserCheck, 
  GraduationCap, FileSignature, Sparkles, Settings
} from 'lucide-react';
import { useRole } from '../context/RoleContext';
import { EducationRoleID } from '../types/roles';

interface RoleSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSelectorModal: React.FC<RoleSelectorModalProps> = ({ isOpen, onClose }) => {
  const { currentRole, setRole, headerInfo, updateHeaderInfo, allRoles } = useRole();
  const [activeTab, setActiveTab] = useState<'roles' | 'header_config'>('roles');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans select-none" dir="rtl">
      <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-100 max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 text-white p-6 relative flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-amber-400 border border-white/10">
              <Shield size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black">تبديل المستوى الوظيفي وإعدادات الترويسة</h2>
              <p className="text-xs font-bold text-violet-200 mt-0.5">المنصة الوطنية للوثائق التعليمية | الرقيم</p>
            </div>
          </div>

          <button 
            type="button"
            onClick={onClose} 
            className="p-2 hover:bg-white/20 rounded-2xl text-violet-200 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bg-slate-100 border-b border-slate-200 p-2 flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('roles')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeTab === 'roles' ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-600 hover:bg-slate-200/50'
            }`}
          >
            اختيار الدور والمستوى الإداري ({currentRole.title})
          </button>
          <button
            onClick={() => setActiveTab('header_config')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeTab === 'header_config' ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-600 hover:bg-slate-200/50'
            }`}
          >
            تخصيص ترويسة الوثائق الرسمية
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Roles Selection Tab */}
          {activeTab === 'roles' && (
            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-500">
                اختر مستواك الوظيفي داخل المنصة لضبط الأدوات والقوالب والترويسات الرسمية تلقائياً:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {allRoles.map((role) => {
                  const isSelected = role.id === currentRole.id;
                  return (
                    <div
                      key={role.id}
                      onClick={() => setRole(role.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start justify-between ${
                        isSelected 
                          ? 'border-violet-600 bg-violet-50/80 shadow-md' 
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="space-y-1 pr-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${role.badgeBg} ${role.badgeText}`}>
                            {role.title}
                          </span>
                        </div>
                        <h4 className="font-black text-slate-900 text-sm mt-1">{role.subtitle}</h4>
                        <p className="text-[11px] font-bold text-slate-500 leading-tight">{role.description}</p>
                      </div>

                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-300'
                      }`}>
                        <Check size={14} className="stroke-[3]" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Header Config Tab */}
          {activeTab === 'header_config' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">اسم الدولة / الدولة السيادية</label>
                  <input
                    type="text"
                    value={headerInfo.republic}
                    onChange={(e) => updateHeaderInfo({ republic: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">الوزارة</label>
                  <input
                    type="text"
                    value={headerInfo.ministry}
                    onChange={(e) => updateHeaderInfo({ ministry: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">مكتب التربية بالمحافظة</label>
                  <input
                    type="text"
                    value={headerInfo.office}
                    onChange={(e) => updateHeaderInfo({ office: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">إدارة التربية بالمديرية</label>
                  <input
                    type="text"
                    value={headerInfo.directorate}
                    onChange={(e) => updateHeaderInfo({ directorate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">اسم المدرسة / المنشأة</label>
                  <input
                    type="text"
                    value={headerInfo.schoolName}
                    onChange={(e) => updateHeaderInfo({ schoolName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">العام الدراسي</label>
                  <input
                    type="text"
                    value={headerInfo.academicYear}
                    onChange={(e) => updateHeaderInfo({ academicYear: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">اسم المحرر / الموظف المسؤول</label>
                  <input
                    type="text"
                    value={headerInfo.authorName}
                    onChange={(e) => updateHeaderInfo({ authorName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">الصفة الرسمية للوثيقة</label>
                  <input
                    type="text"
                    value={headerInfo.officialTitleName}
                    onChange={(e) => updateHeaderInfo({ officialTitleName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-800"
                  />
                </div>

              </div>

              {/* Toggles */}
              <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-black text-slate-700">
                  <input
                    type="checkbox"
                    checked={headerInfo.showSeal}
                    onChange={(e) => updateHeaderInfo({ showSeal: e.target.checked })}
                    className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500"
                  />
                  <span>إظهار الختم والشعار الرسمي</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-black text-slate-700">
                  <input
                    type="checkbox"
                    checked={headerInfo.showQR}
                    onChange={(e) => updateHeaderInfo({ showQR: e.target.checked })}
                    className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500"
                  />
                  <span>إظهار رمز QR للتحقق والتشفير</span>
                </label>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center shrink-0">
          <div className="text-[11px] font-bold text-slate-500">
            برمجة وتطوير المهندس//:سهيل الهزبري
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-black transition-colors"
          >
            حفظ وإغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
