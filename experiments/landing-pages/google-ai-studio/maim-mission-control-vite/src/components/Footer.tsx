import maimMark from '../assets/brand/maim-mark.png';

export default function Footer() {
  return (
    <footer className="bg-brand-black-light py-10 border-t border-brand-gold/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4 text-center md:text-left">
          <img src={maimMark} alt="Major AI Mindset MD crown seal" className="w-12 h-12 object-contain" />
          <div>
          <p className="font-display text-lg uppercase tracking-wider text-brand-white">Major AI Mindset</p>
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-brand-gold-muted mt-2">AI is the tool. You are the future.</p>
          </div>
        </div>
        <div className="text-sm text-brand-muted text-center md:text-right">
          <p>@major_ai_mindset</p>
          <p>majoraimindset.com</p>
        </div>
      </div>
    </footer>
  );
}
