import { EditorElement, Page } from '../types';

export const generateMinisterialTemplate = (): EditorElement[] => {
  const elements: EditorElement[] = [];
  const baseId = crypto.randomUUID();

  // Ministry Info (Right)
  elements.push({
    id: `${baseId}-min-right`,
    type: 'text',
    x: 550, y: 30, width: 220, height: 100,
    rotation: 0, isLocked: false, isHidden: false, zIndex: 1,
    content: 'الجمهورية اليمنية\nوزارة التربية والتعليم\nمكتب التربية والتعليم بمحافظة/ .....\nإدارة التربية والتعليم مديرية/ .....\nمدرسة/ .....',
    fontSize: 14, fontFamily: 'Arial', fontWeight: 'bold', color: '#000000', textAlign: 'right'
  });

  // Student Info (Left)
  elements.push({
    id: `${baseId}-min-left`,
    type: 'text',
    x: 30, y: 30, width: 250, height: 100,
    rotation: 0, isLocked: false, isHidden: false, zIndex: 1,
    content: 'الاسم: .......................................\nرقم الجلوس: ( ............ )\nالصف: ............ الشعبة: ............\nالتاريخ:     /    / 202 م\nالزمن: ..................',
    fontSize: 14, fontFamily: 'Arial', fontWeight: 'bold', color: '#000000', textAlign: 'right'
  });

  // Center Logo
  elements.push({
    id: `${baseId}-min-logo`,
    type: 'image',
    x: 350, y: 30, width: 90, height: 90,
    rotation: 0, isLocked: false, isHidden: false, zIndex: 1,
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Emblem_of_Yemen.svg/200px-Emblem_of_Yemen.svg.png'
  });

  // Title
  elements.push({
    id: `${baseId}-min-title`,
    type: 'text',
    x: 200, y: 130, width: 394, height: 40,
    rotation: 0, isLocked: false, isHidden: false, zIndex: 1,
    content: 'اختبار الفصل الدراسي الأول للعام 1445 هـ',
    fontSize: 18, fontFamily: 'Arial', fontWeight: 'bold', color: '#000000', textAlign: 'center'
  });

  // Cut line
  elements.push({
    id: `${baseId}-min-cut`,
    type: 'text',
    x: 30, y: 180, width: 734, height: 20,
    rotation: 0, isLocked: false, isHidden: false, zIndex: 1,
    content: 'قـــص هنـــــــاء - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - قـــص هنـــــــاء',
    fontSize: 10, fontFamily: 'Arial', fontWeight: 'normal', color: '#666666', textAlign: 'center'
  });

  return elements;
};
