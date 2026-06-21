import { useState } from 'react';
import { LessonContent } from '../types';
import { Palette, Play, Sparkles, Copy, Check, Info, HelpCircle, LayoutGrid } from 'lucide-react';

interface VideoProps {
  lesson: LessonContent;
}

export default function VideoPromptBuilder({ lesson }: VideoProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const colorTokens = [
    { name: 'color.bg', hex: '#09090B', desc: 'Main Dark Backdrop' },
    { name: 'color.surface', hex: '#191C21', desc: 'Rounded Surface Cards' },
    { name: 'color.primary', hex: '#FF5A00', desc: 'Main letter pill & CTA highlight' },
    { name: 'color.accent', hex: '#2563EB', desc: 'Depth badge secondary' },
    { name: 'color.text', hex: '#FFFFFF', desc: 'Primary clean white' },
    { name: 'color.muted', hex: '#A1A1AA', desc: 'Editorial body support' }
  ];

  return (
    <div className="w-full bg-brand-card/30 border border-brand-border rounded-[24px] p-6 backdrop-blur-md relative overflow-hidden">
      <div className="absolute top-0 left-0 w-32 h-32 bg-brand-orange/5 blur-2xl pointer-events-none rounded-full" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-lg font-sans font-extrabold text-white flex items-center gap-2.5 tracking-tight">
            <span className="p-1 rounded-lg bg-brand-orange/10 text-brand-orange">
              <Palette className="w-5 h-5" />
            </span>
            <span>Aura Video &amp; Asset Prompt Builder</span>
          </h2>
          <p className="text-xs text-brand-muted font-body mt-0.5">
            Format, coordinate, and copy cinema prompt blocks for Google Omni or image models like Imagen/DALL-E while maintaining brand consistency.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Prompts List */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Omni Cinematic Video Instruction */}
          <div className="bg-black/50 border border-brand-border rounded-xl p-4 space-y-2.5 relative">
            <span className="text-[9px] font-mono uppercase tracking-widest text-brand-orange block">
              🎬 Google Omni / Sora Cinematic Prompt [9:16 Vertical video plan]
            </span>
            
            <p className="text-xs font-body text-zinc-300 leading-relaxed bg-[#0c0d12] p-3.5 rounded-lg border border-brand-border/40">
              {lesson.omniVideoPrompt}
            </p>

            <div className="flex justify-between items-center text-3xs font-mono text-zinc-500 pt-1">
              <span>Aspect ratio: 9:16 vertical | Style: Aura Editorial</span>
              <button
                onClick={() => handleCopy(lesson.omniVideoPrompt, 'omni')}
                className="text-brand-orange hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedField === 'omni' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedField === 'omni' ? 'Copied' : 'Copy cinematic prompt'}</span>
              </button>
            </div>
          </div>

          {/* Thumbnail generator */}
          <div className="bg-black/50 border border-brand-border rounded-xl p-4 space-y-2.5 relative">
            <span className="text-[9px] font-mono uppercase tracking-widest text-brand-blue block">
              🎨 Photo Thumbnail Prompt [1:1 / 16:9 Grid Thumbnail]
            </span>

            <p className="text-xs font-body text-zinc-300 leading-relaxed bg-[#0c0d12] p-3.5 rounded-lg border border-brand-border/40">
              {lesson.thumbnailPrompt}
            </p>

            <div className="flex justify-between items-center text-3xs font-mono text-zinc-500 pt-1">
              <span>Contrast rule: High Contrast Only, no low contrast grey-on-grey.</span>
              <button
                onClick={() => handleCopy(lesson.thumbnailPrompt, 'thumb')}
                className="text-brand-blue hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedField === 'thumb' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedField === 'thumb' ? 'Copied' : 'Copy thumbnail prompt'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Style Tokens & Motif Visualizer */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Aesthetic Motif info card */}
          <div className="bg-black/50 border border-brand-border rounded-xl p-4.5">
            <div className="flex items-center gap-2 mb-3.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                AURA VISUAL MOTIF &amp; METADATA
              </h3>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between items-start border-b border-brand-border/40 pb-2.5">
                <span className="font-mono text-brand-muted uppercase text-3xs shrink-0">Active Motif:</span>
                <span className="font-body text-white font-semibold text-right">
                  🏷️ {lesson.visualMotif}
                </span>
              </div>

              <div className="flex justify-between items-start border-b border-brand-border/40 pb-2.5">
                <span className="font-mono text-brand-muted uppercase text-3xs shrink-0">Heading typography:</span>
                <span className="font-mono text-white text-right">Inter Display</span>
              </div>

              <div className="flex justify-between items-start pb-1">
                <span className="font-mono text-brand-muted uppercase text-3xs shrink-0">Pacing guide:</span>
                <span className="font-body text-brand-muted text-right">
                  Restrained, precise motion. High-level human presence.
                </span>
              </div>
            </div>
          </div>

          {/* Color token swatch visualizer */}
          <div className="bg-[#191C21]/70 border border-brand-border rounded-xl p-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <LayoutGrid className="w-3.5 h-3.5 text-brand-orange" />
              <span>Aura Brand Swatch Token Palette</span>
            </h4>

            {/* Grid Swatches */}
            <div className="grid grid-cols-3 gap-2">
              {colorTokens.map((token) => (
                <button
                  key={token.name}
                  onClick={() => handleCopy(token.hex, token.name)}
                  className="bg-black/60 border border-brand-border/60 hover:border-brand-muted/40 p-2 rounded-lg text-left hover:scale-102 transition-all cursor-pointer flex flex-col justify-between group"
                  title={`Click to copy hex ${token.hex}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[8px] font-mono text-zinc-500 truncate">{token.name.split('.')[1]}</span>
                    <span className="w-2.5 h-2.5 rounded-full border border-white/10" style={{ backgroundColor: token.hex }} />
                  </div>
                  <div className="text-3xs font-mono text-white group-hover:text-brand-orange font-bold">
                    {token.hex}
                  </div>
                  <span className="text-[10px] text-zinc-500 truncate mt-1 overflow-hidden" style={{ fontSize: '7px' }}>
                    {copiedField === token.name ? 'Copied' : token.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
