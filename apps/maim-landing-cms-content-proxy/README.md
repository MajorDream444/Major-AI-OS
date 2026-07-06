# MAIM Landing CMS Content Proxy

Status: Phase 2 starter module

This Apps Script module exposes a public JSON endpoint for the MAIM Command Room landing page while keeping Airtable credentials in Script Properties.

## Source

Recommended Airtable table:

```txt
Landing Content Documents
```

Required fields:

```txt
slug
status
json
```

The landing page should request:

```txt
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?slug=maim-command-room
```

## Required Script Properties

```txt
AIRTABLE_API_KEY
AIRTABLE_BASE_ID
AIRTABLE_CMS_TABLE_NAME
```

Do not commit real values to the repo.

## Install

1. Create the Airtable table.
2. Add a published `maim-command-room` content record.
3. Copy `Code.gs` into Apps Script.
4. Set Script Properties.
5. Deploy as a web app.
6. Add the deployed URL to `VITE_MAIM_CMS_CONTENT_URL`.
