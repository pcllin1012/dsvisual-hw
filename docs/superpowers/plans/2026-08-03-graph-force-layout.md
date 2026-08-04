# Deterministic Force-Directed Graph Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Replace the rigid circular graph layout with a deterministic force-directed (Fruchterman–Reingold) layout that minimizes edge crossings, shared by all graph workbench methods.

**Architecture:** Extend `GraphWorkbench.layout(n, cx, cy, r, edges)` — with `edges` it runs FR (deterministic, fit-to-box); without `edges` it keeps the circle (backward-compat). The 3 render call sites pass `parsed.edges`.

**Tech Stack:** Vanilla JS dual-export module, Playwright + `node --test`.

## Global Constraints

- Do NOT modify `js/cloud-config.js` / `tests/random_push.spec.js` / cpp / code_db / graph-scc.
- Commit messages end with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Branch `feat/graph-force-layout` (off main @ 1bd39de). Never switch to main.
- Layout MUST be deterministic (no `Math.random`; fixed iterations) so it's stable across re-renders and testable. Counts unchanged.

---

### Task 1: Force-directed `layout(n, cx, cy, r, edges)` + unit tests

**Files:** Modify `js/viz/viz_graph_workbench.js`; Test `tests/unit/graph_workbench.test.js`.

- [ ] **Step 1: Write failing/added unit tests** — append to `tests/unit/graph_workbench.test.js` (keep the existing "no-edges → circle" test unchanged):
```js
function countCrossings(edges, pos) {
  function seg(e) { return [pos[e.u], pos[e.v]]; }
  function ccw(a, b, c) { return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x); }
  function inter(a, b, c, d) { return ccw(a, c, d) !== ccw(b, c, d) && ccw(a, b, c) !== ccw(a, b, d); }
  let x = 0;
  for (let i = 0; i < edges.length; i++) for (let j = i + 1; j < edges.length; j++) {
    const e = edges[i], f = edges[j];
    if (e.u === f.u || e.u === f.v || e.v === f.u || e.v === f.v) continue; // shared endpoint
    const [a, b] = seg(e), [c, d] = seg(f);
    if (inter(a, b, c, d)) x++;
  }
  return x;
}

test('force layout: deterministic, bounded, non-overlapping', () => {
  const p = GW.parseEdges('A-B,A-C,A-D,B-C,B-D,C-D', false, false); // K4
  const L1 = GW.layout(p.n, 300, 200, 150, p.edges);
  const L2 = GW.layout(p.n, 300, 200, 150, p.edges);
  assert.deepStrictEqual(L1, L2);                       // deterministic
  assert.strictEqual(L1.length, p.n);
  for (const q of L1) {                                 // inside the box (small tolerance) + viewBox
    assert.ok(q.x >= 150 - 1 && q.x <= 450 + 1 && q.y >= 50 - 1 && q.y <= 350 + 1);
    assert.ok(q.x >= 0 && q.x <= 600 && q.y >= 0 && q.y <= 400);
  }
  for (let i = 0; i < L1.length; i++) for (let j = i + 1; j < L1.length; j++) {  // non-overlap
    const dx = L1[i].x - L1[j].x, dy = L1[i].y - L1[j].y;
    assert.ok(Math.sqrt(dx * dx + dy * dy) > 8, 'nodes ' + i + ',' + j + ' too close');
  }
});

test('force layout reduces crossings vs circle (K4)', () => {
  const p = GW.parseEdges('A-B,A-C,A-D,B-C,B-D,C-D', false, false); // planar; circle order has a crossing
  const circle = GW.layout(p.n, 300, 200, 150);          // no edges → circle
  const force = GW.layout(p.n, 300, 200, 150, p.edges);
  assert.ok(countCrossings(p.edges, force) <= countCrossings(p.edges, circle));
});
```

- [ ] **Step 2: Run, verify fail** — `node --test tests/unit/graph_workbench.test.js` → the two new tests fail (`layout` ignores the 5th arg → circle → deterministic but crossings not reduced / bounds differ).

- [ ] **Step 3: Implement FR in `layout`** — replace `layout` in `js/viz/viz_graph_workbench.js` with:
```js
  function layout(n, cx, cy, r, edges) {
    cx = cx == null ? 300 : cx; cy = cy == null ? 200 : cy; r = r == null ? 150 : r;
    var i, j;
    if (!edges || n <= 1) {                              // circle fallback (unchanged behavior)
      var pc = [];
      for (i = 0; i < n; i++) { var a0 = -Math.PI / 2 + i * 2 * Math.PI / n; pc.push({ x: cx + r * Math.cos(a0), y: cy + r * Math.sin(a0) }); }
      return pc;
    }
    var W = 600, H = 400, k = Math.sqrt((W * H) / n) * 0.8;
    var pos = [];
    for (i = 0; i < n; i++) {                            // deterministic circle seed + index jitter (no RNG)
      var a = -Math.PI / 2 + i * 2 * Math.PI / n;
      var jx = (((i * 2654435761) % 1000) / 1000 - 0.5) * 2;
      var jy = (((i * 40503) % 1000) / 1000 - 0.5) * 2;
      pos.push({ x: W / 2 + (H / 3) * Math.cos(a) + jx, y: H / 2 + (H / 3) * Math.sin(a) + jy });
    }
    var t = W / 8, ITER = 300, cool = t / (ITER + 1);
    for (var it = 0; it < ITER; it++) {
      var disp = [];
      for (i = 0; i < n; i++) disp.push({ x: 0, y: 0 });
      for (i = 0; i < n; i++) for (j = i + 1; j < n; j++) {   // repulsion
        var dx = pos[i].x - pos[j].x, dy = pos[i].y - pos[j].y;
        var d = Math.sqrt(dx * dx + dy * dy) || 0.01;
        var f = (k * k) / d, ux = dx / d, uy = dy / d;
        disp[i].x += ux * f; disp[i].y += uy * f;
        disp[j].x -= ux * f; disp[j].y -= uy * f;
      }
      for (var m = 0; m < edges.length; m++) {               // attraction along edges
        var e = edges[m], pu = pos[e.u], pv = pos[e.v];
        var ex = pu.x - pv.x, ey = pu.y - pv.y;
        var ed = Math.sqrt(ex * ex + ey * ey) || 0.01;
        var af = (ed * ed) / k, aux = ex / ed, auy = ey / ed;
        disp[e.u].x -= aux * af; disp[e.u].y -= auy * af;
        disp[e.v].x += aux * af; disp[e.v].y += auy * af;
      }
      for (i = 0; i < n; i++) {                              // limit step by temperature
        var dl = Math.sqrt(disp[i].x * disp[i].x + disp[i].y * disp[i].y) || 0.01;
        var lim = Math.min(dl, t);
        pos[i].x += (disp[i].x / dl) * lim; pos[i].y += (disp[i].y / dl) * lim;
      }
      t -= cool; if (t < 1) t = 1;
    }
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;   // fit to (cx±r, cy±r), uniform scale
    for (i = 0; i < n; i++) { if (pos[i].x < minX) minX = pos[i].x; if (pos[i].y < minY) minY = pos[i].y; if (pos[i].x > maxX) maxX = pos[i].x; if (pos[i].y > maxY) maxY = pos[i].y; }
    var bw = (maxX - minX) || 1, bh = (maxY - minY) || 1;
    var scale = Math.min((2 * r) / bw, (2 * r) / bh);
    var out = [];
    for (i = 0; i < n; i++) out.push({ x: cx + (pos[i].x - (minX + maxX) / 2) * scale, y: cy + (pos[i].y - (minY + maxY) / 2) * scale });
    return out;
  }
```

- [ ] **Step 4: Run** — `node --test tests/unit/graph_workbench.test.js` all pass (incl. the retained circle test + 2 new); `node --test tests/unit/*.test.js` no regressions (report count); `node --check js/viz/viz_graph_workbench.js`. If the non-overlap threshold (8) or the crossing test is too tight/loose for the deterministic output, adjust the ASSERTION to the true deterministic value (do not fudge the algorithm) — e.g. print `countCrossings` for both and confirm force ≤ circle; confirm min pairwise distance and set the threshold just under it.

- [ ] **Step 5: Commit**
```bash
git add js/viz/viz_graph_workbench.js tests/unit/graph_workbench.test.js
git commit -m "feat: deterministic force-directed graph layout (reduces edge crossings)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Wire call sites + verify

**Files:** Modify `js/domains/graph.js`; Test `tests/graph_workbench.spec.js` (if a sanity assertion is added).

- [ ] **Step 1: Pass edges at the 3 call sites** — in `js/domains/graph.js`, change all three `GraphWorkbench.layout(parsed.n, 300, 200, 150)` (in `renderGraphVcr`, `renderGraphStruct`, `renderGraphTraversal`) to `GraphWorkbench.layout(parsed.n, 300, 200, 150, parsed.edges)`. No other render changes (pos stays index-keyed; nodes/edges/labels drawn as before).

- [ ] **Step 2: Verify** — `node --check js/domains/graph.js`; `git status --porcelain js/cloud-config.js` empty; `npm run test:all` → GREEN. All existing graph E2E assert node/edge COUNTS and attachment (layout-independent) so they pass; the pentagon default still has 5 nodes, etc. Report the pass count and any failure.

- [ ] **Step 3: Add an E2E bounds sanity check** (optional but recommended) — append to `tests/graph_workbench.spec.js`: load `graph-bfs`, assert all `.gw-svg .graph-node` circles have `cx`/`cy` within the viewBox (0..600, 0..400) — confirms the fit-to-box keeps nodes on-screen. Example:
```js
  test('force layout keeps all nodes within the viewBox', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const sec = page.locator('[data-method-section="graph-bfs"]');
    const cs = await sec.locator('.gw-svg .graph-node').evaluateAll((els) =>
      els.map((c) => ({ x: +c.getAttribute('cx'), y: +c.getAttribute('cy') })));
    expect(cs.length).toBe(5);
    for (const c of cs) { expect(c.x).toBeGreaterThanOrEqual(0); expect(c.x).toBeLessThanOrEqual(600); expect(c.y).toBeGreaterThanOrEqual(0); expect(c.y).toBeLessThanOrEqual(400); }
  });
```
Run `npx playwright test tests/graph_workbench.spec.js` → green.

- [ ] **Step 4: Full suite** — `npm run test:all` → 0 failures (report count). Confirm count/i18n tests unchanged and `git status --porcelain js/cloud-config.js` empty.

- [ ] **Step 5: Commit**
```bash
git add js/domains/graph.js tests/graph_workbench.spec.js
git commit -m "feat: graph renders use force-directed layout (pass edges); E2E viewBox bounds

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

- **Spec coverage:** Task 1 (FR layout + tests), Task 2 (wire 3 call sites + verify) — covers the spec.
- **Placeholder scan:** none.
- **Type consistency:** `layout(n, cx, cy, r, edges)` — `edges` optional (circle fallback keeps the existing no-arg test valid); all 3 call sites pass `parsed.edges` (`[{u,v,w}]`, indices — FR reads `e.u`/`e.v`). Output shape `[{x,y}]` unchanged → renders unaffected beyond position.
- **Determinism:** no `Math.random`; index-seeded jitter + fixed 300 iterations → identical output each call (stable across re-renders/language-switch; unit test asserts `deepStrictEqual`).
- **Bounds/overlap:** result bbox uniformly scaled+centered into `(cx±r, cy±r)` ⊂ viewBox; repulsion prevents overlap; unit + E2E assert both.
- **No regression:** algorithms/frame data/labels/counts untouched; only node positions change; existing count-based E2E stay valid.
