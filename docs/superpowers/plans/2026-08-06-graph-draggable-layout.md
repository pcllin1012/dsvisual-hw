# Draggable Graph Nodes + Re-settle Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make nodes in every node-link graph visualization draggable (mouse + touch); on drag, a short decaying force simulation re-settles the rest, then freezes, with the dropped node pinned where released.

**Architecture:** Two new well-bounded units. (1) A pure `GraphWorkbench.forceStep(pos, edges, n, opts)` — one iteration of the existing FR physics, skips `fixed` nodes, bounds to the viewBox; unit-tested; `layout()` stays untouched as the low-crossing initial layout. (2) A DOM/pointer controller `NodeDrag.attach({svgs, pos, edges, n, redraw})` in a new script — binds Pointer Events, hit-tests via `data-node`, runs a decaying rAF simulation calling `forceStep` + the caller's `redraw()`, self-cleans on disconnect. `pos` becomes mutable shared state; each render path hands its `pos` and a `redraw` to the controller. Positions persist across VCR frame repaints because `pos` is owned outside the per-frame draw.

**Tech Stack:** Vanilla JS (ES5-style IIFE modules with dual `module.exports` + `global.X` export, matching `viz_graph_workbench.js`), plain CSS in `style.css`, `<script defer>` includes in `index.html`, Playwright E2E + `node --test` unit tests. No build step.

## Global Constraints

- NEVER modify `js/cloud-config.js` (keep `__PLACEHOLDER__` tokens; if touched, `git checkout js/cloud-config.js`).
- Never hand-edit `js/code_db.js` (no cpp changes here — leave it alone).
- Do NOT modify `buildFrameControls` in `js/app.js`.
- Do NOT modify the `layout()` function in `js/viz/viz_graph_workbench.js` — it stays the low-crossing initial layout. `forceStep` is a separate, additional export.
- Scope is exactly the node-link graph render paths in `js/domains/graph.js`: `renderGraphVcr` (graph-bfs/dfs/dijkstra/kruskal/prim/boruvka/topo/bellman-ford), `renderGraphStruct` (graph/graph-adjlist/graph-multilist), `renderGraphTraversal` (graph-traversal). Do NOT touch matrix/floyd/aoe/components/etc.
- Do not change method counts (overview tiles==methodCount, categories unchanged).
- SVG viewBox is `0 0 600 400` everywhere; use those constants for coordinate mapping.
- Commit trailer (exact): `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Spec: `docs/superpowers/specs/2026-08-06-graph-draggable-layout-design.md`.

---

## File Structure

- `js/viz/viz_graph_workbench.js` — add pure `forceStep` and expose it on the `api` object (~line 462, `var api = {...}`). `layout()` unchanged.
- `js/viz/viz_graph_drag.js` — NEW. `NodeDrag` IIFE module (`attach` → controller with `.destroy()`). Dual export.
- `index.html` — add `<script src="js/viz/viz_graph_drag.js" defer></script>` right after the `viz_graph_workbench.js` tag (line 534).
- `js/domains/graph.js` — add `data-node` to the two circle-drawing sites; wire `NodeDrag.attach` into all three render paths (`renderGraphVcr` ~279, `renderGraphStruct` ~396, `renderGraphTraversal` ~489).
- `style.css` — `cursor: grab/grabbing` on nodes; `pointer-events: none` on label/weight/distance text.
- `tests/unit/graph_workbench.test.js` — `forceStep` unit tests.
- `tests/graph_drag.spec.js` — NEW. E2E across VCR / struct / traversal.

---

### Task 1: Pure `forceStep` physics step + unit tests

**Files:**
- Modify: `js/viz/viz_graph_workbench.js` (add function; add to `api` object ~line 462)
- Test: `tests/unit/graph_workbench.test.js`

**Interfaces:**
- Produces: `GraphWorkbench.forceStep(pos, edges, n, opts)` → mutates and returns `pos`. `pos` is `[{x,y}]`; `edges` is `[{u,v,...}]` (indices); `opts = { k?, temp?, fixed?, bounds? }` where `fixed` is a `Set`/array of node indices to hold still, `bounds = { w=600, h=400, pad=20 }`, `k` defaults to `Math.sqrt((w*h)/n)*0.8`, `temp` defaults to `w/12`.

- [ ] **Step 1: Write the failing unit tests**

Add to `tests/unit/graph_workbench.test.js` (it already `require`s the module and uses `node:test` + `node:assert` — match the existing style at the top of that file):

```js
const { test } = require('node:test');
const assert = require('node:assert');
const GW = require('../../js/viz/viz_graph_workbench.js');

test('forceStep: fixed nodes never move', () => {
  const pos = [{ x: 100, y: 100 }, { x: 300, y: 200 }, { x: 500, y: 300 }];
  const edges = [{ u: 0, v: 1 }, { u: 1, v: 2 }];
  for (let i = 0; i < 10; i++) GW.forceStep(pos, edges, 3, { fixed: new Set([0]) });
  assert.strictEqual(pos[0].x, 100);
  assert.strictEqual(pos[0].y, 100);
});

test('forceStep: keeps every node within padded bounds', () => {
  const pos = [{ x: 5, y: 5 }, { x: 595, y: 395 }, { x: 300, y: 200 }, { x: 10, y: 390 }];
  const edges = [{ u: 0, v: 1 }, { u: 2, v: 3 }];
  for (let i = 0; i < 20; i++) GW.forceStep(pos, edges, 4, {});
  for (const p of pos) {
    assert.ok(p.x >= 20 && p.x <= 580, `x in bounds: ${p.x}`);
    assert.ok(p.y >= 20 && p.y <= 380, `y in bounds: ${p.y}`);
  }
});

test('forceStep: a free node off-equilibrium actually moves', () => {
  const pos = [{ x: 300, y: 200 }, { x: 305, y: 200 }];  // two connected nodes far too close → repulsion
  const edges = [{ u: 0, v: 1 }];
  const before = { x: pos[1].x, y: pos[1].y };
  GW.forceStep(pos, edges, 2, {});
  assert.ok(Math.hypot(pos[1].x - before.x, pos[1].y - before.y) > 0, 'free node moved');
});

test('forceStep: deterministic (no RNG)', () => {
  const mk = () => [{ x: 100, y: 100 }, { x: 400, y: 100 }, { x: 250, y: 350 }];
  const edges = [{ u: 0, v: 1 }, { u: 1, v: 2 }, { u: 0, v: 2 }];
  const a = mk(), b = mk();
  for (let i = 0; i < 15; i++) { GW.forceStep(a, edges, 3, {}); GW.forceStep(b, edges, 3, {}); }
  assert.deepStrictEqual(a, b);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test tests/unit/graph_workbench.test.js`
Expected: the 4 new tests FAIL with `GW.forceStep is not a function`.

- [ ] **Step 3: Implement `forceStep` and export it**

In `js/viz/viz_graph_workbench.js`, add this function (near `layout`, before the `var api = {...}` line):

```js
  // One iteration of the same FR force model layout() uses (repulsion k^2/d,
  // attraction d^2/k, temperature-limited step), factored out for the live
  // drag re-settle. Skips opts.fixed nodes and clamps to the padded viewBox.
  // Pure: mutates + returns pos, no RNG, no DOM.
  function forceStep(pos, edges, n, opts) {
    opts = opts || {};
    var b = opts.bounds || {};
    var W = b.w == null ? 600 : b.w, H = b.h == null ? 400 : b.h, pad = b.pad == null ? 20 : b.pad;
    var k = opts.k || Math.sqrt((W * H) / n) * 0.8;
    var temp = opts.temp == null ? W / 12 : opts.temp;
    var fixed = opts.fixed;
    var isFixed = function (i) { return fixed ? (fixed.has ? fixed.has(i) : fixed.indexOf(i) !== -1) : false; };
    var disp = [], ii, jj;
    for (ii = 0; ii < n; ii++) disp.push({ x: 0, y: 0 });
    for (ii = 0; ii < n; ii++) for (jj = ii + 1; jj < n; jj++) {          // repulsion
      var dx = pos[ii].x - pos[jj].x, dy = pos[ii].y - pos[jj].y;
      var d = Math.sqrt(dx * dx + dy * dy) || 0.01;
      var f = (k * k) / d, ux = dx / d, uy = dy / d;
      disp[ii].x += ux * f; disp[ii].y += uy * f;
      disp[jj].x -= ux * f; disp[jj].y -= uy * f;
    }
    for (var m = 0; m < edges.length; m++) {                              // attraction along edges
      var e = edges[m], pu = pos[e.u], pv = pos[e.v];
      var ex = pu.x - pv.x, ey = pu.y - pv.y;
      var ed = Math.sqrt(ex * ex + ey * ey) || 0.01;
      var af = (ed * ed) / k, aux = ex / ed, auy = ey / ed;
      disp[e.u].x -= aux * af; disp[e.u].y -= auy * af;
      disp[e.v].x += aux * af; disp[e.v].y += auy * af;
    }
    for (ii = 0; ii < n; ii++) {
      if (isFixed(ii)) continue;
      var dl = Math.sqrt(disp[ii].x * disp[ii].x + disp[ii].y * disp[ii].y) || 0.01;
      var lim = Math.min(dl, temp);
      pos[ii].x += (disp[ii].x / dl) * lim;
      pos[ii].y += (disp[ii].y / dl) * lim;
      if (pos[ii].x < pad) pos[ii].x = pad; else if (pos[ii].x > W - pad) pos[ii].x = W - pad;
      if (pos[ii].y < pad) pos[ii].y = pad; else if (pos[ii].y > H - pad) pos[ii].y = H - pad;
    }
    return pos;
  }
```

Then add `forceStep: forceStep,` to the `var api = { ... }` object literal (~line 462), so it is exported on both `module.exports` and `global.GraphWorkbench`.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test tests/unit/graph_workbench.test.js`
Expected: PASS (all forceStep tests + the pre-existing ones).

- [ ] **Step 5: Commit**

```bash
git add js/viz/viz_graph_workbench.js tests/unit/graph_workbench.test.js
git commit -m "feat(dsvisual): add pure forceStep physics helper for graph drag re-settle

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: `NodeDrag` controller + wire `renderGraphVcr`

**Files:**
- Create: `js/viz/viz_graph_drag.js`
- Modify: `index.html` (script tag after line 534), `js/domains/graph.js` (`renderGraphVcr` ~200-288), `style.css`
- Test: `tests/graph_drag.spec.js`

**Interfaces:**
- Consumes: `GraphWorkbench.forceStep` (Task 1); `requestAnimationFrame`/`cancelAnimationFrame`; Pointer Events.
- Produces: `NodeDrag.attach({ svgs, pos, edges, n, redraw })` → `{ destroy() }`. `svgs` = array of SVG elements to bind; `pos` = mutable `[{x,y}]`; `redraw` = zero-arg callback that repaints from current `pos`. Node hit via `[data-node="k"]` on `<circle>`. Coordinate mapping via `svg.getBoundingClientRect()` ratio into the 600×400 viewBox.

- [ ] **Step 1: Write the failing E2E (VCR path)**

Create `tests/graph_drag.spec.js` (mirror the harness of `tests/graph_steplog.spec.js`: `require('@playwright/test')`, `require('./helpers.js')` for `loadMethod`, a `beforeEach` that sets `localStorage 'dsvisual-lang' = 'en'` and `page.goto('file://' + path.resolve(__dirname, '../index.html'))`):

```js
const { test, expect } = require('@playwright/test');
const path = require('path');
const { loadMethod } = require('./helpers.js');

// Drag a node by its on-screen center to a new point; returns {before, after} bbox centers.
async function dragNode(page, card, dataNode, dx, dy) {
  const node = card.locator(`.gw-svg .graph-node[data-node="${dataNode}"]`).first();
  const b = await node.boundingBox();
  const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  await page.mouse.move(cx + dx, cy + dy, { steps: 8 });
  await page.mouse.up();
  return { cx, cy, target: { x: cx + dx, y: cy + dy } };
}

test.describe('Graph drag: VCR path', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  test('graph-bfs: nodes carry data-node and drag repositions the dragged node', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const card = page.locator('[data-method-section="graph-bfs"]');
    await expect(card.locator('.gw-svg .graph-node[data-node="0"]')).toHaveCount(1);

    const { target } = await dragNode(page, card, 0, 140, -80);
    await page.waitForTimeout(700); // let the re-settle cool

    // Dragged node stays pinned near the drop point.
    const nb = await card.locator('.gw-svg .graph-node[data-node="0"]').first().boundingBox();
    const nc = { x: nb.x + nb.width / 2, y: nb.y + nb.height / 2 };
    expect(Math.hypot(nc.x - target.x, nc.y - target.y)).toBeLessThan(25);
  });

  test('graph-bfs: dragging re-settles neighbors', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const card = page.locator('[data-method-section="graph-bfs"]');
    const other = () => card.locator('.gw-svg .graph-node[data-node="2"]').first().getAttribute('cx');
    const before = parseFloat(await other());
    await dragNode(page, card, 0, 160, -60);
    await expect.poll(async () => Math.abs(parseFloat(await other()) - before), { timeout: 3000 })
      .toBeGreaterThan(0.5); // a non-dragged node moved as the sim re-settled
  });

  test('graph-bfs: dragged position persists across a VCR step', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const card = page.locator('[data-method-section="graph-bfs"]');
    await dragNode(page, card, 0, 120, -70);
    await page.waitForTimeout(700);
    const cxBefore = await card.locator('.gw-svg .graph-node[data-node="0"]').first().getAttribute('cx');
    await card.locator('.stepctl [data-action="step"]').click();
    const cxAfter = await card.locator('.gw-svg .graph-node[data-node="0"]').first().getAttribute('cx');
    expect(parseFloat(cxAfter)).toBeCloseTo(parseFloat(cxBefore), 1);
  });

  test('graph-bfs: no console errors during drag', async ({ page }) => {
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    await loadMethod(page, 'graph-bfs');
    const card = page.locator('[data-method-section="graph-bfs"]');
    await dragNode(page, card, 0, 100, 60);
    await page.waitForTimeout(500);
    expect(errors).toEqual([]);
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test tests/graph_drag.spec.js --reporter=line`
Expected: FAIL — `data-node` attribute missing / drag does nothing (no `NodeDrag`).

- [ ] **Step 3: Create the `NodeDrag` module**

Create `js/viz/viz_graph_drag.js`:

```js
(function (global) {
  'use strict';

  // Map a screen (client) point into the SVG's 0..600 x 0..400 viewBox using the
  // rendered box ratio — robust to any ancestor CSS zoom transform. .gw-svg keeps
  // the 600:400 aspect (no letterbox), so the mapping is exact.
  function screenToViewBox(svg, cx, cy) {
    var r = svg.getBoundingClientRect();
    var w = r.width || 1, h = r.height || 1;
    return { x: (cx - r.left) / w * 600, y: (cy - r.top) / h * 400 };
  }

  // attach({ svgs, pos, edges, n, redraw }) → { destroy }
  // Pointer-drag nodes; a decaying force sim re-settles the rest; dropped nodes
  // stay pinned. pos is mutable shared state read by the caller's redraw().
  function attach(cfg) {
    var svgs = cfg.svgs, pos = cfg.pos, edges = cfg.edges, n = cfg.n, redraw = cfg.redraw;
    var GW = global.GraphWorkbench;
    var pinned = (typeof Set !== 'undefined') ? new Set() : null;
    var dragging = null, activeSvg = null, raf = null, temp = 0;

    function anyConnected() { for (var i = 0; i < svgs.length; i++) if (svgs[i].isConnected) return true; return false; }
    function stop() { if (raf) { global.cancelAnimationFrame(raf); raf = null; } }
    function tick() {
      if (!anyConnected()) { stop(); return; }                 // orphaned (re-rendered) — stop
      GW.forceStep(pos, edges, n, { fixed: pinned, temp: temp });
      temp *= 0.9;
      redraw();
      if (temp < 0.5 && dragging === null) { stop(); return; }  // cooled and not dragging
      raf = global.requestAnimationFrame(tick);
    }
    function reheat() { temp = 600 / 12; if (!raf) raf = global.requestAnimationFrame(tick); }

    function onDown(svg, ev) {
      var t = (ev.target && ev.target.closest) ? ev.target.closest('[data-node]') : null;
      if (!t) return;
      var k = parseInt(t.getAttribute('data-node'), 10);
      if (!(k >= 0)) return;
      dragging = k; activeSvg = svg; if (pinned) pinned.add(k);
      try { svg.setPointerCapture(ev.pointerId); } catch (e) {}
      svg.classList.add('gw-dragging');
      ev.preventDefault();
    }
    function onMove(svg, ev) {
      if (dragging === null || svg !== activeSvg) return;
      var p = screenToViewBox(svg, ev.clientX, ev.clientY);
      pos[dragging].x = p.x; pos[dragging].y = p.y;
      reheat(); redraw();
      ev.preventDefault();
    }
    function onUp(svg, ev) {
      if (dragging === null) return;
      dragging = null; activeSvg = null;
      svg.classList.remove('gw-dragging');
      try { svg.releasePointerCapture(ev.pointerId); } catch (e) {}
      reheat();                                                 // settle around the dropped anchor, then cool
    }

    var handlers = [];
    for (var i = 0; i < svgs.length; i++) {
      (function (svg) {
        var d = function (e) { onDown(svg, e); };
        var m = function (e) { onMove(svg, e); };
        var u = function (e) { onUp(svg, e); };
        svg.addEventListener('pointerdown', d);
        svg.addEventListener('pointermove', m);
        svg.addEventListener('pointerup', u);
        svg.addEventListener('pointercancel', u);
        handlers.push([svg, d, m, u]);
      })(svgs[i]);
    }

    function destroy() {
      stop();
      for (var j = 0; j < handlers.length; j++) {
        var h = handlers[j];
        h[0].removeEventListener('pointerdown', h[1]);
        h[0].removeEventListener('pointermove', h[2]);
        h[0].removeEventListener('pointerup', h[3]);
        h[0].removeEventListener('pointercancel', h[3]);
      }
    }

    return { destroy: destroy };
  }

  var api = { attach: attach };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.NodeDrag = api;
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4: Include the script in `index.html`**

After line 534 (`<script src="js/viz/viz_graph_workbench.js" defer></script>`), add:

```html
    <script src="js/viz/viz_graph_drag.js" defer></script>
```

- [ ] **Step 5: Add `data-node` to VCR circles + wire the controller**

In `js/domains/graph.js` `renderGraphVcr`:

(a) Add a `lastFrame` holder. After `const logEl = body.querySelector('.gw-steplog');` (~line 216) add:

```js
      let lastFrame = frames[0];
```

(b) In `draw(f)`, make its first line record the frame — change the start of `function draw(f) {` body so the first statement is:

```js
        lastFrame = f;
```

(c) Add `data-node` to the node circle (line ~265). Change:

```js
          s += '<circle class="' + cls + '" cx="' + pos[k].x + '" cy="' + pos[k].y + '" r="18"></circle>';
```
to:
```js
          s += '<circle class="' + cls + '" data-node="' + k + '" cx="' + pos[k].x + '" cy="' + pos[k].y + '" r="18"></circle>';
```

(d) After the row-click wiring block (after line ~287, the end of the `logEl.querySelectorAll('.gw-logrow').forEach(...)` that dispatches scrubber input), add:

```js
      NodeDrag.attach({ svgs: [svg], pos, edges: parsed.edges, n: parsed.n, redraw: () => draw(lastFrame) });
```

- [ ] **Step 6: Add the CSS**

In `style.css`, near the `.gw-svg` rules (~line 425), add:

```css
.gw-svg .graph-node { cursor: grab; }
.gw-svg.gw-dragging .graph-node { cursor: grabbing; }
.gw-svg .graph-node-label, .gw-svg .graph-weight, .gw-svg .graph-distance { pointer-events: none; }
```

- [ ] **Step 7: Run the E2E to verify it passes**

Run: `npx playwright test tests/graph_drag.spec.js --reporter=line`
Expected: PASS (all VCR-path drag tests).

- [ ] **Step 8: Commit**

```bash
git add js/viz/viz_graph_drag.js index.html js/domains/graph.js style.css tests/graph_drag.spec.js
git commit -m "feat(dsvisual): draggable nodes with re-settle for graph VCR viz

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Wire `renderGraphStruct` + `renderGraphTraversal`

**Files:**
- Modify: `js/domains/graph.js` (`drawUndirectedGraph` ~145; `renderGraphStruct` ~392-396; `renderGraphTraversal` ~477-489)
- Test: `tests/graph_drag.spec.js` (add struct + traversal describes)

**Interfaces:**
- Consumes: `NodeDrag.attach` (Task 2); `drawUndirectedGraph(parsed, pos, frame, directed)` returns the SVG inner markup.
- Produces: `graph`/`graph-adjlist`/`graph-multilist` and `graph-traversal` node-link SVGs are draggable; traversal's two panes share one `pos` and stay in sync.

- [ ] **Step 1: Write the failing E2E (struct + traversal)**

Append to `tests/graph_drag.spec.js`:

```js
test.describe('Graph drag: struct + traversal', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  test('graph (structural): node drags and repositions', async ({ page }) => {
    await loadMethod(page, 'graph');
    const card = page.locator('[data-method-section="graph"]');
    await expect(card.locator('.gw-svg .graph-node[data-node="0"]')).toHaveCount(1);
    const node = card.locator('.gw-svg .graph-node[data-node="0"]').first();
    const b = await node.boundingBox();
    const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx + 130, cy - 70, { steps: 8 });
    await page.mouse.up();
    await page.waitForTimeout(700);
    const nb = await node.boundingBox();
    expect(Math.hypot((nb.x + nb.width / 2) - (cx + 130), (nb.y + nb.height / 2) - (cy - 70))).toBeLessThan(25);
  });

  test('graph-traversal: dragging in one pane moves the same node in both', async ({ page }) => {
    await loadMethod(page, 'graph-traversal');
    const card = page.locator('[data-method-section="graph-traversal"]');
    const bfsNode = card.locator('.gw-svg-bfs .graph-node[data-node="0"]').first();
    const dfsNode = card.locator('.gw-svg-dfs .graph-node[data-node="0"]').first();
    await expect(bfsNode).toHaveCount(1);
    await expect(dfsNode).toHaveCount(1);

    const b = await bfsNode.boundingBox();
    const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx + 120, cy - 60, { steps: 8 });
    await page.mouse.up();
    await page.waitForTimeout(700);

    // Both panes share one pos → node 0's cx matches across panes.
    const bx = parseFloat(await bfsNode.getAttribute('cx'));
    const dx = parseFloat(await dfsNode.getAttribute('cx'));
    expect(dx).toBeCloseTo(bx, 1);
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test tests/graph_drag.spec.js -g "struct \+ traversal" --reporter=line`
Expected: FAIL — struct/traversal circles lack `data-node` / not draggable.

- [ ] **Step 3: Add `data-node` in `drawUndirectedGraph`**

In `js/domains/graph.js`, change the circle line in `drawUndirectedGraph` (~line 145):

```js
      s += '<circle class="' + cls + '" cx="' + pos[k].x + '" cy="' + pos[k].y + '" r="18"></circle>';
```
to:
```js
      s += '<circle class="' + cls + '" data-node="' + k + '" cx="' + pos[k].x + '" cy="' + pos[k].y + '" r="18"></circle>';
```

- [ ] **Step 4: Wire `renderGraphStruct`**

In `renderGraphStruct`'s `rebuild()`, after the `body.innerHTML = '<div class="gw-struct-grid">...'` assignment (~line 396), add:

```js
      const svg = body.querySelector('.gw-svg');
      NodeDrag.attach({ svgs: [svg], pos, edges: parsed.edges, n: parsed.n,
        redraw: () => { svg.innerHTML = drawUndirectedGraph(parsed, pos, null, dir); } });
```

(`parsed`, `pos`, `dir` are already in `rebuild()` scope.)

- [ ] **Step 5: Wire `renderGraphTraversal`**

In `renderGraphTraversal`'s `rebuild()`: add a `lastI` holder and set it in `paint`, then attach the controller to both svgs.

(a) After `const descEl = body.querySelector('.gw-stepdesc');` (~line 479) add:

```js
      let lastI = 0;
```

(b) In `function paint(_f, i) {`, make the first statement:

```js
        lastI = i;
```

(c) After `body.appendChild(K().buildFrameControls(Array.from({ length: L }), paint, { runIntervalMs: 700 }));` (~line 489) add:

```js
      NodeDrag.attach({ svgs: [svgBfs, svgDfs], pos, edges: parsed.edges, n: parsed.n,
        redraw: () => paint(null, lastI) });
```

- [ ] **Step 6: Run the E2E to verify it passes**

Run: `npx playwright test tests/graph_drag.spec.js --reporter=line`
Expected: PASS (VCR + struct + traversal).

- [ ] **Step 7: Commit**

```bash
git add js/domains/graph.js tests/graph_drag.spec.js
git commit -m "feat(dsvisual): draggable nodes for structural + dual-pane graph viz

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: Full-suite gate + guards

**Files:** none (verification only).

- [ ] **Step 1: Confirm protected files untouched**

Run: `git status --porcelain js/cloud-config.js js/code_db.js`
Expected: empty. If `js/cloud-config.js` changed: `git checkout js/cloud-config.js`.

- [ ] **Step 2: Run the entire test suite**

Run: `npm run test:all`
Expected: all green — unit (`forceStep`) + E2E, including dynamic count tests and `tests/random_push.spec.js`. No regressions in the existing graph specs (`graph_workbench`, `graph_boruvka`, `graph_steplog`, `visualizer`).

---

## Self-Review

**Spec coverage:**
- Pure `forceStep`, `layout()` untouched → Task 1. ✓
- `NodeDrag` controller (pointer, `data-node` hit-test, getBoundingClientRect mapping, decaying rAF, isConnected self-clean, pinned-on-drop) → Task 2 Step 3. ✓
- Wire all three render paths (VCR / struct / traversal-both-panes-shared-pos) → Task 2 Step 5 + Task 3 Steps 4-5. ✓
- `data-node` on both circle sites; cursor + label `pointer-events:none` CSS → Task 2 Steps 5-6, Task 3 Step 3. ✓
- index.html include → Task 2 Step 4. ✓
- Unit tests (fixed unchanged / bounds / moves / deterministic) → Task 1 Step 1. ✓
- E2E (data-node, reposition, re-settle, VCR-persist, no-errors, struct, traversal dual-pane sync) → Task 2 Step 1 + Task 3 Step 1. ✓
- Counts unchanged / protected files → Task 4. ✓

**Placeholder scan:** No TBD/TODO. Harness reuse ("mirror `graph_steplog.spec.js`") points at concrete existing helpers.

**Type/name consistency:** `NodeDrag.attach({svgs, pos, edges, n, redraw})` and `GraphWorkbench.forceStep(pos, edges, n, opts)` signatures are identical across module definition, all three call sites, and tests. `data-node` attribute, `.gw-dragging` class, `.graph-node`/`-label`/`-weight`/`-distance` selectors match between graph.js, style.css, and specs. `lastFrame` (VCR) / `lastI` (traversal) hold the current frame for `redraw`. ✓
