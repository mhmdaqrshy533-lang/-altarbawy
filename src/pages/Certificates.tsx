import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Award,
  Printer,
  Palette,
  Edit3,
  X,
  RotateCcw,
  Check,
  FileText,
  User,
  Building,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import IjazahBukhariCert, { defaultIjazahBukhariData, IjazahBukhariData } from '../components/certificates/IjazahBukhariCert';
import TraditionalQuranCert, { defaultTraditionalQuranData, TraditionalQuranData } from '../components/certificates/TraditionalQuranCert';
import QuranAssociationCert, { defaultQuranAssociationData, QuranAssociationData } from '../components/certificates/QuranAssociationCert';
import QuranCompetitionCert, { defaultQuranCompetitionData, QuranCompetitionData } from '../components/certificates/QuranCompetitionCert';
import AcademicExcellenceCert, { defaultAcademicExcellenceData, AcademicExcellenceData } from '../components/certificates/AcademicExcellenceCert';
import UniversityDegreeCert, { defaultUniversityDegreeData, UniversityDegreeData } from '../components/certificates/UniversityDegreeCert';
import TopStudentsListCert, { defaultTopStudentsListData, TopStudentsListData } from '../components/certificates/TopStudentsListCert';
import GradeRecordSheet, { defaultGradeRecordData, GradeRecordData } from '../components/certificates/GradeRecordSheet';

const CERT_TEMPLATES = [
  {
    id: 'ijazah_bukhari',
    name: 'إجازة ثلاثيات الإمام البخاري',
    category: 'إجازة وسند شرعي',
    isPortrait: true,
    description: 'إجازة بسند متصل في ثلاثيات الإمام البخاري بخلفية وإطار إسلامي أزرق'
  },
  {
    id: 'traditional_quran',
    name: 'شهادة حفظ القرآن الكريم (الإطار التراثي)',
    category: 'شهادة حفظ وتحفيظ',
    isPortrait: false,
    description: 'شهادة حفظ القرآن الكريم بالإطار الذهبي والأزرق الزخرفي التراثي'
  },
  {
    id: 'quran_association',
    name: 'شهادة جمعية القراء (نهضة العلماء)',
    category: 'إجازة تحفيظ القرآن',
    isPortrait: true,
    description: 'شهادة إجازة وتحفيظ معتمدة بأسلوب كوفي مذهب وشعار جمعية القراء'
  },
  {
    id: 'quran_competition',
    name: 'شهادة شكر وتفوق قرآني (ورتّل)',
    category: 'مسابقات وشكر وتفوق',
    isPortrait: false,
    description: 'شهادة شكر فاخرة بمجسم المصحف الشريف والنافذة المحرابية وفوانيس ذهبية'
  },
  {
    id: 'academic_excellence',
    name: 'شهادة تفوق مدرسي (الوسام الذهبي)',
    category: 'تفوق وتخرج مدرسي',
    isPortrait: false,
    description: 'شهادة تفوق دراسي بميدالية ووسام ذهبي وقبعة تخرج وشريط هندسي'
  },
  {
    id: 'university_degree',
    name: 'شهادة اعتماد أكاديمي وجامعي',
    category: 'اعتماد جامعة ودورات',
    isPortrait: true,
    description: 'شهادة اجتياز دورة رسمية بإطار أمان جيلوش مذهب وشعار جامعة عين شمس'
  },
  {
    id: 'top_students_list',
    name: 'كشف أسماء أوائل الطلاب (وزاري)',
    category: 'كشوفات رسمية وأوائل',
    isPortrait: true,
    description: 'كشف وتوثيق أسماء الطلاب الأوائل مع رصد المجموع والنسبة والترتيب'
  },
  {
    id: 'grade_record_sheet',
    name: 'كشف رصد الدرجات وأعمال السنة',
    category: 'سجلات ورصد درجات',
    isPortrait: false,
    description: 'سجل رسمي معتمد لرصد درجات أعمال السنة والامتحانات النهائية'
  }
];

export default function Certificates({ onBack }: { onBack: () => void }) {
  const [selectedTemplate, setSelectedTemplate] = useState('ijazah_bukhari');
  const [editingField, setEditingField] = useState<string | null>(null);

  // Template Data States with LocalStorage Persistence
  const [ijazahData, setIjazahData] = useState<IjazahBukhariData>(() => {
    const saved = localStorage.getItem('cert_ijazah_bukhari');
    return saved ? JSON.parse(saved) : defaultIjazahBukhariData;
  });

  const [traditionalQuranData, setTraditionalQuranData] = useState<TraditionalQuranData>(() => {
    const saved = localStorage.getItem('cert_traditional_quran');
    return saved ? JSON.parse(saved) : defaultTraditionalQuranData;
  });

  const [quranAssocData, setQuranAssocData] = useState<QuranAssociationData>(() => {
    const saved = localStorage.getItem('cert_quran_association');
    return saved ? JSON.parse(saved) : defaultQuranAssociationData;
  });

  const [quranCompData, setQuranCompData] = useState<QuranCompetitionData>(() => {
    const saved = localStorage.getItem('cert_quran_competition');
    return saved ? JSON.parse(saved) : defaultQuranCompetitionData;
  });

  const [academicData, setAcademicData] = useState<AcademicExcellenceData>(() => {
    const saved = localStorage.getItem('cert_academic_excellence');
    return saved ? JSON.parse(saved) : defaultAcademicExcellenceData;
  });

  const [universityData, setUniversityData] = useState<UniversityDegreeData>(() => {
    const saved = localStorage.getItem('cert_university_degree');
    return saved ? JSON.parse(saved) : defaultUniversityDegreeData;
  });

  const [topStudentsData, setTopStudentsData] = useState<TopStudentsListData>(() => {
    const saved = localStorage.getItem('cert_top_students');
    return saved ? JSON.parse(saved) : defaultTopStudentsListData;
  });

  const [gradeRecordData, setGradeRecordData] = useState<GradeRecordData>(() => {
    const saved = localStorage.getItem('cert_grade_record');
    return saved ? JSON.parse(saved) : defaultGradeRecordData;
  });

  // Persist edits
  useEffect(() => { localStorage.setItem('cert_ijazah_bukhari', JSON.stringify(ijazahData)); }, [ijazahData]);
  useEffect(() => { localStorage.setItem('cert_traditional_quran', JSON.stringify(traditionalQuranData)); }, [traditionalQuranData]);
  useEffect(() => { localStorage.setItem('cert_quran_association', JSON.stringify(quranAssocData)); }, [quranAssocData]);
  useEffect(() => { localStorage.setItem('cert_quran_competition', JSON.stringify(quranCompData)); }, [quranCompData]);
  useEffect(() => { localStorage.setItem('cert_academic_excellence', JSON.stringify(academicData)); }, [academicData]);
  useEffect(() => { localStorage.setItem('cert_university_degree', JSON.stringify(universityData)); }, [universityData]);
  useEffect(() => { localStorage.setItem('cert_top_students', JSON.stringify(topStudentsData)); }, [topStudentsData]);
  useEffect(() => { localStorage.setItem('cert_grade_record', JSON.stringify(gradeRecordData)); }, [gradeRecordData]);

  const activeTemplate = CERT_TEMPLATES.find(t => t.id === selectedTemplate) || CERT_TEMPLATES[0];

  // Generic Edit Handler
  const handleFieldEdit = (field: string) => {
    setEditingField(field);
  };

  const getCurrentFieldValue = (): string => {
    if (!editingField) return '';
    switch (selectedTemplate) {
      case 'ijazah_bukhari': return (ijazahData as any)[editingField] || '';
      case 'traditional_quran': return (traditionalQuranData as any)[editingField] || '';
      case 'quran_association': return (quranAssocData as any)[editingField] || '';
      case 'quran_competition': return (quranCompData as any)[editingField] || '';
      case 'academic_excellence': return (academicData as any)[editingField] || '';
      case 'university_degree': return (universityData as any)[editingField] || '';
      case 'top_students_list': return (topStudentsData as any)[editingField] || '';
      case 'grade_record_sheet': return (gradeRecordData as any)[editingField] || '';
      default: return '';
    }
  };

  const handleSaveFieldValue = (val: string) => {
    if (!editingField) return;
    switch (selectedTemplate) {
      case 'ijazah_bukhari':
        setIjazahData({ ...ijazahData, [editingField]: val });
        break;
      case 'traditional_quran':
        setTraditionalQuranData({ ...traditionalQuranData, [editingField]: val });
        break;
      case 'quran_association':
        setQuranAssocData({ ...quranAssocData, [editingField]: val });
        break;
      case 'quran_competition':
        setQuranCompData({ ...quranCompData, [editingField]: val });
        break;
      case 'academic_excellence':
        setAcademicData({ ...academicData, [editingField]: val });
        break;
      case 'university_degree':
        setUniversityData({ ...universityData, [editingField]: val });
        break;
      case 'top_students_list':
        setTopStudentsData({ ...topStudentsData, [editingField]: val });
        break;
      case 'grade_record_sheet':
        setGradeRecordData({ ...gradeRecordData, [editingField]: val });
        break;
    }
    setEditingField(null);
  };

  // Reset to default sample values for current template
  const handleResetSampleData = () => {
    switch (selectedTemplate) {
      case 'ijazah_bukhari': setIjazahData(defaultIjazahBukhariData); break;
      case 'traditional_quran': setTraditionalQuranData(defaultTraditionalQuranData); break;
      case 'quran_association': setQuranAssocData(defaultQuranAssociationData); break;
      case 'quran_competition': setQuranCompData(defaultQuranCompetitionData); break;
      case 'academic_excellence': setAcademicData(defaultAcademicExcellenceData); break;
      case 'university_degree': setUniversityData(defaultUniversityDegreeData); break;
      case 'top_students_list': setTopStudentsData(defaultTopStudentsListData); break;
      case 'grade_record_sheet': setGradeRecordData(defaultGradeRecordData); break;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans" dir="rtl">
      
      {/* Print Dynamic Page Size Style */}
      <style>
        {`
          @media print {
            body * { visibility: hidden; }
            .print-area, .print-area * { visibility: visible; }
            .print-area { 
              position: absolute; 
              left: 0; 
              top: 0; 
              width: 100% !important; 
              height: 100% !important; 
              margin: 0 !important; 
              padding: 0 !important; 
              background: white !important; 
            }
            .no-print { display: none !important; }
            @page { 
              size: ${activeTemplate.isPortrait ? 'A4 portrait' : 'A4 landscape'}; 
              margin: 0; 
            }
          }
        `}
      </style>

      {/* Editing Dialog Modal */}
      <AnimatePresence>
        {editingField && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 no-print"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-slate-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                  <Edit3 size={18} className="text-emerald-700" /> تعديل النص الفعلي
                </h3>
                <button onClick={() => setEditingField(null)} className="text-slate-400 hover:text-slate-600 bg-slate-100 p-2 rounded-full">
                  <X size={18} />
                </button>
              </div>

              <textarea 
                defaultValue={getCurrentFieldValue()}
                onBlur={(e) => handleSaveFieldValue(e.target.value)}
                onKeyDown={(e) => { 
                  if (e.key === 'Enter' && !e.shiftKey && editingField !== 'isnadText' && editingField !== 'preamble') { 
                    e.preventDefault(); 
                    handleSaveFieldValue((e.target as any).value); 
                  } 
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-bold text-slate-900 focus:outline-none focus:border-emerald-600 min-h-[120px] text-sm leading-relaxed"
                autoFocus
              />

              <div className="flex justify-between items-center mt-4">
                <button onClick={() => setEditingField(null)} className="btn-secondary">
                  إلغاء
                </button>
                <button onClick={() => handleSaveFieldValue(getCurrentFieldValue())} className="btn-primary">
                  حفظ التعديل
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar Header */}
      <header className="bg-emerald-950 text-white border-b border-emerald-900 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-md no-print">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="btn-secondary bg-emerald-900 hover:bg-emerald-800 text-slate-100 border border-emerald-800">
            <ArrowRight size={16} />
            <span>الرئيسية</span>
          </button>
          <div>
            <h1 className="text-base font-black flex items-center gap-2">
              <Award className="text-amber-400" size={20} /> محرر ومصمم الشهادات والإجازات الرسمية
            </h1>
            <p className="text-[11px] text-emerald-200/80">نماذج طبق الأصل معتمدة للشهادات والجوائز والإجازات العلمية</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handleResetSampleData} className="btn-secondary bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700" title="استعادة النص الأصلي والافتراضي للنموذج">
            <RotateCcw size={15} />
            <span>استعادة النموذج الأصلي</span>
          </button>
          <button onClick={() => window.print()} className="btn-primary bg-amber-600 hover:bg-amber-500 text-slate-950 font-black">
            <Printer size={16} />
            <span>طباعة الشهادة (A4)</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-6 flex gap-6 max-w-[1600px] mx-auto w-full">
        
        {/* Sidebar Controls */}
        <div className="w-80 flex-shrink-0 flex flex-col gap-5 no-print">
          
          {/* Template Selector Card */}
          <div className="glass-card p-4">
            <h2 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2 border-b border-slate-200 pb-2">
              <Palette size={16} className="text-emerald-700" /> اختيار نموذج الشهادة (الثيم)
            </h2>
            <div className="space-y-2">
              {CERT_TEMPLATES.map(template => (
                <button
                  key={template.id}
                  onClick={() => { setSelectedTemplate(template.id); setEditingField(null); }}
                  className={`w-full text-right p-3 rounded-xl border-2 transition-all flex flex-col gap-1 ${
                    selectedTemplate === template.id 
                      ? 'border-emerald-700 bg-emerald-50/80 shadow-sm' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs text-slate-900">{template.name}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${template.isPortrait ? 'bg-sky-100 text-sky-800' : 'bg-purple-100 text-purple-800'}`}>
                      {template.isPortrait ? 'طولي A4' : 'عرضي A4'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium leading-relaxed">{template.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Edit Tips Card */}
          <div className="glass-card p-4 bg-emerald-950 text-white border-emerald-900">
            <h3 className="font-bold text-xs text-amber-300 mb-2 flex items-center gap-1.5">
              <Sparkles size={14} /> التعديل المباشر والتخصيص
            </h3>
            <p className="text-[11px] text-emerald-100/90 leading-relaxed">
              يمكنك النقر مباشرة على أي نص أو اسم أو تاريخ داخل الشهادة لتعديله فوراً، ثم النقر على زر الطباعة للحصول على وثيقة A4 جاهزة للتصدير بدقة متناهية.
            </p>
          </div>

        </div>

        {/* Certificate Preview Workspace */}
        <div className="flex-1 bg-slate-200/80 rounded-2xl border border-slate-300 overflow-auto flex justify-center items-center p-8 print:p-0 print:bg-white print:border-none print:overflow-visible">
          
          <div className="print-area">
            {selectedTemplate === 'ijazah_bukhari' && (
              <IjazahBukhariCert data={ijazahData} onEdit={(f) => handleFieldEdit(f)} />
            )}

            {selectedTemplate === 'traditional_quran' && (
              <TraditionalQuranCert data={traditionalQuranData} onEdit={(f) => handleFieldEdit(f)} />
            )}

            {selectedTemplate === 'quran_association' && (
              <QuranAssociationCert data={quranAssocData} onEdit={(f) => handleFieldEdit(f)} />
            )}

            {selectedTemplate === 'quran_competition' && (
              <QuranCompetitionCert data={quranCompData} onEdit={(f) => handleFieldEdit(f)} />
            )}

            {selectedTemplate === 'academic_excellence' && (
              <AcademicExcellenceCert data={academicData} onEdit={(f) => handleFieldEdit(f)} />
            )}

            {selectedTemplate === 'university_degree' && (
              <UniversityDegreeCert data={universityData} onEdit={(f) => handleFieldEdit(f)} />
            )}

            {selectedTemplate === 'top_students_list' && (
              <TopStudentsListCert data={topStudentsData} onEdit={(f) => handleFieldEdit(f)} />
            )}

            {selectedTemplate === 'grade_record_sheet' && (
              <GradeRecordSheet data={gradeRecordData} onEdit={(f) => handleFieldEdit(f)} />
            )}
          </div>

        </div>

      </main>
    </div>
  );
}
