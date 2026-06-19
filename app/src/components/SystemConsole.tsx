import { useEffect, useState } from "react";

interface Props {
  lines: string[];
  speed?: number;
}

export function SystemConsole({ lines, speed = 80 }: Props) {
  const [shown, setShown] = useState<string[]>([]);

  useEffect(() => {
    setShown([]);
    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        setShown((prev) => [...prev, lines[i]!]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [lines, speed]);

  return (
    <div className="card-system relative overflow-hidden p-5 space-y-1 min-h-[120px]">
      <div className="scan-line" />
      {shown.map((line, i) => (
        <p key={i} className="font-mono text-xs text-[#A3E635] leading-5">
          <span className="text-[#27272A] mr-2 select-none">›</span>
          {line}
        </p>
      ))}
      {shown.length < lines.length && (
        <p className="font-mono text-xs text-[#A3E635]">
          <span className="text-[#27272A] mr-2">›</span>
          <span className="cursor-blink">_</span>
        </p>
      )}
    </div>
  );
}
