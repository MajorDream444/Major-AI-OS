import test from 'node:test';
import assert from 'node:assert/strict';
import type Stripe from 'stripe';
import { agreementVersion, checkoutReady, integrationIdentifier, isPaidBlueprint, OFFER, requestOriginAllowed } from '../lib/commerce.js';
import { fulfillBlueprint, recordRefund, type FulfillmentDeps } from '../lib/fulfillment.js';
import type { AirtableRecord } from '../lib/providers.js';

function session(overrides: Partial<Stripe.Checkout.Session> = {}): Stripe.Checkout.Session {
  return {
    id: 'cs_test_owned', object: 'checkout.session', mode: 'payment', payment_status: 'paid', status: 'complete',
    livemode: false, currency: 'usd', amount_subtotal: OFFER.amount, amount_total: OFFER.amount,
    metadata: { sku: OFFER.sku, agreement_version: 'blueprint-terms-2026-10-16-draft.1', terms_url: 'https://www.majoraimindset.com/terms/blueprint/blueprint-terms-2026-10-16-draft.1' }, customer_details: { email: 'builder@example.com', name: 'Builder' },
    customer: 'cus_test', payment_intent: 'pi_test',
    line_items: { object: 'list', data: [{ quantity: 1, price: { id: 'price_test', product: { id: 'prod_test', object: 'product', deleted: false, metadata: { sku: OFFER.sku } } } }], has_more: false, url: '/v1/checkout/sessions/cs_test_owned/line_items' },
    ...overrides,
  } as Stripe.Checkout.Session;
}

test('checkout fails closed until every configuration gate is present', () => {
  assert.equal(checkoutReady({}), false);
  const env = {
    ENABLE_BLUEPRINT_CHECKOUT: 'true', CHECKOUT_TERMS_APPROVED: 'true', CHECKOUT_TERMS_URL: 'https://www.majoraimindset.com/terms', CHECKOUT_AGREEMENT_VERSION: 'v1',
    STRIPE_RESTRICTED_KEY: 'rk_test_placeholder', STRIPE_WEBHOOK_SECRET: 'whsec_placeholder', STRIPE_BLUEPRINT_PRICE_ID: 'price_test', STRIPE_MODE: 'test',
    AIRTABLE_PAT: 'placeholder', AIRTABLE_BASE_ID: 'base', AIRTABLE_ORDERS_TABLE_ID: 'orders', AIRTABLE_CONTACTS_TABLE_ID: 'contacts',
    RESEND_API_KEY: 'placeholder', RESEND_FROM_EMAIL: 'orders@majoraimindset.com', APP_ORIGIN: 'https://www.majoraimindset.com',
    BLUEPRINT_BOOKING_URL: 'https://calendar.google.com/example', SUPPORT_EMAIL: 'contact@majoraimindset.com',
  } as NodeJS.ProcessEnv;
  assert.equal(checkoutReady(env), true);
  assert.equal(checkoutReady({ ...env, STRIPE_WEBHOOK_SECRET: '' }), false);
  assert.equal(checkoutReady({ ...env, RESEND_FROM_EMAIL: 'test@resend.dev' }), false);
  assert.equal(checkoutReady({ ...env, CHECKOUT_AGREEMENT_VERSION: 'not valid terms' }), false);
  assert.equal(agreementVersion('blueprint-terms-2026-10-16.1'), 'blueprint-terms-2026-10-16.1');
});

test('paid order validation rejects wrong amount and environment', () => {
  const env = { STRIPE_MODE: 'test', STRIPE_BLUEPRINT_PRICE_ID: 'price_test' } as NodeJS.ProcessEnv;
  assert.equal(isPaidBlueprint(session(), env), true);
  assert.throws(() => isPaidBlueprint(session({ amount_subtotal: 1 }), env), /amount/i);
  assert.throws(() => isPaidBlueprint(session({ livemode: true }), env), /mode/i);
  assert.equal(isPaidBlueprint(session({ payment_status: 'unpaid' }), env), false);
  assert.throws(() => isPaidBlueprint(session(), { ...env, STRIPE_BLUEPRINT_PRICE_ID: 'price_other' }), /price/i);
  assert.throws(() => isPaidBlueprint(session({ metadata: { sku: OFFER.sku } }), env), /agreement provenance/i);
});

test('checkout accepts only explicitly configured matching origins', () => {
  const env = { APP_ORIGIN: 'https://www.majoraimindset.com', APP_ALLOWED_ORIGINS: 'https://majoraimindset.com' } as NodeJS.ProcessEnv;
  assert.equal(requestOriginAllowed('https://www.majoraimindset.com', 'www.majoraimindset.com', env), true);
  assert.equal(requestOriginAllowed('https://majoraimindset.com', 'majoraimindset.com', env), true);
  assert.equal(requestOriginAllowed('https://evil.example', 'evil.example', env), false);
  assert.equal(requestOriginAllowed('https://www.majoraimindset.com', 'majoraimindset.com', env), false);
});

test('integration identifier carries an eight-letter random suffix', () => {
  assert.match(integrationIdentifier(), /^maim_owned_[a-z]{8}$/);
});

test('paid order survives invalid booking configuration and completes on retry', async () => {
  process.env.STRIPE_MODE = 'test'; process.env.STRIPE_BLUEPRINT_PRICE_ID = 'price_test'; process.env.AIRTABLE_ORDERS_TABLE_ID = 'orders'; process.env.BLUEPRINT_BOOKING_URL = 'not-a-booking-url';
  const records = new Map<string, AirtableRecord>(); let emails = 0;
  const deps: FulfillmentDeps = {
    findOne: async (_table, field, value) => [...records.values()].find(r => r.fields[field] === value),
    upsert: async (_table, key, fields) => { const id=String(fields[key]); const old=records.get(id); const rec={id,fields:{...(old?.fields||{}),...fields}}; records.set(id,rec); return rec; },
    updateRecord: async (_table, id, fields) => { const old=records.get(id)!; const rec={id,fields:{...old.fields,...fields}}; records.set(id,rec); return rec; },
    syncContact: async () => 'rec_contact',
    sendEmail: async () => { emails += 1; return 'accepted'; },
    now: () => '2026-10-16T00:00:00.000Z',
  };
  assert.equal(await fulfillBlueprint(session(), 'evt_invalid_booking', deps), 'pending_booking');
  assert.equal(records.size, 1);
  assert.equal(records.get('cs_test_owned')?.fields['Payment Status'], 'paid');
  assert.equal(records.get('cs_test_owned')?.fields['Fulfillment Status'], 'blocked: booking configuration');
  assert.equal(records.get('cs_test_owned')?.fields['Receipt Email Status'], 'withheld: invalid booking');
  assert.equal(emails, 0);
  process.env.BLUEPRINT_BOOKING_URL = 'https://calendar.app.google/UJcb15spgrWQJpPa6';
  assert.equal(await fulfillBlueprint(session(), 'evt_retry', deps), 'fulfilled');
  assert.equal(records.size, 1);
  assert.equal(emails, 1);
  assert.equal(records.get('cs_test_owned')?.fields['Agreement Version'], 'blueprint-terms-2026-10-16-draft.1');
  assert.equal(records.get('cs_test_owned')?.fields['Terms URL'], 'https://www.majoraimindset.com/terms/blueprint/blueprint-terms-2026-10-16-draft.1');
});

test('duplicate paid events upsert one order and send one idempotent email', async () => {
  process.env.STRIPE_MODE = 'test'; process.env.STRIPE_BLUEPRINT_PRICE_ID = 'price_test'; process.env.AIRTABLE_ORDERS_TABLE_ID = 'orders'; process.env.BLUEPRINT_BOOKING_URL = 'https://calendar.google.com/example';
  const records = new Map<string, AirtableRecord>(); let emails = 0;
  const deps: FulfillmentDeps = {
    findOne: async (_table, field, value) => [...records.values()].find(r => r.fields[field] === value),
    upsert: async (_table, key, fields) => { const id=String(fields[key]); const old=records.get(id); const rec={id,fields:{...(old?.fields||{}),...fields}}; records.set(id,rec); return rec; },
    updateRecord: async (_table, id, fields) => { const old=records.get(id)!; const rec={id,fields:{...old.fields,...fields}}; records.set(id,rec); return rec; },
    syncContact: async () => 'rec_contact',
    sendEmail: async () => { emails += 1; return 'accepted'; },
    now: () => '2026-10-16T00:00:00.000Z',
  };
  assert.equal(await fulfillBlueprint(session(), 'evt_1', deps), 'fulfilled');
  assert.equal(await fulfillBlueprint(session(), 'evt_2', deps), 'fulfilled');
  assert.equal(records.size, 1); assert.equal(emails, 1); assert.equal(records.get('cs_test_owned')?.fields['Entitlement Status'], 'active');
  assert.equal(await recordRefund('pi_test', 'evt_partial', false, deps), 'partial');
  assert.equal(records.get('cs_test_owned')?.fields['Entitlement Status'], 'active');
  assert.equal(await recordRefund('pi_test', 'evt_refund', true, deps), 'revoked');
  assert.equal(records.get('cs_test_owned')?.fields['Entitlement Status'], 'revoked');
  assert.equal(await fulfillBlueprint(session(), 'evt_replayed_paid', deps), 'ignored');
  assert.equal(records.get('cs_test_owned')?.fields['Entitlement Status'], 'revoked');
});

test('refund arriving before checkout completion remains terminal', async () => {
  process.env.STRIPE_MODE = 'test'; process.env.STRIPE_BLUEPRINT_PRICE_ID = 'price_test'; process.env.AIRTABLE_ORDERS_TABLE_ID = 'orders'; process.env.BLUEPRINT_BOOKING_URL = 'https://calendar.google.com/example';
  const records = new Map<string, AirtableRecord>(); let emails = 0;
  const deps: FulfillmentDeps = {
    findOne: async (_table, field, value) => [...records.values()].find(r => r.fields[field] === value),
    upsert: async (_table, key, fields) => { const id=String(fields[key]); const old=records.get(id); const rec={id,fields:{...(old?.fields||{}),...fields}}; records.set(id,rec); return rec; },
    updateRecord: async (_table, id, fields) => { const old=records.get(id)!; const rec={id,fields:{...old.fields,...fields}}; records.set(id,rec); return rec; },
    syncContact: async () => 'rec_contact',
    sendEmail: async () => { emails += 1; return 'accepted'; },
    now: () => '2026-10-16T00:00:00.000Z',
  };
  assert.equal(await recordRefund('pi_test', 'evt_refund_first', true, deps), 'revoked');
  assert.equal(await fulfillBlueprint(session(), 'evt_paid_late', deps), 'ignored');
  assert.equal(records.size, 1);
  assert.equal([...records.values()][0]?.fields['Entitlement Status'], 'revoked');
  assert.equal(emails, 0);
});
