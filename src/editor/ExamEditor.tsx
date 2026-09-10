import React, { useState } from 'react';
import { ExamToolbar } from './components/ExamToolbar';
import { ContextToolbar } from './components/ContextToolbar';
import { ExamCanvas } from './components/ExamCanvas';
import { ExamProperties } from './components/ExamProperties';
import { QuestionOrganizer } from './components/QuestionOrganizer';
import { EditorStatusBar } from './components/EditorStatusBar';
import { ExamProjectsDashboard } from './components/ExamProjectsDashboard';
import { NewExamDialog } from './components/NewExamDialog';
import { PrintCenterModal } from './components/PrintCenterModal';
import { PageManagerPanel } from './components/PageManagerPanel';
import { AssetBankPanel } from './components/AssetBankPanel';
import { CommandPaletteModal } from '../components/CommandPaletteModal';
import { FontPickerModal } from '../components/FontPickerModal';
import { useExamProjectsStore } from './store/useExamProjectsStore';
import { useEditorStore } from './store/useEditorStore';
import { ExamMetadata } from './types';

export default function ExamEditor({ onBack }: { onBack?: () => void }) {
  const [viewMode, setViewMode] = useState<'projects' | 'editor'>('projects');
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [isPrintCenterOpen, setIsPrintCenterOpen] = useState(false);
  const [isPageManagerOpen, setIsPageManagerOpen] = useState(false);
  const [isAssetBankOpen, setIsAssetBankOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isFontPickerOpen, setIsFontPickerOpen] = useState(false);

  const { createProject } = useExamProjectsStore();
  const { setDocument } = useEditorStore();

  const handleCreateNew = (meta: Partial<ExamMetadata>, title: string) => {
    const newProj = createProject(meta, title);
    if (newProj && newProj.document) {
      setDocument(newProj.document);
      setViewMode('editor');
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 overflow-hidden" dir="rtl">
      {viewMode === 'projects' ? (
        <ExamProjectsDashboard 
          onOpenProject={() => setViewMode('editor')} 
        />
      ) : (
        <div className="flex flex-col h-screen overflow-hidden">
          {/* Top Bar Shell */}
          <ExamToolbar 
            onBack={onBack} 
            onOpenProjectsList={() => setViewMode('projects')}
            onNewProject={() => setIsNewDialogOpen(true)}
            onOpenPrintCenter={() => setIsPrintCenterOpen(true)}
            onOpenPageManager={() => setIsPageManagerOpen(!isPageManagerOpen)}
            onOpenAssetBank={() => setIsAssetBankOpen(!isAssetBankOpen)}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            onOpenFontPicker={() => setIsFontPickerOpen(true)}
          />

          {/* Contextual Smart Toolbar */}
          <ContextToolbar />

          {/* Main Central Layout Workspace Shell */}
          <div className="flex flex-1 overflow-hidden relative">
            {/* Question Organizer Layer Panel */}
            <QuestionOrganizer />

            {/* Central Stable Exam Workspace Canvas */}
            <main className="flex-1 relative overflow-auto custom-scrollbar bg-slate-800/80">
              <ExamCanvas />
            </main>
            
            {/* Properties Sidebar Shell */}
            <ExamProperties />

            {/* Slide-over Panels */}
            <PageManagerPanel 
              isOpen={isPageManagerOpen} 
              onClose={() => setIsPageManagerOpen(false)} 
            />

            <AssetBankPanel 
              isOpen={isAssetBankOpen} 
              onClose={() => setIsAssetBankOpen(false)} 
            />
          </div>

          {/* Status Bar Shell */}
          <EditorStatusBar />
        </div>
      )}

      <NewExamDialog 
        isOpen={isNewDialogOpen} 
        onClose={() => setIsNewDialogOpen(false)}
        onCreate={handleCreateNew}
      />

      <PrintCenterModal 
        isOpen={isPrintCenterOpen} 
        onClose={() => setIsPrintCenterOpen(false)} 
      />

      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenFontPicker={() => setIsFontPickerOpen(true)}
        onOpenPrintCenter={() => setIsPrintCenterOpen(true)}
        onOpenPageManager={() => setIsPageManagerOpen(true)}
        onOpenAssetBank={() => setIsAssetBankOpen(true)}
      />

      <FontPickerModal
        isOpen={isFontPickerOpen}
        onClose={() => setIsFontPickerOpen(false)}
      />
    </div>
  );
}





