import { useState } from 'react';
import { LessonContent, LStatus, Level } from '../types';
import { 
  Play, BookOpen, Film, Layers, Copy, Check, Sparkles, AlertCircle, Quote,
  ArrowRight, Radio, Eye, Palette, CheckSquare, HeartHandshake, RefreshCw
} from 'lucide-react';
import { WORKFLOW_COLUMN_DETAILS, WORKFLOW_COLUMNS } from '../data';

interface DetailProps {
  lesson: LessonContent;
  onUpdateStatus: (letter: string, level: Level, newStatus: LStatus) => void;
  onUpdateLessonData: (letter: string, level: Level, updatedFields: Partial<LessonContent>) => void;
}

export default function LessonDetailPane({ lesson, onUpdateStatus, onUpdateLessonData }: DetailProps) {
  const [activeTab, setActiveTab] = useState<'pitch' | 'reel' | 'carousel' | 'media'>('pitch');
  const [carouselSlideIndex, setCarouselSlideIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Edit fields state
  const [editIdea, setEditIdea] = useState(lesson.bigIdea);
  const [editExplanation, setEditExplanation] = useState(lesson.explanation);
  const [editAction, setEditAction] = useState(lesson.actionStep);
  const [editCta, setEditCta] = useState(lesson.cta);

  // Sync edits if target lesson shifts
  const triggerSync = () => {
    setEditIdea(lesson.bigIdea);
    setEditExplanation(lesson.explanation);
    setEditAction(lesson.actionStep);
    setEditCta(lesson.cta);
    setIsEditing(false);
  };

  if (editIdea !== lesson.bigIdea && !isEditing) {
    setEditIdea(lesson.bigIdea);
    setEditExplanation(lesson.explanation);
    setEditAction(lesson.actionStep);
    setEditCta(lesson.cta);
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEdits = () => {
    onUpdateLessonData(lesson.letter, lesson.level, {
      bigIdea: editIdea,
      explanation: editExplanation,
      actionStep: editAction,
      cta: editCta
    });
    setIsEditing(false);
  };

  return (
    <div className="relative w-full bg-brand-card/30 border border-brand-border rounded-[24px] p-6 overflow-hidden backdrop-blur-md">
      {/* Absolute positioning background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 blur-2xl pointer-events-none rounded-full" />
      
      {/* Pane Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-5 border-b border-brand-border/40 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-orange to-brand-blue/30 flex items-center justify-center border border-white/10 font-mono font-bold text-2xl text-white">
            {lesson.letter}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xs font-mono tracking-widest text-brand-orange uppercase">
                CONCEPT DETAILS &amp; SCRIPTS
              </span>
              <span className={`text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded ${
                lesson.level === 'Beginner' ? 'bg-brand-orange/10 text-brand-orange' : 'bg-brand-blue/10 text-brand-blue'
              }`}>
                {lesson.level} Tier
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1">
              {lesson.title}
            </h2>
          </div>
        </div>

        {/* Workflow state promotor selection toolbar */}
        <div className="bg-black/40 border border-brand-border/60 rounded-xl p-2 w-full md:w-auto">
          <p className="text-[10px] font-mono uppercase tracking-wider text-brand-muted mb-2 px-2">
            MOVE STATE ON WORKFLOW BOARD:
          </p>
          <div className="flex flex-wrap gap-1">
            {WORKFLOW_COLUMNS.map((col) => {
              const isCurrent = lesson.status === col;
              const detail = WORKFLOW_COLUMN_DETAILS[col];
              return (
                <button
                  key={col}
                  onClick={() => onUpdateStatus(lesson.letter, lesson.level, col)}
                  className={`text-[10px] font-mono px-2 py-1 rounded cursor-pointer transition-all ${
                    isCurrent 
                      ? 'bg-brand-orange text-black font-bold scale-102 shadow-[0_2px_8px_rgba(255,90,0,0.3)]' 
                      : 'bg-zinc-900 border border-brand-border/55 text-zinc-400 hover:text-white'
                  }`}
                  title={detail.desc}
                >
                  {col}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid: Info block left, Script previews right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column (6 lines of layout space): General editorial information */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Action toggle for custom edits */}
          <div className="flex justify-between items-center bg-black/20 p-2.5 rounded-xl border border-brand-border/30">
            <span className="text-xs font-mono text-zinc-400">Tactile Editor Mode</span>
            <button
              onClick={() => {
                if (isEditing) {
                  triggerSync();
                } else {
                  setIsEditing(true);
                }
              }}
              className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-white cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{isEditing ? 'Cancel Edits' : 'Edit Live Copy'}</span>
            </button>
          </div>

          {/* Standard Fields View or Live Inputs Form */}
          {!isEditing ? (
            <div className="space-y-6">
              {/* Big Idea Card */}
              <div className="relative bg-[#191C21]/60 p-5 rounded-2xl border border-brand-border/60 laser-line-orange">
                <span className="text-3xs font-mono uppercase tracking-widest text-brand-orange">
                  THE BIG IDEA / THEME
                </span>
                <p className="text-sm font-sans font-extrabold text-white mt-1.5 leading-relaxed italic">
                  “{lesson.bigIdea}”
                </p>
              </div>

              {/* Simple explanation */}
              <div>
                <span className="text-3xs font-mono uppercase tracking-widest text-brand-muted">
                  THE PLAIN-LANGUAGE EXPLANATION
                </span>
                <p className="text-xs font-body text-brand-muted mt-2 leading-relaxed bg-black/20 p-4 rounded-xl border border-brand-border/30">
                  {lesson.explanation}
                </p>
              </div>

              {/* 5-minute Action */}
              <div className="bg-[#1C2029] p-4.5 rounded-xl border border-brand-blue/30 relative">
                <div className="absolute top-3 right-3 p-1 rounded-md bg-brand-blue/10 text-brand-blue">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <span className="text-3xs font-mono uppercase tracking-widest text-brand-blue block">
                  {lesson.level === 'Beginner' ? '5-MINUTE ACTION' : lesson.level === 'Medium' ? '15-MINUTE WORKFLOW' : 'STRATEGIC ARCHITECTURE'}
                </span>
                <p className="text-xs font-sans font-bold text-white mt-2 leading-relaxed">
                  {lesson.actionStep}
                </p>
              </div>

              {/* Call To Action */}
              <div className="bg-black/30 p-4 rounded-xl border border-inner border-brand-border/45">
                <span className="text-3xs font-mono uppercase tracking-widest text-brand-muted block">
                  CTA CONVERSION GOAL
                </span>
                <p className="text-xs font-mono text-brand-orange mt-2 font-semibold">
                  🏷️ {lesson.cta}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 bg-black/40 p-5 rounded-2xl border border-brand-border/80">
              <h3 className="text-xs font-mono text-white tracking-widest uppercase">
                ⚙️ CONTEXT EDITOR
              </h3>
              
              <div>
                <label className="text-3xs text-brand-muted font-mono block mb-1">EDIT BIG IDEA</label>
                <textarea
                  className="w-full bg-zinc-950 text-white text-xs p-2.5 rounded-xl border border-brand-border outline-none focus:border-brand-orange"
                  rows={2}
                  value={editIdea}
                  onChange={(e) => setEditIdea(e.target.value)}
                />
              </div>

              <div>
                <label className="text-3xs text-brand-muted font-mono block mb-1">EDIT EXPLANATION</label>
                <textarea
                  className="w-full bg-zinc-950 text-white text-xs p-2.5 rounded-xl border border-brand-border outline-none focus:border-brand-orange"
                  rows={4}
                  value={editExplanation}
                  onChange={(e) => setEditExplanation(e.target.value)}
                />
              </div>

              <div>
                <label className="text-3xs text-brand-muted font-mono block mb-1">EDIT CONSTRUCTIVE ACTION</label>
                <textarea
                  className="w-full bg-zinc-950 text-white text-xs p-2.5 rounded-xl border border-brand-border outline-none focus:border-brand-orange"
                  rows={3}
                  value={editAction}
                  onChange={(e) => setEditAction(e.target.value)}
                />
              </div>

              <div>
                <label className="text-3xs text-brand-muted font-mono block mb-1">EDIT CTA TARGET</label>
                <input
                  type="text"
                  className="w-full bg-zinc-950 text-white text-xs p-2.5 rounded-xl border border-brand-border outline-none focus:border-brand-orange"
                  value={editCta}
                  onChange={(e) => setEditCta(e.target.value)}
                />
              </div>

              <button
                onClick={handleSaveEdits}
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-black font-mono font-bold text-xs py-2 rounded-xl transition-all cursor-pointer"
              >
                Apply Custom Edits
              </button>
            </div>
          )}

          {/* Typography badges info */}
          <div className="bg-black/30 p-4 rounded-xl border border-brand-border/40 text-between text-2xs space-y-2">
            <h4 className="font-mono text-zinc-400 uppercase tracking-widest text-[9px]">Aura Core Motifs</h4>
            <div className="grid grid-cols-2 gap-2 text-2xs text-brand-muted font-mono">
              <div>Visual: <span className="text-white">{lesson.visualMotif}</span></div>
              <div>Font Heading: <span className="text-white">Inter</span></div>
              <div className="col-span-2 text-3xs border-t border-brand-border/20 pt-2 leading-relaxed">
                Brand Core Rule: {lesson.level === 'Beginner' ? '“You can do this” - simple relatable demonstration.' : lesson.level === 'Medium' ? '“You can improve this” - team or workflow comparative.' : '“You can systematize this” - organization / compliance.'}
              </div>
            </div>
          </div>
        </div>

        {/* Right column (7 lines of layout space): Interactive Social scripts tabs */}
        <div className="lg:col-span-7">
          <div className="flex border-b border-brand-border bg-black/40 p-1.5 rounded-t-xl gap-1">
            <button
              onClick={() => setActiveTab('pitch')}
              className={`flex-1 flex justify-center items-center gap-1.5 py-2 px-3 rounded-lg text-xs font-mono transition-none cursor-pointer ${
                activeTab === 'pitch' 
                  ? 'bg-zinc-800 text-white font-bold border border-zinc-700/60' 
                  : 'text-brand-muted hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-brand-orange" />
              <span>Full Caption Copy</span>
            </button>
            
            <button
              onClick={() => setActiveTab('reel')}
              className={`flex-1 flex justify-center items-center gap-1.5 py-2 px-3 rounded-lg text-xs font-mono transition-none cursor-pointer ${
                activeTab === 'reel' 
                  ? 'bg-zinc-800 text-white font-bold border border-zinc-700/60' 
                  : 'text-brand-muted hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-brand-blue" />
              <span>9:16 Short Script</span>
            </button>

            <button
              onClick={() => setActiveTab('carousel')}
              className={`flex-1 flex justify-center items-center gap-1.5 py-2 px-3 rounded-lg text-xs font-mono transition-none cursor-pointer ${
                activeTab === 'carousel' 
                  ? 'bg-zinc-800 text-white font-bold border border-zinc-700/60' 
                  : 'text-brand-muted hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span>Carousel Slides ({lesson.carouselSlides.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`flex-1 flex justify-center items-center gap-1.5 py-2 px-3 rounded-lg text-xs font-mono transition-none cursor-pointer ${
                activeTab === 'media' 
                  ? 'bg-zinc-800 text-white font-bold border border-zinc-700/60' 
                  : 'text-brand-muted hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-emerald-400" />
              <span>MediaPrompts</span>
            </button>
          </div>

          <div className="bg-black/60 p-5 rounded-b-xl border-x border-b border-brand-border/60 min-h-[380px] flex flex-col justify-between">
            <div>
              {/* Tab 1: Caption Pitch content */}
              {activeTab === 'pitch' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-3xs font-mono text-zinc-400">
                    <span>CAPTION BODY &amp; HASHTAGS</span>
                    <button 
                      onClick={() => handleCopy(`${lesson.caption}\n\n${lesson.hashtags.map(h => `#${h}`).join(' ')}`)}
                      className="text-brand-orange hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Copy All'}</span>
                    </button>
                  </div>
                  
                  <div className="bg-zinc-950 p-4.5 rounded-xl border border-brand-border/80">
                    <p className="text-xs text-white/95 leading-relaxed font-body">
                      {lesson.caption}
                    </p>
                    <p className="text-2xs text-brand-orange font-mono mt-4 leading-relaxed">
                      {lesson.hashtags.map(tag => `#${tag}`).join(' ')}
                    </p>
                  </div>

                  <div className="p-3 bg-brand-orange/5 border border-brand-orange/20 rounded-lg text-2xs text-zinc-300 font-body">
                    <strong>Podcast Focus:</strong> {lesson.podcastAngle}
                  </div>
                </div>
              )}

              {/* Tab 2: Interactive Reel script */}
              {activeTab === 'reel' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-3xs font-mono text-zinc-400">
                    <span>REEL / SHORT AUDIO VIDEO DIRECTIONS</span>
                    <button 
                      onClick={() => handleCopy(lesson.reelScript)}
                      className="text-brand-blue hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="bg-zinc-950 p-4 rounded-xl border border-brand-border/80 text-xs font-mono text-zinc-300 max-h-72 overflow-y-auto space-y-3">
                    <div className="text-[10px] text-zinc-500">// AUDIO / DIRECTORS TIMELINE</div>
                    {lesson.reelScript.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="leading-relaxed border-l-2 border-brand-blue/40 pl-3">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="text-[10px] text-brand-muted font-body leading-relaxed bg-brand-blue/5 p-2 rounded border border-brand-blue/20">
                    💡 <strong>Style Guide:</strong> Restrained motion. No chaotic meme hyper-cuts. On-screen text limited to 4–8 words per frame for accessibility and high text readability.
                  </div>
                </div>
              )}

              {/* Tab 3: Interactive Carousel Slides Simulator */}
              {activeTab === 'carousel' && (
                <div className="space-y-4">
                  <span className="text-3xs font-mono uppercase text-brand-muted tracking-wider block">
                    SLIDES DIRECTORY (CAROUSEL OVERVIEW KIT)
                  </span>

                  {/* Visual Instagram Swiper Mockup Card */}
                  <div className="bg-[#1C2029] p-5 rounded-xl border border-brand-border relative overflow-hidden min-h-[190px] flex flex-col justify-between">
                    
                    {/* Laser line inside swiper */}
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-orange via-brand-blue to-accent" />
                    
                    <div className="flex justify-between items-start text-xs text-zinc-500 font-mono mb-4">
                      <span className="text-brand-orange tracking-widest text-3xs font-bold uppercase">
                        AURA CAROUSEL SLIDE {carouselSlideIndex + 1} OF {lesson.carouselSlides.length}
                      </span>
                      <span className="bg-black/60 px-2 py-0.5 rounded text-[10px]">9:16 Visual Ratio</span>
                    </div>

                    <div className="my-auto text-center px-4">
                      {carouselSlideIndex === 0 ? (
                        <div className="space-y-2">
                          <div className="text-3xl font-mono font-extrabold text-brand-orange">
                            {lesson.letter}
                          </div>
                          <div className="text-xs uppercase tracking-widest font-mono text-white border-y border-brand-border/40 py-2.5 max-w-[240px] mx-auto text-center font-bold">
                            {lesson.concept}
                          </div>
                          <p className="text-[10px] text-zinc-400 font-body">Slide 1: Covers the Core Title Badge</p>
                        </div>
                      ) : (
                        <p className="text-xs font-medium text-white/90 leading-relaxed font-body max-w-sm mx-auto">
                          {lesson.carouselSlides[carouselSlideIndex]}
                        </p>
                      )}
                    </div>

                    {/* Progress dots */}
                    <div className="flex justify-center gap-1.5 mt-4">
                      {lesson.carouselSlides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCarouselSlideIndex(idx)}
                          className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                            idx === carouselSlideIndex ? 'bg-brand-orange w-4' : 'bg-zinc-700 hover:bg-zinc-500'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Simulator Toggles */}
                  <div className="flex justify-between gap-2">
                    <button
                      disabled={carouselSlideIndex === 0}
                      onClick={() => setCarouselSlideIndex(prev => prev - 1)}
                      className="px-3 py-1.5 bg-zinc-900 border border-brand-border rounded text-2xs font-mono text-zinc-400 hover:text-white disabled:opacity-40 cursor-pointer"
                    >
                      ← Previous Slide
                    </button>
                    <button
                      disabled={carouselSlideIndex === lesson.carouselSlides.length - 1}
                      onClick={() => setCarouselSlideIndex(prev => prev + 1)}
                      className="px-3 py-1.5 bg-zinc-900 border border-brand-border rounded text-2xs font-mono text-zinc-400 hover:text-white disabled:opacity-40 cursor-pointer"
                    >
                      Next Slide →
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 4: Media details */}
              {activeTab === 'media' && (
                <div className="space-y-4">
                  <div className="bg-zinc-950 p-4 rounded-xl border border-brand-border/60 space-y-4">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 block">
                        🎥 GOOGLE OMNI CINEMATIC PROMPT
                      </span>
                      <p className="text-xs text-zinc-200 font-body mt-1 leading-relaxed">
                        {lesson.omniVideoPrompt}
                      </p>
                    </div>

                    <div className="border-t border-brand-border/40 pt-3">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#2563EB] block">
                        🎨 THUMBNAIL CREATIVE BRIEF
                      </span>
                      <p className="text-xs text-zinc-200 font-body mt-1 leading-relaxed">
                        {lesson.thumbnailPrompt}
                      </p>
                    </div>

                    <div className="border-t border-brand-border/40 pt-3">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-amber-500 block">
                        🛠️ AI GENERATIVE ENGINE PROMPT
                      </span>
                      <p className="text-2xs font-mono text-zinc-400 mt-1 truncate bg-black/60 p-2 rounded">
                        {lesson.notebookLmPrompt}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Prompt action builder helper at footer of detailed script */}
            <div className="mt-4 pt-3.5 border-t border-brand-border/40 flex flex-wrap gap-2 items-center justify-between text-2xs">
              <span className="font-mono text-brand-muted">
                Need customized variations?
              </span>
              <div className="flex gap-2">
                <span className="text-[10px] text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded font-mono">
                  No layout overrides
                </span>
                <span className="text-[10px] text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded font-mono">
                  Aura Presets Active
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
