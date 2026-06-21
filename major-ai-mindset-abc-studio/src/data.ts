import { LessonContent, Level, LStatus } from './types';

// Preloaded full curriculum data
export const ALL_CONCEPTS_LIST = [
  { letter: 'A', concept: 'Awareness' },
  { letter: 'B', concept: 'Belief' },
  { letter: 'C', concept: 'Curiosity' },
  { letter: 'D', concept: 'Data' },
  { letter: 'E', concept: 'Efficiency' },
  { letter: 'F', concept: 'Future' },
  { letter: 'G', concept: 'Growth' },
  { letter: 'H', concept: 'Human' },
  { letter: 'I', concept: 'Imagination' },
  { letter: 'J', concept: 'Judgment' },
  { letter: 'K', concept: 'Knowledge' },
  { letter: 'L', concept: 'Leverage' },
  { letter: 'M', concept: 'Mindset' },
  { letter: 'N', concept: 'Network' },
  { letter: 'O', concept: 'Opportunity' },
  { letter: 'P', concept: 'Prompt' },
  { letter: 'Q', concept: 'Questions' },
  { letter: 'R', concept: 'Responsibility' },
  { letter: 'S', concept: 'Skills' },
  { letter: 'T', concept: 'Time' },
  { letter: 'U', concept: 'Understanding' },
  { letter: 'V', concept: 'Vision' },
  { letter: 'W', concept: 'Wisdom' },
  { letter: 'X', concept: 'eXecution' },
  { letter: 'Y', concept: 'You' },
  { letter: 'Z', concept: 'Zero Excuses' }
];

// Seed raw data for Beginner level representing the actual curriculum sheets
export const BEGINNER_SEEDS: Record<string, Partial<LessonContent>> = {
  A: {
    bigIdea: 'AI starts when you notice where help is needed.',
    explanation: 'Most people start with tools, but the real starting point is awareness. Notice which tasks feel repetitive, confusing, or time-heavy, and AI suddenly becomes practical.',
    actionStep: 'Write down 3 tasks that drain your time each week. Pick the easiest one to test with AI today.',
    cta: 'Comment AWARE if you found one task to test.',
    caption: 'Start with awareness, not hype. What task do you want AI to help with first?',
    hashtags: ['MajorAIMindset', 'AIFoundation', 'AIAwareness', 'LearnerJourney', 'FutureOfWork']
  },
  B: {
    bigIdea: 'You do not need to be technical to learn AI.',
    explanation: 'A lot of beginners quit before they start because they assume AI is only for coders. If you can explain what you want in plain language, you can begin.',
    actionStep: 'Ask one simple prompt: “Help me plan my day in a clearer way.”',
    cta: 'Comment BELIEVE if you’re done waiting for perfect.',
    caption: 'You don’t need to be technical to start using AI. You need belief and one good question.',
    hashtags: ['MajorAIMindset', 'AIFuture', 'AIMindset', 'ConfidenceReset', 'LearnAI']
  },
  C: {
    bigIdea: 'Curiosity is the engine that unlocks AI.',
    explanation: 'AI gets more useful when you stop trying to sound smart and start asking real questions. Curious people learn faster because they test, ask, and adjust.',
    actionStep: 'Ask AI: “How could someone like me use AI this week?”',
    cta: 'Comment CURIOUS with your role and I’ll suggest a use case.',
    caption: 'Curiosity beats fear. Ask better questions and AI gets better fast.',
    hashtags: ['MajorAIMindset', 'Curiouslearner', 'AIFoundation', 'AskBetter', 'LearningAI']
  },
  D: {
    bigIdea: 'AI outputs depend on the quality of the information behind them.',
    explanation: 'AI does not magically know your context. Better input, clearer facts, and stronger examples usually lead to stronger answers.',
    actionStep: 'Take a vague prompt and add one goal, one audience, and one constraint. Compare the result.',
    cta: 'Comment DATA if you saw the answer improve.',
    caption: 'Better input usually creates better output. Context matters.',
    hashtags: ['MajorAIMindset', 'DataQuality', 'AIFounders', 'PromptSkill', 'LearnAI']
  },
  E: {
    bigIdea: 'AI should save time on low-value repetition.',
    explanation: 'The goal is not to rush everything. The goal is to remove unnecessary friction so you can spend more time thinking, creating, and deciding.',
    actionStep: 'Use AI to draft one email, caption, or task list you were avoiding.',
    cta: 'Save this post if AI gave you 10 minutes back.',
    caption: 'AI is not just smart. It can be useful. Save time where work repeats.',
    hashtags: ['MajorAIMindset', 'EfficiencyHacks', 'AIFounder', 'Workflows', 'ProductiveLife']
  },
  F: {
    bigIdea: 'The future rewards people who keep learning.',
    explanation: 'AI is changing how people write, plan, research, and build. You do not need every answer today, but you do need the habit of learning.',
    actionStep: 'Spend 5 minutes exploring one new AI feature or tool.',
    cta: 'Comment FUTURE if you’re learning in real time.',
    caption: 'The future belongs to learners, not spectators.',
    hashtags: ['MajorAIMindset', 'FutureReady', 'AIFilter', 'DigitalUpskill', 'LearningPath']
  },
  G: {
    bigIdea: 'AI confidence grows through practice, not perfection.',
    explanation: 'No one becomes fluent by watching from the sidelines. Growth comes from using AI badly at first, then better, then on purpose.',
    actionStep: 'Run 3 variations of the same prompt and note which one worked best.',
    cta: 'Comment GROWTH if you practiced instead of overthinking.',
    caption: 'Practice beats perfection. Three prompts today is progress.',
    hashtags: ['MajorAIMindset', 'GrowthMindset', 'AIPractice', 'PromptEngineering', 'LearnDaily']
  },
  H: {
    bigIdea: 'AI is a tool, but your judgment is still the advantage.',
    explanation: 'AI can generate words fast, but it cannot replace your values, taste, empathy, and lived experience. The human part is still where trust comes from.',
    actionStep: 'Edit one AI answer so it sounds more like you.',
    cta: 'Comment HUMAN if you rewrote the result in your voice.',
    caption: 'The tool can help, but your voice still matters most.',
    hashtags: ['MajorAIMindset', 'HumanInTheLoop', 'AIFounders', 'HumanVoice', 'LearnAI']
  },
  I: {
    bigIdea: 'AI expands what you can imagine and prototype quickly.',
    explanation: 'Sometimes people do not need more motivation; they need a faster way to see their idea. AI helps turn rough thoughts into drafts, options, and directions.',
    actionStep: 'Ask AI to turn one dream idea into a 3-step starter plan.',
    cta: 'Comment IMAGINE if you want a prompt for your idea.',
    caption: 'Use AI to turn ideas into first drafts instead of leaving them in your head.',
    hashtags: ['MajorAIMindset', 'ImaginationSpace', 'CreativeAI', 'AIFoundation', 'Learner']
  },
  J: {
    bigIdea: 'Smart AI users verify before they trust.',
    explanation: 'AI can sound confident and still be wrong. Good judgment means checking facts, checking tone, and asking whether the answer actually fits the goal.',
    actionStep: 'Ask AI for one answer, then verify one claim or number yourself.',
    cta: 'Comment JUDGMENT if you checked before sharing.',
    caption: 'Don’t outsource judgment. Verify what matters.',
    hashtags: ['MajorAIMindset', 'JudgmentFirst', 'ResponsibleAI', 'AIFacts', 'LearnTips']
  },
  K: {
    bigIdea: 'Knowledge becomes useful when you can explain and apply it.',
    explanation: 'Watching AI content is not the same as learning AI. Real knowledge shows up when you can use an idea on your own task.',
    actionStep: 'Teach one AI tip you learned today to a friend or teammate.',
    cta: 'Comment KNOWLEDGE with the tip you shared.',
    caption: 'If you can teach it simply, you’re starting to own it.',
    hashtags: ['MajorAIMindset', 'KnowledgeShare', 'AILiteracy', 'AIFoundation', 'LearnNow']
  },
  L: {
    bigIdea: 'AI gives one person more capacity when used intentionally.',
    explanation: 'Leverage is not doing more random work. It is using the right support at the right point so your effort goes farther.',
    actionStep: 'List one task you do every week and ask AI to create a reusable template for it.',
    cta: 'Comment LEVERAGE if you created something reusable.',
    caption: 'One smart template can save hours later. That’s leverage.',
    hashtags: ['MajorAIMindset', 'LeverageSmart', 'AIFramework', 'WorkflowOptimization', 'Templates']
  },
  M: {
    bigIdea: 'The right mindset matters more than chasing every new tool.',
    explanation: 'Tools will change fast, but mindset travels well. If you stay curious, responsible, and action-oriented, you can keep adapting.',
    actionStep: 'Finish this sentence in your notes: “My AI mindset is…”',
    cta: 'Comment MINDSET with one word that defines your approach.',
    caption: 'A strong mindset will outlast every app update.',
    hashtags: ['MajorAIMindset', 'MindsetShift', 'AIFoundation', 'LearnEverywhere', 'FutureTrends']
  },
  N: {
    bigIdea: 'Learning AI gets easier when you learn with other people.',
    explanation: 'Community speeds up learning because questions, examples, and wins become visible. You do not have to figure it all out alone.',
    actionStep: 'Share one AI lesson with one person or in one online group.',
    cta: 'Tag a friend who should start this series with you.',
    caption: 'Don’t learn alone. AI gets easier when ideas move in community.',
    hashtags: ['MajorAIMindset', 'NetworkSupport', 'AILearning', 'CommunityHub', 'FutureTogether']
  },
  O: {
    bigIdea: 'AI creates opportunity for people who take small action early.',
    explanation: 'Big shifts reward people who learn before they feel fully ready. Opportunity often looks like a tiny experiment before it looks like a big win.',
    actionStep: 'Use AI to improve one thing you already do for work, school, or content.',
    cta: 'Comment OPPORTUNITY with what you improved.',
    caption: 'Opportunity often starts as a tiny test. Start one today.',
    hashtags: ['MajorAIMindset', 'OpportunitySeeker', 'AICreation', 'SmallWins', 'Innovation']
  },
  P: {
    bigIdea: 'The quality of your prompt shapes the quality of your result.',
    explanation: 'A prompt is just an instruction, but better structure creates better outcomes. Good prompts usually include a role, a goal, and useful context.',
    actionStep: 'Use this frame: “Act as my coach. Help me [goal] for [audience] in [format].”',
    cta: 'Comment PROMPT if you want 10 beginner prompt templates.',
    caption: 'Better prompts make AI feel instantly smarter.',
    hashtags: ['MajorAIMindset', 'PromptDesign', 'AICalling', 'LearnToPrompt', 'SmartTools']
  },
  Q: {
    bigIdea: 'Questions unlock better thinking and better AI answers.',
    explanation: 'AI is often less about having the perfect command and more about asking the next useful question. Follow-up questions are where the real clarity starts.',
    actionStep: 'Ask one follow-up: “Can you simplify that?” or “Can you give me 3 options?”',
    cta: 'Comment QUESTIONS with your best follow-up prompt.',
    caption: 'The next question is usually where the magic starts.',
    hashtags: ['MajorAIMindset', 'QuestioningTech', 'AIIntelligence', 'InteractiveAI', 'LogicFlow']
  },
  R: {
    bigIdea: 'Powerful tools require responsible habits.',
    explanation: 'AI can save time and create value, but it can also spread bad information or careless work. Responsible use means checking, editing, and protecting sensitive information.',
    actionStep: 'Review one AI output for errors, bias, or anything too personal to share.',
    cta: 'Comment RESPONSIBLE if you fixed something before posting it.',
    caption: 'Fast is not enough. Use AI responsibly.',
    hashtags: ['MajorAIMindset', 'ResponsibleAI', 'DigitalSafety', 'AIEthics', 'VerifyInfo']
  },
  S: {
    bigIdea: 'AI becomes valuable when it turns into skills you can practice.',
    explanation: 'Skills are what separate passive watching from real progress. Prompting, summarizing, organizing, and idea generation all get better with repetition.',
    actionStep: 'Practice one skill 3 times today: summarize, brainstorm, or rewrite.',
    cta: 'Comment SKILLS with the skill you’re building.',
    caption: 'Build skills, not just opinions about AI.',
    hashtags: ['MajorAIMindset', 'SkillsFirst', 'AITraining', 'HandOnLearning', 'PracticeNow']
  },
  T: {
    bigIdea: 'AI should give you time back for higher-value work.',
    explanation: 'Saved time only matters if you use it well. The point is not to fill every spare minute with more busywork; it is to create room to think, build, and rest.',
    actionStep: 'Use AI on one repetitive task and spend the saved minutes on something creative.',
    cta: 'Comment TIME if AI helped you reclaim even 5 minutes.',
    caption: 'Time is one of the best returns AI can give you.',
    hashtags: ['MajorAIMindset', 'TimeBack', 'ProductivitySystem', 'StrategicTime', 'CreativeFreedom']
  },
  U: {
    bigIdea: 'You should know what AI can do and where it can fail.',
    explanation: 'Beginners do better when they understand both strengths and limits. AI is useful for drafts, options, summaries, and structure, but weak on unchecked facts and real-world judgment.',
    actionStep: 'Make two lists: “AI helps me with…” and “I still need to verify…”',
    cta: 'Comment UNDERSTAND if that list changed how you’ll use AI.',
    caption: 'Use AI with clear eyes. Know the strengths and the limits.',
    hashtags: ['MajorAIMindset', 'AILimits', 'AIEducation', 'SmartLearning', 'ClarityFirst']
  },
  V: {
    bigIdea: 'AI works best when it serves a clear goal.',
    explanation: 'Without a vision, AI becomes random novelty. With a vision, it becomes support for something meaningful you are trying to build.',
    actionStep: 'Ask: “How can AI help me move one step closer to my goal this week?”',
    cta: 'Comment VISION with the goal AI will support.',
    caption: 'Clarity first. Tools second. Vision leads the tech.',
    hashtags: ['MajorAIMindset', 'AIVision', 'PurposeDriven', 'ClearFocus', 'StrategyFirst']
  },
  W: {
    bigIdea: 'Wisdom is knowing when to use AI and when not to.',
    explanation: 'Information is easy to generate; judgment about relevance, timing, and consequence is harder. Wisdom protects quality, trust, and relationships.',
    actionStep: 'Take one AI answer and decide: use it, edit it, or reject it.',
    cta: 'Comment WISDOM with the choice you made.',
    caption: 'AI can generate information. Wisdom decides what belongs.',
    hashtags: ['MajorAIMindset', 'WisdomPath', 'HumanEdge', 'JudgmentCall', 'RealConnection']
  },
  X: {
    bigIdea: 'Ideas matter only when they turn into action.',
    explanation: 'Lots of people consume AI content and never use it. Execution is the bridge between inspiration and real change.',
    actionStep: 'Ship one tiny output today: a caption, email, plan, checklist, or summary.',
    cta: 'Comment EXECUTE once you publish or finish something.',
    caption: 'AI ideas are cheap. Action is the multiplier.',
    hashtags: ['MajorAIMindset', 'AIExecution', 'StartBuilding', 'ShipFaster', 'RealResults']
  },
  Y: {
    bigIdea: 'Your story, taste, and experience are still your edge.',
    explanation: 'AI can help you structure, draft, and accelerate, but it cannot replace your lived perspective. Your uniqueness is not the thing to remove; it is the thing to sharpen.',
    actionStep: 'Ask AI to help express one personal story more clearly in your own voice.',
    cta: 'Comment YOU if you used AI without losing yourself.',
    caption: 'AI can support your voice. It should not erase it.',
    hashtags: ['MajorAIMindset', 'YouAreTheGrit', 'AuthenticSelf', 'CreativeVoice', 'GroundedWork']
  },
  Z: {
    bigIdea: 'You can start with what you have right now.',
    explanation: 'You do not need a perfect setup, deep budget, or technical background to begin. Progress starts when excuses stop running the schedule.',
    actionStep: 'Spend 5 minutes using one AI tool before today ends.',
    cta: 'Comment ZERO EXCUSES when you take your first step.',
    caption: 'Start before you feel ready. Five minutes is enough to begin.',
    hashtags: ['MajorAIMindset', 'ZeroExcuses', 'InitiateToday', 'StartSmart', 'LearnByDoing']
  }
};

// Generates scalable Medium and Expert level content dynamically based on standard scaling patterns
// But customizes exact text parameters for key letters (like A, H, P, R, T, Z) to fit the guidelines.
export function generateCurriculumItem(letter: string, level: Level, initialStatus: LStatus = 'Idea'): LessonContent {
  const conceptObj = ALL_CONCEPTS_LIST.find(c => c.letter === letter) || { letter, concept: 'Concept' };
  const base = BEGINNER_SEEDS[letter] || {
    bigIdea: `AI gives deep solutions for ${conceptObj.concept}.`,
    explanation: `Understanding the concept of ${conceptObj.concept} accelerates your AI performance.`,
    actionStep: `Spend 5 minutes with AI outlining your ${conceptObj.concept} requirements.`,
    cta: `Comment ${letter} if you did this step.`,
    caption: `${conceptObj.concept} is key to proper AI utilization.`,
    hashtags: ['MajorAIMindset', `${conceptObj.concept}`]
  };

  const status = initialStatus;

  // Let's customize specific letter scaled data
  if (level === 'Beginner') {
    return {
      letter,
      concept: conceptObj.concept,
      level: 'Beginner',
      title: `${letter} is for ${conceptObj.concept}`,
      bigIdea: base.bigIdea || '',
      explanation: base.explanation || '',
      actionStep: base.actionStep || '',
      cta: base.cta || '',
      caption: base.caption || '',
      hashtags: base.hashtags || [],
      reelScript: `[Hook on screen: ${letter} = ${conceptObj.concept}]\n\n“Most people start AI the wrong way. They ask, 'What tool should I use?' Let's start here instead with ${conceptObj.concept}. Where are you stuck on this? Is there a repetitive task? Take five minutes, do not download ten apps. Just write down three items you do all the time and focus AI on one of them. That is ${letter} for ${conceptObj.concept}. Comment '${base.cta?.split(' ')[1] || letter}' and I'll send you one beginner use case.”`,
      carouselSlides: [
        `Badge: ${letter} = ${conceptObj.concept}`,
        `Slide 2: A lot of people avoid AI because they think it's too technical.`,
        `Slide 3: But real AI begins with clear thoughts in plain, human language.`,
        `Slide 4: ${base.bigIdea}`,
        `Slide 5: ${base.explanation}`,
        `Slide 6 (5-Min Action): ${base.actionStep}. Comment ${base.cta?.split(' ')[1] || 'YES'} if you tried it!`
      ],
      podcastAngle: `Why standard introductions to AI fail by skipping ${conceptObj.concept}. Let's discuss practical first-time setups and clear cognitive blocks that delay learners.`,
      notebookLmPrompt: `Create a 10-minute conversational podcast episode exploring the concept "${conceptObj.concept}" in our Beginner A-Z Major AI Mindset curriculum. Detail the core thesis: "${base.bigIdea}", simple real-world comparisons, and lead viewers to attempt the 5-minute exercise: "${base.actionStep}". Keep the tone warm, grounded, and non-patronizing.`,
      omniVideoPrompt: `Cinematic wide angle, dark editorial Balinese studio workspace with ambient candle flame, warm gold highlights reflecting off premium minimalist timber desktop. Side profile of an elegant content creator in deep focus writing plans. Restrained camera panning.`,
      thumbnailPrompt: `Close up, high contrast cinematic frame of a glowing orange letter "${letter}" on an ivory key, dark brushed metallic background, sleek neon highlights, 8k resolution, photorealistic.`,
      visualMotif: `Minimalist outline of a seed or spark, soft orange glow on raw concrete texture.`,
      status
    };
  } else if (level === 'Medium') {
    // Medium Tier Customizations for scaling
    let bigIdea = `Optimize and group repetitive tasks using ${conceptObj.concept} workflows.`;
    let explanation = `Turn isolated AI actions into structured, repeatable habits. Medium tier combines text drafting, calendars, and templates to validate output more intentionally.`;
    let actionStep = `Map out your weekly repetitive workflows and design a prompt chain of 3 steps to automate them.`;
    let cta = `Comment AUDIT to receive our multi-step workflow planner.`;
    let caption = `You can improve this. Move from single prompts to structured system workflows.`;

    if (letter === 'A') {
      bigIdea = 'Map, measure, and audit your repetitive activities.';
      explanation = 'Move past basic awareness of AI features. An Awareness Audit maps out your exact daily tasks to pinpoint high-friction steps that consume 80% of your calendar.';
      actionStep: actionStep = 'Conduct a 15-minute task-mapping audit: define manual steps and identify the main bottle-neck suitable for a 3-step prompt chain.';
      cta = 'Comment AUDIT to get the step-by-step audit framework.';
      caption = 'Understand where you are leaking hours. Optimize your personal loop first.';
    } else if (letter === 'H') {
      bigIdea = 'Implement smart workflow checks using human-in-the-loop validation.';
      explanation = 'AI acts as your accelerator, but you remain the editor. Workflow designs must declare explicit human checkpoints to catch hallucinated facts and refine brand tone.';
      actionStep = 'Take a long AI draft and run a 3-point human-in-the-loop review: accuracy, personality alignment, and source check.';
      cta = 'Comment REVIEW for the 3-step brand voice template.';
    } else if (letter === 'P') {
      bigIdea = 'Chain multiple prompts to handle sophisticated multi-stage tasks.';
      explanation = 'Single prompts hit cognitive ceilings. Chaining means taking the output of prompt A (e.g. brainstorming) and feeding it as context into prompt B (e.g. detailed outline) for high precision.';
      actionStep = 'Write a 2-stage prompt sequence where Step 1 extracts keywords and Step 2 writes an educational summary based on those keys.';
      cta = 'Comment CHAIN to download our 5 most popular template sequences.';
    } else if (letter === 'R') {
      bigIdea = 'Set up clean guidelines for privacy hygiene and data attribution.';
      explanation = 'Responsible AI requires intentional boundaries. Verify content sources, maintain client confidentiality offline, and flag synthetic outputs for high audience trust.';
      actionStep = 'Review your browser tools and ensure all customer identifiers are anonymized before any prompt engine submission.';
      cta = 'Comment SAFEKIT for our essential compliance checklist.';
    } else if (letter === 'T') {
      bigIdea = 'Schedule designated time blocks for dynamic AI task execution.';
      explanation = 'Chop chaotic multi-tasking. Group your repetitive creations into 45-minute AI-assisted deep work blocks to realize high cognitive throughput.';
      actionStep = 'Block out one uninterrupted 30-minute workspace session tomorrow dedicated purely to co-authoring with AI.';
      cta = 'Comment TIMEMODEL to review our calendar template.';
    } else if (letter === 'Z') {
      bigIdea = 'Clear out technical friction and eliminate startup inertia.';
      explanation = 'Friction is the ultimate progress killer. Organize your bookmark drawers, save your active prompting frames, and configure text replacements to start immediately.';
      actionStep = 'Create 3 keyboard shortcuts or saved snippets containing your most used context modules.';
      cta = 'Comment COMPACT for our personal workflow speed-run cheat sheet.';
    }

    return {
      letter,
      concept: conceptObj.concept,
      level: 'Medium',
      title: `${letter} in Workflow: ${conceptObj.concept}`,
      bigIdea,
      explanation,
      actionStep,
      cta,
      caption,
      hashtags: ['MajorAIMindset', 'WorkflowDesign', `${conceptObj.concept}AI`, 'ProcessImprovement', 'BuilderTiers'],
      reelScript: `[Hook on screen: ${letter} is for ${conceptObj.concept} Workflows]\n\n“Stop writing single prompts. To turn AI into a habit, you need workflow design. At the Medium tier, we take ${conceptObj.concept} and build structured systems. Watch this comparison: instead of saying 'Write an email', we supply historical drafts, instruct the exact voice traits, and demand multiple options before choosing. Try this 10-minute upgrade today. Comment '${cta.split(' ')[1]}' to get our active templates.”`,
      carouselSlides: [
        `badge: Medium Tier - Workflow Build`,
        `Slide 2: ${letter} is for ${conceptObj.concept} in Workflows`,
        `Slide 3: One-off prompts are volatile and inconsistent. To build habits, we systematize.`,
        `Slide 4: Thesis: ${bigIdea}`,
        `Slide 5: Audit: ${explanation}`,
        `Slide 6 (15-Min Action): ${actionStep}. Comment ${cta.split(' ')[1]} below to access.`
      ],
      podcastAngle: `Moving from random prompt toys to highly integrated workflows. Let's discuss how practitioners map repetitive operations and keep humans as active quality filters.`,
      notebookLmPrompt: `Create an advanced workflow training podcast for "${conceptObj.concept}" at Medium Level. Explain how to transition from casual prompts to connected chains. Walk through the workflow transformation: "${bigIdea}" and outline the exact steps of "${actionStep}" for a professional team.`,
      omniVideoPrompt: `Over-the-shoulder digital camera style, sleek dark grey studio monitors showing code and text flows, rich code editor split panels, soft blue accent glow under elegant keyboard. Cool, calculated focus.`,
      thumbnailPrompt: `Minimalist blueprint graphic layout highlighting step-by-step nodes of letter "${letter}", neon blue wires, dark concrete block texture, clean geometric details.`,
      visualMotif: `Chained boxes with direction arrows, glowing intense electric blue lines.`,
      status
    };
  } else {
    // Expert Tier Customizations for scaling
    let bigIdea = `Govern large systems, manage model tradeoffs, and scale return on capital.`;
    let explanation = `The Expert tier is for builders, operators, and strategists. It concerns systems thinking, model fine-tuning, cross-functional risk evaluation, and architectural KPI models.`;
    let actionStep = `Formulate an enterprise-level risk and scalability playbook mapping tool governance against your cost structures.`;
    let cta = `Comment PLAYBOOK to unlock our enterprise architecture schema.`;
    let caption = `You can systematize this. Move from team workflows to scalable organizational frameworks.`;

    if (letter === 'A') {
      bigIdea = 'Synthesize AI opportunities across function, margin target, and strategic risk.';
      explanation = 'True organizational leverage maps business systems into explicit segments. Score high-frequency tasks on margin contribution and risk profile to direct engineering capital effectively.';
      actionStep = 'Conduct a 1-page business assessment scoring operations on: direct dollar margin, compliance risk, and implementation speed.';
      cta = 'Comment PLAYBOOK to get our portfolio prioritization matrix.';
      caption = 'Prioritize strategic outcomes rather than chasing generic technological hype.';
    } else if (letter === 'H') {
      bigIdea = 'Establish deep system override logic and secure escalation paths.';
      explanation = 'Autonomous pipelines must have explicit containment failsafes. Program hard-coded guardrails, real-time log reviews, and precise handoffs back to senior humans when risk anomalies spike.';
      actionStep = 'Draft an escalation flowchart defining the precise data and security conditions that trigger human containment overrides.';
      cta = 'Comment PROTOCOL to access the fail-safe framework paper.';
    } else if (letter === 'P') {
      bigIdea = 'Engineer robust prompt architectures with automated QA and validation protocols.';
      explanation = 'Production pipelines require reproducible prompt frameworks. Package strict JSON schemas, unit test outputs against compliance targets, and optimize execution token cost.';
      actionStep = 'Draft a clean JSON-Schema structure setting rigid fields, types, and length rules for an automated prompt engine output.';
      cta = 'Comment DESIGN to download our testing harness templates.';
    } else if (letter === 'R') {
      bigIdea = 'Create a secure enterprise risk register for systemic AI safety and compliance.';
      explanation = 'Governance means protecting brand capital. Design detailed compliance matrix sheets mapping regional data regulations, IP protection limits, and adversarial threat models.';
      actionStep = 'Build a 3×3 risk matrix charting likelihood against severity for model-hallucinated customer support responses.';
      cta = 'Comment REGULATE for our complete sovereign risk templates.';
    } else if (letter === 'T') {
      bigIdea = 'Establish precise metrics for business time-to-value and actual developer scale.';
      explanation = 'Measure what counts. track direct development speed-ups, automated request coverage ratios, and true capital utilization metrics to support tech investments.';
      actionStep: actionStep = 'Outline your team’s weekly product metrics and calculate cost savings using a 60% operational reduction target.';
      cta = 'Comment VELOCITY to receive our financial math formulation.';
    } else if (letter === 'Z') {
      bigIdea = 'Systematize strict quality standards to eliminate performance drift.';
      explanation = 'Scale breeds variance. Build programmatic semantic monitoring and real-time validation layers to catch degrading output quality and hold suppliers accountable.';
      actionStep = 'Outline a scheduled weekly inspection process mapping system accuracy against base human gold standards.';
      cta = 'Comment DRIFT for our automated schema tracking guidebook.';
    }

    return {
      letter,
      concept: conceptObj.concept,
      level: 'Expert',
      title: `System Strategy: ${conceptObj.concept}`,
      bigIdea,
      explanation,
      actionStep,
      cta,
      caption,
      hashtags: ['MajorAIMindset', 'SystemsThinking', 'EnterpriseStrategy', 'AIGovernance', 'ROIModeling'],
      reelScript: `[Hook on screen: Systems Strategy for ${conceptObj.concept}]\n\n“Workflows are great, but systems run the business. At the Expert tier, we construct robust architectures for ${conceptObj.concept}. We don’t just train teams; we install automated guardrails, verify model metrics, optimize api token costs, and govern our data compliance. If you are a founder or executive looking to systematize, comment '${cta.split(' ')[1]}' to review our multi-million dollar tech stack playbook.”`,
      carouselSlides: [
        `badge: Expert Tier - Systems Strategy`,
        `Slide 2: ${letter} is for ${conceptObj.concept} at Scale`,
        `Slide 3: Scaled output requires robust, programmatic guardrails and ROI alignment.`,
        `Slide 4: Enterprise Strategy: ${bigIdea}`,
        `Slide 5: Governance Stack: ${explanation}`,
        `Slide 6 (Architectural Task): ${actionStep}. Comment ${cta.split(' ')[1]} for full access.`
      ],
      podcastAngle: `How modern chief technology officers and founders scale corporate intelligence, govern model drift, and protect bottom line margin.`,
      notebookLmPrompt: `Create an executive-level strategic whiteboarding podcast on "${conceptObj.concept}" at Expert Level. Detail the organizational strategy: "${bigIdea}". Discuss security governance, API cost reductions, and actionable evaluation frameworks as defined in "${actionStep}". Maintain a polished, high-status, expert tone.`,
      omniVideoPrompt: `Elegant dim lighting, brutalist concrete wall office with a dark oak table, a high-contrast glowing architectural hologram schematics, minimal warm gold spotlight casting soft dramatic shadows. Pristine, high-status.`,
      thumbnailPrompt: `Abstract structural grid with an orange and blue split laser letter "${letter}" emerging from laser-cut metal plates, luxury dark concrete background, futuristic precision.`,
      visualMotif: `Interlocked hexagon lattices and twin custom division lines. High-contrast orange and blue split.`,
      status
    };
  }
}

// Full array helper to load or generate custom lessons
export function getFullCurriculum(statuses: Record<string, LStatus> = {}): LessonContent[] {
  const result: LessonContent[] = [];
  for (const item of ALL_CONCEPTS_LIST) {
    const savedStatus = statuses[`${item.letter}_Beginner`] || 'Idea';
    result.push(generateCurriculumItem(item.letter, 'Beginner', savedStatus));
  }
  return result;
}

export const WORKFLOW_COLUMNS: LStatus[] = [
  'Idea',
  'Drafted',
  'Designed',
  'Recorded',
  'Edited',
  'Scheduled',
  'Published'
];

export const WORKFLOW_COLUMN_DETAILS: Record<LStatus, { name: string; color: string; desc: string }> = {
  Idea: { name: 'Idea', color: 'border-zinc-700 bg-zinc-900 text-zinc-400', desc: 'Concept mapped' },
  Drafted: { name: 'Drafted', color: 'border-amber-900 bg-amber-950/20 text-amber-400', desc: 'Script & copy ready' },
  Designed: { name: 'Designed', color: 'border-blue-900 bg-blue-950/20 text-blue-400', desc: 'Visual assets designed' },
  Recorded: { name: 'Recorded', color: 'border-indigo-900 bg-indigo-950/20 text-indigo-400', desc: 'Video clips filmed' },
  Edited: { name: 'Edited', color: 'border-purple-900 bg-purple-950/20 text-purple-400', desc: 'Lower thirds added' },
  Scheduled: { name: 'Scheduled', color: 'border-teal-900 bg-teal-950/20 text-teal-400', desc: 'Queued on scheduler' },
  Published: { name: 'Published', color: 'border-emerald-900 bg-emerald-950/20 text-emerald-400', desc: 'Live on channels' }
};

export const INITIAL_STATUSES: Record<string, LStatus> = {
  'A_Beginner': 'Published',
  'B_Beginner': 'Scheduled',
  'C_Beginner': 'Edited',
  'D_Beginner': 'Recorded',
  'E_Beginner': 'Designed',
  'F_Beginner': 'Drafted',
  'G_Beginner': 'Idea',
  'H_Beginner': 'Published',
  'I_Beginner': 'Drafted',
  'J_Beginner': 'Idea',
  'K_Beginner': 'Idea',
  'L_Beginner': 'Idea',
  'M_Beginner': 'Idea',
  'N_Beginner': 'Idea',
  'O_Beginner': 'Idea',
  'P_Beginner': 'Drafted',
  'Q_Beginner': 'Idea',
  'R_Beginner': 'Idea',
  'S_Beginner': 'Idea',
  'T_Beginner': 'Idea',
  'U_Beginner': 'Idea',
  'V_Beginner': 'Idea',
  'W_Beginner': 'Idea',
  'X_Beginner': 'Idea',
  'Y_Beginner': 'Idea',
  'Z_Beginner': 'Idea'
};
