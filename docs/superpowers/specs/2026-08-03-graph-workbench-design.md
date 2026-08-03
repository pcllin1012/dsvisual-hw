# Graph Workbench(圖論工作台)— 設計文件

- 日期:2026-08-03
- Repo:`/Users/skhuang/course/dsvisual`(main @ 0384c31)
- 動機:目前 graph 類別(`js/domains/graph.js`,~11 個方法)採用**固定的 5 節點五邊形**資料,演算法以 `sleep()`+`showStatus` **自動播放**、無法倒帶,只有小型「加邊」輸入。改採 **Sparse Matrix (Linked List) 的測試資料輸入模式**——文字邊表輸入、🎲 隨機、難度選擇、範例(example)存 localStorage——並加上 **VCR 逐步/倒帶控制**。

## 0. 範圍與決策(已與使用者確認)

- **Pilot(本 spec 只做這 3 個)**:`graph-bfs`、`graph-dfs`、`graph-dijkstra`。建立可重用的「圖論工作台(graph workbench)」框架,之後再以後續 PR 套到其餘方法。
- **輸入格式**:邊表(edge list / 三元組)。每行一條邊:無權重 `u v`(BFS/DFS)、有權重 `u v w`(Dijkstra)。節點數 `n` 由最大索引推得(= max index + 1)。此即 sparse matrix 三元組 (row,col,val) 形式,呼應 Sparse Matrix 主題。
- **有向/無向**:**無向**(每行同時加 u→v 與 v→u),沿用目前五邊形的無向預設。
- **VCR**:**完整倒帶/scrub**(`⏮ ◀ ▶/⏸ ▶︎ ⏭` + slider + 速度),與 RB/AVL 觀測站一致。
- **決策預設**:`n` 上限 **12**(保持圓形佈局可讀);其餘 8 個 graph 方法**維持現狀不動**。
- **不新增方法/群組** → 計數不變(overview tiles / categories / nav 皆不變)。

## 1. 現況(已查證)

- `js/domains/graph.js`(923 行):`DEFAULT_EDGES`(無權重)、`DEFAULT_WEIGHTED_EDGES`(有權重)固定 5 節點;`renderGraph()` 依 `currentMode` 以 `if` 分支繪 SVG;`runBFS/runDFS/runKruskalMST/runDijkstra/...` 為 `async` 函式,`sleep()`+`showStatus()`+重繪的自動動畫,無步驟模型/倒帶。
- 節點座標為固定五邊形;`graph-u/v/w`、`graph-source/target`、加邊/清空(清空=還原預設,非清空)為現有小型控制。
- Registry:`R().attach('graph-bfs', { render: renderGraph, code, layout:{host:'dynamic'} })` 等;`graph-bfs`/`graph-dfs`/`graph-dijkstra` 目前都指向 `renderGraph`。
- 既有可重用基礎:`js/examples_store.js`(`key/load/save`)、app.js `buildExamplesSelect(methodId, defaultText)` + `.ex-select`;`js/random_input.js` `randomInputFor(methodId, difficulty, rng)`(尚未涵蓋 graph);per-viz 難度選擇器 `#input-difficulty`(`getInputDifficulty()`);bilingual `langOf({zh,en})`;`acquireDynamicVizHost()`。
- 範本:`js/viz/viz_matrix_sparse_list.js` 的輸入列(text input + Build + `buildExamplesSelect` + 🎲 `.rand-btn` + 全域難度);RB/AVL 觀測站(`js/tree_rb_viz.js`)的 History/transport(VCR)。

## 2. 架構

### 2.1 純模組 `js/viz/viz_graph_workbench.js`(雙重匯出,可單元測試,不碰 DOM)

匯出 `window.GraphWorkbench` / `module.exports`,API:

- `parseEdges(text, weighted)` → `{ ok, n, adj, edges, error }`
  - 逐行解析;每行 2(無權)或 3(有權)個非負整數,以空白分隔;有權時 `w` 為整數且 `w ≥ 1`。
  - `adj`:長度 n 的鄰接表 `Array<Array<{to:number, w:number}>>`(無權時 `w=1`),無向 → 同時加雙向;去重(同一對 (u,v) 只留一條,重複時保留先出現者)。
  - `n = max index + 1`;若 `n > 12` 或任何索引 < 0 或格式錯 → `ok:false` + `error:{zh,en}`(具體訊息:格式、索引超過上限 12、權重需 ≥ 1 等)。空輸入 → `ok:false` + 提示。
  - `edges`:正規化後的無向邊陣列 `[{u,v,w}]`(u<v,供繪圖與去重)。
- `layout(n, cx, cy, r)` → `Array<{x,y}>`:n 個節點等角放在以 (cx,cy) 為圓心、半徑 r 的圓上(索引 0 在正上方,順時針)。決定性、無亂數。
- `bfsFrames(adj, source)` → `Array<Frame>`:標準 BFS(佇列),鄰居以索引遞增順序探訪。
- `dfsFrames(adj, source)` → `Array<Frame>`:標準遞迴/堆疊 DFS,鄰居索引遞增。
- `dijkstraFrames(adj, source)` → `Array<Frame>`:標準 Dijkstra(每步取未定案中最小距離者 settle,再 relax 其鄰邊)。
- `DEFAULTS`:`{ 'graph-bfs': '<text>', 'graph-dfs': '<text>', 'graph-dijkstra': '<text>' }` 預設邊表(小型連通、有環,含最短路故事)。

**Frame 結構**(所有 generator 一致):
```
{
  visited:   number[],            // 已完成/已訪節點 id
  frontier:  number[],            // 佇列/堆疊/優先佇列中待處理節點 id
  active:    number | null,       // 本步驟主角節點
  activeEdge: {u,v} | null,       // 本步驟考慮/鬆弛的邊(無向,u<v)
  dist:      (number|Infinity)[] | null,  // Dijkstra 用;BFS/DFS 為 null
  order:     number[],            // 目前為止的訪問順序(供顯示)
  message:   { zh, en }           // 本步驟說明(雙語,技術正確)
}
```
- 第 0 幀 = 初始(source 入 frontier);最後一幀 = 完成(全部 visited,frontier 空)。generator 為純函式,對相同輸入決定性輸出。
- Dijkstra 訊息採標準術語:settle / relax / 最短距離更新 `d[v] = d[u] + w`。

### 2.2 Render `renderGraphVcr(methodId)`(js/domains/graph.js,新函式)

供 `graph-bfs`/`graph-dfs`/`graph-dijkstra` 共用(依 methodId 決定 weighted 與 generator)。流程:

1. `host = acquireDynamicVizHost()`;`host.style.width='100%'`(沿用溢出修正慣例)。
2. **工具列**:`[<textarea/text edge-list>] [Build] [🎲] [Examples ▾] [source ▾]`。
   - 邊表輸入 class `.gw-input`,placeholder 雙語(格式提示)。
   - `Build` `.gw-build`:`parseEdges` → 失敗顯示 `langOf(error)`;成功則 `saveExample(methodId, text, DEFAULT)`、重算 frames、重繪、transport 歸零。
   - 🎲 `.rand-btn`:`RandomInput.randomInputFor(methodId, getInputDifficulty())` 填入 `.gw-input` 後等同按 Build。
   - Examples:`buildExamplesSelect(methodId, DEFAULTS[methodId])`;`.ex-select` onchange 載入該 text → Build。
   - source `.gw-source`:`<select>`,選項 0..n-1,預設 0;改變即重算 frames、transport 歸零。
   - 難度選擇器沿用全域/ per-viz `#input-difficulty` 既有機制(不新增)。
3. **舞台**:SVG(沿用 `graph-node`/`graph-edge` 類名與樣式);`layout(n)` 定位;依「目前 frame」上色(visited / frontier / active / activeEdge;Dijkstra 額外顯示 `dist` 標籤)。
4. **VCR transport** `.gw-transport`:`⏮ ◀ ▶/⏸ ▶︎ ⏭` + `<input type=range>` slider + 速度 `<select>`(慢/中/快)+ 計數 `步 i / n`(雙語),按鈕 title 雙語。播放以 `setTimeout` 前進;`◀/▶︎` 單步;slider 直接跳幀;`⏮/⏭` 跳到頭/尾。空白鍵/← → 鍵(可選,若不增加複雜度)。
5. **步驟說明橫幅** `.gw-stepdesc`:顯示 `langOf(frame.message)`。
6. 狀態存於模組層 `_gwState`(per methodId 或以 methodId 為 key),`renderGraphVcr` 重入時重建 DOM 但沿用目前 text/source/frame index(語言切換即時重繪 → 沿用 `languagechange → switchMode → renderAll` 既有路徑)。

**VCR 元件**:優先抽為 render 內的小工具函式(或若 VizKit 已有 `buildStepControls` 且支援 scrub 則沿用;否則本 render 內自建 frame scrubber)。務求可被後續 graph 方法重用。

### 2.3 Registry 接線

- `R().attach('graph-bfs',   { render: () => renderGraphVcr('graph-bfs'),   code: () => codeGraphBFS,   layout:{host:'dynamic'} });`
- 同理 `graph-dfs`、`graph-dijkstra`。
- 其餘 8 個方法(`graph`,`graph-adjlist`,`graph-traversal`,`graph-kruskal`,`graph-topo`,`graph-prim`,`graph-bellman-ford`,`graph-floyd-warshall`)**維持指向現有 render 不變**。
- `renderGraph` 內的 bfs/dfs/dijkstra 分支與對應 `runBFS/runDFS/runDijkstra` 對這 3 個方法不再被呼叫;若移除會影響共用函式風險 → **保留(成為 dead code)以降低風險**,並於 plan 標注可選清理。

### 2.4 `js/random_input.js` 新增 3 個 generator

- `graphEdgeList(rng, difficulty, weighted)`:產生連通無向圖的邊表字串。
  - 難度:`edge`→ n=3–4、稀疏(近似路徑/樹);預設→ n=5–7;`large`→ n=9–12、較密;`special`→ 結構化(例:一條主幹路徑 + 幾條捷徑,讓 BFS/最短路有故事)。
  - 保證連通(先生成生成樹連通所有節點,再依難度加額外邊);去重;有權時 `w ∈ [1,9]`。
- 在 `randomInputFor` 的 dispatch 加 `case 'graph-bfs'`/`'graph-dfs'`(weighted=false)、`case 'graph-dijkstra'`(weighted=true)。

### 2.5 index.html / style.css

- `index.html`:於 app.js 之前 `<script src="js/viz/viz_graph_workbench.js" defer></script>`(與其他 `js/viz/*` 一致)。
- `style.css`:`.gw-*` 少量樣式(工具列、transport、step banner);盡量沿用既有 `graph-node/graph-edge/rbviz-transport` 樣式。

## 3. 檔案清單

- **新增**:`js/viz/viz_graph_workbench.js`、`tests/unit/graph_workbench.test.js`、`tests/graph_workbench.spec.js`。
- **修改**:`js/domains/graph.js`(`renderGraphVcr` + 3 個 attach 改指向 + 圓形佈局)、`js/random_input.js`(3 generator + dispatch)、`index.html`、`style.css`。
- **不動**:`js/cloud-config.js`(保留 `__PLACEHOLDER__`)、其餘 8 個 graph 方法與其 render/runner、計數測試、`tests/random_push.spec.js`。

## 4. 測試

- **單元**(`tests/unit/graph_workbench.test.js`):
  - `parseEdges`:合法無權/有權 → 正確 n/adj/edges(無向雙向、去重);非法(負索引、非整數、有權缺 w、`w<1`、`n>12`、空)→ `ok:false` + `error.{zh,en}` 皆非空字串。
  - `layout(n)`:回傳 n 個座標、皆落在半徑 r 圓上(容差內)、決定性。
  - `bfsFrames`/`dfsFrames`:在已知圖 + source 下,`order` 為正確 BFS/DFS 順序;第 0 幀含 source 於 frontier;末幀 `visited` 含全部可達節點、frontier 空;每幀 `message.{zh,en}` 非空。
  - `dijkstraFrames`:在已知加權圖上末幀 `dist` 等於教科書最短距離;settle 順序正確;每幀 message 雙語非空。
- **E2E**(`tests/graph_workbench.spec.js`,用共用 `loadMethod`):
  - 對 3 個 pilot 方法:載入 → `.gw-input` 與 `.gw-transport` 可見;🎲 後 `.gw-input` 非空且 Build 後 `.graph-node` 數 > 0;點 `▶︎`(下一步)後步驟計數前進;example 往返(輸入特殊圖 → Build → `.ex-select` 出現該項 → 改輸入 → 選回 → 還原)。
  - Dijkstra:Build 後節點含 `dist` 標籤;scrub slider 到末幀顯示完成訊息。
  - 語言切換:切 en/zh 後工具列/步驟說明文字改變。
- 全套 `npm run test:all` 綠;計數不變;`js/cloud-config.js` 未動。

## 5. 驗收標準

- `graph-bfs`/`graph-dfs`/`graph-dijkstra` 皆改為:邊表文字輸入 + 🎲 隨機(難度感知)+ 範例存取(localStorage)+ 完整 VCR 倒帶控制;演算法以 frame 模型逐步、可倒帶。
- 輸入為無向邊表(`u v` / `u v w`),n≤12 圓形佈局;無效輸入有雙語錯誤。
- 其餘 8 個 graph 方法行為不變;計數不變;`js/cloud-config.js` 未動。
- 介面文字與步驟說明雙語(zh/en),切換語言即時更新。
- 單元 + E2E 全綠。

## 6. 風險與緩解

- **演算法改寫為 frame 模型**(最大工作量):每個 generator 為純函式 + 單元測試對照教科書輸出;先以已知小圖驗證正確性。
- **共用 `renderGraph` 風險**:pilot 方法改用 `renderGraphVcr`,不改動共用 `renderGraph`;舊 bfs/dfs/dijkstra 分支保留為 dead code,避免牽動其他 8 個方法。
- **VCR 元件重用**:抽成 render 內可重用的 frame scrubber,為後續 graph 方法鋪路;若 VizKit 已有合適 helper 則沿用。
- **佈局可讀性**:n≤12 上限 + 圓形佈局確保節點不重疊;parser 對超限給明確錯誤。
- **範例輸入格式差異**(weighted vs unweighted):per-methodId 的 example key,`buildExamplesSelect(methodId, ...)` 各自獨立。
- **語言切換重繪**:沿用既有 `languagechange` 路徑;frame.message/UI 皆 `langOf`,重繪沿用目前 text/source/index。
- **難度感知隨機需連通**:generator 先造生成樹保證連通,再加邊;避免孤立節點導致 BFS/Dijkstra 空洞。
