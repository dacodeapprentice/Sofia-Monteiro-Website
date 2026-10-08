/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LeftMenuDrawer } from './components/LeftMenuDrawer';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { WebsitesSection } from './components/WebsitesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { NAV_ITEMS } from './types';

export default function App() {
  const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [viewMode, setViewMode] = useState<'continuous' | 'single'>('continuous');

  // Handle URL hash changes on load and popstate
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && NAV_ITEMS.some((item) => item.id === hash)) {
        setActiveSection(hash);
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update active section on scroll when in continuous view
  useEffect(() => {
    if (viewMode !== 'continuous') return;

    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      Boolean
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            // Non-destructively update history hash without triggering page reload
            if (window.history.replaceState) {
              window.history.replaceState(null, '', `index.html#${entry.target.id}`);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [viewMode]);

  // Navigate handler for top nav, drawer, hero buttons, and footer
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (window.history.pushState) {
      window.history.pushState(null, '', `index.html#${sectionId}`);
    }

    if (viewMode === 'continuous') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080d12] text-slate-200 flex flex-col font-serif selection:bg-teal-500/30 selection:text-teal-200 relative">
      {/* Top Navbar */}
      <Navbar
        onToggleLeftMenu={() => setIsLeftMenuOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Hamburger Menu on the Left (contains same contents as top nav) */}
      <LeftMenuDrawer
        isOpen={isLeftMenuOpen}
        onClose={() => setIsLeftMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Mode View Switcher (Continuous Flow vs Dedicated Page View) */}
      <div className="fixed bottom-5 right-5 z-30 hidden sm:flex items-center gap-1.5 p-1 bg-[#0a1219]/90 backdrop-blur-md rounded-xl border border-teal-900/50 shadow-xl">
        <button
          onClick={() => setViewMode('continuous')}
          className={`px-3 py-1.5 rounded-lg text-xs font-title font-medium transition-all ${
            viewMode === 'continuous'
              ? 'bg-teal-950 text-teal-300 border border-teal-700/60 shadow-inner'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Scroll through all pages continuously"
        >
          All Pages
        </button>
        <button
          onClick={() => setViewMode('single')}
          className={`px-3 py-1.5 rounded-lg text-xs font-title font-medium transition-all ${
            viewMode === 'single'
              ? 'bg-teal-950 text-teal-300 border border-teal-700/60 shadow-inner'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Focus on one page at a time"
        >
          Single Page
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {viewMode === 'continuous' ? (
          /* Continuous Scroll: All pages connected with href anchors */
          <>
            <HeroSection onNavigate={handleNavigate} />
            <AboutSection />
            <WebsitesSection />
            <ContactSection />
          </>
        ) : (
          /* Focused Single Page View */
          <div className="py-4">
            {activeSection === 'hero' && <HeroSection onNavigate={handleNavigate} />}
            {activeSection === 'about' && <AboutSection />}
            {activeSection === 'website' && <WebsitesSection />}
            {activeSection === 'contact' && <ContactSection />}

            {/* Quick Next Page Footer in Single Page Mode */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-between items-center border-t border-teal-950/40 text-xs font-sans">
              <span className="text-slate-400">
                Viewing page: <strong className="text-teal-300 capitalize">{activeSection}</strong>
              </span>
              <div className="flex items-center gap-2">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate(item.id);
                    }}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      activeSection === item.id
                        ? 'bg-teal-900/60 text-teal-300 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
