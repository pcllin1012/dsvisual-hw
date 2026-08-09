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
