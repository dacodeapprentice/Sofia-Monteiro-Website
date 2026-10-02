import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Eye, Calendar, Building, Sparkles, Trash2 } from 'lucide-react';

interface CareerItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
}

const DEFAULT_SAMPLE_CAREER: CareerItem[] = [
  {
    id: 'career-1',
    role: 'Lead Digital Experience Designer',
    company: 'Atelier Studio',
    period: '2023 — Present',
    location: 'Remote / Berlin',
    description:
      'Guiding end-to-end interface systems, architectural guidelines, and tactile digital products with a focus on restrained typography and responsive craft.',
  },
  {
    id: 'career-2',
    role: 'Product Engineer & Researcher',
    company: 'Nova Labs',
    period: '2021 — 2023',
    location: 'Zurich',
    description:
      'Spearheaded algorithmic visualization tools and modular UI component ecosystems. Collaborated closely with cross-functional research teams.',
  },
  {
    id: 'career-3',
    role: 'Creative Developer',
    company: 'Independent Practice',
    period: '2019 — 2021',
    location: 'Hybrid',
    description:
      'Partnered directly with cultural institutions, design agencies, and independent founders on interactive web exhibitions and editorial portfolios.',
  },
];

export const CareerSection: React.FC = () => {
  const [showSamples, setShowSamples] = useState(false);
  const [experiences, setExperiences] = useState<CareerItem[]>(() => {
    try {
      const saved = localStorage.getItem('sofia_career');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newPeriod, setNewPeriod] = useState('2024 — Present');
  const [newLocation, setNewLocation] = useState('Remote');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('sofia_career', JSON.stringify(experiences));
    } catch {
      // ignore
    }
  }, [experiences]);

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRole.trim() || !newCompany.trim()) return;

    const item: CareerItem = {
      id: Date.now().toString(),
      role: newRole.trim(),
      company: newCompany.trim(),
      period: newPeriod.trim() || 'Ongoing',
      location: newLocation.trim() || 'Remote',
      description: newDescription.trim() || 'Role details and achievements...',
    };

    setExperiences([item, ...experiences]);
    setNewRole('');
    setNewCompany('');
    setNewDescription('');
    setIsAdding(false);
  };

  const handleDeleteExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const displayExperiences = showSamples ? DEFAULT_SAMPLE_CAREER : experiences;

  return (
    <section
      id="career"
      aria-label="Career and Work Section"
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-teal-950/40 relative"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-sans tracking-wide uppercase mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Section 03 · Experience &amp; Impact</span>
            </div>
            <h2 className="font-title text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Career &amp; Work
            </h2>
            <p className="font-serif text-slate-300 text-lg mt-2 max-w-2xl leading-relaxed">
              Professional history, roles, collaborations, and craft developed in studio and product environments over the years.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowSamples(!showSamples)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium text-slate-300 bg-[#0e1822] hover:bg-[#152332] border border-teal-900/40 rounded-lg transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-teal-400" />
              <span>{showSamples ? 'Hide Sample Preview' : 'Preview Layout'}</span>
            </button>
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/40 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isAdding ? 'Cancel' : 'Add Experience'}</span>
            </button>
          </div>
        </div>

        {/* Add Experience Drawer */}
        {isAdding && (
          <form
            onSubmit={handleAddExperience}
            className="mb-10 p-6 rounded-2xl bg-[#0c1520] border border-teal-800/40 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-title text-sm font-semibold text-white">
                Add Career Experience
              </h3>
              <span className="text-xs text-slate-500 font-sans">Saves locally</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans text-slate-400 mb-1">
                  Role / Title
                </label>
                <input
                  type="text"
                  required
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="e.g. Senior Product Designer"
                  className="w-full px-3 py-2 bg-[#070c12] border border-teal-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500 font-sans"
                />
              </div>
              <div>
                <label className="block text-xs font-sans text-slate-400 mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g. Acme Studio"
                  className="w-full px-3 py-2 bg-[#070c12] border border-teal-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500 font-sans"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans text-slate-400 mb-1">
                  Period / Timeline
                </label>
                <input
                  type="text"
                  value={newPeriod}
                  onChange={(e) => setNewPeriod(e.target.value)}
                  placeholder="e.g. 2022 — 2025"
                  className="w-full px-3 py-2 bg-[#070c12] border border-teal-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500 font-sans"
                />
              </div>
              <div>
                <label className="block text-xs font-sans text-slate-400 mb-1">
                  Location / Mode
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. New York / Remote"
                  className="w-full px-3 py-2 bg-[#070c12] border border-teal-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500 font-sans"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-sans text-slate-400 mb-1">
                Description &amp; Key Outcomes (Serif Reading Text)
              </label>
              <textarea
                rows={3}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Key responsibilities, team leadership, systems architected, or client impact..."
                className="w-full px-3 py-2 bg-[#070c12] border border-teal-900/50 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-teal-500 font-serif leading-relaxed"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-1.5 text-xs text-slate-400 hover:text-white font-sans"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold font-sans bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition-colors"
              >
                Save Experience
              </button>
            </div>
          </form>
        )}

        {/* Content Area or Clean Minimalist Empty State */}
        {displayExperiences.length === 0 ? (
          <div className="relative rounded-2xl border border-dashed border-teal-900/50 bg-[#091118]/60 p-10 sm:p-14 text-center">
            <div className="w-12 h-12 rounded-xl bg-teal-950/60 border border-teal-800/40 flex items-center justify-center mx-auto mb-4 text-teal-400">
              <Briefcase className="w-6 h-6 text-teal-400" />
            </div>
            <h3 className="font-title text-lg font-semibold text-white tracking-tight">
              Work &amp; Experience Timeline In Preparation
            </h3>
            <p className="font-serif text-slate-400 text-base max-w-lg mx-auto mt-2 leading-relaxed">
              This space will host Sofia's career history, formal roles, freelance collaborations, and professional achievements.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setShowSamples(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-sans font-semibold bg-[#101b26] text-teal-300 hover:bg-[#172737] border border-teal-800/40 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Preview Template Layout</span>
              </button>
              <button
                onClick={() => setIsAdding(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-sans font-semibold bg-emerald-950/50 text-emerald-300 hover:bg-emerald-900/60 border border-emerald-800/50 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add First Experience</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {displayExperiences.map((exp, index) => (
              <div
                key={exp.id}
                className="relative p-6 sm:p-8 rounded-2xl bg-[#0c1520] border border-teal-900/30 hover:border-teal-700/50 transition-all flex flex-col md:flex-row md:items-start justify-between gap-6"
              >
                <div className="space-y-3 flex-1">
                  {/* Unboxed Metadata (Zero-pill discipline) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-sans">
                    <span className="text-emerald-400 font-semibold">{exp.company}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-teal-300 font-mono text-[11px]">{exp.period}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>{exp.location}</span>
                  </div>

                  {/* Title (Non-serif) */}
                  <h3 className="font-title text-xl font-bold text-white tracking-tight">
                    {exp.role}
                  </h3>

                  {/* Reading Prose (Serif) */}
                  <p className="font-serif text-slate-300 text-sm leading-relaxed max-w-3xl">
                    {exp.description}
                  </p>
                </div>

                {!showSamples && (
                  <button
                    onClick={() => handleDeleteExperience(exp.id)}
                    className="self-end md:self-start text-slate-500 hover:text-rose-400 transition-colors p-1"
                    aria-label="Delete experience"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
