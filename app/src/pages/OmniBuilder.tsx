import { useState } from "react";
import { Zap, Copy, CheckCheck } from "lucide-react";
import { allLessons } from "../data/lessons";
import { SystemConsole } from "../components/SystemConsole";

type OutputFormat = "video_script" | "deep_research" | "visual_brief" | "multimodal";

export function OmniBuilder() {
  const [lessonId, setLessonId] = useState(allLessons[0]?.id ?? "");
  const [format, setFormat] = useState<OutputFormat>("video_script");
  const [output, setOutput] = useState("");
  const [building, setBuilding] = useState(false);
  const [copied, setCopied] = useState(false);

  const INIT_LINES = building
    ? ["OMNI.SCENE.COMPILING", "GEMINI.CONTEXT.LOADING", "MULTIMODAL.PROMPT.BUILDING"]
    : output
    ? ["OMNI.PROMPT.READY — PASTE INTO GEMINI ULTRA OR GOOGLE AI STUDIO"]
    : ["GOOGLE.OMNI.BUILDER.READY"];

  const build = () => {
    const lesson = allLessons.find((l) => l.id === lessonId);
    if (!lesson) return;
    setBuilding(true);
    setOutput("");

    setTimeout(() => {
      const { letter, concept, content, level } = lesson;

      const prompts: Record<OutputFormat, string> = {
        video_script: `=== GOOGLE GEMINI — VIDEO SCRIPT PROMPT ===
Model: Gemini Ultra (Google AI Studio)
Task: Video Script Generation

You are a world-class AI education content director for Major AI Mindset.

Create a complete video script for:
Letter: ${letter} | Concept: ${concept} | Level: ${level.toUpperCase()}

Big Idea: "${content.bigIdea}"

Produce:
1. A 60-second vertical reel script (Instagram/TikTok format)
   - Hook (0-5s): Pattern interrupt opening line
   - Body (5-45s): 3 punchy concept beats
   - Action (45-55s): The 5-minute challenge
   - CTA (55-60s): Engagement hook

2. A 3-minute YouTube explainer outline
   - Intro beat + hook
   - Concept breakdown (3 points)
   - Real-world example
   - Call to action

Visual cues: Describe b-roll, text overlays, and on-screen graphics for each section.
Tone: Sovereign, builder-focused, Caribbean-rooted future literacy.
Background: ${content.explanation}
=============================================`,

        deep_research: `=== GOOGLE GEMINI — DEEP RESEARCH PROMPT ===
Model: Gemini Ultra with Deep Research
Task: AI Concept Research Synthesis

Research topic: "${concept}" in the context of practical AI adoption

Anchoring lesson: "${content.bigIdea}"

Research tasks:
1. Find 5 recent case studies (2024–2026) of organizations or founders who applied "${concept}" effectively with AI
2. Identify the top 3 frameworks or mental models related to "${concept}"
3. Surface emerging trends — how is the concept evolving as AI capabilities advance?
4. Find 3 contrarian or counterintuitive takes on "${concept}"
5. Synthesize into a 500-word briefing suitable for a builder/operator audience

Output format: Structured briefing with citations
============================================`,

        visual_brief: `=== GOOGLE GEMINI — VISUAL BRIEF PROMPT ===
Model: Gemini Ultra (Multimodal)
Task: Visual Content Brief for "${letter} is for ${concept}"

Generate a complete visual brief for a social media content series:

Lesson: ${letter} is for ${concept}
Level: ${level.toUpperCase()}
Big Idea: "${content.bigIdea}"

Produce:
1. Thumbnail concept (describe layout, typography hierarchy, color use)
   - Use design system: Sovereign Gold #D4AF37, Deep Black #050505, Cinzel serif
   - Letter mark "${letter}" as dominant element

2. Carousel slide-by-slide visual layout (5 slides)
   - Slide composition, text placement, icon/graphic suggestions

3. Story/Reel cover frame description

4. Brand consistency notes specific to this concept

Reference brand: Major AI Mindset ABC Studio (Aurelis design language — sovereign, premium, cinematic)
============================================`,

        multimodal: `=== GOOGLE GEMINI — MULTIMODAL CONTENT PACK ===
Model: Gemini Ultra (Full Multimodal)
Task: Complete Content Pack for "${letter} is for ${concept}"

Lesson context:
- Letter: ${letter} | Concept: ${concept} | Level: ${level.toUpperCase()}
- Big Idea: "${content.bigIdea}"
- Explanation: ${content.explanation}
- 5-Min Action: ${content.fiveMinuteAction}
- CTA: ${content.cta}

Generate a complete multi-platform content pack:

A. SHORT-FORM VIDEO (60s reel)
   Script + visual cues + caption with hashtags

B. LONG-FORM VIDEO (3 min explainer)
   Outline + chapter markers + description

C. WRITTEN CONTENT
   - LinkedIn post (250 words)
   - Twitter/X thread (7 tweets)
   - Newsletter section (400 words)

D. VISUAL CONTENT
   - Thumbnail brief
   - Carousel brief (5 slides)
   - Story frame description

E. AUDIO
   - Podcast intro (30 seconds)
   - Key talking points for 15-minute episode

Format each section clearly. Maintain brand voice throughout.
Brand: Major AI Mindset — sovereign, builder-focused, Caribbean-rooted future literacy.
=====================================================`,
      };

      setOutput(prompts[format]);
      setBuilding(false);
    }, 1400);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const FORMAT_OPTIONS: Array<{ value: OutputFormat; label: string; desc: string }> = [
    { value: "video_script",  label: "VIDEO SCRIPT",    desc: "60s reel + 3min explainer" },
    { value: "deep_research", label: "DEEP RESEARCH",   desc: "Case studies + frameworks" },
    { value: "visual_brief",  label: "VISUAL BRIEF",    desc: "Thumbnails + carousel design" },
    { value: "multimodal",    label: "FULL CONTENT PACK", desc: "All platforms in one prompt" },
  ];

  return (
    <div className="min-h-screen pt-24 px-6 pb-16 max-w-4xl mx-auto">
      <div className="mb-10">
        <p className="font-mono text-xs text-[#D4AF37] tracking-[0.3em] mb-3">GOOGLE.OMNI.BUILDER</p>
        <h1 className="font-display text-4xl text-white mb-3">Google Omni Prompts</h1>
        <p className="text-[#A1A1AA] text-sm">
          Build multimodal prompts for Gemini Ultra — video scripts, deep research, and full content packs.
        </p>
      </div>

      <SystemConsole lines={INIT_LINES} />

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div className="card-system p-5 space-y-3">
            <label className="font-mono text-[10px] tracking-widest text-[#D4AF37]">SELECT.LESSON</label>
            <select value={lessonId} onChange={(e) => setLessonId(e.target.value)}
              className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-lg px-4 py-2.5 font-mono text-xs text-white focus:border-[#D4AF37] focus:outline-none">
              {allLessons.map((l) => (
                <option key={l.id} value={l.id}>{l.letter} — {l.concept} [{l.level}]</option>
              ))}
            </select>
          </div>

          <div className="card-system p-5 space-y-3">
            <label className="font-mono text-[10px] tracking-widest text-[#D4AF37]">OUTPUT.FORMAT</label>
            {FORMAT_OPTIONS.map(({ value, label, desc }) => (
              <button key={value} onClick={() => setFormat(value)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  format === value
                    ? "bg-[#18181B] border border-[#D4AF37]"
                    : "border border-[#27272A] hover:border-[#D4AF37]"
                }`}>
                <div className="font-mono text-[10px] tracking-widest text-[#D4AF37]">{label}</div>
                <div className="font-mono text-[10px] text-[#A1A1AA] mt-0.5">{desc}</div>
              </button>
            ))}
          </div>

          <button onClick={build} disabled={building}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-display text-sm tracking-widest text-[#050505] transition-all hover:scale-[1.01] disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #D4AF37, #9A7F27)" }}>
            <Zap size={16} />
            {building ? "COMPILING…" : "BUILD OMNI PROMPT"}
          </button>
        </div>

        <div className="card-system p-5 flex flex-col min-h-[500px]">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] tracking-widest text-[#A3E635]">OMNI.PROMPT</span>
            {output && (
              <button onClick={copy}
                className="flex items-center gap-1.5 font-mono text-[10px] text-[#A1A1AA] hover:text-white transition-colors">
                {copied ? <CheckCheck size={12} className="text-[#A3E635]" /> : <Copy size={12} />}
                {copied ? "COPIED" : "COPY"}
              </button>
            )}
          </div>
          <div className="flex-1 overflow-auto">
            {output ? (
              <pre className="font-mono text-xs text-[#A1A1AA] whitespace-pre-wrap leading-relaxed">{output}</pre>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="font-mono text-xs text-[#27272A]">PROMPT.PENDING</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
