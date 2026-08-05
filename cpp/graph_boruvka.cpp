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
