import {createHash} from 'node:crypto';
export const NOTICE='academy-interest-2026-10-27';
type Input={email:string;firstName:string;source:string;status:string};
export async function recordReservation(input:Input,env:Record<string,string|undefined>=process.env,send:typeof fetch=fetch,now=new Date()) {
 if(env.ENABLE_RESERVATION_LEDGER!=='true')return 'not_configured';
 const {RESERVATIONS_AIRTABLE_PAT:key,RESERVATIONS_AIRTABLE_BASE_ID:base,RESERVATIONS_AIRTABLE_TABLE_ID:table}=env;
 if(!key||!base?.startsWith('app')||!table?.startsWith('tbl')||table==='tbl1pPhCa6bx3ST3E')throw new Error('Reservation ledger is not configured safely');
 if(!['academy-reserve','maim-homepage'].includes(input.source))throw new Error('Invalid reservation source');
 const id=createHash('sha256').update([input.email.toLowerCase(),input.source,NOTICE].join('\n')).digest('hex');
 const endpoint=`https://api.airtable.com/v0/${base}/${table}`,headers={Authorization:`Bearer ${key}`,'Content-Type':'application/json'};
 const lookup=await send(`${endpoint}?maxRecords=2&filterByFormula=${encodeURIComponent(`{Reservation ID}="${id}"`)}`,{headers,signal:AbortSignal.timeout(10000)});
 if(!lookup.ok)throw new Error('Ledger lookup unavailable');const rows=(await lookup.json()).records;
 if(!Array.isArray(rows)||rows.length>1)throw new Error('Ledger requires review');
 const fields={'Reservation ID':id,Email:input.email.toLowerCase(),'First Name':input.firstName,Source:input.source,'Notice Version':NOTICE,'Consent At':rows[0]?.fields?.['Consent At']||now.toISOString(),'Consent Purpose':'Cohort updates and requested guide; no paid-seat entitlement.','Provider Status':input.status,'Updated At':now.toISOString(),'Paid Seat':false,'Marketing Consent':false};
 const saved=await send(endpoint,{method:'PATCH',headers,signal:AbortSignal.timeout(10000),body:JSON.stringify({performUpsert:{fieldsToMergeOn:['Reservation ID']},records:[{fields}]})});
 if(!saved.ok||!(await saved.json()).records?.[0]?.id)throw new Error('Ledger write not confirmed');return 'recorded';
}
