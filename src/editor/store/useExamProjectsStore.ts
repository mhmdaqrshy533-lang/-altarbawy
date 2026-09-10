import { create } from 'zustand';
import { DocumentState, ExamMetadata, Page } from '../types';
import { PersistenceEngine } from '../../core/PersistenceEngine';

export interface ExamProject {
  id: string;
  title: string;
  subject: string;
  grade: string;
  school: string;
  templateType: string;
  lastModified: number;
  createdAt: number;
  document: DocumentState;
}

interface ExamProjectsState {
  projects: ExamProject[];
  activeProjectId: string | null;

  // Actions
  loadProjects: () => void;
  saveCurrentDocument: (document: DocumentState) => void;
  createProject: (metadata: Partial<ExamMetadata>, title?: string) => ExamProject;
  openProject: (id: string) => DocumentState | null;
  duplicateProject: (id: string) => ExamProject | null;
  deleteProject: (id: string) => void;
  exportRaqFile: (id: string) => void;
  importRaqFile: (jsonContent: string) => ExamProject | null;
}

const STORAGE_KEY = 'raq_exam_projects_list';

const uuid = () => typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);

const getDefaultInitialPage = (): Page => ({
  id: uuid(),
  elements: [
    {
      id: uuid(),
      type: 'text',
      x: 35,
      y: 260,
      width: 724,
      height: 60,
      rotation: 0,
      isLocked: false,
      isHidden: false,
      zIndex: 2,
      content: 'س1: اختر الإجابة الصحيحة من بين الخيارات المتاحة أمام كل عبارة ممّا يلي: ...... [10 درجات]',
      fontSize: 15,
      fontFamily: 'Inter',
      fontWeight: 'bold',
      color: '#000000',
      textAlign: 'right',
      isQuestion: true,
      questionNumber: 1,
      marks: 10
    }
  ],
});

const defaultEducatorSettings = () => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('raq_educator_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
  }
  return {};
};

export const createDefaultDocument = (customMeta?: Partial<ExamMetadata>, title?: string): DocumentState => {
  const settings = defaultEducatorSettings();
  
  const metadata: ExamMetadata = {
    governorate: settings.governorate || 'صنعاء',
    directorate: settings.directorate || 'السبعين',
    school: settings.school || 'مدرسة الرقيم النموذجية',
    stage: settings.stage || 'الأساسي',
    grade: settings.grade || 'التاسع الأساسي',
    division: settings.division || 'أ',
    subject: settings.subject || 'الرياضيات',
    semester: settings.semester || 'الفصل الدراسي الأول',
    round: settings.round || 'الدور الأول',
    academicYear: settings.academicYear || '2025/2026م',
    examTitle: settings.examTitle || 'اختبار نهاية الفصل الدراسي الأول',
    time: settings.time || 'ساعتان',
    marks: settings.marks || '50',
    examType: settings.examType || 'شهري',
    teacherName: settings.teacherName || 'المهندس سهيل الهزبري',
    schoolPrincipal: settings.schoolPrincipal || 'أستاذ علي محمد',
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
    themeAccentColor: '#e11d48',
    ...customMeta
  };

  const docId = uuid();
  return {
    id: docId,
    title: title || `${metadata.examTitle} - ${metadata.subject}`,
    pages: [getDefaultInitialPage()],
    paperSize: 'A4',
    orientation: 'portrait',
    margins: { top: 20, right: 20, bottom: 20, left: 20 },
    metadata
  };
};

export const useExamProjectsStore = create<ExamProjectsState>((set, get) => ({
  projects: [],
  activeProjectId: null,

  loadProjects: () => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: ExamProject[] = JSON.parse(saved);
        set({ projects: parsed });
      } else {
        // Create initial sample projects if empty
        const sampleDoc = createDefaultDocument();
        const sampleProj: ExamProject = {
          id: sampleDoc.id,
          title: sampleDoc.title,
          subject: sampleDoc.metadata.subject,
          grade: sampleDoc.metadata.grade,
          school: sampleDoc.metadata.school,
          templateType: sampleDoc.metadata.templateType,
          lastModified: Date.now(),
          createdAt: Date.now(),
          document: sampleDoc
        };
        const initialList = [sampleProj];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialList));
        set({ projects: initialList, activeProjectId: sampleProj.id });
      }
    } catch (e) {
      console.error('Failed to load exam projects', e);
    }
  },

  saveCurrentDocument: (doc: DocumentState) => {
    const state = get();
    const now = Date.now();
    const existingIndex = state.projects.findIndex(p => p.id === doc.id);

    const projectItem: ExamProject = {
      id: doc.id,
      title: doc.title || `${doc.metadata.examTitle} - ${doc.metadata.subject}`,
      subject: doc.metadata.subject || 'المادة',
      grade: doc.metadata.grade || 'الصف',
      school: doc.metadata.school || 'المدرسة',
      templateType: doc.metadata.templateType || 'ministerial',
      lastModified: now,
      createdAt: existingIndex >= 0 ? state.projects[existingIndex].createdAt : now,
      document: doc
    };

    let updatedList: ExamProject[];
    if (existingIndex >= 0) {
      updatedList = [...state.projects];
      updatedList[existingIndex] = projectItem;
    } else {
      updatedList = [projectItem, ...state.projects];
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      localStorage.setItem('raq_autosave_document', JSON.stringify(doc));
    } catch (e) {
      console.error('Failed to save exam project to storage', e);
    }

    // Persist large structured project to IndexedDB safely
    PersistenceEngine.saveDocument(doc.id, 'exams', projectItem.title, doc).catch(err => {
      console.warn('IndexedDB exam save notice:', err);
    });
    PersistenceEngine.saveDraft('active_exam_document', doc).catch(() => {});

    set({ projects: updatedList, activeProjectId: doc.id });
  },

  createProject: (customMeta, customTitle) => {
    const doc = createDefaultDocument(customMeta, customTitle);
    const now = Date.now();
    const newProj: ExamProject = {
      id: doc.id,
      title: doc.title,
      subject: doc.metadata.subject,
      grade: doc.metadata.grade,
      school: doc.metadata.school,
      templateType: doc.metadata.templateType,
      lastModified: now,
      createdAt: now,
      document: doc
    };

    const state = get();
    const updatedList = [newProj, ...state.projects];

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      localStorage.setItem('raq_autosave_document', JSON.stringify(doc));
    } catch (e) {
      console.error(e);
    }

    set({ projects: updatedList, activeProjectId: newProj.id });
    return newProj;
  },

  openProject: (id: string) => {
    const state = get();
    const proj = state.projects.find(p => p.id === id);
    if (proj) {
      set({ activeProjectId: id });
      try {
        localStorage.setItem('raq_autosave_document', JSON.stringify(proj.document));
      } catch (e) {}
      return proj.document;
    }
    return null;
  },

  duplicateProject: (id: string) => {
    const state = get();
    const source = state.projects.find(p => p.id === id);
    if (!source) return null;

    const newId = uuid();
    const now = Date.now();
    const duplicatedDoc: DocumentState = JSON.parse(JSON.stringify(source.document));
    duplicatedDoc.id = newId;
    duplicatedDoc.title = `${source.title} (نسخة)`;

    const duplicatedProj: ExamProject = {
      id: newId,
      title: duplicatedDoc.title,
      subject: source.subject,
      grade: source.grade,
      school: source.school,
      templateType: source.templateType,
      lastModified: now,
      createdAt: now,
      document: duplicatedDoc
    };

    const updatedList = [duplicatedProj, ...state.projects];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (e) {}

    set({ projects: updatedList });
    return duplicatedProj;
  },

  deleteProject: (id: string) => {
    const state = get();
    const updatedList = state.projects.filter(p => p.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (e) {}

    set({ 
      projects: updatedList, 
      activeProjectId: state.activeProjectId === id ? (updatedList[0]?.id || null) : state.activeProjectId 
    });
  },

  exportRaqFile: (id: string) => {
    const state = get();
    const proj = state.projects.find(p => p.id === id);
    if (!proj) return;

    const raqData = {
      app: 'Raqeem Exam Studio',
      version: '2.0.0',
      type: 'exam_project',
      exportedAt: new Date().toISOString(),
      project: proj
    };

    const jsonString = JSON.stringify(raqData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeTitle = (proj.title || 'مشروع_امتحان').replace(/[^\w\u0600-\u06FF]/gi, '_');
    link.download = `${safeTitle}.raq`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  importRaqFile: (jsonContent: string) => {
    try {
      const data = JSON.parse(jsonContent);
      let importedDoc: DocumentState | null = null;
      
      if (data.project && data.project.document) {
        importedDoc = data.project.document;
      } else if (data.pages && data.metadata) {
        importedDoc = data as DocumentState;
      }

      if (!importedDoc || !importedDoc.pages) {
        throw new Error('ملف .raq غير صالح أو تالف');
      }

      const newId = uuid();
      importedDoc.id = newId;
      const now = Date.now();

      const newProj: ExamProject = {
        id: newId,
        title: importedDoc.title || `${importedDoc.metadata?.examTitle || 'امتحان مستورد'}`,
        subject: importedDoc.metadata?.subject || 'المادة',
        grade: importedDoc.metadata?.grade || 'الصف',
        school: importedDoc.metadata?.school || 'المدرسة',
        templateType: importedDoc.metadata?.templateType || 'ministerial',
        lastModified: now,
        createdAt: now,
        document: importedDoc
      };

      const state = get();
      const updatedList = [newProj, ...state.projects];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      localStorage.setItem('raq_autosave_document', JSON.stringify(importedDoc));

      set({ projects: updatedList, activeProjectId: newProj.id });
      return newProj;
    } catch (e) {
      console.error('Error importing .raq file:', e);
      return null;
    }
  }
}));
