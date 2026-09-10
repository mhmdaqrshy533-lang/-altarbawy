import React, { useState } from 'react';
import { useBookStudioStore } from '../store/useBookStudioStore';
import { BookOutlineItem } from '../types';
import { 
  X, Plus, Trash2, ArrowUp, ArrowDown, FolderTree, 
  FileText, Bookmark, BookOpen, Layers, Check 
} from 'lucide-react';

interface ChapterManagerDrawerProps {
  onClose: () => void;
  onJumpToPage: (pageIndex: number) => void;
}

export const ChapterManagerDrawer: React.FC<ChapterManagerDrawerProps> = ({ onClose, onJumpToPage }) => {
  const { currentProject, updateOutline } = useBookStudioStore();
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<BookOutlineItem['type']>('chapter');

  if (!currentProject) return null;
  const outline = currentProject.outline;

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= outline.length) return;

    const copy = [...outline];
    const temp = copy[index];
    copy[index] = copy[nextIndex];
    copy[nextIndex] = temp;
    updateOutline(copy);
  };

  const handleAddItem = () => {
    if (!newTitle.trim()) return;
    const newItem: BookOutlineItem = {
      id: `sec_${Date.now()}`,
      title: newTitle,
      type: newType,
      pageIndex: Math.max(1, outline.length)
    };
    updateOutline([...outline, newItem]);
    setNewTitle('');
  };

  const handleDeleteItem = (id: string) => {
    updateOutline(outline.filter(item => item.id !== id));
  };

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-80 md:w-96 bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col font-sans select-none text-slate-100" dir="rtl">
      
      {/* Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <FolderTree size={20} className="text-indigo-400" />
          <h3 className="text-sm font-black text-white">مدير هيكلية الكتاب والفصول</h3>
        </div>
        <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800">
          <X size={16} />
        </button>
      </div>

      {/* Add Item Bar */}
      <div className="p-3 bg-slate-950/60 border-b border-slate-800 space-y-2 text-xs font-bold">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="عنوان الـوحدة أو الفصل الجديد..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleAddItem}
            className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-md"
          >
            <Plus size={18} />
          </button>
        </div>

        <select
          value={newType}
          onChange={(e) => setNewType(e.target.value as any)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-300 focus:outline-none"
        >
          <option value="unit">وحدة منهجية رئيسية</option>
          <option value="chapter">فصل منهجي</option>
          <option value="lesson">درس تعليمي</option>
          <option value="activity">نشاط وتطبيق</option>
          <option value="quiz">اختبار وتقويم</option>
          <option value="appendix">ملحق / مرجع</option>
        </select>
      </div>

      {/* Outline List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
        {outline.map((item, idx) => (
          <div
            key={item.id}
            className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-2 ${
              item.type === 'unit' 
                ? 'bg-indigo-950/60 border-indigo-500/40 text-indigo-200' 
                : item.type === 'chapter'
                ? 'bg-slate-800/80 border-slate-700 text-white'
                : 'bg-slate-950 border-slate-800 text-slate-300'
            }`}
          >
            <div 
              onClick={() => onJumpToPage(item.pageIndex)}
              className="flex-1 cursor-pointer flex items-center gap-2 overflow-hidden"
            >
              <span className="px-1.5 py-0.5 bg-slate-900 border border-slate-700 text-[10px] font-mono rounded text-slate-400 shrink-0">
                صفحة {item.pageIndex + 1}
              </span>
              <span className="text-xs font-bold truncate">{item.title}</span>
            </div>

            {/* Reorder & Delete */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => handleMove(idx, 'up')}
                disabled={idx === 0}
                className="p-1 hover:bg-slate-700 disabled:opacity-30 rounded text-slate-300"
              >
                <ArrowUp size={13} />
              </button>

              <button
                onClick={() => handleMove(idx, 'down')}
                disabled={idx === outline.length - 1}
                className="p-1 hover:bg-slate-700 disabled:opacity-30 rounded text-slate-300"
              >
                <ArrowDown size={13} />
              </button>

              <button
                onClick={() => handleDeleteItem(item.id)}
                className="p-1 hover:bg-rose-950 hover:text-rose-400 rounded text-slate-500"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
