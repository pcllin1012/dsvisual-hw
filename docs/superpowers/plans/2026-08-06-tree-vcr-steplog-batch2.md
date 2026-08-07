# Tree VCR Step Log (Batch 2/3) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the clickable step-log column (via the shared `K().buildStepWorkbench` from Batch 1) to the 4 Batch-2 VCR tree viz — `tree-threaded`, `tree-catalan`, `game-tree`, `tree-general-binary` — which already have code drawers. Apply the Batch-1 carry-forward fixes (remove the `!isConnected` early-return in `paint` for threaded/game-tree; E2E asserts initial SVG content).

**Architecture:** Each viz replaces `wrap.appendChild(K().buildFrameControls(frames, paint, {runIntervalMs}))` with `host.appendChild(K().buildStepWorkbench({stage: wrap, frames, paint, runIntervalMs, getMessage}))`. `buildStepWorkbench` and the `.viz-*` CSS (Batch 1) are reused unchanged. `getMessage` differs per viz: threaded/catalan read `langOf(f.msg)`; game-tree extracts an `infoFor(fr)` helper (English) shared by paint + log; tgb synthesizes a bilingual message from `fr.active = {from,to,kind}`.

**Tech Stack:** Vanilla JS, Playwright E2E, no build step.

## Global Constraints

- NEVER modify `js/cloud-config.js` (if touched: `git checkout js/cloud-config.js`); never hand-edit `js/code_db.js`.
- Do NOT modify `buildFrameControls` or `buildStepWorkbench` (js/app.js) or the `.viz-*` CSS (style.css) — reuse Batch 1 as-is. `js/app.js` and `style.css` should NOT change in this batch.
- Do NOT modify AVL/RB (`js/domains/tree.js`), Batch-1 viz (segment/fenwick/trie/dsu), other viz, frame generators, or method counts. All 4 Batch-2 viz already have `codeDrawer: true` — no METHODS change.
- New DOM/behavior names come from Batch 1: `.viz-workbench`, `.viz-steplog` (`[data-testid="viz-steplog"]`), `.viz-logrow` (`.on`), `.stepctl-scrubber`.
- Commit trailer (exact): `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Spec: `docs/superpowers/specs/2026-08-06-tree-vcr-steplog-batch2-design.md`.

---

## File Structure

- `js/viz/viz_threaded.js` — remove `!isConnected` guard (paint line 69); swap transport → `buildStepWorkbench` (line 89); `getMessage: f => K().langOf(f.msg)`.
- `js/viz/viz_tree_catalan.js` — swap transport → `buildStepWorkbench` (line 63); `getMessage: f => K().langOf(f.msg)`.
- `js/viz/viz_game_tree.js` — remove `!isConnected` guard (paint line 69); extract `infoFor(fr)`; swap transport → `buildStepWorkbench` (line 113); `getMessage: f => infoFor(f)`.
- `js/viz/viz_tgb.js` — swap transport → `buildStepWorkbench` (line 167); `getMessage` synthesized from `f.active`.
- `tests/tree_steplog_batch2.spec.js` — NEW E2E (workbench/steplog + initial-SVG-content + highlight/jump + fullscreen).

---

### Task 1: `tree-threaded` + `tree-catalan`

**Files:**
- Modify: `js/viz/viz_threaded.js`, `js/viz/viz_tree_catalan.js`
- Test: `tests/tree_steplog_batch2.spec.js`

**Interfaces:** Consumes `K().buildStepWorkbench` (Batch 1).

- [ ] **Step 1: Write the failing E2E (threaded + catalan)**

Create `tests/tree_steplog_batch2.spec.js` (mirror `tests/tree_steplog.spec.js` harness: `loadMethod` from `./helpers.js`, `beforeEach` sets `dsvisual-lang=en`, `file://` goto, viewport 1400x900). A shared assertion helper + the two tests:

```js
const { test, expect } = require('@playwright/test');
const path = require('path');
const { loadMethod } = require('./helpers.js');

// Assert the shared step-log workbench is wired and the INITIAL frame's SVG is
// non-empty (catches a paint() that early-returns on the detached initial paint).
async function assertStepLog(page, id, svgContentSelector) {
  await loadMethod(page, id);
  const card = page.locator('[data-method-section="' + id + '"]');
  await expect(card.locator('[data-testid="code-drawer"]')).toHaveCount(1);
  await expect(card.locator('.viz-workbench')).toBeVisible();
  const log = card.locator('[data-testid="viz-steplog"]');
  await expect(log).toBeVisible();
  const rows = card.locator('.viz-logrow');
  const max = parseInt(await card.locator('.stepctl-scrubber').getAttribute('max'), 10);
  await expect(rows).toHaveCount(max + 1);
  // initial SVG content present WITHOUT any step interaction (carry-forward guard check)
  await expect(card.locator(svgContentSelector).first()).toBeVisible();
  // highlight follows the transport
  await expect(rows.nth(0)).toHaveClass(/\bon\b/);
  await card.locator('.stepctl [data-action="step"]').click();
  await expect(rows.nth(1)).toHaveClass(/\bon\b/);
  await expect(rows.nth(0)).not.toHaveClass(/\bon\b/);
  // row-click jumps
  await rows.nth(max).click();
  await expect(rows.nth(max)).toHaveClass(/\bon\b/);
  await expect(card.locator('.stepctl-count')).toContainText('/ ' + max);
  return card;
}

test.describe('Tree VCR step log (batch 2)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  test('tree-threaded: step log + initial SVG content', async ({ page }) => {
    await assertStepLog(page, 'tree-threaded', '.th-wrap svg *');
  });

  test('tree-catalan: step log + initial content', async ({ page }) => {
    await assertStepLog(page, 'tree-catalan', '.cat-wrap svg, .cat-wrap [class*="cat-"]');
  });
});
```

(If a `svgContentSelector` doesn't match a given viz's DOM, inspect that viz's rendered stage and use a selector that exists only when the initial frame drew — the point is: content present before any step click.)

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test tests/tree_steplog_batch2.spec.js -g "threaded|catalan" --reporter=line`
Expected: FAIL — no `.viz-workbench` for these yet.

- [ ] **Step 3: Wire `viz_threaded.js`**

(a) Remove the guard: delete line 69 `if (!svgEl.isConnected) return;` (the first line of `paint(fr)`).
(b) Replace line 89 `wrap.appendChild(K().buildFrameControls(frames, paint, { runIntervalMs: 700 }));` with:

```js
        host.appendChild(K().buildStepWorkbench({
            stage: wrap, frames: frames, paint: paint, runIntervalMs: 700,
            getMessage: (f) => K().langOf(f.msg),
        }));
```

(`paint` otherwise unchanged; still sets `.th-phase` etc. `wrap` = `.th-wrap`, re-parented.)

- [ ] **Step 4: Wire `viz_tree_catalan.js`**

Replace line 63 `wrap.appendChild(K().buildFrameControls(frames, paint, { runIntervalMs: 800 }));` with:

```js
        host.appendChild(K().buildStepWorkbench({
            stage: wrap, frames: frames, paint: paint, runIntervalMs: 800,
            getMessage: (f) => K().langOf(f.msg),
        }));
```

(No guard in catalan's paint. `paint` unchanged.)

- [ ] **Step 5: Run the threaded + catalan E2E**

Run: `npx playwright test tests/tree_steplog_batch2.spec.js -g "threaded|catalan" --reporter=line`
Expected: PASS.

- [ ] **Step 6: Regression**

Run: `npx playwright test tests/visualizer.spec.js -g "Threaded|Catalan|Counting" --reporter=line`
Expected: PASS (existing threaded / catalan assertions). If the matcher selects nothing, run `tests/visualizer.spec.js` in full.

- [ ] **Step 7: Commit**

```bash
git add js/viz/viz_threaded.js js/viz/viz_tree_catalan.js tests/tree_steplog_batch2.spec.js
git commit -m "feat(dsvisual): step-log workbench for tree-threaded + tree-catalan

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: `game-tree` (extract `infoFor` + guard removal)

**Files:**
- Modify: `js/viz/viz_game_tree.js`
- Test: `tests/tree_steplog_batch2.spec.js` (add game-tree)

**Interfaces:** Consumes `K().buildStepWorkbench`. Produces an `infoFor(fr)` helper reused by paint + getMessage.

- [ ] **Step 1: Write the failing E2E (game-tree)**

Append to `tests/tree_steplog_batch2.spec.js`:

```js
  test('game-tree: step log + initial SVG content', async ({ page }) => {
    const card = await assertStepLog(page, 'game-tree', '.gt-wrap svg .gt-node');
    // step-log rows carry the α-β/leaf/prune info text (non-empty)
    const firstMsg = await card.locator('.viz-logrow .viz-logmsg').first().textContent();
    expect(firstMsg.trim().length).toBeGreaterThan(0);
  });

  test('game-tree: fullscreen keeps transport in-viewport', async ({ page }) => {
    await loadMethod(page, 'game-tree');
    const card = page.locator('[data-method-section="game-tree"]');
    await card.locator('[data-testid="viz-focus-toggle"]').click();
    await expect(page.locator('body.viz-focus')).toHaveCount(1);
    await expect(card.locator('[data-testid="viz-steplog"]')).toBeVisible();
    const box = await card.locator('.stepctl').boundingBox();
    const vh = page.viewportSize().height;
    expect(box).not.toBeNull();
    expect(box.y + box.height).toBeLessThanOrEqual(vh + 1);
  });
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test tests/tree_steplog_batch2.spec.js -g "game-tree" --reporter=line`
Expected: FAIL.

- [ ] **Step 3: Extract `infoFor`, remove guard, wire `viz_game_tree.js`**

(a) Remove the guard: delete line 69 `if (!svgEl.isConnected) return;` (first line of `paint(fr, i)`).

(b) Extract the per-frame info computation into a helper in the render scope (near `paint`, so it closes over `abText`/`fmt` like the current inline code). Add:

```js
        function infoFor(fr) {
            if (!fr) return '';
            const ab = abText[fr.id];
            if (fr.type === 'prune') return 'Prune at node ' + fr.id + ': α=' + fmt(fr.alpha) + ' ≥ β=' + fmt(fr.beta);
            if (fr.type === 'leaf') return 'Leaf node ' + fr.id + ' = ' + fmt(fr.value);
            if (ab) return 'Node ' + fr.id + ': α=' + fmt(ab.alpha) + ', β=' + fmt(ab.beta) + (ab.value !== undefined ? ', best=' + fmt(ab.value) : '');
            return '';
        }
```

Then in `paint`, replace the inline `let info = ''; if (fr) { … }` block (lines ~96-102) with `let info = infoFor(fr);` (keep the following `if (returned has root) info += … ; host.querySelector('.gt-info').textContent = info;` lines unchanged).

(c) Replace line 113 `wrap.appendChild(K().buildFrameControls(frames, paint, { runIntervalMs: 700 }));` with:

```js
        host.appendChild(K().buildStepWorkbench({
            stage: wrap, frames: frames, paint: paint, runIntervalMs: 700,
            getMessage: (f) => infoFor(f),
        }));
```

- [ ] **Step 4: Run the game-tree E2E**

Run: `npx playwright test tests/tree_steplog_batch2.spec.js -g "game-tree" --reporter=line`
Expected: PASS.

- [ ] **Step 5: Regression**

Run: `npx playwright test tests/visualizer.spec.js -g "Game|game-tree|Minimax|Alpha|α" --reporter=line`
Expected: PASS (existing game-tree behavior — `.gt-info` banner, minimax/α-β stepping — unchanged). If the matcher selects nothing, run `tests/visualizer.spec.js` in full.

- [ ] **Step 6: Commit**

```bash
git add js/viz/viz_game_tree.js tests/tree_steplog_batch2.spec.js
git commit -m "feat(dsvisual): step-log workbench for game-tree (shared infoFor)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: `tree-general-binary` (synthesized message) + full gate

**Files:**
- Modify: `js/viz/viz_tgb.js`
- Test: `tests/tree_steplog_batch2.spec.js` (add tgb)

**Interfaces:** Consumes `K().buildStepWorkbench`. `getMessage` synthesized from `f.active = {from,to,kind}`.

- [ ] **Step 1: Write the failing E2E (tgb)**

Append to `tests/tree_steplog_batch2.spec.js`:

```js
  test('tree-general-binary: step log with synthesized LCRS messages', async ({ page }) => {
    const card = await assertStepLog(page, 'tree-general-binary', '.tgb-general-nodes, .tgb-binary-nodes');
    // synthesized message present (en: "Node ..." or the empty-tree fallback)
    const msgs = (await card.locator('.viz-logrow .viz-logmsg').allTextContents()).join(' ');
    expect(/Node |No links/.test(msgs)).toBe(true);
  });
```

(Note: `assertStepLog`'s content selector `.tgb-general-nodes, .tgb-binary-nodes` — tgb renders HTML node divs, not `<svg>` nodes; use the node containers as the "initial content present" check.)

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test tests/tree_steplog_batch2.spec.js -g "general-binary" --reporter=line`
Expected: FAIL.

- [ ] **Step 3: Wire `viz_tgb.js`**

Replace line 167 `wrap.appendChild(K().buildFrameControls(frames, paint, { runIntervalMs: 700 }));` with:

```js
        host.appendChild(K().buildStepWorkbench({
            stage: wrap, frames: frames, paint: paint, runIntervalMs: 700,
            getMessage: (f) => {
                const a = f.active;
                if (!a) return K().langOf({ zh: '無鏈結(單節點或空樹)', en: 'No links (single node or empty tree)' });
                return a.kind === 'left'
                    ? K().langOf({ zh: '節點 ' + a.from + ':左子 → 第一個小孩 ' + a.to, en: 'Node ' + a.from + ': left-child → first child ' + a.to })
                    : K().langOf({ zh: '節點 ' + a.from + ':右子 → 下一個兄弟 ' + a.to, en: 'Node ' + a.from + ': right-child → next sibling ' + a.to });
            },
        }));
```

(`paint` unchanged; `wrap` = `.tgb-wrap`, re-parented; tgb's paint has no `isConnected` guard so no removal needed.)

- [ ] **Step 4: Run the tgb E2E**

Run: `npx playwright test tests/tree_steplog_batch2.spec.js -g "general-binary" --reporter=line`
Expected: PASS.

- [ ] **Step 5: Run the full batch-2 spec + regression**

Run: `npx playwright test tests/tree_steplog_batch2.spec.js --reporter=line`
Expected: PASS (all 4 viz + fullscreen).
Run: `npx playwright test tests/visualizer.spec.js -g "General|Binary Tree|tgb" --reporter=line`
Expected: PASS (existing tgb assertions). If the matcher selects nothing, run `tests/visualizer.spec.js` in full.

- [ ] **Step 6: Full-suite gate + guards**

Run: `git status --porcelain js/cloud-config.js js/code_db.js js/app.js style.css` — expect empty (this batch changes none of these; if cloud-config changed: `git checkout js/cloud-config.js`).
Run: `npm run test:all`
Expected: all green — unit + E2E incl. `tests/tree_steplog.spec.js` (Batch 1) + `tests/tree_steplog_batch2.spec.js`, dynamic count tests, `tests/random_push.spec.js`. AVL/RB and non-VCR viz unaffected.

- [ ] **Step 7: Commit**

```bash
git add js/viz/viz_tgb.js tests/tree_steplog_batch2.spec.js
git commit -m "feat(dsvisual): step-log workbench for tree-general-binary (synthesized LCRS steps)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- 4 viz wired to `buildStepWorkbench` (step-log only; drawers exist) → Task 1 (threaded/catalan), Task 2 (game-tree), Task 3 (tgb). ✓
- Carry-forward: remove `!isConnected` guard in threaded (Task 1 Step 3a) + game-tree (Task 2 Step 3a); E2E asserts initial SVG content (`assertStepLog` content selector). ✓
- `getMessage` per viz: threaded/catalan `langOf(f.msg)`; game-tree `infoFor(f)` (extracted, English); tgb synthesized bilingual from `f.active`. ✓
- Reuse Batch 1 helper/CSS unchanged; no app.js/style.css change → Global Constraints + Task 3 Step 6 guard. ✓
- E2E highlight/jump/rows==frames + fullscreen + drawer-exists + regression → Task 1 Step 1 (`assertStepLog`) + extensions. ✓
- AVL/RB, Batch-1 viz, counts untouched → Global Constraints + Task 3 Step 6. ✓

**Placeholder scan:** No TBD/TODO. Exact line anchors (threaded 69/89, catalan 63, game-tree 69/96-102/113, tgb 167), full `infoFor`, full tgb `getMessage`. The one soft note is the E2E `svgContentSelector` per viz (instruct to adjust to the viz's real DOM if a selector misses) — concrete guidance, not a placeholder.

**Type/name consistency:** `buildStepWorkbench({stage, frames, paint, getMessage, runIntervalMs})` identical across all 4 call sites (matches Batch 1). `f.active.{from,to,kind}` matches `convertFrames` (`js/tree_general_binary_viz.js:57`). `infoFor(fr)` uses `abText`/`fmt`/`fr.{id,type,alpha,beta,value}` from game-tree's render scope. `.viz-*` selectors reused from Batch 1.
