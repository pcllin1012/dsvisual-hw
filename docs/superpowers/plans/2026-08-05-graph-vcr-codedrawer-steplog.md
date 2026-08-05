# Graph VCR Code Drawer + Step-Log Column Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** For the 8 single-pane graph VCR methods, hide the C++ source into the existing collapsible code drawer (like AVL/RB) and add a clickable, play-synced step-log column beside the visualization.

**Architecture:** Two changes. (1) Add `codeDrawer: true` to the 8 method registrations in `js/app.js` — this reuses the existing drawer render path (no new drawer code). (2) Restructure `renderGraphVcr`'s `.gw-body` into a 2-column `.gw-workbench` (left: step-desc banner + SVG stage + VCR transport; right: `.gw-logcol` with one clickable row per frame). The step log is driven entirely by `buildFrameControls`' existing `onIndexChange(idx)` callback (highlight + scroll) and its scrubber `input` event (row-click jump) — `buildFrameControls` itself is NOT modified.

**Tech Stack:** Vanilla JS ES modules, plain CSS in `style.css`, Playwright E2E (`tests/*.spec.js`), no build step for JS/CSS. `node build_db.js` regenerates `js/code_db.js` only when cpp changes (not needed here).

## Global Constraints

- NEVER modify `js/cloud-config.js` (keep `__PLACEHOLDER__` tokens; if touched, run `git checkout js/cloud-config.js`).
- Never hand-edit `js/code_db.js` (regenerate via `node build_db.js`). This task changes no cpp, so no regeneration is needed.
- Do not revert or weaken `tests/random_push.spec.js`.
- Do NOT modify `buildFrameControls` in `js/app.js` — only consume its `opts.onIndexChange` and the `.stepctl-scrubber` `input` event.
- Scope is exactly these 8 methods (all rendered by `renderGraphVcr`): `graph-bfs`, `graph-dfs`, `graph-dijkstra`, `graph-kruskal`, `graph-prim`, `graph-boruvka`, `graph-topo`, `graph-bellman-ford`. Do NOT touch `graph-traversal`, `graph`, `graph-adjlist`, `graph-multilist`, `graph-floyd-warshall`, or any non-graph method.
- Do not change method counts (overview tiles==methodCount, categories==14 must stay green).
- Commit trailer: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Spec: `docs/superpowers/specs/2026-08-05-graph-vcr-codedrawer-steplog-design.md`.

---

## File Structure

- `js/app.js` — METHODS array (lines 110-117): add `codeDrawer: true` to the 8 rows. No other change; the drawer render path at lines 616-660 already handles the flag.
- `js/domains/graph.js` — `renderGraphVcr`'s `rebuild()` (lines 202-250): replace the 2-element body with the `.gw-workbench` markup, build the step-log rows, append the transport into `.gw-stagecol`, and wire highlight + row-click jump.
- `style.css` — add `.gw-workbench` / `.gw-stagecol` / `.gw-logcol` / `.gw-steplog` / `.gw-logrow` rules near the `.gw-stage` block (~line 424), a `@media (max-width: 1020px)` single-column fallback, and focus-mode rules extending the existing `body.viz-focus … :has(.gw)` block (~lines 3391-3398).
- `tests/graph_steplog.spec.js` — NEW: focused E2E for the code drawer + step-log column across representative methods.
- Existing tests (`tests/visualizer.spec.js`, `tests/graph_workbench.spec.js`, `tests/graph_boruvka.spec.js`): expected to keep passing unchanged — `.code-panel-filename` still exists inside the (hidden) drawer and `toContainText` ignores visibility. Only adjust if a specific assertion actually breaks (see Task 1 Step 4).

---

### Task 1: Add `codeDrawer: true` to the 8 graph VCR methods

**Files:**
- Modify: `js/app.js:110-117` (METHODS rows for the 8 methods)
- Test: `tests/graph_steplog.spec.js` (new; drawer portion)

**Interfaces:**
- Consumes: existing drawer render path in `js/app.js` (`useCodeDrawer = !!method.codeDrawer` at line 616; drawer DOM at 651-660 with `[data-testid="code-drawer"]`, `[data-testid="code-drawer-toggle"]`, `.code-panel-filename` inside `.code-drawer-body`).
- Produces: the 8 methods now render their code in the collapsible drawer instead of the side-by-side grid. Later task (step log) is independent of this.

- [ ] **Step 1: Write the failing E2E for the drawer**

Create `tests/graph_steplog.spec.js`. Reuse the same `loadMethod` helper pattern used by `tests/visualizer.spec.js` (import or copy its harness — check the top of `tests/visualizer.spec.js` for the exact `loadMethod` signature and `test.describe` setup, and mirror it).

```js
const { test, expect } = require('@playwright/test');
// Mirror loadMethod + any beforeEach/baseURL setup from tests/visualizer.spec.js.
// (If visualizer.spec.js defines loadMethod inline, copy that helper verbatim here.)

const VCR_METHODS = [
  ['graph-bfs', 'graph_bfs.cpp'],
  ['graph-dfs', 'graph_dfs.cpp'],
  ['graph-dijkstra', 'graph_dijkstra.cpp'],
  ['graph-kruskal', 'graph_kruskal.cpp'],
  ['graph-prim', 'graph_prim.cpp'],
  ['graph-boruvka', 'graph_boruvka.cpp'],
  ['graph-topo', 'graph_topo.cpp'],
  ['graph-bellman-ford', 'graph_bellman_ford.cpp'],
];

test.describe('Graph VCR: code drawer', () => {
  for (const [id, file] of VCR_METHODS) {
    test(`${id}: source is in a collapsible code drawer`, async ({ page }) => {
      await loadMethod(page, id);
      const card = page.locator(`[data-method-section="${id}"]`);
      // Drawer present; inline side-by-side code panel absent.
      await expect(card.locator('[data-testid="code-drawer"]')).toHaveCount(1);
      await expect(card.locator('.method-section-grid--full')).toHaveCount(1);
      const toggle = card.locator('[data-testid="code-drawer-toggle"]');
      await expect(toggle).toBeVisible();
      // Filename lives inside the drawer, and matches this method's file.
      await expect(card.locator('[data-testid="code-drawer"] .code-panel-filename')).toContainText(file);
      // Opening the drawer works.
      await toggle.click();
      await expect(card.locator('[data-testid="code-drawer"]')).not.toHaveAttribute('hidden', /.*/);
    });
  }
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test tests/graph_steplog.spec.js -g "code drawer" --reporter=line`
Expected: FAIL — `[data-testid="code-drawer"]` has count 0 for these methods (they lack `codeDrawer` today).

- [ ] **Step 3: Add `codeDrawer: true` to the 8 rows**

In `js/app.js`, edit lines 110-117 so each of the 8 rows ends with `codeDrawer: true` (keep every other field identical). Result:

```js
            { id: 'graph-bfs', title: 'Breadth-First Search', file: 'graph_bfs.cpp', visualizer: 'graph', controls: 'graph', codeDrawer: true },
            { id: 'graph-dfs', title: 'Depth-First Search', file: 'graph_dfs.cpp', visualizer: 'graph', controls: 'graph', codeDrawer: true },
            { id: 'graph-kruskal', title: 'Kruskal MST', file: 'graph_kruskal.cpp', visualizer: 'graph', controls: 'graph', codeDrawer: true },
            { id: 'graph-dijkstra', title: 'Dijkstra (Shortest Path)', file: 'graph_dijkstra.cpp', visualizer: 'graph', controls: 'graph', codeDrawer: true },
            { id: 'graph-topo', title: 'Topological Sort', file: 'graph_topo.cpp', visualizer: 'graph', controls: 'graph', codeDrawer: true },
            { id: 'graph-prim', title: "Prim's MST", file: 'graph_prim.cpp', visualizer: 'graph-step', controls: 'graph-step', codeDrawer: true },
            { id: 'graph-boruvka', title: 'Borůvka MST', file: 'graph_boruvka.cpp', visualizer: 'graph-step', controls: 'graph-step', codeDrawer: true },
            { id: 'graph-bellman-ford', title: 'Bellman-Ford', file: 'graph_bellman_ford.cpp', visualizer: 'graph-step', controls: 'graph-step', codeDrawer: true },
```

(Note the order in the file is bfs, dfs, kruskal, dijkstra, topo, prim, boruvka, bellman-ford — keep that order; only append the flag.)

- [ ] **Step 4: Run drawer test + the existing graph filename assertions**

Run: `npx playwright test tests/graph_steplog.spec.js -g "code drawer" --reporter=line`
Expected: PASS (all 8).

Then confirm existing filename assertions did not regress:
Run: `npx playwright test tests/visualizer.spec.js tests/graph_workbench.spec.js tests/graph_boruvka.spec.js --reporter=line`
Expected: PASS. `.code-panel-filename` still exists once per card (inside the hidden drawer) and `toContainText` ignores visibility. **If** any filename assertion for one of the 8 methods fails because the element is now non-unique or requires visibility, fix only that assertion by scoping to the drawer: change `card.locator('.code-panel-filename')` → `card.locator('[data-testid="code-drawer"] .code-panel-filename')`. Do NOT weaken any other assertion.

- [ ] **Step 5: Commit**

```bash
git add js/app.js tests/graph_steplog.spec.js
git commit -m "feat(dsvisual): move graph VCR source into collapsible code drawer

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Step-log column in `renderGraphVcr`

**Files:**
- Modify: `js/domains/graph.js:202-250` (the `rebuild()` body construction and transport append)
- Modify: `style.css` (add `.gw-workbench`/`.gw-stagecol`/`.gw-logcol`/`.gw-steplog`/`.gw-logrow` near line 424; responsive `@media (max-width: 1020px)`; focus-mode rules after line 3398)
- Test: `tests/graph_steplog.spec.js` (add step-log describe block)

**Interfaces:**
- Consumes: `K().buildFrameControls(frames, paint, opts)` — calls `opts.onIndexChange(idx)` on every render (including the initial one at idx=0); exposes `.stepctl-scrubber` whose `input` event drives `goTo(+value)`; `.stepctl-count` renders `Step idx / last` where `last = frames.length - 1`. `langOf(msg)` returns the current-language string from `{zh,en}`. `frames[i].message` is a `{zh,en}` object.
- Produces: DOM — `.gw-workbench` > (`.gw-stagecol` containing `[data-testid="gw-stepdesc"]`, `.gw-stage`/`.gw-svg`, and the appended `.stepctl`) + `<aside class="gw-logcol">` containing `[data-testid="gw-log"]` with N `.gw-logrow[data-i]` buttons (N === frames.length). No new exports.

- [ ] **Step 1: Write the failing E2E for the step log**

Append to `tests/graph_steplog.spec.js`:

```js
test.describe('Graph VCR: step-log column', () => {
  // Representative coverage: unweighted (bfs), weighted-with-source (dijkstra),
  // MST (kruskal), directed (bellman-ford).
  for (const id of ['graph-bfs', 'graph-dijkstra', 'graph-kruskal', 'graph-bellman-ford']) {
    test(`${id}: log has one row per frame, synced to transport`, async ({ page }) => {
      await loadMethod(page, id);
      const card = page.locator(`[data-method-section="${id}"]`);
      const log = card.locator('[data-testid="gw-log"]');
      await expect(card.locator('.gw-workbench')).toBeVisible();
      await expect(log).toBeVisible();

      // Row count === frame count === scrubber max + 1.
      const rows = card.locator('.gw-logrow');
      const max = parseInt(await card.locator('.stepctl-scrubber').getAttribute('max'), 10);
      await expect(rows).toHaveCount(max + 1);

      // Initial: row 0 highlighted, and its text equals the step-desc banner.
      await expect(rows.nth(0)).toHaveClass(/\bon\b/);
      const banner = card.locator('[data-testid="gw-stepdesc"]');
      await expect(rows.nth(0).locator('.gw-logmsg')).toHaveText(await banner.textContent());

      // Step forward moves the highlight to row 1 and updates the banner.
      await card.locator('.stepctl [data-action="step"]').click();
      await expect(rows.nth(1)).toHaveClass(/\bon\b/);
      await expect(rows.nth(0)).not.toHaveClass(/\bon\b/);
      await expect(rows.nth(1).locator('.gw-logmsg')).toHaveText(await banner.textContent());

      // Click the last row jumps there (highlight + banner follow).
      const lastRow = rows.nth(max);
      await lastRow.click();
      await expect(lastRow).toHaveClass(/\bon\b/);
      await expect(card.locator('.stepctl-count')).toContainText('/ ' + max);
      await expect(lastRow.locator('.gw-logmsg')).toHaveText(await banner.textContent());
    });
  }
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test tests/graph_steplog.spec.js -g "step-log" --reporter=line`
Expected: FAIL — `.gw-workbench` / `[data-testid="gw-log"]` do not exist yet.

- [ ] **Step 3: Restructure the `rebuild()` body in `js/domains/graph.js`**

Replace lines 202-206 (the `body.innerHTML = …` for `.gw-stepdesc` + `.gw-stage`, and the `svg`/`descEl` lookups):

```js
      body.innerHTML =
        '<div class="gw-workbench">' +
          '<div class="gw-stagecol">' +
            '<div class="gw-stepdesc" data-testid="gw-stepdesc"></div>' +
            '<div class="gw-stage"><svg class="gw-svg" data-testid="gw-svg" viewBox="0 0 600 400"></svg></div>' +
          '</div>' +
          '<aside class="gw-logcol">' +
            '<h4>' + langOf({ zh: '步驟紀錄', en: 'Step Log' }) + '</h4>' +
            '<div class="gw-steplog" data-testid="gw-log"></div>' +
          '</aside>' +
        '</div>';
      const stagecol = body.querySelector('.gw-stagecol');
      const svg = body.querySelector('.gw-svg');
      const descEl = body.querySelector('.gw-stepdesc');
      const logEl = body.querySelector('.gw-steplog');

      // One clickable row per frame; message rendered in the current language.
      logEl.innerHTML = frames.map((f, i) =>
        '<button type="button" class="gw-logrow" data-i="' + i + '">' +
          '<span class="gw-logidx">' + i + '</span>' +
          '<span class="gw-logmsg">' + langOf(f.message) + '</span>' +
        '</button>'
      ).join('');
```

The existing `draw(f)` function (lines 208-248) stays exactly as-is — it already sets `descEl.textContent = langOf(f.message)`.

Add the highlight helper just before the transport append, then replace the append line (250) so the transport goes into `.gw-stagecol` with an `onIndexChange` hook, and wire row clicks via the scrubber:

```js
      function highlightLog(i) {
        const rows = logEl.querySelectorAll('.gw-logrow');
        rows.forEach((r, k) => r.classList.toggle('on', k === i));
        if (rows[i]) rows[i].scrollIntoView({ block: 'nearest' });
      }

      stagecol.appendChild(K().buildFrameControls(frames, draw, { runIntervalMs: 700, onIndexChange: highlightLog }));

      const scrub = stagecol.querySelector('.stepctl-scrubber');
      logEl.querySelectorAll('.gw-logrow').forEach((r) => {
        r.addEventListener('click', () => {
          scrub.value = r.dataset.i;
          scrub.dispatchEvent(new Event('input', { bubbles: true }));
        });
      });
```

(The old line 250 `body.appendChild(K().buildFrameControls(frames, draw, { runIntervalMs: 700 }));` is fully replaced by the block above — do not leave a duplicate append.)

- [ ] **Step 4: Add the CSS in `style.css`**

Near the `.gw-stage` block (after line ~425, `.gw-svg { max-width: 100%; height: auto; }`), add:

```css
.gw-workbench { display: grid; grid-template-columns: 1fr 260px; gap: 12px; align-items: start; }
.gw-stagecol { display: flex; flex-direction: column; gap: 0.6rem; min-width: 0; }
.gw-logcol { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: var(--app-radius-md); box-shadow: var(--app-shadow-sm); padding: 12px; max-height: 480px; display: flex; flex-direction: column; min-width: 0; }
.gw-logcol h4 { margin: 0 0 8px; font-size: 0.72rem; letter-spacing: 0.1em; color: var(--text-subtle); text-transform: uppercase; }
.gw-steplog { overflow-y: auto; display: flex; flex-direction: column; gap: 2px; scrollbar-width: thin; }
.gw-logrow { display: flex; gap: 8px; align-items: baseline; text-align: left; border: 0; background: transparent; color: var(--text-muted); font: inherit; font-size: 0.8rem; padding: 6px; border-radius: var(--app-radius-sm); cursor: pointer; line-height: 1.35; width: 100%; }
.gw-logrow:hover { background: var(--surface-hover); }
.gw-logrow.on { background: rgba(52, 152, 219, 0.14); color: var(--text-main); }
.gw-logidx { flex: 0 0 auto; font-variant-numeric: tabular-nums; color: var(--text-subtle); min-width: 1.6em; text-align: right; }

@media (max-width: 1020px) {
  .gw-workbench { grid-template-columns: 1fr; }
  .gw-logcol { max-height: 260px; }
}
```

Then, immediately AFTER the existing focus-mode block (after line 3398, `… .gw-svg { max-height: 100%; }`), add rules so the 2-column grid still fills height, keeps the transport pinned, and lets the log scroll in fullscreen:

```css
body.viz-focus .method-section-card.active .gw-workbench { flex: 1 1 auto; min-height: 0; }
body.viz-focus .method-section-card.active .gw-stagecol { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; }
body.viz-focus .method-section-card.active .gw-stagecol .gw-stage { flex: 1 1 auto; min-height: 0; }
body.viz-focus .method-section-card.active .gw-logcol { max-height: none; }
```

- [ ] **Step 5: Run the step-log test to verify it passes**

Run: `npx playwright test tests/graph_steplog.spec.js --reporter=line`
Expected: PASS (both describe blocks — drawer + step-log).

- [ ] **Step 6: Verify fullscreen keeps the transport usable**

Add to the step-log describe block in `tests/graph_steplog.spec.js`:

```js
  test('graph-bfs: fullscreen keeps transport visible and log scrollable', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const card = page.locator('[data-method-section="graph-bfs"]');
    await card.locator('[data-testid="viz-focus-toggle"]').click();
    await expect(page.locator('body.viz-focus')).toHaveCount(1);
    await expect(card.locator('.stepctl')).toBeVisible();      // transport not pushed off-screen
    await expect(card.locator('[data-testid="gw-log"]')).toBeVisible();
    // step still works in fullscreen
    const cnt = card.locator('.stepctl-count');
    const before = await cnt.textContent();
    await card.locator('.stepctl [data-action="step"]').click();
    await expect(cnt).not.toHaveText(before);
  });
```

Run: `npx playwright test tests/graph_steplog.spec.js -g "fullscreen" --reporter=line`
Expected: PASS.

- [ ] **Step 7: Run the full graph-related suites for regressions**

Run: `npx playwright test tests/visualizer.spec.js tests/graph_workbench.spec.js tests/graph_boruvka.spec.js tests/graph_steplog.spec.js --reporter=line`
Expected: PASS. Confirms the 8 methods' `.gw-svg`/`.stepctl` assertions and the counts still hold, and traversal/struct/floyd are untouched.

- [ ] **Step 8: Commit**

```bash
git add js/domains/graph.js style.css tests/graph_steplog.spec.js
git commit -m "feat(dsvisual): add clickable step-log column to graph VCR workbench

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Full-suite gate + cloud-config guard

**Files:**
- No source changes; verification only.

- [ ] **Step 1: Confirm `js/cloud-config.js` is untouched**

Run: `git status --porcelain js/cloud-config.js`
Expected: empty output. If not empty: `git checkout js/cloud-config.js`.

- [ ] **Step 2: Run the entire test suite**

Run: `npm run test:all`
Expected: all green — unit + E2E, including dynamic count tests (overview tiles==methodCount, categories==14) and `tests/random_push.spec.js`.

- [ ] **Step 3: Confirm `js/code_db.js` was not hand-edited**

Run: `git status --porcelain js/code_db.js`
Expected: empty output (no cpp changed this task, so no regeneration).

---

## Self-Review

**Spec coverage:**
- codeDrawer on 8 methods → Task 1. ✓
- 2-column workbench + step-log (rows, highlight, click-jump, bilingual) → Task 2 Steps 1-5. ✓
- CSS mirroring `.rbviz-*` + responsive + focus-mode → Task 2 Step 4. ✓
- Fullscreen transport pinned/log scrollable → Task 2 Step 6. ✓
- Filename assertions drawer-aware → Task 1 Step 4 (verify-first, scope-to-drawer only if broken). ✓
- Counts unchanged, excluded methods untouched → Task 2 Step 7, Task 3 Step 2. ✓
- cloud-config / code_db guards → Task 3. ✓

**Placeholder scan:** No TBD/TODO. `loadMethod` is referenced as "mirror from `tests/visualizer.spec.js`" — the implementer must copy the actual helper; this is a concrete instruction, not a placeholder, because the helper already exists in that file.

**Type/name consistency:** `.gw-workbench`, `.gw-stagecol`, `.gw-logcol`, `.gw-steplog` (`[data-testid="gw-log"]`), `.gw-logrow` (`data-i`, `.on`), `.gw-logidx`, `.gw-logmsg`, `[data-testid="gw-stepdesc"]` — used identically in graph.js (Task 2 Step 3), CSS (Step 4), and tests (Steps 1, 6). `onIndexChange`/`.stepctl-scrubber`/`.stepctl-count` match the read `buildFrameControls` contract. ✓
