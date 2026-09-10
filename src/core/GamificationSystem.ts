/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

// نظام دوبامين الإنجاز (Gamification Logic)
// يدير شريط الإنجاز اليومي ويحفظ الحالة محلياً
export function useGamification() {
  const [progress, setProgress] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // جلب حالة الإنجاز من (Local Database / Storage)
    const saved = localStorage.getItem('mistar_daily_progress') || '85';
    setProgress(parseInt(saved, 10));
  }, []);

  const addProgress = (amount: number) => {
    setProgress(prev => {
      if (prev >= 100) return prev;
      
      const newProgress = Math.min(prev + amount, 100);
      
      // حفظ الحالة محلياً (Offline First)
      localStorage.setItem('mistar_daily_progress', newProgress.toString());
      
      // تفعيل تأثير التوهج عند الوصول لـ 100%
      if (newProgress === 100) {
        setShowCelebration(true);
        // إخفاء الاحتفال بعد 5 ثواني
        setTimeout(() => setShowCelebration(false), 5000);
      }
      return newProgress;
    });
  };

  const resetProgress = () => {
    setProgress(0);
    localStorage.setItem('mistar_daily_progress', '0');
  };

  return {
    progress,
    showCelebration,
    addProgress,
    resetProgress
  };
}
