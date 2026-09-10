import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import path from 'path';

let sqlite: any;
let db: any;

try {
  const dbPath = path.join(process.cwd(), 'sqlite.db');
  sqlite = new Database(dbPath);

  // Initialize tables if they don't exist
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS ocr_results (
      id TEXT PRIMARY KEY,
      text TEXT NOT NULL,
      language TEXT,
      headings TEXT,
      paragraphs TEXT,
      tables TEXT,
      images TEXT,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS concepts (
      id TEXT PRIMARY KEY,
      content_id TEXT NOT NULL,
      extracted_concepts TEXT,
      objectives TEXT,
      blooms_level TEXT,
      difficulty INTEGER,
      keywords TEXT,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS generated_questions (
      id TEXT PRIMARY KEY,
      content_id TEXT NOT NULL,
      type TEXT NOT NULL,
      text TEXT NOT NULL,
      options TEXT,
      correct_answer TEXT,
      bloom_level TEXT,
      difficulty INTEGER,
      created_at INTEGER NOT NULL
    );
  `);

  db = drizzle(sqlite, { schema });
} catch (e) {
  console.warn('[AI Studio] SQLite/Drizzle not connected — using in-memory mock');
  sqlite = {
    prepare: () => ({ get: () => null, all: () => [], run: () => ({ changes: 0 }) }),
    exec: () => {}
  };
  const noOp = {
    findMany: async () => [],
    findFirst: async () => null,
    findUnique: async () => null,
    create: async (d: any) => d?.data ?? {},
    update: async (d: any) => d?.data ?? {},
    delete: async () => ({})
  };
  db = new Proxy({}, {
    get: (_, prop) => prop === 'query'
      ? new Proxy({}, { get: () => noOp }) : async () => [],
  });
}

export { sqlite, db };
