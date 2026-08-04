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
  const toks = Array.from({ length: 13 }, (_, i) => 't' + i); // 13 distinct tokens > cap
  const many = toks.slice(0, -1).map((t, i) => t + '-' + toks[i + 1]).join(',');
  const r = GW.parseEdges(many, false);
  assert.strictEqual(r.ok, false);
  assert.ok(/12/.test(r.error.en));
});

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
  // K4 is planar (one node inside the other 3's triangle → 0 crossings achievable).
  // Multi-seed FR + local crossing-repair must actually find that embedding, not tie the circle.
  assert.strictEqual(countCrossings(p.edges, circle), 1);
  assert.strictEqual(countCrossings(p.edges, force), 0);
  assert.ok(countCrossings(p.edges, force) < countCrossings(p.edges, circle));
});

test('force layout on the pentagon default is no worse than the circle', () => {
  const p = GW.parseEdges('A-B,B-C,C-D,D-E,E-A,A-C', false, false); // pentagon + one diagonal
  const circle = GW.layout(p.n, 300, 200, 150);
  const force = GW.layout(p.n, 300, 200, 150, p.edges);
  assert.ok(countCrossings(p.edges, force) <= countCrossings(p.edges, circle));
});

test('DEFAULTS parse cleanly for each pilot method', () => {
  assert.ok(GW.parseEdges(GW.DEFAULTS['graph-bfs'], false).ok);
  assert.ok(GW.parseEdges(GW.DEFAULTS['graph-dfs'], false).ok);
  assert.ok(GW.parseEdges(GW.DEFAULTS['graph-dijkstra'], true).ok);
});

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
  // Hand-traced recursive lowest-index-first DFS from 0 on adj[0]=[1,2], adj[1]=[0,3],
  // adj[2]=[0,3], adj[3]=[1,2,4], adj[4]=[3]:
  // visit 0 -> visit 1 (0's first unvisited neighbor) -> visit 3 (1's unvisited neighbor)
  // -> visit 2 (3's first unvisited neighbor, 2<4) -> backtrack to 3 -> visit 4 (3's remaining neighbor)
  // Verified empirically to match: order = [0,1,3,2,4].
  assert.deepStrictEqual(last.order, [0, 1, 3, 2, 4]);
  assert.ok(fr.every(f => f.message && f.message.zh && f.message.en));
  assert.ok(fr.every(f => f.dist === null));
});

test('generators use token labels in messages when provided', () => {
  const fr = GW.bfsFrames([[{to:1,w:1}],[{to:0,w:1}]], 0, ['X', 'Y']);
  assert.ok(/X/.test(fr[0].message.zh + fr[0].message.en));
});

test('dijkstraFrames: textbook shortest distances', () => {
  const fr = GW.dijkstraFrames(adjOf('0 1 4\n0 2 1\n2 1 2\n1 3 1\n2 3 5\n3 4 3', true), 0);
  const last = fr[fr.length - 1];
  // 0→2 (1), 2→1 (1+2=3), 1→3 (3+1=4), 3→4 (4+3=7)
  assert.deepStrictEqual(last.dist, [0, 3, 1, 4, 7]);
  assert.ok(fr.every(f => Array.isArray(f.dist)));
  assert.ok(fr.every(f => f.message && f.message.zh && f.message.en));
});

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
  const p = GW.parseEdges('0 1 -4\n1 2 -3', true, true, true);
  assert.ok(p.ok);
  assert.strictEqual(p.adj[0][0].w, -4);
});

test('parseEdges allowNegative decouples negatives from directed', () => {
  assert.strictEqual(GW.parseEdges('0-1:-4', true, false, false).ok, false); // undirected weighted: w>=1
  assert.strictEqual(GW.parseEdges('0-1:-4', true, true, false).ok, false);  // directed dijkstra-style: still w>=1
  assert.ok(GW.parseEdges('0-1:-4', true, true, true).ok);                    // bellman-ford: negatives allowed
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
  const p = GW.parseEdges(GW.DEFAULTS['graph-bellman-ford'], true, true, true);
  const frames = GW.bellmanFordFrames(p.adj, p.n, 0);
  const last = frames[frames.length - 1];
  assert.deepStrictEqual(last.dist, [0, 2, 7, 4, -2]);
  for (const f of frames) { assert.ok(Array.isArray(f.dist)); assert.ok(f.message.zh.length && f.message.en.length); }
  // negative cycle: 0->1 (1), 1->0 (-3)
  const nc = GW.bellmanFordFrames(GW.parseEdges('0 1 1\n1 0 -3', true, true, true).adj, 2, 0);
  assert.ok(/負|negative/i.test(nc[nc.length - 1].message.zh + nc[nc.length - 1].message.en));
});

test('random topo/bellman inputs are DAGs (parse ok, acyclic, n<=12)', () => {
  for (const id of ['graph-topo', 'graph-bellman-ford']) {
    const weighted = id === 'graph-bellman-ford';
    for (const d of ['edge', 'normal', 'large', 'special']) {
      let seed = 5;
      const rng = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
      const p = GW.parseEdges(RI.randomInputFor(id, d, rng).text, weighted, true, weighted);
      assert.ok(p.ok, id + '/' + d + ' parses');
      assert.ok(p.n >= 3 && p.n <= 12, id + '/' + d + ' n range');
      // topoFrames orders all nodes → acyclic
      const frames = GW.topoFrames(p.adj, p.n);
      assert.strictEqual(frames[frames.length - 1].order.length, p.n, id + '/' + d + ' is a DAG');
    }
  }
});

test('adjMatrix builds a symmetric 0/1 matrix with zero diagonal', () => {
  const p = GW.parseEdges('0 1\n1 2\n0 2', false, false);
  const m = GW.adjMatrix(p.adj, p.n);
  assert.strictEqual(m.length, 3);
  for (let i = 0; i < 3; i++) assert.strictEqual(m[i][i], 0);
  assert.strictEqual(m[0][1], 1); assert.strictEqual(m[1][0], 1);
  assert.strictEqual(m[0][2], 1); assert.strictEqual(m[2][0], 1);
  assert.strictEqual(m[1][2], 1);
});

test('DEFAULTS for graph/adjlist/traversal parse as undirected n=5', () => {
  for (const id of ['graph', 'graph-adjlist', 'graph-traversal']) {
    const p = GW.parseEdges(GW.DEFAULTS[id], false, false);
    assert.ok(p.ok); assert.strictEqual(p.n, 5);
  }
});

test('random graph/adjlist/traversal inputs are connected undirected graphs', () => {
  for (const id of ['graph', 'graph-adjlist', 'graph-traversal']) {
    for (const d of ['edge', 'normal', 'large', 'special']) {
      let seed = 9;
      const rng = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
      const p = GW.parseEdges(RI.randomInputFor(id, d, rng).text, false, false);
      assert.ok(p.ok && p.n >= 3 && p.n <= 12, id + '/' + d);
      const seen = new Set([0]); const q = [0];
      while (q.length) { const u = q.shift(); for (const e of p.adj[u]) if (!seen.has(e.to)) { seen.add(e.to); q.push(e.to); } }
      assert.strictEqual(seen.size, p.n, id + '/' + d + ' connected');
    }
  }
});

test('parseEdges accepts compact comma form (unweighted, directed)', () => {
  const p = GW.parseEdges('0-1,1-2,2-0', false, true);
  assert.ok(p.ok); assert.strictEqual(p.n, 3);
  assert.ok(p.edges.some((e) => e.u === 2 && e.v === 0));
  assert.deepStrictEqual(p.adj[0].map((x) => x.to), [1]);
});

test('parseEdges accepts compact weighted form u-v:w incl. negatives', () => {
  const p = GW.parseEdges('0-1:4,1-2:1', true, false);
  assert.ok(p.ok); assert.strictEqual(p.adj[0][0].w, 4);
  const d = GW.parseEdges('0-1:-4,1-2:-3', true, true, true); // bellman-ford style: allowNegative allows negatives
  assert.ok(d.ok); assert.strictEqual(d.adj[0][0].w, -4);
});

test('parseEdges is backward compatible with legacy whitespace form', () => {
  const oldU = GW.parseEdges('0 1\n1 2', false, false);
  const newU = GW.parseEdges('0-1,1-2', false, false);
  assert.deepStrictEqual(oldU.edges, newU.edges);
  // legacy negative weight (directed) keeps its sign (not eaten by the dash split)
  // note: tokens '0','1','4' are non-contiguous, so index 4 is NOT node '4' (no phantom fill) —
  // assert via labels rather than assuming index === token value.
  const bf = GW.parseEdges('0 1 6\n1 4 -4', true, true, true);
  assert.ok(bf.ok);
  assert.deepStrictEqual(bf.labels, ['0', '1', '4']);
  assert.ok(bf.edges.some((e) => bf.labels[e.u] === '1' && bf.labels[e.v] === '4' && e.w === -4));
});

test('parseEdges handles mixed comma+newline separators', () => {
  const p = GW.parseEdges('0-1,1-2\n2-3', false, false);
  assert.ok(p.ok); assert.strictEqual(p.n, 4); assert.strictEqual(p.edges.length, 3);
});

test('parseEdges errors: weighted method missing weight; undirected w<1; too many nodes', () => {
  assert.strictEqual(GW.parseEdges('0-1', true, false).ok, false);       // weight required
  assert.strictEqual(GW.parseEdges('0-1:-4', true, false).ok, false);    // undirected weighted rejects w<1
  const toks13 = Array.from({ length: 13 }, (_, i) => 't' + i);          // 13 distinct tokens > cap
  const many = toks13.slice(0, -1).map((t, i) => t + '-' + toks13[i + 1]).join(',');
  assert.strictEqual(GW.parseEdges(many, false, false).ok, false);       // n=13 > 12
  for (const bad of ['0-1', 'x-1', '']) { /* smoke: no throw */ GW.parseEdges(bad, false, false); }
});

test('all 10 DEFAULTS parse ok in their weighted/directed mode with expected n', () => {
  const spec = {
    'graph-bfs': [false, false, 5], 'graph-dfs': [false, false, 5], 'graph-dijkstra': [true, false, 5],
    'graph-kruskal': [true, false, 5], 'graph-prim': [true, false, 5],
    'graph-topo': [false, true, 6], 'graph-bellman-ford': [true, true, 5, true],
    'graph': [false, false, 5], 'graph-adjlist': [false, false, 5], 'graph-traversal': [false, false, 5],
  };
  for (const id of Object.keys(spec)) {
    const [w, d, n, an] = spec[id];
    const p = GW.parseEdges(GW.DEFAULTS[id], w, d, an);
    assert.ok(p.ok, id + ' parses'); assert.strictEqual(p.n, n, id + ' n');
  }
});

test('adjMultilist: one node per edge, each shared by two vertex chains', () => {
  const p = GW.parseEdges('0-1,1-2,2-0', false, false);
  const ml = GW.adjMultilist(p.edges, p.n);
  assert.strictEqual(ml.nodes.length, 3);
  assert.deepStrictEqual(ml.nodes[0], { id: 0, u: 0, v: 1 });
  // every edge id appears in exactly two chains
  const count = {};
  ml.chains.forEach((ch) => ch.forEach((c) => { count[c.id] = (count[c.id] || 0) + 1; }));
  assert.deepStrictEqual(count, { 0: 2, 1: 2, 2: 2 });
  // vertex 1's chain references E0 (other 0) and E1 (other 2), sorted by other
  assert.deepStrictEqual(ml.chains[1], [{ id: 0, other: 0 }, { id: 1, other: 2 }]);
});

test('DEFAULTS graph-multilist parses undirected n=5', () => {
  const p = GW.parseEdges(GW.DEFAULTS['graph-multilist'], false, false);
  assert.ok(p.ok); assert.strictEqual(p.n, 5);
});
