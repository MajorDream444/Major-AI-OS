import { Level, LStatus, LessonContent } from '../types';
import { ShieldCheck, Layers, Award, Terminal, Cpu, Users } from 'lucide-react';

interface HeroProps {
  currentLevel: Level;
  onLevelChange: (level: Level) => void;
  lessons: LessonContent[];
}

export default function HeroStatsCards({ currentLevel, onLevelChange, lessons }: HeroProps) {
  // Compute some quick count summaries based on saved statuses
  const getLevelStats = (level: Level) => {
    // Beginner counts are actual, others can be simulated/configured beautifully
    if (level === 'Beginner') {
      const activeCount = lessons.filter(l => l.status !== 'Idea').length;
      const pct = Math.round((activeCount / lessons.length) * 100);
      return { activeCount, pct };
    } else if (level === 'Medium') {
      const activeCount = Math.round(lessons.length * 0.4); // Simulated template readiness
      const pct = Math.round((activeCount / lessons.length) * 100);
      return { activeCount, pct };
    } else {
      const activeCount = Math.round(lessons.length * 0.25); // Simulated template readiness
      const pct = Math.round((activeCount / lessons.length) * 100);
      return { activeCount, pct };
    }
  };

  const levelsConfig: {
    level: Level;
    promise: string;
    profile: string;
    objectives: string[];
    successState: string;
    badgeStyle: string;
    icon: any;
    accentColor: string;
  }[] = [
    {
      level: 'Beginner',
      promise: '“You can do this”',
      profile: 'New to AI, intimidated, curious, low technical confidence.',
      objectives: [
        'Recognize where AI fits in daily life',
        'Write raw instructions & ask clearly',
        'Verify basic outcomes & obvious errors'
      ],
      successState: 'Brainstorm, summarize, and draft simple plans without feeling technical overwhelm.',
      badgeStyle: 'bg-brand-orange text-black font-semibold',
      icon: Terminal,
      accentColor: 'border-brand-orange/40 hover:border-brand-orange text-brand-orange'
    },
    {
      level: 'Medium',
      promise: '“You can improve this”',
      profile: 'Already experimenting but inconsistent with results or tools.',
      objectives: [
        'Compare generative tools & capabilities',
        'Frame prompt chains & role models',
        'Connect text with docs, calendars & tools'
      ],
      successState: 'Construct repeatable and scheduled workflows for dynamic daily production.',
      badgeStyle: 'bg-brand-blue text-white font-semibold',
      icon: Layers,
      accentColor: 'border-brand-blue/40 hover:border-brand-blue text-brand-blue'
    },
    {
      level: 'Expert',
      promise: '“You can systematize this”',
      profile: 'Builder, executive, operator, strategist, or tech founder.',
      objectives: [
        'Design custom programmatic systems',
        'Set corporate governance & security standards',
        'Optimize token budgets & metric ROI'
      ],
      successState: 'Architect stateful AI integrations and make disciplined platform decisions.',
      badgeStyle: 'border border-white/60 bg-transparent text-white font-semibold',
      icon: Cpu,
      accentColor: 'border-zinc-500/40 hover:border-white text-white'
    }
  ];

  return (
    <div className="w-full">
      {/* Intro Label with orange line */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-[1px] bg-brand-orange block" />
        <span className="text-xs font-mono uppercase tracking-widest text-brand-muted">
          SELECT THE LEARNING &amp; PRODUCTION TIER
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {levelsConfig.map((cfg) => {
          const isSelected = currentLevel === cfg.level;
          const { activeCount, pct } = getLevelStats(cfg.level);
          const IconComponent = cfg.icon;

          return (
            <button
              key={cfg.level}
              onClick={() => onLevelChange(cfg.level)}
              className={`relative text-left rounded-[24px] p-6 bg-brand-card border transition-all duration-300 group cursor-pointer ${
                isSelected 
                  ? 'border-white/50 bg-[#21242B] ring-1 ring-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.5)]' 
                  : 'border-brand-border hover:border-brand-muted/40 hover:bg-[#1d2026]'
              }`}
            >
              {/* Corner Laser Accent on selected card */}
              {isSelected && (
                <>
                  <span className="absolute top-0 left-0 w-6 h-[1.5px] bg-brand-orange shadow-[0_0_8px_#FF5A00]" />
                  <span className="absolute top-0 left-0 h-6 w-[1.5px] bg-brand-orange shadow-[0_0_8px_#FF5A00]" />
                  <span className="absolute bottom-0 right-0 w-6 h-[1.5px] bg-brand-blue shadow-[0_0_8px_#2563EB]" />
                  <span className="absolute bottom-0 right-0 h-6 w-[1.5px] bg-brand-blue shadow-[0_0_8px_#2563EB]" />
                </>
              )}

              {/* Card Header Info */}
              <div className="flex justify-between items-start gap-2 mb-4">
                <div>
                  <span className={`text-xs uppercase tracking-widest px-3 py-1 rounded-full ${cfg.badgeStyle}`}>
                    {cfg.level}
                  </span>
                  <div className="text-xs font-mono text-brand-muted italic mt-2 ml-1">
                    {cfg.promise}
                  </div>
                </div>
                <div className={`p-2.5 rounded-xl bg-black/40 border border-brand-border/40 ${isSelected ? 'text-brand-orange' : 'text-brand-muted'}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>

              {/* Description & Objectives */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-2xs uppercase tracking-wider text-brand-muted font-mono">LEARNER PROFILE</h4>
                  <p className="text-sm font-body text-white/90 mt-1 leading-relaxed">
                    {cfg.profile}
                  </p>
                </div>

                <div>
                  <h4 className="text-2xs uppercase tracking-wider text-brand-muted font-mono">CORE OBJs</h4>
                  <ul className="text-xs font-body text-brand-muted mt-1.5 space-y-1.5 list-disc list-inside">
                    {cfg.objectives.map((obj, i) => (
                      <li key={i} className="leading-snug">
                        <span className="text-white/80">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-brand-border/30">
                  <h4 className="text-2xs uppercase tracking-wider text-brand-muted font-mono">SUCCESS EXPECTATION</h4>
                  <p className="text-xs font-body text-zinc-400 mt-1 italic leading-relaxed">
                    {cfg.successState}
                  </p>
                </div>
              </div>

              {/* Progress and status summary */}
              <div className="mt-5 pt-3 border-t border-brand-border/40 flex items-center justify-between">
                <span className="text-3xs font-mono uppercase tracking-widest text-brand-muted">
                  Rollout Readiness
                </span>
                <div className="flex items-center gap-2 font-mono">
                  <div className="w-16 bg-black/40 h-1.5 rounded-full overflow-hidden border border-brand-border/30">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        cfg.level === 'Beginner' ? 'bg-brand-orange' : cfg.level === 'Medium' ? 'bg-brand-blue' : 'bg-white'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-2xs text-white font-semibold">
                    {pct}%
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
