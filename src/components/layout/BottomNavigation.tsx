/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * الرقيم التربوي - شريط الملاحة السفلي المتجاوب (BottomNavigation)
 * مخصص للهواتف والأجهزة المحمولة مع دعم المساحة الآمنة والوضع الليلي.
 * برمجة وتصميم وتطوير المهندس سهيل الهزبري
 */

import React from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  Sparkles, 
  Settings
} from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { useRole } from '../../context/RoleContext';

export const BottomNavigation = () => {
  const { activeApplet, launchApplet } = useOS();
  const { currentRole } = useRole();

  // Determine role services route
  const getRoleServiceRoute = () => {
    if (currentRole.id === 'student') return 'student_services';
    if (currentRole.id === 'student_counselor') return 'student_services';
    return 'teacher_services';
  };

  const navItems = [
    { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
    { id: getRoleServiceRoute(), label: 'الخدمات', icon: Layers },
    { id: 'automation_center', label: 'الأتمتة', icon: Sparkles, badge: 'جديد' },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <nav 
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800 z-40 px-3 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] shadow-lg transition-colors select-none" 
      dir="rtl"
      aria-label="شريط الملاحة السفلي"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeApplet === item.id || (item.id === getRoleServiceRoute() && (activeApplet === 'teacher_services' || activeApplet === 'student_services' || activeApplet === 'parent_services'));
          
          return (
            <button
              key={item.id}
              onClick={() => launchApplet(item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 px-3 rounded-2xl transition-all relative cursor-pointer min-h-[44px] ${
                isActive 
                  ? 'text-[#004B6E] dark:text-sky-400 font-black' 
                  : 'text-slate-500 dark:text-slate-400 font-bold hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-sky-100/80 dark:bg-slate-800 text-[#004B6E] dark:text-sky-400' : ''}`}>
                <Icon size={20} />
              </div>
              <span className="text-[10px] whitespace-nowrap">{item.label}</span>
              {item.badge && (
                <span className="absolute top-1 right-2 w-2 h-2 bg-sky-500 rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
