import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/subscribe.js';
async function run({suppressed=false,failSegment=false,malformed=false}={}) {
 const original=globalThis.fetch,env={...process.env},calls:any[]=[];
 Object.assign(process.env,{RESEND_API_KEY:'local-key',RESEND_SEGMENT_ID:'guide',RESEND_COHORT_SEGMENT_ID:'cohort'});
 globalThis.fetch=async(url,init)=>{calls.push({url:String(url),body:init?.body?JSON.parse(String(init.body)):null});if(!init?.method)return Response.json({id:'existing',unsubscribed:suppressed});if(String(url).includes('/segments/'))return Response.json({id:'membership'},{status:failSegment?500:200});return Response.json({id:'existing'},{status:409});};
 const r={code:0,data:null as any,setHeader(){},status(n:number){this.code=n;return this;},json(v:any){this.data=v;}};
 try{await handler({method:'POST',headers:{origin:'https://academy.majoraimindset.com',host:'www.majoraimindset.com'},body:malformed?'{':{email:'qa@example.invalid',cohort:true,source:'academy-reserve'}},r);return {...r,calls};}finally{globalThis.fetch=original;process.env=env;}
}
test('existing contact must actually join cohort segment, without clearing unsubscribe',async()=>{const r=await run();assert.equal(r.data.waitlisted,true);assert.ok(r.calls.some(c=>c.url.endsWith('/contacts/existing/segments/cohort')));assert.ok(r.calls.every(c=>c.body?.unsubscribed!==false));});
test('suppressed contact is never subscribed or confirmed',async()=>{const r=await run({suppressed:true});assert.equal(r.data.waitlisted,false);assert.ok(!r.calls.some(c=>c.url.includes('/segments/')));});
test('failed membership never confirms interest-list reservation',async()=>{const r=await run({failSegment:true});assert.notEqual(r.data.waitlisted,true);});
test('malformed request returns 400 before providers',async()=>{const r=await run({malformed:true});assert.equal(r.code,400);assert.equal(r.calls.length,0);});
