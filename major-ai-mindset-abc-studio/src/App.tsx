/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Level, LStatus, LessonContent 
} from './types';
import { 
  getFullCurriculum, INITIAL_STATUSES, ALL_CONCEPTS_LIST, generateCurriculumItem 
} from './data';

// Component imports
import AuraHeader from './components/AuraHeader';
import HeroStatsCards from './components/HeroStatsCards';
import AbcLibrary from './components/AbcLibrary';
import LessonDetailPane from './components/LessonDetailPane';
import ContentGenerator from './components/ContentGenerator';
import WorkflowBoard from './components/WorkflowBoard';
import PodcastBuilder from './components/PodcastBuilder';
import VideoPromptBuilder from './components/VideoPromptBuilder';

// New strategic conversion components
import BusinessPressureTest from './components/BusinessPressureTest';
import SparkLabVault from './components/SparkLabVault';

// Icon imports
import { 
  LayoutDashboard, Kanban, Radio, Sparkles, AlertCircle, RefreshCw,
  Heart, Zap, Award, Shield, ArrowRight, Lock, Flame, Landmark,
  BarChart2, ChevronRight, Calendar, Mail, Check, Users, Compass, Laptop
} from 'lucide-react';

export default function App() {
  const [currentLevel, setCurrentLevel] = useState<Level>('Beginner');
  const [selectedLetter, setSelectedLetter] = useState<string>('A');
  const [activeViewTab, setActiveViewTab] = useState<'editor' | 'kanban' | 'builders'>('editor');

  // New conversion states
  const [selectedPath, setSelectedPath] = useState<'Creator' | 'Coach / Healer' | 'Founder' | 'Athlete' | 'Builder'>('Creator');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({ name: '', email: '', message: '', role: 'Creator' });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  // Email join list state
  const [joinEmail, setJoinEmail] = useState('');
  const [joinSubmitted, setJoinSubmitted] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  // Track statuses of all 26 letters across all 3 levels
  const [statuses, setStatuses] = useState<Record<string, LStatus>>(() => {
    const registry: Record<string, LStatus> = {};
    // Load initial statuses for Beginner
    for (const key of Object.keys(INITIAL_STATUSES)) {
      registry[key] = INITIAL_STATUSES[key];
    }
    // Set default Idea status for other levels
    ALL_CONCEPTS_LIST.forEach(item => {
      registry[`${item.letter}_Medium`] = 'Idea';
      registry[`${item.letter}_Expert`] = 'Idea';
    });
    return registry;
  });

  // Track any custom edits made by the user in-session
  const [customEdits, setCustomEdits] = useState<Record<string, Partial<LessonContent>>>({});

  // Dynamic status modifier handler
  const handleUpdateStatus = (letter: string, level: Level, newStatus: LStatus) => {
    setStatuses(prev => ({
      ...prev,
      [`${letter}_${level}`]: newStatus
    }));
  };

  // Dynamic lesson content modifier handler
  const handleUpdateLessonData = (letter: string, level: Level, updatedFields: Partial<LessonContent>) => {
    setCustomEdits(prev => ({
      ...prev,
      [`${letter}_${level}`]: {
         ...prev[`${letter}_${level}`],
         ...updatedFields
      }
    }));
  };

  // Compile active list of current level lessons based on status state & custom modifications
  const currentLessonsList = useMemo(() => {
    return ALL_CONCEPTS_LIST.map(item => {
      const statusKey = `${item.letter}_${currentLevel}`;
      const status = statuses[statusKey] || 'Idea';
      const baseNode = generateCurriculumItem(item.letter, currentLevel, status);
      const userModifications = customEdits[statusKey] || {};
      return {
        ...baseNode,
        ...userModifications
      };
    });
  }, [currentLevel, statuses, customEdits]);

  // Compute active selected letter node
  const activeLessonNode = useMemo(() => {
    const matching = currentLessonsList.find(l => l.letter === selectedLetter);
    if (matching) return matching;
    // Fallback safe compilation
    const statusKey = `${selectedLetter}_${currentLevel}`;
    const status = statuses[statusKey] || 'Idea';
    return {
      ...generateCurriculumItem(selectedLetter, currentLevel, status),
      ...(customEdits[statusKey] || {})
    };
  }, [currentLessonsList, selectedLetter, currentLevel, statuses, customEdits]);

  // Compute stats metrics for header progress bar
  const publishedCount = useMemo(() => {
    return currentLessonsList.filter(l => l.status === 'Published').length;
  }, [currentLessonsList]);

  // Smooth scroll helper
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // "Pick Your Path" data
  const PATH_DETAILS = {
    'Creator': {
      leak: "Fragmented focus & prompt fatigue. You write content randomly or struggle to capture your physical brand voice consistently, spending 10+ hours per week editing robotic text.",
      firstStep: "Begin with Level 1 (Beginner) A-Z Systems. Learn to align raw prompt frameworks and design consistent thematic scripting templates.",
      recommendationID: "starter-kit"
    },
    'Coach / Healer': {
      leak: "Administrative overload. You are buried in customer onboarding packets, scheduling logistics, and workbook drafting instead of spending 90% of your time in deep, offline focus.",
      firstStep: "Deploy Level 2 (Medium) Workflows. Install strict human-in-the-loop audit checkpoints to automate the repetition while preserving your grounded emotional presence.",
      recommendationID: "abc-workbook"
    },
    'Founder': {
      leak: "Workflow fragmentation & model drift. When you delegate tasks, the AI outcomes drop in quality. Your team lacks unified custom instruction guidelines.",
      firstStep: "Construct Level 3 (Expert) Operating Systems. Hard-code automated QA parameters and strict structured boundaries to eliminate key-person dependence.",
      recommendationID: "bleed-workshop"
    },
    'Athlete': {
      leak: "Startup friction & procrastination. You get overwhelmed by the continuous noise of newly released tools, delaying daily execution.",
      firstStep: "Configure zero-excuses keyboard shortcuts and system hotkey templates to trigger your custom scripts in under 5 seconds.",
      recommendationID: "pressure-test"
    },
    'Builder': {
      leak: "System ceiling limitations. You understand single prompts but are wasting API token budgets and lack robust testing frameworks.",
      firstStep: "Master complex prompt-chains and enforce structured boundaries using production-grade JSON schemas.",
      recommendationID: "prompt-pack"
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingBooking(true);
    setTimeout(() => {
      setIsSubmittingBooking(false);
      setBookingSubmitted(true);
    }, 1500);
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinEmail) return;
    setIsJoining(true);
    setTimeout(() => {
      setIsJoining(false);
      setJoinSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-white font-sans flex flex-col antialiased relative">
      
      {/* Decorative Aura Corner Laser Accents applied to the entire viewer screen frame */}
      <div className="fixed top-0 left-0 w-32 h-[1px] bg-brand-orange shadow-[0_0_8px_#FF5A00] z-50 pointer-events-none" />
      <div className="fixed top-0 left-0 h-32 w-[1px] bg-brand-orange shadow-[0_0_8px_#FF5A00] z-50 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-32 h-[1px] bg-brand-blue shadow-[0_0_8px_#2563EB] z-50 pointer-events-none" />
      <div className="fixed bottom-0 right-0 h-32 w-[1px] bg-brand-blue shadow-[0_0_8px_#2563EB] z-50 pointer-events-none" />

      {/* Embedded Ambient Particle Canvas Graphic Overlay (representing Aura Nexora WebGL) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black pointer-events-none z-0" />
      
      {/* Grid Pattern Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#14161d_1px,transparent_1px),linear-gradient(to_bottom,#14161d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none z-0" />

      {/* Header section with Metadata Indicator */}
      <AuraHeader 
        userEmail="majornfts@gmail.com" 
        totalLetters={ALL_CONCEPTS_LIST.length} 
        publishedCount={publishedCount} 
      />

      {/* MAIN CONVERSION JOURNEY CONTAINER */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-20 relative z-10 pb-32">
        
        {/* SECTION 1: ELEGANT CINEMATIC HERO */}
        <section className="text-center space-y-6 pt-10 pb-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange rounded-full font-mono text-[10px] uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5" />
            <span>The Mindset Operating System</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black tracking-tight leading-tight text-white">
            Most people do not need more AI tools.<br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-500 to-amber-600">
              They need a better operating system.
            </span>
          </h2>

          <p className="text-base md:text-lg text-zinc-400 font-body max-w-2xl mx-auto leading-relaxed">
            Major AI Mindset ABC Studio is a robust, disciplined framework built under the Bali sun to help creators, founders, and practitioners clear administrative noise and scale intelligence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              onClick={() => scrollToId('pressure-test')}
              className="w-full sm:w-auto px-8 py-4 bg-brand-orange text-black font-extrabold font-mono text-xs tracking-wider uppercase rounded-xl hover:shadow-[0_0_20px_rgba(255,90,0,0.35)] hover:bg-brand-orange/90 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Take the Business Pressure Test</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
            
            <button
              onClick={() => scrollToId('abc-framework')}
              className="w-full sm:w-auto px-8 py-4 bg-black border border-brand-border text-zinc-300 hover:text-white hover:border-brand-muted/40 transition-all rounded-xl font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore the ABCs</span>
            </button>
          </div>
        </section>

        {/* SECTION 2: PICK YOUR PATH SYSTEM */}
        <section className="bg-brand-card/20 border border-brand-border rounded-[32px] p-6 md:p-8 space-y-6 scroll-mt-20" id="pick-your-path">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-orange mb-2">
              <span className="w-6 h-[1px] bg-brand-orange block" />
              <span>ALIGNMENT SYSTEM</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white tracking-tight">
              Pick Your Path
            </h2>
            <p className="text-xs text-brand-muted font-body mt-1">
              Identify your current role to diagnose where operational friction limits your throughput.
            </p>
          </div>

          {/* Interactive buttons row */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {(['Creator', 'Coach / Healer', 'Founder', 'Athlete', 'Builder'] as const).map((pathName) => {
              const isActive = selectedPath === pathName;
              return (
                <button
                  key={pathName}
                  onClick={() => setSelectedPath(pathName)}
                  className={`px-4.5 py-2.5 rounded-xl font-sans font-bold text-xs tracking-wider transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'bg-brand-orange text-black border-brand-orange font-black shadow-[0_4px_12px_rgba(255,90,0,0.2)]'
                      : 'bg-[#14161D]/70 text-zinc-400 hover:text-white border-brand-border hover:bg-[#1C2029]'
                  }`}
                >
                  {pathName}
                </button>
              );
            })}
          </div>

          {/* Result Block */}
          <div className="bg-black/60 border border-brand-border/80 rounded-[20px] p-6 text-left relative overflow-hidden transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-orange/5 to-transparent pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-3.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-orange shrink-0 animate-ping" />
                  <span className="text-3xs font-mono uppercase tracking-widest text-brand-muted">
                    Diagnosed Operating Bottleneck
                  </span>
                </div>
                
                <h3 className="text-xl font-sans font-extrabold text-white">
                  We identified major friction blocks for the <span className="text-brand-orange">{selectedPath}</span>:
                </h3>
                
                <p className="text-xs text-zinc-300 font-body leading-relaxed max-w-3xl">
                  <strong>Operational Leak:</strong> {PATH_DETAILS[selectedPath].leak}
                </p>

                <p className="text-xs text-zinc-400 font-body leading-relaxed max-w-3xl border-t border-brand-border/40 pt-3">
                  <strong>Your Roadmap Fit:</strong> {PATH_DETAILS[selectedPath].firstStep}
                </p>
              </div>

              <div className="md:col-span-4 flex justify-center md:justify-end">
                <button
                  onClick={() => {
                    const target = PATH_DETAILS[selectedPath].recommendationID;
                    if (target === "pressure-test") {
                      scrollToId("pressure-test");
                    } else {
                      scrollToId("spark-lab-vault");
                    }
                  }}
                  className="w-full md:w-auto px-5 py-3.5 bg-[#1C2029] border border-zinc-800 hover:border-brand-orange/40 text-brand-orange font-mono text-2xs uppercase tracking-wider font-extrabold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 hover:bg-black/80"
                >
                  <span>Correct This Leak</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: BUSINESS PRESSURE TEST (DIAGNOSTIC) */}
        <section className="scroll-mt-24 space-y-4">
          <BusinessPressureTest 
            onSelectProduct={() => scrollToId('spark-lab-vault')}
            onNavigateToVault={() => scrollToId('spark-lab-vault')}
            onNavigateToSprint={() => scrollToId('spark-lab-sprint')}
          />
        </section>

        {/* SECTION 4: THE ABC FRAMEWORK (Interactive Workspace) */}
        <section className="space-y-6 scroll-mt-24" id="abc-framework">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-brand-border/60 pb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-[1px] bg-brand-orange block" />
                <span className="text-xs font-mono uppercase tracking-widest text-brand-orange font-bold">
                  ABC PORTFOLIO FRAMEWORK
                </span>
              </div>
              <h2 className="text-3xl font-sans font-black text-white tracking-tight leading-none">
                Interactive Editorial Desk
              </h2>
              <p className="text-sm font-body text-brand-muted mt-1.5 max-w-xl">
                Review A–Z cognitive curriculum. Generate short video models, dynamic carousel drafts, or simulate interactive podcasts on study themes.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setActiveViewTab('editor')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                  activeViewTab === 'editor' ? 'bg-brand-orange text-black border-brand-orange font-black' : 'bg-black/40 text-[#888] border-zinc-800'
                }`}
              >
                Editorial Desk
              </button>
              <button 
                onClick={() => setActiveViewTab('kanban')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                  activeViewTab === 'kanban' ? 'bg-white text-black border-white font-black' : 'bg-black/40 text-[#888] border-zinc-800'
                }`}
              >
                Kanban
              </button>
              <button 
                onClick={() => setActiveViewTab('builders')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                  activeViewTab === 'builders' ? 'bg-brand-blue text-white border-brand-blue font-black' : 'bg-black/40 text-[#888] border-zinc-800'
                }`}
              >
                Audio/Cinema
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeViewTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="space-y-6"
              >
                {/* View A: INTERACTIVE EDITORIAL DESK */}
                {activeViewTab === 'editor' && (
                  <div className="space-y-8">
                    {/* A-Z Index cards selection library */}
                    <AbcLibrary 
                      lessons={currentLessonsList} 
                      selectedLetter={selectedLetter} 
                      onSelectLetter={setSelectedLetter}
                      currentLevel={currentLevel}
                    />

                    {/* Split layout: Detailed Script views */}
                    <LessonDetailPane 
                      lesson={activeLessonNode}
                      onUpdateStatus={handleUpdateStatus}
                      onUpdateLessonData={handleUpdateLessonData}
                    />

                    {/* Content draft variation compiler playground */}
                    <ContentGenerator 
                      currentLevel={currentLevel}
                      selectedLetter={selectedLetter}
                    />
                  </div>
                )}

                {/* View B: WORKFLOW KANBAN PIPELINE */}
                {activeViewTab === 'kanban' && (
                  <WorkflowBoard 
                    lessons={currentLessonsList}
                    onSelectLetter={(letter) => {
                      setSelectedLetter(letter);
                      setActiveViewTab('editor'); // Quick teleport to editorial panel on select
                    }}
                    selectedLetter={selectedLetter}
                    onUpdateStatus={handleUpdateStatus}
                  />
                )}

                {/* View C: AUDIO & CINEMA BUILDERS */}
                {activeViewTab === 'builders' && (
                  <div className="space-y-8">
                    <div className="bg-[#1C2029]/80 border border-brand-orange/20 p-5 rounded-[20px] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <span className="text-3xs font-mono tracking-widest text-brand-orange uppercase">Active Node Target</span>
                        <h3 className="text-xl font-sans font-bold text-white mt-1">
                          Theme: <span className="text-brand-orange">{selectedLetter} — {activeLessonNode.concept}</span>
                        </h3>
                        <p className="text-xs font-body text-zinc-400 mt-0.5">
                          Change the active concept in the "Interactive Editorial Desk" to reload distinct assets.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setActiveViewTab('editor');
                          scrollToId('abc-framework');
                        }}
                        className="px-4 py-2 bg-zinc-800 border border-zinc-700 font-mono text-2xs hover:text-white text-zinc-300 rounded-lg hover:bg-zinc-700 cursor-pointer"
                      >
                        ← Select Different Letter
                      </button>
                    </div>

                    <PodcastBuilder lesson={activeLessonNode} />
                    <VideoPromptBuilder lesson={activeLessonNode} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* SECTION 5: SPARK LAB VAULT */}
        <section className="scroll-mt-24">
          <SparkLabVault 
            onStartPressureTest={() => {
              scrollToId('pressure-test');
              // Optionally trigger actual start method if accessible
            }}
            onBookSprint={() => scrollToId('spark-lab-sprint')}
          />
        </section>

        {/* SECTION 6: THREE LEVELS (Tiers selector) */}
        <section className="scroll-mt-24 space-y-6" id="three-levels">
          <div className="border-b border-brand-border/60 pb-4">
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white">
              The Three Learner Tiers
            </h2>
            <p className="text-xs text-brand-muted font-body mt-0.5">
              Choose your depth level depending on your technical background and workflow requirements.
            </p>
          </div>
          <HeroStatsCards 
            currentLevel={currentLevel} 
            onLevelChange={(lvl) => {
              setCurrentLevel(lvl);
              scrollToId('abc-framework');
            }} 
            lessons={currentLessonsList}
          />
        </section>

        {/* SECTION 7: SPARK LAB SPRINT WITH NEW CTAs */}
        <section className="bg-brand-card/25 border border-[#2563EB]/35 rounded-[32px] p-8 md:p-12 relative overflow-hidden space-y-8 scroll-mt-24" id="spark-lab-sprint">
          {/* Top decorative stripe */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-brand-blue/10 to-transparent pointer-events-none rounded-full" />
          
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-blue/10 border border-brand-blue/25 text-brand-blue rounded-full font-mono text-3xs uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5" />
              <span>Premium Bali Co-Creation Block</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-sans font-black tracking-tight text-white leading-tight">
              Book a <span className="text-[#3b82f6]">Spark Lab Sprint</span>
            </h2>

            <p className="text-sm font-body text-zinc-300 leading-relaxed">
              Stand at life’s crossroads with clarity. Spend an exclusive 1-on-1 sprint block alongside Z on the quiet beaches of Bali, or securely over premium audio/video checkpoints. Completely re-engineer your mental operating models, write high-leverage script guidelines, and assemble custom programmatic prompt channels designed for your voice.
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs font-body text-zinc-400">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-blue shrink-0" />
                <span>4 Hours of Direct Co-Creation with Z</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-blue shrink-0" />
                <span>Architect Dedicated Brand Voice Guidelines</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-blue shrink-0" />
                <span>Zero key-person automated QA boundaries</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-blue shrink-0" />
                <span>Muted sand off-grid clarity environment</span>
              </li>
            </ul>

            {/* Strategic CTAs: Book a Spark Lab Sprint & Take the Pressure Test First */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={() => {
                  setBookingSubmitted(false);
                  setIsSubmittingBooking(false);
                  setShowBookingModal(true);
                }}
                className="px-8 py-4 bg-brand-blue text-white font-extrabold font-mono text-2xs uppercase tracking-wider rounded-xl hover:bg-[#3b82f6] shadow-[0_4px_16px_rgba(37,99,235,0.35)] cursor-pointer text-center"
              >
                Book a Spark Lab Sprint
              </button>
              
              <button
                onClick={() => scrollToId('pressure-test')}
                className="px-8 py-4 bg-transparent text-zinc-300 hover:text-white border border-zinc-800 hover:border-brand-orange/40 font-mono text-2xs uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center"
              >
                Take the Pressure Test First
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 8: JOIN LIST */}
        <section className="bg-brand-card/25 border border-brand-border rounded-[32px] p-8 md:p-12 relative overflow-hidden text-center max-w-3xl mx-auto scroll-mt-24" id="join-list">
          <div className="max-w-xl mx-auto space-y-6">
            <h3 className="text-2xl font-sans font-extrabold text-white">
              Stay Configured
            </h3>
            <p className="text-xs text-brand-muted font-body leading-relaxed">
              We periodically release fresh operating system frameworks, prompt checklists, and upcoming Bali off-grid openings. Join 5,000+ creators and founders. No spam.
            </p>

            {joinSubmitted ? (
              <div className="bg-emerald-900/10 border border-emerald-900/40 rounded-2xl p-6.5 text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-sans font-bold text-white">Connection Established</h4>
                <p className="text-2xs text-zinc-400 font-body">
                  We've successfully registered your secure email <strong>{joinEmail}</strong>. Look out for the next release packet.
                </p>
              </div>
            ) : (
              <form onSubmit={handleJoinSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  className="flex-1 bg-black/60 border border-brand-border focus:border-brand-orange text-white text-xs font-body rounded-xl px-4 py-3 outline-none transition-all placeholder:text-brand-muted"
                  placeholder="operator@email.com"
                  value={joinEmail}
                  onChange={(e) => setJoinEmail(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={isJoining}
                  className="px-6 py-3 bg-brand-orange text-black font-extrabold font-mono text-2xs uppercase tracking-wider rounded-xl hover:bg-brand-orange/90 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isJoining ? (
                    <>
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>Syncing...</span>
                    </>
                  ) : (
                    <span>Subscribe</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </section>

      </div>

      {/* STICKY BOTTOM MOBILE-ONLY CTA BAR */}
      <div className="fixed bottom-0 md:hidden inset-x-0 bg-black/95 border-t border-brand-border py-3 px-4 flex items-center justify-between z-40 backdrop-blur-md">
        <div className="text-left">
          <p className="text-[9px] font-mono uppercase tracking-widest text-brand-orange">System Leakage Diagnostic</p>
          <p className="text-[10px] font-sans font-bold text-white">Business Pressure Test</p>
        </div>
        <button
          onClick={() => scrollToId('pressure-test')}
          className="px-4 py-2 bg-brand-orange text-black font-extrabold font-mono text-[9px] uppercase tracking-wider rounded-lg shadow-[0_4px_12px_rgba(255,90,0,0.3)] hover:bg-brand-orange/90 cursor-pointer"
        >
          Take Pressure Test
        </button>
      </div>

      {/* SPRINT BOOKING DIALOG WINDOW (POPUP FORM) */}
      <AnimatePresence>
        {showBookingModal && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-brand-card border border-brand-border w-full max-w-lg rounded-[28px] overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.9)] relative"
            >
              {/* Header stripe accent */}
              <div className="h-1.5 w-full bg-brand-blue" />
              
              {/* Reset button X */}
              <button
                onClick={() => setShowBookingModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/80 text-zinc-400 hover:text-white flex items-center justify-center text-xs border border-brand-border cursor-pointer transition-colors"
              >
                ✕
              </button>

              <div className="p-8 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-blue/10 text-brand-blue rounded-full font-mono text-[9px] uppercase tracking-wider mb-2.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Bali Co-Creation Booking request</span>
                  </div>
                  <h3 className="text-xl font-sans font-black text-white">
                    Apply for Spark Lab Sprint
                  </h3>
                  <p className="text-xs text-brand-muted font-body mt-1">
                    Please submit your operational parameters below. Z will contact you within 24 hours to review your system compatibility.
                  </p>
                </div>

                {bookingSubmitted ? (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-14 h-14 bg-brand-blue/10 text-[#2563EB] rounded-full border border-brand-blue/30 flex items-center justify-center mx-auto text-2xl">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-base font-sans font-bold text-white">Application Received</h4>
                      <p className="text-2xs font-body text-zinc-400 mt-1">
                        We have logged your co-creation preferences. An exclusive calendar invite has been dispatched to:
                        <strong className="block text-brand-blue text-xs mt-1 font-mono">{bookingFormData.email}</strong>
                      </p>
                    </div>
                    <button
                      onClick={() => setShowBookingModal(false)}
                      className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-xl text-2xs font-mono uppercase tracking-wider cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4 font-body">
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-3xs uppercase tracking-widest text-brand-muted font-mono block">Your Name</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-black/50 border border-brand-border focus:border-brand-blue text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all placeholder:text-zinc-600"
                          placeholder="Operator Name"
                          value={bookingFormData.name}
                          onChange={(e) => setBookingFormData({...bookingFormData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-3xs uppercase tracking-widest text-brand-muted font-mono block">Your Email</label>
                        <input
                          type="email"
                          required
                          className="w-full bg-black/50 border border-brand-border focus:border-brand-blue text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all placeholder:text-zinc-600"
                          placeholder="operator@email.com"
                          value={bookingFormData.email}
                          onChange={(e) => setBookingFormData({...bookingFormData, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-3xs uppercase tracking-widest text-brand-muted font-mono block">Your Selected Path</label>
                      <select
                        className="w-full bg-black/60 border border-brand-border focus:border-brand-blue text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all font-sans cursor-pointer"
                        value={bookingFormData.role}
                        onChange={(e) => setBookingFormData({...bookingFormData, role: e.target.value})}
                      >
                        <option value="Creator">Creator — Re-engineer content schedules</option>
                        <option value="Coach / Healer">Coach / Healer — Remove administrative delay</option>
                        <option value="Founder">Founder — Standardize team-wide protocols</option>
                        <option value="Athlete">Athlete — Unfailing execution speed</option>
                        <option value="Builder">Builder — Production JSON &amp; API chains</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-3xs uppercase tracking-widest text-brand-muted font-mono block">What is your main operational bottleneck?</label>
                      <textarea
                        rows={3}
                        required
                        className="w-full bg-black/50 border border-brand-border focus:border-brand-blue text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all placeholder:text-zinc-600 resize-none"
                        placeholder="Detail which tasks consume at least 5 hours of your calendar every week..."
                        value={bookingFormData.message}
                        onChange={(e) => setBookingFormData({...bookingFormData, message: e.target.value})}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingBooking}
                      className="w-full py-4.5 bg-brand-blue hover:bg-[#3b82f6] text-white font-extrabold font-mono text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_16px_rgba(37,99,235,0.3)]"
                    >
                      {isSubmittingBooking ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Submitting Application...</span>
                        </>
                      ) : (
                        <>
                          <Compass className="w-4 h-4" />
                          <span>Submit Bali Sprint Application</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                <p className="text-[9px] font-mono text-center text-[#555]">
                  * This is an immersive interactive co-creation simulation. Z will coordinate via your registered email address.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Premium minimal footer */}
      <footer className="w-full border-t border-brand-border bg-black py-8 text-center text-3xs font-mono text-zinc-600 relative z-30">
        <p>© 2026 Major AI Mindset Inc. All rights reserved. Made in Bali with premium Aura constraints.</p>
        <p className="mt-1">Powered by full-stack stateful templates. No cartoon assets, absolute readability.</p>
      </footer>

    </div>
  );
}
