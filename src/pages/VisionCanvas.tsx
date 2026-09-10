/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, PenTool, Printer, Eraser } from 'lucide-react';
import { VisionEngine } from '../core/VisionEngine';
import { SovereignDocumentEngine } from '../core/SovereignDocumentEngine';

export default function VisionCanvas({ onBack }: { onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<{x: number, y: number}[]>([]);
  const [isSmoothed, setIsSmoothed] = useState(false);
  const [svgPath, setSvgPath] = useState('');

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setIsSmoothed(false);
    setSvgPath('');
    const point = getCoordinates(e);
    setPoints([point]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const point = getCoordinates(e);
    setPoints(prev => [...prev, point]);
    
    // Draw directly to canvas for instant feedback
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#4c1d95'; // Royal Purple
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      ctx?.beginPath();
    }
    setPoints([]);
    setIsSmoothed(false);
    setSvgPath('');
  };

  const applyVisionSmoothing = () => {
    if (points.length < 3) return;
    const path = VisionEngine.smoothPath(points);
    setSvgPath(path);
    setIsSmoothed(true);
    
    // Clear raw canvas and wait for SVG to render over it
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const generateOfficialPDF = async () => {
    await SovereignDocumentEngine.generateOfficialDocument(
      'مخطط هندسي (معالج بصرياً)',
      [
        'تم توليد هذا المخطط باستخدام محرك التصحيح البصري الخاص بنظام محرر الرقيم التربوي.',
        'تم تنعيم المسار وتحويله إلى صيغة شعاعية (Vector) لضمان أعلى دقة طباعة.',
        'ملاحظة: هذه وثيقة معتمدة ومصدرة رسمياً من التطبيق.'
      ]
    );
  };

  return (
    <div className="min-h-screen bg-purple-50/30 p-6 select-none font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-purple-900 via-violet-900 to-purple-900 text-white p-6 shadow-xl relative overflow-hidden rounded-[2rem] mb-6 flex items-center justify-between">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="relative z-10 flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20 transition-all"
            >
              <ArrowRight size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
                محرك التصحيح البصري (Vision Engine)
                <Sparkles className="text-yellow-400" size={20} />
              </h1>
              <p className="text-purple-200 font-medium text-xs mt-1">ارسم شكلاً يدوياً (مربع، دائرة، مخطط) وسيقوم الذكاء الاصطناعي بتنعيمه هندسياً</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-purple-100 flex flex-col items-center">
          
          <div className="w-full flex justify-between items-center mb-4">
            <div className="flex gap-3">
              <button onClick={clearCanvas} className="p-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                <Eraser size={20} />
              </button>
              <button 
                onClick={applyVisionSmoothing} 
                disabled={points.length === 0}
                className="px-6 py-3 rounded-xl bg-purple-600 text-white font-bold flex items-center gap-2 hover:bg-purple-700 disabled:opacity-50 transition-colors shadow-lg shadow-purple-600/20"
              >
                <PenTool size={20} />
                تنعيم هندسي
              </button>
            </div>
            <button 
              onClick={generateOfficialPDF}
              className="px-6 py-3 rounded-xl bg-violet-50 text-violet-700 border border-violet-200 font-bold flex items-center gap-2 hover:bg-violet-100 transition-colors"
            >
              <Printer size={20} />
              إصدار كمستند رسمي
            </button>
          </div>

          {/* Canvas Area */}
          <div className="w-full h-[500px] border-2 border-dashed border-purple-200 rounded-3xl relative overflow-hidden bg-slate-50 touch-none cursor-crosshair shadow-inner">
            {!isSmoothed && (
              <canvas
                ref={canvasRef}
                width={800}
                height={500}
                className="w-full h-full absolute inset-0 z-10"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
            )}
            
            {/* SVG Overlay for Smoothed Path */}
            {isSmoothed && (
              <motion.svg 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                width="100%" 
                height="100%" 
                viewBox="0 0 800 500" 
                className="absolute inset-0 z-20 pointer-events-none"
              >
                <motion.path 
                  d={svgPath} 
                  fill="none" 
                  stroke="#4c1d95" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="drop-shadow-lg"
                />
              </motion.svg>
            )}
            
            {!isDrawing && points.length === 0 && !isSmoothed && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <div className="text-center">
                  <PenTool size={48} className="mx-auto mb-4 text-purple-300" />
                  <p className="font-bold text-slate-400 text-lg">ارسم هنا...</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
