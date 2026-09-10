import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Zap, Activity, Eye, LineChart, Magnet, Thermometer, 
  Box, Upload, Wand2, Type, MousePointer2, Move, RotateCw, 
  Trash2, Copy, Check, Search, GripHorizontal
} from 'lucide-react';

type PhysicsEditorProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (elements: any[]) => void;
  initialCategory?: string;
};

const PHYSICS_CATEGORIES = [
  { id: 'electricity', label: 'الكهرباء', icon: Zap },
  { id: 'mechanics', label: 'الميكانيكا', icon: Activity },
  { id: 'optics', label: 'البصريات', icon: Eye },
  { id: 'magnetism', label: 'المغناطيسية', icon: Magnet },
  { id: 'thermo', label: 'الحرارة', icon: Thermometer },
  { id: 'modern', label: 'الفيزياء الحديثة', icon: Box },
];

const ELEMENTS_DB = {
  electricity: [
    { id: 'resistor', name: 'مقاومة', svg: '<svg viewBox="0 0 100 40" stroke="currentColor" stroke-width="2" fill="none"><path d="M0,20 L20,20 L25,10 L35,30 L45,10 L55,30 L65,10 L75,30 L80,20 L100,20"/></svg>' },
    { id: 'battery', name: 'بطارية', svg: '<svg viewBox="0 0 100 40" stroke="currentColor" stroke-width="2" fill="none"><path d="M0,20 L40,20 M40,10 L40,30 M60,5 L60,35 M60,20 L100,20"/></svg>' },
    { id: 'capacitor', name: 'مكثف', svg: '<svg viewBox="0 0 100 40" stroke="currentColor" stroke-width="2" fill="none"><path d="M0,20 L45,20 M45,10 L45,30 M55,10 L55,30 M55,20 L100,20"/></svg>' },
    { id: 'inductor', name: 'ملف حث', svg: '<svg viewBox="0 0 100 40" stroke="currentColor" stroke-width="2" fill="none"><path d="M0,20 L20,20 C20,10 35,10 35,20 C35,10 50,10 50,20 C50,10 65,10 65,20 C65,10 80,10 80,20 L100,20"/></svg>' },
    { id: 'switch', name: 'مفتاح', svg: '<svg viewBox="0 0 100 40" stroke="currentColor" stroke-width="2" fill="none"><path d="M0,20 L30,20 M30,20 L60,10 M70,20 L100,20"/><circle cx="30" cy="20" r="2" fill="currentColor"/><circle cx="70" cy="20" r="2" fill="currentColor"/></svg>' },
    { id: 'ammeter', name: 'أميتر (A)', svg: '<svg viewBox="0 0 100 40" stroke="currentColor" stroke-width="2" fill="none"><path d="M0,20 L30,20 M70,20 L100,20"/><circle cx="50" cy="20" r="18" fill="white" stroke="currentColor"/><text x="50" y="26" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="currentColor" stroke="none">A</text></svg>' },
    { id: 'voltmeter', name: 'فولتميتر (V)', svg: '<svg viewBox="0 0 100 40" stroke="currentColor" stroke-width="2" fill="none"><path d="M0,20 L30,20 M70,20 L100,20"/><circle cx="50" cy="20" r="18" fill="white" stroke="currentColor"/><text x="50" y="26" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="currentColor" stroke="none">V</text></svg>' },
    { id: 'lamp', name: 'مصباح', svg: '<svg viewBox="0 0 100 40" stroke="currentColor" stroke-width="2" fill="none"><circle cx="50" cy="20" r="15"/><path d="M0,20 L35,20 M65,20 L100,20 M40,10 L60,30 M40,30 L60,10"/></svg>' },
    { id: 'diode', name: 'دايود', svg: '<svg viewBox="0 0 100 40" stroke="currentColor" stroke-width="2" fill="none"><path d="M0,20 L40,20 M60,20 L100,20 M40,10 L40,30 L60,20 Z M60,10 L60,30"/></svg>' },
    { id: 'transistor', name: 'ترانزستور', svg: '<svg viewBox="0 0 100 100" stroke="currentColor" stroke-width="2" fill="none"><circle cx="50" cy="50" r="30"/><line x1="35" y1="35" x2="35" y2="65"/><line x1="35" y1="50" x2="20" y2="50"/><line x1="35" y1="40" x2="60" y2="25"/><line x1="35" y1="60" x2="60" y2="75"/></svg>' },
    { id: 'wire', name: 'توصيلة سلك', svg: '<svg viewBox="0 0 100 40" stroke="currentColor" stroke-width="2" fill="none"><path d="M0,20 L100,20"/></svg>' },
  ],
  mechanics: [
    { id: 'mass', name: 'كتلة مربعة', svg: '<svg viewBox="0 0 100 100" stroke="currentColor" stroke-width="2" fill="none"><rect x="25" y="25" width="50" height="50"/><text x="50" y="58" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="currentColor" stroke="none">m</text></svg>' },
    { id: 'pulley', name: 'بكرة ثابتة', svg: '<svg viewBox="0 0 100 100" stroke="currentColor" stroke-width="2" fill="none"><circle cx="50" cy="50" r="30"/><circle cx="50" cy="50" r="5" fill="currentColor"/><path d="M50,20 L50,0 M20,50 L20,100 M80,50 L80,100"/></svg>' },
    { id: 'inclined_plane', name: 'مستوى مائل', svg: '<svg viewBox="0 0 100 100" stroke="currentColor" stroke-width="2" fill="none"><path d="M10,90 L90,90 L90,10 Z"/><text x="25" y="85" font-family="sans-serif" font-size="12" font-weight="bold" fill="currentColor" stroke="none">θ</text></svg>' },
    { id: 'force_vector', name: 'سهم قوة', svg: '<svg viewBox="0 0 100 40" stroke="currentColor" stroke-width="3" fill="none"><path d="M0,20 L90,20 M80,10 L95,20 L80,30"/><text x="45" y="15" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="currentColor" stroke="none">F</text></svg>' },
    { id: 'pendulum', name: 'بندول بسيط', svg: '<svg viewBox="0 0 100 100" stroke="currentColor" stroke-width="2" fill="none"><line x1="50" y1="0" x2="50" y2="10"/><line x1="20" y1="10" x2="80" y2="10"/><line x1="50" y1="10" x2="30" y2="70"/><circle cx="30" cy="70" r="10"/></svg>' },
    { id: 'gear', name: 'ترس', svg: '<svg viewBox="0 0 100 100" stroke="currentColor" stroke-width="2" fill="none"><circle cx="50" cy="50" r="25"/><path d="M50,15 L50,5 M50,95 L50,85 M15,50 L5,50 M95,50 L85,50 M25,25 L18,18 M75,75 L82,82 M25,75 L18,82 M75,25 L82,18"/></svg>' },
  ],
  optics: [
    { id: 'convex_lens', name: 'عدسة محدبة', svg: '<svg viewBox="0 0 60 100" stroke="currentColor" stroke-width="2" fill="none"><path d="M30,10 Q50,50 30,90 Q10,50 30,10 Z" fill="rgba(59,130,246,0.1)"/></svg>' },
    { id: 'concave_lens', name: 'عدسة مقعرة', svg: '<svg viewBox="0 0 60 100" stroke="currentColor" stroke-width="2" fill="none"><path d="M15,10 Q30,50 15,90 L45,90 Q30,50 45,10 Z" fill="rgba(59,130,246,0.1)"/></svg>' },
    { id: 'convex_mirror', name: 'مرآة محدبة', svg: '<svg viewBox="0 0 60 100" stroke="currentColor" stroke-width="2" fill="none"><path d="M20,10 Q40,50 20,90" stroke-dasharray="2,2"/><path d="M20,10 Q40,50 20,90" fill="none"/></svg>' },
    { id: 'flat_mirror', name: 'مرآة مستوية', svg: '<svg viewBox="0 0 40 100" stroke="currentColor" stroke-width="2" fill="none"><path d="M20,10 L20,90"/><path d="M20,20 L30,10 M20,40 L30,30 M20,60 L30,50 M20,80 L30,70"/></svg>' },
    { id: 'light_ray', name: 'شعاع ضوئي', svg: '<svg viewBox="0 0 100 40" stroke="#ef4444" stroke-width="2" fill="none"><path d="M0,20 L90,20 M80,10 L95,20 L80,30"/></svg>' },
    { id: 'prism', name: 'منشور زجاجي', svg: '<svg viewBox="0 0 100 100" stroke="currentColor" stroke-width="2" fill="none"><path d="M50,10 L90,90 L10,90 Z" fill="rgba(59,130,246,0.05)"/></svg>' },
  ],
  magnetism: [
    { id: 'magnet', name: 'مغناطيس مستقيم', svg: '<svg viewBox="0 0 100 40" stroke="currentColor" stroke-width="2" fill="none"><rect x="10" y="10" width="80" height="20"/><line x1="50" y1="10" x2="50" y2="30"/><text x="30" y="25" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="currentColor" stroke="none">N</text><text x="70" y="25" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="currentColor" stroke="none">S</text></svg>' },
    { id: 'compass', name: 'بوصلة', svg: '<svg viewBox="0 0 100 100" stroke="currentColor" stroke-width="2" fill="none"><circle cx="50" cy="50" r="40"/><path d="M50,20 L60,50 L50,80 L40,50 Z" fill="currentColor" opacity="0.2"/><line x1="50" y1="20" x2="50" y2="80" stroke="#ef4444"/><circle cx="50" cy="50" r="2" fill="currentColor"/></svg>' },
    { id: 'solenoid', name: 'ملف حلزوني', svg: '<svg viewBox="0 0 100 60" stroke="currentColor" stroke-width="2" fill="none"><path d="M0,30 L20,30 C20,10 30,10 30,30 C30,50 40,50 40,30 C40,10 50,10 50,30 C50,50 60,50 60,30 C60,10 70,10 70,30 L100,30"/></svg>' },
    { id: 'field_line', name: 'خط مجال', svg: '<svg viewBox="0 0 100 60" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4" fill="none"><path d="M10,30 Q50,0 90,30"/><path d="M45,10 L55,15 L45,20"/></svg>' },
    { id: 'conductor', name: 'موصل مستقيم', svg: '<svg viewBox="0 0 100 40" stroke="currentColor" stroke-width="4" fill="none"><line x1="0" y1="20" x2="100" y2="20"/><circle cx="50" cy="20" r="10" fill="white" stroke-width="1"/><text x="50" y="25" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="currentColor" stroke="none">I</text></svg>' },
  ]

};

const TEMPLATES_DB = [
  { id: 'series', name: 'توصيل توالي', category: 'electricity' },
  { id: 'parallel', name: 'توصيل توازي', category: 'electricity' },
  { id: 'ohm', name: 'قانون أوم', category: 'electricity' },
  { id: 'lens', name: 'تكون الصور (محدبة)', category: 'optics' },
  { id: 'pulley_sys', name: 'نظام بكرات', category: 'mechanics' },
  { id: 'inclined', name: 'مستوى مائل', category: 'mechanics' },
];

export default function PhysicsEditor({ isOpen, onClose, onSave, initialCategory = 'electricity' }: PhysicsEditorProps) {
  const [activeTab, setActiveTab] = useState<'elements' | 'templates' | 'ai' | 'upload'>('elements');
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [elements, setElements] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  if (!isOpen) return null;

  const handleAddElement = (el: any) => {
    const newElement = {
      ...el,
      uid: Math.random().toString(36).substr(2, 9),
      x: 200 + Math.random() * 100,
      y: 150 + Math.random() * 100,
      rotation: 0,
      scale: 1,
    };
    setElements([...elements, newElement]);
    setSelectedId(newElement.uid);
  };

  const handleDelete = () => {
    if (selectedId) {
      setElements(elements.filter(e => e.uid !== selectedId));
      setSelectedId(null);
    }
  };

  const handleRotate = () => {
    if (selectedId) {
      setElements(elements.map(e => 
        e.uid === selectedId ? { ...e, rotation: (e.rotation + 45) % 360 } : e
      ));
    }
  };

  const handlePointerDown = (e: React.PointerEvent, uid: string) => {
    e.stopPropagation();
    setSelectedId(uid);
    setIsDragging(true);
    
    // Find the element
    const el = elements.find(e => e.uid === uid);
    if (el && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - el.x;
      const y = e.clientY - rect.top - el.y;
      setDragOffset({ x, y });
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging && selectedId && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - dragOffset.x;
      const y = e.clientY - rect.top - dragOffset.y;
      
      setElements(elements.map(el => 
        el.uid === selectedId ? { ...el, x, y } : el
      ));
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const generateWithAi = () => {
    if (!aiPrompt.trim()) return;
    setIsAiGenerating(true);
    
    setTimeout(() => {
      setIsAiGenerating(false);
      // Mock generation: adds a battery and two resistors
      const newElements = [
        { uid: '1', ...ELEMENTS_DB.electricity[1], x: 200, y: 300, rotation: 0, scale: 1 },
        { uid: '2', ...ELEMENTS_DB.electricity[0], x: 200, y: 100, rotation: 0, scale: 1 },
        { uid: '3', ...ELEMENTS_DB.electricity[0], x: 400, y: 200, rotation: 90, scale: 1 },
        { uid: '4', ...ELEMENTS_DB.electricity[7], x: 100, y: 200, rotation: 90, scale: 1.5 }, // wires
      ];
      setElements(newElements);
      setAiPrompt('');
    }, 2000);
  };

  const applyTemplate = (templateId: string) => {
    // Mock template application
    setElements([
      { uid: 't1', ...ELEMENTS_DB.electricity[1], x: 250, y: 300, rotation: 0, scale: 1 },
      { uid: 't2', ...ELEMENTS_DB.electricity[7], x: 150, y: 300, rotation: 0, scale: 1 },
      { uid: 't3', ...ELEMENTS_DB.electricity[0], x: 250, y: 150, rotation: 0, scale: 1 },
      { uid: 't4', ...ELEMENTS_DB.electricity[5], x: 400, y: 225, rotation: 90, scale: 1 },
    ]);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-[1400px] h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 bg-slate-50 shrink-0">
          <div className="flex items-center gap-3 text-slate-800">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Zap size={20} />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">استوديو الفيزياء (Vector Studio)</h2>
              <p className="text-xs text-slate-500 font-serif">محرر رسومات متجهة عالي الدقة</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onSave(elements)}
              className="bg-slate-800 text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-slate-700 transition-colors"
            >
              <Check size={16} />
              إدراج في الامتحان
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Right Sidebar: Tools */}
          <div className="w-80 bg-slate-50 border-l border-slate-200 flex flex-col shrink-0">
            {/* Tabs */}
            <div className="flex border-b border-slate-200 bg-white">
              {[
                { id: 'elements', label: 'العناصر', icon: Box },
                { id: 'templates', label: 'قوالب', icon: GripHorizontal },
                { id: 'ai', label: 'AI رسم', icon: Wand2 },
                { id: 'upload', label: 'تحويل صورة', icon: Upload },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-3 flex flex-col items-center gap-1 text-xs font-bold border-b-2 transition-colors ${activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === 'elements' && (
                <div className="flex flex-col h-full">
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {PHYSICS_CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors ${activeCategory === cat.id ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                      >
                        <cat.icon size={12} />
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Elements Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {(ELEMENTS_DB[activeCategory as keyof typeof ELEMENTS_DB] || ELEMENTS_DB.electricity).map((el) => (
                      <button
                        key={el.id}
                        onClick={() => handleAddElement(el)}
                        className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center gap-3 hover:border-blue-400 hover:shadow-md transition-all group"
                      >
                        <div 
                          className="w-full h-12 text-slate-700 flex items-center justify-center group-hover:text-blue-600 transition-colors"
                          dangerouslySetInnerHTML={{ __html: el.svg }}
                        />
                        <span className="text-xs font-bold text-slate-600">{el.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'templates' && (
                <div className="space-y-3">
                  {TEMPLATES_DB.map(t => (
                    <button
                      key={t.id}
                      onClick={() => applyTemplate(t.id)}
                      className="w-full bg-white border border-slate-200 p-4 rounded-xl text-right hover:border-blue-400 hover:shadow-md transition-all flex items-center justify-between group"
                    >
                      <div>
                        <div className="font-bold text-sm text-slate-800">{t.name}</div>
                        <div className="text-xs text-slate-500 mt-1">{PHYSICS_CATEGORIES.find(c => c.id === t.category)?.label}</div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        <Move size={14} />
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="flex flex-col h-full space-y-4">
                  <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm font-bold flex items-start gap-3">
                    <Wand2 size={20} className="shrink-0 mt-0.5" />
                    <p>اكتب وصفاً للرسم الذي تريده وسيقوم الذكاء الاصطناعي برسمه كعناصر متجهة قابلة للتعديل.</p>
                  </div>
                  
                  <div className="flex-1">
                    <textarea 
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="مثال: دائرة تحتوي على بطارية 12V ومقاومتين 5 أوم و 10 أوم على التوالي مع فولتميتر على المقاومة الثانية..."
                      className="w-full h-40 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
                    />
                  </div>

                  <button 
                    onClick={generateWithAi}
                    disabled={!aiPrompt.trim() || isAiGenerating}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isAiGenerating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>جاري التحليل والرسم...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 size={18} />
                        <span>توليد الرسم التلقائي</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {activeTab === 'upload' && (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="w-full aspect-square border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center bg-slate-50 text-slate-500 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">
                    <Upload size={32} className="mb-3" />
                    <span className="font-bold text-sm">اسحب صورة لسؤال فيزياء هنا</span>
                    <span className="text-xs mt-2 opacity-70 px-4 text-center">سيقوم النظام باكتشاف الرسم وتحويله إلى عناصر Vector قابلة للتعديل</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 bg-slate-100 relative overflow-hidden flex flex-col">
            {/* Top Toolbar */}
            <div className="h-12 bg-white border-b border-slate-200 flex items-center px-4 justify-between shrink-0 shadow-sm z-10">
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded hover:bg-slate-100 flex items-center justify-center text-slate-600"><MousePointer2 size={16} /></button>
                <div className="w-px h-5 bg-slate-200 mx-1"></div>
                <button onClick={handleRotate} disabled={!selectedId} className={`w-8 h-8 rounded flex items-center justify-center ${selectedId ? 'hover:bg-slate-100 text-slate-600' : 'text-slate-300'}`}><RotateCw size={16} /></button>
                <button className={`w-8 h-8 rounded flex items-center justify-center ${selectedId ? 'hover:bg-slate-100 text-slate-600' : 'text-slate-300'}`}><Copy size={16} /></button>
                <button onClick={handleDelete} disabled={!selectedId} className={`w-8 h-8 rounded flex items-center justify-center ${selectedId ? 'hover:bg-red-50 text-red-600' : 'text-slate-300'}`}><Trash2 size={16} /></button>
              </div>
              
              <div className="flex items-center gap-3 text-xs font-bold text-slate-500 font-mono" dir="ltr">
                <span>W: 800px</span>
                <span>H: 600px</span>
                <span className="bg-slate-200 px-2 py-1 rounded">100%</span>
              </div>
            </div>

            {/* Actual Canvas */}
            <div 
              className="flex-1 overflow-auto relative p-8 select-none"
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              onClick={() => setSelectedId(null)}
            >
              <div 
                ref={canvasRef}
                className="w-[800px] h-[600px] bg-white shadow-lg relative mx-auto"
                style={{ 
                  backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              >
                {/* SVG Connections Layer (Mock for now, could draw lines between nodes) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* We can dynamically render paths connecting components here based on logic */}
                </svg>

                {/* Render Elements */}
                {elements.map((el) => (
                  <div
                    key={el.uid}
                    onPointerDown={(e) => handlePointerDown(e, el.uid)}
                    className={`absolute cursor-move transition-shadow ${selectedId === el.uid ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-2 hover:ring-slate-300 hover:ring-offset-1'}`}
                    style={{
                      left: el.x,
                      top: el.y,
                      transform: `rotate(${el.rotation}deg) scale(${el.scale})`,
                      width: el.id === 'wire' ? 100 : el.id.includes('lens') ? 40 : 100,
                      height: el.id.includes('lens') || el.id === 'mirror' ? 100 : 40,
                      transformOrigin: 'center center'
                    }}
                  >
                    <div 
                      className="w-full h-full text-slate-800"
                      dangerouslySetInnerHTML={{ __html: el.svg }}
                    />
                    
                    {/* Connection Points (Smart snapping anchors) */}
                    {selectedId === el.uid && (
                      <>
                        <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-crosshair"></div>
                        <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-crosshair"></div>
                      </>
                    )}
                  </div>
                ))}

                {elements.length === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 font-serif">
                    <Zap size={48} className="mb-4 opacity-20" />
                    <p>مساحة العمل فارغة</p>
                    <p className="text-sm mt-2 opacity-60">اسحب العناصر من القائمة الجانبية أو استخدم التوليد الذكي</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
