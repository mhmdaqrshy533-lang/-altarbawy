import React from 'react';
import { ArrowRight, Settings as SettingsIcon, Save, Database, User, Bell, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export default function Settings({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <ArrowRight className="text-slate-600" />
            </button>
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
              <SettingsIcon size={24} />
            </div>
            <h1 className="text-2xl font-black text-slate-800 font-serif">الإعدادات</h1>
          </div>
          <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors">
            <Save size={18} />
            حفظ التغييرات
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6 py-12">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Section: Profile */}
          <div className="p-8 border-b border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                <User size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">الملف الشخصي</h2>
                <p className="text-sm text-slate-500">تحديث بيانات المعلم والمعلومات الأساسية</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">اسم المعلم</label>
                <input type="text" defaultValue="أ. محمد أحمد" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">التخصص</label>
                <input type="text" defaultValue="الرياضيات" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              </div>
            </div>
          </div>

          {/* Section: App Settings */}
          <div className="p-8 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
                <SettingsIcon size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">إعدادات التطبيق</h2>
                <p className="text-sm text-slate-500">تخصيص واجهة المستخدم والتفضيلات العامة</p>
              </div>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:border-slate-300 transition-all">
                <div>
                  <span className="block font-bold text-slate-800">الوضع الليلي</span>
                  <span className="text-sm text-slate-500">تفعيل المظهر الداكن للتطبيق</span>
                </div>
                <div className="relative inline-block w-12 h-6 rounded-full bg-slate-200">
                  <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform"></div>
                </div>
              </label>
              <label className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:border-slate-300 transition-all">
                <div>
                  <span className="block font-bold text-slate-800">الإشعارات الصوتية</span>
                  <span className="text-sm text-slate-500">تشغيل تنبيه صوتي عند اكتمال العمليات</span>
                </div>
                <div className="relative inline-block w-12 h-6 rounded-full bg-violet-500">
                  <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white transition-transform transform translate-x-[-24px]"></div>
                </div>
              </label>
            </div>
          </div>

          {/* Section: Data & Backup */}
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                <Database size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">النسخ الاحتياطي</h2>
                <p className="text-sm text-slate-500">إدارة بيانات التطبيق والنسخ الاحتياطية</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="flex-1 bg-white border-2 border-emerald-100 text-emerald-700 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors">
                إنشاء نسخة احتياطية
              </button>
              <button className="flex-1 bg-white border-2 border-slate-200 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                استعادة البيانات
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
