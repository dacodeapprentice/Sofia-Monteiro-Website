import React, { useState, useEffect } from 'react';
import { FolderGit2, Plus, Eye, ExternalLink, Code2, Sparkles, Trash2 } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  linkText?: string;
  href?: string;
}

const DEFAULT_SAMPLE_PROJECTS: ProjectItem[] = [
  {
    id: 'sample-p1',
    title: 'Aura Spatial Systems',
    category: 'Interface & Architecture',
    year: '2025',
    summary:
      'An experimental ambient canvas exploring dark mode light scattering and tactile interactions for focused deep work.',
    linkText: 'Case Study',
    href: 'index.html#projects',
  },
  {
    id: 'sample-p2',
    title: 'Verdant Engine',
    category: 'Creative Computation',
    year: '2024',
    summary:
      'Algorithmic plant generation and cellular automata visualizations built for interactive botanical museum installations.',
    linkText: 'Repository',
    href: 'index.html#projects',
  },
  {
    id: 'sample-p3',
    title: 'Chronos Editorial Journal',
    category: 'Design & Publishing',
    year: '2023',
    summary:
      'A typography-first publishing framework pairing classical serif book layouts with ultra-responsive modern web viewports.',
    linkText: 'Overview',
    href: 'index.html#projects',
  },
];

export const ProjectsSection: React.FC = () => {
  const [showSamples, setShowSamples] = useState(false);
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem('sofia_projects');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Web & Systems');
  const [newYear, setNewYear] = useState('2026');
  const [newSummary, setNewSummary] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('sofia_projects', JSON.stringify(projects));
    } catch {
      // ignore
    }
  }, [projects]);

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const project: ProjectItem = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      category: newCategory.trim() || 'Project',
      year: newYear.trim() || '2026',
      summary: newSummary.trim() || 'Project description coming soon.',
      linkText: 'View Project',
      href: 'index.html#projects',
    };

    setProjects([project, ...projects]);
    setNewTitle('');
    setNewSummary('');
    setIsAdding(false);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const displayProjects = showSamples ? DEFAULT_SAMPLE_PROJECTS : projects;

  return (
    <section
      id="projects"
      aria-label="Projects Section"
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-teal-950/40 relative bg-[#070c11]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-sans tracking-wide uppercase mb-2">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Section 02 · Creations &amp; Artifacts</span>
            </div>
            <h2 className="font-title text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Projects
            </h2>
            <p className="font-serif text-slate-300 text-lg mt-2 max-w-2xl leading-relaxed">
              The things I've done over the years with projects — investigations in design, software, and creative craft.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowSamples(!showSamples)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium text-slate-300 bg-[#0c1520] hover:bg-[#142332] border border-teal-900/40 rounded-lg transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-teal-400" />
              <span>{showSamples ? 'Hide Sample Preview' : 'Preview Layout'}</span>
            </button>
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium text-teal-300 bg-teal-950/40 hover:bg-teal-900/50 border border-teal-800/40 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-teal-400" />
              <span>{isAdding ? 'Cancel' : 'Add Project'}</span>
            </button>
          </div>
        </div>

        {/* Add Project Drawer */}
        {isAdding && (
          <form
            onSubmit={handleAddProject}
            className="mb-10 p-6 rounded-2xl bg-[#0d1722] border border-teal-800/40 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-title text-sm font-semibold text-white">
                Add a Project Entry
              </h3>
              <span className="text-xs text-slate-500 font-sans">Saves locally</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-sans text-slate-400 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Ambient Soundscape Synthesizer"
                  className="w-full px-3 py-2 bg-[#070c12] border border-teal-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500 font-sans"
                />
              </div>
              <div>
                <label className="block text-xs font-sans text-slate-400 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  value={newYear}
                  onChange={(e) => setNewYear(e.target.value)}
                  placeholder="2026"
                  className="w-full px-3 py-2 bg-[#070c12] border border-teal-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500 font-sans"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-sans text-slate-400 mb-1">
                Category
              </label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="e.g. Digital Systems, Interactive Design"
                className="w-full px-3 py-2 bg-[#070c12] border border-teal-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500 font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-sans text-slate-400 mb-1">
                Project Summary (Serif Reading Text)
              </label>
              <textarea
                rows={3}
                value={newSummary}
                onChange={(e) => setNewSummary(e.target.value)}
                placeholder="Describe what was built, key explorations, or technologies..."
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
                className="px-4 py-1.5 text-xs font-semibold font-sans bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
              >
                Save Project
              </button>
            </div>
          </form>
        )}

        {/* Content Area or Clean Minimalist Empty State */}
        {displayProjects.length === 0 ? (
          <div className="relative rounded-2xl border border-dashed border-teal-900/50 bg-[#091118]/60 p-10 sm:p-14 text-center">
            <div className="w-12 h-12 rounded-xl bg-teal-950/60 border border-teal-800/40 flex items-center justify-center mx-auto mb-4 text-teal-400">
              <FolderGit2 className="w-6 h-6 text-teal-400" />
            </div>
            <h3 className="font-title text-lg font-semibold text-white tracking-tight">
              Project Showcase In Preparation
            </h3>
            <p className="font-serif text-slate-400 text-base max-w-lg mx-auto mt-2 leading-relaxed">
              This section is configured to showcase Sofia's selected repositories, creative applications, and design experiments over the years.
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
                <span>Add First Project</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayProjects.map((project) => (
              <div
                key={project.id}
                className="relative group p-6 rounded-2xl bg-[#0c1520] border border-teal-900/30 hover:border-teal-700/50 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Unboxed Metadata (Zero-pill discipline) */}
                  <div className="flex items-center justify-between text-xs text-slate-400 font-sans mb-3">
                    <span className="text-emerald-400 font-medium">{project.category}</span>
                    <span className="text-slate-500 font-mono text-[11px]">{project.year}</span>
                  </div>

                  {/* Title (Non-serif) */}
                  <h3 className="font-title text-lg font-semibold text-white mb-2 leading-snug group-hover:text-teal-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Reading Prose (Serif) */}
                  <p className="font-serif text-slate-300 text-sm leading-relaxed mb-4">
                    {project.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-teal-950/60 flex items-center justify-between">
                  <a
                    href={project.href || 'index.html#projects'}
                    className="inline-flex items-center gap-1 text-xs font-sans font-semibold text-teal-400 hover:text-teal-200 transition-colors"
                  >
                    <span>{project.linkText || 'Explore'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {!showSamples && (
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      aria-label="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
