import React from 'react';
import { ExternalLink, Globe, Sparkles } from 'lucide-react';

interface WebsiteItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  url: string;
  thumbnailUrl: string;
  description: string;
}

// =========================================================================
// WEBSITES DATA TEMPLATE:
// Sofia can directly add or adjust websites in this code array.
// =========================================================================
const WEBSITES_DATA: WebsiteItem[] = [
  {
    id: 'paroxetine-taper-guide',
    title: 'Paroxetine Taper Guide',
    category: 'Health & Well-being',
    badge: 'Live Tracker',
    url: 'https://paroxetine-taper-guide.vercel.app',
    thumbnailUrl: 'https://iili.io/naGx4yb.jpg',
    description:
      'A live tracker and guidance tool to help individuals safely and gradually taper paroxetine. Features dosage reduction schedules, symptom monitoring, milestone tracking, and supportive resources to navigate discontinuation with confidence.',
  },
  {
    id: 'typing-pro',
    title: 'Typing Pro',
    category: 'Productivity & Skill Building',
    badge: 'Speed Trainer',
    url: 'https://typing-practice-steel.vercel.app',
    thumbnailUrl: 'https://iili.io/naGx4yb.jpg',
    description:
      'An interactive typing trainer designed to help anyone type faster and improve muscle memory with real-time WPM calculation, accuracy tracking, and focused practice drills.',
  },
  {
    id: 'easy-doc',
    title: 'Easy Doc',
    category: 'Utility & Documentation',
    badge: 'Document Generator',
    url: 'https://easy-doc-2-0.vercel.app',
    thumbnailUrl: 'https://iili.io/naGx4yb.jpg',
    description:
      'Document generator made easy — create, format, customize, and export clean, structured documents effortlessly without complex software or formatting headaches.',
  },
  {
    id: 'high-octane',
    title: 'High Octane',
    category: 'Gaming & Interactive',
    badge: 'Online Racing Game',
    url: 'https://high-octane-murex.vercel.app/',
    thumbnailUrl: 'https://iili.io/naGx4yb.jpg',
    description:
      'An online racing video game featuring high-speed competition, challenging tracks, and responsive vehicle handling built for thrilling arcade racing directly in the browser.',
  },
];

export const WebsitesSection: React.FC = () => {
  return (
    <section
      id="website"
      aria-label="Websites"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full"
    >
      {/* Section Header */}
      <div className="mb-14 text-left">
        <div className="flex items-center gap-2 text-xs text-teal-400 font-sans tracking-wide uppercase mb-2.5">
          <Globe className="w-3.5 h-3.5" />
          <span>Section 06 · Purposeful Digital Tools</span>
        </div>
        <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
          Websites
        </h2>
        <p className="font-serif text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl">
          Websites and interactive utilities I created to help people in their everyday lives — simple, thoughtful tools designed for daily clarity.
        </p>
      </div>

      {/* Websites List */}
      <div className="space-y-8">
        {WEBSITES_DATA.map((site) => (
          <article
            key={site.id}
            className="group relative rounded-2xl bg-[#0c1520] border border-teal-900/30 hover:border-teal-700/60 transition-all p-6 sm:p-7 shadow-xl hover:shadow-2xl hover:shadow-teal-950/20"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6 sm:gap-8">
              {/* Thumbnail Image Example */}
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-[16/10] w-full md:w-72 rounded-xl overflow-hidden bg-[#070c12] border border-teal-900/40 shrink-0 block group-hover:border-teal-500/50 transition-colors"
              >
                <img
                  src={site.thumbnailUrl}
                  alt={`${site.title} thumbnail`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080d12]/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2.5 right-2.5 text-[10px] font-mono font-medium text-teal-300 bg-[#080d12]/90 backdrop-blur-md px-2 py-0.5 rounded border border-teal-900/50">
                  Live Tool
                </span>
              </a>

              {/* Info & Redirect Action */}
              <div className="flex-1 space-y-3">
                {/* Unboxed Metadata */}
                <div className="flex items-center gap-2 text-xs text-slate-400 font-sans">
                  <span className="text-teal-400 font-semibold">{site.category}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-emerald-300 font-mono text-[11px]">{site.badge}</span>
                </div>

                {/* Title */}
                <h3 className="font-title text-2xl font-bold text-white tracking-tight group-hover:text-teal-300 transition-colors">
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-2"
                  >
                    <span>{site.title}</span>
                    <ExternalLink className="w-4 h-4 text-teal-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </h3>

                {/* Description of What the Website Does */}
                <p className="font-serif text-slate-300 text-base leading-relaxed">
                  {site.description}
                </p>

                {/* Redirect Button */}
                <div className="pt-2">
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-title font-semibold bg-teal-950/60 hover:bg-teal-900/70 text-teal-300 border border-teal-800/50 transition-all"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
