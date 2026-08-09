# MST 三演算法 + redblue 一致性單元測試 設計文件

- 日期:2026-08-06
- Repo:`/Users/skhuang/course/dsvisual`(main @ 8da36a8,branch `test/mst-cross-validation`)
- 動機:把「Kruskal / Prim / Borůvka / redblue 四個 MST frame 產生器結果一致」的性質固化為決定性單元測試,防止日後 MST 相關改動悄悄漂移。(已以 3000 組隨機圖臨時驗證通過;本次改為固定圖組的決定性測試。)

## 0. 範圍與決策(已與使用者確認)

- **僅新增測試**:於 `tests/unit/graph_workbench.test.js` 增加一組交叉驗證測試;**不改任何 production code**(四個產生器現況已一致)。
- **決定性**:使用固定的圖清單(不使用 `Math.random`),涵蓋預設圖 + distinct-weight / tie / star / chain / dense / 較大圖等案例。
- 斷言:同圖四者 MST **總權重相同**、皆 `n−1` 條邊(連通);對 **distinct-weight**(MST 唯一)圖再斷言四者**邊集合完全相同**。tie 圖僅斷言權重相同(邊選擇可合法不同)。
- **不動**:production code、其他測試、`js/cloud-config.js`。

## 1. 現況(已查證)

- `js/viz/viz_graph_workbench.js`(dual-export;`module.exports = api`)提供:`parseEdges(text, weighted, directed, allowNegative) → { ok, n, adj, edges, labels }`;`kruskalFrames(edges, n, labels)`、`primFrames(adj, source, labels)`、`boruvkaFrames(edges, n, labels)`、`redBlueFrames(edges, n, labels)`。
- MST frame 末幀:kruskal/prim/boruvka 之 `treeEdges`、redblue 之 `blueEdges`(皆 `[{u,v}]`,索引,u<v)為 MST 邊集。
- `tests/unit/graph_workbench.test.js` 現有 `redBlueFrames` 測試已交叉驗證 `blueW === kruskal MST 權重`;本次擴充為四者全體、多圖、含邊集合比對。
- 臨時驗證(3000 隨機圖)結果:0 權重/邊數不一致、0 distinct-weight 邊集合不符。

## 2. 設計

於 `tests/unit/graph_workbench.test.js` 追加:

- helper(測試檔內區域函式):
  - `edgeWeight(parsed)`:回傳 `key(min,max) → w` 對照表。
  - `mstEdges(frames, field)`:取末幀 `frames.at(-1)[field]`(kruskal/prim/boruvka 用 `'treeEdges'`,redblue 用 `'blueEdges'`)。
  - `sumW(tree, wmap)`、`keyset(tree)`(排序後的 `u-v` 字串陣列)。
  - `runAll(text)`:`parseEdges(text,true,false)` → 跑四個產生器 → 回傳 `{ n, weights:{k,p,b,rb}, sets:{k,p,b,rb}, counts:{...} }`(prim source=0)。
- 固定圖組 `CASES = [{ text, distinct }]`(至少):
  1. 預設:`'A-B:4,B-C:1,C-D:6,D-E:2,E-A:3,A-C:5'`(distinct=false;含權重 tie? 實際 distinct,但保守標 false → 僅驗權重與邊數;另單獨案例驗預設權重=10)。
  2. distinct 小圖:`'A-B:1,B-C:2,C-D:3,A-D:4,A-C:5'`(distinct=true)。
  3. tie 圖:`'A-B:1,B-C:1,C-A:1,C-D:1,D-A:1'`(distinct=false)。
  4. star:`'A-B:5,A-C:3,A-D:7,A-E:2'`(distinct=true;本身為樹)。
  5. chain:`'A-B:2,B-C:2,C-D:2,D-E:2'`(distinct=false;本身為樹,邊集必相同)。
  6. dense 4-node distinct:`'A-B:6,A-C:1,A-D:5,B-C:8,B-D:3,C-D:4'`(權重 6,1,5,8,3,4 全相異;distinct=true;MST={A-C:1,B-D:3,C-D:4} 權重 8)。
  7. 較大 distinct(CLRS 風):`'A-B:7,A-D:5,B-C:8,B-D:9,B-E:7,C-E:5,D-E:15,D-F:6,E-F:8,E-G:9,F-G:11'`(distinct=false;含重複權重 → 僅驗權重/邊數)。
- 測試(data-driven,對每個 CASE 一個 `test`):
  - `parseEdges` `ok`;四者權重相等(`new Set([k,p,b,rb]).size===1`);四者邊數皆 `n−1`。
  - `distinct===true` 之案例:四者 `keyset` 完全相同(`deepStrictEqual`)。
- 另加一個顯式案例:預設圖四者權重 === 10、邊數 === 4。

## 3. 檔案清單

- 修改:`tests/unit/graph_workbench.test.js`(+交叉驗證測試 + helpers)。
- 不動:production code、其他檔、`js/cloud-config.js`。

## 4. 測試

- `node --test tests/unit/graph_workbench.test.js` 綠(新增案例全過;既有測試不受影響)。
- 全套 `npm run test:all` 綠(僅新增單元測試,E2E 不受影響)。
- 決定性:無 `Math.random`/`Date`;重複執行結果一致。

## 5. 驗收標準

- 四個 MST 產生器於固定圖組上:總權重一致、邊數 `n−1`;distinct-weight 圖邊集合一致;為決定性測試。
- 不改 production code;既有測試與全套綠。

## 6. 風險與緩解

- **把可能非唯一的圖標成 distinct**:僅對確定 distinct-weight(權重全相異)的圖做邊集合比對;tie/含重複權重圖只比權重(避免脆弱)。逐案例人工檢查權重是否全相異再設 `distinct`。
- **prim source 依賴**:MST 權重與 source 無關,固定 source=0;連通圖上四者皆得 `n−1` 邊。
- **產生器介面變動**:測試以公開 api(parseEdges + *Frames)為介面;若欄位改名(treeEdges/blueEdges)測試會抓到(即為此測試的守備目的)。
