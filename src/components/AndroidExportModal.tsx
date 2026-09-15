import React, { useState, useEffect } from 'react';
import { 
  X, 
  Smartphone, 
  Download, 
  CheckCircle2, 
  Layers, 
  Terminal, 
  ExternalLink, 
  Copy, 
  Check, 
  Share2, 
  Flame, 
  Sparkles,
  HelpCircle,
  FolderArchive
} from 'lucide-react';
import { MANDATORY_COPYRIGHT } from '../types/exam';

interface AndroidExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AndroidExportModal({ isOpen, onClose }: AndroidExportModalProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstallPwa, setCanInstallPwa] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstallPwa(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setCanInstallPwa(false);
      }
      setDeferredPrompt(null);
    } else {
      alert('لتثبيت التطبيق على هاتفك: اضغط على خيارات المتصفح (⋮) ثم اختر "إضافة إلى الشاشة الرئيسية" أو "تثبيت التطبيق".');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fadeIn" dir="rtl">
      <div className="bg-[#0f172a] border border-slate-700/80 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0d5c3a] to-emerald-800 p-5 flex items-center justify-between text-white shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <Smartphone size={22} />
            </div>
            <div>
              <h2 className="text-base font-black">حزمة تطبيق أندرويد (Android APK & Package)</h2>
              <p className="text-xs text-emerald-100 opacity-90">نظام الرقيم التربوي — إعداد وتجميع التطبيق للهواتف الذكية</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-emerald-200 hover:text-white hover:bg-white/10 rounded-xl transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* 1. Direct Instant Web-APK / PWA Install */}
          <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-4 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Sparkles size={18} />
                <span>التثبيت الفوري المباشر على الهاتف (PWA App)</span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold">
                بدون الحاجة لمتجر
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              يمكنك تشغيل وتثبيت النظام كتطبيق أندرويد متكامل يعمل بملء الشاشة مع استجابة فورية للكاميرا وبدون إنترنت:
            </p>
            <button
              onClick={handleInstallPWA}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
            >
              <Smartphone size={16} />
              <span>تثبيت التطبيق على هاتفي الآن (Install to Android)</span>
            </button>
          </div>

          {/* 2. Download Native Android Studio Project */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <FolderArchive size={18} className="text-sky-400" />
                <span>تحميل مشروع Android Studio الجاهز (.ZIP)</span>
              </div>
              <span className="bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold">
                مشروع كوتلن Kotlin / Gradle
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              مشروع أندرويد ستوديو متكامل يحتوي على إعدادات الـ Gradle والـ Manifest وواجهات كوتلن و Jetpack Compose مع ميزة الكاميرا والتصحيح:
            </p>
            <a
              href="/public/Raqeem-Android-Studio-Project.zip"
              download="Raqeem-Android-Studio-Project.zip"
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20"
            >
              <Download size={16} />
              <span>تحميل ملف المشروع (Raqeem-Android-Studio-Project.zip)</span>
            </a>
          </div>

          {/* 3. Steps to Build APK in Android Studio */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <Terminal size={16} />
              <span>خطوات تجميع واستخراج ملف الـ APK عبر Android Studio:</span>
            </div>
            <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside pr-1 leading-relaxed">
              <li>افتح برنامج <b>Android Studio</b> على حاسوبك ثم اختر <b>Open Existing Project</b> واختر المجلد المستخرج.</li>
              <li>انتظر حتى تكتمل مزامنة الـ Gradle.</li>
              <li>
                من القائمة العلوية اضغط على: 
                <span className="inline-block bg-slate-800 text-emerald-300 font-mono text-[11px] px-2 py-0.5 rounded mx-1">
                  Build ➔ Build Bundle(s) / APK(s) ➔ Build APK(s)
                </span>
              </li>
              <li>
                أو عبر سطر الأوامر (Terminal):
                <div className="flex items-center justify-between bg-slate-950 p-2 rounded-xl mt-1.5 font-mono text-[11px] text-slate-300 border border-slate-800">
                  <span>./gradlew assembleDebug</span>
                  <button
                    onClick={() => handleCopy('./gradlew assembleDebug', 'cmd1')}
                    className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded"
                    title="نسخ الأمر"
                  >
                    {copied === 'cmd1' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </li>
              <li>
                ستجد ملف الـ APK المنشأ جاهزاً للتثبيت في المسار:
                <span className="block bg-slate-950 p-2 rounded-xl mt-1 text-slate-400 font-mono text-[10px] border border-slate-800">
                  app/build/outputs/apk/debug/app-debug.apk
                </span>
              </li>
            </ol>
          </div>

          {/* Copyright Footer Notice */}
          <div className="text-center text-[10px] text-slate-500 font-bold pt-2 border-t border-slate-800">
            {MANDATORY_COPYRIGHT}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900/80 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
}
