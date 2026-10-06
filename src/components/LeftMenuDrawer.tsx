import React, { useEffect } from 'react';
import { X, ArrowRight, Mail, Compass, Sparkles } from 'lucide-react';
import { NAV_ITEMS, NavItem } from '../types';

interface LeftMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (id: string) => void;
}

export const LeftMenuDrawer: React.FC<LeftMenuDrawerProps> = ({
  isOpen,
  onClose,
  activeSection,
  onNavigate,
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#04070a]/80 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out drawer on the LEFT */}
      <aside
        id="left-hamburger-menu"
        aria-label="Navigation drawer"
        className={`fixed top-0 bottom-0 left-0 z-50 w-80 max-w-[85vw] bg-[#0a1118] border-r border-teal-900/40 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-teal-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-700 to-emerald-500 p-[1.5px] shadow-sm overflow-hidden shrink-0">
              <img
                src="https://iili.io/naGxr8u.jpg"
                alt="Sofia"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <a
                href="index.html#hero"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('hero');
                  onClose();
                }}
                className="font-title text-base font-semibold text-white tracking-tight hover:text-teal-300 transition-colors"
              >
                Sofia
              </a>
              <p className="text-xs text-slate-400 font-sans">Creative &amp; Digital Archive</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content - Nav Items (Identical to top nav bar) */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mb-3 px-3">
            <span className="text-[11px] font-semibold font-title tracking-wider uppercase text-teal-400/80">
              Navigation
            </span>
          </div>

          <nav className="space-y-1.5" aria-label="Sidebar Navigation">
            {NAV_ITEMS.map((item: NavItem) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.id);
                    onClose();
                  }}
                  className={`group flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-150 ${
                    isActive
                      ? 'bg-teal-950/40 text-teal-300 border border-teal-800/40 font-medium'
                      : 'text-slate-300 hover:text-white hover:bg-[#101b26] border border-transparent'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-title text-sm tracking-tight group-hover:text-teal-200 transition-colors">
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-400 font-reading mt-0.5">
                      {item.description}
                    </span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isActive
                        ? 'text-teal-400 translate-x-0 opacity-100'
                        : 'text-slate-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Editorial Note inside Drawer */}
          <div className="mt-8 mx-2 p-4 rounded-xl bg-[#0e1822]/80 border border-teal-900/30">
            <div className="flex items-center gap-2 mb-2 text-teal-400 text-xs font-title font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal Note</span>
            </div>
            <p className="text-xs font-reading text-slate-300 leading-relaxed italic">
              "This is the personal aspect of my life, and here are the things I've done over the years with projects and at work."
            </p>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-5 border-t border-teal-950/60 bg-[#080e14]">
          <a
            href="mailto:Sofiadmm58@gmail.com"
            className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-teal-300 transition-colors py-1.5"
          >
            <Mail className="w-4 h-4 text-teal-400" />
            <span className="font-sans">Sofiadmm58@gmail.com</span>
          </a>
          <p className="text-[11px] text-slate-400 font-reading mt-2">
            Browse through them, and thank you.
          </p>
        </div>
      </aside>
    </>
  );
};
