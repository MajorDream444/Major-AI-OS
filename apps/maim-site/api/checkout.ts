import { createHash, randomUUID } from 'node:crypto';
import type Stripe from 'stripe';
import type { ApiRequest, ApiResponse } from './_types.js';
import { checkoutReady, httpsUrl, integrationIdentifier, OFFER, requestOriginAllowed, stripeClient } from '../lib/commerce.js';

const attempts = new Map<string, { count: number; resetAt: number }>();
function allow(key: string): boolean {
  const now = Date.now();
  const item = attempts.get(key);
  if (!item || item.resetAt <= now) { attempts.set(key, { count: 1, resetAt: now + 60000 }); return true; }
  item.count += 1;
  return item.count <= 6;
}

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') { res.status(200).json({ available: checkoutReady(), offer: OFFER }); return; }
  if (req.method !== 'POST') { res.setHeader('Allow', 'GET, POST'); res.status(405).json({ error: 'Method not allowed' }); return; }
  if (!checkoutReady()) { res.status(503).json({ error: 'Checkout is being prepared. No payment was created.' }); return; }
  try {
    const origin = new URL(process.env.APP_ORIGIN ?? '').origin;
    const requestOrigin = Array.isArray(req.headers.origin) ? req.headers.origin[0] : req.headers.origin;
    const requestHost = Array.isArray(req.headers.host) ? req.headers.host[0] : req.headers.host;
    if (!requestOriginAllowed(requestOrigin, requestHost)) { res.status(403).json({ error: 'Please start checkout from this site.' }); return; }
    const ip = createHash('sha256').update(String(req.headers['x-forwarded-for'] || 'unknown').split(',')[0]).digest('hex');
    if (!allow(ip)) { res.status(429).json({ error: 'Please wait before trying again.' }); return; }
    const body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as { requestId?: string };
    const requestId = body?.requestId || randomUUID();
    if (!/^[a-f0-9-]{36}$/.test(requestId)) { res.status(400).json({ error: 'Please refresh and try again.' }); return; }
    const stripe = stripeClient();
    const price = await stripe.prices.retrieve(process.env.STRIPE_BLUEPRINT_PRICE_ID ?? '', { expand: ['product'] });
    const product = price.product as Stripe.Product;
    if (!price.active || price.type !== 'one_time' || price.unit_amount !== OFFER.amount || price.currency !== OFFER.currency || !product.active || product.metadata?.sku !== OFFER.sku || price.livemode !== (process.env.STRIPE_MODE === 'live')) throw new Error('Price mismatch');
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: price.id, quantity: 1 }],
      customer_creation: 'always',
      integration_identifier: integrationIdentifier(),
      metadata: { sku: OFFER.sku, source: 'maim-owned-site', agreement_version: process.env.CHECKOUT_AGREEMENT_VERSION ?? '' },
      consent_collection: { terms_of_service: 'required' },
      success_url: `${origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop?checkout=cancelled`,
      custom_text: {
        terms_of_service_acceptance: { message: `You agree to the ${process.env.CHECKOUT_AGREEMENT_VERSION} MAIM Client System Blueprint Service Terms.` },
        submit: { message: 'Includes one personal review and the stated blueprint deliverables. Implementation and ongoing coaching are separately scoped.' },
      },
    }, { idempotencyKey: `maim-checkout-${requestId}` });
    if (!httpsUrl(session.url ?? '')) throw new Error('Missing checkout URL');
    res.status(200).json({ url: session.url });
  } catch {
    res.status(502).json({ error: 'Checkout could not be opened. No payment was created.' });
  }
}
