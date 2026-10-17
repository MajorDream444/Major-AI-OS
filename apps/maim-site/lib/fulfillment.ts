import type Stripe from 'stripe';
import { isPaidBlueprint, OFFER, httpsUrl } from './commerce.js';
import { findOne, sendTransactionalEmail, syncContact, updateRecord, upsert, type AirtableRecord } from './providers.js';

export type FulfillmentDeps = {
  findOne: typeof findOne;
  upsert: typeof upsert;
  updateRecord: typeof updateRecord;
  syncContact: typeof syncContact;
  sendEmail: typeof sendTransactionalEmail;
  now: () => string;
};

const defaults: FulfillmentDeps = { findOne, upsert, updateRecord, syncContact, sendEmail: sendTransactionalEmail, now: () => new Date().toISOString() };

export async function fulfillBlueprint(session: Stripe.Checkout.Session, eventId: string, deps: FulfillmentDeps = defaults): Promise<'fulfilled' | 'ignored' | 'pending_email' | 'pending_booking'> {
  if (!isPaidBlueprint(session)) return 'ignored';
  const email = session.customer_details?.email?.trim().toLowerCase();
  if (!email) throw new Error('Paid checkout is missing customer email');
  const name = session.customer_details?.name?.trim() || 'MAIM participant';
  const orders = process.env.AIRTABLE_ORDERS_TABLE_ID;
  if (!orders) throw new Error('Order registry is not configured');
  const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id || '';
  const sessionPrior = await deps.findOne(orders, 'Stripe Session ID', session.id);
  const paymentPrior = !sessionPrior && paymentIntentId ? await deps.findOne(orders, 'Stripe Payment Intent ID', paymentIntentId) : undefined;
  const prior = sessionPrior ?? paymentPrior;
  if (prior?.fields['Payment Status'] === 'refunded' || prior?.fields['Entitlement Status'] === 'revoked') return 'ignored';
  const orderFields = {
    'Stripe Session ID': session.id,
    'Stripe Customer ID': typeof session.customer === 'string' ? session.customer : session.customer?.id || '',
    'Stripe Payment Intent ID': paymentIntentId,
    'Stripe Event ID': eventId,
    Email: email,
    Name: name,
    SKU: OFFER.sku,
    Offer: OFFER.name,
    'Payment Status': prior?.fields['Payment Status'] === 'partially refunded' ? 'partially refunded' : 'paid',
    'Entitlement Status': 'active',
    'Fulfillment Status': prior?.fields['Fulfillment Status'] || 'awaiting scheduling',
    'Amount Minor Units': session.amount_total,
    Currency: session.currency,
    Livemode: String(session.livemode),
    'Agreement Version': session.metadata?.agreement_version || '',
    'Terms URL': httpsUrl(session.metadata?.terms_url),
    'Paid At': prior?.fields['Paid At'] || deps.now(),
  };
  const record = paymentPrior && !sessionPrior
    ? await deps.updateRecord(orders, paymentPrior.id, orderFields)
    : await deps.upsert(orders, 'Stripe Session ID', orderFields);
  const alreadyAccepted = prior?.fields['Receipt Email Status'] === 'accepted' || record.fields['Receipt Email Status'] === 'accepted';
  if (alreadyAccepted) return 'fulfilled';
  const booking = httpsUrl(process.env.BLUEPRINT_BOOKING_URL);
  if (!booking) {
    await deps.upsert(orders, 'Stripe Session ID', {
      'Stripe Session ID': session.id,
      'Fulfillment Status': 'blocked: booking configuration',
      'Receipt Email Status': 'withheld: invalid booking',
      'Receipt Email Updated At': deps.now(),
    });
    return 'pending_booking';
  }
  const contactId = await deps.syncContact(email, name);
  const support = process.env.SUPPORT_EMAIL || 'contact@majoraimindset.com';
  const emailStatus = alreadyAccepted ? 'accepted' : await deps.sendEmail({
    to: email,
    subject: 'Your MAIM Client System Blueprint — next steps',
    idempotencyKey: `maim-blueprint-${session.id}`,
    text: `Your payment for ${OFFER.name} has been confirmed.\n\n${OFFER.description}\n\nSchedule your review: ${booking}\n\nQuestions or changes: ${support}\n\nOrder reference: ${session.id}`,
  });
  await deps.upsert(orders, 'Stripe Session ID', {
    'Stripe Session ID': session.id,
    'Contact Record ID': contactId,
    'Receipt Email Status': emailStatus,
    'Receipt Email Updated At': deps.now(),
    'Fulfillment Status': emailStatus === 'accepted' ? 'awaiting scheduling' : 'confirmation email pending',
  });
  return emailStatus === 'accepted' ? 'fulfilled' : 'pending_email';
}

export async function recordRefund(paymentIntentId: string, eventId: string, fullRefund: boolean, deps: FulfillmentDeps = defaults): Promise<'revoked' | 'partial' | 'ignored'> {
  const orders = process.env.AIRTABLE_ORDERS_TABLE_ID;
  if (!orders || !paymentIntentId) return 'ignored';
  const record = await deps.findOne(orders, 'Stripe Payment Intent ID', paymentIntentId);
  const fields = {
    'Stripe Event ID': eventId,
    'Stripe Payment Intent ID': paymentIntentId,
    SKU: OFFER.sku,
    Offer: OFFER.name,
    'Payment Status': fullRefund ? 'refunded' : 'partially refunded',
    'Entitlement Status': fullRefund ? 'revoked' : (record?.fields['Entitlement Status'] || 'active'),
    'Fulfillment Status': 'refund review',
    'Refunded At': deps.now(),
  };
  if (record && record.fields.SKU !== OFFER.sku) return 'ignored';
  if (record) await deps.updateRecord(orders, record.id, fields);
  else await deps.upsert(orders, 'Stripe Payment Intent ID', fields);
  return fullRefund ? 'revoked' : 'partial';
}
