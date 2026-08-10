# Sort viz Observatory (Batch 1/3) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `sort-bubble`, `sort-select`, `sort-insert` to the graph/tree observatory model — VCR transport + clickable step log + examples input + code drawer — via a new pure frame-generator module and a new `renderSort`, reusing `buildStepWorkbench`. The other 8 sorts stay on the legacy model (removed in Batch 3).

**Architecture:** `js/viz/viz_sort_frames.js` (pure, dual-export) turns each imperative sort into a frame list `[{array, hi:{index:class}, message:{zh,en}}]`. `renderSort(methodId)` (in `js/domains/sort.js`) renders into the dynamic viz host: an input row (array text + Build + 🎲 + examples) above `buildStepWorkbench({stage: barsEl, frames, paint, getMessage, runIntervalMs})`; `paint` draws `.sort-bar`s from a frame. The 3 methods gain `codeDrawer:true` and a code-panel-only `updateLayout` branch (so the legacy `#sort-actions`/`#sort-container` no longer shows for them). `buildFrameControls`/`buildStepWorkbench` unchanged.

**Tech Stack:** Vanilla JS (IIFE dual-export module + domain module), plain CSS, Playwright E2E + `node --test`. No app build step.

## Global Constraints

- NEVER modify `js/cloud-config.js` (if touched: `git checkout js/cloud-config.js`); never hand-edit `js/code_db.js`.
- Do NOT modify `buildFrameControls`/`buildStepWorkbench` (js/app.js) — only consume them.
- Do NOT touch the OTHER 8 sorts' legacy render/attach (`sort-quick/merge/shell/bucket/count/radix/heap/shaker`), `sort-external`, `sort-polyphase`, or other domains. Legacy `renderSortBars`/`run*Sort`/`animState`/`init`/`#sort-actions`/`#sort-container` STAY (removed in Batch 3).
- Method counts unchanged; dynamic count tests stay green.
- `paint` must operate only on the `stage` element passed to `buildStepWorkbench` (never `host.querySelector`) — the initial `paint()` runs while the stage is detached.
- Commit trailer (exact): `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Spec: `docs/superpowers/specs/2026-08-06-sort-vcr-steplog-batch1-design.md`.

---

## File Structure

- `js/viz/viz_sort_frames.js` — NEW pure module: `bubbleFrames`/`selectionFrames`/`insertionFrames`, `SORT_DEFAULT`, dual-export `SortFrames`.
- `js/domains/sort.js` — add `renderSort` + examples helpers; switch the 3 methods' `attach` to `renderSort`. Leave the other 8 untouched.
- `js/app.js` — 3 METHODS rows gain `codeDrawer:true` (lines 158-160); 3 code-panel-only branches added before the `currentMode.includes('sort-')` catch-all (~line 1909).
- `index.html` — load `js/viz/viz_sort_frames.js` before `js/domains/sort.js` (line 425).
- `style.css` — `.sortviz-stage` + `.sortviz-controls`.
- Tests: `tests/unit/sort_frames.test.js`, `tests/sort_steplog.spec.js`.

---

### Task 1: `viz_sort_frames.js` frame generators + unit tests

**Files:** Create `js/viz/viz_sort_frames.js`; Test `tests/unit/sort_frames.test.js`.

**Interfaces:** Produces `SortFrames.{bubbleFrames, selectionFrames, insertionFrames}(arr) → [{array:number[], hi:{[i]:class}, message:{zh,en}}]` and `SortFrames.SORT_DEFAULT`.

- [ ] **Step 1: Write the failing unit tests**

Create `tests/unit/sort_frames.test.js`:

```js
const assert = require('node:assert');
const { test } = require('node:test');
const SF = require('../../js/viz/viz_sort_frames.js');

const GENS = { bubble: SF.bubbleFrames, selection: SF.selectionFrames, insertion: SF.insertionFrames };
const INPUTS = [
  SF.SORT_DEFAULT,
  [5, 4, 3, 2, 1],           // reverse
  [1, 2, 3, 4, 5],           // already sorted
  [3, 1, 3, 2, 3, 1],        // duplicates
  [42],                      // single
  [7, 7, 7],                 // all equal
];
const ALLOWED = new Set(['', 'comparing', 'swapping', 'sorted', 'pivot']);

for (const [name, gen] of Object.entries(GENS)) {
  for (const input of INPUTS) {
    test(`${name}Frames sorts ${JSON.stringify(input)}`, () => {
      const frames = gen(input);
      assert.ok(frames.length >= 1, 'non-empty');
      const finalArr = frames[frames.length - 1].array;
      // sorted ascending
      for (let i = 1; i < finalArr.length; i++) assert.ok(finalArr[i - 1] <= finalArr[i], 'ascending');
      // permutation of input (multiset equal)
      assert.deepStrictEqual([...finalArr].sort((a, b) => a - b), [...input].sort((a, b) => a - b));
      // every frame: bilingual message, valid hi classes, array is a permutation
      for (const f of frames) {
        assert.ok(f.message && f.message.zh && f.message.en, 'bilingual message');
        assert.deepStrictEqual([...f.array].sort((a, b) => a - b), [...input].sort((a, b) => a - b), 'frame array is a permutation');
        for (const k of Object.keys(f.hi || {})) assert.ok(ALLOWED.has(f.hi[k]), 'valid class ' + f.hi[k]);
      }
    });
  }
}

test('SORT_DEFAULT is a small distinct-ish array', () => {
  assert.ok(Array.isArray(SF.SORT_DEFAULT) && SF.SORT_DEFAULT.length >= 5);
});
```

- [ ] **Step 2: Run to verify fail**

Run: `node --test tests/unit/sort_frames.test.js`
Expected: FAIL — module missing.

- [ ] **Step 3: Implement `js/viz/viz_sort_frames.js`**

Create the module (IIFE dual-export). `bubbleFrames` is the full template; `selectionFrames`/`insertionFrames` follow the same snapshot pattern, converted from the existing imperative logic in `js/domains/sort.js` (`runSelectionSort`/`runInsertionSort` — read them). Every compare / swap / settle pushes one frame; sorted-so-far indices keep the `sorted` class across frames.

```js
(function (global) {
  'use strict';

  var SORT_DEFAULT = [5, 2, 8, 1, 9, 3, 7, 4, 6];

  // merge the persistent "sorted" map with the current-step highlight map
  function hiOf(sorted, cur) {
    var h = {}, k;
    for (k in sorted) h[k] = sorted[k];
    for (k in cur) h[k] = cur[k];
    return h;
  }

  function bubbleFrames(input) {
    var a = input.slice(), n = a.length, frames = [], sorted = {};
    function snap(cur, msg) { frames.push({ array: a.slice(), hi: hiOf(sorted, cur), message: msg }); }
    snap({}, { zh: '起始陣列', en: 'Initial array' });
    for (var i = 0; i < n - 1; i++) {
      for (var j = 0; j < n - i - 1; j++) {
        var c = {}; c[j] = 'comparing'; c[j + 1] = 'comparing';
        snap(c, { zh: '比較 a[' + j + ']=' + a[j] + ' 與 a[' + (j + 1) + ']=' + a[j + 1], en: 'Compare a[' + j + ']=' + a[j] + ' and a[' + (j + 1) + ']=' + a[j + 1] });
        if (a[j] > a[j + 1]) {
          var t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
          var s = {}; s[j] = 'swapping'; s[j + 1] = 'swapping';
          snap(s, { zh: '交換 a[' + j + '] ↔ a[' + (j + 1) + ']', en: 'Swap a[' + j + '] ↔ a[' + (j + 1) + ']' });
        }
      }
      sorted[n - i - 1] = 'sorted';
    }
    sorted[0] = 'sorted';
    var all = {}; for (var k = 0; k < n; k++) all[k] = 'sorted';
    frames.push({ array: a.slice(), hi: all, message: { zh: '排序完成', en: 'Sorted' } });
    return frames;
  }

  function selectionFrames(input) {
    var a = input.slice(), n = a.length, frames = [], sorted = {};
    function snap(cur, msg) { frames.push({ array: a.slice(), hi: hiOf(sorted, cur), message: msg }); }
    snap({}, { zh: '起始陣列', en: 'Initial array' });
    for (var i = 0; i < n - 1; i++) {
      var min = i;
      for (var j = i + 1; j < n; j++) {
        var c = {}; c[min] = 'pivot'; c[j] = 'comparing';
        snap(c, { zh: '掃描:目前最小 a[' + min + ']=' + a[min] + ',比較 a[' + j + ']=' + a[j], en: 'Scan: current min a[' + min + ']=' + a[min] + ', compare a[' + j + ']=' + a[j] });
        if (a[j] < a[min]) min = j;
      }
      if (min !== i) { var t = a[i]; a[i] = a[min]; a[min] = t; }
      var s = {}; s[i] = 'swapping';
      snap(s, { zh: '將最小值放到位置 ' + i, en: 'Place the minimum at position ' + i });
      sorted[i] = 'sorted';
    }
    var all = {}; for (var k = 0; k < n; k++) all[k] = 'sorted';
    frames.push({ array: a.slice(), hi: all, message: { zh: '排序完成', en: 'Sorted' } });
    return frames;
  }

  function insertionFrames(input) {
    var a = input.slice(), n = a.length, frames = [], sorted = {};
    function snap(cur, msg) { frames.push({ array: a.slice(), hi: hiOf(sorted, cur), message: msg }); }
    snap({}, { zh: '起始陣列', en: 'Initial array' });
    sorted[0] = 'sorted';
    for (var i = 1; i < n; i++) {
      var key = a[i], j = i - 1;
      var pick = {}; pick[i] = 'swapping';
      snap(pick, { zh: '取出 key=a[' + i + ']=' + key + ',往左插入', en: 'Take key=a[' + i + ']=' + key + ', insert leftward' });
      while (j >= 0 && a[j] > key) {
        var c = {}; c[j] = 'comparing'; c[j + 1] = 'comparing';
        snap(c, { zh: 'a[' + j + ']=' + a[j] + ' > key,右移', en: 'a[' + j + ']=' + a[j] + ' > key, shift right' });
        a[j + 1] = a[j];
        j--;
      }
      a[j + 1] = key;
      for (var s = 0; s <= i; s++) sorted[s] = 'sorted';
      snap({}, { zh: 'key 插入位置 ' + (j + 1), en: 'key inserted at position ' + (j + 1) });
    }
    var all = {}; for (var k = 0; k < n; k++) all[k] = 'sorted';
    frames.push({ array: a.slice(), hi: all, message: { zh: '排序完成', en: 'Sorted' } });
    return frames;
  }

  var api = { bubbleFrames: bubbleFrames, selectionFrames: selectionFrames, insertionFrames: insertionFrames, SORT_DEFAULT: SORT_DEFAULT };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.SortFrames = api;
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4: Run to verify pass**

Run: `node --test tests/unit/sort_frames.test.js`
Expected: PASS (all inputs × 3 generators sorted + permutation).

- [ ] **Step 5: Commit**

```bash
git add js/viz/viz_sort_frames.js tests/unit/sort_frames.test.js
git commit -m "feat(dsvisual): viz_sort_frames — frame generators for bubble/selection/insertion

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: `renderSort` + wiring + E2E + gate

**Files:** Modify `js/domains/sort.js`, `js/app.js`, `index.html`, `style.css`; Test `tests/sort_steplog.spec.js`.

**Interfaces:** Consumes `SortFrames` (Task 1) + `K().buildStepWorkbench`. Produces `renderSort(methodId)`; the 3 methods rendered via the dynamic host.

- [ ] **Step 1: Write the failing E2E**

Create `tests/sort_steplog.spec.js` (mirror `tests/tree_steplog.spec.js` harness — `loadMethod` from `./helpers.js`, `beforeEach` `dsvisual-lang=en` + `file://` goto + viewport 1400x900):

```js
const { test, expect } = require('@playwright/test');
const path = require('path');
const { loadMethod } = require('./helpers.js');

const SORTS = [
  ['sort-bubble', 'sort_bubble.cpp'],
  ['sort-select', 'sort_selection.cpp'],
  ['sort-insert', 'sort_insertion.cpp'],
];

test.describe('Sort viz observatory (batch 1)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  for (const [id, file] of SORTS) {
    test(`${id}: input + examples + VCR + step log + drawer; final all sorted`, async ({ page }) => {
      await loadMethod(page, id);
      const card = page.locator(`[data-method-section="${id}"]`);
      await expect(card.locator('[data-testid="sortviz-input"]')).toBeVisible();
      await expect(card.locator('.ex-select')).toBeVisible();
      await expect(card.locator('.viz-workbench')).toBeVisible();
      await expect(card.locator('[data-testid="viz-steplog"]')).toBeVisible();
      await expect(card.locator('.stepctl')).toBeVisible();
      await expect(card.locator('[data-testid="code-drawer"] .code-panel-filename')).toContainText(file);
      // legacy static bar not shown for converted sorts
      await expect(card.locator('#sort-actions')).toHaveCount(0);

      const bars = card.locator('.sortviz-stage .sort-bar');
      const barCount = await bars.count();
      expect(barCount).toBeGreaterThan(1);
      // rows == frames == scrubber max+1
      const rows = card.locator('.viz-logrow');
      const max = parseInt(await card.locator('.stepctl-scrubber').getAttribute('max'), 10);
      await expect(rows).toHaveCount(max + 1);
      await expect(rows.nth(0)).toHaveClass(/\bon\b/);

      // scrub to final frame → all bars sorted, ascending heights
      await card.locator('.stepctl-scrubber').evaluate((el) => { el.value = el.max; el.dispatchEvent(new Event('input', { bubbles: true })); });
      await expect(card.locator('.sortviz-stage .sort-bar.sorted')).toHaveCount(barCount);
      const heights = await bars.evaluateAll((els) => els.map((e) => parseFloat(e.style.height)));
      for (let i = 1; i < heights.length; i++) expect(heights[i]).toBeGreaterThanOrEqual(heights[i - 1]);
    });
  }

  test('legacy sorts still work: sort-quick shows the legacy container', async ({ page }) => {
    await loadMethod(page, 'sort-quick');
    // unconverted → legacy static container still used
    await expect(page.locator('#sort-container')).toBeVisible();
  });
});
```

- [ ] **Step 2: Run to verify fail**

Run: `npx playwright test tests/sort_steplog.spec.js --reporter=line`
Expected: FAIL — converted sorts not implemented (no `.sortviz-input`/`.viz-workbench`).

- [ ] **Step 3: Add `renderSort` + examples helpers to `js/domains/sort.js`**

Add examples helpers (wrap `ExamplesStore`, like `viz_graph_matrix.js`) and `renderSort(methodId)` near the top of the IIFE:

```js
  const DEFAULT_TEXT = (global.SortFrames ? global.SortFrames.SORT_DEFAULT : [5,2,8,1,9,3,7,4,6]).join(',');
  const FRAMES = {
    'sort-bubble': (a) => global.SortFrames.bubbleFrames(a),
    'sort-select': (a) => global.SortFrames.selectionFrames(a),
    'sort-insert': (a) => global.SortFrames.insertionFrames(a),
  };
  const _sortText = {}; // per-method last input

  function loadEx(id) { try { return ExamplesStore.load(localStorage, id); } catch (e) { return []; } }
  function saveEx(id, text) { try { ExamplesStore.save(localStorage, id, text, DEFAULT_TEXT); } catch (e) {} }
  function exSelectHtml(id) {
    const lang = (global.I18N && I18N.getCurrentLanguage && I18N.getCurrentLanguage() === 'zh') ? 'zh' : 'en';
    let h = '<select class="ex-select"><option value="">' + (lang === 'zh' ? '範例…' : 'Examples…') + '</option>';
    h += '<option value="' + DEFAULT_TEXT + '">' + (lang === 'zh' ? '預設' : 'Default') + '</option>';
    for (const t of loadEx(id)) h += '<option value="' + t + '">' + t + '</option>';
    return h + '</select>';
  }
  function parseArr(text) {
    let a = String(text).split(/[\s,]+/).map((s) => parseInt(s, 10)).filter(Number.isFinite);
    a = a.filter((v) => v >= 1 && v <= 99).slice(0, 20);
    return a.length >= 2 ? a : (global.SortFrames ? global.SortFrames.SORT_DEFAULT.slice() : [5,2,8,1,9,3,7,4,6]);
  }

  function renderSort(methodId) {
    const K1 = K();
    const host = K1.acquireDynamicVizHost();
    const lang = (global.I18N && I18N.getCurrentLanguage && I18N.getCurrentLanguage() === 'zh') ? 'zh' : 'en';
    if (!_sortText[methodId]) _sortText[methodId] = DEFAULT_TEXT;

    function rebuild() {
      host.innerHTML = '';
      const controls = document.createElement('div');
      controls.className = 'sortviz-controls';
      controls.innerHTML =
        '<input type="text" class="sortviz-input" data-testid="sortviz-input" value="' + _sortText[methodId] + '">' +
        '<button type="button" class="sortviz-build btn primary">' + (lang === 'zh' ? '建立' : 'Build') + '</button>' +
        '<button type="button" class="rand-btn" title="' + (lang === 'zh' ? '隨機' : 'Random') + '">🎲</button>' +
        exSelectHtml(methodId);
      host.appendChild(controls);

      const arr = parseArr(_sortText[methodId]);
      const frames = FRAMES[methodId](arr);
      const maxV = Math.max.apply(null, arr) || 1;
      const stage = document.createElement('div');
      stage.className = 'sortviz-stage';
      function paint(f) {
        stage.innerHTML = f.array.map((v, i) =>
          '<div class="sort-bar ' + (f.hi[i] || '') + '" style="height:' + Math.round((v / maxV) * 200 + 20) + 'px"><span>' + v + '</span></div>'
        ).join('');
      }
      host.appendChild(K1.buildStepWorkbench({ stage: stage, frames: frames, paint: paint, getMessage: (f) => K1.langOf(f.message), runIntervalMs: 400 }));

      function applyText(text) { _sortText[methodId] = text; saveEx(methodId, text); rebuild(); }
      controls.querySelector('.sortviz-build').addEventListener('click', () => applyText(controls.querySelector('.sortviz-input').value));
      controls.querySelector('.rand-btn').addEventListener('click', () => {
        const r = window.RandomInput && RandomInput.randomInputFor('sort', K1.getInputDifficulty());
        if (r && Array.isArray(r.data) && r.data.length) applyText(r.data.join(','));
      });
      const ex = controls.querySelector('.ex-select');
      if (ex) ex.addEventListener('change', (e) => { if (e.target.value) applyText(e.target.value); });
    }
    rebuild();
  }
```

(Note: `paint` only touches `stage` (the passed element), never `host.querySelector` — correct under the detached initial paint.)

- [ ] **Step 4: Switch the 3 methods' `attach` to `renderSort`**

In `js/domains/sort.js`, change the 3 attach calls:

```js
  R().attach('sort-bubble', { render: () => renderSort('sort-bubble'), code: () => codeSortBubble, layout: { host: 'dynamic' } });
  R().attach('sort-select', { render: () => renderSort('sort-select'), code: () => codeSortSelect, layout: { host: 'dynamic' } });
  R().attach('sort-insert', { render: () => renderSort('sort-insert'), code: () => codeSortInsert, layout: { host: 'dynamic' } });
```

Leave `sort-quick` … `sort-shaker` attach calls unchanged (legacy `renderSortBars`).

- [ ] **Step 5: `index.html` — load the frames module**

Before line 425 (`<script src="js/domains/sort.js" defer></script>`), add:

```html
    <script src="js/viz/viz_sort_frames.js" defer></script>
```

- [ ] **Step 6: `js/app.js` — codeDrawer + updateLayout carve-out**

(a) Lines 158-160: add `codeDrawer: true` to the `sort-bubble`, `sort-select`, `sort-insert` METHODS rows.

(b) In `updateLayout`, immediately BEFORE the `else if (currentMode.includes('sort-')) {` catch-all (~line 1909), add three code-panel-only branches:

```js
        else if (currentMode === 'sort-bubble') { codeTitle.textContent = 'sort_bubble.cpp'; codeDisplay.textContent = codeSortBubble; }
        else if (currentMode === 'sort-select') { codeTitle.textContent = 'sort_selection.cpp'; codeDisplay.textContent = codeSortSelect; }
        else if (currentMode === 'sort-insert') { codeTitle.textContent = 'sort_insertion.cpp'; codeDisplay.textContent = codeSortInsert; }
```

(These 3 now render via the dynamic host and do NOT show `#sort-container`/`#sort-actions`; the catch-all still handles the other 8.)

- [ ] **Step 7: `style.css` — `.sortviz-*`**

Add:

```css
.sortviz-controls { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-bottom: 8px; }
.sortviz-controls .sortviz-input { flex: 1 1 220px; min-width: 160px; }
.sortviz-stage { width: 100%; min-height: 240px; display: flex; align-items: flex-end; justify-content: center; gap: 3px; padding-bottom: 22px; overflow-x: auto; }
```

(Bars reuse the existing `.sort-bar[.comparing/.swapping/.sorted/.pivot]` styles.)

- [ ] **Step 8: Run the E2E**

Run: `npx playwright test tests/sort_steplog.spec.js --reporter=line`
Expected: PASS (3 sorts + the legacy-coexistence check).

- [ ] **Step 9: Full-suite gate + guards**

Run: `git status --porcelain js/cloud-config.js js/code_db.js` — expect empty.
Run: `npm run test:all`
Expected: all green — unit (`sort_frames`) + E2E (`sort_steplog`) + dynamic count tests + `tests/random_push.spec.js`. Existing sort behavior for the other 8 (and external/polyphase) unaffected.

- [ ] **Step 10: Commit**

```bash
git add js/domains/sort.js js/app.js index.html style.css tests/sort_steplog.spec.js
git commit -m "feat(dsvisual): sort observatory — renderSort + VCR/step-log/examples/drawer for bubble/select/insert

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- Pure frame generators (bubble/select/insert) + SORT_DEFAULT + dual-export → Task 1. ✓
- `renderSort` (dynamic host, input + examples + `buildStepWorkbench` + bars paint), examples via ExamplesStore, `paint` stage-only → Task 2 Step 3. ✓
- 3 methods attach→renderSort; codeDrawer; updateLayout code-panel carve-out before the catch-all; index.html include; CSS → Task 2 Steps 4-7. ✓
- Legacy coexistence (other 8 untouched) → Global Constraints + Task 2 Step 4 + E2E legacy check (Step 1). ✓
- Tests: unit (final sorted + permutation + bilingual + valid classes, edge inputs), E2E (input/examples/workbench/steplog/VCR/drawer/final-sorted/legacy-not-shown + legacy-still-works), counts → Task 1 Step 1, Task 2 Steps 1, 9. ✓
- buildFrameControls/buildStepWorkbench/cloud-config/code_db untouched → Global Constraints + Task 2 Step 9. ✓

**Placeholder scan:** No TBD/TODO. Full code for all 3 generators + `renderSort` + helpers + CSS + exact anchors (sort.js attach 283-285, app.js METHODS 158-160, updateLayout ~1909, index.html 425).

**Type/name consistency:** `SortFrames.{bubble,selection,insertion}Frames` used in module, `FRAMES` map, and unit tests. Frame `{array, hi, message}` consumed by `paint`/`getMessage` and asserted in tests. `.sortviz-input`/`.sortviz-stage`/`.sortviz-controls`/`.ex-select`/`.sort-bar` consistent across renderSort, CSS, and E2E. `buildStepWorkbench({stage, frames, paint, getMessage, runIntervalMs})` matches the shared helper.
