import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/catalogue.js';
import { CatalogueAccessError, catalogueOrigin, readCatalogue } from '../lib/catalogue.js';

const workspace = '10000000-0000-4000-8000-000000000001';
const env = {
  NODE_ENV: 'test',
  SUPABASE_URL: 'http://127.0.0.1:54321',
  MAIM_CATALOGUE_TEST_ORIGIN: 'http://127.0.0.1:54321',
  SUPABASE_PUBLISHABLE_KEY: 'publishable-test-placeholder',
};

test('catalogue origin is exact and production remains canonical HTTPS only', () => {
  assert.equal(catalogueOrigin(env), env.SUPABASE_URL);
  for (const url of [
    'https://njpdlomvyalxrkluaige.supabase.co.evil.example',
    'https://user@njpdlomvyalxrkluaige.supabase.co',
    'https://njpdlomvyalxrkluaige.supabase.co:444',
    'https://njpdlomvyalxrkluaige.supabase.co/rest/v1',
  ]) assert.throws(() => catalogueOrigin({ SUPABASE_URL: url }), /invalid|approved/);
});

test('anonymous requests are rejected before networking', async () => {
  let calls = 0;
  await assert.rejects(
    () => readCatalogue(undefined, workspace, env, async () => { calls += 1; return new Response(); }),
    (error) => error instanceof CatalogueAccessError && error.status === 401,
  );
  assert.equal(calls, 0);
});

test('expired sessions are rejected before catalogue access', async () => {
  let calls = 0;
  await assert.rejects(
    () => readCatalogue('Bearer expired.token.value', workspace, env, async () => {
      calls += 1; return new Response('{}', { status: 401 });
    }),
    (error) => error instanceof CatalogueAccessError && error.status === 401,
  );
  assert.equal(calls, 1);
});

test('revoked or cross-workspace membership is denied by the scoped RPC', async () => {
  let calls = 0;
  await assert.rejects(
    () => readCatalogue('Bearer valid.token.value', workspace, env, async () => {
      calls += 1;
      return calls === 1 ? new Response('{}', { status: 200 }) : new Response('{}', { status: 403 });
    }),
    (error) => error instanceof CatalogueAccessError && error.status === 403,
  );
  assert.equal(calls, 2);
});

test('successful responses expose only the catalogue field allow-list', async () => {
  let calls = 0;
  const assets = await readCatalogue('Bearer valid.token.value', workspace, env, async (_url, init) => {
    calls += 1;
    assert.equal(init?.redirect, 'error');
    if (calls === 1) return new Response('{"id":"user"}', { status: 200 });
    return new Response(JSON.stringify([{
      id: 'asset', stable_id: 'MAIM-ONE', title: 'One', format: '.png', approval_status: 'unreviewed',
      completeness_status: 'complete', integrity_status: 'sha256_verified', project_code: '00', project: 'MAIM 00',
      dependency_count: 0, preview_blocked: false, original_source_url: 'https://drive.google.com/file/d/example/view',
      workspace_id: workspace, private_note: 'must not pass through',
    }]), { status: 200 });
  });
  assert.deepEqual(Object.keys(assets[0]).sort(), [
    'approval_status', 'completeness_status', 'dependency_count', 'format', 'id', 'integrity_status',
    'original_source_url', 'preview_blocked', 'project', 'project_code', 'stable_id', 'title',
  ]);
});

test('HTTP handler marks even denied responses private and no-store', async () => {
  const headers = new Map<string, string>();
  let status = 0;
  const response = {
    setHeader(name: string, value: string) { headers.set(name.toLowerCase(), value); },
    status(code: number) { status = code; return this; },
    json() {},
  };
  await handler({ method: 'GET', headers: {}, query: { workspace_id: workspace } }, response);
  assert.equal(status, 401);
  assert.equal(headers.get('cache-control'), 'private, no-store, max-age=0');
  assert.equal(headers.get('vary'), 'Authorization');
});
