# Graph Directed/Undirected Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Add a directed/undirected toggle button to 6 currently-undirected workbench viz (`graph`, `graph-adjlist`, `graph-traversal`, `graph-bfs`, `graph-dfs`, `graph-dijkstra`), default undirected, flipping structure + arrow rendering live. Kruskal/Prim excluded (MST is undirected-only); Dijkstra keeps positive weights in both modes.

**Architecture:** Runtime `st.directed` per method + a `GW_DIRECTED_TOGGLE` set; `parseEdges` gains an `allowNegative` param to decouple negative-weight allowance from `directed`; `drawUndirectedGraph` becomes directed-aware for struct/traversal (renderGraphVcr keeps its own arrow logic).

**Tech Stack:** Vanilla JS dual-export module, Playwright + `node --test`.

## Global Constraints

- Do NOT modify `js/cloud-config.js` / `tests/random_push.spec.js` / graph-scc et al.
- Commit messages end with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Branch `feat/graph-directed-toggle` (off main @ 344f6bb). Never switch to main.
- No new method/category → counts unchanged. UI text bilingual `{zh,en}`; module stays pure.
- Toggle set = `graph`, `graph-adjlist`, `graph-traversal`, `graph-bfs`, `graph-dfs`, `graph-dijkstra` ONLY.

---

### Task 1: `parseEdges` — decouple negatives via `allowNegative`

**Files:** Modify `js/viz/viz_graph_workbench.js`; Test `tests/unit/graph_workbench.test.js`.

- [ ] **Step 1: Update failing/affected unit tests** — in `tests/unit/graph_workbench.test.js`, find every `parseEdges(..., true, true)` that relies on directed→negatives (the directed-negative test, the CLRS bellman default parse, the bellman-frames tests, and the random topo/bellman connectivity test) and add a 4th arg `true` where negatives must be allowed (Bellman-Ford cases). Add these new assertions:
```js
test('parseEdges allowNegative decouples negatives from directed', () => {
  assert.strictEqual(GW.parseEdges('0-1:-4', true, false, false).ok, false); // undirected weighted: w>=1
  assert.strictEqual(GW.parseEdges('0-1:-4', true, true, false).ok, false);  // directed dijkstra-style: still w>=1
  assert.ok(GW.parseEdges('0-1:-4', true, true, true).ok);                    // bellman-ford: negatives allowed
});
```

- [ ] **Step 2: Run, see the directed-negative expectations flip** — `node --test tests/unit/graph_workbench.test.js` → the new test fails (2nd case currently ok), and any bellman test not yet passing `true` fails.

- [ ] **Step 3: Add the param** — in `parseEdges`, change the signature to `function parseEdges(text, weighted, directed, allowNegative) {` and change the weight-sign rule line from
```js
      if (weighted && !directed && w < 1) return { ok: false, error: { zh: '權重需 ≥ 1', en: 'Weight must be ≥ 1' } };
```
to
```js
      if (weighted && !allowNegative && w < 1) return { ok: false, error: { zh: '權重需 ≥ 1', en: 'Weight must be ≥ 1' } };
```
Everything else (directed adj/edges/dedupe) unchanged.

- [ ] **Step 4: Run** — `node --test tests/unit/graph_workbench.test.js` all pass (Bellman-Ford cases now pass `true`); `node --test tests/unit/*.test.js` no regressions (report count); `node --check js/viz/viz_graph_workbench.js`. Confirm empirically the CLRS bellman default with `(true,true,true)` still yields `[0,2,7,4,-2]`.

- [ ] **Step 5: Commit**
```bash
git add js/viz/viz_graph_workbench.js tests/unit/graph_workbench.test.js
git commit -m "feat: parseEdges allowNegative param — decouple negative weights from directed

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Toggle infra + `renderGraphVcr` (bfs/dfs/dijkstra)

**Files:** Modify `js/domains/graph.js`, `style.css`.

- [ ] **Step 1: Add toggle infra** — in `js/domains/graph.js` near `GW_META` add:
```js
  const GW_DIRECTED_TOGGLE = new Set(['graph', 'graph-adjlist', 'graph-traversal', 'graph-bfs', 'graph-dfs', 'graph-dijkstra']);
  function gwEffectiveDirected(methodId, st, meta) {
    return GW_DIRECTED_TOGGLE.has(methodId) ? !!(st && st.directed) : !!(meta && meta.directed);
  }
  function gwDirToggleHtml(methodId, st, langOf) {
    if (!GW_DIRECTED_TOGGLE.has(methodId)) return '';
    return '<button type="button" class="gw-dir-toggle" data-testid="gw-directed-toggle">' +
      langOf(st.directed ? { zh: '有向 ⇄', en: 'Directed ⇄' } : { zh: '無向 ⇄', en: 'Undirected ⇄' }) + '</button>';
  }
  function gwWireDirToggle(host, st, langOf, rebuild) {
    const b = host.querySelector('.gw-dir-toggle');
    if (!b) return;
    b.addEventListener('click', () => {
      st.directed = !st.directed;
      b.textContent = langOf(st.directed ? { zh: '有向 ⇄', en: 'Directed ⇄' } : { zh: '無向 ⇄', en: 'Undirected ⇄' });
      rebuild();
    });
  }
```

- [ ] **Step 2: GW_META — Bellman-Ford allowNegative** — add `allowNegative: true` to the `graph-bellman-ford` entry (keep `directed: true`). No other entry changes.

- [ ] **Step 3: renderGraphVcr wiring** — in `renderGraphVcr`:
  - Add the toggle button into the toolbar `.gw-btns` (after `sourceCtl`): `+ gwDirToggleHtml(methodId, st, langOf) +`.
  - In `rebuild()`, at the top compute `const dir = gwEffectiveDirected(methodId, st, meta);` and change the parse call to `GraphWorkbench.parseEdges(st.text, meta.weighted, dir, meta.allowNegative)`.
  - In the nested `draw(f)`, replace the three `meta.directed` references (the `dirSet` init, the `<defs>` guard, and the per-edge `if (meta.directed)` branch) with `dir` (draw closes over rebuild's `dir`).
  - In `applyText`, change its parse call to `GraphWorkbench.parseEdges(text, meta.weighted, gwEffectiveDirected(methodId, st, meta), meta.allowNegative)`.
  - After the existing event wiring (near the `exSel` listener), add `gwWireDirToggle(host, st, langOf, rebuild);`.
  - Ensure `st` has a `directed` slot: the `_gwState[methodId] || (... = { text: DEF, source: 0 })` init is fine (undefined `directed` → falsy); no change needed.

- [ ] **Step 4: CSS** — append to `style.css`:
```css
.gw-dir-toggle { border: 1px solid var(--border, #334155); background: var(--surface-muted, transparent); color: inherit; border-radius: 6px; padding: 2px 10px; font-size: 0.85rem; cursor: pointer; }
.gw-dir-toggle:hover { border-color: #60a5fa; }
```

- [ ] **Step 5: Verify** — `node --check js/domains/graph.js`; `git status --porcelain js/cloud-config.js` empty; `npm run test:all`. EXPECT green EXCEPT possibly new behavior needing the Task 4 E2E — but no existing test should break (bfs/dfs/dijkstra default undirected unchanged; bellman still directed+negatives via allowNegative). If the existing bellman E2E breaks, it means the `meta.allowNegative` wiring is off — fix. Report failures.

- [ ] **Step 6: Commit**
```bash
git add js/domains/graph.js style.css
git commit -m "feat: directed/undirected toggle for bfs/dfs/dijkstra (renderGraphVcr) + infra

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Directed-aware `drawUndirectedGraph` + struct + traversal

**Files:** Modify `js/domains/graph.js`.

- [ ] **Step 1: Make `drawUndirectedGraph` directed-aware** — add a 4th param and arrow rendering (port from renderGraphVcr's `draw`):
```js
  function drawUndirectedGraph(parsed, pos, frame, directed) {
    const has = (arr, x) => !!arr && arr.indexOf(x) !== -1;
    const ae = frame && frame.activeEdge ? frame.activeEdge : null;
    const R = 20;
    const dirSet = directed ? new Set(parsed.edges.map((e) => e.u + '-' + e.v)) : null;
    let s = '';
    if (directed) {
      s += '<defs>' +
        '<marker id="gw-arrow" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#94a3b8"/></marker>' +
        '<marker id="gw-arrow-active" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#60a5fa"/></marker>' +
        '</defs>';
    }
    for (const e of parsed.edges) {
      const isActive = ae && ae.u === e.u && ae.v === e.v;
      const ecls = 'graph-edge' + (isActive ? ' active' : '');
      const A = pos[e.u], B = pos[e.v];
      if (directed) {
        const dx = B.x - A.x, dy = B.y - A.y, len = Math.hypot(dx, dy) || 1, ux = dx / len, uy = dy / len;
        const px = -uy, py = ux, off = dirSet.has(e.v + '-' + e.u) ? 9 : 0;
        const x1 = A.x + ux * R + px * off, y1 = A.y + uy * R + py * off, x2 = B.x - ux * R + px * off, y2 = B.y - uy * R + py * off;
        s += '<line class="' + ecls + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" marker-end="url(#' + (isActive ? 'gw-arrow-active' : 'gw-arrow') + ')"></line>';
      } else {
        s += '<line class="' + ecls + '" x1="' + A.x + '" y1="' + A.y + '" x2="' + B.x + '" y2="' + B.y + '"></line>';
      }
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
(Undirected path — `directed` falsy — is byte-equivalent to the old function, so existing struct/traversal behavior is unchanged when undirected.)

- [ ] **Step 2: renderGraphStruct wiring** — in `renderGraphStruct`:
  - Toolbar: add `+ gwDirToggleHtml(methodId, st, langOf) +` into `.gw-btns` (after `gwBuildExamplesSelect(...)`).
  - In `rebuild()`: `const dir = gwEffectiveDirected(methodId, st);` then `GraphWorkbench.parseEdges(st.text, false, dir)`; change the SVG line to `... drawUndirectedGraph(parsed, pos, null, dir) ...`. (The matrix/list already read `parsed.adj`, which becomes directional when `dir` is true → asymmetric automatically.)
  - In `applyText`: `GraphWorkbench.parseEdges(text, false, gwEffectiveDirected(methodId, st))`.
  - After the `exSel` listener, add `gwWireDirToggle(host, st, langOf, rebuild);`.

- [ ] **Step 3: renderGraphTraversal wiring** — in `renderGraphTraversal`:
  - Toolbar: add `+ gwDirToggleHtml(methodId, st, langOf) +` into `.gw-btns` (after the source `<label>`).
  - In `rebuild()`: `const dir = gwEffectiveDirected(methodId, st);` then `GraphWorkbench.parseEdges(st.text, false, dir)`; in `paint`, change both `drawUndirectedGraph(parsed, pos, fb)` / `(parsed, pos, fd)` to `(parsed, pos, fb, dir)` / `(parsed, pos, fd, dir)`.
  - In `applyText`: `GraphWorkbench.parseEdges(text, false, gwEffectiveDirected(methodId, st))`.
  - After the `exSel` listener, add `gwWireDirToggle(host, st, langOf, rebuild);`.

- [ ] **Step 4: Verify** — `node --check js/domains/graph.js`; `npm run test:all` green (undirected defaults unchanged → existing graph/adjlist/traversal E2E still pass). Report failures. `git status --porcelain js/cloud-config.js` empty.

- [ ] **Step 5: Commit**
```bash
git add js/domains/graph.js
git commit -m "feat: directed/undirected toggle for graph/adjlist/traversal + directed drawUndirectedGraph

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: E2E

**Files:** Modify `tests/graph_workbench.spec.js`.

- [ ] **Step 1: Add toggle E2E** — append (READ the file's structure first):
```js
  test('directed toggle present on the 6 undirected viz, absent on MST/directed ones', async ({ page }) => {
    for (const id of ['graph', 'graph-adjlist', 'graph-traversal', 'graph-bfs', 'graph-dfs', 'graph-dijkstra']) {
      await loadMethod(page, id);
      await expect(page.locator('[data-method-section="' + id + '"] [data-testid="gw-directed-toggle"]')).toHaveCount(1);
    }
    for (const id of ['graph-kruskal', 'graph-prim', 'graph-topo', 'graph-bellman-ford']) {
      await loadMethod(page, id);
      await expect(page.locator('[data-method-section="' + id + '"] [data-testid="gw-directed-toggle"]')).toHaveCount(0);
    }
  });

  test('graph-bfs: toggling to directed adds arrowheads', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const sec = page.locator('[data-method-section="graph-bfs"]');
    await expect(sec.locator('.gw-svg line[marker-end]')).toHaveCount(0); // undirected default
    await sec.locator('[data-testid="gw-directed-toggle"]').click();
    await expect(sec.locator('.gw-svg line[marker-end]').first()).toBeAttached(); // directed → arrows
  });

  test('graph-traversal: toggling to directed adds arrowheads in both panes', async ({ page }) => {
    await loadMethod(page, 'graph-traversal');
    const sec = page.locator('[data-method-section="graph-traversal"]');
    await sec.locator('[data-testid="gw-directed-toggle"]').click();
    await expect(sec.locator('.gw-svg-bfs line[marker-end]').first()).toBeAttached();
    await expect(sec.locator('.gw-svg-dfs line[marker-end]').first()).toBeAttached();
  });

  test('graph-dijkstra: rejects negative weights even when directed', async ({ page }) => {
    await loadMethod(page, 'graph-dijkstra');
    const sec = page.locator('[data-method-section="graph-dijkstra"]');
    await sec.locator('[data-testid="gw-directed-toggle"]').click();  // directed
    await sec.locator('[data-testid="gw-input"]').fill('0-1:-4');
    await sec.locator('[data-testid="gw-build"]').click();
    await expect(sec.locator('[data-testid="gw-err"]')).toBeVisible();
  });
```

- [ ] **Step 2: Run + iterate to green** — `npx playwright test tests/graph_workbench.spec.js`. If a selector/behavior assumption is wrong, inspect the real DOM and correct the TEST — do NOT weaken assertions. `npm run test:all` → 0 failures (report count). Confirm count/i18n/nav tests unchanged and `git status --porcelain js/cloud-config.js` empty.

- [ ] **Step 3: Commit**
```bash
git add tests/graph_workbench.spec.js
git commit -m "test: E2E for graph directed/undirected toggle

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

- **Spec coverage:** Task 1 (allowNegative), Task 2 (infra + VCR toggle), Task 3 (drawUndirectedGraph directed + struct/traversal), Task 4 (E2E) — covers every spec section.
- **Placeholder scan:** none.
- **Type consistency:** `parseEdges(text, weighted, directed, allowNegative)` — all runtime callers updated (renderGraphVcr passes `meta.allowNegative`; struct/traversal are unweighted so `allowNegative` omitted). `gwEffectiveDirected(methodId, st, meta)` — struct/traversal call with 2 args (meta undefined → uses `st.directed`), VCR with 3. `drawUndirectedGraph(parsed, pos, frame, directed)` — all 3 call sites updated (struct 1, traversal 2); undirected path unchanged.
- **Scope:** only the 6 toggle-set viz get the button (`GW_DIRECTED_TOGGLE`); Kruskal/Prim/topo/bellman unaffected; renderGraphVcr's own `draw` keeps working for all 7 VCR methods (only `meta.directed`→`dir`, identical for topo/bellman where `dir===meta.directed`). Counts unchanged.
- **Dijkstra positivity:** `allowNegative` is false for dijkstra in both modes (GW_META has no `allowNegative`), so `parseEdges(..., dir, undefined)` rejects `w<1` regardless of `dir`. Bellman-Ford unaffected (allowNegative true).
