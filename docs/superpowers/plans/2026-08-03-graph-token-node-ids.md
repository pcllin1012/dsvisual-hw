# Graph Token/Character Node IDs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Node IDs become arbitrary alphanumeric tokens (the node set = distinct tokens typed, no `0..max` phantom fill); defaults/random use letters; display shows tokens, algorithms keep integer indices.

**Architecture:** `parseEdges` maps distinct tokens → indices in first-appearance order and returns `labels[]`; frame generators take an optional `labels` and use `L(i)` in messages only (frame data stays index-based); renders display `parsed.labels[k]`.

**Tech Stack:** Vanilla JS dual-export module, Playwright + `node --test`.

## Global Constraints

- Do NOT modify `js/cloud-config.js` / `tests/random_push.spec.js` / `cpp/*` / `js/code_db.js` / graph-scc et al.
- Commit messages end with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Branch `feat/graph-token-node-ids` (off main @ d4f26aa). Never switch to main.
- Frame DATA (visited/order/active/activeEdge/dist) stays INDEX-based; only message STRINGS and rendered labels use tokens. Counts unchanged.

---

### Task 1: `parseEdges` token model + `labels` + letter DEFAULTS

**Files:** Modify `js/viz/viz_graph_workbench.js`; Test `tests/unit/graph_workbench.test.js`.

- [ ] **Step 1: Update/replace parser tests** — in `tests/unit/graph_workbench.test.js`, add these and FIX the `n>12` test (which relied on `0-13` → node 13; that's now 2 tokens):
```js
test('parseEdges: node set = distinct tokens, no phantom fill', () => {
  const p = GW.parseEdges('1-2,2-3', false, false);   // no "0" typed
  assert.ok(p.ok); assert.strictEqual(p.n, 3);
  assert.deepStrictEqual(p.labels, ['1', '2', '3']);   // no phantom '0'
});
test('parseEdges: letter tokens', () => {
  const p = GW.parseEdges('A-B:4,B-C:1', true, false);
  assert.ok(p.ok); assert.deepStrictEqual(p.labels, ['A', 'B', 'C']);
  assert.strictEqual(p.adj[0][0].w, 4);
});
test('parseEdges: n>12 rejected (13 distinct tokens)', () => {
  const many = Array.from({ length: 13 }, (_, i) => 'n' + i + '-x').join(','); // 13 n-tokens + shared x = 14 > 12
  assert.strictEqual(GW.parseEdges(many, false, false).ok, false);
});
```
Also UPDATE the existing `n>12` test that used `'0-13'`/`'0-1' + big` to instead use 13+ distinct tokens (find it — it currently asserts `parseEdges('0-13', ...).ok === false` on the maxIndex premise; replace with a distinct-token input). Any existing test asserting `p.labels` absence is fine (labels is additive). Existing numeric tests (`'0-1,1-2'`, `'0 1\n1 2'`, negatives, DAG randoms) must still pass (digits are valid tokens → same indices).

- [ ] **Step 2: Run, verify the new/changed tests fail** — `node --test tests/unit/graph_workbench.test.js`.

- [ ] **Step 3: Rewrite `parseEdges`** — replace the whole function (js/viz/viz_graph_workbench.js lines ~5-61) with the token version:
```js
  function parseEdges(text, weighted, directed, allowNegative) {
    var toks = String(text == null ? '' : text).split(/[,\n]/)
      .map(function (s) { return s.trim(); }).filter(function (s) { return s.length; });
    if (!toks.length) {
      return { ok: false, error: { zh: '請輸入至少一條邊(例:A-B,B-C' + (weighted ? ',權重 A-B:4' : '') + ')', en: 'Enter at least one edge (e.g. A-B,B-C' + (weighted ? '; weighted A-B:4' : '') + ')' } };
    }
    var fmtErr = { ok: false, error: { zh: '格式錯誤。用 u-v(加權 u-v:w),節點 ID 可為字母或數字,以逗號或換行分隔', en: 'Bad format. Use u-v (weighted u-v:w); node IDs are letters or digits; comma or newline separated' } };
    var wErr = { ok: false, error: { zh: '權重需為整數', en: 'Weight must be an integer' } };
    var isTok = function (s) { return /^[A-Za-z0-9]+$/.test(s); };
    var raw = [], i;
    for (i = 0; i < toks.length; i++) {
      var t = toks[i], u, v, w, ci = t.indexOf(':');
      if (ci >= 0) {
        var pair = t.slice(0, ci).split(/[-\s]+/).filter(function (s) { return s.length; });
        var ws = t.slice(ci + 1).trim();
        if (pair.length !== 2 || !isTok(pair[0]) || !isTok(pair[1])) return fmtErr;
        u = pair[0]; v = pair[1]; w = Number(ws);
        if (ws === '' || !Number.isInteger(w)) return wErr;
      } else if (/^[A-Za-z0-9]+-[A-Za-z0-9]+$/.test(t)) {
        var p = t.split('-'); u = p[0]; v = p[1]; w = weighted ? null : 1;
      } else {
        var ps = t.split(/\s+/);
        if (ps.length === 2) { u = ps[0]; v = ps[1]; w = weighted ? null : 1; }
        else if (ps.length === 3) { u = ps[0]; v = ps[1]; w = Number(ps[2]); if (!Number.isInteger(w)) return wErr; }
        else return fmtErr;
        if (!isTok(u) || !isTok(v)) return fmtErr;
      }
      if (weighted && (w === null || w === undefined)) return { ok: false, error: { zh: '加權圖每條邊需權重:u-v:w', en: 'Weighted graph needs a weight per edge: u-v:w' } };
      if (weighted && !allowNegative && w < 1) return { ok: false, error: { zh: '權重需 ≥ 1', en: 'Weight must be ≥ 1' } };
      raw.push({ u: u, v: v, w: w });
    }
    var idx = {}, labels = [];
    function id(tok) { if (!(tok in idx)) { idx[tok] = labels.length; labels.push(tok); } return idx[tok]; }
    for (i = 0; i < raw.length; i++) { id(raw[i].u); id(raw[i].v); }  // label ALL tokens (self-loop endpoints too)
    var n = labels.length;
    if (n > CAP) return { ok: false, error: { zh: '節點太多了(上限 ' + CAP + ')', en: 'Too many nodes (max ' + CAP + ')' } };
    var seen = {}, edges = [], adj = [];
    for (i = 0; i < n; i++) adj.push([]);
    for (i = 0; i < raw.length; i++) {
      var e = raw[i]; if (e.u === e.v) continue;
      var iu = idx[e.u], iv = idx[e.v];
      var key = directed ? (iu + '-' + iv) : (Math.min(iu, iv) + '-' + Math.max(iu, iv));
      if (seen[key]) continue; seen[key] = true;
      if (directed) { edges.push({ u: iu, v: iv, w: e.w }); adj[iu].push({ to: iv, w: e.w }); }
      else {
        var a = Math.min(iu, iv), b = Math.max(iu, iv);
        edges.push({ u: a, v: b, w: e.w });
        adj[iu].push({ to: iv, w: e.w }); adj[iv].push({ to: iu, w: e.w });
      }
    }
    for (i = 0; i < n; i++) adj[i].sort(function (x, y) { return x.to - y.to; });
    return { ok: true, n: n, adj: adj, edges: edges, labels: labels };
  }
```

- [ ] **Step 4: DEFAULTS → letters** — replace the graph DEFAULTS values (equivalent graphs, letters):
```js
    'graph-bfs': 'A-B,B-C,C-D,D-E,E-A,A-C',
    'graph-dfs': 'A-B,B-C,C-D,D-E,E-A,A-C',
    'graph-dijkstra': 'A-B:4,B-C:1,C-D:6,D-E:2,E-A:3,A-C:5',
    'graph-kruskal': 'A-B:4,B-C:1,C-D:6,D-E:2,E-A:3,A-C:5',
    'graph-prim': 'A-B:4,B-C:1,C-D:6,D-E:2,E-A:3,A-C:5',
    'graph-topo': 'A-B,A-C,B-D,C-D,D-E,D-F',
    'graph-bellman-ford': 'A-B:6,A-C:7,B-C:8,B-D:5,B-E:-4,C-D:-3,C-E:9,D-B:-2,E-A:2,E-D:7',
    'graph': 'A-B,B-C,C-D,D-E,E-A,A-C',
    'graph-adjlist': 'A-B,B-C,C-D,D-E,E-A,A-C',
    'graph-traversal': 'A-B,B-C,C-D,D-E,E-A,A-C',
    'graph-multilist': 'A-B,B-C,C-D,D-E,E-A,A-C'
```

- [ ] **Step 5: Run** — `node --test tests/unit/graph_workbench.test.js` all pass; `node --test tests/unit/*.test.js` (report count, no regressions); `node --check js/viz/viz_graph_workbench.js`. Empirically confirm `parseEdges(DEFAULTS['graph-bellman-ford'], true, true, true)` has `labels ['A','B','C','D','E']` and the adj is identical to the old numeric default (so downstream algorithms are unchanged).

- [ ] **Step 6: Commit**
```bash
git add js/viz/viz_graph_workbench.js tests/unit/graph_workbench.test.js
git commit -m "feat: parseEdges token/character node IDs + labels (no phantom fill); letter defaults

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Frame generators label-aware

**Files:** Modify `js/viz/viz_graph_workbench.js`; Test `tests/unit/graph_workbench.test.js`.

- [ ] **Step 1: Add `labels` param + `L` to each generator** — READ each generator. For all 7 (`bfsFrames(adj, source, labels)`, `dfsFrames(adj, source, labels)`, `dijkstraFrames(adj, source, labels)`, `kruskalFrames(edges, n, labels)`, `primFrames(adj, source, labels)`, `topoFrames(adj, n, labels)`, `bellmanFordFrames(adj, n, source, labels)`) add the param at the END and add at the top: `function L(i) { return labels ? labels[i] : i; }`. Then in EVERY message string, wrap node-index references with `L(...)`:
  - `'從節點 ' + source` → `'從節點 ' + L(source)`; `'Start from node ' + source` → `... + L(source)`.
  - `order.join(' → ')` → `order.map(L).join(' → ')`.
  - `ae.u + '–' + ae.v` → `L(ae.u) + '–' + L(ae.v)`; `u + '→' + to` → `L(u) + '→' + L(to)`; `'節點 ' + bv` → `'節點 ' + L(bv)`; `'節點 ' + u` → `'節點 ' + L(u)`; `'d[' + to + ']'` → `'d[' + L(to) + ']'`; the `[remaining]`/`rem.join`/`queue.join` lists → `.map(L).join`. Apply to Kahn's in-degree messages, Dijkstra relax messages, Bellman pass messages, MST add/skip messages, etc.
  - Do NOT change frame DATA fields (`visited`, `order`, `active`, `activeEdge`, `frontier`, `dist`, `treeEdges`) — those stay INDEX-based.
  - Verify by grepping: after the change, no message template literal should embed a bare `+ source`/`+ u`/`+ to`/`+ bv`/`.join(' → ')` without `L`. (`node -e` print a sample frame message to confirm it shows the token.)

- [ ] **Step 2: Update generator unit tests for labels** — any test that calls a generator WITHOUT labels still works (L→index). Add one assertion that WITH labels the message uses the token, e.g.:
```js
test('generators use token labels in messages when provided', () => {
  const fr = GW.bfsFrames([[{to:1,w:1}],[{to:0,w:1}]], 0, ['X', 'Y']);
  assert.ok(/X/.test(fr[0].message.zh + fr[0].message.en));
});
```
Keep the existing index-based assertions (dist arrays, order, cycle regex) unchanged — they must still pass.

- [ ] **Step 3: Run** — `node --test tests/unit/graph_workbench.test.js` all pass; `node --test tests/unit/*.test.js` no regressions (report count); `node --check js/viz/viz_graph_workbench.js`. Confirm `bellmanFordFrames(parseEdges(DEFAULTS['graph-bellman-ford'],true,true,true).adj, 5, 0, labels)` final `dist` still `[0,2,7,4,-2]`.

- [ ] **Step 4: Commit**
```bash
git add js/viz/viz_graph_workbench.js tests/unit/graph_workbench.test.js
git commit -m "feat: frame generators render token labels in messages (frame data stays index-based)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Renders display token labels

**Files:** Modify `js/domains/graph.js`.

- [ ] **Step 1: GW_META wrappers pass labels** — update all 7 `gen` wrappers to pass `p.labels`:
```js
    'graph-bfs':      { ..., gen: (p, s) => GraphWorkbench.bfsFrames(p.adj, s, p.labels) },
    'graph-dfs':      { ..., gen: (p, s) => GraphWorkbench.dfsFrames(p.adj, s, p.labels) },
    'graph-dijkstra': { ..., gen: (p, s) => GraphWorkbench.dijkstraFrames(p.adj, s, p.labels) },
    'graph-kruskal':  { ..., gen: (p, s) => GraphWorkbench.kruskalFrames(p.edges, p.n, p.labels) },
    'graph-prim':     { ..., gen: (p, s) => GraphWorkbench.primFrames(p.adj, s, p.labels) },
    'graph-topo':         { ..., gen: (p, s) => GraphWorkbench.topoFrames(p.adj, p.n, p.labels) },
    'graph-bellman-ford': { ..., gen: (p, s) => GraphWorkbench.bellmanFordFrames(p.adj, p.n, s, p.labels) },
```

- [ ] **Step 2: `drawUndirectedGraph` node label** — change the node-label text emission `... + k + ...` to `... + parsed.labels[k] + ...` (the function already receives `parsed`).

- [ ] **Step 3: `renderGraphVcr` draw + source selector** — in `renderGraphVcr`'s nested `draw(f)`, the node-label `<text ...>' + k + '</text>` → `parsed.labels[k]`. In `rebuildSource(n)`, set each option's `textContent = parsed.labels[k]` (value stays `k`). `rebuildSource` needs `parsed` in scope — it's called inside `rebuild()` where `parsed` exists; change its signature/call to `rebuildSource(parsed)` and iterate `parsed.n`/`parsed.labels`.

- [ ] **Step 4: `renderGraphStruct` matrix/list/multilist labels** — in `rebuild()`:
  - matrix headers: the `<th>' + j + '</th>` and row `<th>' + i + '</th>` → `parsed.labels[j]` / `parsed.labels[i]` (cells stay `m[i][j]`).
  - list: `'[' + i + ']'` → `'[' + parsed.labels[i] + ']'`; neighbor `nb.to` → `parsed.labels[nb.to]`.
  - multilist: legend `'[' + nd.u + '|' + nd.v + '|·|·]'` → `parsed.labels[nd.u]`/`parsed.labels[nd.v]`; row `'[' + i + ']'` → label; `'E' + c.id + '(' + c.other + ')'` → `... + parsed.labels[c.other] + ...`.

- [ ] **Step 5: `renderGraphTraversal` labels + info + source** — node labels via `parsed.labels[k]` (through `drawUndirectedGraph`, done in Step 2). The info lines `fb.frontier.join(', ')` / `fb.order.join(', ')` → `fb.frontier.map((x) => parsed.labels[x]).join(', ')` (and dfs). `rebuildSource` option text = `parsed.labels[k]` (same as Step 3). `parsed` is in `rebuild()` scope.

- [ ] **Step 6: Verify** — `node --check js/domains/graph.js`; `git status --porcelain js/cloud-config.js` empty; `npm run test:all`. Existing E2E that assert `.graph-node` COUNTS still pass (letter defaults give same n=5/6). Any E2E asserting a specific numeric node LABEL text would break — but the specs mostly assert counts/attachment; report any failure (Task 4 updates specs). Report the pass count.

- [ ] **Step 7: Commit**
```bash
git add js/domains/graph.js
git commit -m "feat: graph renders display token labels (nodes, source selector, matrix/list/multilist)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: Random generators (letters) + E2E

**Files:** Modify `js/random_input.js`, `tests/graph_workbench.spec.js`, `tests/graph_multilist.spec.js`.

- [ ] **Step 1: Random generators → letters** — in `js/random_input.js`, add `var lbl = function (i) { return String.fromCharCode(65 + i); };` and change `graphEdgeList`'s push (`a + '-' + b` / `a + '-' + b + ':' + w`) to `lbl(a) + '-' + lbl(b)` / `lbl(a) + '-' + lbl(b) + ':' + w`, and `graphDagText` similarly (`u`/`v` → `lbl(u)`/`lbl(v)`). Node count ≤ 12 → A..L. Connectivity/DAG logic unchanged.

- [ ] **Step 2: Verify random still parses/connected** — the existing random unit tests parse `randomInputFor(...).text` and BFS-check connectivity from index 0; with letters, `parseEdges` maps them to indices and connectivity holds (spanning tree). Run `node --test tests/unit/graph_workbench.test.js` — still green. `node --check js/random_input.js`.

- [ ] **Step 3: E2E — phantom fix + labels** — add to `tests/graph_workbench.spec.js`:
```js
  test('node set follows typed tokens — no phantom node', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const sec = page.locator('[data-method-section="graph-bfs"]');
    await sec.locator('[data-testid="gw-input"]').fill('B-C,C-D');   // no "A"/"0"
    await sec.locator('[data-testid="gw-build"]').click();
    await expect(sec.locator('.gw-svg .graph-node')).toHaveCount(3); // exactly B,C,D — no phantom
  });
```
Verify the default-load node-label text is a letter (not `0`): add to an existing graph-bfs render test `await expect(sec.locator('.gw-svg .graph-node-label').first()).toHaveText('A');` (confirm the class/selector for node-label text by reading the render; adjust if the label is a `<text>` without a distinct class — then assert the SVG text content another way, or drop if not cleanly selectable — do NOT weaken the count/phantom assertions).

- [ ] **Step 4: Full suite green** — `npx playwright test tests/graph_workbench.spec.js tests/graph_multilist.spec.js` then `npm run test:all`. Existing specs that fill NUMERIC inputs (e.g. `'0-1,1-2,2-0'`, `'0 1 2\n1 2 3'`) still pass (digits are tokens → nodes '0','1','2'). If any spec asserted a numeric default label that changed to a letter, update it to the letter (not by weakening). Report the pass count. Confirm `git status --porcelain js/cloud-config.js` empty and count/i18n tests unchanged.

- [ ] **Step 5: Commit**
```bash
git add js/random_input.js tests/graph_workbench.spec.js tests/graph_multilist.spec.js
git commit -m "feat: letter node IDs in random generators; E2E for token IDs + no-phantom

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

- **Spec coverage:** Task 1 (parseEdges tokens + labels + letter defaults), Task 2 (generators label messages), Task 3 (renders display labels), Task 4 (random letters + E2E) — covers every spec section.
- **Placeholder scan:** none.
- **Type consistency:** `parseEdges` now returns `labels` (additive); every generator gains an optional trailing `labels` (backward-compatible with label-less unit calls); GW_META wrappers pass `p.labels`; renders read `parsed.labels`. Frame data stays index-based end-to-end (render colors/matches by index; only text uses labels).
- **Correctness invariant:** letter defaults appear in ascending order (A,B,C…) → index order matches the old numeric order → index-based results (dist/order/MST/topo) unchanged; only display strings differ. Empirically re-verify CLRS `[0,2,7,4,-2]` (Task 1 Step 5, Task 2 Step 3).
- **Phantom fix:** `n = labels.length` (distinct tokens), not `maxIndex+1` — `1-2,2-3`→3 nodes, `B-C,C-D`→3 nodes, no phantom. Locked by unit (Task 1) + E2E (Task 4).
