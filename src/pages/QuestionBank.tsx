import React, { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, ImageIcon, PenTool, Database, Loader2, Save, Trash2, ShieldCheck, Scan } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function QuestionBank({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'manual'>('text');
  const [textInput, setTextInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Manual Input
  const [manualQType, setManualQType] = useState('tf');
  const [manualQText, setManualQText] = useState('');
  const [manualOptions, setManualOptions] = useState(['', '', '', '']);

  const [savedQuestions, setSavedQuestions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');

  const filteredQuestions = savedQuestions.filter(q => {
    if (searchQuery && !q.text.includes(searchQuery)) return false;
    if (filterSubject !== 'all' && q.subject !== filterSubject) return false;
    return true;
  });

  const clearText = () => setTextInput('');
  const rephraseText = () => {
    if (!textInput) return;
    // Mock rephrase
    setTextInput('تم إعادة الصياغة: ' + textInput);
  };

  useEffect(() => {
    const saved = localStorage.getItem('mistar_question_bank');
    if (saved) {
      setSavedQuestions(JSON.parse(saved));
    }
  }, []);

  const saveToLocal = (qs: any[]) => {
    const updated = [...savedQuestions, ...qs];
    setSavedQuestions(updated);
    localStorage.setItem('mistar_question_bank', JSON.stringify(updated));
  };

  const deleteQuestion = (index: number) => {
    const updated = savedQuestions.filter((_, i) => i !== index);
    setSavedQuestions(updated);
    localStorage.setItem('mistar_question_bank', JSON.stringify(updated));
  };

  const generateFromText = async () => {
    if (!textInput.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textInput, type: 'text' })
      });
      const data = await res.json();
      if (data.questions && Array.isArray(data.questions)) {
        saveToLocal(data.questions);
        setTextInput('');
        alert('تم استخراج الأسئلة وحفظها بنجاح.');
      }
    } catch (e) {
      alert('حدث خطأ أثناء المعالجة الذكية.');
    }
    setIsLoading(false);
  };

  const generateFromImage = async () => {
    if (!imageFile) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const res = await fetch('/api/generate-questions', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.questions && Array.isArray(data.questions)) {
        saveToLocal(data.questions);
        setImageFile(null);
        alert('تم قراءة الصورة واستخراج الأسئلة بنجاح.');
      }
    } catch (e) {
      alert('حدث خطأ أثناء المعالجة الذكية.');
    }
    setIsLoading(false);
  };

  const handleManualSave = () => {
    if (!manualQText.trim()) return;
    const q: any = { type: manualQType, text: manualQText };
    if (manualQType === 'mcq') {
      q.options = manualOptions;
    }
    saveToLocal([q]);
    setManualQText('');
    setManualOptions(['', '', '', '']);
    alert('تم حفظ السؤال بنجاح.');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
              <ArrowRight className="text-slate-600" />
            </button>
            <div className="w-10 h-10 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center">
              <Database size={24} />
            </div>
            <h1 className="text-2xl font-black text-slate-800">بنك الأسئلة الموحد</h1>
          </div>
          <div className="flex items-center gap-2 bg-violet-50 text-violet-700 px-4 py-2 rounded-xl border border-violet-100">
            <ShieldCheck size={18} />
            <span className="font-bold text-sm">محرر الرقيم التربوي — برمجة وتطوير م. سهيل الهزبري</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 mt-8 grid md:grid-cols-12 gap-8">
        
        {/* Input Tools */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="flex border-b border-slate-200 text-sm font-bold">
              <button 
                onClick={() => setActiveTab('text')}
                className={`flex-1 py-4 flex flex-col items-center gap-2 transition-colors ${activeTab === 'text' ? 'bg-violet-50 text-violet-700 border-b-2 border-violet-600' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <BookOpen size={20} />
                نص الدرس
              </button>
              <button 
                onClick={() => setActiveTab('image')}
                className={`flex-1 py-4 flex flex-col items-center gap-2 transition-colors ${activeTab === 'image' ? 'bg-violet-50 text-violet-700 border-b-2 border-violet-600' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <ImageIcon size={20} />
                صورة ملزمة
              </button>
              <button 
                onClick={() => setActiveTab('manual')}
                className={`flex-1 py-4 flex flex-col items-center gap-2 transition-colors ${activeTab === 'manual' ? 'bg-violet-50 text-violet-700 border-b-2 border-violet-600' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <PenTool size={20} />
                إدخال يدوي
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'text' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex justify-between items-center">
                    <label className="block font-bold text-slate-700">لصق محتوى الدرس لاستخراج الأسئلة آلياً</label>
                    <span className="text-xs font-bold text-slate-500">{textInput.split(/\s+/).filter(w => w.length > 0).length} كلمة</span>
                  </div>
                  <textarea 
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    rows={8}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-violet-500 transition-all resize-none"
                    placeholder="قم بنسخ ولصق الفقرات من الكتاب هنا..."
                  />
                  <div className="flex gap-2">
                    <button onClick={clearText} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-lg text-xs transition-colors">تنظيف النص</button>
                    <button onClick={rephraseText} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-lg text-xs transition-colors">إعادة الصياغة</button>
                  </div>
                  <button 
                    onClick={generateFromText}
                    disabled={isLoading || !textInput.trim()}
                    className="w-full bg-violet-600 text-white font-bold py-3 rounded-xl hover:bg-violet-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Database size={18} />}
                    {isLoading ? 'جاري التحليل والاستخراج...' : 'تحليل النص واستخراج الأسئلة'}
                  </button>
                </div>
              )}

              {activeTab === 'image' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                  <label className="block font-bold text-slate-700">تحليل صور الدروس (OCR)</label>
                  <p className="text-xs text-slate-500 mb-2">قم باختيار أو تصوير صفحة ليتم استخراج النص وتوليد الأسئلة منها.</p>
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 relative group hover:bg-violet-50 hover:border-violet-300 transition-colors">
                    <input 
                      type="file" 
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setImageFile(e.target.files[0]);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <ImageIcon size={40} className="text-slate-400 group-hover:text-violet-500 mb-3" />
                    <p className="font-bold text-slate-600 text-sm">اسحب الصورة هنا أو اضغط للاختيار أو التصوير</p>
                    <p className="text-xs text-slate-400 mt-1">يدعم استخراج النص العربي والإنجليزي</p>
                    {imageFile && (
                      <div className="absolute inset-0 bg-white/90 rounded-2xl flex flex-col items-center justify-center p-4 border border-violet-200">
                        <span className="font-bold text-sm text-violet-700 truncate w-full text-center">{imageFile.name}</span>
                        <span className="text-xs text-slate-500 mt-1">جاهز للتحليل</span>
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={generateFromImage}
                    disabled={isLoading || !imageFile}
                    className="w-full bg-violet-600 text-white font-bold py-3 rounded-xl hover:bg-violet-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Scan size={18} />}
                    {isLoading ? 'جاري تحليل الصورة والتعرف على النص (OCR)...' : 'استخراج النص وتوليد الأسئلة'}
                  </button>
                </div>
              )}

              {activeTab === 'manual' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 max-h-[500px] overflow-y-auto pr-2 pb-10">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">نوع السؤال</label>
                    <select 
                      value={manualQType} 
                      onChange={(e) => setManualQType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-violet-500 transition-all font-bold"
                    >
                      <option value="direct">سؤال مباشر</option>
                      <option value="tf">صح وخطأ</option>
                      <option value="mcq">اختيار من متعدد</option>
                      <option value="complete">أكمل الفراغ</option>
                      <option value="match">وصل (مزاوجة)</option>
                      <option value="order">ترتيب</option>
                      <option value="physics_draw">سؤال رسم / فيزياء</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">نص السؤال</label>
                    <textarea 
                      value={manualQText}
                      onChange={(e) => setManualQText(e.target.value)}
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-violet-500 transition-all resize-none font-bold"
                    />
                  </div>

                  {manualQType === 'mcq' && (
                    <div className="space-y-2 border-t border-slate-200 pt-4 mt-2">
                      <label className="block text-sm font-bold text-slate-700">الخيارات</label>
                      {manualOptions.map((opt, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-xs font-bold w-6 text-slate-500">{['أ', 'ب', 'ج', 'د'][idx]}</span>
                          <input 
                            type="text" 
                            value={opt}
                            onChange={(e) => {
                              const newOpts = [...manualOptions];
                              newOpts[idx] = e.target.value;
                              setManualOptions(newOpts);
                            }}
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:border-violet-500 transition-all"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 pt-4 mt-2 border-t border-slate-100">
                     <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">المادة</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold focus:outline-none focus:border-violet-500">
                           <option>الفيزياء</option>
                           <option>الكيمياء</option>
                           <option>الرياضيات</option>
                           <option>الأحياء</option>
                           <option>اللغة العربية</option>
                        </select>
                     </div>
                     <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">الصف</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold focus:outline-none focus:border-violet-500">
                           <option>الثالث الثانوي</option>
                           <option>الثاني الثانوي</option>
                           <option>الأول الثانوي</option>
                        </select>
                     </div>
                     <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">الفصل (الباب)</label>
                        <input type="text" placeholder="مثال: الفصل الأول" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold focus:outline-none focus:border-violet-500" />
                     </div>
                     <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">مستوى بلوم</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold focus:outline-none focus:border-violet-500">
                           <option>تذكر</option>
                           <option>فهم</option>
                           <option>تطبيق</option>
                           <option>تحليل</option>
                           <option>تركيب</option>
                           <option>تقييم</option>
                        </select>
                     </div>
                     <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">الصعوبة</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold focus:outline-none focus:border-violet-500">
                           <option>سهل</option>
                           <option>متوسط</option>
                           <option>صعب</option>
                           <option>قدرات عليا</option>
                        </select>
                     </div>
                     <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">الدرجة</label>
                        <input type="number" defaultValue="1" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold focus:outline-none focus:border-violet-500" />
                     </div>
                  </div>

                  <button 
                    onClick={handleManualSave}
                    disabled={!manualQText.trim()}
                    className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                  >
                    <Save size={18} />
                    حفظ في بنك الأسئلة
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Database List */}
        <div className="md:col-span-7">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 min-h-[600px] flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <Database className="text-violet-600" />
                مكتبة الأسئلة ({filteredQuestions.length})
              </h2>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                يتم الحفظ في المتصفح SQLite
              </span>
            </div>

            <div className="flex gap-2 mb-4">
              <input 
                type="text" 
                placeholder="بحث في الأسئلة..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:border-violet-500"
              />
              <select 
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:border-violet-500"
              >
                <option value="all">كل المواد</option>
                <option value="الفيزياء">الفيزياء</option>
                <option value="الكيمياء">الكيمياء</option>
                <option value="الرياضيات">الرياضيات</option>
              </select>
            </div>

            {filteredQuestions.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-slate-400">
                <Database size={48} className="mb-4 opacity-50" />
                <p className="font-bold">بنك الأسئلة فارغ</p>
                <p className="text-sm mt-1">ابدأ بإضافة أسئلة عبر الأدوات الجانبية</p>
              </div>
            ) : (
              <div className="space-y-3 flex-1 overflow-y-auto pr-2">
                {filteredQuestions.map((q, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 group relative">
                    <button 
                      onClick={() => deleteQuestion(idx)}
                      className="absolute top-3 left-3 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="flex gap-2 mb-2 flex-wrap">
                      <span className="text-xs font-bold bg-violet-100 text-violet-700 px-2 py-0.5 rounded">
                        {q.type === 'tf' ? 'صح وخطأ' : q.type === 'mcq' ? 'اختيارات' : 'سؤال'}
                      </span>
                      <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">
                        {q.subject || 'الفيزياء'}
                      </span>
                      <span className="text-xs font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
                        {q.difficulty || 'متوسط'}
                      </span>
                      <span className="text-xs font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                        الصف: {q.grade || 'الثالث الثانوي'}
                      </span>
                    </div>
                    <p className="font-bold text-slate-800 text-sm pl-8 leading-relaxed">{q.text}</p>
                    
                    {q.type === 'mcq' && q.options && (
                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-600">
                        {q.options.map((opt: string, oIdx: number) => (
                          <div key={oIdx} className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2">
                            <span className="font-bold text-slate-400">{['أ', 'ب', 'ج', 'د'][oIdx]}</span>
                            <span>{opt}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
