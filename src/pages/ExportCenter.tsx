import React, { useState } from 'react';
import { ArrowRight, Printer, FileText, Download, Share2, FileSpreadsheet, FileImage } from 'lucide-react';
import { motion } from 'motion/react';

export default function ExportCenter({ onBack }: { onBack: () => void }) {
  const exports = [
    { id: 1, title: 'كشف الدرجات النهائي', format: 'PDF', date: '2026-12-01', status: 'جاهز' },
    { id: 2, title: 'تقرير الغياب الشهري', format: 'Excel', date: '2026-11-28', status: 'جاهز' },
    { id: 3, title: 'بطاقات التهنئة للمتفوقين', format: 'Image', date: '2026-11-20', status: 'جاهز' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans" dir="rtl">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
              <ArrowRight className="text-slate-600" />
            </button>
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
              <Printer size={24} />
            </div>
            <h1 className="text-2xl font-black text-slate-800 font-serif">الطباعة والتصدير</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-red-300 hover:shadow-xl hover:shadow-red-500/10 transition-all flex flex-col items-center gap-4 group">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">تصدير PDF</h2>
            <p className="text-slate-500 text-center text-sm">تقارير، شهادات، ومستندات جاهزة للطباعة</p>
          </button>
          
          <button className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-green-300 hover:shadow-xl hover:shadow-green-500/10 transition-all flex flex-col items-center gap-4 group">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileSpreadsheet size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">تصدير Excel</h2>
            <p className="text-slate-500 text-center text-sm">كشوفات الدرجات وقوائم الطلاب للتحليل</p>
          </button>

          <button className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all flex flex-col items-center gap-4 group">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileImage size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">تصدير صور</h2>
            <p className="text-slate-500 text-center text-sm">بطاقات، تهاني، وتصاميم للمشاركة</p>
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800">سجل التصدير الأخير</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {exports.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 text-slate-600">
                    {item.format === 'PDF' && <FileText size={20} className="text-red-500" />}
                    {item.format === 'Excel' && <FileSpreadsheet size={20} className="text-green-600" />}
                    {item.format === 'Image' && <FileImage size={20} className="text-blue-500" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{item.title}</h3>
                    <span className="text-xs text-slate-500">{item.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold">{item.status}</span>
                  <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
                    <Download size={18} />
                  </button>
                  <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
