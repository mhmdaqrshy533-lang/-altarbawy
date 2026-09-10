/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { ArrowRight, ScanLine, FileBarChart, CheckCircle2, Play, Settings2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function BubbleSheetProcessor({ onBack }: { onBack: () => void }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<{ id: string, answers: number, score: number } | null>(null);

  const startProcessing = () => {
    setIsProcessing(true);
    setResults(null);
    
    // Simulate algorithmic image processing (OpenCV style)
    setTimeout(() => {
      setIsProcessing(false);
      setResults({
        id: 'STD-8472',
        answers: 48,
        score: 96
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 select-none font-sans">
      <div className="max-w-6xl mx-auto">
        {/* ERP Header */}
        <div className="bg-white p-6 shadow-sm border border-slate-200 rounded-xl mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <ArrowRight size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <ScanLine className="text-violet-600" size={24} />
                التصحيح الذكي (Smart Correction)
              </h1>
              <p className="text-slate-500 font-medium text-sm mt-1">
                خوارزمية رياضية لاستخراج البيانات من أوراق الإجابة بدقة 99.9%
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
             <button className="px-4 py-2 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg font-bold flex items-center gap-2 hover:bg-slate-200 transition-colors">
              <Settings2 size={18} />
              معايرة المستشعرات
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Scanner View */}
          <div className="lg:col-span-2 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-xl relative min-h-[500px] flex items-center justify-center">
            
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {!isProcessing && !results && (
              <div className="text-center z-10">
                <div className="w-20 h-20 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ScanLine size={40} className="text-violet-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">النظام جاهز للاستقبال</h3>
                <p className="text-slate-400 mb-8">يرجى توجيه الكاميرا نحو ورقة (Bubble Sheet)</p>
                <button 
                  onClick={startProcessing}
                  className="bg-violet-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 mx-auto hover:bg-violet-700 transition-colors"
                >
                  <Play size={20} />
                  بدء المعالجة الخوارزمية
                </button>
              </div>
            )}

            {isProcessing && (
              <div className="z-10 w-full max-w-md">
                <div className="relative h-64 border-2 border-violet-500/50 rounded-xl overflow-hidden mb-6 bg-slate-800">
                  <motion.div
                    animate={{ y: [0, 256, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="w-full h-1 bg-green-400 shadow-[0_0_15px_#4ade80] absolute"
                  />
                  <img src="https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop" alt="Sheet" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
                </div>
                <div className="text-center">
                  <p className="text-violet-400 font-mono text-sm mb-2 animate-pulse">Running Matrix Extraction [O(n^2)]...</p>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.5 }}
                      className="h-full bg-violet-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {results && (
              <div className="z-10 relative">
                <img src="https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop" alt="Sheet" className="w-full max-w-md h-auto rounded-xl opacity-60 mix-blend-luminosity" />
                
                {/* Simulated identified points */}
                <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full border-2 border-green-400" />
                <div className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full border-2 border-green-400" />
                <div className="absolute bottom-1/4 left-1/3 w-4 h-4 rounded-full border-2 border-green-400" />
                
                <div className="absolute inset-0 border-4 border-green-500/50 rounded-xl" />
              </div>
            )}
          </div>

          {/* Results Panel */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col">
            <h2 className="font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <FileBarChart size={20} className="text-slate-500" />
              سجل المخرجات
            </h2>

            <AnimatePresence mode="wait">
              {!results ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-slate-400"
                >
                  <p className="text-sm font-medium">في انتظار البيانات...</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="result"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="flex-1"
                >
                  <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6 flex items-start gap-3">
                    <CheckCircle2 size={24} className="text-green-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-green-800 mb-1">المطابقة ناجحة</h4>
                      <p className="text-xs text-green-600 font-medium">تم التحقق من تطابق العلامات المرجعية (Fiducial Markers)</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-500 text-sm">المعرف الرقمي</span>
                      <span className="font-mono font-bold text-slate-800">{results.id}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-500 text-sm">الإجابات الصحيحة</span>
                      <span className="font-bold text-slate-800">{results.answers} / 50</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-500 text-sm">الدرجة النهائية</span>
                      <span className="font-black text-2xl text-violet-700">{results.score}%</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4 w-full">
                    <button className="flex-1 py-3 bg-violet-50 text-violet-700 font-bold rounded-xl hover:bg-violet-100 transition-colors border border-violet-100 text-sm">
                      حفظ السجل
                    </button>
                    <button className="flex-1 py-3 bg-emerald-50 text-emerald-700 font-bold rounded-xl hover:bg-emerald-100 transition-colors border border-emerald-100 text-sm">
                      تصدير
                    </button>
                  </div>

                  <button 
                    onClick={() => setResults(null)}
                    className="w-full py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    معالجة ورقة جديدة
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
