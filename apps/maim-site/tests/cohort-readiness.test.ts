import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const build = readFileSync(new URL('../maim/build.py', import.meta.url), 'utf8');
const homepage = readFileSync(new URL('../maim/majoraimindset_front_door.html', import.meta.url), 'utf8');
const chromeCss = readFileSync(new URL('../maim/site-chrome.css', import.meta.url), 'utf8');

test('shared public chrome routes visitors to the Academy reservation page', () => {
  assert.match(build, /https:\/\/academy\.majoraimindset\.com/);
  assert.match(build, /\/reserve/);
  assert.match(build, /\("Academy", ACADEMY\)/);
});

test('mobile navigation remains available with readable touch targets', () => {
  assert.match(chromeCss, /@media \(max-width:1060px\)/);
  assert.match(chromeCss, /\.mc-menu\{display:block\}/);
  assert.match(chromeCss, /\.mc-links a\{padding:14px 12px;font-size:18px\}/);
  assert.match(chromeCss, /min-height:44px/);
});

test('cohort copy preserves the approved facts and the payment release gate', () => {
  for (const source of [build, homepage]) {
    assert.match(source, /20-member capacity/);
    assert.match(source, /18 November/);
    assert.match(source, /11 November after readiness approval/);
  }
  assert.match(build, /US\$249/);
  assert.doesNotMatch(homepage, /Payment opens 11 November/);
});

test('homepage only confirms cohort intake after the API confirms waitlisted', () => {
  assert.match(homepage, /res\.d && res\.d\.waitlisted/);
  assert.match(homepage, /You are on the founding cohort list/);
});

test('the current signup has no retired Kit or duplicate browser-side Supabase write', () => {
  assert.doesNotMatch(homepage, /Kit/);
  assert.doesNotMatch(homepage, /MAIM_SUPABASE_URL/);
  assert.doesNotMatch(homepage, /rest\/v1\/registrations/);
});
