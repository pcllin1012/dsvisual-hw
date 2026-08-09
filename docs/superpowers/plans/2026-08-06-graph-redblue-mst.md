# Red-Blue Rules MST Viz (graph-redblue) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `graph-redblue` MST visualizer demonstrating Tarjan's red/blue rules via the Kruskal lens (ascending weight: accept edge = blue rule / min edge across a cut; reject edge = red rule / max edge on a cycle), with the standard graph workbench (VCR + code drawer + step log) and a bilingual slide deck.

**Architecture:** A pure `redBlueFrames(edges, n, labels)` frame generator (a `kruskalFrames` clone that also tracks red/excluded edges and emits `blueEdges`/`redEdges` per frame with rule-worded messages), rendered by the existing `renderGraphVcr('graph-redblue')` after extending its edge-class logic with `blue`/`red` states. Wired as a new graph method following the established recipe (GW_META, attach, METHODS, codeByMethod, updateLayout, i18n, random_input, cpp + build_db→code_db). Plus a bilingual `slides_db.js` deck regenerated via `build:slides`.

**Tech Stack:** Vanilla JS (IIFE dual-export workbench module), `renderGraphVcr` workbench, plain CSS, Playwright E2E + `node --test`, `node build_db.js` (code_db) + `npm run build:slides` (slides_rendered). No app build step.

## Global Constraints

- NEVER modify `js/cloud-config.js` (if touched: `git checkout js/cloud-config.js`).
- Never hand-edit `js/code_db.js` (regenerate via `node build_db.js`) or `js/slides_rendered.js`/`slides/**/*.md` (regenerate via `npm run build:slides`).
- Do NOT modify `buildFrameControls`/`buildStepWorkbench`, other methods, or the existing MST frame generators/algorithms.
- New graph method uses `visualizer: 'graph-step', controls: 'graph-step', codeDrawer: true` (mirror `graph-boruvka`); NOT in `GW_DIRECTED_TOGGLE`.
- The `draw` edge-class change must be backward-compatible: `blue`/`red` apply only when a frame carries `blueEdges`/`redEdges` (other methods carry neither, so they render unchanged).
- Method count +1; dynamic count tests (tiles==methodCount) must stay green — no hardcoded totals.
- Slide `file` field uses the real underscored filename `graph_redblue.cpp`.
- Commit trailer (exact): `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Spec: `docs/superpowers/specs/2026-08-06-graph-redblue-mst-design.md`.

---

## File Structure

- `js/viz/viz_graph_workbench.js` — add `redBlueFrames` (near `kruskalFrames` ~319), `DEFAULTS['graph-redblue']`, and `redBlueFrames` on the `api` object (~503).
- `js/domains/graph.js` — GW_META entry (~90), `R().attach` (~537, after boruvka), and the `draw` blue/red edge-class extension (~235/247).
- `js/app.js` — METHODS row (after line 116), `codeByMethod` (~328), updateLayout branch (~1689).
- `js/random_input.js` — `case 'graph-redblue':` (weighted MST, ~305).
- `js/i18n.js` — en (~82) + zh (~339).
- `style.css` — `.gw-svg .graph-edge.blue` + `.graph-edge.red`.
- `cpp/graph_redblue.cpp` (new) + `build_db.js` mapping (~32) → `node build_db.js` regenerates `js/code_db.js`.
- `slides_db.js` — `graph-redblue` deck → `npm run build:slides` regenerates `js/slides_rendered.js` + `slides/{zh,en}/graph-redblue.md`.
- Tests: `tests/unit/graph_workbench.test.js` (redBlueFrames), `tests/graph_redblue.spec.js` (E2E).

---

### Task 1: `redBlueFrames` generator + unit tests

**Files:** Modify `js/viz/viz_graph_workbench.js`; Test `tests/unit/graph_workbench.test.js`.

**Interfaces:** Produces `GraphWorkbench.redBlueFrames(edges, n, labels)` → frames `{…, treeEdges, blueEdges:[{u,v}], redEdges:[{u,v}], message:{zh,en}}`. `DEFAULTS['graph-redblue']`.

- [ ] **Step 1: Write the failing unit tests**

Add to `tests/unit/graph_workbench.test.js` (matches its `node:test`/`node:assert` style; `GW = require('../../js/viz/viz_graph_workbench.js')`):

```js
test('redBlueFrames: default graph → 4 blue (weight 10) + 2 red, every edge colored once', () => {
  const p = GW.parseEdges('A-B:4,B-C:1,C-D:6,D-E:2,E-A:3,A-C:5', true, false);
  assert.ok(p.ok);
  const frames = GW.redBlueFrames(p.edges, p.n, p.labels);
  const last = frames[frames.length - 1];
  assert.strictEqual(last.blueEdges.length, 4);
  assert.strictEqual(last.redEdges.length, 2);
  // blue weight == Kruskal MST weight (10)
  const wOf = (be) => { const e = p.edges.find((x) => (x.u === be.u && x.v === be.v) || (x.u === be.v && x.v === be.u)); return e.w; };
  const blueW = last.blueEdges.reduce((s, be) => s + wOf(be), 0);
  const kr = GW.kruskalFrames(p.edges, p.n, p.labels);
  const krLast = kr[kr.length - 1];
  const krW = krLast.treeEdges.reduce((s, be) => s + wOf(be), 0);
  assert.strictEqual(blueW, 10);
  assert.strictEqual(blueW, krW);
  // blue ∪ red == all edges, blue ∩ red == ∅
  const key = (e) => e.u + '-' + e.v;
  const blue = new Set(last.blueEdges.map(key)), red = new Set(last.redEdges.map(key));
  assert.strictEqual(blue.size + red.size, p.edges.length);
  for (const k of blue) assert.ok(!red.has(k));
  // every frame bilingual
  for (const f of frames) { assert.ok(f.message.zh && f.message.en); }
});

test('redBlueFrames: labels appear in messages', () => {
  const p = GW.parseEdges('A-B:4,B-C:1,C-D:6,D-E:2,E-A:3,A-C:5', true, false);
  const frames = GW.redBlueFrames(p.edges, p.n, p.labels);
  const joined = frames.map((f) => f.message.en).join(' ');
  assert.ok(/A|B|C|D|E/.test(joined));
});

test("DEFAULTS['graph-redblue'] parses ok with n=5", () => {
  const p = GW.parseEdges(GW.DEFAULTS['graph-redblue'], true, false);
  assert.ok(p.ok);
  assert.strictEqual(p.n, 5);
});
```

- [ ] **Step 2: Run to verify fail**

Run: `node --test tests/unit/graph_workbench.test.js`
Expected: FAIL — `GW.redBlueFrames is not a function`.

- [ ] **Step 3: Implement `redBlueFrames` + DEFAULTS + export**

In `js/viz/viz_graph_workbench.js`, add near `kruskalFrames` (after its closing brace ~line 348):

```js
  // Tarjan red/blue rules via the Kruskal lens: ascending weight; accepting an
  // edge applies the BLUE rule (it's the lightest edge across the cut between the
  // two components it joins); rejecting applies the RED rule (it closes a cycle
  // and — processed ascending — is that cycle's heaviest edge). Pure, no DOM/RNG.
  function redBlueFrames(edges, n, labels) {
    function L(i) { return labels ? labels[i] : i; }
    var frames = [], blue = [], red = [], order = [], inTree = [], parent = [], rank = [], i;
    for (i = 0; i < n; i++) { inTree.push(false); parent.push(i); rank.push(0); }
    function find(x) { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }
    function union(a, b) {
      var ra = find(a), rb = find(b); if (ra === rb) return false;
      if (rank[ra] < rank[rb]) { var t = ra; ra = rb; rb = t; }
      parent[rb] = ra; if (rank[ra] === rank[rb]) rank[ra]++; return true;
    }
    function snap(activeEdge, msg) {
      frames.push({ visited: order.slice(), frontier: [], active: null, activeEdge: activeEdge, dist: null, order: order.slice(), treeEdges: blue.slice(), blueEdges: blue.slice(), redEdges: red.slice(), message: msg });
    }
    var sorted = edges.slice().sort(function (a, b) { return a.w - b.w || a.u - b.u || a.v - b.v; });
    var total = 0;
    snap(null, { zh: '紅藍規則(Kruskal 視角):依權重由小到大考慮每條邊', en: 'Red-blue rules (Kruskal lens): consider edges in increasing weight' });
    for (i = 0; i < sorted.length; i++) {
      var e = sorted[i], ae = { u: Math.min(e.u, e.v), v: Math.max(e.u, e.v) };
      if (union(e.u, e.v)) {
        blue.push(ae); total += e.w;
        if (!inTree[e.u]) { inTree[e.u] = true; order.push(e.u); }
        if (!inTree[e.v]) { inTree[e.v] = true; order.push(e.v); }
        snap(ae, { zh: '藍規則:邊 ' + L(ae.u) + '–' + L(ae.v) + '(w=' + e.w + ')是跨越切割的最小邊 → 加入 MST', en: 'Blue rule: edge ' + L(ae.u) + '–' + L(ae.v) + ' (w=' + e.w + ') is the lightest across the cut → add to MST' });
      } else {
        red.push(ae);
        snap(ae, { zh: '紅規則:邊 ' + L(ae.u) + '–' + L(ae.v) + '(w=' + e.w + ')會成環,且為環上最大邊 → 排除', en: 'Red rule: edge ' + L(ae.u) + '–' + L(ae.v) + ' (w=' + e.w + ') closes a cycle as its heaviest edge → exclude' });
      }
    }
    snap(null, { zh: '藍邊構成 MST,總權重 ' + total + ';紅邊皆被排除', en: 'Blue edges form the MST (weight ' + total + '); red edges are all excluded' });
    return frames;
  }
```

In `DEFAULTS` (~line 226, near the other MST entries) add: `'graph-redblue': 'A-B:4,B-C:1,C-D:6,D-E:2,E-A:3,A-C:5',`.

In the `api` object (~line 503) add `redBlueFrames: redBlueFrames,` (beside `boruvkaFrames`).

- [ ] **Step 4: Run to verify pass**

Run: `node --test tests/unit/graph_workbench.test.js`
Expected: PASS (new + existing).

- [ ] **Step 5: Commit**

```bash
git add js/viz/viz_graph_workbench.js tests/unit/graph_workbench.test.js
git commit -m "feat(dsvisual): redBlueFrames MST generator (Tarjan red/blue via Kruskal lens)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Render blue/red + wire the `graph-redblue` method + E2E

**Files:** Modify `js/domains/graph.js`, `js/app.js`, `js/random_input.js`, `js/i18n.js`, `style.css`; Create `cpp/graph_redblue.cpp`; Modify `build_db.js` → regenerate `js/code_db.js`; Test `tests/graph_redblue.spec.js`.

**Interfaces:** Consumes `redBlueFrames` (Task 1). Produces the `graph-redblue` method rendered by `renderGraphVcr` with blue/red edges.

- [ ] **Step 1: Write the failing E2E**

Create `tests/graph_redblue.spec.js` (mirror `tests/graph_boruvka.spec.js`: `loadMethod` from `./helpers`):

```js
const { test, expect } = require('@playwright/test');
const { loadMethod } = require('./helpers');

test.describe('Graph Red-Blue Rules MST', () => {
  test('renders workbench, colors 4 blue + 2 red at the final frame', async ({ page }) => {
    await loadMethod(page, 'graph-redblue');
    const sec = page.locator('[data-method-section="graph-redblue"]');
    await expect(sec.locator('[data-testid="gw-input"]')).toBeVisible();
    await expect(sec.locator('.stepctl')).toBeVisible();
    await expect(sec.locator('.gw-svg .graph-node')).toHaveCount(5);
    await expect(sec.locator('[data-testid="code-drawer"] .code-panel-filename')).toContainText('graph_redblue.cpp');
    // no source picker, no directed toggle (MST undirected)
    await expect(sec.locator('[data-testid="gw-source"]')).toHaveCount(0);
    // scrub to the final frame
    await sec.locator('.stepctl-scrubber').evaluate((el) => { el.value = el.max; el.dispatchEvent(new Event('input', { bubbles: true })); });
    await expect(sec.locator('.gw-svg .graph-edge.blue')).toHaveCount(4);
    await expect(sec.locator('.gw-svg .graph-edge.red')).toHaveCount(2);
  });

  test('step log present and clickable', async ({ page }) => {
    await loadMethod(page, 'graph-redblue');
    const sec = page.locator('[data-method-section="graph-redblue"]');
    await expect(sec.locator('.gw-workbench')).toBeVisible();
    const rows = sec.locator('.gw-logrow');
    const max = parseInt(await sec.locator('.stepctl-scrubber').getAttribute('max'), 10);
    await expect(rows).toHaveCount(max + 1);
    await rows.nth(max).click();
    await expect(rows.nth(max)).toHaveClass(/\bon\b/);
  });
});
```

- [ ] **Step 2: Run to verify fail**

Run: `npx playwright test tests/graph_redblue.spec.js --reporter=line`
Expected: FAIL — method doesn't exist.

- [ ] **Step 3: Create `cpp/graph_redblue.cpp` + build_db mapping + regenerate**

Create `cpp/graph_redblue.cpp` — a compilable Kruskal-lens implementation: read edges, sort ascending, DSU; for each edge, if it joins two components print/collect it as a BLUE (MST) edge and union, else mark it RED (excluded, cycle's heaviest); output blue edges + total weight. Comment the accept branch `// BLUE rule` and reject branch `// RED rule`.

In `build_db.js` (~line 32) add `'graph_redblue.cpp': 'codeGraphRedblue',` (beside the boruvka mapping).

Run: `node build_db.js` (regenerates `js/code_db.js` with `codeGraphRedblue`). Do NOT hand-edit `js/code_db.js`.

- [ ] **Step 4: Extend `draw` for blue/red (js/domains/graph.js)**

After line 235 (`const treeKeys = …`) add:

```js
        const blueKeys = new Set((f.blueEdges || []).map((e) => e.u + '-' + e.v));
        const redKeys = new Set((f.redEdges || []).map((e) => e.u + '-' + e.v));
```

Change line 247 to:

```js
          const ekey = e.u + '-' + e.v;
          const ecls = 'graph-edge' + (active ? ' active' : (blueKeys.has(ekey) ? ' blue' : (treeKeys.has(ekey) ? ' tree' : (redKeys.has(ekey) ? ' red' : ''))));
```

(Backward-compatible: methods without `blueEdges`/`redEdges` get empty sets → unchanged `active`/`tree` behavior.)

- [ ] **Step 5: GW_META + attach (js/domains/graph.js)**

In `GW_META` (~line 92, after boruvka) add:

```js
    'graph-redblue':  { weighted: true,  usesSource: false, gen: (p, s) => GraphWorkbench.redBlueFrames(p.edges, p.n, p.labels) },
```

After the boruvka `R().attach` (~line 537) add:

```js
  R().attach('graph-redblue', { render: () => renderGraphVcr('graph-redblue'), code: () => codeGraphRedblue, layout: { host: 'dynamic' } });
```

- [ ] **Step 6: METHODS + codeByMethod + updateLayout (js/app.js)**

After the `graph-boruvka` METHODS row (line 116) add:

```js
            { id: 'graph-redblue', title: 'Red-Blue Rules (MST)', file: 'graph_redblue.cpp', visualizer: 'graph-step', controls: 'graph-step', codeDrawer: true },
```

In `codeByMethod` (~line 328) add `'graph-redblue': codeGraphRedblue,`.

In updateLayout (~line 1689, after the boruvka branch) add:

```js
        else if (currentMode === 'graph-redblue') { codeTitle.textContent = 'graph_redblue.cpp'; codeDisplay.textContent = codeGraphRedblue; }
```

(`codeGraphRedblue` is provided by the regenerated `js/code_db.js`.)

- [ ] **Step 7: random_input + i18n + CSS**

`js/random_input.js` (~line 305, the weighted-MST group): add `case 'graph-redblue':` above boruvka's `return { text: graphEdgeList(rng, difficulty, true) };` (share the branch).

`js/i18n.js`: en (~82) `'method.graph-redblue': 'Red-Blue Rules (MST)',`; zh (~339) `'method.graph-redblue': '紅藍規則(MST)',`.

`style.css` (near `.gw-svg .graph-edge.tree`, ~line 481) add:

```css
.gw-svg .graph-edge.blue { stroke: #3b82f6; stroke-width: 5; stroke-dasharray: none; }
.gw-svg .graph-edge.red { stroke: #ef4444; stroke-width: 2; stroke-dasharray: 4; opacity: 0.55; }
```

- [ ] **Step 8: Run the E2E**

Run: `npx playwright test tests/graph_redblue.spec.js --reporter=line`
Expected: PASS (4 blue + 2 red at final frame, drawer filename, step log).

- [ ] **Step 9: Regression — counts + a peer MST method**

Run: `npx playwright test tests/visualizer.spec.js -g "count|Kruskal|overview" --reporter=line`
Expected: PASS (dynamic tiles==methodCount absorbs +1; Kruskal still renders `.graph-edge.tree` green — draw change backward-compatible). If the matcher selects nothing, run `tests/visualizer.spec.js` in full.

- [ ] **Step 10: Commit**

```bash
git add js/domains/graph.js js/app.js js/random_input.js js/i18n.js style.css cpp/graph_redblue.cpp build_db.js js/code_db.js tests/graph_redblue.spec.js
git commit -m "feat(dsvisual): graph-redblue method — render blue/red MST edges + wiring

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Bilingual slide deck + full gate

**Files:** Modify `slides_db.js` → regenerate `js/slides_rendered.js` + `slides/{zh,en}/graph-redblue.md`; Test `tests/graph_redblue.spec.js` (slides).

**Deck content** (`"graph-redblue"`, category `"Graphs"`, title `{zh:"紅藍規則(MST)", en:"Red-Blue Rules (MST)"}`, ~7 slides, every text `{zh,en}`):
1. Intro — red/blue rules are the unifying MST framework (Tarjan); this viz uses the Kruskal lens, $O(E\log E)$.
2. Blue rule (cut property) — for any cut, the lightest crossing edge is in some MST → color blue.
3. Red rule (cycle property) — for any cycle, the heaviest edge is in no MST → color red.
4. Why it works — invariant: blue ⊆ some MST, red ∉ any MST; repeat until all edges colored → blue = MST.
5. Kruskal lens (this viz) — ascending weight; accept = blue (lightest across the cut), reject = red (cycle's heaviest).
6. Worked example — default graph `A-B:4,B-C:1,C-D:6,D-E:2,E-A:3,A-C:5` → blue B-C(1)/D-E(2)/E-A(3)/A-B(4), red A-C(5)/C-D(6), MST weight 10.
7. Kruskal/Prim/Borůvka are all instances of the framework + real C++ (`code` block, `file: 'graph_redblue.cpp'`, verbatim `cpp/graph_redblue.cpp`).

- [ ] **Step 1: Write the failing slides assertion**

Append to `tests/graph_redblue.spec.js`:

```js
test('graph-redblue: bilingual slide deck served', async ({ page }) => {
  await loadMethod(page, 'graph-redblue');
  const counts = await page.evaluate(() => {
    const e = window.SLIDES_RENDERED && window.SLIDES_RENDERED['graph-redblue'];
    return e ? { zh: e.slides.zh.length, en: e.slides.en.length, body: e.slides.en.map((s) => s.body).join('') } : null;
  });
  expect(counts).not.toBeNull();
  expect(counts.en).toBeGreaterThan(1);
  expect(counts.zh).toBeGreaterThan(1);
  expect(counts.body).toContain('graph_redblue.cpp');
});
```

- [ ] **Step 2: Run to verify fail**

Run: `npx playwright test tests/graph_redblue.spec.js -g "slide deck" --reporter=line`
Expected: FAIL — no deck.

- [ ] **Step 3: Author the deck in `slides_db.js` + regenerate**

Add the `graph-redblue` deck per the content above (bilingual every text field; embed `cpp/graph_redblue.cpp` verbatim in the C++ slide with `file: 'graph_redblue.cpp'`). Use an existing graph deck (e.g. `graph-kruskal`) as the style reference.

Run: `npm run build:slides` (regenerates `js/slides_rendered.js` + `slides/{zh,en}/graph-redblue.md`). Expected: "Generated N decks" clean. Do NOT hand-edit generated files.

- [ ] **Step 4: Run the slides assertion**

Run: `npx playwright test tests/graph_redblue.spec.js -g "slide deck" --reporter=line`
Expected: PASS.

- [ ] **Step 5: Full-suite gate + guards**

Run: `git status --porcelain js/cloud-config.js` — expect empty (if changed: `git checkout js/cloud-config.js`).
Run: `npm run test:all`
Expected: all green — unit (`redBlueFrames`) + E2E (`graph_redblue` + slides) + dynamic count tests + `tests/random_push.spec.js`. Confirm `js/code_db.js` has `codeGraphRedblue` and `js/slides_rendered.js` has the `graph-redblue` key (both generated, not hand-edited).

- [ ] **Step 6: Commit**

```bash
git add slides_db.js js/slides_rendered.js slides/zh/graph-redblue.md slides/en/graph-redblue.md tests/graph_redblue.spec.js
git commit -m "docs(dsvisual): bilingual slide deck for graph-redblue (red/blue rules)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- `redBlueFrames` (Kruskal lens, blue/red fields, bilingual rule messages) + DEFAULTS + export → Task 1. ✓
- draw blue/red (backward-compatible) + CSS → Task 2 Steps 4, 7. ✓
- Full method wiring (GW_META, attach, METHODS `graph-step`/codeDrawer, codeByMethod, updateLayout, random, i18n, cpp+build_db→code_db) → Task 2 Steps 3, 5, 6, 7. ✓
- Bilingual deck + regenerate → Task 3. ✓
- Tests: unit (4 blue/2 red, weight 10 == Kruskal, blue⊕red partition, bilingual), E2E (loads, 4 blue+2 red, drawer filename, no source, step log), slides (bilingual, cpp filename) → Task 1 Step 1, Task 2 Step 1, Task 3 Step 1. ✓
- Count +1 dynamic; cloud-config/code_db/slides_rendered generated → Global Constraints + Task 2 Step 9, Task 3 Step 5. ✓

**Placeholder scan:** No TBD/TODO. `redBlueFrames` full code; draw/CSS/wiring exact anchors (mirror boruvka). `cpp/graph_redblue.cpp` + deck prose are authored by the implementer from the specified content points (correct altitude for code/content) — the facts (Kruskal-lens algorithm, worked-example result weight 10 / 4 blue / 2 red) are pinned.

**Type/name consistency:** `redBlueFrames(edges, n, labels)` identical in module, api export, GW_META, and unit test. Frame fields `blueEdges`/`redEdges`/`treeEdges` consumed by draw (Task 2 Step 4) and asserted in tests. `graph-redblue` id + `graph_redblue.cpp` + `codeGraphRedblue` consistent across METHODS/codeByMethod/updateLayout/attach/build_db/code_db/deck `file`. `.graph-edge.blue`/`.red` match between draw, CSS, and E2E.
