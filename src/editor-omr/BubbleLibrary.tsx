import React from 'react';
import { useOMRStore } from './OMRStore';
import { 
  Grid, UserCheck, Building2, QrCode, Barcode, 
  FileCheck, Edit3, Square, HelpCircle, Plus, Sparkles 
} from 'lucide-react';
import { OMRElement } from './types';

export const BubbleLibrary: React.FC = () => {
  const { addElement, setShowBubbleGeneratorModal } = useOMRStore();

  const handleAddInstructionBox = () => {
    const instructionBox: OMRElement = {
      id: `omr-instruction-${Date.now()}`,
      type: 'text',
      x: 40,
      y: 1000,
      width: 714,
      height: 60,
      rotation: 0,
      zIndex: 2,
      isLocked: false,
      isHidden: false,
      opacity: 1,
      text: 'تنبيه هائم: تظليل الدائرة بالكامل بالقلم الرصاص (HB) أو القلم الجاف الأسود/الأزرق. لا تستخدم القلم الأحمر أو أداة التصحيح الأبيض (الكوركتر). تظليل خيارين يلغي السؤال.',
      fontSize: 11,
      fontWeight: 'bold',
      fontFamily: 'Inter',
      color: '#0f172a',
      textAlign: 'center'
    };
    addElement(instructionBox);
  };

  const handleAddSignature = () => {
    const signatureBox: OMRElement = {
      id: `omr-signature-${Date.now()}`,
      type: 'signature_box',
      x: 40,
      y: 920,
      width: 210,
      height: 60,
      rotation: 0,
      zIndex: 2,
      isLocked: false,
      isHidden: false,
      opacity: 1,
      label: 'توقيع الكنترول / المراجع'
    } as any;
    addElement(signatureBox);
  };

  const handleAddStamp = () => {
    const stampBox: OMRElement = {
      id: `omr-stamp-${Date.now()}`,
      type: 'stamp_area',
      x: 614,
      y: 920,
      width: 140,
      height: 120,
      rotation: 0,
      zIndex: 2,
      isLocked: false,
      isHidden: false,
      opacity: 1,
      label: 'ختم المدرسة'
    } as any;
    addElement(stampBox);
  };

  const handleAddBarcode = () => {
    const barcode: OMRElement = {
      id: `omr-barcode-${Date.now()}`,
      type: 'barcode',
      x: 40,
      y: 840,
      width: 210,
      height: 60,
      rotation: 0,
      zIndex: 2,
      isLocked: false,
      isHidden: false,
      opacity: 1,
      code: 'OMR-YEMEN-2026-908'
    } as any;
    addElement(barcode);
  };

  const handleAddQRCode = () => {
    const qrcode: OMRElement = {
      id: `omr-qrcode-${Date.now()}`,
      type: 'qrcode',
      x: 660,
      y: 840,
      width: 70,
      height: 70,
      rotation: 0,
      zIndex: 2,
      isLocked: false,
      isHidden: false,
      opacity: 1,
      data: 'RAQIM-OMR-VALIDATION-KEY'
    } as any;
    addElement(qrcode);
  };

  return (
    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4 font-sans" dir="rtl">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
          <Sparkles size={18} />
        </div>
        <div>
          <h3 className="text-xs font-black text-slate-800">مكتبة عناصر OMR المجهزة</h3>
          <p className="text-[10px] text-slate-400 font-semibold">إضافة شبكات، خانات، وأختام بضغطة واحدة</p>
        </div>
      </div>

      <div className="space-y-2.5">
        
        {/* Generator Main Button */}
        <button
          onClick={() => setShowBubbleGeneratorModal(true)}
          className="w-full flex items-center justify-between bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-2xl transition-all shadow-md shadow-purple-600/20 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Grid size={18} />
            </div>
            <div className="text-right">
              <div className="text-xs font-black">مولد شبكات التظليل (Bubble Generator)</div>
              <div className="text-[10px] text-purple-100 font-semibold">تخصيص كامل لعدد الأسئلة والخيارات</div>
            </div>
          </div>
          <Plus size={18} className="group-hover:scale-125 transition-transform" />
        </button>

        {/* Quick Add Elements Grid */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          
          <button
            onClick={handleAddInstructionBox}
            className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-right transition-all flex flex-col justify-between"
          >
            <HelpCircle size={18} className="text-purple-600 mb-2" />
            <div>
              <div className="text-xs font-black text-slate-800">صندوق التعليمات</div>
              <div className="text-[9px] text-slate-400 font-semibold">قواعد التظليل المعتمدة</div>
            </div>
          </button>

          <button
            onClick={handleAddStamp}
            className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-right transition-all flex flex-col justify-between"
          >
            <Square size={18} className="text-indigo-600 mb-2" />
            <div>
              <div className="text-xs font-black text-slate-800">مربع الختم الرسمي</div>
              <div className="text-[9px] text-slate-400 font-semibold">إطار مخصص لختم المدرسة</div>
            </div>
          </button>

          <button
            onClick={handleAddSignature}
            className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-right transition-all flex flex-col justify-between"
          >
            <Edit3 size={18} className="text-blue-600 mb-2" />
            <div>
              <div className="text-xs font-black text-slate-800">صندوق التوقيع</div>
              <div className="text-[9px] text-slate-400 font-semibold">توقيع الملاحظ والكنترول</div>
            </div>
          </button>

          <button
            onClick={handleAddBarcode}
            className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-right transition-all flex flex-col justify-between"
          >
            <Barcode size={18} className="text-emerald-600 mb-2" />
            <div>
              <div className="text-xs font-black text-slate-800">شريط باركود</div>
              <div className="text-[9px] text-slate-400 font-semibold">Code128 عالي الدقة</div>
            </div>
          </button>

          <button
            onClick={handleAddQRCode}
            className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-right transition-all flex flex-col justify-between col-span-2"
          >
            <QrCode size={18} className="text-purple-600 mb-2" />
            <div>
              <div className="text-xs font-black text-slate-800">رمز استجابة سريعة (QR Code)</div>
              <div className="text-[9px] text-slate-400 font-semibold">للتحقق الرقمي والربط بالمنظومة</div>
            </div>
          </button>

        </div>

      </div>
    </div>
  );
};
