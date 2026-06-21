import { useState } from 'react';
import { LessonContent, Level, LStatus } from '../types';
import { Search, Filter, CheckCircle2, Circle, Clock, Eye, Sparkles, Plus, Trash2, Edit } from 'lucide-react';
import { WORKFLOW_COLUMN_DETAILS } from '../data';

interface LibraryProps {
  lessons: LessonContent[];
  selectedLetter: string;
  onSelectLetter: (letter: string) => void;
  currentLevel: Level;
  onAddConcept?: (letter: string, concept: string) => void;
}

export default function AbcLibrary({ lessons, selectedLetter, onSelectLetter, currentLevel, onAddConcept }: LibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | LStatus>('All');

  // Search and status filtering logic
  const filteredLessons = lessons.filter(l => {
    const matchesSearch = 
      l.letter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.concept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.bigIdea.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'All' ? true : l.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Count items by status to show badge counts in filters
  const getStatusCounts = (status: 'All' | LStatus) => {
    if (status === 'All') return lessons.length;
    return lessons.filter(l => l.status === status).length;
  };

  const statuses: ('All' | LStatus)[] = [
    'All',
    'Idea',
    'Drafted',
    'Designed',
    'Recorded',
    'Edited',
    'Scheduled',
    'Published'
  ];

  // Helper colors for status pills inside library items
  const getStatusBadgeStyle = (status: LStatus) => {
    switch (status) {
      case 'Published': return 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50';
      case 'Scheduled': return 'bg-teal-950/40 text-teal-400 border-teal-900/50';
      case 'Edited': return 'bg-purple-950/40 text-purple-400 border-purple-900/50';
      case 'Recorded': return 'bg-indigo-950/40 text-indigo-400 border-indigo-900/50';
      case 'Designed': return 'bg-blue-950/40 text-blue-400 border-blue-900/50';
      case 'Drafted': return 'bg-amber-950/40 text-amber-400 border-amber-900/50';
      default: return 'bg-zinc-900 text-zinc-400 border-zinc-800';
    }
  };

  return (
    <div className="w-full bg-brand-card/30 border border-brand-border rounded-[24px] p-6 backdrop-blur-md">
      {/* Search and Filtering Toolbar */}
      <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center mb-6">
        <div>
          <h2 className="text-lg font-sans font-extrabold text-white flex items-center gap-2 tracking-tight">
            <span>A–Z Alphabet Portfolio</span>
            <span className="text-xs font-mono font-normal bg-brand-orange/10 text-brand-orange border border-brand-orange/20 px-2.5 py-0.5 rounded-full">
              {currentLevel} Tier Spine
            </span>
          </h2>
          <p className="text-xs text-brand-muted font-body mt-0.5">
            Select a letter card to review production assets, edit scripts, generate templates, or trigger podcast builders.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full xl:w-80">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            className="w-full bg-black/60 border border-brand-border focus:border-brand-orange text-white text-xs font-body rounded-xl pl-9.5 pr-4 py-2.5 outline-none transition-all placeholder:text-brand-muted"
            placeholder="Search letter, title or core theme..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Badges Slider */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-4 border-b border-brand-border/40 scrollbar-thin">
        <Filter className="w-3.5 h-3.5 text-brand-muted shrink-0 mr-1.5" />
        {statuses.map((st) => {
          const isActive = statusFilter === st;
          const count = getStatusCounts(st);
          return (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wide shrink-0 transition-all border flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-white text-black border-white'
                  : 'bg-black/40 text-brand-muted border-brand-border hover:text-white hover:border-brand-muted/30'
              }`}
            >
              <span>{st}</span>
              <span className={`text-[10px] px-1.5 py-0.25 rounded-md ${
                isActive ? 'bg-zinc-900 text-white' : 'bg-brand-card text-brand-muted'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* A-Z Grid */}
      {filteredLessons.length === 0 ? (
        <div className="py-12 text-center border border-dashed border-brand-border/60 rounded-xl">
          <p className="text-brand-muted font-body text-sm">No curriculum concepts found matching your current filter.</p>
          <button 
            onClick={() => { setSearchTerm(''); setStatusFilter('All'); }} 
            className="mt-3 text-xs font-mono text-brand-orange hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3.5">
          {filteredLessons.map((l) => {
            const isSelected = selectedLetter === l.letter;
            
            return (
              <button
                key={`${l.letter}_${l.level}`}
                onClick={() => onSelectLetter(l.letter)}
                className={`relative group rounded-xl p-3 bg-black/40 border text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                  isSelected 
                    ? 'bg-[#191924]/60 border-brand-orange ring-1 ring-brand-orange/20 shadow-[0_4px_16px_rgba(255,90,0,0.15)]' 
                    : 'border-brand-border hover:border-brand-muted/40 hover:bg-black/70'
                }`}
              >
                {/* Visual Status Indicator Sparkle Line */}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-3 h-3 bg-brand-orange rounded-bl-lg" />
                )}

                {/* Card Letter and Label badge */}
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xl font-mono font-extrabold tracking-tight text-white group-hover:text-brand-orange transition-colors">
                    {l.letter}
                  </span>
                  <span className={`text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded border ${getStatusBadgeStyle(l.status)}`}>
                    {l.status}
                  </span>
                </div>

                {/* Concept Main Title */}
                <h3 className="text-xs font-sans font-bold text-white truncate group-hover:text-brand-orange/90 transition-colors">
                  {l.concept}
                </h3>

                {/* Subtitle / Big payoff */}
                <p className="text-[10px] text-brand-muted font-body mt-1 line-clamp-2 leading-relaxed">
                  {l.bigIdea}
                </p>

                {/* Dynamic mini tag for action */}
                <div className="mt-2.5 pt-2 border-t border-brand-border/30 flex justify-between items-center text-[9px] font-mono text-brand-muted">
                  <span className="truncate max-w-[80px]">
                    {l.cta ? l.cta.split(' ')[0] : 'Action'}
                  </span>
                  <span className="text-brand-orange/80 shrink-0">
                    → Edit
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
