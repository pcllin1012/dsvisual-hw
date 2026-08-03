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
