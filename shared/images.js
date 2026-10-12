/**
 * ==============================================================================
 * SOFIA PORTFOLIO — CENTRAL IMAGE MANAGER (images.js)
 * ==============================================================================
 *
 * HOW TO CHANGE OR ADD AN IMAGE (FOR NON-CODERS):
 * 1. Open the file: "public/images.json" (or "images.json" in root).
 * 2. Find the page or section name (e.g., "home", "about", "drawer", "websites", "youtube", "instagram").
 * 3. Find the image name you want to update (e.g., "avatar", "portrait", "hero", "card-1").
 * 4. Replace the "url" with your new image link (e.g., "https://iili.io/your-new-image.jpg").
 * 5. Update the "alt" descriptions in English ("en") and Portuguese ("pt") so visitors
 *    and screen readers understand what the picture shows.
 * 6. Save the file. That's it! You never need to touch any HTML page.
 *
 * FEATURES OF THIS SCRIPT:
 * - Loads images.json once and distributes pictures to every <img> with data-image="...".
 * - Automatically updates the "alt" text when the user switches between EN and PT.
 * - Sets loading="lazy" on all secondary images for high performance, keeping the first
 *   image eager for fast visual delivery.
 * - If an image link is broken or missing, it shows a smooth neutral placeholder tile
 *   and logs a warning in the browser console. No ugly broken-image icons appear.
 * ==============================================================================
 */

// Smooth neutral dark SVG placeholder matching the site aesthetic (#0b141e)
const NEUTRAL_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 10' width='16' height='10'%3E%3Crect width='16' height='10' fill='%230b141e'/%3E%3C/svg%3E";

let cachedImages = null;
let loadPromise = null;

/**
 * Safely detect current active language ('en' or 'pt')
 */
function getCurrentLang() {
  if (typeof window !== 'undefined' && window.i18n && typeof window.i18n.getLanguage === 'function') {
    return window.i18n.getLanguage();
  }
  try {
    const saved = localStorage.getItem('sofia_portfolio_lang');
    if (saved === 'pt' || saved === 'en') return saved;
  } catch (_) {}

  const htmlLang = (document.documentElement.lang || '').toLowerCase();
  if (htmlLang.startsWith('pt')) return 'pt';

  return 'en';
}

/**
 * Fetch and cache images.json once
 */
export async function loadImagesData() {
  if (cachedImages) return cachedImages;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    try {
      // Use cache: 'no-cache' and timestamp query param so image updates are reflected immediately
      const response = await fetch('/images.json?t=' + Date.now(), { cache: 'no-cache' });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }
      cachedImages = await response.json();
      return cachedImages;
    } catch (err) {
      console.warn('[images.js] Could not load /images.json:', err);
      cachedImages = {};
      return cachedImages;
    } finally {
      loadPromise = null;
    }
  })();

  return loadPromise;
}

/**
 * Populate all <img> elements containing data-image="page.name"
 */
export async function applyImages(targetLang) {
  const imagesData = await loadImagesData();
  const lang = targetLang || getCurrentLang();
  const imageElements = document.querySelectorAll('img[data-image]');

  imageElements.forEach((img, index) => {
    // 1. Performance: First image on screen gets eager loading; all others get lazy
    if (index === 0) {
      img.setAttribute('loading', 'eager');
    } else {
      img.setAttribute('loading', 'lazy');
    }

    const dataKey = img.getAttribute('data-image');
    if (!dataKey) return;

    const parts = dataKey.split('.');
    const pageKey = parts[0];
    const imageKey = parts.slice(1).join('.');

    const pageImages = imagesData && imagesData[pageKey];
    let item = pageImages && pageImages[imageKey];

    // Smart fallback for navigation drawer avatar
    if (!item && (dataKey === 'drawer.avatar' || dataKey === 'menu.avatar' || dataKey === 'nav.avatar')) {
      item = (imagesData && imagesData.drawer && imagesData.drawer.avatar) ||
             (imagesData && imagesData.menu && imagesData.menu.avatar) ||
             (imagesData && imagesData.nav && imagesData.nav.avatar) ||
             (imagesData && imagesData.home && imagesData.home.portrait);
    }

    // 2. Handle missing image key in images.json
    if (!item || !item.url) {
      console.warn(`[images.js] Missing image definition for "${dataKey}". Showing neutral placeholder.`);
      if (!img.src || img.src === window.location.href) {
        img.src = NEUTRAL_PLACEHOLDER;
      }
      return;
    }

    // 3. Set optional width & height attributes if provided in JSON to prevent layout shifts
    if (item.width && !img.hasAttribute('width')) {
      img.setAttribute('width', String(item.width));
    }
    if (item.height && !img.hasAttribute('height')) {
      img.setAttribute('height', String(item.height));
    }

    // 4. Set bilingual alt text based on current language
    if (item.alt) {
      const altText = (typeof item.alt === 'object')
        ? (item.alt[lang] || item.alt.en || '')
        : String(item.alt);
      if (altText) {
        img.setAttribute('alt', altText);
      }
    }

    // 5. Robust error handler for broken URLs or network failures
    img.onerror = function() {
      this.onerror = null; // Prevent infinite loop if placeholder fails
      this.src = NEUTRAL_PLACEHOLDER;
      console.warn(`[images.js] Failed to load image for "${dataKey}" from URL: ${item.url}. Showing neutral placeholder.`);
    };

    // 6. Set active image source
    if (item.url && img.src !== item.url) {
      img.src = item.url;
    }
  });
}

// Global exposure for debugging or manual reloads
if (typeof window !== 'undefined') {
  window.siteImages = {
    apply: applyImages,
    load: loadImagesData,
    getData: () => cachedImages,
    placeholder: NEUTRAL_PLACEHOLDER
  };

  // Re-apply whenever language switches (e.g. from EN to PT)
  window.addEventListener('languagechange', (event) => {
    applyImages(event.detail?.lang);
  });

  // Re-apply if layout or components dynamically mount
  window.addEventListener('layout:mounted', () => {
    applyImages();
  });

  // Initialize as soon as DOM is interactive
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      applyImages();
    });
  } else {
    applyImages();
  }
}
