export default function Footer() {
  return (
    <footer className="bg-brand-black-light py-10 border-t border-brand-gold/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-5">
        <div>
          <p className="font-display text-lg uppercase tracking-wider text-brand-white">Major AI Mindset</p>
          <p className="font-serif text-xl text-brand-gold-muted mt-2">Likkle by likkle, we build the future.</p>
        </div>
        <div className="text-sm text-brand-muted text-center md:text-right">
          <p>@major_ai_mindset</p>
          <p>majoraimindset.com</p>
        </div>
      </div>
    </footer>
  );
}
