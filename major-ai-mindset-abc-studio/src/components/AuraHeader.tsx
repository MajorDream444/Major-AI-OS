import { motion } from 'motion/react';
import { Sparkles, Circle, Compass, FileText } from 'lucide-react';

interface HeaderProps {
  userEmail?: string;
  totalLetters: number;
  publishedCount: number;
}

export default function AuraHeader({ userEmail = 'majornfts@gmail.com', totalLetters, publishedCount }: HeaderProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="relative w-full border-b border-brand-border bg-black/60 backdrop-blur-xl py-6 px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-40">
      {/* Decorative Top Left Ambient Glow */}
      <div className="absolute top-0 left-0 w-64 h-32 bg-brand-orange/5 blur-3xl pointer-events-none rounded-full" />
      
      <div className="flex items-center gap-4">
        <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/30 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange to-brand-blue opacity-10 group-hover:opacity-20 transition-opacity" />
          <span className="text-xl font-mono font-bold text-brand-orange tracking-widest">Ω</span>
          {/* Subtle Corner Laser Accent */}
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-brand-orange shadow-[0_0_8px_#FF5A00]" />
        </div>
        
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono tracking-widest text-brand-orange bg-brand-orange/10 px-2.5 py-0.5 rounded-full uppercase">
              STUDIO PORTAL
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-brand-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              SYSTEM ACTIVE
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-sans font-extrabold text-white tracking-tight mt-1">
            Major AI Mindset <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orange/80">ABC Studio</span>
          </h1>
          <p className="text-sm font-body text-brand-muted mt-0.5 max-w-xl">
            Turn structured A-Z AI lessons into high-engagement short videos, carousel slides, podcasts, and video prompts.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 font-mono text-xs w-full md:w-auto justify-end">
        {/* User Info / Metadata */}
        <div className="bg-brand-card/80 border border-brand-border px-4 py-2.5 rounded-xl flex items-center gap-3">
          <Circle className="w-2.5 h-2.5 text-brand-orange fill-brand-orange" />
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-wider text-brand-muted">OPERATOR</p>
            <p className="text-white font-medium">{userEmail}</p>
          </div>
        </div>

        {/* Sync Stats */}
        <div className="bg-brand-card/85 border border-brand-border px-4 py-2.5 rounded-xl flex items-center gap-4">
          <div>
            <p className="text-[10px] uppercase text-brand-muted">ROLLOUT PROGRESS</p>
            <p className="text-white font-bold flex items-center gap-1.5">
              <span>{publishedCount}</span>
              <span className="text-brand-muted">/</span>
              <span className="text-brand-muted">{totalLetters}</span>
              <span className="text-[10px] text-brand-orange">({Math.round((publishedCount / totalLetters) * 100)}%)</span>
            </p>
          </div>
        </div>

        {/* Date */}
        <div className="hidden lg:flex bg-brand-card/50 border border-brand-border/40 px-4 py-2.5 rounded-xl flex-col items-end">
          <p className="text-[10px] uppercase tracking-wider text-brand-muted">DATE TIME</p>
          <p className="text-brand-muted font-light text-[11px]">{currentDate}</p>
        </div>
      </div>
    </header>
  );
}
