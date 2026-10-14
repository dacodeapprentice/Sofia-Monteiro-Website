/**
 * ==============================================================================
 * SOFIA PORTFOLIO — SHARED IMAGE VIEWER / LIGHTBOX (lightbox.js)
 * ==============================================================================
 * Reusable, accessible, standalone lightbox with pan/zoom, responsive touch/mouse
 * dragging, preloading, focus trap, and bilingual EN/PT support.
 * Plain vanilla JS & CSS only — zero external libraries.
 * ==============================================================================
 */

class LightboxViewer {
  constructor() {
    this.items = [];
    this.currentIndex = 0;
    this.isOpen = false;
    this.zoom = 1;
    this.minZoom = 1;
    this.maxZoom = 3.5;
    this.zoomStep = 0.35;
    this.panX = 0;
    this.panY = 0;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.initialPanX = 0;
    this.initialPanY = 0;
    this.lastTriggerElement = null;

    this.dom = null;
    this.initDOM();
    this.bindGlobalEvents();
  }

  getCurrentLang() {
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

  t(key, fallback = '') {
    if (typeof window !== 'undefined' && window.i18n && typeof window.i18n.t === 'function') {
      const val = window.i18n.t(key);
      if (val && val !== key) return val;
    }
    const lang = this.getCurrentLang();
    const defaults = {
      en: {
        'lightbox.close': 'Close viewer (Esc)',
        'lightbox.prev': 'Previous photo (Left arrow)',
        'lightbox.next': 'Next photo (Right arrow)',
        'lightbox.zoom_in': 'Zoom in (+)',
        'lightbox.zoom_out': 'Zoom out (-)',
        'lightbox.reset_zoom': 'Reset to fit (1:1)',
        'lightbox.counter_of': 'of'
      },
      pt: {
        'lightbox.close': 'Fechar visualizador (Esc)',
        'lightbox.prev': 'Foto anterior (Seta esquerda)',
        'lightbox.next': 'Foto seguinte (Seta direita)',
        'lightbox.zoom_in': 'Aumentar zoom (+)',
        'lightbox.zoom_out': 'Diminuir zoom (-)',
        'lightbox.reset_zoom': 'Repor tamanho original (1:1)',
        'lightbox.counter_of': 'de'
      }
    };
    return (defaults[lang] && defaults[lang][key]) || (defaults.en && defaults.en[key]) || fallback;
  }

  initDOM() {
    if (document.getElementById('sofia-lightbox-overlay')) {
      this.dom = {
        overlay: document.getElementById('sofia-lightbox-overlay'),
        stage: document.getElementById('lightbox-stage'),
        image: document.getElementById('lightbox-image'),
        counter: document.getElementById('lightbox-counter'),
        caption: document.getElementById('lightbox-caption'),
        prevBtn: document.getElementById('lightbox-prev-btn'),
        nextBtn: document.getElementById('lightbox-next-btn'),
        zoomInBtn: document.getElementById('lightbox-zoom-in-btn'),
        zoomOutBtn: document.getElementById('lightbox-zoom-out-btn'),
        resetZoomBtn: document.getElementById('lightbox-reset-btn'),
        closeBtn: document.getElementById('lightbox-close-btn')
      };
      return;
    }

    const overlay = document.createElement('div');
    overlay.id = 'sofia-lightbox-overlay';
    overlay.className = 'fixed inset-0 z-50 bg-[#04070a]/95 backdrop-blur-md flex flex-col justify-between hidden opacity-0 transition-opacity duration-200 select-none';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image viewer');
    overlay.tabIndex = -1;

    overlay.innerHTML = `
      <!-- Lightbox Header Controls -->
      <div id="lightbox-header" class="relative z-20 flex items-center justify-between px-4 sm:px-6 py-4 bg-gradient-to-b from-[#060b11]/90 to-transparent">
        <div class="flex items-center gap-3">
          <span id="lightbox-counter" class="font-mono text-xs font-semibold text-teal-300 bg-teal-950/70 border border-teal-800/50 px-2.5 py-1 rounded-md shadow-sm">
            1 / 1
          </span>
          <span id="lightbox-caption" class="text-xs sm:text-sm text-slate-300 font-sans max-w-xs sm:max-w-md md:max-w-xl truncate" title=""></span>
        </div>

        <div class="flex items-center gap-1.5 sm:gap-2">
          <!-- Zoom In Button -->
          <button
            type="button"
            id="lightbox-zoom-in-btn"
            class="p-2 sm:p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer"
            aria-label="Zoom in (+)"
            data-i18n-aria="lightbox.zoom_in"
            title="Zoom in (+)"
          >
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
            </svg>
          </button>

          <!-- Zoom Out Button -->
          <button
            type="button"
            id="lightbox-zoom-out-btn"
            class="p-2 sm:p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer"
            aria-label="Zoom out (-)"
            data-i18n-aria="lightbox.zoom_out"
            title="Zoom out (-)"
          >
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
            </svg>
          </button>

          <!-- Reset Zoom to Fit Button -->
          <button
            type="button"
            id="lightbox-reset-btn"
            class="p-2 sm:p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer"
            aria-label="Reset zoom to fit"
            data-i18n-aria="lightbox.reset_zoom"
            title="Reset to fit"
          >
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>

          <!-- Close (X) Button -->
          <button
            type="button"
            id="lightbox-close-btn"
            class="p-2 sm:p-2.5 rounded-lg text-slate-300 hover:text-red-400 hover:bg-slate-800/70 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer ml-1 sm:ml-2"
            aria-label="Close viewer (Esc)"
            data-i18n-aria="lightbox.close"
            title="Close (Esc)"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Main Stage / Canvas Area -->
      <div id="lightbox-stage" class="relative flex-1 w-full flex items-center justify-center overflow-hidden cursor-zoom-out p-4 sm:p-8 touch-none">
        <!-- Previous Arrow Button -->
        <button
          type="button"
          id="lightbox-prev-btn"
          class="absolute left-2 sm:left-6 z-30 p-3 sm:p-3.5 rounded-full bg-[#080d12]/80 hover:bg-[#121e2a] text-teal-300 hover:text-white border border-teal-900/60 shadow-xl active:scale-90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer"
          aria-label="Previous photo (Left arrow)"
          data-i18n-aria="lightbox.prev"
          title="Previous (Left arrow)"
        >
          <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Current Active Image Container -->
        <div id="lightbox-img-wrapper" class="relative max-w-full max-h-full flex items-center justify-center cursor-default">
          <img
            id="lightbox-image"
            src=""
            alt=""
            referrerpolicy="no-referrer"
            class="max-w-[88vw] max-h-[76vh] object-contain rounded-xl shadow-2xl transition-transform duration-150 ease-out will-change-transform"
            draggable="false"
          />
        </div>

        <!-- Next Arrow Button -->
        <button
          type="button"
          id="lightbox-next-btn"
          class="absolute right-2 sm:right-6 z-30 p-3 sm:p-3.5 rounded-full bg-[#080d12]/80 hover:bg-[#121e2a] text-teal-300 hover:text-white border border-teal-900/60 shadow-xl active:scale-90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer"
          aria-label="Next photo (Right arrow)"
          data-i18n-aria="lightbox.next"
          title="Next (Right arrow)"
        >
          <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Bottom Hint Bar -->
      <div id="lightbox-footer" class="relative z-20 px-4 py-3 bg-gradient-to-t from-[#060b11]/90 to-transparent text-center text-[11px] sm:text-xs font-mono text-slate-400">
        <span class="hidden sm:inline">Use Arrow keys &larr; &rarr; to navigate · Esc to close · Drag to pan when zoomed</span>
        <span class="sm:hidden">Swipe or tap arrows to navigate · Tap outside to close</span>
      </div>
    `;

    document.body.appendChild(overlay);

    this.dom = {
      overlay,
      stage: overlay.querySelector('#lightbox-stage'),
      imgWrapper: overlay.querySelector('#lightbox-img-wrapper'),
      image: overlay.querySelector('#lightbox-image'),
      counter: overlay.querySelector('#lightbox-counter'),
      caption: overlay.querySelector('#lightbox-caption'),
      prevBtn: overlay.querySelector('#lightbox-prev-btn'),
      nextBtn: overlay.querySelector('#lightbox-next-btn'),
      zoomInBtn: overlay.querySelector('#lightbox-zoom-in-btn'),
      zoomOutBtn: overlay.querySelector('#lightbox-zoom-out-btn'),
      resetZoomBtn: overlay.querySelector('#lightbox-reset-btn'),
      closeBtn: overlay.querySelector('#lightbox-close-btn')
    };

    this.bindDOMEvents();
  }

  bindDOMEvents() {
    const { overlay, stage, image, prevBtn, nextBtn, zoomInBtn, zoomOutBtn, resetZoomBtn, closeBtn } = this.dom;

    // Navigation buttons
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.prev();
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.next();
    });

    // Zoom buttons
    zoomInBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.zoomIn();
    });

    zoomOutBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.zoomOut();
    });

    resetZoomBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.resetZoom();
    });

    // Close button
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.close();
    });

    // Backdrop click outside photo closes viewer
    stage.addEventListener('click', (e) => {
      if (e.target === stage || e.target.id === 'lightbox-img-wrapper') {
        this.close();
      }
    });

    // Double-click on photo toggles zoom
    image.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      if (this.zoom > 1) {
        this.resetZoom();
      } else {
        this.zoomTo(2);
      }
    });

    // Drag to pan when zoomed
    const onPointerDown = (e) => {
      if (this.zoom <= 1) return;
      e.preventDefault();
      this.isDragging = true;
      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;
      this.initialPanX = this.panX;
      this.initialPanY = this.panY;
      image.classList.remove('transition-transform', 'duration-150');
      image.style.cursor = 'grabbing';
      stage.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!this.isDragging || this.zoom <= 1) return;
      e.preventDefault();
      const dx = e.clientX - this.dragStartX;
      const dy = e.clientY - this.dragStartY;
      this.panX = this.initialPanX + dx;
      this.panY = this.initialPanY + dy;
      this.applyTransform();
    };

    const onPointerUp = (e) => {
      if (!this.isDragging) return;
      this.isDragging = false;
      image.classList.add('transition-transform', 'duration-150');
      image.style.cursor = this.zoom > 1 ? 'grab' : 'default';
      stage.releasePointerCapture?.(e.pointerId);
    };

    stage.addEventListener('pointerdown', onPointerDown);
    stage.addEventListener('pointermove', onPointerMove);
    stage.addEventListener('pointerup', onPointerUp);
    stage.addEventListener('pointercancel', onPointerUp);
  }

  bindGlobalEvents() {
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          this.close();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this.prev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.next();
          break;
        case '+':
        case '=':
          e.preventDefault();
          this.zoomIn();
          break;
        case '-':
        case '_':
          e.preventDefault();
          this.zoomOut();
          break;
        case '0':
          e.preventDefault();
          this.resetZoom();
          break;
        case 'Tab':
          this.handleFocusTrap(e);
          break;
      }
    });

    // Language change updates
    window.addEventListener('languagechange', () => {
      this.updateLabels();
      this.updateCaption();
    });
  }

  handleFocusTrap(e) {
    if (!this.dom || !this.dom.overlay) return;
    const focusables = Array.from(
      this.dom.overlay.querySelectorAll('button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    );
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  updateLabels() {
    if (!this.dom) return;
    const { closeBtn, prevBtn, nextBtn, zoomInBtn, zoomOutBtn, resetZoomBtn } = this.dom;

    closeBtn.setAttribute('aria-label', this.t('lightbox.close'));
    closeBtn.setAttribute('title', this.t('lightbox.close'));

    prevBtn.setAttribute('aria-label', this.t('lightbox.prev'));
    prevBtn.setAttribute('title', this.t('lightbox.prev'));

    nextBtn.setAttribute('aria-label', this.t('lightbox.next'));
    nextBtn.setAttribute('title', this.t('lightbox.next'));

    zoomInBtn.setAttribute('aria-label', this.t('lightbox.zoom_in'));
    zoomInBtn.setAttribute('title', this.t('lightbox.zoom_in'));

    zoomOutBtn.setAttribute('aria-label', this.t('lightbox.zoom_out'));
    zoomOutBtn.setAttribute('title', this.t('lightbox.zoom_out'));

    resetZoomBtn.setAttribute('aria-label', this.t('lightbox.reset_zoom'));
    resetZoomBtn.setAttribute('title', this.t('lightbox.reset_zoom'));

    this.updateCounter();
  }

  getAltText(item) {
    if (!item) return '';
    const lang = this.getCurrentLang();
    if (typeof item.alt === 'object' && item.alt !== null) {
      return item.alt[lang] || item.alt.en || '';
    }
    return String(item.alt || '');
  }

  updateCounter() {
    if (!this.dom || !this.dom.counter) return;
    const total = this.items.length;
    const cur = total > 0 ? this.currentIndex + 1 : 0;
    const ofWord = this.t('lightbox.counter_of', '/');
    this.dom.counter.textContent = `${cur} ${ofWord === '/' ? '/' : ofWord} ${total}`;
  }

  updateCaption() {
    if (!this.dom || !this.dom.caption) return;
    const item = this.items[this.currentIndex];
    const altText = this.getAltText(item);
    this.dom.caption.textContent = altText;
    this.dom.caption.setAttribute('title', altText);
    if (this.dom.image) {
      this.dom.image.setAttribute('alt', altText);
    }
  }

  applyTransform() {
    if (!this.dom || !this.dom.image) return;
    this.dom.image.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.zoom})`;
    this.dom.image.style.cursor = this.zoom > 1 ? (this.isDragging ? 'grabbing' : 'grab') : 'default';
  }

  resetZoom() {
    this.zoom = 1;
    this.panX = 0;
    this.panY = 0;
    if (this.dom && this.dom.image) {
      this.dom.image.classList.add('transition-transform', 'duration-150');
      this.applyTransform();
    }
  }

  zoomIn() {
    this.zoomTo(Math.min(this.maxZoom, Number((this.zoom + this.zoomStep).toFixed(2))));
  }

  zoomOut() {
    this.zoomTo(Math.max(this.minZoom, Number((this.zoom - this.zoomStep).toFixed(2))));
  }

  zoomTo(newZoom) {
    this.zoom = newZoom;
    if (this.zoom <= 1) {
      this.panX = 0;
      this.panY = 0;
    }
    this.applyTransform();
  }

  preloadNeighbours() {
    if (this.items.length <= 1) return;
    const prevIdx = (this.currentIndex - 1 + this.items.length) % this.items.length;
    const nextIdx = (this.currentIndex + 1) % this.items.length;

    [prevIdx, nextIdx].forEach((idx) => {
      const item = this.items[idx];
      if (item && item.url) {
        const img = new Image();
        img.referrerPolicy = 'no-referrer';
        img.src = item.url;
      }
    });
  }

  displayImage() {
    const item = this.items[this.currentIndex];
    if (!item) return;

    this.resetZoom();
    this.updateCounter();
    this.updateCaption();

    const { image } = this.dom;
    image.referrerPolicy = 'no-referrer';
    image.src = item.url;
    image.alt = this.getAltText(item);

    // Gracefully handle broken image URLs
    image.onerror = () => {
      image.onerror = null;
      console.warn(`[lightbox.js] Image failed to load: ${item.url}`);
      // Show fallback neutral dark placeholder
      image.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 10' width='16' height='10'%3E%3Crect width='16' height='10' fill='%230b141e'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-size='1' font-family='sans-serif'%3EUnavailable%3C/text%3E%3C/svg%3E";
    };

    this.preloadNeighbours();
  }

  open(items, startIndex = 0, triggerElement = null) {
    if (!items || items.length === 0) return;

    this.items = items;
    this.currentIndex = Math.max(0, Math.min(startIndex, items.length - 1));
    this.lastTriggerElement = triggerElement || document.activeElement;
    this.isOpen = true;

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';

    this.dom.overlay.classList.remove('hidden');
    requestAnimationFrame(() => {
      this.dom.overlay.classList.remove('opacity-0');
      this.dom.overlay.classList.add('opacity-100');
    });

    this.updateLabels();
    this.displayImage();

    // Move focus inside lightbox (Close button first)
    setTimeout(() => {
      if (this.dom.closeBtn) this.dom.closeBtn.focus();
    }, 50);
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;

    this.dom.overlay.classList.remove('opacity-100');
    this.dom.overlay.classList.add('opacity-0');

    setTimeout(() => {
      this.dom.overlay.classList.add('hidden');
      document.body.style.overflow = '';
      this.resetZoom();

      // Return focus to trigger photo
      if (this.lastTriggerElement && typeof this.lastTriggerElement.focus === 'function') {
        this.lastTriggerElement.focus();
      }
    }, 200);
  }

  prev() {
    if (this.items.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.displayImage();
  }

  next() {
    if (this.items.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.displayImage();
  }
}

// Global Singleton for the site
let lightboxInstance = null;

export function getLightbox() {
  if (!lightboxInstance) {
    lightboxInstance = new LightboxViewer();
  }
  return lightboxInstance;
}

export function openLightbox(items, startIndex = 0, triggerElement = null) {
  const viewer = getLightbox();
  viewer.open(items, startIndex, triggerElement);
}

if (typeof window !== 'undefined') {
  window.lightbox = {
    get: getLightbox,
    open: openLightbox
  };
}
