(function (global) {
  'use strict';
  var CAP = 12;

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

  var GW_FR_SEEDS = 8;                                   // deterministic seed count for multi-start FR

  // Module-internal crossing counter (not exported): counts pairwise segment
  // intersections among `edges` at `pos`, skipping pairs that share an endpoint.
  function gwCrossingCount(edges, pos) {
    function seg(e) { return [pos[e.u], pos[e.v]]; }
    function ccw(a, b, c) { return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x); }
    function inter(a, b, c, d) { return ccw(a, c, d) !== ccw(b, c, d) && ccw(a, b, c) !== ccw(a, b, d); }
    var x = 0, i, j;
    for (i = 0; i < edges.length; i++) for (j = i + 1; j < edges.length; j++) {
      var e = edges[i], f = edges[j];
      if (e.u === f.u || e.u === f.v || e.v === f.u || e.v === f.v) continue; // shared endpoint
      var s1 = seg(e), s2 = seg(f);
      if (inter(s1[0], s1[1], s2[0], s2[1])) x++;
    }
    return x;
  }

  function gwTotalEdgeLength(edges, pos) {
    var s = 0;
    for (var i = 0; i < edges.length; i++) { var e = edges[i], dx = pos[e.u].x - pos[e.v].x, dy = pos[e.u].y - pos[e.v].y; s += Math.sqrt(dx * dx + dy * dy); }
    return s;
  }

  function layout(n, cx, cy, r, edges) {
    cx = cx == null ? 300 : cx; cy = cy == null ? 200 : cy; r = r == null ? 150 : r;
    var i;
    if (!edges || n <= 1) {                              // circle fallback (unchanged behavior)
      var pc = [];
      for (i = 0; i < n; i++) { var a0 = -Math.PI / 2 + i * 2 * Math.PI / n; pc.push({ x: cx + r * Math.cos(a0), y: cy + r * Math.sin(a0) }); }
      return pc;
    }
    var W = 600, H = 400, k = Math.sqrt((W * H) / n) * 0.8;

    function fitToBox(pos) {                             // fit to (cx±r, cy±r), uniform scale+center
      var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity, ii;
      for (ii = 0; ii < n; ii++) { if (pos[ii].x < minX) minX = pos[ii].x; if (pos[ii].y < minY) minY = pos[ii].y; if (pos[ii].x > maxX) maxX = pos[ii].x; if (pos[ii].y > maxY) maxY = pos[ii].y; }
      var bw = (maxX - minX) || 1, bh = (maxY - minY) || 1;
      var scale = Math.min((2 * r) / bw, (2 * r) / bh);
      var out = [];
      for (ii = 0; ii < n; ii++) out.push({ x: cx + (pos[ii].x - (minX + maxX) / 2) * scale, y: cy + (pos[ii].y - (minY + maxY) / 2) * scale });
      return out;
    }

    // fr(seed): one deterministic FR run + local crossing-repair, returns a fitted pos[].
    // `seed` varies the initial layout (rotation + index/seed jitter, no RNG).
    function fr(seed) {
      var pos = [], ii, jj;
      var rot = seed * (2 * Math.PI / GW_FR_SEEDS);
      for (ii = 0; ii < n; ii++) {                        // deterministic circle seed + index/seed jitter (no RNG)
        var a = -Math.PI / 2 + ii * 2 * Math.PI / n + rot;
        var jx = ((((ii + 1) * 2654435761 + seed * 812503) % 1000) / 1000 - 0.5) * 2;
        var jy = ((((ii + 1) * 40503 + seed * 2971) % 1000) / 1000 - 0.5) * 2;
        pos.push({ x: W / 2 + (H / 3) * Math.cos(a) + jx, y: H / 2 + (H / 3) * Math.sin(a) + jy });
      }
      var t = W / 8, ITER = 300, cool = t / (ITER + 1);
      for (var it = 0; it < ITER; it++) {
        var disp = [];
        for (ii = 0; ii < n; ii++) disp.push({ x: 0, y: 0 });
        for (ii = 0; ii < n; ii++) for (jj = ii + 1; jj < n; jj++) {   // repulsion
          var dx = pos[ii].x - pos[jj].x, dy = pos[ii].y - pos[jj].y;
          var d = Math.sqrt(dx * dx + dy * dy) || 0.01;
          var f = (k * k) / d, ux = dx / d, uy = dy / d;
          disp[ii].x += ux * f; disp[ii].y += uy * f;
          disp[jj].x -= ux * f; disp[jj].y -= uy * f;
        }
        for (var m = 0; m < edges.length; m++) {               // attraction along edges
          var e = edges[m], pu = pos[e.u], pv = pos[e.v];
          var ex = pu.x - pv.x, ey = pu.y - pv.y;
          var ed = Math.sqrt(ex * ex + ey * ey) || 0.01;
          var af = (ed * ed) / k, aux = ex / ed, auy = ey / ed;
          disp[e.u].x -= aux * af; disp[e.u].y -= auy * af;
          disp[e.v].x += aux * af; disp[e.v].y += auy * af;
        }
        for (ii = 0; ii < n; ii++) {                            // limit step by temperature
          var dl = Math.sqrt(disp[ii].x * disp[ii].x + disp[ii].y * disp[ii].y) || 0.01;
          var lim = Math.min(dl, t);
          pos[ii].x += (disp[ii].x / dl) * lim; pos[ii].y += (disp[ii].y / dl) * lim;
        }
        t -= cool; if (t < 1) t = 1;
      }
      // Deterministic local crossing-repair: a fully-symmetric spring/repulsion force field
      // (as above) settles highly symmetric graphs — e.g. K4 — into a convex arrangement whose
      // crossing count no amount of seed variation alone can improve (it's the unique force
      // equilibrium). This pass relocates one node at a time to the centroid of the rest, in
      // index order, keeping the move only when it strictly cuts crossings without violating
      // separation. Deterministic, no RNG, bounded passes.
      var minSep = k * 0.25, passes = 3;
      for (var p = 0; p < passes; p++) {
        var improved = false;
        for (ii = 0; ii < n; ii++) {
          var cur = gwCrossingCount(edges, pos);
          if (cur === 0) break;
          var sx = 0, sy = 0;
          for (jj = 0; jj < n; jj++) if (jj !== ii) { sx += pos[jj].x; sy += pos[jj].y; }
          var cand = { x: sx / (n - 1), y: sy / (n - 1) };
          var old = pos[ii];
          pos[ii] = cand;
          var nc = gwCrossingCount(edges, pos);
          var minD = Infinity;
          for (jj = 0; jj < n; jj++) if (jj !== ii) { var ddx = pos[ii].x - pos[jj].x, ddy = pos[ii].y - pos[jj].y; var dd = Math.sqrt(ddx * ddx + ddy * ddy); if (dd < minD) minD = dd; }
          if (nc < cur && minD >= minSep) improved = true;
          else pos[ii] = old;
        }
        if (!improved) break;
      }
      return fitToBox(pos);
    }

    var best = null;                                      // pick fewest crossings; tie→shortest total edge length; tie→lowest seed
    for (var s = 0; s < GW_FR_SEEDS; s++) {
      var fitted = fr(s);
      var cross = gwCrossingCount(edges, fitted);
      var len = gwTotalEdgeLength(edges, fitted);
      if (!best || cross < best.cross || (cross === best.cross && len < best.len)) best = { cross: cross, len: len, pos: fitted };
    }
    return best.pos;
  }

  // Defaults = the graph category's original demo graph: a 5-node pentagon
  // (0-1-2-3-4-0) plus the 0-2 diagonal — connected, has cycles, good for
  // BFS/DFS/shortest-path demos. Weights mirror the original DEFAULT_WEIGHTED_EDGES.
  var DEFAULTS = {
    'graph-bfs': 'A-B,B-C,C-D,D-E,E-A,A-C',
    'graph-dfs': 'A-B,B-C,C-D,D-E,E-A,A-C',
    'graph-dijkstra': 'A-B:4,B-C:1,C-D:6,D-E:2,E-A:3,A-C:5',
    'graph-kruskal': 'A-B:4,B-C:1,C-D:6,D-E:2,E-A:3,A-C:5',
    'graph-prim': 'A-B:4,B-C:1,C-D:6,D-E:2,E-A:3,A-C:5',
    'graph-boruvka': 'A-B:4,B-C:1,C-D:6,D-E:2,E-A:3,A-C:5',
    'graph-topo': 'A-B,A-C,B-D,C-D,D-E,D-F',
    'graph-bellman-ford': 'A-B:6,A-C:7,B-C:8,B-D:5,B-E:-4,C-D:-3,C-E:9,D-B:-2,E-A:2,E-D:7',
    'graph': 'A-B,B-C,C-D,D-E,E-A,A-C',
    'graph-adjlist': 'A-B,B-C,C-D,D-E,E-A,A-C',
    'graph-traversal': 'A-B,B-C,C-D,D-E,E-A,A-C',
    'graph-multilist': 'A-B,B-C,C-D,D-E,E-A,A-C'
  };

  function bfsFrames(adj, source, labels) {
    function L(i) { return labels ? labels[i] : i; }
    var n = adj.length, frames = [], visited = [], order = [], queue = [source], i;
    for (i = 0; i < n; i++) visited.push(false);
    visited[source] = true;
    function snap(active, activeEdge, msg) {
      frames.push({ visited: order.slice(), frontier: queue.slice(), active: active, activeEdge: activeEdge, dist: null, order: order.slice(), message: msg });
    }
    snap(null, null, { zh: '從節點 ' + L(source) + ' 開始,放入佇列', en: 'Start from node ' + L(source) + '; enqueue it' });
    while (queue.length) {
      var u = queue.shift(); order.push(u);
      snap(u, null, { zh: '從佇列取出 ' + L(u) + ',標記已訪', en: 'Dequeue ' + L(u) + '; mark visited' });
      for (i = 0; i < adj[u].length; i++) {
        var to = adj[u][i].to;
        if (!visited[to]) {
          visited[to] = true; queue.push(to);
          snap(u, { u: Math.min(u, to), v: Math.max(u, to) }, { zh: '鄰居 ' + L(to) + ' 未訪 → 入佇列', en: 'Neighbor ' + L(to) + ' unvisited → enqueue' });
        }
      }
    }
    snap(null, null, { zh: 'BFS 完成,順序:' + order.map(L).join(' → '), en: 'BFS done. Order: ' + order.map(L).join(' → ') });
    return frames;
  }

  function dfsFrames(adj, source, labels) {
    function L(i) { return labels ? labels[i] : i; }
    var n = adj.length, frames = [], visited = [], order = [], stack = [], i;
    for (i = 0; i < n; i++) visited.push(false);
    function snap(active, activeEdge, msg) {
      frames.push({ visited: order.slice(), frontier: stack.slice(), active: active, activeEdge: activeEdge, dist: null, order: order.slice(), message: msg });
    }
    snap(null, null, { zh: '從節點 ' + L(source) + ' 開始 DFS', en: 'Start DFS from node ' + L(source) });
    function dfs(u, parent) {
      visited[u] = true; order.push(u); stack.push(u);
      snap(u, parent == null ? null : { u: Math.min(u, parent), v: Math.max(u, parent) }, { zh: '進入 ' + L(u) + ',標記已訪', en: 'Enter ' + L(u) + '; mark visited' });
      for (var j = 0; j < adj[u].length; j++) {
        var to = adj[u][j].to;
        if (!visited[to]) {
          snap(u, { u: Math.min(u, to), v: Math.max(u, to) }, { zh: '沿邊 ' + L(u) + '–' + L(to) + ' 深入', en: 'Descend edge ' + L(u) + '–' + L(to) });
          dfs(to, u);
        }
      }
      stack.pop();
      snap(u, null, { zh: L(u) + ' 的鄰居都訪過,回溯', en: 'All neighbors of ' + L(u) + ' done; backtrack' });
    }
    dfs(source, null);
    snap(null, null, { zh: 'DFS 完成,順序:' + order.map(L).join(' → '), en: 'DFS done. Order: ' + order.map(L).join(' → ') });
    return frames;
  }

  function dijkstraFrames(adj, source, labels) {
    function L(i) { return labels ? labels[i] : i; }
    var n = adj.length, frames = [], dist = [], settled = [], order = [], i;
    for (i = 0; i < n; i++) { dist.push(Infinity); settled.push(false); }
    dist[source] = 0;
    function fmt(x) { return x === Infinity ? '∞' : x; }
    function frontier() { var f = []; for (var k = 0; k < n; k++) if (!settled[k] && dist[k] < Infinity) f.push(k); return f; }
    function snap(active, activeEdge, msg) {
      frames.push({ visited: order.slice(), frontier: frontier(), active: active, activeEdge: activeEdge, dist: dist.slice(), order: order.slice(), message: msg });
    }
    snap(null, null, { zh: '起點 ' + L(source) + ' 距離設 0,其餘 ∞', en: 'Set source ' + L(source) + ' distance to 0, others ∞' });
    for (var iter = 0; iter < n; iter++) {
      var u = -1, best = Infinity;
      for (i = 0; i < n; i++) if (!settled[i] && dist[i] < best) { best = dist[i]; u = i; }
      if (u === -1) break;
      settled[u] = true; order.push(u);
      snap(u, null, { zh: '取最小距離未定案節點 ' + L(u) + '(d=' + fmt(dist[u]) + '),定案', en: 'Settle min-distance unsettled node ' + L(u) + ' (d=' + fmt(dist[u]) + ')' });
      for (i = 0; i < adj[u].length; i++) {
        var to = adj[u][i].to, w = adj[u][i].w, nd = dist[u] + w, ae = { u: Math.min(u, to), v: Math.max(u, to) };
        if (settled[to]) continue;
        if (nd < dist[to]) {
          dist[to] = nd;
          snap(u, ae, { zh: '鬆弛 ' + L(u) + '→' + L(to) + ':d[' + L(to) + '] 更新為 ' + nd, en: 'Relax ' + L(u) + '→' + L(to) + ': d[' + L(to) + '] = ' + nd });
        } else {
          snap(u, ae, { zh: '檢查 ' + L(u) + '→' + L(to) + ':' + nd + ' ≥ d[' + L(to) + ']=' + fmt(dist[to]) + ',不更新', en: 'Check ' + L(u) + '→' + L(to) + ': ' + nd + ' ≥ d[' + L(to) + ']=' + fmt(dist[to]) + ', no update' });
        }
      }
    }
    snap(null, null, { zh: 'Dijkstra 完成', en: 'Dijkstra done' });
    return frames;
  }

  function kruskalFrames(edges, n, labels) {
    function L(i) { return labels ? labels[i] : i; }
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
        snap(ae, { zh: '加入邊 ' + L(ae.u) + '–' + L(ae.v) + '(w=' + e.w + ')', en: 'Add edge ' + L(ae.u) + '–' + L(ae.v) + ' (w=' + e.w + ')' });
      } else {
        snap(ae, { zh: '捨棄 ' + L(ae.u) + '–' + L(ae.v) + ':會成環', en: 'Skip ' + L(ae.u) + '–' + L(ae.v) + ': would form a cycle' });
      }
    }
    snap(null, { zh: 'MST 完成,總權重 ' + total, en: 'MST done. Total weight ' + total });
    return frames;
  }

  function boruvkaFrames(edges, n, labels) {
    function L(i) { return labels ? labels[i] : i; }
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
    var total = 0, round = 0;
    snap(null, { zh: 'Borůvka:每輪各連通分量挑最小外連邊加入', en: 'Borůvka: each round every component adds its cheapest outgoing edge' });
    while (tree.length < n - 1) {
      round++;
      var cheapest = {};
      for (i = 0; i < edges.length; i++) {
        var e = edges[i], ru = find(e.u), rv = find(e.v);
        if (ru === rv) continue;
        if (!cheapest[ru] || e.w < cheapest[ru].w) cheapest[ru] = e;
        if (!cheapest[rv] || e.w < cheapest[rv].w) cheapest[rv] = e;
      }
      var roots = Object.keys(cheapest).map(Number).sort(function (a, b) { return a - b; });
      if (!roots.length) break;
      var added = 0;
      for (var r = 0; r < roots.length; r++) {
        var c = cheapest[roots[r]];
        if (find(c.u) === find(c.v)) continue;               // already merged this round
        var ae = { u: Math.min(c.u, c.v), v: Math.max(c.u, c.v) };
        tree.push(ae); total += c.w; union(c.u, c.v);
        if (!inTree[ae.u]) { inTree[ae.u] = true; order.push(ae.u); }
        if (!inTree[ae.v]) { inTree[ae.v] = true; order.push(ae.v); }
        added++;
        snap(ae, { zh: '第 ' + round + ' 輪:分量最小外連邊 ' + L(ae.u) + '–' + L(ae.v) + '(w=' + c.w + '),合併', en: 'Round ' + round + ': component cheapest edge ' + L(ae.u) + '–' + L(ae.v) + ' (w=' + c.w + '), merge' });
        if (tree.length === n - 1) break;
      }
      if (added === 0) break;
    }
    if (tree.length === n - 1) snap(null, { zh: 'Borůvka 完成,總權重 ' + total, en: 'Borůvka done. Total weight ' + total });
    else snap(null, { zh: '圖不連通:生成森林,總權重 ' + total, en: 'Graph disconnected: spanning forest, total weight ' + total });
    return frames;
  }

  function primFrames(adj, source, labels) {
    function L(i) { return labels ? labels[i] : i; }
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
    snap(null, { zh: '從起點 ' + L(source) + ' 開始長樹', en: 'Grow the tree from source ' + L(source) });
    var total = 0;
    for (var cnt = 0; cnt < n - 1; cnt++) {
      var bu = -1, bv = -1, bw = Infinity;
      for (i = 0; i < n; i++) if (inTree[i]) for (j = 0; j < adj[i].length; j++) { var to = adj[i][j].to, w = adj[i][j].w; if (!inTree[to] && w < bw) { bw = w; bu = i; bv = to; } }
      if (bv === -1) break; // disconnected: stop growing this component
      inTree[bv] = true; order.push(bv);
      var ae = { u: Math.min(bu, bv), v: Math.max(bu, bv) }; tree.push(ae); total += bw;
      snap(ae, { zh: '加入 ' + L(ae.u) + '–' + L(ae.v) + '(w=' + bw + '),節點 ' + L(bv) + ' 入樹', en: 'Add ' + L(ae.u) + '–' + L(ae.v) + ' (w=' + bw + '); node ' + L(bv) + ' joins the tree' });
    }
    snap(null, { zh: 'MST 完成,總權重 ' + total, en: 'Prim done. Total weight ' + total });
    return frames;
  }

  function topoFrames(adj, n, labels) {
    function L(i) { return labels ? labels[i] : i; }
    var frames = [], order = [], indeg = [], queue = [], i, j;
    for (i = 0; i < n; i++) indeg.push(0);
    for (i = 0; i < n; i++) for (j = 0; j < adj[i].length; j++) indeg[adj[i][j].to]++;
    function snap(active, activeEdge, msg) {
      frames.push({ visited: order.slice(), frontier: queue.slice(), active: active, activeEdge: activeEdge, dist: indeg.slice(), order: order.slice(), message: msg });
    }
    for (i = 0; i < n; i++) if (indeg[i] === 0) queue.push(i);
    snap(null, null, { zh: '計算入度,入度 0 的節點先入佇列:[' + queue.map(L).join(', ') + ']', en: 'Compute in-degrees; enqueue in-degree-0 nodes: [' + queue.map(L).join(', ') + ']' });
    while (queue.length) {
      var u = queue.shift(); order.push(u);
      snap(u, null, { zh: '移除入度 0 的節點 ' + L(u) + ',加入拓撲序', en: 'Remove in-degree-0 node ' + L(u) + '; append to the order' });
      for (j = 0; j < adj[u].length; j++) {
        var to = adj[u][j].to; indeg[to]--; var enq = indeg[to] === 0;
        snap(u, { u: u, v: to }, enq
          ? { zh: '邊 ' + L(u) + '→' + L(to) + ':入度降為 0 → 入佇列', en: 'Edge ' + L(u) + '→' + L(to) + ': in-degree 0 → enqueue' }
          : { zh: '邊 ' + L(u) + '→' + L(to) + ':入度降為 ' + indeg[to], en: 'Edge ' + L(u) + '→' + L(to) + ': in-degree now ' + indeg[to] });
        if (enq) queue.push(to);
      }
    }
    if (order.length === n) {
      snap(null, null, { zh: '拓撲排序完成:' + order.map(L).join(' → '), en: 'Topological sort done: ' + order.map(L).join(' → ') });
    } else {
      var rem = []; for (i = 0; i < n; i++) if (order.indexOf(i) === -1) rem.push(i);
      snap(null, null, { zh: '偵測到環:節點 [' + rem.map(L).join(', ') + '] 無法排序', en: 'Cycle detected: nodes [' + rem.map(L).join(', ') + '] cannot be ordered' });
    }
    return frames;
  }

  function bellmanFordFrames(adj, n, source, labels) {
    function L(i) { return labels ? labels[i] : i; }
    var frames = [], dist = [], E = [], i, j;
    for (i = 0; i < n; i++) dist.push(Infinity);
    dist[source] = 0;
    for (i = 0; i < n; i++) for (j = 0; j < adj[i].length; j++) E.push({ u: i, v: adj[i][j].to, w: adj[i][j].w });
    function fmt(x) { return x === Infinity ? '∞' : x; }
    function snap(active, activeEdge, msg) {
      frames.push({ visited: [], frontier: [], active: active, activeEdge: activeEdge, dist: dist.slice(), order: [], message: msg });
    }
    snap(null, null, { zh: '起點 ' + L(source) + ' 距離 0,其餘 ∞;最多 ' + (n - 1) + ' 輪鬆弛', en: 'Source ' + L(source) + ' = 0, others ∞; up to ' + (n - 1) + ' relaxation passes' });
    for (var pass = 1; pass <= n - 1; pass++) {
      var changed = false;
      for (i = 0; i < E.length; i++) {
        var e = E[i], ae = { u: e.u, v: e.v };
        if (dist[e.u] !== Infinity && dist[e.u] + e.w < dist[e.v]) {
          dist[e.v] = dist[e.u] + e.w; changed = true;
          snap(e.v, ae, { zh: '第 ' + pass + ' 輪:鬆弛 ' + L(e.u) + '→' + L(e.v) + ',d[' + L(e.v) + ']=' + dist[e.v], en: 'Pass ' + pass + ': relax ' + L(e.u) + '→' + L(e.v) + ', d[' + L(e.v) + ']=' + dist[e.v] });
        } else {
          snap(null, ae, { zh: '第 ' + pass + ' 輪:' + L(e.u) + '→' + L(e.v) + ' 不更新(' + fmt(dist[e.u]) + '+' + e.w + ' ≥ ' + fmt(dist[e.v]) + ')', en: 'Pass ' + pass + ': ' + L(e.u) + '→' + L(e.v) + ' no update' });
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

  function adjMultilist(edges, n) {
    var nodes = [], chains = [], i;
    for (i = 0; i < n; i++) chains.push([]);
    for (i = 0; i < edges.length; i++) {
      var e = edges[i];
      nodes.push({ id: i, u: e.u, v: e.v });
      chains[e.u].push({ id: i, other: e.v });
      chains[e.v].push({ id: i, other: e.u });
    }
    for (i = 0; i < n; i++) chains[i].sort(function (a, b) { return a.other - b.other; });
    return { nodes: nodes, chains: chains };
  }

  var api = { parseEdges: parseEdges, layout: layout, DEFAULTS: DEFAULTS, bfsFrames: bfsFrames, dfsFrames: dfsFrames, dijkstraFrames: dijkstraFrames, kruskalFrames: kruskalFrames, primFrames: primFrames, boruvkaFrames: boruvkaFrames, topoFrames: topoFrames, bellmanFordFrames: bellmanFordFrames, adjMatrix: adjMatrix, adjMultilist: adjMultilist };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.GraphWorkbench = api;
})(typeof window !== 'undefined' ? window : globalThis);
