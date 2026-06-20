import { LessonContent, LStatus, Level } from '../types';
import { WORKFLOW_COLUMNS, WORKFLOW_COLUMN_DETAILS } from '../data';
import { ArrowLeft, ArrowRight, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

interface BoardProps {
  lessons: LessonContent[];
  onUpdateStatus: (letter: string, level: Level, newStatus: LStatus) => void;
  onSelectLetter: (letter: string) => void;
  selectedLetter: string;
}

export default function WorkflowBoard({ lessons, onUpdateStatus, onSelectLetter, selectedLetter }: BoardProps) {
  
  // Pivot lessons by status
  const getLessonsByStatus = (status: LStatus) => {
    return lessons.filter(l => l.status === status);
  };

  // Safe status movement helpers
  const moveStatus = (letter: string, level: Level, current: LStatus, direction: 'prev' | 'next') => {
    const currentIndex = WORKFLOW_COLUMNS.indexOf(current);
    let nextIndex = currentIndex;

    if (direction === 'prev' && currentIndex > 0) {
      nextIndex = currentIndex - 1;
    } else if (direction === 'next' && currentIndex < WORKFLOW_COLUMNS.length - 1) {
      nextIndex = currentIndex + 1;
    }

    if (nextIndex !== currentIndex) {
      onUpdateStatus(letter, level, WORKFLOW_COLUMNS[nextIndex]);
    }
  };

  return (
    <div className="w-full bg-brand-card/30 border border-brand-border rounded-[24px] p-6 backdrop-blur-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-sans font-extrabold text-white flex items-center gap-2.5 tracking-tight">
            <span className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <span>A-Z Lesson Production Kanban Pipeline</span>
          </h2>
          <p className="text-xs text-brand-muted font-body mt-0.5">
            Track asset creation from concept to draft, visual design, recording, editing, up to scheduled calendar slots and final publication.
          </p>
        </div>

        <div className="flex items-center gap-2 text-2xs font-mono text-brand-muted bg-black/40 px-3 py-1.5 rounded-lg border border-brand-border/40">
          <AlertCircle className="w-3.5 h-3.5 text-brand-orange" />
          <span>Interactive Shifts Enabled</span>
        </div>
      </div>

      {/* Horizontal Scroll Board */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin max-w-full">
        {WORKFLOW_COLUMNS.map((col) => {
          const columnLessons = getLessonsByStatus(col);
          const colInfo = WORKFLOW_COLUMN_DETAILS[col];

          return (
            <div 
              key={col} 
              className="flex-1 min-w-[245px] max-w-[280px] bg-black/50 border border-brand-border rounded-[20px] p-4 flex flex-col justify-between"
            >
              {/* Column Title Header */}
              <div>
                <div className="flex items-center justify-between pb-3.5 border-b border-brand-border/40 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                    <h3 className="text-xs font-mono font-bold text-white tracking-wide">
                      {colInfo.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-850 border border-zinc-700/40 text-brand-muted font-semibold">
                    {columnLessons.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 min-h-[340px] max-h-[460px] overflow-y-auto pr-1 scrollbar-thin">
                  {columnLessons.length === 0 ? (
                    <div className="py-12 text-center text-3xs font-mono text-zinc-600 border border-dashed border-brand-border/30 rounded-xl">
                      EMPTY COLUMN
                    </div>
                  ) : (
                    columnLessons.map((l) => {
                      const isSelected = selectedLetter === l.letter;

                      return (
                        <div
                          key={`${l.letter}_column`}
                          onClick={() => onSelectLetter(l.letter)}
                          className={`group p-3 rounded-xl scale-98 hover:scale-100 bg-brand-card/90 border transition-all duration-300 cursor-pointer ${
                            isSelected 
                              ? 'border-brand-orange bg-[#1D2028] shadow-[0_4px_12px_rgba(255,90,0,0.1)]' 
                              : 'border-brand-border/80 hover:border-brand-muted/40'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-mono font-black text-white group-hover:text-brand-orange transition-colors">
                              {l.letter}
                            </span>
                            <span className="text-[9px] font-mono select-none px-1.5 py-0.25 bg-black/40 text-zinc-400 rounded border border-brand-border/45">
                              {l.level}
                            </span>
                          </div>

                          <h4 className="text-xs font-bold text-white leading-tight truncate">
                            {l.concept}
                          </h4>

                          <p className="text-[10px] text-brand-muted font-body mt-1.5 line-clamp-2 leading-relaxed">
                            {l.bigIdea}
                          </p>

                          {/* Quick Shift controllers per card */}
                          <div className="mt-3.5 pt-2 border-t border-brand-border/30 flex justify-between items-center">
                            <button
                              disabled={col === 'Idea'}
                              onClick={(e) => {
                                e.stopPropagation();
                                moveStatus(l.letter, l.level, l.status, 'prev');
                              }}
                              className="p-1 rounded bg-black/60 hover:bg-black border border-brand-border disabled:opacity-30 disabled:pointer-events-none hover:text-brand-orange cursor-pointer"
                              title="Shift status left"
                            >
                              <ArrowLeft className="w-3 h-3 text-zinc-400" />
                            </button>

                            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                              MOVE
                            </span>

                            <button
                              disabled={col === 'Published'}
                              onClick={(e) => {
                                e.stopPropagation();
                                moveStatus(l.letter, l.level, l.status, 'next');
                              }}
                              className="p-1 rounded bg-black/60 hover:bg-black border border-brand-border disabled:opacity-30 disabled:pointer-events-none hover:text-brand-orange cursor-pointer"
                              title="Shift status right"
                            >
                              <ArrowRight className="w-3 h-3 text-zinc-400" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Column Footer Detail */}
              <div className="mt-4 pt-3 border-t border-brand-border/40 text-[9px] font-mono text-zinc-500 truncate italic">
                {colInfo.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
