import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { NAV_ITEMS, NavItem } from '../types';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#05080c] border-t border-teal-950/80 py-12 md:py-16 px-4 sm:px-6 lg:px-8 text-slate-400">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-teal-950/60">
          {/* Sofia Wordmark & Sign-off */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span className="font-title text-xl font-bold tracking-tight text-white">
                Sofia
              </span>
            </div>
            <p className="font-serif text-slate-300 text-base italic max-w-md">
              "This is the personal aspect of my life, and here are the things I've done over the years with projects and at work. Browse through them, and thank you."
            </p>
          </div>

          {/* Navigation links - All with href="index.html#..." */}
          <nav className="flex flex-wrap items-center gap-6" aria-label="Footer Navigation">
            {NAV_ITEMS.map((item: NavItem) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
                className="font-title text-sm text-slate-400 hover:text-teal-300 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom bar with copyright and back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-500">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Sofia. All personal notes &amp; archives reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">Executable from <code className="text-teal-400 font-mono">index.html</code></span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a1118] hover:bg-[#101b26] text-slate-300 hover:text-white border border-teal-900/40 transition-colors"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-teal-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
