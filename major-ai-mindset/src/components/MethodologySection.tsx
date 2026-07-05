import React, { useState } from 'react';
import { ArrowRight, HelpCircle, Laptop, CheckCircle2, ChevronRight, PenTool } from 'lucide-react';
import { ABCItem } from '../types';

export default function MethodologySection() {
  const [activeLetter, setActiveLetter] = useState<string>('A');
  const [customIdea, setCustomIdea] = useState<string>('');
  const [translatedPrompt, setTranslatedPrompt] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  const abcMethodology: ABCItem[] = [
    {
      letter: 'A',
      word: 'Awareness',
      phrase: 'Notice before you automate.',
      details: 'You cannot scale what you do not see. We teach you how to audit your daily loops, find recurring time drains, and list tasks where AI can save you 10+ hours a week immediately.',
      example: 'Instead of typing "write an email", you audit your day, identify the 5 clients who ask the same question, and build a targeted workflow template.',
    },
    {
      letter: 'B',
      word: 'Belief',
      phrase: 'If you can text, you can use AI.',
      details: 'Demolish the barrier of technical intimidation. AI is not a coding language; it is a collaborative reasoning engine. If you can explain an idea to a friend over text, you can prompt an AI.',
      example: 'Instead of thinking "I cannot build a website because I do not code", you text the AI your structure, rules, and logic like a manager delegating to an eager assistant.',
    },
    {
      letter: 'C',
      word: 'Context',
      phrase: 'Clear input. Clear output.',
      details: 'Garbage in, garbage out. The quality of your results is directly proportional to the clarity of your constraints, roles, and instructions. Give the AI an expert identity, strict output forms, and clear boundaries.',
      example: 'Instead of: "write a sales script", you prompt: "Act as a consultative SaaS sales lead. Outline a 3-step objection handling email strictly targeting busy medical professionals who value speed over pricing. Keep paragraphs under 3 lines."',
    },
    {
      letter: 'D',
      word: 'Direction',
      phrase: 'Aim AI at your goal.',
      details: 'Do not collect prompts like coupons. Aim AI at real asset creation: templates, spreadsheets, course scripts, automated social copy, and workflows. Build concrete leverage that persists.',
      example: 'Instead of playing around with general questions, you build a custom content marketing matrix for the next 30 days and export it to your digital asset drive.',
    },
    {
      letter: 'E',
      word: 'Execution',
      phrase: 'Take action. Get results.',
      details: 'Information without application is useless noise. Major AI Mindset is focused on real execution. We do not just lecture; we build. Each session demands a simple 10-minute action post-session.',
      example: 'Instead of bookmarking 50 tutorials, you open the editor, build your first prompt template in 10 minutes, and deploy it to automate tomorrow\'s repetitive emails.',
    },
  ];

  // Simulated mind-shift prompt compiler
  const handleTranslate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customIdea.trim()) return;

    setIsTranslating(true);
    setTranslatedPrompt('');

    setTimeout(() => {
      const selected = abcMethodology.find((item) => item.letter === activeLetter);
      let output = '';

      switch (activeLetter) {
        case 'A':
          output = `[ROLE]: Process Automation Architect\n[CONTEXT]: I am auditing my daily routine to save 10 hours of repetitive work.\n[TASK]: Analyze this core workflow idea: "${customIdea}". Detail three hidden sub-tasks inside this that can be offloaded to a text assistant, and draft a micro-plan to automate them one by one.\n[CONSTRAINT]: Keep suggestions practical for a beginner. No complex APIs, focus purely on standard prompting logic.`;
          break;
        case 'B':
          output = `[ROLE]: Creative Engineering Partner\n[CONTEXT]: I am building a digital asset but have zero coding background. I believe that if I can text, I can build.\n[TASK]: Convert my human-language concept: "${customIdea}" into a clean, modular structured blueprint. Break down the visual sections, text blocks, and step-by-step logic I need to feed to Vite/React to build this.\n[STYLE]: Explain simply, like a seasoned mentor speaking to an ambitious student.`;
          break;
        case 'C':
          output = `[ROLE]: Premium Content Design Director\n[INPUT IDEA]: "${customIdea}"\n[TARGET AUDIENCE]: Demanding professionals who value high-signal, zero-fluff communication.\n[OUTPUT FORM]: Outline a high-contrast copywriting matrix containing:\n  1. A pattern-interrupt display headline\n  2. 3 highly concise value bullet points\n  3. A single high-clarity call-to-action.\n[RULE]: Avoid passive language and AI buzzwords (e.g., "journey", "revolutionize", "delve").`;
          break;
        case 'D':
          output = `[ROLE]: Strategic Digital Asset Builder\n[GOAL]: Establish permanent digital leverage for: "${customIdea}".\n[TASK]: Generate a comprehensive asset roadmap. Design a structured table format with 4 columns: Asset Name, Underlying Value, Recommended Prompt Framework, and Time-to-Deploy (max 20 mins).\n[FOCUS]: Prioritize local storage templates and text systems.`;
          break;
        case 'E':
          output = `[ROLE]: High-Velocity Execution Coach\n[PROJECT]: "${customIdea}"\n[DIAGNOSTIC]: Design a 10-minute, zero-friction Action Trigger to start execution immediately.\n[STEPS]: Provide exactly 3 consecutive steps that take less than 3 minutes each to complete in a standard browser tab.\n[MOTIVATION MANTRA]: "Likkle by likkle, we build the future."`;
          break;
        default:
          output = `Prompt compiled successfully based on MAIM ABCDE frameworks for: ${customIdea}`;
      }

      setTranslatedPrompt(output);
      setIsTranslating(false);
    }, 850);
  };

  const currentItem = abcMethodology.find((item) => item.letter === activeLetter) || abcMethodology[0];

  return (
    <section id="different" className="relative py-24 bg-brand-black overflow-hidden border-b border-[#14141c]">
      {/* Abstract Grid background */}
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(#141424_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 z-10">
        
        {/* Intro section: Not an AI course */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="col-span-1 lg:col-span-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 bg-brand-green rounded-full" />
              <span className="text-xs font-mono tracking-widest text-brand-green uppercase">02 / CORE PHILOSOPHY</span>
            </div>
            
            <h2 className="font-display font-black text-3xl sm:text-4xl xl:text-5xl uppercase tracking-tight text-brand-white leading-none mb-6">
              NOT AN AI COURSE.<br className="hidden sm:inline" />
              <span className="text-brand-gold font-light italic font-serif lowercase">a new way to think.</span>
            </h2>
            <div className="w-20 h-0.5 bg-brand-green mb-8" />
          </div>

          <div className="col-span-1 lg:col-span-6 text-brand-muted space-y-4 text-sm sm:text-base leading-relaxed">
            <p className="font-serif italic text-lg text-brand-white">
              This is not a tech lecture.
            </p>
            <p>
              This is a structured mindset session for people who know the world is shifting fast and want a clean, honest, premium place to begin.
            </p>
            <p>
              We don&apos;t overwhelm you with twenty disconnected AI tools. We start with **Awareness, Belief, and Context**. Once your foundation is solid, we transition straight into actionable prompts, repeatable workflows, automated routines, digital assets, and legacy.
            </p>
          </div>
        </div>

        {/* The ABC Methodology Showcase */}
        <div className="pt-12 border-t border-[#12121a]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
            <span className="text-xs font-mono tracking-widest text-brand-gold uppercase">03 / THE ABC METHODOLOGY</span>
          </div>

          <h3 className="font-display font-black text-2xl sm:text-3xl xl:text-4xl uppercase tracking-tight text-brand-white mb-2">
            ONE LETTER. ONE LESSON. ONE ACTION.
          </h3>
          <p className="text-brand-muted text-xs sm:text-sm font-mono tracking-wide mb-12 uppercase">
            Click any letter to explore the system
          </p>

          {/* ABCDE Interactive Navigation Selector */}
          <div className="grid grid-cols-5 gap-2 sm:gap-4 mb-8">
            {abcMethodology.map((item) => (
              <button
                key={item.letter}
                onClick={() => {
                  setActiveLetter(item.letter);
                  setTranslatedPrompt('');
                }}
                id={`abc-tab-${item.letter}`}
                className={`relative group flex flex-col items-center justify-center py-6 border transition-all duration-300 rounded-none ${
                  activeLetter === item.letter 
                    ? 'bg-brand-black-light border-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                    : 'bg-brand-black border-[#14141e] hover:border-[#252533]'
                }`}
              >
                {/* Visual Active indicators */}
                {activeLetter === item.letter && (
                  <>
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-brand-gold" />
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-brand-gold" />
                  </>
                )}
                
                <span className={`font-display font-black text-3xl sm:text-5xl transition-colors ${
                  activeLetter === item.letter ? 'text-brand-gold' : 'text-[#2a2a36] group-hover:text-brand-muted'
                }`}>
                  {item.letter}
                </span>
                
                <span className="text-[9px] sm:text-[11px] font-mono tracking-widest text-brand-muted mt-2 uppercase hidden sm:inline">
                  {item.word}
                </span>
              </button>
            ))}
          </div>

          {/* Active Card Body Grid */}
          <div id="abc-display-panel" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Box: Active Methodology Details */}
            <div className="col-span-1 lg:col-span-6 p-8 border border-[#1c1c26] bg-brand-black-light flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-display font-black text-4xl text-brand-gold border-r border-[#1f1f2a] pr-4">{currentItem.letter}</span>
                  <div>
                    <h4 className="font-display font-bold text-xl uppercase tracking-wider text-brand-white">{currentItem.word}</h4>
                    <p className="font-serif italic text-sm text-brand-gold-muted">{currentItem.phrase}</p>
                  </div>
                </div>

                <p className="text-brand-muted text-sm sm:text-base leading-relaxed mb-6 font-sans">
                  {currentItem.details}
                </p>

                <div className="p-4 bg-brand-black border-l-2 border-brand-green text-xs">
                  <span className="font-mono text-brand-green uppercase font-bold block mb-1">PRACTICAL MINDSET shift:</span>
                  <p className="text-brand-white leading-relaxed">{currentItem.example}</p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#161620] flex items-center justify-between text-[10px] font-mono text-brand-muted">
                <span>MAIM SYSTEM INDEX: {currentItem.letter}-FRAMEWORK</span>
                <span className="text-brand-gold">SECURE METHODOLOGY</span>
              </div>
            </div>

            {/* Right Box: Live Mind-Shift Prompt Sandbox */}
            <div className="col-span-1 lg:col-span-6 p-8 border border-[#1c1c26] bg-brand-black flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-brand-muted uppercase tracking-wider flex items-center gap-1.5">
                    <PenTool className="w-3.5 h-3.5 text-brand-gold" />
                    <span>METHODOLOGY TRANSLATOR SANDBOX</span>
                  </span>
                  <span className="text-[9px] font-mono text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded">
                    ACTIVE TAB: {currentItem.word}
                  </span>
                </div>

                <p className="text-xs text-brand-muted leading-relaxed mb-6">
                  Type any raw business idea, problem, or content task below. Select a mindset filter from above, and watch it compile into a structured MAIM-compliant asset prompt.
                </p>

                <form onSubmit={handleTranslate} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-brand-muted uppercase mb-1.5">Your Raw Concept / Problem:</label>
                    <textarea
                      placeholder="e.g., I want to write follow-up client emails OR I want to structure a 5-day fitness challenge"
                      value={customIdea}
                      onChange={(e) => setCustomIdea(e.target.value)}
                      rows={2}
                      maxLength={180}
                      className="w-full bg-brand-black-light border border-[#1e1e28] rounded p-3 text-xs text-brand-white focus:outline-none focus:border-brand-gold resize-none"
                    />
                    <div className="flex justify-between items-center text-[10px] text-brand-muted/70 mt-1">
                      <span>{customIdea.length} / 180 chars max</span>
                      <span>If you can text, you can use AI.</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!customIdea.trim() || isTranslating}
                    id="prompt-translate-btn"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-brand-green disabled:bg-brand-black-light text-brand-white font-display font-bold text-xs uppercase tracking-widest hover:bg-brand-gold hover:text-brand-black disabled:text-brand-muted border disabled:border-[#1c1c26] border-transparent transition-all"
                  >
                    {isTranslating ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin h-3.5 w-3.5 border-2 border-brand-white border-t-transparent rounded-full" />
                        COMPILING VECTOR...
                      </span>
                    ) : (
                      <>
                        <span>COMPILE VIA &ldquo;{currentItem.word}&rdquo; ENGINE</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Compile Result Display */}
                {translatedPrompt && (
                  <div className="mt-6 p-4 bg-brand-black-light border border-brand-gold/20 rounded animate-fade-in relative group">
                    <div className="absolute top-2 right-2 text-[8px] font-mono text-brand-gold bg-brand-gold/10 px-1.5 py-0.5 rounded uppercase">
                      COMPILED OUTPUT
                    </div>
                    <label className="block text-[9px] font-mono text-brand-gold uppercase mb-1">MINDSET-TRANSFORMED PROMPT STRUCTURE:</label>
                    <pre className="text-[10px] text-brand-white font-mono leading-relaxed bg-[#030304] p-3 rounded border border-[#161622] overflow-x-auto whitespace-pre-wrap max-h-48">
                      {translatedPrompt}
                    </pre>
                    <p className="text-[9px] text-brand-muted/70 mt-2 font-mono">
                      💡 copy this prompt framework directly into Gemini to start building. Likkle by likkle, we build.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
