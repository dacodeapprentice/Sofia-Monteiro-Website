import React, { useState, useEffect } from 'react';
import { Feather, Plus, Eye, ArrowUpRight, BookOpen, Trash2 } from 'lucide-react';

interface ArticleItem {
  id: string;
  title: string;
  readTime: string;
  date: string;
  excerpt: string;
  href?: string;
}

const DEFAULT_SAMPLE_ARTICLES: ArticleItem[] = [
  {
    id: 'sample-w1',
    title: 'The Poetics of Restrained Software Interfaces',
    readTime: '5 min read',
    date: 'February 2026',
    excerpt:
      'Why modern software benefits from the quiet dignity of book design. When colors are disciplined and typography breathes, clarity replaces visual noise.',
    href: 'index.html#writing',
  },
  {
    id: 'sample-w2',
    title: 'Field Notes: Dark Mode Luminance and Eye Fatigue',
    readTime: '7 min read',
    date: 'November 2025',
    excerpt:
      'An exploration into low-contrast obsidian and emerald palettes. How balanced ambient tones cultivate prolonged immersion without optical strain.',
    href: 'index.html#writing',
  },
  {
    id: 'sample-w3',
    title: 'Analog Cameras, Grain, and the Digital Canvas',
    readTime: '4 min read',
    date: 'August 2025',
    excerpt:
      'What shooting with manual shutter dials taught me about deliberate product craftsmanship and intentional pacing in software development.',
    href: 'index.html#writing',
  },
];

export const WritingSection: React.FC = () => {
  const [showSamples, setShowSamples] = useState(false);
  const [articles, setArticles] = useState<ArticleItem[]>(() => {
    try {
      const saved = localStorage.getItem('sofia_articles');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newReadTime, setNewReadTime] = useState('4 min read');
  const [newExcerpt, setNewExcerpt] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('sofia_articles', JSON.stringify(articles));
    } catch {
      // ignore
    }
  }, [articles]);

  const handleAddArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const item: ArticleItem = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      readTime: newReadTime.trim() || '3 min read',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      excerpt: newExcerpt.trim() || 'Essay content preview...',
      href: 'index.html#writing',
    };

    setArticles([item, ...articles]);
    setNewTitle('');
    setNewExcerpt('');
    setIsAdding(false);
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(articles.filter((a) => a.id !== id));
  };

  const displayArticles = showSamples ? DEFAULT_SAMPLE_ARTICLES : articles;

  return (
    <section
      id="writing"
      aria-label="Writing and Blog Section"
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-teal-950/40 relative bg-[#070c11]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-sans tracking-wide uppercase mb-2">
              <Feather className="w-3.5 h-3.5" />
              <span>Section 04 · Essays &amp; Reflections</span>
            </div>
            <h2 className="font-title text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Writing &amp; Notes
            </h2>
            <p className="font-serif text-slate-300 text-lg mt-2 max-w-2xl leading-relaxed">
              Essays, field notes, and longform thoughts on craft, technology, and life.
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/40 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isAdding ? 'Cancel' : 'Add Draft'}</span>
            </button>
          </div>
        </div>

        {/* Add Article Drawer */}
        {isAdding && (
          <form
            onSubmit={handleAddArticle}
            className="mb-10 p-6 rounded-2xl bg-[#0d1722] border border-teal-800/40 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-title text-sm font-semibold text-white">
                Add an Essay / Note Draft
              </h3>
              <span className="text-xs text-slate-500 font-sans">Saves locally</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-sans text-slate-400 mb-1">
                  Essay Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. On Finding Stillness in Code"
                  className="w-full px-3 py-2 bg-[#070c12] border border-teal-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500 font-sans"
                />
              </div>
              <div>
                <label className="block text-xs font-sans text-slate-400 mb-1">
                  Estimated Read Time
                </label>
                <input
                  type="text"
                  value={newReadTime}
                  onChange={(e) => setNewReadTime(e.target.value)}
                  placeholder="5 min read"
                  className="w-full px-3 py-2 bg-[#070c12] border border-teal-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500 font-sans"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-sans text-slate-400 mb-1">
                Excerpt / Opening Passage (Serif Reading Text)
              </label>
              <textarea
                rows={3}
                value={newExcerpt}
                onChange={(e) => setNewExcerpt(e.target.value)}
                placeholder="The opening paragraph or thesis of the essay..."
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
                Save Draft
              </button>
            </div>
          </form>
        )}

        {/* Content Area or Clean Minimalist Empty State */}
        {displayArticles.length === 0 ? (
          <div className="relative rounded-2xl border border-dashed border-teal-900/50 bg-[#091118]/60 p-10 sm:p-14 text-center">
            <div className="w-12 h-12 rounded-xl bg-teal-950/60 border border-teal-800/40 flex items-center justify-center mx-auto mb-4 text-teal-400">
              <Feather className="w-6 h-6 text-teal-400" />
            </div>
            <h3 className="font-title text-lg font-semibold text-white tracking-tight">
              Writing Space In Preparation
            </h3>
            <p className="font-serif text-slate-400 text-base max-w-lg mx-auto mt-2 leading-relaxed">
              This publication shelf is prepared for Sofia's essays, think pieces, and studio notes. Articles will be published here.
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
                <span>Draft First Essay</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-teal-950/60">
            {displayArticles.map((article) => (
              <article
                key={article.id}
                className="py-7 first:pt-0 last:pb-0 group flex flex-col md:flex-row md:items-baseline justify-between gap-4"
              >
                <div className="space-y-2 max-w-3xl">
                  {/* Unboxed Metadata (Zero-pill discipline) */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-sans">
                    <span className="text-teal-400 font-medium">{article.date}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  {/* Title (Non-serif) */}
                  <h3 className="font-title text-xl sm:text-2xl font-semibold text-white group-hover:text-teal-300 transition-colors">
                    <a href={article.href || 'index.html#writing'} className="hover:underline">
                      {article.title}
                    </a>
                  </h3>

                  {/* Reading Excerpt (Serif) */}
                  <p className="font-serif text-slate-300 text-base leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
                  <a
                    href={article.href || 'index.html#writing'}
                    className="inline-flex items-center gap-1 text-xs font-sans font-semibold text-teal-400 hover:text-teal-200 transition-colors"
                  >
                    <span>Read Note</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  {!showSamples && (
                    <button
                      onClick={() => handleDeleteArticle(article.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      aria-label="Delete essay draft"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
