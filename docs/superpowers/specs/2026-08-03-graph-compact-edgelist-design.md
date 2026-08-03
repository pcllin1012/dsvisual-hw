# Graph Workbench — 精簡邊表格式(u-v,u-v,…)設計文件

- 日期:2026-08-03
- Repo:`/Users/skhuang/course/dsvisual`(main @ dee2938)
- 動機:workbench 的邊表輸入目前為「每行一條邊 `u v`」。使用者希望改為 **`graph-scc` 已採用的精簡逗號格式** `0-1,1-2,2-0,2-3,3-4,4-3,4-5`(SCC 範例)。統一 workbench 10 個方法的邊表輸入為精簡格式,並向後相容舊格式。

## 0. 範圍與決策(已與使用者確認)

- **範圍**:所有 10 個 workbench 方法(bfs/dfs/dijkstra/kruskal/prim/topo/bellman-ford/graph/graph-adjlist/graph-traversal),共用 `GraphWorkbench.parseEdges`。
- **相容**:`parseEdges` 改為**寬鬆解析**——同時接受新精簡格式與舊格式。邊以**逗號或換行**分隔;節點對以 **`-` 或空白**分隔。舊 localStorage 範例(`0 1\n1 2`)仍可解析,不遺失。
- **權重**:精簡加權格式 `u-v:w`(冒號),支援負權(`0-1:-4`);舊 `u v w` 空白格式續存。
- **預設 / placeholder**:所有 10 個 DEFAULTS 與 placeholder 改為新精簡格式(規範顯示)。
- **隨機**:`graphEdgeList`/`graphDagText` 改輸出新精簡格式(🎲 填入即為 `0-1,1-2,…`)。
- **不動**:`graph-scc`/`graph-components`/`graph-bipartite`/`graph-closure`/`graph-matrix`(各有自己的 `parseInput`,`n|edges` 格式)——本次不涉及。`js/cloud-config.js`、計數。

## 1. 現況(已查證)

- `js/viz/viz_graph_workbench.js` `parseEdges(text, weighted, directed)`:以 `\n` 切行,每行以 `\s+` 切,`need = weighted?3:2`,嚴格要求恰 `need` 個整數;`w<1` 於「加權且非有向」時拒絕(允許有向負權);去重(有向有序對 / 無向 min-max)、跳自環、`n=maxIdx+1` 上限 12。回傳 `{ok, n, adj, edges}`。
- 唯一呼叫端:`js/domains/graph.js`(`renderGraphVcr`、`renderGraphStruct`、`renderGraphTraversal` 的 `rebuild`/`applyText`)+ 單元/E2E 測試。`graph-scc` 等使用獨立 `GraphSccViz.parseInput`(`n|u-v,…`),不受影響。
- 目前 DEFAULTS(舊格式):無權 `'0 1\n1 2\n2 3\n3 4\n4 0\n0 2'`;加權 dijkstra/kruskal/prim `'0 1 4\n1 2 1\n…'`;topo `'0 1\n0 2\n…'`;bellman `'0 1 6\n…\n1 4 -4\n…'`。
- `graphEdgeList(rng, difficulty, weighted)`、`graphDagText(rng, difficulty, weighted)`(random_input.js)目前以 `'u v'`/`'u v w'` + `\n` 產出。
- graph-scc 參考:`edgesToStr(edges)=edges.map(e=>e.u+'-'+e.v).join(',')`;範例 `'4|0-1,1-2,2-3,3-0'`。

## 2. 架構

### 2.1 `parseEdges` 寬鬆化(js/viz/viz_graph_workbench.js)

保持簽章 `parseEdges(text, weighted, directed)` 與回傳結構不變;只改**分詞**:

- **邊分隔**:先以 `/[,\n]/` 切 `text` 為邊 token,`trim` 並略過空 token。
- **每個 token 解析為 `{u, v, w}`**(依序嘗試,清楚區分 `-` 為分隔 vs 負號):
  1. **含 `:`(精簡加權)**:`pair:wstr`。`pair` 以 `/[-\s]+/` 切為兩個非負整數 u、v(此時 pair 不含權重,`-` 純為分隔,安全);`w = Number(wstr)`(可為負整數)。
  2. **符合 `/^\d+\s*-\s*\d+$/`(精簡無權)**:以 `-` 切為 u、v;`w` 未給(加權方法 → 稍後報「需權重」;無權方法 → `w=1`)。
  3. **其餘(舊空白格式)**:以 `/\s+/` 切;2 段 → u、v(w 未給);3 段 → u、v、w(w 可為負,空白格式不吃負號)。
  4. 皆不符 → 回傳雙語 `error`(格式說明,含 `u-v` / `u-v:w` 範例)。
- **驗證**(沿用既有規則):u、v、w 為整數;u,v ≥ 0;`weighted` 時 w 必須存在(缺 → 雙語 error「加權需 u-v:w」);`weighted && !directed && w < 1` → 拒絕(無向加權仍不允許負/零權);`n>12`、空輸入 → 既有雙語 error。
- **去重 / adj / edges 建構**:完全沿用現有(有向單向 + 有序去重;無向雙向 + min-max 去重;跳自環;adj 依 `to` 排序)。

### 2.2 DEFAULTS 改精簡格式(js/viz/viz_graph_workbench.js)

- 無權五邊形(bfs/dfs/graph/graph-adjlist/graph-traversal):`'0-1,1-2,2-3,3-4,4-0,0-2'`。
- 加權五邊形(dijkstra/kruskal/prim):`'0-1:4,1-2:1,2-3:6,3-4:2,4-0:3,0-2:5'`。
- topo(有向無權 DAG):`'0-1,0-2,1-3,2-3,3-4,3-5'`。
- bellman-ford(有向加權,含負權):`'0-1:6,0-2:7,1-2:8,1-3:5,1-4:-4,2-3:-3,2-4:9,3-1:-2,4-0:2,4-3:7'`。
- (數值與現有預設等價,僅格式改變;各方法解析結果 n/adj/edges 不變。)

### 2.3 隨機產生器改精簡格式(js/random_input.js)

- `graphEdgeList`:每條邊 `u+'-'+v`(無權)或 `u+'-'+v+':'+w`(加權),以 `,` 連接。
- `graphDagText`:同上(有向無權 `u-v`;有向加權 `u-v:w`,w∈[-5,9])。
- 產出保證連通/DAG、n≤12(邏輯不變,僅字串格式改變)。

### 2.4 Placeholder / 顯示(js/domains/graph.js)

- 三個 render 的 `.gw-input` placeholder 改雙語新格式提示:
  - 無權:`{ zh: '邊以逗號或換行分隔:u-v(例 0-1,1-2)', en: 'Edges by comma or newline: u-v (e.g. 0-1,1-2)' }`。
  - 加權:`{ zh: '邊:u-v:w(例 0-1:4,1-2:1)', en: 'Edges: u-v:w (e.g. 0-1:4,1-2:1)' }`。
- 其餘 render 邏輯不變(仍呼叫 `parseEdges(text, meta.weighted, meta.directed)`)。

## 3. 檔案清單

- 修改:`js/viz/viz_graph_workbench.js`(`parseEdges` 分詞 + DEFAULTS 10 鍵)、`js/random_input.js`(`graphEdgeList`/`graphDagText` 輸出格式)、`js/domains/graph.js`(3 個 placeholder;無邏輯變更)、`tests/unit/graph_workbench.test.js`(新格式解析 + 相容 + DEFAULTS)、`tests/graph_workbench.spec.js`(若有斷言舊格式輸入處,補新格式案例)。
- 不動:`js/cloud-config.js`、`tests/random_push.spec.js`、graph-scc/components/bipartite/closure/matrix、其餘計數測試。

## 4. 測試

- **單元**(`tests/unit/graph_workbench.test.js` 增補):
  - 新精簡無權:`parseEdges('0-1,1-2,2-0', false, true)` → n=3,有向邊 (0,1)(1,2)(2,0);逗號分隔正確。
  - 新精簡加權:`parseEdges('0-1:4,1-2:1', true, false)` → 權重 4、1。
  - 精簡負權(有向):`parseEdges('0-1:-4,1-2:-3', true, true)` → 負權存入。
  - **向後相容**:`parseEdges('0 1\n1 2', false, false)`(舊格式)與 `parseEdges('0-1,1-2', false, false)` 產生等價 adj/edges;舊加權 `'0 1 6\n1 4 -4'`(有向)負權仍正確(`-4` 不被吃號)。
  - 混合分隔:`'0-1,1-2\n2-3'` 三邊皆解析。
  - 錯誤:加權方法給 `'0-1'`(缺權重)→ `ok:false` 雙語 error;無向加權給 `'0-1:-4'` → 拒絕(w<1);`n>12` → error。
  - DEFAULTS(全 10 鍵)以各自 weighted/directed 解析 `ok`,且 n 與改格式前一致(pentagon 5、topo 6、bellman 5)。
  - random(既有連通/DAG 測試)在新輸出格式下仍 `ok`、連通、n≤12。
- **E2E**(`tests/graph_workbench.spec.js`):既有以舊格式 fill 的案例(如 dijkstra `'0 1 2\n1 2 3'`)因相容仍過;新增一則:於某 workbench 方法 `.gw-input` 填精簡格式(如 `'0-1,1-2,2-0'`)→ Build → `.gw-svg .graph-node` 數正確。
- 全套 `npm run test:all` 綠;計數不變;`js/cloud-config.js` 未動。

## 5. 驗收標準

- 10 個 workbench 方法皆可用精簡 `u-v,u-v,…`(加權 `u-v:w`)輸入;舊 `u v`/`u v w` 格式仍可用(相容)。
- DEFAULTS/placeholder/🎲 隨機皆呈現新精簡格式。
- 負權(bellman-ford)以 `u-v:w`(w 可負)正確;舊格式負權亦不受影響。
- graph-scc 等獨立方法、計數、其他 viz 不變;`js/cloud-config.js` 未動。
- 單元 + E2E 全綠。

## 6. 風險與緩解

- **`-` 分隔 vs 負號歧義**:以「有 `:` → 精簡(pair 不含負號)」「符合 `\d+-\d+` → 精簡」「其餘 → 空白格式(以 `\s+` 切,保留負號)」三分支清楚切割;單元測試涵蓋舊格式負權(`0 1 -4`)不被吃號。
- **舊 localStorage 範例相容**:寬鬆解析同時吃舊格式,既有存檔不失效;單元測試對照新舊等價。
- **加權缺權重**:精簡無權 token 於加權方法明確報「需 u-v:w」,避免默默給預設權重。
- **唯一消費端**:`parseEdges` 僅 workbench 使用;graph-scc 等自有 parser,不受影響(已查證)。
- **數值等價**:DEFAULTS 僅改格式不改數值,各方法 frames/adj 不變,既有演算法/計數測試不受影響。
