import { BookProject, BookSubject, ColorPalette, FontPairing } from '../types';

export interface EditorProfile {
  theme: string;
  palette: ColorPalette;
  fonts: FontPairing;
  enabledTools: string[];
  quickBlocks: string[];
}

export class BookPersonalizationEngine {
  
  static buildCoverPrompt(draft: Partial<BookProject>): string {
    const subject = draft.subject || 'الرياضيات';
    const stage = draft.stage || 'الثانوية العامة';
    const title = draft.title || 'كتاب منهج جديد';
    
    let subjectContext = 'educational, clean, modern academic design';
    
    switch (subject) {
      case 'الرياضيات':
        subjectContext = 'Mathematical formulas, Geometry, Academic style, abstract math concepts, calculus symbols, clean composition';
        break;
      case 'الفيزياء':
        subjectContext = 'Physics diagrams, Scientific illustrations, Equations, Laboratory theme, quantum mechanics, clean scientific composition';
        break;
      case 'الكيمياء':
        subjectContext = 'Periodic table, Molecules, Chemical reactions, Laboratory equipment, chemistry abstract art';
        break;
      case 'الأحياء':
        subjectContext = 'DNA, Cells, Microscope, Scientific graphics, biology illustrations, nature, microscopic view';
        break;
      case 'اللغة العربية':
        subjectContext = 'Arabic calligraphy, Manuscripts, Elegant ornaments, Educational style, Arabic geometric patterns, classic literary feel';
        break;
      case 'التربية الإسلامية':
        subjectContext = 'Islamic ornaments, Formal design, No living beings, Arabic geometric patterns, elegant classic design';
        break;
      case 'اللغة الإنجليزية':
        subjectContext = 'English alphabet letters, literature symbols, modern communication graphics, global education style';
        break;
      case 'العلوم العامة':
        subjectContext = 'General science graphics, planets, atoms, microscope, nature, modern science textbook cover';
        break;
      case 'التاريخ':
      case 'الجغرافيا':
        subjectContext = 'Maps, historical monuments, compass, geography, earth, ancient artifacts, historical textbook cover';
        break;
    }

    return `A professional textbook cover design. Title concept: "${title}". Stage: ${stage}. Theme: ${subjectContext}. Vector art style, high quality, flat design elements, center focal point, suitable for an A4 book cover, no text overlay, minimal, professional, educational.`;
  }

  static async generateCover(prompt: string): Promise<string> {
    try {
      const response = await fetch('/api/image/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      if (!response.ok) {
        throw new Error('Failed to generate cover image');
      }
      const data = await response.json();
      return data.imageUrl;
    } catch (e) {
      console.error('[BookPersonalizationEngine] generateCover error:', e);
      throw e;
    }
  }

  static buildEditorProfile(subject: BookSubject | string): EditorProfile {
    const profile: EditorProfile = {
      theme: 'light',
      palette: {
        id: 'palette_default',
        name: 'الافتراضي الأكاديمي',
        primary: '#3b82f6',
        secondary: '#1d4ed8',
        accent: '#93c5fd',
        background: '#ffffff',
        surface: '#f8fafc',
        textPrimary: '#1e293b',
        textSecondary: '#64748b'
      },
      fonts: {
        id: 'font_default',
        name: 'القاهرة والنخ',
        headingFont: 'Cairo',
        bodyFont: 'Noto Naskh Arabic',
        captionFont: 'Cairo'
      },
      enabledTools: ['text', 'image', 'table'],
      quickBlocks: ['paragraph', 'title']
    };

    switch (subject) {
      case 'الرياضيات':
        profile.palette = {
          id: 'palette_math',
          name: 'الرياضيات الأكاديمية',
          primary: '#0284c7',
          secondary: '#0369a1',
          accent: '#7dd3fc',
          background: '#ffffff',
          surface: '#f0f9ff',
          textPrimary: '#0f172a',
          textSecondary: '#334155'
        };
        profile.enabledTools = ['text', 'image', 'table', 'math', 'latex', 'fractions', 'matrices', 'roots'];
        profile.quickBlocks = ['example', 'theorem', 'proof', 'exercise', 'question'];
        break;

      case 'الفيزياء':
        profile.palette = {
          id: 'palette_physics',
          name: 'الفيزياء الحديثة',
          primary: '#7c3aed',
          secondary: '#5b21b6',
          accent: '#c4b5fd',
          background: '#ffffff',
          surface: '#f5f3ff',
          textPrimary: '#1e1b4b',
          textSecondary: '#4c1d95'
        };
        profile.enabledTools = ['text', 'image', 'table', 'math', 'laws', 'units', 'diagrams'];
        profile.quickBlocks = ['law', 'example', 'experiment', 'note'];
        break;

      case 'الكيمياء':
        profile.palette = {
          id: 'palette_chemistry',
          name: 'الكيمياء العلمية',
          primary: '#059669',
          secondary: '#047857',
          accent: '#6ee7b7',
          background: '#ffffff',
          surface: '#ecfdf5',
          textPrimary: '#064e3b',
          textSecondary: '#047857'
        };
        profile.enabledTools = ['text', 'image', 'table', 'reactions', 'periodic_table', 'formulas'];
        profile.quickBlocks = ['reaction', 'experiment', 'definition', 'safety'];
        break;

      case 'اللغة العربية':
        profile.palette = {
          id: 'palette_arabic',
          name: 'العربية الأصيلة',
          primary: '#b45309',
          secondary: '#92400e',
          accent: '#fcd34d',
          background: '#ffffff',
          surface: '#fffbeb',
          textPrimary: '#451a03',
          textSecondary: '#78350f'
        };
        profile.fonts = {
          id: 'font_amiri',
          name: 'الأميري والنسخ',
          headingFont: 'Amiri',
          bodyFont: 'Noto Naskh Arabic',
          captionFont: 'Amiri'
        };
        profile.enabledTools = ['text', 'image', 'table', 'tashkeel', 'irab', 'poetry', 'ornaments'];
        profile.quickBlocks = ['poetry', 'grammar_rule', 'meaning', 'example'];
        break;

      case 'التربية الإسلامية':
        profile.palette = {
          id: 'palette_islamic',
          name: 'المنهج الإسلامي',
          primary: '#15803d',
          secondary: '#166534',
          accent: '#86efac',
          background: '#ffffff',
          surface: '#f0fdf4',
          textPrimary: '#14532d',
          textSecondary: '#166534'
        };
        profile.fonts = {
          id: 'font_quran',
          name: 'خط الأميري القرآني',
          headingFont: 'Amiri',
          bodyFont: 'Amiri',
          captionFont: 'Amiri'
        };
        profile.enabledTools = ['text', 'image', 'table', 'quran_verses', 'hadith', 'ornaments'];
        profile.quickBlocks = ['quran_verse', 'hadith', 'fiqh_rule', 'explanation'];
        break;

      case 'اللغة الإنجليزية':
        profile.palette = {
          id: 'palette_english',
          name: 'الانجليزية المعاصرة',
          primary: '#dc2626',
          secondary: '#b91c1c',
          accent: '#fca5a5',
          background: '#ffffff',
          surface: '#fef2f2',
          textPrimary: '#450a0a',
          textSecondary: '#991b1b'
        };
        profile.fonts = {
          id: 'font_latin',
          name: 'اللاتيني الرسمي',
          headingFont: 'Arial',
          bodyFont: 'Times New Roman',
          captionFont: 'Arial'
        };
        profile.enabledTools = ['text', 'image', 'table', 'ltr', 'spellcheck', 'dictionary'];
        profile.quickBlocks = ['grammar_rule', 'vocabulary', 'dialogue', 'reading'];
        break;

      case 'العلوم العامة':
      case 'الأحياء':
        profile.palette = {
          id: 'palette_science',
          name: 'العلوم والطبيعة',
          primary: '#0d9488',
          secondary: '#0f766e',
          accent: '#5eead4',
          background: '#ffffff',
          surface: '#f0fdfa',
          textPrimary: '#134e4a',
          textSecondary: '#115e59'
        };
        profile.enabledTools = ['text', 'image', 'table', 'diagrams', 'charts', 'biology_models'];
        profile.quickBlocks = ['fact', 'experiment', 'observation', 'summary'];
        break;
    }
    
    return profile;
  }
}
