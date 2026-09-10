/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOS } from '../context/OSContext';
import { AlertTriangle, Sparkles, Cpu, Info, X } from 'lucide-react';

export default function NotificationCenter() {
  const { notifications, markAsRead, launchApplet } = useOS();

  const activeNotifications = notifications.filter(n => !n.isRead).slice(0, 3); // Show top 3

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="text-red-400" size={20} />;
      case 'suggestion': return <Sparkles className="text-emerald-400" size={20} />;
      case 'automation': return <Cpu className="text-blue-400" size={20} />;
      default: return <Info className="text-violet-400" size={20} />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'alert': return 'border-red-500/50';
      case 'suggestion': return 'border-emerald-500/50';
      case 'automation': return 'border-blue-500/50';
      default: return 'border-violet-500/50';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {activeNotifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className={`pointer-events-auto bg-slate-900/90 backdrop-blur-xl border ${getBorderColor(notif.type)} p-4 rounded-2xl shadow-2xl shadow-black/50 w-80 relative overflow-hidden group`}
          >
            <button 
              onClick={() => markAsRead(notif.id)}
              className="absolute top-2 left-2 text-slate-500 hover:text-white transition-colors p-1"
            >
              <X size={16} />
            </button>
            
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                {getIcon(notif.type)}
              </div>
              <div className="pr-4">
                <h4 className="text-white font-bold text-sm mb-1">{notif.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-3">
                  {notif.description}
                </p>
                {notif.actionLabel && notif.actionRoute && (
                  <button 
                    onClick={() => {
                      launchApplet(notif.actionRoute!);
                      markAsRead(notif.id);
                    }}
                    className="text-xs font-bold text-violet-400 bg-violet-500/10 hover:bg-violet-500/20 px-3 py-1.5 rounded-lg border border-violet-500/20 transition-colors"
                  >
                    {notif.actionLabel}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
