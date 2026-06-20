export type Level = 'Beginner' | 'Medium' | 'Expert';

export type LStatus = 
  | 'Idea' 
  | 'Drafted' 
  | 'Designed' 
  | 'Recorded' 
  | 'Edited' 
  | 'Scheduled' 
  | 'Published';

export interface LessonContent {
  letter: string;
  concept: string;
  level: Level;
  title: string;
  bigIdea: string;
  explanation: string;
  actionStep: string;
  cta: string;
  caption: string;
  hashtags: string[];
  reelScript: string;
  carouselSlides: string[];
  podcastAngle: string;
  notebookLmPrompt: string;
  omniVideoPrompt: string;
  thumbnailPrompt: string;
  visualMotif: string;
  status: LStatus;
  updatedAt?: string;
}

export interface PlatformConfig {
  id: string;
  name: string;
  icon: string;
}
