import React from 'react';
import { Monitor, CalendarRange, Users, Sparkles } from 'lucide-react';
import { Fact } from '../types';

export default function FactsSection() {
  const facts: Fact[] = [
    {
      icon: 'monitor',
      title: 'Format',
      subtitle: 'Accessible Learning Space',
      description: 'Free live knowledge sessions hosted on Google Meet. High accessibility, interactive screen-shares, and real-time live demonstrations with no complex setups required.',
    },
    {
      icon: 'calendar',
      title: 'Rhythm',
      subtitle: 'Progress with Consistency',
      description: 'Weekly sessions designed for compounding gains. Each session includes real-time reminders, full replay archives, interactive workbook resources, and next action steps.',
    },
    {
      icon: 'users',
      title: 'Audience',
      subtitle: 'The Collective of Builders',
      description: 'Creators, parents, founders, working professionals, ambitious students, wellness leaders, athletes, coaches, and grassroots community builders seeking technological leverage.',
    }
  ];

  return (
    <section id="facts" className="relative py-24 bg-brand-black-light border-b border-[#14141c]">
      {/* Grid subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(#141424_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 z-10">
        
        {/* Section Heading Tag */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
          <span className="text-xs font-mono tracking-widest text-brand-gold uppercase">01 / FACTS AT A GLANCE</span>
        </div>

        <div className="max-w-3xl mb-16">
          <h2 className="font-display font-black text-3xl sm:text-4xl xl:text-5xl uppercase tracking-tight text-brand-white leading-none mb-4">
            MAIM OPERATING PRINCIPLES
          </h2>
          <div className="w-20 h-0.5 bg-brand-gold mb-6" />
          <p className="font-serif italic text-lg sm:text-xl text-brand-muted leading-relaxed">
            Simple structures. Live guidance. Compounding digital asset acceleration.
          </p>
        </div>

        {/* 3-Column Luxury Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {facts.map((fact, index) => (
            <div 
              key={index} 
              id={`fact-card-${index}`}
              className="group relative flex flex-col justify-between p-8 border border-[#1e1e28] hover:border-brand-gold bg-brand-black transition-all duration-300 rounded-none shadow-2xl"
            >
              {/* Corner gold accent dots */}
              <div className="absolute top-0 left-0 w-1 h-1 bg-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-1 h-1 bg-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Fact Icon */}
                <div className="w-12 h-12 flex items-center justify-center border border-[#1e1e28] group-hover:border-brand-gold/50 bg-brand-black-light mb-8 transition-colors">
                  {fact.icon === 'monitor' && <Monitor className="w-5 h-5 text-brand-green" />}
                  {fact.icon === 'calendar' && <CalendarRange className="w-5 h-5 text-brand-orange" />}
                  {fact.icon === 'users' && <Users className="w-5 h-5 text-brand-blue" />}
                </div>

                <p className="text-[10px] font-mono tracking-widest text-brand-muted uppercase mb-2">
                  {fact.subtitle}
                </p>

                <h3 className="font-display font-bold text-xl uppercase tracking-wider text-brand-white mb-4 group-hover:text-brand-gold transition-colors">
                  {fact.title}
                </h3>

                <p className="text-brand-muted text-xs sm:text-sm leading-relaxed font-sans">
                  {fact.description}
                </p>
              </div>

              {/* Card Footer Indicator line */}
              <div className="mt-8 pt-4 border-t border-[#121218]/80 flex items-center justify-between text-[10px] font-mono text-brand-muted/50 group-hover:text-brand-gold/70 transition-colors">
                <span>SYSTEM PARAMETER: 0{index + 1}</span>
                <Sparkles className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-brand-gold" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
