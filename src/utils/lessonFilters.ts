import type { Lesson, LessonLevel, LessonStatus, Platform } from "../types/lesson";

/**
 * Filter lessons by level.
 */
export function filterByLevel(lessons: Lesson[], level: LessonLevel): Lesson[] {
  return lessons.filter((l) => l.level === level);
}

/**
 * Filter lessons by letter (case-insensitive).
 */
export function filterByLetter(lessons: Lesson[], letter: string): Lesson[] {
  return lessons.filter((l) => l.letter.toUpperCase() === letter.toUpperCase());
}

/**
 * Filter lessons by status.
 */
export function filterByStatus(lessons: Lesson[], status: LessonStatus): Lesson[] {
  return lessons.filter((l) => l.status === status);
}

/**
 * Filter lessons by platform (published or targeted).
 */
export function filterByPlatform(lessons: Lesson[], platform: Platform): Lesson[] {
  return lessons.filter((l) => l.exportMeta.publishedPlatforms.includes(platform));
}

/**
 * Filter lessons that are ready to export (all export fields populated).
 */
export function filterExportReady(lessons: Lesson[]): Lesson[] {
  return lessons.filter(
    (l) =>
      l.exportMeta.reelScript &&
      l.exportMeta.carouselCopy &&
      l.exportMeta.notebookLMPrompt &&
      l.exportMeta.googleOmniPrompt
  );
}

/**
 * Compose multiple filters. Accepts a partial filter config.
 */
export function filterLessons(
  lessons: Lesson[],
  filters: {
    level?: LessonLevel;
    letter?: string;
    status?: LessonStatus;
    platform?: Platform;
    exportReadyOnly?: boolean;
  }
): Lesson[] {
  let result = lessons;
  if (filters.level) result = filterByLevel(result, filters.level);
  if (filters.letter) result = filterByLetter(result, filters.letter);
  if (filters.status) result = filterByStatus(result, filters.status);
  if (filters.platform) result = filterByPlatform(result, filters.platform);
  if (filters.exportReadyOnly) result = filterExportReady(result);
  return result;
}
