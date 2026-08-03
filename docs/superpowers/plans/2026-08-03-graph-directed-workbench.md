# Graph Directed Workbench (Topo + Bellman-Ford) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `graph-topo` and `graph-bellman-ford` to the graph workbench, adding a directed-edge mode (arrows + anti-parallel offset), Kahn's topological sort, and Bellman-Ford with negative-cycle detection.

**Architecture:** Add a `directed` param to `parseEdges`, two pure frame generators (`topoFrames`, `bellmanFordFrames`), and directed rendering in the shared `renderGraphVcr`. The other 4 graph methods and the 5 already-converted ones are untouched.

**Tech Stack:** Vanilla JS dual-export module, `K().buildFrameControls` VCR, SVG arrow markers, Playwright + `node --test`.

## Global Constraints

- Do NOT modify `js/cloud-config.js` (must keep `__PLACEHOLDER__`; if modified, `git checkout js/cloud-config.js`).
- Do NOT revert `tests/random_push.spec.js`.
- Commit messages end with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Branch `feat/graph-directed-workbench` (already created off main @ 95a0c4c). Never switch to main.
- No new method/category → counts unchanged.
- All new UI text + every frame `message` bilingual `{zh, en}`; module stays pure (no DOM/`window`).
- Module style: `var` + `snap()` helper; edges are `{u, v, w}`. For DIRECTED, edges/activeEdge keep direction (no `u<v` normalization).
- **Directed weighted graphs allow NEGATIVE weights** (Bellman-Ford); the `w >= 1` check applies only to UNDIRECTED weighted graphs.

---

### Task 1: `parseEdges(directed)` + topoFrames + bellmanFordFrames + DEFAULTS

**Files:**
- Modify: `js/viz/viz_graph_workbench.js`
- Test: `tests/unit/graph_workbench.test.js` (append)

**Interfaces:**
- Produces: `parseEdges(text, weighted, directed)` (directed default false → unchanged behavior); `topoFrames(adj, n)` and `bellmanFordFrames(adj, n, source)` → `Array<Frame>` (Frame `dist` carries in-degree for topo / distances for bellman); `DEFAULTS['graph-topo']`, `DEFAULTS['graph-bellman-ford']`.

- [ ] **Step 1: Write failing unit tests** — append to `tests/unit/graph_workbench.test.js`:

```js
test('parseEdges directed: single-direction adj, ordered dedupe, anti-parallel kept', () => {
  const p = GW.parseEdges('0 1\n1 0\n1 2', false, true);
  assert.ok(p.ok); assert.strictEqual(p.n, 3);
  // both directions present as distinct edges
  assert.ok(p.edges.some((e) => e.u === 0 && e.v === 1));
  assert.ok(p.edges.some((e) => e.u === 1 && e.v === 0));
  // adj is directed: 0 -> [1] only
  assert.deepStrictEqual(p.adj[0].map((x) => x.to), [1]);
  assert.deepStrictEqual(p.adj[1].map((x) => x.to).sort(), [0, 2]);
});

test('parseEdges directed weighted allows negative weights', () => {
  const p = GW.parseEdges('0 1 -4\n1 2 -3', true, true);
  assert.ok(p.ok);
  assert.strictEqual(p.adj[0][0].w, -4);
});

test('parseEdges undirected weighted still rejects w<1', () => {
  const p = GW.parseEdges('0 1 -4', true, false);
  assert.strictEqual(p.ok, false);
});

test('topoFrames produces a valid topological order on a DAG', () => {
  const p = GW.parseEdges(GW.DEFAULTS['graph-topo'], false, true);
  const frames = GW.topoFrames(p.adj, p.n);
  const last = frames[frames.length - 1];
  assert.strictEqual(last.order.length, p.n); // all ordered → no cycle
  const posOf = {}; last.order.forEach((node, idx) => { posOf[node] = idx; });
  for (const e of p.edges) assert.ok(posOf[e.u] < posOf[e.v], 'edge ' + e.u + '->' + e.v + ' respects order');
  for (const f of frames) { assert.ok(Array.isArray(f.dist)); assert.ok(f.message.zh.length && f.message.en.length); }
});

test('topoFrames detects a cycle', () => {
  const p = GW.parseEdges('0 1\n1 2\n2 0', false, true);
  const frames = GW.topoFrames(p.adj, p.n);
  const last = frames[frames.length - 1];
  assert.ok(last.order.length < p.n);
  assert.ok(/環|cycle/i.test(last.message.zh + last.message.en));
});

test('bellmanFordFrames computes CLRS distances and detects negative cycle', () => {
  const p = GW.parseEdges(GW.DEFAULTS['graph-bellman-ford'], true, true);
  const frames = GW.bellmanFordFrames(p.adj, p.n, 0);
  const last = frames[frames.length - 1];
  assert.deepStrictEqual(last.dist, [0, 2, 7, 4, -2]);
  for (const f of frames) { assert.ok(Array.isArray(f.dist)); assert.ok(f.message.zh.length && f.message.en.length); }
  // negative cycle: 0->1 (1), 1->0 (-3)
  const nc = GW.bellmanFordFrames(GW.parseEdges('0 1 1\n1 0 -3', true, true).adj, 2, 0);
  assert.ok(/負|negative/i.test(nc[nc.length - 1].message.zh + nc[nc.length - 1].message.en));
});
```

- [ ] **Step 2: Run, verify fail**

Run: `node --test tests/unit/graph_workbench.test.js`
Expected: FAIL (`parseEdges` ignores 3rd arg; `GW.topoFrames`/`bellmanFordFrames` undefined; DEFAULTS keys missing).

- [ ] **Step 3: Add `directed` to `parseEdges`** — modify the function in `js/viz/viz_graph_workbench.js`. Change the signature and the weight check + the dedupe/build loop (keep everything else):

Signature: `function parseEdges(text, weighted, directed) {`

Weight check (line ~24) — apply `w >= 1` only when NOT directed:
```js
      if (weighted && !directed && w < 1) return { ok: false, error: { zh: '權重需 ≥ 1', en: 'Weight must be ≥ 1' } };
```

Dedupe/build loop (replace the current `for (i = 0; i < raw.length; i++) {...}` body):
```js
    for (i = 0; i < raw.length; i++) {
      var e = raw[i]; if (e.u === e.v) continue;
      var key = directed ? (e.u + '-' + e.v) : (Math.min(e.u, e.v) + '-' + Math.max(e.u, e.v));
      if (seen[key]) continue; seen[key] = true;
      if (directed) {
        edges.push({ u: e.u, v: e.v, w: e.w });
        adj[e.u].push({ to: e.v, w: e.w });
      } else {
        var a = Math.min(e.u, e.v), b = Math.max(e.u, e.v);
        edges.push({ u: a, v: b, w: e.w });
        adj[e.u].push({ to: e.v, w: e.w });
        adj[e.v].push({ to: e.u, w: e.w });
      }
    }
```

- [ ] **Step 4: Add DEFAULTS entries** — extend the `DEFAULTS` object (keep the existing 5):
```js
    'graph-topo': '0 1\n0 2\n1 3\n2 3\n3 4\n3 5',
    'graph-bellman-ford': '0 1 6\n0 2 7\n1 2 8\n1 3 5\n1 4 -4\n2 3 -3\n2 4 9\n3 1 -2\n4 0 2\n4 3 7'
```

- [ ] **Step 5: Implement the two generators** — add before the `api` line:

```js
  function topoFrames(adj, n) {
    var frames = [], order = [], indeg = [], queue = [], i, j;
    for (i = 0; i < n; i++) indeg.push(0);
    for (i = 0; i < n; i++) for (j = 0; j < adj[i].length; j++) indeg[adj[i][j].to]++;
    function snap(active, activeEdge, msg) {
      frames.push({ visited: order.slice(), frontier: queue.slice(), active: active, activeEdge: activeEdge, dist: indeg.slice(), order: order.slice(), message: msg });
    }
    for (i = 0; i < n; i++) if (indeg[i] === 0) queue.push(i);
    snap(null, null, { zh: '計算入度,入度 0 的節點先入佇列:[' + queue.join(', ') + ']', en: 'Compute in-degrees; enqueue in-degree-0 nodes: [' + queue.join(', ') + ']' });
    while (queue.length) {
      var u = queue.shift(); order.push(u);
      snap(u, null, { zh: '移除入度 0 的節點 ' + u + ',加入拓撲序', en: 'Remove in-degree-0 node ' + u + '; append to the order' });
      for (j = 0; j < adj[u].length; j++) {
        var to = adj[u][j].to; indeg[to]--; var enq = indeg[to] === 0;
        snap(u, { u: u, v: to }, enq
          ? { zh: '邊 ' + u + '→' + to + ':入度降為 0 → 入佇列', en: 'Edge ' + u + '→' + to + ': in-degree 0 → enqueue' }
          : { zh: '邊 ' + u + '→' + to + ':入度降為 ' + indeg[to], en: 'Edge ' + u + '→' + to + ': in-degree now ' + indeg[to] });
        if (enq) queue.push(to);
      }
    }
    if (order.length === n) {
      snap(null, null, { zh: '拓撲排序完成:' + order.join(' → '), en: 'Topological sort done: ' + order.join(' → ') });
    } else {
      var rem = []; for (i = 0; i < n; i++) if (order.indexOf(i) === -1) rem.push(i);
      snap(null, null, { zh: '偵測到環:節點 [' + rem.join(', ') + '] 無法排序', en: 'Cycle detected: nodes [' + rem.join(', ') + '] cannot be ordered' });
    }
    return frames;
  }

  function bellmanFordFrames(adj, n, source) {
    var frames = [], dist = [], E = [], i, j;
    for (i = 0; i < n; i++) dist.push(Infinity);
    dist[source] = 0;
    for (i = 0; i < n; i++) for (j = 0; j < adj[i].length; j++) E.push({ u: i, v: adj[i][j].to, w: adj[i][j].w });
    function fmt(x) { return x === Infinity ? '∞' : x; }
    function snap(active, activeEdge, msg) {
      frames.push({ visited: [], frontier: [], active: active, activeEdge: activeEdge, dist: dist.slice(), order: [], message: msg });
    }
    snap(null, null, { zh: '起點 ' + source + ' 距離 0,其餘 ∞;最多 ' + (n - 1) + ' 輪鬆弛', en: 'Source ' + source + ' = 0, others ∞; up to ' + (n - 1) + ' relaxation passes' });
    for (var pass = 1; pass <= n - 1; pass++) {
      var changed = false;
      for (i = 0; i < E.length; i++) {
        var e = E[i], ae = { u: e.u, v: e.v };
        if (dist[e.u] !== Infinity && dist[e.u] + e.w < dist[e.v]) {
          dist[e.v] = dist[e.u] + e.w; changed = true;
          snap(e.v, ae, { zh: '第 ' + pass + ' 輪:鬆弛 ' + e.u + '→' + e.v + ',d[' + e.v + ']=' + dist[e.v], en: 'Pass ' + pass + ': relax ' + e.u + '→' + e.v + ', d[' + e.v + ']=' + dist[e.v] });
        } else {
          snap(null, ae, { zh: '第 ' + pass + ' 輪:' + e.u + '→' + e.v + ' 不更新(' + fmt(dist[e.u]) + '+' + e.w + ' ≥ ' + fmt(dist[e.v]) + ')', en: 'Pass ' + pass + ': ' + e.u + '→' + e.v + ' no update' });
        }
      }
      if (!changed) break;
    }
    var neg = false;
    for (i = 0; i < E.length; i++) { var e2 = E[i]; if (dist[e2.u] !== Infinity && dist[e2.u] + e2.w < dist[e2.v]) { neg = true; break; } }
    if (neg) snap(null, null, { zh: '偵測到負權環:距離無下界', en: 'Negative-weight cycle detected: distances unbounded' });
    else snap(null, null, { zh: 'Bellman-Ford 完成', en: 'Bellman-Ford done' });
    return frames;
  }
```

- [ ] **Step 6: Export** — extend the `api` line to include `topoFrames: topoFrames, bellmanFordFrames: bellmanFordFrames`.

- [ ] **Step 7: Run tests + checks**

Run: `node --test tests/unit/graph_workbench.test.js` → all pass.
Run: `node --test tests/unit/*.test.js` → no regressions (report count).
Run: `node --check js/viz/viz_graph_workbench.js` → clean.
Also verify empirically via `node -e`: print `bellmanFordFrames(parseEdges(DEFAULTS['graph-bellman-ford'],true,true).adj,5,0)` last dist === `[0,2,7,4,-2]` before trusting the test.

- [ ] **Step 8: Commit**

```bash
git add js/viz/viz_graph_workbench.js tests/unit/graph_workbench.test.js
git commit -m "feat: directed parseEdges + topo (Kahn) + bellman-ford frame generators

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Random DAG generator for topo + bellman-ford

**Files:**
- Modify: `js/random_input.js`
- Test: `tests/unit/graph_workbench.test.js` (append)

**Interfaces:**
- Produces: `randomInputFor('graph-topo'|'graph-bellman-ford', diff, rng)` → `{ text }`, a directed acyclic graph (topo unweighted, bellman weighted with possible negatives), weakly connected, n≤12.

- [ ] **Step 1: Write failing test** — append to `tests/unit/graph_workbench.test.js`:

```js
test('random topo/bellman inputs are DAGs (parse ok, acyclic, n<=12)', () => {
  for (const id of ['graph-topo', 'graph-bellman-ford']) {
    const weighted = id === 'graph-bellman-ford';
    for (const d of ['edge', 'normal', 'large', 'special']) {
      let seed = 5;
      const rng = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
      const p = GW.parseEdges(RI.randomInputFor(id, d, rng).text, weighted, true);
      assert.ok(p.ok, id + '/' + d + ' parses');
      assert.ok(p.n >= 3 && p.n <= 12, id + '/' + d + ' n range');
      // topoFrames orders all nodes → acyclic
      const frames = GW.topoFrames(p.adj, p.n);
      assert.strictEqual(frames[frames.length - 1].order.length, p.n, id + '/' + d + ' is a DAG');
    }
  }
});
```

- [ ] **Step 2: Run, verify fail** — `node --test tests/unit/graph_workbench.test.js` → FAIL (`randomInputFor` returns null → `.text` throws).

- [ ] **Step 3: Add `graphDagText` + dispatch** — in `js/random_input.js`, add the helper near `graphEdgeList` (reuse the existing `randInt(rng, lo, hi)`):

```js
  function graphDagText(rng, difficulty, weighted) {
    var n;
    if (difficulty === 'edge') n = randInt(rng, 3, 4);
    else if (difficulty === 'large') n = randInt(rng, 9, 12);
    else if (difficulty === 'special') n = 6;
    else n = randInt(rng, 5, 7);
    var lines = [], seen = {};
    function add(u, v) {
      var k = u + '-' + v; if (seen[k] || u === v) return; seen[k] = true;
      lines.push(weighted ? (u + ' ' + v + ' ' + randInt(rng, -5, 9)) : (u + ' ' + v));
    }
    for (var j = 1; j < n; j++) add(randInt(rng, 0, j - 1), j); // spanning chain (i<j) → weakly connected DAG
    var extra = difficulty === 'large' ? n : Math.floor(n / 2);
    for (var e = 0; e < extra; e++) { var a = randInt(rng, 0, n - 2), b = randInt(rng, a + 1, n - 1); add(a, b); } // forward edges (a<b) keep it acyclic
    return lines.join('\n');
  }
```

In `randomInputFor`'s switch:
```js
      case 'graph-topo': return { text: graphDagText(rng, difficulty, false) };
      case 'graph-bellman-ford': return { text: graphDagText(rng, difficulty, true) };
```

- [ ] **Step 4: Run, verify pass** — `node --test tests/unit/graph_workbench.test.js` → all pass; `node --check js/random_input.js` → clean.

- [ ] **Step 5: Commit**

```bash
git add js/random_input.js tests/unit/graph_workbench.test.js
git commit -m "feat: random DAG generator for topo + bellman-ford

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Directed rendering in `renderGraphVcr` + registry + CSS

**Files:**
- Modify: `js/domains/graph.js`, `style.css`

**Interfaces:**
- Consumes: `GraphWorkbench.parseEdges(text, weighted, directed)`, `topoFrames`, `bellmanFordFrames`, DEFAULTS.
- Produces: `graph-topo`/`graph-bellman-ford` rendered by `renderGraphVcr` with directed arrows; per-node number shown when `f.dist != null`.

- [ ] **Step 1: Add the two `GW_META` entries** (READ the current `GW_META` first; keep the 5 existing):

```js
    'graph-topo':         { weighted: false, directed: true, usesSource: false, gen: (p, s) => GraphWorkbench.topoFrames(p.adj, p.n) },
    'graph-bellman-ford': { weighted: true,  directed: true, usesSource: true,  gen: (p, s) => GraphWorkbench.bellmanFordFrames(p.adj, p.n, s) },
```

- [ ] **Step 2: Pass `directed` to both `parseEdges` calls** — in `renderGraphVcr`, change `GraphWorkbench.parseEdges(st.text, meta.weighted)` (in `rebuild`, ~L979) AND `GraphWorkbench.parseEdges(text, meta.weighted)` (in `applyText`, ~L1019) to add `, meta.directed`. (Existing 5 meta entries have no `directed` → `undefined` → falsy → unchanged.)

- [ ] **Step 3: Directed edge rendering + dist-label condition in `draw(f)`** — replace the `draw(f)` function body (READ current version at ~L992 first) with:

```js
      function draw(f) {
        const has = (arr, x) => arr.indexOf(x) !== -1;
        const treeKeys = new Set((f.treeEdges || []).map((e) => e.u + '-' + e.v));
        const R = 20;
        const dirSet = meta.directed ? new Set(parsed.edges.map((e) => e.u + '-' + e.v)) : null;
        let s = '';
        if (meta.directed) {
          s += '<defs>' +
            '<marker id="gw-arrow" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#94a3b8"/></marker>' +
            '<marker id="gw-arrow-active" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#60a5fa"/></marker>' +
            '</defs>';
        }
        for (const e of parsed.edges) {
          const active = f.activeEdge && f.activeEdge.u === e.u && f.activeEdge.v === e.v;
          const ecls = 'graph-edge' + (active ? ' active' : (treeKeys.has(e.u + '-' + e.v) ? ' tree' : ''));
          const A = pos[e.u], B = pos[e.v];
          let x1 = A.x, y1 = A.y, x2 = B.x, y2 = B.y, mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
          if (meta.directed) {
            const dx = B.x - A.x, dy = B.y - A.y, len = Math.hypot(dx, dy) || 1, ux = dx / len, uy = dy / len;
            const px = -uy, py = ux;                         // perpendicular unit
            const off = dirSet.has(e.v + '-' + e.u) ? 9 : 0; // anti-parallel → offset both sides apart
            x1 = A.x + ux * R + px * off; y1 = A.y + uy * R + py * off;
            x2 = B.x - ux * R + px * off; y2 = B.y - uy * R + py * off;
            mx = (x1 + x2) / 2; my = (y1 + y2) / 2;
            const marker = active ? 'gw-arrow-active' : 'gw-arrow';
            s += '<line class="' + ecls + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" marker-end="url(#' + marker + ')"></line>';
          } else {
            s += '<line class="' + ecls + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"></line>';
          }
          if (meta.weighted) s += '<text class="graph-weight" x="' + mx + '" y="' + my + '">' + e.w + '</text>';
        }
        for (let k = 0; k < parsed.n; k++) {
          let cls = 'graph-node';
          if (f.active === k) cls += ' active'; else if (has(f.visited, k)) cls += ' visited'; else if (has(f.frontier, k)) cls += ' frontier';
          s += '<circle class="' + cls + '" cx="' + pos[k].x + '" cy="' + pos[k].y + '" r="18"></circle>';
          s += '<text class="graph-node-label" x="' + pos[k].x + '" y="' + pos[k].y + '">' + k + '</text>';
          if (f.dist != null) { const d = f.dist[k]; s += '<text class="graph-distance" x="' + pos[k].x + '" y="' + (pos[k].y - 26) + '">' + (d === Infinity ? '∞' : d) + '</text>'; }
        }
        svg.innerHTML = s;
        descEl.textContent = langOf(f.message);
      }
```

Note the only changes vs the current `draw`: the `<defs>` markers, the directed branch (endpoint pull-back + anti-parallel offset + `marker-end`), and the dist-label condition `meta.weighted && f.dist` → `f.dist != null`. Undirected methods (bfs/dfs/dijkstra/kruskal/prim) take the `else` branch and behave exactly as before (their `dist` is null except dijkstra, which still shows distances).

- [ ] **Step 4: Re-point the 2 registry lines** (leave the other graph attaches unchanged):

```js
  R().attach('graph-topo',         { render: () => renderGraphVcr('graph-topo'),         code: () => codeGraphTopo,        layout: { host: 'dynamic' } });
  R().attach('graph-bellman-ford', { render: () => renderGraphVcr('graph-bellman-ford'), code: () => codeGraphBellmanFord, layout: { host: 'dynamic' } });
```

- [ ] **Step 5: CSS (optional touch)** — the arrow markers are inline-styled (fill). No new rule strictly required. If desired, add a comment near `.gw-svg` in `style.css` noting directed markers; otherwise skip. Do NOT change existing `.graph-*` rules.

- [ ] **Step 6: Verify**

Run: `node --check js/domains/graph.js` → clean.
Run: `git status --porcelain js/cloud-config.js` → empty.
Run: `npm run test:all`. EXPECT the existing Bellman-Ford test (`tests/visualizer.spec.js` ~L697 "renders a directed graph + distance array and steps") to FAIL now (old `.wgraph-*`/`.bellman-dcell` UI) — EXPECTED, fixed in Task 4. Confirm the Topo test (~L228) still PASSES and NO OTHER test fails (esp. the 5 already-converted methods + bfs/dfs/dijkstra still render). Report the exact failing test list.

- [ ] **Step 7: Commit**

```bash
git add js/domains/graph.js style.css
git commit -m "feat: renderGraphVcr directed mode (arrows, anti-parallel, topo/bellman wiring)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: E2E — rewrite Bellman-Ford test + add topo/bellman workbench tests

**Files:**
- Modify: `tests/visualizer.spec.js` (rewrite the ~L697 Bellman-Ford test)
- Modify: `tests/graph_workbench.spec.js` (add topo + bellman coverage)

**Interfaces:**
- Consumes: rendered `graph-topo`/`graph-bellman-ford` workbench (`[data-testid="gw-input"]`, `.stepctl`, `.gw-svg .graph-node`, `.gw-svg line[marker-end]`, `.stepctl-count`, `.stepctl [data-action="step"]`, `[data-testid="gw-source"]`).

- [ ] **Step 1: Rewrite the stale Bellman-Ford test** — in `tests/visualizer.spec.js` (~L697), replace the body (keep the filename check) with the new-UI version:

```js
    test('Graphs: Bellman-Ford renders the directed workbench + VCR transport', async ({ page }) => {
        await loadMethod(page, 'graph-bellman-ford');
        const card = page.locator('[data-method-section="graph-bellman-ford"]');
        await expect(card.locator('.code-panel-filename')).toContainText('graph_bellman_ford.cpp');
        await expect(card.locator('[data-testid="gw-input"]')).toBeVisible();
        await expect(card.locator('.gw-svg .graph-node')).toHaveCount(5);
        await expect(card.locator('.gw-svg line[marker-end]').first()).toBeAttached(); // directed arrows
        const cnt = card.locator('.stepctl-count');
        const before = await cnt.textContent();
        await card.locator('.stepctl [data-action="step"]').click();
        await expect(cnt).not.toHaveText(before);
    });
```

- [ ] **Step 2: Add topo + bellman workbench E2E** — append to `tests/graph_workbench.spec.js` (READ the file first for structure/imports):

```js
  test('graph-topo: directed workbench renders 6 nodes with arrows, no source', async ({ page }) => {
    await loadMethod(page, 'graph-topo');
    const sec = page.locator('[data-method-section="graph-topo"]');
    await expect(sec.locator('[data-testid="gw-input"]')).toBeVisible();
    await expect(sec.locator('.stepctl')).toBeVisible();
    await expect(sec.locator('.gw-svg .graph-node')).toHaveCount(6);
    await expect(sec.locator('.gw-svg line[marker-end]').first()).toBeAttached();
    await expect(sec.locator('[data-testid="gw-source"]')).toHaveCount(0); // topo has no source
    const cnt = sec.locator('.stepctl-count');
    const before = await cnt.textContent();
    await sec.locator('.stepctl [data-action="step"]').click();
    await expect(cnt).not.toHaveText(before);
  });

  test('graph-bellman-ford: directed workbench has a source and directed arrows', async ({ page }) => {
    await loadMethod(page, 'graph-bellman-ford');
    const sec = page.locator('[data-method-section="graph-bellman-ford"]');
    await expect(sec.locator('.gw-svg .graph-node')).toHaveCount(5);
    await expect(sec.locator('.gw-svg line[marker-end]').first()).toBeAttached();
    await expect(sec.locator('[data-testid="gw-source"]')).toHaveCount(1);
    // scrub to the last frame → distances shown (graph-distance labels present)
    await sec.locator('.stepctl-scrubber').evaluate((el) => { el.value = el.max; el.dispatchEvent(new Event('input', { bubbles: true })); });
    await expect(sec.locator('.gw-svg .graph-distance').first()).toBeVisible();
  });
```

- [ ] **Step 3: Run the two specs, iterate to green**

Run: `npx playwright test tests/graph_workbench.spec.js tests/visualizer.spec.js`
- If a selector/behavior assumption is wrong, inspect the real DOM/behavior and correct the TEST to match correct behavior — do NOT weaken assertions to hide a bug. (E.g. verify `line[marker-end]` is the right selector for the arrow lines; verify topo default renders 6 nodes and bellman 5.)

- [ ] **Step 4: Full suite green** — `npm run test:all` → 0 failures (report pass count). Confirm count/i18n/nav tests unchanged and `git status --porcelain js/cloud-config.js` empty.

- [ ] **Step 5: Commit**

```bash
git add tests/graph_workbench.spec.js tests/visualizer.spec.js
git commit -m "test: E2E for topo + bellman-ford directed workbench; update stale bellman UI test

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

- **Spec coverage:** Task 1 (directed parseEdges + topoFrames + bellmanFordFrames + defaults), Task 2 (random DAG), Task 3 (directed rendering + wiring + dist-label condition), Task 4 (E2E incl. stale Bellman rewrite) — all spec sections covered.
- **Placeholder scan:** none — every step has real code/commands.
- **Type consistency:** `parseEdges(text, weighted, directed)` updated at both call sites (Task 3 Step 2) and used with the 3rd arg in all new tests. `topoFrames(adj,n)` / `bellmanFordFrames(adj,n,source)` match exports (Task 1 Step 6) and meta wrappers (Task 3 Step 1). `f.dist` carries in-degree (topo) / distance (bellman) and is consumed by the `f.dist != null` label branch (Task 3 Step 3). Directed `edges` keep direction; `activeEdge` compared by exact `(u,v)` (works for directed; undirected edges/activeEdge are both u<v so the same comparison holds).
- **Correctness facts:** CLRS Bellman-Ford from source 0 → `dist = [0,2,7,4,-2]`; the topo default is a DAG (order length = n=6); negative-weight and cycle inputs are detected. Verify empirically in Task 1 Step 7.
- **Negative weights:** the `w >= 1` check is gated to `!directed`, so directed Bellman-Ford accepts negatives while undirected weighted (dijkstra/kruskal/prim) still rejects them.
