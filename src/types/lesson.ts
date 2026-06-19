/**
 * Canonical lesson schema for Major AI Mindset ABC Studio.
 * Every A–Z lesson entry must conform to this type.
 */

export type LessonLevel = "beginner" | "intermediate" | "advanced";

export type LessonStatus =
  | "idea"
  | "drafted"
  | "designed"
  | "recorded"
  | "edited"
  | "scheduled"
  | "published"
  | "repurposed";

export type Platform =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "linkedin"
  | "podcast"
  | "newsletter"
  | "notion"
  | "google_omni"
  | "notebooklm";

export interface LessonExportMeta {
  /** Whether reel script has been written */
  reelScript: boolean;
  /** Whether carousel copy has been written */
  carouselCopy: boolean;
  /** Whether NotebookLM prompt has been written */
  notebookLMPrompt: boolean;
  /** Whether Google Omni prompt has been written */
  googleOmniPrompt: boolean;
  /** Platforms this lesson has been exported/published to */
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

export interface LessonAsset {
  assetId: string;
  fileName: string;
  githubPath: string;
  sha256?: string;
  fileSizeBytes?: number;
  format: "PNG" | "MP4" | "MP3" | "PDF" | "SVG";
  aspectRatio?: string;
  dimensions?: { width: number; height: number };
}

export interface Lesson {
  /** Unique slug, e.g. "beginner-A-awareness" */
  id: string;
  letter: string;
  concept: string;
  title: string;
  level: LessonLevel;
  status: LessonStatus;
  tags: string[];
  content: LessonContent;
  exportMeta: LessonExportMeta;
  assets: LessonAsset[];
  createdAt: string;
  updatedAt?: string;
}
