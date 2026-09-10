/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * محرر الرقيم التربوي - شاشة البداية والتهيئة السيادية (Splash Screen)
 * تصميم متجاوب، متوافق تماماً مع الوضعين النهاري والليلي، تهيئة سريعة وسلسة.
 * برمجة وتصميم المهندس سهيل الهزبري
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
  minDurationMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onComplete, 
  minDurationMs = 1100 
}) => {
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('تهيئة بيئة العمل السيادية...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Stage 1: Storage & fonts initialization
    const timer1 = setTimeout(() => {
      setProgress(55);
      setStatusText('تحميل المعايير والخطوط التربوية المعتمدة...');
    }, minDurationMs * 0.35);

    // Stage 2: Ready
    const timer2 = setTimeout(() => {
      setProgress(100);
      setStatusText('جاهز للاستخدام');
    }, minDurationMs * 0.75);

    // Stage 3: Complete and trigger exit
    const timer3 = setTimeout(() => {
      setIsDone(true);
      setTimeout(onComplete, 350); // allow exit animation to complete
    }, minDurationMs);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [minDurationMs, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-gradient-to-b from-slate-50 to-sky-50/50 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-white p-6 select-none font-sans"
          dir="rtl"
        >
          {/* Top Subtle Seal */}
          <div className="w-full flex justify-between items-center max-w-sm pt-4 opacity-70 text-xs font-bold text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-[#004B6E] dark:text-sky-400" />
              <span>المنظومة التعليمية الوطنية</span>
            </div>
            <span>الإصدار 2.0</span>
          </div>

          {/* Center Brand Identity */}
          <div className="flex flex-col items-center text-center space-y-6 max-w-sm">
            {/* Emblem Icon */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative"
            >
              <div className="w-24 h-24 rounded-3xl bg-[#004B6E] text-white flex items-center justify-center text-4xl shadow-2xl shadow-sky-900/30 border-2 border-sky-400/30">
                🎓
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-2 rounded-[2rem] border border-[#004B6E]/20 dark:border-sky-400/20 border-dashed pointer-events-none"
              />
            </motion.div>

            {/* Title & Official Name */}
            <div className="space-y-2">
              <motion.h1 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight"
              >
                محرر الرقيم التربوي
              </motion.h1>
              <motion.p 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed"
              >
                المنصة الموحدة لإعداد وتحرير الوثائق والامتحانات المدرسية
              </motion.p>
            </div>

            {/* Smart Progress Bar */}
            <div className="w-full space-y-2 pt-4">
              <div className="w-64 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mx-auto border border-slate-300/40 dark:border-slate-700/60">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#004B6E] to-sky-500 rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 h-4 transition-all">
                {statusText}
              </p>
            </div>
          </div>

          {/* Bottom Designer Credit */}
          <div className="pb-4 text-center">
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500">
              برمجة وتطوير المهندس سهيل الهزبري
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
