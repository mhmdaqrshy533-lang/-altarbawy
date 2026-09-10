/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Student {
  id: string;
  name: string;
  gender: 'male' | 'female';
  grades: Record<string, number>;
  attendance: Record<string, 'present' | 'absent' | 'late'>;
}

export interface Section {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  isNew?: boolean;
}

export interface LessonPlan {
  id: string;
  topic: string;
  subject: string;
  class: string;
  date: string;
  objective: string;
  domain: string;
  level: string;
  aids: string;
  homework: string;
}
