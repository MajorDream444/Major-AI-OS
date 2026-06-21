import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, FileText, Download, CheckCircle, 
  ArrowRight, Shield, Zap, Circle, Lock, Award, Heart, Mail, RefreshCw
} from 'lucide-react';

interface VaultProps {
  onStartPressureTest: () => void;
  onBookSprint: () => void;
}

interface Product {
  id: string;
  title: string;
  promise: string;
  price: string;
  status: string;
  badge: string;
  isFree: boolean;
  isPremium: boolean;
  details: string[];
  ctaText: string;
  icon: any;
}

export default function SparkLabVault({ onStartPressureTest, onBookSprint }: VaultProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const PRODUCTS: Product[] = [
    {
      id: "pressure-test",
      title: "Business Pressure Test",
      promise: "Isolate immediate prompt drift and capacity leaks in 90 seconds.",
      price: "FREE",
      status: "Diagnostic",
      badge: "START HERE",
      isFree: true,
      isPremium: false,
      details: ["Calculate absolute time-loss metrics", "Uncover dominant prompt failure archetypes", "Receive targeted Level blueprints"],
      ctaText: "Start Diagnostic Scan",
      icon: Zap
    },
    {
      id: "starter-kit",
      title: "ABC Starter Kit",
      promise: "Unlock the fundamental formulas for clean beginner AI outputs.",
      price: "FREE",
      status: "Essential",
      badge: "RECOMMENDED",
      isFree: true,
      isPremium: false,
      details: ["3 pre-formatted short video hooks", "Simple email drafting templates", "Context & rule constraint charts"],
      ctaText: "Download Starter Kit",
      icon: FileText
    },
    {
      id: "abc-workbook",
      title: "Major AI Mindset ABC Workbook",
      promise: "A high-leverage digital workspace to translate high ideas into action.",
      price: "$27 USD",
      status: "Interactive",
      badge: "MOST POPULAR",
      isFree: false,
      isPremium: false,
      details: ["Step-by-step content angle templates", "Dynamic prompt-chain sheets", "12 action-step checklists"],
      ctaText: "Secure Workbook",
      icon: Award
    },
    {
      id: "bleed-workshop",
      title: "Stop the Bleed Workshop Replay",
      promise: "90-minute raw masterclass to regain 10 hours lost to repetition.",
      price: "$47 USD",
      status: "Masterclass",
      badge: "DEEP DIVE",
      isFree: false,
      isPremium: false,
      details: ["Step-by-step calendar optimization audit", "3 client onboarding automation recipes", "Full high-value work checklist model"],
      ctaText: "Get Workshop Access",
      icon: Shield
    },
    {
      id: "prompt-pack",
      title: "Spark Lab Prompt + Systems Pack",
      promise: "The complete organizational prompt stack running Major AI Mindset.",
      price: "$97 USD",
      status: "Complete Stack",
      badge: "ELITE SYSTEM",
      isFree: false,
      isPremium: false,
      details: ["Modular JSON schema templates", "Automated QA validation protocols", "Multi-stage API token cost audit sheets"],
      ctaText: "Acquire Prompt Stack",
      icon: Sparkles
    },
    {
      id: "sprint",
      title: "Book a Spark Lab Sprint",
      promise: "1-on-1 premium co-creation to rebuild your operating system in Bali.",
      price: "PREMIUM",
      status: "Bali Co-Creation",
      badge: "EXCLUSIVE",
      isFree: false,
      isPremium: true,
      details: ["Complete custom workflow audit", "Private beachside co-creation blocks", "Direct operating model design with Z"],
      ctaText: "Apply for Sprint",
      icon: Heart
    }
  ];

  const handleProductCta = (p: Product) => {
    if (p.id === "pressure-test") {
      onStartPressureTest();
    } else if (p.id === "sprint") {
      onBookSprint();
    } else {
      setCheckoutEmail('');
      setOrderCompleted(false);
      setIsOrdering(false);
      setSelectedProduct(p);
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutEmail) return;
    setIsOrdering(true);
    setTimeout(() => {
      setIsOrdering(false);
      setOrderCompleted(true);
    }, 1200);
  };

  return (
    <div className="w-full space-y-8" id="spark-lab-vault">
      {/* Intro section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-brand-border/60 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-[1px] bg-brand-orange block" />
            <span className="text-xs font-mono uppercase tracking-widest text-brand-orange">
              SPARK LAB VAULT PORTFOLIO
            </span>
          </div>
          <h2 className="text-3xl font-sans font-black text-white tracking-tight leading-none">
            Digital Products &amp; Assets
          </h2>
          <p className="text-sm font-body text-brand-muted mt-1.5 max-w-xl">
            Acquire free tools, high-status workflow templates, interactive digital workbooks, and deep-dive workshop video playbacks.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-brand-muted bg-brand-card/40 border border-brand-border px-3.5 py-1.5 rounded-xl">
          <Circle className="w-2 h-2 text-brand-orange fill-brand-orange" />
          <span>Secure checkout processed inside sandbox environment</span>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((p) => {
          const IconComp = p.icon;
          
          return (
            <div 
              key={p.id}
              className={`group flex flex-col justify-between rounded-[24px] bg-brand-card/30 border p-6 transition-all duration-300 relative overflow-hidden ${
                p.isPremium 
                  ? 'border-[#2563EB]/45 hover:border-[#2563EB] shadow-[0_12px_24px_rgba(37,99,235,0.1)]' 
                  : p.isFree 
                    ? 'border-brand-border hover:border-brand-orange/40 hover:bg-[#15171d]' 
                    : 'border-brand-border hover:border-amber-500/40 hover:bg-[#15171d]'
              }`}
            >
              {/* Badge Overlay */}
              <div className="absolute top-4 right-4 font-mono text-[9px] uppercase tracking-widest bg-[#15171D] border border-brand-border text-brand-muted px-2.5 py-1 rounded-md">
                {p.badge}
              </div>

              {/* Card Header info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl bg-black/40 border ${
                    p.isPremium ? 'text-brand-blue border-brand-blue/30' : 'text-brand-orange border-brand-orange/20'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  
                  <div className="text-right">
                    <p className={`text-xl font-mono font-black ${
                      p.isFree ? 'text-emerald-400' : 'text-white'
                    }`}>
                      {p.price}
                    </p>
                    <p className="text-[9px] font-mono uppercase text-brand-muted mt-0.5">
                      {p.status}
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <h3 className="text-lg font-sans font-black text-white group-hover:text-brand-orange transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-brand-muted font-body leading-relaxed">
                    {p.promise}
                  </p>
                </div>

                {/* Bullets */}
                <ul className="text-2xs font-body text-zinc-400 space-y-2 pt-3 border-t border-brand-border/30">
                  {p.details.map((det, index) => (
                    <li key={index} className="flex gap-2 items-center">
                      <span className={`w-1 h-1 rounded-full shrink-0 ${p.isPremium ? 'bg-brand-blue' : 'bg-brand-orange'}`} />
                      <span className="truncate">{det}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Action button */}
              <div className="mt-8 pt-4 border-t border-brand-border/20">
                <button
                  onClick={() => handleProductCta(p)}
                  className={`w-full py-3.5 px-4 font-mono text-2xs uppercase tracking-wider font-extrabold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    p.isPremium
                      ? 'bg-brand-blue text-white shadow-[0_4px_12px_rgba(37,99,235,0.2)] hover:bg-[#3b82f6]'
                      : p.isFree
                        ? 'bg-[#1C2029] text-zinc-300 hover:text-white border border-zinc-800 hover:bg-zinc-800'
                        : 'bg-brand-orange text-black font-black hover:bg-brand-orange/90 shadow-[0_4px_12px_rgba(255,90,0,0.25)]'
                  }`}
                >
                  <span>{p.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Checkout Sidebar/Modal Simulation Popup */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-brand-card border border-brand-border w-full max-w-md rounded-[28px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.8)] relative"
            >
              {/* Header stripe gradient */}
              <div className="h-1.5 w-full bg-gradient-to-r from-brand-orange to-brand-blue" />
              
              {/* Close Button X */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/80 text-zinc-400 hover:text-white flex items-center justify-center text-xs border border-brand-border cursor-pointer transition-colors"
              >
                ✕
              </button>

              <div className="p-8 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-orange/10 text-brand-orange rounded-full font-mono text-[9px] uppercase tracking-wider">
                  <Lock className="w-3 h-3" />
                  <span>Secure Order Checklist</span>
                </div>

                <div>
                  <h3 className="text-xl font-sans font-black text-white">
                    {selectedProduct.title}
                  </h3>
                  <p className="text-xs text-brand-muted font-body mt-1">
                    {selectedProduct.promise}
                  </p>
                </div>

                {/* Simulation Notice */}
                <div className="bg-[#14161D] border border-brand-border p-4 rounded-xl text-xs space-y-1 text-zinc-400">
                  <div className="flex justify-between text-zinc-300">
                    <span>Item price:</span>
                    <span className="font-mono">{selectedProduct.price}</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Tax:</span>
                    <span className="font-mono text-emerald-400">$0.00 FREE</span>
                  </div>
                  <div className="border-t border-brand-border/40 mt-2 pt-2 flex justify-between font-bold text-white">
                    <span>Order Total:</span>
                    <span className="font-mono text-brand-orange">{selectedProduct.price}</span>
                  </div>
                </div>

                {!orderCompleted ? (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-3xs uppercase tracking-widest text-brand-muted font-mono">
                        Deliver to Your Inbox:
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          className="w-full bg-black/50 border border-brand-border focus:border-brand-orange text-white text-xs font-body rounded-xl pl-10 pr-4 py-3 outline-none transition-all placeholder:text-brand-muted"
                          placeholder="operator@email.com"
                          value={checkoutEmail}
                          onChange={(e) => setCheckoutEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isOrdering}
                      className="w-full py-3.5 bg-brand-orange text-black font-extrabold font-mono text-xs uppercase tracking-wider rounded-xl hover:bg-brand-orange/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isOrdering ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Delivering System...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>Acquire Instantly (Sandbox)</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-4 space-y-4">
                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30 flex items-center justify-center mx-auto text-xl">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-md font-sans font-bold text-white">Order Sent Successfully</h4>
                      <p className="text-2xs font-body text-zinc-400 mt-1">
                        We have dispatched your requested download link and secure handbook files to:
                        <strong className="block text-brand-orange text-xs mt-1 font-mono">{checkoutEmail}</strong>
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="text-2xs font-mono text-brand-muted hover:text-white underline cursor-pointer"
                    >
                      Close Checkout Overlay
                    </button>
                  </div>
                )}
                
                <p className="text-[9px] font-mono text-center text-[#555]">
                  * This is an immersive interactive sandbox. No credit card required.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
