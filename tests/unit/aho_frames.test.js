const test = require('node:test');
const assert = require('node:assert');
const A = require('../../js/viz/viz_aho_frames.js');

// naive multi-pattern: {"pattern@start"} for every occurrence of every pattern
function naive(patterns, text) {
  const out = new Set();
  for (const p of patterns) {
    if (!p.length) continue;
    for (let i = 0; i + p.length <= text.length; i++) {
      if (text.substr(i, p.length) === p) out.add(p + '@' + i);
    }
  }
  return out;
}

const CASES = [
  [['he', 'she', 'his', 'hers'], 'ushers'],
  [['a'], 'aaa'],
  [['ab', 'ba'], 'abab'],
  [['xyz'], 'abcabc'],   // no match
  [['aa', 'aaa'], 'aaaa'], // overlapping / nested
];

for (const [patterns, text] of CASES) {
  test(`aho: ${JSON.stringify(patterns)} / "${text}"`, () => {
    const r = A.ahoFrames(patterns, text);
    assert.ok(Array.isArray(r.frames) && r.frames.length >= 1, 'non-empty frames');
    for (const f of r.frames) assert.ok(f.message && typeof f.message.zh === 'string' && typeof f.message.en === 'string', 'bilingual message');
    // node count = 1 (root) + total distinct trie edges
    assert.ok(r.nodes.length >= 1, 'has nodes');
    assert.strictEqual(r.failSteps.length, r.nodes.length - 1, 'one failure link per non-root node');
    for (const n of r.nodes) { assert.ok(Number.isFinite(n.x) && Number.isFinite(n.y), 'finite layout coords'); }
    // match set from the last scan frame equals naive
    const scanFrames = r.frames.filter((f) => f.phase === 'scan');
    const got = new Set(scanFrames.length ? scanFrames[scanFrames.length - 1].matches : []);
    assert.deepStrictEqual(got, naive(patterns, text), 'match set equals naive multi-pattern scan');
  });
}

test('aho: classic example reports she@1, he@2, hers@2', () => {
  const r = A.ahoFrames(['he', 'she', 'his', 'hers'], 'ushers');
  assert.strictEqual(r.nodes.length, 10, 'trie has 10 nodes');
  const last = r.frames[r.frames.length - 1];
  const set = new Set(last.matches);
  for (const m of ['she@1', 'he@2', 'hers@2']) assert.ok(set.has(m), 'has ' + m);
});
