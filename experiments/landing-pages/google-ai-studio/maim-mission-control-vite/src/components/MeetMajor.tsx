import { Quote } from 'lucide-react';
import maimMark from '../assets/brand/maim-mark.png';
import majorPortrait from '../assets/brand/major-portrait.jpg';
import type { LandingContent } from '../content/types';

type MeetMajorProps = {
  content: LandingContent['meetMajor'];
};

export default function MeetMajor({ content }: MeetMajorProps) {
  return (
    <section id="meet-major" className="bg-brand-black py-24 md:py-32 border-b border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] gap-14 lg:gap-20 items-center">
        <div className="relative min-h-[500px] overflow-hidden bg-brand-black">
          <img src={majorPortrait} alt={content.portraitAlt} className="portrait-fade absolute inset-0 w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/15 to-transparent" />
          <div className="absolute left-6 right-6 bottom-6 border-l border-brand-gold/50 pl-5">
            <img src={maimMark} alt={content.markAlt} className="w-16 h-16 object-contain mb-5" />
            <p className="font-mono text-xs uppercase tracking-widest text-brand-gold">{content.imageLabel}</p>
            <p className="mt-3 text-brand-white font-display uppercase tracking-[0.08em] text-3xl">{content.imageName}</p>
          </div>
        </div>
        <div>
          <div className="w-16 h-px bg-brand-gold mb-8" />
          <p className="text-xs uppercase tracking-[0.2em] text-brand-gold mb-6">{content.eyebrow}</p>
          <h2 className="max-w-3xl font-serif text-4xl md:text-6xl text-brand-white leading-tight">
            {content.heading}
          </h2>
          <p className="mt-8 max-w-2xl text-brand-muted leading-relaxed text-lg">
            {content.body}
          </p>
          <div className="mt-10 max-w-2xl border-l border-brand-gold/50 pl-6">
            <Quote className="text-brand-gold mb-4" />
            <p className="font-mono uppercase tracking-[0.12em] leading-relaxed text-brand-white">
              {content.quote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
