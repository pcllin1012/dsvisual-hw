const assert = require('node:assert');
const { test } = require('node:test');
const SF = require('../../js/viz/viz_sort_frames.js');

const INPUTS = [
  SF.SORT_DEFAULT,
  [5, 4, 3, 2, 1],           // reverse
  [1, 2, 3, 4, 5],           // already sorted
  [3, 1, 3, 2, 3, 1],        // duplicates
  [42],                      // single
  [7, 7, 7],                 // all equal
];
const ALLOWED = new Set(['', 'comparing', 'swapping', 'sorted', 'pivot', 'active']);
// perFrame=true → every intermediate frame must be a permutation (in-place swap sorts).
// merge overwrites via an aux array, so intermediate frames legitimately are NOT permutations.
const GENS = [
  ['bubble', SF.bubbleFrames, true],
  ['selection', SF.selectionFrames, true],
  ['insertion', SF.insertionFrames, true],
  ['quick', SF.quickFrames, true],
  ['merge', SF.mergeFrames, false],
  ['shell', SF.shellFrames, true],
  ['heap', SF.heapFrames, true],
];

for (const [name, gen, perFrame] of GENS) {
  for (const input of INPUTS) {
    test(`${name}Frames sorts ${JSON.stringify(input)}`, () => {
      const frames = gen(input);
      assert.ok(frames.length >= 1, 'non-empty');
      const finalArr = frames[frames.length - 1].array;
      for (let i = 1; i < finalArr.length; i++) assert.ok(finalArr[i - 1] <= finalArr[i], 'ascending');
      assert.deepStrictEqual([...finalArr].sort((a, b) => a - b), [...input].sort((a, b) => a - b), 'final is a permutation');
      for (const f of frames) {
        assert.ok(f.message && f.message.zh && f.message.en, 'bilingual message');
        if (perFrame) assert.deepStrictEqual([...f.array].sort((a, b) => a - b), [...input].sort((a, b) => a - b), 'frame array is a permutation');
        for (const k of Object.keys(f.hi || {})) assert.ok(ALLOWED.has(f.hi[k]), 'valid class ' + f.hi[k]);
      }
    });
  }
}

test('SORT_DEFAULT is a small distinct-ish array', () => {
  assert.ok(Array.isArray(SF.SORT_DEFAULT) && SF.SORT_DEFAULT.length >= 5);
});
