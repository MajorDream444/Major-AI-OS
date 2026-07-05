export interface Fact {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface ABCItem {
  letter: string;
  word: string;
  phrase: string;
  details: string;
  example: string;
}

export interface RhythmCard {
  id: string;
  num: string;
  title: string;
  description: string;
  highlight: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface AudienceGroup {
  id: string;
  title: string;
  description: string;
  painPoint: string;
  takeaway: string;
  bgGradient: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    score: number;
    description: string;
  }[];
}
