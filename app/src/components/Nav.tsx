import { Link, useLocation } from "react-router-dom";
import { BookOpen, Cpu, Mic, Zap, LayoutGrid, Home } from "lucide-react";

const links = [
  { to: "/",          label: "HOME",      icon: Home },
  { to: "/library",   label: "LIBRARY",   icon: BookOpen },
  { to: "/generator", label: "GENERATOR", icon: Cpu },
  { to: "/podcast",   label: "PODCAST",   icon: Mic },
  { to: "/omni",      label: "OMNI",      icon: Zap },
  { to: "/workflow",  label: "WORKFLOW",  icon: LayoutGrid },
];

export function Nav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
      style={{ background: "linear-gradient(180deg, rgba(5,5,5,0.98) 0%, rgba(5,5,5,0.9) 100%)", borderBottom: "1px solid #27272A", backdropFilter: "blur(12px)" }}>
      <Link to="/" className="flex items-center gap-3">
        <span className="font-display text-sm tracking-[0.3em] text-[#D4AF37]">MAJOR AI</span>
        <span className="font-mono text-xs text-[#A1A1AA] tracking-widest">ABC.STUDIO</span>
      </Link>

      <div className="hidden md:flex items-center gap-1">
        {links.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to !== "/" && pathname.startsWith(to));
          return (
            <Link key={to} to={to}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs tracking-widest transition-all duration-200 ${
                active
                  ? "bg-[#18181B] text-[#D4AF37] border border-[#27272A]"
                  : "text-[#A1A1AA] hover:text-white hover:bg-[#18181B]"
              }`}>
              <Icon size={12} />
              {label}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <span className="font-mono text-xs text-[#A3E635] pulse-gold">● LIVE</span>
      </div>
    </nav>
  );
}
