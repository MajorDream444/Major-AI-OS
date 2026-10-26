import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));

test('old Academy paths on the main site send people to the Academy subdomain', () => {
  const to = (source: string) => config.redirects.find((r: { source: string }) => r.source === source)?.destination;
  assert.equal(to('/academy'), 'https://academy.majoraimindset.com/');
  assert.equal(to('/academy/:path*'), 'https://academy.majoraimindset.com/:path*');
  assert.equal(to('/reserve'), 'https://academy.majoraimindset.com/reserve');
  assert.ok(!config.rewrites.some((r: { source: string }) => r.source.startsWith('/academy') || r.source === '/reserve'));
});

test('every emitted immutable legal candidate has an extensionless route', () => {
  const to = (source: string) => config.rewrites.find((r: { source: string }) => r.source === source)?.destination;
  assert.equal(
    to('/terms/blueprint/blueprint-terms-2026-10-16.2'),
    '/terms/blueprint/blueprint-terms-2026-10-16.2.html',
  );
});
