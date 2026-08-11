(function (global) {
  var AHO_DEFAULT_PATTERNS = ['he', 'she', 'his', 'hers'];
  var AHO_DEFAULT_TEXT = 'ushers';

  function ahoFrames(patterns, text) {
    patterns = (patterns || []).filter(function (p) { return p && p.length; });
    text = text || '';

    // 1. build trie
    var nodes = [{ id: 0, ch: '', parent: -1, depth: 0, children: {}, out: [] }];
    for (var pi = 0; pi < patterns.length; pi++) {
      var p = patterns[pi], cur = 0;
      for (var c = 0; c < p.length; c++) {
        var ch = p[c];
        if (nodes[cur].children[ch] === undefined) {
          var id = nodes.length;
          nodes.push({ id: id, ch: ch, parent: cur, depth: nodes[cur].depth + 1, children: {}, out: [] });
          nodes[cur].children[ch] = id;
        }
        cur = nodes[cur].children[ch];
      }
      if (nodes[cur].out.indexOf(p) < 0) nodes[cur].out.push(p);
    }

    // 2. BFS failure links
    var fail = new Array(nodes.length).fill(0);
    var failSteps = [], queue = [];
    var rk = Object.keys(nodes[0].children);
    for (var i = 0; i < rk.length; i++) { fail[nodes[0].children[rk[i]]] = 0; queue.push(nodes[0].children[rk[i]]); }
    while (queue.length) {
      var u = queue.shift();
      failSteps.push({ node: u, fail: fail[u] });
      var keys = Object.keys(nodes[u].children);
      for (var ki = 0; ki < keys.length; ki++) {
        var chc = keys[ki], v = nodes[u].children[chc];
        queue.push(v);
        var f = fail[u];
        while (f !== 0 && nodes[f].children[chc] === undefined) f = fail[f];
        var nf = nodes[f].children[chc];
        fail[v] = (nf !== undefined && nf !== v) ? nf : 0;
      }
    }

    // 3. scan
    var scanSteps = [], cur2 = 0, cum = [];
    for (var t = 0; t < text.length; t++) {
      var tch = text[t];
      while (cur2 !== 0 && nodes[cur2].children[tch] === undefined) cur2 = fail[cur2];
      cur2 = nodes[cur2].children[tch] !== undefined ? nodes[cur2].children[tch] : 0;
      var node = cur2;
      while (node !== 0) {
        for (var oi = 0; oi < nodes[node].out.length; oi++) { var pat = nodes[node].out[oi]; cum.push(pat + '@' + (t - pat.length + 1)); }
        node = fail[node];
      }
      scanSteps.push({ node: cur2, matches: cum.slice(), pos: t });
    }

    // 4. layout (x,y): leaves get consecutive columns, internal = mean of children
    var leaf = 0;
    (function assign(idn) {
      var kids = Object.keys(nodes[idn].children).map(function (k) { return nodes[idn].children[k]; });
      if (kids.length === 0) { nodes[idn].gx = leaf++; }
      else { var sum = 0; for (var q = 0; q < kids.length; q++) { assign(kids[q]); sum += nodes[kids[q]].gx; } nodes[idn].gx = sum / kids.length; }
    })(0);
    var maxDepth = 0; for (var d = 0; d < nodes.length; d++) maxDepth = Math.max(maxDepth, nodes[d].depth);
    var SPX = 64, SPY = 68, MX = 30, MY = 26;
    for (var e = 0; e < nodes.length; e++) { nodes[e].x = MX + nodes[e].gx * SPX; nodes[e].y = MY + nodes[e].depth * SPY; }
    var viewBox = { w: MX * 2 + Math.max(1, leaf) * SPX, h: MY * 2 + (maxDepth + 1) * SPY };

    // 5. frames
    var F = failSteps.length, frames = [];
    for (var b = 0; b <= F; b++) {
      var buildCur = b < F ? failSteps[b].node : -1, msg;
      if (b === 0) msg = { zh: '建構 trie 完成,開始以 BFS 計算失敗連結', en: 'Trie built; computing failure links via BFS' };
      else { var fsp = failSteps[b - 1]; msg = { zh: '失敗連結:節點 ' + fsp.node + ' → ' + fsp.fail, en: 'Failure link: node ' + fsp.node + ' → ' + fsp.fail }; }
      frames.push({ phase: 'fail', builtCount: b, buildCur: buildCur, scanIdx: -1, curNode: buildCur >= 0 ? buildCur : 0, matches: [], message: msg });
    }
    for (var s = 0; s < text.length; s++) {
      var ss = scanSteps[s];
      var prevLen = s === 0 ? 0 : scanSteps[s - 1].matches.length;
      var mnew = ss.matches.slice(prevLen);
      frames.push({ phase: 'scan', builtCount: F, buildCur: -1, scanIdx: s, curNode: ss.node, matches: ss.matches.slice(),
        message: { zh: '讀取 text[' + s + ']=\'' + text[s] + '\' → 狀態節點 ' + ss.node + (mnew.length ? ',命中 ' + mnew.join(', ') : ''),
                   en: 'Read text[' + s + ']=\'' + text[s] + '\' → state ' + ss.node + (mnew.length ? '; matched ' + mnew.join(', ') : '') } });
    }

    return { nodes: nodes, failSteps: failSteps, text: text, viewBox: viewBox, frames: frames };
  }

  var api = { ahoFrames: ahoFrames, AHO_DEFAULT_PATTERNS: AHO_DEFAULT_PATTERNS, AHO_DEFAULT_TEXT: AHO_DEFAULT_TEXT };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.AhoFrames = api;
})(typeof window !== 'undefined' ? window : globalThis);
