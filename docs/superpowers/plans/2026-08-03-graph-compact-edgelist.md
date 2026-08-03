# Graph Workbench Compact Edge-List Format Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the workbench edge-list accept the compact `u-v,u-v,…` (weighted `u-v:w`) format like graph-scc, while still accepting the old `u v` newline form; update all 10 defaults, placeholders, and the 🎲 generators to the compact form.

**Architecture:** Rewrite only the tokenizer inside `GraphWorkbench.parseEdges` (the dedupe/adj/edges build is unchanged). Update `DEFAULTS` + the two random generators + 3 placeholders. `parseEdges` is used only by the workbench renders; `graph-scc`/`components`/etc. have their own parser and are untouched.

**Tech Stack:** Vanilla JS dual-export module, Playwright + `node --test`.

## Global Constraints

- Do NOT modify `js/cloud-config.js` (keep `__PLACEHOLDER__`; if modified, `git checkout js/cloud-config.js`). Do NOT revert `tests/random_push.spec.js`.
- Do NOT touch `js/viz/viz_graph_scc.js` / `viz_graph_components.js` / `viz_graph_bipartite.js` / `viz_graph_closure.js` / `viz_graph_matrix.js` (separate `parseInput`).
- Commit messages end with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Branch `feat/graph-compact-edgelist` (already created off main @ dee2938). Never switch to main.
- No new method/category → counts unchanged. Error messages bilingual `{zh,en}`; module stays pure.
- Weighted encoding is `u-v:w` (colon). Node separator `-` (or whitespace). Negative weights allowed only for directed weighted (Bellman-Ford), same as today.

---

### Task 1: Lenient `parseEdges` tokenizer + compact DEFAULTS

**Files:**
- Modify: `js/viz/viz_graph_workbench.js`
- Test: `tests/unit/graph_workbench.test.js` (append)

**Interfaces:**
- Produces: `parseEdges(text, weighted, directed)` (same signature/return) now accepting compact `u-v` / `u-v:w` AND legacy `u v` / `u v w`; DEFAULTS (10 keys) in compact form.

- [ ] **Step 1: Write failing unit tests** — append to `tests/unit/graph_workbench.test.js`:

```js
test('parseEdges accepts compact comma form (unweighted, directed)', () => {
  const p = GW.parseEdges('0-1,1-2,2-0', false, true);
  assert.ok(p.ok); assert.strictEqual(p.n, 3);
  assert.ok(p.edges.some((e) => e.u === 2 && e.v === 0));
  assert.deepStrictEqual(p.adj[0].map((x) => x.to), [1]);
});

test('parseEdges accepts compact weighted form u-v:w incl. negatives', () => {
  const p = GW.parseEdges('0-1:4,1-2:1', true, false);
  assert.ok(p.ok); assert.strictEqual(p.adj[0][0].w, 4);
  const d = GW.parseEdges('0-1:-4,1-2:-3', true, true); // directed allows negatives
  assert.ok(d.ok); assert.strictEqual(d.adj[0][0].w, -4);
});

test('parseEdges is backward compatible with legacy whitespace form', () => {
  const oldU = GW.parseEdges('0 1\n1 2', false, false);
  const newU = GW.parseEdges('0-1,1-2', false, false);
  assert.deepStrictEqual(oldU.edges, newU.edges);
  // legacy negative weight (directed) keeps its sign (not eaten by the dash split)
  const bf = GW.parseEdges('0 1 6\n1 4 -4', true, true);
  assert.ok(bf.ok);
  assert.ok(bf.edges.some((e) => e.u === 1 && e.v === 4 && e.w === -4));
});

test('parseEdges handles mixed comma+newline separators', () => {
  const p = GW.parseEdges('0-1,1-2\n2-3', false, false);
  assert.ok(p.ok); assert.strictEqual(p.n, 4); assert.strictEqual(p.edges.length, 3);
});

test('parseEdges errors: weighted method missing weight; undirected w<1; too many nodes', () => {
  assert.strictEqual(GW.parseEdges('0-1', true, false).ok, false);       // weight required
  assert.strictEqual(GW.parseEdges('0-1:-4', true, false).ok, false);    // undirected weighted rejects w<1
  assert.strictEqual(GW.parseEdges('0-13', false, false).ok, false);     // n=14 > 12  (0-13 = edge 0->13)
  for (const bad of ['0-1', 'x-1', '']) { /* smoke: no throw */ GW.parseEdges(bad, false, false); }
});

test('all 10 DEFAULTS parse ok in their weighted/directed mode with expected n', () => {
  const spec = {
    'graph-bfs': [false, false, 5], 'graph-dfs': [false, false, 5], 'graph-dijkstra': [true, false, 5],
    'graph-kruskal': [true, false, 5], 'graph-prim': [true, false, 5],
    'graph-topo': [false, true, 6], 'graph-bellman-ford': [true, true, 5],
    'graph': [false, false, 5], 'graph-adjlist': [false, false, 5], 'graph-traversal': [false, false, 5],
  };
  for (const id of Object.keys(spec)) {
    const [w, d, n] = spec[id];
    const p = GW.parseEdges(GW.DEFAULTS[id], w, d);
    assert.ok(p.ok, id + ' parses'); assert.strictEqual(p.n, n, id + ' n');
  }
});
```

- [ ] **Step 2: Run, verify fail** — `node --test tests/unit/graph_workbench.test.js` → FAIL (compact forms rejected by the strict `split(/\s+/); length===need` parser; DEFAULTS still old form so the n-check may pass but compact-form tests fail).

- [ ] **Step 3: Rewrite the tokenizer** — in `js/viz/viz_graph_workbench.js`, replace the body of `parseEdges` FROM the `var lines = ...split('\n')...` line THROUGH the end of the `for (i = 0; i < lines.length; i++) {...}` raw-building loop (current lines ~6–27) with the following. **Leave everything from `var n = maxIdx + 1;` onward (the `n > CAP` check + dedupe/adj/edges build + sort + return) EXACTLY as-is.**

```js
  function parseEdges(text, weighted, directed) {
    var toks = String(text == null ? '' : text).split(/[,\n]/)
      .map(function (s) { return s.trim(); }).filter(function (s) { return s.length; });
    if (!toks.length) {
      return { ok: false, error: { zh: '請輸入至少一條邊(例:0-1,1-2' + (weighted ? ',權重 0-1:4' : '') + ')', en: 'Enter at least one edge (e.g. 0-1,1-2' + (weighted ? '; weighted 0-1:4' : '') + ')' } };
    }
    var fmtErr = { ok: false, error: { zh: '格式錯誤。用 u-v(加權 u-v:w),以逗號或換行分隔', en: 'Bad format. Use u-v (weighted u-v:w), separated by commas or newlines' } };
    var intErr = { ok: false, error: { zh: '節點索引與權重需為整數', en: 'Indices and weight must be integers' } };
    var raw = [], maxIdx = -1, i;
    for (i = 0; i < toks.length; i++) {
      var t = toks[i], u, v, w, ci = t.indexOf(':');
      if (ci >= 0) {
        // compact weighted "u-v:w" (or "u v:w") — pair has no minus sign, safe to split on -/space
        var pair = t.slice(0, ci).split(/[-\s]+/).filter(function (s) { return s.length; }).map(Number);
        var ws = t.slice(ci + 1).trim();
        if (pair.length !== 2) return fmtErr;
        u = pair[0]; v = pair[1]; w = Number(ws);
        if (ws === '' || !Number.isInteger(u) || !Number.isInteger(v) || !Number.isInteger(w)) return intErr;
      } else if (/^\d+\s*-\s*\d+$/.test(t)) {
        // compact unweighted "u-v"
        var p = t.split('-').map(function (s) { return Number(s.trim()); });
        u = p[0]; v = p[1]; w = weighted ? null : 1;
      } else {
        // legacy whitespace form "u v" or "u v w" (w may be negative)
        var ps = t.split(/\s+/).map(Number);
        if (ps.length === 2) { u = ps[0]; v = ps[1]; w = weighted ? null : 1; }
        else if (ps.length === 3) { u = ps[0]; v = ps[1]; w = ps[2]; }
        else return fmtErr;
        if (!Number.isInteger(u) || !Number.isInteger(v) || (ps.length === 3 && !Number.isInteger(w))) return intErr;
      }
      if (u < 0 || v < 0) return { ok: false, error: { zh: '節點索引需 ≥ 0', en: 'Node indices must be ≥ 0' } };
      if (weighted && (w === null || w === undefined)) return { ok: false, error: { zh: '加權圖每條邊需權重:u-v:w', en: 'Weighted graph needs a weight per edge: u-v:w' } };
      if (weighted && !directed && w < 1) return { ok: false, error: { zh: '權重需 ≥ 1', en: 'Weight must be ≥ 1' } };
      maxIdx = Math.max(maxIdx, u, v);
      raw.push({ u: u, v: v, w: w });
    }
    var n = maxIdx + 1;
    if (n > CAP) return { ok: false, error: { zh: '節點太多了(上限 ' + CAP + ')', en: 'Too many nodes (max ' + CAP + ')' } };
    // ...KEEP the existing seen/edges/adj build + sort + return unchanged below...
```
(Do NOT duplicate or alter the code below `if (n > CAP) ...`; only replace up to and including the CAP line, matching what's already there so the dedupe/build stays identical.)

- [ ] **Step 4: Replace DEFAULTS with compact form** — update the `DEFAULTS` object (all 10 keys; numeric values identical to before, only formatting changes):
```js
  var DEFAULTS = {
    'graph-bfs': '0-1,1-2,2-3,3-4,4-0,0-2',
    'graph-dfs': '0-1,1-2,2-3,3-4,4-0,0-2',
    'graph-dijkstra': '0-1:4,1-2:1,2-3:6,3-4:2,4-0:3,0-2:5',
    'graph-kruskal': '0-1:4,1-2:1,2-3:6,3-4:2,4-0:3,0-2:5',
    'graph-prim': '0-1:4,1-2:1,2-3:6,3-4:2,4-0:3,0-2:5',
    'graph-topo': '0-1,0-2,1-3,2-3,3-4,3-5',
    'graph-bellman-ford': '0-1:6,0-2:7,1-2:8,1-3:5,1-4:-4,2-3:-3,2-4:9,3-1:-2,4-0:2,4-3:7',
    'graph': '0-1,1-2,2-3,3-4,4-0,0-2',
    'graph-adjlist': '0-1,1-2,2-3,3-4,4-0,0-2',
    'graph-traversal': '0-1,1-2,2-3,3-4,4-0,0-2'
  };
```

- [ ] **Step 5: Run tests + checks**

Run: `node --test tests/unit/graph_workbench.test.js` → all pass.
Run: `node --test tests/unit/*.test.js` → no regressions (report count). Verify empirically via `node -e` that the compact and legacy pentagon parse to identical `edges`, and that `bellmanFordFrames` on the new default still ends at `[0,2,7,4,-2]`.
Run: `node --check js/viz/viz_graph_workbench.js`.

- [ ] **Step 6: Commit**
```bash
git add js/viz/viz_graph_workbench.js tests/unit/graph_workbench.test.js
git commit -m "feat: workbench parseEdges accepts compact u-v[,u-v] form + weighted u-v:w; compact defaults

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Compact random generators + placeholders + E2E

**Files:**
- Modify: `js/random_input.js`, `js/domains/graph.js`
- Test: `tests/graph_workbench.spec.js`, `tests/unit/graph_workbench.test.js` (the existing random tests should still pass — verify)

**Interfaces:**
- Consumes: the lenient `parseEdges` from Task 1.
- Produces: `graphEdgeList`/`graphDagText` emit compact form; 3 placeholders reflect the new format.

- [ ] **Step 1: Update `graphEdgeList`** — in `js/random_input.js`, change its `add()` push line and the final join:
```js
      lines.push(weighted ? (a + '-' + b + ':' + randInt(rng, 1, 9)) : (a + '-' + b));
```
and
```js
    return lines.join(',');
```

- [ ] **Step 2: Update `graphDagText`** — likewise:
```js
      lines.push(weighted ? (u + '-' + v + ':' + randInt(rng, -5, 9)) : (u + '-' + v));
```
and
```js
    return lines.join(',');
```

- [ ] **Step 3: Update placeholders** — in `js/domains/graph.js`, the `.gw-input` placeholder appears in `renderGraphVcr`, `renderGraphStruct`, and `renderGraphTraversal`. READ each. Replace the placeholder `langOf({...})` with a compact-form hint. `renderGraphVcr` is weighted-aware (uses `meta.weighted`), so:
```js
        langOf({ zh: '邊以逗號或換行分隔:' + (meta.weighted ? 'u-v:w(例 0-1:4)' : 'u-v(例 0-1,1-2)'), en: 'Edges by comma or newline: ' + (meta.weighted ? 'u-v:w (e.g. 0-1:4)' : 'u-v (e.g. 0-1,1-2)') })
```
`renderGraphStruct` and `renderGraphTraversal` are always unweighted:
```js
        langOf({ zh: '邊以逗號或換行分隔:u-v(例 0-1,1-2)', en: 'Edges by comma or newline: u-v (e.g. 0-1,1-2)' })
```

- [ ] **Step 4: Verify the existing random unit tests still pass** — `node --test tests/unit/graph_workbench.test.js` (the connectivity/DAG tests parse `RI.randomInputFor(...).text` with `parseEdges(..., true|false)` — now the generator emits compact form, which the lenient parser accepts; they must stay green). `node --check js/random_input.js js/domains/graph.js`.

- [ ] **Step 5: Add an E2E for compact input** — append to `tests/graph_workbench.spec.js`:
```js
  test('workbench accepts compact comma edge-list input', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const sec = page.locator('[data-method-section="graph-bfs"]');
    await sec.locator('[data-testid="gw-input"]').fill('0-1,1-2,2-0');
    await sec.locator('[data-testid="gw-build"]').click();
    await expect(sec.locator('.gw-svg .graph-node')).toHaveCount(3);
    await expect(sec.locator('[data-testid="gw-err"]')).toBeHidden();
  });
```

- [ ] **Step 6: Full suite green**

Run: `npx playwright test tests/graph_workbench.spec.js` → green.
Run: `npm run test:all` → 0 failures (report pass count). The existing E2E that fill legacy `'0 1 2\n1 2 3'` (e.g. the dijkstra example round-trip) must still pass via back-compat — verify; if any assert the placeholder text, update to the new copy. Confirm count/i18n/nav tests unchanged and `git status --porcelain js/cloud-config.js` empty.

- [ ] **Step 7: Commit**
```bash
git add js/random_input.js js/domains/graph.js tests/graph_workbench.spec.js
git commit -m "feat: compact edge-list for random generators + placeholders; E2E for compact input

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

- **Spec coverage:** Task 1 (lenient parser + compact defaults + unit tests incl. back-compat & negatives), Task 2 (compact generators + placeholders + E2E) — covers every spec section.
- **Placeholder scan:** none — real code/commands throughout.
- **Type consistency:** `parseEdges` signature/return unchanged (only tokenizer body swapped); the `w === null` sentinel for "weight missing" is set in both the compact-unweighted and legacy-2 branches and checked before the `w<1` rule. DEFAULTS keys match the 10 workbench methods; `graphEdgeList`/`graphDagText` output is consumed by the same `parseEdges`.
- **Ambiguity guard:** `-` is treated as a node separator only via the `:`-weighted branch (pair has no sign) and the `^\d+-\d+$` compact branch; legacy negatives (`0 1 -4`) go through the whitespace branch and keep their sign. Unit test `parseEdges('0 1 6\n1 4 -4', true, true)` locks this.
- **Scope:** only `parseEdges`/DEFAULTS/generators/placeholders change; dedupe/adj/edges build and every consumer (renderGraphVcr/Struct/Traversal) are unchanged; graph-scc et al. untouched. Numeric equivalence of defaults keeps all algorithm/count tests green.
