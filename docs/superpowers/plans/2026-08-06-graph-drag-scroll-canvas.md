# Scrollable Graph Drag Canvas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** When a graph node is dragged past the base `0 0 600 400` viewBox, grow the SVG's viewBox to include it and set the SVG width above 100% so the existing `.gw-stage { overflow:auto }` produces scrollbars — the node stays reachable at a constant on-screen scale, and the canvas self-shrinks when the node returns.

**Architecture:** One shared helper `NodeDrag.fitCanvas(svg, pos, n)` computes the content∪base bounding box, sets a dynamic `viewBox`, and sets `svg.style.width = vbW/600*100 + '%'` (percentage → responsive fit at base, overflow+scroll when grown, uniform constant scale via `height:auto`). `NodeDrag.screenToViewBox` is updated to read the live viewBox. Each of the three render-path redraws calls `fitCanvas` after drawing; `NodeDrag.attach` calls it once for an initial fit. CSS drops the `max-width:100%` cap (which would defeat overflow) and the fullscreen `max-height:100%` cap. `forceStep`, `layout()`, and `buildFrameControls` are untouched.

**Tech Stack:** Vanilla JS (IIFE dual-export module), plain CSS, Playwright E2E, no build step.

## Global Constraints

- NEVER modify `js/cloud-config.js` (if touched: `git checkout js/cloud-config.js`).
- Never hand-edit `js/code_db.js` (no cpp changes here).
- Do NOT modify `buildFrameControls` (js/app.js), `layout()` or `forceStep` (js/viz/viz_graph_workbench.js).
- Scope: the three node-link render paths in `js/domains/graph.js` (`renderGraphVcr`, `renderGraphStruct`, `renderGraphTraversal`) and `js/viz/viz_graph_drag.js` + `style.css`. Do NOT touch excluded viz (matrix/floyd/aoe/components/bipartite/closure/scc).
- Do not change method counts.
- Base viewBox is `0 0 600 400`; content padding `P = 30`.
- Commit trailer (exact): `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Spec: `docs/superpowers/specs/2026-08-06-graph-drag-scroll-canvas-design.md`.

---

## File Structure

- `js/viz/viz_graph_drag.js` — add `fitCanvas` (export on `api`), rewrite `screenToViewBox` to read the live viewBox, call `fitCanvas` once per svg at the end of `attach`.
- `js/domains/graph.js` — call `NodeDrag.fitCanvas(svg, pos, n)` after drawing in all three paths (`renderGraphVcr` `draw`, `renderGraphStruct` redraw closure, `renderGraphTraversal` `paint`).
- `style.css` — `.gw-svg { max-width: none }` (line 425); fullscreen `.gw-svg { max-height: none }` (line 3416).
- `tests/graph_drag.spec.js` — add a "scrollable canvas" describe block.

---

### Task 1: `fitCanvas` + live-viewBox mapping in `NodeDrag`

**Files:**
- Modify: `js/viz/viz_graph_drag.js`
- Test: `tests/graph_drag.spec.js` (scroll-canvas block, VCR portion)

**Interfaces:**
- Produces: `NodeDrag.fitCanvas(svg, pos, n)` — sets `svg` `viewBox` and `style.width` from the content∪base bounds. `NodeDrag.screenToViewBox` now reads `svg.viewBox.baseVal`.
- Consumes: nothing new. `attach` already receives `{svgs, pos, edges, n, redraw}`.

- [ ] **Step 1: Write the failing E2E (VCR scroll-canvas)**

Append to `tests/graph_drag.spec.js` (reuse the existing `loadMethod`, `stableBox`, `dragNode` helpers and the `beforeEach` pattern already at the top of the file):

```js
test.describe('Graph drag: scrollable canvas', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  test('graph-bfs: base state has viewBox 600x400 and width 100%, no overflow', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const card = page.locator('[data-method-section="graph-bfs"]');
    const svg = card.locator('.gw-svg');
    await expect(svg).toHaveAttribute('viewBox', '0 0 600 400');
    expect(await svg.evaluate((el) => el.style.width)).toBe('100%');
    const noHOverflow = await card.locator('.gw-stage').evaluate((el) => el.scrollWidth <= el.clientWidth + 1);
    expect(noHOverflow).toBe(true);
  });

  test('graph-bfs: dragging a node far out grows the viewBox and makes the stage scrollable', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const card = page.locator('[data-method-section="graph-bfs"]');
    const svg = card.locator('.gw-svg');

    // Drag node 0 far to the right+down, well past the stage edge.
    await dragNode(page, card, 0, 520, 300);
    // Wait until the sim cools and fitCanvas has grown the canvas.
    await expect.poll(async () => {
      const vb = await svg.getAttribute('viewBox');
      return parseFloat(vb.split(' ')[2]); // vbW
    }, { timeout: 4000 }).toBeGreaterThan(600);

    // width% > 100 and the stage now scrolls horizontally.
    const widthPct = await svg.evaluate((el) => parseFloat(el.style.width));
    expect(widthPct).toBeGreaterThan(100);
    const scrollable = await card.locator('.gw-stage').evaluate((el) => el.scrollWidth > el.clientWidth + 1);
    expect(scrollable).toBe(true);

    // The dragged node is still in the DOM and reachable (not clipped away).
    await expect(card.locator('.gw-svg .graph-node[data-node="0"]')).toHaveCount(1);
  });

  test('graph-bfs: mapping stays correct after growth (a second drag still hits the node)', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const card = page.locator('[data-method-section="graph-bfs"]');
    await dragNode(page, card, 0, 500, 260);           // grow the canvas
    const cxAfterFirst = parseFloat(await card.locator('.gw-svg .graph-node[data-node="0"]').first().getAttribute('cx'));
    await dragNode(page, card, 0, -120, -80);          // grab node 0 again, move it back a bit
    await expect.poll(async () =>
      Math.abs(parseFloat(await card.locator('.gw-svg .graph-node[data-node="0"]').first().getAttribute('cx')) - cxAfterFirst),
      { timeout: 3000 }).toBeGreaterThan(1); // the second grab actually moved node 0 → hit-test + live mapping work
  });

  test('graph-bfs: dragging the node back in shrinks the canvas (self-correcting)', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const card = page.locator('[data-method-section="graph-bfs"]');
    const svg = card.locator('.gw-svg');
    await dragNode(page, card, 0, 520, 300);
    await expect.poll(async () => parseFloat((await svg.getAttribute('viewBox')).split(' ')[2]), { timeout: 4000 }).toBeGreaterThan(600);
    // Grab node 0 (now off to the lower-right) and drag it back toward the center.
    await dragNode(page, card, 0, -480, -280);
    await expect.poll(async () => parseFloat((await svg.getAttribute('viewBox')).split(' ')[2]), { timeout: 4000 }).toBeLessThan(650);
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test tests/graph_drag.spec.js -g "scrollable canvas" --reporter=line`
Expected: FAIL — `fitCanvas` doesn't exist, viewBox stays `0 0 600 400`, `style.width` empty.

- [ ] **Step 3: Add `fitCanvas`, update `screenToViewBox`, initial-fit in `attach`**

In `js/viz/viz_graph_drag.js`:

(a) Replace `screenToViewBox` (lines 4-11) with a live-viewBox version:

```js
  // Map a screen (client) point into the SVG's CURRENT viewBox using the rendered
  // box ratio — robust to ancestor CSS zoom and to a viewBox grown/shifted by
  // fitCanvas. getBoundingClientRect already reflects scroll position.
  function screenToViewBox(svg, cx, cy) {
    var r = svg.getBoundingClientRect();
    var w = r.width || 1, h = r.height || 1;
    var vb = (svg.viewBox && svg.viewBox.baseVal) ? svg.viewBox.baseVal : { x: 0, y: 0, width: 600, height: 400 };
    return { x: vb.x + (cx - r.left) / w * vb.width, y: vb.y + (cy - r.top) / h * vb.height };
  }

  // Grow the SVG viewBox to bound all nodes (∪ the base 600x400, padding P) and
  // set width as a percentage of 600 so the stage fits at base (100%) and
  // overflows+scrolls when content extends — at a constant on-screen scale.
  function fitCanvas(svg, pos, n) {
    var P = 30, minX = 0, minY = 0, maxX = 600, maxY = 400, i;
    for (i = 0; i < n; i++) {
      if (pos[i].x - P < minX) minX = pos[i].x - P;
      if (pos[i].y - P < minY) minY = pos[i].y - P;
      if (pos[i].x + P > maxX) maxX = pos[i].x + P;
      if (pos[i].y + P > maxY) maxY = pos[i].y + P;
    }
    var vbW = maxX - minX, vbH = maxY - minY;
    svg.setAttribute('viewBox', minX + ' ' + minY + ' ' + vbW + ' ' + vbH);
    svg.style.width = (vbW / 600 * 100) + '%';
  }
```

(b) At the end of `attach`, before `return { destroy: destroy };`, add an initial fit for each svg:

```js
    for (var f = 0; f < svgs.length; f++) fitCanvas(svgs[f], pos, n);
```

(Reuse a fresh loop var name that doesn't collide with the existing handler-binding loop; `f` is unused above.)

(c) Add `fitCanvas` to the exported api. Change `var api = { attach: attach };` to:

```js
  var api = { attach: attach, fitCanvas: fitCanvas };
```

- [ ] **Step 4: Wire `fitCanvas` into `renderGraphVcr`'s `draw`**

In `js/domains/graph.js`, in `renderGraphVcr`'s `draw(f)`, after the final two lines `svg.innerHTML = s;` and `descEl.textContent = langOf(f.message);`, add:

```js
        NodeDrag.fitCanvas(svg, pos, parsed.n);
```

- [ ] **Step 5: Add the base CSS change**

In `style.css` line 425, change:

```css
.gw-svg { max-width: 100%; height: auto; }
```
to:
```css
.gw-svg { max-width: none; height: auto; }
```

- [ ] **Step 6: Run the VCR scroll-canvas tests**

Run: `npx playwright test tests/graph_drag.spec.js -g "scrollable canvas" --reporter=line`
Expected: PASS (all 4 scroll-canvas tests). If a grow/shrink assertion is timing-sensitive, the `expect.poll` timeouts already give headroom; do not weaken thresholds.

- [ ] **Step 7: Commit**

```bash
git add js/viz/viz_graph_drag.js js/domains/graph.js style.css tests/graph_drag.spec.js
git commit -m "feat(dsvisual): scrollable graph canvas — grow viewBox when a node is dragged out

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Wire `renderGraphStruct` + `renderGraphTraversal` + fullscreen CSS

**Files:**
- Modify: `js/domains/graph.js` (`renderGraphStruct` redraw closure; `renderGraphTraversal` `paint`), `style.css` (fullscreen)
- Test: `tests/graph_drag.spec.js` (struct + traversal + fullscreen scroll cases)

**Interfaces:**
- Consumes: `NodeDrag.fitCanvas` (Task 1).

- [ ] **Step 1: Write the failing E2E (struct + traversal + fullscreen)**

Append to the "scrollable canvas" describe block in `tests/graph_drag.spec.js`:

```js
  test('graph (structural): dragging out grows the viewBox and scrolls', async ({ page }) => {
    await loadMethod(page, 'graph');
    const card = page.locator('[data-method-section="graph"]');
    const svg = card.locator('.gw-svg');
    await dragNode(page, card, 0, 500, 280);
    await expect.poll(async () => parseFloat((await svg.getAttribute('viewBox')).split(' ')[2]), { timeout: 4000 }).toBeGreaterThan(600);
    const scrollable = await card.locator('.gw-stage').evaluate((el) => el.scrollWidth > el.clientWidth + 1);
    expect(scrollable).toBe(true);
  });

  test('graph-traversal: dragging out grows BOTH panes consistently', async ({ page }) => {
    await loadMethod(page, 'graph-traversal');
    const card = page.locator('[data-method-section="graph-traversal"]');
    const bfsNode = card.locator('.gw-svg-bfs .graph-node[data-node="0"]').first();
    const b = await stableBox(bfsNode);
    const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx + 300, cy + 200, { steps: 8 });
    await page.mouse.up();
    // Both panes' viewBoxes grow to the same width (shared pos).
    await expect.poll(async () => parseFloat((await card.locator('.gw-svg-bfs').getAttribute('viewBox')).split(' ')[2]), { timeout: 4000 }).toBeGreaterThan(600);
    const wBfs = parseFloat((await card.locator('.gw-svg-bfs').getAttribute('viewBox')).split(' ')[2]);
    const wDfs = parseFloat((await card.locator('.gw-svg-dfs').getAttribute('viewBox')).split(' ')[2]);
    expect(wDfs).toBeCloseTo(wBfs, 0);
  });

  test('graph-bfs: fullscreen — dragging out scrolls, transport stays in viewport', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const card = page.locator('[data-method-section="graph-bfs"]');
    await card.locator('[data-testid="viz-focus-toggle"]').click();
    await expect(page.locator('body.viz-focus')).toHaveCount(1);
    await dragNode(page, card, 0, 400, 220);
    await expect.poll(async () => parseFloat((await card.locator('.gw-svg').getAttribute('viewBox')).split(' ')[2]), { timeout: 4000 }).toBeGreaterThan(600);
    // Transport still within the viewport (it lives outside the scrolling .gw-stage).
    const tbox = await card.locator('.stepctl').boundingBox();
    const vh = page.viewportSize().height;
    expect(tbox).not.toBeNull();
    expect(tbox.y + tbox.height).toBeLessThanOrEqual(vh + 1);
  });
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test tests/graph_drag.spec.js -g "scrollable canvas" --reporter=line`
Expected: the three new tests FAIL — struct/traversal viewBox stays `600`, fullscreen transport pushed out (max-height cap not yet removed).

- [ ] **Step 3: Wire `renderGraphStruct`**

In `js/domains/graph.js`, in `renderGraphStruct`'s `NodeDrag.attach(...)` call, extend the `redraw` closure to refit after drawing. Change:

```js
        redraw: () => { svg.innerHTML = drawUndirectedGraph(parsed, pos, null, dir); } });
```
to:
```js
        redraw: () => { svg.innerHTML = drawUndirectedGraph(parsed, pos, null, dir); NodeDrag.fitCanvas(svg, pos, parsed.n); } });
```

- [ ] **Step 4: Wire `renderGraphTraversal`**

In `js/domains/graph.js`, in `renderGraphTraversal`'s `paint(_f, i)`, after the two `svgBfs.innerHTML = ...` / `svgDfs.innerHTML = ...` assignments (and the info/desc text), add:

```js
        NodeDrag.fitCanvas(svgBfs, pos, parsed.n);
        NodeDrag.fitCanvas(svgDfs, pos, parsed.n);
```

- [ ] **Step 5: Remove the fullscreen `max-height` cap for graphs**

In `style.css` line 3416, change:

```css
body.viz-focus .method-section-card.active .gw-svg { max-height: 100%; }
```
to:
```css
body.viz-focus .method-section-card.active .gw-svg { max-height: none; }
```

- [ ] **Step 6: Run the scroll-canvas tests**

Run: `npx playwright test tests/graph_drag.spec.js -g "scrollable canvas" --reporter=line`
Expected: PASS (all scroll-canvas tests, incl. struct, traversal, fullscreen).

- [ ] **Step 7: Run the full graph drag + fullscreen + step-log regression set**

Run: `npx playwright test tests/graph_drag.spec.js tests/graph_steplog.spec.js tests/viz_fullscreen.spec.js tests/visualizer.spec.js --reporter=line`
Expected: PASS — existing drag/re-settle/persist/dual-pane, step-log fullscreen (transport in viewport, log scrollable), and general viz tests all still green.

- [ ] **Step 8: Commit**

```bash
git add js/domains/graph.js style.css tests/graph_drag.spec.js
git commit -m "feat(dsvisual): scrollable canvas for structural + dual-pane graph + fullscreen

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Full-suite gate + guards

**Files:** none (verification only).

- [ ] **Step 1: Confirm protected files untouched**

Run: `git status --porcelain js/cloud-config.js js/code_db.js`
Expected: empty. If `js/cloud-config.js` changed: `git checkout js/cloud-config.js`.

- [ ] **Step 2: Run the entire suite**

Run: `npm run test:all`
Expected: all green — unit + E2E, including dynamic count tests and `tests/random_push.spec.js`, with no regression in the graph specs.

---

## Self-Review

**Spec coverage:**
- `fitCanvas` (content∪base bounds, dynamic viewBox, width% ) → Task 1 Step 3. ✓
- `screenToViewBox` live viewBox → Task 1 Step 3(a). ✓
- Initial fit in `attach` → Task 1 Step 3(b). ✓
- Wire all three paths → Task 1 Step 4 (VCR), Task 2 Steps 3-4 (struct, traversal). ✓
- CSS `max-width:none` + fullscreen `max-height:none` → Task 1 Step 5, Task 2 Step 5. ✓
- Tests: base-no-growth, grow+scroll, mapping-after-growth, shrink-back, struct, traversal both-panes, fullscreen scroll + transport-in-viewport, regression set → Task 1 Step 1 + Task 2 Step 1/7. ✓
- `forceStep`/`layout()`/`buildFrameControls` untouched, counts unchanged, protected files → Global Constraints + Task 3. ✓

**Placeholder scan:** No TBD/TODO. Concrete `P=30`, exact formulas, exact line numbers.

**Type/name consistency:** `NodeDrag.fitCanvas(svg, pos, n)` signature identical across module definition (Task 1), the exported `api`, and all call sites (VCR `parsed.n`, struct `parsed.n`, traversal `parsed.n` ×2). `screenToViewBox` reads `svg.viewBox.baseVal`. `svg.style.width` percentage string asserted in tests matches `(vbW/600*100)+'%'`. ✓
