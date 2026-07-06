# MAIM Mission Control Vite Prototype

Status: cleaned import
Source: Google AI Studio export
Location: experiments/landing-pages/google-ai-studio/maim-mission-control-vite

## Purpose

This is the cleaned Vite and React prototype for the Major AI Mindset Mission Control landing page.

It keeps the strongest direction from Google AI Studio while removing the broken local image dependency and adding the missing RhythmSection component.

## What changed from the raw export

The package name was changed from `react-example` to `maim-mission-control-ai-studio`.

Unused server and Gemini dependencies were removed for the landing page prototype.

The missing RhythmSection component was added.

The hero uses a CSS portal fallback instead of an uncommitted local image asset.

The registration form is wired to the MAIM Google Apps Script webhook with the Google Form as backup.

## Run locally

```bash
npm install
npm run lint
npm run build
npm run dev
```

## Signup engine

Primary webhook:

```txt
https://script.google.com/a/macros/hanzo.ai/s/AKfycbxpxqKd_unYrHyen2cpxAU85_H4oEU_76Ck4wn2Wpf_rHq2XSl4kOVqpWTEJ0bUZis6/exec
```

Backup form:

```txt
https://forms.gle/RdSX2R6dyRJLqjkk7
```

Phase 2 onboarding engine contract:

```txt
docs/agent-operations/maim-registration-onboarding-engine.md
```

Starter Apps Script module:

```txt
apps/maim-registration-onboarding-engine/
```

Agent personalization map:

```txt
data/agents/maim-agent-routing.json
```

Runtime CMS content fallback:

```txt
public/cms/maim-command-room-content.json
```

Production CMS endpoint:

```txt
VITE_MAIM_CMS_CONTENT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?slug=maim-command-room
```

Target pipeline:

```txt
Landing Page
-> Google Apps Script
-> Google Sheet
-> Airtable
-> Welcome Email
-> Calendar Invite
-> ManyChat
-> CRM
```

## Next pass

Run local QA.

Test the webhook from the deployed environment.

Install and test the Apps Script intake module from the Phase 2 onboarding engine contract.

Add the approved Major portrait and logo assets.

Add deployment notes for Netlify or Vercel.

Keep this inside experiments until approved.
