---
marp: true
theme: default
paginate: true
math: katex
title: "紅藍規則(MST)"
category: "Graphs"
---

## 紅藍規則(MST)

紅藍規則是 Tarjan 提出的統一 MST 框架：透過紅規則與藍規則為每條邊上色，最終所有藍色邊恰好構成一棵最小生成樹(MST)。本視覺化採用 Kruskal 觀點(依權重排序、以 DSU 判斷是否成環)來實作此框架，整體在 $O(E \log E)$ 時間內完成。

---

## 藍規則(切割性質)

對圖中任意一個切割(將頂點分成兩個非空集合),若某條邊是跨越該切割權重最小的邊(唯一最小，或以固定規則打破平局),則這條邊必定屬於某一棵 MST——將它染成藍色。

- 直覺:若這條最輕邊不在 MST 中，用它替換 MST 中跨越同一切割的另一條邊，總權重只會變小或不變，矛盾。
- 藍規則保證:安全加入這條邊，不會破壞「存在一棵包含它的 MST」這個事實。

---

## 紅規則(環性質)

對圖中任意一個環，若某條邊是該環中權重最大的邊(唯一最大，或以相同的固定規則打破平局),則這條邊必定不屬於任何 MST——將它染成紅色。

- 直覺:若這條最重邊被選入生成樹，移除它會讓樹分裂成兩塊；環上必定還有另一條邊能重新連接這兩塊，且權重不會更大——換掉它，總權重不會變差。
- 紅規則保證:安全排除這條邊，它不可能出現在任何 MST 中。

---

## 為何成立:不變量

維持一個不變量:目前所有藍色邊都包含在某一棵 MST 中，所有紅色邊都不包含在任何 MST 中。只要每一步上色都遵守藍規則或紅規則，這個不變量就會一直成立。

1. 初始時所有邊皆未上色，不變量顯然成立(空集合)。
2. 重複尋找一個滿足藍規則的切割，或一個滿足紅規則的環，為對應的邊上色。
3. 當所有邊都被上色後停止:此時藍色邊恰好有 $V-1$ 條且不成環，形成一棵生成樹；由不變量，它必定就是一棵 MST。

---

## Kruskal 觀點(本視覺化)

本視覺化以 Kruskal 演算法的執行順序來套用紅藍規則:將所有邊依權重由小到大排序，依序檢視每一條邊，並以 DSU 判斷它的兩端是否已經連通。

- 接受(染藍):若邊的兩端分屬不同分量，它就是目前這個切割(該分量與其餘頂點之間)中權重最小的邊——套用藍規則，加入 MST 並合併分量。
- 拒絕(染紅):若邊的兩端已經連通，它就是目前這個環(加入該邊後所形成的環)中權重最大的邊——套用紅規則，直接排除。
- 因為邊已依權重排序，這個環中「目前為止見過」的其他邊都不會比它更重，恰好滿足紅規則的條件。

---

## 逐步範例

輸入:5 個頂點 A–E，6 條加權邊 A-B:4、B-C:1、C-D:6、D-E:2、E-A:3、A-C:5。依權重升冪排序後依序檢視:B-C:1、D-E:2、E-A:3、A-B:4、A-C:5、C-D:6。

1. B-C(1):B、C 尚未連通 → 藍色，加入 MST，合併為 {B,C}。
2. D-E(2):D、E 尚未連通 → 藍色，加入 MST，合併為 {D,E}。
3. E-A(3):E 所在分量 {D,E} 與 A 尚未連通 → 藍色，加入 MST，合併為 {A,D,E}。
4. A-B(4):A 所在分量 {A,D,E} 與 B 所在分量 {B,C} 尚未連通 → 藍色，加入 MST，合併為 {A,B,C,D,E},MST 已有 4 條邊($=V-1$)。
5. A-C(5):A、C 已經連通(同一分量) → 紅色，這是目前所形成環路中權重最大的邊，捨棄。
6. C-D(6):C、D 已經連通 → 紅色，同理捨棄。

> 結果:藍色邊(MST) = {B-C(1), D-E(2), E-A(3), A-B(4)},共 4 條，總權重 $1+2+3+4=10$;紅色邊(排除) = {A-C(5), C-D(6)},共 2 條。此結果與同一張圖上 Prim、Borůvka 演算法所得的 MST 相同。

---

## 統一框架:Kruskal / Prim / Borůvka

Kruskal、Prim、Borůvka 三種經典 MST 演算法，其實都只是以不同順序套用同一組紅藍規則的具體實例:

- Kruskal:依權重升冪走訪所有邊，逐條套用藍規則(接受)或紅規則(拒絕),如本視覺化所示。
- Prim:每一步都對「目前生成樹 vs. 其餘頂點」這個切割套用藍規則，選出跨越它的最輕邊。
- Borůvka:每一輪同時對圖中每個連通分量套用藍規則，各自選出通往外部的最輕邊。
- 三者殊途同歸:因為每一步都嚴格遵守藍規則或紅規則，最終得到的藍色邊集合都是同一張圖上的(某一棵)MST。

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
