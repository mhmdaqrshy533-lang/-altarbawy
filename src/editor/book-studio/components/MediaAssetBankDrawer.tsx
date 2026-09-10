import React, { useState } from 'react';
import { 
  X, Search, Image, FlaskConical, Zap, Activity, Dna, 
  Award, Globe, Grid, Plus, Check 
} from 'lucide-react';

interface MediaAssetBankDrawerProps {
  onClose: () => void;
  onInsertSvg: (svgContent: string, name: string) => void;
  onInsertImage: (src: string) => void;
}

const PRESET_ASSETS = [
  {
    category: 'math',
    name: 'شبكة إحداثيات ورسم بياني',
    type: 'svg',
    content: '<svg viewBox="0 0 200 200" fill="none" stroke="#1e40af" stroke-width="2"><rect width="200" height="200" fill="#f8fafc"/><path d="M0 100h200M100 0v200" stroke="#000" stroke-width="2"/><path d="M20 180 Q 100 20 180 180" stroke="#2563eb" stroke-width="3"/></svg>'
  },
  {
    category: 'physics',
    name: 'موجة كهرومغناطيسية وتذبذب',
    type: 'svg',
    content: '<svg viewBox="0 0 200 100" fill="none" stroke="#2563eb" stroke-width="3"><path d="M0 50 Q 25 10, 50 50 T 100 50 T 150 50 T 200 50"/><circle cx="50" cy="50" r="10" fill="#2563eb"/></svg>'
  },
  {
    category: 'chemistry',
    name: 'تركيب جزيئي وحلقة بنزين',
    type: 'svg',
    content: '<svg viewBox="0 0 200 200" fill="none" stroke="#059669" stroke-width="3"><polygon points="100,20 170,60 170,140 100,180 30,140 30,60"/><circle cx="100" cy="100" r="45" stroke="#10b981"/></svg>'
  },
  {
    category: 'biology',
    name: 'خلية حية ورسم توضيحي',
    type: 'svg',
    content: '<svg viewBox="0 0 200 200" fill="none" stroke="#0d9488" stroke-width="3"><ellipse cx="100" cy="100" rx="80" ry="60" fill="#f0fdfa"/><ellipse cx="100" cy="100" rx="30" ry="20" fill="#0d9488"/></svg>'
  },
  {
    category: 'islamic',
    name: 'إطار زخرفة إسلامية عريقة',
    type: 'svg',
    content: '<svg viewBox="0 0 200 200" fill="none" stroke="#d97706" stroke-width="3"><rect x="10" y="10" width="180" height="180" rx="10"/><rect x="20" y="20" width="160" height="160" rx="5" stroke="#b45309"/></svg>'
  }
];

export const MediaAssetBankDrawer: React.FC<MediaAssetBankDrawerProps> = ({ onClose, onInsertSvg, onInsertImage }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredAssets = PRESET_ASSETS.filter(a => {
    const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory;
    const matchesSearch = a.name.includes(search);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-y-0 left-0 z-40 w-80 md:w-96 bg-slate-900 border-r border-slate-800 shadow-2xl flex flex-col font-sans select-none text-slate-100" dir="rtl">
      
      {/* Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Image size={20} className="text-indigo-400" />
          <h3 className="text-sm font-black text-white">مدير الوسائط والرسومات المنهجية</h3>
        </div>
        <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800">
          <X size={16} />
        </button>
      </div>

      {/* Search & Filter */}
      <div className="p-3 bg-slate-950/60 border-b border-slate-800 space-y-2 text-xs font-bold">
        <div className="relative">
          <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="بحث في مكتبة الأشكال والأيقونات..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar pb-1 text-[11px]">
          {['all', 'math', 'physics', 'chemistry', 'biology', 'islamic'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg shrink-0 transition-all ${
                selectedCategory === cat ? 'bg-indigo-600 text-white font-black' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'الكل' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Asset Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 grid grid-cols-2 gap-3">
        {filteredAssets.map((asset, idx) => (
          <div
            key={idx}
            onClick={() => onInsertSvg(asset.content, asset.name)}
            className="p-3 bg-slate-950 border border-slate-800 hover:border-indigo-500 rounded-2xl cursor-pointer transition-all space-y-2 group"
          >
            <div 
              className="w-full h-24 bg-slate-900 rounded-xl flex items-center justify-center p-2 text-indigo-400 group-hover:scale-105 transition-transform"
              dangerouslySetInnerHTML={{ __html: asset.content }}
            />
            <span className="text-[11px] font-bold text-slate-300 block text-center line-clamp-1">{asset.name}</span>
          </div>
        ))}
      </div>

    </div>
  );
};
