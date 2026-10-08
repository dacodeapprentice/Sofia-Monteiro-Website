import React, { useState, useMemo } from 'react';
import { Search, User, Sparkles, BookOpen, Cpu, Coffee, Compass, CheckCircle2, ArrowUpRight, HelpCircle, FileText } from 'lucide-react';

interface DossierItem {
  id: string;
  category: 'background' | 'philosophy' | 'tech' | 'routine' | 'influences' | 'faq';
  categoryLabel: string;
  title: string;
  summary: string;
  details: string;
  tags: string[];
}

const DOSSIER_ITEMS: DossierItem[] = [
  {
    id: 'bio-origin',
    category: 'background',
    categoryLabel: 'Background & Trajectory',
    title: 'Origins & 8+ Year Journey (2018–2026)',
    summary: 'From exploratory creative coding to crafting resilient production systems and everyday utilities.',
    details: 'Started in digital design and frontend engineering in 2018, exploring how code intersects with typography and human attention. Over 8+ years, has transitioned from client-facing digital showcases to building robust, self-sufficient tools and production web applications that simplify everyday routines.',
    tags: ['Background', 'Timeline', 'Experience', 'Origins'],
  },
  {
    id: 'core-ethos',
    category: 'philosophy',
    categoryLabel: 'Philosophy & Ethos',
    title: 'Unhurried Design & Respect for Attention',
    summary: 'The digital realm is saturated with noise. Good software should be a quiet, dignified retreat.',
    details: 'Software should respect cognitive limits. I design interfaces that do not fight for dopamine, employ intentional whitespace, prioritize high legibility with serif prose paired with modern geometric titles, and value lasting utility over speculative vanity metrics.',
    tags: ['Philosophy', 'Attention Economy', 'Quiet Design', 'Ethics'],
  },
  {
    id: 'real-utility',
    category: 'philosophy',
    categoryLabel: 'Philosophy & Ethos',
    title: 'Utility-First Craftsmanship',
    summary: 'A tool should either remove palpable friction or bring authentic tranquility to a person’s day.',
    details: 'If an application doesn’t solve a real everyday problem or ease a repetitive task, it should not be built. I favor clean, single-purpose software that executes one workflow flawlessly rather than convoluted all-in-one platforms.',
    tags: ['Utility', 'Simplicity', 'Focus', 'Values'],
  },
  {
    id: 'frontend-architecture',
    category: 'tech',
    categoryLabel: 'Tech & Craft',
    title: 'Frontend Architecture & Engineering Standards',
    summary: 'Production TypeScript, modern React, semantic HTML5, zero-bloat state patterns, and instant speeds.',
    details: 'Specializing in clean component hierarchies, predictable uni-directional data flow, modular CSS with Tailwind, and rock-solid deployment configurations. All interfaces are responsive, keyboard-navigable, and accessible across mobile and desktop environments.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Performance', 'Architecture'],
  },
  {
    id: 'everyday-tools',
    category: 'tech',
    categoryLabel: 'Tech & Craft',
    title: 'Everyday Tools & Purposeful Websites',
    summary: 'Independent tools created for daily living — taper tracking, typing acceleration, easy documents.',
    details: 'Created dedicated web apps to assist with daily living: Paroxetine Taper Guide (a live tracker to help taper paroxetine safely), Typing Pro (speed trainer that helps a person type faster), and Easy Doc (document generator made easy). These are live, free to access, and open to all.',
    tags: ['Everyday Websites', 'Web Applications', 'Tools', 'Utility'],
  },
  {
    id: 'daily-routine',
    category: 'routine',
    categoryLabel: 'Everyday Routine',
    title: 'Daily Cadence & Creative Rhythm',
    summary: 'Structure designed around deep morning work, tactile reading, and outdoor recalibration.',
    details: 'Early mornings reserved for high-cognitive coding and system architecture before digital notifications begin. Afternoons dedicated to prototyping, interface refinement, and correspondence. Evenings protected for reading, physical notebooks, and time offline.',
    tags: ['Routine', 'Productivity', 'Habits', 'Cadence'],
  },
  {
    id: 'influences-reading',
    category: 'influences',
    categoryLabel: 'Influences & Reading',
    title: 'Intellectual & Aesthetic Influences',
    summary: 'Influenced by timeless architectural thought, ecological restraint, and utilitarian industrial design.',
    details: 'Drawn to Dieter Rams (the ten principles of good design), Christopher Alexander (The Timeless Way of Building), and Kenya Hara (Designing Design). Deeply inspired by Japanese printmaking, Nordic furniture craft, and tactile book typography.',
    tags: ['Influences', 'Books', 'Architecture', 'Dieter Rams'],
  },
  {
    id: 'faq-collaborations',
    category: 'faq',
    categoryLabel: 'Deep Inquiry & FAQ',
    title: 'Are you open to collaborative initiatives or advisory roles?',
    summary: 'Yes, selectively open to purposeful commissions and technical systems advisory.',
    details: 'I take on a limited number of collaborations each year, specifically focused on products with genuine human benefit, nonprofit utilities, and teams seeking uncompromising design clarity and performance.',
    tags: ['FAQ', 'Consulting', 'Contact', 'Work'],
  },
  {
    id: 'faq-stack',
    category: 'faq',
    categoryLabel: 'Deep Inquiry & FAQ',
    title: 'What is your preferred development environment & stack?',
    summary: 'Lightweight, typed, standard-compliant technologies that run fast and maintain easily.',
    details: 'TypeScript, React, Vite, Tailwind CSS, semantic HTML5, Git, and automated CI/CD. Preference for minimal dependency trees that eliminate security vulnerabilities and guarantee years of zero-maintenance uptime.',
    tags: ['FAQ', 'Stack', 'Tools', 'Development'],
  },
];

export const AboutSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredItems = useMemo(() => {
    return DOSSIER_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.details.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <section id="about" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      {/* Section Header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 text-xs text-teal-400 font-sans tracking-wide uppercase mb-2.5">
          <User className="w-3.5 h-3.5" />
          <span>Section 01 · Detailed Background &amp; Profile</span>
        </div>
        <h1 className="font-title text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
          About Sofia
        </h1>
        <p className="font-serif text-slate-300 text-lg sm:text-xl leading-relaxed max-w-3xl">
          An in-depth look at my journey, creative direction, engineering principles, and the background behind the things I build.
        </p>
      </div>

      {/* Hero Profile Card */}
      <div className="rounded-2xl bg-[#0c1520] border border-teal-900/30 p-6 sm:p-10 mb-14 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Avatar Column */}
          <div className="md:col-span-4 flex flex-col items-center text-center">
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl p-1 bg-gradient-to-tr from-teal-500/30 to-emerald-500/30 border border-teal-800/40 shadow-2xl overflow-hidden mb-4">
              <img
                src="https://iili.io/naGxr8u.jpg"
                alt="Sofia portrait"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl filter brightness-95"
              />
            </div>
            <h2 className="font-title text-xl font-bold text-white tracking-tight">Sofia</h2>
            <p className="text-xs text-slate-400 font-sans mt-0.5">Software Creator &amp; Systems Builder</p>
            <div className="mt-3 flex items-center gap-2 text-xs font-sans text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Consultations</span>
            </div>
          </div>

          {/* Bio Summary Column */}
          <div className="md:col-span-8 space-y-4">
            <h3 className="font-title text-2xl font-bold text-white tracking-tight">
              Quiet Craft, Practical Utility &amp; Everyday Clarity
            </h3>
            <p className="font-serif text-slate-300 text-base sm:text-lg leading-relaxed">
              I am a digital builder focused on creating software and interfaces that respect human attention. Rather than adding to the relentless noise of the internet, my work centers on tools that simplify everyday routines, reduce cognitive clutter, and provide lasting utility.
            </p>
            <p className="font-serif text-slate-300 text-base leading-relaxed">
              Over the years, I have worked across multidisciplinary roles in frontend engineering, user research, product design, and systems architecture. Whether creating lightweight neighborhood utilities or structuring resilient production web platforms, I hold myself to standards of simplicity, performance, and craftsmanship.
            </p>
          </div>
        </div>
      </div>

      {/* Deep Search Engine Header */}
      <div className="rounded-2xl bg-[#0c141d] border border-teal-900/40 p-6 sm:p-8 mb-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-teal-400 mb-1">
              <Search className="w-3.5 h-3.5" />
              <span>Deeper Search &amp; Knowledge Dossier</span>
            </div>
            <h3 className="font-title text-xl font-bold text-white">
              Explore Background, Principles &amp; Details
            </h3>
          </div>
          <span className="text-xs font-sans text-slate-400 bg-[#080d12] px-3 py-1.5 rounded-lg border border-teal-900/40 self-start md:self-auto">
            Showing <strong className="text-teal-300">{filteredItems.length}</strong> of {DOSSIER_ITEMS.length} insights
          </span>
        </div>

        {/* Live Search Input */}
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Sofia's background, ethos, technical stack, reading list, design systems..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#080d12] border border-teal-900/50 text-slate-200 placeholder:text-slate-500 text-sm focus:outline-none focus:border-teal-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-[#101b26]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Topics' },
            { id: 'background', label: 'Background' },
            { id: 'philosophy', label: 'Philosophy' },
            { id: 'tech', label: 'Tech & Craft' },
            { id: 'routine', label: 'Routine' },
            { id: 'influences', label: 'Influences' },
            { id: 'faq', label: 'Deep FAQs' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-title transition-all ${
                activeCategory === cat.id
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-medium'
                  : 'bg-[#080d12] text-slate-400 hover:text-slate-200 border border-teal-900/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filtered Dossier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl bg-[#0c1520] border border-teal-900/30 p-6 flex flex-col justify-between hover:border-teal-700/50 transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-teal-400">
                  {item.categoryLabel}
                </span>
                <span className="text-[10px] font-mono text-slate-500">ID: {item.id}</span>
              </div>
              <h4 className="font-title text-lg font-bold text-white mb-2 tracking-tight">
                {item.title}
              </h4>
              <p className="font-serif text-sm text-teal-100/90 leading-relaxed italic mb-3">
                "{item.summary}"
              </p>
              <p className="font-serif text-sm text-slate-300 leading-relaxed">
                {item.details}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-teal-950/60 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-sans px-2.5 py-0.5 rounded-md bg-[#080d12] text-slate-400 border border-teal-900/30"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full py-12 text-center rounded-2xl bg-[#0c1520] border border-teal-900/30">
            <HelpCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="font-title text-base text-slate-300 font-medium">No results found for "{searchQuery}"</p>
            <p className="text-xs text-slate-500 mt-1">Try another keyword or select "All Topics" above.</p>
          </div>
        )}
      </div>

      {/* Deep Search Information Dossier Table */}
      <div className="rounded-2xl bg-[#0c1520] border border-teal-900/30 p-6 sm:p-8">
        <h3 className="font-title text-xl font-bold text-white tracking-tight mb-5 flex items-center gap-2">
          <FileText className="w-5 h-5 text-teal-400" />
          <span>Deep Search Details &amp; Background Dossier</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs font-sans">
          <div className="p-4 rounded-xl bg-[#080d12] border border-teal-900/40">
            <span className="text-slate-400 block mb-1 uppercase tracking-wider text-[10px]">Primary Focus</span>
            <span className="text-white font-medium text-sm">Human-centric Web Tools &amp; Clean Frontend Systems</span>
          </div>

          <div className="p-4 rounded-xl bg-[#080d12] border border-teal-900/40">
            <span className="text-slate-400 block mb-1 uppercase tracking-wider text-[10px]">Active Era</span>
            <span className="text-white font-medium text-sm">2018 &ndash; Present (8+ Years Craft)</span>
          </div>

          <div className="p-4 rounded-xl bg-[#080d12] border border-teal-900/40">
            <span className="text-slate-400 block mb-1 uppercase tracking-wider text-[10px]">Direct Correspondence</span>
            <a href="mailto:Sofiadmm58@gmail.com" className="text-teal-300 hover:underline font-medium text-sm block">
              Sofiadmm58@gmail.com
            </a>
          </div>

          <div className="p-4 rounded-xl bg-[#080d12] border border-teal-900/40">
            <span className="text-slate-400 block mb-1 uppercase tracking-wider text-[10px]">Specialized Areas</span>
            <span className="text-white font-medium text-sm">Everyday Utilities, Accessibility, Typography Pairing</span>
          </div>

          <div className="p-4 rounded-xl bg-[#080d12] border border-teal-900/40">
            <span className="text-slate-400 block mb-1 uppercase tracking-wider text-[10px]">Project Archive</span>
            <span className="text-white font-medium text-sm">Public Showcase &amp; Production Deployments</span>
          </div>

          <div className="p-4 rounded-xl bg-[#080d12] border border-teal-900/40">
            <span className="text-slate-400 block mb-1 uppercase tracking-wider text-[10px]">Inquiries</span>
            <span className="text-emerald-300 font-medium text-sm">Open to collaborative ideas &amp; inquiries</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-teal-950/60 flex flex-wrap items-center justify-between gap-4">
          <p className="font-serif text-sm text-slate-300 italic">
            "Explore the dossier, use the everyday websites, and thank you for taking the time."
          </p>
          <a
            href="contact.html"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-title font-semibold bg-teal-950/60 hover:bg-teal-900/70 text-teal-300 border border-teal-800/50 transition-all"
          >
            <span>Send a Note</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-teal-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
