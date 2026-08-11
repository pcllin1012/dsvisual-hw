# String-Search Observatory (Batch 2/3) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the five string-matching searches (kmp, bm, rk, zalgo, strcompare) to the sort/search observatory — VCR transport + clickable step log + hidden source (code drawer) + example input (text + pattern) + fullscreen enlargement.

**Architecture:** One self-contained `viz_strsearch_frames.js` porting the four live-stepping algorithms + the already-pure Z-algorithm into pure frame builders, plus the composite strcompare builder and the shared `buildAlignmentRow`. One `renderStrSearch(methodId)` in `js/domains/strsearch.js` (dynamic host + text/pattern input row + examples + `buildStepWorkbench`) with a per-method `PAINT` map. Delete the five old render files; the correctness gate is a unit test asserting each generator's match set equals a naive substring scan.

**Tech Stack:** Vanilla JS, plain CSS, Playwright E2E + `node --test`. No app build step.

## Global Constraints

- NEVER modify `js/cloud-config.js`; never hand-edit `js/code_db.js`.
- Do NOT modify `buildFrameControls`/`buildStepWorkbench`, the sort/numeric-search observatory, `search-aho`, or any non-string-search method.
- Method counts unchanged (114). `hi` shape stays exactly as `buildAlignmentRow` expects: `null` | `{kind:'cell',textIdx,patIdx,status}` | `{kind:'window',status}`, `status ∈ {match,mismatch,collision}` or null.
- Preserve DOM hooks other code/tests rely on: `.strsearch-cell`, `.strsearch-lps-cell`, `[data-testid="rk-hash"]`, `.zalgo-cell`, `[data-testid="zalgo-stats"]`, `.strcompare-pane` (×3), `.strcompare-cmp`.
- Commit trailer (exact): `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Spec: `docs/superpowers/specs/2026-08-11-strsearch-observatory-batch2-design.md`.

---

## File Structure

- `js/viz/viz_strsearch_frames.js` — NEW: `buildAlignmentRow` + `kmpFrames`/`bmFrames`/`rkFrames`/`zalgoFrames`/`strcompareFrames` + defaults; dual-export.
- `js/domains/strsearch.js` — NEW: `renderStrSearch` + `FRAMES` + `PAINT` + examples + `esc`; attaches the 5 methods.
- `js/app.js` — add `codeDrawer:true` to the 5 METHODS rows (no updateLayout change).
- `index.html` — load the 2 new scripts; remove the 5 old script tags.
- `style.css` — `.strsearch-stage` + fullscreen enlarge.
- `js/random_input.js` — `'strsearch'` case.
- Tests: `tests/unit/strsearch_frames.test.js` (NEW), `tests/strsearch_steplog.spec.js` (NEW), rewrite 5 blocks in `tests/visualizer.spec.js`.
- Delete: `js/viz/viz_kmp.js`, `viz_bm.js`, `viz_rk.js`, `viz_zalgo.js`, `viz_strcompare.js`.

---

### Task 1: Single-pattern frame generators (kmp/bm/rk/zalgo) + unit tests

**Files:** Create `js/viz/viz_strsearch_frames.js`; Create `tests/unit/strsearch_frames.test.js`.

- [ ] **Step 1: Write the failing unit test** — `tests/unit/strsearch_frames.test.js`:

```js
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
```

- [ ] **Step 2: Run to verify fail** — `node --test tests/unit/strsearch_frames.test.js` → FAIL (module missing).

- [ ] **Step 3: Create `js/viz/viz_strsearch_frames.js`** with this exact content:

```js
(function (global) {
  var STRSEARCH_DEFAULT_TEXT = 'ABABDABACDABABCABAB';
  var STRSEARCH_DEFAULT_PATTERN = 'ABABCABAB';

  function escCh(c) { return c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : c; }

  // Shared alignment paint core (consolidated from the 4 old private copies).
  function buildAlignmentRow(text, pattern, offset, hi) {
    function cls(on) { return on && hi && hi.status ? ' strsearch-' + hi.status : ''; }
    var t = '<div class="strsearch-row strsearch-text">';
    for (var k = 0; k < text.length; k++) {
      var on = false;
      if (hi && hi.kind === 'cell') on = (k === hi.textIdx);
      else if (hi && hi.kind === 'window') on = (k >= offset && k < offset + pattern.length);
      t += '<span class="strsearch-cell' + cls(on) + '">' + escCh(text[k]) + '</span>';
    }
    t += '</div>';
    var p = '<div class="strsearch-row strsearch-pattern">';
    for (var s = 0; s < offset; s++) p += '<span class="strsearch-cell strsearch-spacer"></span>';
    for (var q = 0; q < pattern.length; q++) {
      var on2 = false;
      if (hi && hi.kind === 'cell') on2 = (q === hi.patIdx);
      else if (hi && hi.kind === 'window') on2 = true;
      p += '<span class="strsearch-cell' + cls(on2) + '">' + escCh(pattern[q]) + '</span>';
    }
    p += '</div>';
    return t + p;
  }

  function kmpFrames(text, pattern) {
    var m = pattern.length, lps = new Array(m).fill(0);
    for (var len = 0, k = 1; k < m;) { if (pattern[k] === pattern[len]) lps[k++] = ++len; else if (len !== 0) len = lps[len - 1]; else lps[k++] = 0; }
    var frames = [], i = 0, j = 0, comparisons = 0, matches = [];
    function push(offset, hi, lpsActive, msg) { frames.push({ text: text, pattern: pattern, offset: offset, hi: hi, extras: { kind: 'kmp', lps: lps.slice(), lpsActive: lpsActive, comparisons: comparisons, matches: matches.slice() }, message: msg }); }
    push(0, null, -1, { zh: 'KMP:先算 LPS,i=j=0 開始掃描', en: 'KMP: LPS ready; scan from i=j=0' });
    while (i < text.length && m > 0) {
      comparisons++;
      var ti = i, pj = j, drawOffset = i - j;
      if (text[i] === pattern[j]) {
        i++; j++;
        if (j === m) { var pos = i - m; matches.push(pos); j = lps[j - 1]; push(drawOffset, { kind: 'cell', textIdx: ti, patIdx: pj, status: 'match' }, -1, { zh: '相符 → pattern 完整命中於位置 ' + pos, en: 'match → full pattern at index ' + pos }); }
        else push(drawOffset, { kind: 'cell', textIdx: ti, patIdx: pj, status: 'match' }, -1, { zh: '字元相符 text[' + ti + ']=pattern[' + pj + '],往右', en: 'chars match text[' + ti + ']=pattern[' + pj + '], advance' });
      } else if (j !== 0) { var la = pj - 1; j = lps[j - 1]; push(drawOffset, { kind: 'cell', textIdx: ti, patIdx: pj, status: 'mismatch' }, la, { zh: '不相符,j 依 LPS 退回 ' + j, en: 'mismatch; fall back j to ' + j + ' via LPS' }); }
      else { i++; push(drawOffset, { kind: 'cell', textIdx: ti, patIdx: pj, status: 'mismatch' }, -1, { zh: '不相符且 j=0,i 前進', en: 'mismatch at j=0; advance i' }); }
    }
    push(0, null, -1, { zh: '完成,命中位置 [' + matches.join(',') + ']', en: 'Done. Matches at [' + matches.join(',') + ']' });
    return frames;
  }

  function bmFrames(text, pattern) {
    var n = text.length, m = pattern.length;
    var badChar = {}; for (var b = 0; b < m; b++) badChar[pattern[b]] = b;
    var shift = new Array(m + 1).fill(0), bpos = new Array(m + 1).fill(0);
    (function () { var i = m, j = m + 1; bpos[i] = j; while (i > 0) { while (j <= m && pattern[i - 1] !== pattern[j - 1]) { if (shift[j] === 0) shift[j] = j - i; j = bpos[j]; } i--; j--; bpos[i] = j; } j = bpos[0]; for (i = 0; i <= m; i++) { if (shift[i] === 0) shift[i] = j; if (i === j) j = bpos[j]; } })();
    var frames = [], s = 0, jj = m - 1, comparisons = 0, matches = [];
    function push(hi, note, msg) { frames.push({ text: text, pattern: pattern, offset: Math.min(s, Math.max(0, n - m)), hi: hi, extras: { kind: 'bm', note: note, comparisons: comparisons, matches: matches.slice() }, message: msg }); }
    push(null, '', { zh: 'Boyer–Moore:預處理 bad-char/good-suffix,從右往左比對', en: 'Boyer–Moore: preprocess; compare right-to-left' });
    while (s <= n - m && m > 0) {
      comparisons++;
      var ti = s + jj, pj = jj;
      if (pattern[jj] === text[s + jj]) {
        if (jj === 0) { matches.push(s); push({ kind: 'cell', textIdx: ti, patIdx: pj, status: 'match' }, 'full match at index ' + s, { zh: '完全命中於位置 ' + s, en: 'full match at index ' + s }); s += shift[0]; jj = m - 1; }
        else { push({ kind: 'cell', textIdx: ti, patIdx: pj, status: 'match' }, 'match — scan left', { zh: '相符,往左掃描 j=' + (jj - 1), en: 'match; scan left j=' + (jj - 1) }); jj--; }
      } else {
        var bcRaw = badChar[text[s + jj]]; var bcShift = Math.max(1, jj - (bcRaw === undefined ? -1 : bcRaw)); var gsShift = shift[jj + 1]; var by = Math.max(bcShift, gsShift); var used = gsShift >= bcShift ? 'good-suffix' : 'bad-character';
        push({ kind: 'cell', textIdx: ti, patIdx: pj, status: 'mismatch' }, 'mismatch — bad-char=' + bcShift + ', good-suffix=' + gsShift + ' &rarr; shift by ' + by + ' (' + used + ')', { zh: '不相符,位移 ' + by + '(' + used + ')', en: 'mismatch; shift by ' + by + ' (' + used + ')' });
        s += by; jj = m - 1;
      }
    }
    push(null, '', { zh: '完成,命中位置 [' + matches.join(',') + ']', en: 'Done. Matches at [' + matches.join(',') + ']' });
    return frames;
  }

  function rkFrames(text, pattern) {
    var BASE = 256, MOD = 101, n = text.length, m = pattern.length;
    var h = 1; for (var a = 0; a < m - 1; a++) h = (h * BASE) % MOD;
    var patHash = 0; for (var b = 0; b < m; b++) patHash = (BASE * patHash + pattern.charCodeAt(b)) % MOD;
    function windowHash(start) { var wh = 0; for (var k = 0; k < m; k++) wh = (BASE * wh + text.charCodeAt(start + k)) % MOD; return wh; }
    var frames = [], s = 0, winHash = (m > 0 && m <= n) ? windowHash(0) : 0, hashChecks = 0, verifyChecks = 0, matches = [];
    function push(status, note, msg) { frames.push({ text: text, pattern: pattern, offset: Math.min(s, Math.max(0, n - m)), hi: { kind: 'window', status: status }, extras: { kind: 'rk', patHash: patHash, winHash: winHash, hashChecks: hashChecks, verifyChecks: verifyChecks, matches: matches.slice(), note: note }, message: msg }); }
    push(null, '', { zh: 'Rabin–Karp:比較 pattern 雜湊與視窗雜湊', en: 'Rabin–Karp: compare pattern hash vs window hash' });
    while (s <= n - m && m > 0) {
      hashChecks++;
      var status, note, msg;
      if (winHash === patHash) { var k = 0; while (k < m && text[s + k] === pattern[k]) { verifyChecks++; k++; } if (k === m) { matches.push(s); status = 'match'; note = 'hash hit + verified &rarr; match at ' + s; msg = { zh: '雜湊命中並驗證,位置 ' + s, en: 'hash hit + verified at ' + s }; } else { status = 'collision'; note = 'hash hit but verify failed &rarr; collision'; msg = { zh: '雜湊碰撞(驗證失敗)', en: 'hash collision (verify failed)' }; } }
      else { status = 'mismatch'; note = 'hash mismatch &rarr; slide window'; msg = { zh: '雜湊不符,滑動視窗', en: 'hash mismatch; slide window' }; }
      push(status, note, msg);
      if (s < n - m) { winHash = (BASE * (winHash - text.charCodeAt(s) * h) + text.charCodeAt(s + m)) % MOD; winHash = ((winHash % MOD) + MOD) % MOD; }
      s++;
    }
    push(null, '', { zh: '完成,命中位置 [' + matches.join(',') + ']', en: 'Done. Matches at [' + matches.join(',') + ']' });
    return frames;
  }

  function zalgoFrames(text, pattern) {
    var combined = pattern + '$' + text, n = combined.length, m = pattern.length;
    var z = new Array(n).fill(0), trace = [{ l: 0, r: 0 }];
    (function () { var l = 0, r = 0; for (var i = 1; i < n; i++) { if (i < r) z[i] = Math.min(r - i, z[i - l]); while (i + z[i] < n && combined[z[i]] === combined[i + z[i]]) z[i]++; if (i + z[i] > r) { l = i; r = i + z[i]; } trace[i] = { l: l, r: r }; } })();
    var allMatches = []; for (var k = 1; k < n; k++) { if (m > 0 && z[k] === m) allMatches.push(k - m - 1); }
    var frames = [];
    for (var i = 0; i < n; i++) {
      var cur = i + 1, box = trace[i] || { l: 0, r: 0 };
      frames.push({ text: text, pattern: pattern, offset: null, hi: null, extras: { kind: 'zalgo', combined: combined, z: z, cur: cur, box: box, matches: allMatches.slice() }, message: i === 0 ? { zh: 'Z 演算法:s = pattern$text,逐格計算 Z 值', en: 'Z-algorithm: s = pattern$text; compute Z per index' } : { zh: '計算 Z[' + i + ']=' + z[i] + (z[i] === m ? ' → 命中!' : ''), en: 'Z[' + i + ']=' + z[i] + (z[i] === m ? ' → match!' : '') } });
    }
    return frames;
  }

  var api = { buildAlignmentRow: buildAlignmentRow, kmpFrames: kmpFrames, bmFrames: bmFrames, rkFrames: rkFrames, zalgoFrames: zalgoFrames, STRSEARCH_DEFAULT_TEXT: STRSEARCH_DEFAULT_TEXT, STRSEARCH_DEFAULT_PATTERN: STRSEARCH_DEFAULT_PATTERN };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.StrSearchFrames = api;
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4: Run to verify pass** — `node --test tests/unit/strsearch_frames.test.js` → PASS. If a generator's match set disagrees with naive for any case, FIX the port to match the algorithm's semantics (never weaken the test).

- [ ] **Step 5: Commit**

```bash
git add js/viz/viz_strsearch_frames.js tests/unit/strsearch_frames.test.js
git commit -m "feat(dsvisual): pure string-search frame generators (kmp/bm/rk/zalgo) + shared alignment row

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: strcompare composite frame generator + unit test

**Files:** Modify `js/viz/viz_strsearch_frames.js`; Modify `tests/unit/strsearch_frames.test.js`.

- [ ] **Step 1: Extend the unit test** — append to `tests/unit/strsearch_frames.test.js`:

```js
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
```

- [ ] **Step 2: Run to verify fail** — `node --test tests/unit/strsearch_frames.test.js` → the new test FAILS (`strcompareFrames` undefined).

- [ ] **Step 3: Add `strcompareFrames` to `js/viz/viz_strsearch_frames.js`** (before `var api`; also add `strcompareFrames: strcompareFrames` to `api`):

```js
  function strcompareFrames(text, pattern) {
    var n = text.length, m = pattern.length;
    var lps = new Array(m).fill(0);
    for (var len = 0, k = 1; k < m;) { if (pattern[k] === pattern[len]) lps[k++] = ++len; else if (len !== 0) len = lps[len - 1]; else lps[k++] = 0; }
    var kmp = { i: 0, j: 0, cmp: 0, done: m === 0 };
    function kmpStep() { if (kmp.done || kmp.i >= n) { kmp.done = true; return; } kmp.cmp++; if (text[kmp.i] === pattern[kmp.j]) { kmp.i++; kmp.j++; if (kmp.j === m) kmp.j = lps[kmp.j - 1]; } else if (kmp.j !== 0) { kmp.j = lps[kmp.j - 1]; } else { kmp.i++; } if (kmp.i >= n) kmp.done = true; }
    var bad = {}; for (var b = 0; b < m; b++) bad[pattern[b]] = b;
    var bm = { s: 0, j: m - 1, cmp: 0, done: m === 0 || m > n };
    function bmStep() { if (bm.done || bm.s > n - m) { bm.done = true; return; } bm.cmp++; if (pattern[bm.j] === text[bm.s + bm.j]) { if (bm.j === 0) { bm.s += 1; bm.j = m - 1; } else bm.j--; } else { var bcRaw = bad[text[bm.s + bm.j]]; bm.s += Math.max(1, bm.j - (bcRaw === undefined ? -1 : bcRaw)); bm.j = m - 1; } if (bm.s > n - m) bm.done = true; }
    var BASE = 256, MOD = 101, rkH = 1; for (var a = 0; a < m - 1; a++) rkH = (rkH * BASE) % MOD;
    var rkPat = 0; for (var c = 0; c < m; c++) rkPat = (BASE * rkPat + pattern.charCodeAt(c)) % MOD;
    function rkWindow(start) { var wh = 0; for (var k = 0; k < m; k++) wh = (BASE * wh + text.charCodeAt(start + k)) % MOD; return wh; }
    var rk = { s: 0, hash: (m > 0 && m <= n) ? rkWindow(0) : 0, cmp: 0, done: m === 0 || m > n };
    function rkStep() { if (rk.done || rk.s > n - m) { rk.done = true; return; } rk.cmp++; if (rk.hash === rkPat) { var k = 0; while (k < m && text[rk.s + k] === pattern[k]) { rk.cmp++; k++; } } if (rk.s < n - m) { rk.hash = (BASE * (rk.hash - text.charCodeAt(rk.s) * rkH) + text.charCodeAt(rk.s + m)) % MOD; rk.hash = ((rk.hash % MOD) + MOD) % MOD; } rk.s++; if (rk.s > n - m) rk.done = true; }
    function snap(msg) { return { text: text, pattern: pattern, panes: { kmp: { offset: kmp.i - kmp.j, hi: null, cmp: kmp.cmp, done: kmp.done }, bm: { offset: Math.min(bm.s, Math.max(0, n - m)), hi: null, cmp: bm.cmp, done: bm.done }, rk: { offset: Math.min(rk.s, Math.max(0, n - m)), hi: { kind: 'window', status: null }, cmp: rk.cmp, done: rk.done } }, message: msg }; }
    var frames = [snap({ zh: '三演算法同步比較:每步各推進一次', en: 'Compare three algorithms in lockstep; each advances one step' })];
    var guard = 0;
    while (!(kmp.done && bm.done && rk.done) && guard++ < 100000) { kmpStep(); bmStep(); rkStep(); frames.push(snap({ zh: '步驟 ' + guard + ':KMP cmp=' + kmp.cmp + ', BM cmp=' + bm.cmp + ', RK cmp=' + rk.cmp, en: 'Step ' + guard + ': KMP cmp=' + kmp.cmp + ', BM cmp=' + bm.cmp + ', RK cmp=' + rk.cmp } )); }
    return frames;
  }
```

- [ ] **Step 4: Run to verify pass** — `node --test tests/unit/strsearch_frames.test.js` → PASS (all Task 1 + Task 2 tests).

- [ ] **Step 5: Commit**

```bash
git add js/viz/viz_strsearch_frames.js tests/unit/strsearch_frames.test.js
git commit -m "feat(dsvisual): composite strcompare frame generator (KMP/BM/RK lockstep)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: renderStrSearch domain + paint + wiring + fullscreen + E2E

**Files:** Create `js/domains/strsearch.js`; Modify `js/app.js`, `index.html`, `style.css`, `js/random_input.js`; Delete the 5 old viz files; Create `tests/strsearch_steplog.spec.js`.

- [ ] **Step 1: Write the failing E2E** — `tests/strsearch_steplog.spec.js`:

```js
const { test, expect } = require('@playwright/test');
const path = require('path');
const { loadMethod } = require('./helpers.js');

// [id, drawer filename, cell selector within the card]
const METHODS = [
  ['search-kmp', 'search_kmp.cpp', '.strsearch-align .strsearch-cell'],
  ['search-bm', 'search_bm.cpp', '.strsearch-align .strsearch-cell'],
  ['search-rk', 'search_rk.cpp', '.strsearch-align .strsearch-cell'],
  ['search-zalgo', 'search_zalgo.cpp', '.zalgo-cell'],
  ['search-strcompare', 'search_strcompare.cpp', '.strcompare-pane'],
];

test.describe('String-search observatory (batch 2)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  for (const [id, file, cellSel] of METHODS) {
    test(`${id}: input + examples + VCR + step log + drawer`, async ({ page }) => {
      await loadMethod(page, id);
      const card = page.locator(`[data-method-section="${id}"]`);
      await expect(card.locator('[data-testid="strsearch-text"]')).toBeVisible();
      await expect(card.locator('[data-testid="strsearch-pattern"]')).toBeVisible();
      await expect(card.locator('.ex-select')).toBeVisible();
      await expect(card.locator('.viz-workbench')).toBeVisible();
      await expect(card.locator('[data-testid="viz-steplog"]')).toBeVisible();
      await expect(card.locator('.stepctl')).toBeVisible();
      await expect(card.locator('[data-testid="code-drawer"] .code-panel-filename')).toContainText(file);

      if (id === 'search-strcompare') await expect(card.locator('.strcompare-pane')).toHaveCount(3);
      else expect(await card.locator(cellSel).count()).toBeGreaterThan(1);

      const rows = card.locator('.viz-logrow');
      const max = parseInt(await card.locator('.stepctl-scrubber').getAttribute('max'), 10);
      await expect(rows).toHaveCount(max + 1);
      await card.locator('.stepctl-scrubber').evaluate((el) => { el.value = el.max; el.dispatchEvent(new Event('input', { bubbles: true })); });
    });
  }

  test('search-kmp: alignment cells enlarge in fullscreen', async ({ page }) => {
    await loadMethod(page, 'search-kmp');
    const card = page.locator('[data-method-section="search-kmp"]');
    const tallest = () => card.locator('.strsearch-align .strsearch-cell').first().evaluate((e) => e.getBoundingClientRect().height);
    const before = await tallest();
    await card.locator('[data-testid="viz-focus-toggle"]').click();
    await expect(page.locator('body.viz-focus')).toHaveCount(1);
    await page.waitForTimeout(150);
    const after = await tallest();
    expect(after).toBeGreaterThan(before * 1.15);
  });
});
```

- [ ] **Step 2: Run to verify fail** — `npx playwright test tests/strsearch_steplog.spec.js --reporter=line` → FAIL.

- [ ] **Step 3: Create `js/domains/strsearch.js`** with this exact content (mirrors `js/domains/search.js`; note `esc(e.text)` in the dropdown):

```js
(function (global) {
  const K = () => global.VizKit;
  const C = () => global.VizCore;
  const R = () => global.VizRegistry;
  const SSF = () => global.StrSearchFrames;

  const DEFAULT_TEXT = () => SSF().STRSEARCH_DEFAULT_TEXT + ' | ' + SSF().STRSEARCH_DEFAULT_PATTERN;
  const FRAMES = {
    'search-kmp': (t, p) => SSF().kmpFrames(t, p),
    'search-bm': (t, p) => SSF().bmFrames(t, p),
    'search-rk': (t, p) => SSF().rkFrames(t, p),
    'search-zalgo': (t, p) => SSF().zalgoFrames(t, p),
    'search-strcompare': (t, p) => SSF().strcompareFrames(t, p),
  };
  const CODE = {
    'search-kmp': () => codeSearchKMP, 'search-bm': () => codeSearchBM, 'search-rk': () => codeSearchRK,
    'search-zalgo': () => codeSearchZAlgo, 'search-strcompare': () => codeSearchStrCompare,
  };
  const _txt = {};

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function loadEx(id) { try { return ExamplesStore.load(localStorage, id); } catch (e) { return []; } }
  function saveEx(id, text) { try { ExamplesStore.save(localStorage, id, text, DEFAULT_TEXT()); } catch (e) {} }
  function exSelectHtml(id) {
    const lang = (global.I18N && I18N.getCurrentLanguage && I18N.getCurrentLanguage() === 'zh') ? 'zh' : 'en';
    let h = '<select class="ex-select"><option value="">' + (lang === 'zh' ? '範例…' : 'Examples…') + '</option>';
    h += '<option value="' + esc(DEFAULT_TEXT()) + '">' + (lang === 'zh' ? '預設' : 'Default') + '</option>';
    for (const e of loadEx(id)) h += '<option value="' + esc(e.text) + '">' + esc(e.text) + '</option>';
    return h + '</select>';
  }
  function clean(s, cap) { return String(s).replace(/[^\x21-\x7e]/g, '').slice(0, cap); }
  function parseStrSearch(text) {
    const idx = String(text).indexOf('|');
    let tt = idx >= 0 ? text.slice(0, idx) : text;
    let pp = idx >= 0 ? text.slice(idx + 1) : '';
    tt = clean(tt.trim(), 40); pp = clean(pp.trim(), 20);
    if (!tt) tt = SSF().STRSEARCH_DEFAULT_TEXT;
    if (!pp) pp = SSF().STRSEARCH_DEFAULT_PATTERN;
    return { text: tt, pattern: pp };
  }

  function alignHtml(f) { return '<div class="strsearch-align">' + SSF().buildAlignmentRow(f.text, f.pattern, f.offset || 0, f.hi) + '</div>'; }
  const PAINT = {
    'search-kmp': (f) => alignHtml(f) +
      '<div class="strsearch-lps"><strong>LPS:</strong> ' + f.extras.lps.map((v, k) => '<span class="strsearch-lps-cell' + (k === f.extras.lpsActive ? ' strsearch-lps-active' : '') + '">' + v + '</span>').join('') + '</div>' +
      '<div class="strsearch-stats" data-testid="kmp-stats">comparisons: ' + f.extras.comparisons + ' &nbsp;|&nbsp; matches: [' + f.extras.matches.join(',') + ']</div>',
    'search-bm': (f) => alignHtml(f) +
      '<div class="strsearch-shift-note" data-testid="bm-note">' + (f.extras.note || '&nbsp;') + '</div>' +
      '<div class="strsearch-stats" data-testid="bm-stats">comparisons: ' + f.extras.comparisons + ' &nbsp;|&nbsp; matches: [' + f.extras.matches.join(',') + ']</div>',
    'search-rk': (f) => alignHtml(f) +
      '<div class="strsearch-hash" data-testid="rk-hash">pattern hash: ' + f.extras.patHash + ' &nbsp;|&nbsp; window hash: ' + f.extras.winHash + '</div>' +
      '<div class="strsearch-shift-note" data-testid="rk-note">' + (f.extras.note || '&nbsp;') + '</div>' +
      '<div class="strsearch-stats">hash checks: ' + f.extras.hashChecks + ' &nbsp;|&nbsp; verifications: ' + f.extras.verifyChecks + ' &nbsp;|&nbsp; matches: [' + f.extras.matches.join(',') + ']</div>',
    'search-zalgo': (f) => {
      const s = f.extras.combined, z = f.extras.z, cur = f.extras.cur, box = f.extras.box, n = s.length, m = f.pattern.length;
      let chr = '<div class="zalgo-row zalgo-chr">', zr = '<div class="zalgo-row zalgo-z">';
      for (let k = 0; k < n; k++) {
        const inBox = box.r > box.l && k >= box.l && k < box.r;
        chr += '<span class="zalgo-cell' + (inBox ? ' zalgo-box' : '') + ((k === cur && cur < n) ? ' zalgo-cur' : '') + '">' + (s[k] === '<' ? '&lt;' : s[k] === '&' ? '&amp;' : s[k]) + '</span>';
        let zval = '-'; if (k > 0 && k < cur) zval = z[k]; else if (k >= cur) zval = '?';
        zr += '<span class="zalgo-cell' + ((k < cur && k > 0 && z[k] === m) ? ' zalgo-match' : '') + '">' + zval + '</span>';
      }
      return '<div class="zalgo-grid">' + chr + '</div>' + zr + '</div>' +
        '<div class="zalgo-stats" data-testid="zalgo-stats">computed: ' + Math.max(0, cur - 1) + ' &nbsp;|&nbsp; matches: [' + f.extras.matches.filter((p) => p + m + 1 < cur).join(',') + ']</div>';
    },
    'search-strcompare': (f) => {
      const pane = (name, title, p) => '<div class="strcompare-pane" data-pane="' + name + '"><h4>' + title + '</h4><div class="strcompare-align">' + SSF().buildAlignmentRow(f.text, f.pattern, p.offset, p.hi) + '</div><div class="strsearch-stats">comparisons: <span class="strcompare-cmp">' + p.cmp + '</span></div></div>';
      return '<div class="strcompare-grid">' + pane('kmp', 'KMP', f.panes.kmp) + pane('bm', 'Boyer-Moore (bad-char)', f.panes.bm) + pane('rk', 'Rabin-Karp', f.panes.rk) + '</div>';
    },
  };

  function renderStrSearch(methodId) {
    const K1 = K();
    const host = K1.acquireDynamicVizHost();
    const lang = (global.I18N && I18N.getCurrentLanguage && I18N.getCurrentLanguage() === 'zh') ? 'zh' : 'en';
    if (!_txt[methodId]) _txt[methodId] = DEFAULT_TEXT();

    function rebuild() {
      host.innerHTML = '';
      const parsed = parseStrSearch(_txt[methodId]);
      const controls = document.createElement('div');
      controls.className = 'strsearch-controls-row';
      controls.innerHTML =
        '<input type="text" class="strsearch-text" data-testid="strsearch-text" value="' + esc(parsed.text) + '" placeholder="text">' +
        '<label class="strsearch-plabel">' + (lang === 'zh' ? '樣式' : 'pattern') + ' <input type="text" class="strsearch-pattern" data-testid="strsearch-pattern" value="' + esc(parsed.pattern) + '"></label>' +
        '<button type="button" class="strsearch-build btn primary">' + (lang === 'zh' ? '建立' : 'Build') + '</button>' +
        '<button type="button" class="rand-btn" title="' + (lang === 'zh' ? '隨機' : 'Random') + '">🎲</button>' +
        exSelectHtml(methodId);
      host.appendChild(controls);

      const frames = FRAMES[methodId](parsed.text, parsed.pattern);
      const stage = document.createElement('div');
      stage.className = 'strsearch-stage';
      function paint(f) { stage.innerHTML = PAINT[methodId](f); }
      host.appendChild(K1.buildStepWorkbench({ stage: stage, frames: frames, paint: paint, getMessage: (f) => K1.langOf(f.message), runIntervalMs: 450 }));

      function applyText(t) { _txt[methodId] = t; saveEx(methodId, t); rebuild(); }
      controls.querySelector('.strsearch-build').addEventListener('click', () => {
        applyText(controls.querySelector('.strsearch-text').value + ' | ' + controls.querySelector('.strsearch-pattern').value);
      });
      controls.querySelector('.rand-btn').addEventListener('click', () => {
        const r = window.RandomInput && RandomInput.randomInputFor('strsearch', K1.getInputDifficulty());
        if (r && r.text) applyText(r.text + ' | ' + r.pattern);
      });
      const ex = controls.querySelector('.ex-select');
      if (ex) ex.addEventListener('change', (e) => { if (e.target.value) applyText(e.target.value); });
    }
    rebuild();
  }

  ['search-kmp', 'search-bm', 'search-rk', 'search-zalgo', 'search-strcompare'].forEach((id) => {
    R().attach(id, { render: () => renderStrSearch(id), code: CODE[id], layout: { host: 'dynamic' } });
  });
  C().registerDomain({ id: 'strsearch' });
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4: Delete the 5 old render files**

```bash
git rm js/viz/viz_kmp.js js/viz/viz_bm.js js/viz/viz_rk.js js/viz/viz_zalgo.js js/viz/viz_strcompare.js
```

- [ ] **Step 5: `index.html`** — remove the 5 old script tags (lines ~491-496: `viz_kmp.js`, `viz_bm.js`, `viz_rk.js`, `viz_zalgo.js`, `viz_strcompare.js`) and add the two new scripts together in their place:

```html
    <script src="js/viz/viz_strsearch_frames.js" defer></script>
    <script src="js/domains/strsearch.js" defer></script>
```

(Order matters: `viz_strsearch_frames.js` before `domains/strsearch.js`.)

- [ ] **Step 6: `js/app.js`** — add `codeDrawer: true` to the 5 METHODS rows `search-kmp`/`search-bm`/`search-rk`/`search-strcompare`/`search-zalgo` (lines ~179-183). Do NOT change their `updateLayout` branches (already code-only).

- [ ] **Step 7: `js/random_input.js`** — add before the `'sort'` case in `randomInputFor`'s switch:

```js
      case 'strsearch': {
        const alpha = 'ABCD';
        const L = difficulty === 'large' ? randInt(rng, 22, 28) : randInt(rng, 14, 20);
        let text = '';
        for (let i = 0; i < L; i++) text += alpha[Math.floor(rng() * alpha.length)];
        let pattern;
        if (rng() < 0.7 && L > 6) { const start = Math.floor(rng() * (L - 4)); pattern = text.substr(start, randInt(rng, 3, 5)); }
        else { const pl = randInt(rng, 3, 5); pattern = ''; for (let i = 0; i < pl; i++) pattern += alpha[Math.floor(rng() * alpha.length)]; }
        return { text, pattern };
      }
```

- [ ] **Step 8: `style.css`** — add:

```css
.strsearch-controls-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 10px; }
.strsearch-text { flex: 1 1 240px; min-width: 160px; }
.strsearch-stage { width: 100%; min-height: 200px; display: flex; flex-direction: column; gap: 10px; overflow: auto; }
body.viz-focus .method-section-card.active .strsearch-stage { flex: 1 1 auto; min-height: 0; }
body.viz-focus .method-section-card.active .strsearch-cell,
body.viz-focus .method-section-card.active .zalgo-cell { min-width: 30px; min-height: 34px; font-size: 1.15rem; }
```

- [ ] **Step 9: Run the E2E** — `npx playwright test tests/strsearch_steplog.spec.js --reporter=line` → PASS (5 methods + fullscreen enlarge). If the fullscreen ancestor class differs, verify against `body.viz-focus`/`.method-section-card.active` and fix the CSS to the real class — do not weaken.

- [ ] **Step 10: Commit**

```bash
git add js/domains/strsearch.js js/app.js index.html style.css js/random_input.js tests/strsearch_steplog.spec.js
git commit -m "feat(dsvisual): string-search observatory (kmp/bm/rk/zalgo/strcompare) + example inputs + fullscreen

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: Rewrite old tests + full gate

**Files:** Modify `tests/visualizer.spec.js`.

- [ ] **Step 1: Rewrite the 5 old per-method blocks** — in `tests/visualizer.spec.js`, the KMP (~528-536), BM (~538-546), RK (~548-556), StrCompare (~558-567), and Z-Algo (~637-643) tests assert the OLD `[data-action="step"]` + stats-counter DOM. Replace each with an observatory assertion that loads the method and checks the new contract. Use this pattern (adapt per method; keep any surrounding describe/imports):

```js
  test('search-kmp renders the observatory (text/pattern inputs + step log + alignment)', async ({ page }) => {
    await loadMethod(page, 'search-kmp');
    const card = page.locator('[data-method-section="search-kmp"]');
    await expect(card.locator('[data-testid="strsearch-text"]')).toBeVisible();
    await expect(card.locator('[data-testid="strsearch-pattern"]')).toBeVisible();
    await expect(card.locator('[data-testid="viz-steplog"]')).toBeVisible();
    expect(await card.locator('.strsearch-align .strsearch-cell').count()).toBeGreaterThan(1);
  });
```

For BM use `[data-method-section="search-bm"]` + `.strsearch-align .strsearch-cell`; RK likewise + assert `[data-testid="rk-hash"]` visible; Z-Algo `[data-method-section="search-zalgo"]` + `.zalgo-cell` count > 1 + `[data-testid="zalgo-stats"]`; StrCompare `[data-method-section="search-strcompare"]` + `.strcompare-pane` count == 3. Do NOT keep any `[data-action="step"]` clicks or old stats-counter assertions for these methods. Leave the smoke-navigation touches (that just `loadMethod('search-kmp')`/`search-zalgo` while cycling) as-is — they still pass.

- [ ] **Step 2: Cross-mode no-crash** — `npx playwright test tests/visualizer.spec.js tests/smoke_modes.spec.js --reporter=line` → PASS.

- [ ] **Step 3: Full-suite gate + guards**

```bash
git status --porcelain js/cloud-config.js js/code_db.js   # expect empty
npm run test:all
```

Expected: all green — unit (`strsearch_frames`: 4 generators match naive + strcompare lockstep) + E2E (`strsearch_steplog`: 5 methods + fullscreen) + rewritten `visualizer` blocks + counts. No `search-kmp/bm/rk/zalgo/strcompare` reference to the old `[data-action]` contract remains; `search-aho` and numeric search unaffected.

- [ ] **Step 4: Commit**

```bash
git add tests/visualizer.spec.js
git commit -m "test(dsvisual): rewrite string-search viz tests for the observatory DOM

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- 4 single-pattern generators + shared `buildAlignmentRow` (consolidated) → Task 1. ✓
- strcompare composite generator (3-pane lockstep) → Task 2. ✓
- `renderStrSearch` + text/pattern inputs + examples + per-method `PAINT` + `buildStepWorkbench` → Task 3 Step 3. ✓
- Hidden source (codeDrawer) → Task 3 Step 6. ✓
- Example input + `RandomInput 'strsearch'` → Task 3 Steps 3, 7. ✓
- Fullscreen enlargement (definite height → `flex:1` in focus) → Task 3 Step 8; E2E Step 1/9. ✓
- Delete 5 old files + script tags → Task 3 Steps 4-5. ✓
- Tests: unit (match-set == naive; strcompare terminates), E2E (5 methods + fullscreen), rewritten visualizer blocks, cross-mode no-crash → Task 1/2 Step 1, Task 3 Step 1, Task 4. ✓
- Preserved DOM hooks (`.strsearch-cell`, `.strsearch-lps-cell`, `rk-hash`, `.zalgo-cell`, `zalgo-stats`, `.strcompare-pane`×3, `.strcompare-cmp`) → Task 3 `PAINT`. ✓

**Placeholder scan:** No TBD/TODO. Full generator + renderStrSearch + PAINT + CSS code given; exact anchors (METHODS 179-183, script tags 491-496, updateLayout unchanged).

**Type/name consistency:** `StrSearchFrames.{kmp,bm,rk,zalgo,strcompare}Frames` + `buildAlignmentRow` in module/FRAMES/PAINT/tests. `codeSearchKMP/BM/RK/ZAlgo/StrCompare` in CODE map (grep `js/code_db.js` confirms these names). Frame shapes: single-pattern `{text,pattern,offset,hi,extras,message}`, composite `{text,pattern,panes:{kmp,bm,rk},message}` — each `PAINT` entry matches its generator's shape. `.strsearch-*`/`.zalgo-*`/`.strcompare-*` classes consistent between PAINT, CSS, and E2E. `getMessage`/`langOf` reuse valid (message is `{zh,en}`).
