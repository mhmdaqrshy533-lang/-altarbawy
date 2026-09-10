import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles,
  Wand2,
  BookOpen,
  FileText,
  Save,
  Loader2,
  Copy,
  BrainCircuit,
  GraduationCap,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SmartMemos({ onBack }: { onBack: () => void }) {
  const [topic, setTopic] = useState('');
  const [studentLevel, setStudentLevel] = useState('مستوى متوسط');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMemo, setGeneratedMemo] = useState<string | null>(null);

  const levels = ['مستوى متقدم (إثراء)', 'مستوى متوسط', 'مستوى تأسيسي (تبسيط مكثف)'];

  const generateContent = async () => {
    if (!topic) return;
    setIsGenerating(true);
    
    // Simulate complex AI generation
    setTimeout(() => {
      setGeneratedMemo(`مذكرة مبسطة: ${topic}\n\nالهدف من هذا الدرس هو فهم القواعد الأساسية وتطبيقها في الحياة اليومية.\n\nالنقاط الرئيسية:\n1. المفهوم الأول: شرح مبسط للأفكار المعقدة باستخدام أمثلة يومية.\n2. المفهوم الثاني: خطوات الحل بطريقة متسلسلة وسهلة الحفظ.\n\nمثال توضيحي:\nتخيل أنك في السوق وتريد حساب... (شرح يعتمد على ${studentLevel}).\n\nتمرين سريع للتأكد من الفهم:\n- حاول تطبيق ما تعلمته في المسألة التالية...`);
      setIsGenerating(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 select-none font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 shadow-xl relative overflow-hidden rounded-[2rem] mb-8 flex items-center justify-between border-b border-slate-800">
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
                محرر المذكرات الذكي (تبسيط المناهج)
                <span className="bg-sky-500 text-white text-[10px] px-2 py-1 rounded-full uppercase tracking-widest font-black">AI Powered</span>
              </h1>
              <p className="text-slate-400 font-medium text-sm mt-1">
                قم بإدخال النص المعقد أو موضوع الدرس، وسيقوم النظام بتلخيصه وصياغته بأسلوب يناسب مستوى إدراك الطلاب.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Controls */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200">
              
              <label className="block text-sm font-bold text-slate-700 mb-2">النص الأصلي أو عنوان المنهج</label>
              <textarea 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="مثال: انسخ هنا نصاً معقداً من الكتاب المدرسي، أو اكتب اسم الدرس (مثال: قوانين نيوتن للحركة)..."
                rows={5}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all mb-6 resize-none leading-relaxed"
              />

              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <GraduationCap size={16} className="text-sky-500" />
                المستوى المستهدف (أسلوب الشرح)
              </label>
              <div className="space-y-3 mb-8">
                {levels.map(level => (
                  <label key={level} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${studentLevel === level ? 'bg-sky-50 border-sky-300 text-sky-800' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                    <input 
                      type="radio" 
                      name="level" 
                      value={level}
                      checked={studentLevel === level}
                      onChange={(e) => setStudentLevel(e.target.value)}
                      className="w-4 h-4 text-sky-600 focus:ring-sky-500 border-slate-300"
                    />
                    <span className="font-bold text-sm">{level}</span>
                  </label>
                ))}
              </div>

              <button 
                onClick={generateContent}
                disabled={!topic || isGenerating}
                className="w-full bg-sky-600 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-sky-600/20"
              >
                {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Wand2 size={20} />}
                {isGenerating ? 'جاري الصياغة والتبسيط...' : 'توليد المذكرة'}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="md:col-span-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 min-h-[600px] flex flex-col">
              {!generatedMemo && !isGenerating && (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 opacity-60 py-32">
                  <BookOpen size={64} className="mb-4 text-slate-300" />
                  <p className="font-bold text-lg">محرر المذكرات التفاعلية</p>
                  <p className="text-sm mt-2 max-w-sm text-center">أدخل النص المعقد يميناً، وسيقوم الذكاء الاصطناعي بصياغته بأسلوب مشوق ومبسط لطلابك هنا.</p>
                </div>
              )}

              {isGenerating && (
                <div className="flex-1 flex flex-col items-center justify-center text-sky-600 py-32">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Sparkles size={48} />
                  </motion.div>
                  <p className="font-bold mt-6 animate-pulse text-lg">يقوم الذكاء الاصطناعي الآن بتبسيط المفردات وصياغة الأمثلة...</p>
                </div>
              )}

              {generatedMemo && !isGenerating && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex-1 flex flex-col"
                >
                  <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                      <FileText size={24} className="text-sky-500" />
                      المذكرة المولدة
                    </h2>
                    
                    <div className="flex gap-2">
                      <button className="text-sm font-bold text-slate-600 bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-100">
                        <Copy size={16} />
                        نسخ
                      </button>
                      <button className="text-sm font-bold text-white bg-slate-900 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800">
                        <Download size={16} />
                        تصدير PDF
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-sky-50/50 rounded-2xl p-6 border border-sky-100/50 flex-1 relative">
                    <div className="absolute top-4 left-4">
                      <span className="bg-white text-sky-700 px-3 py-1 rounded-full text-xs font-black border border-sky-200 shadow-sm">
                        {studentLevel}
                      </span>
                    </div>
                    <textarea 
                      className="w-full h-full bg-transparent resize-none focus:outline-none text-slate-700 font-medium leading-loose text-lg"
                      value={generatedMemo}
                      onChange={(e) => setGeneratedMemo(e.target.value)}
                    />
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
