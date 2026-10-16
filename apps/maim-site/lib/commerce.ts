import { randomBytes } from 'node:crypto';
import Stripe from 'stripe';

export const OFFER = {
  sku: 'MAIM-BLUEPRINT-001',
  name: 'MAIM Client System Blueprint',
  amount: 25000,
  currency: 'usd',
  description: 'A 30–45 minute review, a one-page system map, three priorities, and a first client-flow blueprint.',
} as const;

export function httpsUrl(value: string | undefined): string {
  try {
    const url = new URL(value ?? '');
    return url.protocol === 'https:' ? url.href : '';
  } catch {
    return '';
  }
}

export function agreementVersion(value: string | undefined): string {
  const version = value?.trim() ?? '';
  return /^[a-z0-9][a-z0-9._-]{1,100}$/i.test(version) ? version : '';
}

export function checkoutReady(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.ENABLE_BLUEPRINT_CHECKOUT === 'true'
    && env.CHECKOUT_TERMS_APPROVED === 'true'
    && Boolean(httpsUrl(env.CHECKOUT_TERMS_URL))
    && Boolean(agreementVersion(env.CHECKOUT_AGREEMENT_VERSION))
    && Boolean(env.STRIPE_RESTRICTED_KEY)
    && Boolean(env.STRIPE_WEBHOOK_SECRET)
    && Boolean(env.STRIPE_BLUEPRINT_PRICE_ID)
    && Boolean(env.AIRTABLE_PAT)
    && Boolean(env.AIRTABLE_BASE_ID)
    && Boolean(env.AIRTABLE_ORDERS_TABLE_ID)
    && Boolean(env.AIRTABLE_CONTACTS_TABLE_ID)
    && Boolean(env.RESEND_API_KEY)
    && Boolean(env.RESEND_FROM_EMAIL)
    && !String(env.RESEND_FROM_EMAIL).includes('resend.dev')
    && Boolean(httpsUrl(env.APP_ORIGIN))
    && Boolean(httpsUrl(env.BLUEPRINT_BOOKING_URL))
    && Boolean(env.SUPPORT_EMAIL)
    && ['test', 'live'].includes(env.STRIPE_MODE ?? '');
}

export function stripeClient(env: NodeJS.ProcessEnv = process.env): Stripe {
  return new Stripe(env.STRIPE_RESTRICTED_KEY ?? '', { maxNetworkRetries: 1, timeout: 10000 });
}

export function isPaidBlueprint(session: Stripe.Checkout.Session, env: NodeJS.ProcessEnv = process.env): boolean {
  if (session.metadata?.sku !== OFFER.sku || session.mode !== 'payment' || session.payment_status !== 'paid') return false;
  if (session.currency !== OFFER.currency || session.amount_subtotal !== OFFER.amount) throw new Error('Order amount mismatch');
  if (session.livemode !== (env.STRIPE_MODE === 'live')) throw new Error('Stripe mode mismatch');
  if (!agreementVersion(session.metadata?.agreement_version) || !httpsUrl(session.metadata?.terms_url)) throw new Error('Order agreement provenance is missing');
  const items = session.line_items?.data ?? [];
  if (items.length !== 1 || items[0]?.quantity !== 1 || items[0]?.price?.id !== env.STRIPE_BLUEPRINT_PRICE_ID) {
    throw new Error('Order price mismatch');
  }
  const product = items[0]?.price?.product;
  if (typeof product !== 'object' || product.deleted || product.metadata?.sku !== OFFER.sku) {
    throw new Error('Order product mismatch');
  }
  return true;
}

export function allowedOrigins(env: NodeJS.ProcessEnv = process.env): string[] {
  return [env.APP_ORIGIN, ...(env.APP_ALLOWED_ORIGINS ?? '').split(',')]
    .map((value) => {
      try { return new URL(value?.trim() ?? '').origin; } catch { return ''; }
    })
    .filter((value, index, values) => Boolean(value) && values.indexOf(value) === index);
}

export function requestOriginAllowed(origin: string | undefined, host: string | undefined, env: NodeJS.ProcessEnv = process.env): boolean {
  if (!origin || !host) return false;
  try {
    const parsed = new URL(origin);
    return parsed.host === host && allowedOrigins(env).includes(parsed.origin);
  } catch { return false; }
}

export function integrationIdentifier(): string {
  const suffix = [...randomBytes(8)].map((byte) => String.fromCharCode(97 + (byte % 26))).join('');
  return `maim_owned_${suffix}`;
}
