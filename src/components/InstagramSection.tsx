import React from 'react';
import { Instagram, ExternalLink, Camera, Image as ImageIcon } from 'lucide-react';
import { IMAGES } from '../images.config';

interface InstagramFeature {
  id: string;
  title: string;
  handle: string;
  category: string;
  badge: string;
  url: string;
  thumbnailUrl: string;
  description: string;
  highlights: string[];
}

export const INSTAGRAM_FEATURES: InstagramFeature[] = [
  {
    id: 'sofia-instagram',
    title: 'Sofia Monteiro — Visual Journal',
    handle: '@sofiamonteiro',
    category: 'Visual Photography & Creative Direction',
    badge: 'Daily Feed',
    url: 'https://www.instagram.com/',
    thumbnailUrl: IMAGES.INSTAGRAM_SHOWCASE,
    description:
      'Curated visual observations, architectural snapshots, typography studies, and candid behind-the-scenes moments from daily creative work. Exploring balance, natural light, and modern minimal aesthetics.',
    highlights: ['Visual Diary', 'Design Aesthetics', 'Daily Photography', 'Creative Experiments'],
  },
];

export const InstagramSection: React.FC = () => {
  return (
    <section
      id="instagram"
      aria-label="Instagram Page"
      className="w-full max-w-5xl mx-auto py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-teal-950/40"
    >
      {/* Section Header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 text-xs text-teal-400 font-sans tracking-wide uppercase mb-2.5">
          <Instagram className="w-3.5 h-3.5" />
          <span>Online Projects · Social Media / Instagram</span>
        </div>
        <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
          Instagram
        </h2>
        <p className="font-serif text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl">
          Visual diary documenting creative inspiration, quiet moments, editorial experiments, and everyday snapshots.
        </p>
      </div>

      {/* Main Profile Presentation - Same format as Websites */}
      <div className="space-y-8">
        {INSTAGRAM_FEATURES.map((item) => (
          <article
            key={item.id}
            className="group relative rounded-2xl bg-[#0c1520] border border-teal-900/30 hover:border-teal-700/60 transition-all p-6 sm:p-7 shadow-xl hover:shadow-2xl hover:shadow-teal-950/20"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6 sm:gap-8">
              {/* Thumbnail Image */}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-[16/10] w-full md:w-72 rounded-xl overflow-hidden bg-[#070c12] border border-teal-900/40 shrink-0 block group-hover:border-teal-500/50 transition-colors"
              >
                <img
                  src={item.thumbnailUrl}
                  alt={`${item.title} preview`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080d12]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-2.5 left-2.5 p-1.5 rounded-lg bg-pink-950/80 border border-pink-800/40 text-pink-400 shadow-md">
                  <Camera className="w-3.5 h-3.5" />
                </div>
                <span className="absolute bottom-2.5 right-2.5 text-[10px] font-mono font-medium text-teal-300 bg-[#080d12]/90 backdrop-blur-md px-2 py-0.5 rounded border border-teal-900/50">
                  {item.badge}
                </span>
              </a>

              {/* Info & Redirect Action */}
              <div className="flex-1 space-y-3">
                {/* Category & Status */}
                <div className="flex items-center gap-2 text-xs text-slate-400 font-sans">
                  <span className="text-teal-400 font-semibold">{item.category}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-emerald-300 font-mono text-[11px]">{item.handle}</span>
                </div>

                {/* Title */}
                <h3 className="font-title text-2xl font-bold text-white tracking-tight group-hover:text-teal-300 transition-colors">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-2"
                  >
                    <span>{item.title}</span>
                    <ExternalLink className="w-4 h-4 text-teal-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </h3>

                {/* Explanation / Description */}
                <p className="font-serif text-slate-300 text-base leading-relaxed">
                  {item.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="text-[11px] font-sans px-2.5 py-0.5 rounded-full bg-[#0a121a] text-slate-300 border border-teal-900/30"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Visit Profile Button */}
                <div className="pt-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-title font-semibold bg-teal-950/60 hover:bg-teal-900/70 text-teal-300 border border-teal-800/50 transition-all"
                  >
                    <span>Open Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* Gallery Grid Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-5 rounded-xl bg-[#0b141e] border border-teal-950/70 space-y-2">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-title font-semibold">
              <ImageIcon className="w-4 h-4" />
              <span>Studio & Workspaces</span>
            </div>
            <p className="text-xs text-slate-300 font-serif leading-relaxed">
              Workspace setups, desk architectures, ergonomic typography tests, and working documents.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0b141e] border border-teal-950/70 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-title font-semibold">
              <Camera className="w-4 h-4" />
              <span>Light & Cityscapes</span>
            </div>
            <p className="text-xs text-slate-300 font-serif leading-relaxed">
              Quiet morning walks, urban geometry, architecture angles, and reflections during downtime.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0b141e] border border-teal-950/70 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-title font-semibold">
              <ExternalLink className="w-4 h-4" />
              <span>Creative Process</span>
            </div>
            <p className="text-xs text-slate-300 font-serif leading-relaxed">
              Work-in-progress snapshots, color studies, and design system component experiments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
