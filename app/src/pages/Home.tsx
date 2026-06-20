import { Link } from "react-router-dom";
import { ArrowRight, Zap, BookOpen, Cpu, Mic } from "lucide-react";
import { allLessons } from "../data/lessons";

const MARQUEE_ITEMS = [
  "AWARENESS", "BUILD", "CONTEXT", "DELEGATE", "EXECUTE",
  "FLOW", "GENERATE", "HANDOFF", "INTELLIGENCE", "JUDGMENT",
  "KNOWLEDGE", "LEVERAGE", "MODEL", "NETWORK", "ORCHESTRATE",
  "PROMPT", "QUERY", "REASON", "SYSTEM", "TRAIN",
  "UNDERSTAND", "VERIFY", "WORKFLOW", "XPAND", "YIELD", "ZERO-SHOT",
];

const stats = [
  { value: "26", label: "LESSONS" },
  { value: "3", label: "LEVELS" },
  { value: `${allLessons.length}`, label: "ACTIVE" },
  { value: "∞", label: "PLATFORMS" },
];

const features = [
  { icon: BookOpen, title: "ABC Library", desc: "26 AI literacy concepts A–Z across Beginner, Intermediate, and Advanced levels.", to: "/library" },
  { icon: Cpu,      title: "Content Generator", desc: "Generate reel scripts, carousel copy, and platform captions from any lesson.", to: "/generator" },
  { icon: Mic,      title: "Podcast Builder", desc: "Build NotebookLM source prompts and podcast episode outlines.", to: "/podcast" },
  { icon: Zap,      title: "Google Omni", desc: "Compile multimodal prompts for Gemini video and deep-research workflows.", to: "/omni" },
];

export function Home() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden pt-20">
        {/* Background radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(212,175,55,0.07) 0%, transparent 70%)"
        }} />
        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="font-mono text-xs tracking-[0.4em] text-[#D4AF37] mb-6 animate-fade-up">
            SYS.INIT — MAJOR.AI.MINDSET.ABC.STUDIO — v1.0
          </p>

          <h1 className="font-display text-6xl md:text-8xl font-bold leading-none mb-4 animate-fade-up-1" style={{
            background: "linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>
            MAJOR AI
            <br />
            <span className="glow-gold" style={{ WebkitTextFillColor: "#D4AF37" }}>MINDSET</span>
          </h1>

          <p className="font-display text-xl md:text-3xl tracking-[0.3em] text-[#A1A1AA] mb-4 animate-fade-up-2">
            ABC STUDIO
          </p>

          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up-3">
            Sovereign AI education infrastructure. 26 concepts. 3 levels.
            Built for operators, builders, and future-literate minds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-4">
            <Link to="/library"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl font-display text-sm tracking-widest text-[#050505] transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #D4AF37 0%, #9A7F27 100%)" }}>
              OPEN ABC LIBRARY
              <ArrowRight size={16} />
            </Link>
            <Link to="/generator"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl font-mono text-xs tracking-widest text-[#A1A1AA] border border-[#27272A] hover:border-[#D4AF37] hover:text-white transition-all">
              GENERATE CONTENT PACK
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div className="relative z-10 mt-20 grid grid-cols-4 gap-px w-full max-w-2xl border border-[#27272A] rounded-2xl overflow-hidden animate-fade-up-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="bg-[#0A0A0C] px-6 py-5 text-center">
              <div className="font-display text-2xl text-[#D4AF37] font-bold">{value}</div>
              <div className="font-mono text-[10px] text-[#A1A1AA] tracking-widest mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Marquee ────────────────────────────────────── */}
      <div className="py-5 border-y border-[#27272A] overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="font-display text-xs tracking-[0.3em] text-[#27272A] mx-8">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Feature grid ───────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <p className="font-mono text-xs text-[#D4AF37] tracking-[0.3em] mb-4 text-center">STUDIO.MODULES</p>
        <h2 className="font-display text-3xl md:text-4xl text-center mb-16 text-white">
          Intelligence Infrastructure
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map(({ icon: Icon, title, desc, to }) => (
            <Link key={to} to={to} className="card-editorial p-8 group">
              <div className="flex items-start gap-5">
                <div className="p-3 rounded-xl border border-[#27272A] bg-[#0C0C0E] group-hover:border-[#D4AF37] transition-colors">
                  <Icon size={20} className="text-[#D4AF37]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold text-white mb-2">{title}</h3>
                  <p className="text-[#A1A1AA] text-sm leading-relaxed">{desc}</p>
                </div>
                <ArrowRight size={16} className="text-[#27272A] group-hover:text-[#D4AF37] mt-1 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── System doctrine strip ──────────────────────── */}
      <section className="border-t border-[#27272A] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-8">
          {["GITHUB = SOURCE OF TRUTH", "PLAN → BUILD → RUN → LOG → IMPROVE", "AI IS LEVERAGE. NOT HYPE."].map(s => (
            <span key={s} className="font-mono text-[10px] tracking-widest text-[#27272A]">{s}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
