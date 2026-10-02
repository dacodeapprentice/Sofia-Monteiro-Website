import React from 'react';
import { Menu, ArrowUpRight } from 'lucide-react';
import { NAV_ITEMS, NavItem } from '../types';

interface NavbarProps {
  onToggleLeftMenu: () => void;
  activeSection: string;
  onNavigate: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleLeftMenu,
  activeSection,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#080d12]/90 backdrop-blur-md border-b border-teal-950/70 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Hamburger Menu Trigger (on the LEFT) + Sofia Wordmark */}
        <div className="flex items-center gap-3.5">
          {/* Hamburger Menu Button on the Left */}
          <button
            onClick={onToggleLeftMenu}
            className="flex items-center justify-center p-2 rounded-lg text-slate-300 hover:text-teal-300 hover:bg-[#101b26] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            aria-label="Open navigation menu"
            aria-expanded="false"
            aria-controls="left-hamburger-menu"
          >
            <Menu className="w-5 h-5 text-teal-400" />
            <span className="sr-only">Toggle Menu</span>
          </button>

          {/* Sofia Wordmark */}
          <a
            href="index.html#hero"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('hero');
            }}
            className="group flex items-center gap-2 text-lg font-bold font-title tracking-tight text-white hover:text-teal-300 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
            <span>Sofia</span>
          </a>
        </div>

        {/* Zone 2: Navigation Links (Text with subtle active/hover underlines) */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
          {NAV_ITEMS.map((item: NavItem) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
                className={`font-title text-sm tracking-tight transition-colors py-1 relative ${
                  isActive
                    ? 'text-teal-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-100 font-medium'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action / Quick Touchpoint */}
        <div className="flex items-center gap-3">
          <a
            href="index.html#contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('contact');
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold font-title text-teal-300 bg-teal-950/50 hover:bg-teal-900/60 border border-teal-800/50 rounded-lg transition-all shadow-sm hover:shadow-teal-950/50 whitespace-nowrap"
          >
            <span>Say Hello</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-teal-400" />
          </a>
        </div>
      </div>
    </header>
  );
};
