import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, FileText, Printer, Save, Layout, Type, 
  Table as TableIcon, Image as ImageIcon, QrCode, Grid,
  Plus, Trash2, Settings, Download, FileSignature, 
  AlignLeft, AlignCenter, AlignRight, Bold, Italic, 
  FileSpreadsheet, FileBadge, Users, Clock, Edit3, Check,
  Briefcase, Mail, FileWarning, Presentation, BarChart3, 
  Search, Shield, DatabaseBackup, Fingerprint, ScanBarcode, 
  Minus, Stamp, Layers, LayoutTemplate, Network
} from 'lucide-react';

// --- Types ---
type ElementType = 'text' | 'table' | 'image' | 'smart_field' | 'header' | 'footer' | 'signature' | 'qr' | 'barcode' | 'stamp' | 'divider' | 'grades_box' | 'notes_box';

interface DocElement {
  id: string;
  type: ElementType;
  content: any;
  style?: React.CSSProperties;
}

interface Page {
  id: string;
  elements: DocElement[];
}

interface DocumentData {
  id: string;
  docId: string;
  title: string;
  orientation: 'portrait' | 'landscape';
  pages: Page[];
}

export default function OfficialMemos({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'editor' | 'generator' | 'archive' | 'settings'>('dashboard');
  
  const generateDocId = () => `RQM-${new Date().getFullYear()}-DOC-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;

  const [doc, setDoc] = useState<DocumentData>({
    id: '1',
    docId: generateDocId(),
    title: 'مستند جديد',
    orientation: 'portrait',
    pages: [{ id: 'p1', elements: [] }]
  });
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  // System Settings (Smart Fields Source)
  const [sysSettings, setSysSettings] = useState({
    schoolName: 'مدرسة رواد المستقبل الأهلية',
    teacherName: 'أ. أحمد عبدالله',
    subject: 'الرياضيات',
    grade: 'الصف الأول الثانوي',
    term: 'الفصل الدراسي الأول',
    year: '2027/2028',
    principalName: 'أ. محمد صالح',
    directorate: 'مديرية التعزية'
  });

  const printAreaRef = useRef<HTMLDivElement>(null);

  // --- Smart Fields System ---
  const replaceSmartFields = (text: string) => {
    if (typeof text !== 'string') return text;
    let result = text;
    result = result.replace(/{{اسم_المدرسة}}/g, sysSettings.schoolName);
    result = result.replace(/{{اسم_المعلم}}/g, sysSettings.teacherName);
    result = result.replace(/{{المادة}}/g, sysSettings.subject);
    result = result.replace(/{{الصف}}/g, sysSettings.grade);
    result = result.replace(/{{الفصل}}/g, sysSettings.term);
    result = result.replace(/{{السنة}}/g, sysSettings.year);
    result = result.replace(/{{اسم_المدير}}/g, sysSettings.principalName);
    result = result.replace(/{{المديرية}}/g, sysSettings.directorate);
    return result;
  };

  // --- Operations ---
  const addElement = (pageId: string, type: ElementType) => {
    let newElement: DocElement = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: '',
      style: { textAlign: 'right', fontSize: '16px', fontWeight: 'normal', width: '100%' }
    };

    switch (type) {
      case 'text': newElement.content = 'نص جديد...'; break;
      case 'smart_field': newElement.content = 'المدرسة: {{اسم_المدرسة}}\nالمادة: {{المادة}}'; break;
      case 'header': newElement.content = 'الجمهورية اليمنية\nوزارة التربية والتعليم\nمكتب التربية بـ {{المديرية}}\n{{اسم_المدرسة}}'; break;
      case 'footer': newElement.content = `وثيقة رسمية - رقم المرجع: ${doc.docId}`; newElement.style = { textAlign: 'center', fontSize: '12px', opacity: 0.6 }; break;
      case 'table': newElement.content = { rows: 3, cols: 3, data: Array(3).fill(Array(3).fill('')) }; break;
      case 'grades_box': newElement.content = { rows: 2, cols: 5, data: [['الشفهي', 'الواجبات', 'الاختبار', 'المواظبة', 'المجموع'], ['','','','','']] }; break;
      case 'signature': newElement.content = 'توقيع المعلم:\n\n....................'; newElement.style = { textAlign: 'center', fontWeight: 'bold' }; break;
      case 'stamp': newElement.content = 'ختم المدرسة'; newElement.style = { textAlign: 'center', color: '#1e3a8a', border: '2px solid #1e3a8a', borderRadius: '50%', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto' }; break;
      case 'qr': newElement.content = doc.docId; break;
      case 'barcode': newElement.content = doc.docId; break;
      case 'notes_box': newElement.content = 'ملاحظات المعلم:\n\n'; newElement.style = { border: '1px solid #000', padding: '10px', minHeight: '80px' }; break;
      case 'divider': newElement.content = ''; break;
    }

    setDoc(prev => ({
      ...prev,
      pages: prev.pages.map(p => 
        p.id === pageId ? { ...p, elements: [...p.elements, newElement] } : p
      )
    }));
  };

  const updateElement = (pageId: string, elId: string, updates: Partial<DocElement>) => {
    setDoc(prev => ({
      ...prev,
      pages: prev.pages.map(p => 
        p.id === pageId ? {
          ...p,
          elements: p.elements.map(el => el.id === elId ? { ...el, ...updates } : el)
        } : p
      )
    }));
  };

  const removeElement = (pageId: string, elId: string) => {
    setDoc(prev => ({
      ...prev,
      pages: prev.pages.map(p => 
        p.id === pageId ? {
          ...p,
          elements: p.elements.filter(el => el.id !== elId)
        } : p
      )
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleTextareaResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const loadTemplate = (type: string) => {
    let newDoc: DocumentData = {
      id: Math.random().toString(36).substr(2, 9),
      docId: generateDocId(),
      title: 'مستند من قالب',
      orientation: 'portrait',
      pages: [{ id: 'p1', elements: [] }]
    };

    if (type === 'exam') {
      newDoc.title = 'نموذج امتحان شهري';
      newDoc.pages[0].elements = [
        { id: '1', type: 'header', content: 'الجمهورية اليمنية\nوزارة التربية والتعليم\nمكتب التربية بـ {{المديرية}}\n{{اسم_المدرسة}}', style: { textAlign: 'right', fontWeight: 'bold' } },
        { id: '2', type: 'text', content: 'امتحان الشهر الأول - مادة {{المادة}} - {{الصف}}\nللعام الدراسي {{السنة}}', style: { textAlign: 'center', fontSize: '20px', fontWeight: 'bold', margin: '20px 0' } },
        { id: '3', type: 'text', content: 'اسم الطالب: .....................................................     رقم الجلوس: ....................', style: { fontWeight: 'bold', marginBottom: '30px' } },
        { id: '4', type: 'text', content: 'السؤال الأول: ضع علامة (ص) أو (خ) أمام العبارات التالية: (10 درجات)', style: { fontWeight: 'bold', marginTop: '20px' } },
        { id: '5', type: 'text', content: '1. (  ) .........................................\n2. (  ) .........................................', style: { lineHeight: '2' } },
        { id: '6', type: 'divider', content: '' },
        { id: '7', type: 'qr', content: newDoc.docId, style: { textAlign: 'left' } },
        { id: '8', type: 'footer', content: `وثيقة مصدقة إلكترونياً - ${newDoc.docId}`, style: { textAlign: 'center', fontSize: '10px', marginTop: '40px' } },
      ];
    } else if (type === 'grades') {
      newDoc.title = 'كشف درجات';
      newDoc.orientation = 'landscape';
      newDoc.pages[0].elements = [
        { id: '1', type: 'text', content: 'كشف درجات الطلاب - {{المادة}} - {{الصف}} - {{الفصل}}', style: { textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' } },
        { id: '2', type: 'grades_box', content: { rows: 10, cols: 7, data: [['م', 'اسم الطالب', 'الشهر 1', 'الشهر 2', 'المشاركة', 'الواجبات', 'المجموع'], ['1','','','','','',''], ['2','','','','','',''], ['3','','','','','','']] } },
        { id: '3', type: 'signature', content: 'يعتمد، مدير المدرسة\n{{اسم_المدير}}', style: { textAlign: 'left', marginTop: '40px' } }
      ];
    }

    setDoc(newDoc);
    setActiveTab('editor');
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 font-sans select-none flex flex-col overflow-hidden" dir="rtl">
      
      {/* Top Navigation */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0f172a] z-20">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
            <ArrowRight size={24} className="text-violet-400" />
          </button>
          <div>
            <h1 className="text-xl font-black text-white flex items-center gap-2">
              <FileSignature className="text-violet-500" /> محرر الرقيم 2.0
              <span className="text-[10px] bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded font-mono border border-violet-500/30">Smart Docs</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">منصة الوثائق الذكية والتوليد الجماعي</p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'dashboard' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-slate-400 hover:text-slate-200'}`}>
            <BarChart3 size={16} /> المنصة
          </button>
          <button onClick={() => setActiveTab('editor')} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'editor' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-slate-400 hover:text-slate-200'}`}>
            <LayoutTemplate size={16} /> المصمم
          </button>
          <button onClick={() => setActiveTab('generator')} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'generator' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-slate-400 hover:text-slate-200'}`}>
            <Layers size={16} /> التوليد الجماعي
          </button>
          <button onClick={() => setActiveTab('archive')} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'archive' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-slate-400 hover:text-slate-200'}`}>
            <Search size={16} /> الأرشيف
          </button>
          <button onClick={() => setActiveTab('settings')} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'settings' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-slate-400 hover:text-slate-200'}`}>
            <Settings size={16} /> الإعدادات
          </button>
        </div>

        <div className="flex gap-3">
          <button onClick={handlePrint} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2">
            <Printer size={18} /> طباعة
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-900/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

        {/* --------- DASHBOARD TAB --------- */}
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 p-8 overflow-y-auto custom-scrollbar">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-violet-500 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.8)]"></div>
                  لوحة تحكم الوثائق الذكية
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                  {[
                    { title: 'إجمالي الوثائق', value: '1,245', icon: <FileText className="text-violet-400" size={28} />, bg: 'bg-violet-500/10' },
                    { title: 'وثائق هذا الشهر', value: '342', icon: <Clock className="text-cyan-400" size={28} />, bg: 'bg-cyan-500/10' },
                    { title: 'وثائق مصدقة', value: '1,100', icon: <Fingerprint className="text-emerald-400" size={28} />, bg: 'bg-emerald-500/10' },
                    { title: 'عمليات التوليد', value: '56', icon: <Layers className="text-amber-400" size={28} />, bg: 'bg-amber-500/10' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-[#0f172a] border border-slate-800 p-6 rounded-3xl flex items-center gap-4 shadow-sm hover:border-slate-700 transition-colors">
                      <div className={`p-4 rounded-2xl ${stat.bg}`}>{stat.icon}</div>
                      <div>
                        <p className="text-slate-400 text-sm font-bold">{stat.title}</p>
                        <p className="text-3xl font-black text-white mt-1">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Quick Templates */}
                  <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-3xl">
                    <h3 className="text-lg font-bold text-white mb-6">قوالب سريعة الاستخدام</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { title: 'امتحان شهري', icon: <FileText />, id: 'exam', color: 'text-violet-400', bg: 'bg-violet-500/10' },
                        { title: 'كشف درجات', icon: <FileSpreadsheet />, id: 'grades', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                        { title: 'سجل حضور', icon: <Clock />, id: 'attendance', color: 'text-rose-400', bg: 'bg-rose-500/10' },
                        { title: 'مذكرة إدارية', icon: <Mail />, id: 'memo', color: 'text-amber-400', bg: 'bg-amber-500/10' }
                      ].map(t => (
                        <button key={t.id} onClick={() => loadTemplate(t.id)} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 bg-[#0B1120] transition-all group">
                          <div className={`p-3 rounded-xl ${t.bg} ${t.color} group-hover:scale-110 transition-transform`}>{t.icon}</div>
                          <span className="font-bold text-slate-300 group-hover:text-white">{t.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-3xl">
                    <h3 className="text-lg font-bold text-white mb-6">أحدث الوثائق المصدرة</h3>
                    <div className="space-y-4">
                      {[
                        { id: 'RQM-2028-EXAM-0012', type: 'امتحان رياضيات', date: 'منذ ساعتين' },
                        { id: 'RQM-2028-GRD-0045', type: 'كشف درجات الصف التاسع', date: 'منذ 5 ساعات' },
                        { id: 'RQM-2028-MEMO-0089', type: 'تعميم إداري رقم 5', date: 'أمس' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-[#0B1120] border border-slate-800">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-slate-800 rounded-lg text-slate-400"><FileSignature size={18} /></div>
                            <div>
                              <p className="font-bold text-white text-sm">{item.type}</p>
                              <p className="text-xs text-slate-500 font-mono mt-1">{item.id}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-slate-500 bg-slate-800/50 px-3 py-1 rounded-lg">{item.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --------- EDITOR TAB --------- */}
        <AnimatePresence mode="wait">
          {activeTab === 'editor' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 flex">
              
              {/* Elements Toolbox (Left) */}
              <div className="w-72 bg-[#0f172a] border-l border-slate-800 p-4 flex flex-col overflow-y-auto no-print shadow-xl relative z-20 custom-scrollbar">
                
                <div className="mb-6">
                  <h3 className="font-black text-slate-300 text-sm mb-3 uppercase tracking-wider">العناصر الأساسية</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => addElement(doc.pages[0].id, 'text')} className="flex flex-col items-center justify-center gap-2 bg-[#0B1120] border border-slate-800 p-3 rounded-xl hover:border-violet-500/50 hover:text-violet-400 transition-colors shadow-sm">
                      <Type size={20} /> <span className="text-xs font-bold">نص</span>
                    </button>
                    <button onClick={() => addElement(doc.pages[0].id, 'table')} className="flex flex-col items-center justify-center gap-2 bg-[#0B1120] border border-slate-800 p-3 rounded-xl hover:border-violet-500/50 hover:text-violet-400 transition-colors shadow-sm">
                      <TableIcon size={20} /> <span className="text-xs font-bold">جدول</span>
                    </button>
                    <button onClick={() => addElement(doc.pages[0].id, 'header')} className="flex flex-col items-center justify-center gap-2 bg-[#0B1120] border border-slate-800 p-3 rounded-xl hover:border-violet-500/50 hover:text-violet-400 transition-colors shadow-sm">
                      <Layout size={20} /> <span className="text-xs font-bold">ترويسة</span>
                    </button>
                    <button onClick={() => addElement(doc.pages[0].id, 'divider')} className="flex flex-col items-center justify-center gap-2 bg-[#0B1120] border border-slate-800 p-3 rounded-xl hover:border-violet-500/50 hover:text-violet-400 transition-colors shadow-sm">
                      <Minus size={20} /> <span className="text-xs font-bold">فاصل</span>
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-black text-slate-300 text-sm mb-3 uppercase tracking-wider">العناصر الذكية والمدرسية</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => addElement(doc.pages[0].id, 'smart_field')} className="flex flex-col items-center justify-center gap-2 bg-[#0B1120] border border-slate-800 p-3 rounded-xl hover:border-emerald-500/50 hover:text-emerald-400 transition-colors shadow-sm">
                      <Grid size={20} /> <span className="text-xs font-bold">حقل ذكي</span>
                    </button>
                    <button onClick={() => addElement(doc.pages[0].id, 'grades_box')} className="flex flex-col items-center justify-center gap-2 bg-[#0B1120] border border-slate-800 p-3 rounded-xl hover:border-emerald-500/50 hover:text-emerald-400 transition-colors shadow-sm">
                      <FileSpreadsheet size={20} /> <span className="text-xs font-bold">مربع درجات</span>
                    </button>
                    <button onClick={() => addElement(doc.pages[0].id, 'notes_box')} className="col-span-2 flex items-center justify-center gap-2 bg-[#0B1120] border border-slate-800 p-3 rounded-xl hover:border-emerald-500/50 hover:text-emerald-400 transition-colors shadow-sm">
                      <FileText size={18} /> <span className="text-xs font-bold">مربع ملاحظات</span>
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-black text-slate-300 text-sm mb-3 uppercase tracking-wider">التحقق والأمان</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => addElement(doc.pages[0].id, 'signature')} className="flex flex-col items-center justify-center gap-2 bg-[#0B1120] border border-slate-800 p-3 rounded-xl hover:border-cyan-500/50 hover:text-cyan-400 transition-colors shadow-sm">
                      <FileSignature size={20} /> <span className="text-xs font-bold">توقيع</span>
                    </button>
                    <button onClick={() => addElement(doc.pages[0].id, 'stamp')} className="flex flex-col items-center justify-center gap-2 bg-[#0B1120] border border-slate-800 p-3 rounded-xl hover:border-cyan-500/50 hover:text-cyan-400 transition-colors shadow-sm">
                      <Stamp size={20} /> <span className="text-xs font-bold">ختم</span>
                    </button>
                    <button onClick={() => addElement(doc.pages[0].id, 'qr')} className="flex flex-col items-center justify-center gap-2 bg-[#0B1120] border border-slate-800 p-3 rounded-xl hover:border-cyan-500/50 hover:text-cyan-400 transition-colors shadow-sm">
                      <QrCode size={20} /> <span className="text-xs font-bold">رمز QR</span>
                    </button>
                    <button onClick={() => addElement(doc.pages[0].id, 'barcode')} className="flex flex-col items-center justify-center gap-2 bg-[#0B1120] border border-slate-800 p-3 rounded-xl hover:border-cyan-500/50 hover:text-cyan-400 transition-colors shadow-sm">
                      <ScanBarcode size={20} /> <span className="text-xs font-bold">باركود</span>
                    </button>
                  </div>
                </div>

                <div className="mt-auto border-t border-slate-800 pt-4">
                   <h3 className="font-bold text-slate-400 text-sm mb-3">إعدادات الورقة</h3>
                   <div className="flex bg-[#0B1120] rounded-xl p-1 border border-slate-800 mb-3">
                     <button onClick={() => setDoc({...doc, orientation: 'portrait'})} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${doc.orientation === 'portrait' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>A4 عمودي</button>
                     <button onClick={() => setDoc({...doc, orientation: 'landscape'})} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${doc.orientation === 'landscape' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>A4 أفقي</button>
                   </div>
                   <div className="text-center font-mono text-[10px] text-slate-500 bg-slate-900 py-1.5 rounded-lg border border-slate-800">
                     ID: {doc.docId}
                   </div>
                </div>
              </div>

              {/* Canvas Area (Center) */}
              <div className="flex-1 bg-[#050810] overflow-y-auto p-8 flex justify-center custom-scrollbar relative">
                
                <style>
                  {`
                    @media print {
                      body * { visibility: hidden !important; }
                      .print-area, .print-area * { visibility: visible !important; }
                      .print-area { position: absolute; left: 0; top: 0; margin: 0; padding: 0; background: white; box-shadow: none !important; width: 100%; border: none !important; }
                      .no-print { display: none !important; }
                      .print-only { display: block !important; }
                      @page { size: ${doc.orientation === 'portrait' ? 'A4 portrait' : 'A4 landscape'}; margin: 15mm; }
                    }
                  `}
                </style>

                {doc.pages.map(page => (
                  <div 
                    key={page.id}
                    ref={printAreaRef}
                    className="print-area bg-white text-black shadow-2xl relative transition-all duration-300 border border-slate-200 flex flex-col"
                    style={{ 
                      width: doc.orientation === 'portrait' ? '210mm' : '297mm',
                      minHeight: doc.orientation === 'portrait' ? '297mm' : '210mm',
                      padding: '20mm',
                      fontFamily: '"Traditional Arabic", "Times New Roman", serif'
                    }}
                    onClick={() => setSelectedElement(null)}
                  >
                    {/* Elements Render */}
                    {page.elements.map(el => (
                      <div 
                        key={el.id} 
                        className={`group relative mb-2 border-2 border-transparent hover:border-violet-300 p-2 rounded transition-all ${selectedElement === el.id ? 'border-violet-500 bg-violet-50/30' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setSelectedElement(el.id); }}
                        style={el.style?.margin === 'auto' ? { display: 'flex', justifyContent: 'center' } : {}}
                      >
                        {/* Editor Controls for Element (No Print) */}
                        {selectedElement === el.id && (
                          <div className="absolute -top-12 left-0 bg-slate-900 text-white rounded-xl shadow-xl flex items-center gap-1 p-1.5 no-print z-50 border border-slate-700">
                            {(el.type === 'text' || el.type === 'smart_field' || el.type === 'header' || el.type === 'footer') ? (
                              <>
                                <button onClick={() => updateElement(page.id, el.id, { style: { ...el.style, fontWeight: el.style?.fontWeight === 'bold' ? 'normal' : 'bold' }})} className="p-2 hover:bg-violet-600 rounded-lg transition-colors"><Bold size={16}/></button>
                                <button onClick={() => updateElement(page.id, el.id, { style: { ...el.style, textAlign: 'right' }})} className="p-2 hover:bg-violet-600 rounded-lg transition-colors"><AlignRight size={16}/></button>
                                <button onClick={() => updateElement(page.id, el.id, { style: { ...el.style, textAlign: 'center' }})} className="p-2 hover:bg-violet-600 rounded-lg transition-colors"><AlignCenter size={16}/></button>
                                <button onClick={() => updateElement(page.id, el.id, { style: { ...el.style, textAlign: 'left' }})} className="p-2 hover:bg-violet-600 rounded-lg transition-colors"><AlignLeft size={16}/></button>
                              </>
                            ) : null}
                            <div className="w-[1px] h-6 bg-slate-700 mx-1"></div>
                            <button onClick={(e) => { e.stopPropagation(); removeElement(page.id, el.id); }} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"><Trash2 size={16}/></button>
                          </div>
                        )}

                        {/* Rendering actual content */}
                        {el.type === 'text' || el.type === 'smart_field' || el.type === 'header' || el.type === 'footer' || el.type === 'signature' ? (
                          <div className="w-full">
                            <div className="print-only hidden whitespace-pre-wrap" style={el.style}>{replaceSmartFields(el.content)}</div>
                            <textarea 
                              value={el.content}
                              onChange={(e) => { updateElement(page.id, el.id, { content: e.target.value }); handleTextareaResize(e); }}
                              onFocus={handleTextareaResize}
                              className="w-full bg-transparent resize-none outline-none overflow-hidden no-print"
                              style={{ ...el.style, minHeight: '3em' }}
                              placeholder="اكتب نصاً..."
                            />
                          </div>
                        ) : el.type === 'table' || el.type === 'grades_box' ? (
                          <div className="w-full overflow-x-auto print-overflow-visible">
                            <table className="w-full border-collapse border-2 border-black text-center" style={{ tableLayout: 'fixed' }}>
                              <tbody>
                                {el.content.data && el.content.data.map((row: any[], rIdx: number) => (
                                  <tr key={rIdx}>
                                    {row.map((cell: string, cIdx: number) => (
                                      <td key={cIdx} className={`border border-black p-2 relative ${rIdx === 0 ? 'bg-gray-100 font-bold' : ''}`}>
                                        <div className="print-only hidden whitespace-pre-wrap">{cell}</div>
                                        <textarea 
                                          value={cell}
                                          onChange={(e) => {
                                            const newData = [...el.content.data];
                                            newData[rIdx][cIdx] = e.target.value;
                                            updateElement(page.id, el.id, { content: { ...el.content, data: newData } });
                                            handleTextareaResize(e);
                                          }}
                                          className={`w-full bg-transparent text-center outline-none resize-none no-print ${rIdx === 0 ? 'font-bold' : ''}`}
                                          rows={1}
                                        />
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : el.type === 'notes_box' ? (
                           <div style={el.style} className="w-full">
                             <div className="print-only hidden whitespace-pre-wrap">{el.content}</div>
                             <textarea 
                                value={el.content}
                                onChange={(e) => { updateElement(page.id, el.id, { content: e.target.value }); handleTextareaResize(e); }}
                                className="w-full bg-transparent resize-none outline-none overflow-hidden no-print h-full min-h-[60px]"
                             />
                           </div>
                        ) : el.type === 'divider' ? (
                           <hr className="border-t-2 border-black my-4 w-full" />
                        ) : el.type === 'qr' ? (
                           <div className="flex flex-col items-center justify-center p-2 border-2 border-black rounded-lg w-fit" style={el.style}>
                             <QrCode size={64} className="mb-1" />
                             <span className="text-[8px] font-mono font-bold text-center">{el.content}</span>
                           </div>
                        ) : el.type === 'barcode' ? (
                           <div className="flex flex-col items-center justify-center p-2 border-2 border-black rounded-lg w-fit" style={el.style}>
                             <ScanBarcode size={64} className="mb-1 w-32" />
                             <span className="text-[10px] font-mono font-bold tracking-widest">{el.content}</span>
                           </div>
                        ) : el.type === 'stamp' ? (
                           <div style={el.style} className="relative">
                             <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase transform -rotate-12 opacity-80 whitespace-pre-wrap text-center">
                               {el.content}
                             </div>
                             <div className="w-full h-full border-2 border-current rounded-full m-1"></div>
                           </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --------- GENERATOR TAB --------- */}
        <AnimatePresence mode="wait">
          {activeTab === 'generator' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 p-8 overflow-y-auto flex items-center justify-center">
              <div className="w-full max-w-3xl bg-[#0f172a] rounded-3xl border border-slate-800 p-10 shadow-2xl">
                <div className="text-center mb-10">
                  <div className="w-20 h-20 bg-violet-500/20 text-violet-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                    <Layers size={40} />
                  </div>
                  <h2 className="text-3xl font-black text-white mb-2">مولد المستندات الجماعي</h2>
                  <p className="text-slate-400">توليد آلاف المستندات، الكشوفات، والشهادات بنقرة واحدة من قواعد البيانات.</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">نوع المستند</label>
                    <select className="w-full bg-[#0B1120] border border-slate-700 rounded-xl p-4 text-white focus:border-violet-500 outline-none">
                      <option>كشوف درجات فردية (شهادات)</option>
                      <option>كشوف حضور مجمعة</option>
                      <option>أرقام جلوس امتحانات</option>
                      <option>تقارير أداء للكنترول</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">المستهدفون</label>
                    <select className="w-full bg-[#0B1120] border border-slate-700 rounded-xl p-4 text-white focus:border-violet-500 outline-none">
                      <option>الصف التاسع (جميع الشعب)</option>
                      <option>الثالث الثانوي</option>
                      <option>المعلمين</option>
                    </select>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 flex items-center justify-between mb-8">
                  <div>
                    <h4 className="font-bold text-white">النتيجة المتوقعة</h4>
                    <p className="text-sm text-slate-400 mt-1">سيتم توليد 145 مستند PDF منفصل مع إحصائيات عامة.</p>
                  </div>
                  <div className="text-3xl font-black text-emerald-400 font-mono">145<span className="text-sm text-slate-500 ml-1">ملف</span></div>
                </div>

                <button className="w-full bg-violet-600 hover:bg-violet-500 text-white py-5 rounded-2xl font-black text-lg shadow-lg shadow-violet-600/30 flex items-center justify-center gap-3 transition-all">
                  <Network size={24} /> بدء عملية التوليد الجماعي
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --------- ARCHIVE TAB --------- */}
        <AnimatePresence mode="wait">
          {activeTab === 'archive' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 p-8 overflow-y-auto">
              <div className="max-w-6xl mx-auto bg-[#0f172a] rounded-3xl border border-slate-800 p-8 shadow-2xl min-h-full">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-white flex items-center gap-3">
                    <Search className="text-cyan-400" size={28} />
                    نظام الأرشفة الذكية
                  </h2>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="ابحث برقم المستند، الطالب، أو الكلمة المفتاحية..." 
                      className="bg-[#0B1120] border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-cyan-500 outline-none w-80"
                    />
                    <button className="bg-cyan-600 text-white px-6 rounded-xl font-bold hover:bg-cyan-500 transition-colors">بحث</button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 text-sm">
                        <th className="pb-4 font-bold">معرف المستند (ID)</th>
                        <th className="pb-4 font-bold">عنوان المستند</th>
                        <th className="pb-4 font-bold">التصنيف</th>
                        <th className="pb-4 font-bold">تاريخ الإنشاء</th>
                        <th className="pb-4 font-bold">الحالة</th>
                        <th className="pb-4 font-bold">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300 text-sm">
                      {[
                        { id: 'RQM-2028-EXAM-0012', title: 'امتحان رياضيات - نهائي', type: 'امتحانات', date: '2028/05/10', status: 'مصدق' },
                        { id: 'RQM-2028-GRD-0045', title: 'كشف درجات الصف التاسع', type: 'كشوفات', date: '2028/05/09', status: 'مسودة' },
                        { id: 'RQM-2028-MEMO-0089', title: 'تعميم إداري رقم 5', type: 'إداري', date: '2028/05/01', status: 'مصدق' },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                          <td className="py-4 font-mono text-cyan-400">{row.id}</td>
                          <td className="py-4 font-bold">{row.title}</td>
                          <td className="py-4"><span className="bg-slate-800 px-3 py-1 rounded-full text-xs">{row.type}</span></td>
                          <td className="py-4 font-mono">{row.date}</td>
                          <td className="py-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${row.status === 'مصدق' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="py-4 flex gap-2">
                            <button className="text-slate-400 hover:text-white"><Printer size={16} /></button>
                            <button className="text-slate-400 hover:text-white"><Download size={16} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --------- SETTINGS TAB --------- */}
        <AnimatePresence mode="wait">
          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 flex justify-center p-8 overflow-y-auto">
              <div className="w-full max-w-4xl bg-[#0f172a] rounded-3xl border border-slate-800 p-8 shadow-2xl h-fit">
                <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-6">
                  <div className="p-3 bg-violet-500/20 text-violet-400 rounded-xl"><Settings size={24} /></div>
                  <h2 className="text-2xl font-black text-white">الإعدادات والمحركات المركزية</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Variables Engine */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Grid className="text-cyan-400" size={18} /> محرك البيانات الذكية (Global Variables)
                    </h3>
                    <p className="text-slate-400 mb-6 text-sm">تعديل هذه البيانات سيقوم بتحديث آلاف المستندات المرتبطة تلقائياً (Zero-Effort Updates).</p>
                    
                    <div className="space-y-4">
                      {Object.entries(sysSettings).map(([key, value]) => (
                        <div key={key}>
                          <label className="text-xs font-bold text-slate-300 mb-1 block">
                            {key === 'schoolName' ? 'اسم المدرسة' : key === 'teacherName' ? 'اسم المعلم' : key === 'subject' ? 'المادة الدراسية' : key === 'grade' ? 'الصف' : key === 'term' ? 'الفصل' : key === 'principalName' ? 'اسم المدير' : key === 'directorate' ? 'المديرية' : 'السنة الدراسية'}
                            <span className="text-[10px] text-slate-500 ml-2 font-mono">{'{{...}}'}</span>
                          </label>
                          <input 
                            type="text"
                            value={value}
                            onChange={(e) => setSysSettings({...sysSettings, [key]: e.target.value})}
                            className="w-full bg-[#0B1120] border border-slate-700 rounded-xl p-3 text-white focus:border-violet-500 outline-none transition-colors text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Roles & Backups */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Shield className="text-emerald-400" size={18} /> محرك الصلاحيات (RBAC)
                      </h3>
                      <div className="bg-[#0B1120] border border-slate-800 rounded-2xl p-4 space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-bold text-white">مدير النظام</span>
                          <span className="text-emerald-400 text-xs">جميع الصلاحيات</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-bold text-slate-300">مدير المدرسة</span>
                          <span className="text-slate-500 text-xs">إدارة الوثائق واعتمادها</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-bold text-slate-300">الكنترول</span>
                          <span className="text-slate-500 text-xs">قراءة الدرجات فقط</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <DatabaseBackup className="text-amber-400" size={18} /> النسخ الاحتياطي (Local SQLite)
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <button className="bg-slate-800 hover:bg-slate-700 text-white p-4 rounded-2xl flex flex-col items-center gap-2 transition-colors border border-slate-700">
                          <Download size={20} className="text-slate-400" />
                          <span className="text-sm font-bold">أخذ نسخة محلية</span>
                        </button>
                        <button className="bg-slate-800 hover:bg-slate-700 text-white p-4 rounded-2xl flex flex-col items-center gap-2 transition-colors border border-slate-700">
                          <DatabaseBackup size={20} className="text-slate-400" />
                          <span className="text-sm font-bold">المزامنة السحابية</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end pt-6 border-t border-slate-800">
                  <button onClick={() => setActiveTab('editor')} className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-violet-600/20 transition-all flex items-center gap-2">
                    <Check size={20} /> حفظ الإعدادات المركزية
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
