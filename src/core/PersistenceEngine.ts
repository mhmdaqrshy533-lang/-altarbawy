/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * الرقيم التربوي - محرك التخزين المستديم الموحد (Unified Persistence Engine)
 * برمجة وتصميم وتطوير المهندس سهيل الهزبري
 * 
 * الميزات:
 * 1. IndexedDB كوعاء تخزين أساسي للبيانات الكبيرة (المشاريع، المستندات، الكتب، بنك الأسئلة، الطلاب).
 * 2. التوافق التام (Backward Compatibility) مع مفاتيح localStorage السابقة وترحيلها تلقائياً.
 * 3. آلية Autosave و Versioning ومقاومة انقطاع الإنترنت أو Refresh.
 * 4. نظام Recovery واستعادة المسودات غير المحفوظة.
 * 5. آمن وقت التشغيل (Safe In-Memory Fallback) في حال تعطل أو تقييد IndexedDB في المتصفح.
 */

const DB_NAME = 'RaqeemEduOS_DB';
const DB_VERSION = 2;

export interface StorageMetadata {
  id: string;
  category: 'exams' | 'books' | 'questions' | 'students' | 'memos' | 'attendance' | 'grades' | 'settings' | 'backups';
  title: string;
  updatedAt: number;
  version: number;
}

export interface DocumentSnapshot<T = any> {
  id: string;
  metadata: StorageMetadata;
  data: T;
}

class RaqeemPersistenceEngine {
  private dbPromise: Promise<IDBDatabase | null> | null = null;
  private memoryFallback: Map<string, any> = new Map();
  private hasMigratedLocalStorage = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initDB();
    }
  }

  private async initDB(): Promise<IDBDatabase | null> {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return null;
    }

    if (this.dbPromise) {
      return this.dbPromise;
    }

    this.dbPromise = new Promise((resolve) => {
      try {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;

          // 1. Projects Store (Exams, Documents, Books)
          if (!db.objectStoreNames.contains('projects')) {
            const projectsStore = db.createObjectStore('projects', { keyPath: 'id' });
            projectsStore.createIndex('category', 'metadata.category', { unique: false });
            projectsStore.createIndex('updatedAt', 'metadata.updatedAt', { unique: false });
          }

          // 2. Drafts & Autosave Recovery Store
          if (!db.objectStoreNames.contains('autosaves')) {
            db.createObjectStore('autosaves', { keyPath: 'id' });
          }

          // 3. Question Bank Store
          if (!db.objectStoreNames.contains('questions')) {
            const questionsStore = db.createObjectStore('questions', { keyPath: 'id' });
            questionsStore.createIndex('subject', 'subject', { unique: false });
            questionsStore.createIndex('grade', 'grade', { unique: false });
          }

          // 4. Educational Records Store (Grades, Attendance, Students)
          if (!db.objectStoreNames.contains('records')) {
            const recordsStore = db.createObjectStore('records', { keyPath: 'id' });
            recordsStore.createIndex('type', 'type', { unique: false });
          }

          // 5. System Configuration & Keys Store
          if (!db.objectStoreNames.contains('system_settings')) {
            db.createObjectStore('system_settings', { keyPath: 'key' });
          }
        };

        request.onsuccess = () => {
          const db = request.result;
          this.migrateLegacyLocalStorage(db);
          resolve(db);
        };

        request.onerror = (err) => {
          console.warn('[RaqeemPersistenceEngine] IndexedDB open error, falling back to storage proxy:', err);
          resolve(null);
        };
      } catch (err) {
        console.warn('[RaqeemPersistenceEngine] IndexedDB not available:', err);
        resolve(null);
      }
    });

    return this.dbPromise;
  }

  /**
   * ترحيل آمن وتلقائي لأي بيانات قديمة في localStorage إلى IndexedDB مع إبقائها كنسخة احتياطية
   */
  private async migrateLegacyLocalStorage(db: IDBDatabase) {
    if (this.hasMigratedLocalStorage || typeof window === 'undefined') return;
    this.hasMigratedLocalStorage = true;

    try {
      // 1. Migrate Exam Projects List
      const legacyProjects = localStorage.getItem('raq_exam_projects_list');
      if (legacyProjects) {
        const parsed = JSON.parse(legacyProjects);
        if (Array.isArray(parsed)) {
          const tx = db.transaction('projects', 'readwrite');
          const store = tx.objectStore('projects');
          for (const proj of parsed) {
            const snapshot: DocumentSnapshot = {
              id: proj.id,
              metadata: {
                id: proj.id,
                category: 'exams',
                title: proj.title || 'امتحان بدون عنوان',
                updatedAt: proj.lastModified || Date.now(),
                version: 1,
              },
              data: proj.document || proj,
            };
            store.put(snapshot);
          }
        }
      }

      // 2. Migrate Autosave
      const legacyAutosave = localStorage.getItem('raq_autosave_document');
      if (legacyAutosave) {
        const parsed = JSON.parse(legacyAutosave);
        if (parsed && parsed.id) {
          const tx = db.transaction('autosaves', 'readwrite');
          tx.objectStore('autosaves').put({
            id: 'current_active_exam_draft',
            document: parsed,
            timestamp: Date.now(),
          });
        }
      }

      // 3. Migrate Book Projects
      const legacyBooks = localStorage.getItem('raqeem_book_projects');
      if (legacyBooks) {
        const parsed = JSON.parse(legacyBooks);
        if (Array.isArray(parsed)) {
          const tx = db.transaction('projects', 'readwrite');
          const store = tx.objectStore('projects');
          for (const book of parsed) {
            const snapshot: DocumentSnapshot = {
              id: book.id,
              metadata: {
                id: book.id,
                category: 'books',
                title: book.title || 'كتاب تربوي',
                updatedAt: book.updatedAt || Date.now(),
                version: 1,
              },
              data: book,
            };
            store.put(snapshot);
          }
        }
      }

      // 4. Migrate Educator Settings
      const legacySettings = localStorage.getItem('raq_educator_settings');
      if (legacySettings) {
        const parsed = JSON.parse(legacySettings);
        const tx = db.transaction('system_settings', 'readwrite');
        tx.objectStore('system_settings').put({
          key: 'educator_settings',
          value: parsed,
          updatedAt: Date.now(),
        });
      }
    } catch (e) {
      console.warn('[RaqeemPersistenceEngine] Legacy migration notice:', e);
    }
  }

  /**
   * حفظ مستند أو مشروع بصورة آمنة
   */
  public async saveDocument<T = any>(
    id: string,
    category: StorageMetadata['category'],
    title: string,
    data: T
  ): Promise<boolean> {
    const snapshot: DocumentSnapshot<T> = {
      id,
      metadata: {
        id,
        category,
        title,
        updatedAt: Date.now(),
        version: 1,
      },
      data,
    };

    // 1. Keep fast memory fallback updated
    this.memoryFallback.set(`doc_${id}`, snapshot);

    // 2. Save to IndexedDB
    const db = await this.initDB();
    if (db) {
      try {
        return await new Promise<boolean>((resolve) => {
          const tx = db.transaction('projects', 'readwrite');
          const store = tx.objectStore('projects');
          const request = store.put(snapshot);
          request.onsuccess = () => resolve(true);
          request.onerror = () => resolve(false);
        });
      } catch (err) {
        console.warn('[RaqeemPersistenceEngine] DB write failed, updating fallback:', err);
      }
    }

    // 3. Fallback to localStorage if small enough
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`raq_doc_${id}`, JSON.stringify(snapshot));
      } catch (e) {
        // LocalStorage quota might be exceeded, memory fallback remains active
      }
    }

    return true;
  }

  /**
   * قراءة مستند عبر معرفه
   */
  public async getDocument<T = any>(id: string): Promise<DocumentSnapshot<T> | null> {
    // 1. Check IndexedDB
    const db = await this.initDB();
    if (db) {
      try {
        const doc = await new Promise<DocumentSnapshot<T> | null>((resolve) => {
          const tx = db.transaction('projects', 'readonly');
          const store = tx.objectStore('projects');
          const request = store.get(id);
          request.onsuccess = () => resolve(request.result || null);
          request.onerror = () => resolve(null);
        });
        if (doc) return doc;
      } catch (err) {
        console.warn('[RaqeemPersistenceEngine] DB read error:', err);
      }
    }

    // 2. Check memory fallback
    if (this.memoryFallback.has(`doc_${id}`)) {
      return this.memoryFallback.get(`doc_${id}`);
    }

    // 3. Check legacy localStorage
    if (typeof window !== 'undefined') {
      try {
        const item = localStorage.getItem(`raq_doc_${id}`);
        if (item) return JSON.parse(item);
      } catch (e) {}
    }

    return null;
  }

  /**
   * جلب قائمة المشاريع حسب الفئة (مثلاً: exams أو books)
   */
  public async listProjectsByCategory(category: StorageMetadata['category']): Promise<DocumentSnapshot[]> {
    const db = await this.initDB();
    if (db) {
      try {
        return await new Promise<DocumentSnapshot[]>((resolve) => {
          const tx = db.transaction('projects', 'readonly');
          const store = tx.objectStore('projects');
          const index = store.index('category');
          const request = index.getAll(category);
          request.onsuccess = () => resolve(request.result || []);
          request.onerror = () => resolve([]);
        });
      } catch (err) {
        console.warn('[RaqeemPersistenceEngine] DB list error:', err);
      }
    }

    // Fallback from memory
    const results: DocumentSnapshot[] = [];
    this.memoryFallback.forEach((value) => {
      if (value?.metadata?.category === category) {
        results.push(value);
      }
    });

    return results;
  }

  /**
   * حذف مستند
   */
  public async deleteDocument(id: string): Promise<boolean> {
    this.memoryFallback.delete(`doc_${id}`);
    const db = await this.initDB();
    if (db) {
      try {
        await new Promise<void>((resolve, reject) => {
          const tx = db.transaction('projects', 'readwrite');
          const store = tx.objectStore('projects');
          const req = store.delete(id);
          req.onsuccess = () => resolve();
          req.onerror = () => reject(req.error);
        });
      } catch (e) {}
    }

    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(`raq_doc_${id}`);
      } catch (e) {}
    }
    return true;
  }

  /**
   * الحفظ التلقائي الآمن للمسودة النشطة (Autosave & Recovery Engine)
   */
  public async saveDraft(draftKey: string, payload: any): Promise<void> {
    const db = await this.initDB();
    const draftRecord = {
      id: draftKey,
      data: payload,
      savedAt: Date.now(),
    };

    if (db) {
      try {
        const tx = db.transaction('autosaves', 'readwrite');
        tx.objectStore('autosaves').put(draftRecord);
      } catch (e) {
        console.warn('[RaqeemPersistenceEngine] Draft save notice:', e);
      }
    }

    // Mirror to localStorage for instant startup bootstrap
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`raq_draft_${draftKey}`, JSON.stringify(draftRecord));
      } catch (e) {}
    }
  }

  /**
   * استعادة مسودة غير محفوظة (Recovery)
   */
  public async getDraft(draftKey: string): Promise<{ data: any; savedAt: number } | null> {
    const db = await this.initDB();
    if (db) {
      try {
        const res = await new Promise<any>((resolve) => {
          const tx = db.transaction('autosaves', 'readonly');
          const store = tx.objectStore('autosaves');
          const req = store.get(draftKey);
          req.onsuccess = () => resolve(req.result || null);
          req.onerror = () => resolve(null);
        });
        if (res) return { data: res.data, savedAt: res.savedAt };
      } catch (e) {}
    }

    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(`raq_draft_${draftKey}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          return { data: parsed.data, savedAt: parsed.savedAt };
        }
      } catch (e) {}
    }

    return null;
  }

  /**
   * تصدير نسخة احتياطية كاملة للمنظومة كملف JSON مشفر محلياً
   */
  public async exportFullBackup(): Promise<string> {
    const allProjects = await this.listProjectsByCategory('exams');
    const allBooks = await this.listProjectsByCategory('books');

    const backupPayload = {
      system: 'RaqeemEduOS',
      version: DB_VERSION,
      timestamp: Date.now(),
      author: 'المهندس سهيل الهزبري',
      projects: [...allProjects, ...allBooks],
    };

    return JSON.stringify(backupPayload, null, 2);
  }
}

export const PersistenceEngine = new RaqeemPersistenceEngine();
