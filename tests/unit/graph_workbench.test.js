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

test('dijkstraFrames: textbook shortest distances', () => {
  const fr = GW.dijkstraFrames(adjOf('0 1 4\n0 2 1\n2 1 2\n1 3 1\n2 3 5\n3 4 3', true), 0);
  const last = fr[fr.length - 1];
  // 0→2 (1), 2→1 (1+2=3), 1→3 (3+1=4), 3→4 (4+3=7)
  assert.deepStrictEqual(last.dist, [0, 3, 1, 4, 7]);
  assert.ok(fr.every(f => Array.isArray(f.dist)));
  assert.ok(fr.every(f => f.message && f.message.zh && f.message.en));
});
