/**
 * Sofia — Unified Site Layout & Navigation Module
 * Provides unified header, slide-out drawer, footer, focus trap, and navigation interactions
 * across all pages of Sofia's portfolio and digital archive.
 * Fully internationalized (i18n) with data-i18n bindings and responsive EN | PT toggles.
 */

import { applyTranslations, bindToggleEvents, updateToggles } from '/shared/i18n.js';

(function () {
  function getActivePageKey() {
    const path = window.location.pathname.split('/').pop().toLowerCase();
    if (!path || path === '' || path === 'index.html') return 'home';
    if (path.includes('about')) return 'about';
    if (path.includes('website')) return 'website';
    if (path.includes('ux-ui')) return 'ux-ui';
    if (path.includes('youtube')) return 'youtube';
    if (path.includes('instagram')) return 'instagram';
    if (path.includes('social-media')) return 'social-media';
    if (path.includes('contact')) return 'contact';
    if (path.includes('digital') || path.includes('3d') || path.includes('video') || path.includes('models') || path.includes('effects') || path.includes('image')) return 'digital-projects';
    if (path.includes('photo') || path.includes('analog') || path.includes('analogic')) return 'photography-projects';
    return 'home';
  }

  const activeKey = getActivePageKey();
  const isOnlineProjectActive = ['website', 'ux-ui', 'youtube', 'instagram', 'social-media'].includes(activeKey);
  const isSocialActive = ['youtube', 'instagram', 'social-media'].includes(activeKey);
  const isDigitalProjectActive = activeKey === 'digital-projects';
  const isPhotographyProjectActive = activeKey === 'photography-projects';

  function renderHeader(container) {
    if (!container) return;

    container.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- Zone 1: Hamburger Menu Trigger (Left) + Sofia Wordmark -->
        <div class="flex items-center gap-3.5 shrink-0">
          <button
            id="hamburger-btn"
            type="button"
            class="flex items-center justify-center p-2 rounded-lg text-slate-300 hover:text-teal-300 hover:bg-[#101b26] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer"
            aria-label="Open navigation menu"
            data-i18n-aria="nav.toggle_menu"
            aria-controls="left-hamburger-drawer"
            aria-expanded="false"
          >
            <svg class="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span class="sr-only" data-i18n="nav.toggle_menu">Toggle Menu</span>
          </button>

          <a href="index.html" class="group flex items-center text-lg font-bold font-title tracking-tight text-white hover:text-teal-300 transition-colors">
            <span>Sofia Monteiro</span>
          </a>
        </div>

        <!-- Zone 2: Navigation Links (Connected via href to separate pages) -->
        <nav class="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-7" aria-label="Main Navigation">
          <a
            href="index.html"
            class="font-title text-sm tracking-tight py-1 transition-colors relative ${activeKey === 'home' ? 'text-teal-300 font-semibold' : 'text-slate-400 hover:text-slate-100 font-medium'}"
          >
            <span data-i18n="nav.home">Home</span>
            ${activeKey === 'home' ? '<span class="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"></span>' : ''}
          </a>

          <a
            href="about.html"
            class="font-title text-sm tracking-tight py-1 transition-colors relative ${activeKey === 'about' ? 'text-teal-300 font-semibold' : 'text-slate-400 hover:text-slate-100 font-medium'}"
          >
            <span data-i18n="nav.about">About</span>
            ${activeKey === 'about' ? '<span class="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"></span>' : ''}
          </a>

          <!-- Online Projects Dropdown -->
          <div class="relative" id="online-projects-dropdown">
            <button
              type="button"
              id="online-projects-btn"
              aria-haspopup="true"
              aria-expanded="false"
              class="font-title text-sm tracking-tight py-1 flex items-center gap-1.5 focus:outline-none cursor-pointer transition-colors ${isOnlineProjectActive ? 'text-teal-300 font-semibold' : 'text-slate-400 hover:text-slate-100 font-medium'}"
            >
              <span data-i18n="nav.online_projects">Online Projects</span>
              <svg id="online-projects-chevron" class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown Menu (Piled vertically) -->
            <div
              id="online-projects-menu"
              role="menu"
              class="absolute top-full left-0 mt-2 w-48 rounded-xl bg-[#0c1520]/95 backdrop-blur-xl border border-teal-900/60 shadow-2xl p-1.5 z-50 hidden"
            >
              <a
                href="website.html"
                role="menuitem"
                class="group/item flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#121e2b] transition-all ${activeKey === 'website' ? 'bg-[#121e2b] text-teal-300 font-medium' : ''}"
              >
                <svg class="w-4 h-4 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span class="font-title text-sm tracking-tight" data-i18n="nav.websites">Websites</span>
              </a>

              <a
                href="ux-ui.html"
                role="menuitem"
                class="group/item flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#121e2b] transition-all ${activeKey === 'ux-ui' ? 'bg-[#121e2b] text-cyan-300 font-medium' : ''}"
              >
                <svg class="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                <span class="font-title text-sm tracking-tight" data-i18n="nav.ux_ui">UX/UI</span>
              </a>

              <!-- Social Media Item: Submenu opens to the right -->
              <div class="relative group/sub" id="online-projects-sub-social">
                <div
                  role="button"
                  tabindex="0"
                  id="online-projects-social-trigger"
                  aria-haspopup="true"
                  aria-expanded="false"
                  class="flex items-center justify-between w-full px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#121e2b] cursor-pointer transition-all ${isSocialActive ? 'bg-[#121e2b] text-emerald-300 font-medium' : ''}"
                >
                  <div class="flex items-center gap-2.5">
                    <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span class="font-title text-sm tracking-tight" data-i18n="nav.social_media">Social Media</span>
                  </div>
                  <svg class="w-3.5 h-3.5 text-slate-400 group-hover/sub:text-emerald-300 group-hover/sub:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                <!-- Submenu Opening to the Right -->
                <div
                  id="social-media-submenu"
                  role="menu"
                  class="absolute left-full top-0 ml-1.5 w-44 rounded-xl bg-[#0c1520]/95 backdrop-blur-xl border border-teal-900/60 shadow-2xl p-1.5 z-50 hidden group-hover/sub:block focus-within:block"
                >
                  <a
                    href="youtube.html"
                    role="menuitem"
                    class="group/item flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#121e2b] transition-all ${activeKey === 'youtube' ? 'bg-[#121e2b] text-red-300 font-medium' : ''}"
                  >
                    <svg class="w-4 h-4 text-red-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span class="font-title text-sm tracking-tight" data-i18n="nav.youtube">YouTube</span>
                  </a>

                  <a
                    href="instagram.html"
                    role="menuitem"
                    class="group/item flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#121e2b] transition-all ${activeKey === 'instagram' ? 'bg-[#121e2b] text-pink-300 font-medium' : ''}"
                  >
                    <svg class="w-4 h-4 text-pink-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span class="font-title text-sm tracking-tight" data-i18n="nav.instagram">Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Digital Projects Dropdown -->
          <div class="relative" id="digital-projects-dropdown">
            <button
              type="button"
              id="digital-projects-btn"
              aria-haspopup="true"
              aria-expanded="false"
              class="font-title text-sm tracking-tight py-1 flex items-center gap-1.5 focus:outline-none cursor-pointer transition-colors ${isDigitalProjectActive ? 'text-teal-300 font-semibold' : 'text-slate-400 hover:text-slate-100 font-medium'}"
            >
              <span data-i18n="nav.digital_projects">Digital Projects</span>
              <svg id="digital-projects-chevron" class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown Menu (Piled vertically) -->
            <div
              id="digital-projects-menu"
              role="menu"
              class="absolute top-full left-0 mt-2 w-48 rounded-xl bg-[#0c1520]/95 backdrop-blur-xl border border-teal-900/60 shadow-2xl p-1.5 z-50 hidden"
            >
              <!-- 3D Item (Name only, with submenu that opens to the right) -->
              <div class="relative group/dp3d" id="digital-projects-sub-3d">
                <div
                  role="button"
                  tabindex="0"
                  id="digital-projects-3d-trigger"
                  aria-haspopup="true"
                  aria-expanded="false"
                  class="flex items-center justify-between w-full px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#121e2b] cursor-pointer transition-all"
                >
                  <div class="flex items-center gap-2.5">
                    <svg class="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
                    </svg>
                    <span class="font-title text-sm tracking-tight" data-i18n="nav.3d">3D</span>
                  </div>
                  <svg class="w-3.5 h-3.5 text-slate-400 group-hover/dp3d:text-cyan-300 group-hover/dp3d:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                <!-- Submenu 1: Assets (opens to the right of 3D) -->
                <div
                  id="assets-submenu"
                  role="menu"
                  class="absolute left-full top-0 ml-1.5 w-44 rounded-xl bg-[#0c1520]/95 backdrop-blur-xl border border-teal-900/60 shadow-2xl p-1.5 z-50 hidden group-hover/dp3d:block focus-within:block"
                >
                  <!-- Assets Item (Name only, with submenus models & effects opening to the right) -->
                  <div class="relative group/dpassets" id="digital-projects-sub-assets">
                    <div
                      role="button"
                      tabindex="0"
                      id="digital-projects-assets-trigger"
                      aria-haspopup="true"
                      aria-expanded="false"
                      class="flex items-center justify-between w-full px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#121e2b] cursor-pointer transition-all"
                    >
                      <div class="flex items-center gap-2.5">
                        <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                        <span class="font-title text-sm tracking-tight" data-i18n="nav.assets">Assets</span>
                      </div>
                      <svg class="w-3.5 h-3.5 text-slate-400 group-hover/dpassets:text-emerald-300 group-hover/dpassets:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>

                    <!-- Submenu 2: Models and Effects (opens to the right of Assets) -->
                    <div
                      id="assets-children-submenu"
                      role="menu"
                      class="absolute left-full top-0 ml-1.5 w-40 rounded-xl bg-[#0c1520]/95 backdrop-blur-xl border border-teal-900/60 shadow-2xl p-1.5 z-50 hidden group-hover/dpassets:block focus-within:block"
                    >
                      <a
                        href="#models"
                        role="menuitem"
                        class="group/item flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#121e2b] transition-all"
                      >
                        <svg class="w-4 h-4 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                        </svg>
                        <span class="font-title text-sm tracking-tight" data-i18n="nav.models">Models</span>
                      </a>

                      <a
                        href="#effects"
                        role="menuitem"
                        class="group/item flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#121e2b] transition-all"
                      >
                        <svg class="w-4 h-4 text-pink-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        <span class="font-title text-sm tracking-tight" data-i18n="nav.effects">Effects</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Video Editing Item -->
              <a
                href="#video-editing"
                role="menuitem"
                class="group/item flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#121e2b] transition-all"
              >
                <svg class="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span class="font-title text-sm tracking-tight" data-i18n="nav.video_editing">Video Editing</span>
              </a>

              <!-- Image Editing Item -->
              <a
                href="#image-editing"
                role="menuitem"
                class="group/item flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#121e2b] transition-all"
              >
                <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="font-title text-sm tracking-tight" data-i18n="nav.image_editing">Image Editing</span>
              </a>
            </div>
          </div>

          <!-- Photography Projects Dropdown -->
          <div class="relative" id="photography-projects-dropdown">
            <button
              type="button"
              id="photography-projects-btn"
              aria-haspopup="true"
              aria-expanded="false"
              class="font-title text-sm tracking-tight py-1 flex items-center gap-1.5 focus:outline-none cursor-pointer transition-colors ${isPhotographyProjectActive ? 'text-teal-300 font-semibold' : 'text-slate-400 hover:text-slate-100 font-medium'}"
            >
              <span data-i18n="nav.photography_projects">Photography Projects</span>
              <svg id="photography-projects-chevron" class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown Menu (Piled vertically) -->
            <div
              id="photography-projects-menu"
              role="menu"
              class="absolute top-full left-0 mt-2 w-48 rounded-xl bg-[#0c1520]/95 backdrop-blur-xl border border-teal-900/60 shadow-2xl p-1.5 z-50 hidden"
            >
              <!-- Analogic Item -->
              <a
                href="#analogic"
                role="menuitem"
                class="group/item flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#121e2b] transition-all"
              >
                <svg class="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
                <span class="font-title text-sm tracking-tight" data-i18n="nav.analogic">Analogic</span>
              </a>

              <!-- Digital Item -->
              <a
                href="#digital"
                role="menuitem"
                class="group/item flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#121e2b] transition-all"
              >
                <svg class="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="font-title text-sm tracking-tight" data-i18n="nav.digital">Digital</span>
              </a>
            </div>
          </div>

          <a
            href="contact.html"
            class="font-title text-sm tracking-tight py-1 transition-colors relative ${activeKey === 'contact' ? 'text-teal-300 font-semibold' : 'text-slate-400 hover:text-slate-100 font-medium'}"
          >
            <span data-i18n="nav.contact">Contact</span>
            ${activeKey === 'contact' ? '<span class="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"></span>' : ''}
          </a>
        </nav>

        <!-- Zone 3: Language Toggle (EN | PT) -->
        <div class="flex items-center gap-2 shrink-0">
          <div class="lang-switcher inline-flex items-center bg-[#0d1622] p-1 rounded-xl border border-teal-900/50 shadow-inner" role="group" aria-label="Language selector">
            <button
              type="button"
              data-lang-btn="en"
              class="px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              aria-label="Switch to English"
              data-i18n-aria="lang.select_en"
            >
              EN
            </button>
            <span class="text-slate-600 px-0.5 text-xs select-none" aria-hidden="true">|</span>
            <button
              type="button"
              data-lang-btn="pt"
              class="px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              aria-label="Mudar para Português"
              data-i18n-aria="lang.select_pt"
            >
              PT
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderDrawer(container) {
    if (!container) return;

    container.innerHTML = `
      <!-- Backdrop -->
      <div id="drawer-backdrop" class="fixed inset-0 z-40 bg-[#04070a]/80 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300" aria-hidden="true"></div>

      <!-- Aside Drawer -->
      <aside
        id="left-hamburger-drawer"
        aria-label="Navigation drawer"
        role="dialog"
        aria-modal="true"
        class="fixed top-0 bottom-0 left-0 z-50 w-80 max-w-[85vw] bg-[#0a1118] border-r border-teal-900/40 shadow-2xl flex flex-col justify-between transform -translate-x-full transition-transform duration-300 ease-out"
      >
        <!-- Drawer Header with Sofia's Avatar -->
        <div class="p-6 border-b border-teal-950/60 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-700 to-emerald-500 p-[1.5px] shadow-sm overflow-hidden shrink-0">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1' fill='%230b141e'%3E%3Crect width='1' height='1' fill='%230b141e'/%3E%3C/svg%3E"
                data-image="drawer.avatar"
                alt="Sofia Monteiro"
                data-i18n-alt="home.portrait_alt"
                referrerpolicy="no-referrer"
                class="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <a href="index.html" class="font-title text-base font-semibold text-white tracking-tight hover:text-teal-300 transition-colors">
                Sofia Monteiro
              </a>
              <p class="text-xs text-slate-400 font-sans" data-i18n="drawer.subtitle">Creative &amp; Digital Archive</p>
            </div>
          </div>

          <button
            id="drawer-close-btn"
            type="button"
            class="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer"
            aria-label="Close navigation menu"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Drawer Language Switcher Bar -->
        <div class="px-6 py-3 flex items-center justify-between border-b border-teal-950/40 bg-[#080d12]/60">
          <span class="text-xs font-semibold font-title tracking-wider uppercase text-teal-400/80" data-i18n="drawer.navigation">Navigation</span>
          <div class="lang-switcher inline-flex items-center bg-[#0d1622] p-1 rounded-xl border border-teal-900/50 shadow-inner" role="group" aria-label="Language selector">
            <button
              type="button"
              data-lang-btn="en"
              class="px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              aria-label="Switch to English"
              data-i18n-aria="lang.select_en"
            >
              EN
            </button>
            <span class="text-slate-600 px-0.5 text-xs select-none" aria-hidden="true">|</span>
            <button
              type="button"
              data-lang-btn="pt"
              class="px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              aria-label="Mudar para Português"
              data-i18n-aria="lang.select_pt"
            >
              PT
            </button>
          </div>
        </div>

        <!-- Drawer Navigation Items -->
        <div class="flex-1 overflow-y-auto px-4 py-4">
          <nav class="space-y-1.5" aria-label="Sidebar Navigation">
            <a
              href="index.html"
              class="group flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-150 ${activeKey === 'home' ? 'bg-teal-950/40 text-teal-300 border border-teal-800/40 font-medium' : 'text-slate-300 hover:text-white hover:bg-[#101b26] border border-transparent'}"
            >
              <span class="font-title text-sm tracking-tight ${activeKey === 'home' ? 'text-teal-200' : 'group-hover:text-teal-200'}" data-i18n="nav.home">Home</span>
              <svg class="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <a
              href="about.html"
              class="group flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-150 ${activeKey === 'about' ? 'bg-teal-950/40 text-teal-300 border border-teal-800/40 font-medium' : 'text-slate-300 hover:text-white hover:bg-[#101b26] border border-transparent'}"
            >
              <span class="font-title text-sm tracking-tight ${activeKey === 'about' ? 'text-teal-200' : 'group-hover:text-teal-200'}" data-i18n="nav.about">About</span>
              <svg class="w-4 h-4 text-slate-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <!-- Online Projects Accordion -->
            <div class="rounded-xl border border-teal-950/70 bg-[#070e14]/50 overflow-hidden">
              <button
                type="button"
                id="drawer-projects-accordion-btn"
                class="w-full flex items-center justify-between p-3.5 text-left text-slate-300 hover:text-white hover:bg-[#101b26] transition-colors cursor-pointer"
                aria-expanded="${isOnlineProjectActive ? 'true' : 'false'}"
              >
                <div class="flex items-center gap-2.5">
                  <span class="font-title text-sm font-semibold tracking-tight ${isOnlineProjectActive ? 'text-teal-200' : ''}" data-i18n="nav.online_projects">Online Projects</span>
                </div>
                <svg id="drawer-projects-chevron" class="w-4 h-4 text-slate-400 transition-transform duration-200 ${isOnlineProjectActive ? 'rotate-180 text-teal-400' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div id="drawer-projects-sublist" class="px-2 pb-2.5 pt-1 space-y-1 border-t border-teal-950/60 bg-[#060b10]/60 ${isOnlineProjectActive ? '' : 'hidden'}">
                <a href="website.html" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#0f1924] transition-all ${activeKey === 'website' ? 'bg-[#0f1924] text-teal-200 font-medium' : ''}">
                  <svg class="w-4 h-4 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span class="font-title text-sm tracking-tight" data-i18n="nav.websites">Websites</span>
                </a>

                <a href="ux-ui.html" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#0f1924] transition-all ${activeKey === 'ux-ui' ? 'bg-[#0f1924] text-cyan-200 font-medium' : ''}">
                  <svg class="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                  <span class="font-title text-sm tracking-tight" data-i18n="nav.ux_ui">UX/UI</span>
                </a>

                <!-- Social Media nested list -->
                <div class="pt-1">
                  <button
                    type="button"
                    id="drawer-social-accordion-btn"
                    class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#0f1924] transition-colors cursor-pointer"
                    aria-expanded="${isSocialActive ? 'true' : 'false'}"
                  >
                    <div class="flex items-center gap-2.5">
                      <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      <span class="font-title text-sm tracking-tight" data-i18n="nav.social_media">Social Media</span>
                    </div>
                    <svg id="drawer-social-chevron" class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isSocialActive ? 'rotate-180 text-emerald-400' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div id="drawer-social-sublist" class="pl-6 pr-1 pt-1 space-y-1 ${isSocialActive ? '' : 'hidden'}">
                    <a href="youtube.html" class="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#0f1924] transition-all ${activeKey === 'youtube' ? 'bg-[#0f1924] text-red-200 font-medium' : ''}">
                      <svg class="w-4 h-4 text-red-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span class="font-title text-sm tracking-tight" data-i18n="nav.youtube">YouTube</span>
                    </a>

                    <a href="instagram.html" class="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#0f1924] transition-all ${activeKey === 'instagram' ? 'bg-[#0f1924] text-pink-200 font-medium' : ''}">
                      <svg class="w-4 h-4 text-pink-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span class="font-title text-sm tracking-tight" data-i18n="nav.instagram">Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Digital Projects Accordion -->
            <div class="rounded-xl border border-teal-950/70 bg-[#070e14]/50 overflow-hidden">
              <button
                type="button"
                id="drawer-digital-accordion-btn"
                class="w-full flex items-center justify-between p-3.5 text-left text-slate-300 hover:text-white hover:bg-[#101b26] transition-colors cursor-pointer"
                aria-expanded="${isDigitalProjectActive ? 'true' : 'false'}"
              >
                <div class="flex items-center gap-2.5">
                  <span class="font-title text-sm font-semibold tracking-tight ${isDigitalProjectActive ? 'text-teal-200' : ''}" data-i18n="nav.digital_projects">Digital Projects</span>
                </div>
                <svg id="drawer-digital-chevron" class="w-4 h-4 text-slate-400 transition-transform duration-200 ${isDigitalProjectActive ? 'rotate-180 text-teal-400' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div id="drawer-digital-sublist" class="px-2 pb-2.5 pt-1 space-y-1 border-t border-teal-950/60 bg-[#060b10]/60 ${isDigitalProjectActive ? '' : 'hidden'}">
                <!-- 3D Accordion -->
                <div>
                  <button
                    type="button"
                    id="drawer-3d-accordion-btn"
                    class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#0f1924] transition-colors cursor-pointer"
                    aria-expanded="false"
                  >
                    <div class="flex items-center gap-2.5">
                      <svg class="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
                      </svg>
                      <span class="font-title text-sm tracking-tight" data-i18n="nav.3d">3D</span>
                    </div>
                    <svg id="drawer-3d-chevron" class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div id="drawer-3d-sublist" class="pl-4 pr-1 pt-1 space-y-1 hidden">
                    <!-- Assets Accordion -->
                    <div>
                      <button
                        type="button"
                        id="drawer-assets-accordion-btn"
                        class="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#0f1924] transition-colors cursor-pointer"
                        aria-expanded="false"
                      >
                        <div class="flex items-center gap-2.5">
                          <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                          </svg>
                          <span class="font-title text-sm tracking-tight" data-i18n="nav.assets">Assets</span>
                        </div>
                        <svg id="drawer-assets-chevron" class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <div id="drawer-assets-sublist" class="pl-6 pr-1 pt-1 space-y-1 hidden">
                        <a href="#models" class="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#0f1924] transition-all">
                          <svg class="w-4 h-4 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                          </svg>
                          <span class="font-title text-sm tracking-tight" data-i18n="nav.models">Models</span>
                        </a>

                        <a href="#effects" class="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#0f1924] transition-all">
                          <svg class="w-4 h-4 text-pink-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                          <span class="font-title text-sm tracking-tight" data-i18n="nav.effects">Effects</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Video Editing -->
                <a href="#video-editing" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#0f1924] transition-all">
                  <svg class="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span class="font-title text-sm tracking-tight" data-i18n="nav.video_editing">Video Editing</span>
                </a>

                <!-- Image Editing -->
                <a href="#image-editing" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#0f1924] transition-all">
                  <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="font-title text-sm tracking-tight" data-i18n="nav.image_editing">Image Editing</span>
                </a>
              </div>
            </div>

            <!-- Photography Projects Accordion -->
            <div class="rounded-xl border border-teal-950/70 bg-[#070e14]/50 overflow-hidden">
              <button
                type="button"
                id="drawer-photo-accordion-btn"
                class="w-full flex items-center justify-between p-3.5 text-left text-slate-300 hover:text-white hover:bg-[#101b26] transition-colors cursor-pointer"
                aria-expanded="${isPhotographyProjectActive ? 'true' : 'false'}"
              >
                <div class="flex items-center gap-2.5">
                  <span class="font-title text-sm font-semibold tracking-tight ${isPhotographyProjectActive ? 'text-teal-200' : ''}" data-i18n="nav.photography_projects">Photography Projects</span>
                </div>
                <svg id="drawer-photo-chevron" class="w-4 h-4 text-slate-400 transition-transform duration-200 ${isPhotographyProjectActive ? 'rotate-180 text-teal-400' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div id="drawer-photo-sublist" class="px-2 pb-2.5 pt-1 space-y-1 border-t border-teal-950/60 bg-[#060b10]/60 ${isPhotographyProjectActive ? '' : 'hidden'}">
                <a href="#analogic" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#0f1924] transition-all">
                  <svg class="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                  <span class="font-title text-sm tracking-tight" data-i18n="nav.analogic">Analogic</span>
                </a>

                <a href="#digital" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#0f1924] transition-all">
                  <svg class="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="font-title text-sm tracking-tight" data-i18n="nav.digital">Digital</span>
                </a>
              </div>
            </div>

            <a
              href="contact.html"
              class="group flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-150 ${activeKey === 'contact' ? 'bg-teal-950/40 text-teal-300 border border-teal-800/40 font-medium' : 'text-slate-300 hover:text-white hover:bg-[#101b26] border border-transparent'}"
            >
              <span class="font-title text-sm tracking-tight ${activeKey === 'contact' ? 'text-teal-200' : 'group-hover:text-teal-200'}" data-i18n="nav.contact">Contact</span>
              <svg class="w-4 h-4 text-slate-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </nav>
        </div>

        <div class="p-4 border-t border-teal-950/60 text-xs text-slate-400">
          <p>© <span class="drawer-copyright-year">2026</span> <span data-i18n="footer.rights">Sofia Monteiro. All rights reserved.</span></p>
        </div>
      </aside>
    `;
  }

  function renderFooter(container) {
    if (!container) return;

    container.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-teal-950/60">
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-teal-400"></span>
              <span class="font-title text-xl font-bold tracking-tight text-white">Sofia Monteiro</span>
            </div>
            <p class="font-serif text-slate-300 text-base italic max-w-md" data-i18n="footer.quote">
              "Crafting calm, useful websites and thoughtful digital experiences."
            </p>
          </div>

          <nav class="flex flex-wrap items-center gap-6" aria-label="Footer Navigation">
            <a href="index.html" class="font-title text-sm ${activeKey === 'home' ? 'text-teal-300' : 'text-slate-400 hover:text-teal-300'} transition-colors" data-i18n="nav.home">Home</a>
            <a href="about.html" class="font-title text-sm ${activeKey === 'about' ? 'text-teal-300' : 'text-slate-400 hover:text-teal-300'} transition-colors" data-i18n="nav.about">About</a>
            <div class="flex items-center gap-3">
              <span class="font-title text-xs uppercase tracking-wider text-teal-400/80 font-semibold" data-i18n="footer.online_label">Online Projects:</span>
              <a href="website.html" class="font-title text-sm ${activeKey === 'website' ? 'text-teal-300' : 'text-slate-400 hover:text-teal-300'} transition-colors" data-i18n="nav.websites">Websites</a>
              <a href="ux-ui.html" class="font-title text-sm ${activeKey === 'ux-ui' ? 'text-teal-300' : 'text-slate-400 hover:text-teal-300'} transition-colors" data-i18n="nav.ux_ui">UX/UI</a>
              <a href="youtube.html" class="font-title text-sm ${activeKey === 'youtube' ? 'text-teal-300' : 'text-slate-400 hover:text-teal-300'} transition-colors" data-i18n="nav.youtube">YouTube</a>
              <a href="instagram.html" class="font-title text-sm ${activeKey === 'instagram' ? 'text-teal-300' : 'text-slate-400 hover:text-teal-300'} transition-colors" data-i18n="nav.instagram">Instagram</a>
            </div>
            <div class="flex items-center gap-3">
              <span class="font-title text-xs uppercase tracking-wider text-teal-400/80 font-semibold" data-i18n="footer.digital_label">Digital Projects:</span>
              <span class="font-title text-sm text-slate-400"><span data-i18n="nav.3d">3D</span> (<span data-i18n="nav.assets">Assets</span>: <span data-i18n="nav.models">Models</span>, <span data-i18n="nav.effects">Effects</span>)</span>
              <span class="text-slate-600">·</span>
              <span class="font-title text-sm text-slate-400" data-i18n="nav.video_editing">Video Editing</span>
              <span class="text-slate-600">·</span>
              <span class="font-title text-sm text-slate-400" data-i18n="nav.image_editing">Image Editing</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="font-title text-xs uppercase tracking-wider text-teal-400/80 font-semibold" data-i18n="footer.photo_label">Photography Projects:</span>
              <a href="#analogic" class="font-title text-sm text-slate-400 hover:text-teal-300 transition-colors" data-i18n="nav.analogic">Analogic</a>
              <span class="text-slate-600">·</span>
              <a href="#digital" class="font-title text-sm text-slate-400 hover:text-teal-300 transition-colors" data-i18n="nav.digital">Digital</a>
            </div>
            <a href="contact.html" class="font-title text-sm ${activeKey === 'contact' ? 'text-teal-300' : 'text-slate-400 hover:text-teal-300'} transition-colors" data-i18n="nav.contact">Contact</a>
          </nav>
        </div>

        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-400">
          <div>
            <span>&copy; <span id="copyright-year">2026</span> <span data-i18n="footer.rights">Sofia Monteiro. All rights reserved.</span></span>
          </div>

          <div class="flex items-center gap-4">
            <button id="back-to-top-btn" type="button" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a1118] hover:bg-[#101b26] text-slate-300 hover:text-white border border-teal-900/40 transition-colors cursor-pointer" aria-label="Back to top of page">
              <span data-i18n="footer.back_to_top">Back to Top</span>
              <svg class="w-3.5 h-3.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function initInteractions() {
    const currentYear = new Date().getFullYear();
    const copyrightYearEl = document.getElementById('copyright-year');
    if (copyrightYearEl) copyrightYearEl.textContent = currentYear;
    document.querySelectorAll('.drawer-copyright-year').forEach((el) => (el.textContent = currentYear));

    const hamburgerBtn = document.getElementById('hamburger-btn');
    const drawerBackdrop = document.getElementById('drawer-backdrop');
    const leftDrawer = document.getElementById('left-hamburger-drawer');
    const drawerCloseBtn = document.getElementById('drawer-close-btn');

    let previousActiveElement = null;

    function getFocusableElements(container) {
      if (!container) return [];
      return Array.from(
        container.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
    }

    function openDrawer() {
      previousActiveElement = document.activeElement;
      leftDrawer.classList.remove('-translate-x-full');
      leftDrawer.classList.add('translate-x-0');
      drawerBackdrop.classList.remove('opacity-0', 'pointer-events-none');
      drawerBackdrop.classList.add('opacity-100', 'pointer-events-auto');
      document.body.style.overflow = 'hidden';
      if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');

      setTimeout(() => {
        if (drawerCloseBtn) {
          drawerCloseBtn.focus();
        } else {
          const focusables = getFocusableElements(leftDrawer);
          if (focusables.length > 0) focusables[0].focus();
        }
      }, 50);
    }

    function closeDrawer() {
      leftDrawer.classList.remove('translate-x-0');
      leftDrawer.classList.add('-translate-x-full');
      drawerBackdrop.classList.remove('opacity-100', 'pointer-events-auto');
      drawerBackdrop.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
      if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');

      if (hamburgerBtn) {
        hamburgerBtn.focus();
      } else if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        previousActiveElement.focus();
      }
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', function (e) {
      const isDrawerOpen = leftDrawer && !leftDrawer.classList.contains('-translate-x-full');
      if (!isDrawerOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeDrawer();
        return;
      }

      if (e.key === 'Tab') {
        const focusables = getFocusableElements(leftDrawer);
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });

    // 1. Desktop Dropdown: Online Projects
    const dropdown = document.getElementById('online-projects-dropdown');
    const btn = document.getElementById('online-projects-btn');
    const menu = document.getElementById('online-projects-menu');
    const chevron = document.getElementById('online-projects-chevron');
    const socialSubTrigger = document.getElementById('online-projects-social-trigger');
    const socialSubmenu = document.getElementById('social-media-submenu');

    let closeTimer = null;

    function openMenu() {
      if (closeTimer) clearTimeout(closeTimer);
      if (menu) menu.classList.remove('hidden');
      if (btn) btn.setAttribute('aria-expanded', 'true');
      if (chevron) chevron.classList.add('rotate-180', 'text-teal-400');
    }

    function scheduleClose() {
      closeTimer = setTimeout(() => {
        if (menu) menu.classList.add('hidden');
        if (socialSubmenu) socialSubmenu.classList.add('hidden');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        if (chevron) chevron.classList.remove('rotate-180', 'text-teal-400');
        if (socialSubTrigger) socialSubTrigger.setAttribute('aria-expanded', 'false');
      }, 200);
    }

    if (dropdown && btn && menu) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isHidden = menu.classList.contains('hidden');
        if (isHidden) {
          closeDigitalProjects();
          closePhotoProjects();
          openMenu();
        } else {
          scheduleClose();
        }
      });

      dropdown.addEventListener('mouseenter', openMenu);
      dropdown.addEventListener('mouseleave', scheduleClose);

      dropdown.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          if (menu) menu.classList.add('hidden');
          if (socialSubmenu) socialSubmenu.classList.add('hidden');
          if (btn) btn.setAttribute('aria-expanded', 'false');
          if (chevron) chevron.classList.remove('rotate-180', 'text-teal-400');
          btn.focus();
        }
      });
    }

    if (socialSubTrigger && socialSubmenu) {
      socialSubTrigger.addEventListener('click', function (e) {
        e.stopPropagation();
        const isHidden = socialSubmenu.classList.contains('hidden');
        socialSubmenu.classList.toggle('hidden');
        socialSubTrigger.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
      });

      const socialSubWrapper = document.getElementById('online-projects-sub-social');
      if (socialSubWrapper) {
        socialSubWrapper.addEventListener('mouseenter', function () {
          socialSubmenu.classList.remove('hidden');
          socialSubTrigger.setAttribute('aria-expanded', 'true');
        });
        socialSubWrapper.addEventListener('mouseleave', function () {
          socialSubmenu.classList.add('hidden');
          socialSubTrigger.setAttribute('aria-expanded', 'false');
        });
      }
    }

    // 2. Desktop Dropdown: Digital Projects
    const dpDropdown = document.getElementById('digital-projects-dropdown');
    const dpBtn = document.getElementById('digital-projects-btn');
    const dpMenu = document.getElementById('digital-projects-menu');
    const dpChevron = document.getElementById('digital-projects-chevron');
    const dp3dTrigger = document.getElementById('digital-projects-3d-trigger');
    const dpAssetsSubmenu = document.getElementById('assets-submenu');
    const dpAssetsTrigger = document.getElementById('digital-projects-assets-trigger');
    const dpAssetsChildrenSubmenu = document.getElementById('assets-children-submenu');

    let dpCloseTimer = null;

    function openDigitalProjects() {
      if (dpCloseTimer) clearTimeout(dpCloseTimer);
      if (dpMenu) dpMenu.classList.remove('hidden');
      if (dpBtn) dpBtn.setAttribute('aria-expanded', 'true');
      if (dpChevron) dpChevron.classList.add('rotate-180', 'text-teal-400');
    }

    function closeDigitalProjects() {
      if (dpMenu) dpMenu.classList.add('hidden');
      if (dpAssetsSubmenu) dpAssetsSubmenu.classList.add('hidden');
      if (dpAssetsChildrenSubmenu) dpAssetsChildrenSubmenu.classList.add('hidden');
      if (dpBtn) dpBtn.setAttribute('aria-expanded', 'false');
      if (dpChevron) dpChevron.classList.remove('rotate-180', 'text-teal-400');
      if (dp3dTrigger) dp3dTrigger.setAttribute('aria-expanded', 'false');
      if (dpAssetsTrigger) dpAssetsTrigger.setAttribute('aria-expanded', 'false');
    }

    function scheduleCloseDigitalProjects() {
      dpCloseTimer = setTimeout(() => {
        closeDigitalProjects();
      }, 200);
    }

    if (dpDropdown && dpBtn && dpMenu) {
      dpBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isHidden = dpMenu.classList.contains('hidden');
        if (isHidden) {
          if (menu) menu.classList.add('hidden');
          closePhotoProjects();
          openDigitalProjects();
        } else {
          scheduleCloseDigitalProjects();
        }
      });

      dpDropdown.addEventListener('mouseenter', openDigitalProjects);
      dpDropdown.addEventListener('mouseleave', scheduleCloseDigitalProjects);

      dpDropdown.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          closeDigitalProjects();
          dpBtn.focus();
        }
      });
    }

    if (dp3dTrigger && dpAssetsSubmenu) {
      dp3dTrigger.addEventListener('click', function (e) {
        e.stopPropagation();
        const isHidden = dpAssetsSubmenu.classList.contains('hidden');
        dpAssetsSubmenu.classList.toggle('hidden');
        dp3dTrigger.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
      });

      const dp3dWrapper = document.getElementById('digital-projects-sub-3d');
      if (dp3dWrapper) {
        dp3dWrapper.addEventListener('mouseenter', function () {
          dpAssetsSubmenu.classList.remove('hidden');
          dp3dTrigger.setAttribute('aria-expanded', 'true');
        });
        dp3dWrapper.addEventListener('mouseleave', function () {
          dpAssetsSubmenu.classList.add('hidden');
          if (dpAssetsChildrenSubmenu) dpAssetsChildrenSubmenu.classList.add('hidden');
          dp3dTrigger.setAttribute('aria-expanded', 'false');
        });
      }
    }

    if (dpAssetsTrigger && dpAssetsChildrenSubmenu) {
      dpAssetsTrigger.addEventListener('click', function (e) {
        e.stopPropagation();
        const isHidden = dpAssetsChildrenSubmenu.classList.contains('hidden');
        dpAssetsChildrenSubmenu.classList.toggle('hidden');
        dpAssetsTrigger.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
      });

      const dpAssetsWrapper = document.getElementById('digital-projects-sub-assets');
      if (dpAssetsWrapper) {
        dpAssetsWrapper.addEventListener('mouseenter', function () {
          dpAssetsChildrenSubmenu.classList.remove('hidden');
          dpAssetsTrigger.setAttribute('aria-expanded', 'true');
        });
        dpAssetsWrapper.addEventListener('mouseleave', function () {
          dpAssetsChildrenSubmenu.classList.add('hidden');
          dpAssetsTrigger.setAttribute('aria-expanded', 'false');
        });
      }
    }

    // 3. Desktop Dropdown: Photography Projects
    const photoDropdown = document.getElementById('photography-projects-dropdown');
    const photoBtn = document.getElementById('photography-projects-btn');
    const photoMenu = document.getElementById('photography-projects-menu');
    const photoChevron = document.getElementById('photography-projects-chevron');

    let photoCloseTimer = null;

    function openPhotoProjects() {
      if (photoCloseTimer) clearTimeout(photoCloseTimer);
      if (photoMenu) photoMenu.classList.remove('hidden');
      if (photoBtn) photoBtn.setAttribute('aria-expanded', 'true');
      if (photoChevron) photoChevron.classList.add('rotate-180', 'text-teal-400');
    }

    function closePhotoProjects() {
      if (photoMenu) photoMenu.classList.add('hidden');
      if (photoBtn) photoBtn.setAttribute('aria-expanded', 'false');
      if (photoChevron) photoChevron.classList.remove('rotate-180', 'text-teal-400');
    }

    function scheduleClosePhotoProjects() {
      photoCloseTimer = setTimeout(() => {
        closePhotoProjects();
      }, 200);
    }

    if (photoDropdown && photoBtn && photoMenu) {
      photoBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isHidden = photoMenu.classList.contains('hidden');
        if (isHidden) {
          if (menu) menu.classList.add('hidden');
          closeDigitalProjects();
          openPhotoProjects();
        } else {
          scheduleClosePhotoProjects();
        }
      });

      photoDropdown.addEventListener('mouseenter', openPhotoProjects);
      photoDropdown.addEventListener('mouseleave', scheduleClosePhotoProjects);

      photoDropdown.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          closePhotoProjects();
          photoBtn.focus();
        }
      });
    }

    // Outside click listener
    document.addEventListener('click', function (e) {
      if (dropdown && !dropdown.contains(e.target)) {
        if (menu) menu.classList.add('hidden');
        if (socialSubmenu) socialSubmenu.classList.add('hidden');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        if (chevron) chevron.classList.remove('rotate-180', 'text-teal-400');
      }
      if (dpDropdown && !dpDropdown.contains(e.target)) {
        closeDigitalProjects();
      }
      if (photoDropdown && !photoDropdown.contains(e.target)) {
        closePhotoProjects();
      }
    });

    // Drawer Accordions
    const drawerProjectsBtn = document.getElementById('drawer-projects-accordion-btn');
    const drawerProjectsSublist = document.getElementById('drawer-projects-sublist');
    const drawerProjectsChevron = document.getElementById('drawer-projects-chevron');

    if (drawerProjectsBtn && drawerProjectsSublist) {
      drawerProjectsBtn.addEventListener('click', function () {
        const isHidden = drawerProjectsSublist.classList.contains('hidden');
        if (isHidden) {
          drawerProjectsSublist.classList.remove('hidden');
          drawerProjectsBtn.setAttribute('aria-expanded', 'true');
          if (drawerProjectsChevron) drawerProjectsChevron.classList.add('rotate-180', 'text-teal-400');
        } else {
          drawerProjectsSublist.classList.add('hidden');
          drawerProjectsBtn.setAttribute('aria-expanded', 'false');
          if (drawerProjectsChevron) drawerProjectsChevron.classList.remove('rotate-180', 'text-teal-400');
        }
      });
    }

    const drawerSocialBtn = document.getElementById('drawer-social-accordion-btn');
    const drawerSocialSublist = document.getElementById('drawer-social-sublist');
    const drawerSocialChevron = document.getElementById('drawer-social-chevron');

    if (drawerSocialBtn && drawerSocialSublist) {
      drawerSocialBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isHidden = drawerSocialSublist.classList.contains('hidden');
        if (isHidden) {
          drawerSocialSublist.classList.remove('hidden');
          drawerSocialBtn.setAttribute('aria-expanded', 'true');
          if (drawerSocialChevron) drawerSocialChevron.classList.add('rotate-180', 'text-emerald-400');
        } else {
          drawerSocialSublist.classList.add('hidden');
          drawerSocialBtn.setAttribute('aria-expanded', 'false');
          if (drawerSocialChevron) drawerSocialChevron.classList.remove('rotate-180', 'text-emerald-400');
        }
      });
    }

    const drawerDigitalBtn = document.getElementById('drawer-digital-accordion-btn');
    const drawerDigitalSublist = document.getElementById('drawer-digital-sublist');
    const drawerDigitalChevron = document.getElementById('drawer-digital-chevron');

    if (drawerDigitalBtn && drawerDigitalSublist) {
      drawerDigitalBtn.addEventListener('click', function () {
        const isHidden = drawerDigitalSublist.classList.contains('hidden');
        if (isHidden) {
          drawerDigitalSublist.classList.remove('hidden');
          drawerDigitalBtn.setAttribute('aria-expanded', 'true');
          if (drawerDigitalChevron) drawerDigitalChevron.classList.add('rotate-180', 'text-teal-400');
        } else {
          drawerDigitalSublist.classList.add('hidden');
          drawerDigitalBtn.setAttribute('aria-expanded', 'false');
          if (drawerDigitalChevron) drawerDigitalChevron.classList.remove('rotate-180', 'text-teal-400');
        }
      });
    }

    const drawer3dBtn = document.getElementById('drawer-3d-accordion-btn');
    const drawer3dSublist = document.getElementById('drawer-3d-sublist');
    const drawer3dChevron = document.getElementById('drawer-3d-chevron');

    if (drawer3dBtn && drawer3dSublist) {
      drawer3dBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isHidden = drawer3dSublist.classList.contains('hidden');
        if (isHidden) {
          drawer3dSublist.classList.remove('hidden');
          drawer3dBtn.setAttribute('aria-expanded', 'true');
          if (drawer3dChevron) drawer3dChevron.classList.add('rotate-180', 'text-cyan-400');
        } else {
          drawer3dSublist.classList.add('hidden');
          drawer3dBtn.setAttribute('aria-expanded', 'false');
          if (drawer3dChevron) drawer3dChevron.classList.remove('rotate-180', 'text-cyan-400');
        }
      });
    }

    const drawerAssetsBtn = document.getElementById('drawer-assets-accordion-btn');
    const drawerAssetsSublist = document.getElementById('drawer-assets-sublist');
    const drawerAssetsChevron = document.getElementById('drawer-assets-chevron');

    if (drawerAssetsBtn && drawerAssetsSublist) {
      drawerAssetsBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isHidden = drawerAssetsSublist.classList.contains('hidden');
        if (isHidden) {
          drawerAssetsSublist.classList.remove('hidden');
          drawerAssetsBtn.setAttribute('aria-expanded', 'true');
          if (drawerAssetsChevron) drawerAssetsChevron.classList.add('rotate-180', 'text-emerald-400');
        } else {
          drawerAssetsSublist.classList.add('hidden');
          drawerAssetsBtn.setAttribute('aria-expanded', 'false');
          if (drawerAssetsChevron) drawerAssetsChevron.classList.remove('rotate-180', 'text-emerald-400');
        }
      });
    }

    const drawerPhotoBtn = document.getElementById('drawer-photo-accordion-btn');
    const drawerPhotoSublist = document.getElementById('drawer-photo-sublist');
    const drawerPhotoChevron = document.getElementById('drawer-photo-chevron');

    if (drawerPhotoBtn && drawerPhotoSublist) {
      drawerPhotoBtn.addEventListener('click', function () {
        const isHidden = drawerPhotoSublist.classList.contains('hidden');
        if (isHidden) {
          drawerPhotoSublist.classList.remove('hidden');
          drawerPhotoBtn.setAttribute('aria-expanded', 'true');
          if (drawerPhotoChevron) drawerPhotoChevron.classList.add('rotate-180', 'text-teal-400');
        } else {
          drawerPhotoSublist.classList.add('hidden');
          drawerPhotoBtn.setAttribute('aria-expanded', 'false');
          if (drawerPhotoChevron) drawerPhotoChevron.classList.remove('rotate-180', 'text-teal-400');
        }
      });
    }

    // Back to top button
    const backToTop = document.getElementById('back-to-top-btn');
    if (backToTop) {
      backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  function initLayout() {
    renderHeader(document.getElementById('site-header'));
    renderDrawer(document.getElementById('site-drawer'));
    renderFooter(document.getElementById('site-footer'));
    initInteractions();

    // Bind language switchers and apply initial translations
    bindToggleEvents();
    applyTranslations();

    if (typeof window !== 'undefined' && window.siteImages && typeof window.siteImages.apply === 'function') {
      window.siteImages.apply();
    }

    window.dispatchEvent(new CustomEvent('layout:mounted'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLayout);
  } else {
    initLayout();
  }
})();
