# 清除 graph.js 死碼(legacy 編輯器 / 舊 render)— 設計文件

- 日期:2026-08-03
- Repo:`/Users/skhuang/course/dsvisual`(main @ c3534cd)
- 動機:graph workbench 收尾後,`js/domains/graph.js` 內舊互動編輯器與舊 render 已無任何 live `R().attach` 或事件引用(全部方法改用 workbench render;`graph-floyd-warshall` 仍用 `renderFloydWarshall`)。清除這些死碼(**Tier A**,約 500 行)。

## 0. 範圍與決策(已確認)

- **只做 Tier A**:刪 `js/domains/graph.js` 內死函式 + legacy 模組狀態;`registerDomain` 去掉 `init`/`onModeSwitch`。
- **不做 Tier B**:`index.html` 的 `#graph-edges`/`graph-u/v/w`/`btn-graph-*`/`gn-*` 與 app.js 擷取、3 個相關測試**不動**(這些元素在 Tier A 後為惰性未用;移除牽動共用檔與測試,另議)。
- 不動:`js/cloud-config.js`、`tests/random_push.spec.js`、其他 domain、計數。

## 1. 死碼清單(已查證,live render 僅用 `parsed.edges` 區域物件,不碰以下)

**刪除(`js/domains/graph.js`)**:
- Legacy 模組狀態/常數:`DEFAULT_EDGES`、`DEFAULT_WEIGHTED_EDGES` 及其上方註解、`freshEdges`、`freshWeightedEdges`、`let edges`、`weightedEdges`、`mstEdgeKeys`、`graphCandidateEdgeKey`、`dijkstraDistances`、`dijkstraVisited`、`shortestPathEdges`、`topoOrder`、`topoVisited`、`topoEdges`、`let dom`。
- 死函式:`edgeKey`、`runKruskalMST`(含內部 `find`/`unite`)、`buildWeightedGraphSvg`、`renderGraphDual`、`renderPrim`、`renderBellmanFord`、`renderGraph`、`runDijkstra`、`runTopoSort`、`onModeSwitch`、`init`。
- `C().registerDomain({ id: 'graph', init: init, onModeSwitch: onModeSwitch })` → `C().registerDomain({ id: 'graph' })`。

**保留**:IIFE 頂端 `const K/C/R`;`renderFloydWarshall`(仍 live,位於死碼之間 → 兩段刪除);`gwLoadExamples`/`gwSaveExample`/`gwExamplesOptionsHtml`/`gwBuildExamplesSelect`;`drawUndirectedGraph`;`renderGraphVcr`/`renderGraphStruct`/`renderGraphTraversal`;全部 11 條 `R().attach(...)`。

**已查證**:`sleep` 非本檔定義(全域,僅被死 runner 呼叫,無需刪定義);`K().executeAnimWrapper` 為 VizKit 方法(僅死 init 呼叫,不在本檔);live render(940+)僅用 `parsed.edges`,不引用任何上列 legacy 狀態。

## 2. 消費端契約

- `app.js:1474`:`domains().forEach(d => { if (d.init) d.init(); })` — `init` 移除後 `d.init` 為 undefined → 略過(安全)。
- `app.js:1498`:`if (d.onModeSwitch) d.onModeSwitch(currentMode)` — 同理略過(安全)。
- `registerDomain(d){ if (d) _domains.push(d); }` — 接受 `{ id:'graph' }`(其他 domain 如 search 亦僅傳 `init`,onModeSwitch 可省)。

## 3. 檔案清單

- 修改:`js/domains/graph.js`(兩段刪除 + registerDomain 改一行)。
- 不動:`index.html`、`js/app.js`、`tests/*`(3 個引用 legacy DOM 的測試仍通過:`#graph-edges` 元素仍存在、`#btn-graph-add` 文字仍為 i18n 值)、`js/cloud-config.js`。

## 4. 測試

- `node --check js/domains/graph.js` 通過。
- `npm run test:all` 全綠(unit + Playwright,0 fail);特別確認:11 個 graph 方法(含 `graph-floyd-warshall`)仍正常 render;`#graph-edges` count 測試(visualizer.spec ~733/755)與 `#btn-graph-add` i18n 測試(~775)仍過。
- 計數不變;`js/cloud-config.js` 未動。

## 5. 驗收標準

- `js/domains/graph.js` 移除所有列出的死函式與 legacy 狀態;`registerDomain` 僅 `{ id:'graph' }`。
- 11 個 graph 方法行為不變;全套綠;計數不變;`js/cloud-config.js`、index.html、app.js、測試未動。

## 6. 風險與緩解

- **誤刪 live 碼**:`renderFloydWarshall` 夾在死碼中 → 明確以兩段刪除(renderBellmanFord 結束前 / renderGraph 起始到 init 結束),保留 355–415;刪後 `node --check` + 全套測試把關。
- **registerDomain 契約**:消費端皆 `if (d.init)`/`if (d.onModeSwitch)` 守衛,省略安全;已查證。
- **legacy DOM 惰性殘留**:Tier B 明確延後;`#graph-edges` 等元素保留,相關測試不受影響。
