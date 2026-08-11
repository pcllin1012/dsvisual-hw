const test = require('node:test');
const assert = require('node:assert');
const SSF = require('../../js/viz/viz_strsearch_frames.js');

// naive: every start index where pattern occurs in text
function naive(text, pattern) {
  const out = [];
  if (!pattern.length || pattern.length > text.length) return out;
  for (let i = 0; i + pattern.length <= text.length; i++) {
    if (text.substr(i, pattern.length) === pattern) out.push(i);
  }
  return out;
}

const CASES = [
  ['ABABDABACDABABCABAB', 'ABABCABAB'], // 1 match at 10
  ['AAAAA', 'AA'],                       // overlapping matches
  ['ABCABCABC', 'ABC'],                  // 3 matches
  ['ABCDE', 'XYZ'],                      // no match
  ['HELLO', 'HELLO'],                    // whole-string match
  ['AB', 'ABCDE'],                       // pattern longer than text
];
const GENS = [['kmp', SSF.kmpFrames], ['bm', SSF.bmFrames], ['rk', SSF.rkFrames], ['zalgo', SSF.zalgoFrames]];

for (const [name, gen] of GENS) {
  for (const [text, pattern] of CASES) {
    test(`${name}: "${text}" / "${pattern}" — invariants + match set`, () => {
      const frames = gen(text, pattern);
      assert.ok(Array.isArray(frames) && frames.length >= 1, 'non-empty frames');
      for (const f of frames) {
        assert.strictEqual(f.text, text, 'text constant');
        assert.strictEqual(f.pattern, pattern, 'pattern constant');
        assert.ok(f.message && typeof f.message.zh === 'string' && typeof f.message.en === 'string', 'bilingual message');
        if (f.hi) assert.ok(f.hi.kind === 'cell' || f.hi.kind === 'window', 'hi kind valid');
      }
      // the generator's discovered match set (carried on the last frame's extras) must equal naive
      const got = frames[frames.length - 1].extras.matches.slice().sort((a, b) => a - b);
      assert.deepStrictEqual(got, naive(text, pattern), 'match set equals naive scan');
    });
  }
}

test('strcompare: 3 panes advance in lockstep and all terminate', () => {
  const frames = SSF.strcompareFrames('ABABDABACDABABCABAB', 'ABABCABAB');
  assert.ok(frames.length > 1, 'multiple frames');
  const first = frames[0], last = frames[frames.length - 1];
  for (const pane of ['kmp', 'bm', 'rk']) {
    assert.ok(first.panes[pane], `pane ${pane} present`);
    assert.strictEqual(last.panes[pane].done, true, `pane ${pane} finished`);
    assert.ok(last.panes[pane].cmp > 0, `pane ${pane} did comparisons`);
  }
  assert.ok(last.message && last.message.zh && last.message.en, 'bilingual message');
});
