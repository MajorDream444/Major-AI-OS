export type ABCLesson = {
  letter: string;
  word: string;
  title: string;
  bigIdea: string;
  lesson: string;
  action: string;
  cta: string;
  visualPrompt: string;
};

export const abcSample: ABCLesson[] = [
  {
    letter: 'A',
    word: 'Awareness',
    title: 'A is for Awareness',
    bigIdea: 'Notice before you automate.',
    lesson: 'AI starts when you notice where help is needed.',
    action: 'Write down 3 tasks you repeat every week.',
    cta: 'Comment AWARE if you found one.',
    visualPrompt: 'Major notices one glowing opportunity while noise fades behind him.',
  },
  {
    letter: 'B',
    word: 'Belief',
    title: 'B is for Belief',
    bigIdea: 'If you can text, you can use AI.',
    lesson: 'Belief comes before skill. Plain language is the new interface.',
    action: 'Ask AI one question in your own words.',
    cta: 'Comment BELIEF if you are ready to learn.',
    visualPrompt: 'A simple text message becomes a clear AI response.',
  },
  {
    letter: 'C',
    word: 'Context',
    title: 'C is for Context',
    bigIdea: 'Better input creates better output.',
    lesson: 'AI does not read your mind. It responds to the context you give it.',
    action: 'Ask the same question twice: once vague, once with context.',
    cta: 'Comment CONTEXT if you see the difference.',
    visualPrompt: 'A vague prompt fades while a detailed prompt becomes organized clarity.',
  },
];
