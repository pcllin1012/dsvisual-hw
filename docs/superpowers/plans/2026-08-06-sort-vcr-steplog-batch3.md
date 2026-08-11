# Sort viz Observatory (Batch 3/3) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish the sort observatory — convert `sort-bucket`/`sort-count`/`sort-radix`/`sort-shaker`, enlarge the bars to fill the screen in fullscreen, and remove all legacy sort machinery.

**Architecture:** Add 4 pure frame generators to `viz_sort_frames.js` (distribution sorts render as bars + step-log narration, matching legacy). Change `renderSort`'s bar `paint` to percentage height + add fullscreen CSS so bars grow. Then delete the legacy imperative code (`renderSortBars`/`run*Sort`/`init`/`dom`/…), the `#sort-actions`/`#sort-container` HTML, and the `updateLayout` sort catch-all — carefully removing the `sortContainer`/`sortActions` array entries + declarations to avoid a null-`classList` crash.

**Tech Stack:** Vanilla JS, plain CSS, Playwright E2E + `node --test`. No app build step.

## Global Constraints

- NEVER modify `js/cloud-config.js`; never hand-edit `js/code_db.js`.
- Do NOT modify `buildFrameControls`/`buildStepWorkbench`, the Batch-1 `renderSort`/examples/`esc()` core (except the `paint` height change in Task 2), the already-converted sorts' generators, `sort-external`/`sort-polyphase`, or other domains.
- Method counts unchanged.
- **Removal safety:** after deleting `#sort-container`/`#sort-actions`, the `updateLayout` `containers`/`actions` arrays MUST NOT reference `sortContainer`/`sortActions` (they'd be `null` → `null.classList` throws on every mode switch). Remove the array entries AND the `const sortContainer`/`sortActions` declarations.
- Commit trailer (exact): `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Spec: `docs/superpowers/specs/2026-08-06-sort-vcr-steplog-batch3-design.md`.

---

## File Structure

- `js/viz/viz_sort_frames.js` — add `bucketFrames`/`countingFrames`/`radixFrames`/`shakerFrames`; add to `api`.
- `js/domains/sort.js` — `FRAMES` += 4; switch 4 attach; change `paint` to `%` height; **remove all legacy** (Task 3).
- `js/app.js` — 4 METHODS `codeDrawer:true`; 4 updateLayout branches; **remove the sort catch-all + `sortContainer`/`sortActions` array entries + declarations** (Task 3).
- `index.html` — **remove** `#sort-actions` (103-107) + `#sort-container` (207) (Task 3).
- `style.css` — `.sortviz-stage` height + fullscreen enlarge.
- Tests: `tests/unit/sort_frames.test.js`, `tests/sort_steplog.spec.js`, `tests/random_input.spec.js` (rewrite legacy-sort test in Task 3).

---

### Task 1: 4 frame generators + unit tests

**Files:** Modify `js/viz/viz_sort_frames.js`; Test `tests/unit/sort_frames.test.js`.

- [ ] **Step 1: Extend the unit tests**

Add the 4 generators to the `GENS` matrix in `tests/unit/sort_frames.test.js` (perFrame: shaker/bucket true; counting/radix false):

```js
  ['bucket', SF.bucketFrames, true],
  ['counting', SF.countingFrames, false],
  ['radix', SF.radixFrames, false],
  ['shaker', SF.shakerFrames, true],
```

(Append these to the existing `GENS` array; keep the `INPUTS` + assertions unchanged — final-ascending + final-permutation for all, per-frame-permutation gated on the flag.)

- [ ] **Step 2: Run to verify fail**

Run: `node --test tests/unit/sort_frames.test.js`
Expected: FAIL — the 4 generators undefined.

- [ ] **Step 3: Add the 4 generators to `js/viz/viz_sort_frames.js`** (reuse `hiOf`; add before `var api`):

```js
  function shakerFrames(input) {
    var a = input.slice(), n = a.length, frames = [], sorted = {};
    function snap(cur, msg) { frames.push({ array: a.slice(), hi: hiOf(sorted, cur), message: msg }); }
    snap({}, { zh: '起始陣列', en: 'Initial array' });
    var left = 0, right = n - 1;
    while (left < right) {
      var swapped = false;
      for (var i = left; i < right; i++) {
        var c = {}; c[i] = 'comparing'; c[i + 1] = 'comparing';
        snap(c, { zh: '向右:比較 a[' + i + '] 與 a[' + (i + 1) + ']', en: 'Forward: compare a[' + i + '] and a[' + (i + 1) + ']' });
        if (a[i] > a[i + 1]) { var t = a[i]; a[i] = a[i + 1]; a[i + 1] = t; var s = {}; s[i] = 'swapping'; s[i + 1] = 'swapping'; snap(s, { zh: '交換', en: 'Swap' }); swapped = true; }
      }
      sorted[right] = 'sorted'; right--;
      if (!swapped) break;
      swapped = false;
      for (var j = right; j > left; j--) {
        var c2 = {}; c2[j - 1] = 'comparing'; c2[j] = 'comparing';
        snap(c2, { zh: '向左:比較 a[' + (j - 1) + '] 與 a[' + j + ']', en: 'Backward: compare a[' + (j - 1) + '] and a[' + j + ']' });
        if (a[j - 1] > a[j]) { var t2 = a[j - 1]; a[j - 1] = a[j]; a[j] = t2; var s2 = {}; s2[j - 1] = 'swapping'; s2[j] = 'swapping'; snap(s2, { zh: '交換', en: 'Swap' }); swapped = true; }
      }
      sorted[left] = 'sorted'; left++;
      if (!swapped) break;
    }
    for (var m = left; m <= right; m++) sorted[m] = 'sorted';
    var all = {}; for (var k = 0; k < n; k++) all[k] = 'sorted';
    frames.push({ array: a.slice(), hi: all, message: { zh: '排序完成', en: 'Sorted' } });
    return frames;
  }

  function countingFrames(input) {
    var a = input.slice(), n = a.length, frames = [], sorted = {};
    function snap(cur, msg) { frames.push({ array: a.slice(), hi: hiOf(sorted, cur), message: msg }); }
    snap({}, { zh: '起始陣列', en: 'Initial array' });
    if (n === 0) return frames;
    var min = Math.min.apply(null, a), max = Math.max.apply(null, a);
    var count = new Array(max - min + 1).fill(0);
    for (var i = 0; i < n; i++) { var c = {}; c[i] = 'active'; snap(c, { zh: '計數:count[' + a[i] + ']++', en: 'Count: count[' + a[i] + ']++' }); count[a[i] - min]++; }
    snap({}, { zh: '累積前綴和(定位位址)', en: 'Accumulate prefix sums (addresses)' });
    for (var p = 1; p < count.length; p++) count[p] += count[p - 1];
    var output = new Array(n).fill(0);
    for (var q = n - 1; q >= 0; q--) { output[count[a[q] - min] - 1] = a[q]; count[a[q] - min]--; }
    for (var w = 0; w < n; w++) { a[w] = output[w]; sorted[w] = 'sorted'; snap({}, { zh: '放置 ' + a[w] + ' 到位置 ' + w, en: 'Place ' + a[w] + ' at position ' + w }); }
    var all = {}; for (var k = 0; k < n; k++) all[k] = 'sorted';
    frames.push({ array: a.slice(), hi: all, message: { zh: '排序完成', en: 'Sorted' } });
    return frames;
  }

  function radixFrames(input) {
    var a = input.slice(), n = a.length, frames = [];
    function snap(cur, msg) { frames.push({ array: a.slice(), hi: cur || {}, message: msg }); }
    snap({}, { zh: '起始陣列', en: 'Initial array' });
    if (n === 0) return frames;
    var max = Math.max.apply(null, a);
    for (var exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      snap({}, { zh: '位數 pass(exp=' + exp + '):依 (v/' + exp + ')%10 分配', en: 'Digit pass (exp=' + exp + '): distribute by (v/' + exp + ')%10' });
      var output = new Array(n).fill(0), count = new Array(10).fill(0);
      for (var i = 0; i < n; i++) count[Math.floor(a[i] / exp) % 10]++;
      for (var d = 1; d < 10; d++) count[d] += count[d - 1];
      for (var q = n - 1; q >= 0; q--) { var dg = Math.floor(a[q] / exp) % 10; output[count[dg] - 1] = a[q]; count[dg]--; }
      for (var w = 0; w < n; w++) { a[w] = output[w]; var c = {}; c[w] = 'active'; snap(c, { zh: 'exp=' + exp + ':放置 ' + a[w] + ' 到位置 ' + w, en: 'exp=' + exp + ': place ' + a[w] + ' at ' + w }); }
    }
    var all = {}; for (var k = 0; k < n; k++) all[k] = 'sorted';
    frames.push({ array: a.slice(), hi: all, message: { zh: '排序完成', en: 'Sorted' } });
    return frames;
  }

  function bucketFrames(input) {
    var a = input.slice(), n = a.length, frames = [], sorted = {};
    function snap(cur, msg) { frames.push({ array: a.slice(), hi: hiOf(sorted, cur), message: msg }); }
    snap({}, { zh: '起始陣列', en: 'Initial array' });
    if (n === 0) return frames;
    var max = Math.max.apply(null, a) || 1, NB = 5;
    for (var i = 0; i < n; i++) { var b = Math.min(NB - 1, Math.floor((a[i] / max) * NB)); var c = {}; c[i] = 'active'; snap(c, { zh: '分配 a[' + i + ']=' + a[i] + ' → 桶 ' + b, en: 'Distribute a[' + i + ']=' + a[i] + ' → bucket ' + b }); }
    for (var x = 1; x < n; x++) {
      var j = x;
      while (j > 0 && a[j - 1] > a[j]) {
        var cc = {}; cc[j - 1] = 'comparing'; cc[j] = 'comparing';
        snap(cc, { zh: '桶內排序:比較 a[' + (j - 1) + '] 與 a[' + j + ']', en: 'Sort within buckets: compare a[' + (j - 1) + '] and a[' + j + ']' });
        var t = a[j]; a[j] = a[j - 1]; a[j - 1] = t;
        var ss = {}; ss[j - 1] = 'swapping'; ss[j] = 'swapping';
        snap(ss, { zh: '交換', en: 'Swap' });
        j--;
      }
    }
    var all = {}; for (var k = 0; k < n; k++) all[k] = 'sorted';
    frames.push({ array: a.slice(), hi: all, message: { zh: '排序完成', en: 'Sorted' } });
    return frames;
  }
```

Add `bucketFrames: bucketFrames, countingFrames: countingFrames, radixFrames: radixFrames, shakerFrames: shakerFrames,` to `api`.

- [ ] **Step 4: Run to verify pass**

Run: `node --test tests/unit/sort_frames.test.js`
Expected: PASS (all 11 generators × inputs; counting/radix exempt from per-frame permutation).

- [ ] **Step 5: Commit**

```bash
git add js/viz/viz_sort_frames.js tests/unit/sort_frames.test.js
git commit -m "feat(dsvisual): sort frame generators for bucket/counting/radix/shaker

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Wire 4 methods + fullscreen bar enlargement + E2E

**Files:** Modify `js/domains/sort.js` (FRAMES + attach + paint %), `js/app.js` (codeDrawer + updateLayout branches), `style.css`; Test `tests/sort_steplog.spec.js`.

- [ ] **Step 1: Write the failing E2E**

Append to `tests/sort_steplog.spec.js`: add `['sort-bucket','sort_bucket.cpp'],['sort-count','sort_counting.cpp'],['sort-radix','sort_radix.cpp'],['sort-shaker','sort_shaker.cpp']` to the parameterized SORTS list (same assertions). Add a fullscreen-enlarge test:

```js
  test('sort-bubble: bars enlarge in fullscreen', async ({ page }) => {
    await loadMethod(page, 'sort-bubble');
    const card = page.locator('[data-method-section="sort-bubble"]');
    const tallest = () => card.locator('.sortviz-stage .sort-bar').evaluateAll((els) => Math.max(...els.map((e) => e.getBoundingClientRect().height)));
    const before = await tallest();
    await card.locator('[data-testid="viz-focus-toggle"]').click();
    await expect(page.locator('body.viz-focus')).toHaveCount(1);
    await page.waitForTimeout(150);
    const after = await tallest();
    expect(after).toBeGreaterThan(before * 1.3); // bars grew to fill the fullscreen stage
  });
```

- [ ] **Step 2: Run to verify fail**

Run: `npx playwright test tests/sort_steplog.spec.js -g "sort-bucket|sort-count|sort-radix|sort-shaker|enlarge" --reporter=line`
Expected: FAIL.

- [ ] **Step 3: FRAMES + attach (js/domains/sort.js)**

`FRAMES` (line 7) add:

```js
    'sort-bucket': (a) => global.SortFrames.bucketFrames(a),
    'sort-count': (a) => global.SortFrames.countingFrames(a),
    'sort-radix': (a) => global.SortFrames.radixFrames(a),
    'sort-shaker': (a) => global.SortFrames.shakerFrames(a),
```

Change attach 358/359/360/362 to `{ render: () => renderSort('sort-X'), code: () => codeSortX, layout: { host: 'dynamic' } }` (`sort-bucket`→`codeSortBucket`, `sort-count`→`codeSortCounting`, `sort-radix`→`codeSortRadix`, `sort-shaker`→`codeSortShaker`). Now ALL 11 attach use `renderSort`.

- [ ] **Step 4: paint → percentage height (js/domains/sort.js)**

In `renderSort`'s `paint`, change the bar height from px to `%`:

```js
      function paint(f) {
        stage.innerHTML = f.array.map((v, i) =>
          '<div class="sort-bar ' + (f.hi[i] || '') + '" style="height:' + ((v / maxV) * 100).toFixed(2) + '%"><span>' + v + '</span></div>'
        ).join('');
      }
```

(`maxV` already computed in scope.)

- [ ] **Step 5: app.js — codeDrawer + updateLayout branches (4)**

(a) The 4 METHODS rows (`sort-bucket`/`sort-count`/`sort-radix`/`sort-shaker`) gain `codeDrawer: true`.

(b) In `updateLayout`, beside the other sort code-panel branches (before the `includes('sort-')` catch-all), add:

```js
        else if (currentMode === 'sort-bucket') { codeTitle.textContent = 'sort_bucket.cpp'; codeDisplay.textContent = codeSortBucket; }
        else if (currentMode === 'sort-count') { codeTitle.textContent = 'sort_counting.cpp'; codeDisplay.textContent = codeSortCounting; }
        else if (currentMode === 'sort-radix') { codeTitle.textContent = 'sort_radix.cpp'; codeDisplay.textContent = codeSortRadix; }
        else if (currentMode === 'sort-shaker') { codeTitle.textContent = 'sort_shaker.cpp'; codeDisplay.textContent = codeSortShaker; }
```

(Leave the catch-all in place for now — Task 3 removes it.)

- [ ] **Step 6: style.css — stage height + fullscreen enlarge**

Change `.sortviz-stage` (line 536) to give a definite height (so `%` bars resolve) and add a fullscreen rule:

```css
.sortviz-stage { width: 100%; height: 260px; display: flex; align-items: flex-end; justify-content: center; gap: 3px; padding-bottom: 22px; overflow-x: auto; }
body.viz-focus .method-section-card.active .sortviz-stage { flex: 1 1 auto; height: auto; min-height: 0; }
```

- [ ] **Step 7: Run the E2E**

Run: `npx playwright test tests/sort_steplog.spec.js --reporter=line`
Expected: PASS (all sorts incl. the 4 new + fullscreen-enlarge + prior tests).

- [ ] **Step 8: Commit**

```bash
git add js/domains/sort.js js/app.js style.css tests/sort_steplog.spec.js
git commit -m "feat(dsvisual): sort observatory for bucket/count/radix/shaker + fullscreen bar enlarge

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Remove all legacy sort code + full gate

**Files:** Modify `js/domains/sort.js`, `js/app.js`, `index.html`, `tests/random_input.spec.js`.

- [ ] **Step 1: Remove legacy from `js/domains/sort.js`**

Delete: `renderSortBars`, `setBarVal`, `setBarColor`, `generateSortArray`, all `run*Sort` (bubble/selection/insertion/quick/qsHelper/qsPartition/merge/msHelper/msMerge/shell/bucket/counting/radix/heap/heapify/shaker), `onModeSwitch`, `init`, and the module-level `let sortArrData`/`let dom`/`animState` references. Change the domain registration to `C().registerDomain({ id: 'sort' });` (drop `init`/`onModeSwitch`). KEEP: `renderSort`, `FRAMES`, examples helpers, `esc()`, `parseArr`, and all 11 `R().attach(... renderSort ...)`. (If `sleep`/`animState` are referenced only by removed code, remove them too.)

- [ ] **Step 2: Remove the static DOM from `index.html`**

Delete `#sort-actions` (lines 103-107, the whole `<div class="actions hidden" id="sort-actions">…</div>`) and `#sort-container` (line 207).

- [ ] **Step 3: Remove the sort catch-all + array refs from `js/app.js`**

- Delete the `else if (currentMode.includes('sort-')) { sortContainer.classList.remove('hidden'); sortActions.classList.remove('hidden'); … }` catch-all (all sorts now have explicit code-panel branches).
- **CRITICAL:** remove `sortContainer` from the `containers` array and `sortActions` from the `actions` array in `updateLayout` (~line 1664 region), and delete the `const sortContainer = document.getElementById('sort-container');` (1375) and `const sortActions = document.getElementById('sort-actions');` (1380) declarations — otherwise `updateLayout` calls `null.classList.add('hidden')` and crashes on every mode switch.

- [ ] **Step 4: Rewrite the legacy-targeting test in `tests/random_input.spec.js`**

The test at ~line 87 ("Randomize on sort visualizer honors large difficulty") loads `sort-radix` and asserts the legacy `#sort-container`. Rewrite it for the new model: load a sort (e.g. `sort-radix`), click `.rand-btn` (🎲), and assert `.sortviz-stage .sort-bar` re-renders (count > 1 / changes). If awkward, replace with an assertion in `tests/sort_steplog.spec.js` and delete the obsolete one — do not weaken coverage.

- [ ] **Step 5: Verify no crash across modes**

Run: `npx playwright test tests/smoke_modes.spec.js tests/visualizer.spec.js --reporter=line` (or the specs that switch across many methods).
Expected: PASS — switching to any method (sort and non-sort) does not throw (the null-`classList` risk is gone). If a spec matcher selects nothing, run the files in full.

- [ ] **Step 6: Full-suite gate + guards**

Run: `git status --porcelain js/cloud-config.js js/code_db.js` — expect empty.
Run: `npm run test:all`
Expected: all green — unit (`sort_frames` 11 generators) + E2E (`sort_steplog` all 11 sorts + fullscreen-enlarge) + counts + `random_input` (rewritten) + `random_push`. `#sort-actions`/`#sort-container` absent from the DOM; `sort-external`/`sort-polyphase` unaffected.

- [ ] **Step 7: Commit**

```bash
git add js/domains/sort.js js/app.js index.html tests/random_input.spec.js
git commit -m "refactor(dsvisual): remove legacy sort animation + static DOM (all sorts now observatory)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- 4 generators (bucket/shaker perFrame true; counting/radix false) → Task 1. ✓
- Wire 4 + fullscreen bar enlargement (paint %, stage height + focus flex) → Task 2. ✓
- Full legacy removal (sort.js, index.html, app.js catch-all + array + decls) with the null-`classList` guard called out → Task 3 (esp. Step 3). ✓
- Tests: unit (11 generators, perFrame flags), E2E (4 sorts + fullscreen-enlarge), random_input rewrite, cross-mode no-crash, counts → Task 1 Step 1, Task 2 Step 1, Task 3 Steps 4-6. ✓
- sort-external/polyphase untouched; cloud-config/code_db untouched → Global Constraints + Task 3 Step 6. ✓

**Placeholder scan:** No TBD/TODO. Full generator code; exact anchors (FRAMES line 7, attach 358-362, paint, updateLayout ~1909 branches + ~1916 catch-all, sortContainer/sortActions 1375/1380, index.html 103-107/207).

**Type/name consistency:** `SortFrames.{bucket,counting,radix,shaker}Frames` in module/FRAMES/tests. `codeSortBucket/Counting/Radix/Shaker` in attach + updateLayout. Percentage `%` bars require `.sortviz-stage` definite height (260px normal / flex:1 focus) — consistent between paint and CSS. Removal leaves 11 `renderSort` attaches + no `sortContainer`/`sortActions` references anywhere.
