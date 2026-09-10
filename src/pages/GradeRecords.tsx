import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  FileSpreadsheet, 
  Printer, 
  Download, 
  Settings, 
  Palette,
  Users,
  CheckCircle2,
  Edit3,
  X,
  Calculator
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GradeRecordsProps {
  onBack: () => void;
}

const THEMES = [
  { id: 'modern', name: 'عصري (Modern)', color: 'bg-violet-600', preview: 'bg-slate-50 border-slate-200' },
  { id: 'classic', name: 'كلاسيكي (Classic)', color: 'bg-slate-800', preview: 'bg-white border-black' },
  { id: 'minimal', name: 'بسيط (Minimal)', color: 'bg-teal-600', preview: 'bg-teal-50/30 border-teal-100' },
];

const CLASSES = [
  'الصف الأول الإبتدائي',
  'الصف الثاني الإبتدائي',
  'الصف الثالث الإبتدائي',
  'الصف الرابع الإبتدائي',
  'الصف الخامس الإبتدائي',
  'الصف السادس الإبتدائي',
  'الصف الأول الإعدادي',
  'الصف الثاني الإعدادي',
  'الصف الثالث الإعدادي',
  'الصف الأول الثانوي',
  'الصف الثاني الثانوي',
  'الصف الثالث الثانوي',
];

const YEARS = ['2023-2024', '2024-2025', '2025-2026'];

// Dummy data for the preview
const INITIAL_STUDENTS = [
  { id: 1, name: 'أحمد محمد عبدالله', quran: 95, islamic: 98, arabic: 90, math: 85, science: 92, english: 88, total: 548 },
  { id: 2, name: 'فاطمة علي حسن', quran: 100, islamic: 95, arabic: 96, math: 99, science: 98, english: 94, total: 582 },
  { id: 3, name: 'عمر خالد سعد', quran: 88, islamic: 90, arabic: 85, math: 75, science: 80, english: 82, total: 500 },
  { id: 4, name: 'مريم سعيد يوسف', quran: 92, islamic: 94, arabic: 98, math: 90, science: 95, english: 96, total: 565 },
  { id: 5, name: 'ياسر وليد أحمد', quran: 85, islamic: 88, arabic: 82, math: 95, science: 89, english: 90, total: 529 },
];

export default function GradeRecords({ onBack }: GradeRecordsProps) {
  const [selectedClass, setSelectedClass] = useState(CLASSES[0]);
  const [selectedYear, setSelectedYear] = useState(YEARS[1]);
  const [selectedTheme, setSelectedTheme] = useState('modern');
  
  // Offline-first: Load from local storage or use initial data
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('gradeRecords');
    if (saved) return JSON.parse(saved);
    return INITIAL_STUDENTS;
  });

  // Save to local storage automatically
  useEffect(() => {
    localStorage.setItem('gradeRecords', JSON.stringify(students));
  }, [students]);

  // Edit State
  const [editingStudent, setEditingStudent] = useState<{ id: number, field: string, value: string } | null>(null);

  const activeTheme = THEMES.find(t => t.id === selectedTheme) || THEMES[0];

  // Yemeni Grading System (90-100: Excellent, 80-89: Very Good, 65-79: Good, 50-64: Acceptable, <50: Weak)
  const getGradeData = (total: number) => {
    const percentage = Math.round((total / 600) * 100);
    if (percentage >= 90) return { text: 'ممتاز', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (percentage >= 80) return { text: 'جيد جداً', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    if (percentage >= 65) return { text: 'جيد', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    if (percentage >= 50) return { text: 'مقبول', color: 'text-orange-700 bg-orange-50 border-orange-200' };
    return { text: 'ضعيف', color: 'text-red-700 bg-red-50 border-red-200' };
  };

  // Sort students by total score for ranking
  const rankedStudents = [...students].sort((a, b) => b.total - a.total).map((s, index) => ({
    ...s,
    rank: index + 1
  }));

  const handleCellClick = (studentId: number, field: string) => {
    if (field === 'total' || field === 'id') return; // Cannot edit total directly
    const student = students.find(s => s.id === studentId);
    if (!student) return;
    setEditingStudent({ 
      id: studentId, 
      field, 
      value: String(student[field as keyof typeof student]) 
    });
  };

  const saveEdit = () => {
    if (!editingStudent) return;
    
    setStudents(prev => {
      const newStudents = prev.map(s => {
        if (s.id === editingStudent.id) {
          const updatedStudent = { ...s };
          
          if (editingStudent.field === 'name') {
            updatedStudent.name = editingStudent.value;
          } else {
            // Update grade
            const numValue = parseInt(editingStudent.value, 10) || 0;
            (updatedStudent as any)[editingStudent.field] = Math.min(100, Math.max(0, numValue));
            
            // Recalculate total immediately
            updatedStudent.total = 
              updatedStudent.quran + 
              updatedStudent.islamic + 
              updatedStudent.arabic + 
              updatedStudent.math + 
              updatedStudent.science + 
              updatedStudent.english;
          }
          
          return updatedStudent;
        }
        return s;
      });
      return newStudents;
    });
    
    setEditingStudent(null);
  };

  const getSubjectName = (field: string) => {
    const map: Record<string, string> = {
      name: 'اسم الطالب',
      quran: 'القرآن الكريم',
      islamic: 'التربية الإسلامية',
      arabic: 'اللغة العربية',
      math: 'الرياضيات',
      science: 'العلوم',
      english: 'اللغة الإنجليزية'
    };
    return map[field] || field;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans" dir="rtl">
      <style>
        {`
          @media print {
            body * { visibility: hidden; }
            .print-area, .print-area * { visibility: visible; }
            .print-area { position: absolute; left: 0; top: 0; width: 100%; background: white; margin: 0; padding: 20px; }
            .no-print { display: none !important; }
          }
        `}
      </style>

      {/* Interactive Edit Dialog */}
      <AnimatePresence>
        {editingStudent && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            className="fixed top-24 left-6 z-50 no-print"
          >
            <div className="bg-white rounded-3xl p-6 w-80 shadow-2xl border border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                  <Edit3 size={20} className="text-violet-500" />
                  تعديل {getSubjectName(editingStudent.field)}
                </h3>
                <button onClick={() => setEditingStudent(null)} className="text-slate-400 hover:text-slate-600 bg-slate-100 p-2 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">القيمة الجديدة</label>
                  <input 
                    type={editingStudent.field === 'name' ? 'text' : 'number'} 
                    value={editingStudent.value}
                    onChange={(e) => setEditingStudent({ ...editingStudent, value: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-slate-800 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-center text-lg"
                    min="0"
                    max="100"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={saveEdit}
                  className="flex-1 bg-violet-600 text-white font-bold py-3 rounded-xl hover:bg-violet-700 transition-colors shadow-lg shadow-violet-600/20"
                >
                  حفظ
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 no-print">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
          >
            <ArrowRight size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <FileSpreadsheet className="text-teal-600" size={24} />
              كشوفات الدرجات (المتعددة الثيمات)
            </h1>
            <p className="text-sm text-slate-500">إنشاء وتصدير كشوفات درجات احترافية</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-medium hover:bg-slate-50 transition-colors">
            <Settings size={18} />
            إعدادات متقدمة
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-violet-700 transition-colors shadow-md"
          >
            <Printer size={18} />
            طباعة الكشف
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 flex gap-6 max-w-7xl mx-auto w-full">
        {/* Sidebar Controls */}
        <div className="w-80 flex-shrink-0 flex flex-col gap-6">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Users size={18} className="text-violet-500" />
              بيانات الكشف
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">الصف الدراسي</label>
                <select 
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  {CLASSES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">العام الدراسي</label>
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  {YEARS.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Palette size={18} className="text-rose-500" />
              مظهر الكشف (الثيم)
            </h2>
            
            <div className="grid grid-cols-1 gap-3">
              {THEMES.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`relative flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                    selectedTheme === theme.id 
                      ? 'border-violet-500 bg-violet-50' 
                      : 'border-slate-100 hover:border-slate-200 bg-white'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg ${theme.preview} border shadow-sm flex items-center justify-center`}>
                    <span className={`w-4 h-4 rounded-full ${theme.color}`} />
                  </div>
                  <span className={`font-medium ${selectedTheme === theme.id ? 'text-violet-700' : 'text-slate-700'}`}>
                    {theme.name}
                  </span>
                  {selectedTheme === theme.id && (
                    <CheckCircle2 className="absolute left-3 text-violet-500" size={18} />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <button className="w-full py-3 rounded-xl bg-slate-800 text-white font-bold flex justify-center items-center gap-2 hover:bg-slate-900 transition-colors shadow-lg shadow-slate-800/20">
            <Download size={18} />
            تصدير إلى Excel
          </button>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
            <h3 className="font-bold text-slate-700">معاينة حية للكشف</h3>
            <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-md font-medium">A4 Landscape</span>
          </div>
          
          <div className="flex-1 overflow-auto p-8 bg-slate-100 flex justify-center items-start print:p-0 print:bg-white">
            
            {/* The Document / Paper */}
            <div className={`relative w-[297mm] min-h-[210mm] bg-white shadow-xl rounded-sm p-12 transition-all duration-300 print:shadow-none print:w-full print:p-0
              ${selectedTheme === 'classic' ? 'font-serif border-4 border-double border-slate-800' : 'font-sans'}
              ${selectedTheme === 'minimal' ? 'bg-teal-50/10' : ''}
            `}>
              
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] no-print print:opacity-[0.05]">
                <h1 className="text-9xl font-black text-black transform -rotate-45 whitespace-nowrap">وزارة التربية والتعليم</h1>
              </div>
              
              {/* Document Header */}
              <div className={`flex justify-between items-center mb-8 pb-6 border-b-2 ${
                selectedTheme === 'classic' ? 'border-black' : selectedTheme === 'minimal' ? 'border-teal-200' : 'border-violet-100'
              }`}>
                <div className="text-center">
                  <h2 className="font-bold text-lg">الجمهورية اليمنية</h2>
                  <h3 className="font-semibold text-md">وزارة التربية والتعليم</h3>
                  <p className="text-sm">مدرسة النهضة الأهلية</p>
                </div>
                
                <div className="text-center">
                  <h1 className={`text-2xl font-black mb-2 ${
                    selectedTheme === 'modern' ? 'text-violet-700' : selectedTheme === 'minimal' ? 'text-teal-800' : 'text-black'
                  }`}>
                    كشف درجات الطلاب
                  </h1>
                  <p className="text-md font-bold bg-slate-100 px-4 py-1 rounded-full inline-block">
                    {selectedClass}
                  </p>
                </div>
                
                <div className="text-center">
                  <h2 className="font-bold text-lg">العام الدراسي</h2>
                  <h3 className="font-semibold text-md dir-ltr">{selectedYear}</h3>
                  <p className="text-sm">الفصل الدراسي الأول</p>
                </div>
              </div>

              {/* Document Table */}
              <table className={`w-full text-center border-collapse ${
                selectedTheme === 'classic' ? 'border-2 border-black' : ''
              }`}>
                <thead>
                  <tr className={`${
                    selectedTheme === 'modern' ? 'bg-violet-50 text-violet-900 border-b-2 border-violet-200' :
                    selectedTheme === 'classic' ? 'bg-slate-200 text-black border-b-2 border-black' :
                    'bg-teal-50 text-teal-900 border-b border-teal-200'
                  }`}>
                    <th className="py-3 px-2 border border-slate-300 w-12">م</th>
                    <th className="py-3 px-4 border border-slate-300 text-right w-56">اسم الطالب / الطالبة</th>
                    <th className="py-3 px-2 border border-slate-300">القرآن الكريم</th>
                    <th className="py-3 px-2 border border-slate-300">التربية الإسلامية</th>
                    <th className="py-3 px-2 border border-slate-300">اللغة العربية</th>
                    <th className="py-3 px-2 border border-slate-300">الرياضيات</th>
                    <th className="py-3 px-2 border border-slate-300">العلوم</th>
                    <th className="py-3 px-2 border border-slate-300">اللغة الإنجليزية</th>
                    <th className="py-3 px-2 border border-slate-300 font-bold">المجموع</th>
                    <th className="py-3 px-2 border border-slate-300 font-bold">التقدير</th>
                    <th className="py-3 px-2 border border-slate-300 font-bold">الترتيب</th>
                  </tr>
                </thead>
                <tbody>
                  {rankedStudents.map((student, i) => (
                    <tr key={student.id} className={`group ${
                      selectedTheme === 'modern' ? 'even:bg-slate-50 hover:bg-violet-50/50 border-b border-slate-200' :
                      selectedTheme === 'classic' ? 'hover:bg-slate-50 border-b border-black' :
                      'hover:bg-teal-50 border-b border-teal-100'
                    }`}>
                      <td className="py-3 px-2 border border-slate-300 font-medium text-slate-500">{i + 1}</td>
                      <td 
                        onClick={() => handleCellClick(student.id, 'name')}
                        className="py-3 px-4 border border-slate-300 text-right font-bold cursor-pointer hover:bg-black/5 transition-colors"
                      >
                        {student.name}
                      </td>
                      {['quran', 'islamic', 'arabic', 'math', 'science', 'english'].map(field => (
                        <td 
                          key={field}
                          onClick={() => handleCellClick(student.id, field)}
                          className="py-3 px-2 border border-slate-300 cursor-pointer hover:bg-black/5 transition-colors"
                        >
                          {(student as any)[field]}
                        </td>
                      ))}
                      <td className={`py-3 px-2 border border-slate-300 font-bold transition-all ${
                        selectedTheme === 'modern' ? 'text-violet-700 bg-violet-50/30' : ''
                      }`}>{student.total}</td>
                      <td className="py-3 px-2 border border-slate-300 font-bold">
                        <span className={`px-2 py-1 rounded border text-sm ${getGradeData(student.total).color}`}>
                          {getGradeData(student.total).text}
                        </span>
                      </td>
                      <td className="py-3 px-2 border border-slate-300 font-bold text-slate-700">
                        {student.rank === 1 ? 'الأول' : student.rank === 2 ? 'الثاني' : student.rank === 3 ? 'الثالث' : student.rank}
                      </td>
                    </tr>
                  ))}
                  {/* Empty rows for effect */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <tr key={`empty-${i}`} className={`${
                      selectedTheme === 'modern' ? 'even:bg-slate-50 border-b border-slate-200' :
                      selectedTheme === 'classic' ? 'border-b border-black' :
                      'border-b border-teal-100'
                    }`}>
                      <td className="py-3 px-2 border border-slate-300 text-transparent">0</td>
                      <td className="py-3 px-4 border border-slate-300"></td>
                      <td className="py-3 px-2 border border-slate-300"></td>
                      <td className="py-3 px-2 border border-slate-300"></td>
                      <td className="py-3 px-2 border border-slate-300"></td>
                      <td className="py-3 px-2 border border-slate-300"></td>
                      <td className="py-3 px-2 border border-slate-300"></td>
                      <td className="py-3 px-2 border border-slate-300"></td>
                      <td className="py-3 px-2 border border-slate-300"></td>
                      <td className="py-3 px-2 border border-slate-300"></td>
                      <td className="py-3 px-2 border border-slate-300"></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Document Footer */}
              <div className="mt-16 flex justify-between items-center px-12">
                <div className="text-center">
                  <p className="font-bold mb-8">مربي الصف</p>
                  <p className="text-slate-400 border-t border-slate-400 pt-2 px-8">التوقيع</p>
                </div>
                <div className="text-center">
                  <p className="font-bold mb-8">وكيل المدرسة</p>
                  <p className="text-slate-400 border-t border-slate-400 pt-2 px-8">التوقيع</p>
                </div>
                <div className="text-center">
                  <p className="font-bold mb-8">مدير المدرسة</p>
                  <p className="text-slate-400 border-t border-slate-400 pt-2 px-8">التوقيع والختم</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
