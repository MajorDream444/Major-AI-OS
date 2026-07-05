import React, { useState } from 'react';
import { UserCheck, Sparkles, AlertCircle, HelpCircle, ArrowRight, Lightbulb, Check } from 'lucide-react';
import { AudienceGroup, QuizQuestion } from '../types';

export default function AudienceQuizSection() {
  const [selectedAudience, setSelectedAudience] = useState<string>('beginners');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  const audiences: AudienceGroup[] = [
    {
      id: 'beginners',
      title: 'Beginners',
      description: 'Individuals feeling overwhelmed by tech speed who need a clean, zero-jargon gateway.',
      painPoint: 'Tired of tech-bro lectures and lists of 100 tools that break tomorrow.',
      takeaway: 'Total clarity. Plain English principles that prove you are fully capable of utilizing AI today.',
      bgGradient: 'from-[#006BB6]/20 via-[#006BB6]/5 to-transparent'
    },
    {
      id: 'creators',
      title: 'Creators',
      description: 'Artists, writers, and designers ready to package their wisdom into digital leverage.',
      painPoint: 'Wasting hours on manual formatting, resizing, drafting, and distribution.',
      takeaway: 'Convert messy draft documents into structured books, scripts, and media matrices in seconds.',
      bgGradient: 'from-[#F58426]/20 via-[#F58426]/5 to-transparent'
    },
    {
      id: 'founders',
      title: 'Founders',
      description: 'Entrepreneurs, small business heads, and builders needing leverage and system automation.',
      painPoint: 'Being bogged down in emails, customer templates, and repetitive operations.',
      takeaway: 'Build bespoke text-based assistants, automated processes, and content machines that scale.',
      bgGradient: 'from-[#D4AF37]/20 via-[#D4AF37]/5 to-transparent'
    },
    {
      id: 'parents',
      title: 'Parents & Leaders',
      description: 'Mentors, educators, and community guides who want to help others learn and protect legacy.',
      painPoint: 'Fear of children or community members falling behind in the global digital asset economy.',
      takeaway: 'Practical family templates and learning scripts to turn AI into a shared household asset builder.',
      bgGradient: 'from-[#1F7A3A]/20 via-[#1F7A3A]/5 to-transparent'
    },
    {
      id: 'professionals',
      title: 'Professionals',
      description: 'Corporate staff, administrators, and consultants staying high-signal and indispensable.',
      painPoint: 'Endless status reporting, manual spreadsheets, and formatting nightmares.',
      takeaway: 'Command high-level context sheets and prompt pipelines to execute 8-hour days in 40 minutes.',
      bgGradient: 'from-[#006BB6]/20 via-transparent to-transparent'
    },
    {
      id: 'coaches',
      title: 'Coaches & Athletes',
      description: 'Wellness experts, trainers, and athletes scaling their wisdom and personal leverage.',
      painPoint: 'Trading hours for money with no secondary assets or scalable client matrices.',
      takeaway: 'Instantly generate multi-week meal, fitness, or strategy roadmaps customized to client prompts.',
      bgGradient: 'from-[#F58426]/20 via-transparent to-transparent'
    }
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: 'How do you currently feel when you see massive updates about new AI models?',
      options: [
        { text: 'Intimidated, anxious, or overwhelmed like I am falling behind.', score: 1, description: 'Triggers tech-overload anxiety.' },
        { text: 'Slightly interested, but they look like tools for tech people only.', score: 2, description: 'A passive bystander mindset.' },
        { text: 'Excited! I see them as eager, ultra-fast assistants waiting for my directions.', score: 3, description: 'An asset-creation posture.' }
      ]
    },
    {
      id: 2,
      question: 'Where are your grand ideas, digital assets, and projects stored right now?',
      options: [
        { text: 'Entirely in my head, or scattered across loose notes and scrap paper.', score: 1, description: 'Carrying high mental debt.' },
        { text: 'In Google Docs or local folders, but they aren\'t automated or packaged.', score: 2, description: 'Under-leveraged raw material.' },
        { text: 'Already compiled or systematically organized in templates ready to prompt.', score: 3, description: 'Durable system architecture.' }
      ]
    },
    {
      id: 3,
      question: 'When you write an instruction (prompt) to an AI tool, what does it usually look like?',
      options: [
        { text: 'Extremely short: "write an email" or "give me marketing ideas".', score: 1, description: 'Dry, low-context query.' },
        { text: 'A few lines long, but without specific role guidelines or format rules.', score: 2, description: 'Unbounded casual chat.' },
        { text: 'I assign an expert identity, clear background context, and a strict output form.', score: 3, description: 'High-signal structural design.' }
      ]
    }
  ];

  const handleAnswerSelect = (optionScore: number) => {
    const updatedAnswers = [...selectedAnswers, optionScore];
    setSelectedAnswers(updatedAnswers);

    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Calculate total score
      const total = updatedAnswers.reduce((sum, current) => sum + current, 0);
      setQuizScore(total);
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnswers([]);
    setQuizFinished(false);
    setQuizScore(0);
  };

  // Archetype resolution logic
  const getArchetype = (score: number) => {
    if (score <= 4) {
      return {
        title: 'THE OVERWHELMED OBSERVER',
        description: 'You want to build, but constant tech-bro noise has locked you in mental paralysis. You carry your ideas in your head.',
        focus: 'Awareness & Belief. You must realize that if you can send a text, you can command AI.',
        recom: 'Your playbook is Chapter A & B of the MAIM Methodology. Register to unlock immediate tech relief.'
      };
    } else if (score <= 7) {
      return {
        title: 'THE SPEED SOLITARY BUILDER',
        description: 'You use AI occasionally, but you treat it like a search engine instead of a leverage builder.',
        focus: 'Context & Direction. You need to assign strict expert personas and aim AI at concrete, durable assets.',
        recom: 'Your playbook is Chapter C & D. You are ready to automate client templates and system content logs.'
      };
    } else {
      return {
        title: 'THE DEPLOYMENT ARCHITECT',
        description: 'You understand core prompt systems and structures. Now, you need to transition into complete ecosystem automation.',
        focus: 'Execution & Scale. Turn your prompts into multi-step templates and scale your digital assets.',
        recom: 'Your playbook is Chapter E. Focus on stacking systems and preserving family/business legacy.'
      };
    }
  };

  const activeGroup = audiences.find((aud) => aud.id === selectedAudience) || audiences[0];
  const archetype = getArchetype(quizScore);

  return (
    <section id="audience" className="relative py-24 bg-brand-black border-b border-[#14141c]">
      <div className="absolute inset-0 bg-[radial-gradient(#141424_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-20" />

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 z-10">
        
        {/* Section Heading Tag */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 bg-brand-blue rounded-full" />
          <span className="text-xs font-mono tracking-widest text-brand-blue uppercase">05 / AUDIENCE & DIAGNOSTIC</span>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-display font-black text-3xl sm:text-4xl xl:text-5xl uppercase tracking-tight text-brand-white leading-none mb-4">
            BUILT FOR BUILDERS OF ALL BACKGROUNDS
          </h2>
          <div className="w-20 h-0.5 bg-brand-blue mb-6" />
          <p className="font-serif italic text-lg sm:text-xl text-brand-muted leading-relaxed">
            Choose your demographic below to see your tailored outcome, or complete our quick 60-second Mindset Diagnostic.
          </p>
        </div>

        {/* Bento Grid layout containing selector and details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-24">
          
          {/* Left 6 Columns: Interactive Demographic Selector */}
          <div className="col-span-1 lg:col-span-6 grid grid-cols-2 gap-4">
            {audiences.map((aud) => (
              <button
                key={aud.id}
                onClick={() => setSelectedAudience(aud.id)}
                id={`audience-btn-${aud.id}`}
                className={`p-6 border text-left transition-all duration-300 flex flex-col justify-between h-full rounded-none group ${
                  selectedAudience === aud.id 
                    ? 'border-brand-blue bg-brand-black-light shadow-[0_0_15px_rgba(0,107,182,0.15)]' 
                    : 'border-[#14141e] hover:border-[#20202c] bg-brand-black-light/30'
                }`}
              >
                <div>
                  <h4 className={`font-display font-bold text-lg uppercase tracking-wider transition-colors mb-2 ${
                    selectedAudience === aud.id ? 'text-brand-blue' : 'text-brand-white group-hover:text-brand-blue'
                  }`}>
                    {aud.title}
                  </h4>
                  <p className="text-brand-muted text-xs leading-relaxed line-clamp-2">
                    {aud.description}
                  </p>
                </div>

                <div className="mt-4 flex justify-end">
                  <span className={`text-[10px] font-mono tracking-widest uppercase transition-transform ${
                    selectedAudience === aud.id ? 'text-brand-blue translate-x-1' : 'text-brand-muted/40'
                  }`}>
                    {selectedAudience === aud.id ? 'ACTIVE TARGET' : 'DISCOVER'} →
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Right 6 Columns: Demographics Detail Plate */}
          <div className="col-span-1 lg:col-span-6 border border-[#1c1c26] bg-brand-black-light p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Background Gradient for Demographic selection */}
            <div className={`absolute inset-0 bg-gradient-to-br ${activeGroup.bgGradient} opacity-40 pointer-events-none transition-all duration-500`} />

            <div className="relative z-10">
              <div className="flex items-center gap-2 text-[10px] font-mono text-brand-blue uppercase tracking-widest mb-6">
                <UserCheck className="w-3.5 h-3.5" />
                <span>TAILORED OUTCOME: {activeGroup.title}</span>
              </div>

              <h3 className="font-display font-black text-3xl uppercase tracking-tight text-brand-white mb-2">
                FOR {activeGroup.title}
              </h3>
              <p className="font-serif italic text-base text-brand-gold-muted mb-8">
                &ldquo;{activeGroup.description}&rdquo;
              </p>

              <div className="space-y-6">
                <div>
                  <span className="block text-[10px] font-mono text-brand-orange uppercase tracking-wider mb-1.5">
                    YOUR RECURRING FRUSTRATION:
                  </span>
                  <p className="text-sm text-brand-white font-sans leading-relaxed border-l border-brand-orange pl-4">
                    {activeGroup.painPoint}
                  </p>
                </div>

                <div>
                  <span className="block text-[10px] font-mono text-brand-green uppercase tracking-wider mb-1.5">
                    THE SESSIONS&apos; REMEDY:
                  </span>
                  <p className="text-sm text-brand-white font-sans leading-relaxed border-l border-brand-green pl-4">
                    {activeGroup.takeaway}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 pt-4 border-t border-[#15151e] flex items-center justify-between text-[10px] font-mono text-brand-muted">
              <span>DEMOGRAPHIC PROFILE KEY</span>
              <span>Likkle by likkle, we build.</span>
            </div>
          </div>

        </div>

        {/* 2. Interactive Mindset Diagnostic Quiz Card Plate */}
        <div className="pt-12 border-t border-[#12121a]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Column Left: Quiz Head */}
            <div className="col-span-1 lg:col-span-4 flex flex-col justify-between p-8 border border-[#1e1e28] bg-brand-black">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[9px] font-mono tracking-widest rounded-full uppercase mb-6">
                  <Sparkles className="w-3 h-3 text-brand-gold animate-spin-slow" />
                  <span>MAIM SYSTEM ASSESSMENT</span>
                </div>

                <h3 className="font-display font-black text-2xl uppercase tracking-tight text-brand-white mb-4">
                  EVALUATE YOUR MINDSET QUOTIENT
                </h3>

                <p className="text-xs text-brand-muted leading-relaxed font-sans">
                  The first step to building with AI is identifying your current operational bottlenecks. Take this simple 3-question diagnostic to unlock your recommended course playbook.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#14141d]/80 text-[10px] font-mono text-brand-muted">
                <span>60 SECOND TIME TO REVEAL</span>
              </div>
            </div>

            {/* Column Right: Interactive Quiz Plate */}
            <div id="quiz-plate" className="col-span-1 lg:col-span-8 p-8 border border-[#1e1e28] bg-brand-black-light flex flex-col justify-between">
              {!quizFinished ? (
                <div>
                  {/* Quiz Header Progress */}
                  <div className="flex justify-between items-center mb-6 pb-2 border-b border-[#14141d]">
                    <span className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">
                      QUESTION {currentQuestionIdx + 1} OF {quizQuestions.length}
                    </span>
                    <div className="flex gap-1">
                      {quizQuestions.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`w-4 h-1.5 rounded-sm transition-colors ${
                            idx <= currentQuestionIdx ? 'bg-brand-gold' : 'bg-[#151520]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Question Title */}
                  <h4 className="font-display font-bold text-lg sm:text-xl text-brand-white uppercase mb-8 leading-snug">
                    {quizQuestions[currentQuestionIdx].question}
                  </h4>

                  {/* Options List */}
                  <div className="space-y-4">
                    {quizQuestions[currentQuestionIdx].options.map((option, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleAnswerSelect(option.score)}
                        id={`quiz-option-${currentQuestionIdx}-${optIdx}`}
                        className="w-full text-left p-4 border border-[#1c1c26] hover:border-brand-gold bg-brand-black hover:bg-brand-black-light/60 transition-all duration-300 rounded-none group flex items-start gap-4"
                      >
                        <div className="w-6 h-6 rounded-full border border-brand-muted flex-shrink-0 flex items-center justify-center text-xs font-mono font-bold text-brand-muted group-hover:border-brand-gold group-hover:text-brand-gold">
                          {String.fromCharCode(65 + optIdx)}
                        </div>
                        <div>
                          <p className="text-brand-white text-xs sm:text-sm font-sans mb-0.5 group-hover:text-brand-gold transition-colors">
                            {option.text}
                          </p>
                          <span className="text-[10px] font-mono text-brand-muted/70 block uppercase">
                            {option.description}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Quiz Finished / Archetype Results Plate */
                <div className="animate-fade-in">
                  <div className="flex justify-between items-center mb-6 pb-2 border-b border-[#14141d]">
                    <span className="text-[10px] font-mono text-brand-green uppercase tracking-widest font-bold flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-brand-green" />
                      <span>DIAGNOSTIC COMPLETE</span>
                    </span>
                    <button
                      onClick={resetQuiz}
                      className="text-[10px] font-mono text-brand-orange hover:underline uppercase"
                    >
                      RETREAT & RETRY
                    </button>
                  </div>

                  <div className="p-6 bg-brand-black border border-[#21212b] rounded-lg mb-6 shadow-inner">
                    <span className="block text-[10px] font-mono text-brand-gold uppercase tracking-widest mb-1.5">
                      YOUR MINDSET ARCHETYPE IS:
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-brand-gold uppercase tracking-tight mb-3">
                      {archetype.title}
                    </h3>
                    <p className="text-brand-white text-xs sm:text-sm leading-relaxed mb-4">
                      {archetype.description}
                    </p>

                    <div className="pt-4 border-t border-[#12121a] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                      <div>
                        <span className="font-mono text-[9px] text-brand-green uppercase block mb-1">IMMEDIATE FOCUS AREA:</span>
                        <p className="text-brand-white leading-relaxed">{archetype.focus}</p>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-brand-blue uppercase block mb-1">SESSION RECOMMENDATION:</span>
                        <p className="text-brand-white leading-relaxed">{archetype.recom}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <a
                      href="#register"
                      className="inline-flex items-center gap-2 text-xs font-mono text-brand-gold hover:text-brand-white uppercase transition-colors"
                    >
                      <span>APPLY PROFILE TO RESERVE SEAT</span>
                      <ArrowRight className="w-4 h-4 text-brand-gold" />
                    </a>
                  </div>
                </div>
              )}

              {/* Progress Footer placeholder */}
              {!quizFinished && (
                <div className="mt-8 pt-4 border-t border-[#14141d]/80 text-[10px] font-mono text-brand-muted/50 text-right">
                  <span>MINDSET DIAGNOSTIC ENGINE V1.0</span>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
