import { Quote } from 'lucide-react';

export default function MeetMajor() {
  return (
    <section id="meet-major" className="bg-brand-black py-24 md:py-32 border-b border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div className="border border-brand-gold/30 bg-brand-black-light p-8 aspect-square flex flex-col items-center justify-center text-center">
          <div className="w-28 h-28 rounded-full border border-brand-gold flex items-center justify-center font-serif text-5xl text-brand-gold mb-8">MD</div>
          <p className="font-mono text-xs uppercase tracking-widest text-brand-gold">Founder and translator</p>
          <p className="mt-3 text-brand-white font-display uppercase tracking-wider">Major Dream Williams</p>
        </div>
        <div>
          <div className="w-16 h-px bg-brand-gold mb-8" />
          <p className="text-xs uppercase tracking-[0.2em] text-brand-gold mb-6">The translator</p>
          <h2 className="font-serif text-4xl md:text-6xl text-brand-white leading-tight">Major helps people translate AI into real life, real business, and real legacy.</h2>
          <p className="mt-8 text-brand-muted leading-relaxed text-lg">From the South Bronx to Wall Street, from blockchain to AI, Major teaches people how to stop being intimidated by technology and start using it to build.</p>
          <div className="mt-8 border-l border-brand-gold/50 pl-6">
            <Quote className="text-brand-gold mb-4" />
            <p className="font-serif text-2xl text-brand-white">The hero is not AI. The hero is the human learning how to use it.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
