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

  // Defaults = the graph category's original demo graph: a 5-node pentagon
  // (0-1-2-3-4-0) plus the 0-2 diagonal — connected, has cycles, good for
  // BFS/DFS/shortest-path demos. Weights mirror the original DEFAULT_WEIGHTED_EDGES.
  var DEFAULTS = {
    'graph-bfs': '0 1\n1 2\n2 3\n3 4\n4 0\n0 2',
    'graph-dfs': '0 1\n1 2\n2 3\n3 4\n4 0\n0 2',
    'graph-dijkstra': '0 1 4\n1 2 1\n2 3 6\n3 4 2\n4 0 3\n0 2 5'
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

  var api = { parseEdges: parseEdges, layout: layout, DEFAULTS: DEFAULTS, bfsFrames: bfsFrames, dfsFrames: dfsFrames, dijkstraFrames: dijkstraFrames };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.GraphWorkbench = api;
})(typeof window !== 'undefined' ? window : globalThis);
