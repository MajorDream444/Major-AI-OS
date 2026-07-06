import type { CSSProperties } from 'react';
import { ArrowRight, Compass, Radio, Sparkles } from 'lucide-react';
import maimMark from '../assets/brand/maim-mark.png';

type HeroProps = {
  onReserveClick: () => void;
  onExploreClick: () => void;
};

const orbitDots = [
  { angle: '-18deg', radius: '162px', size: '16px', color: '#D8AF55' },
  { angle: '18deg', radius: '136px', size: '13px', color: '#1F7A3A' },
  { angle: '48deg', radius: '190px', size: '12px', color: '#006BB6' },
  { angle: '84deg', radius: '116px', size: '11px', color: '#F58426' },
  { angle: '126deg', radius: '170px', size: '14px', color: '#D8AF55' },
  { angle: '174deg', radius: '126px', size: '10px', color: '#1F7A3A' },
  { angle: '220deg', radius: '182px', size: '12px', color: '#006BB6' },
  { angle: '282deg', radius: '148px', size: '15px', color: '#F58426' },
];

export default function HeroSection({ onReserveClick, onExploreClick }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] portal-bg studio-grid overflow-hidden border-b border-brand-gold/10">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 py-5 md:py-7">
        <nav className="flex items-center justify-between gap-4 border-b border-brand-gold/15 pb-4">
          <div className="flex items-center gap-3 min-w-0">
            <img src={maimMark} alt="Major AI Mindset MD crown seal" className="w-10 h-10 object-contain shrink-0" />
            <div className="min-w-0">
              <p className="font-display uppercase text-sm tracking-[0.12em] text-brand-white truncate">Major AI Mindset</p>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-brand-green">Live knowledge room</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-7 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-brand-muted">
            <span className="text-brand-gold">AI tool</span>
            <span>Human future</span>
            <span className="text-brand-blue">Build room</span>
          </div>
          <button onClick={onReserveClick} className="inline-flex items-center gap-2 bg-brand-gold text-brand-black px-4 py-3 text-[0.62rem] font-bold uppercase tracking-[0.16em] hover:bg-brand-orange transition">
            Seat <ArrowRight size={14} />
          </button>
        </nav>

        <div className="grid min-h-[calc(92vh-5.5rem)] grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-6 lg:gap-8 items-center py-7 md:py-9">
          <div className="maim-frame px-4 py-7 md:p-9">
            <div className="maim-frame-bottom" />
            <div className="flex flex-wrap items-center gap-3 mb-6 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-brand-muted">
              <span className="inline-flex items-center gap-2 text-brand-green"><Radio size={13} /> Google AI Studio one-shot</span>
              <span className="h-px w-12 bg-brand-gold/50" />
              <span>Major translates the room</span>
            </div>
            <h1 className="font-display uppercase text-[3rem] sm:text-6xl md:text-7xl lg:text-[5.55rem] text-brand-white leading-[0.88] tracking-[0.02em]">
              <span className="block">AI</span>{' '}
              <span className="block">Mindset</span>
            </h1>
            <p className="mt-5 max-w-xl text-2xl md:text-[2.25rem] font-semibold leading-[1.08] text-brand-gold">
              Stop carrying your ideas in your head. <span className="text-brand-white">Build from where you are.</span>
            </p>
            <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-brand-muted">
              A live learning room for beginners, creators, community leaders, and builders who are ready to stop fearing AI and start using it with confidence.
            </p>
            <div className="tribar-line w-56 mt-5" />
            <p className="mt-4 font-mono text-xs md:text-sm uppercase tracking-[0.18em] leading-loose text-brand-white">
              AI is the tool. <span className="text-brand-orange">You are the future.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-5">
              <button onClick={onReserveClick} className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-black px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] hover:bg-brand-orange transition">
                Reserve Your Seat <ArrowRight size={16} />
              </button>
              <button onClick={onExploreClick} className="inline-flex items-center justify-center gap-2 border border-brand-gold/40 text-brand-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] hover:bg-brand-gold/10 transition">
                Explore the ABCs <Compass size={16} />
              </button>
            </div>
          </div>

          <div className="hud-panel min-h-[450px] lg:min-h-[510px] lg:-ml-2">
            <div className="relative z-10 border-b border-brand-gold/15 px-4 py-3 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brand-muted">
              <span className="text-brand-gold">MAIM command view</span>
              <span className="text-brand-green">Signal online</span>
            </div>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_0.8fr]">
              <div className="gravity-field min-h-[360px] lg:min-h-[438px]">
                <div className="scanline" />
                <div className="gravity-core" />
                {orbitDots.map((dot) => (
                  <span
                    key={`${dot.angle}-${dot.radius}`}
                    className="gravity-dot"
                    style={{
                      '--dot-angle': dot.angle,
                      '--dot-radius': dot.radius,
                      '--dot-size': dot.size,
                      '--dot-color': dot.color,
                    } as CSSProperties}
                  />
                ))}
                <div className="absolute left-5 bottom-5 right-5 flex items-end justify-between gap-4 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-brand-muted">
                  <span>one idea in</span>
                  <span className="text-brand-gold">one action out</span>
                </div>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-brand-gold/15 p-5 md:p-6 space-y-4">
                {[
                  ['01', 'See it', 'Find the real-life use case.'],
                  ['02', 'Believe it', 'Use plain language to make it yours.'],
                  ['03', 'Build it', 'Leave with one action you can test.'],
                ].map(([number, title, copy]) => (
                  <article key={number} className="border border-brand-gold/20 bg-brand-black/55 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-xs text-brand-gold">{number}</span>
                      <Sparkles size={14} className="text-brand-green" />
                    </div>
                    <h2 className="mt-4 font-display uppercase text-2xl text-brand-white">{title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-brand-muted">{copy}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="relative z-10 tribar-line h-[3px]" />
            <div className="relative z-10 px-4 py-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brand-muted flex flex-wrap gap-x-6 gap-y-2">
              <span className="text-brand-green">human first</span>
              <span className="text-brand-gold">tool second</span>
              <span className="text-brand-blue">legacy always</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
