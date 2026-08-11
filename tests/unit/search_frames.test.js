const test = require('node:test');
const assert = require('node:assert');
const SF = require('../../js/viz/viz_search_frames.js');

const ALLOWED = new Set(['lo', 'hi', 'mid', 'found', 'eliminated']);
// [name, generator, needsSorted]
const GENS = [
  ['linear', SF.linearFrames, false],
  ['binary', SF.binaryFrames, true],
  ['fibonacci', SF.fibonacciFrames, true],
  ['interpolation', SF.interpolationFrames, true],
];
const RAW = [5, 2, 8, 1, 9, 3, 7, 4, 6, 11, 15];

for (const [name, gen, needsSorted] of GENS) {
  const base = needsSorted ? RAW.slice().sort((a, b) => a - b) : RAW.slice();
  for (const target of [base[0], base[base.length - 1], base[4], 999, -1]) {
    test(`${name}: target=${target} — invariants`, () => {
      const input = base.slice();
      const frames = gen(input, target);
      assert.ok(Array.isArray(frames) && frames.length >= 1, 'non-empty frames');
      assert.deepStrictEqual(input, base, 'input not mutated');
      for (const f of frames) {
        assert.deepStrictEqual(f.array, base, 'array identical every frame (search never reorders)');
        assert.ok(f.message && typeof f.message.zh === 'string' && typeof f.message.en === 'string', 'bilingual message');
        for (const k of Object.keys(f.hi)) assert.ok(ALLOWED.has(f.hi[k]), `class ${f.hi[k]} allowed`);
      }
      const last = frames[frames.length - 1];
      const foundIdxs = Object.keys(last.hi).filter((k) => last.hi[k] === 'found');
      if (base.includes(target)) {
        assert.strictEqual(foundIdxs.length, 1, 'exactly one found cell when target present');
        assert.strictEqual(base[+foundIdxs[0]], target, 'found cell holds the target');
      } else {
        assert.strictEqual(foundIdxs.length, 0, 'no found cell when target absent');
      }
    });
  }
  if (needsSorted) {
    test(`${name}: eliminated set grows monotonically`, () => {
      const frames = gen(base.slice(), base[7]);
      let prev = -1;
      for (const f of frames) {
        const e = Object.values(f.hi).filter((c) => c === 'eliminated').length;
        assert.ok(e >= prev || f.hi && Object.values(f.hi).includes('found'), 'eliminated non-decreasing until hit');
        if (!Object.values(f.hi).includes('found')) prev = Math.max(prev, e);
      }
    });
  }
}
