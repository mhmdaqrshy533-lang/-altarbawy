import React, { useState } from 'react';
import { 
  ArrowRight, 
  Calendar,
  Loader2,
  Wand2,
  Printer,
  Copy,
  LayoutList,
  CheckCircle2,
  ListOrdered
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function TermPlan({ onBack }: { onBack: () => void }) {
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [term, setTerm] = useState('الفصل الدراسي الأول');
  const [weeksCount, setWeeksCount] = useState('14');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any[] | null>(null);

  const terms = ['الفصل الدراسي الأول', 'الفصل الدراسي الثاني'];

  const handleGenerate = async () => {
    if (!subject || !grade) return;
    setIsGenerating(true);
    
    // Simulate AI generation distributing topics across weeks
    setTimeout(() => {
      const plan = Array.from({ length: parseInt(weeksCount) }, (_, i) => ({
        week: i + 1,
        dateRange: `الأسبوع ${i + 1}`,
        topics: i === Math.floor(parseInt(weeksCount) / 2) ? 'مراجعة منتصف الفصل والاختبارات النصفية' : 
                i === parseInt(weeksCount) - 1 ? 'مراجعة نهائية شاملة للمقرر' :
                i === parseInt(weeksCount) - 2 ? 'الاختبارات العملية والشفهية' :
                `الوحدة ${Math.floor(i/3) + 1}: درس نظري وتطبيقات حول مادة ${subject}`,
        notes: i % 4 === 0 ? 'نشاط صفي مقترح' : ''
      }));
      
      setGeneratedPlan(plan);
      setIsGenerating(false);
    }, 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 select-none font-sans" dir="rtl">
      <style>
        {`
          @media print {
            body * { visibility: hidden; }
            .print-area, .print-area * { visibility: visible; }
            .print-area { position: absolute; left: 0; top: 0; width: 100%; background: white; }
            .no-print { display: none !important; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 2px solid black !important; padding: 12px !important; text-align: center; }
            th { background-color: #f1f5f9 !important; -webkit-print-color-adjust: exact; }
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 shadow-xl relative overflow-hidden rounded-[2rem] mb-8 flex items-center justify-between border-b border-slate-800 no-print">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="relative z-10 flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20 transition-all"
            >
              <ArrowRight size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-black text-white flex items-center gap-3">
                الخطة الفصلية وتوزيع المنهج
                <span className="bg-teal-500 text-white text-[10px] px-2 py-1 rounded-full uppercase tracking-widest font-black">AI Auto-Schedule</span>
              </h1>
              <p className="text-slate-400 font-medium text-sm mt-1">
                توزيع ذكي لمفردات المنهج على أسابيع الفصل الدراسي مع مراعاة المراجعات والتقييمات.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8 no-print">
          {/* Controls */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200">
              
              <label className="block text-sm font-bold text-slate-700 mb-2">اسم المادة</label>
              <input 
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="مثال: الرياضيات، العلوم..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-800 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all mb-4"
              />

              <label className="block text-sm font-bold text-slate-700 mb-2">الصف الدراسي</label>
              <input 
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="مثال: الأول الثانوي"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-800 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all mb-4"
              />

              <label className="block text-sm font-bold text-slate-700 mb-2">الفصل الدراسي</label>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {terms.map(t => (
                  <label key={t} className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${term === t ? 'bg-teal-50 border-teal-500 text-teal-800' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                    <input 
                      type="radio" 
                      name="term" 
                      value={t}
                      checked={term === t}
                      onChange={(e) => setTerm(e.target.value)}
                      className="hidden"
                    />
                    <span className="font-bold text-xs text-center w-full">{t}</span>
                  </label>
                ))}
              </div>

              <label className="block text-sm font-bold text-slate-700 mb-2">عدد أسابيع الفصل</label>
              <input 
                type="number"
                value={weeksCount}
                onChange={(e) => setWeeksCount(e.target.value)}
                min="10" max="20"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-800 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all mb-6 text-center"
              />

              <button 
                onClick={handleGenerate}
                disabled={!subject || !grade || isGenerating}
                className="w-full bg-teal-600 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-teal-600/20"
              >
                {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Wand2 size={20} />}
                {isGenerating ? 'جاري التوزيع الزمني...' : 'توليد خطة الفصل'}
              </button>
            </div>
          </div>

          {/* Results Preview */}
          <div className="md:col-span-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 min-h-[600px] flex flex-col relative overflow-hidden">
              {!generatedPlan && !isGenerating && (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 opacity-60 py-32 z-10 relative">
                  <Calendar size={64} className="mb-4 text-slate-300" />
                  <p className="font-bold text-lg">توزيع المنهج الذكي</p>
                  <p className="text-sm mt-2 max-w-sm text-center">أدخل بيانات المادة وسيقوم النظام بتوزيع مفردات المقرر على أسابيع الفصل بالتساوي وتحديد أسابيع المراجعة تلقائياً.</p>
                </div>
              )}

              {isGenerating && (
                <div className="flex-1 flex flex-col items-center justify-center text-teal-600 py-32 z-10 relative">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <ListOrdered size={48} />
                  </motion.div>
                  <p className="font-bold mt-6 animate-pulse text-lg">خوارزمية الجدولة تقوم بترتيب وتوزيع الوحدات...</p>
                </div>
              )}

              {generatedPlan && !isGenerating && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex-1 flex flex-col z-10 relative"
                >
                  <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4 no-print">
                    <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                      <CheckCircle2 size={24} className="text-teal-500" />
                      خطة الفصل المقترحة
                    </h2>
                    
                    <div className="flex gap-2">
                      <button className="text-sm font-bold text-white bg-teal-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-700 transition-colors" onClick={handlePrint}>
                        <Printer size={16} />
                        طباعة السجل
                      </button>
                    </div>
                  </div>
                  
                  {/* Print Area Container */}
                  <div className="print-area bg-white text-black w-full">
                    <div className="text-center mb-8 border-b-2 border-black pb-4">
                      <h1 className="text-2xl font-black mb-2">توزيع منهج {subject}</h1>
                      <div className="flex justify-center gap-8 text-lg font-bold">
                        <span>الصف: {grade}</span>
                        <span>الفصل: {term}</span>
                        <span>للعام الدراسي 2026/2027</span>
                      </div>
                    </div>

                    <table className="w-full text-right border-collapse border border-slate-300">
                      <thead>
                        <tr className="bg-slate-100 font-black text-slate-800">
                          <th className="p-4 border border-slate-300 w-24 text-center">الأسبوع</th>
                          <th className="p-4 border border-slate-300">الموضوع / الوحدة الدراسية</th>
                          <th className="p-4 border border-slate-300 w-48">ملاحظات / أنشطة</th>
                        </tr>
                      </thead>
                      <tbody>
                        {generatedPlan.map((week, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="p-4 border border-slate-300 text-center font-bold">{week.week}</td>
                            <td className="p-4 border border-slate-300 font-bold text-slate-700">{week.topics}</td>
                            <td className="p-4 border border-slate-300 text-sm text-slate-500">{week.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
