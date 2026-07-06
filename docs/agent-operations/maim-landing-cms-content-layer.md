# MAIM Landing CMS Content Layer

Status: Phase 2 system contract
Primary surface: MAIM Command Room landing page

## Purpose

Move landing-page content out of React components so the website can change through content edits instead of code redeploys.

The app now reads a runtime JSON content document. In local/dev mode it falls back to:

```txt
experiments/landing-pages/google-ai-studio/maim-mission-control-vite/public/cms/maim-command-room-content.json
```

In production, set:

```txt
VITE_MAIM_CMS_CONTENT_URL
```

to a public JSON endpoint backed by Airtable or Notion.

## Content Moved Out Of Components

```txt
nextSession
FAQ
Rhythm
Facts
Meet Major copy
Schedule
ABC cards
```

## Recommended CMS Shape

Use Airtable first for the structured production source.

Recommended Airtable table:

```txt
Landing Content Documents
```

Fields:

```txt
slug
status
json
updated_at
approved_by
notes
```

Recommended active record:

```txt
slug = maim-command-room
status = published
json = full landing content JSON
```

Notion can mirror editorial review, but Airtable is better for the structured `json` document and production status.

## Runtime Flow

```txt
Airtable / Notion
-> Apps Script CMS proxy
-> public JSON endpoint
-> Vite landing page
-> local JSON fallback if endpoint is unavailable
```

Do not call Airtable or Notion directly from the browser. API tokens must stay in server-side properties.

## App Contract

The Vite app expects this shape:

```txt
schedule
facts
rhythm
meetMajor
faq
abc
```

Type contract:

```txt
experiments/landing-pages/google-ai-studio/maim-mission-control-vite/src/content/types.ts
```

Runtime loader:

```txt
experiments/landing-pages/google-ai-studio/maim-mission-control-vite/src/content/useLandingContent.ts
```

## Environment Variable

For Vercel or Netlify:

```txt
VITE_MAIM_CMS_CONTENT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?slug=maim-command-room
```

This is a public content endpoint, not a secret.

## Editing Workflow

1. Edit the published content record in Airtable.
2. Keep the JSON valid.
3. Refresh the landing page.
4. No Vite redeploy is required.

## Acceptance Criteria

This layer is ready when:

- The landing page renders from CMS JSON.
- The local fallback renders if the CMS endpoint is missing.
- No Airtable or Notion secrets are exposed to browser code.
- `nextSession`, FAQ, Rhythm, Facts, Meet Major copy, Schedule, and ABC cards are no longer hardcoded in components.
- The production CMS endpoint can be changed with `VITE_MAIM_CMS_CONTENT_URL`.
- The content schema is documented and validated before deploy.
