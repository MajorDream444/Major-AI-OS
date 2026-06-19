import { allLessons } from "../data/lessons";
import { Link } from "react-router-dom";
import type { LessonStatus } from "../types/lesson";
import { LevelBadge } from "../components/StatusBadge";

const COLUMNS: Array<{ status: LessonStatus; label: string; color: string }> = [
  { status: "idea",       label: "IDEA",       color: "#27272A" },
  { status: "drafted",    label: "DRAFTED",     color: "#3F3F46" },
  { status: "designed",   label: "DESIGNED",    color: "#D4AF37" },
  { status: "recorded",   label: "RECORDED",    color: "#D4AF37" },
  { status: "edited",     label: "EDITED",      color: "#9A7F27" },
  { status: "scheduled",  label: "SCHEDULED",   color: "#A3E635" },
  { status: "published",  label: "PUBLISHED",   color: "#A3E635" },
  { status: "repurposed", label: "REPURPOSED",  color: "#6DBD00" },
];

export function WorkflowBoard() {
  const byStatus = (status: LessonStatus) =>
    allLessons.filter((l) => l.status === status);

  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="mb-10 max-w-7xl mx-auto">
        <p className="font-mono text-xs text-[#D4AF37] tracking-[0.3em] mb-3">WORKFLOW.BOARD</p>
        <h1 className="font-display text-4xl text-white mb-3">Workflow Board</h1>
        <p className="text-[#A1A1AA] text-sm">
          Production status for every ABC lesson — from idea to repurposed.
        </p>
      </div>

      {/* ── Stats bar ─────────────── */}
      <div className="max-w-7xl mx-auto mb-8 grid grid-cols-4 md:grid-cols-8 gap-2">
        {COLUMNS.map(({ status, label, color }) => {
          const count = byStatus(status).length;
          return (
            <div key={status} className="card-system p-3 text-center">
              <div className="font-display text-xl font-bold" style={{ color }}>{count}</div>
              <div className="font-mono text-[9px] text-[#A1A1AA] tracking-widest mt-1">{label}</div>
            </div>
          );
        })}
      </div>

      {/* ── Kanban columns ─────────── */}
      <div className="max-w-7xl mx-auto overflow-x-auto">
        <div className="flex gap-4 pb-4" style={{ minWidth: "900px" }}>
          {COLUMNS.map(({ status, label, color }) => {
            const lessons = byStatus(status);
            return (
              <div key={status} className="flex-1 min-w-[160px]">
                {/* Column header */}
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="font-mono text-[10px] tracking-widest text-[#A1A1AA]">{label}</span>
                  <span className="font-mono text-[10px] text-[#27272A] ml-auto">{lessons.length}</span>
                </div>

                {/* Cards */}
                <div className="space-y-2">
                  {lessons.length === 0 ? (
                    <div className="border border-dashed border-[#27272A] rounded-lg p-4 text-center">
                      <span className="font-mono text-[9px] text-[#27272A]">EMPTY</span>
                    </div>
                  ) : (
                    lessons.map((lesson) => (
                      <Link key={lesson.id} to={`/lesson/${lesson.id}`}
                        className="block card-editorial p-4 group">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-display text-2xl font-bold text-[#D4AF37]">{lesson.letter}</span>
                          <LevelBadge level={lesson.level} />
                        </div>
                        <p className="font-display text-xs font-semibold text-white mb-1">{lesson.concept}</p>
                        <p className="font-mono text-[9px] text-[#A1A1AA] leading-relaxed line-clamp-2">
                          {lesson.content.bigIdea}
                        </p>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Legend ─────────────────── */}
      <div className="max-w-7xl mx-auto mt-12 p-6 card-system">
        <p className="font-mono text-[10px] tracking-widest text-[#D4AF37] mb-4">WORKFLOW.LAW</p>
        <div className="flex flex-wrap gap-6">
          {["idea → drafted", "drafted → designed", "designed → recorded", "recorded → edited", "edited → scheduled", "scheduled → published", "published → repurposed"].map((step) => (
            <span key={step} className="font-mono text-[10px] text-[#A1A1AA]">{step}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
