/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ----------------------------------------------------
// Core Domain Models for Mistar EduOS
// ----------------------------------------------------

export type Role = 'student' | 'teacher' | 'school_admin' | 'directorate_admin' | 'ministry_admin' | 'ai_system';

export interface User {
  id: string;
  nationalId: string;
  name: string;
  role: Role;
  schoolId?: string;
  directorateId?: string;
  governorateId?: string;
  avatar?: string;
  lastActive: string;
}

export interface School {
  id: string;
  name: string;
  directorateId: string;
  location: { lat: number; lng: number };
  stats: {
    totalStudents: number;
    totalTeachers: number;
    performanceIndex: number; // 0-100
  };
}

export interface AINotification {
  id: string;
  type: 'alert' | 'suggestion' | 'insight' | 'automation';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  targetRole: Role | 'all';
  targetUserId?: string; // If specific to a user
  actionLabel?: string;
  actionRoute?: string;
  actionPayload?: any;
  isRead: boolean;
}

export interface AIInsight {
  id: string;
  category: 'learning_gap' | 'dropout_risk' | 'talent_discovery' | 'system_anomaly';
  confidenceScore: number; // 0-1
  summary: string;
  details: string;
  recommendedInterventions: string[];
  createdAt: string;
  status: 'pending' | 'resolved' | 'ignored';
}
