import React from 'react';
import { Rnd } from 'react-rnd';
import { useOMRStore } from './OMRStore';
import { BubbleEditor } from './BubbleEditor';

export const OMRCanvas: React.FC = () => {
  const { 
    project, 
    selectedElementIds, 
    selectElement, 
    clearSelection, 
    updateElement 
  } = useOMRStore();

  const zoomScale = project.zoom / 100;
  const isEditMode = project.mode === 'edit';

  return (
    <div 
      className="w-full min-h-full flex items-center justify-center p-8 overflow-auto select-none bg-slate-200/50 custom-scrollbar"
      onClick={() => clearSelection()}
      dir="rtl"
    >
      <div 
        style={{
          transform: `scale(${zoomScale})`,
          transformOrigin: 'top center',
          transition: 'transform 0.15s ease-out'
        }}
        className="relative my-4"
      >
        {/* A4 Sheet Surface */}
        <div 
          id="omr-a4-canvas-node"
          className="bg-white shadow-2xl relative border-2 border-slate-300 rounded-sm overflow-hidden"
          style={{
            width: '794px',
            height: '1123px',
            minWidth: '794px',
            minHeight: '1123px',
            boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subtle Grid Background in Edit Mode */}
          {project.gridSnap && isEditMode && (
            <div 
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)',
                backgroundSize: '15px 15px'
              }}
            />
          )}

          {/* Render Elements */}
          {project.elements.map((el) => {
            if (el.isHidden) return null;

            const isSelected = selectedElementIds.includes(el.id);
            const isDraggable = isEditMode && !el.isLocked && !el.id.startsWith('anchor-');

            if (!isDraggable) {
              return (
                <div
                  key={el.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectElement(el.id);
                  }}
                  className={`absolute transition-all ${
                    isSelected ? 'ring-2 ring-purple-600 ring-offset-2 z-50' : ''
                  }`}
                  style={{
                    left: `${el.x}px`,
                    top: `${el.y}px`,
                    width: `${el.width}px`,
                    height: `${el.height}px`,
                    zIndex: el.zIndex,
                    transform: `rotate(${el.rotation || 0}deg)`
                  }}
                >
                  <BubbleEditor element={el} />
                </div>
              );
            }

            return (
              <Rnd
                key={el.id}
                size={{ width: el.width, height: el.height }}
                position={{ x: el.x, y: el.y }}
                bounds="parent"
                disableDragging={!isEditMode || el.isLocked}
                enableResizing={isEditMode && !el.isLocked}
                onClick={(e) => {
                  e.stopPropagation();
                  selectElement(el.id);
                }}
                onDragStop={(e, d) => {
                  updateElement(el.id, { x: d.x, y: d.y });
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  updateElement(el.id, {
                    width: parseInt(ref.style.width, 10),
                    height: parseInt(ref.style.height, 10),
                    x: position.x,
                    y: position.y
                  });
                }}
                className={`group ${
                  isSelected ? 'ring-2 ring-purple-600 ring-offset-2 shadow-lg z-50' : 'hover:ring-1 hover:ring-purple-300'
                }`}
                style={{ zIndex: el.zIndex }}
              >
                <BubbleEditor element={el} />
              </Rnd>
            );
          })}
        </div>
      </div>
    </div>
  );
};
