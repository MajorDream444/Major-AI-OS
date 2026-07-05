import { Calendar, Video, UsersRound } from 'lucide-react';

const facts = [
  { icon: Video, title: 'Format', description: 'Free live knowledge sessions on Google Meet.' },
  { icon: Calendar, title: 'Rhythm', description: 'Weekly or biweekly sessions with reminders, replay access, and next steps.' },
  { icon: UsersRound, title: 'Audience', description: 'Creators, parents, founders, professionals, students, coaches, athletes, and community builders.' },
];

export default function FactsSection() {
  return (
    <section className="bg-brand-black py-24 md:py-32 border-b border-brand-gold/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
        <div className="w-16 h-px bg-brand-gold mx-auto mb-8" />
        <p className="text-xs uppercase tracking-[0.2em] text-brand-gold mb-16">The facts at a glance</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
          {facts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <div key={fact.title} className={`px-8 ${index < 2 ? 'md:border-r md:border-brand-gold/20' : ''}`}>
                <Icon className="mx-auto text-brand-gold mb-6" size={36} strokeWidth={1.5} />
                <h2 className="text-sm uppercase tracking-[0.2em] text-brand-white mb-4">{fact.title}</h2>
                <p className="text-brand-muted leading-relaxed">{fact.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
