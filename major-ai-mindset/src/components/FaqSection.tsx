import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { FAQItem } from '../types';

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>('faq-0');

  const faqs: FAQItem[] = [
    {
      id: 'faq-0',
      question: 'Do I need to know AI or have coding skills already?',
      answer: 'No. These sessions are designed specifically for beginners first. We do not write deep code or use dry, confusing developer jargon. We use plain, day-to-day human language, and show real-world practical examples that you can replicate instantly.',
    },
    {
      id: 'faq-1',
      question: 'Is this session only for tech-founders or business owners?',
      answer: 'Absolutely not. It is for anyone who knows the world is changing and wants a clean, positive, highly structured space to begin. Our community includes parents helping children stay relevant, creators building digital templates, professionals looking to automate spreadsheet routines, wellness trainers, athletes, and student organizers.',
    },
    {
      id: 'faq-2',
      question: 'What happens after my first live session concludes?',
      answer: 'You will leave with a clear mindset foundation and one actionable post-session exercise to try immediately. From there, you can continue joining our weekly live knowledge cycles, book an optional breakthrough discovery call with Major, or apply to join our exclusive beginner builder laboratory when you feel fully ready.',
    },
  ];

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-24 bg-brand-black-light border-b border-[#14141c]">
      <div className="absolute inset-0 bg-[radial-gradient(#141424_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-20" />
      
      <div className="relative w-full max-w-4xl mx-auto px-6 z-10">
        
        {/* Section Heading Tag */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
          <span className="text-xs font-mono tracking-widest text-brand-gold uppercase">08 / FREQUENTLY ASKED QUESTIONS</span>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-brand-white leading-none">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <div className="w-20 h-0.5 bg-brand-gold mx-auto mt-6" />
        </div>

        {/* Accordion Stack */}
        <div id="faq-accordion-stack" className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id} 
                className={`border transition-all duration-300 rounded-none bg-[#07070a] ${
                  isOpen ? 'border-brand-gold' : 'border-[#1b1b26]'
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  id={`faq-btn-${index}`}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <MessageSquare className={`w-4 h-4 flex-shrink-0 ${isOpen ? 'text-brand-gold' : 'text-brand-muted/50'}`} />
                    <span className="font-display font-bold text-sm sm:text-base uppercase tracking-wider text-brand-white">
                      {faq.question}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-brand-gold flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-brand-muted flex-shrink-0 ml-4" />
                  )}
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#12121c] animate-fade-in">
                    <p className="text-brand-muted text-xs sm:text-sm leading-relaxed font-sans pl-8">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
