```markdown
# Major-AI-OS Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill provides a comprehensive guide to the development patterns and workflows used in the Major-AI-OS repository. The codebase is written in TypeScript and follows consistent conventions for file naming, imports, and exports. The repository emphasizes modularity and clarity, with structured workflows for adding new experiment landing pages and maintaining documentation.

## Coding Conventions

### File Naming
- **Style:** kebab-case
- **Example:**  
  ```
  user-profile.ts
  experiment-utils.ts
  ```

### Import Style
- **Relative imports are used throughout the codebase.**
- **Example:**
  ```typescript
  import { getExperimentData } from './experiment-utils';
  ```

### Export Style
- **Named exports are preferred.**
- **Example:**
  ```typescript
  // experiment-utils.ts
  export function getExperimentData() { /* ... */ }
  ```

### Commit Patterns
- **Freeform commit messages**
- **No strict prefixes**
- **Average length:** ~45 characters

## Workflows

### Add New Experiment Landing Page
**Trigger:** When starting a new landing page experiment (e.g., for MAIM gravity well).  
**Command:** `/new-experiment-landing-page`

1. **Create a new directory** under `experiments/landing-pages/<experiment-name>/`
2. **Add `README.md`** with a brief description of the experiment.
3. **Add `decision-notes.md`** to document key decisions.
4. **Add `performance-checklist.md`** to track performance criteria.
5. **Add `index.html`** as the prototype or main file for the landing page.
6. **Add `pro-max-uiux-review.md`** for UI/UX review notes.

**Example Directory Structure:**
```
experiments/
  landing-pages/
    gravity-well/
      README.md
      decision-notes.md
      performance-checklist.md
      index.html
      pro-max-uiux-review.md
```

## Testing Patterns

- **Testing framework:** Unknown (not detected)
- **Test file pattern:** Files named with `.test.` in the filename.
- **Example:**
  ```
  experiment-utils.test.ts
  ```

## Commands

| Command                        | Purpose                                                      |
|--------------------------------|--------------------------------------------------------------|
| /new-experiment-landing-page   | Scaffold a new experiment landing page with documentation     |
```
