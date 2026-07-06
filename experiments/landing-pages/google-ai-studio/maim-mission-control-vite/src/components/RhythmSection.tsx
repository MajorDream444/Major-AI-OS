import type { LandingContent } from '../content/types';

type RhythmSectionProps = {
  content: LandingContent['rhythm'];
};

export default function RhythmSection({ content }: RhythmSectionProps) {
  return (
    <section className="bg-brand-black py-24 md:py-32 border-b border-brand-gold/10 studio-grid">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14 items-start mb-14">
          <div>
            <div className="w-16 h-px bg-brand-gold mb-8" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold mb-6">{content.eyebrow}</p>
            <h2 className="font-display uppercase text-4xl md:text-6xl text-brand-white leading-[0.95]">{content.heading}</h2>
          </div>
          <p className="text-lg leading-relaxed text-brand-muted lg:pt-16">
            {content.intro}
          </p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute left-0 right-0 top-6 h-px bg-brand-gold/25" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {content.items.map((item) => (
            <article key={item.number} className="relative pl-12 md:pl-0 md:pt-16">
              <span className="absolute left-0 top-0 z-10 grid h-12 w-12 place-items-center rounded-full border border-brand-gold/35 bg-brand-black font-mono text-xs text-brand-gold">
                {item.number}
              </span>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-brand-green">Live room step</p>
              <h3 className="mt-4 font-display uppercase text-3xl md:text-4xl text-brand-white leading-none">{item.title}</h3>
              <p className="mt-5 leading-relaxed text-brand-muted">{item.copy}</p>
            </article>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
