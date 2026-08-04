# Graph Dead-Code Cleanup (Tier A) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Remove the dead legacy graph editor + old render functions and legacy module state from `js/domains/graph.js`, and simplify the domain registration. No behavior change; all graph methods already use the workbench renders (except `graph-floyd-warshall` which keeps `renderFloydWarshall`).

**Architecture:** Pure deletion within one file + a one-line edit to `registerDomain`. Two removal ranges because live `renderFloydWarshall` sits between two dead blocks.

## Global Constraints

- Do NOT modify `js/cloud-config.js` / `index.html` / `js/app.js` / any test file / `tests/random_push.spec.js`.
- Commit message ends with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Branch `chore/graph-dead-code-cleanup` (already created off main @ c3534cd). Never switch to main.
- No behavior change; counts unchanged.

---

### Task 1: Delete dead code from `js/domains/graph.js`

**Files:**
- Modify: `js/domains/graph.js`

- [ ] **Step 1: Confirm the dead set is unreferenced by live code.** Before deleting, re-verify (grep) that each of these is referenced ONLY by other items in the dead set (not by `renderFloydWarshall`, `renderGraphVcr`, `renderGraphStruct`, `renderGraphTraversal`, `drawUndirectedGraph`, the `gw*` helpers, or the `R().attach` lines):
  `DEFAULT_EDGES`, `DEFAULT_WEIGHTED_EDGES`, `freshEdges`, `freshWeightedEdges`, `edges`, `weightedEdges`, `mstEdgeKeys`, `graphCandidateEdgeKey`, `dijkstraDistances`, `dijkstraVisited`, `shortestPathEdges`, `topoOrder`, `topoVisited`, `topoEdges`, `dom`, `edgeKey`, `runKruskalMST`, `buildWeightedGraphSvg`, `renderGraphDual`, `renderPrim`, `renderBellmanFord`, `renderGraph`, `runDijkstra`, `runTopoSort`, `onModeSwitch`, `init`.
  Command: for each name, `grep -nE "\b<name>\b" js/domains/graph.js` and confirm every hit is inside the dead set's own definitions. (Already analyzed: live renders use only local `parsed.edges`; `sleep` is a global used only by dead runners; `K().executeAnimWrapper` is a VizKit method called only by dead `init`.)

- [ ] **Step 2: Delete removal range 1** — from the `// Pentagon + one diagonal …` comment block above `const DEFAULT_EDGES` (currently ~line 6) THROUGH the closing `}` of `renderBellmanFord` (the `}` immediately BEFORE `function renderFloydWarshall`). This spans: the legacy state/consts, `freshEdges`/`freshWeightedEdges`, the `let edges … let dom` block, `edgeKey`, `runKruskalMST`, `buildWeightedGraphSvg`, `renderGraphDual`, `renderPrim`, `renderBellmanFord`. STOP exactly before `function renderFloydWarshall()` — that function is LIVE and must remain. Keep the IIFE header (`(function (global) {` + `const K/C/R`) intact at the top.

- [ ] **Step 3: Delete removal range 2** — from `function renderGraph() {` (currently ~line 417) THROUGH the closing `}` of `init()` (the `}` immediately BEFORE the `// ---- Graph workbench (edge-list + VCR) …` comment / `function gwLoadExamples`). This spans `renderGraph`, `runDijkstra`, `runTopoSort`, `onModeSwitch`, `init`. Keep everything from `function gwLoadExamples` onward (all workbench code + attach lines).

- [ ] **Step 4: Simplify registerDomain** — change
  `C().registerDomain({ id: 'graph', init: init, onModeSwitch: onModeSwitch });`
  to
  `C().registerDomain({ id: 'graph' });`

- [ ] **Step 5: Syntax check** — `node --check js/domains/graph.js` → must be clean. If it errors (unbalanced braces from an imprecise cut), fix the boundary. Then re-grep to confirm NONE of the deleted names remain defined or referenced anywhere in the file: `grep -nE "renderGraph\b|renderGraphDual|renderPrim|renderBellmanFord|runKruskalMST|runDijkstra|runTopoSort|buildWeightedGraphSvg|edgeKey|freshEdges|freshWeightedEdges|DEFAULT_EDGES|function init\b|onModeSwitch" js/domains/graph.js` → expect ZERO matches. Confirm `renderFloydWarshall`, `renderGraphVcr`, `renderGraphStruct`, `renderGraphTraversal`, `drawUndirectedGraph`, and all 11 `R().attach` lines are still present (`grep -c "R().attach('graph" js/domains/graph.js` → 11).

- [ ] **Step 6: Full test suite** — `npm run test:all` → 0 failures (report the pass count). All 11 graph methods must still render (esp. `graph-floyd-warshall`); the `#graph-edges` count tests and the `#btn-graph-add` i18n test still pass (index.html untouched). Confirm `git status --porcelain js/cloud-config.js index.html js/app.js` is empty (none touched) and `git status --porcelain tests/` is empty.

- [ ] **Step 7: Commit**
```bash
git add js/domains/graph.js
git commit -m "chore: remove dead legacy graph editor + old render functions from graph.js

All graph methods use the workbench renders (graph-floyd-warshall keeps
renderFloydWarshall). Removes the unreferenced legacy state, edge-editor
init(), and the old renderGraph/renderGraphDual/renderPrim/renderBellmanFord
+ run* animators. No behavior change; index.html legacy DOM left in place (Tier B).

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

- **Spec coverage:** single deletion task covers the whole Tier-A dead set + registerDomain edit.
- **Placeholder scan:** none.
- **Safety:** two-range deletion preserves the live `renderFloydWarshall` between the dead blocks; Step 1 re-verifies references, Step 5 greps for leftovers + balanced braces, Step 6 runs the full suite. Only `js/domains/graph.js` changes; index.html/app.js/tests/cloud-config untouched (Tier B deferred).
