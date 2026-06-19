import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Copy, CheckCheck } from "lucide-react";
import { useState } from "react";
import { getLessonById } from "../data/lessons";
import { StatusBadge, LevelBadge } from "../components/StatusBadge";
import { SystemConsole } from "../components/SystemConsole";

function CopyBlock({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="card-system p-5 space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-widest text-[#A3E635]">{label}</span>
        <button onClick={copy}
          className="flex items-center gap-1.5 font-mono text-[10px] text-[#A1A1AA] hover:text-white transition-colors">
          {copied ? <CheckCheck size={12} className="text-[#A3E635]" /> : <Copy size={12} />}
          {copied ? "COPIED" : "COPY"}
        </button>
      </div>
      <pre className="font-mono text-xs text-[#A1A1AA] whitespace-pre-wrap leading-relaxed">{text}</pre>
    </div>
  );
}

export function LessonDetail() {
  const { id } = useParams<{ id: string }>();
  const lesson = id ? getLessonById(id) : null;

  if (!lesson) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-sm text-[#A1A1AA]">LESSON_NOT_FOUND</p>
          <Link to="/library" className="mt-4 inline-block font-mono text-xs text-[#D4AF37] hover:underline">← BACK TO LIBRARY</Link>
        </div>
      </div>
    );
  }

  const { letter, concept, title, level, status, content, exportMeta } = lesson;

  const INIT_LINES = [
    `SYS.CHK.LESSON — ${title}`,
    `LEVEL.CONFIRMED — ${level.toUpperCase()}`,
    `STATUS.READ — ${status.toUpperCase()}`,
    `CONTENT.LOADED — BIG_IDEA.READY`,
    `EXPORT.META.SCAN — REEL:${exportMeta.reelScript ? "✓" : "✗"} CAROUSEL:${exportMeta.carouselCopy ? "✓" : "✗"} NLM:${exportMeta.notebookLMPrompt ? "✓" : "✗"} OMNI:${exportMeta.googleOmniPrompt ? "✓" : "✗"}`,
    `LESSON.RENDER.COMPLETE`,
  ];

  return (
    <div className="min-h-screen pt-24 px-6 pb-16 max-w-4xl mx-auto">
      <Link to="/library"
        className="inline-flex items-center gap-2 font-mono text-xs text-[#A1A1AA] hover:text-white mb-8 transition-colors">
        <ArrowLeft size={12} />
        BACK TO LIBRARY
      </Link>

      {/* ── Header ─────────────────── */}
      <div className="flex items-start gap-8 mb-10">
        <span className="font-display text-8xl font-bold text-[#D4AF37] glow-gold leading-none shrink-0">
          {letter}
        </span>
        <div className="flex-1 pt-2">
          <div className="flex flex-wrap gap-2 mb-3">
            <LevelBadge level={level} />
            <StatusBadge status={status} />
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-white font-bold mb-2">{concept}</h1>
          <p className="font-mono text-xs text-[#A1A1AA] tracking-wider">{title}</p>
        </div>
      </div>

      {/* ── System init ─────────────── */}
      <div className="mb-8">
        <SystemConsole lines={INIT_LINES} />
      </div>

      {/* ── Big Idea ────────────────── */}
      <div className="card-editorial p-8 mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#D4AF37]" />
        <p className="font-mono text-[10px] tracking-widest text-[#D4AF37] mb-3">BIG_IDEA</p>
        <p className="font-display text-xl md:text-2xl text-white font-semibold leading-relaxed">
          "{content.bigIdea}"
        </p>
      </div>

      {/* ── Explanation ─────────────── */}
      <div className="card-editorial p-8 mb-6">
        <p className="font-mono text-[10px] tracking-widest text-[#D4AF37] mb-3">EXPLANATION</p>
        <p className="text-[#A1A1AA] text-base leading-relaxed">{content.explanation}</p>
      </div>

      {/* ── Action + CTA ─────────────── */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="card-system p-6">
          <p className="font-mono text-[10px] tracking-widest text-[#A3E635] mb-3">⚡ 5.MIN.ACTION</p>
          <p className="text-white text-sm leading-relaxed">{content.fiveMinuteAction}</p>
        </div>
        <div className="card-system p-6">
          <p className="font-mono text-[10px] tracking-widest text-[#A3E635] mb-3">📢 CTA</p>
          <p className="text-white text-sm leading-relaxed">{content.cta}</p>
        </div>
      </div>

      {/* ── Export content ─────────────── */}
      <div className="space-y-4">
        <p className="font-mono text-[10px] tracking-widest text-[#D4AF37]">EXPORT.CONTENT</p>

        {content.reelScript && (
          <CopyBlock label="REEL.SCRIPT" text={content.reelScript} />
        )}
        {content.carouselCopy && (
          <CopyBlock label="CAROUSEL.COPY"
            text={content.carouselCopy.map((s, i) => `SLIDE ${i + 1}: ${s}`).join("\n")} />
        )}
        {content.podcastAngle && (
          <CopyBlock label="PODCAST.ANGLE" text={content.podcastAngle} />
        )}
        {content.notebookLMPrompt && (
          <CopyBlock label="NOTEBOOKLM.PROMPT" text={content.notebookLMPrompt} />
        )}
        {content.googleOmniPrompt && (
          <CopyBlock label="GOOGLE.OMNI.PROMPT" text={content.googleOmniPrompt} />
        )}

        {!content.reelScript && !content.carouselCopy && !content.notebookLMPrompt && !content.googleOmniPrompt && (
          <div className="card-system p-8 text-center">
            <p className="font-mono text-xs text-[#A1A1AA] mb-2">EXPORT.CONTENT.PENDING</p>
            <p className="text-[#A1A1AA] text-sm">
              Use the{" "}
              <Link to="/generator" className="text-[#D4AF37] hover:underline">Content Generator</Link>
              {" "}to create export packs for this lesson.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
