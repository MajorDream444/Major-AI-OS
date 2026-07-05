const rhythm = [
  { number: '01', title: 'A clear idea', copy: 'One mindset principle for the session.' },
  { number: '02', title: 'A live example', copy: 'AI used in plain language for real work, business, content, or life.' },
  { number: '03', title: 'A simple action', copy: 'One thing to try immediately after the session.' },
];

export default function RhythmSection() {
  return (
    <section className="bg-brand-black py-24 md:py-32 border-b border-brand-gold/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-16 h-px bg-brand-gold mx-auto mb-8" />
          <p className="text-xs uppercase tracking-[0.2em] text-brand-gold mb-6">The live rhythm</p>
          <h2 className="font-serif text-4xl md:text-6xl text-brand-white leading-tight">What happens inside a knowledge session</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rhythm.map((item) => (
            <article key={item.number} className="border border-brand-gold/30 bg-brand-black-light/70 p-10">
              <span className="font-serif text-5xl text-brand-gold">{item.number}</span>
              <h3 className="mt-8 font-serif text-3xl text-brand-white">{item.title}</h3>
              <p className="mt-5 leading-relaxed text-brand-muted">{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
