import type { Lesson } from "../../types/lesson";

export const lessonContext: Lesson = {
  id: "beginner-C-context",
  letter: "C",
  concept: "Context",
  title: "C is for Context",
  level: "beginner",
  status: "drafted",
  tags: ["ABC", "Beginner", "C", "Context", "AI Mindset", "Major AI Mindset"],
  content: {
    bigIdea: "The quality of your output depends on the quality of your input.",
    explanation:
      "AI does not read your mind. It responds to the context you give it. When your prompt is vague, the answer will usually be vague. When you explain who the work is for, what you want, what tone you need, and what result you expect, the answer becomes more useful. Context is what turns guessing into guidance.",
    fiveMinuteAction:
      "Ask AI the same question twice. First with one sentence. Then with full context: who it is for, what you want, what tone you need, and what result you expect.",
    cta: "Comment CONTEXT if you want the better prompt formula.",
    reelScript:
      "C is for Context. AI does not read your mind. Better input creates better output. Ask the same question twice: once simple, once with full detail. Watch the difference.",
    carouselCopy: [
      "C is for Context",
      "AI does not read your mind.",
      "Better input creates better output.",
      "Tell AI who it is for, what you need, and the result you want.",
      "Five-minute action: ask the same question twice.",
    ],
    podcastAngle:
      "Episode intro: 'Most people think AI gave them a bad answer. But many times, AI was missing context. Today we are breaking down how better input creates better output.'",
    notebookLMPrompt:
      "Create a beginner-safe podcast outline for C is for Context. Explain why context matters, why vague prompts fail, and how beginners can improve answers without technical language.",
    googleOmniPrompt:
      "Create a 9:16 vertical motion graphic for Major AI Mindset. Use the MAIM black, gold, green, blue, and orange system. Show a vague one-line prompt producing a messy answer, then a detailed prompt producing a clear organized output. Warm, premium, beginner-safe. No robots.",
  },
  exportMeta: {
    reelScript: true,
    carouselCopy: true,
    notebookLMPrompt: true,
    googleOmniPrompt: true,
    publishedPlatforms: [],
  },
  assets: [],
  createdAt: "2026-06-25T13:10:00+08:00",
};
