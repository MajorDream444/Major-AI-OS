const faqs = [
  { question: 'Do I need to know AI already?', answer: 'No. The sessions are built for beginners first. We use plain language and real examples.' },
  { question: 'Is this only for business owners?', answer: 'No. It is for anyone who wants to understand AI and start building with more confidence.' },
  { question: 'What happens after the session?', answer: 'You can join future sessions, book a discovery call, or move into a beginner lab when you are ready.' },
];

export default function FaqSection() {
  return (
    <section className="bg-brand-black py-24 md:py-32 border-b border-brand-gold/10">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-14">
          <div className="w-16 h-px bg-brand-gold mx-auto mb-8" />
          <p className="text-xs uppercase tracking-[0.2em] text-brand-gold mb-6">Frequently asked</p>
          <h2 className="font-serif text-4xl md:text-6xl text-brand-white leading-tight">Questions before you join</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
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
