import React, { useState } from 'react';
import { ArrowDown, Sparkles, Compass, FolderGit2, Briefcase, Feather, ArrowUpRight, Globe, User, Mail } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[85vh] flex items-center justify-center py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Ambient background backdrop image (hosted remotely) - subtle & atmospheric */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden="true">
        <img
          src="https://iili.io/naGx4yb.jpg"
          alt="Hero ambient backdrop"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-[0.16] scale-105 filter brightness-100 saturate-105"
        />
        {/* Soft atmospheric scrims preserving text contrast while letting subtle abstract emerald/cyan artwork stay in background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080d12]/90 via-transparent to-[#080d12]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#080d12]/95 via-[#080d12]/50 to-[#080d12]/90"></div>
      </div>

      <div className="relative max-w-5xl mx-auto w-full">
        {/* Main Hero Split Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
          {/* Left Column: Greeting, Manifesto, and Quick Anchors */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Unboxed Metadata (Zero-pill discipline) */}
            <div className="flex items-center gap-2.5 text-xs text-slate-400 font-sans tracking-wide">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-teal-300 font-medium">Portfolio &amp; Archive</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Selected Works</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Digital Tools</span>
            </div>

            {/* Non-serif Title */}
            <h1 className="font-title text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Hello, I'm <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">Sofia</span>.
            </h1>

            {/* Serif Reading Prose - Sofia's Core Statement */}
            <div className="relative pl-4 border-l-2 border-teal-500/40 py-1">
              <p className="font-serif text-lg sm:text-xl text-slate-300 leading-relaxed italic">
                "Here are the things I've done over the years with projects and at work. Browse through them, and thank you."
              </p>
            </div>

            <p className="font-serif text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
              Welcome to my digital corner — an evolving sanctuary bringing together in-depth reflections, crafted projects, career chronicles, everyday tools, and written notes under one tranquil roof.
            </p>

            {/* Quick Action Buttons - Unified single style across all buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="about.html"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('about');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-title text-sm font-medium bg-[#0e1722] hover:bg-[#142332] text-slate-200 hover:text-teal-200 border border-teal-900/40 hover:border-teal-700/60 transition-all shadow-sm"
              >
                <span>About Sofia</span>
                <User className="w-4 h-4 text-teal-400" />
              </a>

              <a
                href="projects.html"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('projects');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-title text-sm font-medium bg-[#0e1722] hover:bg-[#142332] text-slate-200 hover:text-teal-200 border border-teal-900/40 hover:border-teal-700/60 transition-all shadow-sm"
              >
                <span>Browse Projects</span>
                <FolderGit2 className="w-4 h-4 text-teal-400" />
              </a>

              <a
                href="career.html"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('career');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-title text-sm font-medium bg-[#0e1722] hover:bg-[#142332] text-slate-200 hover:text-teal-200 border border-teal-900/40 hover:border-teal-700/60 transition-all shadow-sm"
              >
                <span>Career &amp; Work</span>
                <Briefcase className="w-4 h-4 text-teal-400" />
              </a>

              <a
                href="website.html"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('website');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-title text-sm font-medium bg-[#0e1722] hover:bg-[#142332] text-slate-200 hover:text-teal-200 border border-teal-900/40 hover:border-teal-700/60 transition-all shadow-sm"
              >
                <span>Everyday Websites</span>
                <Globe className="w-4 h-4 text-teal-400" />
              </a>

              <a
                href="writing.html"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('writing');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-title text-sm font-medium bg-[#0e1722] hover:bg-[#142332] text-slate-200 hover:text-teal-200 border border-teal-900/40 hover:border-teal-700/60 transition-all shadow-sm"
              >
                <span>Writing &amp; Notes</span>
                <Feather className="w-4 h-4 text-teal-400" />
              </a>

              <a
                href="contact.html"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('contact');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-title text-sm font-medium bg-[#0e1722] hover:bg-[#142332] text-slate-200 hover:text-teal-200 border border-teal-900/40 hover:border-teal-700/60 transition-all shadow-sm"
              >
                <span>Contact</span>
                <Mail className="w-4 h-4 text-teal-400" />
              </a>
            </div>
          </div>

          {/* Right Column: Visual Frame with Sofia's Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group w-full max-w-sm sm:max-w-md">
              {/* Decorative cyan/emerald glow behind portrait */}
              <div
                className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-teal-500/20 via-emerald-500/10 to-cyan-500/20 blur-xl opacity-75 group-hover:opacity-100 transition duration-500"
                aria-hidden="true"
              />

              <div className="relative rounded-2xl overflow-hidden bg-[#0c141d] border border-teal-900/40 p-3 shadow-2xl">
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#080d12]">
                  {/* Portrait Image */}
                  {!imageError ? (
                    <img
                      src="https://iili.io/naGxr8u.jpg"
                      alt="Sofia — Personal portrait"
                      referrerPolicy="no-referrer"
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageError(true)}
                      className={`w-full h-full object-cover object-center transition-all duration-700 ${
                        imageLoaded ? 'scale-100 opacity-100 filter brightness-95 contrast-105' : 'scale-105 opacity-0'
                      }`}
                    />
                  ) : null}

                  {/* Fallback container if image cannot load */}
                  {(!imageLoaded || imageError) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#0c1622] via-[#091017] to-[#04080c] text-center">
                      <div className="w-16 h-16 rounded-full bg-teal-950/80 border border-teal-700/50 flex items-center justify-center text-teal-300 font-title text-2xl font-bold mb-3 shadow-inner">
                        S
                      </div>
                      <h3 className="font-title text-white font-semibold text-base">Sofia</h3>
                      <p className="font-reading text-xs text-slate-400 mt-1 max-w-[200px]">
                        Personal, Projects &amp; Work Archive
                      </p>
                    </div>
                  )}

                  {/* Gentle gradient scrim at the base of the portrait */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0c141d] via-[#0c141d]/50 to-transparent pointer-events-none" />

                  {/* Floating Caption Tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-sans text-slate-300 bg-[#080d12]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-teal-900/40">
                    <span className="font-medium text-teal-300">Sofia</span>
                    <span className="text-slate-400 font-mono text-[10px]">2018–2026 Archive</span>
                  </div>
                </div>

                {/* Micro caption under image */}
                <div className="pt-3 px-1 flex items-center justify-between text-xs text-slate-400 font-sans">
                  <span>Digital Works &amp; Endeavors</span>
                  <span className="text-emerald-400 font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 pt-8 border-t border-teal-950/60 flex flex-col items-center justify-center text-slate-500">
          <a
            href="index.html#about"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('about');
            }}
            className="group flex flex-col items-center gap-1.5 text-xs font-sans text-slate-400 hover:text-teal-300 transition-colors"
          >
            <span>Scroll down to explore</span>
            <ArrowDown className="w-4 h-4 text-teal-400 group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
