export interface SessionTime {
  label: string;
  date: string;
  time: string;
}

export interface LandingContent {
  schedule: {
    eyebrow: string;
    heading: string;
    location: string;
    closingLine: string;
    bali: SessionTime;
    newYork: SessionTime;
    weekItems: string[];
  };
  facts: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: Array<{
      icon: 'video' | 'calendar' | 'users';
      title: string;
      description: string;
    }>;
  };
  rhythm: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: Array<{
      number: string;
      title: string;
      copy: string;
    }>;
  };
  meetMajor: {
    portraitAlt: string;
    markAlt: string;
    imageLabel: string;
    imageName: string;
    eyebrow: string;
    heading: string;
    body: string;
    quote: string;
  };
  faq: {
    eyebrow: string;
    heading: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  abc: {
    eyebrow: string;
    headingLines: Array<{
      text: string;
      colorClass: string;
    }>;
    intro: string;
    countLine: string;
    footerLine: string;
    cards: Array<{
      letter: string;
      word: string;
      phrase: string;
      details: string;
      colorClass: string;
    }>;
  };
}
