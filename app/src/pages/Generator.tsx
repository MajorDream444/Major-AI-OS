import { useState } from "react";
import { Copy, CheckCheck, Cpu } from "lucide-react";
import { allLessons } from "../data/lessons";
import { SystemConsole } from "../components/SystemConsole";

type ExportType = "reel" | "carousel" | "caption" | "notebooklm" | "omni";
type Platform = "instagram" | "tiktok" | "linkedin" | "youtube" | "podcast";

function buildReelScript(letter: string, concept: string, bigIdea: string, action: string, cta: string) {
  return `=== REEL SCRIPT — ${letter} IS FOR ${concept.toUpperCase()} ===

HOOK:
"${bigIdea}"

BODY:
[Expand on the concept — 30–45 seconds]
${bigIdea}

ACTION:
${action}

CTA:
${cta}

==========================================`;
}

function buildCarousel(letter: string, concept: string, bigIdea: string, explanation: string, action: string, cta: string) {
  return `=== CAROUSEL COPY — ${letter} IS FOR ${concept.toUpperCase()} ===

SLIDE 1 (COVER):
${letter} is for ${concept}
Major AI Mindset ABCs

SLIDE 2 (BIG IDEA):
"${bigIdea}"

SLIDE 3 (EXPLANATION):
${explanation.slice(0, 140)}...

SLIDE 4 (ACTION):
${action}

SLIDE 5 (CTA):
${cta}

==========================================`;
}

function buildCaption(letter: string, concept: string, bigIdea: string, action: string, cta: string, platform: Platform) {
  const hashtags: Record<Platform, string> = {
    instagram: "#AIMindset #MajorAI #AILiteracy #ContentCreator #AITools",
    tiktok: "#AITok #LearnOnTikTok #AIMindset #MajorAIMindset",
    linkedin: "#ArtificialIntelligence #AILiteracy #FutureOfWork #MajorAIMindset",
    youtube: "#AIMindset #MajorAIMindset #ABCStudio",
    podcast: "[Show Notes] Major AI Mindset ABC Studio",
  };
  return `${letter} is for ${concept} 🧠

${bigIdea}

${action}

${cta}

${hashtags[platform]}`;
}

function buildNotebookLM(letter: string, concept: string, bigIdea: string, explanation: string, action: string) {
  return `=== NOTEBOOKLM SOURCE PROMPT ===
Title: ${letter} is for ${concept} — Major AI Mindset ABCs

CONTEXT:
This is an AI literacy lesson from the Major AI Mindset ABC Studio.
Letter: ${letter} | Concept: ${concept}

BIG IDEA:
${bigIdea}

FULL EXPLANATION:
${explanation}

5-MINUTE ACTION:
${action}

TASK FOR NOTEBOOKLM:
Use this lesson as a source document. Generate:
1. A podcast episode outline (15–20 min)
2. 5 discussion questions for a study group
3. 3 related concepts to explore deeper
4. Real-world case studies that illustrate "${concept}"

================================`;
}

function buildOmni(letter: string, concept: string, bigIdea: string, explanation: string) {
  return `=== GOOGLE OMNI / GEMINI PROMPT ===
System: You are a senior AI education expert and content strategist for Major AI Mindset.

Task: Generate a comprehensive video script and visual breakdown for:
Letter: ${letter} | Concept: ${concept}
Level: [BEGINNER / INTERMEDIATE / ADVANCED — select appropriate]

Big Idea: "${bigIdea}"

Produce:
1. A 60-second reel script with visual cues
2. A 5-minute explainer video outline
3. 3 real-world examples that a founder or creator would relate to
4. A visual metaphor for "${concept}" that works in a short-form video format
5. On-screen text suggestions for each scene

Style: Sovereign, premium, builder-focused. Not academic. Not casual.
Voice: Direct, intelligent, actionable. Think: Bloomberg meets startup founder.

Background context: ${explanation}

===================================`;
}

export function Generator() {
  const [lessonId, setLessonId] = useState(allLessons[0]?.id ?? "");
  const [exportType, setExportType] = useState<ExportType>("reel");
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [output, setOutput] = useState("");
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const CONSOLE_LINES = generating ? [
    "SYS.CHK.LESSON — LOADING",
    `PROMPT.PACK.BUILDING — ${exportType.toUpperCase()}`,
    "CONTENT.ENGINE.ACTIVE",
    "EXPORT.READY",
  ] : output ? [
    `EXPORT.COMPLETE — ${exportType.toUpperCase()}`,
    "COPY.PASTE.READY",
  ] : ["CONTENT.GENERATOR.READY — SELECT LESSON AND EXPORT TYPE"];

  const generate = () => {
    const lesson = allLessons.find((l) => l.id === lessonId);
    if (!lesson) return;
    setGenerating(true);
    setOutput("");

    setTimeout(() => {
      const { letter, concept, content } = lesson;
      let result = "";
      if (exportType === "reel") result = buildReelScript(letter, concept, content.bigIdea, content.fiveMinuteAction, content.cta);
      else if (exportType === "carousel") result = buildCarousel(letter, concept, content.bigIdea, content.explanation, content.fiveMinuteAction, content.cta);
      else if (exportType === "caption") result = buildCaption(letter, concept, content.bigIdea, content.fiveMinuteAction, content.cta, platform);
      else if (exportType === "notebooklm") result = buildNotebookLM(letter, concept, content.bigIdea, content.explanation, content.fiveMinuteAction);
      else if (exportType === "omni") result = buildOmni(letter, concept, content.bigIdea, content.explanation);
      setOutput(result);
      setGenerating(false);
    }, 1500);
  };

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const EXPORT_TYPES: Array<{ value: ExportType; label: string }> = [
    { value: "reel",       label: "REEL SCRIPT" },
    { value: "carousel",   label: "CAROUSEL COPY" },
    { value: "caption",    label: "PLATFORM CAPTION" },
    { value: "notebooklm", label: "NOTEBOOKLM PROMPT" },
    { value: "omni",       label: "GOOGLE OMNI PROMPT" },
  ];

  return (
    <div className="min-h-screen pt-24 px-6 pb-16 max-w-4xl mx-auto">
      <div className="mb-10">
        <p className="font-mono text-xs text-[#D4AF37] tracking-[0.3em] mb-3">CONTENT.GENERATOR</p>
        <h1 className="font-display text-4xl text-white mb-3">Content Engine</h1>
        <p className="text-[#A1A1AA] text-sm">Generate export-ready content packs from any ABC lesson.</p>
      </div>

      <SystemConsole lines={CONSOLE_LINES} />

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        {/* ── Controls ─── */}
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
            <label className="font-mono text-[10px] tracking-widest text-[#D4AF37]">EXPORT.TYPE</label>
            <div className="grid grid-cols-1 gap-2">
              {EXPORT_TYPES.map(({ value, label }) => (
                <button key={value} onClick={() => setExportType(value)}
                  className={`text-left px-4 py-2.5 rounded-lg font-mono text-xs tracking-wider transition-all ${
                    exportType === value
                      ? "bg-[#18181B] text-[#D4AF37] border border-[#D4AF37]"
                      : "border border-[#27272A] text-[#A1A1AA] hover:border-[#D4AF37]"
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {exportType === "caption" && (
            <div className="card-system p-5 space-y-3">
              <label className="font-mono text-[10px] tracking-widest text-[#D4AF37]">PLATFORM</label>
              <div className="flex flex-wrap gap-2">
                {(["instagram","tiktok","linkedin","youtube","podcast"] as Platform[]).map((p) => (
                  <button key={p} onClick={() => setPlatform(p)}
                    className={`font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded transition-all ${
                      platform === p
                        ? "bg-[#D4AF37] text-[#050505]"
                        : "border border-[#27272A] text-[#A1A1AA] hover:border-[#D4AF37]"
                    }`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button onClick={generate} disabled={generating}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-display text-sm tracking-widest text-[#050505] transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #D4AF37, #9A7F27)" }}>
            <Cpu size={16} />
            {generating ? "GENERATING…" : "GENERATE"}
          </button>
        </div>

        {/* ── Output ─── */}
        <div className="card-system p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] tracking-widest text-[#A3E635]">OUTPUT</span>
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
              <div className="flex items-center justify-center h-40">
                <p className="font-mono text-xs text-[#27272A]">OUTPUT.PENDING</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
