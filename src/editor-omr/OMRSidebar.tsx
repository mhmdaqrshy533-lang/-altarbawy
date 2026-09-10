import React from 'react';
import { useOMRStore } from './OMRStore';
import { 
  Sparkles, UserCheck, Building2, Sliders, Layers, LayoutGrid 
} from 'lucide-react';
import { BubbleLibrary } from './BubbleLibrary';
import { StudentInfoEditor } from './StudentInfoEditor';
import { HeaderEditor } from './HeaderEditor';
import { PropertiesPanel } from './PropertiesPanel';
import { LayersPanel } from './LayersPanel';

export const OMRSidebar: React.FC = () => {
  const { activeSidebarTab, setActiveSidebarTab } = useOMRStore();

  const TABS = [
    { id: 'library', label: 'المكتبة', icon: Sparkles },
    { id: 'student_id', label: 'رقم الجلوس', icon: UserCheck },
    { id: 'header', label: 'الترويسة', icon: Building2 },
    { id: 'properties', label: 'الخصائص', icon: Sliders },
    { id: 'layers', label: 'الطبقات', icon: Layers }
  ] as const;

  return (
    <aside className="w-80 bg-slate-50 border-r border-slate-200 flex flex-col h-full font-sans select-none" dir="rtl">
      
      {/* Top Tab Bar */}
      <div className="flex bg-white border-b border-slate-200 p-1.5 gap-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSidebarTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSidebarTab(tab.id as any)}
              className={`flex-1 py-2 flex flex-col items-center gap-1 rounded-xl text-[10px] font-black transition-all ${
                isActive 
                  ? 'bg-purple-600 text-white shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panel Content */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {activeSidebarTab === 'library' && <BubbleLibrary />}
        {activeSidebarTab === 'student_id' && <StudentInfoEditor />}
        {activeSidebarTab === 'header' && <HeaderEditor />}
        {activeSidebarTab === 'properties' && <PropertiesPanel />}
        {activeSidebarTab === 'layers' && <LayersPanel />}
      </div>

    </aside>
  );
};
