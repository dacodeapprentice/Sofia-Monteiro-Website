import React, { useState } from 'react';
import { ArrowDown, Sparkles, Compass, FolderGit2, Briefcase, Feather, ArrowUpRight } from 'lucide-react';

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
      {/* Ambient background backdrop image (hosted remotely) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden="true">
        <img
          src="https://iili.io/naGx4yb.jpg"
          alt="Hero ambient backdrop"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-screen filter saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080d12]/75 via-[#080d12]/80 to-[#080d12]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#080d12] via-[#080d12]/30 to-[#080d12]"></div>
      </div>

      <div className="relative max-w-5xl mx-auto w-full">
        {/* Main Hero Split Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
          {/* Left Column: Greeting, Manifesto, and Quick Anchors */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Unboxed Metadata (Zero-pill discipline) */}
            <div className="flex items-center gap-2.5 text-xs text-slate-400 font-sans tracking-wide">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-teal-300 font-medium">Personal Archive</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Selected Works</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Life &amp; Craft</span>
            </div>

            {/* Non-serif Title */}
            <h1 className="font-title text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Hello, I'm <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">Sofia</span>.
            </h1>

            {/* Serif Reading Prose - Sofia's Core Statement */}
            <div className="relative pl-4 border-l-2 border-teal-500/40 py-1">
              <p className="font-serif text-lg sm:text-xl text-slate-300 leading-relaxed italic">
                "This is the personal aspect of my life, and here are the things I've done over the years with projects and at work. Browse through them, and thank you."
              </p>
            </div>

            <p className="font-serif text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
              Welcome to my digital corner — an evolving sanctuary bringing together personal chapters, crafted projects, career chronicles, and reflective essays under one tranquil roof.
            </p>

            {/* Quick Action Buttons (Connected with href="index.html#...") */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="index.html#projects"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('projects');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-title text-sm font-semibold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-all shadow-lg shadow-emerald-950/20"
              >
                <span>Browse Projects</span>
                <FolderGit2 className="w-4 h-4 text-emerald-400" />
              </a>

              <a
                href="index.html#personal"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('personal');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-title text-sm font-semibold bg-[#0e1924] hover:bg-[#142332] text-slate-200 border border-teal-900/40 transition-all"
              >
                <span>Personal Aspect</span>
                <Compass className="w-4 h-4 text-teal-400" />
              </a>

              <a
                href="index.html#career"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('career');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-title text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
              >
                <span>Work Timeline</span>
                <ArrowUpRight className="w-4 h-4 text-slate-500" />
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
                  <span>Personal Spaces &amp; Endeavors</span>
                  <span className="text-emerald-400 font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 pt-8 border-t border-teal-950/60 flex flex-col items-center justify-center text-slate-500">
          <a
            href="index.html#personal"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('personal');
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
