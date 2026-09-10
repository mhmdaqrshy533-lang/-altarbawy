/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowRight, LayoutDashboard, Settings, RefreshCw, Download } from 'lucide-react';
import { SchedulingEngine } from '../core/SchedulingEngine';

const MOCK_TEACHERS = [
  { id: 't1', name: 'أ. عبدالله صالح', subject: 'رياضيات', maxHours: 15 },
  { id: 't2', name: 'أ. محمد سعيد', subject: 'علوم', maxHours: 15 },
  { id: 't3', name: 'أ. خالد يحيى', subject: 'لغة عربية', maxHours: 18 },
];

const MOCK_CLASSES = [
  { id: 'c1', name: 'الأول الثانوي - أ' },
  { id: 'c2', name: 'الأول الثانوي - ب' },
];

const SUBJECT_CONSTRAINTS = {
  'رياضيات': 5,
  'علوم': 4,
  'لغة عربية': 6
};

export default function TimetableScheduler({ onBack }: { onBack: () => void }) {
  const [schedule, setSchedule] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const runAlgorithm = () => {
    setIsProcessing(true);
    // Simulate algorithmic processing time
    setTimeout(() => {
      const result = SchedulingEngine.generateTimetable(MOCK_TEACHERS, MOCK_CLASSES, SUBJECT_CONSTRAINTS);
      setSchedule(result);
      setIsProcessing(false);
    }, 600);
  };

  useEffect(() => {
    runAlgorithm();
  }, []);

  const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
  const periods = [1, 2, 3, 4, 5, 6];

  return (
    <div className="min-h-screen bg-slate-50 p-6 select-none font-sans">
      <div className="max-w-7xl mx-auto">
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
                <LayoutDashboard className="text-violet-600" size={24} />
                محرك الجدولة (Constraint Solver)
              </h1>
              <p className="text-slate-500 font-medium text-sm mt-1">
                توزيع آلي للحصص بناءً على قيود المعلمين وشروط النظام
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={runAlgorithm}
              disabled={isProcessing}
              className="px-4 py-2 bg-violet-50 text-violet-700 border border-violet-200 rounded-lg font-bold flex items-center gap-2 hover:bg-violet-100 disabled:opacity-50 transition-colors"
            >
              <RefreshCw size={18} className={isProcessing ? 'animate-spin' : ''} />
              إعادة بناء الجدول
            </button>
            <button className="px-4 py-2 bg-slate-800 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-slate-900 transition-colors">
              <Download size={18} />
              تصدير رسمي
            </button>
          </div>
        </div>

        {/* Timetable Grids */}
        <div className="grid lg:grid-cols-2 gap-6">
          {schedule && Object.entries(schedule).map(([classId, classData]: [string, any]) => (
            <div key={classId} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-800 text-white flex justify-between items-center">
                <h2 className="font-bold text-lg">فصل: {classData.name}</h2>
                <Settings size={18} className="text-slate-400" />
              </div>
              
              <div className="overflow-x-auto p-4">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2 border border-slate-200 bg-slate-100 text-slate-600 font-bold text-sm">اليوم / الحصة</th>
                      {periods.map(p => (
                        <th key={p} className="p-2 border border-slate-200 bg-slate-100 text-slate-600 font-bold text-sm">الثانية {p}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {days.map(day => (
                      <tr key={day}>
                        <td className="p-2 border border-slate-200 bg-slate-50 font-bold text-sm text-slate-700">{day}</td>
                        {periods.map(p => {
                          const slot = classData.timetable[day][p];
                          return (
                            <td key={p} className="p-2 border border-slate-200 text-sm">
                              {slot ? (
                                <div>
                                  <div className="font-bold text-violet-700">{slot.subject}</div>
                                  <div className="text-xs text-slate-500">{slot.teacher}</div>
                                </div>
                              ) : (
                                <span className="text-slate-300">-</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
