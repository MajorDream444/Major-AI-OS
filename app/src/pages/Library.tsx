import { useState } from "react";
import { allLessons } from "../data/lessons";
import { LessonCard } from "../components/LessonCard";
import type { LessonLevel, LessonStatus } from "../types/lesson";

const LEVELS: Array<"all" | LessonLevel> = ["all", "beginner", "intermediate", "advanced"];
const STATUSES: Array<"all" | LessonStatus> = ["all","idea","drafted","designed","recorded","edited","scheduled","published","repurposed"];

export function Library() {
  const [level, setLevel] = useState<"all" | LessonLevel>("all");
  const [status, setStatus] = useState<"all" | LessonStatus>("all");
  const [search, setSearch] = useState("");

  const filtered = allLessons.filter((l) => {
    if (level !== "all" && l.level !== level) return false;
    if (status !== "all" && l.status !== status) return false;
    if (search && !`${l.letter}${l.concept}${l.title}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen pt-24 px-6 pb-16 max-w-7xl mx-auto">
      <div className="mb-12">
        <p className="font-mono text-xs text-[#D4AF37] tracking-[0.3em] mb-3">ABC.LIBRARY</p>
        <h1 className="font-display text-4xl md:text-5xl text-white mb-3">
          Intelligence Modules
        </h1>
        <p className="text-[#A1A1AA] text-base">
          26 AI literacy concepts — A to Z — across three levels of mastery.
        </p>
      </div>

      {/* ── Filters ───────────────── */}
      <div className="flex flex-wrap items-center gap-4 mb-10 p-4 card-system">
        <div className="flex-1 min-w-[200px]">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search concepts…"
            className="w-full bg-transparent border border-[#27272A] rounded-lg px-4 py-2 font-mono text-xs text-white placeholder-[#A1A1AA] focus:border-[#D4AF37] focus:outline-none transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <button key={l} onClick={() => setLevel(l)}
              className={`font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded transition-all ${
                level === l
                  ? "bg-[#D4AF37] text-[#050505]"
                  : "border border-[#27272A] text-[#A1A1AA] hover:border-[#D4AF37] hover:text-white"
              }`}>
              {l}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {STATUSES.slice(0, 5).map((s) => (
            <button key={s} onClick={() => setStatus(s)}
              className={`font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded transition-all ${
                status === s
                  ? "bg-[#18181B] text-[#D4AF37] border border-[#D4AF37]"
                  : "border border-[#27272A] text-[#A1A1AA] hover:border-[#D4AF37]"
              }`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ── Count ─────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <p className="font-mono text-xs text-[#A1A1AA]">
          Showing <span className="text-[#D4AF37]">{filtered.length}</span> of {allLessons.length} lessons
        </p>
      </div>

      {/* ── Grid ──────────────────── */}
      {filtered.length === 0 ? (
        <div className="card-system p-16 text-center">
          <p className="font-mono text-sm text-[#A1A1AA]">NO_LESSONS_FOUND — adjust filters</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      )}

      {/* ── Coming soon strip ─────── */}
      <div className="mt-16 p-6 card-system text-center">
        <p className="font-mono text-xs text-[#A1A1AA] mb-2 tracking-widest">LESSONS.PENDING — K through Z</p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {["K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"].map(l => (
            <span key={l} className="font-display text-lg text-[#27272A] font-bold w-8 text-center">{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
