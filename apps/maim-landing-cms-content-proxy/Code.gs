/**
 * MAIM Landing CMS Content Proxy
 *
 * Public JSON endpoint for the MAIM Command Room landing page.
 *
 * Source:
 * Airtable table with fields: slug, status, json
 *
 * Required Script Properties:
 * AIRTABLE_API_KEY
 * AIRTABLE_BASE_ID
 * AIRTABLE_CMS_TABLE_NAME
 *
 * Secrets belong in Apps Script Properties, never in this file.
 */

const CMS_PROPERTIES = {
  airtableApiKey: 'AIRTABLE_API_KEY',
  airtableBaseId: 'AIRTABLE_BASE_ID',
  airtableTableName: 'AIRTABLE_CMS_TABLE_NAME',
};

function doGet(e) {
  try {
    const slug = String(e && e.parameter && e.parameter.slug ? e.parameter.slug : 'maim-command-room');
    const content = fetchPublishedContent_(slug);

    return jsonResponse_(content);
  } catch (error) {
    return jsonResponse_({
      ok: false,
      error: String(error && error.message ? error.message : error),
    });
  }
}

function fetchPublishedContent_(slug) {
  const apiKey = getProperty_(CMS_PROPERTIES.airtableApiKey);
  const baseId = getProperty_(CMS_PROPERTIES.airtableBaseId);
  const tableName = getProperty_(CMS_PROPERTIES.airtableTableName);
  const formula = "AND({slug} = '" + escapeFormulaString_(slug) + "', {status} = 'published')";
  const url = 'https://api.airtable.com/v0/' +
    encodeURIComponent(baseId) + '/' +
    encodeURIComponent(tableName) +
    '?maxRecords=1&filterByFormula=' + encodeURIComponent(formula);

  const response = UrlFetchApp.fetch(url, {
    method: 'get',
    headers: { Authorization: 'Bearer ' + apiKey },
    muteHttpExceptions: true,
  });

  const status = response.getResponseCode();
  if (status < 200 || status >= 300) {
    throw new Error('Airtable request failed with status ' + status);
  }

  const payload = JSON.parse(response.getContentText());
  if (!payload.records || payload.records.length === 0) {
    throw new Error('No published content found for slug: ' + slug);
  }

  const rawJson = payload.records[0].fields.json;
  if (!rawJson) {
    throw new Error('Published content record is missing json.');
  }

  return JSON.parse(rawJson);
}

function escapeFormulaString_(value) {
  return String(value).replace(/'/g, "\\'");
}

function getProperty_(key) {
  const value = PropertiesService.getScriptProperties().getProperty(key);
  if (!value) {
    throw new Error(key + ' is not configured.');
  }

  return value;
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
