import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutTemplate, Search, Filter, Sparkles, FileText, FileSignature, 
  Award, GraduationCap, Calendar, BarChart3, BookOpen, Users, 
  CheckCircle2, ArrowRight, Download, Eye, Layers, ShieldCheck, Mail
} from 'lucide-react';
import { useRole } from '../context/RoleContext';
import { useOS } from '../context/OSContext';

interface NationalTemplate {
  id: string;
  title: string;
  category: string;
  roleLevel: string;
  roleBadge: string;
  description: string;
  tags: string[];
  actionRoute: string;
  previewBg: string;
  icon: any;
  isOfficial: boolean;
}

export const TemplateCenter: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { currentRole, setRole, allRoles } = useRole();
  const { launchApplet } = useOS();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewTemplate, setPreviewTemplate] = useState<NationalTemplate | null>(null);

  const categories = [
    { id: 'all', name: 'جميع القوالب' },
    { id: 'ministry', name: 'القرارات والتعاميم الوزارية' },
    { id: 'exams', name: 'الامتحانات وأتمتة OMR' },
    { id: 'curriculum', name: 'المناهج والتحضير' },
    { id: 'certificates', name: 'الشهادات والوسامات' },
    { id: 'grades', name: 'كشوف الدرجات والحضور' },
    { id: 'school', name: 'المدرسة والجدول المدرسي' },
    { id: 'reports', name: 'محاضر الاجتماعات والتقارير' },
  ];

  const templates: NationalTemplate[] = [
    {
      id: 'tmpl_1',
      title: 'قرار وزاري رسمي بختم الدولة',
      category: 'ministry',
      roleLevel: 'وزارة التربية والتعليم',
      roleBadge: 'bg-amber-100 text-amber-900 border-amber-300',
      description: 'قالب القرار الوزاري الرسمي مع الترقيم المتسلسل والختم الرقمي والترميز الباركوود.',
      tags: ['قرار', 'وزاري', 'رسمي', 'QR'],
      actionRoute: 'document_editor',
      previewBg: 'from-amber-600 to-amber-800',
      icon: FileText,
      isOfficial: true,
    },
    {
      id: 'tmpl_2',
      title: 'تعميم إداري رسمي للمحافظات والمديريات',
      category: 'ministry',
      roleLevel: 'وزارة التربية / المحافظة',
      roleBadge: 'bg-blue-100 text-blue-900 border-blue-300',
      description: 'قالب للتعاميم الوزارية الصادرة إلى المدارس والإدارات مع حقول المتابعة والاعتماد.',
      tags: ['تعميم', 'إداري', 'محافظة'],
      actionRoute: 'document_editor',
      previewBg: 'from-blue-600 to-indigo-800',
      icon: Mail,
      isOfficial: true,
    },
    {
      id: 'tmpl_3',
      title: 'ورقة امتحان وزارية موحدة (الشهادة العامة)',
      category: 'exams',
      roleLevel: 'قطاع الاختبارات',
      roleBadge: 'bg-purple-100 text-purple-900 border-purple-300',
      description: 'قالب الامتحان الوزاري الرسمي المنسق بجدول أسئلة متكامل وترقيم الصفحات وحقول الدرجات.',
      tags: ['امتحان', 'وزاري', 'شهادة', 'رسمي'],
      actionRoute: 'exams_section',
      previewBg: 'from-purple-600 to-violet-900',
      icon: FileSignature,
      isOfficial: true,
    },
    {
      id: 'tmpl_4',
      title: 'ورقة أتمتة تصحيح OMR (النماذج الأربعة A, B, C, D)',
      category: 'exams',
      roleLevel: 'قطاع الاختبارات / المعلم',
      roleBadge: 'bg-purple-100 text-purple-900 border-purple-300',
      description: 'قالب ورقة تظليل مؤتمتة لقراءة الإجابات بالكاميرا بـ 60 فقرة اختر من متعدد وصح/خطأ.',
      tags: ['OMR', 'تظليل', 'تصحيح آلي', 'باركوود'],
      actionRoute: 'bubble_sheets',
      previewBg: 'from-purple-700 to-indigo-900',
      icon: Layers,
      isOfficial: true,
    },
    {
      id: 'tmpl_5',
      title: 'خطة درس نموذجية حسب معايير التوجيه الوزاري',
      category: 'curriculum',
      roleLevel: 'قطاع المناهج / المعلم',
      roleBadge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      description: 'تحضير يومي يشمل الأهداف السلوكية، الوسائل، الاستراتيجيات والتأمل الذاتي.',
      tags: ['تحضير', 'درس', 'مناهج', 'توجيه'],
      actionRoute: 'plans_section',
      previewBg: 'from-emerald-600 to-teal-800',
      icon: BookOpen,
      isOfficial: true,
    },
    {
      id: 'tmpl_6',
      title: 'شهادة تقدير وتفوق بالهوية الوطنية الرسمية',
      category: 'certificates',
      roleLevel: 'المدرسة / المدير',
      roleBadge: 'bg-amber-100 text-amber-900 border-amber-300',
      description: 'شهادة شكر وتفوق مروسة بشعار الجمهورية وإطار ذهبي رسمي جاهزة للطباعة والتصدير.',
      tags: ['شهادة', 'تفوق', 'تكريم', 'ذهبي'],
      actionRoute: 'certificates_section',
      previewBg: 'from-amber-500 to-yellow-700',
      icon: Award,
      isOfficial: true,
    },
    {
      id: 'tmpl_7',
      title: 'كشف درجات محصلة أعمال السنة والامتحانات',
      category: 'grades',
      roleLevel: 'وكيل المدرسة / المعلم',
      roleBadge: 'bg-sky-100 text-sky-900 border-sky-300',
      description: 'جدول تفصيلي للاختبارات الشفهية والتحريرية والمواظبة مع حساب المجموع والنسبة تلقائياً.',
      tags: ['كشف درجات', 'محصلة', 'أعمال سنة'],
      actionRoute: 'grades_section',
      previewBg: 'from-sky-600 to-blue-800',
      icon: GraduationCap,
      isOfficial: true,
    },
    {
      id: 'tmpl_8',
      title: 'جدول توزيع الحصص المدرسية والمعلمين أسبوعياً',
      category: 'school',
      roleLevel: 'مدير المدرسة',
      roleBadge: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      description: 'جدول مدرسي متكامل يوزع المعلمين والمواد على الفصول الدراسية طوال الأسبوع.',
      tags: ['جدول', 'حصص', 'توزيع معلمين'],
      actionRoute: 'teacher_tools',
      previewBg: 'from-indigo-600 to-slate-800',
      icon: Calendar,
      isOfficial: true,
    },
    {
      id: 'tmpl_9',
      title: 'محضر اجتماع مجلس الآباء والمعلمين',
      category: 'reports',
      roleLevel: 'الإدارة العامة / المدرسة',
      roleBadge: 'bg-slate-100 text-slate-900 border-slate-300',
      description: 'توثيق بنود الاجتماعات القرارات التوصيات وتوقيعات أعضاء المجلس.',
      tags: ['محضر', 'اجتماع', 'مجلس الآباء'],
      actionRoute: 'document_editor',
      previewBg: 'from-slate-700 to-slate-900',
      icon: Users,
      isOfficial: true,
    },
    {
      id: 'tmpl_10',
      title: 'تقرير زيارة موجه تربوي وتوجيهات ميدانية',
      category: 'reports',
      roleLevel: 'المشرف التربوي',
      roleBadge: 'bg-rose-100 text-rose-900 border-rose-300',
      description: 'نموذج تقييم الأداء الصفّي للمعلم والملحوظات والتوصيات مع خطة المتابعة العلاجية.',
      tags: ['تقرير', 'توجيه', 'مشرف', 'زيارة'],
      actionRoute: 'document_editor',
      previewBg: 'from-rose-600 to-pink-800',
      icon: CheckCircle2,
      isOfficial: true,
    }
  ];

  const filteredTemplates = templates.filter(tmpl => {
    const matchesCategory = selectedCategory === 'all' || tmpl.category === selectedCategory;
    const matchesSearch = tmpl.title.includes(searchQuery) || 
                          tmpl.description.includes(searchQuery) ||
                          tmpl.tags.some(t => t.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 md:p-10 space-y-8 animate-in fade-in duration-300 max-w-7xl mx-auto font-sans" dir="rtl">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-6">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-xs font-bold mb-3 transition-colors"
          >
            <ArrowRight size={16} /> العودة إلى لوحة التحكم
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <LayoutTemplate size={26} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">مركز القوالب الوطنية الرسمية</h1>
              <p className="text-xs font-bold text-slate-500 mt-0.5">
                قوالب معتمدة لجميع المساعدين والمستويات من الوزارة إلى المدرسة | تصميم وتطوير المهندس//:سهيل الهزبري
              </p>
            </div>
          </div>
        </div>

        {/* Role Quick Selector Filter & Standards Center Link */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => launchApplet('standards_center')}
            className="bg-[#004B6E] hover:bg-[#003B57] text-white px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm transition-all"
            title="تخصيص بروفايل الدولة والجهة الرسمية ونظام الدرجات"
          >
            <span>مركز المعايير والهوية</span>
            <span className="bg-sky-400/30 text-sky-100 text-[9px] px-1.5 py-0.5 rounded">عربي</span>
          </button>

          <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex items-center gap-2">
            <span className="text-xs font-black text-slate-500 px-2 whitespace-nowrap">المستوى الحالي:</span>
            <select 
              value={currentRole.id}
              onChange={(e) => setRole(e.target.value as any)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-black text-slate-800 outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
            >
              {allRoles.map(r => (
                <option key={r.id} value={r.id}>{r.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Search & Category Tabs */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-4 top-3.5 text-slate-400" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في القوالب الرسمية (مثلاً: قرار، امتحان، OMR، شهادة، تحضير)..."
              className="w-full pl-4 pr-11 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition-all border ${
                selectedCategory === cat.id 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((tmpl) => {
          const Icon = tmpl.icon;
          return (
            <motion.div
              key={tmpl.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col group relative"
            >
              {/* Card Banner */}
              <div className={`h-36 bg-gradient-to-r ${tmpl.previewBg} p-6 relative overflow-hidden flex justify-between items-start text-white`}>
                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
                
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border backdrop-blur-md ${tmpl.roleBadge}`}>
                  {tmpl.roleLevel}
                </span>

                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
                  <Icon size={24} />
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {tmpl.isOfficial && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        <ShieldCheck size={12} /> قالب رسمي معتمد
                      </span>
                    )}
                  </div>
                  <h3 className="font-black text-slate-900 text-base leading-snug group-hover:text-violet-600 transition-colors">
                    {tmpl.title}
                  </h3>
                  <p className="text-xs font-bold text-slate-500 mt-2 leading-relaxed">
                    {tmpl.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  {tmpl.tags.map((tag, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => launchApplet(tmpl.actionRoute, { templateId: tmpl.id })}
                    className="flex-1 py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-black transition-colors shadow-md shadow-violet-600/20 flex items-center justify-center gap-2"
                  >
                    <Sparkles size={16} />
                    <span>استخدام القالب</span>
                  </button>

                  <button
                    onClick={() => setPreviewTemplate(tmpl)}
                    className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black transition-colors"
                    title="معاينة تفاصيل القالب"
                  >
                    <Eye size={18} />
                  </button>
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 space-y-6"
            >
              <div className={`p-6 bg-gradient-to-r ${previewTemplate.previewBg} text-white relative`}>
                <h3 className="text-xl font-black">{previewTemplate.title}</h3>
                <p className="text-xs font-bold text-white/80 mt-1">{previewTemplate.roleLevel}</p>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-sm font-bold text-slate-700 leading-relaxed">
                  {previewTemplate.description}
                </p>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 space-y-2">
                  <div className="flex justify-between">
                    <span>حالة الاعتماد:</span>
                    <span className="text-emerald-600 font-black">معتمد وزارياً (2025م)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الهوية الرسمية:</span>
                    <span className="text-slate-800 font-black">شعار الجمهورية + ختم رسمي + QR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>المرجع البرمجي:</span>
                    <span className="text-violet-600 font-black">المهندس//:سهيل الهزبري</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      const route = previewTemplate.actionRoute;
                      setPreviewTemplate(null);
                      launchApplet(route, { templateId: previewTemplate.id });
                    }}
                    className="flex-1 py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black text-xs shadow-lg shadow-violet-600/20"
                  >
                    فتح القالب في المحرر الآن
                  </button>
                  <button
                    onClick={() => setPreviewTemplate(null)}
                    className="px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs"
                  >
                    إغلاق
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
