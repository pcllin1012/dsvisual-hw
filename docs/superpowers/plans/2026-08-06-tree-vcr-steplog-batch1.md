# Tree VCR Code Drawer + Step Log (Batch 1/3) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the 4 Batch-1 VCR tree viz (`tree-segment`, `tree-fenwick`, `tree-trie`, `tree-dsu`) the AVL-style observatory: source in a collapsible code drawer + a clickable step-log column beside the visualization, via one shared helper reused by all 12 viz across the 3 batches.

**Architecture:** Add `K().buildStepWorkbench({stage, frames, paint, getMessage, runIntervalMs})` (in `js/app.js`, beside `buildFrameControls`) that builds a 2-column `.viz-workbench` — left `.viz-stagecol` = the viz's stage element + the `buildFrameControls` transport; right `.viz-logcol` = a clickable `.viz-steplog` (one row per frame, text from `getMessage`), driven by `buildFrameControls`' existing `onIndexChange` (highlight/scroll) and the scrubber `input` event (row-click jump). Shared `.viz-*` CSS (generalized from `.gw-*`/`.rbviz-*`) with the fullscreen fix baked in. Each viz builds its stage as before, then appends `buildStepWorkbench(...)` instead of the raw transport. `codeDrawer: true` added to `tree-segment`/`tree-fenwick` (trie/dsu already have it). `buildFrameControls`, `layout`, and the frame generators are untouched.

**Tech Stack:** Vanilla JS, plain CSS, Playwright E2E, no build step.

## Global Constraints

- NEVER modify `js/cloud-config.js` (if touched: `git checkout js/cloud-config.js`).
- Never hand-edit `js/code_db.js`.
- Do NOT modify `buildFrameControls` in `js/app.js` — only consume its `onIndexChange` and the `.stepctl-scrubber` `input` event.
- Do NOT modify AVL/RB (`js/domains/tree.js`), other tree viz, frame generators, `layout`, or method counts.
- Scope is exactly `tree-segment`, `tree-fenwick`, `tree-trie`, `tree-dsu` + the shared helper/CSS.
- New DOM names must match exactly: `.viz-workbench`, `.viz-stagecol`, `.viz-logcol`, `.viz-steplog` (`[data-testid="viz-steplog"]`), `.viz-logrow` (`data-i`, `.on`), `.viz-logidx`, `.viz-logmsg`.
- Commit trailer (exact): `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Spec: `docs/superpowers/specs/2026-08-06-tree-vcr-steplog-batch1-design.md`.

---

## File Structure

- `js/app.js` — add `buildStepWorkbench` (near `buildFrameControls`, ~line 2044) and export it on `window.VizKit` (~line 1463, beside `buildFrameControls`); add `codeDrawer: true` to `tree-segment` (line 85) and `tree-fenwick` (line 86) in METHODS.
- `style.css` — add `.viz-workbench`/`.viz-stagecol`/`.viz-logcol`/`.viz-steplog`/`.viz-logrow` + responsive + fullscreen rules.
- `js/viz/viz_segment.js`, `js/viz/viz_fenwick.js`, `js/viz/viz_trie.js`, `js/viz/viz_dsu.js` — replace the raw `buildFrameControls` append with a `buildStepWorkbench` append.
- `tests/tree_steplog.spec.js` — NEW E2E.

---

### Task 1: Shared `buildStepWorkbench` + CSS + `tree-segment` pilot

**Files:**
- Modify: `js/app.js` (helper + export + `tree-segment` codeDrawer), `style.css`, `js/viz/viz_segment.js`
- Test: `tests/tree_steplog.spec.js`

**Interfaces:**
- Produces: `K().buildStepWorkbench({stage, frames, paint, getMessage, runIntervalMs})` → a `.viz-workbench` element (transport wired internally with `onIndexChange`→highlight; rows click→scrubber jump). `getMessage(frame, i)` → string.

- [ ] **Step 1: Write the failing E2E (segment)**

Create `tests/tree_steplog.spec.js` (mirror `tests/graph_steplog.spec.js`: `require('@playwright/test')`, `loadMethod` from `./helpers.js`, `beforeEach` sets `localStorage 'dsvisual-lang'='en'` + `page.goto('file://'+path.resolve(__dirname,'../index.html'))`, viewport 1400x900):

```js
const { test, expect } = require('@playwright/test');
const path = require('path');
const { loadMethod } = require('./helpers.js');

test.describe('Tree VCR step log', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  test('tree-segment: code drawer + step log wired to the transport', async ({ page }) => {
    await loadMethod(page, 'tree-segment');
    const card = page.locator('[data-method-section="tree-segment"]');
    // code drawer (newly added)
    await expect(card.locator('[data-testid="code-drawer"]')).toHaveCount(1);
    await expect(card.locator('[data-testid="code-drawer"] .code-panel-filename')).toContainText('tree_segment.cpp');
    // workbench + step log
    await expect(card.locator('.viz-workbench')).toBeVisible();
    const log = card.locator('[data-testid="viz-steplog"]');
    await expect(log).toBeVisible();
    const rows = card.locator('.viz-logrow');
    const max = parseInt(await card.locator('.stepctl-scrubber').getAttribute('max'), 10);
    await expect(rows).toHaveCount(max + 1);
    // initial row 0 highlighted
    await expect(rows.nth(0)).toHaveClass(/\bon\b/);
    // step forward moves highlight
    await card.locator('.stepctl [data-action="step"]').click();
    await expect(rows.nth(1)).toHaveClass(/\bon\b/);
    await expect(rows.nth(0)).not.toHaveClass(/\bon\b/);
    // click last row jumps there
    await rows.nth(max).click();
    await expect(rows.nth(max)).toHaveClass(/\bon\b/);
    await expect(card.locator('.stepctl-count')).toContainText('/ ' + max);
  });

  test('tree-segment: fullscreen keeps transport in-viewport and log scrollable', async ({ page }) => {
    await loadMethod(page, 'tree-segment');
    const card = page.locator('[data-method-section="tree-segment"]');
    await card.locator('[data-testid="viz-focus-toggle"]').click();
    await expect(page.locator('body.viz-focus')).toHaveCount(1);
    await expect(card.locator('[data-testid="viz-steplog"]')).toBeVisible();
    const box = await card.locator('.stepctl').boundingBox();
    const vh = page.viewportSize().height;
    expect(box).not.toBeNull();
    expect(box.y + box.height).toBeLessThanOrEqual(vh + 1);
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test tests/tree_steplog.spec.js -g "tree-segment" --reporter=line`
Expected: FAIL — no `.viz-workbench`/code-drawer for tree-segment yet.

- [ ] **Step 3: Add `buildStepWorkbench` to `js/app.js`**

Immediately after the `buildFrameControls` function (after its closing brace, ~line 2140), add:

```js
    // Wrap a viz's stage + VCR transport (left) beside a clickable step-log
    // column (right) into a .viz-workbench. Reuses buildFrameControls (unchanged):
    // its onIndexChange highlights the current row; a row click drives the scrubber.
    // getMessage(frame, i) -> the row's text. Returns the .viz-workbench element.
    function buildStepWorkbench(opts) {
        opts = opts || {};
        const L = (zh, en) => (window.I18N && window.I18N.getCurrentLanguage && window.I18N.getCurrentLanguage() === 'zh') ? zh : en;
        const frames = opts.frames || [];
        const getMessage = opts.getMessage || (() => '');
        const wb = document.createElement('div');
        wb.className = 'viz-workbench';
        const stagecol = document.createElement('div');
        stagecol.className = 'viz-stagecol';
        const logcol = document.createElement('aside');
        logcol.className = 'viz-logcol';
        logcol.innerHTML = '<h4>' + L('步驟紀錄', 'Step Log') + '</h4><div class="viz-steplog" data-testid="viz-steplog"></div>';
        const logEl = logcol.querySelector('.viz-steplog');
        logEl.innerHTML = frames.map((f, i) =>
            '<button type="button" class="viz-logrow" data-i="' + i + '">' +
              '<span class="viz-logidx">' + i + '</span><span class="viz-logmsg"></span>' +
            '</button>').join('');
        const rows = logEl.querySelectorAll('.viz-logrow');
        rows.forEach((r, i) => { r.querySelector('.viz-logmsg').textContent = getMessage(frames[i], i); });
        function highlight(i) {
            rows.forEach((r, k) => r.classList.toggle('on', k === i));
            if (rows[i]) rows[i].scrollIntoView({ block: 'nearest' });
        }
        if (opts.stage) stagecol.appendChild(opts.stage);
        stagecol.appendChild(buildFrameControls(frames, opts.paint, { runIntervalMs: opts.runIntervalMs, onIndexChange: highlight }));
        const scrub = stagecol.querySelector('.stepctl-scrubber');
        rows.forEach((r) => r.addEventListener('click', () => {
            scrub.value = r.dataset.i;
            scrub.dispatchEvent(new Event('input', { bubbles: true }));
        }));
        wb.appendChild(stagecol);
        wb.appendChild(logcol);
        return wb;
    }
```

Then add `buildStepWorkbench,` to the `window.VizKit = { … }` object (line ~1465, right after `buildFrameControls,`).

- [ ] **Step 4: Add the shared CSS to `style.css`**

Add near the other workbench rules (e.g. after the `.gw-*` block):

```css
.viz-workbench { display: grid; grid-template-columns: 1fr 260px; gap: 12px; align-items: start; }
.viz-stagecol { display: flex; flex-direction: column; gap: 0.6rem; min-width: 0; }
.viz-logcol { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: var(--app-radius-md); box-shadow: var(--app-shadow-sm); padding: 12px; max-height: 480px; display: flex; flex-direction: column; min-width: 0; }
.viz-logcol h4 { margin: 0 0 8px; font-size: 0.72rem; letter-spacing: 0.1em; color: var(--text-subtle); text-transform: uppercase; }
.viz-steplog { overflow-y: auto; min-height: 0; display: flex; flex-direction: column; gap: 2px; scrollbar-width: thin; }
.viz-logrow { display: flex; gap: 8px; align-items: baseline; text-align: left; border: 0; background: transparent; color: var(--text-muted); font: inherit; font-size: 0.8rem; padding: 6px; border-radius: var(--app-radius-sm); cursor: pointer; line-height: 1.35; width: 100%; }
.viz-logrow:hover { background: var(--surface-hover); }
.viz-logrow.on { background: rgba(52, 152, 219, 0.14); color: var(--text-main); }
.viz-logidx { flex: 0 0 auto; font-variant-numeric: tabular-nums; color: var(--text-subtle); min-width: 1.6em; text-align: right; }
@media (max-width: 1020px) { .viz-workbench { grid-template-columns: 1fr; } .viz-logcol { max-height: 260px; } }
body.viz-focus .method-section-card.active .viz-workbench { flex: 1 1 auto; min-height: 0; align-items: stretch; grid-template-rows: minmax(0, 1fr); }
body.viz-focus .method-section-card.active .viz-stagecol { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; }
body.viz-focus .method-section-card.active .viz-logcol { max-height: none; min-height: 0; }
```

- [ ] **Step 5: Add `codeDrawer: true` to `tree-segment` + wire `viz_segment.js`**

(a) In `js/app.js` line 85, change the `tree-segment` row to end with `…, controls: 'segtree', codeDrawer: true },`.

(b) In `js/viz/viz_segment.js`: remove `host.appendChild(wrap);` (line 87 — `wrap` becomes the stage, not appended directly). Replace the transport line 121 `wrap.appendChild(K().buildFrameControls(frames, draw, { runIntervalMs: 600 }));` with:

```js
        host.appendChild(K().buildStepWorkbench({
            stage: wrap, frames: frames, paint: draw, runIntervalMs: 600,
            getMessage: (f) => f.phase + (f.msg ? ' — ' + f.msg : ''),
        }));
```

(`draw` is unchanged; it still writes into `wrap`'s `.segtree-grid`/`.segtree-phase`/`.segtree-msg`, which now live inside the workbench's stage column.)

- [ ] **Step 6: Run the segment E2E**

Run: `npx playwright test tests/tree_steplog.spec.js -g "tree-segment" --reporter=line`
Expected: PASS (both segment tests).

- [ ] **Step 7: Regression — existing segment assertions**

Run: `npx playwright test tests/visualizer.spec.js -g "Segment Tree" --reporter=line`
Expected: PASS (the existing "Segment Tree renders 15 nodes and steps through query/update" test still holds — `.segtree-node` count, stepping).

- [ ] **Step 8: Commit**

```bash
git add js/app.js style.css js/viz/viz_segment.js tests/tree_steplog.spec.js
git commit -m "feat(dsvisual): shared step-log workbench + code drawer for tree-segment

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: `tree-fenwick`

**Files:**
- Modify: `js/app.js` (`tree-fenwick` codeDrawer), `js/viz/viz_fenwick.js`
- Test: `tests/tree_steplog.spec.js` (add fenwick block)

**Interfaces:** Consumes `K().buildStepWorkbench` (Task 1).

- [ ] **Step 1: Write the failing E2E (fenwick)**

Append a `tree-fenwick` test to `tests/tree_steplog.spec.js`, same shape as the segment step-log test (drawer filename `tree_fenwick.cpp`; `.viz-workbench`/`[data-testid="viz-steplog"]` visible; rows == scrubber max+1; initial row 0 `.on`; step moves highlight; last-row click jumps).

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test tests/tree_steplog.spec.js -g "tree-fenwick" --reporter=line`
Expected: FAIL.

- [ ] **Step 3: Add `codeDrawer` + wire `viz_fenwick.js`**

(a) In `js/app.js` line 86, change the `tree-fenwick` row to end with `…, controls: 'fenwick', codeDrawer: true },`.

(b) In `js/viz/viz_fenwick.js`: remove `host.appendChild(wrap);` (line 51). Replace the transport line 70 `wrap.appendChild(K().buildFrameControls(frames, draw, { runIntervalMs: 600 }));` with:

```js
        host.appendChild(K().buildStepWorkbench({
            stage: wrap, frames: frames, paint: draw, runIntervalMs: 600,
            getMessage: (f) => f.phase + (f.msg ? ' — ' + f.msg : ''),
        }));
```

(`draw` still writes into `wrap`'s `.fenwick-phase`/`.fenwick-row`/`.fenwick-msg`.)

- [ ] **Step 4: Run the fenwick E2E**

Run: `npx playwright test tests/tree_steplog.spec.js -g "tree-fenwick" --reporter=line`
Expected: PASS.

- [ ] **Step 5: Regression — existing fenwick assertions**

Run: `npx playwright test tests/visualizer.spec.js -g "Fenwick" --reporter=line`
Expected: PASS (the existing Fenwick "renders 8 indexed cells and steps" test — `[data-testid="fenwick-phase"]`, stepping — still holds).

- [ ] **Step 6: Commit**

```bash
git add js/app.js js/viz/viz_fenwick.js tests/tree_steplog.spec.js
git commit -m "feat(dsvisual): step-log workbench + code drawer for tree-fenwick

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: `tree-trie` + `tree-dsu` (drawers exist) + full gate

**Files:**
- Modify: `js/viz/viz_trie.js`, `js/viz/viz_dsu.js`
- Test: `tests/tree_steplog.spec.js` (add trie + dsu blocks)

**Interfaces:** Consumes `K().buildStepWorkbench`. `tree-trie`/`tree-dsu` already have `codeDrawer: true` — no METHODS change.

- [ ] **Step 1: Write the failing E2E (trie + dsu)**

Append `tree-trie` and `tree-dsu` tests to `tests/tree_steplog.spec.js`: `.viz-workbench`/`[data-testid="viz-steplog"]` visible; rows == scrubber max+1; initial row 0 `.on`; step moves highlight; last-row click jumps; and (drawer already present) `[data-testid="code-drawer"]` count 1. (No new drawer assertion on filename needed beyond existence.)

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test tests/tree_steplog.spec.js -g "tree-trie|tree-dsu" --reporter=line`
Expected: FAIL (no `.viz-workbench` yet for these).

- [ ] **Step 3: Wire `viz_trie.js`**

In `js/viz/viz_trie.js`, replace the transport line 137 `wrap.appendChild(K().buildFrameControls(frames, paint, { runIntervalMs: 650 }));` with:

```js
    host.appendChild(K().buildStepWorkbench({
        stage: wrap, frames: frames, paint: paint, runIntervalMs: 650,
        getMessage: (f) => K().langOf(f.msg),
    }));
```

(`wrap` = `.trie-wrap` — already a child of host from the earlier `host.innerHTML`; `buildStepWorkbench` re-parents it into the stage column and the returned workbench is appended to host. The `.trie-apply`/input listeners added afterward still resolve via `wrap.querySelector(...)` since `wrap` is moved, not destroyed. `paint` unchanged.)

- [ ] **Step 4: Wire `viz_dsu.js`**

In `js/viz/viz_dsu.js`, replace the transport line 105 `wrap.appendChild(K().buildFrameControls(frames, paint, { runIntervalMs: 700 }));` with:

```js
        host.appendChild(K().buildStepWorkbench({
            stage: wrap, frames: frames, paint: paint, runIntervalMs: 700,
            getMessage: (f) => K().langOf(f.msg),
        }));
```

(Keep the following `K().markFocusFit(host, { svg: true });` line — it still finds the svg inside the moved `wrap`. `wrap` = `.dsu-wrap`, re-parented into the workbench. `paint` unchanged.)

- [ ] **Step 5: Run the trie + dsu E2E**

Run: `npx playwright test tests/tree_steplog.spec.js -g "tree-trie|tree-dsu" --reporter=line`
Expected: PASS.

- [ ] **Step 6: Regression — existing trie + dsu assertions**

Run: `npx playwright test tests/visualizer.spec.js tests/viz_refinements.spec.js tests/vizfit.spec.js -g "trie|Trie|DSU|Disjoint|Union" --reporter=line`
Expected: PASS (existing trie/dsu behavior — trie words/query apply, dsu build/union/find, vizfit focus on trie — unaffected). If a matcher selects nothing, run those spec files in full instead.

- [ ] **Step 7: Full-suite gate + guards**

Run: `git status --porcelain js/cloud-config.js js/code_db.js` — expect empty (if cloud-config changed: `git checkout js/cloud-config.js`).
Run: `npm run test:all`
Expected: all green — unit + E2E, incl. `tests/tree_steplog.spec.js` (all 4 viz), dynamic count tests, and `tests/random_push.spec.js`. AVL/RB and non-VCR tree viz unaffected.

- [ ] **Step 8: Commit**

```bash
git add js/viz/viz_trie.js js/viz/viz_dsu.js tests/tree_steplog.spec.js
git commit -m "feat(dsvisual): step-log workbench for tree-trie + tree-dsu

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- Shared `buildStepWorkbench` helper + export → Task 1 Step 3. ✓
- Shared `.viz-*` CSS + responsive + fullscreen fix → Task 1 Step 4. ✓
- `codeDrawer` on segment + fenwick → Task 1 Step 5a, Task 2 Step 3a. ✓
- Wire all 4 viz (segment/fenwick/trie/dsu) with correct `getMessage` → Task 1 Step 5b, Task 2 Step 3b, Task 3 Steps 3-4. ✓
- E2E: workbench+steplog visible, rows==frames, highlight-follows-transport, row-click jump, drawer (segment/fenwick), fullscreen transport-in-viewport → Task 1 Step 1 + extensions. ✓
- Regression on existing segment/fenwick/trie/dsu assertions; AVL/RB & counts untouched → Task 1 Step 7, Task 2 Step 5, Task 3 Steps 6-7. ✓
- buildFrameControls/layout/frame-generators/cloud-config/code_db untouched → Global Constraints + Task 3 Step 7. ✓

**Placeholder scan:** No TBD/TODO. Exact line anchors (segment 87/121, fenwick 51/70, trie 137, dsu 105), exact helper code, exact `getMessage` per viz.

**Type/name consistency:** `buildStepWorkbench({stage, frames, paint, getMessage, runIntervalMs})` signature identical across the definition, the VizKit export, and all 4 call sites. `.viz-workbench/.viz-stagecol/.viz-logcol/.viz-steplog/.viz-logrow/.viz-logidx/.viz-logmsg` used identically in helper, CSS, and tests. `getMessage`: segment/fenwick use plain `f.phase`/`f.msg`; trie/dsu use `K().langOf(f.msg)` — matching the verified frame shapes.
