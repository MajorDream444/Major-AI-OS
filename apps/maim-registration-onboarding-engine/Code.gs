/**
 * MAIM Registration Onboarding Engine
 *
 * Phase 2 Apps Script intake for the MAIM Command Room registration pipeline.
 *
 * Pipeline:
 * Landing Page -> Apps Script -> Google Sheet -> Airtable -> Welcome Email
 * -> Calendar Invite -> ManyChat -> CRM
 *
 * Install:
 * 1. Create a MAIM registration Google Sheet.
 * 2. Copy this file into Apps Script.
 * 3. Set REGISTRATION_SPREADSHEET_ID in Script Properties.
 * 4. Keep PIPELINE_MODE=registration_sprint until the first loop is approved.
 * 5. Keep DRY_RUN_MODE=true until live sends are approved.
 * 6. Run setupMaimRegistrationSheets().
 * 7. Deploy as a web app.
 *
 * Secrets belong in Apps Script Properties, never in this file.
 */

const MAIM_CONFIG = {
  tabs: {
    registrations: 'registrations',
    pipelineEvents: 'pipeline_events',
    syncErrors: 'sync_errors',
    sessions: 'sessions',
    agentRoutes: 'agent_routes',
    welcomeEmailPreviews: 'welcome_email_previews',
    config: 'config',
  },
  properties: {
    spreadsheetId: 'REGISTRATION_SPREADSHEET_ID',
    pipelineMode: 'PIPELINE_MODE',
    dryRunMode: 'DRY_RUN_MODE',
    allowedTestEmails: 'ALLOWED_TEST_EMAILS',
    airtableApiKey: 'AIRTABLE_API_KEY',
    airtableBaseId: 'AIRTABLE_BASE_ID',
    airtableTableName: 'AIRTABLE_TABLE_NAME',
    calendarId: 'CALENDAR_ID',
    manychatApiKey: 'MANYCHAT_API_KEY',
    crmWebhookUrl: 'CRM_WEBHOOK_URL',
    welcomeFromName: 'WELCOME_FROM_NAME',
    welcomeReplyTo: 'WELCOME_REPLY_TO',
  },
};

const REGISTRATION_HEADERS = [
  'lead_id',
  'idempotency_key',
  'submitted_at',
  'source_page',
  'source_form',
  'session_id',
  'session_title',
  'session_date_local',
  'session_timezone',
  'full_name',
  'email',
  'current_lane',
  'agent_route_id',
  'related_agent',
  'email_sequence_id',
  'prompt_pack_id',
  'lesson_path',
  'manychat_tag',
  'crm_segment',
  'ai_goal',
  'notes',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'referrer',
  'consent_status',
  'pipeline_status',
  'last_pipeline_step',
  'last_error',
];

const PIPELINE_EVENT_HEADERS = [
  'event_id',
  'lead_id',
  'event_at',
  'step',
  'status',
  'message',
];

const WELCOME_EMAIL_PREVIEW_HEADERS = [
  'preview_id',
  'lead_id',
  'created_at',
  'to',
  'subject',
  'body',
  'status',
];

const SYNC_ERROR_HEADERS = [
  'error_id',
  'lead_id',
  'error_at',
  'step',
  'message',
  'payload',
  'retry_status',
];

const SESSION_HEADERS = [
  'session_id',
  'title',
  'description',
  'start_time_iso',
  'end_time_iso',
  'timezone',
  'location',
  'meet_link',
];

const CONFIG_HEADERS = [
  'key',
  'value',
  'notes',
];

const AGENT_ROUTE_HEADERS = [
  'lane',
  'agent_route_id',
  'related_agent',
  'email_sequence_id',
  'prompt_pack_id',
  'lesson_path',
  'download_path',
  'manychat_tag',
  'crm_segment',
  'next_cta',
];

const DEFAULT_AGENT_ROUTES = [
  ['Beginner', 'maim-agent-beginner-guide', 'Beginner Guide Agent', 'maim-email-beginner-abc-start', 'maim-prompts-beginner-first-steps', 'A,B,C,D,E', 'A - Awareness Task Leak Worksheet|B - Belief Beginner Confidence Reset|C - Context Prompt Builder', 'lane_beginner', 'MAIM Beginner', 'Start with the A-B-C quick path.'],
  ['Creator', 'maim-agent-creator', 'Creator Agent', 'maim-email-creator-content-path', 'maim-prompts-creator-content-engine', 'A,C,I,P,Y,X', 'C - Context Prompt Builder|I - Imagination Prototype Canvas|P - Prompt Formula Card', 'lane_creator', 'MAIM Creator', 'Build your first AI-assisted content asset.'],
  ['Entrepreneur', 'maim-agent-entrepreneur', 'Entrepreneur Agent', 'maim-email-entrepreneur-leverage-path', 'maim-prompts-entrepreneur-systems', 'A,D,F,L,O,T', 'D - Direction Goal-to-Prompt Map|F - Flow Mapping Template|L - Leverage Template Builder', 'lane_entrepreneur', 'MAIM Entrepreneur', 'Map one workflow that can become leverage.'],
  ['Coach', 'maim-agent-coach', 'Coach Agent', 'maim-email-coach-client-path', 'maim-prompts-coach-client-support', 'B,H,K,Q,S,W', 'H - Human Voice Editing Checklist|K - Knowledge Teaching Card|Q - Better Questions Bank', 'lane_coach', 'MAIM Coach', 'Turn one coaching insight into a reusable client prompt.'],
  ['Parent', 'maim-agent-parent', 'Parent Guide Agent', 'maim-email-parent-family-path', 'maim-prompts-parent-safe-ai', 'B,C,H,R,U,W', 'B - Belief Beginner Confidence Reset|R - Responsible AI Safety Check|U - Understanding Strengths and Limits Map', 'lane_parent', 'MAIM Parent', 'Learn one safe AI habit for the household.'],
  ['Professional', 'maim-agent-professional', 'Professional Agent', 'maim-email-professional-work-path', 'maim-prompts-professional-productivity', 'C,D,J,S,T,V', 'C - Context Prompt Builder|J - Judgment Review Checklist|T - Time Back Audit', 'lane_professional', 'MAIM Professional', 'Use AI to reclaim time from one work task.'],
];

function doPost(e) {
  try {
    const payload = parsePayload_(e);
    const spreadsheet = getSpreadsheet_();
    ensureSheets_(spreadsheet);
    const registration = buildRegistration_(payload, spreadsheet);

    const existing = findExistingRegistration_(spreadsheet, registration.idempotency_key);
    if (existing) {
      logPipelineEvent_(spreadsheet, existing.lead_id, 'submitted', 'duplicate', 'Duplicate registration ignored for this session.');
      return jsonResponse_({ ok: true, duplicate: true, lead_id: existing.lead_id });
    }

    appendRegistration_(spreadsheet, registration);
    logPipelineEvent_(spreadsheet, registration.lead_id, 'submitted', 'ok', 'Registration captured.');
    logPipelineEvent_(spreadsheet, registration.lead_id, 'agent_route_resolved', 'ok', 'Route selected: ' + registration.agent_route_id);
    runPipeline_(spreadsheet, registration);
    SpreadsheetApp.flush();

    return jsonResponse_({ ok: true, lead_id: registration.lead_id });
  } catch (error) {
    return jsonResponse_({ ok: false, error: String(error && error.message ? error.message : error) });
  }
}

function setupMaimRegistrationSheets() {
  const spreadsheet = getSpreadsheet_();
  ensureSheets_(spreadsheet);
}

function testMaimRegistrationDryRun() {
  const testId = Utilities.getUuid().slice(0, 8);
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        fullName: 'Test Lead',
        email: 'test+' + testId + '@example.com',
        role: 'Beginner',
        aiGoal: 'Major AI Mindset live knowledge session',
        notes: 'Dry-run test from Apps Script.',
        sourcePage: 'local-test',
        sourceForm: 'maim-command-room',
        sessionId: 'maim-command-room-2026-07-12',
        sessionTitle: 'MAIM Command Room Live Knowledge Session',
        sessionDateLocal: 'Sunday, July 12, 2026',
        sessionTimezone: 'Asia/Makassar',
      }),
    },
  };

  return doPost(fakeEvent).getContent();
}

function testMaimDuplicateRegistrationDryRun() {
  const spreadsheet = getSpreadsheet_();
  ensureSheets_(spreadsheet);

  const testId = Utilities.getUuid().slice(0, 8);
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        fullName: 'Duplicate Test Lead',
        email: 'duplicate+' + testId + '@example.com',
        role: 'Creator',
        aiGoal: 'Duplicate protection dry-run test.',
        notes: 'Same email and same sessionId submitted twice from Apps Script.',
        sourcePage: 'local-duplicate-test',
        sourceForm: 'maim-command-room',
        sessionId: 'maim-command-room-duplicate-test-' + testId,
        sessionTitle: 'MAIM Command Room Duplicate Test',
        sessionDateLocal: 'Sunday, July 12, 2026',
        sessionTimezone: 'Asia/Makassar',
      }),
    },
  };

  const firstResponse = JSON.parse(doPost(fakeEvent).getContent());
  const secondResponse = JSON.parse(doPost(fakeEvent).getContent());

  return JSON.stringify({
    first_response: firstResponse,
    second_response: secondResponse,
    registration_row_count: countSheetDataRows_(spreadsheet, MAIM_CONFIG.tabs.registrations),
    welcome_preview_row_count: countSheetDataRows_(spreadsheet, MAIM_CONFIG.tabs.welcomeEmailPreviews),
    duplicate_pipeline_event_found: hasPipelineEvent_(spreadsheet, secondResponse.lead_id, 'submitted', 'duplicate'),
  });
}

function runPipeline_(spreadsheet, registration) {
  const pipelineMode = getProperty_(MAIM_CONFIG.properties.pipelineMode, 'registration_sprint');
  if (pipelineMode === 'registration_sprint') {
    runRegistrationSprint_(spreadsheet, registration);
    return;
  }

  const dryRun = getProperty_(MAIM_CONFIG.properties.dryRunMode, 'true') !== 'false';

  runStep_(spreadsheet, registration, 'airtable_synced', dryRun, syncAirtable_);
  runStep_(spreadsheet, registration, 'welcome_email_sent', dryRun, sendWelcomeEmail_);
  runStep_(spreadsheet, registration, 'calendar_invite_sent', dryRun, createCalendarInvite_);
  runStep_(spreadsheet, registration, 'manychat_queued', dryRun, queueManyChat_);
  runStep_(spreadsheet, registration, 'crm_created', dryRun, createCrmRecord_);
  logPipelineEvent_(spreadsheet, registration.lead_id, 'complete', dryRun ? 'dry_run' : 'ok', 'Pipeline pass finished.');
}

function runRegistrationSprint_(spreadsheet, registration) {
  logPipelineEvent_(spreadsheet, registration.lead_id, 'sheet_recorded', 'ok', 'Registration row written to Google Sheet.');
  appendWelcomeEmailPreview_(spreadsheet, registration);
  logPipelineEvent_(spreadsheet, registration.lead_id, 'welcome_email_dry_run', 'dry_run', 'Welcome email preview generated. No email sent.');
  logPipelineEvent_(spreadsheet, registration.lead_id, 'complete', 'dry_run', 'Registration sprint loop complete.');
}

function runStep_(spreadsheet, registration, step, dryRun, handler) {
  try {
    if (dryRun) {
      logPipelineEvent_(spreadsheet, registration.lead_id, step, 'dry_run', 'Dry run enabled. No external write sent.');
      return;
    }

    const result = handler(registration);
    logPipelineEvent_(spreadsheet, registration.lead_id, step, result.status, result.message);
  } catch (error) {
    const message = String(error && error.message ? error.message : error);
    logPipelineEvent_(spreadsheet, registration.lead_id, step, 'failed', message);
    logSyncError_(spreadsheet, registration.lead_id, step, message, registration);
  }
}

function syncAirtable_(registration) {
  const apiKey = getProperty_(MAIM_CONFIG.properties.airtableApiKey, '');
  const baseId = getProperty_(MAIM_CONFIG.properties.airtableBaseId, '');
  const tableName = getProperty_(MAIM_CONFIG.properties.airtableTableName, '');

  if (!apiKey || !baseId || !tableName) {
    return { status: 'skipped', message: 'Airtable properties are not configured.' };
  }

  const url = 'https://api.airtable.com/v0/' + encodeURIComponent(baseId) + '/' + encodeURIComponent(tableName);
  const body = {
    records: [{
      fields: {
        'Lead ID': registration.lead_id,
        'Email': registration.email,
        'Full Name': registration.full_name,
        'Current Lane': registration.current_lane,
        'Session ID': registration.session_id,
        'Pipeline Status': 'submitted',
      },
    }],
  };

  UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + apiKey },
    payload: JSON.stringify(body),
    muteHttpExceptions: true,
  });

  return { status: 'ok', message: 'Airtable sync requested.' };
}

function sendWelcomeEmail_(registration) {
  if (!isAllowedLiveEmail_(registration.email)) {
    return { status: 'skipped', message: 'Email not in ALLOWED_TEST_EMAILS.' };
  }

  const fromName = getProperty_(MAIM_CONFIG.properties.welcomeFromName, 'Major AI Mindset');
  const replyTo = getProperty_(MAIM_CONFIG.properties.welcomeReplyTo, '');
  const email = buildWelcomeEmail_(registration);

  MailApp.sendEmail({
    to: registration.email,
    subject: email.subject,
    body: email.body,
    name: fromName,
    replyTo: replyTo || undefined,
  });

  return { status: 'ok', message: 'Welcome email sent.' };
}

function createCalendarInvite_(registration) {
  const calendarId = getProperty_(MAIM_CONFIG.properties.calendarId, '');
  if (!calendarId) {
    return { status: 'skipped', message: 'CALENDAR_ID is not configured.' };
  }

  const session = findSession_(registration.session_id);
  if (!session || !session.start_time_iso || !session.end_time_iso || !session.meet_link) {
    return { status: 'needs_review', message: 'Session schedule or meet link is incomplete.' };
  }

  const calendar = CalendarApp.getCalendarById(calendarId);
  calendar.createEvent(session.title, new Date(session.start_time_iso), new Date(session.end_time_iso), {
    description: session.description + '\n\nJoin: ' + session.meet_link,
    location: session.location,
    guests: registration.email,
    sendInvites: true,
  });

  return { status: 'ok', message: 'Calendar invite created.' };
}

function queueManyChat_(registration) {
  const apiKey = getProperty_(MAIM_CONFIG.properties.manychatApiKey, '');
  if (!apiKey) {
    return { status: 'skipped', message: 'ManyChat is not configured.' };
  }

  return { status: 'needs_review', message: 'ManyChat endpoint mapping must be confirmed before live writes.' };
}

function createCrmRecord_(registration) {
  const webhookUrl = getProperty_(MAIM_CONFIG.properties.crmWebhookUrl, '');
  if (!webhookUrl) {
    return { status: 'skipped', message: 'CRM webhook is not configured.' };
  }

  UrlFetchApp.fetch(webhookUrl, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(registration),
    muteHttpExceptions: true,
  });

  return { status: 'ok', message: 'CRM webhook requested.' };
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Missing POST body.');
  }

  return JSON.parse(e.postData.contents);
}

function buildRegistration_(payload, spreadsheet) {
  const email = String(payload.email || '').trim().toLowerCase();
  const fullName = String(payload.fullName || payload.name || '').trim();
  const sessionId = String(payload.sessionId || 'maim-command-room-next-session').trim();
  const currentLane = String(payload.currentLane || payload.role || 'Beginner').trim();
  const route = resolveAgentRoute_(spreadsheet, currentLane);

  if (!email) throw new Error('Email is required.');
  if (!fullName) throw new Error('Full name is required.');

  const idempotencyKey = buildIdempotencyKey_(email, sessionId);

  return {
    lead_id: Utilities.getUuid(),
    idempotency_key: idempotencyKey,
    submitted_at: new Date().toISOString(),
    source_page: String(payload.sourcePage || 'maim-command-room-landing-page'),
    source_form: String(payload.sourceForm || 'register-section'),
    session_id: sessionId,
    session_title: String(payload.sessionTitle || 'MAIM Command Room Live Knowledge Session'),
    session_date_local: String(payload.sessionDateLocal || ''),
    session_timezone: String(payload.sessionTimezone || ''),
    full_name: fullName,
    email: email,
    current_lane: currentLane,
    agent_route_id: route.agent_route_id,
    related_agent: route.related_agent,
    email_sequence_id: route.email_sequence_id,
    prompt_pack_id: route.prompt_pack_id,
    lesson_path: route.lesson_path,
    manychat_tag: route.manychat_tag,
    crm_segment: route.crm_segment,
    ai_goal: String(payload.aiGoal || ''),
    notes: String(payload.notes || ''),
    utm_source: String(payload.utmSource || ''),
    utm_medium: String(payload.utmMedium || ''),
    utm_campaign: String(payload.utmCampaign || ''),
    referrer: String(payload.referrer || ''),
    consent_status: String(payload.consentStatus || 'registration_submitted'),
    pipeline_status: 'submitted',
    last_pipeline_step: 'submitted',
    last_error: '',
  };
}

function appendRegistration_(spreadsheet, registration) {
  const sheet = spreadsheet.getSheetByName(MAIM_CONFIG.tabs.registrations);
  sheet.appendRow(REGISTRATION_HEADERS.map(function(header) {
    return registration[header] || '';
  }));
}

function findExistingRegistration_(spreadsheet, idempotencyKey) {
  const sheet = spreadsheet.getSheetByName(MAIM_CONFIG.tabs.registrations);
  const values = sheet.getDataRange().getValues();
  const idempotencyIndex = REGISTRATION_HEADERS.indexOf('idempotency_key');
  const leadIndex = REGISTRATION_HEADERS.indexOf('lead_id');

  for (var i = 1; i < values.length; i++) {
    if (values[i][idempotencyIndex] === idempotencyKey) {
      return { lead_id: values[i][leadIndex] };
    }
  }

  return null;
}

function countSheetDataRows_(spreadsheet, sheetName) {
  const sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) return 0;

  return Math.max(sheet.getLastRow() - 1, 0);
}

function hasPipelineEvent_(spreadsheet, leadId, step, status) {
  const sheet = spreadsheet.getSheetByName(MAIM_CONFIG.tabs.pipelineEvents);
  const values = sheet.getDataRange().getValues();
  const leadIndex = PIPELINE_EVENT_HEADERS.indexOf('lead_id');
  const stepIndex = PIPELINE_EVENT_HEADERS.indexOf('step');
  const statusIndex = PIPELINE_EVENT_HEADERS.indexOf('status');

  for (var i = 1; i < values.length; i++) {
    if (values[i][leadIndex] === leadId && values[i][stepIndex] === step && values[i][statusIndex] === status) {
      return true;
    }
  }

  return false;
}

function logPipelineEvent_(spreadsheet, leadId, step, status, message) {
  const sheet = spreadsheet.getSheetByName(MAIM_CONFIG.tabs.pipelineEvents);
  sheet.appendRow([
    Utilities.getUuid(),
    leadId,
    new Date().toISOString(),
    step,
    status,
    message,
  ]);
}

function appendWelcomeEmailPreview_(spreadsheet, registration) {
  const sheet = spreadsheet.getSheetByName(MAIM_CONFIG.tabs.welcomeEmailPreviews);
  const email = buildWelcomeEmail_(registration);
  sheet.appendRow([
    Utilities.getUuid(),
    registration.lead_id,
    new Date().toISOString(),
    registration.email,
    email.subject,
    email.body,
    'dry_run',
  ]);
}

function buildWelcomeEmail_(registration) {
  const subject = 'You are in the room: ' + registration.session_title;
  const body = [
    'Hi ' + registration.full_name + ',',
    '',
    'Your seat is reserved for ' + registration.session_title + '.',
    'Session: ' + registration.session_date_local + ' (' + registration.session_timezone + ')',
    '',
    'Your lane: ' + registration.current_lane,
    'Your suggested path: ' + registration.lesson_path,
    '',
    'This room is simple: one clear idea, one useful example, one action you can take.',
    '',
    'Major AI Mindset',
  ].join('\n');

  return { subject: subject, body: body };
}

function logSyncError_(spreadsheet, leadId, step, message, payload) {
  const sheet = spreadsheet.getSheetByName(MAIM_CONFIG.tabs.syncErrors);
  sheet.appendRow([
    Utilities.getUuid(),
    leadId,
    new Date().toISOString(),
    step,
    message,
    JSON.stringify(payload),
    'needs_review',
  ]);
}

function ensureSheets_(spreadsheet) {
  ensureSheet_(spreadsheet, MAIM_CONFIG.tabs.registrations, REGISTRATION_HEADERS);
  ensureSheet_(spreadsheet, MAIM_CONFIG.tabs.pipelineEvents, PIPELINE_EVENT_HEADERS);
  ensureSheet_(spreadsheet, MAIM_CONFIG.tabs.syncErrors, SYNC_ERROR_HEADERS);
  ensureSheet_(spreadsheet, MAIM_CONFIG.tabs.sessions, SESSION_HEADERS);
  ensureSheet_(spreadsheet, MAIM_CONFIG.tabs.agentRoutes, AGENT_ROUTE_HEADERS);
  ensureSheet_(spreadsheet, MAIM_CONFIG.tabs.welcomeEmailPreviews, WELCOME_EMAIL_PREVIEW_HEADERS);
  ensureSheet_(spreadsheet, MAIM_CONFIG.tabs.config, CONFIG_HEADERS);
  seedAgentRoutes_(spreadsheet);
}

function seedAgentRoutes_(spreadsheet) {
  const sheet = spreadsheet.getSheetByName(MAIM_CONFIG.tabs.agentRoutes);
  if (sheet.getLastRow() > 1) return;

  sheet.getRange(2, 1, DEFAULT_AGENT_ROUTES.length, AGENT_ROUTE_HEADERS.length).setValues(DEFAULT_AGENT_ROUTES);
}

function resolveAgentRoute_(spreadsheet, lane) {
  const sheet = spreadsheet.getSheetByName(MAIM_CONFIG.tabs.agentRoutes);
  const values = sheet.getDataRange().getValues();
  const normalizedLane = String(lane || 'Beginner').trim().toLowerCase();

  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]).trim().toLowerCase() === normalizedLane) {
      return rowToAgentRoute_(values[i]);
    }
  }

  for (var j = 1; j < values.length; j++) {
    if (String(values[j][0]).trim().toLowerCase() === 'beginner') {
      return rowToAgentRoute_(values[j]);
    }
  }

  return {
    agent_route_id: '',
    related_agent: '',
    email_sequence_id: '',
    prompt_pack_id: '',
    lesson_path: '',
    manychat_tag: '',
    crm_segment: '',
  };
}

function rowToAgentRoute_(row) {
  return {
    agent_route_id: row[1] || '',
    related_agent: row[2] || '',
    email_sequence_id: row[3] || '',
    prompt_pack_id: row[4] || '',
    lesson_path: row[5] || '',
    manychat_tag: row[7] || '',
    crm_segment: row[8] || '',
  };
}

function ensureSheet_(spreadsheet, name, headers) {
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
  }

  const currentHeaders = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const needsHeaders = headers.some(function(header, index) {
    return currentHeaders[index] !== header;
  });

  if (needsHeaders) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
}

function findSession_(sessionId) {
  const spreadsheet = getSpreadsheet_();
  const sheet = spreadsheet.getSheetByName(MAIM_CONFIG.tabs.sessions);
  const values = sheet.getDataRange().getValues();

  for (var i = 1; i < values.length; i++) {
    if (values[i][0] === sessionId) {
      return SESSION_HEADERS.reduce(function(session, header, index) {
        session[header] = values[i][index];
        return session;
      }, {});
    }
  }

  return null;
}

function buildIdempotencyKey_(email, sessionId) {
  const raw = email + '|' + sessionId;
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, raw);
  return digest.map(function(byte) {
    const value = byte < 0 ? byte + 256 : byte;
    return ('0' + value.toString(16)).slice(-2);
  }).join('');
}

function isAllowedLiveEmail_(email) {
  const allowed = getProperty_(MAIM_CONFIG.properties.allowedTestEmails, '');
  if (!allowed) return false;

  return allowed.split(',').map(function(item) {
    return item.trim().toLowerCase();
  }).indexOf(email.toLowerCase()) !== -1;
}

function getSpreadsheet_() {
  const spreadsheetId = getProperty_(MAIM_CONFIG.properties.spreadsheetId, '');
  if (!spreadsheetId) {
    throw new Error('REGISTRATION_SPREADSHEET_ID is not configured.');
  }

  return SpreadsheetApp.openById(spreadsheetId);
}

function getProperty_(key, fallback) {
  const value = PropertiesService.getScriptProperties().getProperty(key);
  return value === null || value === undefined || value === '' ? fallback : value;
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
