import React, { useRef, useEffect } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { Rnd } from 'react-rnd';
import { EditorElement, TextElement } from '../types';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { MinisterialHeader, MinisterialFooter, PrivateHeader, PrivateFooter, AutomatedHeader, AutomatedFooter, BubbleSheetHeader } from './templates/MinisterialTemplate';
import { QuestionCardComponent } from './QuestionCardComponent';
import { QuestionMicroToolbar } from './QuestionMicroToolbar';
import { PageGeometry } from '../../core/standards/PageGeometry';

const ElementRenderer = ({ element, updateElement, activePageIndex }: { element: EditorElement, updateElement: any, activePageIndex: number }) => {
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const { newlyCreatedElementId, setNewlyCreatedElementId } = useEditorStore();

  const isHtml = element.type === 'text' && typeof element.content === 'string' && /<[a-z][\s\S]*>/i.test(element.content);

  useEffect(() => {
    if (element.type === 'text' && !isHtml && !(element as TextElement).isQuestion && contentEditableRef.current && document.activeElement !== contentEditableRef.current) {
      contentEditableRef.current.innerText = element.content;
    }
  }, [element, isHtml]);

  useEffect(() => {
    if (element.type === 'text' && !isHtml && element.id === newlyCreatedElementId && contentEditableRef.current) {
      contentEditableRef.current.focus();
      try {
        const range = window.document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(contentEditableRef.current);
        range.collapse(false);
        sel?.removeAllRanges();
        sel?.addRange(range);
      } catch (e) {
        console.warn('Focus range selection failed', e);
      }
      setNewlyCreatedElementId(null);
    }
  }, [newlyCreatedElementId, element.id, element.type, isHtml, setNewlyCreatedElementId]);

  if (element.type === 'text') {
    const textEl = element as TextElement;

    // 1. Render Question Card Component
    if (textEl.isQuestion) {
      return <QuestionCardComponent element={textEl} activePageIndex={activePageIndex} />;
    }

    // 2. Render Formatted HTML (Tables, MCQs, or Custom markup) safely
    if (isHtml) {
      return (
        <div 
          style={{ width: '100%', height: '100%', overflow: 'hidden' }}
          dangerouslySetInnerHTML={{ __html: textEl.content }}
        />
      );
    }

    // 3. Render Normal Plain Text with Inline Editing
    return (
      <div 
        ref={contentEditableRef}
        style={{ 
          width: '100%', height: '100%', 
          fontSize: element.fontSize, fontFamily: element.fontFamily,
          fontWeight: element.fontWeight, color: element.color,
          textAlign: element.textAlign as any,
          outline: 'none',
          whiteSpace: 'pre-wrap'
        }}
        className="cursor-text p-1"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          updateElement(activePageIndex, element.id, { content: e.currentTarget.innerText });
          setTimeout(() => {
            useEditorStore.getState().reorderAndRenumberQuestions(activePageIndex);
          }, 100);
        }}
      />
    );
  }

  if (element.type === 'image') {
    return (
      <img src={element.src} alt="element" style={{ width: '100%', height: '100%', objectFit: 'contain' }} crossOrigin="anonymous" referrerPolicy="no-referrer" />
    );
  }

  if (element.type === 'math') {
    return (
      <div 
        style={{ fontSize: element.fontSize, color: element.color, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        dangerouslySetInnerHTML={{ __html: katex.renderToString(element.latex, { displayMode: true, throwOnError: false }) }}
      />
    );
  }

  if (element.type === 'physics') {
    return (
      <div 
        style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        dangerouslySetInnerHTML={{ __html: element.svgContent }}
      />
    );
  }

  if (element.type === 'table') {
    return (
      <div 
        style={{ width: '100%', height: '100%', overflow: 'hidden' }}
        dangerouslySetInnerHTML={{ __html: element.tableHtml }}
      />
    );
  }

  if (element.type === 'shape') {
    const shape = element;
    if (shape.shapeType === 'line' || shape.shapeType === 'divider') {
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '100%', height: shape.strokeWidth || 2, backgroundColor: shape.strokeColor || '#0f172a' }} />
        </div>
      );
    }
    if (shape.shapeType === 'circle') {
      return (
        <div 
          style={{ 
            width: '100%', 
            height: '100%', 
            borderRadius: '9999px',
            backgroundColor: shape.fillColor || 'transparent',
            border: `${shape.strokeWidth || 2}px solid ${shape.strokeColor || '#0f172a'}`
          }} 
        />
      );
    }
    return (
      <div 
        style={{ 
          width: '100%', 
          height: '100%', 
          borderRadius: '8px',
          backgroundColor: shape.fillColor || 'transparent',
          border: `${shape.strokeWidth || 2}px solid ${shape.strokeColor || '#0f172a'}`
        }} 
      />
    );
  }

  return <div>Unknown Element</div>;
};

export const ExamCanvas = () => {
  const { document, activePageIndex, zoom, updateElement, selectElement, selectedElementIds, clearSelection, snapToGrid, reorderAndRenumberQuestions } = useEditorStore();
  const page = document.pages[activePageIndex];
  const canvasRef = useRef<HTMLDivElement>(null);
  const metadata = document.metadata;

  // Page geometry from Unified Single Source of Truth
  const A4_WIDTH = PageGeometry.A4.widthPx;
  const A4_HEIGHT = PageGeometry.A4.heightPx;
  const GRID_SIZE = 20; 

  const scale = zoom / 100;
  const scaledWidth = A4_WIDTH * scale;
  const scaledHeight = A4_HEIGHT * scale;

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      clearSelection();
    }
  };

  const isMinisterial = metadata.templateType === 'ministerial';
  const isPrivate = metadata.templateType === 'private';
  const isAutomated = metadata.templateType === 'automated';
  const isBubbleSheet = metadata.templateType === 'bubblesheet';

  return (
    <div className="w-full h-full overflow-auto bg-slate-950/40 p-6 md:p-12 flex justify-center items-start custom-scrollbar select-none">
      {/* Outer Scaled Viewport Container (Controls scrollbars accurately) */}
      <div 
        style={{ 
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
          position: 'relative',
          flexShrink: 0,
          margin: '0 auto',
        }}
        className="transition-all duration-150 ease-out my-auto shadow-2xl"
      >
        {/* The Fixed Intrinsic A4 Paper ($794px \times 1123px$) */}
        <div 
          id={`exam-canvas-page-${activePageIndex}`}
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="bg-white relative flex flex-col shadow-2xl rounded-sm print:shadow-none print:rounded-none"
          style={{
            width: `${A4_WIDTH}px`,
            height: `${A4_HEIGHT}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundImage: snapToGrid ? 'linear-gradient(to right, #f8f8f8 1px, transparent 1px), linear-gradient(to bottom, #f8f8f8 1px, transparent 1px)' : 'none',
            backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`
          }}
        >
          {isMinisterial && activePageIndex === 0 && <MinisterialHeader />}
          {isPrivate && activePageIndex === 0 && <PrivateHeader />}
          {isAutomated && activePageIndex === 0 && <AutomatedHeader />}
          {isBubbleSheet && activePageIndex === 0 && <BubbleSheetHeader />}

          {/* Render draggable elements on top */}
          <div className="flex-1 relative w-full h-full">
            {page?.elements.map(el => {
              const isQuestion = el.type === 'text' && (el as TextElement).isQuestion;
              const isLocked = el.isLocked;
              const isHidden = el.isHidden;

              return (
                <Rnd
                  key={el.id}
                  id={`question-card-${el.id}`}
                  position={{ x: el.x, y: el.y }}
                  size={{ width: el.width, height: el.height }}
                  scale={scale}
                  disableDragging={isQuestion || isLocked}
                  onDragStop={(e, d) => {
                    updateElement(activePageIndex, el.id, { x: d.x, y: d.y });
                    if (isQuestion) {
                      setTimeout(() => {
                        reorderAndRenumberQuestions(activePageIndex);
                      }, 50);
                    }
                  }}
                  onResizeStop={(e, dir, ref, delta, position) => {
                    updateElement(activePageIndex, el.id, {
                      width: parseInt(ref.style.width, 10),
                      height: parseInt(ref.style.height, 10),
                      ...position
                    });
                  }}
                  dragGrid={snapToGrid ? [GRID_SIZE, GRID_SIZE] : [1, 1]}
                  resizeGrid={snapToGrid ? [GRID_SIZE, GRID_SIZE] : [1, 1]}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    selectElement(el.id, e.shiftKey);
                  }}
                  className={`absolute transition-shadow ${
                    selectedElementIds.includes(el.id) 
                      ? 'ring-2 ring-indigo-600 ring-offset-2 ring-offset-white rounded-lg shadow-md' 
                      : 'hover:ring-1 hover:ring-slate-300'
                  } ${isHidden ? 'opacity-30 print:hidden' : ''}`}
                  style={{ zIndex: el.zIndex }}
                  bounds="parent"
                >
                  {selectedElementIds.includes(el.id) && isQuestion && (
                    <QuestionMicroToolbar element={el as TextElement} activePageIndex={activePageIndex} />
                  )}
                  <ElementRenderer element={el} updateElement={updateElement} activePageIndex={activePageIndex} />
                </Rnd>
              );
            })}
          </div>

          {/* Vertical Side Margin Watermark Credit */}
          <div className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-400/80 [writing-mode:vertical-lr] rotate-180 select-none z-10 font-sans tracking-wider pointer-events-none">
            محرر الرقيم الذكي — برمجة وتصميم المهندس سهيل الهزبري
          </div>

          {isMinisterial && activePageIndex === document.pages.length - 1 && <MinisterialFooter />}
          {isPrivate && activePageIndex === document.pages.length - 1 && <PrivateFooter />}
          {isAutomated && activePageIndex === document.pages.length - 1 && <AutomatedFooter />}
        </div>
      </div>
    </div>
  );
};


