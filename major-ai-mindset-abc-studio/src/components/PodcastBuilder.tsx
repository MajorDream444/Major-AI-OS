import { useState, useEffect } from 'react';
import { LessonContent } from '../types';
import { Radio, Sparkles, Copy, Check, FileText, Play, Mic, HelpCircle } from 'lucide-react';

interface PodcastProps {
  lesson: LessonContent;
}

export default function PodcastBuilder({ lesson }: PodcastProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'notebook' | 'notes' | 'discussion'>('notebook');
  
  // Custom generated titles for the concept
  const episodeTitles = [
    `Unlocking ${lesson.concept}: The Core Spine of AI Practice`,
    `Is ${lesson.concept} the Real Difference in Professional AI Teams?`,
    `Why Most AI Prompts Fail: Missing ${lesson.concept}`,
    `Mindset Over Tools: The Case for Absolute ${lesson.concept}`,
    `${lesson.letter} is for ${lesson.concept} (Six-Minute Audio Lesson)`
  ];

  const handleCopy = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(identifier);
    setTimeout(() => setCopiedText(null), 1500);
  };

  const showNotesText = `🎧 MINDSPEAK PODCAST APPARATUS — SHOW NOTES
Episode Target: "${episodeTitles[0]}"
Tier Depth: ${lesson.level}

📝 DESCRIPTION:
In this episode of the Major AI Mindset Series, we do a deep-dive analysis on "${lesson.concept}"—the letter ${lesson.letter} node in our multi-tier content spine. Discover why raw tools fail without foundational intention.

🔥 KEY TAKEAWAYS:
1. One Big Idea: "${lesson.bigIdea}"
2. Strategic Insight: ${lesson.explanation}
3. The 5-Minute Action Experiment: "${lesson.actionStep}"

🎯 CALL TO ACTION:
Try today's experiment and follow up: ${lesson.cta}

🏷️ EXPORT SYSTEM HASHTAGS:
${lesson.hashtags.map(t => `#${t}`).join(' ')} #AIEducation #NotebookLM`;

  return (
    <div className="w-full bg-brand-card/30 border border-brand-border rounded-[24px] p-6 backdrop-blur-md relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 blur-2xl pointer-events-none rounded-full" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-lg font-sans font-extrabold text-white flex items-center gap-2.5 tracking-tight">
            <span className="p-1 rounded-lg bg-brand-blue/10 text-brand-blue hover:text-brand-orange">
              <Radio className="w-5 h-5" />
            </span>
            <span>NotebookLM Podcast Builder</span>
          </h2>
          <p className="text-xs text-brand-muted font-body mt-0.5">
            Formulate perfect NotebookLM co-host summaries, write professional show notes, or prepare interactive classroom discussion questions.
          </p>
        </div>
      </div>

      {/* Grid Layout: Left Column Title Brainstormer, Right Column Interactive Prompts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Title Brainstormer Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-black/50 border border-brand-border p-4.5 rounded-xl">
            <div className="flex items-center gap-2 mb-3.5">
              <Mic className="w-4 h-4 text-brand-orange" />
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Episode Title Ideas (Click to Copy)
              </h3>
            </div>
            
            <div className="space-y-2">
              {episodeTitles.map((title, i) => (
                <button
                  key={i}
                  onClick={() => handleCopy(title, `title_${i}`)}
                  className="w-full text-left bg-black/40 hover:bg-zinc-800 border border-brand-border/60 hover:border-brand-muted/40 p-2.5 rounded-lg text-xs leading-relaxed font-body text-zinc-300 transition-all flex items-center justify-between gap-2.5 group cursor-pointer"
                >
                  <p className="group-hover:text-white truncate">
                    <span className="text-brand-orange font-mono mr-2">0{i+1}.</span>
                    {title}
                  </p>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-brand-muted group-hover:text-brand-orange shrink-0">
                    {copiedText === `title_${i}` ? 'Copied' : 'Copy'}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-[10px] text-zinc-500 font-mono mt-3 leading-relaxed">
              💡 Ep. Code: MAID-{lesson.letter}-{lesson.level.substring(0,3).toUpperCase()}
            </p>
          </div>

          {/* Simulated Deck audio indicators */}
          <div className="bg-[#1C2029] p-4 rounded-xl border border-inner border-brand-border/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <div>
                <p className="text-[10px] font-mono text-zinc-400">AUDIO SYNTH SIMULATOR</p>
                <p className="text-xs text-white font-bold">128kbps Stereo Node Output</p>
              </div>
            </div>
            <div className="flex gap-1">
              <span className="w-1.5 h-6 bg-brand-orange/60 rounded-full animate-pulse" />
              <span className="w-1.5 h-8 bg-brand-blue/60 rounded-full animate-bounce" />
              <span className="w-1.5 h-7 bg-brand-orange/60 rounded-full animate-pulse" />
              <span className="w-1.5 h-4 bg-zinc-600 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Builder Content Panel */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="bg-[#0c0d12] rounded-xl border border-brand-border overflow-hidden">
            {/* Tabs top bar */}
            <div className="flex border-b border-brand-border bg-black/40 p-1 gap-1">
              <button
                onClick={() => setActiveTab('notebook')}
                className={`flex-1 py-2 text-3xs font-mono tracking-wider uppercase rounded-lg text-center cursor-pointer ${
                  activeTab === 'notebook' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                NotebookLM prompt
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-2 text-3xs font-mono tracking-wider uppercase rounded-lg text-center cursor-pointer ${
                  activeTab === 'notes' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Show Notes Draft
              </button>
              <button
                onClick={() => setActiveTab('discussion')}
                className={`flex-1 py-2 text-3xs font-mono tracking-wider uppercase rounded-lg text-center cursor-pointer ${
                  activeTab === 'discussion' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Discussion Questions
              </button>
            </div>

            {/* Content body */}
            <div className="p-4 min-h-[196px] text-xs font-mono text-zinc-300 leading-relaxed scrollbar-thin max-h-64 overflow-y-auto bg-black/30">
              {activeTab === 'notebook' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-3xs text-zinc-500">
                    <span>COPY ENGINE SCRIPT FOR NOTEBOOKLM CUSTOM PERSPECTIVE</span>
                    <button
                      onClick={() => handleCopy(lesson.notebookLmPrompt, 'notebook')}
                      className="text-brand-orange hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedText === 'notebook' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedText === 'notebook' ? 'Copied' : 'Copy Prompt'}</span>
                    </button>
                  </div>
                  <textarea
                    readOnly
                    className="w-full bg-black/40 text-xs font-mono border border-brand-border/40 p-3 rounded-lg text-zinc-300 focus:outline-none focus:border-brand-blue resize-none h-32 leading-relaxed"
                    defaultValue={lesson.notebookLmPrompt}
                  />
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-3xs text-zinc-500">
                    <span>SOCIAL CAPTION SHOW NOTES FORMAT</span>
                    <button
                      onClick={() => handleCopy(showNotesText, 'shownotes')}
                      className="text-brand-blue hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedText === 'shownotes' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedText === 'shownotes' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <textarea
                    readOnly
                    className="w-full bg-black/40 text-xs font-mono border border-brand-border/40 p-3 rounded-lg text-zinc-300 focus:outline-none focus:border-brand-blue resize-none h-32 leading-relaxed scrollbar-thin"
                    value={showNotesText}
                  />
                </div>
              )}

              {activeTab === 'discussion' && (
                <div className="space-y-3">
                  <span className="text-3xs text-zinc-500 block uppercase">
                    3 Questions to guide host interviews or school lectures
                  </span>
                  <div className="bg-zinc-950 p-3.5 rounded-lg border border-brand-border/60 space-y-2.5 font-body">
                    <p className="text-xs text-white">
                      💡 <strong>Q1 (The Action Barrier):</strong> What is the absolute biggest bottleneck that prevents your team from mastering <em>{lesson.concept}</em>?
                    </p>
                    <p className="text-xs text-white">
                      💡 <strong>Q2 (The Trust Factor):</strong> How does the thesis <em>“{lesson.bigIdea}”</em> restructure our client responsibilities?
                    </p>
                    <p className="text-xs text-white">
                      💡 <strong>Q3 (The AI Limit):</strong> In what areas can generative systems fail us if we automate <em>{lesson.concept}</em> without human-in-the-loop validation?
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-3.5 flex items-center gap-2 text-3xs font-mono text-brand-muted">
            <HelpCircle className="w-3.5 h-3.5 text-zinc-600" />
            <span>Copy and apply in NotebookLM to configure premium deep-dive conversational audio co-hosts.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
