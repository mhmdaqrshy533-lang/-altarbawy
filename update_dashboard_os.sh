cat << 'INNER_EOF' > src/components/Dashboard.tsx
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { 
  FileText, Printer, CalendarDays, UserCheck, LayoutDashboard, 
  Users, GraduationCap, Database, Award, Archive, Library, 
  Wrench, Settings, BrainCircuit, FileSignature, Trophy, 
  Activity, Send, MessageCircle, HelpCircle, Lock, Youtube, 
  AlertTriangle, Brain, Sparkles, ScanLine, Cpu, BellRing, ChevronLeft, Command
} from 'lucide-react';
import { Section } from '../types';
import { useGamification } from '../core/GamificationSystem';

export const sections: Section[] = [
  { id: 'dashboard_overview', title: 'التحليلات الوطنية', icon: 'LayoutDashboard', description: 'رؤية شاملة للأداء', color: 'bg-indigo-600' },
  { id: 'smart_correction', title: 'التصحيح الذكي', icon: 'ScanLine', description: 'OCR/OMR فوري', color: 'bg-emerald-600' },
  { id: 'document_editor', title: 'المستندات الرسمية', icon: 'FileText', description: 'خطابات ونماذج', color: 'bg-blue-600' },
  { id: 'exams_section', title: 'محرر الاختبارات', icon: 'FileSignature', description: 'توليد ذكي للأسئلة', color: 'bg-purple-600' },
  { id: 'attendance_section', title: 'الحضور الاستباقي', icon: 'UserCheck', description: 'متابعة ذكية', color: 'bg-rose-600' },
  { id: 'grades_section', title: 'سجل الدرجات', icon: 'GraduationCap', description: 'رصد وتحليل', color: 'bg-amber-600' },
  { id: 'student_affairs', title: 'شؤون الطلاب', icon: 'Users', description: 'تتبع السلوك والميول', color: 'bg-orange-600' },
  { id: 'plans_section', title: 'المسار التعليمي', icon: 'CalendarDays', description: 'خطط ديناميكية', color: 'bg-teal-600' },
  { id: 'question_bank', title: 'بنك المعرفة', icon: 'Database', description: 'أسئلة وتصنيفات', color: 'bg-cyan-600' },
  { id: 'certificates_section', title: 'سجلات الإنجاز', icon: 'Award', description: 'محافظ رقمية', color: 'bg-pink-600' },
  { id: 'archive_section', title: 'الأرشيف المركزي', icon: 'Archive', description: 'حفظ آمن للملفات', color: 'bg-slate-600' },
  { id: 'library_section', title: 'المكتبة الرقمية', icon: 'Library', description: 'مصادر تفاعلية', color: 'bg-sky-600' },
  { id: 'teacher_tools', title: 'مساعد التدريس', icon: 'Wrench', description: 'أدوات المعلم الذكية', color: 'bg-lime-600' },
  { id: 'ai_section', title: 'Mistar EduOS', icon: 'BrainCircuit', description: 'الرؤية الوطنية 2040', color: 'bg-fuchsia-600' },
  { id: 'print_export', title: 'بوابة التصدير', icon: 'Printer', description: 'التقارير الرسمية', color: 'bg-emerald-500' },
  { id: 'settings', title: 'إعدادات النظام', icon: 'Settings', description: 'تخصيص وبيانات', color: 'bg-slate-700' }
];

const iconMap: Record<string, any> = {
  LayoutDashboard, FileText, FileSignature, UserCheck, GraduationCap, Users, CalendarDays, Database, Award, Archive, Library, Wrench, BrainCircuit, Printer, Settings, ScanLine
};

export default function Dashboard({ onSelect, onOpenBadges }: { onSelect: (id: string) => void, onOpenBadges: () => void }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 font-sans select-none overflow-hidden flex flex-col relative">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* OS Header */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-slate-800/60 bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/30">
            <Command size={20} />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              Mistar EduOS <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded font-mono border border-indigo-500/30">v4.0.0-beta</span>
            </h1>
            <p className="text-slate-400 text-xs font-medium tracking-wide">نظام التشغيل التعليمي الاستباقي</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm font-mono text-sm">
            <span className="text-slate-400">{time.toLocaleDateString('ar-SA')}</span>
            <span className="text-slate-600">|</span>
            <span className="text-indigo-400 font-bold">{time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit' })}</span>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors relative">
            <BellRing size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row relative z-10 h-[calc(100vh-73px)]">
        {/* Proactive AI Panel */}
        <aside className="w-full md:w-96 border-l border-slate-800/60 bg-slate-900/30 backdrop-blur-sm p-6 overflow-y-auto hidden md:flex flex-col gap-6 custom-scrollbar">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <BrainCircuit className="text-indigo-400" size={16} />
              الذكاء الاستباقي
            </h2>
            <span className="text-[10px] uppercase font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">Active</span>
          </div>

          <div className="flex flex-col gap-4">
            <motion.div initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
              <div className="absolute top-0 right-0 w-1 h-full bg-red-500"></div>
              <div className="flex items-start gap-3 mb-2">
                <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={18} />
                <h3 className="font-bold text-white text-sm">مؤشر تسرب محتمل</h3>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-3">
                تغيب الطالب "سالم عبدالله" لليوم الثالث. لوحظ انخفاض في التفاعل بنسبة 40% الأسبوع الماضي.
              </p>
              <button className="text-xs bg-slate-700/50 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg w-full flex items-center justify-center gap-1 transition-colors">
                فتح ملف الطالب <ChevronLeft size={14} />
              </button>
            </motion.div>

            <motion.div initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} transition={{delay: 0.1}} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
              <div className="absolute top-0 right-0 w-1 h-full bg-emerald-500"></div>
              <div className="flex items-start gap-3 mb-2">
                <Sparkles className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                <h3 className="font-bold text-white text-sm">اقتراح مسار علاجي</h3>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-3">
                30% من الطلاب أخطأوا في سؤال "قوانين نيوتن". تم توليد نشاط تفاعلي مخصص لسد الفجوة.
              </p>
              <button onClick={() => onSelect('exams_section')} className="text-xs bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/20 px-3 py-1.5 rounded-lg w-full flex items-center justify-center gap-1 transition-colors">
                معاينة النشاط <ChevronLeft size={14} />
              </button>
            </motion.div>

            <motion.div initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} transition={{delay: 0.2}} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
              <div className="absolute top-0 right-0 w-1 h-full bg-blue-500"></div>
              <div className="flex items-start gap-3 mb-2">
                <Cpu className="text-blue-400 shrink-0 mt-0.5" size={18} />
                <h3 className="font-bold text-white text-sm">أتمتة السجلات</h3>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-3">
                تم الانتهاء من تصحيح 45 ورقة إجابة عبر OMR ورصدها تلقائياً في سجل الدرجات.
              </p>
              <button onClick={() => onSelect('grades_section')} className="text-xs bg-slate-700/50 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg w-full flex items-center justify-center gap-1 transition-colors">
                عرض سجل الدرجات <ChevronLeft size={14} />
              </button>
            </motion.div>
          </div>
        </aside>

        {/* Core Apps Grid */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="w-1 h-6 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
              تطبيقات النظام (Zero-Paper Workspace)
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {sections.map((section, index) => {
                const Icon = iconMap[section.icon];
                const isAI = ['ai_section', 'exams_section', 'smart_correction'].includes(section.id);
                
                return (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => onSelect(section.id)}
                    className="group relative bg-slate-800/40 hover:bg-slate-800 p-5 rounded-3xl border border-slate-700/50 hover:border-indigo-500/50 transition-all text-center flex flex-col items-center gap-4 cursor-pointer overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    {isAI && (
                      <div className="absolute top-3 right-3 text-indigo-400 animate-pulse">
                        <Sparkles size={14} />
                      </div>
                    )}
                    
                    <div className={`p-4 rounded-2xl ${section.color} text-white shadow-lg group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 relative z-10`}>
                      <Icon size={26} strokeWidth={1.5} />
                    </div>
                    
                    <div className="relative z-10">
                      <h3 className="font-bold text-slate-200 text-sm mb-1">{section.title}</h3>
                      <p className="text-slate-500 text-[11px] leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
INNER_EOF
