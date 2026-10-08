/**
 * Sofia OS — Global Web Browser & Site-Wide Folder Directory Explorer
 * Provides seamless browser address bar navigation, folder tree browsing,
 * autocomplete search, history, bookmarks, and video player across the entire website.
 */

(function () {
  const SITE_DIRECTORY = [
    // Root
    {
      id: 'root',
      type: 'folder',
      title: 'Sofia Root Archive',
      category: 'Root Directory',
      badge: 'Root',
      path: 'sofia://',
      href: 'index.html',
      description: 'Root master directory of Sofia’s entire digital portfolio, documentation, everyday tools, and media.',
    },
    // Home
    {
      id: 'home',
      type: 'folder',
      title: 'Home (Portfolio & Welcome)',
      category: 'Folder',
      badge: 'Home',
      path: 'sofia://home',
      href: 'index.html',
      description: 'Welcome portal, design manifesto, and quick directory launcher.',
    },
    {
      id: 'home-intro',
      type: 'doc',
      title: 'Welcome & Creative Introduction',
      category: 'Home Section',
      badge: 'Intro',
      path: 'sofia://home/welcome',
      href: 'index.html#hero',
      description: 'Sofia’s digital archive introduction, creative statement, and everyday web tools portfolio.',
    },
    {
      id: 'home-philosophy',
      type: 'doc',
      title: 'Calm & Purposeful Digital Philosophy',
      category: 'Home Section',
      badge: 'Philosophy',
      path: 'sofia://home/philosophy',
      href: 'index.html#hero',
      description: 'Designing quiet, focused software that prioritizes human well-being, clarity, and daily utility.',
    },
    {
      id: 'home-featured-tools',
      type: 'doc',
      title: 'Featured Tools & Quick Access',
      category: 'Home Section',
      badge: 'Launcher',
      path: 'sofia://home/featured-tools',
      href: 'website.html',
      description: 'Quick launcher for Paroxetine Taper Guide, Typing Pro, Easy Doc, and High Octane racing.',
    },
    // About
    {
      id: 'about',
      type: 'folder',
      title: 'About (In-Depth Dossier)',
      category: 'Folder',
      badge: 'About',
      path: 'sofia://about',
      href: 'about.html',
      description: 'Background biography, core design principles, tech stack, milestones timeline, and detailed archive records.',
    },
    {
      id: 'about-bio',
      type: 'doc',
      title: 'Background & Creative Story',
      category: 'About Dossier',
      badge: 'Biography',
      path: 'sofia://about/biography',
      href: 'about.html#biography',
      description: 'The journey, background, and ethos of building software for genuine everyday human needs.',
    },
    {
      id: 'about-principles',
      type: 'doc',
      title: 'Design Principles & Craft',
      category: 'About Dossier',
      badge: 'Principles',
      path: 'sofia://about/principles',
      href: 'about.html#principles',
      description: 'Understated aesthetics, tactile typography, Dieter Rams simplicity, and dark mode design.',
    },
    {
      id: 'about-skills',
      type: 'doc',
      title: 'Technical Skills & Architecture',
      category: 'About Dossier',
      badge: 'Tech Stack',
      path: 'sofia://about/skills',
      href: 'about.html#skills',
      description: 'TypeScript, React, modern web standards, performance budgeting, and responsive systems.',
    },
    {
      id: 'about-milestones',
      type: 'doc',
      title: 'Chronological Milestones & Timeline',
      category: 'About Dossier',
      badge: 'Timeline',
      path: 'sofia://about/timeline',
      href: 'about.html#milestones',
      description: 'Key developmental milestones, project releases, and evolving creative disciplines.',
    },
    {
      id: 'about-dossier',
      type: 'doc',
      title: 'Curated Archive Dossier Cards',
      category: 'About Dossier',
      badge: 'Dossier',
      path: 'sofia://about/dossier',
      href: 'about.html#dossier',
      description: 'Interactive categorized dossier cards detailing every digital instrument and focus area.',
    },
    // Websites
    {
      id: 'websites',
      type: 'folder',
      title: 'Websites & Media Directory',
      category: 'Folder',
      badge: 'Websites',
      path: 'sofia://websites',
      href: 'website.html',
      description: 'Live everyday web applications and curated YouTube video channels with full playback.',
    },
    {
      id: 'tools',
      type: 'folder',
      title: 'Everyday Web Tools',
      category: 'Tools Folder',
      badge: 'Tools',
      path: 'sofia://websites/tools',
      href: 'website.html#tools',
      description: 'Independent live websites built for daily health, typing, document export, and 3D arcade racing.',
    },
    {
      id: 'paroxetine-taper-guide',
      type: 'website',
      title: 'Paroxetine Taper Guide',
      category: 'Health Tool',
      badge: 'Live Tracker',
      path: 'sofia://websites/tools/paroxetine-taper',
      href: 'website.html#paroxetine-taper-guide',
      url: 'https://paroxetine-taper-guide.vercel.app',
      description: 'A live tracker and guidance tool to help individuals safely and gradually taper paroxetine with custom dosage schedules.',
    },
    {
      id: 'typing-pro',
      type: 'website',
      title: 'Typing Pro',
      category: 'Productivity Tool',
      badge: 'Speed Trainer',
      path: 'sofia://websites/tools/typing-pro',
      href: 'website.html#typing-pro',
      url: 'https://typing-practice-steel.vercel.app',
      description: 'An interactive typing trainer designed to help anyone type faster and improve muscle memory with real-time WPM calculation.',
    },
    {
      id: 'easy-doc',
      type: 'website',
      title: 'Easy Doc',
      category: 'Utility Tool',
      badge: 'Doc Generator',
      path: 'sofia://websites/tools/easy-doc',
      href: 'website.html#easy-doc',
      url: 'https://easy-doc-2-0.vercel.app',
      description: 'Document generator made easy — create, format, customize, and export clean, structured documents effortlessly without complex software.',
    },
    {
      id: 'high-octane',
      type: 'website',
      title: 'High Octane',
      category: 'Gaming & Interactive',
      badge: 'Online Racing',
      path: 'sofia://websites/tools/high-octane',
      href: 'website.html#high-octane',
      url: 'https://high-octane-murex.vercel.app/',
      description: 'An action-packed online racing video game featuring high-speed competition, challenging tracks, and responsive vehicle handling in the browser.',
    },
    // YouTube Channels
    {
      id: 'youtube',
      type: 'folder',
      title: 'YouTube Channels & Curated Media',
      category: 'Media Folder',
      badge: 'Media',
      path: 'sofia://websites/youtube',
      href: 'website.html#youtube',
      description: 'Curated video channels covering creative coding, design craft, ambient focus, and game physics.',
    },
    {
      id: 'creative-coding',
      type: 'channel',
      title: 'Creative Coding & Tech Craft',
      category: 'YouTube Channel',
      badge: '@creative-code',
      path: 'sofia://websites/youtube/creative-coding',
      href: 'website.html#creative-coding',
      url: 'https://www.youtube.com',
      description: 'Algorithmic art, web experimentation, and the craft of modern software design.',
    },
    {
      id: 'creative-coding-1',
      type: 'video',
      title: 'The Art & Architecture of Creative Web Coding',
      category: 'Coding Video',
      badge: '14:20',
      path: 'sofia://websites/youtube/creative-coding/art-of-coding',
      href: 'website.html#video-70MQ-FugwbI',
      youtubeId: '70MQ-FugwbI',
      description: 'Exploring how mathematical beauty, canvas rendering, and code converge to build inspiring interactive experiences on the open web.',
    },
    {
      id: 'creative-coding-2',
      type: 'video',
      title: 'Building Purposeful Everyday Micro-Tools in 100 Seconds',
      category: 'Coding Video',
      badge: '06:45',
      path: 'sofia://websites/youtube/creative-coding/micro-tools',
      href: 'website.html#video-W6NZfCO5SIk',
      youtubeId: 'W6NZfCO5SIk',
      description: 'A breakdown of modern web engineering fundamentals, clean architecture, and lightweight reactive state design.',
    },
    {
      id: 'design-craft',
      type: 'channel',
      title: 'Design Philosophy & Typography',
      category: 'YouTube Channel',
      badge: '@design-systems',
      path: 'sofia://websites/youtube/design-craft',
      href: 'website.html#design-craft',
      url: 'https://www.youtube.com',
      description: 'Dieter Rams principles, editorial layouts, serif typography, and tactile digital craftsmanship.',
    },
    {
      id: 'design-craft-1',
      type: 'video',
      title: 'Dieter Rams: Ten Principles for Good Design in Practice',
      category: 'Design Video',
      badge: '18:50',
      path: 'sofia://websites/youtube/design-craft/dieter-rams-principles',
      href: 'website.html#video-TR3vC4Aon9c',
      youtubeId: 'TR3vC4Aon9c',
      description: 'Timeless principles of honest, understated, and functional design applied to modern software and physical instruments.',
    },
    {
      id: 'design-craft-2',
      type: 'video',
      title: 'The Timeless Art of Typography & Visual Reading Rhythm',
      category: 'Design Video',
      badge: '12:15',
      path: 'sofia://websites/youtube/design-craft/typography-rhythm',
      href: 'website.html#video-sByzHoi8FZ0',
      youtubeId: 'sByzHoi8FZ0',
      description: 'How letterforms, line-heights, baseline grids, and serif proportions create contemplative reading spaces for human minds.',
    },
    {
      id: 'ambient-focus',
      type: 'channel',
      title: 'Ambient Soundscapes & Focus',
      category: 'YouTube Channel',
      badge: '@deep-flow',
      path: 'sofia://websites/youtube/ambient-focus',
      href: 'website.html#ambient-focus',
      url: 'https://www.youtube.com',
      description: 'Calm auditory textures, binaural soundscapes, and lofi rhythms designed for deep, uninterrupted creative work.',
    },
    {
      id: 'ambient-focus-1',
      type: 'video',
      title: 'Synthwave & Deep Lofi Beats to Code and Create',
      category: 'Audio Video',
      badge: 'Live',
      path: 'sofia://websites/youtube/ambient-focus/synthwave-beats',
      href: 'website.html#video-4xDzrJKXOOY',
      youtubeId: '4xDzrJKXOOY',
      description: 'Atmospheric nocturnal soundscapes blending retro synthesizers, gentle tempo, and steady cadence for deep coding sessions.',
    },
    {
      id: 'ambient-focus-2',
      type: 'video',
      title: 'Ethereal Generative Ambient Soundscape for Deep Solitude',
      category: 'Audio Video',
      badge: '45:00',
      path: 'sofia://websites/youtube/ambient-focus/ethereal-generative',
      href: 'website.html#video-DWcJFNfaw90',
      youtubeId: 'DWcJFNfaw90',
      description: 'Continuous drone textures and gentle harmonic tape delays designed to eliminate friction and sustain long-form contemplation.',
    },
    {
      id: 'game-dev',
      type: 'channel',
      title: 'Arcade Racing & 3D Interactive Tech',
      category: 'YouTube Channel',
      badge: '@racing-physics',
      path: 'sofia://websites/youtube/game-dev',
      href: 'website.html#game-dev',
      url: 'https://www.youtube.com',
      description: 'Physics simulation, vehicle handling dynamics, track generation, and high-performance browser gaming.',
    },
    {
      id: 'game-dev-1',
      type: 'video',
      title: 'Building High-Speed Arcade Racing Physics in the Browser',
      category: 'Racing Video',
      badge: '21:30',
      path: 'sofia://websites/youtube/game-dev/racing-physics',
      href: 'website.html#video-kGAqH6BDT94',
      youtubeId: 'kGAqH6BDT94',
      description: 'From tire friction curves to drift momentum: mathematical modeling of responsive arcade racing games like High Octane.',
    },
    {
      id: 'game-dev-2',
      type: 'video',
      title: 'Procedural Track Generation & High-Performance Rendering',
      category: 'Racing Video',
      badge: '16:40',
      path: 'sofia://websites/youtube/game-dev/procedural-tracks',
      href: 'website.html#video-7JzKxZ-0uKk',
      youtubeId: '7JzKxZ-0uKk',
      description: 'How procedural splines, shader lighting, and 60fps frame budgeting make web-based racing games feel immediate and kinetic.',
    },
    // Contact
    {
      id: 'contact',
      type: 'folder',
      title: 'Contact & Inquiry',
      category: 'Folder',
      badge: 'Contact',
      path: 'sofia://contact',
      href: 'contact.html',
      description: 'Direct communication channels, message form, availability status, and email address.',
    },
    {
      id: 'contact-message',
      type: 'doc',
      title: 'Direct Inquiry Form',
      category: 'Contact Section',
      badge: 'Message',
      path: 'sofia://contact/message',
      href: 'contact.html#message',
      description: 'Interactive communication form for project inquiries, collaborations, and questions.',
    },
    {
      id: 'contact-channels',
      type: 'doc',
      title: 'Communication Channels & Profiles',
      category: 'Contact Section',
      badge: 'Channels',
      path: 'sofia://contact/channels',
      href: 'contact.html#channels',
      description: 'Direct email (Sofiadmm58@gmail.com), verified profiles, and communication channels.',
    },
    {
      id: 'contact-availability',
      type: 'doc',
      title: 'Availability & Response Schedule',
      category: 'Contact Section',
      badge: 'Status',
      path: 'sofia://contact/availability',
      href: 'contact.html#status',
      description: 'Active status, current capacity for new digital projects, and average response times.',
    },
  ];

  function resolveSitePath(input) {
    if (!input) return null;
    let norm = input.trim().toLowerCase().replace(/^sofia:\/\//, '').replace(/^\/+/, '');
    if (!norm) return SITE_DIRECTORY.find((i) => i.id === 'root');

    // Exact path
    let exact = SITE_DIRECTORY.find(
      (i) => i.path.toLowerCase() === 'sofia://' + norm || i.path.toLowerCase() === norm
    );
    if (exact) return exact;

    // Exact id
    let idMatch = SITE_DIRECTORY.find((i) => i.id.toLowerCase() === norm);
    if (idMatch) return idMatch;

    // Fuzzy
    return SITE_DIRECTORY.find(
      (i) =>
        i.title.toLowerCase().includes(norm) ||
        i.path.toLowerCase().includes(norm) ||
        i.badge.toLowerCase().includes(norm) ||
        i.description.toLowerCase().includes(norm)
    );
  }

  window.initSiteBrowserAndExplorer = function (config) {
    const pageId = config.pageId || 'home';
    const currentVirtualPath =
      pageId === 'home'
        ? 'sofia://home'
        : pageId === 'about'
        ? 'sofia://about'
        : pageId === 'websites'
        ? 'sofia://websites'
        : pageId === 'contact'
        ? 'sofia://contact'
        : 'sofia://';

    // 1. Inject Global Browser Chrome & Address Bar
    const headerEl = document.querySelector('header');
    if (headerEl && !document.getElementById('global-site-browser-bar')) {
      const barContainer = document.createElement('div');
      barContainer.id = 'global-site-browser-bar';
      barContainer.className =
        'w-full bg-[#0a121a] border-b border-teal-900/40 text-slate-200 select-none transition-all shadow-lg relative z-20';

      barContainer.innerHTML = `
        <!-- Chrome Header Status Bar -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2.5 pb-1 flex items-center justify-between text-xs border-b border-teal-950/60 font-mono text-slate-400">
          <div class="flex items-center gap-2.5">
            <div class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block shadow-sm"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block shadow-sm"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block shadow-sm"></span>
            </div>
            <span class="text-[11px] text-teal-300/90 font-medium tracking-tight flex items-center gap-1.5 ml-2">
              <svg class="w-3.5 h-3.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
              </svg>
              <span>Sofia OS · Unified Folder Directory &amp; Web Browser</span>
            </span>
          </div>

          <div class="hidden sm:flex items-center gap-4 text-[11px] text-slate-400">
            <span class="flex items-center gap-1 text-slate-400">
              <span class="text-teal-400">●</span> Active Protocol: <code class="text-teal-300">sofia://</code>
            </span>
            <button
              id="global-open-tree-btn-top"
              type="button"
              class="text-[11px] font-sans px-2 py-0.5 rounded bg-teal-950/70 border border-teal-800/50 text-teal-300 hover:bg-teal-900/60 hover:text-white transition-all flex items-center gap-1"
            >
              <span>Press</span>
              <kbd class="px-1 py-0.2 bg-black/40 rounded border border-teal-700/50 text-[10px]">⌘K</kbd>
              <span>for Folder Tree</span>
            </button>
          </div>
        </div>

        <!-- Main Address Bar Row -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row items-stretch md:items-center gap-2 sm:gap-3">
          <!-- Navigation Controls -->
          <div class="flex items-center gap-1 shrink-0">
            <button
              id="global-bar-back"
              type="button"
              title="Go back"
              class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-teal-950/60 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button
              id="global-bar-forward"
              type="button"
              title="Go forward"
              class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-teal-950/60 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
            <button
              id="global-bar-reload"
              type="button"
              title="Reload location"
              class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-teal-950/60 transition-colors"
            >
              <svg id="global-reload-icon" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            </button>
            <a
              href="index.html"
              title="Go to Home (sofia://home)"
              class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-teal-950/60 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            </a>
          </div>

          <!-- Omnipresent Address Bar Input -->
          <div class="flex-1 relative">
            <form id="global-address-form" class="m-0 p-0 flex items-center bg-[#060b10] border border-teal-900/50 hover:border-teal-700/60 rounded-xl px-3 py-1.5 transition-all shadow-inner focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-500/20">
              <div class="flex items-center gap-1.5 text-teal-400 mr-2 shrink-0 select-none">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                <span class="text-xs font-mono font-semibold text-teal-400/90">sofia://</span>
              </div>

              <input
                id="global-address-input"
                type="text"
                autocomplete="off"
                value="${currentVirtualPath.replace(/^sofia:\/\//, '')}"
                placeholder="Type any section, website, folder, or video (e.g. websites, taper, racing, about, contact)..."
                class="flex-1 bg-transparent text-sm font-mono text-slate-100 placeholder:text-slate-500 placeholder:font-sans focus:outline-none tracking-tight"
              />

              <div class="flex items-center gap-1 shrink-0 ml-2">
                <button
                  id="global-copy-path-btn"
                  type="button"
                  title="Copy current address"
                  class="p-1 rounded text-slate-400 hover:text-teal-300 hover:bg-teal-950/40 transition-colors"
                >
                  <svg id="global-copy-icon" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                </button>
                <button
                  type="submit"
                  title="Jump to address"
                  class="px-2 py-0.5 rounded text-xs font-sans font-medium bg-teal-900/60 hover:bg-teal-800 text-teal-200 border border-teal-700/60 transition-colors"
                >
                  Go
                </button>
              </div>
            </form>

            <!-- Autocomplete Dropdown -->
            <div
              id="global-address-dropdown"
              class="hidden absolute top-full left-0 right-0 mt-1.5 bg-[#09121a] border border-teal-800/60 rounded-xl shadow-2xl py-2 max-h-80 overflow-y-auto z-50 backdrop-blur-md font-sans"
            >
              <div class="px-3 py-1 text-[11px] font-title font-semibold text-teal-400 uppercase tracking-wider flex justify-between items-center border-b border-teal-950/60 mb-1">
                <span>Direct Navigation Suggestions</span>
                <span class="text-slate-500 lowercase font-normal">Press Enter or click</span>
              </div>
              <div id="global-suggestions-list"></div>
            </div>
          </div>

          <!-- Global Action: Open Full Folder Tree Modal -->
          <button
            id="global-open-tree-btn-main"
            type="button"
            class="shrink-0 flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-950 to-teal-900 hover:from-teal-900 hover:to-teal-800 text-teal-200 border border-teal-700/60 shadow-md text-xs font-title font-medium transition-all group"
            title="Browse entire website as interactive folder structure (⌘K)"
          >
            <svg class="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"/></svg>
            <span>Browse Site Folders</span>
            <span class="hidden lg:inline-block text-[10px] bg-black/40 px-1.5 py-0.5 rounded border border-teal-700/40 text-teal-300 font-mono">
              Tree View
            </span>
          </button>
        </div>

        <!-- Bookmarks Bar -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-2 flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
          <span class="text-[10px] uppercase font-title font-bold text-slate-500 tracking-wider mr-1 shrink-0">
            Bookmarks:
          </span>

          <a
            href="index.html"
            class="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-title transition-colors ${
              pageId === 'home'
                ? 'bg-teal-950 text-teal-300 border-teal-700/70 font-semibold'
                : 'bg-[#060b10] text-slate-300 border-teal-950 hover:border-teal-800 hover:text-white'
            }"
          >
            <span>🏠</span>
            <span>Home</span>
          </a>

          <a
            href="about.html"
            class="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-title transition-colors ${
              pageId === 'about'
                ? 'bg-teal-950 text-teal-300 border-teal-700/70 font-semibold'
                : 'bg-[#060b10] text-slate-300 border-teal-950 hover:border-teal-800 hover:text-white'
            }"
          >
            <span>👤</span>
            <span>About Dossier</span>
          </a>

          <a
            href="website.html"
            class="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-title transition-colors ${
              pageId === 'websites'
                ? 'bg-teal-950 text-teal-300 border-teal-700/70 font-semibold'
                : 'bg-[#060b10] text-slate-300 border-teal-950 hover:border-teal-800 hover:text-white'
            }"
          >
            <span>🌐</span>
            <span>Websites Directory</span>
          </a>

          <a
            href="website.html#tools"
            class="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-title bg-[#060b10] text-slate-300 border-teal-950 hover:border-teal-800 hover:text-white transition-colors"
          >
            <span>🛠️</span>
            <span>Everyday Tools</span>
          </a>

          <a
            href="website.html#youtube"
            class="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-title bg-[#060b10] text-slate-300 border-teal-950 hover:border-teal-800 hover:text-white transition-colors"
          >
            <span>🎬</span>
            <span>YouTube Channels</span>
          </a>

          <a
            href="https://high-octane-murex.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            class="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-title bg-[#060b10] text-amber-300 border-teal-950 hover:border-amber-700/60 transition-colors"
          >
            <span>🏎️</span>
            <span>High Octane (Game)</span>
          </a>

          <a
            href="contact.html"
            class="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-title transition-colors ${
              pageId === 'contact'
                ? 'bg-teal-950 text-teal-300 border-teal-700/70 font-semibold'
                : 'bg-[#060b10] text-slate-300 border-teal-950 hover:border-teal-800 hover:text-white'
            }"
          >
            <span>✉️</span>
            <span>Contact</span>
          </a>

          <button
            id="global-open-tree-btn-bookmark"
            type="button"
            class="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg border border-teal-800/40 bg-teal-950/40 text-teal-300 hover:bg-teal-900/60 transition-colors ml-auto text-xs"
          >
            <span>📂</span>
            <span>Full Site Hierarchy (⌘K)</span>
          </button>
        </div>
      `;

      headerEl.parentNode.insertBefore(barContainer, headerEl.nextSibling);
    }

    // 2. Inject Floating "Site Directory Tree" Button in Bottom Left
    if (!document.getElementById('floating-site-directory-btn')) {
      const floatBtn = document.createElement('div');
      floatBtn.id = 'floating-site-directory-btn';
      floatBtn.className = 'fixed bottom-5 left-5 z-30';
      floatBtn.innerHTML = `
        <button
          id="global-floating-open-tree"
          type="button"
          class="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#09141f]/95 hover:bg-[#0f2030] text-teal-300 hover:text-white border border-teal-800/60 shadow-2xl backdrop-blur-md text-xs font-title font-semibold transition-all group"
          title="Browse entire website folder hierarchy (⌘K)"
        >
          <svg class="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"/></svg>
          <span>Site Directory Tree</span>
          <span class="hidden sm:inline-block text-[10px] bg-teal-950/90 text-teal-400 border border-teal-800/50 px-1.5 py-0.2 rounded font-mono">⌘K</span>
        </button>
      `;
      document.body.appendChild(floatBtn);
    }

    // 3. Inject Global Folder Tree Modal
    if (!document.getElementById('global-folder-tree-modal')) {
      const modal = document.createElement('div');
      modal.id = 'global-folder-tree-modal';
      modal.className =
        'fixed inset-0 z-50 hidden items-center justify-center p-2 sm:p-4 md:p-6 bg-[#04080c]/85 backdrop-blur-md';
      modal.innerHTML = `
        <div class="w-full max-w-6xl h-[92vh] max-h-[850px] bg-[#091119] border border-teal-800/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-sans">
          <!-- Window Chrome Header -->
          <div class="bg-[#050b10] px-4 py-3 border-b border-teal-950 flex items-center justify-between select-none">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-1.5">
                <button id="modal-close-dot" type="button" class="w-3 h-3 rounded-full bg-rose-500/90 hover:bg-rose-400 inline-block transition-transform hover:scale-110"></button>
                <span class="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span class="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>
              <div class="flex items-center gap-2 text-xs font-title font-semibold text-white ml-2">
                <svg class="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"/></svg>
                <span>Sofia OS · Complete Website Folder Tree &amp; File Directory</span>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <div class="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <span class="text-teal-400">●</span>
                <span>Browsing Virtual Filesystem</span>
              </div>
              <button id="modal-close-x" type="button" class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-teal-950/60 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          </div>

          <!-- Search Bar & Controls Header -->
          <div class="bg-[#070e15] p-3 sm:p-4 border-b border-teal-900/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div class="flex items-center gap-2 bg-[#04080d] border border-teal-900/50 rounded-xl px-3 py-1.5 flex-1 max-w-xl">
              <span class="text-xs font-mono font-bold text-teal-400 shrink-0">ACTIVE PATH:</span>
              <span id="modal-active-path-label" class="text-xs font-mono text-teal-200 truncate">sofia://</span>
            </div>

            <div class="relative w-full sm:w-72">
              <svg class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input
                id="modal-tree-search-input"
                type="text"
                placeholder="Filter site files & folders..."
                class="w-full bg-[#050b10] border border-teal-900/60 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-teal-400 transition-colors"
              />
            </div>
          </div>

          <!-- Main Split Layout -->
          <div class="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden bg-[#070d13]">
            <!-- Tree Navigation (5 cols) -->
            <div id="modal-tree-container" class="md:col-span-5 border-r border-teal-900/40 overflow-y-auto p-4 space-y-1 bg-[#081017]">
              <!-- Generated dynamically -->
            </div>

            <!-- Preview Card (7 cols) -->
            <div class="md:col-span-7 p-6 overflow-y-auto flex flex-col justify-between bg-[#070d13]">
              <div id="modal-preview-content">
                <!-- Selected item details -->
              </div>
              <div class="pt-6 border-t border-teal-950/80 flex items-center justify-between">
                <span class="text-xs text-slate-500 font-mono">Select any node to view details or launch</span>
                <div class="flex items-center gap-2">
                  <button id="modal-btn-cancel" type="button" class="px-4 py-2 rounded-xl text-xs font-title text-slate-400 hover:text-white transition-colors">
                    Close
                  </button>
                  <a id="modal-btn-action" href="#" class="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-title font-semibold text-xs shadow-lg transition-colors">
                    <span>Navigate to Section</span>
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    // 4. Modal Open/Close Logic
    const modalEl = document.getElementById('global-folder-tree-modal');
    function openFolderModal(targetPath) {
      if (!modalEl) return;
      modalEl.classList.remove('hidden');
      modalEl.classList.add('flex');
      document.body.style.overflow = 'hidden';
      renderFolderTree(targetPath || currentVirtualPath);
      updateModalPreview(targetPath || currentVirtualPath);
    }

    function closeFolderModal() {
      if (!modalEl) return;
      modalEl.classList.add('hidden');
      modalEl.classList.remove('flex');
      document.body.style.overflow = '';
    }

    document.getElementById('modal-close-dot')?.addEventListener('click', closeFolderModal);
    document.getElementById('modal-close-x')?.addEventListener('click', closeFolderModal);
    document.getElementById('modal-btn-cancel')?.addEventListener('click', closeFolderModal);

    // Triggers
    document.getElementById('global-open-tree-btn-top')?.addEventListener('click', () => openFolderModal());
    document.getElementById('global-open-tree-btn-main')?.addEventListener('click', () => openFolderModal());
    document.getElementById('global-open-tree-btn-bookmark')?.addEventListener('click', () => openFolderModal());
    document.getElementById('global-floating-open-tree')?.addEventListener('click', () => openFolderModal());

    // 5. Render Folder Tree in Modal
    function renderFolderTree(selectedPath) {
      const container = document.getElementById('modal-tree-container');
      if (!container) return;

      const activePathLabel = document.getElementById('modal-active-path-label');
      if (activePathLabel) activePathLabel.textContent = selectedPath;

      const searchTerm = (document.getElementById('modal-tree-search-input')?.value || '').trim().toLowerCase();

      if (searchTerm) {
        // Filter mode
        const matched = SITE_DIRECTORY.filter(
          (i) =>
            i.title.toLowerCase().includes(searchTerm) ||
            i.path.toLowerCase().includes(searchTerm) ||
            i.badge.toLowerCase().includes(searchTerm) ||
            i.description.toLowerCase().includes(searchTerm)
        );

        let html = `<div class="text-[11px] font-title font-semibold uppercase text-teal-400 mb-2 px-1">Search Results (${matched.length})</div>`;
        if (matched.length === 0) {
          html += `<div class="p-4 text-center text-xs text-slate-400">No items matching "${searchTerm}"</div>`;
        } else {
          matched.forEach((item) => {
            const isSel = item.path === selectedPath;
            html += `
              <div data-tree-path="${item.path}" class="modal-tree-item px-3 py-2 rounded-xl text-xs flex items-center justify-between cursor-pointer transition-colors ${
              isSel
                ? 'bg-teal-950 text-teal-300 border border-teal-700/60 font-medium'
                : 'text-slate-300 hover:bg-[#0d1c29] hover:text-white'
            }">
                <div class="flex items-center gap-2 min-w-0">
                  <span class="font-mono text-xs">${item.type === 'folder' ? '📁' : item.type === 'website' ? '🌐' : item.type === 'video' ? '🎬' : '📄'}</span>
                  <span class="truncate">${item.title}</span>
                </div>
                <span class="text-[10px] font-mono text-slate-500 ml-2 shrink-0">${item.badge}</span>
              </div>
            `;
          });
        }
        container.innerHTML = html;
      } else {
        // Standard hierarchy
        container.innerHTML = `
          <div class="text-xs space-y-1 select-none">
            <!-- Root -->
            <div data-tree-path="sofia://" class="modal-tree-item px-2.5 py-1.5 rounded-lg cursor-pointer flex items-center justify-between ${
              selectedPath === 'sofia://' ? 'bg-teal-950 text-teal-300 font-semibold border border-teal-800/60' : 'text-slate-200 hover:bg-[#0c1824]'
            }">
              <div class="flex items-center gap-2">
                <span class="font-mono">📂</span>
                <span class="font-title font-medium">sofia:// (Master Archive)</span>
              </div>
              <span class="text-[10px] font-mono text-teal-500">root</span>
            </div>

            <div class="pl-4 border-l border-teal-950/80 ml-2 space-y-1.5 mt-1">
              <!-- Home Folder -->
              <div>
                <div data-tree-path="sofia://home" class="modal-tree-item px-2 py-1.5 rounded-lg cursor-pointer flex items-center justify-between ${
                  selectedPath === 'sofia://home' ? 'bg-teal-950 text-teal-300 font-semibold' : 'text-slate-300 hover:bg-[#0c1824]'
                }">
                  <span class="font-title font-medium">📁 home/</span>
                  <span class="text-[10px] text-slate-500 font-mono">3 files</span>
                </div>
                <div class="pl-4 space-y-0.5 mt-0.5 border-l border-teal-950/40 ml-2">
                  <div data-tree-path="sofia://home/welcome" class="modal-tree-item px-2 py-1 rounded cursor-pointer text-slate-400 hover:text-slate-200 hover:bg-[#0c1824] truncate ${selectedPath === 'sofia://home/welcome' ? 'bg-teal-950 text-teal-300 font-medium' : ''}">📄 Welcome & Creative Intro</div>
                  <div data-tree-path="sofia://home/philosophy" class="modal-tree-item px-2 py-1 rounded cursor-pointer text-slate-400 hover:text-slate-200 hover:bg-[#0c1824] truncate ${selectedPath === 'sofia://home/philosophy' ? 'bg-teal-950 text-teal-300 font-medium' : ''}">📄 Calm Digital Philosophy</div>
                  <div data-tree-path="sofia://home/featured-tools" class="modal-tree-item px-2 py-1 rounded cursor-pointer text-slate-400 hover:text-slate-200 hover:bg-[#0c1824] truncate ${selectedPath === 'sofia://home/featured-tools' ? 'bg-teal-950 text-teal-300 font-medium' : ''}">📄 Featured Tools Launcher</div>
                </div>
              </div>

              <!-- About Folder -->
              <div>
                <div data-tree-path="sofia://about" class="modal-tree-item px-2 py-1.5 rounded-lg cursor-pointer flex items-center justify-between ${
                  selectedPath === 'sofia://about' ? 'bg-teal-950 text-teal-300 font-semibold' : 'text-slate-300 hover:bg-[#0c1824]'
                }">
                  <span class="font-title font-medium">📁 about/ (Dossier)</span>
                  <span class="text-[10px] text-slate-500 font-mono">5 records</span>
                </div>
                <div class="pl-4 space-y-0.5 mt-0.5 border-l border-teal-950/40 ml-2">
                  <div data-tree-path="sofia://about/biography" class="modal-tree-item px-2 py-1 rounded cursor-pointer text-slate-400 hover:text-slate-200 hover:bg-[#0c1824] truncate ${selectedPath === 'sofia://about/biography' ? 'bg-teal-950 text-teal-300 font-medium' : ''}">📄 Background & Story</div>
                  <div data-tree-path="sofia://about/principles" class="modal-tree-item px-2 py-1 rounded cursor-pointer text-slate-400 hover:text-slate-200 hover:bg-[#0c1824] truncate ${selectedPath === 'sofia://about/principles' ? 'bg-teal-950 text-teal-300 font-medium' : ''}">📄 Design Principles</div>
                  <div data-tree-path="sofia://about/skills" class="modal-tree-item px-2 py-1 rounded cursor-pointer text-slate-400 hover:text-slate-200 hover:bg-[#0c1824] truncate ${selectedPath === 'sofia://about/skills' ? 'bg-teal-950 text-teal-300 font-medium' : ''}">📄 Tech Skills & Architecture</div>
                  <div data-tree-path="sofia://about/timeline" class="modal-tree-item px-2 py-1 rounded cursor-pointer text-slate-400 hover:text-slate-200 hover:bg-[#0c1824] truncate ${selectedPath === 'sofia://about/timeline' ? 'bg-teal-950 text-teal-300 font-medium' : ''}">📄 Milestones Timeline</div>
                  <div data-tree-path="sofia://about/dossier" class="modal-tree-item px-2 py-1 rounded cursor-pointer text-slate-400 hover:text-slate-200 hover:bg-[#0c1824] truncate ${selectedPath === 'sofia://about/dossier' ? 'bg-teal-950 text-teal-300 font-medium' : ''}">📄 Curated Dossier Cards</div>
                </div>
              </div>

              <!-- Websites Folder -->
              <div>
                <div data-tree-path="sofia://websites" class="modal-tree-item px-2 py-1.5 rounded-lg cursor-pointer flex items-center justify-between ${
                  selectedPath === 'sofia://websites' ? 'bg-teal-950 text-teal-300 font-semibold' : 'text-slate-300 hover:bg-[#0c1824]'
                }">
                  <span class="font-title font-medium">📁 websites/</span>
                  <span class="text-[10px] text-emerald-400 font-mono">Live</span>
                </div>
                <div class="pl-4 space-y-1 mt-0.5 border-l border-teal-950/40 ml-2">
                  <!-- Tools -->
                  <div>
                    <div data-tree-path="sofia://websites/tools" class="modal-tree-item px-2 py-1 rounded cursor-pointer flex items-center justify-between text-slate-300 hover:bg-[#0c1824] ${selectedPath === 'sofia://websites/tools' ? 'bg-teal-950 text-teal-300 font-medium' : ''}">
                      <span>📁 tools/ (Web Apps)</span>
                      <span class="text-[10px] text-slate-500 font-mono">4 apps</span>
                    </div>
                    <div class="pl-4 space-y-0.5 border-l border-teal-950/30 ml-2">
                      <div data-tree-path="sofia://websites/tools/paroxetine-taper" class="modal-tree-item px-2 py-1 rounded cursor-pointer text-slate-400 hover:text-white hover:bg-[#0c1824] truncate ${selectedPath === 'sofia://websites/tools/paroxetine-taper' ? 'bg-teal-950 text-teal-300 font-medium' : ''}">🌐 Paroxetine Taper Guide</div>
                      <div data-tree-path="sofia://websites/tools/typing-pro" class="modal-tree-item px-2 py-1 rounded cursor-pointer text-slate-400 hover:text-white hover:bg-[#0c1824] truncate ${selectedPath === 'sofia://websites/tools/typing-pro' ? 'bg-teal-950 text-teal-300 font-medium' : ''}">🌐 Typing Pro</div>
                      <div data-tree-path="sofia://websites/tools/easy-doc" class="modal-tree-item px-2 py-1 rounded cursor-pointer text-slate-400 hover:text-white hover:bg-[#0c1824] truncate ${selectedPath === 'sofia://websites/tools/easy-doc' ? 'bg-teal-950 text-teal-300 font-medium' : ''}">🌐 Easy Doc</div>
                      <div data-tree-path="sofia://websites/tools/high-octane" class="modal-tree-item px-2 py-1 rounded cursor-pointer text-amber-300 hover:text-amber-200 hover:bg-[#0c1824] truncate font-medium ${selectedPath === 'sofia://websites/tools/high-octane' ? 'bg-teal-950 text-teal-300 font-bold' : ''}">🏎️ High Octane (Racing)</div>
                    </div>
                  </div>

                  <!-- YouTube -->
                  <div>
                    <div data-tree-path="sofia://websites/youtube" class="modal-tree-item px-2 py-1 rounded cursor-pointer flex items-center justify-between text-slate-300 hover:bg-[#0c1824] ${selectedPath === 'sofia://websites/youtube' ? 'bg-teal-950 text-teal-300 font-medium' : ''}">
                      <span>📁 youtube/ (Media Channels)</span>
                      <span class="text-[10px] text-slate-500 font-mono">4 channels</span>
                    </div>
                    <div class="pl-4 space-y-0.5 border-l border-teal-950/30 ml-2">
                      <div data-tree-path="sofia://websites/youtube/creative-coding" class="modal-tree-item px-2 py-1 rounded cursor-pointer text-slate-400 hover:text-white hover:bg-[#0c1824] truncate ${selectedPath.includes('creative-coding') ? 'text-teal-300' : ''}">🎬 Creative Coding &amp; Tech</div>
                      <div data-tree-path="sofia://websites/youtube/design-craft" class="modal-tree-item px-2 py-1 rounded cursor-pointer text-slate-400 hover:text-white hover:bg-[#0c1824] truncate ${selectedPath.includes('design-craft') ? 'text-teal-300' : ''}">🎬 Design &amp; Typography</div>
                      <div data-tree-path="sofia://websites/youtube/ambient-focus" class="modal-tree-item px-2 py-1 rounded cursor-pointer text-slate-400 hover:text-white hover:bg-[#0c1824] truncate ${selectedPath.includes('ambient-focus') ? 'text-teal-300' : ''}">🎬 Ambient Soundscapes</div>
                      <div data-tree-path="sofia://websites/youtube/game-dev" class="modal-tree-item px-2 py-1 rounded cursor-pointer text-slate-400 hover:text-white hover:bg-[#0c1824] truncate ${selectedPath.includes('game-dev') ? 'text-teal-300' : ''}">🎬 Arcade Racing Physics</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Contact Folder -->
              <div>
                <div data-tree-path="sofia://contact" class="modal-tree-item px-2 py-1.5 rounded-lg cursor-pointer flex items-center justify-between ${
                  selectedPath === 'sofia://contact' ? 'bg-teal-950 text-teal-300 font-semibold' : 'text-slate-300 hover:bg-[#0c1824]'
                }">
                  <span class="font-title font-medium">📁 contact/</span>
                  <span class="text-[10px] text-slate-500 font-mono">3 files</span>
                </div>
                <div class="pl-4 space-y-0.5 mt-0.5 border-l border-teal-950/40 ml-2">
                  <div data-tree-path="sofia://contact/message" class="modal-tree-item px-2 py-1 rounded cursor-pointer text-slate-400 hover:text-slate-200 hover:bg-[#0c1824] truncate ${selectedPath === 'sofia://contact/message' ? 'bg-teal-950 text-teal-300 font-medium' : ''}">📄 Direct Inquiry Form</div>
                  <div data-tree-path="sofia://contact/channels" class="modal-tree-item px-2 py-1 rounded cursor-pointer text-slate-400 hover:text-slate-200 hover:bg-[#0c1824] truncate ${selectedPath === 'sofia://contact/channels' ? 'bg-teal-950 text-teal-300 font-medium' : ''}">📄 Channels (Sofiadmm58@gmail.com)</div>
                  <div data-tree-path="sofia://contact/availability" class="modal-tree-item px-2 py-1 rounded cursor-pointer text-slate-400 hover:text-slate-200 hover:bg-[#0c1824] truncate ${selectedPath === 'sofia://contact/availability' ? 'bg-teal-950 text-teal-300 font-medium' : ''}">📄 Availability &amp; Response</div>
                </div>
              </div>
            </div>
          </div>
        `;
      }

      // Add click listeners to items
      container.querySelectorAll('.modal-tree-item').forEach((item) => {
        item.addEventListener('click', () => {
          const path = item.getAttribute('data-tree-path');
          if (path) {
            renderFolderTree(path);
            updateModalPreview(path);
          }
        });
      });
    }

    // 6. Update Preview in Modal
    function updateModalPreview(path) {
      const preview = document.getElementById('modal-preview-content');
      const actionBtn = document.getElementById('modal-btn-action');
      if (!preview) return;

      const item = resolveSitePath(path) || SITE_DIRECTORY[0];
      if (actionBtn) {
        actionBtn.setAttribute('href', item.href);
        if (item.type === 'website' && item.url) {
          actionBtn.textContent = 'Open Website Page';
        } else {
          actionBtn.textContent = 'Go to Section';
        }
      }

      let extraContent = '';
      if (item.type === 'website' && item.url) {
        extraContent = `
          <div class="p-4 rounded-xl bg-[#0b1622] border border-teal-900/40 mb-6 space-y-3">
            <div class="flex items-center justify-between text-xs font-title font-medium text-slate-300">
              <span>Live Interactive Web App</span>
              <span class="text-emerald-400">● Hosted Online</span>
            </div>
            <p class="text-xs text-slate-400 font-sans">Runs independently in any browser without installation or complex dependencies.</p>
            <div class="flex items-center gap-2">
              <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-title font-semibold text-xs shadow-md transition-colors">
                <span>Direct Launch App</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              </a>
              <a href="${item.href}" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-950 hover:bg-teal-900 text-teal-300 text-xs font-title transition-colors border border-teal-800/50">
                <span>View on Directory Page</span>
              </a>
            </div>
          </div>
        `;
      } else if (item.type === 'video' && item.youtubeId) {
        extraContent = `
          <div class="mb-6 rounded-xl overflow-hidden border border-rose-950/60 bg-black aspect-video relative">
            <iframe class="w-full h-full" src="https://www.youtube-nocookie.com/embed/${item.youtubeId}" title="${item.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        `;
      }

      preview.innerHTML = `
        <div class="flex items-center gap-2 mb-3">
          <span class="px-2 py-0.5 rounded-md bg-teal-950 text-teal-400 border border-teal-800/60 text-xs font-mono">${item.badge}</span>
          <span class="text-xs text-slate-500 font-sans">${item.category}</span>
        </div>
        <h2 class="font-title text-2xl font-bold text-white mb-2 tracking-tight">${item.title}</h2>
        <div class="text-xs font-mono text-teal-400/90 mb-4 bg-[#050b10] p-2 rounded-lg border border-teal-950">${item.path}</div>
        <p class="font-reading text-slate-300 text-sm leading-relaxed mb-6">${item.description}</p>
        ${extraContent}
      `;
    }

    // Modal search filtering listener
    document.getElementById('modal-tree-search-input')?.addEventListener('input', () => {
      renderFolderTree(currentVirtualPath);
    });

    // 7. Address Bar Autocomplete & Search Dropdown
    const addressInput = document.getElementById('global-address-input');
    const addressDropdown = document.getElementById('global-address-dropdown');
    const suggestionsList = document.getElementById('global-suggestions-list');

    function updateAddressDropdown(term) {
      if (!suggestionsList || !addressDropdown) return;
      const clean = (term || '').toLowerCase().replace(/^sofia:\/\//, '').trim();

      let matched = SITE_DIRECTORY;
      if (clean) {
        matched = SITE_DIRECTORY.filter(
          (i) =>
            i.title.toLowerCase().includes(clean) ||
            i.path.toLowerCase().includes(clean) ||
            i.category.toLowerCase().includes(clean) ||
            i.badge.toLowerCase().includes(clean) ||
            i.description.toLowerCase().includes(clean)
        );
      }
      matched = matched.slice(0, 7);

      if (matched.length === 0) {
        suggestionsList.innerHTML = `<div class="p-3 text-xs text-slate-400 text-center">No exact match. Press Enter to search anyway.</div>`;
      } else {
        suggestionsList.innerHTML = matched
          .map(
            (item) => `
            <a href="${item.href}" class="w-full text-left px-3.5 py-2 hover:bg-teal-950/80 transition-colors flex items-center justify-between gap-3 group border-b border-teal-950/30 last:border-0 block">
              <div class="flex items-center gap-2.5 min-w-0">
                <span class="p-1 rounded bg-[#0d1b27] border border-teal-900/60 text-teal-400 shrink-0 font-mono text-xs">
                  ${item.type === 'folder' ? '📁' : item.type === 'website' ? '🌐' : item.type === 'video' ? '🎬' : '📄'}
                </span>
                <div class="truncate">
                  <div class="text-xs font-medium text-slate-200 group-hover:text-teal-300 flex items-center gap-2 truncate">
                    <span>${item.title}</span>
                    <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-teal-950 text-teal-400/90 border border-teal-900/50">${item.badge}</span>
                  </div>
                  <div class="text-[11px] text-slate-400 font-mono truncate">${item.path}</div>
                </div>
              </div>
              <span class="text-[11px] text-slate-500 font-sans group-hover:text-teal-400 shrink-0">${item.category} →</span>
            </a>
          `
          )
          .join('');
      }

      addressDropdown.classList.remove('hidden');
    }

    if (addressInput) {
      addressInput.addEventListener('focus', () => {
        updateAddressDropdown(addressInput.value);
      });
      addressInput.addEventListener('input', (e) => {
        updateAddressDropdown(e.target.value);
      });
      document.addEventListener('click', (e) => {
        if (!addressDropdown.contains(e.target) && !addressInput.contains(e.target)) {
          addressDropdown.classList.add('hidden');
        }
      });
    }

    // Address Bar Form Submission
    document.getElementById('global-address-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = addressInput?.value;
      const target = resolveSitePath(val);
      if (target) {
        window.location.href = target.href;
      } else {
        window.location.href = 'website.html';
      }
    });

    // Copy path
    document.getElementById('global-copy-path-btn')?.addEventListener('click', () => {
      navigator.clipboard?.writeText(window.location.origin + '/' + currentVirtualPath);
      const icon = document.getElementById('global-copy-icon');
      if (icon) {
        icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" class="text-emerald-400"/>`;
        setTimeout(() => {
          icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>`;
        }, 2000);
      }
    });

    // Reload animation
    document.getElementById('global-bar-reload')?.addEventListener('click', () => {
      const reloadIcon = document.getElementById('global-reload-icon');
      if (reloadIcon) {
        reloadIcon.classList.add('animate-spin', 'text-teal-400');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    });

    // Back & forward
    document.getElementById('global-bar-back')?.addEventListener('click', () => {
      window.history.back();
    });
    document.getElementById('global-bar-forward')?.addEventListener('click', () => {
      window.history.forward();
    });

    // 8. Keyboard Shortcuts (Cmd+K / Ctrl+K and /)
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (modalEl && !modalEl.classList.contains('hidden')) {
          closeFolderModal();
        } else {
          openFolderModal();
        }
      } else if (
        e.key === '/' &&
        document.activeElement !== addressInput &&
        !(document.activeElement instanceof HTMLInputElement) &&
        !(document.activeElement instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        addressInput?.focus();
        addressInput?.select();
      } else if (e.key === 'Escape') {
        closeFolderModal();
        addressDropdown?.classList.add('hidden');
      }
    });
  };
})();
