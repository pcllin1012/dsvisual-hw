# Bilingual Slides for 7 Missing Graph Viz — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Author bilingual (zh + en) slide decks for the 7 graph methods that currently show "no slides", matching the existing graph decks' style at "rich + worked example" depth.

**Architecture:** Add 7 decks to `slides_db.js` (the source of truth, keyed by method id, every text field `{zh, en}`). Regenerate the served artifacts with `npm run build:slides` (produces `js/slides_rendered.js` + `slides/{zh,en}/<id>.md`). No app code changes — `openSlides` already serves any deck present in `window.SLIDES_RENDERED`.

**Tech Stack:** `slides_db.js` (plain JS object), `build_slides.js` (`node build_slides.js`, renders mermaid via `node_modules/.bin/mmdc`), Playwright E2E, no build step for app JS.

## Global Constraints

- NEVER modify `js/cloud-config.js` (if touched: `git checkout js/cloud-config.js`).
- Never hand-edit `js/slides_rendered.js` or any `slides/{zh,en}/*.md` — these are GENERATED. Only edit `slides_db.js`, then run `npm run build:slides` to regenerate, and commit the generated output alongside.
- Do NOT hand-edit `js/code_db.js`.
- Do NOT modify `js/app.js`, other existing decks in `slides_db.js`, the algorithms/viz, or method counts.
- Every text field in a new deck MUST be bilingual: `{ "zh": "…", "en": "…" }`. No single-language blocks.
- Each deck's **C++ slide embeds the real source** from `cpp/<id>.cpp` verbatim (a `code` block with `lang:'cpp'` and `file:'<id>.cpp'`).
- Each deck's **worked-example slide uses the method's actual default input** (given per deck below) so the slide matches the visualizer.
- `category` for all 7 decks is `"Graphs"`.
- Commit trailer (exact): `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Spec: `docs/superpowers/specs/2026-08-06-graph-missing-slides-design.md`.

---

## Deck Authoring Conventions (applies to every deck)

Insert each new key into `slides_db.js` near related graph decks (file order does not affect app display order, which follows METHODS — grouping is for readability). Deck shape:

```js
"<method-id>": {
  "category": "Graphs",
  "title": { "zh": "<zh title>", "en": "<en title>" },
  "slides": [ /* ~7 slides, each { heading:{zh,en}, blocks:[...] } */ ]
}
```

**The ~7 slides, in order (same for every deck):**
1. **Intro** — `paragraph`: what it is + the headline complexity (use `$…$` for math, e.g. `$O(V+E)$`).
2. **Core concept** — `paragraph` + `bullets`: the key invariant / data structure / preconditions.
3. **Operation flow** — `steps` (numbered) + a `mermaid` flowchart. Describe the algorithm **as implemented in `cpp/<id>.cpp`** (read it first).
4. **Diagram** — a `mermaid` graph OR a small inline `svg` illustrating the structure/result on the example graph.
5. **Worked example** — `steps`: trace the algorithm on the **exact default input** for this method (given per deck), ending at the concrete result stated below. Begin the slide with a `paragraph` naming the input (e.g. "Input: …").
6. **Complexity** — `table` with columns Aspect / Cost (bilingual headers and cells): time, space, and the key operation cost.
7. **C++** — `code` block: `{ "type":"code", "lang":"cpp", "file":"<id>.cpp", "code":"<verbatim contents of cpp/<id>.cpp>" }`.

**Block reference** (from `build_slides.js`): `paragraph{text:{zh,en}}`, `bullets{items:[{zh,en}]}`, `steps{items:[{zh,en}]}`, `table{headers:[{zh,en},…], rows:[[{zh,en},…],…]}`, `code{lang,file,code}` (code is a plain string, NOT bilingual), `mermaid{code}` (a plain string, NOT bilingual), `svg{svg}` (plain string), `note{text:{zh,en}}`, `math{tex,caption?}`. Inline `$…$` renders via KaTeX.

**Correctness bar:** the algorithm description, the mermaid/diagram, the worked-example trace, and the complexity table must all be factually correct for the algorithm in `cpp/<id>.cpp`. The worked example must end at the stated result.

**Regeneration + commit (end of every task):**
```bash
npm run build:slides         # regenerates js/slides_rendered.js + slides/{zh,en}/*.md
git add slides_db.js js/slides_rendered.js slides/zh/*.md slides/en/*.md tests/graph_slides.spec.js
```
Never `git add` a hand-edited generated file — only the build's output.

---

### Task 1: Structural representation decks — `graph-matrix`, `graph-multilist`

**Files:**
- Modify: `slides_db.js` (+2 decks), `js/slides_rendered.js` (generated)
- Create: `slides/{zh,en}/graph-matrix.md`, `slides/{zh,en}/graph-multilist.md` (generated), `tests/graph_slides.spec.js`

**Interfaces:**
- Produces: `SLIDES_RENDERED['graph-matrix']` and `['graph-multilist']`, each with non-empty `slides.zh` and `slides.en` (length > 1).

**Deck content specs:**

**`graph-matrix`** — title `{zh:"鄰接矩陣", en:"Adjacency Matrix"}`. Default input (worked example): **n=5, undirected, edges `0-1, 0-4, 1-2, 1-3, 1-4, 2-3, 3-4`**.
- Intro: a $V\times V$ matrix $M$ where $M[i][j]$ marks an edge $i\!-\!j$; space $O(V^2)$, edge lookup $O(1)$.
- Core concept + bullets: undirected ⇒ symmetric matrix; weighted ⇒ store weight instead of 1; enumerate a vertex's neighbours in $O(V)$; dense-graph friendly, wasteful for sparse.
- Operation flow (per `cpp/graph_matrix.cpp`): init $V\times V$ zeros; for each edge $(u,v)$ set $M[u][v]=M[v][u]=1$ (undirected); query = index.
- Diagram: a small 5×5 grid (svg or mermaid) with the example's 1-cells marked.
- Worked example: build the 5×5 symmetric matrix for the edges above; show that row 1 (vertex 1) has 1s at columns 0,2,3,4 (degree 4).
- Complexity table: space $O(V^2)$; edge query $O(1)$; enumerate neighbours $O(V)$; add edge $O(1)$.
- C++: verbatim `cpp/graph_matrix.cpp`.

**`graph-multilist`** — title `{zh:"鄰接多重表", en:"Adjacency Multilist"}`. Default input: **`A-B,B-C,C-D,D-E,E-A,A-C`** (5 nodes A–E, 6 edges).
- Intro: each **edge** is a single shared node (vs. adjacency list which stores each undirected edge twice); space $O(V+E)$.
- Core concept + bullets: an edge-node holds its two endpoints and two "next edge" links (one per endpoint); each vertex heads a chain threading the edge-nodes incident to it; visiting/marking each edge once is natural.
- Operation flow (per `cpp/graph_multilist.cpp`): create an edge-node per edge; link it into both endpoints' chains via the corresponding next-pointer.
- Diagram: mermaid/svg showing edge-nodes E0…E5 and vertex A's chain.
- Worked example: list the 6 edge-nodes for the input; show vertex A's chain = edges A-B (E0), E-A (E4), A-C (E5).
- Complexity table: space $O(V+E)$; each edge stored once; enumerate a vertex's incident edges $O(\deg)$.
- C++: verbatim `cpp/graph_multilist.cpp`.

- [ ] **Step 1: Read the two C++ sources**

Run: `cat cpp/graph_matrix.cpp cpp/graph_multilist.cpp` — use their verbatim contents for the C++ slides and align the operation-flow slides to what they implement.

- [ ] **Step 2: Write the failing E2E**

Create `tests/graph_slides.spec.js` (mirror `tests/slides_viewer.spec.js` for how the deck opens — inspect it for the exact opener; typically click `.method-slides-btn` then read the slide viewer). Use `loadMethod` from `./helpers.js`.

```js
const { test, expect } = require('@playwright/test');
const path = require('path');
const { loadMethod } = require('./helpers.js');

// Open a method's slide deck and return the viewer root locator.
// (Inspect tests/slides_viewer.spec.js and match its opener + slide-count selector.)
async function openSlides(page, methodId) {
  await loadMethod(page, methodId);
  const card = page.locator(`[data-method-section="${methodId}"]`);
  await card.locator('.method-slides-btn').click();
  // The deck viewer + its slide/total indicator — match the selectors used in slides_viewer.spec.js.
}

const DECKS_TASK1 = ['graph-matrix', 'graph-multilist'];

test.describe('Graph slides: structural decks', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  for (const id of DECKS_TASK1) {
    test(`${id}: has a multi-slide deck (not the placeholder), served in en+zh`, async ({ page }) => {
      // Guard via the served artifact: both languages present with >1 slide.
      const counts = await page.evaluate((mid) => {
        const e = window.SLIDES_RENDERED && window.SLIDES_RENDERED[mid];
        return e ? { zh: e.slides.zh.length, en: e.slides.en.length,
                     zh0: (e.slides.zh[0] || {}).title || '', en0: (e.slides.en[0] || {}).title || '' } : null;
      }, id);
      expect(counts).not.toBeNull();
      expect(counts.en).toBeGreaterThan(1);
      expect(counts.zh).toBeGreaterThan(1);
      expect(counts.en0.length).toBeGreaterThan(0);
      expect(counts.zh0.length).toBeGreaterThan(0);
      // Decks differ by language (not accidentally identical / single-language).
      const bodies = await page.evaluate((mid) => {
        const e = window.SLIDES_RENDERED[mid];
        return { zh: e.slides.zh.map((s) => s.body).join(''), en: e.slides.en.map((s) => s.body).join('') };
      }, id);
      expect(bodies.zh).not.toBe(bodies.en);
      // The C++ slide embeds the real source filename.
      expect(bodies.en).toContain(`${id}.cpp`);
    });
  }
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npx playwright test tests/graph_slides.spec.js -g "structural decks" --reporter=line`
Expected: FAIL — `SLIDES_RENDERED['graph-matrix']` is undefined (deck not authored/generated yet).

- [ ] **Step 4: Author the two decks in `slides_db.js`**

Add the `graph-matrix` and `graph-multilist` decks per the content specs above, following the Deck Authoring Conventions (7 slides each, every text field `{zh,en}`, real cpp in the C++ slide, worked example on the exact default input).

- [ ] **Step 5: Regenerate the served artifacts**

Run: `npm run build:slides`
Expected: `Generated N decks for zh, en` with no error (mermaid renders via mmdc). Confirms `slides_db.js` is valid JS and any new mermaid parses.

- [ ] **Step 6: Run the E2E to verify it passes**

Run: `npx playwright test tests/graph_slides.spec.js -g "structural decks" --reporter=line`
Expected: PASS (both decks).

- [ ] **Step 7: Commit**

```bash
git add slides_db.js js/slides_rendered.js slides/zh/graph-matrix.md slides/en/graph-matrix.md slides/zh/graph-multilist.md slides/en/graph-multilist.md tests/graph_slides.spec.js
git commit -m "docs(dsvisual): bilingual slides for graph-matrix + graph-multilist

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

(Note: `build:slides` may also rewrite other `slides/**/*.md` if formatting drifts; if `git status` shows unrelated md changes, verify they are byte-identical regenerations and either include them or `git checkout` them — do NOT leave `js/slides_rendered.js` partially staged. Simplest: `git add js/slides_rendered.js slides/` and rely on the build being deterministic.)

---

### Task 2: Reachability/traversal decks — `graph-components`, `graph-bipartite`, `graph-closure`, `graph-scc`

**Files:**
- Modify: `slides_db.js` (+4 decks), `js/slides_rendered.js` (generated)
- Create: `slides/{zh,en}/graph-{components,bipartite,closure,scc}.md` (generated); extend `tests/graph_slides.spec.js`

**Interfaces:**
- Produces: `SLIDES_RENDERED` keys for the 4 methods, each with non-empty `slides.zh`/`slides.en` (length > 1).

**Deck content specs:**

**`graph-components`** — title `{zh:"連通分量", en:"Connected Components"}`. Default input: **n=5, undirected, edges `0-1, 2-3`** → result **3 components: {0,1}, {2,3}, {4}**.
- Intro: in an undirected graph, a connected component is a maximal set of mutually reachable vertices; find all in $O(V+E)$.
- Core concept + bullets: visited array; run DFS/BFS from each unvisited vertex; each launch discovers exactly one component; count launches = component count.
- Operation flow (per `cpp/graph_components.cpp`): for each vertex not yet visited, start a DFS/BFS, label all reached vertices with the current component id, increment id.
- Diagram: mermaid of the example (0-1, 2-3, isolated 4) with three colours.
- Worked example: DFS from 0 → {0,1} (comp 1); from 2 → {2,3} (comp 2); vertex 4 unvisited → {4} (comp 3). Total 3.
- Complexity table: time $O(V+E)$, space $O(V)$.
- C++: verbatim `cpp/graph_components.cpp`.

**`graph-bipartite`** — title `{zh:"二分圖判定", en:"Bipartite Check"}`. Default input: **n=6, undirected, cycle `0-1,1-2,2-3,3-4,4-5,5-0`** (even 6-cycle) → **bipartite**.
- Intro: a graph is bipartite iff its vertices 2-colour with no monochromatic edge, iff it has no odd cycle; check in $O(V+E)$.
- Core concept + bullets: BFS/DFS 2-colouring; assign the opposite colour to each neighbour; a same-colour edge ⇒ odd cycle ⇒ not bipartite.
- Operation flow (per `cpp/graph_bipartite.cpp`): colour array init −1; BFS from each uncoloured vertex colouring neighbours with `1-colour`; conflict ⇒ report not bipartite.
- Diagram: mermaid of the 6-cycle two-coloured (A/B alternating).
- Worked example: colour 0=A,1=B,2=A,3=B,4=A,5=B; every edge connects A–B, incl. 5-0 (B–A) ⇒ bipartite. Add a `note` that an odd cycle (e.g. a 5-cycle) would fail.
- Complexity table: time $O(V+E)$, space $O(V)$.
- C++: verbatim `cpp/graph_bipartite.cpp`.

**`graph-closure`** — title `{zh:"遞移閉包", en:"Transitive Closure"}`. Default input: **n=4, directed, edges `0-1,1-2,2-3,3-1`** → 0 reaches {1,2,3}; {1,2,3} all reach each other (cycle 1→2→3→1).
- Intro: the transitive closure $R$ where $R[i][j]=1$ iff there is a directed path $i\rightsquigarrow j$; Warshall computes it in $O(V^3)$.
- Core concept + bullets: start $R$ = adjacency; Warshall triple loop `for k,i,j: R[i][j] |= R[i][k] && R[k][j]`; $k$ is the "allowed intermediate" pivot.
- Operation flow (per `cpp/graph_closure.cpp`): confirm it's Warshall bitset/boolean; describe the k-i-j order.
- Diagram: mermaid of the directed example; and the resulting reachability.
- Worked example: after Warshall, $R$ shows 0→{1,2,3}; 1,2,3 mutually reachable (the 1-2-3 cycle); 0 unreachable from others. Show the 4×4 R.
- Complexity table: time $O(V^3)$, space $O(V^2)$.
- C++: verbatim `cpp/graph_closure.cpp`.

**`graph-scc`** — title `{zh:"強連通分量", en:"Strongly Connected Components"}`. Default input: **n=6, directed, edges `0-1,1-2,2-0,2-3,3-4,4-3,4-5`** → **SCCs {0,1,2}, {3,4}, {5}**.
- Intro: in a directed graph an SCC is a maximal set where every pair is mutually reachable; found in $O(V+E)$.
- Core concept + bullets: describe the algorithm **as implemented in `cpp/graph_scc.cpp`** — read it to determine Kosaraju (two DFS passes + transpose, using finish-order) vs. Tarjan (single DFS with low-link/stack); bullet the key structures accordingly.
- Operation flow: the exact steps of that algorithm.
- Diagram: mermaid of the directed example with the 3 SCCs grouped.
- Worked example: trace to SCCs {0,1,2} (cycle 0→1→2→0), {3,4} (3↔4), {5} (sink). 3 SCCs.
- Complexity table: time $O(V+E)$, space $O(V)$.
- C++: verbatim `cpp/graph_scc.cpp`.

- [ ] **Step 1: Read the four C++ sources**

Run: `cat cpp/graph_components.cpp cpp/graph_bipartite.cpp cpp/graph_closure.cpp cpp/graph_scc.cpp` — embed verbatim and align the flow/example slides (especially confirm SCC = Kosaraju vs Tarjan and Closure = Warshall).

- [ ] **Step 2: Extend the E2E**

Append to `tests/graph_slides.spec.js` a describe block reusing the same per-deck assertions for `['graph-components','graph-bipartite','graph-closure','graph-scc']` (same body as Task 1's loop; factor a shared helper if convenient).

- [ ] **Step 3: Run it to verify it fails**

Run: `npx playwright test tests/graph_slides.spec.js -g "reachability" --reporter=line`
Expected: FAIL — those `SLIDES_RENDERED` keys are undefined.

- [ ] **Step 4: Author the four decks in `slides_db.js`** per the specs above (bilingual, real cpp, worked example on the exact default input, correct result).

- [ ] **Step 5: Regenerate**

Run: `npm run build:slides` — expect clean.

- [ ] **Step 6: Run the E2E**

Run: `npx playwright test tests/graph_slides.spec.js -g "reachability" --reporter=line`
Expected: PASS (4 decks).

- [ ] **Step 7: Commit**

```bash
git add slides_db.js js/slides_rendered.js slides/zh/graph-components.md slides/en/graph-components.md slides/zh/graph-bipartite.md slides/en/graph-bipartite.md slides/zh/graph-closure.md slides/en/graph-closure.md slides/zh/graph-scc.md slides/en/graph-scc.md tests/graph_slides.spec.js
git commit -m "docs(dsvisual): bilingual slides for graph components/bipartite/closure/scc

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: MST deck `graph-boruvka` + full gate

**Files:**
- Modify: `slides_db.js` (+1 deck), `js/slides_rendered.js` (generated)
- Create: `slides/{zh,en}/graph-boruvka.md` (generated); extend `tests/graph_slides.spec.js`

**Deck content spec:**

**`graph-boruvka`** — title `{zh:"Borůvka MST", en:"Borůvka MST"}`. Default input: **`A-B:4,B-C:1,C-D:6,D-E:2,E-A:3,A-C:5`** → **MST weight 10, edges B-C(1), D-E(2), E-A(3), A-B(4)**.
- Intro: Borůvka (Sollin) builds an MST in $O(E\log V)$ by, each round, having every component add its cheapest outgoing edge simultaneously.
- Core concept + bullets: DSU components; per round each component finds its minimum outgoing edge; add all chosen edges and merge; ~$\log V$ rounds since components at least halve.
- Operation flow (per `cpp/graph_boruvka.cpp`): init DSU (V sets); each round scan edges to find each component's cheapest crossing edge; add + unite (skip if it would duplicate/cycle within the round); stop at $V-1$ edges.
- Diagram: mermaid flowchart of the round loop (matches Kruskal deck's flowchart style).
- Worked example (trace on the input): Round 1 — cheapest outgoing per vertex/component: B-C(1), D-E(2), E-A(3) selected; components merge to {A,E,D} and {B,C}. Round 2 — cheapest edge between the two components is A-B(4); add it, all merged. MST = {B-C(1), D-E(2), E-A(3), A-B(4)}, total weight **10**, $V-1=4$ edges. Note the result equals Kruskal/Prim's on the same graph.
- Complexity table: time $O(E\log V)$, space $O(V+E)$.
- C++: verbatim `cpp/graph_boruvka.cpp`.

- [ ] **Step 1: Read the C++ source**

Run: `cat cpp/graph_boruvka.cpp` — embed verbatim; align the flow/example to it.

- [ ] **Step 2: Extend the E2E** — append a describe reusing the per-deck assertions for `['graph-boruvka']`.

- [ ] **Step 3: Run it to verify it fails**

Run: `npx playwright test tests/graph_slides.spec.js -g "boruvka" --reporter=line`
Expected: FAIL — key undefined.

- [ ] **Step 4: Author the `graph-boruvka` deck** per the spec (bilingual, real cpp, worked example ending at weight 10 / 4 edges).

- [ ] **Step 5: Regenerate**

Run: `npm run build:slides` — expect clean.

- [ ] **Step 6: Run the full slides spec + build test**

Run: `npx playwright test tests/graph_slides.spec.js --reporter=line`
Expected: PASS (all 7 decks across the three describe blocks).

Run: `node --test tests/unit/build_slides.test.js`
Expected: PASS (existing build_slides unit tests unaffected).

- [ ] **Step 7: Commit**

```bash
git add slides_db.js js/slides_rendered.js slides/zh/graph-boruvka.md slides/en/graph-boruvka.md tests/graph_slides.spec.js
git commit -m "docs(dsvisual): bilingual slides for graph-boruvka

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

- [ ] **Step 8: Full-suite gate + guards**

Run: `git status --porcelain js/cloud-config.js js/code_db.js` — expect empty (if cloud-config changed: `git checkout js/cloud-config.js`).
Run: `npm run test:all`
Expected: all green — unit + E2E, incl. `tests/slides_viewer.spec.js`, `tests/unit/build_slides.test.js`, dynamic count tests, and `tests/random_push.spec.js`. Confirm `js/slides_rendered.js` now contains all 7 new keys.

---

## Self-Review

**Spec coverage:**
- 7 decks authored in `slides_db.js`, bilingual, category Graphs → Tasks 1-3. ✓
- ~7 slides each with the rich + worked-example structure (intro/concept/flow+mermaid/diagram/worked-example/complexity/C++) → Deck Authoring Conventions + per-deck specs. ✓
- Real cpp embedded; worked example on the exact default input with the stated result → per-deck specs (inputs/results pinned). ✓
- Regenerate `slides_rendered.js` + `slides/*.md` via `build:slides`, never hand-edit generated files → Global Constraints + each task Step 5/7. ✓
- E2E: >1 slide (not placeholder), en≠zh, first heading non-empty, cpp filename present, served in both languages → Task 1 Step 2 + extensions. ✓
- No app/other-deck/count changes; cloud-config/code_db guards → Global Constraints + Task 3 Step 8. ✓

**Placeholder scan:** No TBD/TODO. Per-deck default inputs, results, titles, and cpp filenames are concrete. Slide prose is authored by the implementer from the pinned facts (the correct altitude for a content deck) and verified for algorithmic correctness in review — the facts themselves (inputs, results, complexities, algorithm identity) are specified.

**Type/name consistency:** Deck key = method id everywhere (`graph-matrix`, `graph-multilist`, `graph-components`, `graph-bipartite`, `graph-closure`, `graph-scc`, `graph-boruvka`). Block schema matches `build_slides.js` (`code` uses `file`+`code` strings, not bilingual; `mermaid`/`svg` are plain strings; text blocks are `{zh,en}`). E2E reads `window.SLIDES_RENDERED[id].slides.{zh,en}`, matching the generated shape.
