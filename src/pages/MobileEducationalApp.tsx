import React, { useState } from 'react';
import { 
  Home, 
  Grid, 
  GraduationCap, 
  Bell, 
  User, 
  Search, 
  BookOpen, 
  FileSignature, 
  UserCheck, 
  BarChart3, 
  Award, 
  QrCode, 
  Calendar, 
  ClipboardList, 
  ChevronLeft, 
  Sparkles, 
  ShieldCheck, 
  Smartphone, 
  Maximize2, 
  Star, 
  CheckCircle2, 
  Clock, 
  Bus,
  CreditCard,
  MessageSquare,
  Fingerprint,
  Languages,
  LogOut,
  RotateCcw,
  Sliders,
  MoreHorizontal,
  Mail,
  AlertCircle,
  FileText,
  Activity,
  Layers,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useOS } from '../context/OSContext';

type AppRole = 'student' | 'teacher' | 'parent' | 'admin';
type BottomTab = 'home' | 'services' | 'certificates' | 'notifications' | 'profile';

export default function MobileEducationalApp({ onBack }: { onBack?: () => void }) {
  const { launchApplet } = useOS();
  
  // UI States
  const [activeTab, setActiveTab] = useState<BottomTab>('home');
  const [role, setRole] = useState<AppRole>('student');
  const [isDeviceFrame, setIsDeviceFrame] = useState<boolean>(true);
  const [userName, setUserName] = useState('اسم المستخدم');
  const [searchQuery, setSearchQuery] = useState('');

  // Role details metadata
  const roleConfig = {
    student: {
      title: 'خدمات الطالب',
      badge: 'طالب متفوق',
      subtitle: 'الصف الرابع الأساسي - مدرسة معاذ بن جبل',
      headerBg: 'bg-[#004B6E]',
      services: [
        { id: 'certificates_section', title: 'الدرجات والشهادات', icon: GraduationCap, route: 'certificates_section' },
        { id: 'exams_section', title: 'الاختبارات', icon: FileSignature, route: 'exams_section' },
        { id: 'plans_section', title: 'الواجبات والتحضير', icon: BookOpen, route: 'plans_section' },
        { id: 'timetables_section', title: 'جدول الحصص', icon: Calendar, route: 'timetables_section' },
        { id: 'attendance_section', title: 'المواظبة والحضور', icon: UserCheck, route: 'attendance_section' },
        { id: 'badges', title: 'المكافآت والأوسمة', icon: Award, route: 'badges' },
        { id: 'ai_assistant', title: 'المساعد الذكي AI', icon: Bot, route: 'ai_assistant' },
        { id: 'memos', title: 'التعاميم المدرسية', icon: FileText, route: 'official_memos' },
        { id: 'messages', title: 'البريد والرسائل', icon: Mail, route: 'messages' },
        { id: 'bus', title: 'تتبع الحافلة', icon: Bus, route: 'bus' },
        { id: 'grades_record', title: 'أداء الطالب', icon: Activity, route: 'grades_section' },
        { id: 'bubble_sheets', title: 'نماذج التظليل OMR', icon: QrCode, route: 'bubble_sheets' }
      ]
    },
    teacher: {
      title: 'خدمات المنسوبين',
      badge: 'معلم مادة',
      subtitle: 'قسم التربية الإسلامية واللغة العربية',
      headerBg: 'bg-[#004B6E]',
      services: [
        { id: 'attendance_check', title: 'بصمة الحضور', icon: Fingerprint, route: 'attendance_section' },
        { id: 'my_services', title: 'خدماتي التعليمية', icon: Layers, route: 'dashboard' },
        { id: 'mail_messages', title: 'بريدي ورسائلي', icon: Mail, route: 'messages' },
        { id: 'bus_tracking', title: 'تتبع الحافلات', icon: Bus, route: 'bus' },
        { id: 'self_service', title: 'الخدمة الذاتية', icon: User, route: 'profile' },
        { id: 'exams_editor', title: 'محرر الامتحانات', icon: FileSignature, route: 'exams_section' },
        { id: 'grading', title: 'رصد الدرجات', icon: BarChart3, route: 'grades_section' },
        { id: 'memos', title: 'التعاميم المدرسية', icon: FileText, route: 'official_memos' }
      ]
    },
    parent: {
      title: 'خدمات ولي الأمر',
      badge: 'متابع معتمد',
      subtitle: 'متابعة أبناء الطالب في المرحلة الأساسية',
      headerBg: 'bg-[#004B6E]',
      services: [
        { id: 'fees_pay', title: 'سداد الرسوم', icon: CreditCard, route: 'fees' },
        { id: 'fees_view', title: 'معاينة الرسوم', icon: BarChart3, route: 'fees' },
        { id: 'bus_sub', title: 'اشتراك النقل', icon: Bus, route: 'bus' },
        { id: 'act_sub', title: 'اشتراك الأنشطة', icon: Activity, route: 'activities' },
        { id: 'bus_track', title: 'تتبع الحافلة', icon: Bus, route: 'bus' },
        { id: 'call_system', title: 'النداء الآلي', icon: Bell, route: 'call' },
        { id: 'complaints', title: 'الشكاوى والاستفسار', icon: AlertCircle, route: 'complaints' },
        { id: 'rewards', title: 'المكافآت والجوائز', icon: Award, route: 'badges' },
        { id: 'registration', title: 'التسجيل والمستندات', icon: FileText, route: 'certificates_section' },
        { id: 'circulars', title: 'التعاميم الرسمية', icon: FileText, route: 'official_memos' }
      ]
    },
    admin: {
      title: 'إدارة المنظومة',
      badge: 'مدير النظام',
      subtitle: 'إدارة المدرسة ومكتب التربية',
      headerBg: 'bg-[#003B5C]',
      services: [
        { id: 'certificates_all', title: 'الشهادات الرسمية', icon: GraduationCap, route: 'certificates_section' },
        { id: 'grades_all', title: 'كشوف الدرجات', icon: BarChart3, route: 'grades_section' },
        { id: 'exams_all', title: 'محرر الامتحانات', icon: FileSignature, route: 'exams_section' },
        { id: 'attendance_all', title: 'رصد الحضور والغياب', icon: UserCheck, route: 'attendance_section' },
        { id: 'omr_all', title: 'التصحيح الآلي OMR', icon: QrCode, route: 'bubble_sheets' },
        { id: 'timetables_all', title: 'الجداول المدرسية', icon: Calendar, route: 'timetables_section' },
        { id: 'badges_all', title: 'لوحات الشرف', icon: Award, route: 'badges' },
        { id: 'memos_all', title: 'التعاميم والقرارات', icon: FileText, route: 'official_memos' }
      ]
    }
  };

  const currentConfig = roleConfig[role];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-2 sm:p-6 md:p-8 flex flex-col items-center justify-start select-none" dir="rtl">
      
      {/* Top Desktop Controls Bar */}
      <div className="w-full max-w-4xl bg-slate-800/90 backdrop-blur border border-slate-700/80 rounded-2xl p-3 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          {onBack && (
            <button 
              onClick={onBack}
              className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold"
            >
              <ChevronLeft size={16} className="rotate-180" />
              <span>العودة للمنصة</span>
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-500 text-white font-black flex items-center justify-center text-sm shadow-md">
              M
            </div>
            <div>
              <h2 className="text-sm font-black text-white leading-tight">واجهة التطبيق التعليمي (Mobile UI)</h2>
              <p className="text-[10px] text-sky-400 font-bold">تصميم عربي موحد RTL مستوحى من الهوية المرفقة</p>
            </div>
          </div>
        </div>

        {/* Role Switcher & Frame Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-slate-900/80 p-1 rounded-xl border border-slate-700 flex items-center gap-1">
            {(['student', 'teacher', 'parent', 'admin'] as AppRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  role === r ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {r === 'student' ? 'الطالب' : r === 'teacher' ? 'المنسوبين/المعلم' : r === 'parent' ? 'ولي الأمر' : 'الإدارة'}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsDeviceFrame(!isDeviceFrame)}
            className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            title="تبديل وضع العرض"
          >
            {isDeviceFrame ? <Maximize2 size={16} /> : <Smartphone size={16} />}
            <span className="hidden sm:inline">{isDeviceFrame ? 'ملء الشاشة' : 'إطار هاتف'}</span>
          </button>
        </div>
      </div>

      {/* MOBILE APP DISPLAY FRAME */}
      <div 
        className={`transition-all duration-300 w-full ${
          isDeviceFrame 
            ? 'max-w-[390px] h-[820px] rounded-[48px] border-[12px] border-slate-800 shadow-2xl ring-1 ring-slate-700/50 bg-[#F4F7FA] text-slate-900 overflow-hidden flex flex-col relative my-auto' 
            : 'max-w-md min-h-[780px] bg-[#F4F7FA] text-slate-900 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col relative'
        }`}
      >
        
        {/* Status Bar Mockup */}
        {isDeviceFrame && (
          <div className="bg-[#004B6E] text-white text-[11px] font-bold px-6 py-2 flex items-center justify-between shrink-0 select-none">
            <span>9:41</span>
            <div className="w-20 h-4 bg-slate-950 rounded-full mx-auto -mt-1"></div>
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <div className="w-4 h-2 border border-white rounded-sm p-0.5 flex items-center">
                <div className="w-full h-full bg-white rounded-2xs"></div>
              </div>
            </div>
          </div>
        )}

        {/* REFERENCE-INSPIRED ARCH HEADER SECTION */}
        <div className="bg-[#004B6E] text-white pt-4 pb-12 px-5 relative shrink-0 text-right shadow-md">
          {/* Header Top Controls Bar */}
          <div className="flex items-center justify-between relative z-10 mb-2">
            <button 
              className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur rounded-xl text-white transition-colors flex items-center gap-1"
              title="تغيير اللغة"
            >
              <Languages size={18} />
            </button>

            <div className="text-right">
              <h1 className="text-lg font-black text-white tracking-tight">{currentConfig.title}</h1>
              <p className="text-[10px] text-sky-200/90 font-medium">{currentConfig.subtitle}</p>
            </div>
          </div>

          {/* Curved Arch Cut-out in Bottom Center */}
          <div className="absolute -bottom-7 inset-x-0 flex justify-center z-20">
            <div className="w-16 h-16 rounded-full bg-[#38BDF8] border-4 border-[#F4F7FA] flex items-center justify-center text-white font-black text-xl shadow-md">
              {role === 'student' ? '🎓' : role === 'teacher' ? '👨‍🏫' : role === 'parent' ? '👨‍👩‍👦' : '🏛️'}
            </div>
          </div>
        </div>

        {/* USER PROFILE & TASK BAR */}
        <div className="pt-9 px-4 pb-2 shrink-0">
          <div className="flex items-center justify-between gap-2">
            {/* Action Pill Button */}
            <button 
              onClick={() => setActiveTab('services')}
              className="px-3 py-1.5 bg-[#38BDF8] hover:bg-sky-500 text-white rounded-2xl text-xs font-black shadow-xs transition-colors"
            >
              مهام اليوم
            </button>

            {/* User Name Bar */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="text-xs font-bold text-slate-800 text-right w-24 bg-transparent border-none focus:outline-none"
                placeholder="اسم المستخدم"
              />
              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200">
                <User size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* DYNAMIC SCROLLABLE BODY CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar pb-28">
          
          {/* TAB 1: HOME & SERVICES GRID */}
          {(activeTab === 'home' || activeTab === 'services') && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              
              {/* Service Cards Grid (Matching Reference Layout) */}
              <div className="grid grid-cols-2 gap-3">
                {currentConfig.services.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => launchApplet(item.route)}
                      className="bg-white hover:bg-sky-50/50 p-4 rounded-3xl border border-slate-200/70 hover:border-sky-300 shadow-2xs hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-2 h-28 group"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon size={22} />
                      </div>
                      <span className="text-xs font-bold text-[#0F172A] leading-tight line-clamp-2">
                        {item.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Banner / Important Notice */}
              <div 
                onClick={() => launchApplet('certificates_section')}
                className="bg-white rounded-3xl p-3.5 border border-slate-200/80 shadow-2xs flex items-center gap-3 cursor-pointer hover:border-sky-300 transition-all"
              >
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Award size={20} />
                </div>
                <div className="text-right flex-1">
                  <h4 className="text-xs font-black text-slate-900">شهادات النجاح والتفوق القرآني</h4>
                  <p className="text-[10px] text-slate-500 font-bold">اصدار الوثائق الرسمية المعتمدة لعام 2026</p>
                </div>
                <ChevronLeft size={16} className="text-slate-400" />
              </div>

            </motion.div>
          )}

          {/* TAB 3: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <div className="bg-white p-4 rounded-3xl border border-slate-200 text-right space-y-2">
                <h3 className="text-sm font-black text-[#004B6E]">سجل الشهادات والوثائق الرسمية</h3>
                <p className="text-xs text-slate-600 font-bold">يمكنك الوصول إلى كشوف الأوائل وشهادات الإجازة القرآنية من هنا.</p>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {[
                  { title: 'إجازة صحيح الإمام البخاري', type: 'إجازة حديثية', route: 'certificates_section' },
                  { title: 'شهادة إجازة القرآن الكريم', type: 'إجازة إقراء', route: 'certificates_section' },
                  { title: 'كشف درجات وسجل الأوائل', type: 'سجل تحصيلي', route: 'grades_section' }
                ].map((cert, idx) => (
                  <div
                    key={idx}
                    onClick={() => launchApplet(cert.route)}
                    className="bg-white p-3.5 rounded-2xl border border-slate-200 hover:border-sky-400 cursor-pointer flex items-center justify-between text-right"
                  >
                    <div>
                      <h4 className="text-xs font-black text-slate-900">{cert.title}</h4>
                      <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md mt-1 inline-block">{cert.type}</span>
                    </div>
                    <ChevronLeft size={16} className="text-slate-400" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2 text-right">
              <h3 className="text-xs font-black text-slate-900 px-1">الإشعارات والتنبيهات</h3>
              {[
                { title: 'تم رصد درجات الاختبار النصفي', time: 'منذ ساعتين' },
                { title: 'موعد رحلة الحافلة المدرسية غداً', time: 'منذ 5 ساعات' },
                { title: 'اعتماد شهادة الحفظ والتجويد', time: 'أمس' }
              ].map((item, i) => (
                <div key={i} className="bg-white p-3 rounded-2xl border border-slate-200 text-xs font-bold space-y-1">
                  <div className="flex items-center justify-between text-slate-900">
                    <span>{item.title}</span>
                    <span className="text-[10px] text-slate-400">{item.time}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* TAB 5: PROFILE */}
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 text-right">
              <div className="bg-white p-4 rounded-3xl border border-slate-200 space-y-3 text-center">
                <div className="w-14 h-14 rounded-full bg-[#004B6E] text-white font-black text-xl mx-auto flex items-center justify-center border-2 border-sky-400 shadow-xs">
                  {userName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm">{userName}</h3>
                  <p className="text-[11px] text-slate-500 font-bold">{currentConfig.title} - {currentConfig.subtitle}</p>
                </div>
              </div>

              {/* Role Selection inside Profile */}
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-2">
                <label className="text-xs font-black text-slate-800">تبديل واجهة الدور:</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['student', 'teacher', 'parent', 'admin'] as AppRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => setRole(r)}
                      className={`p-2 rounded-xl text-xs font-bold transition-all border ${
                        role === r ? 'bg-[#004B6E] text-white border-[#004B6E]' : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {r === 'student' ? 'طالب' : r === 'teacher' ? 'منسوب/معلم' : r === 'parent' ? 'ولي أمر' : 'إدارة'}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </div>

        {/* REFERENCE-INSPIRED FLOATING BOTTOM NAVIGATION BAR */}
        <div className="absolute bottom-0 inset-x-0 bg-white border-t border-slate-200/80 pt-2 pb-3 px-4 z-30 shadow-lg rounded-t-3xl text-center">
          
          {/* Main Navigation Row */}
          <div className="flex items-center justify-around mb-2">
            
            {/* Logout / Exit */}
            <button 
              onClick={onBack}
              className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <LogOut size={18} />
              <span className="text-[10px] font-bold">خروج</span>
            </button>

            {/* Back */}
            <button 
              onClick={() => setActiveTab('home')}
              className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <RotateCcw size={18} />
              <span className="text-[10px] font-bold">رجوع</span>
            </button>

            {/* Home (Active Highlighted) */}
            <button 
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-0.5 ${
                activeTab === 'home' ? 'text-[#004B6E] font-black' : 'text-slate-400'
              }`}
            >
              <Home size={20} />
              <span className="text-[10px] font-bold">الرئيسية</span>
            </button>

            {/* More / Services */}
            <button 
              onClick={() => setActiveTab('services')}
              className={`flex flex-col items-center gap-0.5 ${
                activeTab === 'services' ? 'text-[#004B6E] font-black' : 'text-slate-400'
              }`}
            >
              <MoreHorizontal size={20} />
              <span className="text-[10px] font-bold">المزيد</span>
            </button>

          </div>

          {/* Sub Brand Footer Line (Matching ShareEdu branding in images) */}
          <div className="border-t border-slate-100 pt-1.5 flex items-center justify-center gap-1.5 text-[10px] font-bold text-sky-800/80">
            <div className="w-2 h-2 rounded-full bg-sky-500"></div>
            <span>MistarEdu</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-400 text-[9px]">منظومة الإدارة التعليمية الذكية</span>
          </div>

        </div>

      </div>

    </div>
  );
}

