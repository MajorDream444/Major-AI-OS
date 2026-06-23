# Google AI Studio Prototype Source Archive

This folder stores the Google AI Studio prototype source as base64 chunks because the available GitHub connector can only write UTF-8 text files, not binary ZIP uploads.

## Rebuild the ZIP

From the repo root:

```bash
cat archives/google-ai-studio/prototype-source/parts/*.b64 > /tmp/google-ai-studio-prototype-source.zip.base64
base64 -d /tmp/google-ai-studio-prototype-source.zip.base64 > /tmp/google-ai-studio-prototype-source.zip
unzip /tmp/google-ai-studio-prototype-source.zip -d /tmp/maim-google-ai-studio
```

Then copy the extracted folder into:

```txt
apps/google-ai-studio-prototype/
```

## Source Structure Inside ZIP

```txt
google-ai-studio-prototype/
  index.html
  metadata.json
  package.json
  README.md
  tsconfig.json
  vite.config.ts
  src/
    App.tsx
    data.ts
    index.css
    main.tsx
    types.ts
    components/
      AbcLibrary.tsx
      AuraHeader.tsx
      BusinessPressureTest.tsx
      ContentGenerator.tsx
      HeroStatsCards.tsx
      LessonDetailPane.tsx
      PodcastBuilder.tsx
      SparkLabVault.tsx
      VideoPromptBuilder.tsx
```

## Doctrine

This is an archived prototype layer. It does not override the canonical MAIM repo docs.

Use `references/google-ai-studio/import-manifest.md` before merging anything into production.
