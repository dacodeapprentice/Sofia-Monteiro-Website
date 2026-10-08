import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  Folder,
  FolderOpen,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home,
  Copy,
  Check,
  Search,
  ExternalLink,
  Play,
  Terminal,
  User,
  Mail,
  Sparkles,
  Compass,
} from 'lucide-react';
import {
  getAllSiteSearchItems,
  resolveSitePath,
  SearchResultItem,
} from '../explorerData';

interface GlobalSiteBrowserBarProps {
  activeSection: string;
  onNavigate: (sectionId: string, anchorOrPath?: string) => void;
  onOpenFolderTree: (initialPath?: string) => void;
}

export const GlobalSiteBrowserBar: React.FC<GlobalSiteBrowserBarProps> = ({
  activeSection,
  onNavigate,
  onOpenFolderTree,
}) => {
  const [currentPath, setCurrentPath] = useState<string>('sofia://home');
  const [inputValue, setInputValue] = useState<string>('sofia://home');
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>(['sofia://home']);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isReloading, setIsReloading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<SearchResultItem[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync address bar when activeSection changes from scroll/nav
  useEffect(() => {
    let target = 'sofia://home';
    if (activeSection === 'hero') target = 'sofia://home';
    else if (activeSection === 'about') target = 'sofia://about';
    else if (activeSection === 'website') target = 'sofia://websites';
    else if (activeSection === 'contact') target = 'sofia://contact';

    setCurrentPath(target);
    setInputValue(target);
  }, [activeSection]);

  // Keyboard shortcut (Cmd+K or /) to focus address bar or open tree
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenFolderTree();
      } else if (e.key === '/' && document.activeElement !== inputRef.current && !(document.activeElement instanceof HTMLInputElement) && !(document.activeElement instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenFolderTree]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsInputFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions on search input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setSearchQuery(val);

    const term = val.toLowerCase().replace(/^sofia:\/\//, '').trim();
    if (!term) {
      setSuggestions(getAllSiteSearchItems().slice(0, 8));
      return;
    }

    const filtered = getAllSiteSearchItems()
      .filter((item) => {
        return (
          item.title.toLowerCase().includes(term) ||
          item.path.toLowerCase().includes(term) ||
          item.category.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term) ||
          item.badge.toLowerCase().includes(term)
        );
      })
      .slice(0, 8);

    setSuggestions(filtered);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    const term = inputValue.toLowerCase().replace(/^sofia:\/\//, '').trim();
    if (!term) {
      setSuggestions(getAllSiteSearchItems().slice(0, 8));
    } else {
      const filtered = getAllSiteSearchItems()
        .filter((item) => item.path.toLowerCase().includes(term) || item.title.toLowerCase().includes(term))
        .slice(0, 8);
      setSuggestions(filtered);
    }
  };

  const executeNavigate = (path: string) => {
    const resolved = resolveSitePath(path);
    if (!resolved) {
      // Default to websites if unknown
      onNavigate('website');
      setCurrentPath('sofia://websites');
      setInputValue('sofia://websites');
      setIsInputFocused(false);
      return;
    }

    const newPath = resolved.path;
    setCurrentPath(newPath);
    setInputValue(newPath);
    setIsInputFocused(false);

    // Update history
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(newPath);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);

    // Determine target section
    if (newPath.startsWith('sofia://home')) {
      onNavigate('hero');
    } else if (newPath.startsWith('sofia://about')) {
      onNavigate('about');
    } else if (newPath.startsWith('sofia://websites')) {
      onNavigate('website');
      // If it's a specific tool or video, we can also notify folder tree or scroll
      if (newPath.includes('youtube') || newPath.includes('tools')) {
        const el = document.getElementById(resolved.id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (newPath.startsWith('sofia://contact')) {
      onNavigate('contact');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeNavigate(inputValue);
      inputRef.current?.blur();
    } else if (e.key === 'Escape') {
      setInputValue(currentPath);
      setIsInputFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const prev = historyIndex - 1;
      setHistoryIndex(prev);
      const path = history[prev];
      executeNavigate(path);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const next = historyIndex + 1;
      setHistoryIndex(next);
      const path = history[next];
      executeNavigate(path);
    }
  };

  const handleReload = () => {
    setIsReloading(true);
    setTimeout(() => {
      setIsReloading(false);
    }, 600);
  };

  const handleHome = () => {
    executeNavigate('sofia://home');
  };

  const handleCopyPath = () => {
    navigator.clipboard?.writeText(window.location.origin + '/' + currentPath);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#0a121a] border-b border-teal-900/40 text-slate-200 select-none transition-all shadow-lg relative z-20">
      {/* Chrome Header: Window Status + Protocol Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2.5 pb-1 flex items-center justify-between text-xs border-b border-teal-950/60 font-mono text-slate-400">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block shadow-sm" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block shadow-sm" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block shadow-sm" />
          </div>
          <span className="text-[11px] text-teal-300/90 font-medium tracking-tight flex items-center gap-1.5 ml-2">
            <Compass className="w-3.5 h-3.5 text-teal-400" />
            <span>Sofia OS · Unified Folder Directory &amp; Web Browser</span>
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1 text-slate-400">
            <span className="text-teal-400">●</span> Active Protocol: <code className="text-teal-300">sofia://</code>
          </span>
          <button
            onClick={() => onOpenFolderTree()}
            className="text-[11px] font-sans px-2 py-0.5 rounded bg-teal-950/70 border border-teal-800/50 text-teal-300 hover:bg-teal-900/60 hover:text-white transition-all flex items-center gap-1"
          >
            <span>Press</span>
            <kbd className="px-1 py-0.2 bg-black/40 rounded border border-teal-700/50 text-[10px]">⌘K</kbd>
            <span>for Full Tree</span>
          </button>
        </div>
      </div>

      {/* Main Address Bar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row items-stretch md:items-center gap-2 sm:gap-3">
        {/* Navigation Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleBack}
            disabled={historyIndex === 0}
            title="Go back"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-teal-950/60 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleForward}
            disabled={historyIndex >= history.length - 1}
            title="Go forward"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-teal-950/60 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleReload}
            title="Reload location"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-teal-950/60 transition-colors"
          >
            <RotateCw className={`w-4 h-4 ${isReloading ? 'animate-spin text-teal-400' : ''}`} />
          </button>
          <button
            onClick={handleHome}
            title="Go to Home (sofia://home)"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-teal-950/60 transition-colors"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>

        {/* Omnipresent Address Bar Input Container */}
        <div className="flex-1 relative">
          <div
            className={`w-full flex items-center bg-[#060b10] border rounded-xl px-3 py-1.5 transition-all shadow-inner ${
              isInputFocused
                ? 'border-teal-400 ring-2 ring-teal-500/20 shadow-teal-950/50'
                : 'border-teal-900/50 hover:border-teal-700/60'
            }`}
          >
            <div className="flex items-center gap-1.5 text-teal-400 mr-2 shrink-0 select-none">
              <Globe className="w-4 h-4" />
              <span className="text-xs font-mono font-semibold text-teal-400/90">sofia://</span>
            </div>

            <input
              ref={inputRef}
              type="text"
              value={inputValue.replace(/^sofia:\/\//, '')}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onKeyDown={handleKeyDown}
              placeholder="Type any section, website, folder, or video (e.g. websites, taper, racing, about, contact)..."
              className="flex-1 bg-transparent text-sm font-mono text-slate-100 placeholder:text-slate-500 placeholder:font-sans focus:outline-none tracking-tight"
            />

            <div className="flex items-center gap-1 shrink-0 ml-2">
              <button
                type="button"
                onClick={handleCopyPath}
                title="Copy current address"
                className="p-1 rounded text-slate-400 hover:text-teal-300 hover:bg-teal-950/40 transition-colors"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => executeNavigate(inputValue)}
                title="Jump to address"
                className="px-2 py-0.5 rounded text-xs font-sans font-medium bg-teal-900/60 hover:bg-teal-800 text-teal-200 border border-teal-700/60 transition-colors"
              >
                Go
              </button>
            </div>
          </div>

          {/* Autocomplete & Quick Search Dropdown */}
          {isInputFocused && suggestions.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 right-0 mt-1.5 bg-[#09121a] border border-teal-800/60 rounded-xl shadow-2xl py-2 max-h-80 overflow-y-auto z-50 backdrop-blur-md font-sans"
            >
              <div className="px-3 py-1 text-[11px] font-title font-semibold text-teal-400 uppercase tracking-wider flex justify-between items-center border-b border-teal-950/60 mb-1">
                <span>Direct Navigation Suggestions</span>
                <span className="text-slate-500 lowercase font-normal">Press Enter or click</span>
              </div>
              {suggestions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    executeNavigate(item.path);
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-teal-950/80 transition-colors flex items-center justify-between gap-3 group border-b border-teal-950/30 last:border-0"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="p-1 rounded bg-[#0d1b27] border border-teal-900/60 text-teal-400 shrink-0">
                      {item.type === 'folder' && <Folder className="w-3.5 h-3.5" />}
                      {item.type === 'website' && <Globe className="w-3.5 h-3.5" />}
                      {item.type === 'video' && <Play className="w-3.5 h-3.5" />}
                      {item.type === 'channel' && <Play className="w-3.5 h-3.5 text-rose-400" />}
                      {item.type === 'doc' && <Terminal className="w-3.5 h-3.5" />}
                    </span>
                    <div className="truncate">
                      <div className="text-xs font-medium text-slate-200 group-hover:text-teal-300 flex items-center gap-2 truncate">
                        <span>{item.title}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-teal-950 text-teal-400/90 border border-teal-900/50">
                          {item.badge}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono truncate">{item.path}</div>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-500 font-sans group-hover:text-teal-400 shrink-0">
                    {item.category} →
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Global Action: Open Full Folder Tree */}
        <button
          onClick={() => onOpenFolderTree(currentPath)}
          className="shrink-0 flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-950 to-teal-900 hover:from-teal-900 hover:to-teal-800 text-teal-200 border border-teal-700/60 shadow-md text-xs font-title font-medium transition-all group"
          title="Browse entire website as interactive folder structure"
        >
          <FolderOpen className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
          <span>Browse Site Folders</span>
          <span className="hidden lg:inline-block text-[10px] bg-black/40 px-1.5 py-0.5 rounded border border-teal-700/40 text-teal-300">
            Tree View
          </span>
        </button>
      </div>

      {/* Bookmarks Bar: Instant 1-Click Jumps Across the Whole Website */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-2 flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
        <span className="text-[10px] uppercase font-title font-bold text-slate-500 tracking-wider mr-1 shrink-0">
          Bookmarks:
        </span>

        <button
          onClick={() => executeNavigate('sofia://home')}
          className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-title transition-colors ${
            currentPath.startsWith('sofia://home')
              ? 'bg-teal-950 text-teal-300 border-teal-700/70 font-semibold'
              : 'bg-[#060b10] text-slate-300 border-teal-950 hover:border-teal-800 hover:text-white'
          }`}
        >
          <Home className="w-3 h-3 text-teal-400" />
          <span>Home</span>
        </button>

        <button
          onClick={() => executeNavigate('sofia://about')}
          className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-title transition-colors ${
            currentPath.startsWith('sofia://about')
              ? 'bg-teal-950 text-teal-300 border-teal-700/70 font-semibold'
              : 'bg-[#060b10] text-slate-300 border-teal-950 hover:border-teal-800 hover:text-white'
          }`}
        >
          <User className="w-3 h-3 text-cyan-400" />
          <span>About Dossier</span>
        </button>

        <button
          onClick={() => executeNavigate('sofia://websites')}
          className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-title transition-colors ${
            currentPath === 'sofia://websites'
              ? 'bg-teal-950 text-teal-300 border-teal-700/70 font-semibold'
              : 'bg-[#060b10] text-slate-300 border-teal-950 hover:border-teal-800 hover:text-white'
          }`}
        >
          <Globe className="w-3 h-3 text-emerald-400" />
          <span>Websites Directory</span>
        </button>

        <button
          onClick={() => executeNavigate('sofia://websites/tools')}
          className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-title transition-colors ${
            currentPath === 'sofia://websites/tools'
              ? 'bg-teal-950 text-teal-300 border-teal-700/70 font-semibold'
              : 'bg-[#060b10] text-slate-300 border-teal-950 hover:border-teal-800 hover:text-white'
          }`}
        >
          <span className="text-teal-400 font-mono">🛠️</span>
          <span>Everyday Tools</span>
        </button>

        <button
          onClick={() => executeNavigate('sofia://websites/youtube')}
          className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-title transition-colors ${
            currentPath.startsWith('sofia://websites/youtube')
              ? 'bg-teal-950 text-teal-300 border-teal-700/70 font-semibold'
              : 'bg-[#060b10] text-slate-300 border-teal-950 hover:border-teal-800 hover:text-white'
          }`}
        >
          <Play className="w-3 h-3 text-rose-400" />
          <span>YouTube Channels</span>
        </button>

        <button
          onClick={() => executeNavigate('sofia://websites/tools/high-octane')}
          className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-title bg-[#060b10] text-amber-300 border-teal-950 hover:border-amber-700/60 transition-colors"
        >
          <span>🏎️</span>
          <span>High Octane (Game)</span>
        </button>

        <button
          onClick={() => executeNavigate('sofia://contact')}
          className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-title transition-colors ${
            currentPath.startsWith('sofia://contact')
              ? 'bg-teal-950 text-teal-300 border-teal-700/70 font-semibold'
              : 'bg-[#060b10] text-slate-300 border-teal-950 hover:border-teal-800 hover:text-white'
          }`}
        >
          <Mail className="w-3 h-3 text-teal-400" />
          <span>Contact</span>
        </button>

        <button
          onClick={() => onOpenFolderTree()}
          className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg border border-teal-800/40 bg-teal-950/40 text-teal-300 hover:bg-teal-900/60 transition-colors ml-auto text-xs"
        >
          <Folder className="w-3 h-3 text-teal-400" />
          <span>Full Site Hierarchy</span>
        </button>
      </div>
    </div>
  );
};
