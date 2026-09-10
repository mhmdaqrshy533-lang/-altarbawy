import React, { useEffect, useState } from 'react';
import { useOMRStore } from './OMRStore';
import { Save, CheckCircle2 } from 'lucide-react';

export const AutoSaveManager: React.FC = () => {
  const { saveToLocalStorage, project } = useOMRStore();
  const [savedStatus, setSavedStatus] = useState<string>('محفوظ تلقائياً');

  useEffect(() => {
    const timer = setInterval(() => {
      saveToLocalStorage();
      setSavedStatus(`تم الحفظ ${new Date().toLocaleTimeString('ar-YE', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`);
    }, 15000); // Auto save every 15 seconds

    return () => clearInterval(timer);
  }, [saveToLocalStorage, project]);

  return (
    <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded-xl border border-emerald-200/80 select-none" dir="rtl">
      <CheckCircle2 size={13} className="text-emerald-600" />
      <span>{savedStatus}</span>
    </div>
  );
};
