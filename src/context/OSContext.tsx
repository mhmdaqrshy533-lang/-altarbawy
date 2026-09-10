/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AINotification } from '../types/core';
import { ProactiveEngine } from '../core/engine/ProactiveEngine';

interface OSContextType {
  notifications: AINotification[];
  markAsRead: (id: string) => void;
  activeApplet: string | null;
  launchApplet: (appletId: string, payload?: any) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export function OSProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<AINotification[]>([]);
  const [activeApplet, setActiveApplet] = useState<string | null>('dashboard');

  useEffect(() => {
    const engine = ProactiveEngine.getInstance();
    
    // Subscribe to background AI insights
    const unsubscribe = engine.subscribe((notification) => {
      setNotifications(prev => [notification, ...prev]);
      
      // In a real OS, we might show a toast here or play a subtle sound
      console.log('💡 Proactive Insight:', notification.title);
    });

    return () => unsubscribe();
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const launchApplet = (appletId: string, payload?: any) => {
    console.log(`Launching ${appletId} with payload:`, payload);
    setActiveApplet(appletId);
  };

  return (
    <OSContext.Provider value={{ notifications, markAsRead, activeApplet, launchApplet }}>
      {children}
    </OSContext.Provider>
  );
}

export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
};
