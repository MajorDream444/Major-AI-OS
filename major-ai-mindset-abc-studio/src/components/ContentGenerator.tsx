import { useState, useEffect } from 'react';
import { LessonContent, Level, LStatus } from '../types';
import { generateCurriculumItem, ALL_CONCEPTS_LIST } from '../data';
import { Sparkles, ArrowRight, Copy, Check, FileText, Send, HelpCircle, Download, FileJson } from 'lucide-react';

interface GeneratorProps {
  currentLevel: Level;
  selectedLetter: string;
}

export default function ContentGenerator({ currentLevel, selectedLetter }: GeneratorProps) {
  const [activeLetter, setActiveLetter] = useState(selectedLetter);
  const [activeLevel, setActiveLevel] = useState<Level>(currentLevel);
  const [platform, setPlatform] = useState<string>('LinkedIn');
  const [format, setFormat] = useState<string>('The Hook & Frame');
  
  const [isCompiling, setIsCompiling] = useState(false);
  const [compiledDraft, setCompiledDraft] = useState('');
  const [copied, setCopied] = useState(false);

  // Sync state if selections shift from parent components
  useEffect(() => {
    setActiveLetter(selectedLetter);
  }, [selectedLetter]);

  useEffect(() => {
    setActiveLevel(currentLevel);
  }, [currentLevel]);

  // Compute Simulated AI Content Generation based on selections
  const computeGeneration = (letter: string, lvl: Level, plat: string, form: string) => {
    setIsCompiling(true);
    
    setTimeout(() => {
      const lessonObj = generateCurriculumItem(letter, lvl);
      const title = `${letter} is for ${lessonObj.concept}`;
      let text = '';

      if (form === 'The Hook & Frame') {
        text = `// AURA COMPILER ENGINE — HOOK OPTIONS FOR ${plat.toUpperCase()}
[Topic: ${title}]
[Instruction: Generate 3 high-affinity hook variations to retain readers in the first 3 seconds]

🔥 HOOK 1: The Counter-Intuitive Truth (Best for high reach)
“Most people start learning AI by loading ten useless apps. But here is the secret: they skip ${lessonObj.concept}. And that's exactly why they fail. Here is how to fix it in 5 minutes…”

📈 HOOK 2: The Direct Cost/Benefit Angle
“If you're spent and feeling overwhelmed by tech, it isn’t because you're behind. It is because you lack systemized "${lessonObj.concept}". Here is a 3-step audit that saves up to 5 hours starting today…”

👁️ HOOK 3: The Human Agency Anchor 
“Here is why code degrees won't matter in the era of AI, but your specific "${lessonObj.concept}" matters more than ever. Here is how to use it to secure your edge…”

// FORMAT OUTLINE
- Hook (0-5s) → State the friction
- Pivot (5-15s) → ${lessonObj.bigIdea}
- Frame (15-40s) → ${lessonObj.explanation}
- Handout (40-55s) → ${lessonObj.actionStep}
- CTA (55-60s) → Comment "${lessonObj.cta?.split(' ')[1] || 'NOW'}" for full cheat sheets.`;

      } else if (form === 'The Multi-Tweet Thread') {
        text = `🧵 MAJOR AI MINDSET — A-Z THREAD SYSTEM (${plat.toUpperCase()} Optimized)
[Topic: ${title} | Concept: ${lessonObj.concept}]

1/26: Let's discuss ${lessonObj.concept} (${letter}).

A lot of people feel immense technical friction. They assume they need to code to command AI. 

The reality? You don't. You need structured, plain language and system level mindset. Let's break it down:

2/5: The core thesis is straightforward: 
👉 “${lessonObj.bigIdea}”

You have to learn to notice which tasks are high friction, repetitive, and drain your time, before scaling model tools.

3/5: Why this matters now:
${lessonObj.explanation}

Stop treating AI as a novelty search box. Treat it as a system layer to multiply your cognitive leverage.

4/5: Do this in 5 minutes today:
✅ ${lessonObj.actionStep}

No setup required. Pick one small item. Verify the outcomes. Let raw practice cure tech anxiety.

5/5: That's ${letter} for ${lessonObj.concept} in the #MajorAIMindset portfolio.

If you found this helpful:
1. Bookmark and save this lesson.
2. ${lessonObj.cta}

We are publishing all 26 letters of the A-Z series. Stay tuned. ✨`;

      } else if (form === 'The Long-form Article') {
        text = `📝 PREMIUM ARTICLE — DEEP RESEARCH FRAMEWORK
[Platform: Medium / LinkedIn Newsletter]
Title: Rethinking Organizational Leverage: ${title}

By Major AI Mindset Editors | Bali Corporate Retreat Publications

INTRODUCTION
The rate of modern AI adaptation is constrained not by computer bandwidth, but by human mindset. While teams chase transient, volatile application updates, strategic builders look at durable core concepts. 

In our global curriculum, ${letter} represents ${lessonObj.concept}.

THE CORE THESIS:
At the heart of optimization sits a single promise: “${lessonObj.bigIdea}”

Too many practitioners assume artificial intelligence is only for coders. They get caught in terminal windows, complex python setups, or prompt slop. In truth, if you can explain a process in plain english, you can coordinate AI.

TRANSFORMING THE WORKFLOW:
${lessonObj.explanation}

Rather than utilizing AI for random, single-off brainstorming sessions, leaders must establish a structured taxonomy of goals, role models, and security checkpoints. 

THE 5-MINUTE ACTION ROADMAP:
To integrate this concept immediately and experience actual return on attention, execute this protocol today:
👉 ${lessonObj.actionStep}

CONCLUSION:
${lessonObj.caption}
The next phase of work does not belong to the most technical players. It belongs to learners who pair human domain authority with automated execution.

How are you implementing ${lessonObj.concept} this week? Let us know:
👉 ${lessonObj.cta}`;

      } else {
        // The Checklist Handout
        text = `📋 COMMUNITY ENGAGEMENT PROTOCOL & CHECKLIST HANDOUT
[Topic: ${title} Handout Blueprint]

📋 SECTION 1: UNDERSTANDING "${lessonObj.concept.toUpperCase()}"
[ ] Identify the single biggest process drain in your work week.
[ ] Define if this drain stems from data collection, formatting, drafting, or verification.
[ ] Review: “${lessonObj.bigIdea}”

🧠 SECTION 2: PROCESS DEEP-DIVE
- Concept explanation notes: ${lessonObj.explanation}
- Visual branding motif check: "${lessonObj.visualMotif}"
- Focus tags: ${lessonObj.hashtags.map(t => `#${t}`).join(', ')}

⚡ SECTION 3: THE 5-MINUTE REACTION TEST
[ ] Set an alarm for exactly 5 minutes.
[ ] Open your trusted AI tool frame.
[ ] Prompt task: "${lessonObj.actionStep}"
[ ] Check and rewrite output to inject your human tone and verify obvious facts.

📢 SECTION 4: LESSON CTA
${lessonObj.cta}

Save this list to your personal NotebookLM folder.`;
      }

      setCompiledDraft(text);
      setIsCompiling(false);
    }, 750);
  };

  // Compile on mount or selection shifts
  useEffect(() => {
    computeGeneration(activeLetter, activeLevel, platform, format);
  }, [activeLetter, activeLevel, platform, format]);

  const handleCopy = () => {
    navigator.clipboard.writeText(compiledDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadTextFile = () => {
    const element = document.createElement("a");
    const file = new Blob([compiledDraft], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `AURA_DRAFT_${activeLetter}_${activeLevel}_${platform.toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-full bg-brand-card/30 border border-brand-border rounded-[24px] p-6 backdrop-blur-md">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-sans font-extrabold text-white flex items-center gap-2.5 tracking-tight">
            <span className="p-1 rounded-lg bg-brand-orange/10 text-brand-orange">
              <Sparkles className="w-5 h-5" />
            </span>
            <span>Aura AI Content Draft Compiler</span>
          </h2>
          <p className="text-xs text-brand-muted font-body mt-0.5">
            Format, tailor, and generate fully formatted social threads, newsletter articles, or short scripts instantly based on any letter node.
          </p>
        </div>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        
        {/* Letter Selector */}
        <div className="space-y-1.5 text-left">
          <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">Letter Node</label>
          <select
            className="w-full bg-black/60 text-white text-xs font-body p-3 border border-brand-border rounded-xl outline-none focus:border-brand-orange select-none"
            value={activeLetter}
            onChange={(e) => setActiveLetter(e.target.value)}
          >
            {ALL_CONCEPTS_LIST.map(item => (
              <option key={item.letter} value={item.letter} className="bg-brand-card">
                {item.letter} — {item.concept}
              </option>
            ))}
          </select>
        </div>

        {/* Level Selector */}
        <div className="space-y-1.5 text-left">
          <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">Tuned depth</label>
          <select
            className="w-full bg-black/60 text-white text-xs font-body p-3 border border-brand-border rounded-xl outline-none focus:border-brand-orange"
            value={activeLevel}
            onChange={(e) => setActiveLevel(e.target.value as Level)}
          >
            <option value="Beginner" className="bg-brand-card">Beginner ("You can do this")</option>
            <option value="Medium" className="bg-brand-card">Medium ("You can improve this")</option>
            <option value="Expert" className="bg-brand-card">Expert ("You can systematize this")</option>
          </select>
        </div>

        {/* Target Platform Selector */}
        <div className="space-y-1.5 text-left">
          <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">Target channel</label>
          <select
            className="w-full bg-black/60 text-white text-xs font-body p-3 border border-brand-border rounded-xl outline-none focus:border-brand-orange"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="LinkedIn" className="bg-brand-card">LinkedIn Post</option>
            <option value="Instagram / Shorts" className="bg-brand-card">Insta / Shorts 9:16 Video</option>
            <option value="Threads / X" className="bg-brand-card">Threads / Twitter Thread</option>
            <option value="Coursera / Teachable" className="bg-brand-card">LMS Video / Handout Outflow</option>
          </select>
        </div>

        {/* Draft Template Format */}
        <div className="space-y-1.5 text-left">
          <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">Draft Pattern</label>
          <select
            className="w-full bg-black/60 text-white text-xs font-body p-3 border border-brand-border rounded-xl outline-none focus:border-brand-orange"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="The Hook & Frame" className="bg-brand-card">3 High-Affinity Hooks + 9:16 Frame</option>
            <option value="The Multi-Tweet Thread" className="bg-brand-card">5-Slide Carousel / Twitter Thread</option>
            <option value="The Long-form Article" className="bg-brand-card">Editorial Publisher Article</option>
            <option value="The Checklist Handout" className="bg-brand-card">Community Handout / Checklist</option>
          </select>
        </div>
      </div>

      {/* Output preview panel */}
      <div className="relative">
        <div className="flex items-center justify-between bg-black/50 border border-brand-border px-4 py-2.5 rounded-t-xl text-3xs font-mono text-brand-muted">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-orange inline-block" />
            <span>DRAFT COMPILE WRAPPERS ACTIVE (SIMULATED GEMINI AI ENGINE)</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={downloadTextFile}
              className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              title="Download draft to .txt file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>TEXT FILE</span>
            </button>
            <button
              onClick={handleCopy}
              className="hover:text-brand-orange text-brand-muted flex items-center gap-1 cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'COPY SCHEMAS'}</span>
            </button>
          </div>
        </div>

        {/* Real-time reactive draft preview text area */}
        {isCompiling ? (
          <div className="bg-[#0c0d12] border-x border-b border-brand-border rounded-b-xl h-80 flex flex-col justify-center items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full border-2 border-brand-orange/20 border-t-brand-orange animate-spin" />
            </div>
            <p className="text-xs font-mono text-brand-orange tracking-widest uppercase animate-pulse">
              Compiling Aura Template Content...
            </p>
          </div>
        ) : (
          <textarea
            className="w-full bg-[#0c0d12] text-zinc-300 font-mono text-xs p-5 border-x border-b border-brand-border/80 rounded-b-xl h-84 outline-none focus:border-brand-orange/60 resize-none leading-relaxed transition-colors selection:bg-brand-orange/30 scrollbar-thin"
            value={compiledDraft}
            onChange={(e) => setCompiledDraft(e.target.value)}
            spellCheck="false"
          />
        )}
      </div>

      {/* Footer disclaimer */}
      <div className="mt-4 pt-3 border-t border-brand-border/40 flex justify-between items-center text-3xs text-brand-muted font-mono">
        <span>AURA PROTOCOL: High Contrast | Literal Copy Rhythm | Muted visual accents</span>
        <span>Version: Alpha 1.25</span>
      </div>
    </div>
  );
}
