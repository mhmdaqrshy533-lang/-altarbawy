/**
 * Yemeni Republican Logo Caching Utility
 * Downloads the logo image once online, stores as base64 in localStorage,
 * and provides it synchronously for offline use across all templates and editors.
 */

export const YEMENI_LOGO_URL = 'https://www.image2url.com/r2/default/images/1784584401520-1a8e3455-344d-4733-b325-75de27e936b0.png';
const STORAGE_KEY = 'raq_yemeni_republican_logo_dataurl';

/**
 * Get cached logo data URL from localStorage if available
 */
export function getCachedYemeniLogo(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to read cached Yemeni logo:', e);
    return null;
  }
}

/**
 * Fetches the Yemeni logo from network if online and not already cached in base64,
 * converts to data URL, and saves to localStorage.
 */
export async function initializeYemeniLogoCache(): Promise<string | null> {
  if (typeof window === 'undefined') return null;

  const existing = getCachedYemeniLogo();
  if (existing) {
    return existing;
  }

  if (!navigator.onLine) {
    return null;
  }

  try {
    const response = await fetch(YEMENI_LOGO_URL, { mode: 'cors' });
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const blob = await response.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        if (dataUrl) {
          try {
            localStorage.setItem(STORAGE_KEY, dataUrl);
          } catch (e) {
            console.warn('LocalStorage quota exceeded storing logo', e);
          }
        }
        resolve(dataUrl);
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.warn('Failed to fetch and cache Yemeni logo online:', e);
    return null;
  }
}

// Auto run on module load if in browser
if (typeof window !== 'undefined') {
  initializeYemeniLogoCache().catch(() => {});
  window.addEventListener('online', () => {
    initializeYemeniLogoCache().catch(() => {});
  });
}
