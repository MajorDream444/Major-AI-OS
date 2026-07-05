import React, { useState } from 'react';
import { Target, Eye, Footprints, CheckCircle2, ChevronRight } from 'lucide-react';
import { RhythmCard } from '../types';

export default function RhythmSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const rhythms: RhythmCard[] = [
    {
      id: '01',
      num: '01',
      title: 'A clear idea',
      description: 'One single, transformative mindset principle, not twenty disconnected AI tools. We focus on depth and master a single conceptual lens.',
      highlight: 'Mindset Focus: Avoid tool-fatigue and master logic first.'
    },
    {
      id: '02',
      num: '02',
      title: 'A live example',
      description: 'AI used in plain, direct human language for real work, business automation, content frameworks, or legacy preservation.',
      highlight: 'Live Over-the-Shoulder: Real-time demonstration with no secret setups.'
    },
    {
      id: '03',
      num: '03',
      title: 'A simple action',
      description: 'One single, non-overwhelming, practical task to try immediately post-session. Likkle by likkle, you build confidence and digital systems.',
      highlight: 'Immediate Leverage: 10-minute action items for instant outcome.'
    }
  ];

  // Specific exercises for inside each session stage
  const exercises: Record<string, string[]> = {
    '01': [
      'The "Text-to-Asset" mindset framework',
      'Auditing your recurring 5-minute chores',
      'The expert identity scaffolding model'
    ],
    '02': [
      'Live-prompting Google Docs content matrices',
      'Structuring multi-step spreadsheets live',
      'Translating messy audio transcripts'
    ],
    '03': [
      'Compile your first custom system block',
      'Send a text-prompt to generate code draft',
      'Document your 1st asset template'
    ]
  };

  return (
    <section id="rhythm" className="relative py-24 bg-brand-black-light border-b border-[#14141c]">
      <div className="absolute inset-0 bg-[radial-gradient(#141424_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none opacity-40" />
      
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 z-10">
        
        {/* Section Heading Tag */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 bg-brand-orange rounded-full" />
          <span className="text-xs font-mono tracking-widest text-brand-orange uppercase">04 / THE LIVE RHYTHM</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
          <div className="col-span-1 lg:col-span-7">
            <h2 className="font-display font-black text-3xl sm:text-4xl xl:text-5xl uppercase tracking-tight text-brand-white leading-none">
              WHAT HAPPENS INSIDE A KNOWLEDGE SESSION
            </h2>
            <div className="w-20 h-0.5 bg-brand-orange mt-6" />
          </div>
          <div className="col-span-1 lg:col-span-5">
            <p className="font-serif italic text-lg text-brand-muted">
              Designed specifically to replace technical overload with immediate, repeatable creative velocity.
            </p>
          </div>
        </div>

        {/* 3 Step Interactive Card System */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {rhythms.map((rhythm) => (
            <div
              key={rhythm.id}
              id={`rhythm-card-${rhythm.id}`}
              onMouseEnter={() => setHoveredCard(rhythm.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative flex flex-col justify-between p-8 border transition-all duration-300 rounded-none h-full bg-brand-black ${
                hoveredCard === rhythm.id 
                  ? 'border-brand-orange shadow-[0_0_20px_rgba(245,132,38,0.15)]' 
                  : 'border-[#1e1e28]'
              }`}
            >
              <div>
                {/* Step Number Display */}
                <div className="flex justify-between items-start mb-8">
                  <span className={`font-display font-black text-4xl leading-none transition-colors ${
                    hoveredCard === rhythm.id ? 'text-brand-orange' : 'text-[#2a2a36]'
                  }`}>
                    {rhythm.num}
                  </span>
                  
                  {/* Phase specific icon indicators */}
                  <div className="text-brand-muted/40">
                    {rhythm.id === '01' && <Target className={`w-5 h-5 ${hoveredCard === '01' ? 'text-brand-gold' : ''}`} />}
                    {rhythm.id === '02' && <Eye className={`w-5 h-5 ${hoveredCard === '02' ? 'text-brand-blue' : ''}`} />}
                    {rhythm.id === '03' && <Footprints className={`w-5 h-5 ${hoveredCard === '03' ? 'text-brand-green' : ''}`} />}
                  </div>
                </div>

                <h3 className="font-display font-bold text-xl uppercase tracking-wider text-brand-white mb-4">
                  {rhythm.title}
                </h3>

                <p className="text-brand-muted text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                  {rhythm.description}
                </p>

                {/* Live interactive expanded exercise list */}
                <div className="pt-4 border-t border-[#12121a]">
                  <span className="block text-[9px] font-mono text-brand-orange uppercase tracking-wider mb-2.5">
                    STAGE DRILLS INCLUDED:
                  </span>
                  <ul className="space-y-1.5">
                    {exercises[rhythm.id].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[11px] text-brand-white">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-green flex-shrink-0" />
                        <span className="font-mono">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Hover Tip Callout */}
              <div className="mt-8 pt-4 border-t border-[#14141e]/70">
                <span className="text-[10px] font-mono text-brand-muted block">
                  {rhythm.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
