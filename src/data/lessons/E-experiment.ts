import type { Lesson } from "../../types/lesson";

export const lessonExperiment: Lesson = {
  id: "beginner-E-experiment",
  letter: "E",
  concept: "Experiment",
  title: "E is for Experiment",
  level: "beginner",
  status: "drafted",
  tags: ["ABC", "Beginner", "E", "Experiment", "AI Mindset", "Major AI Mindset"],
  content: {
    bigIdea: "You do not have to master AI. You have to start.",
    explanation:
      "Experiment means you are allowed to try, adjust, and learn without shame. The first prompt does not need to be perfect. It only needs to begin the conversation. AI confidence grows through small tests, not silent overthinking.",
    fiveMinuteAction:
      "Try one small AI task today and write down what worked, what did not, and what you would ask differently next time.",
    cta: "Comment EXPERIMENT if you are willing to try one small AI task today.",
    reelScript:
      "E is for Experiment. You do not have to master AI. You have to start. Try one small task, notice what worked, adjust, and try again. Likkle by likkle.",
    carouselCopy: [
      "E is for Experiment",
      "You do not have to master AI.",
      "You have to start.",
      "The first prompt is not supposed to be perfect.",
      "Five-minute action: try one small AI task today.",
    ],
    podcastAngle:
      "Episode intro: 'The people who get better with AI are not always the smartest. They are the ones willing to experiment. Today we are making experimentation feel safe.'",
    notebookLMPrompt:
      "Create a beginner-safe podcast outline for E is for Experiment. Focus on removing perfectionism, encouraging small tests, and turning mistakes into learning signals.",
    googleOmniPrompt:
      "Create a 9:16 vertical motion graphic for Major AI Mindset. Use the MAIM black, gold, green, blue, and orange system. Show small glowing experiment cards moving from TRY to LEARN to ADJUST to BUILD. Warm, premium, beginner-safe. No robots.",
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
