/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowRight, 
  Save, 
  Printer, 
  Wand2, 
  Type,
  Layout,
  Clock,
  Loader2,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { LessonPlannerEngine } from '../core/LessonPlannerEngine';
import { SovereignDocumentEngine } from '../core/SovereignDocumentEngine';
import { motion, AnimatePresence } from 'motion/react';

export default function DailyPlan({ onBack }: { onBack: () => void }) {
  const [prompt, setPrompt] = useState('');
  
  // Parsed metadata after generation
  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [date, setDate] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  
  const [plan, setPlan] = useState<{
    objectives: any[];
    tools: string;
    homework: string;
    scenario: string;
  } | null>(null);

  const handleSmartGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    
    // Simulate AI parsing the natural language prompt and generating the plan
    setTimeout(() => {
      // Mocking extracted data from prompt
      setTopic(prompt.includes('كيمياء') || prompt.includes('معادلات') ? 'المعادلات الكيميائية' : 'موضوع مخصص');
      setSubject(prompt.includes('كيمياء') || prompt.includes('معادلات') ? 'الكيمياء' : 'المادة');
      setGrade(prompt.includes('ثالث ثانوي') ? 'الثالث الثانوي' : 'الصف الدراسي');
      
      const today = new Date();
      if (prompt.includes('غدا') || prompt.includes('غداً')) {
        today.setDate(today.getDate() + 1);
      }
      setDate(today.toISOString().split('T')[0].replace(/-/g, '/'));

      setPlan({
        objectives: [
          { desc: 'أن يعرف الطالب التفاعل الكيميائي بدقة.', level: 'تذكر' },
          { desc: 'أن يوازن الطالب معادلة كيميائية بسيطة بشكل صحيح.', level: 'تطبيق' },
          { desc: 'أن يستنتج الطالب قانون حفظ الكتلة من خلال المعادلات.', level: 'استنتاج' },
        ],
        tools: 'السبورة التفاعلية، مجسمات للذرات، عرض تقديمي (PowerPoint).',
        homework: 'حل المسائل من 1 إلى 5 في صفحة 42 من الكتاب المدرسي مع كتابة المعادلات الرمزية والموزونة.',
        scenario: '1. التمهيد (5 دقائق): طرح سؤال استثاري حول صدأ الحديد.\n2. العرض (25 دقيقة): شرح مفاهيم التفاعل، المتفاعلات والنواتج، وخطوات موازنة المعادلة مع أمثلة عملية.\n3. التطبيق (10 دقائق): حل تدريبات جماعية على السبورة.\n4. الخاتمة (5 دقائق): تلخيص الدرس وتقييم سريع للتأكد من فهم الأهداف.'
      });
      setIsGenerating(false);
    }, 2000);
  };

  const handlePrint = async () => {
    if (!plan) return;
    setIsPrinting(true);
    
    const content = [
      `المادة: ${subject} | الصف: ${grade} | التاريخ: ${date}`,
      `موضوع الدرس: ${topic}`,
      '',
      '--- الأهداف السلوكية ---',
      ...plan.objectives.map((obj, i) => `${i + 1}. ${obj.desc} (${obj.level})`),
      '',
      '--- سيناريو الحصة ---',
      plan.scenario,
      '',
      '--- الوسائل التعليمية ---',
      plan.tools,
      '',
      '--- الواجب المنزلي ---',
      plan.homework
    ];

    await SovereignDocumentEngine.generateOfficialDocument(`خطة درس ${topic}`, content);
    setIsPrinting(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 select-none font-sans" dir="rtl">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 shadow-xl border border-slate-800 rounded-2xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between relative overflow-hidden gap-4">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div className="flex items-center gap-4 relative z-10">
            <button onClick={onBack} className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10">
              <ArrowRight size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                محرر الخطط الدراسية الذكي
                <Sparkles size={20} className="text-teal-400" />
              </h1>
              <p className="text-slate-400 font-medium text-sm mt-1">قل وداعاً لتعبئة الحقول اليدوية.. اطلب ما تريد وسيقوم النظام بصياغة الخطة كاملة وفق معايير الوزارة.</p>
            </div>
          </div>
        </div>

        {/* AI Prompt Input */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <label className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
            <MessageSquare size={18} className="text-teal-500" />
            ماذا تريد أن تحضر اليوم؟
          </label>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='مثال: "أريد تحضير درس (المعادلات الكيميائية) لثالث ثانوي غداً"'
                className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200 font-bold text-slate-700 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all text-lg shadow-inner pr-12"
                onKeyDown={(e) => e.key === 'Enter' && handleSmartGenerate()}
              />
              <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            </div>
            <button 
              onClick={handleSmartGenerate}
              disabled={!prompt || isGenerating}
              className="px-8 py-4 rounded-xl bg-teal-600 text-white font-black flex items-center justify-center gap-2 hover:bg-teal-700 disabled:opacity-50 transition-all shadow-lg shadow-teal-600/20 md:w-auto w-full"
            >
              {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Wand2 size={20} />}
              {isGenerating ? 'جاري بناء الخطة...' : 'توليد سحري'}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {plan && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
            >
              {/* Top Metadata */}
              <div className="bg-slate-50 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-slate-200 relative">
                <div className="absolute left-6 top-6">
                  <button 
                    onClick={handlePrint}
                    disabled={isPrinting}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-white font-bold flex items-center gap-2 hover:bg-slate-900 disabled:opacity-50 transition-colors shadow-md text-sm"
                  >
                    {isPrinting ? <Loader2 size={16} className="animate-spin" /> : <Printer size={16} />}
                    إصدار للطباعة
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 flex items-center gap-2">
                    <Layout size={14} /> موضوع الدرس
                  </label>
                  <input 
                    type="text" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-white p-2 rounded-lg border border-slate-200 font-bold text-slate-700 focus:outline-none focus:border-teal-400 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 flex items-center gap-2">
                    <Type size={14} /> المادة
                  </label>
                  <input 
                    type="text" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-white p-2 rounded-lg border border-slate-200 font-bold text-slate-700 focus:outline-none focus:border-teal-400 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 flex items-center gap-2">
                    <Layout size={14} /> الصف
                  </label>
                  <input 
                    type="text" 
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full bg-white p-2 rounded-lg border border-slate-200 font-bold text-slate-700 focus:outline-none focus:border-teal-400 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 flex items-center gap-2">
                    <Clock size={14} /> التاريخ
                  </label>
                  <input 
                    type="text" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white p-2 rounded-lg border border-slate-200 font-bold text-slate-700 focus:outline-none focus:border-teal-400 transition-colors"
                  />
                </div>
              </div>

              {/* Table Content */}
              <div className="p-6">
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-teal-500 rounded-full" />
                    الأهداف السلوكية (يتوقع من الطالب أن...)
                  </h3>
                  
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-right">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                          <th className="p-4 w-12">#</th>
                          <th className="p-4">وصف الهدف</th>
                          <th className="p-4 w-32">المستوى المعرفي</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {plan.objectives.map((obj, i) => (
                          <tr key={i} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 font-black text-slate-400">{i + 1}</td>
                            <td className="p-4">
                              <input type="text" defaultValue={obj.desc} className="w-full bg-transparent focus:outline-none font-bold text-slate-800" />
                            </td>
                            <td className="p-4">
                              <span className="px-3 py-1.5 bg-teal-50 text-teal-700 text-xs rounded-lg font-bold border border-teal-100">{obj.level}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                    سيناريو الحصة الدراسية (موزع زمنياً)
                  </h3>
                  <textarea 
                    className="w-full bg-slate-50 rounded-xl p-4 text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 border border-slate-200 resize-none leading-relaxed"
                    rows={6}
                    value={plan.scenario}
                    onChange={(e) => setPlan({...plan, scenario: e.target.value})}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                      الوسائل التعليمية المقترحة
                    </h3>
                    <textarea 
                      className="w-full bg-slate-50 rounded-xl p-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-slate-200 border border-slate-200 resize-none"
                      rows={3}
                      value={plan.tools}
                      onChange={(e) => setPlan({...plan, tools: e.target.value})}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                      التكليف والواجب المنزلي
                    </h3>
                    <textarea 
                      className="w-full bg-slate-50 rounded-xl p-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-slate-200 border border-slate-200 resize-none"
                      rows={3}
                      value={plan.homework}
                      onChange={(e) => setPlan({...plan, homework: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
