import type { IncomingMessage } from 'node:http';
import type Stripe from 'stripe';
import type { ApiRequest, ApiResponse } from './_types.js';
import { stripeClient } from '../lib/commerce.js';
import { fulfillBlueprint, recordRefund } from '../lib/fulfillment.js';

export const config = { api: { bodyParser: false } };

async function rawBody(req: ApiRequest & Partial<IncomingMessage>): Promise<Buffer> {
  if (Buffer.isBuffer(req.body)) return req.body;
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req as IncomingMessage) {
    size += Buffer.byteLength(chunk);
    if (size > 1_000_000) throw new Error('Webhook body too large');
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: ApiRequest & Partial<IncomingMessage>, res: ApiResponse): Promise<void> {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); res.status(405).json({ error: 'Method not allowed' }); return; }
  if (!process.env.STRIPE_WEBHOOK_SECRET || !process.env.STRIPE_RESTRICTED_KEY) { res.status(503).json({ error: 'Payment sync unavailable' }); return; }
  const stripe = stripeClient();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await rawBody(req), String(req.headers['stripe-signature'] || ''), process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    res.status(400).json({ error: 'Invalid webhook signature' }); return;
  }
  try {
    if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
      const session = await stripe.checkout.sessions.retrieve((event.data.object as Stripe.Checkout.Session).id, { expand: ['line_items.data.price.product'] });
      const result = await fulfillBlueprint(session, event.id);
      if (result === 'pending_email' || result === 'pending_booking') { res.status(503).json({ error: 'Order saved; fulfillment pending retry' }); return; }
      res.status(200).json({ received: true, result }); return;
    }
    if (event.type === 'charge.refunded') {
      const charge = event.data.object as Stripe.Charge;
      const paymentIntentId = typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id || '';
      const fullRefund = charge.amount_refunded >= charge.amount;
      res.status(200).json({ received: true, result: await recordRefund(paymentIntentId, event.id, fullRefund) }); return;
    }
    res.status(200).json({ received: true, ignored: true });
  } catch {
    res.status(503).json({ error: 'Payment sync pending; Stripe should retry' });
  }
}
