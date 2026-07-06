import { Calendar, Video, UsersRound } from 'lucide-react';

const facts = [
  { icon: Video, title: 'Format', description: 'Free live knowledge sessions on Google Meet.' },
  { icon: Calendar, title: 'Rhythm', description: 'Weekly or biweekly sessions with reminders, replay access, and next steps.' },
  { icon: UsersRound, title: 'Audience', description: 'Creators, parents, founders, professionals, students, coaches, athletes, and community builders.' },
];

export default function FactsSection() {
  return (
    <section className="bg-brand-black py-20 md:py-28 border-b border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="w-16 h-px bg-brand-gold mb-7" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold mb-4">The signal deck</p>
            <h2 className="font-display uppercase text-4xl md:text-6xl leading-[0.95] text-brand-white">The room is simple. The work is real.</h2>
          </div>
          <p className="max-w-md text-brand-muted leading-relaxed">No mystery, no tool-chasing, no jargon wall. Each live session turns one AI idea into one useful action.</p>
        </div>
        <div className="soft-divider mb-2" />
        <div className="divide-y divide-brand-gold/15">
          {facts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <article key={fact.title} className="grid grid-cols-[3rem_1fr] md:grid-cols-[5rem_0.65fr_1fr_2rem] gap-5 md:gap-8 items-start py-8">
                <span className="font-mono text-xs text-brand-gold pt-2">0{index + 1}</span>
                <div className="flex items-center gap-4">
                  <Icon className="text-brand-green shrink-0" size={22} strokeWidth={1.6} />
                  <h3 className="font-display uppercase text-2xl md:text-3xl text-brand-white">{fact.title}</h3>
                </div>
                <p className="col-start-2 md:col-start-3 text-brand-muted leading-relaxed">{fact.description}</p>
                <span className="hidden md:block h-2 w-2 rounded-full bg-brand-blue mt-3" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
