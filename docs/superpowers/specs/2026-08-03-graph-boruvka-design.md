# Borůvka's MST 視覺化(graph-boruvka)設計文件

- 日期:2026-08-03
- Repo:`/Users/skhuang/course/dsvisual`(main @ e784368)
- 動機:新增第三個經典 MST 演算法 **Borůvka(Sollin)** 視覺化,比照既有 `graph-kruskal`/`graph-prim`。每輪各連通分量同時挑選其最小外連邊、加入並合併,直到剩一個分量(~log V 輪)。

## 0. 範圍與決策(已與使用者確認)

- 新增 `graph-boruvka`,置於 graph 群組 `graph-prim` 之後;**加權無向 MST**,以 `renderGraphVcr` 呈現(VCR 逐步 + MST 邊高亮);**無來源**、**不加 directed 切換**(MST 僅無向)。
- 完全比照 Kruskal 接線(GW_META `usesSource:false` + `gen(p.edges,p.n,p.labels)`;attach、METHODS、codeByMethod、updateLayout、random、i18n、cpp/build_db)。
- 計數 +1(tiles==methodCount 自洽;categories 14)。
- 不動:`js/cloud-config.js`、其他方法、演算法/labels/計數框架。

## 1. 現況(已查證)

- MST 既有:`graph-kruskal`(GW_META `{weighted:true, usesSource:false, gen:(p,s)=>kruskalFrames(p.edges,p.n,p.labels)}`;`renderGraphVcr('graph-kruskal')`;treeEdges → `.graph-edge.tree` 綠粗)、`graph-prim`。
- Frame 形狀(kruskal/prim):`{ visited, frontier, active, activeEdge, dist:null, order, treeEdges:[{u,v}], message:{zh,en} }`(索引式;render 以 `parsed.labels` 顯示、以索引比對邊)。
- 新方法接線點:`js/app.js` METHODS(line 112 kruskal / 115 prim)、`codeByMethod`(323 kruskal)、updateLayout code-only 分支(1679 kruskal);`js/domains/graph.js` GW_META(90)+ `R().attach`(481);`js/random_input.js`(303 `case 'graph-kruskal':` → weighted `graphEdgeList(...,true)`);`js/i18n.js`(en 78 / zh 334);`cpp/graph_kruskal.cpp` + `build_db.js`(31 mapping)→ `node build_db.js` 生 `js/code_db.js`。
- 五邊形加權預設 `'A-B:4,B-C:1,C-D:6,D-E:2,E-A:3,A-C:5'`:MST 權重 10、4 條邊(kruskal/prim 相同;Borůvka 亦然,已手算驗證)。
- 計數測試動態(`overview-tile == methodCount`;`overview-category==14`);無硬編總方法數。

## 2. 架構

### 2.1 純模組 `boruvkaFrames(edges, n, labels)`(js/viz/viz_graph_workbench.js)

- 輸入:`edges = [{u,v,w}]`(無向,u<v,索引)、`n`、`labels`(選填,訊息用 `L(i)=labels?labels[i]:i`)。
- Union-find(path compression + union by rank);`tree=[]`、`order=[]`、`inTree[]`。
- helper `snap(active, activeEdge, msg)` 推 frame:`{ visited:order.slice(), frontier:[], active, activeEdge, dist:null, order:order.slice(), treeEdges:tree.slice(), message }`。
- 主迴圈(每輪):
  1. `cheapest = {}`(每個 root → 目前最小外連邊)。掃描所有 edges:對 `e=(u,v,w)`,`ru=find(u)`,`rv=find(v)`,若 `ru!==rv`,對 ru、rv 各比對更新其 cheapest(較小 w;平手以 (u,v) 穩定)。掃描時可 `snap(null, {u,v}, 「第 k 輪:檢視分量 … 的外連邊 u–v(w)」)`(擇要,避免過多幀:每個分量各出一幀標示其選定的最小邊即可)。
  2. 若本輪無任何 cheapest(圖不連通,剩多分量)→ 末幀「圖不連通,森林完成,總權重 …」跳出。
  3. 對每個有 cheapest 的 root:取其最小邊 `ae={u:min,v:max}`,若兩端仍不同集合(union 成功,避免同輪重複/成環)→ `tree.push(ae)`、累積 `order`(新入樹節點)、`snap(null, ae, 「第 k 輪:分量選最小外連邊 u–v(w),合併」)`。
  4. `tree.length === n-1` → break。
- 末幀:`order.length` 對照;`treeEdges.length===n-1` → 「Borůvka 完成,總權重 W」;否則森林訊息。
- `activeEdge`/`treeEdges` 以 `{u:min,v:max}` 索引;訊息以 `L()` 顯示 token。純函式、不碰 DOM。加入 `api` 匯出。
- `DEFAULTS['graph-boruvka'] = 'A-B:4,B-C:1,C-D:6,D-E:2,E-A:3,A-C:5'`(與 kruskal/prim 同,MST 權重 10)。

### 2.2 接線(比照 Kruskal)

- **`js/domains/graph.js`**:GW_META 加 `'graph-boruvka': { weighted:true, usesSource:false, gen:(p,s)=>GraphWorkbench.boruvkaFrames(p.edges, p.n, p.labels) }`(prim 之後);`R().attach('graph-boruvka', { render: () => renderGraphVcr('graph-boruvka'), code: () => codeGraphBoruvka, layout:{host:'dynamic'} })`。**不入** `GW_DIRECTED_TOGGLE`。
- **`js/app.js`**:METHODS 於 `graph-prim` 後插 `{ id:'graph-boruvka', title:'Borůvka MST', file:'graph_boruvka.cpp', visualizer:'graph-step', controls:'graph-step' }`(比照 prim 的 visualizer/controls,使其不出舊 `#graph-actions` 列);`codeByMethod` 加 `'graph-boruvka': codeGraphBoruvka`;updateLayout 加 code-only 分支 `else if (currentMode === 'graph-boruvka') { codeTitle.textContent='graph_boruvka.cpp'; codeDisplay.textContent=codeGraphBoruvka; }`。
- **`js/random_input.js`**:於加權 MST 群組(kruskal/prim/dijkstra)加 `case 'graph-boruvka':` → `{ text: graphEdgeList(rng, difficulty, true) }`。
- **`js/i18n.js`**:en `'method.graph-boruvka': 'Borůvka MST'`、zh `'method.graph-boruvka': 'Borůvka MST'`(比照 kruskal 保留英文演算法名)。
- **`cpp/graph_boruvka.cpp`**:可編譯 Borůvka(union-find + 每輪各分量最小邊 + 合併)。
- **`build_db.js`**:`mappings['graph_boruvka.cpp']='codeGraphBoruvka'`;`node build_db.js` 生成 `js/code_db.js`(勿手改)。

## 3. 檔案清單

- 新增:`cpp/graph_boruvka.cpp`、`tests/graph_boruvka.spec.js`。
- 修改:`js/viz/viz_graph_workbench.js`(`boruvkaFrames` + DEFAULTS)、`js/domains/graph.js`(GW_META + attach)、`js/app.js`(METHODS + codeByMethod + updateLayout)、`js/random_input.js`(dispatch)、`js/i18n.js`(en+zh)、`build_db.js`(mapping)、`js/code_db.js`(生成)、`tests/unit/graph_workbench.test.js`(boruvkaFrames)。
- 不動:`js/cloud-config.js`、`tests/random_push.spec.js`、其他方法、計數框架。

## 4. 測試

- **單元**(`tests/unit/graph_workbench.test.js`):
  - `boruvkaFrames`:在五邊形加權預設上末幀 `treeEdges.length === 4`、總權重 = 10(== kruskal);至少 1 次合併;每幀 `dist===null`、`message.{zh,en}` 非空;傳 labels 時訊息含 token。
  - 與 Kruskal 一致性:同一圖 Borůvka 與 Kruskal 的 MST 總權重相同(`sumW(boruvka) === sumW(kruskal)`)。
  - `DEFAULTS['graph-boruvka']` 加權解析 `ok`、n=5。
- **E2E**(`tests/graph_boruvka.spec.js`,共用 `loadMethod`):
  - 載入 → `[data-testid="gw-input"]`、`.stepctl` 可見;`.gw-svg .graph-node` 數 5;scrub 到末幀 → `.gw-svg .graph-edge.tree` 數 4(MST 4 邊);無 `[data-testid="gw-source"]`、無 `[data-testid="gw-directed-toggle"]`;`.code-panel-filename` 含 `graph_boruvka.cpp`。
  - 🎲 隨機後重繪成功。
- **計數**:i18n 動態 tiles==methodCount(各 +1)仍過;overview-category 14。
- 全套 `npm run test:all` 綠;`js/cloud-config.js` 未動。

## 5. 驗收標準

- `graph-boruvka` 出現於 graph 群組(Prim 之後),為加權無向 MST 工作台(輸入/🎲/難度/範例 + VCR + MST 邊高亮);每輪各分量選最小外連邊、合併,逐步可倒帶。
- MST 結果與 Kruskal/Prim 等價(權重相同);無來源、無 directed 切換。
- 計數自洽;其他方法不變;`js/cloud-config.js` 未動;雙語、語言切換即時。
- 單元 + E2E 全綠。

## 6. 風險與緩解

- **Borůvka 正確性**:union-find + 同輪對已選邊再 union 檢查(避免同輪兩分量互選同邊重複、或成環);末幀 `treeEdges.length===n-1`(連通)以單元對照 Kruskal 權重驗證。
- **同輪重複邊 / tie**:每分量取最小邊時穩定 tie-break((w, u, v));加入前 `find` 檢查避免重複/環;若兩分量互選同一邊,union 一次即可(第二次 find 相同 → 跳過)。
- **code_db.js 生成**:僅改 cpp + build_db mapping,`node build_db.js` 重生;不手改;build_db guard 確保 cpp 存在。
- **計數測試**:動態 tiles==methodCount 自洽;無硬編總數(已查證)。
- **visualizer/controls 值**:用 `graph-step`(比照 prim),避免舊 `#graph-actions` 殘留列(已於先前修正)。
- **不連通圖**:Borůvka 產生生成森林;末幀訊息標示;不崩。
