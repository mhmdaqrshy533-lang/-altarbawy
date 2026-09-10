import { create } from 'zustand';
import { 
  OMRProjectData, 
  OMRElement, 
  OMRHeaderData, 
  OMRBubbleGridElement, 
  OMRStudentIDElement, 
  OMRHeaderElement,
  OMRTemplatePreset,
  BubbleShape,
  BubbleLabelType
} from './types';

const defaultHeader: OMRHeaderData = {
  country: 'الجمهورية اليمنية',
  ministry: 'وزارة التربية والتعليم - قطاع المناهج والتوجيه',
  governorate: 'أمانة العاصمة / صنعاء',
  directorate: 'إدارة الاختبارات والتقويم',
  school: 'مدرسة التفوق النموذجية',
  examTitle: 'اختبار الأتمتة الموحد للشهادة الثانوية العامة',
  subject: 'الرياضيات والفيزياء',
  grade: 'الثالث الثانوي العلمي',
  division: 'الشعبة ( أ )',
  time: 'ساعتان',
  marks: '100',
  academicYear: '2025/2026م',
  semester: 'الفصل الدراسي الأول',
  modelCode: 'أ'
};

const defaultAnchors: OMRElement[] = [
  {
    id: 'anchor-top-right',
    type: 'calibration_anchor',
    x: 15,
    y: 15,
    width: 20,
    height: 20,
    rotation: 0,
    zIndex: 10,
    isLocked: true,
    isHidden: false,
    opacity: 1,
    position: 'top-right'
  },
  {
    id: 'anchor-top-left',
    type: 'calibration_anchor',
    x: 759,
    y: 15,
    width: 20,
    height: 20,
    rotation: 0,
    zIndex: 10,
    isLocked: true,
    isHidden: false,
    opacity: 1,
    position: 'top-left'
  },
  {
    id: 'anchor-bottom-right',
    type: 'calibration_anchor',
    x: 15,
    y: 1088,
    width: 20,
    height: 20,
    rotation: 0,
    zIndex: 10,
    isLocked: true,
    isHidden: false,
    opacity: 1,
    position: 'bottom-right'
  },
  {
    id: 'anchor-bottom-left',
    type: 'calibration_anchor',
    x: 759,
    y: 1088,
    width: 20,
    height: 20,
    rotation: 0,
    zIndex: 10,
    isLocked: true,
    isHidden: false,
    opacity: 1,
    position: 'bottom-left'
  }
];

const defaultHeaderElement: OMRHeaderElement = {
  id: 'omr-header-main',
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
  data: defaultHeader
};

const defaultStudentIDElement: OMRStudentIDElement = {
  id: 'omr-student-id-main',
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
};

const defaultGridElement: OMRBubbleGridElement = {
  id: 'omr-grid-main',
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
  questionCount: 40,
  choicesCount: 4,
  columns: 2,
  startQuestionNumber: 1,
  questionType: 'mcq',
  bubbleShape: 'circle',
  labelType: 'arabic',
  bubbleSpacing: 10,
  marksPerQuestion: 2.5,
  filledAnswers: {}
};

export const initialProject: OMRProjectData = {
  id: 'raqim-omr-project-1',
  title: 'ورقة إجابة وتظليل مؤتمتة - مادة الرياضيات',
  metadata: defaultHeader,
  elements: [...defaultAnchors, defaultHeaderElement, defaultStudentIDElement, defaultGridElement],
  zoom: 100,
  gridSnap: true,
  gridSize: 10,
  mode: 'edit',
  lastSavedAt: new Date().toLocaleTimeString('ar-YE')
};

interface OMRStore {
  project: OMRProjectData;
  history: OMRProjectData[];
  future: OMRProjectData[];
  selectedElementIds: string[];
  activeSidebarTab: 'library' | 'generator' | 'student_id' | 'header' | 'properties' | 'layers' | 'templates';
  
  // Modals
  showBubbleGeneratorModal: boolean;
  showPrintPreview: boolean;
  showExportModal: boolean;
  showTemplateGallery: boolean;

  // Actions
  setZoom: (zoom: number) => void;
  setMode: (mode: 'edit' | 'preview' | 'grading') => void;
  setActiveSidebarTab: (tab: 'library' | 'generator' | 'student_id' | 'header' | 'properties' | 'layers' | 'templates') => void;
  
  setShowBubbleGeneratorModal: (show: boolean) => void;
  setShowPrintPreview: (show: boolean) => void;
  setShowExportModal: (show: boolean) => void;
  setShowTemplateGallery: (show: boolean) => void;

  // Element Actions
  addElement: (element: OMRElement) => void;
  updateElement: (id: string, updates: Partial<OMRElement>) => void;
  removeElement: (id: string) => void;
  selectElement: (id: string, multi?: boolean) => void;
  clearSelection: () => void;
  
  toggleLock: (id: string) => void;
  toggleHide: (id: string) => void;
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;
  alignElements: (alignment: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => void;

  // Generators & Helpers
  generateBubbleGrid: (config: {
    questionCount: number;
    choicesCount: number;
    columns: number;
    questionType?: any;
    bubbleShape?: BubbleShape;
    labelType?: BubbleLabelType;
    marksPerQuestion?: number;
    startQuestionNumber?: number;
  }) => void;

  generateStudentIDMatrix: (digitCount: number, title?: string) => void;
  updateHeaderData: (updates: Partial<OMRHeaderData>) => void;
  
  toggleBubbleAnswer: (gridId: string, questionIndex: number, optionLabel: string) => void;
  setStudentDigit: (matrixId: string, colIndex: number, digit: number) => void;
  
  loadTemplate: (template: OMRTemplatePreset) => void;
  convertExamToOMRSheet: (examData: any) => void;
  
  undo: () => void;
  redo: () => void;
  
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}

export const useOMRStore = create<OMRStore>((set, get) => ({
  project: initialProject,
  history: [],
  future: [],
  selectedElementIds: ['omr-grid-main'],
  activeSidebarTab: 'properties',

  showBubbleGeneratorModal: false,
  showPrintPreview: false,
  showExportModal: false,
  showTemplateGallery: false,

  setZoom: (zoom) => set((state) => ({ project: { ...state.project, zoom: Math.min(300, Math.max(50, zoom)) } })),
  
  setMode: (mode) => set((state) => ({ project: { ...state.project, mode } })),
  
  setActiveSidebarTab: (tab) => set({ activeSidebarTab: tab }),

  setShowBubbleGeneratorModal: (show) => set({ showBubbleGeneratorModal: show }),
  setShowPrintPreview: (show) => set({ showPrintPreview: show }),
  setShowExportModal: (show) => set({ showExportModal: show }),
  setShowTemplateGallery: (show) => set({ showTemplateGallery: show }),

  addElement: (element) => {
    const { project, history } = get();
    set({
      history: [...history, project],
      future: [],
      project: {
        ...project,
        elements: [...project.elements, element]
      },
      selectedElementIds: [element.id],
      activeSidebarTab: 'properties'
    });
  },

  updateElement: (id, updates) => {
    const { project, history } = get();
    set({
      history: [...history, project],
      future: [],
      project: {
        ...project,
        elements: project.elements.map((el) => el.id === id ? ({ ...el, ...updates } as OMRElement) : el)
      }
    });
  },

  removeElement: (id) => {
    const { project, history } = get();
    set({
      history: [...history, project],
      future: [],
      project: {
        ...project,
        elements: project.elements.filter((el) => el.id !== id && !el.id.startsWith('anchor-'))
      },
      selectedElementIds: []
    });
  },

  selectElement: (id, multi = false) => {
    set((state) => ({
      selectedElementIds: multi
        ? state.selectedElementIds.includes(id)
          ? state.selectedElementIds.filter((item) => item !== id)
          : [...state.selectedElementIds, id]
        : [id]
    }));
  },

  clearSelection: () => set({ selectedElementIds: [] }),

  toggleLock: (id) => {
    const { project } = get();
    set({
      project: {
        ...project,
        elements: project.elements.map((el) => el.id === id ? { ...el, isLocked: !el.isLocked } : el)
      }
    });
  },

  toggleHide: (id) => {
    const { project } = get();
    set({
      project: {
        ...project,
        elements: project.elements.map((el) => el.id === id ? { ...el, isHidden: !el.isHidden } : el)
      }
    });
  },

  bringForward: (id) => {
    const { project } = get();
    const index = project.elements.findIndex((el) => el.id === id);
    if (index === -1 || index === project.elements.length - 1) return;
    const newElements = [...project.elements];
    const temp = newElements[index];
    newElements[index] = newElements[index + 1];
    newElements[index + 1] = temp;
    set({ project: { ...project, elements: newElements } });
  },

  sendBackward: (id) => {
    const { project } = get();
    const index = project.elements.findIndex((el) => el.id === id);
    if (index <= 0) return;
    const newElements = [...project.elements];
    const temp = newElements[index];
    newElements[index] = newElements[index - 1];
    newElements[index - 1] = temp;
    set({ project: { ...project, elements: newElements } });
  },

  alignElements: (alignment) => {
    const { project, selectedElementIds, history } = get();
    if (selectedElementIds.length < 2) return;

    const selectedElements = project.elements.filter((el) => selectedElementIds.includes(el.id));
    let targetVal = 0;

    if (alignment === 'left') {
      targetVal = Math.min(...selectedElements.map((el) => el.x));
    } else if (alignment === 'right') {
      targetVal = Math.max(...selectedElements.map((el) => el.x + el.width));
    } else if (alignment === 'top') {
      targetVal = Math.min(...selectedElements.map((el) => el.y));
    } else if (alignment === 'bottom') {
      targetVal = Math.max(...selectedElements.map((el) => el.y + el.height));
    }

    set({
      history: [...history, project],
      future: [],
      project: {
        ...project,
        elements: project.elements.map((el) => {
          if (!selectedElementIds.includes(el.id)) return el;
          let newX = el.x;
          let newY = el.y;
          if (alignment === 'left') newX = targetVal;
          if (alignment === 'right') newX = targetVal - el.width;
          if (alignment === 'top') newY = targetVal;
          if (alignment === 'bottom') newY = targetVal - el.height;
          return { ...el, x: newX, y: newY };
        })
      }
    });
  },

  generateBubbleGrid: (config) => {
    const { project, history } = get();
    const existingGrid = project.elements.find((el) => el.type === 'bubble_grid') as OMRBubbleGridElement;
    
    const newGrid: OMRBubbleGridElement = {
      id: existingGrid ? existingGrid.id : `omr-grid-${Date.now()}`,
      type: 'bubble_grid',
      x: existingGrid ? existingGrid.x : 260,
      y: existingGrid ? existingGrid.y : 190,
      width: existingGrid ? existingGrid.width : 494,
      height: Math.min(880, Math.max(250, Math.ceil(config.questionCount / config.columns) * 32 + 40)),
      rotation: 0,
      zIndex: 2,
      isLocked: false,
      isHidden: false,
      opacity: 1,
      questionCount: config.questionCount,
      choicesCount: config.choicesCount,
      columns: config.columns,
      startQuestionNumber: config.startQuestionNumber || 1,
      questionType: config.questionType || 'mcq',
      bubbleShape: config.bubbleShape || 'circle',
      labelType: config.labelType || 'arabic',
      bubbleSpacing: 10,
      marksPerQuestion: config.marksPerQuestion || 2,
      filledAnswers: {}
    };

    const newElements = existingGrid 
      ? project.elements.map((el) => el.id === existingGrid.id ? newGrid : el)
      : [...project.elements, newGrid];

    set({
      history: [...history, project],
      future: [],
      project: {
        ...project,
        elements: newElements
      },
      selectedElementIds: [newGrid.id],
      showBubbleGeneratorModal: false
    });
  },

  generateStudentIDMatrix: (digitCount, title = 'تظليل رقم الجلوس') => {
    const { project, history } = get();
    const existingMatrix = project.elements.find((el) => el.type === 'student_id_matrix') as OMRStudentIDElement;

    const newMatrix: OMRStudentIDElement = {
      id: existingMatrix ? existingMatrix.id : `omr-student-id-${Date.now()}`,
      type: 'student_id_matrix',
      x: existingMatrix ? existingMatrix.x : 40,
      y: existingMatrix ? existingMatrix.y : 190,
      width: Math.max(160, digitCount * 36 + 20),
      height: 240,
      rotation: 0,
      zIndex: 2,
      isLocked: false,
      isHidden: false,
      opacity: 1,
      digitCount,
      filledDigits: {},
      showLabels: true,
      title
    };

    const newElements = existingMatrix
      ? project.elements.map((el) => el.id === existingMatrix.id ? newMatrix : el)
      : [...project.elements, newMatrix];

    set({
      history: [...history, project],
      future: [],
      project: {
        ...project,
        elements: newElements
      },
      selectedElementIds: [newMatrix.id]
    });
  },

  updateHeaderData: (updates) => {
    const { project, history } = get();
    set({
      history: [...history, project],
      future: [],
      project: {
        ...project,
        metadata: { ...project.metadata, ...updates },
        elements: project.elements.map((el) => {
          if (el.type === 'header') {
            return {
              ...el,
              data: { ...el.data, ...updates }
            };
          }
          return el;
        })
      }
    });
  },

  toggleBubbleAnswer: (gridId, questionIndex, optionLabel) => {
    const { project } = get();
    set({
      project: {
        ...project,
        elements: project.elements.map((el) => {
          if (el.id === gridId && el.type === 'bubble_grid') {
            const currentFilled = el.filledAnswers[questionIndex] || [];
            const isSelected = currentFilled.includes(optionLabel);
            const nextFilled = isSelected
              ? currentFilled.filter((item) => item !== optionLabel)
              : [...currentFilled, optionLabel];

            return {
              ...el,
              filledAnswers: {
                ...el.filledAnswers,
                [questionIndex]: nextFilled
              }
            };
          }
          return el;
        })
      }
    });
  },

  setStudentDigit: (matrixId, colIndex, digit) => {
    const { project } = get();
    set({
      project: {
        ...project,
        elements: project.elements.map((el) => {
          if (el.id === matrixId && el.type === 'student_id_matrix') {
            return {
              ...el,
              filledDigits: {
                ...el.filledDigits,
                [colIndex]: digit
              }
            };
          }
          return el;
        })
      }
    });
  },

  loadTemplate: (template) => {
    const { project, history } = get();
    set({
      history: [...history, project],
      future: [],
      project: {
        ...project,
        title: template.name,
        metadata: template.metadata,
        elements: [...defaultAnchors, ...template.elements]
      },
      selectedElementIds: [],
      showTemplateGallery: false
    });
  },

  convertExamToOMRSheet: (examData) => {
    const { project, history } = get();
    
    // Extract questions and choices from exam editor if provided
    const questionCount = examData?.questionsCount || 40;
    const subject = examData?.subject || project.metadata.subject;
    const examTitle = examData?.examTitle || project.metadata.examTitle;

    const newMetadata: OMRHeaderData = {
      ...project.metadata,
      subject,
      examTitle
    };

    const newGrid: OMRBubbleGridElement = {
      id: `omr-grid-converted-${Date.now()}`,
      type: 'bubble_grid',
      x: 260,
      y: 190,
      width: 494,
      height: Math.min(850, Math.ceil(questionCount / 2) * 34 + 40),
      rotation: 0,
      zIndex: 2,
      isLocked: false,
      isHidden: false,
      opacity: 1,
      questionCount,
      choicesCount: 4,
      columns: questionCount > 30 ? 2 : 1,
      startQuestionNumber: 1,
      questionType: 'mcq',
      bubbleShape: 'circle',
      labelType: 'arabic',
      bubbleSpacing: 10,
      marksPerQuestion: 2.5,
      filledAnswers: {}
    };

    set({
      history: [...history, project],
      future: [],
      project: {
        ...project,
        title: `ورقة أتمتة - ${subject} (${examTitle})`,
        metadata: newMetadata,
        elements: [
          ...defaultAnchors,
          { ...defaultHeaderElement, data: newMetadata },
          defaultStudentIDElement,
          newGrid
        ]
      }
    });
  },

  undo: () => {
    const { history, project, future } = get();
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    const newHistory = history.slice(0, history.length - 1);
    set({
      project: previous,
      history: newHistory,
      future: [project, ...future]
    });
  },

  redo: () => {
    const { future, project, history } = get();
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);
    set({
      project: next,
      history: [...history, project],
      future: newFuture
    });
  },

  saveToLocalStorage: () => {
    const { project } = get();
    const updatedProject = {
      ...project,
      lastSavedAt: new Date().toLocaleTimeString('ar-YE')
    };
    try {
      localStorage.setItem('raqim_omr_studio_project', JSON.stringify(updatedProject));
      set({ project: updatedProject });
    } catch (e) {
      console.error('Failed to save OMR project to LocalStorage', e);
    }
  },

  loadFromLocalStorage: () => {
    try {
      const saved = localStorage.getItem('raqim_omr_studio_project');
      if (saved) {
        const parsed = JSON.parse(saved);
        set({ project: parsed });
      }
    } catch (e) {
      console.error('Failed to load OMR project from LocalStorage', e);
    }
  }
}));
