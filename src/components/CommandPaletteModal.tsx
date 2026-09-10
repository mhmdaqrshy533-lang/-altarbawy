import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Command, FileText, CheckSquare, HelpCircle, Hash, Plus, 
  Type, Table, Image, Sparkles, Printer, Download, Eye, Grid, 
  Settings, Zap, ArrowRight, CornerDownLeft, Award, BookOpen
} from 'lucide-react';
import { useEditorStore } from '../editor/store/useEditorStore';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFontPicker?: () => void;
  onOpenPrintCenter?: () => void;
  onOpenPageManager?: () => void;
  onOpenAssetBank?: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onOpenFontPicker,
  onOpenPrintCenter,
  onOpenPageManager,
  onOpenAssetBank,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { activePageIndex, addQuestion, addElement, setZoom, zoom } = useEditorStore();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Global keydown handler for Ctrl+Shift+P / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K' || (e.shiftKey && (e.key === 'p' || e.key === 'P')))) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or state
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    {
      id: 'add-mcq',
      category: 'إضافة أسئلة',
      title: 'إضافة سؤال اختيار من متعدد',
      description: 'إدراج سؤال خيارات مع أزرار تحديد إجابة نموذجية',
      icon: CheckSquare,
      color: 'text-indigo-600 bg-indigo-50',
      action: () => {
        addQuestion(activePageIndex, 'اختر الإجابة الصحيحة من بين الخيارات الآتية:');
        onClose();
      }
    },
    {
      id: 'add-tf',
      category: 'إضافة أسئلة',
      title: 'إضافة سؤال صح أم خطأ',
      description: 'إدراج عبارة تقييم حقيقة مع خيارات صح/خطأ ودوائر تصحيح',
      icon: HelpCircle,
      color: 'text-emerald-600 bg-emerald-50',
      action: () => {
        addQuestion(activePageIndex, 'ضع علامة (✓) أو (✗) أمام العبارات الآتية:');
        onClose();
      }
    },
    {
      id: 'add-essay',
      category: 'إضافة أسئلة',
      title: 'إضافة سؤال مقالي / إجابة قصيرة',
      description: 'إدراج سؤال مقالي مع أسطر تنقيط كافية للإجابة',
      icon: FileText,
      color: 'text-amber-600 bg-amber-50',
      action: () => {
        addQuestion(activePageIndex, 'أجب عن الأسئلة الآتية بالتفصيل والتعليل:');
        onClose();
      }
    },
    {
      id: 'add-text',
      category: 'أدوات التحرير',
      title: 'إدراج كتلة نصية جديدة',
      description: 'إضافة نص حرة القالب للتنسيق وإضافة الملاحظات',
      icon: Type,
      color: 'text-sky-600 bg-sky-50',
      action: () => {
        addElement(activePageIndex, {
          id: crypto.randomUUID(),
          type: 'text',
          x: 50,
          y: 200,
          width: 500,
          height: 60,
          rotation: 0,
          isLocked: false,
          isHidden: false,
          zIndex: 2,
          content: 'نص جديد قابل للتحرير والتنسيق المباشر',
          fontSize: 16,
          fontFamily: 'Noto Naskh Arabic',
          fontWeight: 'normal',
          color: '#000000',
          textAlign: 'right'
        });
        onClose();
      }
    },
    {
      id: 'font-picker',
      category: 'التنسيق والخطوط',
      title: 'مكتبة الخطوط وأنماط الطباعة',
      description: 'استعراض الخطوط العربية واللاتينية وتنزيلها للعمل offline',
      icon: Sparkles,
      color: 'text-purple-600 bg-purple-50',
      action: () => {
        onClose();
        if (onOpenFontPicker) onOpenFontPicker();
      }
    },
    {
      id: 'asset-bank',
      category: 'أدوات الوسائط',
      title: 'مكتبة العناصر والأشكال والشعارات',
      description: 'استيراد الصور والشعارات الوطنية والأشكال الهندسية',
      icon: Image,
      color: 'text-rose-600 bg-rose-50',
      action: () => {
        onClose();
        if (onOpenAssetBank) onOpenAssetBank();
      }
    },
    {
      id: 'print-center',
      category: 'الطباعة والتصدير',
      title: 'مركز الطباعة الاحترافية والتصدير PDF',
      description: 'إعدادات الطباعة 300DPI وعلامات القص والهوامش',
      icon: Printer,
      color: 'text-blue-600 bg-blue-50',
      action: () => {
        onClose();
        if (onOpenPrintCenter) onOpenPrintCenter();
      }
    },
    {
      id: 'page-manager',
      category: 'إدارة المستند',
      title: 'إدارة الصفحات والقوالب',
      description: 'إضافة صفحة جديدة، تغيير الترتيب، وإدارة الترويسات',
      icon: BookOpen,
      color: 'text-teal-600 bg-teal-50',
      action: () => {
        onClose();
        if (onOpenPageManager) onOpenPageManager();
      }
    },
    {
      id: 'zoom-in',
      category: 'العرض والمكياج',
      title: 'تكبير مساحة العمل (Zoom In)',
      description: 'زيادة مقياس عرض الصفحة بالتناسب',
      icon: Zap,
      color: 'text-slate-600 bg-slate-100',
      action: () => {
        setZoom(Math.min(zoom + 10, 200));
        onClose();
      }
    },
    {
      id: 'zoom-out',
      category: 'العرض والمكياج',
      title: 'تصغير مساحة العمل (Zoom Out)',
      description: 'تقليل مقياس عرض الصفحة لمراجعة الهيكل',
      icon: Eye,
      color: 'text-slate-600 bg-slate-100',
      action: () => {
        setZoom(Math.max(zoom - 10, 50));
        onClose();
      }
    },
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.title.includes(searchQuery) || 
    cmd.description.includes(searchQuery) || 
    cmd.category.includes(searchQuery)
  );

  const handleKeyDownInput = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-start justify-center pt-20 px-4" dir="rtl">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="relative flex items-center px-5 py-4 border-b border-slate-100 bg-slate-50/80">
          <Search size={22} className="text-slate-400 ml-3" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownInput}
            placeholder="ابحث عن أي أمر، أداة، أو عنصر لتنفيذه مباشرة... (Ctrl+K)"
            className="w-full bg-transparent text-slate-800 text-sm font-bold placeholder-slate-400 focus:outline-none"
          />
          <kbd className="hidden sm:flex items-center gap-1 text-[10px] font-mono font-bold bg-white text-slate-500 px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
            <Command size={11} /> K
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
          {filteredCommands.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-bold text-xs">
              لم يتم العثور على أي أوامر تطابق "{searchQuery}"
            </div>
          ) : (
            <div className="space-y-1">
              {filteredCommands.map((cmd, idx) => {
                const IconComponent = cmd.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={cmd.id}
                    onClick={() => cmd.action()}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-right p-3 rounded-2xl flex items-center justify-between transition-all ${
                      isSelected ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-white/20 text-white' : cmd.color}`}>
                        <IconComponent size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-xs">{cmd.title}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            isSelected ? 'bg-white/20 text-indigo-100' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {cmd.category}
                          </span>
                        </div>
                        <p className={`text-[11px] mt-0.5 font-medium ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                          {cmd.description}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="flex items-center gap-1 text-[10px] font-bold text-white bg-white/20 px-2.5 py-1 rounded-lg">
                        <span>تنفيذ</span>
                        <CornerDownLeft size={12} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400">
          <div className="flex items-center gap-3">
            <span>استخدم الأسهم <kbd className="bg-white border px-1 rounded">↑</kbd> <kbd className="bg-white border px-1 rounded">↓</kbd> للتنقل</span>
            <span><kbd className="bg-white border px-1 rounded">Enter</kbd> للتنفيذ</span>
          </div>
          <div>منصة الرقيم - نظام الأوامر السريعة</div>
        </div>
      </div>
    </div>
  );
};
