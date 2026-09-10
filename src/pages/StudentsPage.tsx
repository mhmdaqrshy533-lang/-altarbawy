import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle2, 
  Clock, 
  GraduationCap, 
  MoreVertical, 
  FileDown, 
  ShieldCheck, 
  BookOpen,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  attendanceRate: number;
  gpa: number;
  status: 'active' | 'warning' | 'absent';
  parentPhone: string;
  nationalId: string;
}

const INITIAL_STUDENTS: Student[] = [
  { id: '101', name: 'إبراهيم عبدالله عوض الجوفي', grade: 'الصف السابع', section: 'شعبة أ', attendanceRate: 99.2, gpa: 98.5, status: 'active', parentPhone: '0501234567', nationalId: '1098234711' },
  { id: '102', name: 'أحمد علي أحمد العارمي', grade: 'الصف السابع', section: 'شعبة ب', attendanceRate: 88.0, gpa: 84.2, status: 'warning', parentPhone: '0502345678', nationalId: '1098234712' },
  { id: '103', name: 'أمير الخضر حسين الدهبلي', grade: 'الصف الثامن', section: 'شعبة أ', attendanceRate: 96.5, gpa: 92.0, status: 'active', parentPhone: '0503456789', nationalId: '1098234713' },
  { id: '104', name: 'باسم محمد سالم الشهري', grade: 'الصف الثامن', section: 'شعبة ب', attendanceRate: 94.0, gpa: 90.5, status: 'active', parentPhone: '0504567890', nationalId: '1098234714' },
  { id: '105', name: 'جلال أحمد العزي الزهراني', grade: 'الصف التاسع', section: 'شعبة أ', attendanceRate: 78.5, gpa: 72.0, status: 'absent', parentPhone: '0505678901', nationalId: '1098234715' },
  { id: '106', name: 'حسن خالد العتيبي', grade: 'الصف التاسع', section: 'شعبة ب', attendanceRate: 98.0, gpa: 95.8, status: 'active', parentPhone: '0506789012', nationalId: '1098234716' },
  { id: '107', name: 'حمزة عمر المطيري', grade: 'الصف السابع', section: 'شعبة أ', attendanceRate: 97.0, gpa: 93.4, status: 'active', parentPhone: '0507890123', nationalId: '1098234717' },
];

export default function StudentsPage({ onBack }: { onBack?: () => void }) {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.includes(searchQuery) || student.nationalId.includes(searchQuery) || student.parentPhone.includes(searchQuery);
    const matchesGrade = selectedGrade === 'all' || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
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
            <Users size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">سجل وسجل إدارة الطلاب</h1>
            <p className="text-xs font-bold text-slate-500 mt-1">متابعة شؤون 1,248 طالب، نسب الحضور، والمعدلات الأكاديمية</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 rounded-2xl text-xs font-black transition-all">
            <FileDown size={16} />
            <span>تصدير Excel/PDF</span>
          </button>
          <button className="flex items-center gap-2 bg-[#004B6E] hover:bg-sky-800 text-white px-5 py-2.5 rounded-2xl text-xs font-black transition-all shadow-md">
            <Plus size={16} />
            <span>إضافة طالب جديد</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">إجمالي الطلاب المقيدين</p>
            <p className="text-2xl font-black text-[#004B6E] mt-1">1,248</p>
            <p className="text-[10px] font-bold text-emerald-600 mt-1">↑ 12 طالب جديد هذا الشهر</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#004B6E] flex items-center justify-center font-bold">
            <Users size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">متوسط الانضباط والحضور</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">96.8%</p>
            <p className="text-[10px] font-bold text-emerald-600 mt-1">ممتاز (مستوى مرتفع)</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">المعدل العام التراكمي</p>
            <p className="text-2xl font-black text-amber-600 mt-1">89.4%</p>
            <p className="text-[10px] font-bold text-slate-400 mt-1">بناءً على 12 اختباراً</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <GraduationCap size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">حالات تحتاج متابعة</p>
            <p className="text-2xl font-black text-rose-600 mt-1">14</p>
            <p className="text-[10px] font-bold text-rose-500 mt-1">غياب متكرر / انخفاض درجة</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <XCircle size={22} />
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
            placeholder="البحث باسم الطالب، الهوية الوطنية، أو رقم ولي الأمر..."
            className="w-full pr-12 pl-4 py-3 bg-slate-50 rounded-2xl border border-slate-200/80 font-bold text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-200"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-2xl border border-slate-200/80 text-xs font-bold">
            <Filter size={16} className="text-slate-500" />
            <select 
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="bg-transparent border-none outline-none font-bold text-slate-800"
            >
              <option value="all">جميع الصفوف الدراسية</option>
              <option value="الصف السابع">الصف السابع</option>
              <option value="الصف الثامن">الصف الثامن</option>
              <option value="الصف التاسع">الصف التاسع</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-black">
                <th className="py-4 px-6">اسم الطالب</th>
                <th className="py-4 px-4">الصف والشعبة</th>
                <th className="py-4 px-4">رقم الهوية</th>
                <th className="py-4 px-4">نسبة الحضور</th>
                <th className="py-4 px-4">المعدل</th>
                <th className="py-4 px-4">الحالة</th>
                <th className="py-4 px-4">ولي الأمر</th>
                <th className="py-4 px-6 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-bold">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-sky-50/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#004B6E]/10 text-[#004B6E] font-black flex items-center justify-center text-sm shrink-0">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-sm">{student.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold">رقم قيد: #{student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-xl text-[11px] font-black">
                      {student.grade} - {student.section}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-600 font-mono">{student.nationalId}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${student.attendanceRate > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                          style={{ width: `${student.attendanceRate}%` }}
                        />
                      </div>
                      <span className="font-black text-slate-800">{student.attendanceRate}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-black text-[#004B6E] text-sm">{student.gpa}%</span>
                  </td>
                  <td className="py-4 px-4">
                    {student.status === 'active' && (
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-[10px] font-black">
                        منتظم
                      </span>
                    )}
                    {student.status === 'warning' && (
                      <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full text-[10px] font-black">
                        إنذار غياب
                      </span>
                    )}
                    {student.status === 'absent' && (
                      <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-full text-[10px] font-black">
                        منقطع / غائب
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5 text-slate-600 font-mono text-[11px]">
                      <Phone size={12} className="text-slate-400" />
                      <span>{student.parentPhone}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button 
                        onClick={() => setSelectedStudent(student)}
                        className="p-2 rounded-xl hover:bg-sky-100 text-sky-700 transition-colors" 
                        title="عرض الملف"
                      >
                        <Eye size={16} />
                      </button>
                      <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors" title="تعديل">
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Detail Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#004B6E] text-white flex items-center justify-center font-black text-xl">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-slate-900">{selectedStudent.name}</h3>
                    <p className="text-xs font-bold text-slate-500">{selectedStudent.grade} - {selectedStudent.section}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-400"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-bold">
                <div className="p-3 bg-slate-50 rounded-2xl">
                  <p className="text-slate-400 mb-1">الهوية الوطنية</p>
                  <p className="text-slate-800 font-mono text-sm">{selectedStudent.nationalId}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl">
                  <p className="text-slate-400 mb-1">هاتف ولي الأمر</p>
                  <p className="text-slate-800 font-mono text-sm">{selectedStudent.parentPhone}</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-2xl">
                  <p className="text-emerald-700 mb-1">نسبة الانضباط</p>
                  <p className="text-emerald-900 text-lg font-black">{selectedStudent.attendanceRate}%</p>
                </div>
                <div className="p-3 bg-sky-50 rounded-2xl">
                  <p className="text-sky-700 mb-1">المعدل الأكاديمي</p>
                  <p className="text-sky-900 text-lg font-black">{selectedStudent.gpa}%</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl text-xs font-black"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
