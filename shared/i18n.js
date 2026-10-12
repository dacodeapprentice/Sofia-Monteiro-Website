/**
 * Sofia — Unified Internationalization (i18n) Engine
 * Manages language switching between English (en) and European Portuguese (pt-PT).
 * Features:
 * - Persistent choice in localStorage with browser language auto-detection
 * - Safe fallback to English with console warnings if keys are missing
 * - Instant zero-flash rendering
 * - DOM attribute observers and dynamic layout binding
 * - Exposed window.i18n API for script-level message translation
 */

import { translations } from '/shared/translations.js';

const STORAGE_KEY = 'sofia_portfolio_lang';

let currentLang = 'en';

/**
 * Safely retrieve saved language from localStorage, falling back to browser language or 'en'.
 */
export function getSavedLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'pt' || saved === 'en') {
      return saved;
    }
  } catch (err) {
    console.warn('[i18n] Failed to read language from localStorage:', err);
  }

  // First visit detection: check navigator language
  try {
    const browserLang = (navigator.languages && navigator.languages.length ? navigator.languages[0] : (navigator.language || '')).toLowerCase();
    if (browserLang.startsWith('pt')) {
      return 'pt';
    }
  } catch (err) {
    console.warn('[i18n] Failed to check navigator language:', err);
  }

  return 'en';
}

/**
 * Safely persist language to localStorage.
 */
export function saveLanguage(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (err) {
    console.warn('[i18n] Failed to persist language to localStorage:', err);
  }
}

/**
 * Translate a key into the specified (or currently active) language.
 * Falls back to English if the key is missing in Portuguese and logs a console warning.
 */
export function t(key, lang = currentLang) {
  if (!key) return '';

  const activeDict = translations && translations[lang];
  if (activeDict && activeDict[key] !== undefined && activeDict[key] !== '') {
    return activeDict[key];
  }

  // Fallback to English if not in 'en'
  if (lang !== 'en') {
    console.warn(`[i18n] Missing translation for key "${key}" in language "${lang}". Showing English fallback.`);
    if (translations && translations.en && translations.en[key] !== undefined) {
      return translations.en[key];
    }
  }

  console.warn(`[i18n] Missing translation for key "${key}" across all dictionaries.`);
  return '';
}

/**
 * Determine the current page key (home, about, website, ux-ui, social-media, youtube, instagram, contact)
 */
function getCurrentPageKey() {
  const path = window.location.pathname.split('/').pop().toLowerCase();
  if (!path || path === '' || path === 'index.html') return 'home';
  if (path.includes('about')) return 'about';
  if (path.includes('website')) return 'website';
  if (path.includes('ux-ui')) return 'ux_ui';
  if (path.includes('youtube')) return 'youtube';
  if (path.includes('instagram')) return 'instagram';
  if (path.includes('social-media')) return 'social';
  if (path.includes('contact')) return 'contact';
  return 'home';
}

/**
 * Update page title, meta description, and social meta tags
 */
export function updatePageMetadata(lang = currentLang) {
  // 1. Explicit data-i18n on title and meta tags
  const titleEl = document.querySelector('title[data-i18n]');
  if (titleEl) {
    const key = titleEl.getAttribute('data-i18n');
    const val = t(key, lang);
    if (val) document.title = val;
  } else {
    // Automatic fallback based on page key
    const pageKey = getCurrentPageKey();
    const metaTitle = t(`${pageKey}.meta_title`, lang);
    if (metaTitle) {
      document.title = metaTitle;
    }
  }

  // Meta tags with data-i18n-meta
  document.querySelectorAll('meta[data-i18n-meta]').forEach((el) => {
    const key = el.getAttribute('data-i18n-meta');
    const val = t(key, lang);
    if (val) el.setAttribute('content', val);
  });

  // Meta description fallback
  const pageKey = getCurrentPageKey();
  const metaDesc = t(`${pageKey}.meta_desc`, lang);
  if (metaDesc) {
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute('content', metaDesc);
    const ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl) ogDescEl.setAttribute('content', metaDesc);
    const twDescEl = document.querySelector('meta[name="twitter:description"]');
    if (twDescEl) twDescEl.setAttribute('content', metaDesc);
  }

  const ogTitle = t(`${pageKey}.og_title`, lang) || t(`${pageKey}.meta_title`, lang);
  if (ogTitle) {
    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) ogTitleEl.setAttribute('content', ogTitle);
    const twTitleEl = document.querySelector('meta[name="twitter:title"]');
    if (twTitleEl) twTitleEl.setAttribute('content', ogTitle);
  }
}

/**
 * Update visual active state of all EN / PT buttons across the DOM
 */
export function updateToggles(lang = currentLang) {
  const activeClassList = ['bg-teal-500/20', 'text-teal-300', 'border-teal-500/40', 'font-semibold', 'shadow-sm'];
  const inactiveClassList = ['text-slate-400', 'hover:text-white', 'hover:bg-slate-800/40', 'border-transparent'];

  document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
    const btnLang = btn.getAttribute('data-lang-btn');
    const isActive = btnLang === lang;

    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');

    if (isActive) {
      activeClassList.forEach((cls) => btn.classList.add(cls));
      inactiveClassList.forEach((cls) => btn.classList.remove(cls));
    } else {
      activeClassList.forEach((cls) => btn.classList.remove(cls));
      inactiveClassList.forEach((cls) => btn.classList.add(cls));
    }
  });
}

/**
 * Bind click and keyboard events to language toggle buttons
 */
export function bindToggleEvents() {
  document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
    if (btn._hasLangListener) return;
    btn._hasLangListener = true;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLang = btn.getAttribute('data-lang-btn');
      if (targetLang && targetLang !== currentLang) {
        setLanguage(targetLang);
      }
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const targetLang = btn.getAttribute('data-lang-btn');
        if (targetLang && targetLang !== currentLang) {
          setLanguage(targetLang);
        }
      }
    });
  });
}

/**
 * Apply all translations to the DOM
 */
export function applyTranslations(lang = currentLang) {
  currentLang = lang;
  document.documentElement.lang = lang === 'pt' ? 'pt-PT' : 'en';
  document.documentElement.setAttribute('data-lang', lang);

  // 1. Text elements: data-i18n
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    const text = t(key, lang);
    if (text) {
      el.textContent = text;
    }
  });

  // 2. HTML elements: data-i18n-html (elements with inner formatting like italic or gradients)
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (!key) return;
    const html = t(key, lang);
    if (html) {
      el.innerHTML = html;
    }
  });

  // 3. Form placeholders: data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (!key) return;
    const placeholder = t(key, lang);
    if (placeholder) {
      el.setAttribute('placeholder', placeholder);
    }
  });

  // 4. Accessibility aria-labels: data-i18n-aria
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria');
    if (!key) return;
    const aria = t(key, lang);
    if (aria) {
      el.setAttribute('aria-label', aria);
    }
  });

  // 5. Image alt text: data-i18n-alt
  document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    const key = el.getAttribute('data-i18n-alt');
    if (!key) return;
    const alt = t(key, lang);
    if (alt) {
      el.setAttribute('alt', alt);
    }
  });

  // 6. Metadata update (<title>, <meta description>, og:*)
  updatePageMetadata(lang);

  // 7. Update language switcher button states & bind events
  updateToggles(lang);
  bindToggleEvents();

  // 8. Dispatch custom event for page scripts (contact form, search filters)
  window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
}

/**
 * Switch language, persist choice, and re-render
 */
export function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'pt') return;
  currentLang = lang;
  saveLanguage(lang);
  applyTranslations(lang);
}

/**
 * Get the currently active language code ('en' or 'pt')
 */
export function getCurrentLanguage() {
  return currentLang;
}

// Expose on window for accessibility by page-specific scripts
if (typeof window !== 'undefined') {
  window.i18n = {
    t,
    getLanguage: getCurrentLanguage,
    setLanguage,
    applyTranslations,
    updateToggles,
    bindToggleEvents
  };
}

// Initialize immediately
currentLang = getSavedLanguage();
document.documentElement.lang = currentLang === 'pt' ? 'pt-PT' : 'en';
document.documentElement.setAttribute('data-lang', currentLang);

// Run translation pass as early as possible and upon DOM readiness
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    applyTranslations(currentLang);
  });
} else {
  applyTranslations(currentLang);
}

// Re-apply if layout.js mounts header, drawer, or footer
window.addEventListener('layout:mounted', () => {
  applyTranslations(currentLang);
});
