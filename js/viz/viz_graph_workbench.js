(function (global) {
  'use strict';
  var CAP = 12;

  function parseEdges(text, weighted, directed, allowNegative) {
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
      } else if (/^\d+-\d+$/.test(t)) {
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
      if (weighted && !allowNegative && w < 1) return { ok: false, error: { zh: '權重需 ≥ 1', en: 'Weight must be ≥ 1' } };
      maxIdx = Math.max(maxIdx, u, v);
      raw.push({ u: u, v: v, w: w });
    }
    var n = maxIdx + 1;
    if (n > CAP) return { ok: false, error: { zh: '節點太多了(上限 ' + CAP + ')', en: 'Too many nodes (max ' + CAP + ')' } };
    var seen = {}, edges = [], adj = [];
    for (i = 0; i < n; i++) adj.push([]);
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

  // Defaults = the graph category's original demo graph: a 5-node pentagon
  // (0-1-2-3-4-0) plus the 0-2 diagonal — connected, has cycles, good for
  // BFS/DFS/shortest-path demos. Weights mirror the original DEFAULT_WEIGHTED_EDGES.
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

  function adjMatrix(adj, n) {
    var m = [], i, j;
    for (i = 0; i < n; i++) { var row = []; for (j = 0; j < n; j++) row.push(0); m.push(row); }
    for (i = 0; i < n; i++) for (j = 0; j < adj[i].length; j++) m[i][adj[i][j].to] = 1;
    return m;
  }

  var api = { parseEdges: parseEdges, layout: layout, DEFAULTS: DEFAULTS, bfsFrames: bfsFrames, dfsFrames: dfsFrames, dijkstraFrames: dijkstraFrames, kruskalFrames: kruskalFrames, primFrames: primFrames, topoFrames: topoFrames, bellmanFordFrames: bellmanFordFrames, adjMatrix: adjMatrix };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.GraphWorkbench = api;
})(typeof window !== 'undefined' ? window : globalThis);
