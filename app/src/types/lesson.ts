export type LessonLevel = "beginner" | "intermediate" | "advanced";

export type LessonStatus =
  | "idea" | "drafted" | "designed" | "recorded"
  | "edited" | "scheduled" | "published" | "repurposed";

export type Platform =
  | "instagram" | "tiktok" | "youtube" | "linkedin"
  | "podcast" | "newsletter" | "notion" | "google_omni" | "notebooklm";

export interface LessonExportMeta {
  reelScript: boolean;
  carouselCopy: boolean;
  notebookLMPrompt: boolean;
  googleOmniPrompt: boolean;
  publishedPlatforms: Platform[];
}

export interface LessonContent {
  bigIdea: string;
  explanation: string;
  fiveMinuteAction: string;
  cta: string;
  reelScript?: string;
  carouselCopy?: string[];
  podcastAngle?: string;
  notebookLMPrompt?: string;
  googleOmniPrompt?: string;
}

export interface Lesson {
  id: string;
  letter: string;
  concept: string;
  title: string;
  level: LessonLevel;
  status: LessonStatus;
  tags: string[];
  content: LessonContent;
  exportMeta: LessonExportMeta;
  createdAt: string;
}
