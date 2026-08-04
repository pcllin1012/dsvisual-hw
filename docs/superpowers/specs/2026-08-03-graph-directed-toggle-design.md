# Graph Workbench — directed/undirected 切換按鈕 設計文件

- 日期:2026-08-03
- Repo:`/Users/skhuang/course/dsvisual`(main @ 344f6bb)
- 動機:原本為無向的 graph viz,加一個 directed/undirected 切換鈕,讓使用者即時切換有向/無向解讀。

## 0. 範圍與決策(已與使用者確認)

- **加切換鈕的 6 個 viz**:`graph`、`graph-adjlist`、`graph-traversal`、`graph-bfs`、`graph-dfs`、`graph-dijkstra`。
- **排除**:`graph-kruskal`、`graph-prim`(MST 僅對無向圖有意義,有向無意義)。已本就有向的 `graph-topo`、`graph-bellman-ford` 不加(維持有向)。`graph-floyd-warshall` 不涉及。
- **Dijkstra 兩模式皆正權**:切為有向時仍要求 `w ≥ 1`(Dijkstra 不支援負權);Bellman-Ford 仍允許負權。以新的 `allowNegative` 參數解耦(不再以 `directed` 決定負權)。
- 預設無向(現行行為);切換即時重繪。計數不變。

## 1. 現況(已查證)

- `GraphWorkbench.parseEdges(text, weighted, directed)`:`directed` 決定 adj 單/雙向、edges 是否保方向、去重鍵;負權規則 `weighted && !directed && w<1 → 拒絕`(即無向加權要求 w≥1,有向加權允許任意含負)。
- `GW_META`(js/domains/graph.js):bfs/dfs/dijkstra/kruskal/prim 無 `directed`;topo/bellman `directed:true`。`renderGraphVcr` 呼叫 `parseEdges(st.text, meta.weighted, meta.directed)`,`draw()` 以 `meta.directed` 決定是否畫箭頭(已具箭頭 + 反向平行偏移 + marker)。
- `renderGraphStruct`(graph/adjlist)、`renderGraphTraversal`(traversal):呼叫 `parseEdges(st.text, false, false)`,以 `drawUndirectedGraph(parsed, pos, frame)` 繪圖(**無箭頭**);graph 另出鄰接矩陣(`adjMatrix(parsed.adj, n)`)、adjlist 出鄰接串列(由 `parsed.adj`)。
- 各 render 以 `_gwState[methodId]` 保狀態(text、source 等)。

## 2. 架構

### 2.1 切換設定與狀態(js/domains/graph.js)

- 常數 `const GW_DIRECTED_TOGGLE = new Set(['graph','graph-adjlist','graph-traversal','graph-bfs','graph-dfs','graph-dijkstra']);`。
- 每 render 的 `st`(`_gwState[methodId]`)新增 `directed`(預設 `false`)。
- helper:`function gwEffectiveDirected(methodId, st, meta) { return GW_DIRECTED_TOGGLE.has(methodId) ? !!st.directed : !!(meta && meta.directed); }`(renderGraphStruct/Traversal 無 meta → 傳 undefined,回傳 `st.directed`)。

### 2.2 切換鈕(3 個 render 的工具列)

- 僅當 `GW_DIRECTED_TOGGLE.has(methodId)` 時渲染。放在工具列(examples/source 附近)。
- 元素:`<button type="button" class="gw-dir-toggle" data-testid="gw-directed-toggle">…</button>`;文字反映**目前狀態**,雙語:`st.directed ? langOf({zh:'有向圖 ⇄', en:'Directed ⇄'}) : langOf({zh:'無向圖 ⇄', en:'Undirected ⇄'})`。
- onclick:`st.directed = !st.directed;` → 更新鈕文字 → 重繪(rebuild)。

### 2.3 `parseEdges` 負權解耦(js/viz/viz_graph_workbench.js)

- 簽章改為 `parseEdges(text, weighted, directed, allowNegative)`(第 4 參數,預設 `false`)。
- 負權規則由 `weighted && !directed && w<1` 改為 **`weighted && !allowNegative && w<1 → 拒絕`**。
- 語意:負權是否允許由 `allowNegative` 決定,與 `directed`(結構)解耦。有向仍由 `directed` 控制 adj/edges 方向。
- 相容:未傳 `allowNegative` → false → 無向/有向加權皆要求 w≥1(除非明確允許)。既有 Bellman-Ford 需改為明確傳 `allowNegative:true`。

### 2.4 接線(js/domains/graph.js)

- **`GW_META`**:為 `graph-bellman-ford` 加 `allowNegative: true`(取代原本靠 `directed` 允許負權)。其餘不加(dijkstra/kruskal/prim 皆 `false` → 要求正權)。
- **`renderGraphVcr`**:
  - `const dir = gwEffectiveDirected(methodId, st, meta);`
  - `parseEdges` 兩處呼叫改 `parseEdges(text, meta.weighted, dir, meta.allowNegative)`。
  - `draw()` 內以 `dir`(取代 `meta.directed`)決定箭頭分支。
  - 工具列:若 `GW_DIRECTED_TOGGLE.has(methodId)` 加切換鈕 + onclick 重繪。
- **`renderGraphStruct`**(graph/adjlist):
  - `const dir = gwEffectiveDirected(methodId, st);`(無 meta → undirected 依 st)。
  - `parseEdges(st.text, false, dir)`。
  - 繪圖改用 directed-aware 的 `drawGraph(parsed, pos, null, dir)`(見 2.5);矩陣/串列由 `parsed.adj` 自動反映方向(有向 → 非對稱)。
  - 工具列加切換鈕。
- **`renderGraphTraversal`**:
  - `const dir = gwEffectiveDirected('graph-traversal', st);`
  - `parseEdges(st.text, false, dir)`;兩欄 pane 以 `drawGraph(parsed, pos, frame, dir)` 繪(有向 → 箭頭)。
  - 工具列加切換鈕。

### 2.5 有向繪圖 helper(js/domains/graph.js)

- 將 `drawUndirectedGraph(parsed, pos, frame)` 擴為 `drawGraph(parsed, pos, frame, directed)`(保留舊名為薄包裝或直接改名 + 更新 3 呼叫點):
  - `directed` 為真時:加 `<defs>` 箭頭 marker(gw-arrow / gw-arrow-active)、邊終點自節點半徑內縮、反向平行邊法向偏移、`marker-end`——與 `renderGraphVcr` `draw()` 有向分支相同的邏輯。
  - `directed` 為假時:維持現有無向直線。
  - frame 上色(active/visited/frontier/activeEdge)不變;有向時 activeEdge 以精確 (u,v) 比對,無向以 min-max(edges 於 directed/undirected 由 parseEdges 各自正規化,helper 依 `directed` 比對方式)。
- `renderGraphVcr` 的 `draw()` 可續用自身箭頭邏輯,或改呼叫 `drawGraph`(擇一;以不改變 VCR 既有行為為前提)。**MVP 以擴充 drawUndirectedGraph 供 struct/traversal 用;renderGraphVcr 維持自身 draw(僅 dir 來源改 st)**,避免動到 7 個 VCR 方法。

## 3. 檔案清單

- 修改:`js/viz/viz_graph_workbench.js`(`parseEdges` 加 `allowNegative`)、`js/domains/graph.js`(`GW_DIRECTED_TOGGLE`、`gwEffectiveDirected`、3 render 加切換鈕 + `st.directed` + `dir` 接線、`drawUndirectedGraph`→有向感知、`GW_META` bellman `allowNegative`)、`style.css`(`.gw-dir-toggle` 樣式)、`tests/unit/graph_workbench.test.js`(`allowNegative`)、`tests/graph_workbench.spec.js`(切換 E2E)。
- 不動:`js/cloud-config.js`、`tests/random_push.spec.js`、kruskal/prim/topo/floyd 行為、計數測試。

## 4. 測試

- **單元**(`tests/unit/graph_workbench.test.js`):
  - `parseEdges('0-1:-4', true, false, false)` → 拒絕(w<1);`parseEdges('0-1:-4', true, true, false)` → **拒絕**(有向但 allowNegative=false,對應 dijkstra 有向);`parseEdges('0-1:-4', true, true, true)` → ok(bellman)。
  - `DEFAULTS['graph-bellman-ford']` 以 `(true, true, true)` 解析 ok 且 bellman 距離仍 `[0,2,7,4,-2]`(更新既有測試傳 allowNegative)。
  - 有向解析:`parseEdges('0-1,1-2,2-0', false, true)` → adj 單向、edges 保方向(既有測試沿用)。
- **E2E**(`tests/graph_workbench.spec.js`):
  - 切換鈕存在於 6 個 viz(`[data-testid="gw-directed-toggle"]` count 1);不存在於 `graph-kruskal`/`graph-prim`/`graph-topo`/`graph-bellman-ford`(count 0)。
  - `graph-bfs`:預設無向(`.gw-svg line[marker-end]` count 0)→ 點切換鈕 → 有向(`line[marker-end]` count > 0)。
  - `graph`:切為有向後鄰接矩陣非對稱(輸入一條 `0-1`,有向下 `m[0][1]=1` 但 `m[1][0]=0`——以 `.gw-matrix` 格子斷言,或至少箭頭出現)。
  - `graph-traversal`:切為有向後兩欄 pane 出現箭頭(`line[marker-end]`)。
  - `graph-dijkstra`:切為有向後仍要求正權(輸入 `0-1:-4` Build → `.gw-err` 顯示)。
- 全套 `npm run test:all` 綠;計數不變;`js/cloud-config.js` 未動。

## 5. 驗收標準

- 6 個 viz 有 directed/undirected 切換鈕,預設無向;點擊即時切換並重繪(有向顯示箭頭、adj 矩陣/串列非對稱、BFS/DFS/Dijkstra 依邊方向)。
- Dijkstra 兩模式皆拒絕負權;Bellman-Ford 仍允許負權;kruskal/prim/topo/bellman 無此鈕。
- 其他方法、計數不變;`js/cloud-config.js` 未動;UI 雙語、語言切換即時。
- 單元 + E2E 全綠。

## 6. 風險與緩解

- **`parseEdges` 契約變更(`allowNegative`)**:唯一負權消費端為 bellman-ford(改明確傳 true);其餘預設 false 行為與現況一致(無向加權 w≥1);單元測試同批更新。全域搜尋確認 parseEdges 僅 workbench 使用。
- **不動 7 個 VCR 方法的箭頭邏輯**:renderGraphVcr `draw()` 續用自身箭頭碼,僅把 `meta.directed` 換成 `dir`(對 topo/bellman `dir===meta.directed` 不變;對 bfs/dfs/dijkstra 由 st.directed 控制)。
- **struct/traversal 新增箭頭**:擴充 `drawUndirectedGraph`;無向路徑維持原樣(既有 struct/traversal E2E 不變);有向路徑新增。
- **有向未連通/自環**:parseEdges 既有規則(跳自環);有向 BFS/DFS 只走可達,合理。
- **切換後既有存檔/預設**:同一 text 以新 directed 重新解析;預設五邊形在有向下為有向五邊形,合理。
