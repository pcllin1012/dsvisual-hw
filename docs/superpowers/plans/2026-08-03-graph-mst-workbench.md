# Graph MST Workbench (Kruskal + Prim) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `graph-kruskal` and `graph-prim` to the graph workbench (edge-list input + 🎲 random + difficulty + examples + VCR), reusing the pilot framework.

**Architecture:** Add two pure frame generators (`kruskalFrames`, `primFrames`) to `js/viz/viz_graph_workbench.js` with a new optional `treeEdges` Frame field; extend the shared `renderGraphVcr` to highlight MST edges and hide the source selector for Kruskal; add random dispatch cases; re-point the 2 registry lines. The other 6 graph methods and the pilot are untouched.

**Tech Stack:** Vanilla JS dual-export module, `K().buildFrameControls` VCR, Playwright + `node --test`.

## Global Constraints

- Do NOT modify `js/cloud-config.js` (must keep `__PLACEHOLDER__` tokens; if it shows modified, `git checkout js/cloud-config.js`).
- Do NOT revert `tests/random_push.spec.js`.
- Commit messages end with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Branch `feat/graph-mst-workbench` (already created off main @ d0076a1). Never switch to main.
- No new method/category → counts unchanged (overview/nav/i18n count tests must stay green).
- All new UI text + every frame `message` is bilingual `{zh, en}`; module stays pure (no DOM/`window`).
- The module uses `var` + a `snap()` helper + `activeEdge = {u: Math.min, v: Math.max}` — match that style.

---

### Task 1: MST frame generators + Frame `treeEdges` + DEFAULTS

**Files:**
- Modify: `js/viz/viz_graph_workbench.js` (add `kruskalFrames`, `primFrames`, DEFAULTS entries, exports)
- Test: `tests/unit/graph_workbench.test.js` (append)

**Interfaces:**
- Consumes: existing `parseEdges(text, true)` → `{ ok, n, adj, edges:[{u,v,w}] }` (undirected, u<v, deduped).
- Produces: `kruskalFrames(edges, n)` and `primFrames(adj, source)` → `Array<Frame>` where `Frame` gains optional `treeEdges: [{u,v}]` (accepted MST edges so far); `dist: null` for both. `DEFAULTS['graph-kruskal']` and `DEFAULTS['graph-prim']` = the pentagon weighted string.

- [ ] **Step 1: Write failing unit tests** — append to `tests/unit/graph_workbench.test.js`:

```js
test('kruskalFrames builds a valid MST on the pentagon (weight 10)', () => {
  const p = GW.parseEdges(GW.DEFAULTS['graph-kruskal'], true);
  const frames = GW.kruskalFrames(p.edges, p.n);
  const last = frames[frames.length - 1];
  assert.strictEqual(last.treeEdges.length, p.n - 1); // 4 edges
  // total weight of chosen tree edges
  const wByKey = {}; for (const e of p.edges) wByKey[e.u + '-' + e.v] = e.w;
  const total = last.treeEdges.reduce((s, e) => s + wByKey[e.u + '-' + e.v], 0);
  assert.strictEqual(total, 10);
  // at least one reject (cycle) frame appears (pentagon has 6 edges, MST has 4)
  assert.ok(frames.some((f) => /環|cycle/.test(f.message.zh + f.message.en)));
  for (const f of frames) {
    assert.strictEqual(f.dist, null);
    assert.ok(f.message.zh.length > 0 && f.message.en.length > 0);
  }
});

test('primFrames grows the MST from the source; same weight as Kruskal', () => {
  const p = GW.parseEdges(GW.DEFAULTS['graph-prim'], true);
  const frames = GW.primFrames(p.adj, 0);
  const first = frames[0], last = frames[frames.length - 1];
  assert.deepStrictEqual(first.visited, [0]); // only source in tree at start
  assert.strictEqual(last.treeEdges.length, p.n - 1);
  const wByKey = {}; for (const e of p.edges) wByKey[e.u + '-' + e.v] = e.w;
  const total = last.treeEdges.reduce((s, e) => s + wByKey[e.u + '-' + e.v], 0);
  assert.strictEqual(total, 10);
  for (const f of frames) {
    assert.strictEqual(f.dist, null);
    assert.ok(f.message.zh.length > 0 && f.message.en.length > 0);
  }
});

test('DEFAULTS for kruskal and prim parse ok with n=5', () => {
  for (const id of ['graph-kruskal', 'graph-prim']) {
    const p = GW.parseEdges(GW.DEFAULTS[id], true);
    assert.ok(p.ok); assert.strictEqual(p.n, 5);
  }
});
```

- [ ] **Step 2: Run tests, verify they fail**

Run: `node --test tests/unit/graph_workbench.test.js`
Expected: FAIL (`GW.kruskalFrames is not a function`, and DEFAULTS keys undefined).

- [ ] **Step 3: Add DEFAULTS entries** — in `js/viz/viz_graph_workbench.js`, extend the `DEFAULTS` object (keep the pilot three unchanged; the weighted string equals `graph-dijkstra`'s):

```js
  var DEFAULTS = {
    'graph-bfs': '0 1\n1 2\n2 3\n3 4\n4 0\n0 2',
    'graph-dfs': '0 1\n1 2\n2 3\n3 4\n4 0\n0 2',
    'graph-dijkstra': '0 1 4\n1 2 1\n2 3 6\n3 4 2\n4 0 3\n0 2 5',
    'graph-kruskal': '0 1 4\n1 2 1\n2 3 6\n3 4 2\n4 0 3\n0 2 5',
    'graph-prim': '0 1 4\n1 2 1\n2 3 6\n3 4 2\n4 0 3\n0 2 5'
  };
```

- [ ] **Step 4: Implement the two generators** — add after `dijkstraFrames` (before the `api` line), matching the module's `var`/`snap` style:

```js
  function kruskalFrames(edges, n) {
    var frames = [], tree = [], order = [], inTree = [], parent = [], rank = [], i;
    for (i = 0; i < n; i++) { inTree.push(false); parent.push(i); rank.push(0); }
    function find(x) { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }
    function union(a, b) {
      var ra = find(a), rb = find(b); if (ra === rb) return false;
      if (rank[ra] < rank[rb]) { var t = ra; ra = rb; rb = t; }
      parent[rb] = ra; if (rank[ra] === rank[rb]) rank[ra]++; return true;
    }
    function snap(activeEdge, msg) {
      frames.push({ visited: order.slice(), frontier: [], active: null, activeEdge: activeEdge, dist: null, order: order.slice(), treeEdges: tree.slice(), message: msg });
    }
    var sorted = edges.slice().sort(function (a, b) { return a.w - b.w || a.u - b.u || a.v - b.v; });
    var total = 0;
    snap(null, { zh: '依權重由小到大考慮每條邊(共 ' + sorted.length + ' 條)', en: 'Consider edges in increasing weight (' + sorted.length + ' total)' });
    for (i = 0; i < sorted.length; i++) {
      var e = sorted[i], ae = { u: Math.min(e.u, e.v), v: Math.max(e.u, e.v) };
      if (union(e.u, e.v)) {
        tree.push(ae); total += e.w;
        if (!inTree[e.u]) { inTree[e.u] = true; order.push(e.u); }
        if (!inTree[e.v]) { inTree[e.v] = true; order.push(e.v); }
        snap(ae, { zh: '加入邊 ' + ae.u + '–' + ae.v + '(w=' + e.w + ')', en: 'Add edge ' + ae.u + '–' + ae.v + ' (w=' + e.w + ')' });
        if (tree.length === n - 1) break;
      } else {
        snap(ae, { zh: '捨棄 ' + ae.u + '–' + ae.v + ':會成環', en: 'Skip ' + ae.u + '–' + ae.v + ': would form a cycle' });
      }
    }
    snap(null, { zh: 'MST 完成,總權重 ' + total, en: 'MST done. Total weight ' + total });
    return frames;
  }

  function primFrames(adj, source) {
    var n = adj.length, frames = [], tree = [], order = [], inTree = [], i, j;
    for (i = 0; i < n; i++) inTree.push(false);
    function fringe() {
      var f = [], k;
      for (k = 0; k < n; k++) if (inTree[k]) for (var t = 0; t < adj[k].length; t++) { var to = adj[k][t].to; if (!inTree[to] && f.indexOf(to) === -1) f.push(to); }
      return f;
    }
    function snap(activeEdge, msg) {
      frames.push({ visited: order.slice(), frontier: fringe(), active: null, activeEdge: activeEdge, dist: null, order: order.slice(), treeEdges: tree.slice(), message: msg });
    }
    inTree[source] = true; order.push(source);
    snap(null, { zh: '從起點 ' + source + ' 開始長樹', en: 'Grow the tree from source ' + source });
    var total = 0;
    for (var cnt = 0; cnt < n - 1; cnt++) {
      var bu = -1, bv = -1, bw = Infinity;
      for (i = 0; i < n; i++) if (inTree[i]) for (j = 0; j < adj[i].length; j++) { var to = adj[i][j].to, w = adj[i][j].w; if (!inTree[to] && w < bw) { bw = w; bu = i; bv = to; } }
      if (bv === -1) break; // disconnected: stop growing this component
      inTree[bv] = true; order.push(bv);
      var ae = { u: Math.min(bu, bv), v: Math.max(bu, bv) }; tree.push(ae); total += bw;
      snap(ae, { zh: '加入 ' + ae.u + '–' + ae.v + '(w=' + bw + '),節點 ' + bv + ' 入樹', en: 'Add ' + ae.u + '–' + ae.v + ' (w=' + bw + '); node ' + bv + ' joins the tree' });
    }
    snap(null, { zh: 'MST 完成,總權重 ' + total, en: 'Prim done. Total weight ' + total });
    return frames;
  }
```

- [ ] **Step 5: Export them** — extend the `api` line:

```js
  var api = { parseEdges: parseEdges, layout: layout, DEFAULTS: DEFAULTS, bfsFrames: bfsFrames, dfsFrames: dfsFrames, dijkstraFrames: dijkstraFrames, kruskalFrames: kruskalFrames, primFrames: primFrames };
```

- [ ] **Step 6: Run tests, verify pass**

Run: `node --test tests/unit/graph_workbench.test.js` → all pass.
Run: `node --test tests/unit/*.test.js` → no regressions (report count).
Run: `node --check js/viz/viz_graph_workbench.js` → clean.

- [ ] **Step 7: Commit**

```bash
git add js/viz/viz_graph_workbench.js tests/unit/graph_workbench.test.js
git commit -m "feat: kruskal + prim MST frame generators (+ treeEdges frame field, defaults)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Random dispatch for kruskal + prim

**Files:**
- Modify: `js/random_input.js` (2 dispatch cases)
- Test: `tests/unit/graph_workbench.test.js` (extend the existing connectivity loop, if present, to include the two ids — or add a focused test)

**Interfaces:**
- Consumes: existing `graphEdgeList(rng, difficulty, true)` (weighted, connected, n≤12) and `parseEdges`.
- Produces: `randomInputFor('graph-kruskal'|'graph-prim', diff, rng)` → `{ text }` parseable weighted graph.

- [ ] **Step 1: Write failing test** — add to `tests/unit/graph_workbench.test.js` (mirror the pilot's connectivity test; `RI` is already required there):

```js
test('random kruskal/prim inputs are connected weighted graphs (n<=12)', () => {
  for (const id of ['graph-kruskal', 'graph-prim']) {
    for (const d of ['edge', 'normal', 'large', 'special']) {
      let seed = 7;
      const rng = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
      const txt = RI.randomInputFor(id, d, rng).text;
      const p = GW.parseEdges(txt, true);
      assert.ok(p.ok, id + '/' + d + ' parses');
      assert.ok(p.n >= 3 && p.n <= 12, id + '/' + d + ' n in range');
      // connected: BFS from 0 reaches all n
      const seen = new Set([0]); const q = [0];
      while (q.length) { const u = q.shift(); for (const e of p.adj[u]) if (!seen.has(e.to)) { seen.add(e.to); q.push(e.to); } }
      assert.strictEqual(seen.size, p.n, id + '/' + d + ' connected');
    }
  }
});
```

- [ ] **Step 2: Run, verify fail**

Run: `node --test tests/unit/graph_workbench.test.js`
Expected: FAIL (`randomInputFor` returns `null` for these ids → `.text` throws).

- [ ] **Step 3: Add dispatch cases** — in `js/random_input.js`, in the `switch (methodId)` of `randomInputFor`, next to `case 'graph-dijkstra':`:

```js
      case 'graph-kruskal':
      case 'graph-prim':
        return { text: graphEdgeList(rng, difficulty, true) };
```

- [ ] **Step 4: Run, verify pass**

Run: `node --test tests/unit/graph_workbench.test.js` → all pass.
Run: `node --check js/random_input.js` → clean.

- [ ] **Step 5: Commit**

```bash
git add js/random_input.js tests/unit/graph_workbench.test.js
git commit -m "feat: difficulty-aware random weighted graphs for kruskal + prim

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: `renderGraphVcr` extension + registry + CSS

**Files:**
- Modify: `js/domains/graph.js` (`GW_META`, `gen` signature, `draw` treeEdges, `usesSource`, 2 attach lines)
- Modify: `style.css` (`.graph-edge.tree`)

**Interfaces:**
- Consumes: `GraphWorkbench.kruskalFrames`, `GraphWorkbench.primFrames`, `GraphWorkbench.DEFAULTS`.
- Produces: `graph-kruskal`/`graph-prim` rendered by `renderGraphVcr`; MST edges shown with `.graph-edge.tree`; Kruskal has no source selector.

- [ ] **Step 1: Change `gen` to receive the parsed object** — READ the current `GW_META` and `renderGraphVcr` in `js/domains/graph.js`. Update the pilot three entries and the call site so `gen` takes `(parsed, source)`:

```js
  const GW_META = {
    'graph-bfs':      { weighted: false, usesSource: true,  gen: (p, s) => GraphWorkbench.bfsFrames(p.adj, s) },
    'graph-dfs':      { weighted: false, usesSource: true,  gen: (p, s) => GraphWorkbench.dfsFrames(p.adj, s) },
    'graph-dijkstra': { weighted: true,  usesSource: true,  gen: (p, s) => GraphWorkbench.dijkstraFrames(p.adj, s) },
    'graph-kruskal':  { weighted: true,  usesSource: false, gen: (p, s) => GraphWorkbench.kruskalFrames(p.edges, p.n) },
    'graph-prim':     { weighted: true,  usesSource: true,  gen: (p, s) => GraphWorkbench.primFrames(p.adj, s) },
  };
```

In `rebuild()`, change `const frames = meta.gen(parsed.adj, st.source);` to `const frames = meta.gen(parsed, st.source);`.

- [ ] **Step 2: Hide the source control for `usesSource:false`** — in the `host.innerHTML` toolbar of `renderGraphVcr`, wrap the source `<label>` so it only renders when `meta.usesSource !== false`. Concretely, replace the inline source-label string with a variable built beforehand:

```js
    const sourceCtl = (meta.usesSource === false) ? '' :
      '<label class="gw-src-lbl">' + langOf({ zh: '起點', en: 'Source' }) + ' <select class="gw-source" data-testid="gw-source"></select></label>';
```
and interpolate `sourceCtl` where the label used to be. Then guard the source wiring: only query `.gw-source` / call `rebuildSource` / add the change listener when `meta.usesSource !== false`. When there is no source control, `rebuild()` must NOT call `rebuildSource` (there's no select) and must pass `st.source` (default 0, unused by Kruskal). Ensure `rebuild()` still works with `srcSel` possibly null (guard `if (srcSel) rebuildSource(parsed.n);`).

- [ ] **Step 3: Highlight MST edges in `draw()`** — in the `draw(f)` closure, build a set of tree-edge keys and add a `tree` class to those edges (active takes precedence so a just-accepted edge is amber that step, green after):

```js
        const treeKeys = new Set((f.treeEdges || []).map((e) => e.u + '-' + e.v));
        // ...inside the edge loop, replace the class computation:
        const key = e.u + '-' + e.v;
        const active = f.activeEdge && f.activeEdge.u === e.u && f.activeEdge.v === e.v;
        const ecls = 'graph-edge' + (active ? ' active' : (treeKeys.has(key) ? ' tree' : ''));
        s += '<line class="' + ecls + '" x1="' + pos[e.u].x + '" y1="' + pos[e.u].y + '" x2="' + pos[e.v].x + '" y2="' + pos[e.v].y + '"></line>';
```
Leave the node-drawing and `meta.weighted` weight-label logic as-is (MST frames have `dist:null`, so no per-node distance labels appear).

- [ ] **Step 4: Re-point the 2 registry lines** — change ONLY these two (leave the other graph attaches unchanged):

```js
  R().attach('graph-kruskal', { render: () => renderGraphVcr('graph-kruskal'), code: () => codeGraphKruskal, layout: { host: 'dynamic' } });
  R().attach('graph-prim',    { render: () => renderGraphVcr('graph-prim'),    code: () => codeGraphPrim,    layout: { host: 'dynamic' } });
```

- [ ] **Step 5: Add MST-edge CSS** — append near the other `.gw-svg` rules in `style.css`:

```css
.gw-svg .graph-edge.tree { stroke: #34d399; stroke-width: 4; }
@media (prefers-color-scheme: dark) { .gw-svg .graph-edge.tree { stroke: #34d399; } }
```

- [ ] **Step 6: Verify (no new unit/E2E here)**

Run: `node --check js/domains/graph.js` → clean.
Run: `git status --porcelain js/cloud-config.js` → empty.
Run: `npm run test:all`. EXPECT the existing Prim test (`tests/visualizer.spec.js` ~L685 "Prim MST renders a weighted graph and steps") to FAIL now (asserts old `.wgraph-node`/`prim-stats` UI) — that is EXPECTED and fixed in Task 4. Confirm the Kruskal test (~L214) still PASSES and no OTHER tests fail. Report the exact failing test list.

- [ ] **Step 7: Commit**

```bash
git add js/domains/graph.js style.css
git commit -m "feat: renderGraphVcr supports kruskal + prim (MST edge highlight, source-less kruskal)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: E2E — rewrite Prim test + add kruskal/prim workbench tests

**Files:**
- Modify: `tests/visualizer.spec.js` (rewrite the ~L685 Prim test)
- Modify: `tests/graph_workbench.spec.js` (add kruskal + prim coverage)

**Interfaces:**
- Consumes: the rendered `graph-kruskal`/`graph-prim` workbench (`[data-testid="gw-input"]`, `.stepctl`, `.gw-svg .graph-node`, `.gw-svg .graph-edge.tree`, `.stepctl-count`, `[data-action="step"]`, `.stepctl-scrubber`).

- [ ] **Step 1: Rewrite the stale Prim test** — in `tests/visualizer.spec.js`, replace the body of the "Graphs: Prim MST renders a weighted graph and steps" test (~L685) with new-UI assertions (keep the filename check):

```js
    test('Graphs: Prim MST renders the workbench + VCR transport', async ({ page }) => {
        await loadMethod(page, 'graph-prim');
        const card = page.locator('[data-method-section="graph-prim"]');
        await expect(card.locator('.code-panel-filename')).toContainText('graph_prim.cpp');
        await expect(card.locator('[data-testid="gw-input"]')).toBeVisible();
        await expect(card.locator('.gw-svg .graph-node')).toHaveCount(5);
        const cnt = card.locator('.stepctl-count');
        const before = await cnt.textContent();
        await card.locator('.stepctl [data-action="step"]').click();
        await expect(cnt).not.toHaveText(before);
    });
```

- [ ] **Step 2: Add kruskal + prim workbench E2E** — append to `tests/graph_workbench.spec.js` (inside the existing `describe`, or a new one; `loadMethod`/`expect` already imported). Note: scrub the slider to the LAST frame to assert the MST edges appear:

```js
  for (const id of ['graph-kruskal', 'graph-prim']) {
    test(id + ': workbench renders and the final frame shows MST tree edges', async ({ page }) => {
      await loadMethod(page, id);
      const sec = page.locator('[data-method-section="' + id + '"]');
      await expect(sec.locator('[data-testid="gw-input"]')).toBeVisible();
      await expect(sec.locator('.stepctl')).toBeVisible();
      await expect(sec.locator('.gw-svg .graph-node')).toHaveCount(5);
      // jump the scrubber to the end → MST complete → tree edges present
      await sec.locator('.stepctl-scrubber').evaluate((el) => { el.value = el.max; el.dispatchEvent(new Event('input', { bubbles: true })); });
      await expect(sec.locator('.gw-svg .graph-edge.tree')).toHaveCount(4); // MST on 5 nodes = 4 edges
    });
  }

  test('graph-kruskal has no source selector; graph-prim has one', async ({ page }) => {
    await loadMethod(page, 'graph-kruskal');
    await expect(page.locator('[data-method-section="graph-kruskal"] [data-testid="gw-source"]')).toHaveCount(0);
    await loadMethod(page, 'graph-prim');
    await expect(page.locator('[data-method-section="graph-prim"] [data-testid="gw-source"]')).toHaveCount(1);
  });
```

- [ ] **Step 3: Run the two specs, iterate to green**

Run: `npx playwright test tests/graph_workbench.spec.js tests/visualizer.spec.js`
- If a selector assumption is wrong, inspect the real DOM/behavior and correct the TEST to match correct behavior — do NOT weaken an assertion to hide a real bug.
- The MST tree-edge count is `n-1 = 4` on the default pentagon; if the scrubber-to-end approach doesn't settle, clicking `[data-action="reset"]`-then-play, or setting the scrubber value and dispatching `input`, are the levers — verify against `buildFrameControls` behavior.

- [ ] **Step 4: Full suite green**

Run: `npm run test:all` → 0 failures (report the pass count). Confirm overview/nav/i18n count tests unchanged and `git status --porcelain js/cloud-config.js` empty.

- [ ] **Step 5: Commit**

```bash
git add tests/graph_workbench.spec.js tests/visualizer.spec.js
git commit -m "test: E2E for kruskal + prim workbench; update stale prim UI assertion

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

- **Spec coverage:** Task 1 (generators + treeEdges + defaults), Task 2 (random), Task 3 (render + CSS + wiring + source-hide), Task 4 (E2E incl. stale Prim rewrite) — covers every spec section.
- **Placeholder scan:** none — all steps carry real code/commands.
- **Type consistency:** `gen(parsed, source)` signature is updated at all 5 meta entries and the single call site together (Task 3 Steps 1). `kruskalFrames(edges, n)` / `primFrames(adj, source)` match the exports (Task 1 Step 5) and the meta wrappers (Task 3 Step 1). `treeEdges` is produced in Task 1 and consumed in Task 3 Step 3. `DEFAULTS` keys added in Task 1 are used by render + E2E.
- **MST facts:** pentagon default MST weight = 10, edges = 4 (n−1) for both algorithms; E2E asserts `.graph-edge.tree` count 4 at the final frame.
