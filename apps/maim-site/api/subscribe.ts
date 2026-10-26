import type { ApiRequest, ApiResponse } from './_types.js';

import {recordReservation} from '../lib/reservation-ledger.js';

const GUIDE = '/assets/MAIM_Free_Guide_5_AI_Moves.pdf';

function validEmail(value: unknown): value is string {
  return typeof value === 'string'
    && value.length <= 254
    && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

// The Academy lives at academy.majoraimindset.com and reserves founding-cohort
// spots through this endpoint, so it is the one cross-origin caller allowed.
export const ACADEMY_ORIGIN = 'https://academy.majoraimindset.com';

export function allowedOrigin(origin: string | undefined, host: string | undefined): boolean {
  if (!origin || !host) return false;
  if (origin === ACADEMY_ORIGIN) return true;
  try { return new URL(origin).host === host; } catch { return false; }
}

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  res.setHeader('Cache-Control', 'no-store');
  if (req.headers.origin === ACADEMY_ORIGIN) {
    res.setHeader('Access-Control-Allow-Origin', ACADEMY_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Vary', 'Origin');
  }
  if (req.method === 'OPTIONS') {
    res.status(204).json({});
    return;
  }
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

  let body;
  try {body=(typeof req.body==='string'?JSON.parse(req.body||'{}'):req.body)??{};if(typeof body!=='object'||Array.isArray(body))throw new Error();}
  catch {res.status(400).json({error:'Invalid signup request.'});return;}

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

  let contactId:string|undefined, suppressed=false;
  const providerHeaders={Authorization:`Bearer ${key}`,'Content-Type':'application/json'};
  const addTo = async(segmentId:string):Promise<boolean> => {
    if(suppressed)return false;
    if(!contactId){
      const lookup=await fetch(`https://api.resend.com/contacts/${encodeURIComponent(email)}`,{headers:providerHeaders,signal:AbortSignal.timeout(10000)});
      if(lookup.ok){
        const contact=await lookup.json();
        if(contact.unsubscribed===true){suppressed=true;return false;}
        if(contact.unsubscribed!==false||typeof contact.id!=='string')return false;
        contactId=contact.id;
      }else if(lookup.status===404){
        const created=await fetch('https://api.resend.com/contacts',{method:'POST',headers:providerHeaders,signal:AbortSignal.timeout(10000),body:JSON.stringify({email,first_name:firstName||undefined})});
        if(!created.ok)return false;contactId=(await created.json()).id;
      }else return false;
    }
    if(!contactId)return false;
    const membership=await fetch(`https://api.resend.com/contacts/${encodeURIComponent(contactId)}/segments/${encodeURIComponent(segmentId)}`,{method:'POST',headers:providerHeaders,signal:AbortSignal.timeout(10000)});
    return membership.ok;
  };
  const reservation={email,firstName,source:body.source==='academy-reserve'?'academy-reserve':'maim-homepage',status:'pending'};

  try {
    if(wantsCohort)await recordReservation(reservation);
    if (!(await addTo(segment))) {
      if(suppressed){if(wantsCohort)await recordReservation({...reservation,status:'suppressed'});res.status(200).json({ok:true,guide:GUIDE,waitlisted:false,subscriptionStatus:'suppressed'});return;}
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

    let reservationStatus='not_requested';
    if(wantsCohort){try{reservationStatus=await recordReservation({...reservation,status:waitlisted?'confirmed':'pending'});}catch{reservationStatus='pending';waitlisted=false;}}
    res.status(200).json({ok:true,guide:GUIDE,waitlisted,reservationStatus});
  } catch {
    res.status(504).json({ error: 'Signup timed out. Please try again.' });
  }
}
