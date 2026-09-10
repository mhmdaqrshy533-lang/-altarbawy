import React, { useState } from 'react';
import { 
  UserCheck, 
  Calendar, 
  BookOpen, 
  CheckSquare, 
  FileSignature, 
  GraduationCap, 
  FileSpreadsheet, 
  Mail, 
  Users2, 
  BarChart3, 
  ShieldAlert, 
  Users, 
  Bus, 
  Award, 
  Sparkles,
  ArrowRight,
  Search,
  Plus,
  ChevronLeft
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: any;
  route: string;
  badge?: string;
  stat?: string;
}

interface ServiceGroup {
  category: string;
  description: string;
  items: ServiceItem[];
}

export default function TeacherServicesPage({ onSelect, onBack }: { onSelect: (route: string) => void, onBack?: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  const groups: ServiceGroup[] = [
    {
      category: 'المتابعة اليومية',
      description: 'إدارة الجدول اليومي، تسجيل الحضور، والتحضير للدروس',
      items: [
        { id: 'attendance', title: 'الحضور والغياب', description: 'رصد حضور وغياب الطلاب اليومي مع الأعذار', icon: UserCheck, route: 'attendance_section', badge: 'يومي', stat: '98.5%' },
        { id: 'timetable', title: 'جدول الحصص', description: 'جدول الحصص الأسبوعي وتوزيع القاعات', icon: Calendar, route: 'timetables_section', stat: '7 حصص اليوم' },
        { id: 'preparation', title: 'التحضير والخطط', description: 'إعداد وتحضير الدروس والخطط الفترية', icon: BookOpen, route: 'plans_section', badge: 'مكتمل' },
        { id: 'tasks', title: 'المهام اليومية', description: 'قائمة مهام ومتابعات المعلم اليومية', icon: CheckSquare, route: 'plans_section', stat: '4 مهام' },
      ]
    },
    {
      category: 'التقييم والاختبارات',
      description: 'إعداد الاختبارات، رصد الدرجات، وإدارة الواجبات',
      items: [
        { id: 'exams', title: 'الاختبارات وبنك الأسئلة', description: 'إنشاء الاختبارات وتوزيع الأسئلة من البنك', icon: FileSignature, route: 'exams_section', badge: '12 اختبار' },
        { id: 'grades', title: 'رصد الدرجات', description: 'إدخال ورصد درجات أعمال السنة والاختبارات', icon: GraduationCap, route: 'grades_section', stat: '98.2%' },
        { id: 'grade_sheet', title: 'كشف الدرجات الرسمية', description: 'توليد واستخراج كشوف الدرجات المعتمدة', icon: FileSpreadsheet, route: 'grades_section' },
        { id: 'homework', title: 'إدارة الواجبات', description: 'إسناد وتصحيح الواجبات والأنشطة المنزلية', icon: CheckSquare, route: 'plans_section', stat: '24 واجباً' },
      ]
    },
    {
      category: 'العمليات والتواصل الإداري',
      description: 'التعاميم، الرسائل مع أولياء الأمور، والتقارير',
      items: [
        { id: 'memos', title: 'التعاميم المعتمدة', description: 'الاطلاع على تعاميم الإدارة والوزارة', icon: Mail, route: 'official_memos', badge: 'جديد' },
        { id: 'mail', title: 'البريد والمراسلات', description: 'التواصل المباشر مع أولياء الأمور والإدارة', icon: Mail, route: 'official_memos' },
        { id: 'meetings', title: 'الاجتماعات والمحاضر', description: 'مواعيد وتوثيق جلسات مجالس المواد والآباء', icon: Users2, route: 'official_memos' },
        { id: 'reports', title: 'التقارير والإحصائيات', description: 'تقارير أداء الفصول والنسب العامة', icon: BarChart3, route: 'analytical_dashboard' },
      ]
    },
    {
      category: 'شؤون الطلاب والسلوك',
      description: 'سجلات الطلاب، المواظبة، والمكافآت',
      items: [
        { id: 'students', title: 'إدارة الطلاب', description: 'قائمة وقواعد بيانات طلاب الفصول المسندة', icon: Users, route: 'students_page', stat: '142 طالباً' },
        { id: 'violations', title: 'المخالفات والمواظبة', description: 'تسجيل الملاحظات السلوكية ولائحة المواظبة', icon: ShieldAlert, route: 'students_page' },
        { id: 'bus', title: 'متابعة الحافلات', description: 'استعلام خطوط النقل وركوب الطلاب', icon: Bus, route: 'students_page' },
        { id: 'badges', title: 'الأوسمة والمكافآت', description: 'منح أوسمة التميز والشارات للطلاب المتفوقين', icon: Award, route: 'badges' },
      ]
    }
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 font-sans bg-slate-50 min-h-full" dir="rtl">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-4">
          {onBack && (
            <button onClick={onBack} className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all">
              <ArrowRight size={20} />
            </button>
          )}
          <div className="w-12 h-12 rounded-2xl bg-[#004B6E] text-[#38BDF8] flex items-center justify-center font-black text-xl shadow-md">
            👨‍🏫
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">بوابة خدمات المعلم</h1>
            <p className="text-xs font-bold text-slate-500 mt-1">منصة أدوات ومتابعة الأداء الأكاديمي والحضور للطلاب</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث في خدمات المعلم..."
            className="w-full pr-10 pl-4 py-2.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-200"
          />
        </div>
      </div>

      {/* Service Groups */}
      <div className="space-y-8">
        {groups.map((group, gIdx) => {
          const filteredItems = group.items.filter(item => 
            searchQuery.trim() === '' || 
            item.title.includes(searchQuery) || 
            item.description.includes(searchQuery)
          );

          if (filteredItems.length === 0) return null;

          return (
            <div key={gIdx} className="space-y-4">
              <div className="border-b border-slate-200/80 pb-2">
                <h2 className="text-lg font-black text-[#004B6E]">{group.category}</h2>
                <p className="text-xs font-bold text-slate-400">{group.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => onSelect(item.route)}
                      className="bg-white rounded-3xl p-5 border border-slate-200/80 hover:border-sky-300 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#004B6E] flex items-center justify-center font-black group-hover:scale-105 transition-transform">
                            <Icon size={20} />
                          </div>
                          {item.badge && (
                            <span className="bg-sky-50 text-[#004B6E] border border-sky-200 px-2.5 py-0.5 rounded-full text-[10px] font-black">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <h3 className="font-black text-slate-900 text-sm group-hover:text-[#004B6E] transition-colors mb-1">
                          {item.title}
                        </h3>
                        <p className="text-slate-500 font-bold text-xs leading-relaxed mb-4">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="font-black text-slate-700 text-xs">{item.stat || 'انتقال للخدمة'}</span>
                        <div className="w-7 h-7 rounded-xl bg-slate-50 group-hover:bg-[#004B6E] group-hover:text-white text-slate-500 flex items-center justify-center transition-all">
                          <ChevronLeft size={16} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
