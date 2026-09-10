import React, { useEffect } from 'react';
import { useOMRStore } from './OMRStore';
import { OMRToolbar } from './OMRToolbar';
import { OMRSidebar } from './OMRSidebar';
import { OMRCanvas } from './OMRCanvas';
import { Navigator } from './Navigator';
import { BubbleGenerator } from './BubbleGenerator';
import { TemplateGallery } from './TemplateGallery';
import { PrintPreview } from './PrintPreview';
import { ExportManager } from './ExportManager';

interface OMRStudioProps {
  onBack?: () => void;
  examProjectData?: any;
}

export const OMRStudio: React.FC<OMRStudioProps> = ({ onBack, examProjectData }) => {
  const { loadFromLocalStorage, convertExamToOMRSheet } = useOMRStore();

  useEffect(() => {
    if (examProjectData) {
      convertExamToOMRSheet(examProjectData);
    } else {
      loadFromLocalStorage();
    }
  }, [examProjectData, convertExamToOMRSheet, loadFromLocalStorage]);

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-100 overflow-hidden font-sans select-none" dir="rtl">
      
      {/* Top Main Toolbar */}
      <OMRToolbar onBack={onBack} />

      {/* Main Workspace Body */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Right Sidebar */}
        <OMRSidebar />

        {/* Center Stage / A4 Canvas Area */}
        <main className="flex-1 relative overflow-hidden bg-slate-200/60 flex flex-col items-center justify-between">
          
          <div className="w-full flex-1 overflow-auto flex items-center justify-center relative">
            <OMRCanvas />
          </div>

          {/* Floating Navigator Bar at bottom */}
          <div className="absolute bottom-6 z-40">
            <Navigator />
          </div>

        </main>
      </div>

      {/* All Modals */}
      <BubbleGenerator />
      <TemplateGallery />
      <PrintPreview />
      <ExportManager />

    </div>
  );
};

export default OMRStudio;
