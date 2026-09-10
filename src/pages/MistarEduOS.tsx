import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, BrainCircuit, UserCheck, GraduationCap, 
  Building2, Landmark, Network, Sparkles, Map, Database,
  Cpu, Activity, Eye, FileSignature
} from 'lucide-react';

export default function MistarEduOS({ onBack }: { onBack: () => void }) {
  const [activeLayer, setActiveLayer] = useState<string>('national');

  const layers = [
    {
      id: 'student',
      title: 'طبقة الطالب',
      icon: <GraduationCap size={24} />,
      color: 'bg-blue-500',
      description: 'مساعد ذكي شخصي، مسار تعلم ديناميكي، ملفات إنجاز رقمية وتدريب تكيفي.',
      features: ['تحليل أسلوب التعلم', 'مسار تعليمي مخصص', 'اكتشاف الفجوات', 'محفظة مهارات']
    },
    {
      id: 'teacher',
      title: 'طبقة المعلم',
      icon: <UserCheck size={24} />,
      color: 'bg-emerald-500',
      description: 'مساعد تدريس، إنشاء أنشطة آلية، تحليل أداء الصف، وتوصيات علاجية.',
      features: ['توليد أسئلة ذكي (OCR/ICR)', 'تحضير آلي', 'اكتشاف تعثر الطلاب', 'تحليل المفاهيم']
    },
    {
      id: 'admin',
      title: 'الإدارة المدرسية',
      icon: <Building2 size={24} />,
      color: 'bg-purple-500',
      description: 'صفر أوراق: حضور ذكي، إدارة الموارد، تقارير فورية.',
      features: ['حضور وانصراف ذكي', 'تتبع الموارد', 'أتمتة السجلات', 'تحليل الأداء المؤسسي']
    },
    {
      id: 'directorate',
      title: 'المديريات',
      icon: <Map size={24} />,
      color: 'bg-orange-500',
      description: 'لوحات تحكم فورية ومؤشرات أداء لجميع المدارس التابعة.',
      features: ['مقارنة أداء المدارس', 'رصد الاحتياجات التدريبية', 'تخصيص الموارد', 'تحليل الاتجاهات']
    },
    {
      id: 'ministry',
      title: 'الوزارة',
      icon: <Landmark size={24} />,
      color: 'bg-red-500',
      description: 'خريطة وطنية للتعلم، قياس أثر السياسات والعدالة التعليمية.',
      features: ['قياس العدالة الجغرافية', 'توقع الاحتياجات', 'مؤشرات التسرب', 'تحليلات لحظية']
    },
    {
      id: 'national',
      title: 'الذكاء الوطني',
      icon: <Network size={24} />,
      color: 'bg-violet-600',
      description: 'العقل الرابط: تحليل تنبؤي، تحسين مستمر للمناهج والسياسات بناء على البيانات الضخمة.',
      features: ['نماذج تعلم آلي وطنية', 'اكتشاف المشكلات الاستباقي', 'تحليل البيانات الضخمة', 'توجيه اقتصاد المعرفة']
    }
  ];

  const activeLayerData = layers.find(l => l.id === activeLayer);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans select-none overflow-hidden flex flex-col">
      {/* Top Navigation */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md p-4 flex items-center gap-4 relative z-20">
        <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
          <ArrowRight size={24} />
        </button>
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            Mistar EduOS <span className="text-violet-400 text-sm font-bold bg-violet-900/50 px-2 py-0.5 rounded">الرؤية الوطنية 2040</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">نظام التشغيل التعليمي الوطني - إعادة اختراع التعليم من الصفر</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative z-10">
        {/* Sidebar Layers */}
        <div className="w-full lg:w-80 border-l border-slate-800 bg-slate-900/80 backdrop-blur-md flex flex-col overflow-y-auto">
          <div className="p-6">
            <h2 className="text-lg font-bold text-slate-300 mb-6 flex items-center gap-2">
              <Database size={18} className="text-violet-400" /> البنية المعمارية (الطبقات)
            </h2>
            <div className="space-y-3">
              {layers.map(layer => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`w-full text-right p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 ${activeLayer === layer.id ? 'bg-slate-800 border-l-4 border-violet-500 shadow-lg shadow-violet-900/20' : 'hover:bg-slate-800/50 border-l-4 border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  <div className={`p-2 rounded-xl ${layer.color} text-white shadow-lg`}>
                    {layer.icon}
                  </div>
                  <div className="font-bold">{layer.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 lg:p-12 overflow-y-auto relative bg-grid-slate-800/[0.04]">
          {/* Background decoration */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <BrainCircuit size={400} className="text-violet-500 blur-[100px]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl ${activeLayerData?.color} flex items-center justify-center text-white shadow-xl shadow-current/20`}>
                  {activeLayerData?.icon}
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white tracking-tight">{activeLayerData?.title}</h2>
                  <p className="text-xl text-slate-400 mt-2">{activeLayerData?.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-12">
                {activeLayerData?.features.map((feat, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (idx * 0.1) }}
                    key={idx} 
                    className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl backdrop-blur-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-700/50 flex items-center justify-center text-violet-400 mb-4">
                      <Sparkles size={20} />
                    </div>
                    <h3 className="font-bold text-lg text-white mb-2">{feat}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      نظام استباقي يعالج البيانات لحظياً لتوفير هذه الخدمة دون تدخل بشري معقد.
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Ecosystem Concept Alert */}
              <div className="mt-12 bg-violet-900/30 border border-violet-500/30 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Cpu size={120} />
                </div>
                <h3 className="text-2xl font-black text-violet-300 mb-4 flex items-center gap-3">
                  <Eye size={28} /> رؤية استباقية (Zero-Paper OS)
                </h3>
                <p className="text-violet-100/80 leading-relaxed text-lg max-w-2xl relative z-10">
                  في هذا النظام، المعلم لم يعد ناقلاً للمعلومة أو مُدخلاً للبيانات. الذكاء الاصطناعي يقوم بالرصد، التصحيح، 
                  تحليل النتائج، واقتراح التدخلات. دور المعلم يتحول بالكامل إلى صانع شخصيات، مرشد نفسي، وموجه معرفي.
                </p>
                <div className="flex gap-4 mt-8 relative z-10">
                  <div className="bg-violet-950/50 border border-violet-500/20 rounded-xl p-4 flex-1 text-center">
                    <div className="font-mono text-violet-400 text-sm mb-1">Architecture</div>
                    <div className="font-bold text-white">Microservices & K8s</div>
                  </div>
                  <div className="bg-violet-950/50 border border-violet-500/20 rounded-xl p-4 flex-1 text-center">
                    <div className="font-mono text-violet-400 text-sm mb-1">AI Models</div>
                    <div className="font-bold text-white">Transformers & OCR</div>
                  </div>
                  <div className="bg-violet-950/50 border border-violet-500/20 rounded-xl p-4 flex-1 text-center">
                    <div className="font-mono text-violet-400 text-sm mb-1">Data</div>
                    <div className="font-bold text-white">Elasticsearch & Redis</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
