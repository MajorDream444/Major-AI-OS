import type { Lesson } from "../types/lesson";

export const allLessons: Lesson[] = [
  // ── BEGINNER ──────────────────────────────────────────────
  {
    id: "beginner-A-awareness",
    letter: "A", concept: "Awareness", title: "A is for Awareness",
    level: "beginner", status: "designed",
    tags: ["Awareness","Mindset","Beginner"],
    content: {
      bigIdea: "AI starts when you notice where help is needed.",
      explanation: "Before you can automate, delegate, or build — you must see the friction. The operators who win with AI are the ones who pause, observe, and ask: where am I spending time that a system could handle?",
      fiveMinuteAction: "Write down 3 tasks that drain your time each week.",
      cta: "Comment AWARE if you found one task to test.",
      podcastAngle: "Before ChatGPT, before agents — it starts with awareness. Why most people skip the most important step.",
      reelScript: "Hook: 'The #1 AI skill nobody talks about isn't prompting — it's noticing.'\n\nBody: Before you build an agent, before you run a prompt, before you touch any tool — you need to see the problem.\n\nAwareness is the meta-skill. It's how you find where AI can save you time.\n\nAction: Pull out your phone. Write 3 tasks that cost you time every week. That's your AI roadmap.\n\nCTA: Comment AWARE below if you found one task to delegate.",
    },
    exportMeta: { reelScript: true, carouselCopy: false, notebookLMPrompt: false, googleOmniPrompt: false, publishedPlatforms: [] },
    createdAt: "2026-06-19T13:00:00+08:00",
  },
  {
    id: "beginner-B-build",
    letter: "B", concept: "Build", title: "B is for Build",
    level: "beginner", status: "drafted",
    tags: ["Build","Execution","Beginner"],
    content: {
      bigIdea: "Building with AI means shipping faster than you think.",
      explanation: "The barrier to building has collapsed. What once took a dev team and 3 months can now be prototyped in an afternoon. But the mindset shift is real — you have to be willing to start messy.",
      fiveMinuteAction: "Pick one thing you've been 'planning' for months. Start the first version today.",
      cta: "Drop BUILD in the comments if you're shipping this week.",
    },
    exportMeta: { reelScript: false, carouselCopy: false, notebookLMPrompt: false, googleOmniPrompt: false, publishedPlatforms: [] },
    createdAt: "2026-06-19T13:00:00+08:00",
  },
  {
    id: "beginner-C-context",
    letter: "C", concept: "Context", title: "C is for Context",
    level: "beginner", status: "drafted",
    tags: ["Context","Prompting","Beginner"],
    content: {
      bigIdea: "The quality of your AI output depends on the context you give it.",
      explanation: "AI doesn't know you. It only knows what you tell it. Context is the setup — your role, your goal, your audience, your constraints. Better context = better results every time.",
      fiveMinuteAction: "Rewrite your last AI prompt with: who you are, what you need, and who it's for.",
      cta: "Reply with your better prompt — let's compare.",
    },
    exportMeta: { reelScript: false, carouselCopy: false, notebookLMPrompt: false, googleOmniPrompt: false, publishedPlatforms: [] },
    createdAt: "2026-06-19T13:00:00+08:00",
  },
  {
    id: "beginner-D-delegate",
    letter: "D", concept: "Delegate", title: "D is for Delegate",
    level: "beginner", status: "idea",
    tags: ["Delegation","Automation","Beginner"],
    content: {
      bigIdea: "Great operators delegate to AI what doesn't need their human judgment.",
      explanation: "Delegation is a skill. The best founders and operators know what to keep and what to hand off. AI is your first staff member — brief it clearly and trust it with the repeatable work.",
      fiveMinuteAction: "Identify one task you do weekly that follows a pattern. Draft instructions for an AI to handle it.",
      cta: "Tag someone who needs to delegate more.",
    },
    exportMeta: { reelScript: false, carouselCopy: false, notebookLMPrompt: false, googleOmniPrompt: false, publishedPlatforms: [] },
    createdAt: "2026-06-19T13:00:00+08:00",
  },
  {
    id: "beginner-E-execute",
    letter: "E", concept: "Execute", title: "E is for Execute",
    level: "beginner", status: "idea",
    tags: ["Execution","Action","Beginner"],
    content: {
      bigIdea: "Execution with AI is what separates builders from browsers.",
      explanation: "Consuming AI content is easy. Using AI to actually ship something is where most people stop. Execution means running the prompt, reviewing the output, iterating, and publishing.",
      fiveMinuteAction: "Use AI to complete one task you've been putting off. Do it now.",
      cta: "Reply with what you just executed. Hold yourself accountable.",
    },
    exportMeta: { reelScript: false, carouselCopy: false, notebookLMPrompt: false, googleOmniPrompt: false, publishedPlatforms: [] },
    createdAt: "2026-06-19T13:00:00+08:00",
  },

  // ── INTERMEDIATE ──────────────────────────────────────────
  {
    id: "intermediate-F-flow",
    letter: "F", concept: "Flow", title: "F is for Flow",
    level: "intermediate", status: "idea",
    tags: ["Workflow","Systems","Intermediate"],
    content: {
      bigIdea: "AI multiplies your output when it fits into a flow, not just a one-off prompt.",
      explanation: "A flow is a repeatable sequence of steps. When you map your work into flows and attach AI at each step, you go from single-task tool use to genuine leverage.",
      fiveMinuteAction: "Map one workflow you repeat weekly. Mark every step where AI could assist.",
      cta: "Share your workflow map in the comments.",
    },
    exportMeta: { reelScript: false, carouselCopy: false, notebookLMPrompt: false, googleOmniPrompt: false, publishedPlatforms: [] },
    createdAt: "2026-06-19T13:00:00+08:00",
  },
  {
    id: "intermediate-G-generate",
    letter: "G", concept: "Generate", title: "G is for Generate",
    level: "intermediate", status: "idea",
    tags: ["Generation","Content","Intermediate"],
    content: {
      bigIdea: "Generation is not replacing creativity — it's removing the blank page.",
      explanation: "AI generation tools handle drafts, ideas, images, scripts, and code. Your job is to curate, direct, and elevate. The creative is still you — AI removes the friction of starting.",
      fiveMinuteAction: "Generate 5 content ideas for your niche using AI. Pick your favorite and brief it out.",
      cta: "Drop your favorite idea in the comments.",
    },
    exportMeta: { reelScript: false, carouselCopy: false, notebookLMPrompt: false, googleOmniPrompt: false, publishedPlatforms: [] },
    createdAt: "2026-06-19T13:00:00+08:00",
  },
  {
    id: "intermediate-H-handoff",
    letter: "H", concept: "Handoff", title: "H is for Handoff",
    level: "intermediate", status: "idea",
    tags: ["Handoff","Agents","Intermediate"],
    content: {
      bigIdea: "The handoff is where AI systems gain real power — one agent hands off to the next.",
      explanation: "Multi-agent systems work because each agent specializes and passes context forward. A researcher hands off to a writer. A writer hands off to a publisher. The handoff is the protocol.",
      fiveMinuteAction: "Write a brief handoff note for your next AI task: what it is, what it produced, and what happens next.",
      cta: "If you run multi-agent workflows, reply with your setup.",
    },
    exportMeta: { reelScript: false, carouselCopy: false, notebookLMPrompt: false, googleOmniPrompt: false, publishedPlatforms: [] },
    createdAt: "2026-06-19T13:00:00+08:00",
  },

  // ── ADVANCED ──────────────────────────────────────────────
  {
    id: "advanced-I-intelligence",
    letter: "I", concept: "Intelligence", title: "I is for Intelligence",
    level: "advanced", status: "idea",
    tags: ["Intelligence","Strategy","Advanced"],
    content: {
      bigIdea: "Intelligence is knowing which AI to use, when, and why.",
      explanation: "Tool literacy is table stakes. Strategic AI intelligence means understanding model strengths, agent design, context windows, and when NOT to use AI. The advanced operator is a systems thinker.",
      fiveMinuteAction: "List the 3 AI tools you use most. Write one sentence on what each does best.",
      cta: "Reply with your AI toolkit — let's compare stacks.",
    },
    exportMeta: { reelScript: false, carouselCopy: false, notebookLMPrompt: false, googleOmniPrompt: false, publishedPlatforms: [] },
    createdAt: "2026-06-19T13:00:00+08:00",
  },
  {
    id: "advanced-J-judgment",
    letter: "J", concept: "Judgment", title: "J is for Judgment",
    level: "advanced", status: "idea",
    tags: ["Judgment","Trust","Advanced"],
    content: {
      bigIdea: "Human judgment is still the most valuable layer in any AI system.",
      explanation: "AI generates. Humans judge. The quality of your output depends on your ability to evaluate what AI produces and know when to push back, redirect, or override. Judgment compounds.",
      fiveMinuteAction: "Review an AI output you accepted without editing. What would you change now?",
      cta: "Share one thing you always edit when AI writes for you.",
    },
    exportMeta: { reelScript: false, carouselCopy: false, notebookLMPrompt: false, googleOmniPrompt: false, publishedPlatforms: [] },
    createdAt: "2026-06-19T13:00:00+08:00",
  },
];

export const getLessonById = (id: string) =>
  allLessons.find((l) => l.id === id);
