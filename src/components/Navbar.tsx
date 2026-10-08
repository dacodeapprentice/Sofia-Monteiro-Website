import React, { useState, useRef, useEffect } from 'react';
import { Menu, ChevronDown, Globe, Layout, Youtube, Instagram, Share2 } from 'lucide-react';
import { NAV_ITEMS, NavItem, NavChildItem } from '../types';

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150);
  };

  const getChildIcon = (id: string) => {
    switch (id) {
      case 'website':
        return <Globe className="w-4 h-4 text-teal-400" />;
      case 'ux-ui':
        return <Layout className="w-4 h-4 text-cyan-400" />;
      case 'youtube':
        return <Youtube className="w-4 h-4 text-red-400" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-400" />;
      default:
        return <Globe className="w-4 h-4 text-teal-400" />;
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#080d12]/90 backdrop-blur-md border-b border-teal-950/70 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Hamburger Menu Trigger (on the LEFT) + Sofia Wordmark */}
        <div className="flex items-center gap-3.5">
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

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
          {NAV_ITEMS.map((item: NavItem) => {
            // Group item: "Online Projects" (only a title, opens dropdown on hover or press)
            if (item.isGroup && item.children) {
              const isChildActive = item.children.some(
                (child) => !child.isCategoryTitle && child.id === activeSection
              );
              return (
                <div
                  key={item.id}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Title Button (Only a title, toggles/opens menu on hover or press) */}
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                    className={`font-title text-sm tracking-tight transition-colors py-1 flex items-center gap-1.5 focus:outline-none cursor-pointer ${
                      isChildActive || isDropdownOpen
                        ? 'text-teal-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-100 font-medium'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180 text-teal-400' : 'text-slate-400'
                      }`}
                    />
                    {isChildActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full" />
                    )}
                  </button>

                  {/* Dropdown Menu with Websites, UX/UI, and Social Media (title) -> YouTube, Instagram */}
                  {isDropdownOpen && (
                    <div
                      role="menu"
                      aria-orientation="vertical"
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 rounded-2xl bg-[#0c1520]/95 backdrop-blur-xl border border-teal-900/60 shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    >
                      <div className="px-3 py-1.5 border-b border-teal-950/60 flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400/80 font-semibold">
                          Online Projects
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">Categories</span>
                      </div>

                      <div className="space-y-1">
                        {item.children.map((child: NavChildItem) => {
                          // If this child is purely a category title (Social Media)
                          if (child.isCategoryTitle) {
                            return (
                              <div
                                key={child.id}
                                className="pt-2 pb-1 px-3 mt-1 border-t border-teal-950/50 flex items-center justify-between"
                              >
                                <div className="flex items-center gap-1.5 text-teal-400/90 font-title text-xs font-semibold uppercase tracking-wider">
                                  <Share2 className="w-3.5 h-3.5" />
                                  <span>{child.label}</span>
                                </div>
                                <span className="text-[9px] font-mono text-slate-500">Title</span>
                              </div>
                            );
                          }

                          const isCurrentActive = activeSection === child.id;
                          return (
                            <a
                              key={child.id}
                              href={child.href}
                              role="menuitem"
                              onClick={(e) => {
                                e.preventDefault();
                                onNavigate(child.id);
                                setIsDropdownOpen(false);
                              }}
                              className={`group/item flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                                isCurrentActive
                                  ? 'bg-teal-950/70 border border-teal-800/60 text-white'
                                  : 'hover:bg-[#121e2b] text-slate-300 hover:text-white border border-transparent'
                              }`}
                            >
                              <div className="p-2 rounded-lg bg-[#070c12] border border-teal-900/40 shrink-0 mt-0.5 group-hover/item:border-teal-500/50 transition-colors">
                                {getChildIcon(child.id)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="font-title text-sm font-semibold tracking-tight group-hover/item:text-teal-300 transition-colors">
                                    {child.label}
                                  </span>
                                  {child.badge && (
                                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-teal-950/60 text-teal-300 border border-teal-900/40">
                                      {child.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-400 font-reading mt-0.5 leading-snug truncate">
                                  {child.description}
                                </p>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            // Normal Top Nav Items: Home, About, Contact
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href || '#'}
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

        {/* Zone 3: Empty */}
        <div className="hidden sm:block" />
      </div>
    </header>
  );
};
