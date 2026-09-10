/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Download, 
  Upload, 
  FileSpreadsheet, 
  Settings, 
  Search,
  Plus,
  Trash2,
  Printer
} from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Student } from '../types';

export default function FinalResults({ onBack }: { onBack: () => void }) {
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'إبراهيم عبدالله عوض الجوفي', gender: 'male', grades: { 'القرآن الكريم': 95, 'اللغة العربية': 88 }, attendance: {} },
    { id: '2', name: 'أحمد علي أحمد العارمي', gender: 'male', grades: { 'القرآن الكريم': 92, 'اللغة العربية': 90 }, attendance: {} },
    { id: '3', name: 'أمير الخضر حسين الدهبلي', gender: 'male', grades: { 'القرآن الكريم': 85, 'اللغة العربية': 82 }, attendance: {} },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(students.map(s => ({
      'الاسم': s.name,
      'الجنس': s.gender === 'male' ? 'ذكر' : 'أنثى',
      ...s.grades
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "النتائج النهائية");
    XLSX.writeFile(wb, "results_mistar.xlsx");
  };

  const generatePDF = async () => {
    const element = document.getElementById('report-container');
    if (!element) return;
    
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('report_mistar.pdf');
  };

  const filteredStudents = students.filter(s => s.name.includes(searchTerm));

  return (
    <div className="min-h-screen bg-purple-50/30 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 via-violet-900 to-purple-900 text-white p-6 shadow-xl relative overflow-hidden rounded-[2rem] mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="relative z-10 flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20 transition-all"
            >
              <ArrowRight size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-extrabold text-white">النتائج النهائية</h1>
              <p className="text-purple-200 font-medium text-sm">مدرسة: ناسا سوفت للبرمجة المتطورة</p>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap gap-3">
            <button onClick={exportToExcel} className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-2xl font-bold hover:bg-white/20 transition-colors">
              <FileSpreadsheet size={18} />
              تصدير Excel
            </button>
            <button onClick={generatePDF} className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-2xl font-bold hover:bg-white/20 transition-colors">
              <Printer size={18} />
              طباعة PDF
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'عدد الطلاب', value: students.length, color: 'border-purple-500' },
            { label: 'العام الدراسي', value: '2026-2027', color: 'border-violet-500' },
            { label: 'الصف', value: 'السابع', color: 'border-purple-400' },
            { label: 'النظام', value: 'عدن', color: 'border-violet-400' },
          ].map((stat, i) => (
            <div key={i} className={`bg-white p-4 rounded-3xl border-r-4 shadow-sm hover:shadow-md transition-all ${stat.color}`}>
              <p className="text-purple-400 text-xs font-bold mb-1">{stat.label}</p>
              <p className="text-xl font-black text-purple-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Search & Actions */}
            <div className="bg-white p-4 rounded-[2rem] shadow-sm flex items-center gap-4 border border-purple-100">
              <div className="flex-1 relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400" size={18} />
                <input 
                  type="text" 
                  placeholder="ابحث عن اسم طالب..."
                  className="w-full pr-12 pl-4 py-3 bg-purple-50/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all font-medium border border-purple-100/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="bg-purple-900 text-white p-3 rounded-2xl shadow-lg hover:bg-purple-800 transition-all border border-purple-700">
                <Plus size={24} />
              </button>
            </div>

            {/* Students Table Container */}
            <div id="report-container" className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-purple-100">
              <div className="p-6 border-b border-purple-50 bg-purple-50/30 flex justify-between items-center">
                <h3 className="font-extrabold text-purple-900">قائمة الطلاب والدرجات</h3>
                <span className="text-xs font-bold text-purple-400">آخر تحديث: قبل ساعة</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-purple-50/50 text-purple-500 text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-bold">#</th>
                      <th className="px-6 py-4 font-bold">اسم الطالب</th>
                      <th className="px-6 py-4 font-bold">القرآن الكريم</th>
                      <th className="px-6 py-4 font-bold">اللغة العربية</th>
                      <th className="px-6 py-4 font-bold">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-50">
                    {filteredStudents.map((student, idx) => (
                      <tr key={student.id} className="hover:bg-purple-50/30 transition-colors group">
                        <td className="px-6 py-4 text-sm font-bold text-purple-400">{idx + 1}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                              {student.name[0]}
                            </div>
                            <span className="font-bold text-purple-900">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <input 
                            type="number" 
                            className="w-16 bg-transparent border-b border-transparent focus:border-purple-500 focus:outline-none text-center font-bold text-purple-700"
                            defaultValue={student.grades['القرآن الكريم']}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input 
                            type="number" 
                            className="w-16 bg-transparent border-b border-transparent focus:border-purple-500 focus:outline-none text-center font-bold text-purple-700"
                            defaultValue={student.grades['اللغة العربية']}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <button className="p-2 text-purple-200 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar / Tools */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-purple-100">
              <h4 className="font-black text-purple-900 mb-4 flex items-center gap-2">
                <Settings size={18} className="text-purple-500" />
                خيارات التحكم
              </h4>
              <div className="space-y-3">
                {[
                  { label: 'شهادات تقدير', icon: 'Award', color: 'text-purple-600 bg-purple-50' },
                  { label: 'استيراد من Excel', icon: 'Upload', color: 'text-violet-600 bg-violet-50' },
                  { label: 'إعدادات المقررات', icon: 'Settings', color: 'text-fuchsia-600 bg-fuchsia-50' },
                  { label: 'معلومات المدرسة', icon: 'School', color: 'text-violet-600 bg-violet-50' },
                ].map((item, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-4 rounded-2xl bg-purple-50/50 hover:bg-purple-50 hover:shadow-sm border border-transparent hover:border-purple-100 transition-all group">
                    <span className="font-bold text-purple-700 group-hover:text-purple-900">{item.label}</span>
                    <div className={`p-2 rounded-xl ${item.color}`}>
                      <Plus size={16} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900 via-violet-900 to-purple-900 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <h4 className="text-xl font-black mb-2">إصدار الشهادات</h4>
              <p className="text-purple-200 text-xs mb-6 leading-relaxed">
                يمكنك الآن توليد شهادات النجاح لجميع الطلاب بضغطة زر واحدة بنظام HTML فائق الدقة.
              </p>
              <button className="w-full bg-white text-purple-900 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
                ابدأ التوليد
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
