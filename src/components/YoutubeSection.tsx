import React from 'react';
import { Youtube, ExternalLink, Play } from 'lucide-react';
import { IMAGES } from '../images.config';

interface YoutubeChannel {
  id: string;
  title: string;
  handle: string;
  category: string;
  badge: string;
  url: string;
  thumbnailUrl: string;
  description: string;
  tags: string[];
}

export const YOUTUBE_CHANNELS: YoutubeChannel[] = [
  {
    id: 'sofia-monteiro',
    title: 'Sofia Monteiro',
    handle: '@SofiaMonteirocontent',
    category: 'Creative Essays & Lifestyle',
    badge: 'Personal Channel',
    url: 'https://www.youtube.com/@SofiaMonteirocontent',
    thumbnailUrl: IMAGES.YOUTUBE_SOFIA_MONTEIRO,
    description:
      'Video essays, personal creative thoughts, lifestyle documentation, and digital reflections by Sofia. A calm, candid space exploring design philosophy, everyday living rituals, and ongoing creative projects.',
    tags: ['Video Essays', 'Creative Lifestyle', 'Design Reflections'],
  },
  {
    id: 'secaski-games',
    title: 'Secaski Games',
    handle: '@secaskigames',
    category: 'Gaming & Interactive Media',
    badge: 'Gaming Channel',
    url: 'https://www.youtube.com/@secaskigames',
    thumbnailUrl: IMAGES.YOUTUBE_SECASKI_GAMES,
    description:
      'High-energy racing experiments, gameplay highlights, walkthroughs, and interactive video game reviews. Featuring gameplay mechanics, racing simulations, and indie title explorations.',
    tags: ['Racing Games', 'Gameplay Commentary', 'Game Experiments'],
  },
  {
    id: 'monteiro-archive',
    title: 'Monteiro Archive',
    handle: '@monteiroarchive415',
    category: 'Visual Archival & Experiments',
    badge: 'Digital Archive',
    url: 'https://www.youtube.com/@monteiroarchive415',
    thumbnailUrl: IMAGES.YOUTUBE_MONTEIRO_ARCHIVE,
    description:
      'Curated footage repository, documentation recordings, video experiments, and visual time-capsules. A digital archive cataloging creative milestones, research notes, and retrospective media.',
    tags: ['Visual Archives', 'Media Documentation', 'Time Capsules'],
  },
];

export const YoutubeSection: React.FC = () => {
  return (
    <section
      id="youtube"
      aria-label="YouTube Channels"
      className="w-full max-w-5xl mx-auto py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-teal-950/40"
    >
      {/* Section Header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 text-xs text-teal-400 font-sans tracking-wide uppercase mb-2.5">
          <Youtube className="w-3.5 h-3.5" />
          <span>Online Projects · Social Media / YouTube</span>
        </div>
        <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
          YouTube
        </h2>
        <p className="font-serif text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl">
          Three dedicated video channels showcasing personal reflections, gaming experiments, and archived digital media.
        </p>
      </div>

      {/* Channels List - Matches the exact presentation format of the Websites page */}
      <div className="space-y-8">
        {YOUTUBE_CHANNELS.map((channel) => (
          <article
            key={channel.id}
            className="group relative rounded-2xl bg-[#0c1520] border border-teal-900/30 hover:border-teal-700/60 transition-all p-6 sm:p-7 shadow-xl hover:shadow-2xl hover:shadow-teal-950/20"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6 sm:gap-8">
              {/* Thumbnail Image */}
              <a
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-[16/10] w-full md:w-72 rounded-xl overflow-hidden bg-[#070c12] border border-teal-900/40 shrink-0 block group-hover:border-teal-500/50 transition-colors"
              >
                <img
                  src={channel.thumbnailUrl}
                  alt={`${channel.title} thumbnail`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080d12]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-2.5 left-2.5 p-1.5 rounded-lg bg-red-950/80 border border-red-800/40 text-red-400 shadow-md">
                  <Play className="w-3.5 h-3.5 fill-red-400" />
                </div>
                <span className="absolute bottom-2.5 right-2.5 text-[10px] font-mono font-medium text-teal-300 bg-[#080d12]/90 backdrop-blur-md px-2 py-0.5 rounded border border-teal-900/50">
                  {channel.badge}
                </span>
              </a>

              {/* Info & Redirect Action */}
              <div className="flex-1 space-y-3">
                {/* Category & Status */}
                <div className="flex items-center gap-2 text-xs text-slate-400 font-sans">
                  <span className="text-teal-400 font-semibold">{channel.category}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-emerald-300 font-mono text-[11px]">{channel.handle}</span>
                </div>

                {/* Channel Title */}
                <h3 className="font-title text-2xl font-bold text-white tracking-tight group-hover:text-teal-300 transition-colors">
                  <a
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-2"
                  >
                    <span>{channel.title}</span>
                    <ExternalLink className="w-4 h-4 text-teal-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </h3>

                {/* Channel Explanation / Description */}
                <p className="font-serif text-slate-300 text-base leading-relaxed">
                  {channel.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {channel.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-sans px-2.5 py-0.5 rounded-full bg-[#0a121a] text-slate-300 border border-teal-900/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Visit Channel Button Link */}
                <div className="pt-2">
                  <a
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-title font-semibold bg-teal-950/60 hover:bg-teal-900/70 text-teal-300 border border-teal-800/50 transition-all"
                  >
                    <span>Visit Channel</span>
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
