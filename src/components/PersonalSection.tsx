import React, { useState, useEffect } from 'react';
import { Compass, Plus, Eye, Trash2, Heart, BookOpen, Camera, Sparkles } from 'lucide-react';

interface PersonalNote {
  id: string;
  category: string;
  title: string;
  date: string;
  content: string;
}

const DEFAULT_SAMPLE_NOTES: PersonalNote[] = [
  {
    id: 'sample-1',
    category: 'Philosophy & Life',
    title: 'Cultivating Calm in a High-Velocity World',
    date: 'Autumn 2025',
    content:
      'Finding the rhythm between deep focus and unhurried rest. The most meaningful ideas often arrive during quiet morning walks with cold air and black coffee.',
  },
  {
    id: 'sample-2',
    category: 'Curiosities & Reading',
    title: 'On Architecture, Botany & Analog Photography',
    date: 'Spring 2026',
    content:
      'Collecting mechanical 35mm cameras, observing brutalist facades overgrown with ivy, and learning the resilient structures of wild flora.',
  },
  {
    id: 'sample-3',
    category: 'Habits & Rituals',
    title: 'Studio Rituals and Intentional Spaces',
    date: 'Ongoing',
    content:
      'Keeping physical and digital desks minimal. Ambient blue-green lighting, physical notebooks for ink sketches before writing a single line of code.',
  },
];

export const PersonalSection: React.FC = () => {
  const [showSamples, setShowSamples] = useState(false);
  const [notes, setNotes] = useState<PersonalNote[]>(() => {
    try {
      const saved = localStorage.getItem('sofia_personal_notes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Personal Reflection');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('sofia_personal_notes', JSON.stringify(notes));
    } catch {
      // ignore
    }
  }, [notes]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const note: PersonalNote = {
      id: Date.now().toString(),
      category: newCategory.trim() || 'Personal',
      title: newTitle.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      content: newContent.trim() || 'Note content drafting...',
    };

    setNotes([note, ...notes]);
    setNewTitle('');
    setNewContent('');
    setIsAdding(false);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const displayNotes = showSamples ? DEFAULT_SAMPLE_NOTES : notes;

  return (
    <section
      id="personal"
      aria-label="Personal Section"
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-teal-950/40 relative"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-sans tracking-wide uppercase mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Section 01 · Life &amp; Perspectives</span>
            </div>
            <h2 className="font-title text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Personal Life
            </h2>
            <p className="font-serif text-slate-300 text-lg mt-2 max-w-2xl leading-relaxed">
              The personal aspect of my life — thoughts, curiosities, rituals, and quiet chapters beyond the screen.
            </p>
          </div>

          {/* Action buttons to toggle sample preview or add content */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowSamples(!showSamples)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium text-slate-300 bg-[#0e1822] hover:bg-[#152332] border border-teal-900/40 rounded-lg transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-teal-400" />
              <span>{showSamples ? 'Hide Sample Preview' : 'Preview Format'}</span>
            </button>
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/40 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isAdding ? 'Cancel' : 'Add Entry'}</span>
            </button>
          </div>
        </div>

        {/* Add Entry Form Modal/Inline Drawer */}
        {isAdding && (
          <form
            onSubmit={handleAddNote}
            className="mb-10 p-6 rounded-2xl bg-[#0c1520] border border-teal-800/40 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-title text-sm font-semibold text-white">
                Add a Personal Entry / Thought
              </h3>
              <span className="text-xs text-slate-500 font-sans">Saves locally</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans text-slate-400 mb-1">
                  Category / Topic
                </label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="e.g. Life Philosophy, Reading, Film"
                  className="w-full px-3 py-2 bg-[#070c12] border border-teal-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500 font-sans"
                />
              </div>
              <div>
                <label className="block text-xs font-sans text-slate-400 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Quiet mornings in the studio"
                  className="w-full px-3 py-2 bg-[#070c12] border border-teal-900/50 rounded-lg text-sm text-white focus:outline-none focus:border-teal-500 font-sans"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-sans text-slate-400 mb-1">
                Content (Serif Reading Text)
              </label>
              <textarea
                rows={3}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Write your personal thought, story, or reflection here..."
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
                Save Entry
              </button>
            </div>
          </form>
        )}

        {/* Content Area or Clean Minimalist Empty State */}
        {displayNotes.length === 0 ? (
          <div className="relative rounded-2xl border border-dashed border-teal-900/50 bg-[#091118]/60 p-10 sm:p-14 text-center">
            <div className="w-12 h-12 rounded-xl bg-teal-950/60 border border-teal-800/40 flex items-center justify-center mx-auto mb-4 text-teal-400">
              <Compass className="w-6 h-6 text-teal-400" />
            </div>
            <h3 className="font-title text-lg font-semibold text-white tracking-tight">
              Personal Space In Preparation
            </h3>
            <p className="font-serif text-slate-400 text-base max-w-lg mx-auto mt-2 leading-relaxed">
              This page is reserved for Sofia's personal narratives, curiosities, memories, and life philosophies. Content will be added here soon.
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
                <span>Add First Entry</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayNotes.map((note) => (
              <div
                key={note.id}
                className="relative group p-6 rounded-2xl bg-[#0c1520] border border-teal-900/30 hover:border-teal-700/50 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Unboxed Metadata Header */}
                  <div className="flex items-center justify-between text-xs text-slate-400 font-sans mb-3">
                    <span className="text-teal-400 font-medium">{note.category}</span>
                    <span className="text-slate-500 font-mono text-[11px]">{note.date}</span>
                  </div>

                  {/* Title (Non-serif) */}
                  <h3 className="font-title text-base font-semibold text-white mb-2 leading-snug">
                    {note.title}
                  </h3>

                  {/* Reading Prose (Serif) */}
                  <p className="font-serif text-slate-300 text-sm leading-relaxed">
                    {note.content}
                  </p>
                </div>

                {!showSamples && (
                  <div className="mt-4 pt-3 border-t border-teal-950/40 flex justify-end">
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      aria-label="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
