#include <iostream>
using namespace std;

// Adjacency multilist: ONE node per undirected edge, shared by both endpoints.
struct ENode {
    int v1, v2;    // the two endpoints of this edge
    ENode *link1;  // next edge incident to v1
    ENode *link2;  // next edge incident to v2
    ENode(int a, int b) : v1(a), v2(b), link1(nullptr), link2(nullptr) {}
};

const int V = 5;
ENode *head[V] = {nullptr};

ENode *nextOf(ENode *e, int vertex) {
    return (e->v1 == vertex) ? e->link1 : e->link2;
}
void setNext(ENode *e, int vertex, ENode *nx) {
    if (e->v1 == vertex) e->link1 = nx; else e->link2 = nx;
}

void addEdge(int u, int v) {
    ENode *e = new ENode(u, v);
    setNext(e, u, head[u]); head[u] = e;   // push onto u's chain
    setNext(e, v, head[v]); head[v] = e;   // same node also pushed onto v's chain
}

void print() {
    for (int i = 0; i < V; i++) {
        cout << "[" << i << "] -> ";
        for (ENode *e = head[i]; e; e = nextOf(e, i))
            cout << "(" << e->v1 << "," << e->v2 << ") -> ";
        cout << "null\n";
    }
}

int main() {
    addEdge(0, 1); addEdge(1, 2); addEdge(2, 3);
    addEdge(3, 4); addEdge(4, 0); addEdge(0, 2);
    print();
    return 0;
}
