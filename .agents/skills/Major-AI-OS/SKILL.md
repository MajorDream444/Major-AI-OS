```markdown
# Major-AI-OS Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the Major-AI-OS TypeScript codebase. You'll learn how to structure files, write and organize code, follow commit conventions, and implement tests according to the repository's standards. This guide is ideal for contributors aiming for consistency and maintainability in a non-framework TypeScript project.

## Coding Conventions

### File Naming
- Use **camelCase** for all file names.
  - Example: `userProfile.ts`, `dataFetcher.test.ts`

### Imports
- Use **relative imports** for referencing modules within the project.
  - Example:
    ```typescript
    import { fetchData } from './dataFetcher';
    ```

### Exports
- Use **named exports** exclusively.
  - Example:
    ```typescript
    // Good
    export const fetchData = () => { /* ... */ };

    // Avoid default exports
    // export default fetchData;
    ```

### Commit Messages
- Follow the **Conventional Commits** standard.
- Use the `feat` prefix for new features.
- Keep commit messages concise (average ~47 characters).
  - Example:
    ```
    feat: add user authentication module
    ```

## Workflows

### Adding a New Feature
**Trigger:** When implementing a new feature or module  
**Command:** `/add-feature`

1. Create a new TypeScript file using camelCase naming.
2. Write your code using named exports.
3. Use relative imports for any dependencies.
4. Add corresponding test files using the `.test.` pattern.
5. Commit your changes using the `feat:` prefix and a concise description.

### Writing Tests
**Trigger:** When adding or updating functionality  
**Command:** `/write-test`

1. Create a test file named with the `.test.` pattern (e.g., `featureName.test.ts`).
2. Implement test cases for your module or function.
3. Ensure tests are discoverable by the test runner.

### Making a Commit
**Trigger:** When saving changes to the repository  
**Command:** `/commit-changes`

1. Stage your changes.
2. Write a commit message following the Conventional Commits format, using `feat:` for features.
3. Keep the message clear and under 50 characters if possible.

## Testing Patterns

- Test files are named using the `*.test.*` pattern (e.g., `dataFetcher.test.ts`).
- The specific testing framework is not detected; follow the existing test file structure.
- Place test files alongside the modules they test or in a dedicated test directory as per project organization.

## Commands
| Command         | Purpose                                    |
|-----------------|--------------------------------------------|
| /add-feature    | Start the workflow for adding a new feature|
| /write-test     | Create and implement new test cases        |
| /commit-changes | Commit changes following conventions       |
```
