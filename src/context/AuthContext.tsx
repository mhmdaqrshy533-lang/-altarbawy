/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/core';

interface AuthContextType {
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial token validation and RBAC loading
    const loadUser = async () => {
      try {
        const storedToken = localStorage.getItem('mistar_token');
        if (storedToken) {
          // In a real app, validate token with backend
          setUser({
            id: 'u-12345',
            nationalId: '1234567890',
            name: 'أ. سهيل الهزبري',
            role: 'teacher',
            schoolId: 'sch-001',
            lastActive: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error('Failed to restore session', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (token: string) => {
    localStorage.setItem('mistar_token', token);
    setUser({
      id: 'u-12345',
      nationalId: '1234567890',
      name: 'أ. سهيل الهزبري',
      role: 'teacher',
      schoolId: 'sch-001',
      lastActive: new Date().toISOString()
    });
  };

  const logout = () => {
    localStorage.removeItem('mistar_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
