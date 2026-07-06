import { CalendarDays, Clock, Radio, RotateCcw } from 'lucide-react';
import type { LandingContent } from '../content/types';

type ScheduleSectionProps = {
  content: LandingContent['schedule'];
};

export default function ScheduleSection({ content }: ScheduleSectionProps) {
  return (
    <section className="bg-brand-black-light py-20 md:py-28 border-b border-brand-gold/10 studio-grid">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="cinematic-panel grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-0 items-stretch">
          <article className="relative z-10 p-6 md:p-8 lg:border-r border-brand-gold/15">
            <div className="relative z-10 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold">{content.eyebrow}</p>
                <h2 className="mt-5 font-serif text-4xl md:text-5xl leading-tight text-brand-white">
                  {content.heading}
                </h2>
              </div>
              <CalendarDays className="hidden sm:block text-brand-green shrink-0" size={34} strokeWidth={1.5} />
            </div>
            <div className="relative z-10 mt-8 divide-y divide-brand-gold/15 border-y border-brand-gold/15">
              <div className="grid grid-cols-1 sm:grid-cols-[0.55fr_1fr_0.45fr] gap-3 py-5">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-brand-muted">{content.bali.label}</p>
                <p className="text-2xl font-semibold text-brand-white">{content.bali.date}</p>
                <p className="flex items-center gap-2 text-brand-gold"><Clock size={16} /> {content.bali.time}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[0.55fr_1fr_0.45fr] gap-3 py-5">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-brand-muted">{content.newYork.label}</p>
                <p className="text-2xl font-semibold text-brand-white">{content.newYork.date}</p>
                <p className="flex items-center gap-2 text-brand-gold"><Clock size={16} /> {content.newYork.time}</p>
              </div>
            </div>
            <div className="relative z-10 mt-6 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-brand-muted">
              <span className="inline-flex items-center gap-2 text-brand-green"><Radio size={14} /> {content.location}</span>
              <span className="h-px w-10 bg-brand-gold/50" />
              <span>{content.closingLine}</span>
            </div>
          </article>

          <aside className="relative z-10 p-6 md:p-8">
            <p className="relative z-10 font-mono text-xs uppercase tracking-[0.2em] text-brand-gold">This Week in the Room</p>
            <div className="relative z-10 mt-7 space-y-4">
              {content.weekItems.map((item, index) => (
                <div key={item} className="flex items-center gap-4 border-b border-brand-gold/15 pb-4 last:border-b-0">
                  <span className="font-mono text-xs text-brand-green">0{index + 1}</span>
                  <p className="text-xl md:text-2xl font-semibold text-brand-white">{item}</p>
                </div>
              ))}
            </div>
            <p className="relative z-10 mt-8 flex items-start gap-3 text-brand-muted leading-relaxed">
              <RotateCcw className="mt-1 text-brand-blue shrink-0" size={18} />
              Weekly rhythm gives people something to return to: the same room, a clearer idea, and one more useful action.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
