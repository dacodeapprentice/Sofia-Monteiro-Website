import React, { useState } from 'react';
import { Share2, ExternalLink, Github, Linkedin, Twitter, BookOpen, Send, Copy, Check, MessageSquare } from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  handle: string;
  url: string;
  badge: string;
  category: string;
  description: string;
  highlights: string;
  stats?: string;
}

const CHANNELS: Channel[] = [
  {
    id: 'github',
    name: 'GitHub',
    handle: '@sofiadmm',
    url: 'https://github.com',
    badge: 'Open Source Repos',
    category: 'Code & Software',
    description:
      'Home to the source code for my everyday tools, experimental React prototypes, algorithmic utilities, and design system token configurations.',
    highlights: 'Public repositories, open web utilities, and active commits.',
    stats: 'Open Web Utilities',
  },
  {
    id: 'substack',
    name: 'Substack & Digital Letters',
    handle: 'everyday-craft.substack.com',
    url: 'https://substack.com',
    badge: 'Essays & Letters',
    category: 'Writing & Thought',
    description:
      'Periodic reflective essays exploring intentional computing, ergonomics in digital work, slow design, and building enduring everyday software.',
    highlights: 'Long-form editorial essays delivered directly to inboxes.',
    stats: 'Bi-weekly Dispatches',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'linkedin.com/in/sofia-creative',
    url: 'https://linkedin.com',
    badge: 'Professional Network',
    category: 'Career & Inquiries',
    description:
      'Professional background, collaborative ventures, design architecture discussions, and formal correspondence for freelance or advisory roles.',
    highlights: 'Direct messaging and industry discourse.',
    stats: 'Active Inquiries',
  },
  {
    id: 'twitter',
    name: 'X / Twitter',
    handle: '@sofia_craft',
    url: 'https://x.com',
    badge: 'Daily Dispatches',
    category: 'Micro-logs & Design',
    description:
      'Bite-sized interface interaction previews, work-in-progress snapshots, typographic experiments, and observations on physical vs digital craftsmanship.',
    highlights: 'Micro-logs, UI design snippets, and design community conversations.',
    stats: 'Daily Notes',
  },
  {
    id: 'readcv',
    name: 'Read.cv / Portfolio Archive',
    handle: 'read.cv/sofia',
    url: 'https://read.cv',
    badge: 'Visual Archive',
    category: 'Visual & Case Studies',
    description:
      'Curated visual artifacts, typography specimens, color system documentation, and high-fidelity interface layouts.',
    highlights: 'Clean editorial resume, design specimens, and verified project records.',
    stats: 'Design Specimen Archive',
  },
];

export const SocialMediaSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      id="social-media"
      aria-label="Social Media and Channels"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full"
    >
      {/* Header */}
      <div className="mb-14 text-left">
        <div className="flex items-center gap-2 text-xs text-teal-400 font-sans tracking-wide uppercase mb-2.5">
          <Share2 className="w-3.5 h-3.5" />
          <span>Online Projects · Section 03 / Social Media</span>
        </div>
        <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
          Social Media &amp; Channels
        </h2>
        <p className="font-serif text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl">
          Public platforms, digital essays, open repositories, and creative channels where I document ongoing work, experiments, and reflections.
        </p>
      </div>

      {/* Channels List */}
      <div className="space-y-6">
        {CHANNELS.map((channel) => (
          <article
            key={channel.id}
            className="group relative rounded-2xl bg-[#0c1520] border border-teal-900/30 hover:border-teal-700/60 transition-all p-6 sm:p-7 shadow-xl hover:shadow-2xl hover:shadow-teal-950/20"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2 flex-1">
                {/* Meta */}
                <div className="flex items-center gap-2 text-xs text-slate-400 font-sans">
                  <span className="text-teal-400 font-semibold">{channel.category}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-emerald-300 font-mono text-[11px]">{channel.badge}</span>
                  {channel.stats && (
                    <>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-slate-400">{channel.stats}</span>
                    </>
                  )}
                </div>

                {/* Name & Handle */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="font-title text-xl font-bold text-white tracking-tight group-hover:text-teal-300 transition-colors">
                    {channel.name}
                  </h3>
                  <code className="text-xs font-mono text-teal-300 bg-[#080d12] px-2 py-0.5 rounded border border-teal-900/50">
                    {channel.handle}
                  </code>
                </div>

                {/* Description */}
                <p className="font-serif text-slate-300 text-base leading-relaxed">
                  {channel.description}
                </p>

                {/* Sub-note */}
                <p className="text-xs font-sans text-slate-400">
                  {channel.highlights}
                </p>
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col items-center sm:items-end gap-2.5 shrink-0 pt-2 sm:pt-0">
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-title font-semibold bg-teal-950/60 hover:bg-teal-900/70 text-teal-300 border border-teal-800/50 transition-all shadow-sm"
                >
                  <span>Visit Channel</span>
                  <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
                </a>

                <button
                  type="button"
                  onClick={() => handleCopy(channel.id, channel.handle)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans text-slate-400 hover:text-white bg-[#080d12] border border-teal-950 hover:border-teal-800/60 transition-colors"
                  title="Copy handle"
                >
                  {copiedId === channel.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy Handle</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
