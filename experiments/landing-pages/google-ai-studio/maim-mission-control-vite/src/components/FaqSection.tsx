import type { LandingContent } from '../content/types';

type FaqSectionProps = {
  content: LandingContent['faq'];
};

export default function FaqSection({ content }: FaqSectionProps) {
  return (
    <section className="bg-brand-black py-24 md:py-32 border-b border-brand-gold/10">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-14">
          <div className="w-16 h-px bg-brand-gold mx-auto mb-8" />
          <p className="text-xs uppercase tracking-[0.2em] text-brand-gold mb-6">{content.eyebrow}</p>
          <h2 className="font-serif text-4xl md:text-6xl text-brand-white leading-tight">{content.heading}</h2>
        </div>
        <div className="space-y-4">
          {content.items.map((faq) => (
            <details key={faq.question} className="border-b border-brand-gold/25 pb-5 group">
              <summary className="cursor-pointer font-serif text-2xl text-brand-gold list-none">{faq.question}</summary>
              <p className="mt-4 leading-relaxed text-brand-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
