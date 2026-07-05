import { ABCItem } from '../types';

const items: ABCItem[] = [
  { letter: 'A', word: 'Awareness', phrase: 'Notice before you automate.', details: 'Find the repeated task, the time leak, and the place where help is needed.' },
  { letter: 'B', word: 'Belief', phrase: 'If you can text, you can use AI.', details: 'AI begins as communication. Plain language is enough to start.' },
  { letter: 'C', word: 'Context', phrase: 'Clear input. Clear output.', details: 'The better you explain the situation, the better AI can support the work.' },
  { letter: 'D', word: 'Direction', phrase: 'Aim AI at your goal.', details: 'Do not collect tools. Build toward a useful result.' },
  { letter: 'E', word: 'Execution', phrase: 'Take action. Get results.', details: 'The mindset becomes real when you test, improve, and ship.' },
];

export default function MethodologySection() {
  return (
    <section id="abc" className="bg-brand-black-light py-24 md:py-32 border-b border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-16 h-px bg-brand-gold mx-auto mb-8" />
          <p className="text-xs uppercase tracking-[0.2em] text-brand-gold mb-6">The methodology</p>
          <h2 className="font-serif text-4xl md:text-6xl text-brand-white leading-tight">One letter. One lesson. One action.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          {items.map((item) => (
            <article key={item.letter} className="border border-brand-gold/30 bg-brand-black/70 p-6 min-h-[260px]">
              <span className="font-display text-5xl text-brand-gold">{item.letter}</span>
              <h3 className="mt-6 text-xl text-brand-white font-semibold">{item.word}</h3>
              <p className="mt-3 text-sm text-brand-gold-muted">{item.phrase}</p>
              <p className="mt-5 text-sm leading-relaxed text-brand-muted">{item.details}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
