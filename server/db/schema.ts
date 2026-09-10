import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const ocrResults = sqliteTable('ocr_results', {
  id: text('id').primaryKey(),
  text: text('text').notNull(),
  language: text('language'),
  headings: text('headings', { mode: 'json' }).$type<string[]>(),
  paragraphs: text('paragraphs', { mode: 'json' }).$type<string[]>(),
  tables: text('tables', { mode: 'json' }).$type<any[]>(),
  images: text('images', { mode: 'json' }).$type<any[]>(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const concepts = sqliteTable('concepts', {
  id: text('id').primaryKey(),
  contentId: text('content_id').notNull(), // Links to uploaded content or lesson
  extractedConcepts: text('extracted_concepts', { mode: 'json' }).$type<string[]>(),
  objectives: text('objectives', { mode: 'json' }).$type<string[]>(),
  bloomsLevel: text('blooms_level'),
  difficulty: integer('difficulty'),
  keywords: text('keywords', { mode: 'json' }).$type<string[]>(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const generatedQuestions = sqliteTable('generated_questions', {
  id: text('id').primaryKey(),
  contentId: text('content_id').notNull(),
  type: text('type').notNull(),
  text: text('text').notNull(),
  options: text('options', { mode: 'json' }).$type<string[]>(),
  correctAnswer: text('correct_answer'),
  bloomLevel: text('bloom_level'),
  difficulty: integer('difficulty'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});
