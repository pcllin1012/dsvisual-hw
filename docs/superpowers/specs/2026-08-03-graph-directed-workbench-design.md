# Graph Workbench — Directed 批次(Topological Sort + Bellman-Ford)設計文件

- 日期:2026-08-03
- Repo:`/Users/skhuang/course/dsvisual`(main @ 95a0c4c)
- 動機:延續 graph workbench(pilot bfs/dfs/dijkstra + MST kruskal/prim),進行**有向圖批次**:`graph-topo`(拓撲排序)、`graph-bellman-ford`(單源最短路,可負權)。這批需為工作台加入**有向模式**(目前僅無向),為最大的框架擴充。

## 0. 範圍與決策(已與使用者確認)

- **本批只做**:`graph-topo`、`graph-bellman-ford`。皆為**有向圖**。
- 為工作台加**有向模式**:`parseEdges(text, weighted, directed)` 第三參數;有向渲染(箭頭 + 反向平行邊偏移)。
- Topo = **Kahn 演算法**(入度佇列),以 `dist` 欄位重用顯示各節點**當前入度**;無來源、無權重;含環偵測。
- Bellman-Ford = V−1 輪鬆弛所有邊 + **負環偵測**;有來源、加權(可負)。
- 隨機:topo = 隨機 **DAG**(`i→j` 僅 `i<j`);bellman-ford = **帶正負權的 DAG**(保證無負環)。預設:bellman-ford = 經典 CLRS 5 節點圖;topo = 6 節點 DAG。
- 其餘 4 方法(`graph`、`graph-adjlist`、`graph-traversal`、`graph-floyd-warshall`)與已轉換的 5 方法**不動**;計數不變。

## 1. 現況(已查證)

- `js/viz/viz_graph_workbench.js`:`parseEdges(text, weighted)` **無向**(雙向加入 adj、以無序對 `min-max` 去重、`edges` 正規化為 u<v);`layout`、`DEFAULTS`、`bfsFrames/dfsFrames/dijkstraFrames/kruskalFrames/primFrames`。Frame:`{ visited, frontier, active, activeEdge, dist, order, [treeEdges], message:{zh,en} }`。
- `js/domains/graph.js`:`renderGraphVcr(methodId)` + `GW_META`(5 筆,`gen:(p,s)=>...`、`weighted`、`usesSource`);`draw(f)` 繪無向直線邊(`.graph-edge`,`activeEdge` 以 u<v 比對;`treeEdges` → `.tree`);`meta.weighted && f.dist` 時畫節點數字標籤 + 邊權重。原 `renderBellmanFord`(自帶 CLRS 5 節點資料 + `buildWeightedGraphSvg` 有向箭頭 + `.wgraph-*`/`.bellman-*` UI)與 `runTopoSort`(Kahn,`topoEdges` 初始為空,使用者互動加邊)仍為 `graph-bellman-ford`/`graph-topo` 的 render(`renderGraph`/`renderBellmanFord`)。
- `buildWeightedGraphSvg(nodes, edgeList, directed)` 已存在,處理箭頭 + 反向平行邊曲線 + 權重(供參考,但 renderGraphVcr 自繪 SVG,不直接沿用)。
- 既有 E2E:Topo 測試(visualizer.spec.js ~L228)僅斷言 active + `.code-panel-filename` 'graph_topo.cpp'(改 render 後**仍通過**);Bellman-Ford 測試(~L697)斷言舊 UI `.wgraph-node`(5)/`.wgraph-edge`(10)/`.bellman-dcell`(5)/`[data-testid="bellman-msg"]`——**會失效,需重寫**。CLRS 預設含反向平行邊(`1→3` 與 `3→1`)。

## 2. 架構

### 2.1 `js/viz/viz_graph_workbench.js` — 有向模式 + 兩個 generator

- **`parseEdges(text, weighted, directed)`**:加第三參數 `directed`(預設 false,無向行為完全不變)。`directed === true` 時:
  - 每行 `u v [w]` 只加入 `u→v` 至 `adj`(不加反向)。
  - `edges` 保留方向 `[{u,v,w}]`(**不**正規化 u<v);以有序對 `(u,v)` 去重(重複保留先出現者)。
  - 跳過自環(`u===v`)。`n = maxIndex + 1`,超過 12 或索引<0 或格式錯 → `ok:false` + 雙語 `error`。空輸入 → 提示。
  - 無權時 `w=1`。
- **`topoFrames(adj, n)`** → `Array<Frame>`(Kahn):
  - 計算入度 `indeg[]`;佇列放所有 `indeg===0` 的節點(索引遞增)。
  - 逐步:從佇列取出 `u`(`active=u`)、加入 `order`;對每條 `u→to` 減 `indeg[to]`,若歸零則入佇列。
  - 每幀 `dist = indeg.slice()`(重用 `dist` 欄位顯示**當前入度**);`activeEdge` = 正在處理的 `u→to`(有向);`frontier` = 目前佇列;`message` 雙語(如「移除入度 0 的節點 u,加入拓撲序」「u→to:入度減為 k」)。
  - 末幀:若 `order.length === n` → 「拓撲排序完成:順序 …」;否則 → 「偵測到環:節點 [remaining] 無法排序」(`message` 雙語標示環)。
  - 無 source;`treeEdges` 不設。
- **`bellmanFordFrames(adj, n, source)`** → `Array<Frame>`:
  - `dist[source]=0`,其餘 ∞。V−1 輪:每輪掃描所有有向邊 `u→v(w)`,若 `dist[u]+w < dist[v]` 則鬆弛(`dist[v]` 更新),否則不更新;每邊一幀(`activeEdge=u→v`,`dist=dist.slice()`,`message` 雙語含輪次與 relax/no-update)。
  - 末段做一輪**負環偵測**:若仍有邊可鬆弛 → `message` 標示「偵測到負權環」;否則末幀「Bellman-Ford 完成」。
  - `active` 可設為正在鬆弛的 `v`;`treeEdges` 不設。
- **DEFAULTS**:
  - `graph-topo`(有向 DAG,6 節點):`'0 1\n0 2\n1 3\n2 3\n3 4\n3 5'`。
  - `graph-bellman-ford`(CLRS 5 節點,有負權、有環、無負環):`'0 1 6\n0 2 7\n1 2 8\n1 3 5\n1 4 -4\n2 3 -3\n2 4 9\n3 1 -2\n4 0 2\n4 3 7'`。
- 匯出 `api` 加 `topoFrames`、`bellmanFordFrames`。

### 2.2 `js/domains/graph.js` — 有向渲染 + 接線

- **`GW_META`** 加兩筆:
  ```
  'graph-topo':         { weighted:false, directed:true, usesSource:false, gen:(p,s)=>GraphWorkbench.topoFrames(p.adj, p.n) },
  'graph-bellman-ford': { weighted:true,  directed:true, usesSource:true,  gen:(p,s)=>GraphWorkbench.bellmanFordFrames(p.adj, p.n, s) },
  ```
- `renderGraphVcr`:`parseEdges` 呼叫改傳 `meta.directed`(`GraphWorkbench.parseEdges(st.text, meta.weighted, meta.directed)`);現有 5 筆 meta 未設 `directed` → falsy → 無向,行為不變。
- **`draw(f)` 有向渲染**(`meta.directed` 為真時):
  - 於 SVG 加一次性 `<defs><marker id="gw-arrow" .../></defs>`(箭頭);每條邊 `<line ... marker-end="url(#gw-arrow)">`,並將終點自節點圓心沿邊方向**內縮節點半徑**(~20),使箭頭露出於節點外。
  - **反向平行邊**:若 `v→u` 也存在(有向),對 `u→v` 與 `v→u` 各施加小幅**垂直偏移**(法向量 × 常數),使兩箭頭分離可見。
  - `activeEdge` 以**有向 `(u,v)` 精確比對**(有向模式);`.active` 高亮。
  - 邊權重標籤位置沿用中點(反向平行時隨偏移移動)。
- **節點數字標籤**:將顯示條件由 `meta.weighted && f.dist` 改為 **`f.dist != null`**(topo 顯示入度、dijkstra/bellman 顯示距離;bfs/dfs `dist:null` → 不顯示,行為不變)。`∞` 顯示規則沿用。
- **來源控制**:沿用 `usesSource`(topo 無、bellman 有)。
- **接線**:`graph-topo`、`graph-bellman-ford` 兩行 `R().attach(...)` 改指向 `() => renderGraphVcr(...)`(其餘不動)。舊 `renderBellmanFord`/`runTopoSort` 成 dead code(保留)。

### 2.3 `js/random_input.js`

- `graphEdgeList` 增加有向支援,或新增 `graphDagText(rng, difficulty, weighted)`:
  - 產生 **DAG**:節點 0..n−1,只加 `i→j`(`i<j`);先建鏈確保弱連通(`i` 連到某個 `j>i` 或某 `k<i` 連到 `i`),再依難度加額外前向邊;去重。
  - 無權(topo):`u v`;加權(bellman):`u v w`,`w ∈ [-5, 9]`(DAG 無環 → 無負環)。
- dispatch:
  ```
  case 'graph-topo':          return { text: graphDagText(rng, difficulty, false) };
  case 'graph-bellman-ford':  return { text: graphDagText(rng, difficulty, true) };
  ```

### 2.4 `style.css`

- `.gw-svg`:定義箭頭 marker 的樣式(若需);沿用既有 `.graph-edge`/`.graph-node`/`.graph-weight`/`.graph-distance`/`.graph-edge.active`。有向 marker 顏色與 `.graph-edge` 一致(active 時可加深)。少量新增即可。

## 3. 檔案清單

- 修改:`js/viz/viz_graph_workbench.js`(parseEdges directed + topoFrames + bellmanFordFrames + DEFAULTS)、`js/domains/graph.js`(GW_META 兩筆 + parseEdges 傳 directed + draw 有向箭頭/反向平行/節點標籤條件 + 2 attach)、`js/random_input.js`(graphDagText + 2 dispatch)、`style.css`(箭頭 marker)、`tests/unit/graph_workbench.test.js`(topo/bellman frames + directed parse)、`tests/graph_workbench.spec.js`(topo/bellman E2E)、`tests/visualizer.spec.js`(重寫 Bellman-Ford 測試 ~L697)。
- 不動:`js/cloud-config.js`、`tests/random_push.spec.js`、其餘 4 個 graph 方法、已轉換的 5 方法、計數測試。

## 4. 測試

- **單元**(`tests/unit/graph_workbench.test.js` 增補):
  - `parseEdges(directed=true)`:`u v` 只加單向;有序去重;反向平行(`1→3` 與 `3→1`)兩者皆存於 `edges` 且 adj 僅單向;n 正確。
  - `topoFrames`:在已知 DAG 上末幀 `order` 為合法拓撲序(每條 `u→v`,u 在 v 之前);含環的輸入 → 末幀 `message` 標示環、`order.length < n`;每幀 `message.{zh,en}` 非空,`dist` 為入度陣列。
  - `bellmanFordFrames`:在 CLRS 預設圖(source 0)末幀 `dist` 等於教科書值 `[0, 2, 7, 4, -2]`(0→2→3→1、1→4…;以標準 Bellman-Ford 驗證);負環輸入(如 `0 1 1 / 1 0 -3`)→ 末幀 `message` 標示負環;每幀 message 雙語。
  - `DEFAULTS['graph-topo'|'graph-bellman-ford']` 以 directed 解析 `ok`。
- **E2E**(`tests/graph_workbench.spec.js` 增補;`tests/visualizer.spec.js` 重寫 Bellman-Ford):
  - topo、bellman:載入 → `[data-testid="gw-input"]`、`.stepctl` 可見;`.gw-svg .graph-node` 數正確(topo 6、bellman 5);有向 → `.gw-svg line[marker-end]`(箭頭)存在;scrub/step 前進。
  - topo 無來源(`gw-source` 不存在);bellman 有來源。
  - 重寫 Bellman-Ford 測試(~L697):斷言新 UI(`.code-panel-filename` 'graph_bellman_ford.cpp' 保留;`.gw-svg .graph-node` 數 5;`.stepctl [data-action="step"]` 前進 `.stepctl-count`)。
  - Topo 測試(~L228)不動(仍通過)。
- 全套 `npm run test:all` 綠;計數不變;`js/cloud-config.js` 未動。

## 5. 驗收標準

- `graph-topo`、`graph-bellman-ford` 皆為工作台:有向邊表輸入 + 🎲 難度隨機 + 範例 + VCR;有向邊以箭頭渲染(含反向平行分離)。
- Topo:Kahn 逐步、顯示入度、無來源、環偵測;Bellman-Ford:V−1 鬆弛、顯示距離、有來源、負環偵測。
- 其餘方法、已轉換 5 方法、計數不變;`js/cloud-config.js` 未動;UI/步驟雙語,語言切換即時。
- 單元 + E2E 全綠。

## 6. 風險與緩解

- **有向渲染(箭頭 + 反向平行)** 為最大新複雜度:以 SVG marker + 終點內縮節點半徑 + 反向平行法向偏移實作;E2E 斷言 `line[marker-end]` 存在;單元不涉 DOM。CLRS 預設含 `1↔3` 反向平行,作為視覺驗證案例。
- **`directed` 參數擴充 `parseEdges`**:預設 false,既有無向呼叫(9 方法)行為不變;新增單元測試涵蓋 directed 分支。
- **節點標籤顯示條件改為 `f.dist != null`**:bfs/dfs `dist:null` 不受影響;dijkstra/bellman(距離)、topo(入度)皆顯示;單元/E2E 驗證。
- **Bellman-Ford 隨機負環風險**:隨機一律產 DAG(`i<j`)→ 結構上無環 → 無負環,永遠有效;預設手工 CLRS 圖示範含環但無負環的較豐富案例。
- **Topo 環處理**:Kahn 自然偵測(排序不足 n);`message` 明確標示,不崩。
- **舊 Bellman-Ford E2E 失效**:同批重寫為新 UI;Topo E2E 只查 filename 不受影響。
- **activeEdge 有向比對**:有向模式以精確 `(u,v)` 比對(不做 min-max),與無向分開;draw 依 `meta.directed` 決定比對方式。
