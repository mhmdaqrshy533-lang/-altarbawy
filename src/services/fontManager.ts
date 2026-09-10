import { ALL_FONTS, FontItem, DOCUMENT_DEFAULT_FONTS } from '../data/fontsData';

const CACHE_NAME = 'alraqeem-fonts-cache-v1';

class FontManagerService {
  private loadedFonts = new Set<string>();
  private loadingPromises = new Map<string, Promise<boolean>>();

  constructor() {
    // Automatically load default core fonts on instantiation
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        this.preloadEssentialFonts();
      }, 500);
    }
  }

  /**
   * Loads a specific font dynamically by ID or fontFamily name
   */
  async loadFont(fontIdOrFamily: string): Promise<boolean> {
    if (typeof window === 'undefined') return false;

    const font = ALL_FONTS.find(
      f => f.id === fontIdOrFamily || f.fontFamily.toLowerCase().includes(fontIdOrFamily.toLowerCase()) || f.name.toLowerCase() === fontIdOrFamily.toLowerCase()
    );

    if (!font) {
      // Fallback if not directly found in catalog
      return false;
    }

    if (this.loadedFonts.has(font.id)) {
      return true;
    }

    if (this.loadingPromises.has(font.id)) {
      return this.loadingPromises.get(font.id)!;
    }

    const loadPromise = this.fetchAndInjectFont(font);
    this.loadingPromises.set(font.id, loadPromise);

    const success = await loadPromise;
    this.loadingPromises.delete(font.id);
    if (success) {
      this.loadedFonts.add(font.id);
    }
    return success;
  }

  /**
   * Internal worker: Fetches CSS via Cache Storage or Google Fonts & injects <style> tag
   */
  private async fetchAndInjectFont(font: FontItem): Promise<boolean> {
    const fontUrl = `https://fonts.googleapis.com/css2?${font.googleFontQuery}&display=swap`;
    const styleId = `font-style-${font.id}`;

    // Check if style tag already exists in DOM
    if (document.getElementById(styleId)) {
      this.loadedFonts.add(font.id);
      return true;
    }

    try {
      let cssText = '';

      // Try Cache API first for instant offline rendering
      if ('caches' in window) {
        try {
          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(fontUrl);
          
          if (cachedResponse) {
            cssText = await cachedResponse.text();
          } else if (navigator.onLine) {
            const networkResponse = await fetch(fontUrl);
            if (networkResponse.ok) {
              cssText = await networkResponse.text();
              cache.put(fontUrl, new Response(cssText, { headers: { 'Content-Type': 'text/css' } }));
            }
          }
        } catch {
          // Fallback if Cache API fails
        }
      }

      // If CSS text was fetched (online or cache), inject as <style>
      if (cssText) {
        const styleEl = document.createElement('style');
        styleEl.id = styleId;
        styleEl.textContent = cssText;
        document.head.appendChild(styleEl);
      } else {
        // Direct <link> tag injection as fallback
        const linkEl = document.createElement('link');
        linkEl.id = styleId;
        linkEl.rel = 'stylesheet';
        linkEl.href = fontUrl;
        document.head.appendChild(linkEl);
      }

      // Trigger browser FontFace loading
      if (document.fonts) {
        try {
          await document.fonts.load(`16px ${font.fontFamily.split(',')[0]}`);
        } catch {
          // Ignore font load wait errors
        }
      }

      return true;
    } catch (err) {
      console.warn(`Font loading warning for ${font.name}:`, err);
      return false;
    }
  }

  /**
   * Preloads default essential fonts for instant application boot
   */
  async preloadEssentialFonts(): Promise<void> {
    const essentialIds = [
      'cairo', 'amiri', 'noto_naskh_arabic', 'tajawal', 
      'noto_kufi_arabic', 'reem_kufi', 'inter', 'roboto', 'playfair_display'
    ];

    await Promise.allSettled(essentialIds.map(id => this.loadFont(id)));
  }

  /**
   * Preloads ALL 60 fonts into local Cache API for full offline operation
   */
  async preloadAllFonts(onProgress?: (loaded: number, total: number) => void): Promise<void> {
    let count = 0;
    const total = ALL_FONTS.length;

    for (const font of ALL_FONTS) {
      await this.loadFont(font.id);
      count++;
      if (onProgress) {
        onProgress(count, total);
      }
    }
  }

  /**
   * Check if a font is already loaded
   */
  isFontLoaded(fontId: string): boolean {
    return this.loadedFonts.has(fontId);
  }

  /**
   * Get font item by ID
   */
  getFontById(id: string): FontItem | undefined {
    return ALL_FONTS.find(f => f.id === id);
  }

  /**
   * Get default font pairing by document type
   */
  getDefaultFontForDocument(docType: keyof typeof DOCUMENT_DEFAULT_FONTS): { arabic: FontItem; english: FontItem } {
    const defaults = DOCUMENT_DEFAULT_FONTS[docType] || DOCUMENT_DEFAULT_FONTS.exam;
    return {
      arabic: this.getFontById(defaults.arabic) || ALL_FONTS[0],
      english: this.getFontById(defaults.english) || ALL_FONTS[30]
    };
  }
}

export const fontManager = new FontManagerService();
