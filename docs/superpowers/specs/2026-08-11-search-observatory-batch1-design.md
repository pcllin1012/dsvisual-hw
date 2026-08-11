# Search viz 觀測台化 Batch 1/3 設計文件(數值陣列搜尋:linear/binary/fibonacci/interpolation)

- 日期:2026-08-11
- Repo:`/Users/skhuang/course/dsvisual`(main @ 0efadda,branch `feat/search-observatory-batch1`)
- 動機:將搜尋 viz 依照 sort 觀測台模型統一——VCR 控制、可點步驟欄、隱藏原始碼(code drawer)、example input、全螢幕放大且維持 VCR 可操作。Batch 1 收斂「數值陣列搜尋」四法。

## 0. 範圍與決策(已與使用者確認)

- **Batch 1 = 數值陣列搜尋**:`search-linear`、`search-binary`、`search-fibonacci`、`search-interpolation`,轉為觀測台(重用 sort 的 `buildStepWorkbench` + code drawer + `.viz-*` 全螢幕 CSS + `ExamplesStore` + `esc()`)。
- **統一 frame 模型**(對齊 sort):`{ array:number[], hi:{index:className}, message:{zh,en} }`;class ∈ `{ lo, hi, mid, found, eliminated }`。四法皆用**單一** `renderSearch` + **單一** paint(一致的步驟欄/全螢幕/抽屜/範例體驗)。
- **linear/binary**:全新 frame 產生器 + 移除 legacy(`run*Search`、`#search-container`、`#search-actions`)。
- **fibonacci/interpolation**:目前是半現代化(已有 `buildFibSearchFrames`/`buildInterpFrames` + `buildFrameControls`,但無步驟欄/抽屜/範例/全螢幕)。**將其演算法邏輯移植進統一產生器**(統一 frame 形狀),`renderSearch` 取代 `viz_search_fib.js`/`viz_search_interp.js` 的 render + `buildFrameControls`;舊 render 函式移除。
- **example input = 陣列 + target**:輸入列兩欄(array text + target number)+ Build + 🎲 + examples select(比照 fib/interp 現有 `.ss-arr`/`.ss-target` 概念,重新命名 `.searchviz-arr`/`.searchviz-target`)。binary/fib/interp 於 Build 時排序陣列(linear 不排序)。`RandomInput` 新增 `'search'` case 回 `{ data:number[], target:number }`。
- **全螢幕放大**:`.searchviz-stage` 正常給定高、`body.viz-focus` 下 `flex:1` 撐滿,cell 隨之放大;VCR + 步驟欄由 PR #203 的 `.viz-*` 祖先綁定維持可操作/可捲。
- **不動**:字串比對(kmp/bm/rk/zalgo/strcompare)= Batch 2;Aho-Corasick = Batch 3;其他 domain;`buildFrameControls`/`buildStepWorkbench`;`js/cloud-config.js`;`js/code_db.js`;方法計數。

## 1. 現況(已查證)

- `js/domains/search.js`(72 行):`renderSearchArray` + 兩個 legacy `async run{Linear,Binary}Search`(`await sleep` + `#search-container` DOM 操作 + `showStatus`)、`init`(綁 `#btn-search-go` 等)、`R().attach('search-linear'/'search-binary', { render: renderSearchArray, code, layout:null })` + `C().registerDomain({ id:'search', init })`。
- `js/viz/viz_search_fib.js`:`renderSearchFibonacci()`——自有輸入列(`.ss-arr`/`.ss-target`)、`FibSearchViz.buildFibSearchFrames(arr,target) → {frames}`、`buildFrameControls`(僅 VCR)、自有 paint;`attach('search-fibonacci', { render, code, ... })`。
- `js/viz/viz_search_interp.js`:同構,`InterpSearchViz.buildInterpFrames(arr,target) → {frames}`;`attach('search-interpolation', …)`。
- `index.html`:`#search-actions`(95-100,含 `#search-val`、`btn-search-random/go/pause/stop`)、`#search-container`(191)。
- `js/app.js` search 相依:`searchContainer`(1373)、`searchActions`(1378)、`btnSearchGo/Pause/Stop`+`searchVal`(1394)、`btnSearchRandom`(1395);`btnSearchPause/Stop.addEventListener`(1611/1613);`setAnimControls` 的 `includes('search')` 分支(1615);`handleStopClick` 的 `includes('search')` 分支(1612 區);`containers` 陣列含 `searchContainer`(1656)、`actions` 陣列含 `searchActions`(1657);updateLayout `search-linear`/`search-binary` 分支(1845-1846,顯示 `#search-container`)、`search-fibonacci`/`search-interpolation` 分支(僅設 codeTitle/codeDisplay)。
- **陷阱(同 sort Batch 3)**:移除 `#search-container`/`#search-actions` 後,`containers`/`actions` 陣列與變數宣告若殘留 → `updateLayout` 對 null `.classList` 拋錯,切到任何模式即崩。必須同步移除陣列項 + 宣告 + 全部 `btn-search-*` handler/宣告 + `includes('search')` 分支。
- sort 觀測台範式:`renderSort(methodId)`(dynamic host + 輸入列 + examples + `esc()` + `buildStepWorkbench`)、`FRAMES` map、`.sortviz-stage` 全螢幕放大、code-panel-only updateLayout 分支 + `codeDrawer:true`、`.viz-*` 全螢幕祖先綁定(PR #203)。

## 2. 設計

### 2.1 `js/viz/viz_search_frames.js`(新,純函式 dual-export)

- 對齊 `viz_sort_frames.js`:browser global `SearchFrames` + node `module.exports`;`SEARCH_DEFAULT_ARR = [1,3,5,7,9,11,13,15,17,19]`、`SEARCH_DEFAULT_TARGET = 11`;`hiOf(base, cur)` 合併輔助。
- 四產生器 `(arr, target) → [{array, hi, message:{zh,en}}]`,首幀初始、命中則末幀有 `found` cell 且 message 命中、未命中則末幀 message「找不到」且無 `found`;class 合法;純函式。
  - **linearFrames**:由左至右;目前索引 `mid`、已查過標 `eliminated`;命中即 `found` 收尾。不需排序。
  - **binaryFrames**(arr 已排序):`lo/hi/mid` 標界與中點,`< lo` 與 `> hi` 標 `eliminated`;`a[mid]<target`→右半、`>`→左半,message 敘述;命中 `found`。
  - **fibonacciFrames**(已排序):移植 `buildFibSearchFrames` 邏輯(fib 數切割 `offset`/`i`),以統一 frame 形狀重發;比較點標 `mid`、已排除區標 `eliminated`;命中 `found`,message 敘述 fib 步。
  - **interpolationFrames**(已排序):移植 `buildInterpFrames` 邏輯(內插估計 `pos`),比較點標 `mid`、界標 `lo/hi`、排除標 `eliminated`;命中 `found`,message 敘述內插公式。
- `api` 匯出四者 + `SEARCH_DEFAULT_ARR`/`SEARCH_DEFAULT_TARGET`。

### 2.2 `renderSearch(methodId)`(js/domains/search.js,取代 legacy)

- Dynamic host:輸入列 `<input class="searchviz-arr">`(陣列 CSV)+ `target <input type=number class="searchviz-target">` + `<button class="searchviz-build">Build</button>` + 🎲(`.rand-btn`)+ `<select class="ex-select">`(examples,比照 sort);全部注入文字經 `esc()`。
- `FRAMES` map:`search-linear→linearFrames`、`search-binary→binaryFrames`、`search-fibonacci→fibonacciFrames`、`search-interpolation→interpolationFrames`。Build:讀 array+target,`methodId!=='search-linear'` 時排序陣列;呼叫對應產生器 → `buildStepWorkbench({ stage, frames, paint, getMessage, runIntervalMs })`。
- **paint(單一)**:`stage.innerHTML = f.array.map((v,i)=>'<div class="search-cell '+(f.hi[i]||'')+'"><span>'+v+'</span><i class="idx">'+i+'</i></div>').join('')`(cell + 值 + 索引標)。detached-initial-paint(只碰 `stage`)。
- `getMessage(f)`:回 `f.message`(`{zh,en}` 依語系),與 sort 一致。
- Examples:`ExamplesStore`(per-method id),範例文字格式 `arr | target`(如 `1,3,5,7,9,11 | 11`);🎲 呼叫 `RandomInput.randomInputFor('search', difficulty)`。
- `R().attach('search-X', { render: () => renderSearch('search-X'), code: () => codeSearchX, layout: { host: 'dynamic' } })`(四法)。

### 2.3 全螢幕放大(CSS)

- `.searchviz-stage { width:100%; height:220px; display:flex; align-items:center; justify-content:center; gap:6px; flex-wrap:wrap; overflow:auto; }`(給定高使全螢幕 flex 生效)。
- `body.viz-focus .method-section-card.active .searchviz-stage { flex:1 1 auto; height:auto; min-height:0; }` + cell 放大:`body.viz-focus .method-section-card.active .search-cell { font-size:1.4rem; min-width:56px; min-height:56px; }`(全螢幕 cell 加大填滿)。
- `.search-cell`/`.search-cell.lo/.hi/.mid/.found/.eliminated` 上色(比照 `.sort-bar` 狀態色:mid=比較、found=綠、eliminated=淡出、lo/hi=界)。

### 2.4 接線 + legacy 移除(js/app.js、index.html)

- **app.js**:四法 METHODS 加 `codeDrawer:true`;updateLayout 四個 code-panel-only 分支(`search_linear.cpp`/`search_binary.cpp`/`search_fibonacci.cpp`/`search_interpolation.cpp`,變數 `codeSearchLinear/Binary/Fibonacci/Interpolation`)取代舊 linear/binary(去除 `#search-container` 顯示)與舊 fib/interp 分支。
- **legacy 移除**(§1 陷阱):刪 app.js `searchContainer`/`searchActions`/`btnSearchGo`/`btnSearchPause`/`btnSearchStop`/`searchVal`/`btnSearchRandom` 宣告、`btnSearchPause/Stop.addEventListener`、`setAnimControls` 與 `handleStopClick` 的 `includes('search')` 分支、`containers`/`actions` 陣列中的 `searchContainer`/`searchActions`;刪 index.html `#search-actions`/`#search-container`;刪 search.js `run{Linear,Binary}Search`/`renderSearchArray`/`init`/`sleep`(若僅此用),`registerDomain` 改 `{ id:'search' }`。
- **RandomInput**:`randomInputFor` 新增 `case 'search': return { data: valSeq(rng, difficulty), target: <取 data 中一元素或隨機> }`(命中/未命中皆可,傾向偶爾命中)。
- `js/viz/viz_search_frames.js` 於 `js/domains/search.js` 前載入(index.html script 順序);`viz_search_fib.js`/`viz_search_interp.js` 的 render+attach 移除(邏輯已移植);保留其 code 匯出若被引用(否則一併清)。

## 3. 檔案清單

- 新增:`js/viz/viz_search_frames.js`(4 產生器);`tests/unit/search_frames.test.js`;`tests/search_steplog.spec.js`(E2E)。
- 修改:`js/domains/search.js`(renderSearch + FRAMES + examples + esc;移除 legacy)、`js/app.js`(4 METHODS codeDrawer;updateLayout 4 分支;移除 search 容器/actions/handlers/陣列項/宣告)、`index.html`(移除 `#search-actions`/`#search-container`;載入新 frames 檔)、`style.css`(`.searchviz-*` + 全螢幕放大)、`js/random_input.js`(`'search'` case)。
- 移除/精簡:`js/viz/viz_search_fib.js`、`js/viz/viz_search_interp.js`(render+attach;邏輯已移植)。
- 可能調整:既有 fib/interp 測試(若有)重指或改寫至新模型。
- 不動:kmp/bm/rk/zalgo/strcompare/aho、其他 domain、`js/cloud-config.js`、`js/code_db.js`、計數框架。

## 4. 測試

- **單元(search_frames.test.js)**:四產生器 × 多輸入(命中/未命中/邊界/單元素/target 在頭尾):首幀=原陣列、非空、雙語 message、class 合法;命中 iff target ∈ arr → 末幀恰一 `found` 且其值==target;未命中 → 末幀無 `found`;binary/fib/interp 搜尋空間單調收斂(`eliminated` 數不減)。純函式不改輸入。
- **E2E(search_steplog.spec.js)**:四法——輸入列(array+target)/examples/workbench/步驟欄/VCR/抽屜檔名/cell 數==陣列長度/列數==frames/scrub 末幀(命中反白或顯示找不到);🎲 重建;**全螢幕**:進 focus → cell 像素明顯放大、transport 在視窗內可操作、步驟欄可捲(沿用 PR #203)。
- **legacy 移除回歸**:四法皆觀測台;`#search-actions`/`#search-container` 不存在;切換各模式(含非 search)不拋錯(null-classList 陷阱已解);kmp 等 Batch 2 方法不受影響。
- **random_input**:`'search'` case 產生合法 array+target;🎲 於 search 方法可用。
- **計數**:tiles==methodCount、categories 不變。
- 全套 `npm run test:all` 綠;`js/cloud-config.js`/`js/code_db.js` 未動。

## 5. 驗收標準

- linear/binary/fibonacci/interpolation 以觀測台呈現:VCR 控制、可點步驟欄、隱藏原始碼(抽屜)、example input(array+target)、全螢幕 cell 放大且 VCR/步驟欄可操作可捲。
- 統一 frame 模型 + 單一 paint;四法體驗一致(對齊 sort)。
- legacy 機制與靜態 DOM 完全移除、無殘留/報錯;kmp 等其他 search 方法與其他 domain 不受影響;E2E + 全套綠。

## 6. 風險與緩解

- **legacy 移除 null-ref**(最大風險,同 sort):移除 `#search-container`/`#search-actions` 後須同步清 `containers`/`actions` 陣列項 + 宣告 + 全部 `btn-search-*` handler/宣告 + `includes('search')` 分支;E2E 切換多模式驗不拋錯。
- **fib/interp 邏輯移植**:現有產生器可運作;移植進統一形狀有回歸風險 → 單元測試以「命中正確 + 搜尋空間單調」守正確性;保留原檔邏輯為對照直到綠。
- **cell 百分比/flex 放大需定高父容器**:`.searchviz-stage` 正常給定高、全螢幕 `flex:1`(bounded stagecol,PR #203)→ 放大生效;E2E 驗正常與全螢幕 cell 尺寸。
- **未命中/未排序輸入**:binary/fib/interp Build 時排序;產生器對未命中回「找不到」末幀;單元涵蓋邊界。
- **RandomInput 'search'**:新增 case,傾向偶爾命中以利展示;不弱化既有 case。
- **既有 fib/interp 測試**:若存在,重指至新 `renderSearch` 模型或改寫,不弱化斷言。
