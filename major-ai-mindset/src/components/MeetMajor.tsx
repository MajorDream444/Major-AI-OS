import React from 'react';
import { Quote, Sparkles, Award, MapPin } from 'lucide-react';

export default function MeetMajor() {
  return (
    <section id="meet-major" className="relative py-24 bg-brand-black-light border-b border-[#14141c] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-brand-green/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-brand-gold/5 blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 z-10">
        
        {/* Section Heading Tag */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
          <span className="text-xs font-mono tracking-widest text-brand-gold uppercase">06 / THE TRANSLATOR</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
          
          {/* Left Column: Portrait & Decorative Framed Plate */}
          <div className="col-span-1 lg:col-span-5 flex flex-col items-center">
            <div className="relative p-3 border border-[#232330] bg-brand-black max-w-[380px] w-full shadow-2xl group">
              {/* Corner luxury gold accents */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-brand-gold" />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-brand-gold" />

              {/* Portrait Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#0d0d12]">
                <img
                  src="/src/assets/images/major_dream_portrait_1783229111710.jpg"
                  alt="Major Dream Williams abstract portrait sketch"
                  className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating identity label */}
                <div className="absolute bottom-4 left-4 right-4 bg-brand-black/90 backdrop-blur-md border border-[#1f1f2a] p-3 text-left">
                  <span className="block text-[10px] font-mono text-brand-gold uppercase tracking-wider">FOUNDER & TRANSLATOR</span>
                  <span className="block font-display font-bold text-sm text-brand-white uppercase">MAJOR DREAM WILLIAMS</span>
                </div>
              </div>

              {/* HUD Coordinates or Legacy markers */}
              <div className="mt-3 flex justify-between items-center text-[9px] font-mono text-brand-muted/70 px-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-brand-green" />
                  <span>SOUTH BRONX → WALL STREET</span>
                </span>
                <span>MAIM ENGINE: SYSTEM ARCHITECT</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Copy & Philosophical Quotation */}
          <div className="col-span-1 lg:col-span-7">
            
            <span className="text-brand-muted font-mono text-xs uppercase tracking-widest block mb-1">
              MEET THE TRANSLATOR
            </span>
            
            <h2 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-brand-white leading-none mb-6">
              THE TRANSLATOR
            </h2>
            <div className="w-20 h-0.5 bg-brand-gold mb-8" />

            {/* Philosophy blockquote */}
            <div className="relative pl-8 border-l border-brand-gold/40 mb-8 py-1">
              <Quote className="absolute -top-3 left-2 w-8 h-8 text-[#262630] -z-10 transform scale-x-[-1]" />
              <p className="font-serif italic text-xl sm:text-2xl text-brand-white leading-relaxed font-light">
                The hero of the AI age is not the technology. <span className="text-brand-gold">The hero is the human</span> learning how to use it to protect, expand, and scale their legacy.
              </p>
            </div>

            {/* Editorial Biography Copy */}
            <div className="text-brand-muted text-sm sm:text-base leading-relaxed space-y-4 font-sans mb-8">
              <p>
                Major Dream Williams helps people translate high-speed AI developments into real life, real business, and real legacy. He breaks through the tech jargon to provide beginners, creators, and entrepreneurs with plain-language, step-by-step systems.
              </p>
              <p>
                From his roots in the South Bronx to the high-stakes floors of Wall Street, and from pioneering blockchain systems to mastering modern AI architectures, Major has spent his career translating elite concepts into accessible building blocks. He teaches people how to stop being intimidated by changing technology and start using it to build.
              </p>
              <p>
                His sessions are centered on one simple, powerful Jamaican proverb: <span className="text-brand-gold italic font-serif">&ldquo;Likkle by likkle, we build the future.&rdquo;</span> One step, one lesson, one digital asset at a time.
              </p>
            </div>

            {/* Tri-Bar Highlight Badges */}
            <div className="grid grid-cols-3 gap-4 border-t border-[#1a1a24] pt-8">
              <div className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-1.5 flex-shrink-0" />
                <div>
                  <span className="block text-[10px] font-mono text-brand-muted uppercase">ROOTS</span>
                  <span className="block font-display font-bold text-xs text-brand-white uppercase">South Bronx</span>
                </div>
              </div>
              
              <div className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 bg-brand-gold rounded-full mt-1.5 flex-shrink-0" />
                <div>
                  <span className="block text-[10px] font-mono text-brand-muted uppercase">CALIBER</span>
                  <span className="block font-display font-bold text-xs text-brand-white uppercase">Wall Street</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-1.5 flex-shrink-0" />
                <div>
                  <span className="block text-[10px] font-mono text-brand-muted uppercase">MISSION</span>
                  <span className="block font-display font-bold text-xs text-brand-white uppercase">Human Leverage</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
