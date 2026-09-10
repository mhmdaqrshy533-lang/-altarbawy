import React from 'react';
import { useOMRStore } from './OMRStore';
import { OMRTemplatePreset } from './types';
import { Layout, Check, Sparkles, X, FileText, Building2 } from 'lucide-react';

export const OMR_TEMPLATES: OMRTemplatePreset[] = [
  {
    id: 'tmpl-yemen-50q',
    name: 'قالب الأتمتة الوزاري اليمني (50 سؤالاً)',
    category: 'ministerial',
    questionCount: 50,
    description: 'النموذج الرسمي المعتمد لاختبارات الشهادة العامة الثانوية بجمهورية اليمن (50 سؤالاً، 4 خيارات أ، ب، ج، د).',
    metadata: {
      country: 'الجمهورية اليمنية',
      ministry: 'وزارة التربية والتعليم - قطاع المناهج والتوجيه',
      governorate: 'أمانة العاصمة / صنعاء',
      directorate: 'إدارة الاختبارات والتقويم',
      school: 'مدرسة التفوق النموذجية',
      examTitle: 'اختبار الأتمتة الموحد للشهادة الثانوية العامة',
      subject: 'الفيزياء والرياضيات',
      grade: 'الثالث الثانوي العلمي',
      division: 'الشعبة ( أ )',
      time: 'ساعتان',
      marks: '100',
      academicYear: '2025/2026م',
      semester: 'الفصل الدراسي الأول',
      modelCode: 'أ'
    },
    elements: [
      {
        id: 'tmpl-hdr-1',
        type: 'header',
        x: 40,
        y: 40,
        width: 714,
        height: 140,
        rotation: 0,
        zIndex: 1,
        isLocked: false,
        isHidden: false,
        opacity: 1,
        data: {
          country: 'الجمهورية اليمنية',
          ministry: 'وزارة التربية والتعليم - قطاع المناهج والتوجيه',
          governorate: 'أمانة العاصمة / صنعاء',
          directorate: 'إدارة الاختبارات والتقويم',
          school: 'مدرسة التفوق النموذجية',
          examTitle: 'اختبار الأتمتة الموحد للشهادة الثانوية العامة',
          subject: 'الفيزياء والرياضيات',
          grade: 'الثالث الثانوي العلمي',
          division: 'الشعبة ( أ )',
          time: 'ساعتان',
          marks: '100',
          academicYear: '2025/2026م',
          semester: 'الفصل الدراسي الأول',
          modelCode: 'أ'
        }
      },
      {
        id: 'tmpl-sid-1',
        type: 'student_id_matrix',
        x: 40,
        y: 190,
        width: 210,
        height: 230,
        rotation: 0,
        zIndex: 2,
        isLocked: false,
        isHidden: false,
        opacity: 1,
        digitCount: 5,
        filledDigits: {},
        showLabels: true,
        title: 'تظليل رقم الجلوس'
      },
      {
        id: 'tmpl-grid-1',
        type: 'bubble_grid',
        x: 260,
        y: 190,
        width: 494,
        height: 850,
        rotation: 0,
        zIndex: 2,
        isLocked: false,
        isHidden: false,
        opacity: 1,
        questionCount: 50,
        choicesCount: 4,
        columns: 2,
        startQuestionNumber: 1,
        questionType: 'mcq',
        bubbleShape: 'circle',
        labelType: 'arabic',
        bubbleSpacing: 10,
        marksPerQuestion: 2,
        filledAnswers: {}
      }
    ]
  },
  {
    id: 'tmpl-primary-20q',
    name: 'قالب المرحلة الأساسية (20 سؤالاً)',
    category: 'primary',
    questionCount: 20,
    description: 'مخصص لطلاب المرحلة الأساسية والصفوف الصغرى (20 سؤالاً، 3 خيارات، دوائر كبيرة سهلة التظليل).',
    metadata: {
      country: 'الجمهورية اليمنية',
      ministry: 'وزارة التربية والتعليم',
      governorate: 'مكتب التربية والتعليم',
      directorate: 'إدارة التربية بالمديرية',
      school: 'مدرسة النهضة للتعليم الأساسي',
      examTitle: 'اختبار نهاية الفصل الدراسي الأول',
      subject: 'العلوم والحياة',
      grade: 'الخامس الأساسي',
      division: 'الشعبة ( ب )',
      time: 'ساعة واحدة',
      marks: '40',
      academicYear: '2025/2026م',
      semester: 'الفصل الأول',
      modelCode: 'أ'
    },
    elements: [
      {
        id: 'tmpl-hdr-2',
        type: 'header',
        x: 40,
        y: 40,
        width: 714,
        height: 140,
        rotation: 0,
        zIndex: 1,
        isLocked: false,
        isHidden: false,
        opacity: 1,
        data: {
          country: 'الجمهورية اليمنية',
          ministry: 'وزارة التربية والتعليم',
          governorate: 'مكتب التربية والتعليم',
          directorate: 'إدارة التربية بالمديرية',
          school: 'مدرسة النهضة للتعليم الأساسي',
          examTitle: 'اختبار نهاية الفصل الدراسي الأول',
          subject: 'العلوم والحياة',
          grade: 'الخامس الأساسي',
          division: 'الشعبة ( ب )',
          time: 'ساعة واحدة',
          marks: '40',
          academicYear: '2025/2026م',
          semester: 'الفصل الأول',
          modelCode: 'أ'
        }
      },
      {
        id: 'tmpl-sid-2',
        type: 'student_id_matrix',
        x: 40,
        y: 190,
        width: 180,
        height: 230,
        rotation: 0,
        zIndex: 2,
        isLocked: false,
        isHidden: false,
        opacity: 1,
        digitCount: 4,
        filledDigits: {},
        showLabels: true,
        title: 'رقم الجلوس'
      },
      {
        id: 'tmpl-grid-2',
        type: 'bubble_grid',
        x: 230,
        y: 190,
        width: 524,
        height: 700,
        rotation: 0,
        zIndex: 2,
        isLocked: false,
        isHidden: false,
        opacity: 1,
        questionCount: 20,
        choicesCount: 3,
        columns: 1,
        startQuestionNumber: 1,
        questionType: 'mcq',
        bubbleShape: 'circle',
        labelType: 'arabic',
        bubbleSpacing: 12,
        marksPerQuestion: 2,
        filledAnswers: {}
      }
    ]
  },
  {
    id: 'tmpl-univ-100q',
    name: 'قالب الامتحانات الجامعية الشاملة (100 سؤال)',
    category: 'university',
    questionCount: 100,
    description: 'مخصص للكليات والجامعات (100 سؤال، 5 خيارات A,B,C,D,E مع خانة رقم قيد الطالب الرقمي 7 أرقام).',
    metadata: {
      country: 'الجمهورية اليمنية',
      ministry: 'وزارة التعليم العالي والبحث العلمي',
      governorate: 'جامعة صنعاء / الكليات التطبيقية',
      directorate: 'عمادة القبول والتسجيل',
      school: 'كلية الهندسة والحاسوب',
      examTitle: 'الاختبار النهائي الجامعي الشامل',
      subject: 'برمجة وإحتمالات هندسية',
      grade: 'المستوى الثالث - حاسوب',
      division: 'المجموعة ( أ )',
      time: '3 ساعات',
      marks: '100',
      academicYear: '2025/2026م',
      semester: 'الفصل الثاني',
      modelCode: 'أ'
    },
    elements: [
      {
        id: 'tmpl-hdr-3',
        type: 'header',
        x: 40,
        y: 40,
        width: 714,
        height: 140,
        rotation: 0,
        zIndex: 1,
        isLocked: false,
        isHidden: false,
        opacity: 1,
        data: {
          country: 'الجمهورية اليمنية',
          ministry: 'وزارة التعليم العالي والبحث العلمي',
          governorate: 'جامعة صنعاء / الكليات التطبيقية',
          directorate: 'عمادة القبول والتسجيل',
          school: 'كلية الهندسة والحاسوب',
          examTitle: 'الاختبار النهائي الجامعي الشامل',
          subject: 'برمجة وإحتمالات هندسية',
          grade: 'المستوى الثالث - حاسوب',
          division: 'المجموعة ( أ )',
          time: '3 ساعات',
          marks: '100',
          academicYear: '2025/2026م',
          semester: 'الفصل الثاني',
          modelCode: 'أ'
        }
      },
      {
        id: 'tmpl-sid-3',
        type: 'student_id_matrix',
        x: 40,
        y: 190,
        width: 210,
        height: 230,
        rotation: 0,
        zIndex: 2,
        isLocked: false,
        isHidden: false,
        opacity: 1,
        digitCount: 6,
        filledDigits: {},
        showLabels: true,
        title: 'الرقم الجامعي'
      },
      {
        id: 'tmpl-grid-3',
        type: 'bubble_grid',
        x: 260,
        y: 190,
        width: 494,
        height: 850,
        rotation: 0,
        zIndex: 2,
        isLocked: false,
        isHidden: false,
        opacity: 1,
        questionCount: 100,
        choicesCount: 5,
        columns: 3,
        startQuestionNumber: 1,
        questionType: 'mcq',
        bubbleShape: 'circle',
        labelType: 'english',
        bubbleSpacing: 8,
        marksPerQuestion: 1,
        filledAnswers: {}
      }
    ]
  }
];

export const TemplateGallery: React.FC = () => {
  const { showTemplateGallery, setShowTemplateGallery, loadTemplate, project } = useOMRStore();

  if (!showTemplateGallery) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/30 text-purple-400 flex items-center justify-center border border-purple-500/30">
              <Layout size={22} />
            </div>
            <div>
              <h2 className="text-lg font-black font-serif">معرض قوالب ورقات الإجابة OMR</h2>
              <p className="text-xs text-slate-400 font-bold">قوالب جاهزة ومجهزة للتصحيح الآلي بدون ضبط يدوي</p>
            </div>
          </div>
          <button 
            onClick={() => setShowTemplateGallery(false)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Gallery Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {OMR_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => loadTemplate(tmpl)}
              className="p-5 rounded-2xl border-2 border-slate-200 hover:border-purple-600 hover:bg-purple-50/20 cursor-pointer transition-all flex items-center justify-between group shadow-sm hover:shadow-md"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-slate-900 group-hover:text-purple-900">
                    {tmpl.name}
                  </span>
                  <span className="text-[10px] font-extrabold bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full">
                    {tmpl.questionCount} سؤال
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                  {tmpl.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  <Check size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex justify-end">
          <button
            onClick={() => setShowTemplateGallery(false)}
            className="px-6 py-2.5 text-xs font-black text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
          >
            إغلاق المعرض
          </button>
        </div>

      </div>
    </div>
  );
};
