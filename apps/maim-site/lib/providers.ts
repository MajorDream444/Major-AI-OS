export type AirtableRecord = { id: string; fields: Record<string, unknown> };

export async function airtable(path: string, options: RequestInit = {}): Promise<Record<string, any>> {
  if (!process.env.AIRTABLE_PAT || !process.env.AIRTABLE_BASE_ID || !path) throw new Error('Airtable is not configured');
  const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${process.env.AIRTABLE_PAT}`, 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Airtable request failed (${response.status})`);
  return response.json() as Promise<Record<string, any>>;
}

export async function findOne(table: string, field: string, value: string): Promise<AirtableRecord | undefined> {
  const formula = `{${field}}=${JSON.stringify(value)}`;
  const result = await airtable(`${table}?filterByFormula=${encodeURIComponent(formula)}&maxRecords=2`);
  if ((result.records?.length ?? 0) > 1) throw new Error(`Duplicate ${field} records require review`);
  return result.records?.[0] as AirtableRecord | undefined;
}

export async function upsert(table: string, key: string, fields: Record<string, unknown>): Promise<AirtableRecord> {
  const result = await airtable(table, {
    method: 'PATCH',
    body: JSON.stringify({ performUpsert: { fieldsToMergeOn: [key] }, records: [{ fields }] }),
  });
  if (!result.records?.[0]?.id) throw new Error('Airtable did not return a saved record');
  return result.records[0] as AirtableRecord;
}

export async function updateRecord(table: string, id: string, fields: Record<string, unknown>): Promise<AirtableRecord> {
  const result = await airtable(table, { method: 'PATCH', body: JSON.stringify({ records: [{ id, fields }] }) });
  if (!result.records?.[0]?.id) throw new Error('Airtable did not return an updated record');
  return result.records[0] as AirtableRecord;
}

export async function syncContact(email: string, name: string): Promise<string> {
  const table = process.env.AIRTABLE_CONTACTS_TABLE_ID;
  if (!table) throw new Error('Contact registry is not configured');
  const existing = await findOne(table, 'Email', email.toLowerCase());
  if (existing) return existing.id;
  return (await upsert(table, 'Email', { Email: email.toLowerCase(), 'Full Name': name })).id;
}

export async function sendTransactionalEmail(input: { to: string; subject: string; text: string; idempotencyKey: string }): Promise<'accepted' | 'failed'> {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL || process.env.RESEND_FROM_EMAIL.includes('resend.dev')) return 'failed';
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': input.idempotencyKey,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL,
        to: [input.to],
        reply_to: process.env.RESEND_REPLY_TO || process.env.SUPPORT_EMAIL,
        subject: input.subject,
        text: input.text,
      }),
      signal: AbortSignal.timeout(10000),
    });
    const body = await response.json() as { id?: string };
    return response.ok && Boolean(body.id) ? 'accepted' : 'failed';
  } catch {
    return 'failed';
  }
}
