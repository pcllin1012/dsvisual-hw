# Graph Workbench Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the 3 pilot graph methods (`graph-bfs`, `graph-dfs`, `graph-dijkstra`) from fixed-data auto-play to an edge-list text input (🎲 random + difficulty + saved examples) with full VCR step/rewind playback, via a reusable graph-workbench framework.

**Architecture:** A pure, dual-export module `js/viz/viz_graph_workbench.js` (edge-list parser + circular layout + three step-frame generators) drives a new `renderGraphVcr(methodId)` in `js/domains/graph.js` that builds the sparse-matrix-style toolbar + an SVG stage + a VCR transport scrubbing the frame array. Difficulty-aware random inputs come from `js/random_input.js`; examples reuse `examples_store.js`/`buildExamplesSelect`. The other 8 graph methods are untouched.

**Tech Stack:** Vanilla ES5-ish JS (dual browser/`node --test` export IIFE), Playwright E2E, `node --test` unit, existing VizKit/VizRegistry/VizCore + `langOf`/`acquireDynamicVizHost`/`getInputDifficulty`/`buildExamplesSelect`.

## Global Constraints

- Undirected graphs; each edge line adds both directions.
- Node count `n` = max index + 1; **cap n ≤ 12** (parser rejects above with a bilingual error).
- All user-visible UI text and every step `message` are bilingual `{ zh, en }`, resolved via `langOf`.
- Do **not** modify `js/cloud-config.js` (must keep `__PLACEHOLDER__` tokens; if it shows modified, `git checkout js/cloud-config.js`).
- Do **not** change the other 8 graph methods (`graph`, `graph-adjlist`, `graph-traversal`, `graph-kruskal`, `graph-topo`, `graph-prim`, `graph-bellman-ford`, `graph-floyd-warshall`) or their renders/runners. Leave `tests/random_push.spec.js` alone.
- No new method/category → overview/nav/i18n counts unchanged.
- Module is pure: no DOM, no `window` access in the parser/layout/generators.
- Commit messages end with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.

---

### Task 1: Pure module — parser, layout, defaults

**Files:**
- Create: `js/viz/viz_graph_workbench.js`
- Test: `tests/unit/graph_workbench.test.js`

**Interfaces:**
- Produces: `window.GraphWorkbench` / `module.exports` = `{ parseEdges, layout, DEFAULTS, bfsFrames, dfsFrames, dijkstraFrames }` (frames added in Task 2; export the object now with parseEdges/layout/DEFAULTS).
- `parseEdges(text, weighted)` → `{ ok:true, n, adj, edges }` or `{ ok:false, error:{zh,en} }`. `adj` = `Array<Array<{to,w}>>` (undirected, deduped, self-loops skipped, each list sorted by `to` asc). `edges` = `Array<{u,v,w}>` with `u<v`.
- `layout(n, cx, cy, r)` → `Array<{x,y}>`, node 0 at top, clockwise.
- `DEFAULTS` = `{ 'graph-bfs':string, 'graph-dfs':string, 'graph-dijkstra':string }`.

- [ ] **Step 1: Write failing tests** — `tests/unit/graph_workbench.test.js`:

```js
const assert = require('node:assert');
const { test } = require('node:test');
const GW = require('../../js/viz/viz_graph_workbench.js');

test('parseEdges: valid unweighted → n, undirected deduped adj', () => {
  const r = GW.parseEdges('0 1\n1 2\n0 2', false);
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.n, 3);
  assert.deepStrictEqual(r.adj[0].map(e => e.to), [1, 2]); // sorted asc, both directions
  assert.deepStrictEqual(r.adj[1].map(e => e.to), [0, 2]);
  assert.strictEqual(r.edges.length, 3);
  assert.ok(r.edges.every(e => e.u < e.v && e.w === 1));
});

test('parseEdges: weighted keeps w; dedupe undirected', () => {
  const r = GW.parseEdges('0 1 4\n1 0 9', true); // second is the same undirected pair → deduped
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.edges.length, 1);
  assert.strictEqual(r.edges[0].w, 4);
});

test('parseEdges: errors are bilingual', () => {
  for (const [txt, w] of [['', false], ['0 -1', false], ['0 1 0', true], ['0 1.5', false], ['0', false]]) {
    const r = GW.parseEdges(txt, w);
    assert.strictEqual(r.ok, false, JSON.stringify([txt, w]));
    assert.ok(r.error && r.error.zh && r.error.en);
  }
});

test('parseEdges: n cap 12', () => {
  const r = GW.parseEdges('0 12', false); // n would be 13
  assert.strictEqual(r.ok, false);
  assert.ok(/12/.test(r.error.en));
});

test('layout: n points on a circle, node 0 at top, deterministic', () => {
  const p = GW.layout(4, 300, 200, 150);
  assert.strictEqual(p.length, 4);
  for (const q of p) {
    const d = Math.hypot(q.x - 300, q.y - 200);
    assert.ok(Math.abs(d - 150) < 1e-6);
  }
  assert.ok(Math.abs(p[0].x - 300) < 1e-6 && p[0].y < 200); // top
  assert.deepStrictEqual(p, GW.layout(4, 300, 200, 150));
});

test('DEFAULTS parse cleanly for each pilot method', () => {
  assert.ok(GW.parseEdges(GW.DEFAULTS['graph-bfs'], false).ok);
  assert.ok(GW.parseEdges(GW.DEFAULTS['graph-dfs'], false).ok);
  assert.ok(GW.parseEdges(GW.DEFAULTS['graph-dijkstra'], true).ok);
});
```

- [ ] **Step 2: Run to verify failure**

Run: `node --test tests/unit/graph_workbench.test.js`
Expected: FAIL — cannot find module `viz_graph_workbench.js`.

- [ ] **Step 3: Implement the module** — `js/viz/viz_graph_workbench.js`:

```js
(function (global) {
  'use strict';
  var CAP = 12;

  function parseEdges(text, weighted) {
    var lines = String(text == null ? '' : text).split('\n')
      .map(function (s) { return s.trim(); }).filter(function (s) { return s.length; });
    if (!lines.length) {
      return { ok: false, error: { zh: '請輸入至少一條邊(每行「u v」或「u v w」)', en: 'Enter at least one edge (one "u v" or "u v w" per line)' } };
    }
    var need = weighted ? 3 : 2;
    var raw = [], maxIdx = -1, i;
    for (i = 0; i < lines.length; i++) {
      var parts = lines[i].split(/\s+/);
      if (parts.length !== need) {
        return { ok: false, error: { zh: '每行需 ' + need + ' 個整數:「' + (weighted ? 'u v w' : 'u v') + '」', en: 'Each line needs ' + need + ' integers: "' + (weighted ? 'u v w' : 'u v') + '"' } };
      }
      var nums = parts.map(Number);
      if (nums.some(function (x) { return !Number.isInteger(x); })) {
        return { ok: false, error: { zh: '節點索引與權重需為整數', en: 'Indices and weight must be integers' } };
      }
      var u = nums[0], v = nums[1], w = weighted ? nums[2] : 1;
      if (u < 0 || v < 0) return { ok: false, error: { zh: '節點索引需 ≥ 0', en: 'Node indices must be ≥ 0' } };
      if (weighted && w < 1) return { ok: false, error: { zh: '權重需 ≥ 1', en: 'Weight must be ≥ 1' } };
      maxIdx = Math.max(maxIdx, u, v);
      raw.push({ u: u, v: v, w: w });
    }
    var n = maxIdx + 1;
    if (n > CAP) return { ok: false, error: { zh: '節點太多了(上限 ' + CAP + ')', en: 'Too many nodes (max ' + CAP + ')' } };
    var seen = {}, edges = [], adj = [];
    for (i = 0; i < n; i++) adj.push([]);
    for (i = 0; i < raw.length; i++) {
      var e = raw[i]; if (e.u === e.v) continue;
      var a = Math.min(e.u, e.v), b = Math.max(e.u, e.v), key = a + '-' + b;
      if (seen[key]) continue; seen[key] = true;
      edges.push({ u: a, v: b, w: e.w });
      adj[e.u].push({ to: e.v, w: e.w });
      adj[e.v].push({ to: e.u, w: e.w });
    }
    for (i = 0; i < n; i++) adj[i].sort(function (x, y) { return x.to - y.to; });
    return { ok: true, n: n, adj: adj, edges: edges };
  }

  function layout(n, cx, cy, r) {
    cx = cx == null ? 300 : cx; cy = cy == null ? 200 : cy; r = r == null ? 150 : r;
    var pos = [];
    for (var i = 0; i < n; i++) {
      var ang = -Math.PI / 2 + i * 2 * Math.PI / n;
      pos.push({ x: cx + r * Math.cos(ang), y: cy + r * Math.sin(ang) });
    }
    return pos;
  }

  var DEFAULTS = {
    'graph-bfs': '0 1\n0 2\n1 3\n2 3\n3 4',
    'graph-dfs': '0 1\n0 2\n1 3\n2 3\n3 4',
    'graph-dijkstra': '0 1 4\n0 2 1\n2 1 2\n1 3 1\n2 3 5\n3 4 3'
  };

  var api = { parseEdges: parseEdges, layout: layout, DEFAULTS: DEFAULTS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.GraphWorkbench = api;
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4: Run to verify pass**

Run: `node --test tests/unit/graph_workbench.test.js`
Expected: PASS (all Task 1 tests).

- [ ] **Step 5: Commit**

```bash
git add js/viz/viz_graph_workbench.js tests/unit/graph_workbench.test.js
git commit -m "feat: graph-workbench module — edge-list parser + circular layout + defaults

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Step-frame generators (BFS / DFS / Dijkstra)

**Files:**
- Modify: `js/viz/viz_graph_workbench.js`
- Test: `tests/unit/graph_workbench.test.js`

**Interfaces:**
- Consumes: `parseEdges` (Task 1) for building `adj` in tests.
- Produces: `bfsFrames(adj, source)`, `dfsFrames(adj, source)`, `dijkstraFrames(adj, source)` → `Array<Frame>` where
  `Frame = { visited:number[], frontier:number[], active:number|null, activeEdge:{u,v}|null, dist:(number|Infinity)[]|null, order:number[], message:{zh,en} }`.
  Frame 0 = init (source in frontier); last frame = done (all reachable visited, frontier empty). Pure & deterministic.

- [ ] **Step 1: Write failing tests** — append to `tests/unit/graph_workbench.test.js`:

```js
function adjOf(txt, w) { return GW.parseEdges(txt, w).adj; }

test('bfsFrames: correct visit order + frame invariants', () => {
  const fr = GW.bfsFrames(adjOf('0 1\n0 2\n1 3\n2 3\n3 4', false), 0);
  const last = fr[fr.length - 1];
  assert.deepStrictEqual(last.order, [0, 1, 2, 3, 4]); // BFS from 0, neighbors asc
  assert.strictEqual(last.frontier.length, 0);
  assert.ok(fr[0].frontier.includes(0));
  assert.ok(fr.every(f => f.message && f.message.zh && f.message.en));
  assert.ok(fr.every(f => f.dist === null));
});

test('dfsFrames: correct visit order', () => {
  const fr = GW.dfsFrames(adjOf('0 1\n0 2\n1 3\n2 3\n3 4', false), 0);
  const last = fr[fr.length - 1];
  assert.deepStrictEqual(last.order, [0, 1, 3, 2, 4]); // DFS from 0, neighbors asc: 0→1→3→(2 via 3)→4... verify below
  assert.ok(fr.every(f => f.message && f.message.zh && f.message.en));
});

test('dijkstraFrames: textbook shortest distances', () => {
  const fr = GW.dijkstraFrames(adjOf('0 1 4\n0 2 1\n2 1 2\n1 3 1\n2 3 5\n3 4 3', true), 0);
  const last = fr[fr.length - 1];
  // 0→2 (1), 2→1 (1+2=3), 1→3 (3+1=4), 3→4 (4+3=7)
  assert.deepStrictEqual(last.dist, [0, 3, 1, 4, 7]);
  assert.ok(fr.every(f => Array.isArray(f.dist)));
  assert.ok(fr.every(f => f.message && f.message.zh && f.message.en));
});
```

> NOTE for implementer: before finalizing the DFS expected `order`, run the generator once and confirm the deterministic order for the default graph with neighbors sorted ascending; set the assertion to the actual correct DFS order (recursive, lowest-index-first). The example above (`[0,1,3,2,4]`) is the expected trace: 0→1→3→2 (3's unvisited neighbor)→4 (3's other neighbor is 4). Verify and correct if needed.

- [ ] **Step 2: Run to verify failure**

Run: `node --test tests/unit/graph_workbench.test.js`
Expected: FAIL — `GW.bfsFrames is not a function`.

- [ ] **Step 3: Implement generators** — insert into `js/viz/viz_graph_workbench.js` before the `api` object, then add them to `api`:

```js
  function bfsFrames(adj, source) {
    var n = adj.length, frames = [], visited = [], order = [], queue = [source], i;
    for (i = 0; i < n; i++) visited.push(false);
    visited[source] = true;
    function snap(active, activeEdge, msg) {
      frames.push({ visited: order.slice(), frontier: queue.slice(), active: active, activeEdge: activeEdge, dist: null, order: order.slice(), message: msg });
    }
    snap(null, null, { zh: '從節點 ' + source + ' 開始,放入佇列', en: 'Start from node ' + source + '; enqueue it' });
    while (queue.length) {
      var u = queue.shift(); order.push(u);
      snap(u, null, { zh: '從佇列取出 ' + u + ',標記已訪', en: 'Dequeue ' + u + '; mark visited' });
      for (i = 0; i < adj[u].length; i++) {
        var to = adj[u][i].to;
        if (!visited[to]) {
          visited[to] = true; queue.push(to);
          snap(u, { u: Math.min(u, to), v: Math.max(u, to) }, { zh: '鄰居 ' + to + ' 未訪 → 入佇列', en: 'Neighbor ' + to + ' unvisited → enqueue' });
        }
      }
    }
    snap(null, null, { zh: 'BFS 完成,順序:' + order.join(' → '), en: 'BFS done. Order: ' + order.join(' → ') });
    return frames;
  }

  function dfsFrames(adj, source) {
    var n = adj.length, frames = [], visited = [], order = [], stack = [], i;
    for (i = 0; i < n; i++) visited.push(false);
    function snap(active, activeEdge, msg) {
      frames.push({ visited: order.slice(), frontier: stack.slice(), active: active, activeEdge: activeEdge, dist: null, order: order.slice(), message: msg });
    }
    snap(null, null, { zh: '從節點 ' + source + ' 開始 DFS', en: 'Start DFS from node ' + source });
    function dfs(u, parent) {
      visited[u] = true; order.push(u); stack.push(u);
      snap(u, parent == null ? null : { u: Math.min(u, parent), v: Math.max(u, parent) }, { zh: '進入 ' + u + ',標記已訪', en: 'Enter ' + u + '; mark visited' });
      for (var j = 0; j < adj[u].length; j++) {
        var to = adj[u][j].to;
        if (!visited[to]) {
          snap(u, { u: Math.min(u, to), v: Math.max(u, to) }, { zh: '沿邊 ' + u + '–' + to + ' 深入', en: 'Descend edge ' + u + '–' + to });
          dfs(to, u);
        }
      }
      stack.pop();
      snap(u, null, { zh: u + ' 的鄰居都訪過,回溯', en: 'All neighbors of ' + u + ' done; backtrack' });
    }
    dfs(source, null);
    snap(null, null, { zh: 'DFS 完成,順序:' + order.join(' → '), en: 'DFS done. Order: ' + order.join(' → ') });
    return frames;
  }

  function dijkstraFrames(adj, source) {
    var n = adj.length, frames = [], dist = [], settled = [], order = [], i;
    for (i = 0; i < n; i++) { dist.push(Infinity); settled.push(false); }
    dist[source] = 0;
    function fmt(x) { return x === Infinity ? '∞' : x; }
    function frontier() { var f = []; for (var k = 0; k < n; k++) if (!settled[k] && dist[k] < Infinity) f.push(k); return f; }
    function snap(active, activeEdge, msg) {
      frames.push({ visited: order.slice(), frontier: frontier(), active: active, activeEdge: activeEdge, dist: dist.slice(), order: order.slice(), message: msg });
    }
    snap(null, null, { zh: '起點 ' + source + ' 距離設 0,其餘 ∞', en: 'Set source ' + source + ' distance to 0, others ∞' });
    for (var iter = 0; iter < n; iter++) {
      var u = -1, best = Infinity;
      for (i = 0; i < n; i++) if (!settled[i] && dist[i] < best) { best = dist[i]; u = i; }
      if (u === -1) break;
      settled[u] = true; order.push(u);
      snap(u, null, { zh: '取最小距離未定案節點 ' + u + '(d=' + fmt(dist[u]) + '),定案', en: 'Settle min-distance unsettled node ' + u + ' (d=' + fmt(dist[u]) + ')' });
      for (i = 0; i < adj[u].length; i++) {
        var to = adj[u][i].to, w = adj[u][i].w, nd = dist[u] + w, ae = { u: Math.min(u, to), v: Math.max(u, to) };
        if (settled[to]) continue;
        if (nd < dist[to]) {
          dist[to] = nd;
          snap(u, ae, { zh: '鬆弛 ' + u + '→' + to + ':d[' + to + '] 更新為 ' + nd, en: 'Relax ' + u + '→' + to + ': d[' + to + '] = ' + nd });
        } else {
          snap(u, ae, { zh: '檢查 ' + u + '→' + to + ':' + nd + ' ≥ d[' + to + ']=' + fmt(dist[to]) + ',不更新', en: 'Check ' + u + '→' + to + ': ' + nd + ' ≥ d[' + to + ']=' + fmt(dist[to]) + ', no update' });
        }
      }
    }
    snap(null, null, { zh: 'Dijkstra 完成', en: 'Dijkstra done' });
    return frames;
  }
```
Add `bfsFrames`, `dfsFrames`, `dijkstraFrames` to the `api` object.

- [ ] **Step 4: Run to verify pass**

Run: `node --test tests/unit/graph_workbench.test.js`
Expected: PASS. (If the DFS `order` assertion fails, print the actual `order` once, confirm it is the correct lowest-index-first recursive DFS, and fix the assertion — not the algorithm.)

- [ ] **Step 5: Commit**

```bash
git add js/viz/viz_graph_workbench.js tests/unit/graph_workbench.test.js
git commit -m "feat: graph-workbench BFS/DFS/Dijkstra step-frame generators

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Difficulty-aware random edge-list generators

**Files:**
- Modify: `js/random_input.js`
- Test: `tests/unit/graph_workbench.test.js` (add a generator-validity test that requires `js/random_input.js`)

**Interfaces:**
- Consumes: existing `randInt(rng, lo, hi)` helper in `random_input.js` (inclusive range — confirm its exact signature by reading the file first), and `randomInputFor(methodId, difficulty, rng)` dispatch.
- Produces: `randomInputFor('graph-bfs'|'graph-dfs', difficulty)` → unweighted edge-list text; `randomInputFor('graph-dijkstra', difficulty)` → weighted edge-list text. Every output parses with `ok:true` and yields a connected graph within n≤12.

- [ ] **Step 1: Write failing test** — append to `tests/unit/graph_workbench.test.js`:

```js
const RI = require('../../js/random_input.js');

test('random graph inputs parse ok, connected, within cap', () => {
  const diffs = ['edge', 'special', 'large', 'medium'];
  for (const id of ['graph-bfs', 'graph-dfs', 'graph-dijkstra']) {
    const weighted = id === 'graph-dijkstra';
    for (const d of diffs) {
      let seed = 1;
      const rng = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
      const txt = RI.randomInputFor(id, d, rng).text; // randomInputFor returns { text } (matches matrix-sparse convention)
      const p = GW.parseEdges(txt, weighted);
      assert.strictEqual(p.ok, true, id + '/' + d + ' → ' + JSON.stringify(txt));
      assert.ok(p.n >= 3 && p.n <= 12, id + '/' + d + ' n=' + p.n);
      // connected: BFS from 0 reaches all n nodes
      const reached = GW.bfsFrames(p.adj, 0)[GW.bfsFrames(p.adj, 0).length - 1].order.length;
      assert.strictEqual(reached, p.n, id + '/' + d + ' not connected');
    }
  }
});
```

> Read `js/random_input.js` first to confirm it is CommonJS-requireable (`module.exports`) and how `randomInputFor` accepts an injected `rng`. If `randomInputFor`'s public signature does not accept an `rng` arg, call the internal generator the test needs, or adapt the test to the real signature — do NOT change the production signature just for the test.

- [ ] **Step 2: Run to verify failure**

Run: `node --test tests/unit/graph_workbench.test.js`
Expected: FAIL — `graph-bfs` falls through `randomInputFor` (returns undefined/empty → parse not ok).

- [ ] **Step 3: Implement** — in `js/random_input.js`, add `graphEdgeList` and dispatch cases (match the file's existing `randInt` usage and `randomInputFor` switch structure):

```js
function graphEdgeList(rng, difficulty, weighted) {
  var n, extra;
  if (difficulty === 'edge') { n = randInt(rng, 3, 4); extra = 0; }
  else if (difficulty === 'large') { n = randInt(rng, 9, 12); extra = randInt(rng, n, n + 3); }
  else if (difficulty === 'special') { n = 6; extra = 2; }
  else { n = randInt(rng, 5, 7); extra = randInt(rng, 1, 3); }
  var seen = {}, lines = [];
  function add(u, v) {
    var a = Math.min(u, v), b = Math.max(u, v);
    if (a === b) return false;
    var k = a + '-' + b; if (seen[k]) return false; seen[k] = true;
    lines.push(weighted ? (a + ' ' + b + ' ' + randInt(rng, 1, 9)) : (a + ' ' + b));
    return true;
  }
  var i;
  for (i = 1; i < n; i++) add(i, randInt(rng, 0, i - 1)); // spanning tree → connected
  var tries = 0;
  while (extra > 0 && tries < 200) { tries++; if (add(randInt(rng, 0, n - 1), randInt(rng, 0, n - 1))) extra--; }
  return lines.join('\n');
}
```
Add to `randomInputFor`'s dispatch (return a `{ text }` object — the same shape `matrix-sparse`/`matrix-sparse-list` return, NOT a raw string):
```js
case 'graph-bfs':
case 'graph-dfs':
  return { text: graphEdgeList(rng, difficulty, false) };
case 'graph-dijkstra':
  return { text: graphEdgeList(rng, difficulty, true) };
```

- [ ] **Step 4: Run to verify pass**

Run: `node --test tests/unit/graph_workbench.test.js`
Expected: PASS. Also `node --test tests/unit/*.test.js` → no regressions.

- [ ] **Step 5: Commit**

```bash
git add js/random_input.js tests/unit/graph_workbench.test.js
git commit -m "feat: difficulty-aware random edge-list generators for graph bfs/dfs/dijkstra

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: `renderGraphVcr` + registry + wiring

**Files:**
- Modify: `js/domains/graph.js` (add `renderGraphVcr`; re-point 3 `R().attach` lines ~914–917)
- Modify: `index.html` (add script tag), `style.css` (`.gw-*` styles)
- Test: none new here (DOM verified in Task 5 E2E); run existing suite for no-regression.

**Interfaces:**
- Consumes: `GraphWorkbench.{parseEdges,layout,DEFAULTS,bfsFrames,dfsFrames,dijkstraFrames}`; VizKit `acquireDynamicVizHost`, `langOf`, `showStatus`, `getInputDifficulty`, `buildExamplesSelect`, `loadExamples`/`saveExample`; `window.RandomInput.randomInputFor`.
- Produces: `renderGraphVcr(methodId)` rendering toolbar (`.gw-input`, `.gw-build`, `.rand-btn`, `.ex-select`, `.gw-source`), SVG stage (`.graph-node`/`.graph-edge` reuse), VCR transport (`.gw-transport` with `.tbtn` buttons + `input[type=range]` + speed select + `.gw-cnt`), and step banner (`.gw-stepdesc`). Registered for `graph-bfs`/`graph-dfs`/`graph-dijkstra` only.

- [ ] **Step 1: Add the `<script>` tag** — `index.html`, alongside other `js/viz/*` includes, before `js/app.js`:

```html
<script src="js/viz/viz_graph_workbench.js" defer></script>
```

- [ ] **Step 2: Implement `renderGraphVcr`** — add to `js/domains/graph.js` (inside the IIFE, near the other renders). Read `renderTreeRB` in `js/domains/tree.js` for the transport button/slider/speed idiom and reuse the same `.tbtn`/`rbviz-transport`-equivalent styling class names (use `.gw-transport`). Full implementation:

```js
  const GW_META = {
    'graph-bfs':      { weighted: false, gen: (a, s) => GraphWorkbench.bfsFrames(a, s) },
    'graph-dfs':      { weighted: false, gen: (a, s) => GraphWorkbench.dfsFrames(a, s) },
    'graph-dijkstra': { weighted: true,  gen: (a, s) => GraphWorkbench.dijkstraFrames(a, s) },
  };
  let _gwState = {}; // methodId -> { text, source, frames, i, playing, timer }

  function renderGraphVcr(methodId) {
    const host = K().acquireDynamicVizHost();
    host.style.width = '100%';
    const langOf = K().langOf, showStatus = K().showStatus;
    const meta = GW_META[methodId];
    const st = _gwState[methodId] || (_gwState[methodId] = { text: GraphWorkbench.DEFAULTS[methodId], source: 0, frames: [], i: 0, playing: false, timer: 0 });

    host.innerHTML =
      '<div class="gw" data-testid="gw">' +
        '<div class="gw-toolbar">' +
          '<textarea class="gw-input" data-testid="gw-input" rows="3" spellcheck="false" placeholder="' +
            langOf({ zh: '每行一條邊:' + (meta.weighted ? 'u v w' : 'u v'), en: 'One edge per line: ' + (meta.weighted ? 'u v w' : 'u v') }) + '"></textarea>' +
          '<div class="gw-btns">' +
            '<button type="button" class="btn primary gw-build" data-testid="gw-build">' + langOf({ zh: '建立', en: 'Build' }) + '</button>' +
            '<button type="button" class="rand-btn" title="' + langOf({ zh: '隨機', en: 'Random' }) + '">🎲</button>' +
            K().buildExamplesSelect(methodId, GraphWorkbench.DEFAULTS[methodId]) +
            '<label class="gw-src-lbl">' + langOf({ zh: '起點', en: 'Source' }) + ' <select class="gw-source" data-testid="gw-source"></select></label>' +
          '</div>' +
          '<div class="gw-err" data-testid="gw-err"></div>' +
        '</div>' +
        '<div class="gw-stepdesc" data-testid="gw-stepdesc"></div>' +
        '<div class="gw-stage"><svg class="gw-svg" viewBox="0 0 600 400" data-testid="gw-svg"></svg></div>' +
        '<div class="gw-transport" data-testid="gw-transport"></div>' +
      '</div>';

    const input = host.querySelector('.gw-input');
    const srcSel = host.querySelector('.gw-source');
    const errEl = host.querySelector('.gw-err');
    const descEl = host.querySelector('.gw-stepdesc');
    const svg = host.querySelector('.gw-svg');
    const transportEl = host.querySelector('.gw-transport');
    input.value = st.text;

    let parsed = GraphWorkbench.parseEdges(st.text, meta.weighted);

    function rebuildSourceOptions(n) {
      srcSel.innerHTML = '';
      for (let k = 0; k < n; k++) { const o = document.createElement('option'); o.value = k; o.textContent = k; srcSel.appendChild(o); }
      if (st.source >= n) st.source = 0;
      srcSel.value = st.source;
    }

    function recompute() {
      parsed = GraphWorkbench.parseEdges(st.text, meta.weighted);
      if (!parsed.ok) { errEl.textContent = langOf(parsed.error); errEl.style.display = ''; return false; }
      errEl.style.display = 'none';
      rebuildSourceOptions(parsed.n);
      st.frames = meta.gen(parsed.adj, st.source);
      st.i = 0;
      return true;
    }

    function paint() {
      if (!parsed.ok || !st.frames.length) { svg.innerHTML = ''; descEl.textContent = ''; return; }
      const fr = st.frames[st.i];
      const pos = GraphWorkbench.layout(parsed.n, 300, 200, 150);
      const inSet = (arr, x) => arr.indexOf(x) !== -1;
      let s = '';
      // edges first
      for (const e of parsed.edges) {
        const active = fr.activeEdge && fr.activeEdge.u === e.u && fr.activeEdge.v === e.v;
        s += '<line class="graph-edge' + (active ? ' active' : '') + '" x1="' + pos[e.u].x + '" y1="' + pos[e.u].y + '" x2="' + pos[e.v].x + '" y2="' + pos[e.v].y + '"></line>';
        if (meta.weighted) {
          s += '<text class="graph-weight" x="' + ((pos[e.u].x + pos[e.v].x) / 2) + '" y="' + ((pos[e.u].y + pos[e.v].y) / 2) + '">' + e.w + '</text>';
        }
      }
      // nodes on top
      for (let k = 0; k < parsed.n; k++) {
        let cls = 'graph-node';
        if (fr.active === k) cls += ' active';
        else if (inSet(fr.visited, k)) cls += ' visited';
        else if (inSet(fr.frontier, k)) cls += ' frontier';
        s += '<circle class="' + cls + '" cx="' + pos[k].x + '" cy="' + pos[k].y + '" r="18"></circle>';
        s += '<text class="graph-node-label" x="' + pos[k].x + '" y="' + pos[k].y + '">' + k + '</text>';
        if (meta.weighted && fr.dist) {
          const d = fr.dist[k]; const dl = (d === Infinity || d === null) ? '∞' : d;
          s += '<text class="graph-distance" x="' + pos[k].x + '" y="' + (pos[k].y - 26) + '">' + dl + '</text>';
        }
      }
      svg.innerHTML = s;
      descEl.textContent = langOf(fr.message);
      renderTransport();
    }

    function renderTransport() {
      transportEl.innerHTML = '';
      const mk = (txt, title, fn) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'tbtn'; b.textContent = txt; b.title = title; b.addEventListener('click', fn); transportEl.appendChild(b); return b; };
      mk('⏮', langOf({ zh: '回到開頭', en: 'To start' }), () => { pause(); go(0); });
      mk('◀', langOf({ zh: '上一步', en: 'Previous step' }), () => { pause(); go(st.i - 1); });
      const play = mk(st.playing ? '⏸' : '▶', langOf({ zh: '播放 / 暫停', en: 'Play / Pause' }), () => st.playing ? pause() : start());
      play.classList.add('play');
      mk('▶︎', langOf({ zh: '下一步', en: 'Next step' }), () => { pause(); go(st.i + 1); });
      mk('⏭', langOf({ zh: '跳到結尾', en: 'To end' }), () => { pause(); go(st.frames.length - 1); });
      const slider = document.createElement('input'); slider.type = 'range'; slider.min = 0; slider.max = Math.max(0, st.frames.length - 1); slider.value = st.i;
      slider.setAttribute('data-testid', 'gw-slider');
      slider.addEventListener('input', () => { pause(); go(+slider.value); });
      transportEl.appendChild(slider);
      const speed = document.createElement('select'); speed.className = 'gw-speed';
      speed.innerHTML = '<option value="1200">' + langOf({ zh: '慢', en: 'Slow' }) + '</option><option value="700" selected>' + langOf({ zh: '中', en: 'Medium' }) + '</option><option value="350">' + langOf({ zh: '快', en: 'Fast' }) + '</option>';
      _gwState[methodId]._speed = speed; transportEl.appendChild(speed);
      const cnt = document.createElement('span'); cnt.className = 'gw-cnt'; cnt.setAttribute('data-testid', 'gw-cnt');
      cnt.textContent = langOf({ zh: '步 ' + st.i + ' / ' + (st.frames.length - 1), en: 'Step ' + st.i + ' / ' + (st.frames.length - 1) });
      transportEl.appendChild(cnt);
    }

    function go(i) { st.i = Math.max(0, Math.min(i, st.frames.length - 1)); paint(); }
    function start() { if (st.i >= st.frames.length - 1) go(0); st.playing = true; renderTransport(); tick(); }
    function pause() { st.playing = false; clearTimeout(st.timer); renderTransport(); }
    function tick() {
      if (!st.playing) return;
      if (st.i >= st.frames.length - 1) { pause(); return; }
      go(st.i + 1);
      const sp = _gwState[methodId]._speed ? +_gwState[methodId]._speed.value : 700;
      st.timer = setTimeout(tick, sp);
    }

    function applyText(text) {
      st.text = text; input.value = text;
      if (recompute()) { K().saveExample(methodId, text, GraphWorkbench.DEFAULTS[methodId]); paint(); }
      else { svg.innerHTML = ''; descEl.textContent = ''; transportEl.innerHTML = ''; }
    }

    host.querySelector('.gw-build').addEventListener('click', () => applyText(input.value));
    host.querySelector('.rand-btn').addEventListener('click', () => {
      const r = window.RandomInput && RandomInput.randomInputFor(methodId, K().getInputDifficulty());
      if (r && r.text) applyText(r.text); // randomInputFor returns { text }
    });
    srcSel.addEventListener('change', () => { st.source = +srcSel.value; if (recompute()) paint(); });
    const exSel = host.querySelector('.ex-select');
    if (exSel) exSel.addEventListener('change', (ev) => { const v = ev.target.value; if (v) applyText(v); });

    // initial
    if (recompute()) paint();
    else { errEl.textContent = langOf(parsed.error); errEl.style.display = ''; }
  }
```

> If `K().buildExamplesSelect`, `K().loadExamples`, `K().saveExample`, or `K().getInputDifficulty` are not exposed on VizKit, read how `matrix-sparse-list` (in `js/viz/viz_matrix_sparse_list.js` / app.js) reaches them and use the same access path. Match the exact helper names actually exported.

- [ ] **Step 3: Re-point the registry** — in `js/domains/graph.js`, change ONLY these three attach lines:

```js
  R().attach('graph-bfs',      { render: () => renderGraphVcr('graph-bfs'),      code: () => codeGraphBFS,      layout: { host: 'dynamic' } });
  R().attach('graph-dfs',      { render: () => renderGraphVcr('graph-dfs'),      code: () => codeGraphDFS,      layout: { host: 'dynamic' } });
  R().attach('graph-dijkstra', { render: () => renderGraphVcr('graph-dijkstra'), code: () => codeGraphDijkstra, layout: { host: 'dynamic' } });
```
Leave every other `R().attach('graph...` line exactly as-is.

- [ ] **Step 4: Add styles** — `style.css`, append `.gw-*` rules (reuse existing `graph-node`/`graph-edge`/`graph-weight`/`graph-distance` colors; add `.graph-node.active/.visited/.frontier`, `.graph-edge.active`, `.gw-toolbar`/`.gw-transport` flex layout, `.gw-input` full-width textarea, `.gw-err` red hidden-by-default, `.gw-cnt` muted). Keep it minimal and theme-consistent with existing graph + rbviz-transport styling.

- [ ] **Step 5: Verify no syntax errors + no regression**

Run: `node --check js/domains/graph.js && node --check js/viz/viz_graph_workbench.js`
Run: `npm run test:all` (expect all existing tests still green; the 3 pilot methods now render the new UI but no E2E asserts on them yet — Task 5 adds those; ensure no existing graph E2E asserted on the old fixed-graph UI for bfs/dfs/dijkstra — if one does, note it for Task 5 to update).

- [ ] **Step 6: Commit**

```bash
git add js/domains/graph.js index.html style.css
git commit -m "feat: renderGraphVcr — edge-list + VCR workbench for graph bfs/dfs/dijkstra

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 5: E2E coverage + full suite green

**Files:**
- Create: `tests/graph_workbench.spec.js`
- Modify: `tests/visualizer.spec.js` — two tests assert the OLD UI and WILL break:
  - **BFS test** (~L243 "Graphs: BFS renders SVG nodes and a queue strip"): asserts `.bfs-svg`, `[data-testid="bfs-queue"]`, `.bfs-svg .nodes circle` count 5. Rewrite to the new workbench: keep the `.code-panel-filename` contains `graph_bfs.cpp` check, replace the SVG/queue asserts with `[data-testid="gw-input"]` visible, `[data-testid="gw-transport"]` visible, and `.gw-svg .graph-node` count 5 (default graph has 5 nodes).
  - **DFS test** (~L252 "Graphs: DFS renders SVG nodes and a stack strip"): asserts `.dfs-svg`, `[data-testid="dfs-stack"]`, count 5. Rewrite the same way (keep `graph_dfs.cpp` filename check; `.gw-svg .graph-node` count 5).
  - **Dijkstra test** (~L221) only checks `data-runtime-state=active` + `.code-panel-filename` contains `graph_dijkstra.cpp` — both still true with the new render (code panel comes from the registry `code:`, unchanged), so it should PASS unchanged. Verify; only touch it if it actually fails.
  - Do NOT touch the other graph tests (adjlist, topo, traversal, prim, bellman-ford, etc.).

**Interfaces:**
- Consumes: shared `loadMethod(page, methodId)` from `tests/helpers.js`.

- [ ] **Step 1: Write the E2E spec** — `tests/graph_workbench.spec.js`:

```js
const { test, expect } = require('@playwright/test');
const { loadMethod } = require('./helpers');
const path = require('path');

const PILOTS = ['graph-bfs', 'graph-dfs', 'graph-dijkstra'];

test.describe('graph workbench (edge-list + VCR)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'zh'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  for (const id of PILOTS) {
    test(id + ': renders input + transport, random+build draws nodes, stepping advances', async ({ page }) => {
      await loadMethod(page, id);
      const sec = page.locator('[data-method-section="' + id + '"]');
      await expect(sec.locator('[data-testid="gw-input"]')).toBeVisible();
      await expect(sec.locator('[data-testid="gw-transport"]')).toBeVisible();
      // default builds nodes
      await expect(sec.locator('.gw-svg .graph-node')).toHaveCount(5);
      // random fills a non-empty input and rebuilds
      await sec.locator('.rand-btn').click();
      await expect(sec.locator('[data-testid="gw-input"]')).not.toHaveValue('');
      await expect(sec.locator('.gw-svg .graph-node').first()).toBeVisible();
      // stepping forward advances the counter
      const cnt = sec.locator('[data-testid="gw-cnt"]');
      const before = await cnt.textContent();
      await sec.locator('[data-testid="gw-transport"] .tbtn').nth(3).click(); // ▶︎ next
      await expect(cnt).not.toHaveText(before);
    });
  }

  test('graph-dijkstra: shows distance labels; example round-trips', async ({ page }) => {
    await loadMethod(page, 'graph-dijkstra');
    const sec = page.locator('[data-method-section="graph-dijkstra"]');
    const input = sec.locator('[data-testid="gw-input"]');
    await input.fill('0 1 2\n1 2 3');
    await sec.locator('[data-testid="gw-build"]').click();
    await expect(sec.locator('.gw-svg .graph-distance').first()).toBeVisible();
    // saved example appears; change input then select it back
    await input.fill('0 1 7\n0 2 7');
    await sec.locator('[data-testid="gw-build"]').click();
    const ex = sec.locator('.ex-select');
    await ex.selectOption({ label: /0 1 2/ }).catch(async () => { await ex.selectOption({ index: 2 }); });
    await expect(input).toHaveValue(/0 1 2/);
  });

  test('language toggle updates workbench text', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const sec = page.locator('[data-method-section="graph-bfs"]');
    await expect(sec.locator('[data-testid="gw-build"]')).toHaveText('建立');
    await page.evaluate(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} document.dispatchEvent(new Event('languagechange')); });
    await expect(sec.locator('[data-testid="gw-build"]')).toHaveText('Build');
  });
});
```

> Adjust the exact expected node counts / example-select mechanics to what the implementation actually produces (the DEFAULT graph has 5 nodes → count 5; if you changed DEFAULTS, update). If `selectOption({label})` matching is brittle, select by index (option 0 = placeholder, 1 = Default, 2 = first saved). Confirm `data-method-section` is the correct attribute by checking an existing graph spec.

- [ ] **Step 2: Run the new spec**

Run: `npx playwright test tests/graph_workbench.spec.js`
Expected: PASS (all pilot + dijkstra + language tests). Fix implementation (not assertions) if a genuine bug surfaces; adjust assertions only where they encode an incidental detail (counts, option index).

- [ ] **Step 3: Full regression**

Run: `npm run test:all`
Expected: All green. If a pre-existing graph test asserted the old fixed UI for a pilot method, update it (Step "Modify" above). Confirm overview/nav/i18n counts unchanged.

- [ ] **Step 4: Confirm cloud-config untouched**

Run: `git status --porcelain js/cloud-config.js` (must be empty). If not: `git checkout js/cloud-config.js`.

- [ ] **Step 5: Commit**

```bash
git add tests/graph_workbench.spec.js
# plus any updated existing spec
git commit -m "test: E2E for graph workbench (bfs/dfs/dijkstra edge-list + VCR)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review (completed)

- **Spec coverage:** parser+layout+defaults (T1), 3 frame generators (T2), random/difficulty (T3), render+VCR+examples+source+registry+html+css (T4), unit+E2E+regression (T5). All spec §2–§5 items map to a task. ✓
- **Placeholder scan:** no TBD/"add error handling"-style gaps; all code steps contain real code. The two `>` NOTE callouts are explicit implementer verifications (DFS order value; helper access path; random rng signature), not placeholders. ✓
- **Type consistency:** `parseEdges`→`{ok,n,adj,edges,error}`; `adj[i]=[{to,w}]`; `Frame={visited,frontier,active,activeEdge,dist,order,message}`; `layout(n,cx,cy,r)`; generator names `bfsFrames/dfsFrames/dijkstraFrames` used identically across T1–T5. `GraphWorkbench` global + `module.exports` consistent. Registry uses `renderGraphVcr(methodId)`. ✓
