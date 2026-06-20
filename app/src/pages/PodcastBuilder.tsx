import { useState } from "react";
import { Mic, Copy, CheckCheck } from "lucide-react";
import { allLessons } from "../data/lessons";
import { SystemConsole } from "../components/SystemConsole";

export function PodcastBuilder() {
  const [lessonId, setLessonId] = useState(allLessons[0]?.id ?? "");
  const [episodeLength, setEpisodeLength] = useState<"5" | "15" | "30">("15");
  const [output, setOutput] = useState("");
  const [building, setBuilding] = useState(false);
  const [copied, setCopied] = useState(false);

  const INIT_LINES = building
    ? ["NOTEBOOKLM.SOURCE.BUILDING", "PODCAST.OUTLINE.COMPILING", "EPISODE.STRUCTURE.READY"]
    : output
    ? ["PODCAST.PACK.COMPLETE — COPY AND PASTE INTO NOTEBOOKLM"]
    : ["PODCAST.BUILDER.READY — SELECT LESSON AND EPISODE LENGTH"];

  const build = () => {
    const lesson = allLessons.find((l) => l.id === lessonId);
    if (!lesson) return;
    setBuilding(true);
    setOutput("");

    setTimeout(() => {
      const { letter, concept, content, level } = lesson;
      const result = `=== NOTEBOOKLM SOURCE DOCUMENT ===
MAJOR AI MINDSET ABC STUDIO
Episode: ${letter} is for ${concept}
Level: ${level.toUpperCase()} | Target Length: ${episodeLength} minutes

─────────────────────────────────────

EPISODE BIG IDEA
"${content.bigIdea}"

─────────────────────────────────────

FULL LESSON CONTENT
${content.explanation}

─────────────────────────────────────

5-MINUTE ACTION
${content.fiveMinuteAction}

CTA
${content.cta}

─────────────────────────────────────

${content.podcastAngle ? `PODCAST ANGLE\n${content.podcastAngle}\n\n─────────────────────────────────────\n\n` : ""}

INSTRUCTIONS FOR NOTEBOOKLM
Paste this as a source document.

Generate:
1. A ${episodeLength}-minute podcast episode outline with timestamps
2. An intro hook (30 seconds) that opens with the big idea
3. 3 supporting stories or analogies a founder/builder would relate to
4. A closing framework the listener can apply today
5. 5 discussion questions for a study group or co-host
6. Related AI concepts that connect to "${concept}"
7. Show notes (300 words) with bullet points
8. 3 social media pull-quotes from the episode

Voice & Tone:
- Sovereign, direct, builder-focused
- Like Bloomberg meets Caribbean startup culture
- Smart and accessible — not academic, not casual
- Always actionable — every insight has a "so what"

Host: Major (Major AI Mindset)
Series: The Major AI Mindset ABC Podcast
==================================`;
      setOutput(result);
      setBuilding(false);
    }, 1600);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-16 max-w-4xl mx-auto">
      <div className="mb-10">
        <p className="font-mono text-xs text-[#D4AF37] tracking-[0.3em] mb-3">PODCAST.BUILDER</p>
        <h1 className="font-display text-4xl text-white mb-3">Podcast Builder</h1>
        <p className="text-[#A1A1AA] text-sm">
          Generate NotebookLM source documents and podcast episode outlines from any ABC lesson.
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
            <label className="font-mono text-[10px] tracking-widest text-[#D4AF37]">EPISODE.LENGTH</label>
            <div className="grid grid-cols-3 gap-2">
              {(["5", "15", "30"] as const).map((len) => (
                <button key={len} onClick={() => setEpisodeLength(len)}
                  className={`py-3 rounded-lg font-mono text-xs tracking-wider transition-all ${
                    episodeLength === len
                      ? "bg-[#18181B] text-[#D4AF37] border border-[#D4AF37]"
                      : "border border-[#27272A] text-[#A1A1AA] hover:border-[#D4AF37]"
                  }`}>
                  {len} MIN
                </button>
              ))}
            </div>
          </div>

          <div className="card-system p-5 space-y-2">
            <p className="font-mono text-[10px] tracking-widest text-[#D4AF37]">WORKFLOW</p>
            {["Build prompt below", "Paste into NotebookLM as source", "Generate podcast via Audio Overview", "Download MP3", "Publish to Spotify / Apple"].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-[#D4AF37] w-4">{i + 1}</span>
                <span className="font-mono text-[10px] text-[#A1A1AA]">{step}</span>
              </div>
            ))}
          </div>

          <button onClick={build} disabled={building}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-display text-sm tracking-widest text-[#050505] transition-all hover:scale-[1.01] disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #D4AF37, #9A7F27)" }}>
            <Mic size={16} />
            {building ? "BUILDING…" : "BUILD EPISODE PACK"}
          </button>
        </div>

        <div className="card-system p-5 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] tracking-widest text-[#A3E635]">NOTEBOOKLM.SOURCE</span>
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
                <p className="font-mono text-xs text-[#27272A]">SOURCE.PENDING</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
