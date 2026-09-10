import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { useRole } from '../../context/RoleContext';
import { getServicesByRole, ServiceTool } from '../../services/servicesRegistry';

interface SidebarItemProps {
  id: string;
  label: string;
  iconName: string;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: (id: string) => void;
  badge?: string;
  badgeColor?: string;
}

const SidebarItem = ({ id, label, iconName, isActive, isCollapsed, onClick, badge, badgeColor }: SidebarItemProps) => {
  const IconComponent = (Icons as any)[iconName] || Icons.Workflow;

  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all duration-200 group relative cursor-pointer
        ${isActive 
          ? 'bg-[#004B6E] text-white shadow-md shadow-sky-900/20 font-black' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-bold'}`}
    >
      <IconComponent size={19} className={`shrink-0 ${isActive ? 'text-[#38BDF8]' : 'text-slate-500 group-hover:text-[#004B6E] group-hover:scale-105 transition-transform'}`} />
      {!isCollapsed && (
        <div className="flex items-center justify-between flex-1 overflow-hidden">
          <span className="text-xs whitespace-nowrap overflow-hidden transition-all duration-300 truncate text-right">
            {label}
          </span>
          {badge && (
            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full shrink-0 ${
              badgeColor || (isActive ? 'bg-sky-400/20 text-sky-200 border border-sky-300/30' : 'bg-sky-50 text-sky-700 border border-sky-200')
            }`}>
              {badge}
            </span>
          )}
        </div>
      )}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap shadow-lg">
          {label}
        </div>
      )}
    </button>
  );
};

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isMobileOpen: externalMobileOpen, 
  onCloseMobile: externalCloseMobile 
}) => {
  const { activeApplet, launchApplet } = useOS();
  const { currentRole } = useRole();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [internalMobileOpen, setInternalMobileOpen] = useState(false);

  const isMobileOpen = externalMobileOpen !== undefined ? externalMobileOpen : internalMobileOpen;
  const setIsMobileOpen = (open: boolean) => {
    if (externalCloseMobile && !open) {
      externalCloseMobile();
    }
    setInternalMobileOpen(open);
  };

  // Get tools available for the current role
  const roleTools = getServicesByRole(currentRole.id);

  // Group tools into logical navigation sections
  const navigationSections = [
    {
      group: 'الرئيسية والبوابات',
      items: [
        { id: 'dashboard', label: 'الرئيسية', iconName: 'LayoutDashboard' },
        { id: 'teacher_services', label: 'خدمات المعلم', iconName: 'Briefcase', badge: 'معلم' },
        { id: 'student_services', label: 'خدمات الطالب', iconName: 'GraduationCap', badge: 'طالب' },
        { id: 'parent_services', label: 'خدمات ولي الأمر', iconName: 'Users', badge: 'ولي أمر' },
        { id: 'automation_center', label: 'مركز الأتمتة والتحرير', iconName: 'Sparkles', badge: 'جديد' },
      ]
    },
    {
      group: 'الأدوات التعليمية والأكاديمية',
      items: [
        { id: 'attendance_section', label: 'الحضور والغياب', iconName: 'CalendarCheck', badge: 'يومي' },
        { id: 'exams_section', label: 'محرر الاختبارات', iconName: 'ClipboardCheck' },
        { id: 'plans_section', label: 'الواجبات والتحضير', iconName: 'BookOpen' },
        { id: 'grades_section', label: 'كشوف النتائج والدرجات', iconName: 'GraduationCap' },
        { id: 'timetables_section', label: 'الجدول الدراسي', iconName: 'CalendarDays' },
        { id: 'bubble_sheets', label: 'التصحيح الآلي OMR', iconName: 'Workflow', badge: 'OMR' },
        { id: 'question_bank', label: 'بنك الأسئلة', iconName: 'Archive' },
      ]
    },
    {
      group: 'الوثائق والأرشفة والتحليلات',
      items: [
        { id: 'standards_center', label: 'مركز المعايير والهوية', iconName: 'Building2', badge: 'عربي' },
        { id: 'certificates_section', label: 'الشهادات المعتمدة', iconName: 'BadgeCheck', badge: 'رسمي' },
        { id: 'official_memos', label: 'التعاميم والرسائل', iconName: 'Mail' },
        { id: 'templates_gallery', label: 'مركز القوالب الوطنية', iconName: 'Library' },
        { id: 'analytical_dashboard', label: 'إحصائيات المنظومة', iconName: 'ChartNoAxesCombined' },
        { id: 'archive_section', label: 'السجل والأرشيف', iconName: 'Archive' },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Fallback Mobile Menu Trigger Button if not in MainLayout */}
      {externalMobileOpen === undefined && (
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="fixed top-3.5 right-4 z-40 p-2.5 bg-[#004B6E] text-white rounded-xl shadow-lg lg:hidden hover:bg-sky-800 transition-colors cursor-pointer"
          title="القائمة الرئيسية"
        >
          <Icons.Menu size={20} />
        </button>
      )}

      {/* Sidebar Container */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isCollapsed ? '80px' : '270px',
          x: isMobileOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? '100%' : (0 as any))
        }}
        className={`fixed inset-y-0 right-0 bg-white dark:bg-slate-900 border-l border-slate-200/90 dark:border-slate-800 z-50 flex flex-col transition-all duration-300 lg:relative lg:translate-x-0 shadow-2xs
          ${isCollapsed ? 'px-3' : 'px-4'}`}
      >
        {/* Header Branding */}
        <div className="h-20 flex items-center justify-between shrink-0 border-b border-slate-100 dark:border-slate-800 mb-2">
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => launchApplet('dashboard')}
            >
              <div className="w-10 h-10 rounded-2xl bg-[#004B6E] text-[#38BDF8] flex items-center justify-center font-black text-xl border border-sky-400/30 shadow-2xs">
                🎓
              </div>
              <div className="flex flex-col text-right">
                <span className="font-black text-base text-[#004B6E] dark:text-sky-400 leading-tight">محرر الرقيم التربوي</span>
                <span className="text-[10px] font-bold text-sky-600 dark:text-sky-500">المنظومة التعليمية الرسمية</span>
              </div>
            </motion.div>
          )}
          {isCollapsed && (
            <div className="w-full flex justify-center cursor-pointer" onClick={() => launchApplet('dashboard')}>
              <div className="w-10 h-10 rounded-2xl bg-[#004B6E] text-[#38BDF8] flex items-center justify-center font-black text-xl shadow-2xs">
                🎓
              </div>
            </div>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            title={isCollapsed ? 'توسيع القائمة' : 'طي القائمة'}
          >
            <Icons.ChevronRight className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : 'rotate-0'}`} />
          </button>
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer"
          >
            <Icons.X size={20} />
          </button>
        </div>

        {/* Current Active Role Badge */}
        {!isCollapsed && (
          <div className="my-2 p-2.5 bg-sky-50/80 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700 rounded-2xl flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#004B6E] text-white flex items-center justify-center font-bold text-xs shrink-0">
              <Icons.ShieldCheck size={16} className="text-[#38BDF8]" />
            </div>
            <div className="truncate text-right">
              <p className="text-[10px] font-bold text-sky-800 dark:text-sky-400">الدور الحالي المفعل:</p>
              <p className="text-xs font-black text-[#004B6E] dark:text-sky-300 truncate">{currentRole.title}</p>
            </div>
          </div>
        )}

        {/* Navigation Sections */}
        <nav className="flex-1 space-y-4 overflow-y-auto no-scrollbar py-2">
          {navigationSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {!isCollapsed && (
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 px-3 uppercase tracking-wider mb-1 text-right">
                  {section.group}
                </p>
              )}
              {section.items.map((item) => (
                <SidebarItem
                  key={item.id}
                  {...item}
                  isActive={activeApplet === item.id}
                  isCollapsed={isCollapsed}
                  onClick={(id) => {
                    launchApplet(id);
                    setIsMobileOpen(false);
                  }}
                />
              ))}
            </div>
          ))}
        </nav>

        {/* Footer Settings Link */}
        <div className={`mt-auto shrink-0 border-t border-slate-100 dark:border-slate-800 py-3 space-y-1 ${isCollapsed ? 'px-0' : ''}`}>
          <SidebarItem
            id="settings"
            label="إعدادات المنظومة"
            iconName="Settings"
            isActive={activeApplet === 'settings'}
            isCollapsed={isCollapsed}
            onClick={(id) => {
              launchApplet(id);
              setIsMobileOpen(false);
            }}
          />
        </div>
      </motion.aside>
    </>
  );
};
