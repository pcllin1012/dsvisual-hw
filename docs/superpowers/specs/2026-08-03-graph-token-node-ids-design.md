# Graph Workbench — 節點以字元/token 為 ID(消除幻影節點)設計文件

- 日期:2026-08-03
- Repo:`/Users/skhuang/course/dsvisual`(main @ d4f26aa)
- 回報(使用者):edge-list 目前以數字編號,`n = maxIndex + 1` 會自動補齊 `0..max` 連續節點 → 輸入不含 0 的圖(如 `1-2,2-3`)仍冒出幻影節點 0。改用**字元/token 為節點 ID**。

## 0. 範圍與決策(已與使用者確認)

- 節點 ID 改為**任意英數 token**;預設/隨機用**字母**(A, B, C, …);解析器接受任何英數 token(字母或數字),舊數字範例仍可解析,**不再補齊幻影節點**。
- 節點集合 = 輸入中出現的**相異 token(依首次出現順序)**;`n` = 相異 token 數(不再 maxIndex+1)。
- 演算法內部維持整數索引(0..n-1)+ 鄰接表;新增 `labels[]`(index→token 字串),**僅供顯示**(節點標籤、訊息、起點選單、矩陣/串列/多重表列)。索引順序 = token 首現順序;預設字母升序出現 → 索引與原數字一致 → 索引式單元測試(dist/order/MST 權重)不變。
- 影響全部 workbench graph 方法(bfs/dfs/dijkstra/kruskal/prim/topo/bellman-ford/graph/adjlist/traversal/multilist)。
- 不動:`js/cloud-config.js`、graph-scc 等獨立方法、計數(方法數不變)。

## 1. 現況(已查證)

- `parseEdges(text, weighted, directed, allowNegative)`(js/viz/viz_graph_workbench.js):token 目前限數字(compact regex `/^\d+-\d+$/`、`u<0` 檢查、`maxIdx` → `n=maxIdx+1`);回傳 `{ok,n,adj,edges}`(adj/edges 以整數索引)。
- 各 generator(bfs/dfs/dijkstra/kruskal/prim/topo/bellman)於**訊息字串**直接內嵌數字索引(`'從節點 '+source`、`order.join(' → ')`、`ae.u+'–'+ae.v`、`'節點 '+bv`…);frame 的 `visited/order/active/activeEdge/dist` 為索引(render 以索引上色)。`adjMultilist` 無訊息(回 `{nodes,chains}`,索引)。
- renders(`renderGraphVcr`/`renderGraphStruct`/`renderGraphTraversal`、`drawUndirectedGraph`)以數字索引 `k` 當節點標籤;起點 `<select>` value/text = 索引;矩陣表頭、adjlist/multilist 列皆用索引。
- DEFAULTS 皆數字(`'0-1,1-2,…'`);`graphEdgeList`/`graphDagText`(random_input.js)輸出數字 `a-b`/`a-b:w`。
- 單元/E2E:多以數字 edge-list;斷言多為 count、dist 陣列(索引)、message 非空/regex,少數(`'0-13'` → n=14>12)依賴「數字=索引」。

## 2. 架構

### 2.1 `parseEdges` — token 模型 + `labels`(js/viz/viz_graph_workbench.js)

- **Token 定義**:`[A-Za-z0-9]+`(英數,不含空白/`-`/`:`/`,`)。邊分隔 `,`/換行;節點對分隔 `-` 或空白;權重分隔 `:`(權重仍為 `-?\d+` 整數)。
- 三分支 tokenizer 沿用,但 token 由 `\d+` 放寬為 `[A-Za-z0-9]+`:
  1. 含 `:` → `pair:w`,pair 以 `/[-\s]+/` 切為兩個 token,`w = Number(...)`(可負,依 allowNegative)。
  2. 符合 `/^[A-Za-z0-9]+-[A-Za-z0-9]+$/`(compact 無權)→ 以 `-` 切兩 token。
  3. 其餘(舊空白式)→ 以 `/\s+/` 切;2 段 token、3 段 token+權重。
  - token 非空、格式錯 → 雙語 error。**移除** `u<0 || v<0`(token 為字串);自環 `tokenA===tokenB` 跳過(以 token 字串比較)。
- **建 label map**:依 raw edges 順序,對每個新 token 指派遞增 index;`labels[]`(index→token)、`idx`(token→index Map)。`n = labels.length`;`n > 12` → 雙語 error(上限 12 個相異節點)。空輸入 → 提示。
- **adj/edges**:以映射後的**整數索引**建構(邏輯與現行相同:無向雙向 + min/max 索引去重;有向單向 + 有序去重;自環略;adj 依 to 排序)。
- 回傳新增 `labels`:`{ ok, n, adj, edges, labels }`。

### 2.2 Generators 標籤感知(js/viz/viz_graph_workbench.js)

- 各 generator 加 `labels` 參數(置末,選填):`bfsFrames(adj, source, labels)`、`dfsFrames(adj, source, labels)`、`dijkstraFrames(adj, source, labels)`、`kruskalFrames(edges, n, labels)`、`primFrames(adj, source, labels)`、`topoFrames(adj, n, labels)`、`bellmanFordFrames(adj, n, source, labels)`。
- 內部 helper `function L(i){ return labels ? labels[i] : i; }`;**所有訊息字串**的節點引用改用 `L(...)`(`'從節點 '+L(source)`、`order.map(L).join(' → ')`、`L(ae.u)+'–'+L(ae.v)`、`'節點 '+L(bv)`…)。
- **frame 資料維持索引**(visited/order/active/activeEdge/dist),render 仍以索引上色/比對邊。`labels` 省略時(單元測試直呼)→ L 回索引,訊息顯示索引(不影響 count/dist/regex 斷言)。
- `adjMultilist` 不變(無訊息;render 以 labels 顯示)。

### 2.3 Renders 顯示標籤(js/domains/graph.js)

- `parsed.labels` 供顯示;各 render 呼叫 generator 時傳 `parsed.labels`。
- **`GW_META` gen wrappers**:`gen: (p, s) => GraphWorkbench.bfsFrames(p.adj, s, p.labels)` 等(7 筆全加 `p.labels`;kruskal `(p.edges, p.n, p.labels)`;topo `(p.adj, p.n, p.labels)`;bellman `(p.adj, p.n, s, p.labels)`)。
- **`drawUndirectedGraph(parsed, pos, frame, directed)`**:節點標籤文字 `k` → `parsed.labels[k]`。
- **`renderGraphVcr` draw()**:節點標籤 `k` → `parsed.labels[k]`(其自繪節點迴圈)。
- **起點選單**(renderGraphVcr/renderGraphTraversal `rebuildSource`):option `value = k`(索引),`textContent = parsed.labels[k]`。`st.source` 續為索引。
- **`renderGraphStruct`**:
  - matrix:表頭 `j`/`i` → `labels[j]`/`labels[i]`(格子仍 index×index)。
  - list(adjlist):`[i]` → `[labels[i]]`;鄰居 `nb.to` → `labels[nb.to]`。
  - multilist:legend `E{id} [labels[u]|labels[v]|·|·]`;列 `[labels[i]]`、`E{id}(labels[other])`。
- **`renderGraphTraversal`**:兩欄節點標籤 `labels[k]`;info(`佇列/堆疊/已訪`)以 `fb.frontier/fb.order`(索引)`map(i=>labels[i])`;step 說明沿用 generator 訊息(已含 labels)。
- 需 `rebuildSource` 能取得 labels:改 `rebuildSource(parsed)` 或 `rebuildSource(n, labels)`。

### 2.4 DEFAULTS(字母)+ 隨機(字母)

- DEFAULTS(viz_graph_workbench.js)改字母(等價圖,僅換 ID):
  - 五邊形無權(bfs/dfs/graph/adjlist/traversal/multilist):`'A-B,B-C,C-D,D-E,E-A,A-C'`。
  - 五邊形加權(dijkstra/kruskal/prim):`'A-B:4,B-C:1,C-D:6,D-E:2,E-A:3,A-C:5'`。
  - topo DAG:`'A-B,A-C,B-D,C-D,D-E,D-F'`。
  - bellman CLRS:`'A-B:6,A-C:7,B-C:8,B-D:5,B-E:-4,C-D:-3,C-E:9,D-B:-2,E-A:2,E-D:7'`。
- `js/random_input.js` `graphEdgeList`/`graphDagText`:以 `lbl(i)=String.fromCharCode(65+i)`(A..;n≤12→A..L)輸出 `lbl(u)-lbl(v)`(無權)/ `lbl(u)-lbl(v):w`(加權);連通/DAG 邏輯不變。

### 2.5 code panel(不改)

- 各 method 的 `.cpp` 為既有 C++ 教學碼,以整數/字元皆可;本次不改 cpp/code_db。

## 3. 檔案清單

- 修改:`js/viz/viz_graph_workbench.js`(parseEdges token+labels、7 generators labels、DEFAULTS 字母)、`js/domains/graph.js`(GW_META wrappers、drawUndirectedGraph、3 renders 標籤/起點選單/矩陣/串列/多重表)、`js/random_input.js`(字母輸出)、`tests/unit/graph_workbench.test.js`(token/labels/n>12 案例)、`tests/graph_workbench.spec.js`+`tests/graph_multilist.spec.js`(標籤/幻影 案例)。
- 不動:`js/cloud-config.js`、`tests/random_push.spec.js`、cpp/code_db、graph-scc 等、計數測試。

## 4. 測試

- **單元**(`tests/unit/graph_workbench.test.js`):
  - `parseEdges('B-C,C-D', false, false)` → n=2(B,C,D? 不,B,C,D=3)→ 修正:`'B-C,C-D'` → tokens B,C,D → n=3,labels=['B','C','D'],**無 A/0**;`adj` 對應索引。
  - **幻影修正**:`parseEdges('1-2,2-3', false, false)` → tokens 1,2,3 → n=3,labels=['1','2','3'],**無 0**(舊行為會是 n=4 含 0)。
  - token 字母:`parseEdges('A-B:4', true, false)` → labels ['A','B'],adj[0][0].w=4。
  - `n>12`:輸入 13 個相異 token → `ok:false`(不再靠 `0-13`)。
  - labels 存在且長度 n;index 依首現順序;既有數字/相容測試(`'0-1,1-2'`≡`'0 1\n1 2'`、負權、DAG 隨機)以數字 token 續過。
  - generators:傳 labels 時訊息含 token(`bfsFrames(adj,0,['X','Y','Z'])` 訊息含 'X');省略 labels 時回索引(既有測試沿用)。DEFAULTS(字母)解析後 `bellmanFordFrames(...,labels)` 末幀 `dist===[0,2,7,4,-2]`(索引式,不變)。
- **E2E**(`tests/graph_workbench.spec.js`、`tests/graph_multilist.spec.js`):
  - 預設載入:`.gw-svg .graph-node` 數 5(A–E);節點標籤文字為字母(至少非純數字 0)。
  - **幻影修正**:於某 workbench 方法 `.gw-input` 填 `'B-C,C-D'`(不含 A)→ Build → `.gw-svg .graph-node` 數 3(不冒 A)。
  - 起點選單選項文字為 labels;multilist legend/列顯示 labels。
  - 既有以數字輸入的案例(例 `'0-1,1-2,2-0'`)仍過(3 節點)。
- 全套 `npm run test:all` 綠;計數不變;`js/cloud-config.js` 未動。

## 5. 驗收標準

- 節點 ID 為輸入 token;`n` = 相異 token 數,**輸入不含某 ID 不再冒幻影**(`1-2,2-3` 無 0;`B-C` 無 A)。
- 預設/隨機用字母;節點標籤、訊息、起點選單、矩陣/串列/多重表列皆顯示 token labels。
- 演算法結果(dist/order/MST/topo)與改前等價(索引式);雙語、語言切換即時;其他方法/計數不變;`js/cloud-config.js` 未動。
- 單元 + E2E 全綠。

## 6. 風險與緩解

- **大範圍波及**:parseEdges + 7 generators + 3 renders + random + defaults + 測試;以「labels 僅顯示、frame/adj 維持索引」最小化演算法改動;generator `labels` 選填(fallback 索引)保單元相容。
- **索引 vs 標籤一致性**:frame 資料一律索引;render 上色/比對用索引,標籤只在文字層 `labels[k]`;避免混用。
- **`n>12` 測試改依據**:token 模型下改以 13 個相異 token 觸發;更新該測試。
- **舊數字範例相容**:數字為合法 token;`'0-1,1-2'` 仍解析為節點 '0','1','2'(索引 0,1,2)→ 既有數字測試不變(但語意上 0 現在是「使用者打的 token 0」而非幻影)。
- **weight vs token 歧義**:權重仍限 `-?\d+` 且以 `:` 分隔;token 為 `-`/`:` 以外英數;`A-B:-4` 明確(pair A-B,w -4)。負權舊空白式 `A B -4` 由空白分支保號。
- **起點索引位移**:編輯圖後 token 集合變 → `st.source` 夾限 `< n`(既有邏輯);顯示以新 labels。
