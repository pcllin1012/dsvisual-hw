# Sort viz Observatory (Batch 2/3) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `sort-quick`, `sort-merge`, `sort-shell`, `sort-heap` to the observatory model, reusing the Batch-1 infra (`viz_sort_frames.js` + `renderSort` + `FRAMES` map + examples + `esc()`). The remaining 4 sorts + external/polyphase stay legacy (removed in Batch 3).

**Architecture:** Add 4 pure frame generators to `js/viz/viz_sort_frames.js`, register them in `FRAMES`, switch the 4 `attach` calls to `renderSort`, add `codeDrawer:true` + code-panel-only `updateLayout` branches, and add `.sort-bar.active` CSS (heap uses it). No render-infra change. quick/shell/heap are in-place swaps (per-frame permutation preserved); **merge uses an aux-array overwrite so intermediate frames are legitimately NOT permutations** (the standard merge bar animation) — its unit test asserts only final-sorted + final-permutation.

**Tech Stack:** Vanilla JS, plain CSS, Playwright E2E + `node --test`. No app build step.

## Global Constraints

- NEVER modify `js/cloud-config.js`; never hand-edit `js/code_db.js`.
- Do NOT modify `buildFrameControls`/`buildStepWorkbench`, the Batch-1 `renderSort`/examples/`esc()` infra, the Batch-1 sorts, the remaining legacy sorts (`bucket/count/radix/shaker`), `sort-external`/`sort-polyphase`, or other domains.
- Legacy `renderSortBars`/`run*Sort`/`init`/`dom`/`animState`/`#sort-actions`/`#sort-container` STAY (removed in Batch 3).
- Method counts unchanged.
- Commit trailer (exact): `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Spec: `docs/superpowers/specs/2026-08-06-sort-vcr-steplog-batch2-design.md`.

---

## File Structure

- `js/viz/viz_sort_frames.js` — add `quickFrames`/`mergeFrames`/`shellFrames`/`heapFrames`; add them to `api`.
- `js/domains/sort.js` — `FRAMES` (line 7) += 4 entries; switch attach lines 351/352/353/357 to `renderSort`.
- `js/app.js` — 4 METHODS rows (161-166) gain `codeDrawer:true`; 4 code-panel-only branches before the `currentMode.includes('sort-')` catch-all (~1909, beside the Batch-1 ones).
- `style.css` — `.sort-bar.active`.
- Tests: extend `tests/unit/sort_frames.test.js` + `tests/sort_steplog.spec.js`.

---

### Task 1: 4 frame generators + unit tests

**Files:** Modify `js/viz/viz_sort_frames.js`; Test `tests/unit/sort_frames.test.js`.

**Interfaces:** Produces `SortFrames.{quickFrames, mergeFrames, shellFrames, heapFrames}(arr)`.

- [ ] **Step 1: Extend the unit tests**

Update `tests/unit/sort_frames.test.js`: add `'active'` to `ALLOWED`; extend the generator matrix and mark `mergeFrames` as NOT per-frame-permutation. Replace the `GENS` block / per-frame assertion so:

```js
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
```

(Keep the existing `SORT_DEFAULT` test and `INPUTS` array. Remove the old 3-generator `GENS` loop this replaces.)

- [ ] **Step 2: Run to verify fail**

Run: `node --test tests/unit/sort_frames.test.js`
Expected: FAIL — `SF.quickFrames`/etc. undefined.

- [ ] **Step 3: Add the 4 generators to `js/viz/viz_sort_frames.js`**

Add before the `var api = {...}` line (they reuse the existing `hiOf(sorted, cur)` helper):

```js
  function quickFrames(input) {
    var a = input.slice(), n = a.length, frames = [], sorted = {};
    function snap(cur, msg) { frames.push({ array: a.slice(), hi: hiOf(sorted, cur), message: msg }); }
    snap({}, { zh: '起始陣列', en: 'Initial array' });
    var st = [[0, n - 1]];
    while (st.length) {
      var seg = st.pop(), low = seg[0], high = seg[1];
      if (low > high) continue;
      if (low === high) { sorted[low] = 'sorted'; snap({}, { zh: 'a[' + low + '] 已就位', en: 'a[' + low + '] settled' }); continue; }
      var pivot = a[high], i = low - 1;
      var pc = {}; pc[high] = 'pivot';
      snap(pc, { zh: '選 pivot = a[' + high + ']=' + pivot, en: 'Pick pivot = a[' + high + ']=' + pivot });
      for (var j = low; j < high; j++) {
        var cc = {}; cc[high] = 'pivot'; cc[j] = 'comparing';
        snap(cc, { zh: '比較 a[' + j + ']=' + a[j] + ' 與 pivot', en: 'Compare a[' + j + ']=' + a[j] + ' with pivot' });
        if (a[j] < pivot) { i++; var t = a[i]; a[i] = a[j]; a[j] = t; var sc = {}; sc[high] = 'pivot'; sc[i] = 'swapping'; snap(sc, { zh: 'a[' + j + '] < pivot,交換到位置 ' + i, en: 'a[' + j + '] < pivot, swap to position ' + i }); }
      }
      var t2 = a[i + 1]; a[i + 1] = a[high]; a[high] = t2; var p = i + 1; sorted[p] = 'sorted';
      var dc = {}; dc[p] = 'sorted';
      snap(dc, { zh: 'pivot 定位於 ' + p, en: 'pivot placed at ' + p });
      st.push([low, p - 1]); st.push([p + 1, high]);
    }
    var all = {}; for (var k = 0; k < n; k++) all[k] = 'sorted';
    frames.push({ array: a.slice(), hi: all, message: { zh: '排序完成', en: 'Sorted' } });
    return frames;
  }

  function mergeFrames(input) {
    var a = input.slice(), n = a.length, frames = [];
    function snap(cur, msg) { frames.push({ array: a.slice(), hi: cur || {}, message: msg }); }
    snap({}, { zh: '起始陣列', en: 'Initial array' });
    function ms(l, r) {
      if (l >= r) return;
      var m = Math.floor((l + r) / 2);
      ms(l, m); ms(m + 1, r);
      var L = a.slice(l, m + 1), R = a.slice(m + 1, r + 1);
      snap({}, { zh: '合併 [' + l + ',' + m + '] 與 [' + (m + 1) + ',' + r + ']', en: 'Merge [' + l + ',' + m + '] and [' + (m + 1) + ',' + r + ']' });
      var i = 0, j = 0, k = l;
      while (i < L.length && j < R.length) {
        if (L[i] <= R[j]) { a[k] = L[i]; i++; } else { a[k] = R[j]; j++; }
        var c = {}; c[k] = 'sorted';
        snap(c, { zh: '取較小者寫入 a[' + k + ']=' + a[k], en: 'Write smaller into a[' + k + ']=' + a[k] });
        k++;
      }
      while (i < L.length) { a[k] = L[i]; var c1 = {}; c1[k] = 'sorted'; snap(c1, { zh: '寫入剩餘 a[' + k + ']=' + a[k], en: 'Write remaining a[' + k + ']=' + a[k] }); i++; k++; }
      while (j < R.length) { a[k] = R[j]; var c2 = {}; c2[k] = 'sorted'; snap(c2, { zh: '寫入剩餘 a[' + k + ']=' + a[k], en: 'Write remaining a[' + k + ']=' + a[k] }); j++; k++; }
    }
    ms(0, n - 1);
    var all = {}; for (var x = 0; x < n; x++) all[x] = 'sorted';
    frames.push({ array: a.slice(), hi: all, message: { zh: '排序完成', en: 'Sorted' } });
    return frames;
  }

  function shellFrames(input) {
    var a = input.slice(), n = a.length, frames = [];
    function snap(cur, msg) { frames.push({ array: a.slice(), hi: cur || {}, message: msg }); }
    snap({}, { zh: '起始陣列', en: 'Initial array' });
    for (var gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (var i = gap; i < n; i++) {
        var j = i;
        while (j >= gap && a[j - gap] > a[j]) {
          var c = {}; c[j] = 'comparing'; c[j - gap] = 'comparing';
          snap(c, { zh: 'gap=' + gap + ':比較 a[' + (j - gap) + '] 與 a[' + j + ']', en: 'gap=' + gap + ': compare a[' + (j - gap) + '] and a[' + j + ']' });
          var t = a[j]; a[j] = a[j - gap]; a[j - gap] = t;
          var s = {}; s[j] = 'swapping'; s[j - gap] = 'swapping';
          snap(s, { zh: 'gap=' + gap + ':交換', en: 'gap=' + gap + ': swap' });
          j -= gap;
        }
      }
    }
    var all = {}; for (var k = 0; k < n; k++) all[k] = 'sorted';
    frames.push({ array: a.slice(), hi: all, message: { zh: '排序完成', en: 'Sorted' } });
    return frames;
  }

  function heapFrames(input) {
    var a = input.slice(), n = a.length, frames = [], sorted = {};
    function snap(cur, msg) { frames.push({ array: a.slice(), hi: hiOf(sorted, cur), message: msg }); }
    function siftDown(i, size) {
      while (true) {
        var l = 2 * i + 1, r = 2 * i + 2, largest = i;
        if (l < size && a[l] > a[largest]) largest = l;
        if (r < size && a[r] > a[largest]) largest = r;
        if (largest === i) break;
        var c = {}; c[i] = 'active'; c[largest] = 'active';
        snap(c, { zh: '下沉:交換 a[' + i + '] 與較大子節點 a[' + largest + ']', en: 'Sift-down: swap a[' + i + '] with larger child a[' + largest + ']' });
        var t = a[i]; a[i] = a[largest]; a[largest] = t;
        i = largest;
      }
    }
    snap({}, { zh: '起始陣列', en: 'Initial array' });
    for (var i = Math.floor(n / 2) - 1; i >= 0; i--) siftDown(i, n);
    snap({}, { zh: '最大堆建立完成', en: 'Max-heap built' });
    for (var e = n - 1; e > 0; e--) {
      var c = {}; c[0] = 'active'; c[e] = 'active';
      snap(c, { zh: '取出堆頂 a[0] 到位置 ' + e, en: 'Extract max a[0] to position ' + e });
      var t = a[0]; a[0] = a[e]; a[e] = t; sorted[e] = 'sorted';
      siftDown(0, e);
    }
    sorted[0] = 'sorted';
    var all = {}; for (var k = 0; k < n; k++) all[k] = 'sorted';
    frames.push({ array: a.slice(), hi: all, message: { zh: '排序完成', en: 'Sorted' } });
    return frames;
  }
```

Add `quickFrames: quickFrames, mergeFrames: mergeFrames, shellFrames: shellFrames, heapFrames: heapFrames,` to the `api` object.

- [ ] **Step 4: Run to verify pass**

Run: `node --test tests/unit/sort_frames.test.js`
Expected: PASS (all 7 generators × inputs; merge exempt from per-frame permutation, all pass final-sorted + final-permutation).

- [ ] **Step 5: Commit**

```bash
git add js/viz/viz_sort_frames.js tests/unit/sort_frames.test.js
git commit -m "feat(dsvisual): sort frame generators for quick/merge/shell/heap

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Wire the 4 methods + CSS + E2E + gate

**Files:** Modify `js/domains/sort.js`, `js/app.js`, `style.css`; Test `tests/sort_steplog.spec.js`.

- [ ] **Step 1: Write the failing E2E**

Append to `tests/sort_steplog.spec.js` (reuse the file's `beforeEach`/harness). Extend the parameterized list OR add a batch-2 loop over `[['sort-quick','sort_quick.cpp'],['sort-merge','sort_merge.cpp'],['sort-shell','sort_shell.cpp'],['sort-heap','sort_heap.cpp']]` with the SAME assertions the Batch-1 sorts use (input `[data-testid="sortviz-input"]`, `.ex-select`, `.viz-workbench`, `[data-testid="viz-steplog"]`, `.stepctl` visible; `.sortviz-stage .sort-bar` count > 1; `.viz-logrow` == scrubber max+1; row 0 `.on`; scrub to max → all `.sort-bar.sorted` == bar count, ascending heights; drawer filename; legacy `#sort-container` hidden for these). Keep the existing Batch-1 tests + the fullscreen regression test.

- [ ] **Step 2: Run to verify fail**

Run: `npx playwright test tests/sort_steplog.spec.js -g "sort-quick|sort-merge|sort-shell|sort-heap" --reporter=line`
Expected: FAIL — not wired.

- [ ] **Step 3: `FRAMES` + attach (js/domains/sort.js)**

In the `FRAMES` map (line 7) add:

```js
    'sort-quick': (a) => global.SortFrames.quickFrames(a),
    'sort-merge': (a) => global.SortFrames.mergeFrames(a),
    'sort-shell': (a) => global.SortFrames.shellFrames(a),
    'sort-heap': (a) => global.SortFrames.heapFrames(a),
```

Change the 4 attach calls (351/352/353/357):

```js
  R().attach('sort-quick', { render: () => renderSort('sort-quick'), code: () => codeSortQuick, layout: { host: 'dynamic' } });
  R().attach('sort-merge', { render: () => renderSort('sort-merge'), code: () => codeSortMerge, layout: { host: 'dynamic' } });
  R().attach('sort-shell', { render: () => renderSort('sort-shell'), code: () => codeSortShell, layout: { host: 'dynamic' } });
  R().attach('sort-heap', { render: () => renderSort('sort-heap'), code: () => codeSortHeap, layout: { host: 'dynamic' } });
```

(Leave `sort-bucket/count/radix/shaker` attach + all legacy `run*Sort`/`renderSortBars`/`init` untouched.)

- [ ] **Step 4: app.js — codeDrawer + updateLayout (4)**

(a) METHODS rows (161-166): add `codeDrawer: true` to `sort-quick`, `sort-merge`, `sort-shell`, `sort-heap`.

(b) In `updateLayout`, beside the Batch-1 code-panel branches (before the `currentMode.includes('sort-')` catch-all), add:

```js
        else if (currentMode === 'sort-quick') { codeTitle.textContent = 'sort_quick.cpp'; codeDisplay.textContent = codeSortQuick; }
        else if (currentMode === 'sort-merge') { codeTitle.textContent = 'sort_merge.cpp'; codeDisplay.textContent = codeSortMerge; }
        else if (currentMode === 'sort-shell') { codeTitle.textContent = 'sort_shell.cpp'; codeDisplay.textContent = codeSortShell; }
        else if (currentMode === 'sort-heap') { codeTitle.textContent = 'sort_heap.cpp'; codeDisplay.textContent = codeSortHeap; }
```

- [ ] **Step 5: CSS — `.sort-bar.active`**

In `style.css`, near `.sort-bar.pivot` (~line 522), add:

```css
.sort-bar.active { background: #818cf8; }
```

- [ ] **Step 6: Run the E2E**

Run: `npx playwright test tests/sort_steplog.spec.js --reporter=line`
Expected: PASS (Batch-1 + the 4 new + fullscreen + legacy-coexistence).

- [ ] **Step 7: Regression — a still-legacy sort**

Run: `npx playwright test tests/sort_steplog.spec.js -g "legacy" --reporter=line`
Expected: PASS (the legacy-coexistence test — a still-legacy sort shows `#sort-container`). If it currently targets `sort-quick` (now converted), repoint it to a still-legacy sort like `sort-radix`.

- [ ] **Step 8: Full-suite gate + guards**

Run: `git status --porcelain js/cloud-config.js js/code_db.js` — expect empty.
Run: `npm run test:all`
Expected: all green — unit (`sort_frames` 7 generators) + E2E (`sort_steplog`) + counts + `tests/random_push.spec.js`. Remaining legacy sorts + external/polyphase unaffected.

- [ ] **Step 9: Commit**

```bash
git add js/domains/sort.js js/app.js style.css tests/sort_steplog.spec.js
git commit -m "feat(dsvisual): sort observatory for quick/merge/shell/heap

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- 4 generators (quick/shell/heap swap-based per-frame-permutation; merge aux-overwrite) → Task 1. ✓
- FRAMES + attach + codeDrawer + updateLayout carve + `.sort-bar.active` → Task 2 Steps 3-5. ✓
- Legacy coexistence (remaining 4 + external/polyphase untouched) → Global Constraints + Task 2 Step 7. ✓
- Tests: unit (per-frame-permutation flag, merge exempt, 'active' allowed), E2E (4 sorts observatory + final-sorted; legacy-coexistence repoint), counts → Task 1 Step 1, Task 2 Steps 1, 7, 8. ✓
- Infra unchanged; cloud-config/code_db untouched → Global Constraints + Task 2 Step 8. ✓

**Placeholder scan:** No TBD/TODO. Full code for all 4 generators; exact anchors (FRAMES line 7, attach 351/352/353/357, METHODS 161-166, updateLayout ~1909, CSS ~522).

**Type/name consistency:** `SortFrames.{quick,merge,shell,heap}Frames` in module, `FRAMES` map, unit tests. Frame `{array, hi, message}` consumed by the existing `renderSort` paint. `.sort-bar.active` matches heap frames + CSS. `codeSortQuick/Merge/Shell/Heap` used in attach + updateLayout (from code_db). Reuses `hiOf` from Batch 1.
