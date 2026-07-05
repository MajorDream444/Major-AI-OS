import { ArrowRight, Compass, Sparkles } from 'lucide-react';

type HeroProps = {
  onReserveClick: () => void;
  onExploreClick: () => void;
};

export default function HeroSection({ onReserveClick, onExploreClick }: HeroProps) {
  return (
    <section className="relative min-h-screen portal-bg overflow-hidden flex items-center border-b border-brand-gold/10">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute left-1/2 top-1/2 w-[70vw] h-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-gold/20" />
        <div className="absolute left-1/2 top-1/2 w-[46vw] h-[46vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-green/20" />
        <div className="absolute left-1/2 top-1/2 w-[24vw] h-[24vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-blue/25" />
      </div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-28">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-brand-gold/30 bg-brand-black-light/70 px-4 py-2 text-xs font-mono uppercase tracking-widest text-brand-gold mb-8">
            <Sparkles size={14} /> Live Knowledge Sessions
          </div>
          <h1 className="font-display font-black uppercase tracking-[0.18em] text-5xl md:text-8xl text-brand-gold leading-none">
            AI Mindset
          </h1>
          <p className="mt-6 font-serif text-4xl md:text-7xl leading-[0.98] text-brand-white">
            Stop carrying your ideas in your head.
          </p>
          <p className="mt-4 font-display text-4xl md:text-7xl font-black text-brand-gold uppercase">
            Build them with AI.
          </p>
          <div className="tribar-line w-48 my-10" />
          <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-brand-muted">
            The mindset operating system for beginners, builders, creators, and professionals who want to use AI with confidence and turn ideas into digital assets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button onClick={onReserveClick} className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-black px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-gold-muted transition">
              Reserve Your Seat <ArrowRight size={16} />
            </button>
            <button onClick={onExploreClick} className="inline-flex items-center justify-center gap-2 border border-brand-gold/40 text-brand-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-gold/10 transition">
              Explore the ABCs <Compass size={16} />
            </button>
          </div>
          <p className="mt-8 text-sm text-brand-muted">If you can text, you can use AI.</p>
        </div>
      </div>
    </section>
  );
}
