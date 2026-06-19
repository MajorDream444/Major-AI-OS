import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Circle } from "lucide-react";
import type { Lesson } from "../types/lesson";
import { StatusBadge, LevelBadge } from "./StatusBadge";

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const { letter, concept, level, status, content, exportMeta, id } = lesson;
  const exportCount = [
    exportMeta.reelScript, exportMeta.carouselCopy,
    exportMeta.notebookLMPrompt, exportMeta.googleOmniPrompt,
  ].filter(Boolean).length;

  return (
    <Link to={`/lesson/${id}`}
      className="card-editorial block p-6 group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <span className="font-display text-5xl font-bold text-[#D4AF37] glow-gold leading-none">
          {letter}
        </span>
        <div className="flex flex-col items-end gap-2">
          <LevelBadge level={level} />
          <StatusBadge status={status} />
        </div>
      </div>

      <h3 className="font-display text-base font-semibold text-white mb-1 tracking-wide">
        {concept}
      </h3>
      <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4 line-clamp-2">
        {content.bigIdea}
      </p>

      {/* Export readiness */}
      <div className="flex items-center justify-between pt-4 border-t border-[#27272A]">
        <div className="flex items-center gap-3">
          <ExportDot done={exportMeta.reelScript} label="REEL" />
          <ExportDot done={exportMeta.carouselCopy} label="CAROUSEL" />
          <ExportDot done={exportMeta.notebookLMPrompt} label="NLM" />
          <ExportDot done={exportMeta.googleOmniPrompt} label="OMNI" />
        </div>
        <div className="flex items-center gap-1 text-[#A1A1AA] group-hover:text-[#D4AF37] transition-colors">
          <span className="font-mono text-[10px]">{exportCount}/4</span>
          <ArrowRight size={12} />
        </div>
      </div>
    </Link>
  );
}

function ExportDot({ done, label }: { done: boolean; label: string }) {
  return (
    <div className="flex items-center gap-1">
      {done
        ? <CheckCircle size={10} className="text-[#A3E635]" />
        : <Circle size={10} className="text-[#27272A]" />}
      <span className="font-mono text-[9px] text-[#A1A1AA] tracking-wider">{label}</span>
    </div>
  );
}
