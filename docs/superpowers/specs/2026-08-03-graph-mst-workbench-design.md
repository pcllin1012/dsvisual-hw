# Graph Workbench — MST 批次(Kruskal + Prim)設計文件

- 日期:2026-08-03
- Repo:`/Users/skhuang/course/dsvisual`(main @ d0076a1)
- 動機:延續 graph workbench 的 pilot(bfs/dfs/dijkstra),把**下一批** graph 方法轉為工作台模式(邊表輸入 + 🎲 隨機 + 難度 + 範例 + VCR)。本批做兩個**最小生成樹(MST)**演算法:`graph-kruskal`、`graph-prim`——皆為**加權無向圖**,與 Dijkstra 完全相同的輸入模型,直接重用既有工作台。

## 0. 範圍與決策(已與使用者確認)

- **本批只做**:`graph-kruskal`、`graph-prim`。
- 加權無向邊表(`u v w`),沿用既有 `parseEdges(text, true)`(回傳 `edges:[{u,v,w}]`、`adj`)、圓形 `layout`、`buildFrameControls` VCR、`examples`/`random`/難度 機制。
- 其餘方法(`graph`、`graph-adjlist`、`graph-traversal`、`graph-topo`、`graph-bellman-ford`、`graph-floyd-warshall`)**本批不動**(directed / matrix / 結構視圖需後續批次的框架擴充)。
- 不新增方法/群組 → 計數不變。

## 1. 現況(已查證)

- `js/viz/viz_graph_workbench.js`:匯出 `{ parseEdges, layout, DEFAULTS, bfsFrames, dfsFrames, dijkstraFrames }`。Frame 形狀:`{ visited, frontier, active, activeEdge, dist, order, message:{zh,en} }`。`parseEdges(text, true)` 回傳無向去重的 `edges:[{u,v,w}]`(u<v)與 `adj`。`DEFAULTS` 目前為 pilot 三方法的五邊形預設。
- `js/domains/graph.js`:`renderGraphVcr(methodId)` + `GW_META`(pilot 三筆,`gen:(a,s)=>...(a,s)` 收 `(adj, source)`)+ 本地 `gw*` 範例 helper;`draw(f)` 依 frame 上色節點/邊,`meta.weighted && f.dist` 時畫距離標籤。`graph-kruskal` 仍指向舊 `renderGraph`(async `runKruskalMST`,union-find,固定 5 節點);`graph-prim` 仍指向舊 `renderPrim`(自帶固定資料 + `buildFrameControls`,UI 類名 `.wgraph-*`、`[data-testid="prim-stats"]`)。
- `js/random_input.js`:`graphEdgeList(rng, difficulty, weighted)` 已存在(weighted=true 供 dijkstra);`randomInputFor` dispatch 尚無 kruskal/prim。
- 既有 E2E(`tests/visualizer.spec.js`):Kruskal 測試(~L214)僅斷言 active + `.code-panel-filename` 'graph_kruskal.cpp'(改 render 後**仍會通過**,code panel 來自 registry `code:`);Prim 測試(~L685)斷言舊 UI `.wgraph-node`(5)、`.wgraph-edge`(7)、`[data-testid="prim-stats"]`——**會失效,需重寫**;L747 導覽測試載入 graph-prim 後檢查無 console error(新 render 不丟錯即通過);`smoke_modes` 含 `graph-prim`(載入不崩即可)。

## 2. 架構

### 2.1 `js/viz/viz_graph_workbench.js` — 兩個 MST frame generator + Frame 擴充

- **Frame 擴充**:新增選填欄位 `treeEdges: Array<{u,v}>`(目前已被選入 MST 的邊,u<v)。既有 bfs/dfs/dijkstra generator **不設此欄**(render 端以 `f.treeEdges || []` 容錯),行為不變。
- `kruskalFrames(edges, n)` → `Array<Frame>`:
  - 依 `w` 升冪排序 `edges`(平手時 u、v 次序穩定);union-find(path compression + union by rank)。
  - 逐邊產生 frame:`activeEdge={u,v}`,若兩端不同集合 → 併集、`treeEdges` 加入該邊、`visited/order` 累積已連接節點,`message` zh「加入邊 u–v(w)」/ en「Add edge u–v (w)」;否則 `message` zh「捨棄 u–v:會成環」/ en「Skip u–v: would form a cycle」。
  - 第 0 幀 = 初始(空 MST,`message` 說明「依權重由小到大考慮每條邊」);末幀 = MST 完成(`treeEdges.length === n-1`,或圖不連通時為森林),`message` 標示總權重。
  - `dist:null`、`frontier:[]`、`active:null`(以 `activeEdge` 表示考慮中的邊)。
- `primFrames(adj, source)` → `Array<Frame>`:
  - 從 `source` 長樹;每步在「已在樹中的節點」跨出的邊裡選最小權重、對端未在樹中者;加入該節點與邊。
  - frame:`activeEdge` = 本步加入的邊,`treeEdges` 累積,`visited/order` = 樹中節點,`frontier` = 目前候選 fringe 節點;`message` zh「加入 u–v(w),節點 v 入樹」/ en「Add u–v (w); node v joins the tree」。
  - 第 0 幀 = 只有 source 在樹中(`visited=[source]`);末幀 = 全部可達節點入樹。`dist:null`。
- **DEFAULTS**:為 `graph-kruskal`、`graph-prim` 加入與 dijkstra 相同的**五邊形加權**預設字串(`'0 1 4\n1 2 1\n2 3 6\n3 4 2\n4 0 3\n0 2 5'`),與「原始示範圖」一致。
- 匯出 `api` 加 `kruskalFrames`、`primFrames`。

### 2.2 `js/domains/graph.js` — 擴充共用 `renderGraphVcr`

- **`GW_META`** 加兩筆(`gen` 改為收整個 `parsed` 物件,讓 Kruskal 取 `parsed.edges`;pilot 三筆同步改為 `(parsed, source) => ...(parsed.adj, source)`):
  ```
  'graph-kruskal': { weighted:true, usesSource:false, gen:(p,s)=>GraphWorkbench.kruskalFrames(p.edges, p.n) },
  'graph-prim':    { weighted:true, usesSource:true,  gen:(p,s)=>GraphWorkbench.primFrames(p.adj, s) },
  ```
  呼叫點由 `meta.gen(parsed.adj, st.source)` 改為 `meta.gen(parsed, st.source)`。
- **來源選擇器**:以 `meta.usesSource`(預設 true)決定是否渲染「起點/Source」`<label>`;Kruskal(`usesSource:false`)不顯示來源控制,且 `st.source` 不影響其 frames。
- **`draw(f)`**:繪邊時,若邊落在 `f.treeEdges`(以 `min-max` key 比對)→ 加 `tree` class(MST 已選,綠粗);`activeEdge` 維持 `active`(琥珀,考慮中)。以 `f.treeEdges || []` 容錯,pilot 不受影響。因 MST frames `dist:null`,不畫節點距離標籤;`meta.weighted` 仍畫邊權重。
- **接線**:`graph-kruskal`、`graph-prim` 兩行 `R().attach(...)` 改指向 `() => renderGraphVcr('graph-kruskal'|'graph-prim')`(其餘 registry 行不動)。舊 `runKruskalMST`/`renderPrim` 成為 dead code(保留,降低風險)。

### 2.3 `js/random_input.js`

- `randomInputFor` dispatch 加:
  ```
  case 'graph-kruskal':
  case 'graph-prim':
    return { text: graphEdgeList(rng, difficulty, true) };
  ```
  (weighted,重用既有 `graphEdgeList`;產出保證連通、n≤12。)

### 2.4 `style.css`

- 新增 `.gw-svg .graph-edge.tree { stroke:#34d399; stroke-width:4; }`(MST 已選邊,綠粗)+ dark 微調。沿用既有 `.gw-*` / `.graph-*` 樣式。

## 3. 檔案清單

- 修改:`js/viz/viz_graph_workbench.js`(kruskalFrames/primFrames + Frame `treeEdges` + DEFAULTS)、`js/domains/graph.js`(GW_META 兩筆 + gen 簽名調整 + draw treeEdges + usesSource + 2 attach 改指向)、`js/random_input.js`(2 dispatch case)、`style.css`(`.graph-edge.tree`)、`tests/unit/graph_workbench.test.js`(kruskal/prim frames 斷言)、`tests/graph_workbench.spec.js`(kruskal/prim E2E)、`tests/visualizer.spec.js`(重寫 Prim 測試 ~L685)。
- 不動:`js/cloud-config.js`、`tests/random_push.spec.js`、其餘 6 個 graph 方法、pilot 三方法行為、計數測試。

## 4. 測試

- **單元**(`tests/unit/graph_workbench.test.js` 增補):
  - `kruskalFrames`:在已知加權圖上,末幀 `treeEdges.length === n-1`、總權重等於教科書 MST;至少一幀為 reject(成環);每幀 `message.{zh,en}` 非空;`dist===null`。
  - `primFrames`:末幀 `treeEdges.length === n-1`、總權重等於 Kruskal(同一圖 MST 權重相同);第 0 幀 `visited` 僅含 source;每幀 message 雙語。
  - `DEFAULTS['graph-kruskal'|'graph-prim']` parse `ok`、n=5。
- **E2E**(`tests/graph_workbench.spec.js` 增補;`tests/visualizer.spec.js` 重寫 Prim):
  - kruskal、prim:載入 → `[data-testid="gw-input"]` 與 `.stepctl` 可見、`.gw-svg .graph-node` 數 5;scrub slider 到末幀 → `.gw-svg .graph-edge.tree` 出現(MST 已選邊);example 往返。
  - 重寫 Prim 測試(~L685):改斷言新 UI(`.code-panel-filename` 'graph_prim.cpp' 保留;`.gw-svg .graph-node` 數 5;`.stepctl [data-action="step"]` 點擊後 `.stepctl-count` 前進)。
  - Kruskal 測試(~L214)不動(仍通過);導覽/smoke 測試不動(新 render 不崩)。
- 全套 `npm run test:all` 綠;計數不變;`js/cloud-config.js` 未動。

## 5. 驗收標準

- `graph-kruskal`、`graph-prim` 皆為工作台:加權邊表輸入 + 🎲 難度隨機 + 範例(localStorage)+ 完整 VCR;演算法以 frame 逐步、可倒帶;MST 已選邊高亮。
- Kruskal 無來源控制;Prim 有來源(起點)控制。
- 其餘方法、pilot、計數不變;`js/cloud-config.js` 未動;UI/步驟雙語,語言切換即時。
- 單元 + E2E 全綠。

## 6. 風險與緩解

- **Frame 契約擴充(`treeEdges`)**:選填欄,render 端 `|| []` 容錯;pilot generator 不設 → 不受影響;單元測試涵蓋。
- **`gen` 簽名由 `(adj,source)` 改為 `(parsed,source)`**:唯一呼叫點在 `renderGraphVcr`(同批一起改);pilot 三筆 meta 同步更新;generator 本身簽名不變(仍是 `(adj,source)`/`(edges,n)`),由 meta wrapper 轉接。
- **舊 Prim E2E 失效**:同批重寫為新 UI;Kruskal E2E 只查 filename 故不受影響。
- **來源控制對 Kruskal 無意義**:以 `usesSource` 隱藏,避免誤導。
- **不連通隨機圖**:`graphEdgeList` 已保證連通;若使用者手動輸入不連通圖,Kruskal 產出森林、Prim 只長 source 所在連通分量(合理行為,message 可如常)。
