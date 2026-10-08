import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Mail, Sparkles, ChevronDown, Globe, Layout, Youtube, Instagram, Share2 } from 'lucide-react';
import { NAV_ITEMS, NavItem, NavChildItem } from '../types';

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
  // Always expand Online Projects by default or when one of its children is active
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(true);

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scrolling while drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const getChildIcon = (id: string) => {
    switch (id) {
      case 'website':
        return <Globe className="w-4 h-4 text-teal-400 shrink-0" />;
      case 'ux-ui':
        return <Layout className="w-4 h-4 text-cyan-400 shrink-0" />;
      case 'youtube':
        return <Youtube className="w-4 h-4 text-red-400 shrink-0" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-400 shrink-0" />;
      default:
        return <Globe className="w-4 h-4 text-teal-400 shrink-0" />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-[#04070a]/80 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel on the LEFT */}
      <aside
        id="left-hamburger-drawer"
        aria-label="Navigation drawer"
        className={`fixed top-0 bottom-0 left-0 z-50 w-80 max-w-[85vw] bg-[#0a1118] border-r border-teal-900/40 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header with Sofia's Hosted Portrait Avatar */}
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

        {/* Drawer Content - Nav Items */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mb-3 px-3">
            <span className="text-[11px] font-semibold font-title tracking-wider uppercase text-teal-400/80">
              Navigation
            </span>
          </div>

          <nav className="space-y-2" aria-label="Sidebar Navigation">
            {NAV_ITEMS.map((item: NavItem) => {
              // Group Item: "Online Projects" (only a title, opens subpages)
              if (item.isGroup && item.children) {
                const isAnyChildActive = item.children.some(
                  (c) => !c.isCategoryTitle && c.id === activeSection
                );
                return (
                  <div key={item.id} className="rounded-xl border border-teal-950/70 bg-[#070e14]/50 overflow-hidden">
                    {/* Title Accordion Button */}
                    <button
                      type="button"
                      onClick={() => setIsProjectsExpanded(!isProjectsExpanded)}
                      className={`w-full flex items-center justify-between p-3.5 text-left transition-colors cursor-pointer ${
                        isAnyChildActive
                          ? 'text-teal-300 bg-teal-950/30'
                          : 'text-slate-300 hover:text-white hover:bg-[#101b26]'
                      }`}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-title text-sm font-semibold tracking-tight">
                            {item.label}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-teal-950 text-teal-400 border border-teal-800/40">
                            Menu
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-reading mt-0.5">
                          Websites · UX/UI · Social Media
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          isProjectsExpanded ? 'rotate-180 text-teal-400' : ''
                        }`}
                      />
                    </button>

                    {/* Sub-items list */}
                    {isProjectsExpanded && (
                      <div className="px-2.5 pb-2.5 pt-1 space-y-1 border-t border-teal-950/60 bg-[#060b10]/60">
                        {item.children.map((child: NavChildItem) => {
                          // Social Media category title
                          if (child.isCategoryTitle) {
                            return (
                              <div
                                key={child.id}
                                className="pt-2 pb-1 px-3 mt-1 border-t border-teal-950/60 flex items-center gap-1.5 text-teal-400/90 font-title text-xs font-semibold uppercase tracking-wider"
                              >
                                <Share2 className="w-3.5 h-3.5" />
                                <span>{child.label}</span>
                              </div>
                            );
                          }

                          const isActive = activeSection === child.id;
                          return (
                            <a
                              key={child.id}
                              href={child.href}
                              onClick={(e) => {
                                e.preventDefault();
                                onNavigate(child.id);
                                onClose();
                              }}
                              className={`group flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
                                isActive
                                  ? 'bg-teal-950/70 border border-teal-800/50 text-teal-200'
                                  : 'text-slate-300 hover:text-white hover:bg-[#0f1924]'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                {getChildIcon(child.id)}
                                <div className="flex flex-col min-w-0">
                                  <span
                                    className={`font-title text-xs font-medium tracking-tight truncate ${
                                      isActive ? 'text-teal-200 font-semibold' : 'group-hover:text-teal-200'
                                    }`}
                                  >
                                    {child.label}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-reading truncate">
                                    {child.description}
                                  </span>
                                </div>
                              </div>
                              <ArrowRight
                                className={`w-3.5 h-3.5 transition-transform ${
                                  isActive
                                    ? 'text-teal-400 opacity-100'
                                    : 'text-slate-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                                }`}
                              />
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              // Normal Nav Links
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href || '#'}
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
                    <span
                      className={`font-title text-sm tracking-tight ${
                        isActive ? 'text-teal-200 font-semibold' : 'group-hover:text-teal-200'
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-400 font-reading mt-0.5">{item.description}</span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isActive
                        ? 'text-teal-400'
                        : 'text-slate-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Archive Philosophy Card */}
          <div className="mt-8 mx-1 p-4 rounded-xl bg-[#0e1822]/80 border border-teal-900/30">
            <div className="flex items-center gap-2 mb-2 text-teal-400 text-xs font-title font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal Studio</span>
            </div>
            <p className="text-xs font-reading text-slate-300 leading-relaxed italic">
              "Dedicated spaces for websites, design systems, and digital video channels designed with intentional simplicity."
            </p>
          </div>
        </div>

        {/* Drawer Footer with Direct Email */}
        <div className="p-5 border-t border-teal-950/60 bg-[#080e14]">
          <a
            href="mailto:Sofiadmm58@gmail.com"
            className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-teal-300 transition-colors py-1.5"
          >
            <Mail className="w-4 h-4 text-teal-400" />
            <span className="font-sans">Sofiadmm58@gmail.com</span>
          </a>
          <p className="text-[11px] text-slate-400 font-reading mt-1">
            Browse through them, and thank you.
          </p>
        </div>
      </aside>
    </>
  );
};
