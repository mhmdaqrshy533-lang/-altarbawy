/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search,
  CalendarDays,
  FileDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Attendance({ onBack }: { onBack: () => void }) {
  const [students, setStudents] = useState([
    { id: '1', name: 'إبراهيم عبدالله عوض الجوفي', status: 'present' },
    { id: '2', name: 'أحمد علي أحمد العارمي', status: 'absent' },
    { id: '3', name: 'أمير الخضر حسين الدهبلي', status: 'late' },
    { id: '4', name: 'باسم محمد سالم', status: 'present' },
    { id: '5', name: 'جلال أحمد العزي', status: 'present' },
  ]);

  const toggleStatus = (id: string, status: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, status } : s));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-3 rounded-2xl bg-white text-royal-purple hover:bg-purple-50 shadow-sm border border-slate-100 transition-all">
              <ArrowRight size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-800">حصر الغياب اليومي</h1>
              <p className="text-slate-500 font-bold flex items-center gap-2">
                <CalendarDays size={16} className="text-purple-500" />
                اليوم: الجمعة، 3 يوليو 2026
              </p>
            </div>
          </div>
          
          <button className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black shadow-lg flex items-center gap-2 hover:bg-emerald-700 transition-all">
            <FileDown size={20} />
            تصدير تقرير اليوم
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-3xl shadow-sm mb-8 flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="البحث عن طالب..."
              className="w-full pr-12 pl-4 py-3 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-bold"
            />
          </div>
          <div className="hidden md:flex gap-2">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">حاضر: 3</span>
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">غائب: 1</span>
            <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">متأخر: 1</span>
          </div>
        </div>

        {/* Students List */}
        <div className="space-y-4">
          <AnimatePresence>
            {students.map((student, index) => (
              <motion.div 
                key={student.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-xl font-black text-slate-400">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-lg">{student.name}</h3>
                    <p className="text-slate-400 text-xs font-bold">الصف السابع - شعبة أ</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => toggleStatus(student.id, 'present')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black transition-all ${student.status === 'present' ? 'bg-green-600 text-white shadow-lg scale-105' : 'bg-slate-100 text-slate-400 hover:bg-green-50'}`}
                  >
                    <CheckCircle2 size={18} />
                    حاضر
                  </button>
                  <button 
                    onClick={() => toggleStatus(student.id, 'absent')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black transition-all ${student.status === 'absent' ? 'bg-red-600 text-white shadow-lg scale-105' : 'bg-slate-100 text-slate-400 hover:bg-red-50'}`}
                  >
                    <XCircle size={18} />
                    غائب
                  </button>
                  <button 
                    onClick={() => toggleStatus(student.id, 'late')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black transition-all ${student.status === 'late' ? 'bg-amber-600 text-white shadow-lg scale-105' : 'bg-slate-100 text-slate-400 hover:bg-amber-50'}`}
                  >
                    <Clock size={18} />
                    متأخر
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 text-xs font-bold leading-relaxed">
            * يتم حفظ البيانات تلقائياً. يمكنك مراجعة سجلات الغياب الشهرية من قسم "المحصلات الشهرية".
          </p>
        </div>
      </div>
    </div>
  );
}
