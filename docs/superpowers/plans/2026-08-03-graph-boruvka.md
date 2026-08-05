# Borůvka's MST (graph-boruvka) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Add a new `graph-boruvka` visualization (weighted undirected Borůvka/Sollin MST), mirroring `graph-kruskal`/`graph-prim`: workbench toolbar + VCR playback via `renderGraphVcr`, MST-edge highlighting.

**Architecture:** Pure `boruvkaFrames(edges, n, labels)` + `DEFAULTS` entry in the module; a GW_META entry + `R().attach` reusing `renderGraphVcr`; standard new-method wiring (METHODS, codeByMethod, updateLayout, cpp+build_db, i18n, random dispatch).

**Tech Stack:** Vanilla JS dual-export module, `build_db.js` codegen, Playwright + `node --test`.

## Global Constraints

- Do NOT modify `js/cloud-config.js` / `tests/random_push.spec.js`. Do NOT hand-edit `js/code_db.js` (regenerate via `node build_db.js`).
- Commit messages end with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Branch `feat/graph-boruvka` (off main @ e784368). Never switch to main.
- graph-boruvka is UNDIRECTED weighted MST — do NOT add it to `GW_DIRECTED_TOGGLE`; `usesSource:false`. +1 method (counts self-consistent). UI text bilingual `{zh,en}`.

---

### Task 1: `boruvkaFrames` generator + DEFAULTS

**Files:** Modify `js/viz/viz_graph_workbench.js`; Test `tests/unit/graph_workbench.test.js`.

- [ ] **Step 1: Write failing unit tests** — append to `tests/unit/graph_workbench.test.js`:
```js
test('boruvkaFrames builds a valid MST equal in weight to Kruskal', () => {
  const p = GW.parseEdges(GW.DEFAULTS['graph-boruvka'], true, false);
  const bf = GW.boruvkaFrames(p.edges, p.n, p.labels);
  const last = bf[bf.length - 1];
  assert.strictEqual(last.treeEdges.length, p.n - 1);         // 4 edges
  const wByKey = {}; for (const e of p.edges) wByKey[e.u + '-' + e.v] = e.w;
  const total = last.treeEdges.reduce((s, e) => s + wByKey[e.u + '-' + e.v], 0);
  assert.strictEqual(total, 10);                              // same MST weight as Kruskal/Prim
  // matches kruskal's total on the same graph
  const kf = GW.kruskalFrames(p.edges, p.n, p.labels);
  const kLast = kf[kf.length - 1];
  const kTotal = kLast.treeEdges.reduce((s, e) => s + wByKey[e.u + '-' + e.v], 0);
  assert.strictEqual(total, kTotal);
  assert.ok(bf.some((f) => /輪|Round/.test(f.message.zh + f.message.en))); // has round messages
  for (const f of bf) { assert.strictEqual(f.dist, null); assert.ok(f.message.zh.length && f.message.en.length); }
});

test('DEFAULTS graph-boruvka parses weighted n=5', () => {
  const p = GW.parseEdges(GW.DEFAULTS['graph-boruvka'], true, false);
  assert.ok(p.ok); assert.strictEqual(p.n, 5);
});
```

- [ ] **Step 2: Run, verify fail** — `node --test tests/unit/graph_workbench.test.js` → FAIL (`GW.boruvkaFrames` undefined; DEFAULTS key missing).

- [ ] **Step 3: Add DEFAULTS + `boruvkaFrames`** — in `js/viz/viz_graph_workbench.js`, add `'graph-boruvka': 'A-B:4,B-C:1,C-D:6,D-E:2,E-A:3,A-C:5'` to `DEFAULTS`; add the function after `kruskalFrames` and export it (`boruvkaFrames: boruvkaFrames` in `api`):
```js
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
```

- [ ] **Step 4: Run** — `node --test tests/unit/graph_workbench.test.js` all pass; `node --test tests/unit/*.test.js` (report count, no regressions); `node --check js/viz/viz_graph_workbench.js`. Empirically confirm via `node -e` the boruvka MST on the default = weight 10, 4 edges, and equals kruskal's total.

- [ ] **Step 5: Commit**
```bash
git add js/viz/viz_graph_workbench.js tests/unit/graph_workbench.test.js
git commit -m "feat: boruvkaFrames MST generator + graph-boruvka default

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: C++ source + code_db regeneration

**Files:** Create `cpp/graph_boruvka.cpp`; Modify `build_db.js`; regenerate `js/code_db.js`.

- [ ] **Step 1: Create `cpp/graph_boruvka.cpp`**:
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Edge { int u, v, w; };

int parent[100], rnk[100];
int find(int x) { while (parent[x] != x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }
bool unite(int a, int b) {
    int ra = find(a), rb = find(b);
    if (ra == rb) return false;
    if (rnk[ra] < rnk[rb]) swap(ra, rb);
    parent[rb] = ra; if (rnk[ra] == rnk[rb]) rnk[ra]++;
    return true;
}

int main() {
    int V = 5;
    vector<Edge> edges = {{0,1,4},{1,2,1},{2,3,6},{3,4,2},{4,0,3},{0,2,5}};
    for (int i = 0; i < V; i++) { parent[i] = i; rnk[i] = 0; }
    int total = 0, added = 0;
    while (added < V - 1) {
        vector<int> cheap(V, -1);              // cheapest edge index per component
        for (int i = 0; i < (int)edges.size(); i++) {
            int ru = find(edges[i].u), rv = find(edges[i].v);
            if (ru == rv) continue;
            if (cheap[ru] == -1 || edges[i].w < edges[cheap[ru]].w) cheap[ru] = i;
            if (cheap[rv] == -1 || edges[i].w < edges[cheap[rv]].w) cheap[rv] = i;
        }
        bool progress = false;
        for (int r = 0; r < V; r++) {
            if (cheap[r] == -1) continue;
            Edge e = edges[cheap[r]];
            if (unite(e.u, e.v)) {
                total += e.w; added++; progress = true;
                cout << "Add " << e.u << "-" << e.v << " (w=" << e.w << ")\n";
            }
        }
        if (!progress) break;                  // disconnected
    }
    cout << "MST total weight: " << total << "\n";
    return 0;
}
```

- [ ] **Step 2: build_db mapping** — in `build_db.js` `mappings`, next to `'graph_kruskal.cpp': 'codeGraphKruskal',` add `'graph_boruvka.cpp': 'codeGraphBoruvka',`.

- [ ] **Step 3: Regenerate** — `node build_db.js`. Verify `grep -c "codeGraphBoruvka" js/code_db.js` ≥ 2, `node --check js/code_db.js` clean, and `git diff --stat js/code_db.js` shows additions only. (Optional: `g++ -std=c++11 -fsyntax-only cpp/graph_boruvka.cpp`.)

- [ ] **Step 4: Commit**
```bash
git add cpp/graph_boruvka.cpp build_db.js js/code_db.js
git commit -m "feat: graph_boruvka.cpp + code_db regen (codeGraphBoruvka)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Method wiring

**Files:** Modify `js/app.js`, `js/domains/graph.js`, `js/random_input.js`, `js/i18n.js`.

- [ ] **Step 1: app.js METHODS** — insert after the `graph-prim` entry: `{ id: 'graph-boruvka', title: 'Borůvka MST', file: 'graph_boruvka.cpp', visualizer: 'graph-step', controls: 'graph-step' },`
- [ ] **Step 2: app.js codeByMethod** — next to `'graph-prim': codeGraphPrim,` add `'graph-boruvka': codeGraphBoruvka,`.
- [ ] **Step 3: app.js updateLayout** — next to the `graph-prim` code-only branch add `else if (currentMode === 'graph-boruvka') { codeTitle.textContent = 'graph_boruvka.cpp'; codeDisplay.textContent = codeGraphBoruvka; }`.
- [ ] **Step 4: graph.js GW_META + attach** — add to `GW_META` (after `graph-prim`): `'graph-boruvka': { weighted: true, usesSource: false, gen: (p, s) => GraphWorkbench.boruvkaFrames(p.edges, p.n, p.labels) },` and add `R().attach('graph-boruvka', { render: () => renderGraphVcr('graph-boruvka'), code: () => codeGraphBoruvka, layout: { host: 'dynamic' } });` next to graph-prim's attach. Do NOT add to `GW_DIRECTED_TOGGLE`.
- [ ] **Step 5: random dispatch** — in `js/random_input.js`, add `case 'graph-boruvka':` to the weighted graph group (with kruskal/prim/dijkstra) returning `{ text: graphEdgeList(rng, difficulty, true) }`.
- [ ] **Step 6: i18n** — in `js/i18n.js`, next to `method.graph-kruskal` add en `'method.graph-boruvka': 'Borůvka MST',` and zh `'method.graph-boruvka': 'Borůvka MST',`.
- [ ] **Step 7: Verify** — `node --check js/app.js js/domains/graph.js js/random_input.js js/i18n.js`; `git status --porcelain js/cloud-config.js` empty; `npm run test:all` → GREEN (graph-boruvka now in nav + renders via renderGraphVcr; the dynamic `overview-tile == methodCount` count test stays valid at +1; `overview-category` still 14). Report the pass count + any failure.
- [ ] **Step 8: Commit**
```bash
git add js/app.js js/domains/graph.js js/random_input.js js/i18n.js
git commit -m "feat: graph-boruvka method wiring (renderGraphVcr, GW_META, i18n, random)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: E2E

**Files:** Create `tests/graph_boruvka.spec.js`.

- [ ] **Step 1: Write E2E** (READ a sibling like `tests/graph_workbench.spec.js` for header/import shape; the kruskal/prim tests are the closest model for MST-edge assertions):
```js
const { test, expect } = require('@playwright/test');
const { loadMethod } = require('./helpers');
const path = require('path');

test.describe('graph-boruvka (Borůvka MST)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'zh'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
    await loadMethod(page, 'graph-boruvka');
  });

  test('renders MST workbench; final frame shows 4 tree edges; no source/toggle', async ({ page }) => {
    const sec = page.locator('[data-method-section="graph-boruvka"]');
    await expect(sec.locator('[data-testid="gw-input"]')).toBeVisible();
    await expect(sec.locator('.stepctl')).toBeVisible();
    await expect(sec.locator('.gw-svg .graph-node')).toHaveCount(5);
    await expect(sec.locator('[data-testid="gw-source"]')).toHaveCount(0);          // MST: no source
    await expect(sec.locator('[data-testid="gw-directed-toggle"]')).toHaveCount(0); // undirected-only
    await expect(sec.locator('.code-panel-filename')).toContainText('graph_boruvka.cpp');
    await sec.locator('.stepctl-scrubber').evaluate((el) => { el.value = el.max; el.dispatchEvent(new Event('input', { bubbles: true })); });
    await expect(sec.locator('.gw-svg .graph-edge.tree')).toHaveCount(4);           // MST on 5 nodes
  });

  test('random fills input and rebuilds', async ({ page }) => {
    const sec = page.locator('[data-method-section="graph-boruvka"]');
    await sec.locator('.rand-btn').click();
    await expect(sec.locator('[data-testid="gw-input"]')).not.toHaveValue('');
    await expect(sec.locator('.gw-svg .graph-node').first()).toBeVisible();
  });
});
```

- [ ] **Step 2: Run + iterate to green** — `npx playwright test tests/graph_boruvka.spec.js`. If a selector/behavior assumption is wrong, inspect the real DOM and fix the TEST (not by weakening). Confirm the `.code-panel-filename` selector matches how graph-kruskal/graph-prim assert theirs.
- [ ] **Step 3: Full suite** — `npm run test:all` → 0 failures (report count). Confirm i18n count test + overview-category (14) pass; `git status --porcelain js/cloud-config.js` empty.
- [ ] **Step 4: Commit**
```bash
git add tests/graph_boruvka.spec.js
git commit -m "test: E2E for graph-boruvka MST viz

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

- **Spec coverage:** Task 1 (boruvkaFrames + default), Task 2 (cpp + code_db), Task 3 (wiring + render + random + i18n), Task 4 (E2E) — covers every spec section.
- **Placeholder scan:** none.
- **Type consistency:** `boruvkaFrames(edges, n, labels)` → same Frame shape as `kruskalFrames` (`treeEdges:[{u,v}]`, `dist:null`), consumed by `renderGraphVcr` (already highlights `treeEdges` + shows `parsed.labels`). GW_META `gen(p.edges, p.n, p.labels)` matches. `codeGraphBoruvka` produced by build_db (Task 2) before referenced (Task 3). Ordering: Task 2 precedes Task 3.
- **Correctness:** hand-verified Borůvka on the pentagon default → 4 edges (E-A, B-C, D-E, A-B), weight 10 = Kruskal/Prim. Uses `renderGraphVcr` (not in `GW_DIRECTED_TOGGLE`, `usesSource:false`), so no source/toggle. `graph-step` visualizer/controls (like prim) → no legacy `#graph-actions` bar.
