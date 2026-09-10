import React, { useState } from 'react';
import { ArrowRight, Search, Filter, FileText, Download, Trash2, Calendar, FileType, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const MOCK_ARCHIVES = [
  { id: 1, title: 'اختبار نصف الفصل الدراسي الأول', type: 'امتحان', date: '2026-10-15', size: '2.4 MB' },
  { id: 2, title: 'كشف درجات الصف الثالث', type: 'كشف درجات', date: '2026-11-01', size: '1.1 MB' },
  { id: 3, title: 'تحضير مادة الرياضيات - الوحدة الأولى', type: 'خطة درس', date: '2026-09-05', size: '4.5 MB' },
  { id: 4, title: 'شهادات شكر للطلاب المتفوقين', type: 'شهادة', date: '2026-11-20', size: '8.2 MB' },
  { id: 5, title: 'خطة الأنشطة اللاصفية', type: 'خطة', date: '2026-08-28', size: '1.8 MB' },
  { id: 6, title: 'محضر اجتماع المعلمين', type: 'محضر', date: '2026-09-10', size: '0.9 MB' },
];

export default function Archive({ onBack }: { onBack: () => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('الكل');

  const types = ['الكل', ...Array.from(new Set(MOCK_ARCHIVES.map(a => a.type)))];

  const filteredArchives = MOCK_ARCHIVES.filter(item => {
    const matchesSearch = item.title.includes(searchTerm) || item.date.includes(searchTerm);
    const matchesType = selectedType === 'الكل' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
              <ArrowRight className="text-slate-600" />
            </button>
            <h1 className="text-2xl font-black text-slate-800 font-serif">الأرشيف والمستندات المحفوظة</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-8">
        {/* Controls */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="ابحث عن ملف..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pr-12 pl-4 py-3 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all font-medium"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap ${selectedType === type ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArchives.map(item => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col gap-4 hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-1 line-clamp-1">{item.title}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><FileType size={14} /> {item.type}</span>
                  <span className="flex items-center gap-1"><Calendar size={14} /> {item.date}</span>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-400">{item.size}</span>
                <div className="flex gap-2">
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors">
                    <Download size={18} />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors opacity-0 group-hover:opacity-100">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredArchives.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <FileText size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-700">لا توجد ملفات مطابقة</h3>
              <p className="text-slate-500 mt-2">حاول استخدام كلمات بحث أخرى</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
