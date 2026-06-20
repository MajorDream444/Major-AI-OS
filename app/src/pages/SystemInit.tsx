import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BOOT_SEQUENCE = [
  "MAJOR.AI.MINDSET.ABC.STUDIO — v1.0.0",
  "SYS.INIT — CHECKING DEPENDENCIES",
  "DESIGN.SYSTEM.LOADED — AURELIS + SYSTEM.INITIALIZING",
  "LESSON.REGISTRY.LOADED — 10 ACTIVE LESSONS",
  "CONTENT.ENGINE.READY",
  "EXPORT.MODULES.READY — REEL / CAROUSEL / PODCAST / OMNI",
  "GITHUB.SOURCE.TRUTH.SYNCED",
  "ALL.SYSTEMS.OPERATIONAL",
  "ENTERING.STUDIO…",
];

export function SystemInit({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_SEQUENCE.length) {
        setLines((prev) => [...prev, BOOT_SEQUENCE[i]!]);
        setProgress(Math.round(((i + 1) / BOOT_SEQUENCE.length) * 100));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
          navigate("/");
        }, 800);
      }
    }, 220);
    return () => clearInterval(interval);
  }, [onComplete, navigate]);

  return (
    <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-50 px-6">
      {/* Scan line */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="scan-line" />
      </div>

      {/* Grid overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(#A3E635 1px, transparent 1px), linear-gradient(90deg, #A3E635 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="relative z-10 w-full max-w-xl">
        {/* Logo mark */}
        <div className="text-center mb-12">
          <p className="font-display text-3xl font-bold text-[#D4AF37] glow-gold tracking-widest mb-1">
            MAJOR AI
          </p>
          <p className="font-mono text-xs tracking-[0.5em] text-[#A1A1AA]">
            MINDSET.ABC.STUDIO
          </p>
        </div>

        {/* Console box */}
        <div className="card-system p-6 space-y-1.5 relative overflow-hidden">
          <div className="scan-line" />
          {lines.map((line, i) => (
            <p key={i} className="font-mono text-xs text-[#A3E635] leading-5">
              <span className="text-[#27272A] mr-2">›</span>
              {line}
            </p>
          ))}
          {lines.length < BOOT_SEQUENCE.length && (
            <p className="font-mono text-xs text-[#A3E635]">
              <span className="text-[#27272A] mr-2">›</span>
              <span className="cursor-blink">_</span>
            </p>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <span className="font-mono text-[10px] text-[#A1A1AA]">SYSTEM.INIT</span>
            <span className="font-mono text-[10px] text-[#A3E635]">{progress}%</span>
          </div>
          <div className="h-0.5 bg-[#27272A] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D4AF37] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
