/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ----------------------------------------------------
// Mistar EduOS Core Database Schema (PostgreSQL via Drizzle ORM)
// ----------------------------------------------------

import { pgTable, text, timestamp, uuid, integer, jsonb, boolean } from 'drizzle-orm/pg-core';

// 1. Users & Roles
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  nationalId: text('national_id').unique().notNull(),
  fullName: text('full_name').notNull(),
  role: text('role').notNull(), // 'student', 'teacher', 'admin', 'ministry'
  email: text('email').unique(),
  schoolId: uuid('school_id').references(() => schools.id),
  metadata: jsonb('metadata'), // AI profile, learning style, etc.
  createdAt: timestamp('created_at').defaultNow(),
  lastActive: timestamp('last_active').defaultNow(),
});

// 2. Schools & Infrastructure
export const schools = pgTable('schools', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  directorateId: uuid('directorate_id'),
  locationLat: text('location_lat'),
  locationLng: text('location_lng'),
  aiReadinessScore: integer('ai_readiness_score').default(0),
});

// 3. AI Insights (Proactive Engine Memory)
export const aiInsights = pgTable('ai_insights', {
  id: uuid('id').primaryKey().defaultRandom(),
  targetUserId: uuid('target_user_id').references(() => users.id),
  insightType: text('insight_type').notNull(), // 'dropout_risk', 'talent', 'gap'
  confidenceScore: integer('confidence_score').notNull(),
  details: jsonb('details').notNull(),
  status: text('status').default('active'), // 'active', 'resolved', 'ignored'
  createdAt: timestamp('created_at').defaultNow(),
});

// 4. Learning Paths & Adaptive Engine
export const learningPaths = pgTable('learning_paths', {
  id: uuid('id').primaryKey().defaultRandom(),
  studentId: uuid('student_id').references(() => users.id).notNull(),
  subject: text('subject').notNull(),
  currentLevel: text('current_level'),
  masteredConcepts: jsonb('mastered_concepts'), // Array of concept IDs
  strugglingConcepts: jsonb('struggling_concepts'),
  lastAssessed: timestamp('last_assessed'),
});

// 5. Question Bank (Smart Bank)
export const smartQuestions = pgTable('smart_questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: text('content').notNull(),
  type: text('type').notNull(), // 'mcq', 'essay', 'math', 'drawing'
  bloomTaxonomyLevel: text('bloom_level'), // 'remember', 'understand', 'apply', 'analyze', 'evaluate', 'create'
  difficulty: integer('difficulty'), // 1-10
  extractedConcepts: jsonb('extracted_concepts'), // AI-extracted tags
  sourceDocumentUrl: text('source_document_url'), // If imported via OCR
  isVerified: boolean('is_verified').default(false),
});
