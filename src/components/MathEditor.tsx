import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Check, Calculator, Sigma, Pi, FunctionSquare, LayoutGrid, Type } from 'lucide-react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

type MathEditorProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (latex: string) => void;
  initialLatex?: string;
};

const MATH_CATEGORIES = [
  { id: 'basic', label: 'أساسي', icon: Calculator },
  { id: 'algebra', label: 'جبر', icon: FunctionSquare },
  { id: 'calculus', label: 'تفاضل وتكامل', icon: Sigma },
  { id: 'geometry', label: 'هندسة', icon: LayoutGrid },
  { id: 'greek', label: 'يوناني', icon: Pi },
];

const SYMBOLS_DB = {
  basic: [
    { label: '+', latex: '+' },
    { label: '-', latex: '-' },
    { label: '×', latex: '\\times' },
    { label: '÷', latex: '\\div' },
    { label: '=', latex: '=' },
    { label: '≠', latex: '\\neq' },
    { label: '≈', latex: '\\approx' },
    { label: '±', latex: '\\pm' },
    { label: '<', latex: '<' },
    { label: '>', latex: '>' },
    { label: '≤', latex: '\\leq' },
    { label: '≥', latex: '\\geq' },
  ],
  algebra: [
    { label: 'x²', latex: 'x^2' },
    { label: 'xⁿ', latex: 'x^n' },
    { label: '√x', latex: '\\sqrt{x}' },
    { label: 'ⁿ√x', latex: '\\sqrt[n]{x}' },
    { label: 'a/b', latex: '\\frac{a}{b}' },
    { label: '()', latex: '\\left( \\right)' },
    { label: '[]', latex: '\\left[ \\right]' },
    { label: '{}', latex: '\\left\\{ \\right\\}' },
    { label: '|x|', latex: '|x|' },
    { label: 'log', latex: '\\log_{b}(x)' },
    { label: 'ln', latex: '\\ln(x)' },
    { label: 'eˣ', latex: 'e^x' },
  ],
  calculus: [
    { label: '∫', latex: '\\int' },
    { label: '∫a..b', latex: '\\int_{a}^{b}' },
    { label: '∬', latex: '\\iint' },
    { label: '∑', latex: '\\sum' },
    { label: '∑n=1', latex: '\\sum_{n=1}^{\\infty}' },
    { label: '∏', latex: '\\prod' },
    { label: 'lim', latex: '\\lim_{x \\to \\infty}' },
    { label: 'd/dx', latex: '\\frac{d}{dx}' },
    { label: '∂', latex: '\\partial' },
    { label: '∞', latex: '\\infty' },
    { label: 'dx', latex: '\\,dx' },
    { label: '∇', latex: '\\nabla' },
  ],
  geometry: [
    { label: '°', latex: '^\\circ' },
    { label: '∠', latex: '\\angle' },
    { label: '△', latex: '\\triangle' },
    { label: '⊥', latex: '\\perp' },
    { label: '∥', latex: '\\parallel' },
    { label: '≅', latex: '\\cong' },
    { label: '∼', latex: '\\sim' },
    { label: 'π', latex: '\\pi' },
    { label: 'sin', latex: '\\sin(\\theta)' },
    { label: 'cos', latex: '\\cos(\\theta)' },
    { label: 'tan', latex: '\\tan(\\theta)' },
    { label: 'θ', latex: '\\theta' },
  ],
  greek: [
    { label: 'α', latex: '\\alpha' },
    { label: 'β', latex: '\\beta' },
    { label: 'γ', latex: '\\gamma' },
    { label: 'δ', latex: '\\delta' },
    { label: 'ε', latex: '\\epsilon' },
    { label: 'ζ', latex: '\\zeta' },
    { label: 'η', latex: '\\eta' },
    { label: 'θ', latex: '\\theta' },
    { label: 'λ', latex: '\\lambda' },
    { label: 'μ', latex: '\\mu' },
    { label: 'π', latex: '\\pi' },
    { label: 'ρ', latex: '\\rho' },
    { label: 'σ', latex: '\\sigma' },
    { label: 'φ', latex: '\\phi' },
    { label: 'ω', latex: '\\omega' },
    { label: 'Δ', latex: '\\Delta' },
  ],
};

export default function MathEditor({ isOpen, onClose, onSave, initialLatex = '' }: MathEditorProps) {
  const [activeCategory, setActiveCategory] = useState('basic');
  const [latex, setLatex] = useState(initialLatex);

  if (!isOpen) return null;

  const insertSymbol = (symbolLatex: string) => {
    setLatex(prev => prev + ' ' + symbolLatex);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-[1000px] h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 bg-slate-50 shrink-0">
          <div className="flex items-center gap-3 text-slate-800">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Sigma size={20} />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">محرر المعادلات الرياضية</h2>
              <p className="text-xs text-slate-500 font-serif">دعم كامل لـ LaTeX</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onSave(latex)}
              className="bg-slate-800 text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-slate-700 transition-colors"
            >
              <Check size={16} />
              إدراج في الامتحان
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Right Sidebar: Categories & Symbols */}
          <div className="w-80 bg-slate-50 border-l border-slate-200 flex flex-col shrink-0">
             <div className="p-4 border-b border-slate-200">
                <div className="flex flex-wrap gap-2">
                  {MATH_CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors ${activeCategory === cat.id ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      <cat.icon size={12} />
                      {cat.label}
                    </button>
                  ))}
                </div>
             </div>
             
             <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-3 gap-2">
                  {(SYMBOLS_DB[activeCategory as keyof typeof SYMBOLS_DB] || SYMBOLS_DB.basic).map((symbol, idx) => (
                    <button
                      key={idx}
                      onClick={() => insertSymbol(symbol.latex)}
                      className="bg-white border border-slate-200 rounded-lg p-2 h-12 flex items-center justify-center hover:border-emerald-400 hover:shadow-sm transition-all hover:text-emerald-600 text-sm font-serif"
                      dir="ltr"
                    >
                      <BlockMath math={symbol.latex.replace(/\\left|\\right/g, '')} />
                    </button>
                  ))}
                </div>
             </div>
          </div>

          {/* Left Area: Editor & Preview */}
          <div className="flex-1 flex flex-col bg-white">
             {/* Preview Area */}
             <div className="h-1/2 border-b border-slate-200 p-8 flex items-center justify-center overflow-auto bg-slate-50/50">
               {latex.trim() ? (
                 <div className="text-2xl" dir="ltr">
                   <BlockMath math={latex} />
                 </div>
               ) : (
                 <div className="text-slate-400 font-bold flex flex-col items-center">
                    <Sigma size={48} className="opacity-20 mb-4" />
                    <p>معاينة المعادلة</p>
                 </div>
               )}
             </div>
             
             {/* Input Area */}
             <div className="h-1/2 p-4 flex flex-col">
               <div className="flex items-center gap-2 mb-2 text-slate-500 text-sm font-bold">
                 <Type size={16} />
                 <span>كود LaTeX</span>
               </div>
               <textarea
                 value={latex}
                 onChange={(e) => setLatex(e.target.value)}
                 className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-left focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none text-slate-700"
                 dir="ltr"
                 placeholder="اكتب معادلتك هنا أو استخدم الأزرار الجانبية..."
               />
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
