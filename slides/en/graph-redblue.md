---
marp: true
theme: default
paginate: true
math: katex
title: "Red-Blue Rules (MST)"
category: "Graphs"
---

## Red-Blue Rules (MST)

The red-blue rules are Tarjan's unifying framework for MST algorithms: every edge is colored blue or red by the blue rule and the red rule, and the blue edges end up forming exactly one Minimum Spanning Tree (MST). This visualization implements the framework through the Kruskal lens (sort by weight, use DSU to detect cycles), completing in $O(E \log E)$ time overall.

---

## Blue Rule (Cut Property)

For any cut of the graph (a partition of the vertices into two non-empty sets), the lightest edge crossing that cut belongs to some MST — color it blue. Ties are broken by a fixed, arbitrary rule.

- Intuition: if the lightest crossing edge were excluded, swapping it in for whichever edge of the MST crosses the same cut cannot increase the total weight — a contradiction of minimality.
- The blue rule guarantees it is safe to add this edge — it never breaks the fact that some MST contains it.

---

## Red Rule (Cycle Property)

For any cycle in the graph, the heaviest edge on that cycle is not in any MST — color it red. Ties are broken by the same fixed rule as the blue rule.

- Intuition: if this heaviest edge were kept in a spanning tree, removing it splits the tree into two pieces; the cycle guarantees another edge that reconnects them with no greater weight — so swapping it out never makes the tree worse.
- The red rule guarantees it is safe to discard this edge — it cannot appear in any MST.

---

## Why It Works: The Invariant

Maintain an invariant: every blue edge so far is contained in some MST, and every red edge is contained in no MST. As long as each coloring step follows the blue rule or the red rule, the invariant keeps holding.

1. Initially no edge is colored, so the invariant holds vacuously (empty sets).
2. Repeatedly find a cut that satisfies the blue rule, or a cycle that satisfies the red rule, and color the corresponding edge.
3. Stop once every edge is colored: the blue edges then number exactly $V-1$ and form no cycle, so they form a spanning tree; by the invariant, that tree must be an MST.

---

## The Kruskal Lens (This Visualization)

This visualization applies the red-blue rules in the order Kruskal's algorithm would visit them: sort all edges by ascending weight, then examine them one by one using DSU to test whether their endpoints are already connected.

- Accept (blue): if the edge's endpoints are in different components, it is the lightest edge crossing the cut between that component and the rest — apply the blue rule, add it to the MST, and merge the components.
- Reject (red): if the edge's endpoints are already connected, it is the heaviest edge on the cycle that adding it would close — apply the red rule and discard it outright.
- Because the edges are processed in ascending order, every other edge on that cycle seen so far is no heavier — exactly the condition the red rule requires.

---

## Worked Example

Input: 5 vertices A–E with 6 weighted edges A-B:4, B-C:1, C-D:6, D-E:2, E-A:3, A-C:5. Sorted ascending by weight, they are examined in order: B-C:1, D-E:2, E-A:3, A-B:4, A-C:5, C-D:6.

1. B-C(1): B and C are not yet connected → blue, added to the MST, merging into {B,C}.
2. D-E(2): D and E are not yet connected → blue, added to the MST, merging into {D,E}.
3. E-A(3): the component {D,E} containing E and vertex A are not yet connected → blue, added to the MST, merging into {A,D,E}.
4. A-B(4): the component {A,D,E} containing A and the component {B,C} containing B are not yet connected → blue, added to the MST, merging into {A,B,C,D,E}; the MST now has 4 edges ($=V-1$).
5. A-C(5): A and C are already connected (same component) → red — the heaviest edge on the resulting cycle so far — discarded.
6. C-D(6): C and D are already connected → red, discarded for the same reason.

> Result: blue edges (MST) = {B-C(1), D-E(2), E-A(3), A-B(4)}, 4 edges, total weight $1+2+3+4=10$; red edges (excluded) = {A-C(5), C-D(6)}, 2 edges. This matches the MST that Prim's and Borůvka's algorithms would find on the same graph.

---

## One Framework: Kruskal, Prim & Borůvka

Kruskal's, Prim's, and Borůvka's — the three classic MST algorithms — are all just specific instances of applying the same red-blue rules in a different order:

- Kruskal's: visits all edges in ascending weight order, applying the blue rule (accept) or red rule (reject) edge by edge — exactly what this visualization shows.
- Prim's: at every step applies the blue rule to the cut between the current tree and the remaining vertices, picking the lightest edge across it.
- Borůvka's: each round applies the blue rule simultaneously to every connected component, each picking its own lightest edge leaving the component.
- All three converge to the same place: because every step strictly follows the blue rule or the red rule, the resulting set of blue edges is always (an) MST of the same graph.

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

    // Kruskal-lens: sort ascending, then classify every edge as BLUE (joins two
    // components -> lightest edge crossing that cut -> belongs in the MST) or
    // RED (both ends already connected -> heaviest edge on the cycle it would
    // close -> excluded). The blue edges form the MST.
    sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b) { return a.w < b.w; });

    vector<Edge> blue, red;
    int total = 0;
    for (const Edge& e : edges) {
        if (unite(e.u, e.v)) {
            // BLUE rule
            blue.push_back(e);
            total += e.w;
            cout << "BLUE " << e.u << "-" << e.v << " (w=" << e.w << ")\n";
        } else {
            // RED rule
            red.push_back(e);
            cout << "RED  " << e.u << "-" << e.v << " (w=" << e.w << ")\n";
        }
    }

    cout << "MST total weight: " << total << "\n";
    cout << "Blue edges (MST): " << blue.size() << ", Red edges (excluded): " << red.size() << "\n";
    return 0;
}
```
