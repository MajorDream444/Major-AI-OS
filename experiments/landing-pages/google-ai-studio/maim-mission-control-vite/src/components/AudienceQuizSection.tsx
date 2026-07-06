import { useState } from 'react';

const lanes = [
  'Beginner',
  'Creator',
  'Entrepreneur',
  'Coach',
  'Parent',
  'Professional',
];

export default function AudienceQuizSection() {
  const [active, setActive] = useState('Beginner');

  return (
    <section className="bg-brand-black-light py-24 md:py-32 border-b border-brand-gold/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
        <div className="w-16 h-px bg-brand-gold mx-auto mb-8" />
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold mb-6">Where you enter</p>
        <h2 className="font-display uppercase text-4xl md:text-6xl text-brand-white leading-[0.95] mb-8">Choose your lane. Build from there.</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {lanes.map((lane) => (
            <button key={lane} onClick={() => setActive(lane)} className={`px-5 py-3 text-xs uppercase tracking-[0.16em] border transition ${active === lane ? 'bg-brand-gold text-brand-black border-brand-gold' : 'border-brand-gold/30 text-brand-gold hover:bg-brand-gold/10'}`}>
              {lane}
            </button>
          ))}
        </div>
        <div className="hud-panel p-8 text-left max-w-2xl mx-auto">
          <p className="relative z-10 font-mono text-xs uppercase tracking-widest text-brand-gold mb-4">Selected lane</p>
          <h3 className="relative z-10 font-display uppercase text-4xl text-brand-white mb-4">{active}</h3>
          <p className="relative z-10 text-brand-muted leading-relaxed">This lane helps us shape the right examples, next steps, and follow up for your AI learning path.</p>
        </div>
      </div>
    </section>
  );
}
