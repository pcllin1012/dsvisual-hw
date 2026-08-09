# MST Cross-Validation Unit Test Implementation Plan

**Goal:** Enshrine "Kruskal/Prim/Borůvka/redblue MST results agree" as a deterministic unit test.

**Scope:** test-only; no production code. Single file `tests/unit/graph_workbench.test.js`.

## Task 1: cross-validation test
- Append an IIFE with helpers (`wmapOf`/`keyOf`/`last`/`sumW`/`keyset`/`runAll`) + a fixed `CASES` battery (default, distinct small, tie-heavy, star, chain, dense-distinct, larger) + a data-driven `test` per case:
  - all four MST weights equal; each MST has `n-1` edges; `distinct` cases ⇒ identical edge sets.
  - plus an explicit default-graph check (weight 10, 4 edges).
- `runAll` uses the public api: `parseEdges(text,true,false)` then `kruskalFrames`/`primFrames(adj,0,..)`/`boruvkaFrames`/`redBlueFrames`; MST edges from `treeEdges` (k/p/b) / `blueEdges` (redblue).
- No `Math.random`/`Date` (deterministic).
- Verify: `node --test tests/unit/graph_workbench.test.js` green; `npm run test:all` green; `js/cloud-config.js` untouched.

Global constraint: commit trailer `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`; do not modify production code.
