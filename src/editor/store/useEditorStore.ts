import { create } from 'zustand';
import { DocumentState, EditorElement, Page, ExamMetadata, TextElement, DocumentValidationReport } from '../types';
import { PersistenceEngine } from '../../core/PersistenceEngine';
import { DocumentStandardsValidator } from '../../core/standards/DocumentValidator';

const uuid = () => typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);

interface EditorState {
  document: DocumentState;
  activePageIndex: number;
  selectedElementIds: string[];
  newlyCreatedElementId: string | null;
  zoom: number;
  snapToGrid: boolean;
  showRulers: boolean;
  showGuides: boolean;
  autosaveStatus: 'saved' | 'saving' | 'error';
  validationReport: DocumentValidationReport | null;
  
  // Undo/Redo stacks
  history: DocumentState[];
  future: DocumentState[];

  // Actions
  setZoom: (zoom: number) => void;
  setAutosaveStatus: (status: 'saved' | 'saving' | 'error') => void;
  saveImmediately: () => Promise<void>;
  validateDocument: () => DocumentValidationReport;
  addPage: () => void;
  removePage: (index: number) => void;
  setActivePage: (index: number) => void;
  
  updateMetadata: (metadata: Partial<ExamMetadata>) => void;
  
  addElement: (pageIndex: number, element: EditorElement) => void;
  updateElement: (pageIndex: number, elementId: string, updates: Partial<EditorElement>) => void;
  removeElement: (pageIndex: number, elementId: string) => void;
  duplicateElement: (pageIndex: number, elementId: string) => void;
  moveQuestionUp: (pageIndex: number, elementId: string) => void;
  moveQuestionDown: (pageIndex: number, elementId: string) => void;
  moveQuestionToTop: (pageIndex: number, elementId: string) => void;
  moveQuestionToBottom: (pageIndex: number, elementId: string) => void;
  
  // Custom Question & Layout helper
  addQuestion: (pageIndex: number, text?: string) => void;
  reorderAndRenumberQuestions: (pageIndex: number) => void;

  selectElement: (elementId: string, multi?: boolean) => void;
  clearSelection: () => void;
  setNewlyCreatedElementId: (id: string | null) => void;
  
  toggleSnapToGrid: () => void;
  toggleRulers: () => void;

  // History operations
  undo: () => void;
  redo: () => void;
  setDocument: (doc: DocumentState) => void;
}

const createInitialPage = (): Page => ({
  id: uuid(),
  elements: [],
});

const loadSavedEducatorSettings = () => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('raq_educator_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
  }
  return {};
};

const savedSettings = loadSavedEducatorSettings();

const initialMetadata: ExamMetadata = {
  governorate: savedSettings.governorate || 'صنعاء',
  directorate: savedSettings.directorate || 'السبعين',
  school: savedSettings.school || 'مدرسة الرقيم النموذجية',
  stage: savedSettings.stage || 'الأساسي',
  grade: savedSettings.grade || 'التاسع الأساسي',
  division: savedSettings.division || 'أ',
  subject: savedSettings.subject || 'الرياضيات',
  semester: savedSettings.semester || 'الفصل الدراسي الأول',
  round: savedSettings.round || 'الدور الأول',
  academicYear: savedSettings.academicYear || '2025/2026م',
  examTitle: savedSettings.examTitle || 'اختبار نهاية الفصل الدراسي الأول',
  time: savedSettings.time || 'ساعتان',
  marks: savedSettings.marks || '50',
  examType: savedSettings.examType || 'شهري',
  teacherName: savedSettings.teacherName || 'المهندس سهيل الهزبري',
  schoolPrincipal: savedSettings.schoolPrincipal || 'أستاذ علي محمد',
  templateType: 'ministerial',
  modelCode: 'أ',
  themePreset: 'classic',
  themePrimaryColor: '#000000',
  themeBorderColor: '#000000',
  themeBorderStyle: 'double',
  themeBorderWidth: '4px',
  themeHeaderBg: '#f8fafc',
  themeIntroBg: '#000000',
  themeIntroTextColor: '#ffffff',
  themeAccentColor: '#e11d48'
};

const getInitialDocument = (): DocumentState => {
  if (typeof window !== 'undefined') {
    try {
      const savedDoc = localStorage.getItem('raq_autosave_document');
      if (savedDoc) {
        const parsed = JSON.parse(savedDoc);
        if (parsed && parsed.pages) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load auto-saved document', e);
    }
  }
  return {
    id: uuid(),
    title: 'اختبار الرقيم الجديد',
    pages: [createInitialPage()],
    paperSize: 'A4',
    orientation: 'portrait',
    margins: { top: 20, right: 20, bottom: 20, left: 20 },
    metadata: initialMetadata
  };
};

export const useEditorStore = create<EditorState>((set, get) => ({
  document: getInitialDocument(),
  activePageIndex: 0,
  selectedElementIds: [],
  newlyCreatedElementId: null,
  zoom: 100, // percentage
  snapToGrid: false,
  showRulers: false,
  showGuides: true,
  autosaveStatus: 'saved',
  validationReport: null,
  history: [],
  future: [],

  setZoom: (zoom) => set({ zoom: Math.max(25, Math.min(400, zoom)) }),
  setAutosaveStatus: (status) => set({ autosaveStatus: status }),

  validateDocument: () => {
    const doc = get().document;
    const report = DocumentStandardsValidator.validate(doc);
    set({ validationReport: report });
    return report;
  },

  saveImmediately: async () => {
    const state = get();
    set({ autosaveStatus: 'saving' });
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('raq_autosave_document', JSON.stringify(state.document));
      }
      await PersistenceEngine.saveDraft('active_exam_document', state.document);
      set({ autosaveStatus: 'saved' });
    } catch (e) {
      console.warn('Manual save draft failed:', e);
      set({ autosaveStatus: 'error' });
    }
  },
  
  addPage: () => set((state) => {
    const prevDoc = JSON.parse(JSON.stringify(state.document));
    return {
      document: {
        ...state.document,
        pages: [...state.document.pages, createInitialPage()]
      },
      activePageIndex: state.document.pages.length,
      history: [...state.history, prevDoc],
      future: []
    };
  }),

  removePage: (index) => set((state) => {
    if (state.document.pages.length <= 1) return {}; // Don't remove last page
    const prevDoc = JSON.parse(JSON.stringify(state.document));
    const newPages = [...state.document.pages];
    newPages.splice(index, 1);
    return {
      document: { ...state.document, pages: newPages },
      activePageIndex: Math.min(state.activePageIndex, newPages.length - 1),
      history: [...state.history, prevDoc],
      future: []
    };
  }),

  setActivePage: (index) => set({ activePageIndex: index }),

  updateMetadata: (metadata) => set((state) => {
    const prevDoc = JSON.parse(JSON.stringify(state.document));
    const updatedMeta = { ...state.document.metadata, ...metadata };
    
    // Auto sync to saved educator settings for single time fields
    if (typeof window !== 'undefined') {
      const settingsToSave = {
        school: updatedMeta.school,
        teacherName: updatedMeta.teacherName,
        schoolPrincipal: updatedMeta.schoolPrincipal,
        governorate: updatedMeta.governorate,
        directorate: updatedMeta.directorate,
        stage: updatedMeta.stage
      };
      localStorage.setItem('raq_educator_settings', JSON.stringify(settingsToSave));
    }

    return {
      document: {
        ...state.document,
        metadata: updatedMeta
      },
      history: [...state.history, prevDoc],
      future: []
    };
  }),

  addElement: (pageIndex, element) => set((state) => {
    const prevDoc = JSON.parse(JSON.stringify(state.document));
    const newPages = [...state.document.pages];
    newPages[pageIndex] = {
      ...newPages[pageIndex],
      elements: [...newPages[pageIndex].elements, element]
    };
    return {
      document: { ...state.document, pages: newPages },
      history: [...state.history, prevDoc],
      future: [],
      selectedElementIds: [element.id],
      newlyCreatedElementId: element.id
    };
  }),

  updateElement: (pageIndex, elementId, updates) => set((state) => {
    const prevDoc = JSON.parse(JSON.stringify(state.document));
    const newPages = [...state.document.pages];
    const elements = [...newPages[pageIndex].elements];
    const elIndex = elements.findIndex(e => e.id === elementId);
    if (elIndex >= 0) {
      elements[elIndex] = { ...elements[elIndex], ...updates } as EditorElement;
      newPages[pageIndex].elements = elements;
    }
    return { 
      document: { ...state.document, pages: newPages },
      // Drag updates are high-frequency, so the components themselves should debounce pushes or we do it here.
      // To keep code simple and fast, we just store state.
      history: [...state.history, prevDoc],
      future: []
    };
  }),

  removeElement: (pageIndex, elementId) => set((state) => {
    const prevDoc = JSON.parse(JSON.stringify(state.document));
    const newPages = [...state.document.pages];
    newPages[pageIndex] = {
      ...newPages[pageIndex],
      elements: newPages[pageIndex].elements.filter(e => e.id !== elementId)
    };
    return {
      document: { ...state.document, pages: newPages },
      selectedElementIds: [],
      history: [...state.history, prevDoc],
      future: []
    };
  }),

  duplicateElement: (pageIndex, elementId) => set((state) => {
    const page = state.document.pages[pageIndex];
    const target = page.elements.find(e => e.id === elementId);
    if (!target) return {};

    const prevDoc = JSON.parse(JSON.stringify(state.document));
    const newId = uuid();
    const duplicated = {
      ...JSON.parse(JSON.stringify(target)),
      id: newId,
      y: target.y + target.height + 15
    };

    const newPages = [...state.document.pages];
    newPages[pageIndex] = {
      ...page,
      elements: [...page.elements, duplicated]
    };

    return {
      document: { ...state.document, pages: newPages },
      selectedElementIds: [newId],
      history: [...state.history, prevDoc],
      future: []
    };
  }),

  moveQuestionUp: (pageIndex, elementId) => set((state) => {
    const page = state.document.pages[pageIndex];
    const questions = page.elements
      .filter(el => el.type === 'text' && (el as any).isQuestion)
      .sort((a, b) => a.y - b.y);

    const idx = questions.findIndex(q => q.id === elementId);
    if (idx <= 0) return {};

    const prevDoc = JSON.parse(JSON.stringify(state.document));
    // Swap positions in array
    const reordered = [...questions];
    const [moved] = reordered.splice(idx, 1);
    reordered.splice(idx - 1, 0, moved);

    // Relayout vertically from first question's Y or template start Y
    const startY = (state.document.metadata.templateType === 'ministerial' && pageIndex === 0) ? 260 : 120;
    let curY = Math.min(questions[0].y, startY);
    const updatedMap = new Map<string, Partial<EditorElement>>();
    reordered.forEach((q, i) => {
      const qNum = i + 1;
      let content = (q as TextElement).content || '';
      const prefixRegex = /^س\s*\d+\s*:/;
      if (prefixRegex.test(content)) {
        content = content.replace(prefixRegex, `س${qNum}:`);
      } else if (!content.startsWith(`س${qNum}:`)) {
        content = `س${qNum}: ${content}`;
      }
      updatedMap.set(q.id, { y: curY, questionNumber: qNum, content } as any);
      curY += (q.height || 60) + 15;
    });

    const newPages = [...state.document.pages];
    newPages[pageIndex] = {
      ...page,
      elements: page.elements.map(el => {
        const update = updatedMap.get(el.id);
        return update ? ({ ...el, ...update } as EditorElement) : el;
      })
    };

    return {
      document: { ...state.document, pages: newPages },
      history: [...state.history, prevDoc],
      future: []
    };
  }),

  moveQuestionDown: (pageIndex, elementId) => set((state) => {
    const page = state.document.pages[pageIndex];
    const questions = page.elements
      .filter(el => el.type === 'text' && (el as any).isQuestion)
      .sort((a, b) => a.y - b.y);

    const idx = questions.findIndex(q => q.id === elementId);
    if (idx < 0 || idx >= questions.length - 1) return {};

    const prevDoc = JSON.parse(JSON.stringify(state.document));
    const reordered = [...questions];
    const [moved] = reordered.splice(idx, 1);
    reordered.splice(idx + 1, 0, moved);

    const startY = (state.document.metadata.templateType === 'ministerial' && pageIndex === 0) ? 260 : 120;
    let curY = Math.min(questions[0].y, startY);
    const updatedMap = new Map<string, Partial<EditorElement>>();
    reordered.forEach((q, i) => {
      const qNum = i + 1;
      let content = (q as TextElement).content || '';
      const prefixRegex = /^س\s*\d+\s*:/;
      if (prefixRegex.test(content)) {
        content = content.replace(prefixRegex, `س${qNum}:`);
      } else if (!content.startsWith(`س${qNum}:`)) {
        content = `س${qNum}: ${content}`;
      }
      updatedMap.set(q.id, { y: curY, questionNumber: qNum, content } as any);
      curY += (q.height || 60) + 15;
    });

    const newPages = [...state.document.pages];
    newPages[pageIndex] = {
      ...page,
      elements: page.elements.map(el => {
        const update = updatedMap.get(el.id);
        return update ? ({ ...el, ...update } as EditorElement) : el;
      })
    };

    return {
      document: { ...state.document, pages: newPages },
      history: [...state.history, prevDoc],
      future: []
    };
  }),

  moveQuestionToTop: (pageIndex, elementId) => set((state) => {
    const page = state.document.pages[pageIndex];
    const questions = page.elements
      .filter(el => el.type === 'text' && (el as any).isQuestion)
      .sort((a, b) => a.y - b.y);

    const idx = questions.findIndex(q => q.id === elementId);
    if (idx <= 0) return {};

    const prevDoc = JSON.parse(JSON.stringify(state.document));
    const reordered = [...questions];
    const [moved] = reordered.splice(idx, 1);
    reordered.unshift(moved);

    const startY = (state.document.metadata.templateType === 'ministerial' && pageIndex === 0) ? 260 : 120;
    let curY = Math.min(questions[0].y, startY);
    const updatedMap = new Map<string, Partial<EditorElement>>();
    reordered.forEach((q, i) => {
      const qNum = i + 1;
      let content = (q as TextElement).content || '';
      const prefixRegex = /^س\s*\d+\s*:/;
      if (prefixRegex.test(content)) {
        content = content.replace(prefixRegex, `س${qNum}:`);
      } else if (!content.startsWith(`س${qNum}:`)) {
        content = `س${qNum}: ${content}`;
      }
      updatedMap.set(q.id, { y: curY, questionNumber: qNum, content } as any);
      curY += (q.height || 60) + 15;
    });

    const newPages = [...state.document.pages];
    newPages[pageIndex] = {
      ...page,
      elements: page.elements.map(el => {
        const update = updatedMap.get(el.id);
        return update ? ({ ...el, ...update } as EditorElement) : el;
      })
    };

    return {
      document: { ...state.document, pages: newPages },
      history: [...state.history, prevDoc],
      future: []
    };
  }),

  moveQuestionToBottom: (pageIndex, elementId) => set((state) => {
    const page = state.document.pages[pageIndex];
    const questions = page.elements
      .filter(el => el.type === 'text' && (el as any).isQuestion)
      .sort((a, b) => a.y - b.y);

    const idx = questions.findIndex(q => q.id === elementId);
    if (idx < 0 || idx >= questions.length - 1) return {};

    const prevDoc = JSON.parse(JSON.stringify(state.document));
    const reordered = [...questions];
    const [moved] = reordered.splice(idx, 1);
    reordered.push(moved);

    const startY = (state.document.metadata.templateType === 'ministerial' && pageIndex === 0) ? 260 : 120;
    let curY = Math.min(questions[0].y, startY);
    const updatedMap = new Map<string, Partial<EditorElement>>();
    reordered.forEach((q, i) => {
      const qNum = i + 1;
      let content = (q as TextElement).content || '';
      const prefixRegex = /^س\s*\d+\s*:/;
      if (prefixRegex.test(content)) {
        content = content.replace(prefixRegex, `س${qNum}:`);
      } else if (!content.startsWith(`س${qNum}:`)) {
        content = `س${qNum}: ${content}`;
      }
      updatedMap.set(q.id, { y: curY, questionNumber: qNum, content } as any);
      curY += (q.height || 60) + 15;
    });

    const newPages = [...state.document.pages];
    newPages[pageIndex] = {
      ...page,
      elements: page.elements.map(el => {
        const update = updatedMap.get(el.id);
        return update ? ({ ...el, ...update } as EditorElement) : el;
      })
    };

    return {
      document: { ...state.document, pages: newPages },
      history: [...state.history, prevDoc],
      future: []
    };
  }),

  // Add structured question below existing elements
  addQuestion: (pageIndex, text = '') => set((state) => {
    const page = state.document.pages[pageIndex];
    const prevDoc = JSON.parse(JSON.stringify(state.document));

    // Calculate dynamic position (Y coordinate below last element)
    let highestY = 160;
    if (state.document.metadata.templateType === 'ministerial' && pageIndex === 0) {
      highestY = 250; // below student cut line
    }
    
    page.elements.forEach(el => {
      if (el.y + el.height > highestY) {
        highestY = el.y + el.height;
      }
    });

    const newY = highestY + 15;
    const currentQuestions = page.elements.filter(el => el.type === 'text' && (el as any).isQuestion);
    const qNum = currentQuestions.length + 1;
    const marks = 5;
    
    const content = text || `س${qNum}: اكتب نص السؤال الجديد هنا...... [${marks} درجات]`;
    const newId = uuid();

    const newQuestion: TextElement = {
      id: newId,
      type: 'text',
      x: 35, // margin right / left padding
      y: newY,
      width: 724, // fit to page cleanly
      height: 60,
      rotation: 0,
      isLocked: false,
      isHidden: false,
      zIndex: 2,
      content,
      fontSize: 15,
      fontFamily: 'Inter',
      fontWeight: 'bold',
      color: '#000000',
      textAlign: 'right',
      isQuestion: true,
      questionNumber: qNum,
      marks: marks
    };

    const newPages = [...state.document.pages];
    newPages[pageIndex] = {
      ...newPages[pageIndex],
      elements: [...newPages[pageIndex].elements, newQuestion]
    };

    // Calculate updated marks
    let updatedMetadata = { ...state.document.metadata };
    const totalMarks = newPages[pageIndex].elements
      .filter(el => el.type === 'text' && (el as any).isQuestion)
      .reduce((sum, el) => sum + ((el as any).marks || 0), 0);
    updatedMetadata.marks = String(totalMarks || 50);

    return {
      document: {
        ...state.document,
        pages: newPages,
        metadata: updatedMetadata
      },
      selectedElementIds: [newId],
      newlyCreatedElementId: newId,
      history: [...state.history, prevDoc],
      future: []
    };
  }),

  // Keep question prefixes numbered correctly (س1, س2, etc.) based on their visual vertical positions
  reorderAndRenumberQuestions: (pageIndex) => set((state) => {
    const page = state.document.pages[pageIndex];
    const prevDoc = JSON.parse(JSON.stringify(state.document));
    const elements = [...page.elements];
    
    // Sort indices of questions by y coordinate
    const sortedQuestions = elements
      .map((el, index) => ({ el, index }))
      .filter(item => item.el.type === 'text' && (item.el as any).isQuestion)
      .sort((a, b) => a.el.y - b.el.y);

    sortedQuestions.forEach((item, index) => {
      const qNum = index + 1;
      const el = item.el as TextElement;
      
      let updatedContent = el.content;
      const prefixRegex = /^س\s*\d+\s*:/;
      if (prefixRegex.test(updatedContent)) {
        updatedContent = updatedContent.replace(prefixRegex, `س${qNum}:`);
      } else if (!updatedContent.startsWith(`س${qNum}:`)) {
        updatedContent = `س${qNum}: ${updatedContent}`;
      }

      elements[item.index] = {
        ...el,
        questionNumber: qNum,
        content: updatedContent
      } as EditorElement;
    });

    const newPages = [...state.document.pages];
    newPages[pageIndex] = { ...page, elements };

    return {
      document: {
        ...state.document,
        pages: newPages
      },
      history: [...state.history, prevDoc],
      future: []
    };
  }),

  selectElement: (elementId, multi = false) => set((state) => ({
    selectedElementIds: multi 
      ? [...state.selectedElementIds, elementId]
      : [elementId]
  })),

  clearSelection: () => set({ selectedElementIds: [] }),
  setNewlyCreatedElementId: (id) => set({ newlyCreatedElementId: id }),

  toggleSnapToGrid: () => set((state) => ({ snapToGrid: !state.snapToGrid })),
  toggleRulers: () => set((state) => ({ showRulers: !state.showRulers })),

  undo: () => set((state) => {
    if (state.history.length === 0) return {};
    const previous = state.history[state.history.length - 1];
    const newHistory = state.history.slice(0, state.history.length - 1);
    return {
      document: previous,
      history: newHistory,
      future: [state.document, ...state.future]
    };
  }),

  redo: () => set((state) => {
    if (state.future.length === 0) return {};
    const next = state.future[0];
    const newFuture = state.future.slice(1);
    return {
      document: next,
      history: [...state.history, state.document],
      future: newFuture
    };
  }),

  setDocument: (doc: DocumentState) => set({
    document: doc,
    activePageIndex: 0,
    selectedElementIds: [],
    history: [],
    future: []
  }),
}));

// Set up real debounced auto-save on document changes (localStorage & IndexedDB)
let autosaveTimeout: any = null;

if (typeof window !== 'undefined') {
  useEditorStore.subscribe((state, prevState) => {
    if (state.document !== prevState.document) {
      useEditorStore.getState().setAutosaveStatus('saving');
      if (autosaveTimeout) clearTimeout(autosaveTimeout);
      autosaveTimeout = setTimeout(async () => {
        try {
          localStorage.setItem('raq_autosave_document', JSON.stringify(state.document));
          await PersistenceEngine.saveDraft('active_exam_document', state.document);
          useEditorStore.getState().setAutosaveStatus('saved');
        } catch (e) {
          console.warn('Debounced autosave failed', e);
          useEditorStore.getState().setAutosaveStatus('error');
        }
      }, 1500);
    }
  });
}
