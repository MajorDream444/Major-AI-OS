import type { ApiRequest, ApiResponse } from './_types.js';

const GUIDE = '/assets/MAIM_Free_Guide_5_AI_Moves.pdf';

function validEmail(value: unknown): value is string {
  return typeof value === 'string'
    && value.length <= 254
    && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function allowedOrigin(origin: string | undefined, host: string | undefined): boolean {
  if (!origin || !host) return false;
  try { return new URL(origin).host === host; } catch { return false; }
}

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  // Same-origin only: this endpoint writes to the audience, so it is not a public API.
  if (!allowedOrigin(req.headers.origin as string | undefined, req.headers.host as string | undefined)) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }

  const body = (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body) ?? {};

  // Honeypot: a real person never fills a hidden field.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    res.status(200).json({ ok: true, guide: GUIDE });
    return;
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!validEmail(email)) {
    res.status(400).json({ error: 'Enter a valid email address.' });
    return;
  }
  const firstName = typeof body.first_name === 'string' ? body.first_name.trim().slice(0, 80) : '';

  // Joining the founding-cohort waitlist is a separate, explicit choice.
  const wantsCohort = body.cohort === true || body.cohort === 'true';

  const key = process.env.RESEND_API_KEY;
  const segment = process.env.RESEND_SEGMENT_ID;
  const cohortSegment = process.env.RESEND_COHORT_SEGMENT_ID;
  if (!key || !segment) {
    res.status(503).json({ error: 'Signup is temporarily unavailable.' });
    return;
  }

  const addTo = async (segmentId: string): Promise<boolean> => {
    const response = await fetch('https://api.resend.com/contacts', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        first_name: firstName || undefined,
        unsubscribed: false,
        segment_id: segmentId,
      }),
      signal: AbortSignal.timeout(10000),
    });
    // An address already on the list is a success for the visitor, not an error.
    return response.ok || response.status === 409;
  };

  try {
    if (!(await addTo(segment))) {
      res.status(502).json({ error: 'Could not complete signup. Please try again.' });
      return;
    }

    // The waitlist is additive, never a gate. If it fails the visitor still got
    // what they asked for, and the result is reported rather than swallowed, so
    // the page never claims a seat was reserved when it was not.
    let waitlisted = false;
    if (wantsCohort && cohortSegment) {
      try {
        waitlisted = await addTo(cohortSegment);
      } catch {
        waitlisted = false;
      }
    }

    res.status(200).json({ ok: true, guide: GUIDE, waitlisted });
  } catch {
    res.status(504).json({ error: 'Signup timed out. Please try again.' });
  }
}
