/**
 * Sofia — Unified Site Layout & Navigation Module
 * Provides unified header, slide-out drawer, footer, focus trap, and navigation interactions
 * across all pages of Sofia's portfolio and digital archive.
 */

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
    return 'home';
  }

  const activeKey = getActivePageKey();
  const isOnlineProjectActive = ['website', 'ux-ui', 'youtube', 'instagram', 'social-media'].includes(activeKey);
  const isSocialActive = ['youtube', 'instagram', 'social-media'].includes(activeKey);

  function renderHeader(container) {
    if (!container) return;

    container.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- Zone 1: Hamburger Menu Trigger (Left) + Sofia Wordmark -->
        <div class="flex items-center gap-3.5">
          <button
            id="hamburger-btn"
            type="button"
            class="flex items-center justify-center p-2 rounded-lg text-slate-300 hover:text-teal-300 hover:bg-[#101b26] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer"
            aria-label="Open navigation menu"
            aria-controls="left-hamburger-drawer"
            aria-expanded="false"
          >
            <svg class="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span class="sr-only">Toggle Menu</span>
          </button>

          <a href="index.html" class="group flex items-center text-lg font-bold font-title tracking-tight text-white hover:text-teal-300 transition-colors">
            <span>Sofia Monteiro</span>
          </a>
        </div>

        <!-- Zone 2: Navigation Links (Connected via href to separate pages) -->
        <nav class="hidden md:flex items-center gap-7" aria-label="Main Navigation">
          <a
            href="index.html"
            class="font-title text-sm tracking-tight py-1 transition-colors relative ${activeKey === 'home' ? 'text-teal-300 font-semibold' : 'text-slate-400 hover:text-slate-100 font-medium'}"
          >
            Home
            ${activeKey === 'home' ? '<span class="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"></span>' : ''}
          </a>

          <a
            href="about.html"
            class="font-title text-sm tracking-tight py-1 transition-colors relative ${activeKey === 'about' ? 'text-teal-300 font-semibold' : 'text-slate-400 hover:text-slate-100 font-medium'}"
          >
            About
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
              <span>Online Projects</span>
              <svg id="online-projects-chevron" class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown Menu (Piled vertically, clean navigation without descriptions or badge squares) -->
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
                <span class="font-title text-sm tracking-tight">Websites</span>
              </a>

              <a
                href="ux-ui.html"
                role="menuitem"
                class="group/item flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#121e2b] transition-all ${activeKey === 'ux-ui' ? 'bg-[#121e2b] text-cyan-300 font-medium' : ''}"
              >
                <svg class="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                <span class="font-title text-sm tracking-tight">UX/UI</span>
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
                    <span class="font-title text-sm tracking-tight">Social Media</span>
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
                    <span class="font-title text-sm tracking-tight">YouTube</span>
                  </a>

                  <a
                    href="instagram.html"
                    role="menuitem"
                    class="group/item flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#121e2b] transition-all ${activeKey === 'instagram' ? 'bg-[#121e2b] text-pink-300 font-medium' : ''}"
                  >
                    <svg class="w-4 h-4 text-pink-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span class="font-title text-sm tracking-tight">Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <a
            href="contact.html"
            class="font-title text-sm tracking-tight py-1 transition-colors relative ${activeKey === 'contact' ? 'text-teal-300 font-semibold' : 'text-slate-400 hover:text-slate-100 font-medium'}"
          >
            Contact
            ${activeKey === 'contact' ? '<span class="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"></span>' : ''}
          </a>
        </nav>

        <div class="hidden sm:block"></div>
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
                src="https://iili.io/naGxr8u.jpg"
                alt="Sofia"
                referrerpolicy="no-referrer"
                class="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <a href="index.html" class="font-title text-base font-semibold text-white tracking-tight hover:text-teal-300 transition-colors">
                Sofia Monteiro
              </a>
              <p class="text-xs text-slate-400 font-sans">Creative &amp; Digital Archive</p>
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

        <!-- Drawer Navigation Items -->
        <div class="flex-1 overflow-y-auto px-4 py-6">
          <div class="mb-3 px-3">
            <span class="text-xs font-semibold font-title tracking-wider uppercase text-teal-400/80">Navigation</span>
          </div>

          <nav class="space-y-1.5" aria-label="Sidebar Navigation">
            <a
              href="index.html"
              class="group flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-150 ${activeKey === 'home' ? 'bg-teal-950/40 text-teal-300 border border-teal-800/40 font-medium' : 'text-slate-300 hover:text-white hover:bg-[#101b26] border border-transparent'}"
            >
              <span class="font-title text-sm tracking-tight ${activeKey === 'home' ? 'text-teal-200' : 'group-hover:text-teal-200'}">Home</span>
              <svg class="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <a
              href="about.html"
              class="group flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-150 ${activeKey === 'about' ? 'bg-teal-950/40 text-teal-300 border border-teal-800/40 font-medium' : 'text-slate-300 hover:text-white hover:bg-[#101b26] border border-transparent'}"
            >
              <span class="font-title text-sm tracking-tight ${activeKey === 'about' ? 'text-teal-200' : 'group-hover:text-teal-200'}">About</span>
              <svg class="w-4 h-4 text-slate-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <!-- Online Projects Accordion (Streamlined without descriptions and without badges) -->
            <div class="rounded-xl border border-teal-950/70 bg-[#070e14]/50 overflow-hidden">
              <button
                type="button"
                id="drawer-projects-accordion-btn"
                class="w-full flex items-center justify-between p-3.5 text-left text-slate-300 hover:text-white hover:bg-[#101b26] transition-colors cursor-pointer"
                aria-expanded="${isOnlineProjectActive ? 'true' : 'false'}"
              >
                <div class="flex items-center gap-2.5">
                  <span class="font-title text-sm font-semibold tracking-tight ${isOnlineProjectActive ? 'text-teal-200' : ''}">Online Projects</span>
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
                  <span class="font-title text-sm tracking-tight">Websites</span>
                </a>

                <a href="ux-ui.html" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#0f1924] transition-all ${activeKey === 'ux-ui' ? 'bg-[#0f1924] text-cyan-200 font-medium' : ''}">
                  <svg class="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                  <span class="font-title text-sm tracking-tight">UX/UI</span>
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
                      <span class="font-title text-sm tracking-tight">Social Media</span>
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
                      <span class="font-title text-sm tracking-tight">YouTube</span>
                    </a>

                    <a href="instagram.html" class="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#0f1924] transition-all ${activeKey === 'instagram' ? 'bg-[#0f1924] text-pink-200 font-medium' : ''}">
                      <svg class="w-4 h-4 text-pink-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span class="font-title text-sm tracking-tight">Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="contact.html"
              class="group flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-150 ${activeKey === 'contact' ? 'bg-teal-950/40 text-teal-300 border border-teal-800/40 font-medium' : 'text-slate-300 hover:text-white hover:bg-[#101b26] border border-transparent'}"
            >
              <span class="font-title text-sm tracking-tight ${activeKey === 'contact' ? 'text-teal-200' : 'group-hover:text-teal-200'}">Contact</span>
              <svg class="w-4 h-4 text-slate-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </nav>
        </div>

        <div class="p-4 border-t border-teal-950/60 text-xs text-slate-400">
          <p>© <span class="drawer-copyright-year">2026</span> Sofia. All rights reserved.</p>
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
              <span class="font-title text-xl font-bold tracking-tight text-white">Sofia</span>
            </div>
            <p class="font-serif text-slate-300 text-base italic max-w-md">
              "Crafting calm, useful websites and thoughtful digital experiences."
            </p>
          </div>

          <nav class="flex flex-wrap items-center gap-6" aria-label="Footer Navigation">
            <a href="index.html" class="font-title text-sm ${activeKey === 'home' ? 'text-teal-300' : 'text-slate-400 hover:text-teal-300'} transition-colors">Home</a>
            <a href="about.html" class="font-title text-sm ${activeKey === 'about' ? 'text-teal-300' : 'text-slate-400 hover:text-teal-300'} transition-colors">About</a>
            <div class="flex items-center gap-3">
              <span class="font-title text-xs uppercase tracking-wider text-teal-400/80 font-semibold">Online Projects:</span>
              <a href="website.html" class="font-title text-sm ${activeKey === 'website' ? 'text-teal-300' : 'text-slate-400 hover:text-teal-300'} transition-colors">Websites</a>
              <a href="ux-ui.html" class="font-title text-sm ${activeKey === 'ux-ui' ? 'text-teal-300' : 'text-slate-400 hover:text-teal-300'} transition-colors">UX/UI</a>
              <a href="youtube.html" class="font-title text-sm ${activeKey === 'youtube' ? 'text-teal-300' : 'text-slate-400 hover:text-teal-300'} transition-colors">YouTube</a>
              <a href="instagram.html" class="font-title text-sm ${activeKey === 'instagram' ? 'text-teal-300' : 'text-slate-400 hover:text-teal-300'} transition-colors">Instagram</a>
            </div>
            <a href="contact.html" class="font-title text-sm ${activeKey === 'contact' ? 'text-teal-300' : 'text-slate-400 hover:text-teal-300'} transition-colors">Contact</a>
          </nav>
        </div>

        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-400">
          <div>
            <span>&copy; <span id="copyright-year">2026</span> Sofia. All rights reserved.</span>
          </div>

          <div class="flex items-center gap-4">
            <button id="back-to-top-btn" type="button" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a1118] hover:bg-[#101b26] text-slate-300 hover:text-white border border-teal-900/40 transition-colors cursor-pointer" aria-label="Back to top of page">
              <span>Back to Top</span>
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
    document.querySelectorAll('.drawer-copyright-year').forEach(el => el.textContent = currentYear);

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

      // Focus management: move focus into drawer
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

      // Return focus to menu trigger button
      if (hamburgerBtn) {
        hamburgerBtn.focus();
      } else if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        previousActiveElement.focus();
      }
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    // Keyboard handling: Escape to close & Tab trapping inside drawer
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

    // Online Projects Desktop Dropdown
    const opDropdown = document.getElementById('online-projects-dropdown');
    const opBtn = document.getElementById('online-projects-btn');
    const opMenu = document.getElementById('online-projects-menu');
    const opChevron = document.getElementById('online-projects-chevron');
    const socialSubTrigger = document.getElementById('online-projects-social-trigger');
    const socialSubMenu = document.getElementById('social-media-submenu');

    if (opDropdown && opBtn && opMenu) {
      let closeTimer = null;

      function showMenu() {
        if (closeTimer) clearTimeout(closeTimer);
        opMenu.classList.remove('hidden');
        opBtn.setAttribute('aria-expanded', 'true');
        if (opChevron) opChevron.classList.add('rotate-180', 'text-teal-400');
      }

      function hideMenu() {
        closeTimer = setTimeout(function () {
          opMenu.classList.add('hidden');
          opBtn.setAttribute('aria-expanded', 'false');
          if (opChevron) opChevron.classList.remove('rotate-180', 'text-teal-400');
          if (socialSubMenu) socialSubMenu.classList.add('hidden');
        }, 200);
      }

      opDropdown.addEventListener('mouseenter', showMenu);
      opDropdown.addEventListener('mouseleave', hideMenu);

      opBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (opMenu.classList.contains('hidden')) {
          showMenu();
        } else {
          opMenu.classList.add('hidden');
          opBtn.setAttribute('aria-expanded', 'false');
          if (opChevron) opChevron.classList.remove('rotate-180', 'text-teal-400');
        }
      });

      // Social Media submenu interaction
      if (socialSubTrigger && socialSubMenu) {
        socialSubTrigger.addEventListener('click', function (e) {
          e.stopPropagation();
          const isHidden = socialSubMenu.classList.contains('hidden');
          if (isHidden) {
            socialSubMenu.classList.remove('hidden');
            socialSubTrigger.setAttribute('aria-expanded', 'true');
          } else {
            socialSubMenu.classList.add('hidden');
            socialSubTrigger.setAttribute('aria-expanded', 'false');
          }
        });
      }

      document.addEventListener('click', function (e) {
        if (!opDropdown.contains(e.target)) {
          opMenu.classList.add('hidden');
          opBtn.setAttribute('aria-expanded', 'false');
          if (opChevron) opChevron.classList.remove('rotate-180', 'text-teal-400');
          if (socialSubMenu) socialSubMenu.classList.add('hidden');
        }
      });
    }

    // Online Projects Drawer Accordion Toggle
    const drawerAccBtn = document.getElementById('drawer-projects-accordion-btn');
    const drawerSublist = document.getElementById('drawer-projects-sublist');
    const drawerChevron = document.getElementById('drawer-projects-chevron');

    if (drawerAccBtn && drawerSublist) {
      drawerAccBtn.addEventListener('click', function () {
        const isHidden = drawerSublist.classList.contains('hidden');
        if (isHidden) {
          drawerSublist.classList.remove('hidden');
          drawerAccBtn.setAttribute('aria-expanded', 'true');
          if (drawerChevron) drawerChevron.classList.add('rotate-180', 'text-teal-400');
        } else {
          drawerSublist.classList.add('hidden');
          drawerAccBtn.setAttribute('aria-expanded', 'false');
          if (drawerChevron) drawerChevron.classList.remove('rotate-180', 'text-teal-400');
        }
      });
    }

    // Drawer Social Media Accordion Toggle
    const drawerSocialBtn = document.getElementById('drawer-social-accordion-btn');
    const drawerSocialSublist = document.getElementById('drawer-social-sublist');
    const drawerSocialChevron = document.getElementById('drawer-social-chevron');

    if (drawerSocialBtn && drawerSocialSublist) {
      drawerSocialBtn.addEventListener('click', function () {
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLayout);
  } else {
    initLayout();
  }
})();
