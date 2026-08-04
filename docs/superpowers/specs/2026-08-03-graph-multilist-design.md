# Adjacency Multilist 視覺化(graph-multilist)設計文件

- 日期:2026-08-03
- Repo:`/Users/skhuang/course/dsvisual`(main @ 1276872)
- 動機:新增「鄰接多重表(Adjacency Multilist)」視覺化,比照既有「鄰接串列(graph-adjlist)」。多重表為**無向圖**表示法:每條邊只用**一個節點**,同時掛在兩個端點的鏈上(對比鄰接串列每條邊存兩份)。

## 0. 範圍與決策(已與使用者確認)

- 新增一個方法 `graph-multilist`,置於 graph 群組 `graph-adjlist` 之後;**無向專用**(不加 directed 切換,不入 `GW_DIRECTED_TOGGLE`)。
- 以 `renderGraphStruct` 第三種 `view === 'multilist'` 實作(與 matrix/list 並列),重用 workbench 工具列(邊表輸入 + 🎲 + 難度 + 範例)。
- 左:圖形 SVG(`drawUndirectedGraph`,無向);右:多重表表示(邊節點 legend + 各頂點鏈)。
- 計數:+1 方法 → overview tiles / nav method 數同步 +1(既有測試 `tiles == methodCount` 動態,仍成立);categories 維持 14;無硬編總數需改。

## 1. 現況(已查證)

- `renderGraphStruct(methodId)`(js/domains/graph.js):`view = methodId === 'graph' ? 'matrix' : 'list'`;matrix 出 `adjMatrix` 表,list 出 `.adjlist-row` 鏈;左側 SVG `drawUndirectedGraph(parsed, pos, dir)`。graph/adjlist 在 `GW_DIRECTED_TOGGLE`(有切換鈕)。
- 方法登錄:`js/app.js` METHODS 陣列(graph 群組,line 106+),`graph-adjlist` = `{ id, title:'Adjacency List', file:'graph_adjlist.cpp', visualizer:'graph', controls:'graph' }`。
- 程式碼面板:`js/app.js` `codeByMethod`(line ~317)`'graph-adjlist': codeGraphAdjlist`;updateLayout(~1672)`else if (currentMode === 'graph-adjlist') { codeTitle=...; codeDisplay=codeGraphAdjlist; }`;registry `R().attach('graph-adjlist', { render: () => renderGraphStruct('graph-adjlist'), code: () => codeGraphAdjlist, layout:{host:'dynamic'} })`。
- 程式碼常數:`cpp/graph_adjlist.cpp` → build_db.js `mappings['graph_adjlist.cpp']='codeGraphAdjlist'` → `node build_db.js` 生成 `js/code_db.js`(`codeGraphAdjlist` + `CODE_DB` 對照)。build_db 有 missing-file guard(mapped cpp 不存在會 throw)。
- i18n:`js/i18n.js` en `method.graph-adjlist:'Adjacency List'`(~68)、zh `'鄰接串列'`(~323)。
- `desc_db.js` 無 graph-adjlist 條目 → 描述非必要(略)。
- 計數測試:`tests/i18n.spec.js` 動態 `overview-tile == methodCount(.category-nav-method)`、`overview-category == 14`;`smoke_modes.spec.js` 僅列固定子集(不含 adjlist,不需加)。無硬編方法總數。

## 2. 架構

### 2.1 純模組 helper `adjMultilist(edges, n)`(js/viz/viz_graph_workbench.js)

- 輸入:`edges`(parseEdges 無向輸出,`[{u,v,w}]`,u<v)、`n`。
- 每條邊依 `edges` 索引給 id:`E0, E1, …`(節點 = 一條邊)。
- `nodes = edges.map((e, i) => ({ id: i, u: e.u, v: e.v }))`。
- `chains`:長度 n;`chains[i]` = 所有以 i 為端點的邊,依「另一端點 other 遞增」排序的 `{ id, other }` 陣列。每個 edge id 恰出現在 `chains[u]` 與 `chains[v]`(共用)。
- 純函式、不碰 DOM;加入 `api` 匯出。

### 2.2 `renderGraphStruct` 第三 view(js/domains/graph.js)

- `const view = methodId === 'graph' ? 'matrix' : methodId === 'graph-multilist' ? 'multilist' : 'list';`
- `rebuild()` 內 `view === 'multilist'` 分支產生右側 `rep`:
  - 標題 `langOf({ zh:'鄰接多重表', en:'Adjacency Multilist' })`。
  - 說明:`langOf({ zh:'每條邊只有一個節點,被它的兩個端點共用(對比鄰接串列每條邊存兩份)', en:'Each edge is a single node shared by both endpoints (adjacency list stores each edge twice)' })`。
  - **邊節點 legend**:對每個 `nodes[k]` 出一個 4-欄節點框 `.gml-edge-node`,內含 `Ek` 標籤 + 4 格 `[u | v | linkᵤ | linkᵥ]`(link 欄以「→ Ej」或「∧」表示 u/v 鏈上的下一條邊,可留簡化為指向符號)。
  - **各頂點鏈**:每頂點一列 `.gml-row`:`[i] → Ek → Em → ∧`,其中 `Ek` 為共用邊節點 id;同一 `Ek` 會出現在兩列(視覺呈現共用)。以 `chains[i]` 依序輸出;`Ek` 標籤標示相鄰頂點(如 `Ek(j)`)。
- 左側 SVG 與 matrix/list 相同(`drawUndirectedGraph(parsed, pos, dir)`;multilist `dir` 恆為 undirected,見 2.4)。
- `view === 'multilist'` 沿用既有 struct rebuild/applyText/工具列;僅 rep 產生不同。

### 2.3 接線

- **`js/app.js` METHODS**:於 `graph-adjlist` 後插入 `{ id: 'graph-multilist', title: 'Adjacency Multilist', file: 'graph_multilist.cpp', visualizer: 'graph', controls: 'graph' }`。
- **`js/app.js` codeByMethod**(~317):加 `'graph-multilist': codeGraphMultilist,`。
- **`js/app.js` updateLayout**(~1672,graph 區塊內,與 adjlist 同型的 code-only 分支):`else if (currentMode === 'graph-multilist') { codeTitle.textContent = 'graph_multilist.cpp'; codeDisplay.textContent = codeGraphMultilist; }`。
- **`js/domains/graph.js`**:`R().attach('graph-multilist', { render: () => renderGraphStruct('graph-multilist'), code: () => codeGraphMultilist, layout: { host: 'dynamic' } });`;`renderGraphStruct` 的 `view` 判斷加 multilist(2.2)。**不加入** `GW_DIRECTED_TOGGLE`。
- **`cpp/graph_multilist.cpp`**:新增可編譯的 C++ 範例(多重表節點結構 `struct ENode { int m; int v1, v2; ENode *p1, *p2; };` + 建表示意),供程式碼面板 + build_db guard。
- **`build_db.js`**:`mappings['graph_multilist.cpp'] = 'codeGraphMultilist';`;執行 `node build_db.js` 重生 `js/code_db.js`(勿手改 code_db.js)。
- **`js/i18n.js`**:en `method.graph-multilist: 'Adjacency Multilist'`、zh `method.graph-multilist: '鄰接多重表'`。
- **`style.css`**:`.gml-*`(邊節點框、鏈列),沿用/對齊既有 `.adjlist-*`、`.gw-struct-grid`/`.gw-rep` 樣式;dark 相容。

### 2.4 directed 切換

- multilist 不入 `GW_DIRECTED_TOGGLE` → `gwEffectiveDirected('graph-multilist', st)` 回 `false`(無向),`renderGraphStruct` 不出切換鈕(`gwDirToggleHtml` 對非 toggle 方法回 '')。

## 3. 檔案清單

- 新增:`cpp/graph_multilist.cpp`、`tests/graph_multilist.spec.js`(E2E)。
- 修改:`js/viz/viz_graph_workbench.js`(`adjMultilist`)、`js/domains/graph.js`(view + rep + attach)、`js/app.js`(METHODS + codeByMethod + updateLayout)、`build_db.js`(mapping)、`js/code_db.js`(build_db 生成,勿手改)、`js/i18n.js`(en+zh title)、`style.css`(`.gml-*`)、`tests/unit/graph_workbench.test.js`(`adjMultilist`)。
- 不動:`js/cloud-config.js`、`tests/random_push.spec.js`、graph-adjlist 及其他方法。

## 4. 測試

- **單元**(`tests/unit/graph_workbench.test.js`):`adjMultilist(parseEdges('0-1,1-2,2-0',false,false).edges, 3)` → 3 個 nodes(E0=(0,1)、E1=(1,2)、E2=(0,2));每個 edge id 恰出現在兩條 chain;`chains[1]` 含 E0(other 0)與 E1(other 2)。
- **E2E**(`tests/graph_multilist.spec.js`,共用 `loadMethod`):
  - 載入 `graph-multilist`:`[data-testid="gw-input"]` 可見、`.gw-svg .graph-node` 數 5(五邊形預設)、右側 `.gml-edge-node` 數 = 邊數(6)、`.gml-row` 數 = 節點數(5)、無 `.stepctl`(結構視圖)、無 `[data-testid="gw-directed-toggle"]`(無向專用)。
  - 程式碼面板 filename 含 `graph_multilist.cpp`。
  - 🎲 隨機後重繪成功(節點 > 0)。
- **計數**:`i18n.spec.js` 動態斷言仍過(tiles == methodCount 各 +1);`overview-category` 仍 14。
- 全套 `npm run test:all` 綠;`js/cloud-config.js` 未動。

## 5. 驗收標準

- `graph-multilist` 出現在 graph 群組(Adjacency List 之後),有 workbench 工具列(輸入/🎲/難度/範例);左圖 + 右多重表(邊節點 legend + 各頂點共用鏈)。
- 每條邊一個節點、出現在兩端點鏈中(共用),與鄰接串列的差異清楚呈現;無向、無 VCR、無 directed 切換。
- 計數自洽(tiles==methodCount);其他方法不變;`js/cloud-config.js` 未動;雙語、語言切換即時。
- 單元 + E2E 全綠。

## 6. 風險與緩解

- **code_db.js 生成**:僅改 `cpp/graph_multilist.cpp` + `build_db.js` mapping,`node build_db.js` 重生;不手改 code_db.js;build_db guard 確保 cpp 存在。
- **計數測試**:i18n 動態 tiles==methodCount 自洽;確認無硬編總方法數(已查證無)。
- **多重表視覺複雜度**:MVP 以「邊節點 legend(4 欄框)+ 各頂點鏈(row)」呈現,重點在「同一 Ek 出現在兩列 = 共用」;不做完整 box-and-pointer 佈線,保持與 adjlist 一致的可讀性。
- **與 struct 既有行為**:multilist 為新 view 分支;matrix/list 路徑不動(既有 graph/adjlist E2E 不受影響)。
- **無向專用**:不入 `GW_DIRECTED_TOGGLE`;`gwEffectiveDirected` 回 false,無切換鈕。
