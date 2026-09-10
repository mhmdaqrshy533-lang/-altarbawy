/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * محرر الرقيم التربوي - مصمم الجداول التربوية المتطور (Table Designer)
 * واجهة بصرية نقية بالكامل، بدون أي كود HTML أو تفاصيل برمجية للمستخدم.
 * برمجة وتصميم المهندس سهيل الهزبري
 */

import React, { useState } from 'react';
import { 
  Table as TableIcon, X, Check, Eye, Columns, Rows, 
  AlignRight, AlignCenter, AlignLeft, Type, Sparkles 
} from 'lucide-react';

interface TableDesignerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertTable: (tableHtml: string, estimatedHeight: number) => void;
}

export const TableDesignerModal: React.FC<TableDesignerModalProps> = ({
  isOpen,
  onClose,
  onInsertTable
}) => {
  const [rowCount, setRowCount] = useState<number>(3);
  const [colCount, setColCount] = useState<number>(3);
  const [hasHeader, setHasHeader] = useState<boolean>(true);
  const [textAlign, setTextAlign] = useState<'right' | 'center' | 'left'>('center');
  const [fontSize, setFontSize] = useState<number>(13);
  const [fontFamily, setFontFamily] = useState<string>('Cairo');
  const [borderStyle, setBorderStyle] = useState<'full' | 'subtle' | 'horizontal_only' | 'stripes'>('full');
  const [direction, setDirection] = useState<'rtl' | 'ltr'>('rtl');
  
  // Custom column headers
  const [headerLabels, setHeaderLabels] = useState<string[]>(['الرقم', 'المعطيات / السؤال', 'الدرجة']);

  if (!isOpen) return null;

  // Sync header labels when column count changes
  const handleColCountChange = (newCount: number) => {
    const validCount = Math.max(1, Math.min(8, newCount));
    setColCount(validCount);
    setHeaderLabels(prev => {
      const next = [...prev];
      while (next.length < validCount) {
        next.push(`عمود ${next.length + 1}`);
      }
      return next.slice(0, validCount);
    });
  };

  const handleHeaderLabelChange = (index: number, val: string) => {
    setHeaderLabels(prev => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const handleInsert = () => {
    // Generate clean semantic HTML table
    const borderCss = borderStyle === 'full' 
      ? 'border: 1.5px solid #000000;' 
      : borderStyle === 'subtle' 
        ? 'border: 1px solid #94a3b8;' 
        : 'border-top: 1.5px solid #000000; border-bottom: 1.5px solid #000000;';

    const cellBorderCss = borderStyle === 'horizontal_only' 
      ? 'border-top: 1px solid #cbd5e1; border-bottom: 1px solid #cbd5e1; border-left: none; border-right: none;'
      : borderStyle === 'subtle' 
        ? 'border: 1px solid #cbd5e1;' 
        : 'border: 1px solid #000000;';

    let html = `<table style="width: 100%; border-collapse: collapse; ${borderCss} text-align: ${textAlign}; font-family: ${fontFamily}, sans-serif; direction: ${direction};">\n`;

    if (hasHeader) {
      html += `  <thead>\n    <tr style="background: #f1f5f9; font-weight: bold; color: #0f172a;">\n`;
      for (let c = 0; c < colCount; c++) {
        const title = headerLabels[c] || `عمود ${c + 1}`;
        html += `      <th style="${cellBorderCss} padding: 7px 10px; font-size: ${fontSize}px;">${title}</th>\n`;
      }
      html += `    </tr>\n  </thead>\n`;
    }

    html += `  <tbody>\n`;
    for (let r = 0; r < rowCount; r++) {
      const rowBg = borderStyle === 'stripes' && r % 2 === 1 ? 'background: #f8fafc;' : 'background: #ffffff;';
      html += `    <tr style="${rowBg}">\n`;
      for (let c = 0; c < colCount; c++) {
        const defaultContent = c === 0 ? `${r + 1}` : '................................';
        html += `      <td style="${cellBorderCss} padding: 7px 10px; font-size: ${fontSize}px; color: #1e293b;">${defaultContent}</td>\n`;
      }
      html += `    </tr>\n`;
    }
    html += `  </tbody>\n</table>`;

    const estimatedHeight = ((hasHeader ? 1 : 0) + rowCount) * 36 + 10;
    onInsertTable(html, Math.max(80, estimatedHeight));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans select-none" dir="rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl text-slate-100 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-600/20 text-cyan-400 rounded-2xl border border-cyan-500/30">
              <TableIcon size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">مصمم الجداول التربوية (Table Designer)</h3>
              <p className="text-xs font-bold text-slate-400">تخصيص الصفوف، الأعمدة، الحدود، والمحاذاة بصرياً</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-2xl transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6 flex-1">
          
          {/* Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Rows */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
              <label className="text-xs font-black text-slate-300 flex items-center gap-1.5">
                <Rows size={14} className="text-cyan-400" />
                <span>عدد الصفوف</span>
              </label>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setRowCount(prev => Math.max(1, prev - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 font-black text-sm"
                >
                  -
                </button>
                <input 
                  type="number"
                  min={1}
                  max={15}
                  value={rowCount}
                  onChange={(e) => setRowCount(Math.max(1, Math.min(15, parseInt(e.target.value) || 1)))}
                  className="w-full text-center bg-slate-900 border border-slate-700 rounded-lg py-1 font-black text-white text-sm"
                />
                <button 
                  onClick={() => setRowCount(prev => Math.min(15, prev + 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 font-black text-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Columns */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
              <label className="text-xs font-black text-slate-300 flex items-center gap-1.5">
                <Columns size={14} className="text-cyan-400" />
                <span>عدد الأعمدة</span>
              </label>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleColCountChange(colCount - 1)}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 font-black text-sm"
                >
                  -
                </button>
                <input 
                  type="number"
                  min={1}
                  max={8}
                  value={colCount}
                  onChange={(e) => handleColCountChange(parseInt(e.target.value) || 1)}
                  className="w-full text-center bg-slate-900 border border-slate-700 rounded-lg py-1 font-black text-white text-sm"
                />
                <button 
                  onClick={() => handleColCountChange(colCount + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 font-black text-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Font Size */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
              <label className="text-xs font-black text-slate-300 flex items-center gap-1.5">
                <Type size={14} className="text-cyan-400" />
                <span>حجم الخط ({fontSize}px)</span>
              </label>
              <select 
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-1.5 px-2 text-xs font-bold text-white"
              >
                <option value={11}>11px — مصغّر</option>
                <option value={12}>12px — قياسي مدرسي</option>
                <option value={13}>13px — واضح</option>
                <option value={14}>14px — بارز</option>
                <option value={16}>16px — عناوين</option>
              </select>
            </div>

            {/* Text Alignment */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
              <label className="text-xs font-black text-slate-300">محاذاة النص</label>
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setTextAlign('right')}
                  className={`flex-1 py-1 rounded-lg flex justify-center ${textAlign === 'right' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  title="يمين"
                >
                  <AlignRight size={14} />
                </button>
                <button
                  onClick={() => setTextAlign('center')}
                  className={`flex-1 py-1 rounded-lg flex justify-center ${textAlign === 'center' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  title="وسط"
                >
                  <AlignCenter size={14} />
                </button>
                <button
                  onClick={() => setTextAlign('left')}
                  className={`flex-1 py-1 rounded-lg flex justify-center ${textAlign === 'left' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  title="يسار"
                >
                  <AlignLeft size={14} />
                </button>
              </div>
            </div>

          </div>

          {/* Style Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Header row toggle */}
            <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-800 bg-slate-950 cursor-pointer">
              <span className="text-xs font-black text-slate-200">صف العناوين (ترويسة الجدول)</span>
              <input 
                type="checkbox"
                checked={hasHeader}
                onChange={(e) => setHasHeader(e.target.checked)}
                className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
              />
            </label>

            {/* Borders style */}
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
              <span className="text-xs font-black text-slate-200">نمط الحدود</span>
              <select 
                value={borderStyle}
                onChange={(e) => setBorderStyle(e.target.value as any)}
                className="bg-slate-900 border border-slate-700 rounded-lg py-1 px-2 text-xs font-bold text-white"
              >
                <option value="full">شبكة كاملة (رسمي)</option>
                <option value="subtle">حدود خفيفة</option>
                <option value="horizontal_only">خطوط أفقية فقط</option>
                <option value="stripes">مخطط (صفوف ملونة)</option>
              </select>
            </div>

            {/* Direction */}
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
              <span className="text-xs font-black text-slate-200">اتجاه الجدول</span>
              <div className="flex gap-1">
                <button 
                  onClick={() => setDirection('rtl')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${direction === 'rtl' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'}`}
                >
                  RTL عربي
                </button>
                <button 
                  onClick={() => setDirection('ltr')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${direction === 'ltr' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'}`}
                >
                  LTR إنجليزي
                </button>
              </div>
            </div>
          </div>

          {/* Editable Header Column Titles */}
          {hasHeader && (
            <div className="space-y-2 bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
              <label className="text-xs font-black text-slate-300 block">عناوين الأعمدة:</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {headerLabels.map((lbl, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 font-bold">{idx + 1}</span>
                    <input 
                      type="text"
                      value={lbl}
                      onChange={(e) => handleHeaderLabelChange(idx, e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-slate-200 outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Visual Live Table Preview */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Eye size={14} className="text-cyan-400" />
              <span>معاينة الجدول الحية على الورقة:</span>
            </div>
            
            <div className="p-4 bg-white rounded-xl shadow-inner border border-slate-300 overflow-x-auto text-slate-900">
              <table 
                style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse', 
                  border: borderStyle === 'full' ? '1.5px solid #000' : '1px solid #94a3b8',
                  textAlign,
                  direction
                }}
              >
                {hasHeader && (
                  <thead>
                    <tr style={{ background: '#f1f5f9', fontWeight: 'bold' }}>
                      {headerLabels.map((title, i) => (
                        <th key={i} style={{ border: '1px solid #000', padding: '6px 8px', fontSize: `${fontSize}px` }}>
                          {title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {Array.from({ length: rowCount }).map((_, r) => (
                    <tr key={r} style={{ background: borderStyle === 'stripes' && r % 2 === 1 ? '#f8fafc' : '#ffffff' }}>
                      {Array.from({ length: colCount }).map((_, c) => (
                        <td key={c} style={{ border: '1px solid #000', padding: '6px 8px', fontSize: `${fontSize}px` }}>
                          {c === 0 ? `${r + 1}` : '................................'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors"
          >
            إلغاء
          </button>

          <button
            onClick={handleInsert}
            className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-white rounded-xl text-xs font-black shadow-lg shadow-cyan-600/30 transition-all flex items-center gap-2"
          >
            <Check size={16} />
            <span>إدراج الجدول في الامتحان</span>
          </button>
        </div>

      </div>
    </div>
  );
};
