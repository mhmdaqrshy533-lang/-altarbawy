/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * الرقيم التربوي - الشريط العلوي الموحد (TopBar)
 * دعم البحث السريع، التحكم في الدور، المركز الوطني للموارد، وحالة الاتصال والوضع الليلي.
 * برمجة وتصميم وتطوير المهندس سهيل الهزبري
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Bell, 
  Shield, 
  Layers, 
  Wifi, 
  CloudOff, 
  X, 
  ArrowLeft, 
  Sparkles, 
  Sun, 
  Moon, 
  Menu 
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';
import { PWAInstallModal } from '../PWAInstallModal';
import { RoleSelectorModal } from '../RoleSelectorModal';
import { ResourceCenterModal } from '../ResourceCenterModal';
import { FontPickerModal } from '../FontPickerModal';
import { useRole } from '../../context/RoleContext';
import { useOS } from '../../context/OSContext';
import { useTheme } from '../../context/ThemeContext';
import { searchServices, ServiceTool } from '../../services/servicesRegistry';

interface TopBarProps {
  onToggleMobileMenu?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleMobileMenu }) => {
  const { isOffline } = usePWA();
  const { currentRole, headerInfo } = useRole();
  const { launchApplet } = useOS();
  const { effectiveTheme, toggleTheme } = useTheme();

  const [isPWAModalOpen, setIsPWAModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [isFontPickerOpen, setIsFontPickerOpen] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<ServiceTool[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchServices(searchQuery, currentRole.id);
      setSearchResults(results);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery, currentRole.id]);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('global-search-input')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close search popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectService = (route: string) => {
    launchApplet(route);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shrink-0 shadow-2xs">
        
        {/* Right Section: Mobile Menu Trigger + Brand Identity */}
        <div className="flex items-center gap-2.5">
          {onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="القائمة الجانبية"
              aria-label="القائمة الجانبية"
            >
              <Menu size={22} />
            </button>
          )}

          {/* Mobile Brand Name */}
          <div 
            onClick={() => launchApplet('dashboard')}
            className="flex items-center gap-2 lg:hidden cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-[#004B6E] text-[#38BDF8] flex items-center justify-center font-black text-sm">
              🎓
            </div>
            <span className="text-xs font-black text-[#004B6E] dark:text-sky-400">الرقيم</span>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div ref={searchRef} className="flex-1 max-w-md hidden md:block relative mx-4">
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-200/80 dark:border-slate-700 focus-within:bg-white dark:focus-within:bg-slate-800 focus-within:ring-2 focus-within:ring-sky-200 dark:focus-within:ring-sky-900 focus-within:border-[#004B6E] transition-all">
            <Search size={18} className="text-slate-400 shrink-0" />
            <input 
              id="global-search-input"
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim() && setIsSearchOpen(true)}
              placeholder="بحث في الخدمات والأدوات والمستندات..."
              className="bg-transparent border-none outline-hidden text-xs font-bold text-slate-800 dark:text-slate-100 w-full placeholder-slate-400"
            />
            {searchQuery ? (
              <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
                <X size={16} />
              </button>
            ) : (
              <div className="flex items-center gap-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-1.5 py-0.5 rounded-md text-[10px] font-bold text-slate-400 dark:text-slate-300 shrink-0 select-none">
                <span>⌘</span>
                <span>K</span>
              </div>
            )}
          </div>

          {/* Search Dropdown Results */}
          {isSearchOpen && (
            <div className="absolute top-full right-0 left-0 mt-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-black text-[#004B6E] dark:text-sky-300">نتائج البحث المقترحة ({searchResults.length})</span>
                <span className="text-[10px] font-bold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded-full border border-sky-100 dark:border-sky-800">
                  حسب دور: {currentRole.title}
                </span>
              </div>

              {searchResults.length === 0 ? (
                <div className="p-8 text-center text-slate-400 dark:text-slate-500">
                  <Sparkles size={28} className="mx-auto mb-2 opacity-50 text-sky-600" />
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-300">لم نجد نتائج مطابقة لـ "{searchQuery}"</p>
                  <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mt-1">تأكد من كتابة الكلمة بشكل صحيح أو جرب البحث بعنوان آخر</p>
                </div>
              ) : (
                <div className="p-2 space-y-1">
                  {searchResults.map((tool) => {
                    const IconComp = (Icons as any)[tool.iconName] || Icons.Workflow;
                    return (
                      <div
                        key={tool.id}
                        onClick={() => handleSelectService(tool.route)}
                        className="flex items-center justify-between p-3 rounded-2xl hover:bg-sky-50/80 dark:hover:bg-slate-800 transition-all cursor-pointer group border border-transparent hover:border-sky-200 dark:hover:border-slate-700"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-sky-100/80 dark:bg-slate-800 text-[#004B6E] dark:text-sky-300 flex items-center justify-center shrink-0 group-hover:bg-[#004B6E] group-hover:text-white dark:group-hover:bg-sky-600 transition-colors">
                            <IconComp size={18} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-slate-900 dark:text-slate-100 group-hover:text-[#004B6E] dark:group-hover:text-sky-300 transition-colors">{tool.name}</span>
                              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                {tool.subcategory}
                              </span>
                            </div>
                            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 line-clamp-1 mt-0.5">{tool.description}</p>
                          </div>
                        </div>
                        <ArrowLeft size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-[#004B6E] dark:group-hover:text-sky-300 group-hover:-translate-x-1 transition-all shrink-0" />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Left Section: Role Badge, Theme Toggle, Notifications, User Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          
          {/* Active Role Selector Badge */}
          <button
            onClick={() => setIsRoleModalOpen(true)}
            className="flex items-center gap-1.5 bg-sky-50 dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-slate-700 border border-sky-200 dark:border-slate-700 text-[#004B6E] dark:text-sky-300 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black transition-all shadow-2xs active:scale-95 cursor-pointer"
            title="انقر لتبديل الدور الإداري"
          >
            <Shield size={14} className="text-sky-600 dark:text-sky-400" />
            <span className="hidden sm:inline">{currentRole.title}</span>
            <span className="sm:hidden text-[11px]">الدور</span>
          </button>

          {/* National Resource Center Button */}
          <button
            onClick={() => setIsResourceModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 px-3 py-1.5 rounded-xl text-xs font-black transition-all shadow-2xs active:scale-95 cursor-pointer"
            title="الشعارات، الرموز، والأختام"
          >
            <Layers size={14} className="text-amber-600 dark:text-amber-400" />
            <span>الموارد المعتمدة</span>
          </button>

          {/* Offline / Online Status Badge */}
          {isOffline ? (
            <div className="flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800 px-2.5 py-1.5 rounded-xl text-xs font-black select-none animate-pulse">
              <CloudOff size={14} className="stroke-[2.5]" />
              <span className="hidden md:inline">أوفلاين</span>
            </div>
          ) : (
            <div className="hidden xl:flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 px-2.5 py-1 rounded-xl text-[10px] font-bold select-none">
              <Wifi size={12} className="stroke-[2.5]" />
              <span>متصل بالشبكة</span>
            </div>
          )}

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            title={effectiveTheme === 'dark' ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الليلي'}
            aria-label="تبديل الوضع الليلي"
          >
            {effectiveTheme === 'dark' ? (
              <Sun size={18} className="text-amber-400" />
            ) : (
              <Moon size={18} className="text-slate-600" />
            )}
          </button>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-0.5 hidden sm:block"></div>

          {/* Notifications */}
          <button 
            onClick={() => launchApplet('official_memos')}
            className="w-9 h-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 relative transition-colors cursor-pointer" 
            title="الإشعارات والرسائل"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-sky-500 rounded-full"></span>
          </button>
          
          {/* User Profile Trigger */}
          <button 
            onClick={() => setIsRoleModalOpen(true)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer"
          >
            <div className="flex flex-col items-end mr-1 hidden lg:flex text-right">
              <span className="text-xs font-black text-slate-800 dark:text-slate-100">{headerInfo.authorName || 'م. أحمد العولقي'}</span>
              <span className="text-[10px] font-bold text-sky-700 dark:text-sky-400">{headerInfo.schoolName || 'مدرسة الرقيم الذكية'}</span>
            </div>
            <div className="w-8 h-8 rounded-xl bg-[#004B6E] dark:bg-sky-700 text-[#38BDF8] dark:text-white flex items-center justify-center shadow-2xs font-black text-xs border border-sky-400/30">
              {headerInfo.authorName ? headerInfo.authorName.charAt(0) : 'م'}
            </div>
          </button>
        </div>
      </header>

      {/* Modals */}
      <PWAInstallModal 
        isOpen={isPWAModalOpen} 
        onClose={() => setIsPWAModalOpen(false)} 
      />
      
      <RoleSelectorModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
      />

      <ResourceCenterModal
        isOpen={isResourceModalOpen}
        onClose={() => setIsResourceModalOpen(false)}
      />

      <FontPickerModal
        isOpen={isFontPickerOpen}
        onClose={() => setIsFontPickerOpen(false)}
        title="مكتبة ومدير الخطوط التعليمية"
      />
    </>
  );
};
