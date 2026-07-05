import React from 'react';
import { ArrowUp, Instagram, Globe, Shield, Sparkles } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-brand-black pt-16 pb-12 overflow-hidden">
      {/* Tri-Bar separator top of Footer */}
      <div className="tribar-line w-full opacity-60 absolute top-0 left-0" />

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#14141e]">
          
          {/* Column 1: Brand details */}
          <div className="col-span-1 md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 flex items-center justify-center border border-brand-gold bg-brand-black-light rounded-sm">
                <span className="font-display font-black text-xs text-brand-gold">M</span>
              </div>
              <span className="font-display font-black text-lg uppercase tracking-wider text-brand-white">MAJOR AI MINDSET</span>
            </div>

            <p className="font-serif italic text-lg text-brand-gold-muted leading-relaxed max-w-sm">
              Likkle by likkle, we build the future.
            </p>

            <p className="text-brand-muted text-xs leading-relaxed max-w-md font-sans">
              The mindset operating system for the AI age. Providing beginners, creators, and professionals with real leverage to build durable digital assets.
            </p>
          </div>

          {/* Column 2: Navigation shortcuts */}
          <div className="col-span-1 md:col-span-3 space-y-3 font-mono text-xs text-brand-muted">
            <span className="block text-[10px] text-brand-white uppercase font-bold tracking-widest pb-1 border-b border-[#14141d]">
              SITEMAP LINKS
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#different" className="hover:text-brand-gold transition-colors">The Methodology</a>
              </li>
              <li>
                <a href="#rhythm" className="hover:text-brand-gold transition-colors">The Sessions</a>
              </li>
              <li>
                <a href="#abc" className="hover:text-brand-gold transition-colors">The ABCs</a>
              </li>
              <li>
                <a href="#meet-major" className="hover:text-brand-gold transition-colors">Meet Major Dream</a>
              </li>
              <li>
                <a href="#register" className="hover:text-brand-orange transition-colors">Reserve Free Seat</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Socials */}
          <div className="col-span-1 md:col-span-3 space-y-3 font-mono text-xs text-brand-muted">
            <span className="block text-[10px] text-brand-white uppercase font-bold tracking-widest pb-1 border-b border-[#14141d]">
              CONNECT DIRECT
            </span>
            <ul className="space-y-2.5">
              <li>
                <a 
                  href="https://instagram.com/major_ai_mindset" 
                  target="_blank" 
                  rel="noreferrer"
                  id="instagram-footer-link"
                  className="flex items-center gap-2 hover:text-brand-gold transition-colors"
                >
                  <Instagram className="w-4 h-4 text-brand-orange" />
                  <span>@major_ai_mindset</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-brand-blue" />
                <span>Google Meet Virtual Campus</span>
              </li>
              <li className="flex items-center gap-2 text-[10px] text-brand-muted/70">
                <Shield className="w-4 h-4 text-brand-green" />
                <span>Privacy First &bull; Free Resource</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright plate */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-brand-muted">
          <div>
            <span>&copy; {new Date().getFullYear()} MAJOR AI MINDSET. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-[10px] text-brand-gold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>VERSION 1.2 PORTAL LIVE</span>
            </span>
            <button
              onClick={scrollToTop}
              id="scroll-top-btn"
              className="flex items-center gap-1.5 hover:text-brand-gold transition-colors"
              title="Return to Portal Top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
