import type { LandingContent } from '../content/types';

type MethodologySectionProps = {
  content: LandingContent['abc'];
};

export default function MethodologySection({ content }: MethodologySectionProps) {
  return (
    <section id="abc" className="bg-brand-black-light py-24 md:py-32 border-b border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="cinematic-panel px-6 py-14 md:px-12 md:py-16">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-12 lg:gap-16 items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-green mb-6">{content.eyebrow}</p>
              <h2 className="font-serif text-5xl md:text-7xl leading-[0.95]">
                {content.headingLines.map((line) => (
                  <span key={line.text} className={`block ${line.colorClass}`}>{line.text}</span>
                ))}
              </h2>
              <p className="mt-7 max-w-md text-brand-muted leading-relaxed">
                {content.intro}
              </p>
              <p className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-brand-muted">
                {content.countLine}
              </p>
            </div>

            <div className="roadmap-rail grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-5">
              {content.cards.map((item) => (
                <article key={item.letter} className="relative pl-12 md:pl-0 md:pt-12">
                  <span className={`absolute left-0 top-0 md:left-0 md:top-0 z-10 grid h-8 w-8 place-items-center rounded-full bg-brand-black border border-brand-gold/30 font-display text-lg ${item.colorClass}`}>
                    {item.letter}
                  </span>
                  <h3 className="text-2xl text-brand-white font-semibold">{item.word}</h3>
                  <p className="mt-3 text-sm md:text-base text-brand-muted leading-relaxed">{item.phrase}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="relative z-10 soft-divider mt-14" />
          <p className="relative z-10 mt-5 text-center font-mono text-[0.62rem] uppercase tracking-[0.18em] text-brand-muted">
            {content.footerLine}
          </p>
        </div>
      </div>
    </section>
  );
}
