/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Trophy, Star, Medal, Crown, Shield, Award } from 'lucide-react';

export default function Badges({ onBack }: { onBack: () => void }) {
  const badges = [
    { id: 1, title: 'قاهر الاختبارات', desc: 'تم توليد أكثر من 100 نموذج اختبار بذكاء', icon: Crown, unlocked: true },
    { id: 2, title: 'مهندس التقارير', desc: 'إصدار 50 تقرير تحليل أداء شهري', icon: Shield, unlocked: true },
    { id: 3, title: 'أسطورة الحضور', desc: 'أتمتة الغياب والحضور لمدة شهر كامل متواصل', icon: Star, unlocked: true },
    { id: 4, title: 'صانع الأجيال', desc: 'تصحيح 1000 ورقة إجابة بصرياً', icon: Medal, unlocked: false },
    { id: 5, title: 'رائد التخطيط', desc: 'بناء 50 خطة يومية ديناميكية', icon: Trophy, unlocked: false },
    { id: 6, title: 'الدرع الأكاديمي', desc: 'التنبؤ بـ 10 حالات رسوب مبكرة ومعالجتها', icon: Award, unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-purple-950 p-6 select-none font-sans relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-yellow-500 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12 mt-6">
          <button 
            onClick={onBack}
            className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-yellow-500 hover:bg-white/20 border border-yellow-500/30 transition-all"
          >
            <ArrowRight size={24} />
          </button>
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-yellow-300 via-yellow-100 to-yellow-500 flex items-center gap-3">
              أوسمة الإنجاز
              <Trophy className="text-yellow-400" size={32} />
            </h1>
            <p className="text-purple-200/80 font-medium mt-2">سجل الشرف الملكي الخاص بك</p>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative group rounded-[2rem] p-8 border backdrop-blur-xl flex flex-col items-center text-center transition-all duration-500 overflow-hidden ${
                  badge.unlocked 
                    ? 'bg-purple-900/40 border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.1)] hover:shadow-[0_0_50px_rgba(234,179,8,0.2)] hover:-translate-y-2' 
                    : 'bg-purple-900/10 border-white/5 opacity-60 grayscale'
                }`}
              >
                {/* Shine effect */}
                {badge.unlocked && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full" />
                )}

                {/* The Coin */}
                <div className={`w-32 h-32 rounded-full mb-6 flex items-center justify-center relative shadow-2xl ${
                  badge.unlocked 
                    ? 'bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 p-1' 
                    : 'bg-slate-700 p-1'
                }`}>
                  <div className={`w-full h-full rounded-full flex items-center justify-center ${
                    badge.unlocked
                      ? 'bg-gradient-to-br from-yellow-200 to-yellow-600 shadow-inner'
                      : 'bg-slate-800'
                  }`}>
                    <Icon size={48} className={badge.unlocked ? 'text-yellow-900' : 'text-slate-500'} />
                  </div>
                  {/* Decorative dots on coin */}
                  <div className="absolute inset-2 border-2 border-dashed rounded-full border-black/10" />
                </div>

                <h3 className={`text-2xl font-black mb-2 ${badge.unlocked ? 'text-yellow-400' : 'text-slate-400'}`}>
                  {badge.title}
                </h3>
                <p className={`text-sm font-medium ${badge.unlocked ? 'text-purple-200' : 'text-slate-500'}`}>
                  {badge.desc}
                </p>

                {!badge.unlocked && (
                  <div className="absolute top-4 right-4 bg-slate-800/80 text-xs font-bold px-3 py-1 rounded-full text-slate-400 border border-slate-700 backdrop-blur-md">
                    مغلق
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
