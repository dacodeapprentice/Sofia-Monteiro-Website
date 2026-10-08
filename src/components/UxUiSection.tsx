import React from 'react';
import { Layout, ExternalLink, Layers, Sparkles, Smartphone, Eye, CheckCircle2 } from 'lucide-react';

interface UxUiProject {
  id: string;
  title: string;
  category: string;
  role: string;
  timeline: string;
  summary: string;
  highlights: string[];
  tools: string[];
  prototypeUrl?: string;
}

const UX_PROJECTS: UxUiProject[] = [
  {
    id: 'aether-design-system',
    title: 'Aether Design System',
    category: 'Design Systems & Multi-Platform Tokens',
    role: 'Lead Product Designer',
    timeline: '2024 — Present',
    summary:
      'A token-driven design system designed for cognitive calm and multi-brand scalability. Features WCAG AAA accessible contrast standards, fluid typography scales, and modular React/Tailwind component primitives.',
    highlights: [
      'Comprehensive design token pipeline linking Figma styles to CSS custom variables',
      '80+ accessible component primitives with high-contrast keyboard navigation',
      'Light & dark themes optimized for long-duration data density and low eye strain',
    ],
    tools: ['Figma', 'Tokens Studio', 'React', 'Tailwind CSS', 'Storybook'],
  },
  {
    id: 'pulse-personal-ledger',
    title: 'Pulse — Mindful Financial Ledger',
    category: 'Fintech & Behavioral UX',
    role: 'UX Architect & Prototyper',
    timeline: '2023 — 2024',
    summary:
      'A private, distraction-free interface for intentional spending and personal accounting. Eliminated numerical anxiety by replacing overwhelming financial charts with calm visual cadences and intuitive flow states.',
    highlights: [
      'Conducted 18 user interviews exploring financial stress patterns in banking apps',
      'Developed 1-tap micro-categorization interaction saving 65% interaction time',
      'Offline-first architecture with end-to-end device storage encryption',
    ],
    tools: ['Figma Prototyping', 'User Research', 'Information Architecture', 'Motion Design'],
  },
  {
    id: 'monolith-reading-canvas',
    title: 'Monolith — Distraction-Free Longform Canvas',
    category: 'Content Platforms & Editorial UX',
    role: 'Interface Designer',
    timeline: '2023',
    summary:
      'An editorial reading workspace combining custom variable serif typography with ambient acoustic feedback. Tailored specifically for deep archival research, academic papers, and uninterrupted immersion.',
    highlights: [
      'Dynamic line-length calculation respecting ergonomic 65-character golden ratios',
      'Ambient audio interface dynamically adjusting textures based on reading pace',
      'Zero-clutter margin annotation system keeping the focal text serene',
    ],
    tools: ['Figma', 'Web Typography', 'Acoustic Soundscapes', 'Design Systems'],
  },
  {
    id: 'civic-mesh-directory',
    title: 'Civic Mesh — Hyper-Accessible Community Directory',
    category: 'Public Utility & Accessibility (a11y)',
    role: 'UX Researcher & Accessibility Specialist',
    timeline: '2022 — 2023',
    summary:
      'An ultra-accessible directory connecting municipal neighbors to essential health, food pantry, and shelter resources. Engineered for low-bandwidth devices, screen readers, and multilingual communities.',
    highlights: [
      '100% WCAG 2.2 AAA compliant with rigorous screen-reader verification',
      'Instant search and phone-dial actions usable on 2G connections',
      'Bilingual interface with plain-language readability scores under Grade 6',
    ],
    tools: ['WCAG AAA Audit', 'Figma', 'Screen Reader Testing', 'Plain Language UX'],
  },
];

export const UxUiSection: React.FC = () => {
  return (
    <section
      id="ux-ui"
      aria-label="UX and UI Design"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full"
    >
      {/* Header */}
      <div className="mb-14 text-left">
        <div className="flex items-center gap-2 text-xs text-teal-400 font-sans tracking-wide uppercase mb-2.5">
          <Layout className="w-3.5 h-3.5" />
          <span>Online Projects · Section 02 / UX &amp; UI</span>
        </div>
        <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
          UX / UI Design
        </h2>
        <p className="font-serif text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl">
          Human-centered digital products, design systems, and thoughtful interface prototypes crafted for cognitive ease, accessibility, and enduring aesthetic clarity.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="space-y-8">
        {UX_PROJECTS.map((project) => (
          <article
            key={project.id}
            className="group relative rounded-2xl bg-[#0c1520] border border-teal-900/30 hover:border-teal-700/60 transition-all p-6 sm:p-8 shadow-xl hover:shadow-2xl hover:shadow-teal-950/20"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="space-y-3 flex-1">
                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-sans">
                  <span className="text-teal-400 font-semibold">{project.category}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-emerald-300 font-mono text-[11px]">{project.timeline}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-slate-300">{project.role}</span>
                </div>

                {/* Title */}
                <h3 className="font-title text-2xl font-bold text-white tracking-tight group-hover:text-teal-300 transition-colors">
                  {project.title}
                </h3>

                {/* Summary */}
                <p className="font-serif text-slate-300 text-base leading-relaxed">
                  {project.summary}
                </p>

                {/* Key Highlights */}
                <div className="pt-2">
                  <h4 className="text-xs font-sans uppercase tracking-wider text-slate-400 font-medium mb-2">
                    Key Architectural Decisions:
                  </h4>
                  <ul className="space-y-1.5 font-sans text-xs text-slate-300">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tools & Meta Box */}
              <div className="lg:w-64 shrink-0 rounded-xl bg-[#080d12]/90 border border-teal-900/40 p-4 space-y-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400/80 block mb-1.5">
                    Disciplines &amp; Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-sans px-2.5 py-0.5 rounded-md bg-[#0c1520] text-slate-300 border border-teal-900/30"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-teal-950/70 text-[11px] font-sans text-slate-400 flex items-center justify-between">
                  <span>Methodology</span>
                  <span className="text-teal-300 font-mono">User-Centered</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
