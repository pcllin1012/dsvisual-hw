# Graph Workbench — 力導向佈局(減少邊交叉)設計文件

- 日期:2026-08-03
- Repo:`/Users/skhuang/course/dsvisual`(main @ 1bd39de)
- 動機:目前 graph 佈局為固定圓形(節點等角排在圓上),長弦邊大量交叉。改用**決定性力導向(Fruchterman–Reingold)佈局**,依邊結構自然展開、盡量減少邊交叉。共用 `layout`,所有 graph workbench 方法一次受益。

## 0. 範圍與決策(已與使用者確認)

- 佈局改**力導向**(節點互斥、邊吸引);**決定性**(相同輸入 → 相同輸出,跨重繪穩定)、**貼合 viewBox**、節點不重疊。
- 保留 `layout(n, cx, cy, r)`(不含 edges)= 圓形(向後相容 + 既有單元測試);新增第 5 參數 `edges` → 提供時走力導向。
- 影響共用 `layout` 的 3 個呼叫點(renderGraphVcr / renderGraphStruct / renderGraphTraversal)→ 全部 graph 方法(bfs/dfs/dijkstra/kruskal/prim/topo/bellman/graph/adjlist/traversal/multilist)。
- 不動:演算法/frame 資料(索引式)、labels、cpp/code_db、`js/cloud-config.js`、計數。

## 1. 現況(已查證)

- `GraphWorkbench.layout(n, cx, cy, r)`(js/viz/viz_graph_workbench.js):純圓形,`pos[i] = {cx + r cosθ, cy + r sinθ}`,θ 由 i 等分;node 0 在頂端。純函式、決定性。
- 3 呼叫點皆 `GraphWorkbench.layout(parsed.n, 300, 200, 150)`(js/domains/graph.js:199/318/426);`pos` 供 SVG 節點/邊座標(索引式);viewBox `0 0 600 400`,節點 r=18。
- 單元測試(tests/unit/graph_workbench.test.js:55-63):`layout(4,300,200,150)` 斷言在圓上 + 決定性。
- edges 為 `parsed.edges = [{u,v,w}]`(索引)。

## 2. 架構

### 2.1 `layout(n, cx, cy, r, edges)` — 決定性力導向(js/viz/viz_graph_workbench.js)

- 簽章加第 5 參數 `edges`(選填)。**未提供 edges → 維持現行圓形**(既有測試/相容)。
- 提供 edges 時,執行 FR:
  1. **決定性初始化**:以圓形為基底 + 依 index 的決定性微擾破對稱(不使用 `Math.random`),如 `jitter = ((i*2654435761) % 1000)/1000` 映到 ±ε;避免對稱僵局。n≤1 → 置中直接回傳。
  2. **參數**:工作區 `W=600,H=400`;理想邊長 `k = Math.sqrt((W*H)/n) * 0.8`;迭代 `ITER=300`;溫度 `t` 由 `W/8` 線性冷卻至 ~1。
  3. **每輪**:
     - 斥力(所有節點對 i≠j):`d=max(dist,0.01)`;位移 `+= (Δ/d) * (k*k/d)`。
     - 引力(每條 edge (u,v),無向處理):`d=dist`;`disp[u] -= (Δ/d)*(d*d/k)`、`disp[v] += ...`。
     - 更新:`pos[i] += (disp[i]/|disp[i]|) * min(|disp[i]|, t)`;冷卻 `t`。
  4. **貼合**:計算結果 bounding box,以**等比縮放**(不變形)平移置中,填入以 `(cx,cy)` 為心、半寬/半高 `r` 的方框(→ 落在 viewBox 內、留邊)。單點/退化 → 置中。
- 決定性:無隨機、固定迭代 → 相同 `(n, edges)` 恆得相同 `pos`(跨重繪、語言切換穩定)。純函式、不碰 DOM。
- 效能:n≤12,O(ITER·n²) 微不足道。

### 2.2 接線(js/domains/graph.js)

- 3 呼叫點改為 `GraphWorkbench.layout(parsed.n, 300, 200, 150, parsed.edges)`。其餘 render 邏輯不變(pos 仍索引式;節點/邊/標籤繪製不變)。
- 有向方法:edges 帶方向,FR 以無向對待(吸引不分向);箭頭渲染不受影響(render 端另處理)。

## 3. 檔案清單

- 修改:`js/viz/viz_graph_workbench.js`(`layout` 力導向)、`js/domains/graph.js`(3 呼叫點傳 edges)、`tests/unit/graph_workbench.test.js`(力導向不變量 + 交叉數比較)、`tests/graph_workbench.spec.js`(渲染/邊界 sanity,如需要)。
- 不動:`js/cloud-config.js`、`tests/random_push.spec.js`、cpp/code_db、演算法/generators、計數。

## 4. 測試

- **單元**(`tests/unit/graph_workbench.test.js`):
  - 保留既有「無 edges → 圓形 + 決定性」測試(`layout(4,...)`)。
  - **決定性**:`layout(n,300,200,150,edges)` 連呼兩次 `deepStrictEqual`。
  - **邊界**:所有 pos 落在 `[cx-r-ε, cx+r+ε] × [cy-r-ε, cy+r+ε]`(含小容差),且在 viewBox `0..600 × 0..400` 內。
  - **不重疊**:任兩節點距離 > 門檻(如 > 2*r_node 的一半,確保可讀)。
  - **交叉減少**:在固定圖(五邊形 + 對角 `A-B,B-C,C-D,D-E,E-A,A-C`)上,以線段相交計數 helper 比較:力導向 `crossings ≤ 圓形 crossings`(決定性,不 flaky);於較密圖(如 `A-B,A-C,A-D,B-C,B-D,C-D` = K4)亦 `≤`。
- **E2E**(`tests/graph_workbench.spec.js`):既有節點/邊 count 測試仍過(佈局改變不影響 count);載入預設,`.gw-svg .graph-node` 數不變、皆可見(佈局貼合 viewBox → 不溢出)。
- 全套 `npm run test:all` 綠;計數不變;`js/cloud-config.js` 未動。
- **視覺**:瀏覽器確認預設與若干範例邊交叉明顯減少、節點分佈自然、不溢出 viewBox。

## 5. 驗收標準

- 所有 graph 方法採力導向佈局,邊交叉明顯少於圓形;佈局決定性(重繪/語言切換不跳動)、貼合 viewBox、節點不重疊。
- 演算法結果、frame 資料、labels、計數、其他方法不變;`js/cloud-config.js` 未動。
- 單元 + E2E 全綠;瀏覽器視覺確認。

## 6. 風險與緩解

- **決定性**:不用 `Math.random`;以 index 決定性微擾破對稱;固定迭代 → 穩定、可測。
- **溢出 viewBox**:結果 bounding box 等比縮放置中至 `(cx±r, cy±r)` 方框 → 保證在 600×400 內留邊。
- **節點重疊/退化**(如所有節點共點、n=1、無邊):置中/圓形回退;斥力主導避免重疊;單元測試守不重疊。
- **交叉未必為 0**:FR 為啟發式,不保證平面化;目標為「明顯減少」而非零交叉;測試以 `≤ 圓形` + 視覺確認。
- **既有圓形相容**:無 edges 呼叫仍圓形;既有 layout 測試不變。
- **效能/穩定**:n≤12,固定 300 迭代;每次 rebuild 重算(與現行同),決定性 → 不因重算而位移。
