export interface WebsiteFile {
  type: 'website';
  id: string;
  title: string;
  category: string;
  badge: string;
  url: string;
  thumbnailUrl: string;
  description: string;
  path: string;
  tags: string[];
  pageHref: string;
}

export interface YouTubeVideoFile {
  type: 'video';
  id: string;
  title: string;
  channelName: string;
  channelUrl: string;
  duration: string;
  youtubeId: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  description: string;
  path: string;
  tags: string[];
  pageHref: string;
}

export interface YouTubeChannelFolder {
  type: 'channel';
  id: string;
  title: string;
  handle: string;
  channelUrl: string;
  description: string;
  path: string;
  avatarUrl: string;
  videos: YouTubeVideoFile[];
  pageHref: string;
}

export interface SiteDocFile {
  type: 'doc';
  id: string;
  title: string;
  section: string;
  badge: string;
  description: string;
  path: string;
  pageHref: string;
  anchorId: string;
  iconName: 'home' | 'user' | 'book' | 'sparkles' | 'mail' | 'terminal' | 'shield' | 'target' | 'award' | 'globe';
  tags: string[];
}

export interface SiteFolderNode {
  type: 'folder';
  id: string;
  name: string;
  path: string;
  pageHref: string;
  description: string;
  iconName: 'folder' | 'globe' | 'youtube' | 'code' | 'palette' | 'headphones' | 'gamepad' | 'home' | 'user' | 'mail';
  childFolderIds?: string[];
  fileIds?: string[];
}

export const SITE_DOCS: SiteDocFile[] = [
  // Home Folder Docs
  {
    type: 'doc',
    id: 'home-intro',
    title: 'Welcome & Creative Introduction',
    section: 'Home',
    badge: 'Introduction',
    description: 'Sofia’s digital archive introduction, creative statement, and everyday web tools portfolio.',
    path: 'sofia://home/welcome',
    pageHref: 'index.html#hero',
    anchorId: 'hero',
    iconName: 'home',
    tags: ['Home', 'Welcome', 'Portfolio', 'Introduction'],
  },
  {
    type: 'doc',
    id: 'home-philosophy',
    title: 'Calm & Purposeful Digital Philosophy',
    section: 'Home',
    badge: 'Philosophy',
    description: 'Designing quiet, focused software that prioritizes human well-being, clarity, and daily utility.',
    path: 'sofia://home/philosophy',
    pageHref: 'index.html#hero',
    anchorId: 'hero',
    iconName: 'sparkles',
    tags: ['Philosophy', 'Manifesto', 'Human Centered', 'Design'],
  },
  {
    type: 'doc',
    id: 'home-featured-tools',
    title: 'Featured Tools & Quick Access',
    section: 'Home',
    badge: 'Highlights',
    description: 'Quick launcher for Paroxetine Taper Guide, Typing Pro, Easy Doc, and High Octane racing.',
    path: 'sofia://home/featured-tools',
    pageHref: 'index.html#website',
    anchorId: 'website',
    iconName: 'target',
    tags: ['Featured', 'Launcher', 'Apps', 'Tools'],
  },

  // About Folder Docs
  {
    type: 'doc',
    id: 'about-bio',
    title: 'Background & Creative Story',
    section: 'About',
    badge: 'Biography',
    description: 'The journey, background, and ethos of building software for genuine everyday human needs.',
    path: 'sofia://about/biography',
    pageHref: 'about.html#biography',
    anchorId: 'about',
    iconName: 'user',
    tags: ['Biography', 'Story', 'Background', 'Sofia'],
  },
  {
    type: 'doc',
    id: 'about-principles',
    title: 'Design Principles & Craft',
    section: 'About',
    badge: 'Principles',
    description: 'Understated aesthetics, tactile typography, Dieter Rams simplicity, and dark mode design.',
    path: 'sofia://about/principles',
    pageHref: 'about.html#principles',
    anchorId: 'about',
    iconName: 'shield',
    tags: ['Design', 'Dieter Rams', 'Aesthetics', 'Principles'],
  },
  {
    type: 'doc',
    id: 'about-skills',
    title: 'Technical Skills & Architecture',
    section: 'About',
    badge: 'Tech Stack',
    description: 'TypeScript, React, modern web standards, performance budgeting, and responsive systems.',
    path: 'sofia://about/skills',
    pageHref: 'about.html#skills',
    anchorId: 'about',
    iconName: 'terminal',
    tags: ['TypeScript', 'React', 'Tailwind', 'Architecture'],
  },
  {
    type: 'doc',
    id: 'about-milestones',
    title: 'Chronological Milestones & Timeline',
    section: 'About',
    badge: 'Timeline',
    description: 'Key developmental milestones, project releases, and evolving creative disciplines.',
    path: 'sofia://about/timeline',
    pageHref: 'about.html#milestones',
    anchorId: 'about',
    iconName: 'award',
    tags: ['Timeline', 'Milestones', 'History', 'Releases'],
  },
  {
    type: 'doc',
    id: 'about-dossier',
    title: 'Curated Archive Dossier Cards',
    section: 'About',
    badge: 'Archive Dossier',
    description: 'Interactive categorized dossier cards detailing every digital instrument and focus area.',
    path: 'sofia://about/dossier',
    pageHref: 'about.html#dossier',
    anchorId: 'about',
    iconName: 'book',
    tags: ['Dossier', 'Records', 'Archive', 'Projects'],
  },

  // Contact Folder Docs
  {
    type: 'doc',
    id: 'contact-message',
    title: 'Direct Inquiry Form',
    section: 'Contact',
    badge: 'Message Form',
    description: 'Interactive communication form for project inquiries, collaborations, and questions.',
    path: 'sofia://contact/message',
    pageHref: 'contact.html#message',
    anchorId: 'contact',
    iconName: 'mail',
    tags: ['Contact', 'Form', 'Message', 'Inquiry'],
  },
  {
    type: 'doc',
    id: 'contact-channels',
    title: 'Communication Channels & Profiles',
    section: 'Contact',
    badge: 'Direct Channels',
    description: 'Direct email (Sofiadmm58@gmail.com), verified profiles, and communication channels.',
    path: 'sofia://contact/channels',
    pageHref: 'contact.html#channels',
    anchorId: 'contact',
    iconName: 'globe',
    tags: ['Email', 'Channels', 'Sofiadmm58@gmail.com', 'Social'],
  },
  {
    type: 'doc',
    id: 'contact-availability',
    title: 'Availability & Response Schedule',
    section: 'Contact',
    badge: 'Status',
    description: 'Active status, current capacity for new digital projects, and average response times.',
    path: 'sofia://contact/availability',
    pageHref: 'contact.html#status',
    anchorId: 'contact',
    iconName: 'sparkles',
    tags: ['Status', 'Availability', 'Hours', 'Response Time'],
  },
];

export const EXPLORER_WEBSITES: WebsiteFile[] = [
  {
    type: 'website',
    id: 'paroxetine-taper-guide',
    title: 'Paroxetine Taper Guide',
    category: 'Health & Well-being',
    badge: 'Live Tracker',
    url: 'https://paroxetine-taper-guide.vercel.app',
    thumbnailUrl: 'https://iili.io/naGx4yb.jpg',
    description:
      'A live tracker and guidance tool to help individuals safely and gradually taper paroxetine. Features dosage reduction schedules, daily symptom monitoring, milestone tracking, and supportive resources to navigate discontinuation with confidence.',
    path: 'sofia://websites/tools/paroxetine-taper',
    tags: ['Health', 'Tracker', 'Medical Guidance', 'Everyday Tool'],
    pageHref: 'website.html#paroxetine-taper-guide',
  },
  {
    type: 'website',
    id: 'typing-pro',
    title: 'Typing Pro',
    category: 'Productivity & Skill Building',
    badge: 'Speed Trainer',
    url: 'https://typing-practice-steel.vercel.app',
    thumbnailUrl: 'https://iili.io/naGx4yb.jpg',
    description:
      'An interactive typing trainer designed to help anyone type faster and improve muscle memory with real-time WPM calculation, accuracy tracking, and focused practice drills.',
    path: 'sofia://websites/tools/typing-pro',
    tags: ['Productivity', 'Typing', 'Speed', 'Muscle Memory'],
    pageHref: 'website.html#typing-pro',
  },
  {
    type: 'website',
    id: 'easy-doc',
    title: 'Easy Doc',
    category: 'Utility & Documentation',
    badge: 'Document Generator',
    url: 'https://easy-doc-2-0.vercel.app',
    thumbnailUrl: 'https://iili.io/naGx4yb.jpg',
    description:
      'Document generator made easy — create, format, customize, and export clean, structured documents effortlessly without complex software or formatting headaches.',
    path: 'sofia://websites/tools/easy-doc',
    tags: ['Documents', 'Generator', 'Export', 'Utility'],
    pageHref: 'website.html#easy-doc',
  },
  {
    type: 'website',
    id: 'high-octane',
    title: 'High Octane',
    category: 'Gaming & Interactive',
    badge: 'Online Racing Game',
    url: 'https://high-octane-murex.vercel.app/',
    thumbnailUrl: 'https://iili.io/naGx4yb.jpg',
    description:
      'An action-packed online racing video game featuring high-speed competition, challenging tracks, and responsive vehicle handling built for thrilling arcade racing directly in the browser.',
    path: 'sofia://websites/tools/high-octane',
    tags: ['Racing', 'Video Game', 'Arcade', 'Multiplayer'],
    pageHref: 'website.html#high-octane',
  },
];

export const EXPLORER_CHANNELS: YouTubeChannelFolder[] = [
  {
    type: 'channel',
    id: 'creative-coding',
    title: 'Creative Coding & Tech Craft',
    handle: '@creative-code',
    channelUrl: 'https://www.youtube.com',
    description: 'Algorithmic art, web experimentation, and the craft of modern software design.',
    path: 'sofia://websites/youtube/creative-coding',
    avatarUrl: 'https://iili.io/naGx4yb.jpg',
    pageHref: 'website.html#youtube-creative-coding',
    videos: [
      {
        type: 'video',
        id: 'creative-coding-1',
        title: 'The Art & Architecture of Creative Web Coding',
        channelName: 'Creative Coding & Tech Craft',
        channelUrl: 'https://www.youtube.com',
        duration: '14:20',
        youtubeId: '70MQ-FugwbI',
        youtubeUrl: 'https://www.youtube.com/watch?v=70MQ-FugwbI',
        thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
        description: 'Exploring how mathematical beauty, canvas rendering, and code converge to build inspiring interactive experiences on the open web.',
        path: 'sofia://websites/youtube/creative-coding/art-of-coding',
        tags: ['Creative Coding', 'Canvas', 'JavaScript', 'Design'],
        pageHref: 'website.html#video-70MQ-FugwbI',
      },
      {
        type: 'video',
        id: 'creative-coding-2',
        title: 'Building Purposeful Everyday Micro-Tools in 100 Seconds',
        channelName: 'Creative Coding & Tech Craft',
        channelUrl: 'https://www.youtube.com',
        duration: '06:45',
        youtubeId: 'W6NZfCO5SIk',
        youtubeUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
        thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
        description: 'A breakdown of modern web engineering fundamentals, clean architecture, and lightweight reactive state design.',
        path: 'sofia://websites/youtube/creative-coding/micro-tools',
        tags: ['Web Dev', 'Micro Tools', 'Architecture', 'TypeScript'],
        pageHref: 'website.html#video-W6NZfCO5SIk',
      },
    ],
  },
  {
    type: 'channel',
    id: 'design-craft',
    title: 'Design Philosophy & Typography',
    handle: '@design-systems',
    channelUrl: 'https://www.youtube.com',
    description: 'Dieter Rams principles, editorial layouts, serif typography, and tactile digital craftsmanship.',
    path: 'sofia://websites/youtube/design-craft',
    avatarUrl: 'https://iili.io/naGx4yb.jpg',
    pageHref: 'website.html#youtube-design-craft',
    videos: [
      {
        type: 'video',
        id: 'design-craft-1',
        title: 'Dieter Rams: Ten Principles for Good Design in Practice',
        channelName: 'Design Philosophy & Typography',
        channelUrl: 'https://www.youtube.com',
        duration: '18:50',
        youtubeId: 'TR3vC4Aon9c',
        youtubeUrl: 'https://www.youtube.com/watch?v=TR3vC4Aon9c',
        thumbnailUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
        description: 'Timeless principles of honest, understated, and functional design applied to modern software and physical instruments.',
        path: 'sofia://websites/youtube/design-craft/dieter-rams-principles',
        tags: ['Dieter Rams', 'Minimalism', 'Industrial Design', 'Craft'],
        pageHref: 'website.html#video-TR3vC4Aon9c',
      },
      {
        type: 'video',
        id: 'design-craft-2',
        title: 'The Timeless Art of Typography & Visual Reading Rhythm',
        channelName: 'Design Philosophy & Typography',
        channelUrl: 'https://www.youtube.com',
        duration: '12:15',
        youtubeId: 'sByzHoi8FZ0',
        youtubeUrl: 'https://www.youtube.com/watch?v=sByzHoi8FZ0',
        thumbnailUrl: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=800&q=80',
        description: 'How letterforms, line-heights, baseline grids, and serif proportions create contemplative reading spaces for human minds.',
        path: 'sofia://websites/youtube/design-craft/typography-rhythm',
        tags: ['Typography', 'Editorial', 'Serif', 'Visual Hierarchy'],
        pageHref: 'website.html#video-sByzHoi8FZ0',
      },
    ],
  },
  {
    type: 'channel',
    id: 'ambient-focus',
    title: 'Ambient Soundscapes & Focus',
    handle: '@deep-flow',
    channelUrl: 'https://www.youtube.com',
    description: 'Calm auditory textures, binaural soundscapes, and lofi rhythms designed for deep, uninterrupted creative work.',
    path: 'sofia://websites/youtube/ambient-focus',
    avatarUrl: 'https://iili.io/naGx4yb.jpg',
    pageHref: 'website.html#youtube-ambient-focus',
    videos: [
      {
        type: 'video',
        id: 'ambient-focus-1',
        title: 'Synthwave & Deep Lofi Beats to Code and Create',
        channelName: 'Ambient Soundscapes & Focus',
        channelUrl: 'https://www.youtube.com',
        duration: 'Live / 24/7',
        youtubeId: '4xDzrJKXOOY',
        youtubeUrl: 'https://www.youtube.com/watch?v=4xDzrJKXOOY',
        thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        description: 'Atmospheric nocturnal soundscapes blending retro synthesizers, gentle tempo, and steady cadence for deep coding sessions.',
        path: 'sofia://websites/youtube/ambient-focus/synthwave-beats',
        tags: ['Lofi', 'Synthwave', 'Focus', 'Coding Music'],
        pageHref: 'website.html#video-4xDzrJKXOOY',
      },
      {
        type: 'video',
        id: 'ambient-focus-2',
        title: 'Ethereal Generative Ambient Soundscape for Deep Solitude',
        channelName: 'Ambient Soundscapes & Focus',
        channelUrl: 'https://www.youtube.com',
        duration: '45:00',
        youtubeId: 'DWcJFNfaw90',
        youtubeUrl: 'https://www.youtube.com/watch?v=DWcJFNfaw90',
        thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        description: 'Continuous drone textures and gentle harmonic tape delays designed to eliminate friction and sustain long-form contemplation.',
        path: 'sofia://websites/youtube/ambient-focus/ethereal-generative',
        tags: ['Ambient', 'Drone', 'Calm', 'Productivity'],
        pageHref: 'website.html#video-DWcJFNfaw90',
      },
    ],
  },
  {
    type: 'channel',
    id: 'game-dev',
    title: 'Arcade Racing & 3D Interactive Tech',
    handle: '@racing-physics',
    channelUrl: 'https://www.youtube.com',
    description: 'Physics simulation, vehicle handling dynamics, track generation, and high-performance browser gaming.',
    path: 'sofia://websites/youtube/game-dev',
    avatarUrl: 'https://iili.io/naGx4yb.jpg',
    pageHref: 'website.html#youtube-game-dev',
    videos: [
      {
        type: 'video',
        id: 'game-dev-1',
        title: 'Building High-Speed Arcade Racing Physics in the Browser',
        channelName: 'Arcade Racing & 3D Interactive Tech',
        channelUrl: 'https://www.youtube.com',
        duration: '21:30',
        youtubeId: 'kGAqH6BDT94',
        youtubeUrl: 'https://www.youtube.com/watch?v=kGAqH6BDT94',
        thumbnailUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
        description: 'From tire friction curves to drift momentum: mathematical modeling of responsive arcade racing games like High Octane.',
        path: 'sofia://websites/youtube/game-dev/racing-physics',
        tags: ['Racing Games', 'Game Physics', '3D Graphics', 'High Octane'],
        pageHref: 'website.html#video-kGAqH6BDT94',
      },
      {
        type: 'video',
        id: 'game-dev-2',
        title: 'Procedural Track Generation & High-Performance Rendering',
        channelName: 'Arcade Racing & 3D Interactive Tech',
        channelUrl: 'https://www.youtube.com',
        duration: '16:40',
        youtubeId: '7JzKxZ-0uKk',
        youtubeUrl: 'https://www.youtube.com/watch?v=7JzKxZ-0uKk',
        thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
        description: 'How procedural splines, shader lighting, and 60fps frame budgeting make web-based racing games feel immediate and kinetic.',
        path: 'sofia://websites/youtube/game-dev/procedural-tracks',
        tags: ['Procedural Tracks', 'WebGL', 'Simulation', 'Performance'],
        pageHref: 'website.html#video-7JzKxZ-0uKk',
      },
    ],
  },
];

export const FOLDERS_STRUCTURE: SiteFolderNode[] = [
  {
    type: 'folder',
    id: 'root',
    name: 'Sofia Root Archive',
    path: 'sofia://',
    pageHref: 'index.html#hero',
    description: 'Root master directory of Sofia’s entire digital portfolio, documentation, everyday tools, and media.',
    iconName: 'folder',
    childFolderIds: ['home', 'about', 'websites', 'contact'],
  },
  {
    type: 'folder',
    id: 'home',
    name: 'Home (Portfolio & Welcome)',
    path: 'sofia://home',
    pageHref: 'index.html#hero',
    description: 'Welcome portal, design manifesto, and quick directory launcher.',
    iconName: 'home',
    fileIds: ['home-intro', 'home-philosophy', 'home-featured-tools'],
  },
  {
    type: 'folder',
    id: 'about',
    name: 'About (In-Depth Dossier)',
    path: 'sofia://about',
    pageHref: 'about.html',
    description: 'Background biography, core design principles, tech stack, milestones timeline, and detailed archive records.',
    iconName: 'user',
    fileIds: ['about-bio', 'about-principles', 'about-skills', 'about-milestones', 'about-dossier'],
  },
  {
    type: 'folder',
    id: 'websites',
    name: 'Websites & Media Directory',
    path: 'sofia://websites',
    pageHref: 'website.html',
    description: 'Live everyday web applications and curated YouTube video channels with full playback.',
    iconName: 'globe',
    childFolderIds: ['tools', 'youtube'],
  },
  {
    type: 'folder',
    id: 'tools',
    name: 'Everyday Web Tools',
    path: 'sofia://websites/tools',
    pageHref: 'website.html#tools',
    description: 'Independent live websites built for daily health, typing, document export, and 3D arcade racing.',
    iconName: 'globe',
    fileIds: ['paroxetine-taper-guide', 'typing-pro', 'easy-doc', 'high-octane'],
  },
  {
    type: 'folder',
    id: 'youtube',
    name: 'YouTube Channels & Curated Media',
    path: 'sofia://websites/youtube',
    pageHref: 'website.html#youtube',
    description: 'Curated video channels covering creative coding, design craft, ambient focus, and game physics.',
    iconName: 'youtube',
    childFolderIds: ['creative-coding', 'design-craft', 'ambient-focus', 'game-dev'],
  },
  {
    type: 'folder',
    id: 'contact',
    name: 'Contact & Inquiry',
    path: 'sofia://contact',
    pageHref: 'contact.html',
    description: 'Direct communication channels, message form, availability status, and email address.',
    iconName: 'mail',
    fileIds: ['contact-message', 'contact-channels', 'contact-availability'],
  },
];

export interface SearchResultItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  path: string;
  pageHref: string;
  type: 'folder' | 'website' | 'video' | 'channel' | 'doc';
  description: string;
  url?: string;
  youtubeId?: string;
}

export function getAllSiteSearchItems(): SearchResultItem[] {
  const items: SearchResultItem[] = [];

  // Folders
  FOLDERS_STRUCTURE.forEach((folder) => {
    items.push({
      id: folder.id,
      title: folder.name,
      category: 'Folder Directory',
      badge: 'Folder',
      path: folder.path,
      pageHref: folder.pageHref,
      type: 'folder',
      description: folder.description,
    });
  });

  // Docs
  SITE_DOCS.forEach((doc) => {
    items.push({
      id: doc.id,
      title: doc.title,
      category: `${doc.section} Section`,
      badge: doc.badge,
      path: doc.path,
      pageHref: doc.pageHref,
      type: 'doc',
      description: doc.description,
    });
  });

  // Websites
  EXPLORER_WEBSITES.forEach((w) => {
    items.push({
      id: w.id,
      title: w.title,
      category: 'Everyday Tools',
      badge: w.badge,
      path: w.path,
      pageHref: w.pageHref,
      type: 'website',
      description: w.description,
      url: w.url,
    });
  });

  // YouTube Channels
  EXPLORER_CHANNELS.forEach((ch) => {
    items.push({
      id: ch.id,
      title: ch.title,
      category: 'YouTube Channel',
      badge: ch.handle,
      path: ch.path,
      pageHref: ch.pageHref,
      type: 'channel',
      description: ch.description,
      url: ch.channelUrl,
    });

    // Videos
    ch.videos.forEach((v) => {
      items.push({
        id: v.id,
        title: v.title,
        category: `${ch.title} Video`,
        badge: v.duration,
        path: v.path,
        pageHref: v.pageHref,
        type: 'video',
        description: v.description,
        youtubeId: v.youtubeId,
        url: v.youtubeUrl,
      });
    });
  });

  return items;
}

// Map short path queries to full targets
export function resolveSitePath(input: string): SearchResultItem | null {
  const normalized = input.trim().toLowerCase().replace(/^sofia:\/\//, '').replace(/^\/+/, '');
  const all = getAllSiteSearchItems();

  if (!normalized) {
    return all.find((i) => i.id === 'root') || null;
  }

  // Exact path match
  const exact = all.find(
    (i) => i.path.toLowerCase() === `sofia://${normalized}` || i.path.toLowerCase() === normalized
  );
  if (exact) return exact;

  // Exact ID match
  const idMatch = all.find((i) => i.id.toLowerCase() === normalized);
  if (idMatch) return idMatch;

  // Keyword match
  const keyword = all.find((i) => {
    return (
      i.title.toLowerCase().includes(normalized) ||
      i.path.toLowerCase().includes(normalized) ||
      i.description.toLowerCase().includes(normalized) ||
      i.badge.toLowerCase().includes(normalized)
    );
  });

  return keyword || null;
}
