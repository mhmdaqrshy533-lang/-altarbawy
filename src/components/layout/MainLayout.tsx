/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * الرقيم التربوي - التخطيط الهيكلي الرئيسي (MainLayout)
 * يدير شريط الملاحة، الشريط العلوي، القائمة الجانبية المتجاوبة، ودعم الوضع الليلي والمساحات الآمنة.
 * برمجة وتصميم وتطوير المهندس سهيل الهزبري
 */

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { BottomNavigation } from './BottomNavigation';
import { motion, AnimatePresence } from 'motion/react';
import { useOS } from '../../context/OSContext';
import { RaqeemErrorBoundary } from '../ui/RaqeemErrorBoundary';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { activeApplet } = useOS();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans w-full overflow-x-hidden" dir="rtl">
      {/* Persistent / Responsive Sidebar */}
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Viewport Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen relative">
        {/* Persistent TopBar with Mobile Menu Toggle */}
        <TopBar onToggleMobileMenu={() => setIsMobileSidebarOpen(prev => !prev)} />

        {/* Dynamic Page Content with Smooth Transition */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative pb-20 lg:pb-6 safe-pb">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeApplet}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="h-full"
            >
              <RaqeemErrorBoundary fallbackTitle="حدث تنبيه أثناء عرض الشاشة">
                {children}
              </RaqeemErrorBoundary>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Mobile Responsive Bottom Navigation */}
        <BottomNavigation />
      </div>
    </div>
  );
};
