(function (global) {
  const K = () => global.VizKit;
  const C = () => global.VizCore;
  const R = () => global.VizRegistry;

  function renderFloydWarshall() {
    const host = K().acquireDynamicVizHost();
    const V = 4;
    const labels = ['A', 'B', 'C', 'D'];
    const INF = Infinity;
    const init = [
      [0, 3, INF, 7],
      [8, 0, 2, INF],
      [5, INF, 0, 1],
      [2, INF, INF, 0],
    ];
    const frames = [{ k: -1, dist: init.map((r) => r.slice()), changed: [],
        msg: 'initial distance matrix (direct edges only)' }];
    let dist = init.map((r) => r.slice());
    for (let k = 0; k < V; k++) {
      const changed = [];
      const next = dist.map((r) => r.slice());
      for (let i = 0; i < V; i++) {
        for (let j = 0; j < V; j++) {
          if (dist[i][k] + dist[k][j] < dist[i][j]) {
            next[i][j] = dist[i][k] + dist[k][j];
            changed.push(i + ',' + j);
          }
        }
      }
      dist = next;
      frames.push({ k: k, dist: dist.map((r) => r.slice()), changed: changed,
          msg: 'k = ' + k + '  (' + labels[k] + ' as intermediate) — ' +
               changed.length + ' cell(s) improved' });
    }
    const wrap = document.createElement('div');
    wrap.className = 'floyd-wrap';
    wrap.innerHTML =
        '<div class="floyd-grid"></div>' +
        '<div class="floyd-msg" data-testid="floyd-msg">&nbsp;</div>';
    host.appendChild(wrap);
    const gridEl = wrap.querySelector('.floyd-grid');
    const msgEl = wrap.querySelector('.floyd-msg');

    function draw(f) {
      let html = '<div class="floyd-hcell"></div>';
      for (let j = 0; j < V; j++) {
        html += '<div class="floyd-hcell' + (j === f.k ? ' floyd-pivot' : '') + '">' +
                labels[j] + '</div>';
      }
      for (let i = 0; i < V; i++) {
        html += '<div class="floyd-hcell' + (i === f.k ? ' floyd-pivot' : '') + '">' +
                labels[i] + '</div>';
        for (let j = 0; j < V; j++) {
          const val = f.dist[i][j] === INF ? '∞' : f.dist[i][j];
          const cls = 'floyd-cell' +
              (f.changed.indexOf(i + ',' + j) >= 0 ? ' floyd-changed' : '') +
              ((i === f.k || j === f.k) ? ' floyd-pivotline' : '');
          html += '<div class="' + cls + '" data-cell="' + i + '-' + j + '">' + val + '</div>';
        }
      }
      gridEl.innerHTML = html;
      msgEl.textContent = f.msg;
    }
    wrap.appendChild(K().buildFrameControls(frames, draw, { runIntervalMs: 800 }));
  }

  // ---- Graph workbench (edge-list + VCR) : pilot bfs/dfs/dijkstra ----
  function gwLoadExamples(methodId) { try { return ExamplesStore.load(localStorage, methodId); } catch (e) { return []; } }
  function gwSaveExample(methodId, text, def) { try { ExamplesStore.save(localStorage, methodId, text, def); } catch (e) { /* ignore */ } }
  function gwExamplesOptionsHtml(methodId, defaultText) {
    const langOf = K().langOf;
    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    const trunc = (s) => { s = String(s).replace(/\n/g, ' '); return s.length > 24 ? s.slice(0, 24) + '…' : s; };
    let h = '<option value="">' + langOf({ zh: '範例…', en: 'Examples…' }) + '</option>';
    h += '<option value="' + esc(defaultText) + '">' + langOf({ zh: '預設', en: 'Default' }) + '</option>';
    gwLoadExamples(methodId).forEach((e) => { h += '<option value="' + esc(e.text) + '">' + esc(trunc(e.text)) + '</option>'; });
    return h;
  }
  function gwBuildExamplesSelect(methodId, defaultText) {
    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    return '<select class="ex-select" data-method="' + esc(methodId) + '">' +
      gwExamplesOptionsHtml(methodId, defaultText) + '</select>';
  }

  const GW_META = {
    'graph-bfs':      { weighted: false, usesSource: true,  gen: (p, s) => GraphWorkbench.bfsFrames(p.adj, s) },
    'graph-dfs':      { weighted: false, usesSource: true,  gen: (p, s) => GraphWorkbench.dfsFrames(p.adj, s) },
    'graph-dijkstra': { weighted: true,  usesSource: true,  gen: (p, s) => GraphWorkbench.dijkstraFrames(p.adj, s) },
    'graph-kruskal':  { weighted: true,  usesSource: false, gen: (p, s) => GraphWorkbench.kruskalFrames(p.edges, p.n) },
    'graph-prim':     { weighted: true,  usesSource: true,  gen: (p, s) => GraphWorkbench.primFrames(p.adj, s) },
    'graph-topo':         { weighted: false, directed: true, usesSource: false, gen: (p, s) => GraphWorkbench.topoFrames(p.adj, p.n) },
    'graph-bellman-ford': { weighted: true,  directed: true, usesSource: true,  gen: (p, s) => GraphWorkbench.bellmanFordFrames(p.adj, p.n, s) },
  };
  let _gwState = {};

  function drawUndirectedGraph(parsed, pos, frame) {
    const has = (arr, x) => !!arr && arr.indexOf(x) !== -1;
    const ae = frame && frame.activeEdge ? frame.activeEdge : null;
    let s = '';
    for (const e of parsed.edges) {
      const isActive = ae && ae.u === e.u && ae.v === e.v;
      s += '<line class="graph-edge' + (isActive ? ' active' : '') + '" x1="' + pos[e.u].x + '" y1="' + pos[e.u].y + '" x2="' + pos[e.v].x + '" y2="' + pos[e.v].y + '"></line>';
    }
    for (let k = 0; k < parsed.n; k++) {
      let cls = 'graph-node';
      if (frame) { if (frame.active === k) cls += ' active'; else if (has(frame.visited, k)) cls += ' visited'; else if (has(frame.frontier, k)) cls += ' frontier'; }
      s += '<circle class="' + cls + '" cx="' + pos[k].x + '" cy="' + pos[k].y + '" r="18"></circle>';
      s += '<text class="graph-node-label" x="' + pos[k].x + '" y="' + pos[k].y + '">' + k + '</text>';
    }
    return s;
  }

  function renderGraphVcr(methodId) {
    const host = K().acquireDynamicVizHost();
    host.style.width = '100%';
    const langOf = K().langOf;
    const meta = GW_META[methodId];
    const DEF = GraphWorkbench.DEFAULTS[methodId];
    const st = _gwState[methodId] || (_gwState[methodId] = { text: DEF, source: 0 });

    const sourceCtl = (meta.usesSource === false) ? '' :
      '<label class="gw-src-lbl">' + langOf({ zh: '起點', en: 'Source' }) + ' <select class="gw-source" data-testid="gw-source"></select></label>';

    host.innerHTML =
      '<div class="gw" data-testid="gw">' +
        '<div class="gw-toolbar">' +
          '<textarea class="gw-input" data-testid="gw-input" rows="3" spellcheck="false" placeholder="' +
            langOf({ zh: '邊以逗號或換行分隔:' + (meta.weighted ? 'u-v:w(例 0-1:4)' : 'u-v(例 0-1,1-2)'), en: 'Edges by comma or newline: ' + (meta.weighted ? 'u-v:w (e.g. 0-1:4)' : 'u-v (e.g. 0-1,1-2)') }) + '"></textarea>' +
          '<div class="gw-btns">' +
            '<button type="button" class="btn primary gw-build" data-testid="gw-build">' + langOf({ zh: '建立', en: 'Build' }) + '</button>' +
            '<button type="button" class="rand-btn" title="' + langOf({ zh: '隨機', en: 'Random' }) + '">🎲</button>' +
            gwBuildExamplesSelect(methodId, DEF) +
            sourceCtl +
          '</div>' +
          '<div class="gw-err" data-testid="gw-err" style="display:none"></div>' +
        '</div>' +
        '<div class="gw-body"></div>' +
      '</div>';

    const input = host.querySelector('.gw-input');
    const srcSel = host.querySelector('.gw-source');
    const errEl = host.querySelector('.gw-err');
    const body = host.querySelector('.gw-body');
    input.value = st.text;

    function rebuildSource(n) {
      srcSel.innerHTML = '';
      for (let k = 0; k < n; k++) { const o = document.createElement('option'); o.value = k; o.textContent = k; srcSel.appendChild(o); }
      if (st.source >= n) st.source = 0;
      srcSel.value = st.source;
    }

    function rebuild() {
      const parsed = GraphWorkbench.parseEdges(st.text, meta.weighted, meta.directed);
      if (!parsed.ok) { errEl.textContent = langOf(parsed.error); errEl.style.display = ''; body.innerHTML = ''; return; }
      errEl.style.display = 'none';
      if (srcSel) rebuildSource(parsed.n);
      const frames = meta.gen(parsed, st.source);
      const pos = GraphWorkbench.layout(parsed.n, 300, 200, 150);

      body.innerHTML =
        '<div class="gw-stepdesc" data-testid="gw-stepdesc"></div>' +
        '<div class="gw-stage"><svg class="gw-svg" data-testid="gw-svg" viewBox="0 0 600 400"></svg></div>';
      const svg = body.querySelector('.gw-svg');
      const descEl = body.querySelector('.gw-stepdesc');

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

      body.appendChild(K().buildFrameControls(frames, draw, { runIntervalMs: 700 }));
    }

    function applyText(text) {
      st.text = text; input.value = text;
      const parsed = GraphWorkbench.parseEdges(text, meta.weighted, meta.directed);
      if (parsed.ok) { gwSaveExample(methodId, text, DEF); refreshExamplesSelect(); }
      rebuild();
    }

    // Re-populate the examples <select> from localStorage without disturbing the
    // rest of the toolbar (input text, source picker) — needed because a
    // successful build/random-fill saves a new example and it should be pickable
    // again in the same session, not only after the workbench fully re-renders
    // (e.g. on a language switch).
    function refreshExamplesSelect() {
      if (!exSel) return;
      const cur = exSel.value;
      exSel.innerHTML = gwExamplesOptionsHtml(methodId, DEF);
      exSel.value = cur;
    }

    host.querySelector('.gw-build').addEventListener('click', () => applyText(input.value));
    host.querySelector('.rand-btn').addEventListener('click', () => {
      const r = window.RandomInput && RandomInput.randomInputFor(methodId, K().getInputDifficulty());
      if (r && r.text) applyText(r.text);
    });
    if (srcSel) srcSel.addEventListener('change', () => { st.source = +srcSel.value; rebuild(); });
    const exSel = host.querySelector('.ex-select');
    if (exSel) exSel.addEventListener('change', (ev) => { const v = ev.target.value; if (v) applyText(v); });

    rebuild();
  }

  function renderGraphStruct(methodId) {
    const host = K().acquireDynamicVizHost();
    host.style.width = '100%';
    const langOf = K().langOf;
    const view = methodId === 'graph' ? 'matrix' : 'list';
    const DEF = GraphWorkbench.DEFAULTS[methodId];
    const st = _gwState[methodId] || (_gwState[methodId] = { text: DEF });

    host.innerHTML =
      '<div class="gw" data-testid="gw">' +
        '<div class="gw-toolbar">' +
          '<textarea class="gw-input" data-testid="gw-input" rows="3" spellcheck="false" placeholder="' +
            langOf({ zh: '邊以逗號或換行分隔:u-v(例 0-1,1-2)', en: 'Edges by comma or newline: u-v (e.g. 0-1,1-2)' }) + '"></textarea>' +
          '<div class="gw-btns">' +
            '<button type="button" class="btn primary gw-build" data-testid="gw-build">' + langOf({ zh: '建立', en: 'Build' }) + '</button>' +
            '<button type="button" class="rand-btn" title="' + langOf({ zh: '隨機', en: 'Random' }) + '">🎲</button>' +
            gwBuildExamplesSelect(methodId, DEF) +
          '</div>' +
          '<div class="gw-err" data-testid="gw-err" style="display:none"></div>' +
        '</div>' +
        '<div class="gw-struct-body"></div>' +
      '</div>';

    const input = host.querySelector('.gw-input');
    const errEl = host.querySelector('.gw-err');
    const body = host.querySelector('.gw-struct-body');
    input.value = st.text;

    function rebuild() {
      const parsed = GraphWorkbench.parseEdges(st.text, false, false);
      if (!parsed.ok) { errEl.textContent = langOf(parsed.error); errEl.style.display = ''; body.innerHTML = ''; return; }
      errEl.style.display = 'none';
      const pos = GraphWorkbench.layout(parsed.n, 300, 200, 150);
      let rep = '';
      if (view === 'matrix') {
        const m = GraphWorkbench.adjMatrix(parsed.adj, parsed.n);
        rep = '<div class="gw-rep-title">' + langOf({ zh: '鄰接矩陣', en: 'Adjacency matrix' }) + '</div><table class="gw-matrix"><tr><th></th>';
        for (let j = 0; j < parsed.n; j++) rep += '<th>' + j + '</th>';
        rep += '</tr>';
        for (let i = 0; i < parsed.n; i++) {
          rep += '<tr><th>' + i + '</th>';
          for (let j = 0; j < parsed.n; j++) rep += '<td class="' + (m[i][j] ? 'on' : '') + '">' + m[i][j] + '</td>';
          rep += '</tr>';
        }
        rep += '</table>';
      } else {
        rep = '<div class="gw-rep-title">' + langOf({ zh: '鄰接串列', en: 'Adjacency list' }) + '</div><div class="adjlist-container">';
        for (let i = 0; i < parsed.n; i++) {
          rep += '<div class="adjlist-row"><span class="adjlist-vertex">[' + i + ']</span>';
          for (const nb of parsed.adj[i]) rep += '<span class="adjlist-arrow">→</span><span class="adjlist-node">' + nb.to + '</span>';
          rep += '<span class="adjlist-arrow">→</span><span class="adjlist-null">null</span></div>';
        }
        rep += '</div>';
      }
      body.innerHTML =
        '<div class="gw-struct-grid">' +
          '<div class="gw-stage"><svg class="gw-svg" data-testid="gw-svg" viewBox="0 0 600 400">' + drawUndirectedGraph(parsed, pos, null) + '</svg></div>' +
          '<div class="gw-rep">' + rep + '</div>' +
        '</div>';
    }

    function refreshEx() { const ex = host.querySelector('.ex-select'); if (!ex) return; const c = ex.value; ex.innerHTML = gwExamplesOptionsHtml(methodId, DEF); ex.value = c; }
    function applyText(text) {
      st.text = text; input.value = text;
      const parsed = GraphWorkbench.parseEdges(text, false, false);
      if (parsed.ok) { gwSaveExample(methodId, text, DEF); refreshEx(); }
      rebuild();
    }

    host.querySelector('.gw-build').addEventListener('click', () => applyText(input.value));
    host.querySelector('.rand-btn').addEventListener('click', () => {
      const r = window.RandomInput && RandomInput.randomInputFor(methodId, K().getInputDifficulty());
      if (r && r.text) applyText(r.text);
    });
    const exSel = host.querySelector('.ex-select');
    if (exSel) exSel.addEventListener('change', (ev) => { const v = ev.target.value; if (v) applyText(v); });

    rebuild();
  }

  function renderGraphTraversal() {
    const methodId = 'graph-traversal';
    const host = K().acquireDynamicVizHost();
    host.style.width = '100%';
    const langOf = K().langOf;
    const DEF = GraphWorkbench.DEFAULTS[methodId];
    const st = _gwState[methodId] || (_gwState[methodId] = { text: DEF, source: 0 });

    host.innerHTML =
      '<div class="gw" data-testid="gw">' +
        '<div class="gw-toolbar">' +
          '<textarea class="gw-input" data-testid="gw-input" rows="3" spellcheck="false" placeholder="' +
            langOf({ zh: '邊以逗號或換行分隔:u-v(例 0-1,1-2)', en: 'Edges by comma or newline: u-v (e.g. 0-1,1-2)' }) + '"></textarea>' +
          '<div class="gw-btns">' +
            '<button type="button" class="btn primary gw-build" data-testid="gw-build">' + langOf({ zh: '建立', en: 'Build' }) + '</button>' +
            '<button type="button" class="rand-btn" title="' + langOf({ zh: '隨機', en: 'Random' }) + '">🎲</button>' +
            gwBuildExamplesSelect(methodId, DEF) +
            '<label class="gw-src-lbl">' + langOf({ zh: '起點', en: 'Source' }) + ' <select class="gw-source" data-testid="gw-source"></select></label>' +
          '</div>' +
          '<div class="gw-err" data-testid="gw-err" style="display:none"></div>' +
        '</div>' +
        '<div class="gw-dual-body"></div>' +
      '</div>';

    const input = host.querySelector('.gw-input');
    const srcSel = host.querySelector('.gw-source');
    const errEl = host.querySelector('.gw-err');
    const body = host.querySelector('.gw-dual-body');
    input.value = st.text;

    function rebuildSource(n) {
      srcSel.innerHTML = '';
      for (let k = 0; k < n; k++) { const o = document.createElement('option'); o.value = k; o.textContent = k; srcSel.appendChild(o); }
      if (st.source >= n) st.source = 0;
      srcSel.value = st.source;
    }

    function rebuild() {
      const parsed = GraphWorkbench.parseEdges(st.text, false, false);
      if (!parsed.ok) { errEl.textContent = langOf(parsed.error); errEl.style.display = ''; body.innerHTML = ''; return; }
      errEl.style.display = 'none';
      rebuildSource(parsed.n);
      const pos = GraphWorkbench.layout(parsed.n, 300, 200, 150);
      const bfs = GraphWorkbench.bfsFrames(parsed.adj, st.source);
      const dfs = GraphWorkbench.dfsFrames(parsed.adj, st.source);
      const L = Math.max(bfs.length, dfs.length);

      body.innerHTML =
        '<div class="graph-dual-grid">' +
          '<div class="graph-dual-pane" data-pane="bfs"><h4>' + langOf({ zh: 'BFS(佇列)', en: 'BFS (queue)' }) + '</h4>' +
            '<div class="gw-stage"><svg class="gw-svg gw-svg-bfs" viewBox="0 0 600 400"></svg></div><div class="gw-pane-info gw-info-bfs"></div></div>' +
          '<div class="graph-dual-pane" data-pane="dfs"><h4>' + langOf({ zh: 'DFS(堆疊)', en: 'DFS (stack)' }) + '</h4>' +
            '<div class="gw-stage"><svg class="gw-svg gw-svg-dfs" viewBox="0 0 600 400"></svg></div><div class="gw-pane-info gw-info-dfs"></div></div>' +
        '</div>' +
        '<div class="gw-stepdesc" data-testid="gw-stepdesc"></div>';
      const svgBfs = body.querySelector('.gw-svg-bfs'), svgDfs = body.querySelector('.gw-svg-dfs');
      const infoBfs = body.querySelector('.gw-info-bfs'), infoDfs = body.querySelector('.gw-info-dfs');
      const descEl = body.querySelector('.gw-stepdesc');

      function paint(_f, i) {
        const fb = bfs[Math.min(i, bfs.length - 1)], fd = dfs[Math.min(i, dfs.length - 1)];
        svgBfs.innerHTML = drawUndirectedGraph(parsed, pos, fb);
        svgDfs.innerHTML = drawUndirectedGraph(parsed, pos, fd);
        infoBfs.textContent = langOf({ zh: '佇列', en: 'Queue' }) + ': [' + fb.frontier.join(', ') + ']  ' + langOf({ zh: '已訪', en: 'Visited' }) + ': [' + fb.order.join(', ') + ']';
        infoDfs.textContent = langOf({ zh: '堆疊', en: 'Stack' }) + ': [' + fd.frontier.join(', ') + ']  ' + langOf({ zh: '已訪', en: 'Visited' }) + ': [' + fd.order.join(', ') + ']';
        descEl.textContent = 'BFS: ' + langOf(fb.message) + '   |   DFS: ' + langOf(fd.message);
      }
      body.appendChild(K().buildFrameControls(Array.from({ length: L }), paint, { runIntervalMs: 700 }));
    }

    function refreshEx() { const ex = host.querySelector('.ex-select'); if (!ex) return; const c = ex.value; ex.innerHTML = gwExamplesOptionsHtml(methodId, DEF); ex.value = c; }
    function applyText(text) {
      st.text = text; input.value = text;
      const parsed = GraphWorkbench.parseEdges(text, false, false);
      if (parsed.ok) { gwSaveExample(methodId, text, DEF); refreshEx(); }
      rebuild();
    }

    host.querySelector('.gw-build').addEventListener('click', () => applyText(input.value));
    host.querySelector('.rand-btn').addEventListener('click', () => {
      const r = window.RandomInput && RandomInput.randomInputFor(methodId, K().getInputDifficulty());
      if (r && r.text) applyText(r.text);
    });
    srcSel.addEventListener('change', () => { st.source = +srcSel.value; rebuild(); });
    const exSel = host.querySelector('.ex-select');
    if (exSel) exSel.addEventListener('change', (ev) => { const v = ev.target.value; if (v) applyText(v); });

    rebuild();
  }

  R().attach('graph',         { render: () => renderGraphStruct('graph'),         code: () => codeGraph,        layout: { host: 'dynamic' } });
  R().attach('graph-adjlist', { render: () => renderGraphStruct('graph-adjlist'), code: () => codeGraphAdjlist, layout: { host: 'dynamic' } });
  R().attach('graph-traversal', { render: renderGraphTraversal, code: () => codeGraphTraversal, layout: { host: 'dynamic' } });
  R().attach('graph-bfs',      { render: () => renderGraphVcr('graph-bfs'),      code: () => codeGraphBFS,      layout: { host: 'dynamic' } });
  R().attach('graph-dfs',      { render: () => renderGraphVcr('graph-dfs'),      code: () => codeGraphDFS,      layout: { host: 'dynamic' } });
  R().attach('graph-kruskal', { render: () => renderGraphVcr('graph-kruskal'), code: () => codeGraphKruskal, layout: { host: 'dynamic' } });
  R().attach('graph-dijkstra', { render: () => renderGraphVcr('graph-dijkstra'), code: () => codeGraphDijkstra, layout: { host: 'dynamic' } });
  R().attach('graph-topo',         { render: () => renderGraphVcr('graph-topo'),         code: () => codeGraphTopo,        layout: { host: 'dynamic' } });
  R().attach('graph-prim', { render: () => renderGraphVcr('graph-prim'), code: () => codeGraphPrim, layout: { host: 'dynamic' } });
  R().attach('graph-bellman-ford', { render: () => renderGraphVcr('graph-bellman-ford'), code: () => codeGraphBellmanFord, layout: { host: 'dynamic' } });
  R().attach('graph-floyd-warshall', { render: renderFloydWarshall, code: () => codeGraphFloydWarshall, layout: { host: 'dynamic' } });
  C().registerDomain({ id: 'graph' });
})(typeof window !== 'undefined' ? window : globalThis);
