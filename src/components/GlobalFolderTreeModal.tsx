import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Globe,
  Play,
  Terminal,
  User,
  Mail,
  Home,
  Sparkles,
  ExternalLink,
  Search,
  ArrowRight,
  Copy,
  Check,
  Maximize2,
} from 'lucide-react';
import {
  FOLDERS_STRUCTURE,
  SITE_DOCS,
  EXPLORER_WEBSITES,
  EXPLORER_CHANNELS,
  SiteFolderNode,
  SiteDocFile,
  WebsiteFile,
  YouTubeVideoFile,
  YouTubeChannelFolder,
  getAllSiteSearchItems,
  SearchResultItem,
} from '../explorerData';

interface GlobalFolderTreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPath?: string;
  onNavigate: (sectionId: string, anchorOrPath?: string) => void;
}

export const GlobalFolderTreeModal: React.FC<GlobalFolderTreeModalProps> = ({
  isOpen,
  onClose,
  initialPath,
  onNavigate,
}) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedPath, setSelectedPath] = useState<string>('sofia://');
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    root: true,
    home: true,
    about: true,
    websites: true,
    tools: true,
    youtube: true,
    contact: true,
  });
  const [activeVideoModal, setActiveVideoModal] = useState<YouTubeVideoFile | null>(null);
  const [copied, setCopied] = useState(false);

  // Sync initial path when opening
  useEffect(() => {
    if (initialPath) {
      setSelectedPath(initialPath);
    }
  }, [initialPath, isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeVideoModal) {
          setActiveVideoModal(null);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, activeVideoModal, onClose]);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const expandAll = () => {
    const next: Record<string, boolean> = { root: true };
    FOLDERS_STRUCTURE.forEach((f) => (next[f.id] = true));
    EXPLORER_CHANNELS.forEach((ch) => (next[ch.id] = true));
    setExpandedFolders(next);
  };

  const collapseAll = () => {
    setExpandedFolders({ root: true });
  };

  // Find currently selected item
  const selectedItem = useMemo(() => {
    const all = getAllSiteSearchItems();
    return (
      all.find((i) => i.path === selectedPath) ||
      all.find((i) => i.id === 'root') ||
      all[0]
    );
  }, [selectedPath]);

  // Filter items if searching
  const searchResults = useMemo(() => {
    if (!searchFilter.trim()) return null;
    const term = searchFilter.toLowerCase();
    return getAllSiteSearchItems().filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.path.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
    );
  }, [searchFilter]);

  const handleSelectAndGo = (item: SearchResultItem) => {
    setSelectedPath(item.path);
    if (item.type === 'video' && item.youtubeId) {
      // Find full video object
      for (const ch of EXPLORER_CHANNELS) {
        const found = ch.videos.find((v) => v.id === item.id);
        if (found) {
          setActiveVideoModal(found);
          break;
        }
      }
      return;
    }

    // Determine target page and navigate
    let targetSection = 'hero';
    if (item.path.startsWith('sofia://home')) targetSection = 'hero';
    else if (item.path.startsWith('sofia://about')) targetSection = 'about';
    else if (item.path.startsWith('sofia://websites')) targetSection = 'website';
    else if (item.path.startsWith('sofia://contact')) targetSection = 'contact';

    onNavigate(targetSection);
    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(selectedItem.path);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#04080c]/85 backdrop-blur-md">
      {/* Modal Dialog Window */}
      <div className="w-full max-w-6xl h-[92vh] max-h-[850px] bg-[#091119] border border-teal-800/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-sans animate-in fade-in zoom-in-95 duration-200">
        {/* Window Chrome Header */}
        <div className="bg-[#050b10] px-4 py-3 border-b border-teal-950 flex items-center justify-between select-none">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-rose-500/90 hover:bg-rose-400 inline-block transition-transform hover:scale-110"
                title="Close"
              />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="flex items-center gap-2 text-xs font-title font-semibold text-white ml-2">
              <FolderOpen className="w-4 h-4 text-teal-400" />
              <span>Sofia OS · Complete Website Folder Tree &amp; File Directory</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-400">
              <span className="text-teal-400">●</span>
              <span>Browsing Virtual Filesystem</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-teal-950/60 transition-colors"
              aria-label="Close Explorer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Address Bar & Quick Search Header inside Modal */}
        <div className="bg-[#070e15] p-3 sm:p-4 border-b border-teal-900/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Virtual Path Indicator */}
          <div className="flex items-center gap-2 bg-[#04080d] border border-teal-900/50 rounded-xl px-3 py-1.5 flex-1 max-w-xl">
            <span className="text-xs font-mono font-bold text-teal-400 shrink-0">PATH:</span>
            <span className="text-xs font-mono text-teal-200 truncate">{selectedItem.path}</span>
            <button
              onClick={handleCopy}
              className="ml-auto text-slate-400 hover:text-teal-300 p-1 transition-colors"
              title="Copy path"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Search Filter Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter site files & folders..."
              className="w-full bg-[#050b10] border border-teal-900/60 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-teal-400 transition-colors"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Tree Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={expandAll}
              className="px-2.5 py-1 text-xs rounded-lg bg-[#0b1622] hover:bg-[#122336] text-slate-300 hover:text-white border border-teal-900/40 transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-2.5 py-1 text-xs rounded-lg bg-[#0b1622] hover:bg-[#122336] text-slate-300 hover:text-white border border-teal-900/40 transition-colors"
            >
              Collapse
            </button>
          </div>
        </div>

        {/* Main Explorer Workspace: Split View */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden bg-[#070d13]">
          {/* Left Column: Interactive Folder Tree (5 cols) */}
          <div className="md:col-span-5 border-r border-teal-900/40 overflow-y-auto p-4 space-y-1 custom-scroll bg-[#081017]">
            {searchResults ? (
              /* Search results list mode */
              <div className="space-y-1">
                <div className="text-[11px] font-title font-semibold uppercase tracking-wider text-teal-400 mb-2 px-2">
                  Matching Items ({searchResults.length})
                </div>
                {searchResults.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400">
                    No folders or files found matching "{searchFilter}".
                  </div>
                ) : (
                  searchResults.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedPath(item.path)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        selectedPath === item.path
                          ? 'bg-teal-950 text-teal-300 border border-teal-700/60 font-medium'
                          : 'text-slate-300 hover:bg-[#0d1c29] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {item.type === 'folder' && <Folder className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                        {item.type === 'website' && <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        {item.type === 'video' && <Play className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
                        {item.type === 'channel' && <Play className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                        {item.type === 'doc' && <Terminal className="w-3.5 h-3.5 text-teal-400 shrink-0" />}
                        <span className="truncate">{item.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono shrink-0 ml-2">{item.badge}</span>
                    </button>
                  ))
                )}
              </div>
            ) : (
              /* Hierarchical Tree Mode */
              <div className="text-xs space-y-0.5 select-none">
                {/* ROOT: sofia:// */}
                <div
                  onClick={() => setSelectedPath('sofia://')}
                  className={`group flex items-center justify-between px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors ${
                    selectedPath === 'sofia://'
                      ? 'bg-teal-950/80 text-teal-300 border border-teal-800/60 font-semibold'
                      : 'text-slate-200 hover:bg-[#0c1824]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-teal-400" />
                    <span className="font-title font-medium tracking-tight">sofia:// (Master Archive)</span>
                  </div>
                  <span className="text-[10px] font-mono text-teal-500/80">root</span>
                </div>

                <div className="pl-3.5 border-l border-teal-950/80 ml-2 space-y-1 mt-1">
                  {/* FOLDER 1: Home */}
                  <div>
                    <div
                      className={`flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${
                        selectedPath === 'sofia://home'
                          ? 'bg-teal-950/80 text-teal-300 border border-teal-800/60 font-semibold'
                          : 'text-slate-300 hover:bg-[#0c1824]'
                      }`}
                    >
                      <div
                        className="flex items-center gap-1.5 flex-1 min-w-0"
                        onClick={() => setSelectedPath('sofia://home')}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFolder('home');
                          }}
                          className="p-0.5 text-slate-500 hover:text-slate-300"
                        >
                          {expandedFolders.home ? (
                            <ChevronDown className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <Home className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span className="font-title font-medium truncate">home/</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">3 files</span>
                    </div>

                    {expandedFolders.home && (
                      <div className="pl-6 space-y-0.5 mt-0.5 border-l border-teal-950/50 ml-3">
                        {SITE_DOCS.filter((d) => d.section === 'Home').map((doc) => (
                          <div
                            key={doc.id}
                            onClick={() => setSelectedPath(doc.path)}
                            className={`px-2 py-1 rounded-md cursor-pointer flex items-center justify-between transition-colors ${
                              selectedPath === doc.path
                                ? 'bg-teal-950 text-teal-300 font-medium'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-[#0c1824]'
                            }`}
                          >
                            <span className="truncate">{doc.title}</span>
                            <span className="text-[10px] text-slate-600 font-mono">{doc.badge}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* FOLDER 2: About */}
                  <div>
                    <div
                      className={`flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${
                        selectedPath === 'sofia://about'
                          ? 'bg-teal-950/80 text-teal-300 border border-teal-800/60 font-semibold'
                          : 'text-slate-300 hover:bg-[#0c1824]'
                      }`}
                    >
                      <div
                        className="flex items-center gap-1.5 flex-1 min-w-0"
                        onClick={() => setSelectedPath('sofia://about')}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFolder('about');
                          }}
                          className="p-0.5 text-slate-500 hover:text-slate-300"
                        >
                          {expandedFolders.about ? (
                            <ChevronDown className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <User className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="font-title font-medium truncate">about/ (Dossier)</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">5 records</span>
                    </div>

                    {expandedFolders.about && (
                      <div className="pl-6 space-y-0.5 mt-0.5 border-l border-teal-950/50 ml-3">
                        {SITE_DOCS.filter((d) => d.section === 'About').map((doc) => (
                          <div
                            key={doc.id}
                            onClick={() => setSelectedPath(doc.path)}
                            className={`px-2 py-1 rounded-md cursor-pointer flex items-center justify-between transition-colors ${
                              selectedPath === doc.path
                                ? 'bg-teal-950 text-teal-300 font-medium'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-[#0c1824]'
                            }`}
                          >
                            <span className="truncate">{doc.title}</span>
                            <span className="text-[10px] text-slate-600 font-mono">{doc.badge}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* FOLDER 3: Websites & Media */}
                  <div>
                    <div
                      className={`flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${
                        selectedPath === 'sofia://websites'
                          ? 'bg-teal-950/80 text-teal-300 border border-teal-800/60 font-semibold'
                          : 'text-slate-300 hover:bg-[#0c1824]'
                      }`}
                    >
                      <div
                        className="flex items-center gap-1.5 flex-1 min-w-0"
                        onClick={() => setSelectedPath('sofia://websites')}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFolder('websites');
                          }}
                          className="p-0.5 text-slate-500 hover:text-slate-300"
                        >
                          {expandedFolders.websites ? (
                            <ChevronDown className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="font-title font-medium truncate">websites/</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">Live</span>
                    </div>

                    {expandedFolders.websites && (
                      <div className="pl-4 space-y-1.5 mt-1 border-l border-teal-950/60 ml-2">
                        {/* Subfolder 3A: Everyday Tools */}
                        <div>
                          <div
                            className={`flex items-center justify-between px-2 py-1 rounded-md cursor-pointer transition-colors ${
                              selectedPath === 'sofia://websites/tools'
                                ? 'bg-teal-950 text-teal-300 font-medium'
                                : 'text-slate-300 hover:text-white hover:bg-[#0c1824]'
                            }`}
                            onClick={() => setSelectedPath('sofia://websites/tools')}
                          >
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFolder('tools');
                                }}
                                className="p-0.5 text-slate-500 hover:text-slate-300"
                              >
                                {expandedFolders.tools ? (
                                  <ChevronDown className="w-3 h-3" />
                                ) : (
                                  <ChevronRight className="w-3 h-3" />
                                )}
                              </button>
                              <span className="font-mono text-xs text-teal-400">📁</span>
                              <span>tools/ (Web Apps)</span>
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono">4 apps</span>
                          </div>

                          {expandedFolders.tools && (
                            <div className="pl-6 space-y-0.5 mt-0.5 border-l border-teal-950/40 ml-2">
                              {EXPLORER_WEBSITES.map((site) => (
                                <div
                                  key={site.id}
                                  onClick={() => setSelectedPath(site.path)}
                                  className={`px-2 py-1 rounded-md cursor-pointer flex items-center justify-between transition-colors ${
                                    selectedPath === site.path
                                      ? 'bg-teal-950 text-teal-300 font-medium'
                                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#0c1824]'
                                  }`}
                                >
                                  <div className="flex items-center gap-1.5 truncate">
                                    <Globe className="w-3 h-3 text-teal-400 shrink-0" />
                                    <span className="truncate">{site.title}</span>
                                  </div>
                                  <span className="text-[10px] text-emerald-400 font-mono shrink-0 ml-1">
                                    {site.badge}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Subfolder 3B: YouTube Channels */}
                        <div>
                          <div
                            className={`flex items-center justify-between px-2 py-1 rounded-md cursor-pointer transition-colors ${
                              selectedPath === 'sofia://websites/youtube'
                                ? 'bg-teal-950 text-teal-300 font-medium'
                                : 'text-slate-300 hover:text-white hover:bg-[#0c1824]'
                            }`}
                            onClick={() => setSelectedPath('sofia://websites/youtube')}
                          >
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFolder('youtube');
                                }}
                                className="p-0.5 text-slate-500 hover:text-slate-300"
                              >
                                {expandedFolders.youtube ? (
                                  <ChevronDown className="w-3 h-3" />
                                ) : (
                                  <ChevronRight className="w-3 h-3" />
                                )}
                              </button>
                              <Play className="w-3 h-3 text-rose-400" />
                              <span>youtube/ (Media Channels)</span>
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono">4 channels</span>
                          </div>

                          {expandedFolders.youtube && (
                            <div className="pl-4 space-y-1 mt-0.5 border-l border-teal-950/40 ml-2">
                              {EXPLORER_CHANNELS.map((ch) => (
                                <div key={ch.id} className="space-y-0.5">
                                  <div
                                    onClick={() => setSelectedPath(ch.path)}
                                    className={`px-2 py-1 rounded-md cursor-pointer flex items-center justify-between transition-colors ${
                                      selectedPath === ch.path
                                        ? 'bg-teal-950 text-teal-300 font-medium'
                                        : 'text-slate-400 hover:text-slate-200 hover:bg-[#0c1824]'
                                    }`}
                                  >
                                    <span className="truncate">{ch.title}</span>
                                    <span className="text-[10px] text-rose-400 font-mono">{ch.handle}</span>
                                  </div>
                                  <div className="pl-4 space-y-0.5 border-l border-teal-950/30 ml-2">
                                    {ch.videos.map((vid) => (
                                      <div
                                        key={vid.id}
                                        onClick={() => setSelectedPath(vid.path)}
                                        className={`px-2 py-0.5 rounded cursor-pointer flex items-center justify-between text-[11px] transition-colors ${
                                          selectedPath === vid.path
                                            ? 'bg-rose-950/60 text-rose-300 font-medium'
                                            : 'text-slate-500 hover:text-slate-300 hover:bg-[#0c1824]'
                                        }`}
                                      >
                                        <div className="flex items-center gap-1.5 truncate">
                                          <Play className="w-2.5 h-2.5 text-rose-500 shrink-0" />
                                          <span className="truncate">{vid.title}</span>
                                        </div>
                                        <span className="text-[9px] font-mono text-slate-600">{vid.duration}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* FOLDER 4: Contact */}
                  <div>
                    <div
                      className={`flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${
                        selectedPath === 'sofia://contact'
                          ? 'bg-teal-950/80 text-teal-300 border border-teal-800/60 font-semibold'
                          : 'text-slate-300 hover:bg-[#0c1824]'
                      }`}
                    >
                      <div
                        className="flex items-center gap-1.5 flex-1 min-w-0"
                        onClick={() => setSelectedPath('sofia://contact')}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFolder('contact');
                          }}
                          className="p-0.5 text-slate-500 hover:text-slate-300"
                        >
                          {expandedFolders.contact ? (
                            <ChevronDown className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span className="font-title font-medium truncate">contact/</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">3 files</span>
                    </div>

                    {expandedFolders.contact && (
                      <div className="pl-6 space-y-0.5 mt-0.5 border-l border-teal-950/50 ml-3">
                        {SITE_DOCS.filter((d) => d.section === 'Contact').map((doc) => (
                          <div
                            key={doc.id}
                            onClick={() => setSelectedPath(doc.path)}
                            className={`px-2 py-1 rounded-md cursor-pointer flex items-center justify-between transition-colors ${
                              selectedPath === doc.path
                                ? 'bg-teal-950 text-teal-300 font-medium'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-[#0c1824]'
                            }`}
                          >
                            <span className="truncate">{doc.title}</span>
                            <span className="text-[10px] text-slate-600 font-mono">{doc.badge}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Active Item Detailed Dossier & Launchpad (7 cols) */}
          <div className="md:col-span-7 p-6 overflow-y-auto flex flex-col justify-between bg-[#070d13]">
            <div>
              {/* Item Path & Header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 rounded-md bg-teal-950 text-teal-400 border border-teal-800/60 text-xs font-mono">
                  {selectedItem.badge}
                </span>
                <span className="text-xs text-slate-500 font-sans">{selectedItem.category}</span>
              </div>

              <h2 className="font-title text-2xl font-bold text-white mb-2 tracking-tight">
                {selectedItem.title}
              </h2>

              <div className="text-xs font-mono text-teal-400/90 mb-4 bg-[#050b10] p-2 rounded-lg border border-teal-950">
                {selectedItem.path}
              </div>

              <p className="font-reading text-slate-300 text-sm leading-relaxed mb-6">
                {selectedItem.description}
              </p>

              {/* Specific Content Details Depending on Type */}
              {selectedItem.type === 'website' && (
                <div className="p-4 rounded-xl bg-[#0b1622] border border-teal-900/40 mb-6 space-y-3">
                  <div className="flex items-center justify-between text-xs font-title font-medium text-slate-300">
                    <span>Live Interactive Web App</span>
                    <span className="text-emerald-400">● Hosted Online</span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans">
                    Runs independently in any browser without installation or complex dependencies.
                  </p>
                  {selectedItem.url && (
                    <a
                      href={selectedItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-title font-semibold text-xs shadow-md transition-colors"
                    >
                      <span>Launch App</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}

              {selectedItem.type === 'video' && selectedItem.youtubeId && (
                <div className="mb-6 rounded-xl overflow-hidden border border-rose-950/60 bg-black aspect-video relative group">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${selectedItem.youtubeId}`}
                    title={selectedItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {selectedItem.type === 'folder' && (
                <div className="p-4 rounded-xl bg-[#0b1622]/60 border border-teal-950 mb-6">
                  <div className="text-xs font-title font-semibold text-teal-400 mb-2">
                    Directory Contents
                  </div>
                  <p className="text-xs text-slate-400 font-reading leading-relaxed">
                    Click items in the folder tree to open child documents, live web tools, or video channels.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-teal-950/80 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-mono">
                Click "Navigate" to go to this section
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-title text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectAndGo(selectedItem)}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-title font-semibold text-xs shadow-lg transition-colors"
                >
                  <span>Go to Section</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
