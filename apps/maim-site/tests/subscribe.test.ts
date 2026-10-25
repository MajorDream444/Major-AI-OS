import test from 'node:test';
import assert from 'node:assert/strict';
import handler, { ACADEMY_ORIGIN, allowedOrigin } from '../api/subscribe.js';

function response() {
  const headers: Record<string, string> = {};
  const r = { code: 0, data: undefined as unknown, headers,
    setHeader(n: string, v: string) { headers[n] = v; },
    status(c: number) { r.code = c; return r; },
    json(d: unknown) { r.data = d; } };
  return r;
}

test('only same-origin pages and the Academy may post to the signup endpoint', () => {
  assert.equal(allowedOrigin('https://www.majoraimindset.com', 'www.majoraimindset.com'), true);
  assert.equal(allowedOrigin(ACADEMY_ORIGIN, 'www.majoraimindset.com'), true);
  assert.equal(allowedOrigin('https://evil.example', 'www.majoraimindset.com'), false);
  assert.equal(allowedOrigin(undefined, 'www.majoraimindset.com'), false);
});

test('the Academy gets a CORS preflight answer; other origins do not', async () => {
  const ok = response();
  await handler({ method: 'OPTIONS', headers: { origin: ACADEMY_ORIGIN, host: 'www.majoraimindset.com' } }, ok);
  assert.equal(ok.code, 204);
  assert.equal(ok.headers['Access-Control-Allow-Origin'], ACADEMY_ORIGIN);
  const other = response();
  await handler({ method: 'POST', headers: { origin: 'https://evil.example', host: 'www.majoraimindset.com' }, body: { email: 'a@b.co' } }, other);
  assert.equal(other.code, 403);
  assert.equal(other.headers['Access-Control-Allow-Origin'], undefined);
});
