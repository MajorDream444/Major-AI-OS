/**
 * Central lesson registry. Import all lessons here so filter utilities
 * and UI components can consume a single array.
 *
 * To add a new lesson:
 * 1. Create src/data/lessons/<letter>-<concept>.ts
 * 2. Export a const that satisfies the Lesson type
 * 3. Import it here and add it to the allLessons array
 */

import { lessonAwareness } from "./A-awareness";
import { lessonBelief } from "./B-belief";
import { lessonContext } from "./C-context";
import { lessonDirection } from "./D-direction";
import { lessonExperiment } from "./E-experiment";
import type { Lesson } from "../../types/lesson";

export const allLessons: Lesson[] = [
  lessonAwareness,
  lessonBelief,
  lessonContext,
  lessonDirection,
  lessonExperiment,
  // F-Z lessons go here as they are created
];

export {
  lessonAwareness,
  lessonBelief,
  lessonContext,
  lessonDirection,
  lessonExperiment,
};
