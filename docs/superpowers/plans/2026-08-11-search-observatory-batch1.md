# Search viz Observatory (Batch 1/3) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the four numeric-array searches (linear, binary, fibonacci, interpolation) to the sort observatory model — VCR transport + clickable step log + hidden source (code drawer) + example input + fullscreen cell enlargement.

**Architecture:** One self-contained `viz_search_frames.js` with 4 pure generators emitting a unified frame `{array, hi:{index:class}, message:{zh,en}}`. One `renderSearch(methodId)` in `js/domains/search.js` (dynamic host + array/target input row + examples + `buildStepWorkbench`) with one shared cell `paint`. Remove the legacy linear/binary machinery + static DOM and the now-redundant fib/interp render/generator files, carefully clearing the `containers`/`actions` arrays to avoid a null-`classList` crash.

**Tech Stack:** Vanilla JS, plain CSS, Playwright E2E + `node --test`. No app build step.

## Global Constraints

- NEVER modify `js/cloud-config.js`; never hand-edit `js/code_db.js`.
- Do NOT modify `buildFrameControls`/`buildStepWorkbench`, the sort observatory core, `sort-*`, or the string-matching methods (kmp/bm/rk/zalgo/strcompare/aho — those are Batch 2/3).
- Method counts unchanged (114). Classes allowed in `hi`: exactly `lo`, `hi`, `mid`, `found`, `eliminated`.
- **Removal safety:** after deleting `#search-container`/`#search-actions`, NO reference to `searchContainer`/`searchActions`/`btnSearch*`/`searchVal` may remain (they'd be `null` → `null.classList`/`.addEventListener` throws on mode switch / init). Remove array entries, declarations, and handlers together.
- Commit trailer (exact): `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Spec: `docs/superpowers/specs/2026-08-11-search-observatory-batch1-design.md`.

---

## File Structure

- `js/viz/viz_search_frames.js` — NEW: 4 pure generators + `SEARCH_DEFAULT_ARR`/`SEARCH_DEFAULT_TARGET` + `hiOf`; dual-export.
- `js/domains/search.js` — `renderSearch` + `FRAMES` + examples + `esc`; remove legacy (Task 3).
- `js/app.js` — 4 METHODS `codeDrawer:true`; 4 code-panel-only updateLayout branches; remove search container/actions/handlers/arrays (Task 3).
- `index.html` — load `viz_search_frames.js`; remove `#search-actions`/`#search-container` + 4 old fib/interp script tags (Task 3).
- `style.css` — `.searchviz-*` + `.search-cell` + fullscreen enlarge.
- `js/random_input.js` — `'search'` case.
- Tests: `tests/unit/search_frames.test.js` (NEW), `tests/search_steplog.spec.js` (NEW). Delete superseded fib/interp files + tests (Task 3).

---

### Task 1: 4 frame generators + unit tests

**Files:** Create `js/viz/viz_search_frames.js`; Create `tests/unit/search_frames.test.js`.

- [ ] **Step 1: Write the failing unit test** — `tests/unit/search_frames.test.js`:

```js
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
```

- [ ] **Step 2: Run to verify fail** — `node --test tests/unit/search_frames.test.js` → FAIL (module missing).

- [ ] **Step 3: Create `js/viz/viz_search_frames.js`** with this exact content:

```js
(function (global) {
  var SEARCH_DEFAULT_ARR = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  var SEARCH_DEFAULT_TARGET = 11;

  function linearFrames(arr, target) {
    var a = arr.slice(), n = a.length, frames = [];
    function snap(hi, msg) { frames.push({ array: a.slice(), hi: hi, message: msg }); }
    snap({}, { zh: '線性搜尋 target=' + target + ':從索引 0 開始', en: 'Linear search target=' + target + ': start at index 0' });
    for (var i = 0; i < n; i++) {
      var hi = {}; for (var k = 0; k < i; k++) hi[k] = 'eliminated'; hi[i] = 'mid';
      if (a[i] === target) { hi[i] = 'found'; snap(hi, { zh: 'a[' + i + ']=' + a[i] + ' == 目標,命中索引 ' + i, en: 'a[' + i + ']=' + a[i] + ' == target; found at index ' + i }); return frames; }
      snap(hi, { zh: 'a[' + i + ']=' + a[i] + ' != 目標,繼續', en: 'a[' + i + ']=' + a[i] + ' != target; continue' });
    }
    var all = {}; for (var m = 0; m < n; m++) all[m] = 'eliminated';
    snap(all, { zh: '掃描完畢,找不到 ' + target, en: 'Scanned all; ' + target + ' not found' });
    return frames;
  }

  function rangeElim(n, lo, hi) { var h = {}; for (var k = 0; k < lo; k++) h[k] = 'eliminated'; for (var j = hi + 1; j < n; j++) h[j] = 'eliminated'; return h; }

  function binaryFrames(arr, target) {
    var a = arr.slice(), n = a.length, frames = [];
    function snap(hi, msg) { frames.push({ array: a.slice(), hi: hi, message: msg }); }
    snap({}, { zh: '二分搜尋 target=' + target + ':範圍 [0,' + (n - 1) + ']', en: 'Binary search target=' + target + ': range [0,' + (n - 1) + ']' });
    var lo = 0, hi = n - 1;
    while (lo <= hi) {
      var mid = Math.floor((lo + hi) / 2);
      var h = rangeElim(n, lo, hi); if (lo !== mid) h[lo] = 'lo'; if (hi !== mid) h[hi] = 'hi'; h[mid] = 'mid';
      if (a[mid] === target) { h[mid] = 'found'; snap(h, { zh: 'a[' + mid + ']=' + a[mid] + ' == 目標,命中索引 ' + mid, en: 'a[' + mid + ']=' + a[mid] + ' == target; found at index ' + mid }); return frames; }
      if (a[mid] < target) { snap(h, { zh: 'a[' + mid + ']=' + a[mid] + ' < 目標,取右半 lo=' + (mid + 1), en: 'a[' + mid + ']=' + a[mid] + ' < target; go right, lo=' + (mid + 1) }); lo = mid + 1; }
      else { snap(h, { zh: 'a[' + mid + ']=' + a[mid] + ' > 目標,取左半 hi=' + (mid - 1), en: 'a[' + mid + ']=' + a[mid] + ' > target; go left, hi=' + (mid - 1) }); hi = mid - 1; }
    }
    var all = {}; for (var m = 0; m < n; m++) all[m] = 'eliminated';
    snap(all, { zh: '範圍為空,找不到 ' + target, en: 'Range empty; ' + target + ' not found' });
    return frames;
  }

  function fibonacciFrames(arr, target) {
    var a = arr.slice(), n = a.length, frames = [];
    function elim(off) { var h = {}; for (var k = 0; k <= off; k++) h[k] = 'eliminated'; return h; }
    function snap(hi, msg) { frames.push({ array: a.slice(), hi: hi, message: msg }); }
    var fib2 = 0, fib1 = 1, fibM = fib2 + fib1;
    while (fibM < n) { fib2 = fib1; fib1 = fibM; fibM = fib2 + fib1; }
    var offset = -1;
    snap({}, { zh: '費氏搜尋 target=' + target + ':取 ≥ n 的最小費氏數 ' + fibM, en: 'Fibonacci search target=' + target + ': smallest Fib ≥ n is ' + fibM });
    while (fibM > 1) {
      var i = Math.min(offset + fib2, n - 1);
      var h = elim(offset); h[i] = 'mid';
      if (a[i] < target) { snap(h, { zh: 'arr[' + i + ']=' + a[i] + ' < 目標,往右縮小範圍', en: 'arr[' + i + ']=' + a[i] + ' < target; shrink right' }); fibM = fib1; fib1 = fib2; fib2 = fibM - fib1; offset = i; }
      else if (a[i] > target) { snap(h, { zh: 'arr[' + i + ']=' + a[i] + ' > 目標,往左縮小範圍', en: 'arr[' + i + ']=' + a[i] + ' > target; shrink left' }); fibM = fib2; fib1 = fib1 - fib2; fib2 = fibM - fib1; }
      else { h[i] = 'found'; snap(h, { zh: '命中!目標在索引 ' + i, en: 'Hit! target at index ' + i }); return frames; }
    }
    if (fib1 === 1 && offset + 1 < n && a[offset + 1] === target) { var hh = elim(offset); hh[offset + 1] = 'found'; snap(hh, { zh: '比對最後一個元素,命中索引 ' + (offset + 1), en: 'Check last element; hit at index ' + (offset + 1) }); return frames; }
    var all = {}; for (var m = 0; m < n; m++) all[m] = 'eliminated';
    snap(all, { zh: '找不到 ' + target, en: 'Target ' + target + ' not found' });
    return frames;
  }

  function interpolationFrames(arr, target) {
    var a = arr.slice(), n = a.length, frames = [];
    function snap(hi, msg) { frames.push({ array: a.slice(), hi: hi, message: msg }); }
    snap({}, { zh: '內插搜尋 target=' + target + ':範圍 [0,' + (n - 1) + ']', en: 'Interpolation search target=' + target + ': range [0,' + (n - 1) + ']' });
    var lo = 0, hi = n - 1, hit = false;
    while (lo <= hi && target >= a[lo] && target <= a[hi]) {
      if (a[hi] === a[lo]) {
        var he = rangeElim(n, lo, hi); he[lo] = 'mid';
        if (a[lo] === target) { he[lo] = 'found'; snap(he, { zh: '範圍內值相同,命中索引 ' + lo, en: 'Equal-valued range; hit at index ' + lo }); hit = true; }
        else snap(he, { zh: '範圍內值相同但不符,結束', en: 'Equal-valued range, no match' });
        break;
      }
      var pos = lo + Math.floor((target - a[lo]) * (hi - lo) / (a[hi] - a[lo]));
      if (pos < lo) pos = lo; if (pos > hi) pos = hi;
      var h = rangeElim(n, lo, hi); if (lo !== pos) h[lo] = 'lo'; if (hi !== pos) h[hi] = 'hi'; h[pos] = 'mid';
      if (a[pos] === target) { h[pos] = 'found'; snap(h, { zh: '內插位置 ' + pos + ' 命中', en: 'Interpolated position ' + pos + ' hits' }); hit = true; break; }
      else if (a[pos] < target) { snap(h, { zh: 'arr[' + pos + ']=' + a[pos] + ' < 目標,lo = ' + (pos + 1), en: 'arr[' + pos + ']=' + a[pos] + ' < target; lo = ' + (pos + 1) }); lo = pos + 1; }
      else { snap(h, { zh: 'arr[' + pos + ']=' + a[pos] + ' > 目標,hi = ' + (pos - 1), en: 'arr[' + pos + ']=' + a[pos] + ' > target; hi = ' + (pos - 1) }); hi = pos - 1; }
    }
    if (!hit) { var all = {}; for (var m = 0; m < n; m++) all[m] = 'eliminated'; snap(all, { zh: '找不到 ' + target, en: 'Target ' + target + ' not found' }); }
    return frames;
  }

  var api = { linearFrames: linearFrames, binaryFrames: binaryFrames, fibonacciFrames: fibonacciFrames, interpolationFrames: interpolationFrames, SEARCH_DEFAULT_ARR: SEARCH_DEFAULT_ARR, SEARCH_DEFAULT_TARGET: SEARCH_DEFAULT_TARGET };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.SearchFrames = api;
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4: Run to verify pass** — `node --test tests/unit/search_frames.test.js` → PASS. If a generator's final frame fails the found-cell check, FIX the generator (never weaken the test).

- [ ] **Step 5: Commit**

```bash
git add js/viz/viz_search_frames.js tests/unit/search_frames.test.js
git commit -m "feat(dsvisual): unified search frame generators (linear/binary/fibonacci/interpolation)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Wire all 4 to the observatory + fullscreen + E2E

**Files:** Modify `js/domains/search.js`, `js/app.js`, `style.css`, `js/random_input.js`, `index.html`; Delete `js/viz/viz_search_fib.js`, `js/viz/viz_search_interp.js`; Create `tests/search_steplog.spec.js`.

- [ ] **Step 1: Write the failing E2E** — `tests/search_steplog.spec.js`:

```js
const { test, expect } = require('@playwright/test');
const path = require('path');
const { loadMethod } = require('./helpers.js');

const SEARCHES = [
  ['search-linear', 'search_linear.cpp'],
  ['search-binary', 'search_binary.cpp'],
  ['search-fibonacci', 'search_fibonacci.cpp'],
  ['search-interpolation', 'search_interpolation.cpp'],
];

test.describe('Search viz observatory (batch 1)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  for (const [id, file] of SEARCHES) {
    test(`${id}: input + examples + VCR + step log + drawer`, async ({ page }) => {
      await loadMethod(page, id);
      const card = page.locator(`[data-method-section="${id}"]`);
      await expect(card.locator('[data-testid="searchviz-arr"]')).toBeVisible();
      await expect(card.locator('[data-testid="searchviz-target"]')).toBeVisible();
      await expect(card.locator('.ex-select')).toBeVisible();
      await expect(card.locator('.viz-workbench')).toBeVisible();
      await expect(card.locator('[data-testid="viz-steplog"]')).toBeVisible();
      await expect(card.locator('.stepctl')).toBeVisible();
      await expect(card.locator('[data-testid="code-drawer"] .code-panel-filename')).toContainText(file);
      await expect(page.locator('#search-container')).toHaveCount(0);

      const cells = card.locator('.searchviz-stage .search-cell');
      const cellCount = await cells.count();
      expect(cellCount).toBeGreaterThan(1);
      const rows = card.locator('.viz-logrow');
      const max = parseInt(await card.locator('.stepctl-scrubber').getAttribute('max'), 10);
      await expect(rows).toHaveCount(max + 1);
      // scrub to the final frame
      await card.locator('.stepctl-scrubber').evaluate((el) => { el.value = el.max; el.dispatchEvent(new Event('input', { bubbles: true })); });
      // default input (target present) → exactly one found cell at the end
      await expect(card.locator('.searchviz-stage .search-cell.found')).toHaveCount(1);
    });
  }

  test('search-binary: bars/cells enlarge in fullscreen', async ({ page }) => {
    await loadMethod(page, 'search-binary');
    const card = page.locator('[data-method-section="search-binary"]');
    const tallest = () => card.locator('.searchviz-stage .search-cell').evaluateAll((els) => Math.max(...els.map((e) => e.getBoundingClientRect().height)));
    const before = await tallest();
    await card.locator('[data-testid="viz-focus-toggle"]').click();
    await expect(page.locator('body.viz-focus')).toHaveCount(1);
    await page.waitForTimeout(150);
    const after = await tallest();
    expect(after).toBeGreaterThan(before * 1.2);
  });
});
```

- [ ] **Step 2: Run to verify fail** — `npx playwright test tests/search_steplog.spec.js --reporter=line` → FAIL.

- [ ] **Step 3: Rewrite `js/domains/search.js`** — replace the whole file body with the observatory renderer (keep the IIFE wrapper + `K/C/R` helpers). This supersedes `renderSearchArray`/`run*Search`/`init`:

```js
(function (global) {
  const K = () => global.VizKit;
  const C = () => global.VizCore;
  const R = () => global.VizRegistry;

  const SF = () => global.SearchFrames;
  const DEFAULT_TEXT = () => SF().SEARCH_DEFAULT_ARR.join(',') + ' | ' + SF().SEARCH_DEFAULT_TARGET;
  const FRAMES = {
    'search-linear': (a, t) => SF().linearFrames(a, t),
    'search-binary': (a, t) => SF().binaryFrames(a, t),
    'search-fibonacci': (a, t) => SF().fibonacciFrames(a, t),
    'search-interpolation': (a, t) => SF().interpolationFrames(a, t),
  };
  const CODE = {
    'search-linear': () => codeSearchLinear, 'search-binary': () => codeSearchBinary,
    'search-fibonacci': () => codeSearchFibonacci, 'search-interpolation': () => codeSearchInterpolation,
  };
  const _txt = {}; // per-method last input ("arr | target")

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function loadEx(id) { try { return ExamplesStore.load(localStorage, id); } catch (e) { return []; } }
  function saveEx(id, text) { try { ExamplesStore.save(localStorage, id, text, DEFAULT_TEXT()); } catch (e) {} }
  function exSelectHtml(id) {
    const lang = (global.I18N && I18N.getCurrentLanguage && I18N.getCurrentLanguage() === 'zh') ? 'zh' : 'en';
    let h = '<select class="ex-select"><option value="">' + (lang === 'zh' ? '範例…' : 'Examples…') + '</option>';
    h += '<option value="' + esc(DEFAULT_TEXT()) + '">' + (lang === 'zh' ? '預設' : 'Default') + '</option>';
    for (const t of loadEx(id)) h += '<option value="' + esc(t) + '">' + esc(t) + '</option>';
    return h + '</select>';
  }
  function parseSearch(text) {
    const parts = String(text).split('|');
    let arr = (parts[0] || '').split(/[\s,]+/).map((s) => parseInt(s, 10)).filter(Number.isFinite).filter((v) => v >= 1 && v <= 99).slice(0, 20);
    let target = parseInt((parts[1] || '').trim(), 10);
    if (arr.length < 2) arr = SF().SEARCH_DEFAULT_ARR.slice();
    if (!Number.isFinite(target)) target = SF().SEARCH_DEFAULT_TARGET;
    return { arr, target };
  }

  function renderSearch(methodId) {
    const K1 = K();
    const host = K1.acquireDynamicVizHost();
    const lang = (global.I18N && I18N.getCurrentLanguage && I18N.getCurrentLanguage() === 'zh') ? 'zh' : 'en';
    if (!_txt[methodId]) _txt[methodId] = DEFAULT_TEXT();

    function rebuild() {
      host.innerHTML = '';
      const parsed = parseSearch(_txt[methodId]);
      const arr = methodId === 'search-linear' ? parsed.arr : parsed.arr.slice().sort((a, b) => a - b);
      const target = parsed.target;

      const controls = document.createElement('div');
      controls.className = 'searchviz-controls';
      controls.innerHTML =
        '<input type="text" class="searchviz-arr" data-testid="searchviz-arr" value="' + esc(arr.join(',')) + '">' +
        '<label class="searchviz-tlabel">' + (lang === 'zh' ? '目標' : 'target') + ' <input type="number" class="searchviz-target" data-testid="searchviz-target" value="' + esc(target) + '"></label>' +
        '<button type="button" class="searchviz-build btn primary">' + (lang === 'zh' ? '建立' : 'Build') + '</button>' +
        '<button type="button" class="rand-btn" title="' + (lang === 'zh' ? '隨機' : 'Random') + '">🎲</button>' +
        exSelectHtml(methodId);
      host.appendChild(controls);

      const frames = FRAMES[methodId](arr, target);
      const stage = document.createElement('div');
      stage.className = 'searchviz-stage';
      function paint(f) {
        stage.innerHTML = f.array.map((v, i) =>
          '<div class="search-cell ' + (f.hi[i] || '') + '"><span class="val">' + v + '</span><i class="idx">' + i + '</i></div>'
        ).join('');
      }
      host.appendChild(K1.buildStepWorkbench({ stage: stage, frames: frames, paint: paint, getMessage: (f) => K1.langOf(f.message), runIntervalMs: 500 }));

      function applyText(text) { _txt[methodId] = text; saveEx(methodId, text); rebuild(); }
      controls.querySelector('.searchviz-build').addEventListener('click', () => {
        applyText(controls.querySelector('.searchviz-arr').value + ' | ' + controls.querySelector('.searchviz-target').value);
      });
      controls.querySelector('.rand-btn').addEventListener('click', () => {
        const r = window.RandomInput && RandomInput.randomInputFor('search', K1.getInputDifficulty());
        if (r && Array.isArray(r.data) && r.data.length) applyText(r.data.join(',') + ' | ' + r.target);
      });
      const ex = controls.querySelector('.ex-select');
      if (ex) ex.addEventListener('change', (e) => { if (e.target.value) applyText(e.target.value); });
    }
    rebuild();
  }

  R().attach('search-linear', { render: () => renderSearch('search-linear'), code: CODE['search-linear'], layout: { host: 'dynamic' } });
  R().attach('search-binary', { render: () => renderSearch('search-binary'), code: CODE['search-binary'], layout: { host: 'dynamic' } });
  R().attach('search-fibonacci', { render: () => renderSearch('search-fibonacci'), code: CODE['search-fibonacci'], layout: { host: 'dynamic' } });
  R().attach('search-interpolation', { render: () => renderSearch('search-interpolation'), code: CODE['search-interpolation'], layout: { host: 'dynamic' } });
  C().registerDomain({ id: 'search' });
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4: Delete the old fib/interp render files (avoid double-attach)** — the pure generators are superseded by `viz_search_frames.js`:

```bash
git rm js/viz/viz_search_fib.js js/viz/viz_search_interp.js js/search_fibonacci_viz.js js/search_interpolation_viz.js
```

- [ ] **Step 5: `index.html`** — load the new frames module before `js/domains/search.js`, and remove the 4 old script tags. Change the region around line 412-415 + 463-466:
  - Add `<script src="js/viz/viz_search_frames.js" defer></script>` immediately before `<script src="js/domains/search.js" defer></script>`.
  - Delete the 4 lines: `js/search_fibonacci_viz.js`, `js/viz/viz_search_fib.js`, `js/search_interpolation_viz.js`, `js/viz/viz_search_interp.js`.

- [ ] **Step 6: `js/app.js` — codeDrawer + updateLayout branches (4)**

(a) The 4 METHODS rows (`search-linear`/`search-binary`/`search-fibonacci`/`search-interpolation`) gain `codeDrawer: true`.

(b) Replace the existing `search-linear`/`search-binary`/`search-fibonacci`/`search-interpolation` branches in `updateLayout` with code-panel-only (no container references):

```js
        else if (currentMode === 'search-linear') { codeTitle.textContent = 'search_linear.cpp'; codeDisplay.textContent = codeSearchLinear; }
        else if (currentMode === 'search-binary') { codeTitle.textContent = 'search_binary.cpp'; codeDisplay.textContent = codeSearchBinary; }
        else if (currentMode === 'search-fibonacci') { codeTitle.textContent = 'search_fibonacci.cpp'; codeDisplay.textContent = codeSearchFibonacci; }
        else if (currentMode === 'search-interpolation') { codeTitle.textContent = 'search_interpolation.cpp'; codeDisplay.textContent = codeSearchInterpolation; }
```

(Leave `#search-container`/`#search-actions` HTML and the app.js container/handler references for Task 3.)

- [ ] **Step 7: `js/random_input.js` — `'search'` case** — add before the `'sort'` case in `randomInputFor`'s switch:

```js
      case 'search': {
        const data = valSeq(rng, difficulty);
        const target = rng() < 0.6 ? data[Math.floor(rng() * data.length)] : randInt(rng, 1, 99);
        return { data, target };
      }
```

- [ ] **Step 8: `style.css` — cells + fullscreen enlarge** — add:

```css
.searchviz-controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 10px; }
.searchviz-arr { flex: 1 1 220px; min-width: 160px; }
.searchviz-stage { width: 100%; height: 220px; display: flex; align-items: center; justify-content: center; gap: 6px; flex-wrap: wrap; overflow: auto; }
.search-cell { min-width: 40px; min-height: 44px; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 2px solid var(--border, #334155); border-radius: 8px; background: var(--panel, #1e293b); transition: background .2s, transform .2s; }
.search-cell .val { font-weight: 700; }
.search-cell .idx { font-size: .7rem; opacity: .55; font-style: normal; }
.search-cell.lo { border-color: #38bdf8; }
.search-cell.hi { border-color: #a78bfa; }
.search-cell.mid { background: #ca8a04; color: #fff; }
.search-cell.found { background: #16a34a; color: #fff; border-color: #16a34a; }
.search-cell.eliminated { opacity: .3; }
body.viz-focus .method-section-card.active .searchviz-stage { flex: 1 1 auto; height: auto; min-height: 0; }
body.viz-focus .method-section-card.active .search-cell { min-width: 60px; min-height: 68px; font-size: 1.3rem; }
```

- [ ] **Step 9: Run the E2E** — `npx playwright test tests/search_steplog.spec.js --reporter=line` → PASS (4 methods + fullscreen enlarge). If the fullscreen ancestor class differs, verify against `body.viz-focus`/`.method-section-card.active` (established in PR #203) and fix the CSS to the real class — do not weaken.

- [ ] **Step 10: Commit**

```bash
git add js/domains/search.js js/app.js style.css js/random_input.js index.html tests/search_steplog.spec.js
git commit -m "feat(dsvisual): search observatory for linear/binary/fibonacci/interpolation + fullscreen enlarge

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Remove linear/binary legacy DOM + reconcile old tests + full gate

**Files:** Modify `js/app.js`, `index.html`; Delete `tests/search_fibonacci.spec.js`, `tests/search_interpolation.spec.js`, `tests/unit/search_fibonacci_viz.test.js`, `tests/unit/search_interpolation_viz.test.js`; possibly touch `tests/visualizer.spec.js`, `tests/smoke_modes.spec.js`, `tests/random_input.spec.js`.

- [ ] **Step 1: Remove the static DOM from `index.html`** — delete `#search-actions` (lines ~95-100, the whole `<div class="actions hidden" id="search-actions"> … </div>`) and `#search-container` (line ~191).

- [ ] **Step 2: Remove search refs from `js/app.js`** — delete all of:
  - `const searchContainer = document.getElementById('search-container');` (line ~1373)
  - `const searchActions = document.getElementById('search-actions');` (line ~1378)
  - `const btnSearchGo/btnSearchPause/btnSearchStop/searchVal` (line ~1394) and `const btnSearchRandom` (line ~1395)
  - `btnSearchPause.addEventListener(...)` (~1611) and `btnSearchStop.addEventListener(...)` (~1613)
  - the `if(currentMode.includes('search'))` branch in `setAnimControls` (~1615)
  - the `else if (currentMode.includes('search'))` branch in `handleStopClick` (~1612 region)
  - `searchContainer` from the `containers` array (~1656) and `searchActions` from the `actions` array (~1657)

  Then grep `js/app.js` for `searchContainer|searchActions|btnSearch|searchVal` → ZERO matches must remain. Do NOT touch `search-*` code-panel branches from Task 2 or any string-search code (`codeSearchKMP` etc.).

- [ ] **Step 3: Delete superseded tests** — the old fib/interp UI E2E and pure-generator unit tests (coverage replaced by `search_steplog.spec.js` + `search_frames.test.js`):

```bash
git rm tests/search_fibonacci.spec.js tests/search_interpolation.spec.js tests/unit/search_fibonacci_viz.test.js tests/unit/search_interpolation_viz.test.js
```

- [ ] **Step 4: Reconcile other test references** — grep and fix:

```bash
grep -nE "search-linear|search-binary|search-fibonacci|search-interpolation|#search-container|#search-actions|ss-arr|ss-target" tests/visualizer.spec.js tests/smoke_modes.spec.js tests/random_input.spec.js
```

For any assertion that targets the OLD search UI (`#search-container`, `#search-actions`, `.ss-arr`, legacy Find button), update it to the observatory (`.searchviz-arr`, `.search-cell`, `.viz-workbench`) or, if it was a legacy-coexistence check now obsolete, remove that specific assertion. If `random_input.spec.js` has a search-targeted difficulty test on the old container, repoint it to `.searchviz-stage .search-cell` (like sort's). Do not weaken unrelated assertions.

- [ ] **Step 5: Verify no crash across modes** — `npx playwright test tests/smoke_modes.spec.js tests/visualizer.spec.js --reporter=line` → PASS (switching to any method, search and non-search, does not throw; the null-`classList` risk is gone).

- [ ] **Step 6: Full-suite gate + guards**

```bash
git status --porcelain js/cloud-config.js js/code_db.js   # expect empty
npm run test:all
```

Expected: all green — unit (`search_frames` 4 generators) + E2E (`search_steplog` 4 searches + fullscreen) + counts + `random_input` + `random_push`. `#search-actions`/`#search-container` absent; kmp/bm/rk/zalgo/strcompare/aho unaffected.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "refactor(dsvisual): remove legacy search DOM + superseded fib/interp files (all numeric search now observatory)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- Unified 4 generators (linear/binary/fibonacci/interpolation), classes `lo/mid/hi/found/eliminated` → Task 1. ✓
- `renderSearch` + array/target input + examples + `esc` + `buildStepWorkbench` + single cell paint → Task 2 Step 3. ✓
- Hidden source (codeDrawer) + code-only updateLayout branches → Task 2 Step 6. ✓
- Example input (array+target) + `RandomInput 'search'` → Task 2 Steps 3, 7. ✓
- Fullscreen cell enlargement (definite height → `flex:1` in focus) reusing PR #203 → Task 2 Step 8; E2E Step 1/9. ✓
- Legacy removal with null-`classList` guard → Task 3 Steps 1-2. ✓
- Port fib/interp + delete redundant files/tests → Task 2 Step 4, Task 3 Step 3. ✓
- Tests: unit (found-cell iff present, array-immutable every frame, monotonic shrink), E2E (4 + fullscreen), cross-mode no-crash, counts → Task 1 Step 1, Task 2 Step 1, Task 3 Steps 4-6. ✓

**Placeholder scan:** No TBD/TODO. Full generator + renderSearch + CSS code given; exact line anchors for removals (searchContainer 1373, searchActions 1378, btnSearch* 1394-95, arrays 1656-57, updateLayout 1845-46, script tags 463-466).

**Type/name consistency:** `SearchFrames.{linear,binary,fibonacci,interpolation}Frames` in module/FRAMES/tests. `codeSearchLinear/Binary/Fibonacci/Interpolation` in CODE map + updateLayout (confirm the exact var name for interpolation is `codeSearchInterpolation` when wiring — grep `js/code_db.js`; if it differs, use the real name in both the CODE map and updateLayout). `.searchviz-arr`/`.searchviz-target`/`.search-cell`/`.searchviz-stage` consistent between renderSearch, CSS, and E2E. Frame model `{array, hi, message}` identical to sort's, so `buildStepWorkbench`/`langOf` reuse is valid.
