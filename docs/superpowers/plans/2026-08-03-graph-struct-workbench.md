# Graph Structural/Comparison Workbench (graph + adjlist + traversal) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `graph`, `graph-adjlist`, and `graph-traversal` to the graph workbench — edge-list input + 🎲 random + difficulty + examples — with `graph`=drawing+adjacency matrix, `graph-adjlist`=drawing+adjacency list, and `graph-traversal`=dual BFS|DFS panes driven by one synchronized VCR.

**Architecture:** Add a pure `adjMatrix` helper + 3 DEFAULTS; two new renders (`renderGraphStruct(methodId)`, `renderGraphTraversal()`) sharing a `drawUndirectedGraph` SVG helper; leave `renderGraphVcr` and the 7 converted methods untouched.

**Tech Stack:** Vanilla JS dual-export module, `K().buildFrameControls` VCR, Playwright + `node --test`.

## Global Constraints

- Do NOT modify `js/cloud-config.js` (keep `__PLACEHOLDER__`; if modified, `git checkout js/cloud-config.js`).
- Do NOT revert `tests/random_push.spec.js`. Do NOT remove the static `#graph-edges` element from `index.html`.
- Commit messages end with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Branch `feat/graph-struct-workbench` (already created off main @ de35bae). Never switch to main.
- No new method/category → counts unchanged. All new UI text + frame messages bilingual `{zh,en}`; module stays pure.
- These 3 methods are UNDIRECTED, UNWEIGHTED → `parseEdges(text, false, false)`.
- Module-level helpers already exist in `js/domains/graph.js`: `gwLoadExamples`, `gwSaveExample`, `gwExamplesOptionsHtml(methodId, def)`, `gwBuildExamplesSelect(methodId, def)`, `_gwState`. `GraphWorkbench` exposes `parseEdges`, `layout`, `bfsFrames`, `dfsFrames`, `DEFAULTS`.

---

### Task 1: `adjMatrix` helper + DEFAULTS + random dispatch

**Files:**
- Modify: `js/viz/viz_graph_workbench.js`, `js/random_input.js`
- Test: `tests/unit/graph_workbench.test.js` (append)

**Interfaces:**
- Produces: `adjMatrix(adj, n)` → `number[][]` (0/1); `DEFAULTS['graph'|'graph-adjlist'|'graph-traversal']`; `randomInputFor('graph'|'graph-adjlist'|'graph-traversal', d, rng)` → `{ text }`.

- [ ] **Step 1: Write failing unit tests** — append to `tests/unit/graph_workbench.test.js`:

```js
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
```

- [ ] **Step 2: Run, verify fail** — `node --test tests/unit/graph_workbench.test.js` → FAIL (`GW.adjMatrix` undefined; DEFAULTS keys missing; `randomInputFor` null → `.text` throws).

- [ ] **Step 3: Add `adjMatrix` + DEFAULTS** — in `js/viz/viz_graph_workbench.js`:

Add before the `api` line:
```js
  function adjMatrix(adj, n) {
    var m = [], i, j;
    for (i = 0; i < n; i++) { var row = []; for (j = 0; j < n; j++) row.push(0); m.push(row); }
    for (i = 0; i < n; i++) for (j = 0; j < adj[i].length; j++) m[i][adj[i][j].to] = 1;
    return m;
  }
```
Extend the `DEFAULTS` object (undirected pentagon, same as bfs):
```js
    'graph': '0 1\n1 2\n2 3\n3 4\n4 0\n0 2',
    'graph-adjlist': '0 1\n1 2\n2 3\n3 4\n4 0\n0 2',
    'graph-traversal': '0 1\n1 2\n2 3\n3 4\n4 0\n0 2'
```
Extend the `api` object with `adjMatrix: adjMatrix`.

- [ ] **Step 4: Add random dispatch** — in `js/random_input.js`, in `randomInputFor`'s switch, next to the other graph cases:
```js
      case 'graph':
      case 'graph-adjlist':
      case 'graph-traversal':
        return { text: graphEdgeList(rng, difficulty, false) };
```

- [ ] **Step 5: Run, verify pass** — `node --test tests/unit/graph_workbench.test.js` → all pass; `node --test tests/unit/*.test.js` → report count, no regressions; `node --check js/viz/viz_graph_workbench.js js/random_input.js`.

- [ ] **Step 6: Commit**
```bash
git add js/viz/viz_graph_workbench.js js/random_input.js tests/unit/graph_workbench.test.js
git commit -m "feat: adjMatrix helper + defaults + random dispatch for graph/adjlist/traversal

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: `drawUndirectedGraph` helper + `renderGraphStruct` (graph + adjlist)

**Files:**
- Modify: `js/domains/graph.js`, `style.css`

**Interfaces:**
- Consumes: `GraphWorkbench.parseEdges/layout/adjMatrix`, `gwBuildExamplesSelect`, `gwSaveExample`, `gwExamplesOptionsHtml`, `_gwState`.
- Produces: `drawUndirectedGraph(parsed, pos, frame)` → SVG inner-string (used here + by Task 3); `renderGraphStruct(methodId)`.

- [ ] **Step 1: Add `drawUndirectedGraph`** — add as a module-level function inside the IIFE in `js/domains/graph.js` (near `renderGraphVcr`). `frame` is optional (null for struct; a Frame for traversal):

```js
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
```

- [ ] **Step 2: Add `renderGraphStruct`** — add near `renderGraphVcr`:

```js
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
            langOf({ zh: '每行一條邊:u v', en: 'One edge per line: u v' }) + '"></textarea>' +
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
```

- [ ] **Step 3: Re-point the 2 attach lines** — change ONLY these (leave others):
```js
  R().attach('graph',         { render: () => renderGraphStruct('graph'),         code: () => codeGraph,        layout: { host: 'dynamic' } });
  R().attach('graph-adjlist', { render: () => renderGraphStruct('graph-adjlist'), code: () => codeGraphAdjlist, layout: { host: 'dynamic' } });
```

- [ ] **Step 4: CSS** — append to `style.css`:
```css
.gw-struct-grid { display: flex; gap: 1rem; flex-wrap: wrap; align-items: flex-start; }
.gw-struct-grid .gw-stage { flex: 1 1 320px; min-width: 0; }
.gw-rep { flex: 1 1 260px; min-width: 0; }
.gw-rep-title { font-size: 0.85rem; color: #94a3b8; margin-bottom: 0.4rem; }
.gw-matrix { border-collapse: collapse; font-family: ui-monospace, monospace; font-size: 0.85rem; }
.gw-matrix th, .gw-matrix td { border: 1px solid var(--border, #334155); padding: 2px 8px; text-align: center; color: var(--text, inherit); }
.gw-matrix th { color: #94a3b8; font-weight: 600; }
.gw-matrix td.on { background: #34d39933; color: #34d399; font-weight: 700; }
```
(If `.adjlist-*` rules already exist from the old adjlist, keep them; do not duplicate.)

- [ ] **Step 5: Verify** — `node --check js/domains/graph.js`; `git status --porcelain js/cloud-config.js` empty; `npm run test:all`. EXPECT the existing adjlist test (`tests/visualizer.spec.js` ~L235 "Adjacency List renders 5 rows") may still pass if it only checks `.adjlist-row` count 5 (default pentagon → 5 rows) — but the base `graph` and adjlist now render into the dynamic host. Report which tests fail (likely none for adjlist if it just counts rows; the traversal test is Task 3). Confirm no other regressions.

- [ ] **Step 6: Commit**
```bash
git add js/domains/graph.js style.css
git commit -m "feat: renderGraphStruct — graph (matrix) + adjlist (list) workbench views

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: `renderGraphTraversal` — dual BFS|DFS with one synchronized VCR

**Files:**
- Modify: `js/domains/graph.js`, `style.css` (if needed)

**Interfaces:**
- Consumes: `GraphWorkbench.bfsFrames`, `dfsFrames`, `parseEdges`, `layout`, `drawUndirectedGraph`, `K().buildFrameControls`.

- [ ] **Step 1: Add `renderGraphTraversal`** — add near `renderGraphStruct`:

```js
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
            langOf({ zh: '每行一條邊:u v', en: 'One edge per line: u v' }) + '"></textarea>' +
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
```

- [ ] **Step 2: Re-point the attach line**:
```js
  R().attach('graph-traversal', { render: renderGraphTraversal, code: () => codeGraphTraversal, layout: { host: 'dynamic' } });
```

- [ ] **Step 3: CSS (if needed)** — `.graph-dual-grid` may already exist from the old dual view; if it does, reuse it. Otherwise add:
```css
.graph-dual-grid { display: flex; gap: 1rem; flex-wrap: wrap; }
.graph-dual-grid .graph-dual-pane { flex: 1 1 300px; min-width: 0; }
.gw-pane-info { font-size: 0.8rem; color: #94a3b8; font-family: ui-monospace, monospace; margin-top: 0.3rem; }
```
(Grep `.graph-dual-grid` in style.css first; only add what's missing.)

- [ ] **Step 4: Verify** — `node --check js/domains/graph.js`; `git status --porcelain js/cloud-config.js` empty; `npm run test:all`. EXPECT the old traversal test (`tests/visualizer.spec.js` ~L261 "graph-traversal renders two dual panes") to still pass IF it only checks `.graph-dual-pane` count 2 (the new render keeps that class) — verify; if it asserts old-specific DOM it needs the Task 4 update. Report failing tests.

- [ ] **Step 5: Commit**
```bash
git add js/domains/graph.js style.css
git commit -m "feat: renderGraphTraversal — dual BFS|DFS with one synchronized VCR

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: E2E — workbench tests + update stale graph/adjlist/traversal assertions

**Files:**
- Modify: `tests/graph_workbench.spec.js`, `tests/visualizer.spec.js`

- [ ] **Step 1: Read the existing tests** — `tests/visualizer.spec.js` adjlist test (~L235 "Graphs: Adjacency List renders 5 rows") and traversal test (~L261 "graph-traversal renders two dual panes (BFS & DFS)"). Keep them if they already pass with the new render (both keep `.adjlist-row` and `.graph-dual-pane`); otherwise adjust selectors to the new workbench while keeping the `.code-panel-filename` checks. Run them first to see.

- [ ] **Step 2: Add workbench E2E** — append to `tests/graph_workbench.spec.js` (READ its structure/imports first):

```js
  test('graph: workbench renders drawing + adjacency matrix, no VCR', async ({ page }) => {
    await loadMethod(page, 'graph');
    const sec = page.locator('[data-method-section="graph"]');
    await expect(sec.locator('[data-testid="gw-input"]')).toBeVisible();
    await expect(sec.locator('.gw-svg .graph-node')).toHaveCount(5);
    await expect(sec.locator('.gw-matrix')).toBeVisible();
    await expect(sec.locator('.stepctl')).toHaveCount(0);       // structural view: no VCR
    await expect(sec.locator('[data-testid="gw-source"]')).toHaveCount(0);
  });

  test('graph-adjlist: workbench renders drawing + adjacency list rows', async ({ page }) => {
    await loadMethod(page, 'graph-adjlist');
    const sec = page.locator('[data-method-section="graph-adjlist"]');
    await expect(sec.locator('.gw-svg .graph-node')).toHaveCount(5);
    await expect(sec.locator('.adjlist-row')).toHaveCount(5);
    await expect(sec.locator('.stepctl')).toHaveCount(0);
  });

  test('graph-traversal: dual panes driven by one synchronized VCR', async ({ page }) => {
    await loadMethod(page, 'graph-traversal');
    const sec = page.locator('[data-method-section="graph-traversal"]');
    await expect(sec.locator('.graph-dual-pane')).toHaveCount(2);
    await expect(sec.locator('.stepctl')).toHaveCount(1);        // ONE shared transport
    await expect(sec.locator('[data-testid="gw-source"]')).toHaveCount(1);
    await expect(sec.locator('.gw-svg-bfs .graph-node')).toHaveCount(5);
    await expect(sec.locator('.gw-svg-dfs .graph-node')).toHaveCount(5);
    const cnt = sec.locator('.stepctl-count');
    const before = await cnt.textContent();
    await sec.locator('.stepctl [data-action="step"]').click();
    await expect(cnt).not.toHaveText(before);
  });

  test('graph/adjlist/traversal: random fills input and rebuilds', async ({ page }) => {
    for (const id of ['graph', 'graph-adjlist', 'graph-traversal']) {
      await loadMethod(page, id);
      const sec = page.locator('[data-method-section="' + id + '"]');
      await sec.locator('.rand-btn').click();
      await expect(sec.locator('[data-testid="gw-input"]')).not.toHaveValue('');
      await expect(sec.locator('.gw-svg .graph-node').first()).toBeVisible();
    }
  });
```

- [ ] **Step 3: Update the stale visualizer.spec tests** — apply whatever the Step-1 run showed is needed. Likely the adjlist test still passes (`.adjlist-row` count 5), and the traversal test still passes (`.graph-dual-pane` count 2). If either asserts removed DOM (e.g. `[data-testid="bfs-queue"]` in the old dual pane), rewrite that assertion to the new workbench selector, keeping the filename check. Do NOT weaken assertions to hide a real bug.

- [ ] **Step 4: Run + iterate to green**

Run: `npx playwright test tests/graph_workbench.spec.js tests/visualizer.spec.js` → green.
Run: `npm run test:all` → 0 failures (report pass count). Confirm count/i18n/nav tests unchanged and `git status --porcelain js/cloud-config.js` empty.

- [ ] **Step 5: Commit**
```bash
git add tests/graph_workbench.spec.js tests/visualizer.spec.js
git commit -m "test: E2E for graph/adjlist/traversal workbench; update stale assertions

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

- **Spec coverage:** Task 1 (adjMatrix + defaults + random), Task 2 (drawUndirectedGraph + renderGraphStruct: matrix/list), Task 3 (renderGraphTraversal: dual + single VCR), Task 4 (E2E) — all spec sections covered.
- **Placeholder scan:** none — real code/commands throughout.
- **Type consistency:** `adjMatrix(adj, n)` matches export + usage; `drawUndirectedGraph(parsed, pos, frame)` defined in Task 2 Step 1, used by both renders (Task 2 + Task 3); `_gwState` and `gw*` helpers are module-level (confirmed). Traversal uses `Array.from({length:L})` frames + `Math.min(i, len-1)` clamp; `paint(_f, i)` signature matches `buildFrameControls`.
- **No regression:** only 3 attach lines re-pointed; `renderGraphVcr` and the 7 converted methods untouched; `#graph-edges` static element kept. Undirected `parseEdges(text,false,false)` path unchanged.
- **Counts:** pentagon defaults (n=5) keep `.adjlist-row`=5 and node counts=5; no new method/category.
