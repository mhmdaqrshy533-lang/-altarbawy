import React, { useState } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { TextElement } from '../types';
import { 
  Layers, Search, ArrowUp, ArrowDown, ChevronsUp, ChevronsDown, Eye, EyeOff, Lock, Unlock, 
  Copy, Trash2, ChevronDown, ChevronRight, FileText, Plus,
  Heading, FileCode, Table, Image, AlignJustify, Sliders
} from 'lucide-react';
import { QuestionEditorModal } from './QuestionEditorModal';

export const QuestionOrganizer: React.FC = () => {
  const { 
    document, activePageIndex, setActivePage, selectedElementIds, 
    selectElement, updateElement, removeElement, duplicateElement, 
    moveQuestionUp, moveQuestionDown, moveQuestionToTop, moveQuestionToBottom, 
    addQuestion, updateMetadata
  } = useEditorStore();

  const [activeTab, setActiveTab] = useState<'questions' | 'sections'>('questions');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'flat' | 'grouped'>('flat');
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<{ element: TextElement; pageIndex: number } | null>(null);

  // Document sections tracking
  const [sectionsState, setSectionsState] = useState({
    header: { name: 'الترويسة والبيانات', visible: true, locked: false },
    intro: { name: 'التعليمات والتنبيهات', visible: true, locked: false },
    questions: { name: 'كتلة الأسئلة', visible: true, locked: false },
    tables: { name: 'الجداول والمعطيات', visible: true, locked: false },
    footer: { name: 'التذييل والتواقيع', visible: true, locked: false },
  });

  // Gather all questions across all pages with page index metadata
  const allQuestions = document.pages.flatMap((page, pageIdx) => {
    return page.elements
      .filter(el => el.type === 'text' && (el as TextElement).isQuestion)
      .map(el => ({
        element: el as TextElement,
        pageIndex: pageIdx
      }));
  });

  // Filter questions based on search query
  const filteredQuestions = allQuestions.filter(({ element }) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const qNumStr = `س${element.questionNumber || ''}`;
    const cleanText = element.content.replace(/^س\s*[\d\w\.-]+:\s*/, '');
    const typeLabel = element.questionType || 'essay';
    const marksStr = `${element.marks || 0}`;

    return (
      qNumStr.toLowerCase().includes(query) ||
      cleanText.toLowerCase().includes(query) ||
      typeLabel.toLowerCase().includes(query) ||
      marksStr.includes(query)
    );
  });

  // Group labels mapping
  const questionTypeLabels: Record<string, { label: string; color: string; bg: string }> = {
    mcq: { label: 'اختيار من متعدد', color: 'text-indigo-400', bg: 'bg-indigo-950/60 border-indigo-800' },
    tf: { label: 'صواب / خطأ', color: 'text-emerald-400', bg: 'bg-emerald-950/60 border-emerald-800' },
    essay: { label: 'مقالي / إجابة قصيرة', color: 'text-amber-400', bg: 'bg-amber-950/60 border-amber-800' },
    matching: { label: 'توصيل / زاوج', color: 'text-cyan-400', bg: 'bg-cyan-950/60 border-cyan-800' },
    fill: { label: 'أكمل الفراغ', color: 'text-purple-400', bg: 'bg-purple-950/60 border-purple-800' },
    reasoning: { label: 'علل / اذكر السبب', color: 'text-rose-400', bg: 'bg-rose-950/60 border-rose-800' },
  };

  const handleQuestionSelect = (pageIndex: number, questionId: string) => {
    setActivePage(pageIndex);
    selectElement(questionId);

    // Scroll smoothly to question element on canvas
    setTimeout(() => {
      const el = window.document.getElementById(`question-card-${questionId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const toggleGroupCollapse = (groupKey: string) => {
    setCollapsedGroups(prev => ({ ...prev, [groupKey]: !prev[groupKey] }));
  };

  const toggleSectionVisible = (key: keyof typeof sectionsState) => {
    setSectionsState(prev => ({
      ...prev,
      [key]: { ...prev[key], visible: !prev[key].visible }
    }));
  };

  const totalQuestions = allQuestions.length;
  const totalMarks = allQuestions.reduce((sum, item) => sum + (item.element.marks || 0), 0);
  const totalPages = document.pages.length;

  if (isPanelCollapsed) {
    return (
      <div className="bg-slate-900 border-l border-slate-800 p-2 flex flex-col items-center gap-3 shrink-0 z-20 select-none font-sans">
        <button 
          onClick={() => setIsPanelCollapsed(false)}
          className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow transition-all"
          title="فتح منظم الأسئلة"
        >
          <Layers size={18} />
        </button>
        <span className="text-[10px] font-black text-slate-400 [writing-mode:vertical-lr] rotate-180">
          منظم الأسئلة ({totalQuestions})
        </span>
      </div>
    );
  }

  return (
    <aside className="w-72 md:w-80 bg-slate-900 border-l border-slate-800 text-slate-200 flex flex-col shrink-0 z-20 select-none h-full font-sans" dir="rtl">
      {/* Panel Header */}
      <div className="p-3 border-b border-slate-800 flex items-center justify-between gap-2 bg-slate-950/50">
        <div className="flex items-center gap-2 text-indigo-400 font-black text-sm">
          <Layers size={18} className="stroke-[2.5]" />
          <span>منظم الورقة (Organizer)</span>
        </div>
        <button 
          onClick={() => setIsPanelCollapsed(true)}
          className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors text-xs"
          title="إخفاء اللوحة"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Main Tab Bar: Questions vs Document Sections */}
      <div className="grid grid-cols-2 p-2 gap-1 bg-slate-950 border-b border-slate-800/80 text-xs font-bold">
        <button
          onClick={() => setActiveTab('questions')}
          className={`py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'questions' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText size={14} />
          <span>الأسئلة ({totalQuestions})</span>
        </button>
        <button
          onClick={() => setActiveTab('sections')}
          className={`py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'sections' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <AlignJustify size={14} />
          <span>أقسام المستند</span>
        </button>
      </div>

      {activeTab === 'questions' ? (
        <>
          {/* Quick Add Question Bar */}
          <div className="p-2 border-b border-slate-800 bg-slate-900 flex gap-2">
            <button
              onClick={() => addQuestion(activePageIndex)}
              className="w-full py-1.5 px-3 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow"
            >
              <Plus size={15} />
              <span>إضافة سؤال جديد</span>
            </button>
          </div>

          {/* Search & View Mode Filters */}
          <div className="p-3 space-y-2 border-b border-slate-800/80 bg-slate-900">
            <div className="relative">
              <Search size={14} className="absolute right-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="بحث برقم السؤال، نوعه، أو نص..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-1.5 text-xs text-slate-200 font-bold placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute left-2.5 top-2 text-slate-400 hover:text-white text-xs font-bold"
                >
                  ×
                </button>
              )}
            </div>

            {/* View Mode Switcher */}
            <div className="grid grid-cols-2 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px] font-bold">
              <button 
                onClick={() => setViewMode('flat')}
                className={`py-1 rounded-lg transition-all ${
                  viewMode === 'flat' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                قائمة مرتبة ({filteredQuestions.length})
              </button>
              <button 
                onClick={() => setViewMode('grouped')}
                className={`py-1 rounded-lg transition-all ${
                  viewMode === 'grouped' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                مصنفة حسب النوع
              </button>
            </div>
          </div>

          {/* Questions Scrollable List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
            {filteredQuestions.length === 0 ? (
              <div className="p-8 text-center text-slate-500 space-y-2">
                <FileText size={32} className="mx-auto opacity-40" />
                <p className="text-xs font-bold">لا توجد أسئلة مطابقة للبحث</p>
              </div>
            ) : viewMode === 'flat' ? (
              /* Flat Ordered List Mode */
              filteredQuestions.map(({ element, pageIndex }) => {
                const isSelected = selectedElementIds.includes(element.id);
                const typeInfo = questionTypeLabels[element.questionType || 'essay'] || questionTypeLabels.essay;
                const cleanText = element.content.replace(/^س\s*[\d\w\.-]+:\s*/, '').replace(/\s*\[\d+\s*درجات\]$/, '');

                return (
                  <div 
                    key={element.id}
                    onClick={() => handleQuestionSelect(pageIndex, element.id)}
                    className={`group relative rounded-xl border p-2.5 transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-slate-800 border-indigo-500 shadow-md ring-1 ring-indigo-500' 
                        : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800/80'
                    } ${element.isHidden ? 'opacity-40' : ''}`}
                  >
                    {/* Question Item Header */}
                    <div className="flex items-center justify-between mb-1.5 gap-2">
                      <div className="flex items-center gap-1.5">
                        {/* Badge Question Number */}
                        <span className="bg-indigo-600 text-white font-black text-[11px] px-2 py-0.5 rounded-md shadow-sm">
                          س{element.questionNumber || 1}
                        </span>

                        {/* Badge Question Type */}
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${typeInfo.bg} ${typeInfo.color}`}>
                          {typeInfo.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* Page indicator */}
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">
                          ص {pageIndex + 1}
                        </span>

                        {/* Marks */}
                        <span className="text-[10px] font-black text-amber-400 bg-amber-950/50 border border-amber-800/50 px-1.5 py-0.5 rounded">
                          {element.marks || 5} د
                        </span>
                      </div>
                    </div>

                    {/* Question Text Preview Snippet */}
                    <p className="text-xs font-bold text-slate-300 line-clamp-2 my-1 leading-relaxed">
                      {cleanText || 'نص السؤال...'}
                    </p>

                    {/* Organizer Controls Bar */}
                    <div className="flex items-center justify-between border-t border-slate-800/80 pt-1.5 mt-2 text-slate-400">
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={(e) => { e.stopPropagation(); moveQuestionToTop(pageIndex, element.id); }}
                          className="p-1 hover:bg-slate-700 hover:text-white rounded transition-colors"
                          title="نقل لأول الامتحان (البداية)"
                        >
                          <ChevronsUp size={13} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); moveQuestionUp(pageIndex, element.id); }}
                          className="p-1 hover:bg-slate-700 hover:text-white rounded transition-colors"
                          title="تحريك للأعلى"
                        >
                          <ArrowUp size={13} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); moveQuestionDown(pageIndex, element.id); }}
                          className="p-1 hover:bg-slate-700 hover:text-white rounded transition-colors"
                          title="تحريك للأسفل"
                        >
                          <ArrowDown size={13} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); moveQuestionToBottom(pageIndex, element.id); }}
                          className="p-1 hover:bg-slate-700 hover:text-white rounded transition-colors"
                          title="نقل لآخر الامتحان (النهاية)"
                        >
                          <ChevronsDown size={13} />
                        </button>
                      </div>

                      <div className="flex items-center gap-1">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setEditingQuestion({ element, pageIndex }); }}
                          className="p-1 hover:bg-indigo-950/60 hover:text-indigo-300 rounded transition-colors"
                          title="تحرير السؤال المتقدم"
                        >
                          <Sliders size={13} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); updateElement(pageIndex, element.id, { isHidden: !element.isHidden }); }}
                          className={`p-1 hover:bg-slate-700 rounded transition-colors ${element.isHidden ? 'text-amber-400' : 'hover:text-white'}`}
                          title={element.isHidden ? 'إظهار السؤال' : 'إخفاء السؤال'}
                        >
                          {element.isHidden ? <EyeOff size={13} /> : <Eye size={13} />}
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); updateElement(pageIndex, element.id, { isLocked: !element.isLocked }); }}
                          className={`p-1 hover:bg-slate-700 rounded transition-colors ${element.isLocked ? 'text-rose-400' : 'hover:text-white'}`}
                          title={element.isLocked ? 'إلغاء قفل السؤال' : 'قفل السؤال'}
                        >
                          {element.isLocked ? <Lock size={13} /> : <Unlock size={13} />}
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); duplicateElement(pageIndex, element.id); }}
                          className="p-1 hover:bg-indigo-900/60 text-indigo-400 rounded transition-colors"
                          title="تكرار السؤال"
                        >
                          <Copy size={13} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeElement(pageIndex, element.id); }}
                          className="p-1 hover:bg-rose-900/60 text-rose-400 rounded transition-colors"
                          title="حذف السؤال"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              /* Grouped View Mode */
              Object.keys(questionTypeLabels).map(typeKey => {
                const groupTypeInfo = questionTypeLabels[typeKey];
                const groupItems = filteredQuestions.filter(q => (q.element.questionType || 'essay') === typeKey);
                if (groupItems.length === 0) return null;

                const isCollapsed = collapsedGroups[typeKey];

                return (
                  <div key={typeKey} className="rounded-xl border border-slate-800 bg-slate-950/80 overflow-hidden mb-2">
                    <div 
                      onClick={() => toggleGroupCollapse(typeKey)}
                      className="p-2.5 bg-slate-900 hover:bg-slate-850 flex items-center justify-between cursor-pointer border-b border-slate-800/80"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black ${groupTypeInfo.color}`}>
                          {groupTypeInfo.label}
                        </span>
                        <span className="text-[10px] font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                          {groupItems.length}
                        </span>
                      </div>
                      <ChevronDown size={14} className={`text-slate-400 transition-transform ${isCollapsed ? '-rotate-90' : ''}`} />
                    </div>

                    {!isCollapsed && (
                      <div className="p-2 space-y-2 bg-slate-950/40">
                        {groupItems.map(({ element, pageIndex }) => {
                          const isSelected = selectedElementIds.includes(element.id);
                          const cleanText = element.content.replace(/^س\s*[\d\w\.-]+:\s*/, '').replace(/\s*\[\d+\s*درجات\]$/, '');

                          return (
                            <div 
                              key={element.id}
                              onClick={() => handleQuestionSelect(pageIndex, element.id)}
                              className={`p-2 rounded-lg border text-xs font-bold cursor-pointer transition-all ${
                                isSelected ? 'bg-indigo-900/40 border-indigo-500 text-white' : 'bg-slate-900 hover:bg-slate-800 border-slate-800/80 text-slate-300'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-black text-indigo-400">س{element.questionNumber}</span>
                                <span className="text-[10px] text-amber-400">{element.marks} درجات</span>
                              </div>
                              <p className="line-clamp-1 text-[11px] text-slate-300">{cleanText}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </>
      ) : (
        /* Document Sections Manager Tab */
        <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
          <div className="text-[11px] font-bold text-slate-400 bg-slate-950 p-2.5 rounded-xl border border-slate-800 leading-relaxed">
            التحكم في ظهور وإظهار أقسام ورقة الامتحان الرئيسية. يمكنك إخفاء أو قفل أي قسم.
          </div>

          <div className="space-y-2">
            <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heading size={16} className="text-indigo-400" />
                <span className="text-xs font-bold">الترويسة وبيانات الجهة</span>
              </div>
              <button 
                onClick={() => toggleSectionVisible('header')}
                className={`p-1.5 rounded-lg ${sectionsState.header.visible ? 'text-emerald-400 bg-emerald-950/50' : 'text-slate-500 bg-slate-900'}`}
              >
                {sectionsState.header.visible ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
            </div>

            <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode size={16} className="text-amber-400" />
                <span className="text-xs font-bold">التعليمات وإرشادات الإجابة</span>
              </div>
              <button 
                onClick={() => toggleSectionVisible('intro')}
                className={`p-1.5 rounded-lg ${sectionsState.intro.visible ? 'text-emerald-400 bg-emerald-950/50' : 'text-slate-500 bg-slate-900'}`}
              >
                {sectionsState.intro.visible ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
            </div>

            <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-blue-400" />
                <span className="text-xs font-bold">كتلة الأسئلة الرئيسية ({totalQuestions})</span>
              </div>
              <button 
                onClick={() => toggleSectionVisible('questions')}
                className={`p-1.5 rounded-lg ${sectionsState.questions.visible ? 'text-emerald-400 bg-emerald-950/50' : 'text-slate-500 bg-slate-900'}`}
              >
                {sectionsState.questions.visible ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
            </div>

            <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Table size={16} className="text-purple-400" />
                <span className="text-xs font-bold">الجداول والرسومات المقترنة</span>
              </div>
              <button 
                onClick={() => toggleSectionVisible('tables')}
                className={`p-1.5 rounded-lg ${sectionsState.tables.visible ? 'text-emerald-400 bg-emerald-950/50' : 'text-slate-500 bg-slate-900'}`}
              >
                {sectionsState.tables.visible ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
            </div>

            <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-rose-400" />
                <span className="text-xs font-bold">التذييل والتواقيع والختم</span>
              </div>
              <button 
                onClick={() => toggleSectionVisible('footer')}
                className={`p-1.5 rounded-lg ${sectionsState.footer.visible ? 'text-emerald-400 bg-emerald-950/50' : 'text-slate-500 bg-slate-900'}`}
              >
                {sectionsState.footer.visible ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Organizer Status Summary Bar */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/80 text-[11px] font-bold text-slate-400 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-1 text-slate-300">
          <FileText size={13} className="text-indigo-400" />
          <span>الأسئلة: <strong className="text-white">{totalQuestions}</strong></span>
        </div>
        <div className="flex items-center gap-1 text-slate-300">
          <span>الدرجات: <strong className="text-amber-400">{totalMarks}</strong></span>
        </div>
        <div className="flex items-center gap-1 text-slate-300">
          <span>الصفحات: <strong className="text-indigo-400">{totalPages}</strong></span>
        </div>
      </div>

      {editingQuestion && (
        <QuestionEditorModal
          isOpen={!!editingQuestion}
          element={editingQuestion.element}
          onClose={() => setEditingQuestion(null)}
          onSave={(updates) => {
            updateElement(editingQuestion.pageIndex, editingQuestion.element.id, updates);
            setEditingQuestion(null);
          }}
        />
      )}
    </aside>
  );
};
