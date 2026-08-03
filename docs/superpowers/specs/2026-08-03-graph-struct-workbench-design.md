# Graph Workbench — 結構/比較批次(graph + graph-adjlist + graph-traversal)設計文件

- 日期:2026-08-03
- Repo:`/Users/skhuang/course/dsvisual`(main @ de35bae)
- 動機:完成 graph workbench 收尾批次:把最後 3 個 graph 方法轉為工作台輸入模式。與前幾批(單一演算法 VCR)不同,這批是**結構視圖 / 比較視圖**,並非單一演算法逐步:
  - `graph`:圖的繪製 + **鄰接矩陣**表示。
  - `graph-adjlist`:圖的繪製 + **鄰接串列**表示(linked-list 列)。
  - `graph-traversal`:BFS | DFS **雙欄比較**,單一同步 VCR。

## 0. 範圍與決策(已與使用者確認)

- **本批只做**:`graph`、`graph-adjlist`、`graph-traversal`。皆為**無向、無權**。
- 三者皆加工作台工具列:邊表輸入 + Build + 🎲 隨機 + 難度 + 範例(examples/localStorage);重用 `parseEdges`、`layout`、`graphEdgeList(...,false)`、`gw*` 範例 helper。
- **graph-traversal 用單一同步 VCR**:一條 transport 同時驅動 BFS 與 DFS 兩欄(較短者停在末幀);保留現有同步單步行為並加入完整倒帶/scrub。
- **graph 與 graph-adjlist 顯示不同表示**:`graph` = 繪圖 + 鄰接矩陣;`graph-adjlist` = 繪圖 + 鄰接串列列。兩者**無 VCR**(結構視圖,無步驟)。
- 預設用五邊形(5 節點),使既有計數(如 adjlist 5 列)維持。
- 其餘方法(已轉換的 7 個 + `graph-floyd-warshall`)與計數**不動**。

## 1. 現況(已查證)

- `graph`(base):`renderGraph` 走到共用 `#graph-edges`(index.html 內固定的 SVG,含固定 5 節點 gn-0..gn-4)+ 舊「加邊」控制(`graph-u`/`graph-v`/`btn-graph-add`);為互動式無向編輯器,無演算法。`#graph-edges` 為 index.html 靜態元素(持續存在)。
- `graph-adjlist`:`renderGraph` 內分支,固定 5 節點鄰接串列 → `.adjlist-container` 內多個 `.adjlist-row`(`[i]` `.adjlist-vertex` + `→` `.adjlist-arrow` + `.adjlist-node` + `null` `.adjlist-null`)。
- `graph-traversal`:`renderGraphDual`,固定 5 節點,雙欄 `.graph-dual-grid` > `.graph-dual-pane[data-pane=bfs|dfs]`(各含 `<h4>`、pane SVG、`.bfs-queue`/`.dfs-stack`/`.bfs-visited`),以外部 `runtimeControls` 的 Step/Reset 同步單步(`stepBtn.onclick = () => { bfsStep(); dfsStep(); }`),無 scrubber。
- 工作台既有:`renderGraphVcr` + `GW_META`(directed/weighted/usesSource);`gwLoadExamples`/`gwSaveExample`/`gwBuildExamplesSelect`/`refreshExamplesSelect`;`GraphWorkbench.parseEdges(text, weighted, directed)`、`layout`、`bfsFrames`/`dfsFrames`;`K().buildFrameControls(frames, paint, opts)`(VCR)。`graphEdgeList(rng, difficulty, false)`(無向無權隨機,連通、n≤12)。
- 既有 E2E:adjlist 測試(visualizer.spec.js ~L235)`.adjlist-row` 數 5;traversal 測試(~L261)`.graph-dual-pane` 數 2;導覽/no-error 測試(~L748)載入 `graph` 檢查 `#graph-edges` 數 1(靜態元素,持續存在,不受影響)。

## 2. 架構

### 2.1 `js/viz/viz_graph_workbench.js` — 純 helper

- `adjMatrix(adj, n)` → n×n 的 0/1 矩陣(`Array<Array<0|1>>`);`matrix[i][j] = 1` 若 `adj[i]` 含 `to=j`。純函式,供 `graph` 矩陣視圖與單元測試。加入 `api` 匯出。
- 其餘無需新 generator(traversal 重用 `bfsFrames`/`dfsFrames`;結構視圖直接由 `parsed.adj` 衍生)。

### 2.2 `js/domains/graph.js` — 兩個新 render + 共用工具列

- **共用工具列 helper**(render 內或小函式):輸出邊表 `textarea.gw-input` + `Build .gw-build` + 🎲 `.rand-btn` + `gwBuildExamplesSelect(methodId, DEF)`(`.ex-select`)+(traversal 才有)source `.gw-source`。事件:Build/🎲/範例選取 → 設 `st.text` → 重繪;有效輸入存 example + `refreshExamplesSelect`。沿用 `acquireDynamicVizHost` + `host.style.width='100%'`。
- **`renderGraphStruct(methodId)`**(供 `graph`、`graph-adjlist`):
  - `const meta = { 'graph': {view:'matrix'}, 'graph-adjlist': {view:'list'} }[methodId]`。
  - `parsed = GraphWorkbench.parseEdges(st.text, false, false)`(無向無權)。失敗 → 顯示 `langOf(error)`。
  - Body:左側圖 SVG(`layout(parsed.n)` + 無向直線邊 + 節點圓與標籤,重用 `.gw-svg`/`.graph-node`/`.graph-edge`/`.graph-node-label`);右側表示面板:
    - `view==='matrix'`:`adjMatrix(parsed.adj, parsed.n)` → HTML table,首列/首欄為索引,格子 1/0(1 高亮)。class `.gw-matrix`。
    - `view==='list'`:由 `parsed.adj` 產生 `.adjlist-container` > 每節點 `.adjlist-row`(`[i]` + 各鄰居 `→ node` + `→ null`),沿用既有 `.adjlist-*` class。
  - 無 VCR、無 source。語言切換即時重繪(沿用既有路徑)。
- **`renderGraphTraversal()`**(供 `graph-traversal`):
  - 工具列含 source `.gw-source`(0..n−1)。`parsed = parseEdges(st.text, false, false)`。
  - `const bfs = GraphWorkbench.bfsFrames(parsed.adj, src); const dfs = GraphWorkbench.dfsFrames(parsed.adj, src);` `const L = Math.max(bfs.length, dfs.length);`
  - Body:`.graph-dual-grid` > 兩個 `.graph-dual-pane[data-pane=bfs|dfs]`,各含 `<h4>`(BFS(queue)/DFS(stack),雙語)、pane SVG(`.gw-svg`,同 layout 定位)、佇列/堆疊 + 已訪顯示(沿用 `.bfs-queue`/`.dfs-stack`/visited 顯示或新 `.gw-*`;保留 `.graph-dual-pane` class 供既有測試)。
  - 單一 `K().buildFrameControls(Array.from({length:L}), paint, { runIntervalMs: 700 })`;`paint(_f, i)`:BFS 欄以 `bfs[Math.min(i, bfs.length-1)]`、DFS 欄以 `dfs[Math.min(i, dfs.length-1)]` 繪製(節點上色 visited/frontier/active、activeEdge 高亮,與 renderGraphVcr 無向繪法一致),更新佇列/堆疊/已訪文字與步驟說明 `langOf(frame.message)`。
  - source 改變 → 重算 frames + 重繪。
- **共用節點/邊繪製**:抽一個 render 內小工具 `drawUndirectedGraph(parsed, pos, frame?)` 回傳 SVG 字串(節點圓 + 標籤 + 無向邊 + 可選 frame 上色),供 struct(無 frame)與 traversal(有 frame)共用,降低重複。**不改動** `renderGraphVcr` 既有 `draw`。
- **接線**:`graph`、`graph-adjlist`、`graph-traversal` 三行 `R().attach(...)` 改指向新 render(`() => renderGraphStruct('graph')`、`() => renderGraphStruct('graph-adjlist')`、`renderGraphTraversal`)。其餘不動。舊 `renderGraphDual`/base graph 分支成 dead code(保留)。

### 2.3 `js/random_input.js`

- dispatch 加:
  ```
  case 'graph':
  case 'graph-adjlist':
  case 'graph-traversal':
    return { text: graphEdgeList(rng, difficulty, false) };
  ```
  (無向無權,重用既有 `graphEdgeList`;連通、n≤12。)
- DEFAULTS(於 `viz_graph_workbench.js`):`'graph'`、`'graph-adjlist'`、`'graph-traversal'` 皆用五邊形無權預設 `'0 1\n1 2\n2 3\n3 4\n4 0\n0 2'`(n=5,與 bfs/dfs 相同)。

### 2.4 `style.css`

- 新增 `.gw-matrix`(鄰接矩陣 table:格線、索引標頭、1 格高亮)+ dark。
- 沿用既有 `.adjlist-*`、`.graph-dual-grid`/`.graph-dual-pane`、`.gw-*`、`.graph-node/edge`。少量新增。

## 3. 檔案清單

- 修改:`js/viz/viz_graph_workbench.js`(`adjMatrix` + DEFAULTS 三鍵)、`js/domains/graph.js`(`renderGraphStruct` + `renderGraphTraversal` + `drawUndirectedGraph` 共用 helper + 3 attach 改指向)、`js/random_input.js`(3 dispatch case)、`style.css`(`.gw-matrix`)、`tests/unit/graph_workbench.test.js`(`adjMatrix`)、`tests/graph_workbench.spec.js`(三方法 E2E)、`tests/visualizer.spec.js`(更新 adjlist ~L235 與 traversal ~L261 測試為新工作台)。
- 不動:`js/cloud-config.js`、`tests/random_push.spec.js`、`index.html` 的 `#graph-edges` 靜態元素(保留)、其餘 graph 方法、計數測試。

## 4. 測試

- **單元**(`tests/unit/graph_workbench.test.js` 增補):
  - `adjMatrix`:在已知無向圖上回傳對稱 0/1 矩陣;`matrix[i][j]===1` iff 邊 (i,j) 存在;對角線 0。
  - DEFAULTS 三鍵以無向解析 `ok`、n=5。
- **E2E**(`tests/graph_workbench.spec.js` 增補;`tests/visualizer.spec.js` 更新):
  - `graph`:載入 → `[data-testid="gw-input"]` 可見、`.gw-svg .graph-node` 數 5、`.gw-matrix` 出現(含 1/0 格);無 `.stepctl`(無 VCR)、無 `gw-source`。
  - `graph-adjlist`:載入 → `.gw-svg .graph-node` 數 5、`.adjlist-row` 數 5;無 `.stepctl`。
  - `graph-traversal`:載入 → `.graph-dual-pane` 數 2、`.stepctl` 可見(單一同步 VCR)、`gw-source` 存在;點 `.stepctl [data-action="step"]` → `.stepctl-count` 前進;兩欄各 `.gw-svg .graph-node` 數 5。
  - 更新 visualizer.spec.js:adjlist 測試改以新工作台選取器斷言 `.adjlist-row` 數 5(保留 filename 檢查);traversal 測試斷言 `.graph-dual-pane` 數 2(保留 filename)。
  - 🎲 隨機:對三方法點 🎲 後 `.gw-input` 非空且重繪成功(節點>0)。
- 全套 `npm run test:all` 綠;計數不變;`js/cloud-config.js` 未動。

## 5. 驗收標準

- `graph`(繪圖+矩陣)、`graph-adjlist`(繪圖+串列)、`graph-traversal`(雙欄+單一同步 VCR)皆為工作台:邊表輸入 + 🎲 難度隨機 + 範例。
- graph/adjlist 無 VCR;traversal 單一 VCR 同步兩欄、可 scrub。
- 其餘方法、計數不變;`js/cloud-config.js` 未動;UI/步驟雙語,語言切換即時。
- 單元 + E2E 全綠。**至此 11 個 graph 方法中 10 個完成工作台化(僅剩 graph-floyd-warshall 的矩陣/全點對模型另議)。**

## 6. 風險與緩解

- **批次異質**(2 結構 + 1 比較):以兩個 render(`renderGraphStruct` 參數化 view、`renderGraphTraversal`)+ 共用 `drawUndirectedGraph` helper 收斂;不動既有 `renderGraphVcr`。
- **雙欄單一 VCR 長度不一**:combined 長度取 max,較短者 `Math.min(i, len-1)` 停末幀;paint 同時更新兩欄。
- **既有 adjlist/traversal E2E**:保留 `.adjlist-row`/`.graph-dual-pane` class 並同批更新測試;預設 5 節點使 `.adjlist-row` 仍為 5。
- **base graph 的 `#graph-edges`**:為 index.html 靜態元素,轉 dynamic host 後仍存在,導覽測試(count 1)不受影響;不刪除該元素。
- **隨機連通**:`graphEdgeList` 保證連通、n≤12,適用三方法。
- **重複繪製碼**:抽 `drawUndirectedGraph` 共用;struct 與 traversal 共用同一節點/邊繪法,避免分歧。
