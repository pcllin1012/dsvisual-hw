# 修正 graph 方法頂部殘留控制列 + 雙欄圖形不顯示 — 設計文件

- 日期:2026-08-03
- Repo:`/Users/skhuang/course/dsvisual`(main @ 14bff34)
- 回報(使用者):`graph`、`graph-adjlist`、`graph-traversal`、`graph-bfs`、`graph-dfs`、`graph-kruskal`、`graph-dijkstra`、`graph-topo` 這 8 個方法「最上面的輸入與功能已經沒有用」;`graph-traversal` 另「沒看到 graph 圖形」。

## 1. 根因(已於瀏覽器查證)

1. **殘留控制列**:`js/app.js` 的舊 `updateLayout`(~1657 起)先隱藏全部 actions/containers,再對這 8 個 graph 模式的分支 `graphActions.classList.remove('hidden')`(部分還 `graphContainer.classList.remove('hidden')`),把舊編輯器輸入列(`#graph-actions`:`graph-u/v/w` + Add Edge / Run Kruskal / Run Dijkstra / Run Topo / Reset)重新顯示在方法區塊頂端。但這些控制的事件在死碼清理(#185)後已移除 → 純殘留、無作用。對照:`graph-prim`/`graph-bellman-ford`/`graph-floyd-warshall` 分支僅設 `codeTitle`/`codeDisplay`,故無此問題。
2. **雙欄圖形 0×0**:`graph-traversal` 的 `renderGraphTraversal` 雙欄結構 `.graph-dual-grid > .graph-dual-pane > .gw-stage > svg.gw-svg`。單欄版有 CSS `.gw-struct-grid .gw-stage { flex: 1 1 320px }` 給寬度;雙欄的 `.gw-stage` 無寬度規則 → flex-basis auto、內容(viewBox-only SVG)無固有寬 → `.gw-stage` 與 SVG 皆塌成 0×0(實測:單欄 svg 619px,雙欄 0px)。故兩欄圖形不顯示。

## 2. 修正

1. **`js/app.js`**:將 8 個 graph 模式的 `updateLayout` 分支(`currentMode === 'graph'` / `'graph-adjlist'` / `'graph-traversal'` / `'graph-bfs'` / `'graph-dfs'` / `'graph-kruskal'` / `'graph-dijkstra'` / `'graph-topo'`)改為與 `graph-prim` 相同的最小形式——僅設 `codeTitle.textContent` 與 `codeDisplay.textContent`,不再 `remove('hidden')` `graphActions`/`graphContainer`,不再切換 `graphW`/`btnGraph*`/`graphSource`/`graphTarget`/`btnGraphClear`/`btnGraphAdd`。這些方法皆以 workbench(dynamic host 內建工具列)渲染,不需舊控制列。
2. **`style.css`**:新增 `.graph-dual-pane .gw-stage { width: 100%; }`(實測後 SVG → 273×182,雙欄圖形正常顯示)。

## 3. 不動 / 相容

- 不刪 `index.html` 的 `#graph-actions`/`#graph-edges` 靜態元素(仍存在但保持隱藏)——既有測試 `#graph-edges` count 1(visualizer.spec ~733/755)仍過;`#btn-graph-add` 文字 '加入邊'(~775)由 `data-i18n-key="btn.add-edge"` 提供,`toHaveText` 不看可見性,仍過。
- 不動 `js/domains/graph.js`、其他 domain、`js/cloud-config.js`、計數。

## 4. 測試 / 驗收

- 瀏覽器:8 個方法頂端不再出現舊輸入列;`graph-traversal` 兩欄各顯示 5 節點圖形。
- `npm run test:all` 全綠(含 `#graph-edges`、`#btn-graph-add` i18n、11 個 graph 方法 render);計數不變;`js/cloud-config.js` 未動。

## 5. 風險

- **誤動非 workbench graph 模式**:僅改列出的 8 個分支,`graph-prim`/`bellman-ford`/`floyd-warshall`/`aoe` 等分支不碰。
- **CSS 影響單欄**:`.graph-dual-pane .gw-stage` 選擇器僅限雙欄 pane,不影響單欄 `.gw-struct-grid .gw-stage` / renderGraphVcr 的 `.gw-stage`。
