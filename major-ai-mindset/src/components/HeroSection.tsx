import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Compass, Sparkles, Orbit, Settings2, RotateCcw } from 'lucide-react';
import InteractiveClock from './InteractiveClock';

interface HeroSectionProps {
  onReserveClick: () => void;
  onExploreClick: () => void;
}

export default function HeroSection({ onReserveClick, onExploreClick }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interactive Gravity Well sandbox controls
  const [gravity, setGravity] = useState<number>(1.8);
  const [particleCount, setParticleCount] = useState<number>(150);
  const [showSandboxControls, setShowSandboxControls] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = 450;
    let height = canvas.height = 450;

    // Handle resizing if container changes
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect) {
          width = canvas.width = Math.min(entry.contentRect.width, 450);
          height = canvas.height = Math.min(entry.contentRect.width, 450);
        }
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      angle: number;
      dist: number;
      speed: number;
    }

    let particles: Particle[] = [];
    const colors = ['#D4AF37', '#006BB6', '#1F7A3A', '#F58426', '#F7F4EA'];

    const initParticles = (count: number) => {
      particles = [];
      const centerX = width / 2;
      const centerY = height / 2;
      
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 50 + Math.random() * 150;
        const speed = 0.5 + Math.random() * 1.5;
        
        particles.push({
          x: centerX + Math.cos(angle) * dist,
          y: centerY + Math.sin(angle) * dist,
          vx: -Math.sin(angle) * speed,
          vy: Math.cos(angle) * speed,
          size: 1 + Math.random() * 2.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.1 + Math.random() * 0.8,
          angle: angle,
          dist: dist,
          speed: speed
        });
      }
    };

    initParticles(particleCount);

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = width / 2;
      mouseY = height / 2;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const draw = () => {
      ctx.fillStyle = 'rgba(3, 3, 4, 0.2)'; // trail effect
      ctx.fillRect(0, 0, width, height);

      const targetX = mouseX;
      const targetY = mouseY;

      // Draw the central Mindset Core
      ctx.beginPath();
      const pulse = 15 + Math.sin(Date.now() * 0.003) * 3;
      const grad = ctx.createRadialGradient(targetX, targetY, 0, targetX, targetY, pulse * 1.8);
      grad.addColorStop(0, 'rgba(212, 175, 55, 0.4)');
      grad.addColorStop(0.3, 'rgba(0, 107, 182, 0.2)');
      grad.addColorStop(0.6, 'rgba(31, 122, 58, 0.1)');
      grad.addColorStop(1, 'rgba(3, 3, 4, 0)');
      ctx.fillStyle = grad;
      ctx.arc(targetX, targetY, pulse * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Outer gold circle ring
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)';
      ctx.lineWidth = 1;
      ctx.arc(targetX, targetY, 120, 0, Math.PI * 2);
      ctx.stroke();

      // Knicks Blue circle ring
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 107, 182, 0.1)';
      ctx.lineWidth = 1;
      ctx.arc(targetX, targetY, 180, 0, Math.PI * 2);
      ctx.stroke();

      // Update and draw particles
      particles.forEach((p) => {
        const dx = targetX - p.x;
        const dy = targetY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 4) {
          // Reset particle if it gets too close to the blackhole/well
          const angle = Math.random() * Math.PI * 2;
          const dist = 180 + Math.random() * 40;
          p.x = targetX + Math.cos(angle) * dist;
          p.y = targetY + Math.sin(angle) * dist;
          p.vx = -Math.sin(angle) * p.speed;
          p.vy = Math.cos(angle) * p.speed;
          return;
        }

        // Gravitational force pull
        const force = (gravity * 180) / (distance * distance);
        p.vx += (dx / distance) * force;
        p.vy += (dy / distance) * force;

        // Friction to stabilize orbit
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Tangential orbit velocity helper to keep rotation alive
        const tx = -dy / distance;
        const ty = dx / distance;
        p.vx += tx * 0.12;
        p.vy += ty * 0.12;

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(1, Math.max(0.1, p.alpha * (distance / 80)));
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
    };
  }, [gravity, particleCount]);

  const handleReset = () => {
    setGravity(1.8);
    setParticleCount(150);
  };

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex flex-col justify-between pt-6 pb-12 overflow-hidden bg-brand-black border-b border-[#14141a]">
      {/* Absolute Ambient Background Layers */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <img
          src="/src/assets/images/maim_gravity_well_portal_1783228927066.jpg"
          alt="MAIM Gravity Well Portal backdrop"
          className="w-full h-full object-cover mix-blend-screen scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-transparent to-brand-black" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#14141c_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50 z-0" />

      {/* Top Header Row / Sticky Nav inside Section for self-containment */}
      <header className="relative w-full max-w-7xl mx-auto px-6 md:px-12 z-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4 border-b border-[#14141c]/60">
          <div className="flex items-center gap-3">
            {/* Custom SVG Monogram */}
            <div className="relative w-10 h-10 flex items-center justify-center border border-brand-gold rounded-sm bg-brand-black-light overflow-hidden shadow-lg group">
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-green" />
              <div className="absolute bottom-0 right-0 w-full h-1 bg-brand-blue" />
              <span className="font-display font-black text-lg tracking-wider text-brand-gold group-hover:scale-110 transition-transform">M</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-lg tracking-wide text-brand-white">MAJOR AI MINDSET</h1>
              <p className="text-[10px] font-mono tracking-widest text-brand-muted uppercase">Operating System</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono text-brand-muted tracking-widest uppercase">
            <a href="#different" className="hover:text-brand-gold transition-colors">The Methodology</a>
            <a href="#rhythm" className="hover:text-brand-gold transition-colors">The Sessions</a>
            <a href="#abc" className="hover:text-brand-gold transition-colors">The ABCs</a>
            <a href="#meet-major" className="hover:text-brand-gold transition-colors">Meet Major</a>
            <a href="#register" className="hover:text-brand-gold transition-colors">Register</a>
          </nav>

          {/* UTC Clock Counter */}
          <InteractiveClock />
        </div>
      </header>

      {/* Hero Core Layout */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto py-12 z-10">
        
        {/* Left Side: Slogans, Headlines, Branding & Actions */}
        <div className="col-span-1 lg:col-span-7 flex flex-col justify-center items-start text-left">
          
          {/* Slogan Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#21212b] rounded-full bg-brand-black-light/80 backdrop-blur-md text-[11px] font-mono tracking-widest text-brand-gold uppercase mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
            <span>THE MINDSET OPERATING SYSTEM FOR THE AI AGE</span>
          </div>

          {/* Slogan Tri-Bar Badge */}
          <div className="flex items-center gap-1.5 mb-6">
            <div className="w-3 h-3 bg-brand-green rounded-full" />
            <div className="w-3 h-3 bg-brand-gold rounded-full" />
            <div className="w-3 h-3 bg-brand-blue rounded-full" />
            <div className="w-3 h-3 bg-brand-orange rounded-full" />
            <span className="text-xs font-mono tracking-wider text-brand-muted pl-1.5">Likkle by likkle, we build the future.</span>
          </div>

          {/* Hero Headlines */}
          <h2 className="font-display font-black text-5xl sm:text-6xl xl:text-7xl uppercase tracking-tight text-brand-white leading-[0.95] mb-2">
            AI MINDSET
          </h2>
          
          <h3 className="font-serif italic text-2xl sm:text-3xl text-brand-gold font-light leading-tight mb-6">
            Stop carrying your ideas in your head.<br className="hidden sm:inline" />
            <span className="text-brand-white">Build them with AI.</span>
          </h3>

          <p className="text-brand-muted text-sm sm:text-base leading-relaxed max-w-xl mb-8">
            A free live knowledge session for people who want to understand AI, use it with confidence, and build real digital assets one step at a time. If you can text, you can use AI.
          </p>

          {/* Action Callouts */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onReserveClick}
              id="hero-reserve-btn"
              className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-brand-gold text-brand-black font-display font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-brand-white hover:-translate-y-0.5 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.25)]"
            >
              <span>Reserve Your Seat</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              onClick={onExploreClick}
              id="hero-explore-btn"
              className="group flex items-center justify-center gap-2 px-6 py-4 border border-[#2c2c38] text-brand-white hover:border-brand-gold hover:text-brand-gold font-display font-bold text-sm uppercase tracking-widest rounded-sm transition-all"
            >
              <Compass className="w-4 h-4 text-brand-blue group-hover:rotate-12 transition-transform" />
              <span>Explore the ABC Roadmap</span>
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 pt-6 border-t border-[#14141c] text-xs font-mono text-brand-muted">
            <div>
              <span className="text-brand-gold font-bold">100% FREE</span> ON GOOGLE MEET
            </div>
            <div>
              <span className="text-brand-green font-bold">WEEKLY SESSIONS</span> WITH REMINDERS
            </div>
            <div>
              <span className="text-brand-blue font-bold">REPLAY ACCESS</span> INCLUDED
            </div>
          </div>

        </div>

        {/* Right Side: Interactive Gravity Well Sandbox Portal */}
        <div className="col-span-1 lg:col-span-5 flex flex-col items-center justify-center">
          <div 
            className="relative w-full max-w-[450px] aspect-square flex items-center justify-center border border-[#1a1a24] rounded-xl bg-[#050507] p-4 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Absolute Ambient circular glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-brand-gold/5 blur-[80px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-blue/5 blur-[100px] pointer-events-none" />

            {/* Gravity Interactive Canvas */}
            <canvas 
              ref={canvasRef} 
              className="relative z-10 w-full h-full max-w-[420px] rounded-lg cursor-crosshair"
            />

            {/* Hover tooltip hint */}
            <div className={`absolute top-4 right-4 z-20 px-2.5 py-1 bg-brand-black-light border border-[#1c1c24] rounded text-[10px] font-mono tracking-wider transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'}`}>
              <span className="text-brand-gold">DRAG MOUSE</span> TO DEFLECT GRAVITY
            </div>

            {/* Sandbox Parameter Control Trigger Button */}
            <button
              onClick={() => setShowSandboxControls(!showSandboxControls)}
              id="toggle-sandbox-btn"
              className="absolute bottom-4 left-4 z-20 p-2.5 bg-brand-black-light border border-[#1c1c24] text-brand-white hover:text-brand-gold hover:border-brand-gold rounded transition-all shadow-md flex items-center gap-1.5 text-[10px] font-mono"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>{showSandboxControls ? "HIDE PARAMETERS" : "SANDBOX PARAMETERS"}</span>
            </button>

            {/* Float HUD Information */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <div className="flex items-center gap-1 text-[10px] font-mono text-brand-green bg-brand-black-light/80 border border-[#14141c] px-2 py-0.5 rounded">
                <Orbit className="w-3 h-3 text-brand-gold animate-spin-slow" />
                <span>GRAVITY WELL ACTIVE</span>
              </div>
            </div>

            {/* Sliding Control Overlay Panel */}
            {showSandboxControls && (
              <div className="absolute inset-x-4 bottom-16 z-30 bg-[#07070b]/95 border border-[#21212c] p-4 rounded-lg shadow-2xl backdrop-blur-md animate-fade-in text-xs font-mono">
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#181822]">
                  <span className="text-brand-gold font-bold">GRAVITY WELL SIMULATOR</span>
                  <button 
                    onClick={handleReset}
                    className="p-1 text-brand-muted hover:text-brand-orange flex items-center gap-1 text-[9px]"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>RESET</span>
                  </button>
                </div>

                <div className="space-y-3 text-brand-muted">
                  <div>
                    <div className="flex justify-between mb-1 text-[10px]">
                      <span>GRAVITATIONAL MASS (BELIEF VECTORS):</span>
                      <span className="text-brand-gold">{gravity.toFixed(1)}x</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="4.5" 
                      step="0.1" 
                      value={gravity}
                      onChange={(e) => setGravity(parseFloat(e.target.value))}
                      className="w-full accent-brand-gold h-1 bg-[#151520] rounded-lg appearance-none cursor-pointer"
                    />
                    <p className="text-[8px] text-brand-muted/70 mt-0.5">Higher mass forces ideas to condense into assets quicker.</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-[10px]">
                      <span>IDEA FLOW INDEX (PARTICLES):</span>
                      <span className="text-brand-blue">{particleCount}</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="300" 
                      step="10" 
                      value={particleCount}
                      onChange={(e) => setParticleCount(parseInt(e.target.value))}
                      className="w-full accent-brand-blue h-1 bg-[#151520] rounded-lg appearance-none cursor-pointer"
                    />
                    <p className="text-[8px] text-brand-muted/70 mt-0.5">Simulates the volume of parallel thought vectors organized by AI.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-3 flex items-center justify-center gap-6">
            <span className="text-[10px] font-mono text-brand-muted uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" /> AWARENESS
            </span>
            <span className="text-[10px] font-mono text-brand-muted uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-brand-green rounded-full" /> BELIEF
            </span>
            <span className="text-[10px] font-mono text-brand-muted uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-brand-blue rounded-full" /> EXECUTION
            </span>
          </div>
        </div>

      </div>

      {/* Tri-bar separator bottom border of Hero */}
      <div className="tribar-line w-full opacity-70 mt-6" />
    </section>
  );
}
