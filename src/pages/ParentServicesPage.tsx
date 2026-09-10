import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  GraduationCap, 
  Calendar, 
  CheckSquare, 
  FileSignature, 
  ShieldAlert, 
  Sparkles, 
  Bell, 
  Mail, 
  MessageSquare, 
  Bus, 
  CreditCard, 
  ArrowRight, 
  Search, 
  ChevronLeft,
  ChevronDown
} from 'lucide-react';

interface ChildStudent {
  id: string;
  name: string;
  grade: string;
  section: string;
  gpa: number;
  attendance: number;
}

const CHILDREN: ChildStudent[] = [
  { id: '1', name: 'إبراهيم عبدالله عوض الجوفي', grade: 'الصف السابع', section: 'شعبة أ', gpa: 98.5, attendance: 99.2 },
  { id: '2', name: 'سارة عبدالله عوض الجوفي', grade: 'الصف الخامس', section: 'شعبة ب', gpa: 96.0, attendance: 97.5 },
];

export default function ParentServicesPage({ onSelect, onBack }: { onSelect: (route: string) => void, onBack?: () => void }) {
  const [selectedChild, setSelectedChild] = useState<ChildStudent>(CHILDREN[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    { id: 'attendance', title: 'متابعة الحضور والغياب', description: `تقارير الانضباط اليومية للطالب (${selectedChild.name})`, icon: UserCheck, route: 'attendance_section', stat: `${selectedChild.attendance}% نسبة الحضور` },
    { id: 'grades', title: 'كشف النتائج والدرجات', description: 'عرض كشوف درجات المنتصف والنهائي واختبارات القواسم', icon: GraduationCap, route: 'grades_section', stat: `${selectedChild.gpa}% المعدل التراكمي` },
    { id: 'timetable', title: 'جدول الحصص الدراسي', description: 'متابعة المواد والحصص المقررة يومياً', icon: Calendar, route: 'timetables_section', stat: '7 حصص اليوم' },
    { id: 'homework', title: 'الواجبات والاختبارات', description: 'الاطلاع على التكليفات المنزلية ومواعيد الاختبارات الفترية', icon: CheckSquare, route: 'plans_section', stat: '3 واجبات معلقة' },
    { id: 'violations', title: 'سجل السلوك والمواظبة', description: 'متابعة الملاحظات الإيجابية أو المخالفات وتوجيهات المرشد الطلابي', icon: ShieldAlert, route: 'students_page' },
    { id: 'rewards', title: 'المكافآت والأوسمة', description: 'لوحة الأوسمة والشارات الممنوحة للطالب من المدرسة', icon: Sparkles, route: 'badges' },
    { id: 'memos', title: 'التعاميم والرسائل', description: 'الرسائل والإخطارات الرسمية المرسلة من إدارة المدرسة', icon: Mail, route: 'official_memos', badge: 'جديد' },
    { id: 'bus', title: 'تتبع حافلة النقل', description: 'تتبع مسار الحافلة المدرسية ومواعيد وصول الابن', icon: Bus, route: 'students_page' },
    { id: 'payments', title: 'السداد الإلكتروني والرسوم', description: 'تتبع الرسوم المدرسية كشوف الأقساط والفواتير المسددة', icon: CreditCard, route: 'print_export', stat: 'مسدد بالكامل' },
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
          <div className="w-12 h-12 rounded-2xl bg-[#004B6E] text-amber-300 flex items-center justify-center font-black text-xl shadow-md">
            👨‍👩‍👧‍👦
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">بوابة خدمات ولي الأمر</h1>
            <p className="text-xs font-bold text-slate-500 mt-1">متابعة الأبناء، الحضور والغياب، الدرجات والتواصل مع المدرسة</p>
          </div>
        </div>

        {/* Child Selector */}
        <div className="flex items-center gap-3 bg-sky-50 p-2 rounded-2xl border border-sky-100">
          <span className="text-xs font-black text-[#004B6E] px-2">اختر الطالب:</span>
          <div className="flex items-center gap-1.5">
            {CHILDREN.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  selectedChild.id === child.id 
                    ? 'bg-[#004B6E] text-white shadow-sm' 
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {child.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Child Info Banner */}
      <div className="bg-[#004B6E] text-white rounded-3xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 text-sky-300 border border-white/20 flex items-center justify-center font-black text-2xl">
            {selectedChild.name.charAt(0)}
          </div>
          <div>
            <span className="text-[10px] font-bold text-sky-200 bg-sky-400/20 px-2.5 py-0.5 rounded-full border border-sky-300/30">
              الملف الحالي المتابع
            </span>
            <h2 className="text-xl font-black mt-1">{selectedChild.name}</h2>
            <p className="text-xs text-sky-100 font-bold mt-0.5">{selectedChild.grade} - {selectedChild.section}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 border-t md:border-t-0 md:border-r border-white/10 pt-4 md:pt-0 md:pr-6 text-xs">
          <div>
            <p className="text-sky-200 font-bold text-[10px]">نسبة الحضور</p>
            <p className="text-xl font-black text-emerald-300">{selectedChild.attendance}%</p>
          </div>
          <div className="h-8 w-px bg-white/20"></div>
          <div>
            <p className="text-sky-200 font-bold text-[10px]">المعدل العام</p>
            <p className="text-xl font-black text-amber-300">{selectedChild.gpa}%</p>
          </div>
        </div>
      </div>

      {/* Parent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => onSelect(card.route)}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 hover:border-sky-300 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#004B6E] flex items-center justify-center font-black shrink-0 group-hover:scale-105 transition-transform">
                    <Icon size={22} />
                  </div>
                  {card.badge && (
                    <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full text-[10px] font-black">
                      {card.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-black text-slate-900 text-sm group-hover:text-[#004B6E] transition-colors mb-1.5">
                  {card.title}
                </h3>
                <p className="text-slate-500 font-bold text-xs leading-relaxed mb-4">
                  {card.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-black text-slate-800 text-xs">{card.stat || 'انتقال'}</span>
                <div className="w-8 h-8 rounded-xl bg-slate-50 group-hover:bg-[#004B6E] group-hover:text-white text-slate-500 flex items-center justify-center transition-all">
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
