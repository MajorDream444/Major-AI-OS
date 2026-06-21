import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, Shield, Zap, ArrowRight, BarChart2, Activity, 
  CheckCircle2, RefreshCw, Sparkles, FileText, Download, Heart 
} from 'lucide-react';

interface PressureTestProps {
  onSelectProduct: (productName: string) => void;
  onNavigateToVault: () => void;
  onNavigateToSprint: () => void;
}

interface Question {
  id: number;
  question: string;
  options: {
    label: string;
    points: number;
    archetype: string;
    description: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What is your primary operational time leak each week?",
    options: [
      { 
        label: "Editorial Chaos", 
        points: 15, 
        archetype: "Fragmented Creator",
        description: "Drafting, editing short video captions, hooks, or carousel materials from scratch"
      },
      { 
        label: "Administrative Friction", 
        points: 10, 
        archetype: "Overworked Practitioner",
        description: "Repetitive email replies, formatting notes and custom onboarding files of clients manually"
      },
      { 
        label: "Team Replication Failure", 
        points: 25, 
        archetype: "Systemless Founder",
        description: "Writing prompts myself because my team's output drops in quality without my constant review"
      },
      { 
        label: "Decision Fatigue / Startup Inertia", 
        points: 5, 
        archetype: "Intimidated Spectator",
        description: "Spending more hours bookmarking new AI tools than actually using them in my workflow"
      }
    ]
  },
  {
    id: 2,
    question: "How would you describe the consistency of your generative AI outputs?",
    options: [
      { 
        label: "Completely Unpredictable", 
        points: 10, 
        archetype: "Intimidated Spectator",
        description: "I copy-paste single prompts but get sterile, robotic text that requires total rewrite"
      },
      { 
        label: "Basic Chains But Volatile", 
        points: 20, 
        archetype: "Fragmented Creator",
        description: "I feed output from one ChatGPT prompt into another, but it degrades after three steps"
      },
      { 
        label: "Documented Workflows", 
        points: 35, 
        archetype: "Overworked Practitioner",
        description: "I have saved snippets, though we lack automated checkpoints and brand QA guardrails"
      },
      { 
        label: "Robust API Architectures", 
        points: 45, 
        archetype: "High-Leverage Operator",
        description: "We enforce strict schema structures and count execution token margins regularly"
      }
    ]
  },
  {
    id: 3,
    question: "What is the biggest operational roadblock keeping you from scale?",
    options: [
      { 
        label: "The Hype Wheel Burnout", 
        points: 10, 
        archetype: "Intimidated Spectator",
        description: "I get overwhelmed trying to buy or learn every shiny new release in my calendar"
      },
      { 
        label: "Zero-Excuse Blank Page Inertia", 
        points: 15, 
        archetype: "Fragmented Creator",
        description: "Creating templates from scratch takes longer than just doing the manual work myself"
      },
      { 
        label: "Prompt Drift", 
        points: 20, 
        archetype: "Systemless Founder",
        description: "AI outputs slowly drift from original quality targets unless I step back in to micro-manage"
      },
      { 
        label: "We Have Reached An Optimize Ceiling", 
        points: 40, 
        archetype: "High-Leverage Operator",
        description: "We need advanced prompt engineering chains to unlock higher speed thresholds"
      }
    ]
  },
  {
    id: 4,
    question: "Where do you want to direct your recovered cognitive hours?",
    options: [
      { 
        label: "Authentic Human Engagement", 
        points: 15, 
        archetype: "Overworked Practitioner",
        description: "Spending 90% of my days working live offline with premium clients in Bali"
      },
      { 
        label: "High-Volume Content Engines", 
        points: 10, 
        archetype: "Fragmented Creator",
        description: "Publishing a pristine, automated A-Z content series to capture direct attention"
      },
      { 
        label: "Process Systemization", 
        points: 25, 
        archetype: "Systemless Founder",
        description: "Removing key-person dependency so the business prints money without my hands-on labor"
      },
      { 
        label: "Programmatic Integrations", 
        points: 30, 
        archetype: "High-Leverage Operator",
        description: "Deploying proprietary prompt architectures that protect margins and scale rapidly"
      }
    ]
  }
];

export default function BusinessPressureTest({ onSelectProduct, onNavigateToVault, onNavigateToSprint }: PressureTestProps) {
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; points: number; archetype: string; label: string }[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [analysisText, setAnalysisText] = useState("Analyzing system leakage...");

  // Progress percentage
  const progressPercent = Math.round((currentQuestionIndex / QUESTIONS.length) * 100);

  const startTest = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setTestStarted(true);
    setIsCompleted(false);
    setIsAnalyzing(false);
  };

  const selectOption = (points: number, archetype: string, label: string) => {
    const nextAnswers = [
      ...answers,
      { questionId: QUESTIONS[currentQuestionIndex].id, points, archetype, label }
    ];
    setAnswers(nextAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      triggerAnalysis(nextAnswers);
    }
  };

  const triggerAnalysis = (finalAnswers: typeof answers) => {
    setIsAnalyzing(true);
    const steps = [
      "Benchmarking operating speed...",
      "Calculating prompt quality degradation...",
      "Mapping brand voice leaks...",
      "Compiling tailored system blueprints..."
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setAnalysisText(steps[stepIdx]);
        stepIdx++;
      } else {
        clearInterval(interval);
        setIsAnalyzing(false);
        setIsCompleted(true);
      }
    }, 700);
  };

  // Compile final metrics
  const totalScore = answers.reduce((sum, item) => sum + item.points, 0);
  
  // Max possible score is 130
  const normalizedScore = Math.round((totalScore / 130) * 100);

  // Compute dominant archetype
  const dominantArchetype = (() => {
    const counts: Record<string, number> = {};
    answers.forEach(ans => {
      counts[ans.archetype] = (counts[ans.archetype] || 0) + 1;
    });
    let maxCount = 0;
    let dominant = "Overworked Practitioner";
    Object.keys(counts).forEach(arch => {
      if (counts[arch] > maxCount) {
        maxCount = counts[arch];
        dominant = arch;
      }
    });
    return dominant;
  })();

  const getDiagnosticsDetails = (archetype: string, score: number) => {
    switch (archetype) {
      case "Fragmented Creator":
        return {
          title: "The Fragmented Creator",
          badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
          leakDesc: "You produce raw content, but spend hours rewriting robotic AI outputs. Inefficient editorial chains cost you at least 12 hours every week in manual draft tweaking.",
          actionPlan: [
            "Use Level 1 (Beginner) A-Z Systems to stabilize raw prompt outlines.",
            "De-risk time-leaks by getting the ABC Starter Kit (Free) to pre-format standard short scripts.",
            "Acquire the ABC Workbook ($27) to design consistent, high-leverage content angles that retain human voice."
          ],
          primaryRecommendation: "ABC Starter Kit",
          secondaryRecommendation: "ABC Workbook"
        };
      case "Systemless Founder":
        return {
          title: "The Systemless Founder",
          badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
          leakDesc: "You micro-manage team outputs. Because your prompts lack structural QA layers and JSON safeguards, draft consistency fluctuates by 45% when you delegate.",
          actionPlan: [
            "Transition into Level 3 (Expert) System Strategy to audit operational workflows.",
            "Implement hard-coded safety boundary charts and multi-step prompt chains.",
            "Book a Spark Lab Sprint in Bali to completely rebuild your custom workflows with Z."
          ],
          primaryRecommendation: "Book a Spark Lab Sprint",
          secondaryRecommendation: "Systems Pack"
        };
      case "High-Leverage Operator":
        return {
          title: "The High-Leverage Operator",
          badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          leakDesc: "You grasp prompt structures but have reached an optimization ceiling. Automated chains require structured diagnostic updates to curb token waste and API latency.",
          actionPlan: [
            "Integrate advanced programmatic QA scripts of Level 3.",
            "Deploy Spark Lab Prompt + Systems Pack ($97) to review advanced template schemata.",
            "Explore dedicated Bali Sprint options to construct proprietary fine-tuning channels."
          ],
          primaryRecommendation: "Systems Pack",
          secondaryRecommendation: "Book a Spark Lab Sprint"
        };
      default:
        return {
          title: "The Overworked Practitioner",
          badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
          leakDesc: "You are buried in administrative tasks, notes, and clients' calendar logistics. Busywork limits your client interaction blocks by 40% every month.",
          actionPlan: [
            "Enable Level 2 (Medium) Workflow Design frameworks.",
            "Clear administrative repetition by implementing 3 human-in-the-loop review nodes.",
            "Utilize the Stop the Bleed Workshop Replay ($47) to install strict calendar time blocks."
          ],
          primaryRecommendation: "Bleed Workshop",
          secondaryRecommendation: "ABC Workbook"
        };
    }
  };

  const diag = getDiagnosticsDetails(dominantArchetype, normalizedScore);

  return (
    <div className="w-full bg-brand-card/25 border border-brand-border rounded-[32px] overflow-hidden backdrop-blur-md relative" id="pressure-test">
      {/* Top background glow */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-brand-orange/5 to-transparent pointer-events-none" />

      {/* Header border stripe */}
      <div className="h-1 w-full bg-gradient-to-r from-brand-orange via-amber-500 to-brand-blue" />

      <div className="p-6 md:p-10">
        
        {/* State A: Introduction */}
        {!testStarted && !isCompleted && !isAnalyzing && (
          <div className="max-w-3xl mx-auto text-center py-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-mono text-2xs tracking-widest uppercase mb-4 animate-pulse">
              <Activity className="w-3.5 h-3.5" />
              <span>Interactive Diagnostic Tool</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-sans font-black text-white tracking-tight leading-none mb-4">
              The AI Business <span className="text-brand-orange">Pressure Test</span>
            </h2>
            
            <p className="text-zinc-400 font-body text-base max-w-xl mx-auto leading-relaxed mb-8">
              "Most people do not need more AI tools. They need a better operating system."
              <span className="block mt-3 text-sm text-zinc-500 italic">
                Our 4-step diagnostic maps your administrative leaks, prompt drift, and cognitive blocks in 90 seconds.
              </span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto mb-8">
              <div className="bg-[#14161D]/70 border border-brand-border p-4.5 rounded-2xl">
                <span className="text-xs font-mono text-brand-orange">01 / TIME LEAKS</span>
                <p className="text-2xs font-body text-zinc-400 mt-1">Isolate weekly hours spent on robotic post-editing.</p>
              </div>
              <div className="bg-[#14161D]/70 border border-brand-border p-4.5 rounded-2xl">
                <span className="text-xs font-mono text-brand-blue">02 / PROMPT DRIFT</span>
                <p className="text-2xs font-body text-zinc-400 mt-1">Evaluate if systems degrade without your oversight.</p>
              </div>
              <div className="bg-[#14161D]/70 border border-brand-border p-4.5 rounded-2xl">
                <span className="text-xs font-mono text-white">03 / REAL TIERING</span>
                <p className="text-2xs font-body text-zinc-400 mt-1">Get precise routes matching Beginner, Medium, or Expert goals.</p>
              </div>
            </div>

            <button
              onClick={startTest}
              className="px-8 py-4 bg-brand-orange text-black font-extrabold text-sm tracking-wider rounded-xl uppercase hover:bg-brand-orange/95 hover:shadow-[0_0_25px_rgba(255,90,0,0.4)] transition-all flex items-center gap-3.5 mx-auto cursor-pointer"
            >
              <span>Begin diagnostic scan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* State B: In-Progress Wizard */}
        {testStarted && !isCompleted && !isAnalyzing && (
          <div className="max-w-2xl mx-auto py-4">
            {/* Step Counter */}
            <div className="flex justify-between items-center mb-6 font-mono text-xs">
              <span className="text-brand-muted uppercase tracking-wider">
                Question {currentQuestionIndex + 1} of {QUESTIONS.length}
              </span>
              <span className="text-brand-orange">
                {progressPercent}% Complete
              </span>
            </div>

            {/* Micro Progress Bar */}
            <div className="w-full h-[3px] bg-brand-border rounded-full overflow-hidden mb-8">
              <div 
                className="h-full bg-brand-orange transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Question Card */}
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <h3 className="text-xl md:text-2xl font-sans font-extrabold text-white tracking-tight">
                {QUESTIONS[currentQuestionIndex].question}
              </h3>

              <div className="space-y-3 pt-2">
                {QUESTIONS[currentQuestionIndex].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => selectOption(opt.points, opt.archetype, opt.label)}
                    className="w-full text-left bg-black/40 hover:bg-[#14161D] border border-brand-border hover:border-brand-orange/40 p-4 rounded-xl transition-all duration-300 group flex justify-between items-center gap-4 cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-sans font-bold text-white group-hover:text-brand-orange transition-colors">
                        {opt.label}
                      </div>
                      <p className="text-xs text-zinc-400 font-body mt-0.5 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                    <div className="w-5 h-5 rounded-md border border-brand-border shrink-0 flex items-center justify-center group-hover:border-brand-orange transition-colors">
                      <div className="w-2.5 h-2.5 rounded-sm bg-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Reset option */}
            <div className="mt-8 text-center">
              <button 
                onClick={() => setTestStarted(false)}
                className="text-3xs font-mono uppercase tracking-widest text-[#666] hover:text-white cursor-pointer"
              >
                ← Cancel &amp; Restart
              </button>
            </div>
          </div>
        )}

        {/* State C: Scanning Loader */}
        {isAnalyzing && (
          <div className="max-w-md mx-auto py-12 text-center space-y-6">
            <RefreshCw className="w-10 h-10 text-brand-orange animate-spin mx-auto" />
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-brand-orange">Analyzing metrics</p>
              <h4 className="text-base font-sans font-bold text-white mt-1">
                {analysisText}
              </h4>
            </div>
            <div className="w-48 bg-brand-border h-[2px] rounded-full overflow-hidden mx-auto">
              <div className="h-full bg-brand-orange animate-pulse w-2/3" />
            </div>
          </div>
        )}

        {/* State D: Completed Report */}
        {isCompleted && (
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Badge Banner */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 border border-brand-orange/25 text-brand-orange rounded-full font-mono text-3xs uppercase tracking-widest mb-3">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Diagnostic Scan Completed</span>
              </div>
              <h2 className="text-3xl font-sans font-black text-white tracking-tight">
                Your Operating System Report
              </h2>
              <p className="text-xs text-brand-muted font-mono mt-1">
                Compiled on secure Bali workspace server | Target: Operator
              </p>
            </div>

            {/* Grid stats layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Score section */}
              <div className="md:col-span-5 bg-black/60 border border-brand-border rounded-2xl p-6 flex flex-col justify-between items-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-brand-orange/10 to-transparent rounded-bl-full" />
                
                <p className="text-[10px] font-mono uppercase tracking-widest text-brand-muted">
                  Mindset Leverage Score
                </p>

                <div className="my-4 relative">
                  {/* Radial simulation frame */}
                  <div className="w-32 h-32 rounded-full border-2 border-brand-orange/20 flex items-center justify-center p-2">
                    <div className="w-full h-full rounded-full bg-brand-orange/5 border border-brand-orange/30 flex flex-col justify-center items-center">
                      <span className="text-4xl font-mono font-black text-brand-orange leading-none">
                        {normalizedScore}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 block uppercase mt-0.5">
                        OF 100
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className={`inline-block text-xs uppercase tracking-wider px-3 flex-wrap py-1 text-center font-mono rounded-full border ${diag.badgeColor}`}>
                    {diag.title}
                  </span>
                  <p className="text-3xs font-mono text-brand-muted mt-2">
                    {normalizedScore < 45 ? "Priority Operational Leakage Alert" : "Stable Automator-Level Target"}
                  </p>
                </div>
              </div>

              {/* Diagnosis details section */}
              <div className="md:col-span-7 bg-brand-card/40 border border-brand-border rounded-2xl p-6 space-y-5">
                <div>
                  <span className="text-2xs font-mono uppercase tracking-widest text-brand-orange">
                    01/ Core Operational Leakage
                  </span>
                  <p className="text-sm font-body text-zinc-300 mt-1 lines-relaxed leading-relaxed">
                    {diag.leakDesc}
                  </p>
                </div>

                <div>
                  <span className="text-2xs font-mono uppercase tracking-widest text-brand-blue">
                    02/ Custom Operating System Plan
                  </span>
                  <ul className="text-xs font-body text-zinc-400 mt-2 space-y-2 list-none">
                    {diag.actionPlan.map((plan, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-1.5" />
                        <span>{plan}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Quick action router */}
            <div className="bg-[#1C2029]/80 border border-brand-orange/20 p-6 rounded-[24px] flex flex-col md:flex-row justify-between items-center gap-5">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-3xs font-mono uppercase tracking-widest text-brand-orange">Suggested Immediate Next Step</span>
                <p className="text-sm font-sans font-bold text-white">
                  Acquire the <span className="text-brand-orange">{diag.primaryRecommendation}</span> to correct these system leakages.
                </p>
                <p className="text-2xs font-body text-zinc-400">
                  Or bypass digital products and schedule an exclusive 1-on-1 sprint block in Bali.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
                <button
                  onClick={onNavigateToVault}
                  className="px-5 py-2.5 bg-brand-orange text-black font-extrabold font-mono text-2xs uppercase tracking-wider rounded-lg hover:bg-brand-orange/90 cursor-pointer text-center text-nowrap"
                >
                  Get Digital Products →
                </button>
                <button
                  onClick={onNavigateToSprint}
                  className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-extrabold font-mono text-2xs uppercase tracking-wider rounded-lg cursor-pointer text-center text-nowrap"
                >
                  Book 1-on-1 Bali Sprint
                </button>
              </div>
            </div>

            {/* Retake test button */}
            <div className="text-center">
              <button
                onClick={startTest}
                className="text-2xs font-mono text-zinc-500 hover:text-white underline cursor-pointer hover:underline"
              >
                ↻ Retake diagnostic pressure test
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
