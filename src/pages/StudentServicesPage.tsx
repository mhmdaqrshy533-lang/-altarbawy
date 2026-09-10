import React, { useState } from 'react';
import { 
  Calendar, 
  Video, 
  CheckSquare, 
  UserCheck, 
  BookOpen, 
  FileSignature, 
  GraduationCap, 
  TrendingUp, 
  BookMarked, 
  Bot, 
  Sparkles, 
  Award, 
  Mail, 
  MessageSquare, 
  Search, 
  ArrowRight, 
  ChevronLeft 
} from 'lucide-react';

interface StudentCard {
  id: string;
  title: string;
  description: string;
  icon: any;
  route: string;
  badge?: string;
  stat?: string;
  highlight?: boolean;
}

export default function StudentServicesPage({ onSelect, onBack }: { onSelect: (route: string) => void, onBack?: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  const services: StudentCard[] = [
    { id: 'timetable', title: 'الجدول الدراسي اليومي', description: 'جدول الحصص والتوقيت الزمني لكل مادة مع القاعات', icon: Calendar, route: 'timetables_section', badge: 'اليوم', stat: '7 حصص' },
    { id: 'virtual_class', title: 'الفصول الافتراضية', description: 'البث المباشر للحصص والدروس التفاعلية مع المعلمين', icon: Video, route: 'analytical_dashboard', stat: 'مباشر الآن' },
    { id: 'homework', title: 'الواجبات والأنشطة', description: 'تسليم الواجبات اليومية ومتابعة تقييم المعلم', icon: CheckSquare, route: 'plans_section', badge: '3 معلقة', stat: 'تسليم قبل 9 مساءً' },
    { id: 'attendance', title: 'سجل الحضور والغياب', description: 'نسبة الانضباط وسجل الأيام الدراسية المستوفاة', icon: UserCheck, route: 'attendance_section', stat: '98.5% نسبة الانضباط' },
    { id: 'plans', title: 'الخطط الدراسية والمناهج', description: 'تأدية وتحضير الدروس والوحدات التعليمية', icon: BookOpen, route: 'plans_section' },
    { id: 'exams', title: 'الاختبارات والتطبيق', description: 'مواعيد الاختبارات الفترية وإرشادات الأداء', icon: FileSignature, route: 'exams_section', badge: 'قادم', stat: 'اختبار الرياضيات' },
    { id: 'grades', title: 'كشف النتائج والدرجات', description: 'عرض تفصيلي لدرجات الشهر، المنتصف، والمجموع', icon: GraduationCap, route: 'grades_section', stat: 'المعدل: 98.2%' },
    { id: 'performance', title: 'تحليل أداء الطالب', description: 'مخططات بيانية لمستوى التقدم التراكمي في المواد', icon: TrendingUp, route: 'analytical_dashboard' },
    { id: 'resources', title: 'المكتبة الرقمية والمقررات', description: 'تنزيل الملازم، الكتب الإلكترونية، والمراجع', icon: BookMarked, route: 'books_section', stat: '142 كتاباً' },
    { id: 'ai_assistant', title: 'SharEdu AI المساعد الذكي', description: 'مساعد ذكي لشرح المفاهيم وتلخيص الدروس وتجاوز الصعوبات', icon: Bot, route: 'ai_section', badge: 'ذكاء اصطناعي', highlight: true },
    { id: 'rewards', title: 'لوحة الأوسمة والمكافآت', description: 'الأوسمة والشارات التقديرية الممنوحة من المدرسة', icon: Sparkles, route: 'badges', badge: 'مميز', stat: '12 وساماً' },
    { id: 'memos', title: 'التعاميم والتنبيهات', description: 'إشعارات الإدارة والأنشطة الطلابية المدرسية', icon: Mail, route: 'official_memos' },
  ];

  const filteredServices = services.filter(s => 
    searchQuery.trim() === '' || 
    s.title.includes(searchQuery) || 
    s.description.includes(searchQuery)
  );

  return (
    <div className="p-4 md:p-8 space-y-8 font-sans bg-slate-50 min-h-full" dir="rtl">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-4">
          {onBack && (
            <button onClick={onBack} className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all">
              <ArrowRight size={20} />
            </button>
          )}
          <div className="w-12 h-12 rounded-2xl bg-[#004B6E] text-sky-200 flex items-center justify-center font-black text-xl shadow-md">
            🎓
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">بوابة خدمات الطالب</h1>
            <p className="text-xs font-bold text-slate-500 mt-1">متابعة الواجبات، الحصص الافتراضية، الاختبارات، والنتائج الأكاديمية</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث في خدمات الطالب..."
            className="w-full pr-10 pl-4 py-2.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-200"
          />
        </div>
      </div>

      {/* Grid of Student Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredServices.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => onSelect(card.route)}
              className={`rounded-3xl p-5 border shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group ${
                card.highlight 
                  ? 'bg-gradient-to-br from-sky-900 to-[#004B6E] text-white border-sky-700' 
                  : 'bg-white border-slate-200/80 hover:border-sky-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black shrink-0 group-hover:scale-105 transition-transform ${
                    card.highlight ? 'bg-sky-400/20 text-sky-300' : 'bg-sky-50 text-[#004B6E]'
                  }`}>
                    <Icon size={22} />
                  </div>
                  {card.badge && (
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                      card.highlight ? 'bg-sky-400/20 text-sky-200 border border-sky-400/30' : 'bg-sky-50 text-[#004B6E] border border-sky-200'
                    }`}>
                      {card.badge}
                    </span>
                  )}
                </div>

                <h3 className={`font-black text-sm mb-1.5 ${card.highlight ? 'text-white' : 'text-slate-900 group-hover:text-[#004B6E] transition-colors'}`}>
                  {card.title}
                </h3>
                <p className={`font-bold text-xs leading-relaxed mb-4 ${card.highlight ? 'text-sky-100/80' : 'text-slate-500'}`}>
                  {card.description}
                </p>
              </div>

              <div className={`pt-3 border-t flex items-center justify-between text-xs ${
                card.highlight ? 'border-sky-800 text-sky-200' : 'border-slate-100 text-slate-700'
              }`}>
                <span className="font-black text-xs">{card.stat || 'انتقال'}</span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                  card.highlight ? 'bg-sky-800 text-white' : 'bg-slate-50 group-hover:bg-[#004B6E] group-hover:text-white text-slate-500'
                }`}>
                  <ChevronLeft size={16} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
