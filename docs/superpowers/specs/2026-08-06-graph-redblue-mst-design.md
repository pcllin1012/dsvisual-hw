# 紅藍規則 MST 視覺化(graph-redblue,Tarjan red/blue rules)設計文件

- 日期:2026-08-06
- Repo:`/Users/skhuang/course/dsvisual`(main @ ed6f08d,branch 待建)
- 動機:以 viz 呈現 Tarjan 的「紅/藍規則」——最小生成樹(MST)演算法的統一框架:**藍色規則**(對任一切割,跨越切割的最小權重邊必屬某 MST → 塗藍)、**紅色規則**(對任一環,環上最大權重邊必不屬任何 MST → 塗紅)。以 **Kruskal 視角** 驅動(依權重升序:接受邊=藍規則、拒絕邊=紅規則),並點出 Kruskal/Prim/Borůvka 皆為此框架的特例。含中英雙語投影片。

## 0. 範圍與決策(已與使用者確認)

- **新增單一方法 `graph-redblue`**(加權無向 MST),置於 graph 群組 `graph-boruvka` 之後;以 `renderGraphVcr` 呈現(工作台 + VCR + 程式碼抽屜 + 可點擊步驟欄,比照既有 MST 方法);**無來源、不加 directed 切換**(MST 僅無向)。
- **規則排序 = Kruskal 視角**:邊依權重升序處理;`find(u)≠find(v)` → **藍規則**(該邊為跨越「u 分量 vs 其餘」切割的最小邊)→ 加入 MST、union;`find(u)=find(v)` → **紅規則**(該邊會成環;因升序處理,它是該環上最大邊)→ 排除。確定性、每條邊最終非藍即紅、同時展示兩規則、直接揭示 Kruskal 即紅藍框架。
- **交付**:viz 方法 + 中英雙語投影片(比照所有 graph 方法皆有 deck)。
- 計數 +1(tiles==methodCount 自洽;categories 不變)。
- **不動**:`js/cloud-config.js`、其他方法、既有 MST 演算法/frame、`buildFrameControls`。

## 1. 現況(已查證)

- MST 既有:`graph-kruskal`/`graph-prim`/`graph-boruvka`,皆 `renderGraphVcr('graph-X')` + `GW_META`(`{weighted:true, usesSource, gen}`)+ frame 產生器(viz_graph_workbench.js)。
- Frame 形狀(MST):`{ visited, frontier, active, activeEdge, dist:null, order, treeEdges:[{u,v}], message:{zh,en} }`(索引式;render 以 `parsed.labels` 顯示、以索引比對邊)。
- `renderGraphVcr` draw(graph.js ~245-247):邊 class = `graph-edge` + (`activeEdge` 相符 ? `active` : `treeKeys.has` ? `tree` : `''`);`treeKeys` 由 `f.treeEdges` 組成。節點/邊皆逐幀由 `svg.innerHTML` 重繪。
- 邊 CSS(style.css):`.gw-svg .graph-edge`(灰)、`.graph-edge.active`(藍 #60a5fa)、`.graph-edge.tree`(綠 #34d399)。**尚無** blue/red 類。
- 接線點(比照 `graph-boruvka`,已查證行號):
  - `js/app.js` METHODS(116 boruvka;於其後插入)、`codeByMethod`(328)、updateLayout code-only 分支(1689)。boruvka 用 `visualizer:'graph-step', controls:'graph-step', codeDrawer:true`(避免舊 `#graph-actions` 殘列)——redblue 沿用。
  - `js/domains/graph.js`:GW_META(90-92 區)+ `R().attach`(537 boruvka 之後)。**不入** `GW_DIRECTED_TOGGLE`。
  - `js/i18n.js`:en(82)、zh(339)。
  - `js/random_input.js`:加權 MST 群組 `case 'graph-boruvka':`(305)。
  - `build_db.js`:mapping(32);`node build_db.js` 生 `js/code_db.js`(勿手改)。
  - 投影片:`slides_db.js`(以 method id 為 key,雙語 block)→ `npm run build:slides` 生 `js/slides_rendered.js` + `slides/{zh,en}/*.md`。
- 五邊形加權預設 `'A-B:4,B-C:1,C-D:6,D-E:2,E-A:3,A-C:5'`:升序 B-C1,D-E2,E-A3,A-B4,A-C5,C-D6 → 藍:B-C,D-E,E-A,A-B(權重 1+2+3+4=**10**,4 條);紅:A-C(環 A-B-C-A 最大邊 5),C-D(成環最大邊 6)。MST 權重與 kruskal/prim/boruvka 相同(已手算驗證)。
- 計數測試動態(`overview-tile==methodCount`);無硬編總方法數。

## 2. 架構

### 2.1 純模組 `redBlueFrames(edges, n, labels)`(viz_graph_workbench.js)

- 輸入:`edges=[{u,v,w}]`(無向,u<v,索引)、`n`、`labels`(選填;訊息用 `L(i)=labels?labels[i]:i`)。
- 依 `(w, u, v)` 穩定升序排序 edges 副本;DSU(path compression + union by rank)。
- `blue=[]`、`red=[]`、`order=[]`、`inMst[]`。
- helper `snap(activeEdge, msg)` 推 frame:`{ visited:order.slice(), frontier:[], active:null, activeEdge, dist:null, order:order.slice(), treeEdges:blue.slice(), blueEdges:blue.slice(), redEdges:red.slice(), message }`。
  - 註:同時填 `treeEdges` 與 `blueEdges`(皆為藍邊)以相容既有「tree」渲染路徑並支援新「blue」渲染(見 §2.2);draw 以 `blueEdges` 優先(藍)。
- 主迴圈(依升序每邊 e=(u,v,w)):`ru=find(u), rv=find(v)`;
  - `ru≠rv`:union;`blue.push({u:min,v:max})`;更新 `order`(新入樹節點,依既有 MST 慣例);`snap(ae, 藍規則訊息)`。訊息(雙語,以 L() 顯示 token):`「藍規則:邊 u–v(w) 是跨越切割(含 u 的分量 vs 其餘)的最小邊 → 加入 MST」/ "Blue rule: edge u–v(w) is the lightest edge crossing the cut (u's side vs the rest) → add to the MST"`。
  - `ru=rv`:`red.push({u:min,v:max})`;`snap(ae, 紅規則訊息)`。訊息:`「紅規則:邊 u–v(w) 會與已選藍邊成環,且為環上最大邊 → 排除」/ "Red rule: edge u–v(w) closes a cycle with chosen blue edges and is the heaviest on it → exclude"`。
- 末幀:`snap(null, 完成訊息)`:`「藍邊構成 MST(總權重 W,共 n−1 條);紅邊皆被排除」/ "Blue edges form the MST (weight W, n−1 edges); red edges are all excluded"`(`W`=藍邊權重和;`blue.length===n−1` 於連通圖)。
- 純函式、不碰 DOM、無 RNG/Date。加入 `api` 匯出。
- `DEFAULTS['graph-redblue'] = 'A-B:4,B-C:1,C-D:6,D-E:2,E-A:3,A-C:5'`(與 kruskal 同)。

### 2.2 渲染 + CSS(honor 藍/紅 命名)

- **`renderGraphVcr` draw(graph.js ~245-247)**:新增 `blueKeys`(由 `f.blueEdges`)與 `redKeys`(由 `f.redEdges`)。邊 class:
  `active`(activeEdge 相符)> `blue`(blueKeys.has)> `tree`(treeKeys.has,其他 MST 方法沿用綠)> `red`(redKeys.has)> `''`。
  其他方法之 frame 無 `blueEdges`/`redEdges` → 行為不變(向後相容)。
- **CSS(style.css,`.gw-svg` 區)**:
  - `.gw-svg .graph-edge.blue { stroke: #3b82f6; stroke-width: 5; stroke-dasharray: none; }`(MST 藍,實線粗)
  - `.gw-svg .graph-edge.red { stroke: #ef4444; stroke-width: 2; stroke-dasharray: 4; opacity: 0.55; }`(排除紅,細虛淡)
  - 深色模式覆寫(比照既有 tree/active 於 `@media (prefers-color-scheme: dark)` 區,若需要):藍/紅在深色下仍清晰(#60a5fa / #f87171)。
- **圖例(選配、輕量)**:於步驟說明 banner 或 log 標題附近加一行小圖例(藍=MST、紅=排除),雙語;或僅靠步驟訊息說明(YAGNI:先不加獨立圖例元件,訊息已明確;plan 視情況決定)。

### 2.3 接線(比照 Borůvka)

- **`js/domains/graph.js`**:GW_META 加 `'graph-redblue': { weighted:true, usesSource:false, gen:(p,s)=>GraphWorkbench.redBlueFrames(p.edges, p.n, p.labels) }`;`R().attach('graph-redblue', { render:()=>renderGraphVcr('graph-redblue'), code:()=>codeGraphRedblue, layout:{host:'dynamic'} })`(boruvka attach 之後)。**不入** `GW_DIRECTED_TOGGLE`。draw 的 blue/red 支援(§2.2)。
- **`js/app.js`**:METHODS 於 `graph-boruvka`(116)後插 `{ id:'graph-redblue', title:'Red-Blue Rules (MST)', file:'graph_redblue.cpp', visualizer:'graph-step', controls:'graph-step', codeDrawer:true }`;`codeByMethod` 加 `'graph-redblue': codeGraphRedblue`(328 區);updateLayout 加 `else if (currentMode === 'graph-redblue') { codeTitle.textContent='graph_redblue.cpp'; codeDisplay.textContent=codeGraphRedblue; }`(1689 區)。
- **`js/random_input.js`**:加權 MST 群組加 `case 'graph-redblue':` → `{ text: graphEdgeList(rng, difficulty, true) }`(比照 boruvka,305)。
- **`js/i18n.js`**:en `'method.graph-redblue': 'Red-Blue Rules (MST)'`、zh `'method.graph-redblue': '紅藍規則(MST)'`。
- **`cpp/graph_redblue.cpp`**:可編譯的 Kruskal 視角實作(DSU;升序;接受邊註解 blue rule、拒絕邊註解 red rule),輸出藍邊集合(MST)。
- **`build_db.js`**:`mappings['graph_redblue.cpp']='codeGraphRedblue'`;`node build_db.js` 生 `js/code_db.js`(勿手改)。

### 2.4 投影片(slides_db.js,雙語,~7 張)

`"graph-redblue": { category:"Graphs", title:{zh:"紅藍規則(MST)", en:"Red-Blue Rules (MST)"}, slides:[…] }`:
1. 簡介:紅/藍規則是 MST 的統一框架(Tarjan);複雜度視實作(此處 Kruskal 視角 $O(E\log E)$)。
2. 藍色規則(切割性質):對任一切割,跨越它的最小權重邊屬某 MST → 塗藍。
3. 紅色規則(環性質):對任一環,環上最大權重邊不屬任何 MST → 塗紅。
4. 為何正確:藍邊恒為某 MST 子集、紅邊恒被排除(不變量);反覆套用直到所有邊著色,藍邊即 MST。
5. Kruskal 視角(本 viz):升序;接受=藍(跨切割最小邊)、拒絕=紅(環上最大邊)。
6. 逐步範例:預設圖 `A-B:4,B-C:1,C-D:6,D-E:2,E-A:3,A-C:5` → 藍 B-C(1)/D-E(2)/E-A(3)/A-B(4)、紅 A-C(5)/C-D(6),MST 權重 10。
7. Kruskal/Prim/Borůvka 皆為紅藍框架特例 + 真實 C++(`cpp/graph_redblue.cpp`)。
- 產生:`npm run build:slides` 生 `js/slides_rendered.js` + `slides/{zh,en}/graph-redblue.md`(勿手改生成檔)。

## 3. 檔案清單

- 新增:`cpp/graph_redblue.cpp`、`tests/graph_redblue.spec.js`。
- 修改:`js/viz/viz_graph_workbench.js`(`redBlueFrames` + DEFAULTS + api)、`js/domains/graph.js`(GW_META + attach + draw blue/red)、`js/app.js`(METHODS + codeByMethod + updateLayout)、`js/random_input.js`、`js/i18n.js`(en+zh)、`style.css`(`.graph-edge.blue/.red`)、`build_db.js`(mapping)、`js/code_db.js`(生成)、`slides_db.js`(+deck)、`js/slides_rendered.js`(生成)、`tests/unit/graph_workbench.test.js`(redBlueFrames)。
- 不動:`js/cloud-config.js`、`tests/random_push.spec.js`、其他方法/計數框架。

## 4. 測試

- **單元(`tests/unit/graph_workbench.test.js`)**:
  - `redBlueFrames` 於預設圖:末幀 `blueEdges.length===4`、`redEdges.length===2`、藍邊權重和===10(== kruskal 之 MST 權重);每條邊最終恰在藍或紅其一(藍∪紅==全部、藍∩紅==∅);每幀 `message.{zh,en}` 非空;傳 labels 時訊息含 token。
  - 與 Kruskal 一致性:同圖 `sumW(blue) === sumW(kruskal MST)`。
  - `DEFAULTS['graph-redblue']` 解析 ok、n=5。
- **E2E(`tests/graph_redblue.spec.js`,共用 loadMethod)**:
  - 載入 → `[data-testid="gw-input"]`、`.stepctl`、`.gw-workbench`、`[data-testid="viz-steplog"]`(或既有 graph step-log testid,見既有 graph_steplog 慣例)可見;`.gw-svg .graph-node` 數 5;scrub 到末幀 → `.gw-svg .graph-edge.blue` 數 4、`.graph-edge.red` 數 2;無 `[data-testid="gw-source"]`、無 directed toggle;code drawer 內 `.code-panel-filename` 含 `graph_redblue.cpp`。
  - 步驟欄:列數==幀數;點列跳轉;首列訊息非空。
  - 🎲 隨機後重繪成功。
- **投影片 E2E**:`window.SLIDES_RENDERED['graph-redblue']` 雙語各 >1 張;含 `graph_redblue.cpp`。
- **計數**:i18n 動態 tiles==methodCount(+1)仍過;overview-category 不變。
- 全套 `npm run test:all` 綠;`js/cloud-config.js` 未動;`js/code_db.js`/`js/slides_rendered.js` 由生成腳本產出(未手改)。

## 5. 驗收標準

- `graph-redblue` 出現於 graph 群組(Borůvka 之後),為加權無向 MST 工作台;逐步以藍/紅規則著色(接受=藍、拒絕=紅),末態藍邊==MST(權重與 Kruskal/Prim/Borůvka 相同)、紅邊全排除;程式碼抽屜 + 可點擊步驟欄;無來源、無 directed 切換。
- 中英雙語投影片說明兩規則、正確性、Kruskal 視角、逐步範例、與三經典演算法之關係。
- 計數自洽;其他方法/CSS 既有行為不變;`js/cloud-config.js` 未動;單元 + E2E + 全套綠。

## 6. 風險與緩解

- **紅/藍正確性**:Kruskal 視角下,升序處理保證「拒絕邊=其所成環的最大邊」(紅規則)、「接受邊=跨當前切割的最小邊」(藍規則);單元以「藍權重和==kruskal MST 權重」「藍∪紅==全邊、互斥」把關。
- **draw 向後相容**:blue/red 僅在 frame 具 `blueEdges`/`redEdges` 時生效;其他方法無此欄位 → 綠 tree 行為不變;E2E 對既有 MST 方法回歸(至少抽查 kruskal 仍 `.tree` 綠)。
- **視覺可辨(藍 vs active 藍)**:active(#60a5fa)與 blue(#3b82f6)相近;blue 為粗實線(width 5)、active 為進行中高亮;末態無 active,藍邊清晰。必要時微調 blue 色相;深色模式覆寫確保對比。
- **code_db.js / slides_rendered.js 生成**:僅改 cpp+build_db mapping、slides_db;`node build_db.js` 與 `npm run build:slides` 重生;不手改。
- **計數測試**:動態 tiles==methodCount 自洽;無硬編總數(已查證)。
- **visualizer/controls 值**:用 `graph-step`(比照 boruvka),避免舊 `#graph-actions` 殘列。
- **不連通圖**:紅藍框架產生生成森林;末幀訊息標示藍邊 < n−1;不崩(比照 boruvka 森林處理)。
- **投影片 C++ 檔名 caption**:比照近期修正,`file` 用真實底線檔名 `graph_redblue.cpp`。
