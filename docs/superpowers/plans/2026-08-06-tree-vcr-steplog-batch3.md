# Tree VCR Code Drawer + Step Log (Batch 3/3) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish the observatory rollout — give the last 4 VCR tree viz (`tree-mway`, `tree-obst`, `tree-array-rep`, `tree-expression`) a collapsible code drawer + a clickable step-log column, via the shared `K().buildStepWorkbench` (Batch 1, reused unchanged).

**Architecture:** Each viz currently renders controls+stage directly into `host` (no wrapper) and queries `host.*` throughout `paint`. For each: (1) wrap all `host.innerHTML` content in a single `<div class="X-wrap">`; (2) change every `host.querySelector*` inside the render function (especially `paint` and its `if(!host.querySelector(...))return;` guard) to `wrap.querySelector*` — required because `buildStepWorkbench` runs the initial `paint()` while the stage is detached from `host`; (3) replace `host.appendChild(K().buildFrameControls(frames, paint, {runIntervalMs}))` with `host.appendChild(K().buildStepWorkbench({stage: wrap, frames, paint, runIntervalMs, getMessage}))`; (4) add `codeDrawer: true` to the METHODS row. `buildStepWorkbench`, `buildFrameControls`, and the `.viz-*` CSS are untouched.

**Tech Stack:** Vanilla JS, Playwright E2E, no build step.

## Global Constraints

- NEVER modify `js/cloud-config.js` (if touched: `git checkout js/cloud-config.js`); never hand-edit `js/code_db.js`.
- Do NOT modify `buildFrameControls` or `buildStepWorkbench` (js/app.js) or the `.viz-*` CSS (style.css). `style.css` must NOT change. `js/app.js` changes ONLY the 4 METHODS rows (add `codeDrawer: true`).
- Do NOT modify AVL/RB (`js/domains/tree.js`), Batch 1/2 viz, other viz, frame generators, or method counts.
- Reuse Batch-1 names: `.viz-workbench`, `.viz-steplog` (`[data-testid="viz-steplog"]`), `.viz-logrow` (`.on`), `.stepctl-scrubber`.
- The initial `paint()` runs on a DETACHED stage: NO `host.querySelector*` may remain inside `paint` (or paint-time helpers); all become `wrap.querySelector*`.
- Commit trailer (exact): `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Spec: `docs/superpowers/specs/2026-08-06-tree-vcr-steplog-batch3-design.md`.

---

## File Structure

- `js/app.js` — add `codeDrawer: true` to `tree-obst` (89), `tree-mway` (91), `tree-expression` (92), `tree-array-rep` (97). No other change.
- `js/viz/viz_mway.js`, `js/viz/viz_obst.js`, `js/viz/viz_tree_array_rep.js`, `js/viz/viz_expr_tree.js` — wrapper + `host`→`wrap` in render/paint + transport swap.
- `tests/tree_steplog_batch3.spec.js` — NEW E2E.

---

### Task 1: `tree-mway`

**Files:** Modify `js/app.js` (mway codeDrawer), `js/viz/viz_mway.js`; Test `tests/tree_steplog_batch3.spec.js`.

**Interfaces:** Consumes `K().buildStepWorkbench` (Batch 1).

- [ ] **Step 1: Write the failing E2E (mway)**

Create `tests/tree_steplog_batch3.spec.js` (mirror `tests/tree_steplog_batch2.spec.js`: `loadMethod`, `beforeEach` `dsvisual-lang=en` + `file://` goto + viewport 1400x900, and a shared `assertStepLog(page, id, contentSelector)` helper identical to Batch 2's — asserts drawer count 1, workbench/steplog visible, rows == scrubber max+1, initial `contentSelector` visible, row0 `.on`, step moves highlight, last-row click jumps). Add:

```js
test('tree-mway: code drawer + step log + initial content', async ({ page }) => {
  const card = await assertStepLog(page, 'tree-mway', '.mw-nodes .tree-node');
  await expect(card.locator('[data-testid="code-drawer"] .code-panel-filename')).toContainText('tree_mway.cpp');
  expect((await card.locator('.viz-logrow .viz-logmsg').first().textContent()).trim().length).toBeGreaterThan(0);
});
```

(If `.mw-nodes .tree-node` isn't the class paint draws, inspect `viz_mway.js` `paint` and use the actual paint-drawn node selector — it must be content `paint` produces, absent from the static template.)

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test tests/tree_steplog_batch3.spec.js -g "tree-mway" --reporter=line`
Expected: FAIL (no drawer/workbench for mway).

- [ ] **Step 3: Add codeDrawer + wrap + host→wrap + swap in `viz_mway.js`**

(a) `js/app.js` line 91: add `codeDrawer: true` to the `tree-mway` row.

(b) `js/viz/viz_mway.js`: in `host.innerHTML = …` (line 13), wrap the entire markup in a single container: prepend `'<div class="mw-wrap">'` and append `'</div>'` so all controls+stage live inside `.mw-wrap`. After it, add `const wrap = host.querySelector('.mw-wrap');`.

(c) Change EVERY `host.querySelector(...)`/`host.querySelectorAll(...)` in the render function to `wrap.querySelector(...)` — this includes: the `.mw-stage` width read (line 24), the `paint` guard `if (!host.querySelector('.mw-nodes')) return;` → `if (!wrap.querySelector('.mw-nodes')) return;` (line 40), `.mw-nodes`/`.mw-edges`/`.mw-phase` in paint (41/42/44/59), and the handler queries `.mw-apply`/`.mw-keys`/`.mw-m`/`.rand-btn` (62-67). (paint's drawing logic otherwise unchanged.)

(d) Replace line 61 `host.appendChild(K().buildFrameControls(frames, paint, { runIntervalMs: 700 }));` with:

```js
        host.appendChild(K().buildStepWorkbench({
            stage: wrap, frames: frames, paint: paint, runIntervalMs: 700,
            getMessage: (f) => K().langOf(f.msg),
        }));
```

- [ ] **Step 4: Run the mway E2E**

Run: `npx playwright test tests/tree_steplog_batch3.spec.js -g "tree-mway" --reporter=line`
Expected: PASS (esp. the initial `.mw-nodes .tree-node` content — proves host→wrap worked).

- [ ] **Step 5: Regression**

Run: `npx playwright test tests/visualizer.spec.js -g "m-way|mway|m-Way" --reporter=line`
Expected: PASS (existing mway assertions). If the matcher selects nothing, run `tests/visualizer.spec.js` in full.

- [ ] **Step 6: Commit**

```bash
git add js/app.js js/viz/viz_mway.js tests/tree_steplog_batch3.spec.js
git commit -m "feat(dsvisual): code drawer + step log for tree-mway

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: `tree-obst` + `tree-array-rep`

**Files:** Modify `js/app.js` (obst + array-rep codeDrawer), `js/viz/viz_obst.js`, `js/viz/viz_tree_array_rep.js`; Test `tests/tree_steplog_batch3.spec.js`.

- [ ] **Step 1: Write the failing E2E (obst + array-rep)**

Append:

```js
test('tree-obst: code drawer + step log + initial content', async ({ page }) => {
  const card = await assertStepLog(page, 'tree-obst', '.obst-grid td');
  await expect(card.locator('[data-testid="code-drawer"] .code-panel-filename')).toContainText('tree_obst.cpp');
});

test('tree-array-rep: code drawer + step log + initial content', async ({ page }) => {
  const card = await assertStepLog(page, 'tree-array-rep', '.ar-array .ar-cell');
  await expect(card.locator('[data-testid="code-drawer"] .code-panel-filename')).toContainText('tree_array_rep.cpp');
});
```

(Verify the paint-drawn selectors: obst's grid cells are drawn by `paint` into `.obst-grid` (use the actual cell element — `td`/`.obst-cell`, whatever paint emits); array-rep's `.ar-cell` are drawn by paint into `.ar-array`. Pick selectors that are paint output, not static template.)

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test tests/tree_steplog_batch3.spec.js -g "tree-obst|tree-array-rep" --reporter=line`
Expected: FAIL.

- [ ] **Step 3: Wire `viz_obst.js`**

(a) `js/app.js` line 89: add `codeDrawer: true` to `tree-obst`.
(b) `viz_obst.js`: wrap `host.innerHTML` content in `<div class="obst-wrap">…</div>`; `const wrap = host.querySelector('.obst-wrap');`.
(c) Change every `host.querySelector*` in the render function to `wrap.querySelector*`: the paint guard `if (!host.querySelector('.obst-grid')) return;` (38) → wrap; `.obst-grid`/`.obst-nodes`/`.obst-edges`/`.obst-phase` in paint (53-65); handlers `.obst-apply`/`.obst-keys`/`.obst-freqs`/`.rand-btn` (68-73).
(d) Replace line 67 transport with:

```js
        host.appendChild(K().buildStepWorkbench({
            stage: wrap, frames: frames, paint: paint, runIntervalMs: 600,
            getMessage: (f) => K().langOf(f.msg),
        }));
```

- [ ] **Step 4: Wire `viz_tree_array_rep.js`**

(a) `js/app.js` line 97: add `codeDrawer: true` to `tree-array-rep`.
(b) `viz_tree_array_rep.js`: wrap `host.innerHTML` content in `<div class="ar-wrap">…</div>`; `const wrap = host.querySelector('.ar-wrap');`.
(c) Change every `host.querySelector*`/`host.querySelectorAll*` in the render function to `wrap.*`: the `mark()` helper (54/56, called during paint), the paint guard `if (!host.querySelector('.et-stage')) return;` (63) → wrap; `.et-stage`/`.et-edges`/`.et-nodes`/`.ar-array`/`.ar-stats`/`.et-phase` in paint (64-94); any handler queries.
(d) Replace line 100 transport with:

```js
        host.appendChild(K().buildStepWorkbench({
            stage: wrap, frames: frames, paint: paint, runIntervalMs: 700,
            getMessage: (f) => K().langOf(f.msg),
        }));
```

- [ ] **Step 5: Run the obst + array-rep E2E**

Run: `npx playwright test tests/tree_steplog_batch3.spec.js -g "tree-obst|tree-array-rep" --reporter=line`
Expected: PASS.

- [ ] **Step 6: Regression**

Run: `npx playwright test tests/visualizer.spec.js -g "Optimal|OBST|Array Representation|array-rep" --reporter=line`
Expected: PASS. If the matcher selects nothing, run `tests/visualizer.spec.js` in full.

- [ ] **Step 7: Commit**

```bash
git add js/app.js js/viz/viz_obst.js js/viz/viz_tree_array_rep.js tests/tree_steplog_batch3.spec.js
git commit -m "feat(dsvisual): code drawer + step log for tree-obst + tree-array-rep

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: `tree-expression` + full gate

**Files:** Modify `js/app.js` (expression codeDrawer), `js/viz/viz_expr_tree.js`; Test `tests/tree_steplog_batch3.spec.js`.

**Note:** expr-tree is the most involved — beyond `paint(fr)` it has `paintForest`, `paintAsg`, and truth-table rendering, all using `host.querySelector('.et-*')`. ALL of these run (or can run) and must use `wrap`. Change every `host.querySelector*` in the render function to `wrap.querySelector*`.

- [ ] **Step 1: Write the failing E2E (expr-tree)**

Append:

```js
test('tree-expression: code drawer + step log + initial content', async ({ page }) => {
  const card = await assertStepLog(page, 'tree-expression', '.et-nodes .tree-node');
  await expect(card.locator('[data-testid="code-drawer"] .code-panel-filename')).toContainText('tree_expression.cpp');
  expect((await card.locator('.viz-logrow .viz-logmsg').first().textContent()).trim().length).toBeGreaterThan(0);
});

test('tree-expression: fullscreen keeps transport in-viewport', async ({ page }) => {
  await loadMethod(page, 'tree-expression');
  const card = page.locator('[data-method-section="tree-expression"]');
  await card.locator('[data-testid="viz-focus-toggle"]').click();
  await expect(page.locator('body.viz-focus')).toHaveCount(1);
  await expect(card.locator('[data-testid="viz-steplog"]')).toBeVisible();
  const box = await card.locator('.stepctl').boundingBox();
  const vh = page.viewportSize().height;
  expect(box).not.toBeNull();
  expect(box.y + box.height).toBeLessThanOrEqual(vh + 1);
});
```

(Verify `.et-nodes .tree-node` is paint-drawn; adjust to expr-tree's actual node class if different.)

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test tests/tree_steplog_batch3.spec.js -g "tree-expression" --reporter=line`
Expected: FAIL.

- [ ] **Step 3: Wire `viz_expr_tree.js`**

(a) `js/app.js` line 92: add `codeDrawer: true` to `tree-expression`.
(b) `viz_expr_tree.js`: wrap `host.innerHTML` content in `<div class="et-wrap">…</div>`; `const wrap = host.querySelector('.et-wrap');`.
(c) Change EVERY `host.querySelector*` in the render function — in `paint` (134-151), `paintForest` (83-102), `paintAsg` (106-121), the truth-table builder (125+), and any handlers/mode buttons — to `wrap.querySelector*`. (Drawing logic unchanged.)
(d) Replace line 153 transport with:

```js
        host.appendChild(K().buildStepWorkbench({
            stage: wrap, frames: frames, paint: paint, runIntervalMs: 700,
            getMessage: (f) => (f.token ? '[' + f.token + '] ' : '') + K().langOf(f.msg),
        }));
```

- [ ] **Step 4: Run the expr-tree E2E**

Run: `npx playwright test tests/tree_steplog_batch3.spec.js -g "tree-expression" --reporter=line`
Expected: PASS (incl. fullscreen).

- [ ] **Step 5: Run the full batch-3 spec + expr regression**

Run: `npx playwright test tests/tree_steplog_batch3.spec.js --reporter=line`
Expected: PASS (all 4 viz).
Run: `npx playwright test tests/visualizer.spec.js -g "Expression|expr|Boolean|Arith" --reporter=line`
Expected: PASS (existing expr-tree behavior — forest, truth table, mode toggle, boolean/arith). If the matcher selects nothing, run `tests/visualizer.spec.js` in full.

- [ ] **Step 6: Full-suite gate + guards**

Run: `git status --porcelain js/cloud-config.js js/code_db.js style.css` — expect empty (this batch changes none; if cloud-config changed: `git checkout js/cloud-config.js`). Also confirm `js/app.js` diff is ONLY the 4 codeDrawer flags (not buildStepWorkbench/buildFrameControls).
Run: `npm run test:all`
Expected: all green — unit + E2E incl. Batch 1/2/3 step-log specs, dynamic count tests, `tests/random_push.spec.js`. AVL/RB and non-VCR viz unaffected.

- [ ] **Step 7: Commit**

```bash
git add js/app.js js/viz/viz_expr_tree.js tests/tree_steplog_batch3.spec.js
git commit -m "feat(dsvisual): code drawer + step log for tree-expression

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- 4 viz get codeDrawer + step log via `buildStepWorkbench` → Task 1 (mway), Task 2 (obst, array-rep), Task 3 (expr). ✓
- Wrapper introduced + all `host.querySelector*` in render/paint → `wrap.querySelector*` (detached-initial-paint fix at scale) → each task Step 3(b-c). ✓
- `getMessage`: mway/obst/array-rep `langOf(f.msg)`; expr `(f.token?…)+langOf(f.msg)` → each task Step 3(d). ✓
- `codeDrawer: true` on the 4 METHODS rows; no other app.js change → each task Step 3(a) + Task 3 Step 6 guard. ✓
- E2E: drawer+filename, workbench/steplog, rows==frames, PAINT-ONLY initial content, highlight/jump, first-msg non-empty, fullscreen (expr) → each task Step 1. ✓
- Reuse helper/CSS unchanged; AVL/RB, Batch 1/2, counts untouched; style.css/cloud-config/code_db untouched → Global Constraints + Task 3 Step 6. ✓

**Placeholder scan:** No TBD/TODO. Exact anchors per viz (mway 13/40/61, obst 26/38/67, array-rep 38/63/100, expr host.innerHTML/134/153). The paint-only content selectors carry a "verify against the viz's actual paint output" instruction — concrete guidance (per the tgb lesson), not a placeholder.

**Type/name consistency:** `buildStepWorkbench({stage, frames, paint, getMessage, runIntervalMs})` identical across all 4 call sites (matches Batch 1/2). Each viz's `wrap` = `.X-wrap` (mw/obst/ar/et), queried once after `host.innerHTML`. `getMessage` field reads match verified frame shapes (`f.msg` {zh,en}; expr `f.token` optional). `.viz-*` selectors reused from Batch 1.
