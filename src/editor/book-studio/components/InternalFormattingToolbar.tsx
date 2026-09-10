import React from 'react';
import { FormattingBlockType } from '../types';
import { 
  BookOpen, Type, Sparkles, AlertCircle, HelpCircle, 
  FlaskConical, Table, Image, Quote, CheckCircle2, FileText, Bookmark 
} from 'lucide-react';

interface InternalFormattingToolbarProps {
  onInsertBlock: (type: FormattingBlockType) => void;
}

const FORMATTING_BLOCKS: { type: FormattingBlockType; label: string; icon: any; color: string }[] = [
  { type: 'chapter_title', label: 'عنوان فصل مجهّز', icon: Bookmark, color: 'text-indigo-400' },
  { type: 'lesson_heading', label: 'ترويسة درس جديد', icon: BookOpen, color: 'text-blue-400' },
  { type: 'definition', label: 'صندوق تعريف مصطلح', icon: Sparkles, color: 'text-amber-400' },
  { type: 'solved_example', label: 'مثال محلول بالخطوات', icon: CheckCircle2, color: 'text-emerald-400' },
  { type: 'important_note', label: 'تنبيه وملاحظة هامة', icon: AlertCircle, color: 'text-sky-400' },
  { type: 'question_block', label: 'سؤال وتمرين تقويمي', icon: HelpCircle, color: 'text-purple-400' },
  { type: 'lab_experiment', label: 'صندوق تجربة عمليّة', icon: FlaskConical, color: 'text-teal-400' },
  { type: 'lesson_summary', label: 'ملخص وخلاصة الدرس', icon: FileText, color: 'text-rose-400' },
  { type: 'table', label: 'جدول بيانات متناسق', icon: Table, color: 'text-slate-300' },
  { type: 'quote', label: 'اقتباس شهير / حكمة', icon: Quote, color: 'text-amber-300' }
];

export const InternalFormattingToolbar: React.FC<InternalFormattingToolbarProps> = ({ onInsertBlock }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 flex items-center gap-1.5 overflow-x-auto custom-scrollbar font-sans select-none" dir="rtl">
      <span className="text-[11px] font-black text-slate-400 px-2 shrink-0 border-l border-slate-800">
        أنماط التنسيق الداخلي:
      </span>

      {FORMATTING_BLOCKS.map(block => {
        const IconComp = block.icon;
        return (
          <button
            key={block.type}
            onClick={() => onInsertBlock(block.type)}
            className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800/80 rounded-xl text-xs font-bold text-slate-200 transition-all flex items-center gap-1.5 shrink-0 hover:border-indigo-500/50"
            title={`إدراج ${block.label}`}
          >
            <IconComp size={14} className={block.color} />
            <span>{block.label}</span>
          </button>
        );
      })}
    </div>
  );
};
