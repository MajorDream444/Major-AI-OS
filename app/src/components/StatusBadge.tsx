import type { LessonLevel, LessonStatus } from "../types/lesson";

export function StatusBadge({ status }: { status: LessonStatus }) {
  return (
    <span className={`badge-${status} font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded`}>
      {status}
    </span>
  );
}

export function LevelBadge({ level }: { level: LessonLevel }) {
  return (
    <span className={`badge-${level} font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded`}>
      {level}
    </span>
  );
}
