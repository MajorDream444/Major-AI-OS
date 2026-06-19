import type { Lesson, Platform } from "../types/lesson";

/**
 * Export a formatted reel script for a lesson.
 * Use as input for HeyGen / video generation workflows.
 */
export function exportReelScript(lesson: Lesson): string {
  const { letter, concept, title, content, level } = lesson;
  const script = content.reelScript ?? `[REEL SCRIPT PENDING — ${title}]`;
  return [
    `=== REEL SCRIPT ===`,
    `Letter: ${letter} — ${concept}`,
    `Level: ${level.toUpperCase()}`,
    `Title: ${title}`,
    ``,
    script,
    ``,
    `CTA: ${content.cta}`,
    `===================`,
  ].join("\n");
}

/**
 * Export carousel slides copy for a lesson.
 * Use as input for Canva / social design tools.
 */
export function exportCarouselCopy(lesson: Lesson): string {
  const { letter, concept, title, content, level } = lesson;
  const slides = content.carouselCopy ?? [`[CAROUSEL COPY PENDING — ${title}]`];
  const slideLines = slides.map((slide, i) => `Slide ${i + 1}: ${slide}`);
  return [
    `=== CAROUSEL COPY ===`,
    `Letter: ${letter} — ${concept}`,
    `Level: ${level.toUpperCase()}`,
    ``,
    ...slideLines,
    ``,
    `CTA Slide: ${content.cta}`,
    `=====================`,
  ].join("\n");
}

/**
 * Export a NotebookLM source prompt for a lesson.
 * Paste this as a source document in NotebookLM for research synthesis.
 */
export function exportNotebookLMPrompt(lesson: Lesson): string {
  const { letter, concept, title, content, level } = lesson;
  const prompt =
    content.notebookLMPrompt ??
    `[NOTEBOOKLM PROMPT PENDING — ${title}]\n\nBig Idea: ${content.bigIdea}\n\n${content.explanation}`;
  return [
    `=== NOTEBOOKLM SOURCE PROMPT ===`,
    `Title: ${title}`,
    `Letter: ${letter} | Concept: ${concept} | Level: ${level}`,
    ``,
    prompt,
    ``,
    `5-Minute Action: ${content.fiveMinuteAction}`,
    `================================`,
  ].join("\n");
}

/**
 * Export a Google Gemini / Omni prompt for a lesson.
 * Use for AI content generation and multimodal expansion workflows.
 */
export function exportGoogleOmniPrompt(lesson: Lesson): string {
  const { letter, concept, title, content, level } = lesson;
  const prompt =
    content.googleOmniPrompt ??
    `Generate a comprehensive educational breakdown for the following AI mindset lesson:\n\nTitle: ${title}\nLevel: ${level}\nBig Idea: ${content.bigIdea}\n\nInclude: explanation for beginners, real-world use case, and 3 action steps.`;
  return [
    `=== GOOGLE OMNI PROMPT ===`,
    `Lesson: ${title}`,
    `Letter: ${letter} | Concept: ${concept} | Level: ${level}`,
    ``,
    prompt,
    `==========================`,
  ].join("\n");
}

/**
 * Export a platform-specific caption for social posting.
 */
export function exportPlatformCaption(lesson: Lesson, platform: Platform): string {
  const { letter, concept, title, content, tags } = lesson;
  const hashtags = tags.map((t) => `#${t.replace(/\s+/g, "")}`).join(" ");

  const baseCaption = [
    `${letter} is for ${concept} 🧠`,
    ``,
    content.bigIdea,
    ``,
    content.fiveMinuteAction,
    ``,
    content.cta,
  ].join("\n");

  const platformSuffix: Partial<Record<Platform, string>> = {
    instagram: `\n\n${hashtags}`,
    tiktok: `\n\n${hashtags}`,
    linkedin: `\n\n#AILiteracy #MajorAIMindset #ABCStudio`,
    youtube: `\n\nFull lesson series: Major AI Mindset ABC Studio\n\n${hashtags}`,
    podcast: `\n\n[Show Notes] Major AI Mindset ABC Studio — ${title}`,
    newsletter: `\n\nRead the full breakdown in the Major AI Mindset newsletter.`,
  };

  return [
    `=== ${platform.toUpperCase()} CAPTION ===`,
    `Lesson: ${title}`,
    ``,
    baseCaption + (platformSuffix[platform] ?? ""),
    `${"=".repeat(28 + platform.length)}`,
  ].join("\n");
}
