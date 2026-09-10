/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowRight, Activity, AlertOctagon, TrendingDown, CheckCircle2, Bot, BrainCircuit, LineChart, Sparkles } from 'lucide-react';
import { AnalyticalEngine } from '../core/AnalyticalEngine';
import { motion, AnimatePresence } from 'motion/react';

const MOCK_STUDENTS = [
  { id: '1', name: 'أحمد محمود العبسي', attendanceRate: 82, averageScore: 65, lastTestScore: 40, homeworkCompletion: 80, math: 45, geometry: 85, physics: 50 },
  { id: '2', name: 'ياسر وليد الشميري', attendanceRate: 95, averageScore: 88, lastTestScore: 90, homeworkCompletion: 95, math: 92, geometry: 88, physics: 85 },
  { id: '3', name: 'سالم عبدالله الجوفي', attendanceRate: 98, averageScore: 55, lastTestScore: 50, homeworkCompletion: 60, math: 60, geometry: 55, physics: 50 },
  { id: '4', name: 'عمر خالد المقطري', attendanceRate: 70, averageScore: 45, lastTestScore: 40, homeworkCompletion: 50, math: 40, geometry: 45, physics: 50 },
  { id: '5', name: 'محمد صادق الصبري', attendanceRate: 88, averageScore: 75, lastTestScore: 60, homeworkCompletion: 90, math: 70, geometry: 75, physics: 80 },
];

export default function AnalyticalDashboard({ onBack }: { onBack: () => void }) {
  const [analyzedData, setAnalyzedData] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  useEffect(() => {
    setIsAnalyzing(true);
    const timer = setTimeout(() => {
      const results = AnalyticalEngine.predictAtRiskStudents(MOCK_STUDENTS);
      // Attach original mock data to results for deeper AI analysis
      const enrichedResults = results.map((r, i) => ({ ...r, ...MOCK_STUDENTS[i] }));
      setAnalyzedData(enrichedResults);
      setIsAnalyzing(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const generateAIReport = (student: any) => {
    setSelectedStudent(student);
    setIsGeneratingReport(true);
    setAiReport(null);

    // Mock AI generation based on student data
    setTimeout(() => {
      let report = '';
      if (student.math < 50 && student.geometry > 80) {
         report = `هذا الطالب لديه ضعف ملحوظ في المسائل الرياضية الجبرية (الحسابية) ولكنه ممتاز جداً في الهندسة الفراغية والاستنتاج البصري. نقترح إعطاءه التدريبات التالية: ربط المعادلات الجبرية بالتمثيل الهندسي، وتكثيف أوراق العمل في الجبر بأسلوب بصري.`;
      } else if (student.averageScore >= 85) {
         report = `مستوى الطالب ممتاز ومستقر. يمتلك قدرات تحليلية عالية في الرياضيات والفيزياء. نقترح نقله لمستوى التحدي (إثراء) وإعطاءه مسائل أولمبياد لتنمية مهاراته وعدم شعوره بالملل.`;
      } else if (student.attendanceRate < 80) {
         report = `يتضح أن سبب التراجع الأكاديمي ليس قدرات الطالب بل الغياب المتكرر وعدم تسليم الواجبات. الطالب يحتاج إلى خطة متابعة إدارية مع ولي الأمر قبل التركيز على الجانب الأكاديمي الصرف.`;
      } else {
         report = `الطالب يعاني من تذبذب في المستوى. يحتاج إلى مراجعة شاملة لأساسيات المادة وتكثيف المتابعة الفردية خلال الحصص الدراسية. يفضل إشراكه في مجموعات دراسية صغيرة مع طلاب متفوقين.`;
      }
      setAiReport(report);
      setIsGeneratingReport(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 select-none font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 shadow-xl border border-slate-800 rounded-2xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between relative overflow-hidden gap-4">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div className="flex items-center gap-4 relative z-10">
            <button onClick={onBack} className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10">
              <ArrowRight size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                بطاقات التقدم الذكية (التحليل التنبؤي)
                <BrainCircuit size={20} className="text-amber-400" />
              </h1>
              <p className="text-slate-400 font-medium text-sm mt-1">يقوم النظام بتحليل درجات الطالب وإصدار تقرير ذكي يحدد نقاط القوة والضعف بدقة ويقترح خطط العلاج.</p>
            </div>
          </div>
          
          <div className="flex gap-4 relative z-10">
            <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white">
              <span className="text-xs block text-slate-400 font-bold mb-1">إجمالي الطلاب</span>
              <span className="text-xl font-black">{MOCK_STUDENTS.length}</span>
            </div>
            <div className="bg-red-500/10 backdrop-blur-md px-4 py-2 rounded-xl border border-red-500/20 text-red-400">
              <span className="text-xs block font-bold mb-1">حالات الخطر</span>
              <span className="text-xl font-black">
                {analyzedData.filter(s => s.riskScore >= 70).length}
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Data Table */}
          <div className="md:col-span-7">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-full">
              <div className="p-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                <h2 className="font-bold text-slate-800 flex items-center gap-2">
                  <LineChart size={18} className="text-violet-600" />
                  السجل الأكاديمي والتحليل
                </h2>
                {isAnalyzing && <span className="text-sm font-bold text-violet-600 animate-pulse">جاري المعالجة...</span>}
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase">
                      <th className="p-4 w-12">#</th>
                      <th className="p-4">اسم الطالب</th>
                      <th className="p-4 text-center">المتوسط</th>
                      <th className="p-4 text-center">التصنيف</th>
                      <th className="p-4">الإجراء</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyzedData.map((student, idx) => (
                      <tr 
                        key={student.id} 
                        className={`border-b border-slate-100 transition-colors cursor-pointer ${selectedStudent?.id === student.id ? 'bg-violet-50/50' : 'hover:bg-slate-50'}`}
                        onClick={() => generateAIReport(student)}
                      >
                        <td className="p-4 font-black text-slate-400">{idx + 1}</td>
                        <td className="p-4 font-bold text-slate-800">{student.name}</td>
                        <td className="p-4 text-center">
                          <span className={`font-black ${student.averageScore < 60 ? 'text-red-600' : 'text-slate-700'}`}>
                            {student.averageScore}%
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${student.statusColor}`}>
                            {student.riskScore >= 70 ? <AlertOctagon size={14} /> : student.riskScore >= 40 ? <TrendingDown size={14} /> : <CheckCircle2 size={14} />}
                            {student.prediction}
                          </span>
                        </td>
                        <td className="p-4">
                          <button 
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${selectedStudent?.id === student.id ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                          >
                            <Bot size={14} />
                            تحليل AI
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* AI Progress Card */}
          <div className="md:col-span-5">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm h-full flex flex-col overflow-hidden relative min-h-[500px]">
              <div className="p-5 border-b border-slate-200 bg-amber-50/50 flex justify-between items-center">
                <h2 className="font-bold text-amber-900 flex items-center gap-2">
                  <Sparkles size={18} className="text-amber-500" />
                  بطاقة التقدم الذكية (AI Report)
                </h2>
              </div>

              <div className="flex-1 p-6 flex flex-col bg-slate-50/50">
                {!selectedStudent ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60">
                    <BrainCircuit size={48} className="text-slate-400 mb-4" />
                    <p className="font-bold text-slate-600">اختر طالباً من القائمة</p>
                    <p className="text-sm text-slate-500 mt-2 max-w-[250px]">سيقوم الذكاء الاصطناعي بقراءة سجلات درجاته وتحليل مكامن الضعف والقوة لاقتراح خطة علاجية مخصصة.</p>
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    {isGeneratingReport ? (
                      <motion.div 
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-center text-center text-amber-600"
                      >
                        <Bot size={48} className="mb-4 animate-bounce" />
                        <p className="font-bold text-lg">جاري التحليل الخوارزمي...</p>
                        <p className="text-sm mt-2 opacity-80 max-w-[250px] mx-auto">يتم الآن قراءة درجات (الرياضيات، الهندسة، الفيزياء) ونسب الحضور للطالب {selectedStudent.name}</p>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="report"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex-1 flex flex-col"
                      >
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 mb-6">
                          <h3 className="font-black text-xl text-slate-800 mb-1">{selectedStudent.name}</h3>
                          <p className="text-sm font-bold text-slate-400 mb-4">ملخص الأداء الحالي</p>
                          
                          <div className="grid grid-cols-3 gap-3">
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
                              <span className="block text-xs font-bold text-slate-500 mb-1">الرياضيات</span>
                              <span className={`text-lg font-black ${selectedStudent.math < 50 ? 'text-red-500' : 'text-slate-700'}`}>{selectedStudent.math}%</span>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
                              <span className="block text-xs font-bold text-slate-500 mb-1">الهندسة</span>
                              <span className={`text-lg font-black ${selectedStudent.geometry > 80 ? 'text-emerald-500' : 'text-slate-700'}`}>{selectedStudent.geometry}%</span>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
                              <span className="block text-xs font-bold text-slate-500 mb-1">الفيزياء</span>
                              <span className="text-lg font-black text-slate-700">{selectedStudent.physics}%</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-amber-50 rounded-xl p-6 border border-amber-200/60 flex-1 shadow-inner relative overflow-hidden mb-6">
                          <div className="absolute top-0 right-0 w-2 h-full bg-amber-400" />
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                              <Bot size={20} className="text-amber-600" />
                            </div>
                            <div>
                              <h4 className="font-black text-amber-900 mb-3 text-lg">التشخيص والتوصيات</h4>
                              <p className="text-amber-900/80 font-bold leading-relaxed text-sm">
                                {aiReport}
                              </p>
                            </div>
                          </div>
                        </div>

                        <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 mt-auto">
                          إرسال التقرير لولي الأمر (WhatsApp)
                          <ArrowRight size={16} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
