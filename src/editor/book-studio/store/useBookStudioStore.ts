import { create } from 'zustand';
import { 
  BookProject, 
  BookDocumentType, 
  BookSubject, 
  EducationalStage, 
  PaperSize, 
  PageOrientation, 
  ColorPalette, 
  FontPairing, 
  CoverSettings, 
  BookOutlineItem,
  StudioDrawerType
} from '../types';
import { 
  DOCUMENT_TYPE_CONFIGS, 
  SMART_COLOR_PALETTES, 
  FONT_LIBRARY, 
  DEFAULT_COVER_SETTINGS, 
  generateDefaultBookOutline,
  getSubjectSuggestedPalette 
} from '../data';
import { Page } from '../../types';
import { PersistenceEngine } from '../../../core/PersistenceEngine';

interface BookStudioStore {
  currentProject: BookProject | null;
  savedProjects: BookProject[];
  activeView: 'dashboard' | 'wizard' | 'editor';
  wizardStep: number;
  wizardDraft: Partial<BookProject>;
  activeDrawer: StudioDrawerType;

  // Actions
  loadSavedProjects: () => void;
  startWizardWithDocType: (type: BookDocumentType) => void;
  setWizardStep: (step: number) => void;
  updateWizardDraft: (data: Partial<BookProject>) => void;
  finishWizardAndCreateProject: () => Promise<BookProject>;
  openProject: (id: string) => void;
  saveCurrentProject: () => void;
  duplicateProject: (id: string) => void;
  deleteProject: (id: string) => void;

  // Editor Actions
  setCurrentProject: (project: BookProject) => void;
  updateCoverSettings: (coverUpdates: Partial<CoverSettings>) => void;
  updatePalette: (palette: ColorPalette) => void;
  updateColorPalette: (palette: ColorPalette) => void;
  updateFontPairing: (fontPairing: FontPairing) => void;
  updateOutline: (outline: BookOutlineItem[]) => void;
  setActiveView: (view: 'dashboard' | 'wizard' | 'editor') => void;
  setActiveDrawer: (drawer: StudioDrawerType) => void;
  importProjectFromFile: (jsonString: string) => boolean;
}

const STORAGE_KEY = 'raqeem_book_projects';

export const useBookStudioStore = create<BookStudioStore>((set, get) => ({
  currentProject: null,
  savedProjects: [],
  activeView: 'dashboard',
  wizardStep: 1,
  wizardDraft: {},
  activeDrawer: 'none',

  loadSavedProjects: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          set({ savedProjects: parsed });
        }
      }
    } catch (e) {
      console.error('Failed to load book projects from storage', e);
    }
  },

  startWizardWithDocType: (docType: BookDocumentType) => {
    const config = DOCUMENT_TYPE_CONFIGS.find(c => c.id === docType) || DOCUMENT_TYPE_CONFIGS[0];
    const defaultSubject: BookSubject = 'الرياضيات';
    const suggestedPalette = getSubjectSuggestedPalette(defaultSubject);

    set({
      wizardStep: 1,
      activeView: 'wizard',
      wizardDraft: {
        documentType: docType,
        title: config.title,
        subject: defaultSubject,
        stage: 'الثانوية العامة',
        grade: 'الصف الثالث الثانوي',
        semester: 'الفصل الأول',
        language: 'العربية',
        paperSize: 'A4',
        orientation: 'portrait',
        palette: suggestedPalette,
        fontPairing: FONT_LIBRARY[0],
        cover: {
          ...DEFAULT_COVER_SETTINGS,
          mainTitle: config.title,
          subtitle: `المرحلة الثانوية — المنهج الرسمي`
        }
      }
    });
  },

  setWizardStep: (step: number) => {
    set({ wizardStep: Math.max(1, Math.min(12, step)) });
  },

  updateWizardDraft: (data: Partial<BookProject>) => {
    set(state => {
      const updatedDraft = { ...state.wizardDraft, ...data };
      // Auto adjust color palette when subject changes
      if (data.subject && !data.palette) {
        updatedDraft.palette = getSubjectSuggestedPalette(data.subject);
      }
      return { wizardDraft: updatedDraft };
    });
  },

  finishWizardAndCreateProject: async () => {
    const draft = get().wizardDraft;
    const docType = draft.documentType || 'book';
    const title = draft.title || 'كتاب منهج جديد';
    const id = `book_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Generate pages for Raqeem DTP engine (13 sequential book pages)
    const pagesCount = 13;
    const pages: Page[] = Array.from({ length: pagesCount }, (_, i) => ({
      id: `book_page_${i + 1}`,
      elements: []
    }));

    const outline = generateDefaultBookOutline(title);

    const newProject: BookProject = {
      id,
      documentType: docType,
      title,
      subject: draft.subject || 'الرياضيات',
      stage: draft.stage || 'الثانوية العامة',
      grade: draft.grade || 'الصف الثالث الثانوي',
      semester: draft.semester || 'الفصل الأول',
      language: draft.language || 'العربية',
      paperSize: draft.paperSize || 'A4',
      orientation: draft.orientation || 'portrait',
      palette: draft.palette || SMART_COLOR_PALETTES[0],
      fontPairing: draft.fontPairing || FONT_LIBRARY[0],
      cover: draft.cover || DEFAULT_COVER_SETTINGS,
      outline,
      pages,
      metadata: {
        governorate: 'وزارة التربية والتعليم',
        directorate: 'الإدارة العامة للمناهج والكتب المدرسية',
        school: 'منصة الرقيم للنشر المنهجي',
        stage: draft.stage || 'الثانوية العامة',
        grade: draft.grade || 'الصف الثالث الثانوي',
        division: 'علمي',
        subject: draft.subject || 'الرياضيات',
        semester: draft.semester || 'الفصل الأول',
        round: 'الأول',
        academicYear: '1448 هـ / 2026 م',
        examTitle: title,
        time: 'منهج مدرسي',
        marks: '100',
        examType: 'كتاب منهجي وزاري',
        teacherName: draft.cover?.authorName || 'مؤلف المنهج',
        templateType: 'book_studio'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: draft.cover?.authorName || 'المعلم المبدع',
      version: '1.0'
    };

    const savedProjects = [newProject, ...get().savedProjects];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedProjects));
    } catch (e) {
      console.error('Failed to store project', e);
    }

    set({
      currentProject: newProject,
      savedProjects,
      activeView: 'editor'
    });

    return newProject;
  },

  openProject: (id: string) => {
    const found = get().savedProjects.find(p => p.id === id);
    if (found) {
      set({
        currentProject: found,
        activeView: 'editor'
      });
    }
  },

  saveCurrentProject: () => {
    const current = get().currentProject;
    if (!current) return;

    const updated = {
      ...current,
      updatedAt: new Date().toISOString()
    };

    const list = get().savedProjects.map(p => p.id === current.id ? updated : p);
    if (!list.find(p => p.id === current.id)) {
      list.unshift(updated);
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to update project list', e);
    }

    PersistenceEngine.saveDocument(updated.id, 'books', updated.title, updated).catch(() => {});

    set({ currentProject: updated, savedProjects: list });
  },

  duplicateProject: (id: string) => {
    const target = get().savedProjects.find(p => p.id === id);
    if (!target) return;

    const newId = `book_${Date.now()}_dup`;
    const duplicated: BookProject = {
      ...target,
      id: newId,
      title: `${target.title} (نسخة معدلة)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const list = [duplicated, ...get().savedProjects];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }

    set({ savedProjects: list });
  },

  deleteProject: (id: string) => {
    const filtered = get().savedProjects.filter(p => p.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.error(e);
    }
    set(state => ({
      savedProjects: filtered,
      currentProject: state.currentProject?.id === id ? null : state.currentProject,
      activeView: state.currentProject?.id === id ? 'dashboard' : state.activeView
    }));
  },

  setCurrentProject: (project: BookProject) => {
    set({ currentProject: project });
  },

  updateCoverSettings: (coverUpdates: Partial<CoverSettings>) => {
    set(state => {
      if (!state.currentProject) return state;
      const updatedProject: BookProject = {
        ...state.currentProject,
        cover: { ...state.currentProject.cover, ...coverUpdates },
        updatedAt: new Date().toISOString()
      };
      return { currentProject: updatedProject };
    });
  },

  updatePalette: (palette: ColorPalette) => {
    set(state => {
      if (!state.currentProject) return state;
      return {
        currentProject: {
          ...state.currentProject,
          palette,
          updatedAt: new Date().toISOString()
        }
      };
    });
  },

  updateColorPalette: (palette: ColorPalette) => {
    set(state => {
      if (!state.currentProject) return state;
      return {
        currentProject: {
          ...state.currentProject,
          palette,
          updatedAt: new Date().toISOString()
        }
      };
    });
  },

  updateFontPairing: (fontPairing: FontPairing) => {
    set(state => {
      if (!state.currentProject) return state;
      return {
        currentProject: {
          ...state.currentProject,
          fontPairing,
          updatedAt: new Date().toISOString()
        }
      };
    });
  },

  updateOutline: (outline: BookOutlineItem[]) => {
    set(state => {
      if (!state.currentProject) return state;
      return {
        currentProject: {
          ...state.currentProject,
          outline,
          updatedAt: new Date().toISOString()
        }
      };
    });
  },

  setActiveView: (view) => set({ activeView: view }),
  setActiveDrawer: (drawer) => set({ activeDrawer: drawer }),

  importProjectFromFile: (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.id && parsed.documentType && parsed.title) {
        const list = [parsed, ...get().savedProjects];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        set({ savedProjects: list, currentProject: parsed, activeView: 'editor' });
        return true;
      }
    } catch (e) {
      console.error('Invalid Raqeem Book File', e);
    }
    return false;
  }
}));
