import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  Plus, 
  BookOpen, 
  Phone, 
  Mail, 
  Award, 
  Users, 
  ArrowRight,
  FileDown,
  CheckCircle2
} from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  department: string;
  subjects: string[];
  classes: string[];
  phone: string;
  email: string;
  experienceYears: number;
  status: 'active' | 'on_leave';
}

const INITIAL_TEACHERS: Teacher[] = [
  { id: '201', name: 'أ.د. محمد عبدالله القحطاني', department: 'العلوم الطبيعية', subjects: ['الفيزياء', 'الكيمياء'], classes: ['الصف التاسع (أ)', 'الصف التاسع (ب)'], phone: '0501112233', email: 'm.qahtani@school.edu', experienceYears: 12, status: 'active' },
  { id: '202', name: 'أ. خالد سليمان العمري', department: 'الرياضيات', subjects: ['الرياضيات العامة', 'الهندسة'], classes: ['الصف السابع (أ)', 'الصف الثامن (أ)'], phone: '0502223344', email: 'k.amri@school.edu', experienceYears: 8, status: 'active' },
  { id: '203', name: 'أ. فاطمة أحمد الزهراني', department: 'اللغة العربية', subjects: ['النحو والصرف', 'الأدب'], classes: ['الصف السابع (ب)', 'الصف التاسع (أ)'], phone: '0503334455', email: 'f.zahrani@school.edu', experienceYears: 10, status: 'active' },
  { id: '204', name: 'أ. عبدالمجيد علي الغامدي', department: 'الدراسات الإسلامية', subjects: ['التفسير', 'الفقه'], classes: ['جميع الصفوف'], phone: '0504445566', email: 'a.ghamdi@school.edu', experienceYears: 15, status: 'active' },
  { id: '205', name: 'أ. سارة حسن الشهري', department: 'اللغة الإنجليزية', subjects: ['English Core', 'Phonics'], classes: ['الصف الثامن (ب)'], phone: '0505556677', email: 's.shehri@school.edu', experienceYears: 6, status: 'on_leave' },
];

export default function TeachersPage({ onBack }: { onBack?: () => void }) {
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');

  const filteredTeachers = teachers.filter(t => {
    const matchesSearch = t.name.includes(searchQuery) || t.department.includes(searchQuery) || t.subjects.some(s => s.includes(searchQuery));
    const matchesDept = selectedDept === 'all' || t.department === selectedDept;
    return matchesSearch && matchesDept;
  });

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
          <div className="w-12 h-12 rounded-2xl bg-[#004B6E] text-sky-200 flex items-center justify-center font-black shadow-md">
            <Briefcase size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">سجل الكادر التعليمي والمعلمين</h1>
            <p className="text-xs font-bold text-slate-500 mt-1">إدارة 48 معلماً، التخصصات الدراسية، والأنصبة الأسبوعية</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#004B6E] hover:bg-sky-800 text-white px-5 py-2.5 rounded-2xl text-xs font-black transition-all shadow-md">
            <Plus size={16} />
            <span>إضافة معلم جديد</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">إجمالي الهيئة التعليمية</p>
            <p className="text-2xl font-black text-[#004B6E] mt-1">48 معلماً</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#004B6E] flex items-center justify-center font-bold">
            <Users size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">متوسط النصاب الأسبوعي</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">18 حصة</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <BookOpen size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">الأقسام التخصصية</p>
            <p className="text-2xl font-black text-amber-600 mt-1">8 أقسام</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Award size={22} />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 w-full relative">
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="البحث باسم المعلم، القسم، أو المادة الدراسية..."
            className="w-full pr-12 pl-4 py-3 bg-slate-50 rounded-2xl border border-slate-200/80 font-bold text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-200"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-2xl border border-slate-200/80 text-xs font-bold">
            <Filter size={16} className="text-slate-500" />
            <select 
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-transparent border-none outline-none font-bold text-slate-800"
            >
              <option value="all">جميع الأقسام الأكاديمية</option>
              <option value="العلوم الطبيعية">العلوم الطبيعية</option>
              <option value="الرياضيات">الرياضيات</option>
              <option value="اللغة العربية">اللغة العربية</option>
              <option value="الدراسات الإسلامية">الدراسات الإسلامية</option>
              <option value="اللغة الإنجليزية">اللغة الإنجليزية</option>
            </select>
          </div>
        </div>
      </div>

      {/* Teachers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#004B6E] text-[#38BDF8] flex items-center justify-center font-black text-lg">
                    {teacher.name.charAt(2) || 'أ'}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-sm leading-tight">{teacher.name}</h3>
                    <p className="text-[11px] font-bold text-sky-700 mt-0.5">{teacher.department}</p>
                  </div>
                </div>
                {teacher.status === 'active' ? (
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-black">
                    نشط
                  </span>
                ) : (
                  <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full text-[10px] font-black">
                    إجازة
                  </span>
                )}
              </div>

              <div className="space-y-2 py-3 border-y border-slate-100 text-xs font-bold">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">المواد المسندة:</span>
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.map((sub, i) => (
                      <span key={i} className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded-lg text-[10px]">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">الفصول المسندة:</span>
                  <span className="text-slate-800 text-[11px]">{teacher.classes.join('، ')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">سنوات الخبرة:</span>
                  <span className="text-slate-800 font-black">{teacher.experienceYears} سنوات</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-600">
              <div className="flex items-center gap-1">
                <Phone size={12} className="text-slate-400" />
                <span>{teacher.phone}</span>
              </div>
              <div className="flex items-center gap-1 text-[11px]">
                <Mail size={12} className="text-slate-400" />
                <span>{teacher.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
