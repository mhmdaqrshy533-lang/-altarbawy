/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowRight, Search, AlertTriangle, CheckCircle2, FileText, TrendingDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock Database for instant fetching
const STUDENT_DB: Record<string, any> = {
  '101': { name: 'أحمد محمود العبسي', pastAverage: 85, trend: 'stable', warning: null },
  '102': { name: 'ياسر وليد الشميري', pastAverage: 92, trend: 'up', warning: null },
  '103': { name: 'سالم عبدالله الجوفي', pastAverage: 55, trend: 'down', warning: 'خطر التعثر في الرياضيات بناءً على الشهر الماضي' },
};

export default function SmartGrading({ onBack }: { onBack: () => void }) {
  const [searchId, setSearchId] = useState('');
  const [activeStudent, setActiveStudent] = useState<any>(null);
  
  // Grades state
  const [grades, setGrades] = useState({
    participation: '',
    homework: '',
    exam: '',
    teacherTotal: ''
  });

  const [aiAnalysis, setAiAnalysis] = useState<{ status: 'ok' | 'error' | 'warning', message: string } | null>(null);

  // Auto-fetch logic (Power Dialog concept)
  useEffect(() => {
    if (searchId.length >= 3) {
      const student = STUDENT_DB[searchId];
      if (student) {
        setActiveStudent(student);
        setGrades({ participation: '', homework: '', exam: '', teacherTotal: '' });
        setAiAnalysis(null);
      } else {
        setActiveStudent(null);
      }
    } else {
      setActiveStudent(null);
    }
  }, [searchId]);

  // Fair Grading Algorithm (Real-time evaluation)
  useEffect(() => {
    if (!activeStudent) return;

    const p = parseFloat(grades.participation) || 0;
    const h = parseFloat(grades.homework) || 0;
    const e = parseFloat(grades.exam) || 0;
    const manualTotal = parseFloat(grades.teacherTotal);

    const actualTotal = p + h + e;

    if (grades.teacherTotal !== '') {
      if (manualTotal !== actualTotal) {
        setAiAnalysis({
          status: 'error',
          message: `خطأ رصد: المجموع الفعلي هو ${actualTotal} وليس ${manualTotal}.`
        });
      } else if (actualTotal < activeStudent.pastAverage - 20) {
        setAiAnalysis({
          status: 'warning',
          message: 'انخفاض حاد غير معتاد مقارنة بالمعدل السابق للمحصلة.'
        });
      } else {
        setAiAnalysis({
          status: 'ok',
          message: 'الرصد دقيق ومطابق للمعايير.'
        });
      }
    } else {
      setAiAnalysis(null);
    }
  }, [grades, activeStudent]);

  const handleSwipeToSave = () => {
    // Simulated Swipe-to-confirm action
    alert('تم الحفظ وتحديث الوثيقة الحية بنجاح!');
    setSearchId('');
  };

  return (
    <div className="min-h-screen bg-slate-50 select-none font-sans flex flex-col">
      {/* Top Navbar */}
      <div className="bg-white px-6 py-4 shadow-sm border-b border-slate-200 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
            <ArrowRight size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800">الرصد الذكي (Smart Grading)</h1>
            <p className="text-slate-500 font-medium text-xs">خوارزمية التقييم العادل وتحديث الوثائق الحي</p>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-6xl w-full mx-auto p-6 grid lg:grid-cols-12 gap-6">
        
        {/* Input & Context Panel */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Power Search */}
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3 relative overflow-hidden transition-all focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-500/10">
            <div className="p-3 bg-violet-50 text-violet-600 rounded-xl">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="أدخل رقم الطالب (مثال: 101)..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="flex-1 bg-transparent border-none focus:outline-none text-lg font-bold text-slate-800 placeholder:text-slate-300"
              autoFocus
            />
          </div>

          <AnimatePresence mode="wait">
            {activeStudent ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Context Card */}
                <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500 rounded-full blur-[80px] opacity-30" />
                  
                  <h2 className="text-2xl font-black mb-1">{activeStudent.name}</h2>
                  <p className="text-slate-400 text-sm font-medium mb-6">رقم أكاديمي: {searchId} | المعدل السابق: {activeStudent.pastAverage}%</p>
                  
                  {activeStudent.warning && (
                    <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 flex items-start gap-3 mb-6">
                      <AlertTriangle className="text-red-400 shrink-0" size={20} />
                      <p className="text-red-200 text-sm font-medium">{activeStudent.warning}</p>
                    </div>
                  )}

                  {/* Grading Inputs */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400 font-bold">المشاركة (20)</label>
                      <input 
                        type="number" 
                        value={grades.participation}
                        onChange={(e) => setGrades({...grades, participation: e.target.value})}
                        className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-center font-bold text-xl focus:outline-none focus:border-violet-400 focus:bg-white/20 transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400 font-bold">الواجبات (30)</label>
                      <input 
                        type="number" 
                        value={grades.homework}
                        onChange={(e) => setGrades({...grades, homework: e.target.value})}
                        className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-center font-bold text-xl focus:outline-none focus:border-violet-400 focus:bg-white/20 transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400 font-bold">الاختبار (50)</label>
                      <input 
                        type="number" 
                        value={grades.exam}
                        onChange={(e) => setGrades({...grades, exam: e.target.value})}
                        className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-center font-bold text-xl focus:outline-none focus:border-violet-400 focus:bg-white/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 font-bold flex justify-between">
                      <span>إدخال المعلم للمجموع (للتحقق)</span>
                    </label>
                    <input 
                      type="number" 
                      value={grades.teacherTotal}
                      onChange={(e) => setGrades({...grades, teacherTotal: e.target.value})}
                      className={`w-full border rounded-xl p-4 text-center font-black text-2xl focus:outline-none transition-all ${
                        aiAnalysis?.status === 'error' ? 'bg-red-500/20 border-red-500 text-white focus:border-red-400' :
                        aiAnalysis?.status === 'ok' ? 'bg-green-500/20 border-green-500 text-white focus:border-green-400' :
                        'bg-white/10 border-white/20 text-white focus:border-violet-400 focus:bg-white/20'
                      }`}
                    />
                  </div>

                  {/* AI Fair Grading Feedback */}
                  <AnimatePresence>
                    {aiAnalysis && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`mt-4 p-3 rounded-xl flex items-start gap-3 border ${
                          aiAnalysis.status === 'error' ? 'bg-red-950/50 border-red-500/50 text-red-200' :
                          aiAnalysis.status === 'warning' ? 'bg-yellow-950/50 border-yellow-500/50 text-yellow-200' :
                          'bg-green-950/50 border-green-500/50 text-green-200'
                        }`}
                      >
                        {aiAnalysis.status === 'error' && <AlertTriangle size={20} className="shrink-0 mt-0.5 text-red-400" />}
                        {aiAnalysis.status === 'warning' && <TrendingDown size={20} className="shrink-0 mt-0.5 text-yellow-400" />}
                        {aiAnalysis.status === 'ok' && <CheckCircle2 size={20} className="shrink-0 mt-0.5 text-green-400" />}
                        <p className="text-sm font-medium">{aiAnalysis.message}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Swipe to Confirm Button */}
                  <div className="mt-8 relative h-16 bg-white/5 rounded-full border border-white/10 overflow-hidden flex items-center px-2 group cursor-pointer" onClick={handleSwipeToSave}>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 font-bold z-10 group-hover:translate-x-[calc(100%-3rem)] md:group-hover:translate-x-[260px] transition-transform duration-500 ease-out shadow-lg">
                      <ArrowRight size={20} />
                    </div>
                    <span className="absolute w-full text-center text-slate-400 font-bold text-sm select-none pointer-events-none">
                      اسحب للاعتماد الفوري
                    </span>
                  </div>

                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-64 text-slate-400"
              >
                <Search size={48} className="mb-4 text-slate-200" />
                <p className="font-medium">أدخل رقم الطالب الأكاديمي لاستدعاء السجل...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Live Document Preview */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 overflow-hidden relative">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
            <FileText className="text-violet-600" size={24} />
            <h3 className="font-bold text-slate-800 text-lg">الوثيقة الحية (تُحدَّث تلقائياً)</h3>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl w-full h-[500px] flex items-center justify-center relative overflow-hidden shadow-inner">
            {!activeStudent ? (
              <p className="text-slate-400 font-medium">الوثيقة قيد الانتظار...</p>
            ) : (
              <motion.div 
                key={activeStudent.name}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-[90%] h-[90%] bg-white border border-slate-300 shadow-lg p-8 relative flex flex-col"
              >
                {/* Official Header */}
                <div className="border-b-2 border-violet-900 pb-4 mb-6 flex justify-between items-start">
                  <div className="text-right">
                    <h1 className="font-black text-violet-900 text-xl mb-1">مدرسة مِسْطار النموذجية</h1>
                    <p className="text-xs text-slate-500 font-bold">كشف درجات معتمد خوارزمياً</p>
                  </div>
                  <div className="w-16 h-16 border-2 border-violet-900 rounded-lg flex items-center justify-center opacity-20 rotate-12">
                    <span className="font-black text-xs">MISTAR</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-center bg-slate-100 p-3 rounded-lg mb-6">
                    <span className="font-bold text-slate-700">اسم الطالب:</span>
                    <span className="font-black text-lg text-slate-900">{activeStudent.name}</span>
                  </div>

                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr className="bg-violet-900 text-white text-sm">
                        <th className="p-3 border border-violet-900">المشاركة</th>
                        <th className="p-3 border border-violet-900">الواجبات</th>
                        <th className="p-3 border border-violet-900">الاختبار</th>
                        <th className="p-3 border border-violet-900 bg-violet-800">المجموع</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-4 border border-slate-300 font-bold text-lg">{grades.participation || '-'}</td>
                        <td className="p-4 border border-slate-300 font-bold text-lg">{grades.homework || '-'}</td>
                        <td className="p-4 border border-slate-300 font-bold text-lg">{grades.exam || '-'}</td>
                        <td className="p-4 border border-slate-300 font-black text-xl text-violet-700 bg-violet-50">
                          {(parseFloat(grades.participation) || 0) + (parseFloat(grades.homework) || 0) + (parseFloat(grades.exam) || 0) || '-'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Watermark & Footer */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                  <span className="text-8xl font-black rotate-45">MISTAR</span>
                </div>
                
                <div className="mt-auto border-t border-slate-200 pt-4 flex justify-between items-end text-xs text-slate-500 font-bold">
                  <p>وثيقة حية - تحديث تلقائي</p>
                  <div className="text-center">
                    <p className="mb-2">ختم النظام</p>
                    <div className="w-12 h-12 rounded-full border border-violet-900 mx-auto flex items-center justify-center opacity-50">
                      <CheckCircle2 size={16} className="text-violet-900" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
